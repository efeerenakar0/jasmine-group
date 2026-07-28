const { requireAdmin } = require('../_lib/auth');
const { configuration, supabaseRequest } = require('../_lib/supabase');

const VALID_WINDOWS = new Set([7, 30, 90]);

function emptyAnalytics(windowDays, status = 'ready') {
  return {
    configured: status === 'ready',
    status,
    windowDays,
    summary: { views: 0, whatsapp: 0, leads: 0, sessions: 0, contactRate: 0, leadRate: 0 },
    daily: [],
    sources: [],
    topProperties: [],
    generatedAt: new Date().toISOString(),
  };
}

function percentage(value, total) {
  return total ? Number(((value / total) * 100).toFixed(1)) : 0;
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (!requireAdmin(request, response)) return;
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Yalnızca GET isteği kabul edilir.' });
  }

  const requestedWindow = Number(request.query?.days || 30);
  const windowDays = VALID_WINDOWS.has(requestedWindow) ? requestedWindow : 30;
  if (!configuration()) return response.status(200).json(emptyAnalytics(windowDays, 'not_configured'));

  const since = new Date(Date.now() - (windowDays * 24 * 60 * 60 * 1000)).toISOString();
  let events;
  try {
    const select = 'event_name,session_hash,property_id,pathname,locale,event_source,utm_source,utm_medium,utm_campaign,device,created_at';
    events = await supabaseRequest(`/rest/v1/analytics_events?select=${select}&created_at=gte.${encodeURIComponent(since)}&order=created_at.desc&limit=10000`);
  } catch {
    return response.status(200).json(emptyAnalytics(windowDays, 'schema_missing'));
  }

  const summary = { views: 0, whatsapp: 0, leads: 0, sessions: 0, contactRate: 0, leadRate: 0 };
  const sessionHashes = new Set();
  const contactSessions = new Set();
  const leadSessions = new Set();
  const daily = new Map();
  const sources = new Map();
  const properties = new Map();

  for (const event of events || []) {
    if (event.event_name === 'view_property') summary.views += 1;
    if (event.event_name === 'contact_whatsapp') summary.whatsapp += 1;
    if (event.event_name === 'generate_lead') summary.leads += 1;
    if (event.session_hash) {
      sessionHashes.add(event.session_hash);
      if (event.event_name === 'contact_whatsapp') contactSessions.add(event.session_hash);
      if (event.event_name === 'generate_lead') leadSessions.add(event.session_hash);
    }

    const date = String(event.created_at || '').slice(0, 10);
    if (date) {
      const item = daily.get(date) || { date, views: 0, whatsapp: 0, leads: 0 };
      if (event.event_name === 'view_property') item.views += 1;
      if (event.event_name === 'contact_whatsapp') item.whatsapp += 1;
      if (event.event_name === 'generate_lead') item.leads += 1;
      daily.set(date, item);
    }

    const sourceName = event.utm_source || event.referrer_host || 'direct';
    const source = sources.get(sourceName) || { source: sourceName, views: 0, whatsapp: 0, leads: 0 };
    if (event.event_name === 'view_property') source.views += 1;
    if (event.event_name === 'contact_whatsapp') source.whatsapp += 1;
    if (event.event_name === 'generate_lead') source.leads += 1;
    sources.set(sourceName, source);

    if (event.property_id) {
      const property = properties.get(event.property_id) || { propertyId: event.property_id, views: 0, whatsapp: 0, leads: 0 };
      if (event.event_name === 'view_property') property.views += 1;
      if (event.event_name === 'contact_whatsapp') property.whatsapp += 1;
      if (event.event_name === 'generate_lead') property.leads += 1;
      properties.set(event.property_id, property);
    }
  }

  summary.sessions = sessionHashes.size;
  summary.contactRate = percentage(contactSessions.size, summary.sessions);
  summary.leadRate = percentage(leadSessions.size, summary.sessions);

  return response.status(200).json({
    configured: true,
    status: 'ready',
    windowDays,
    summary,
    daily: [...daily.values()].sort((a, b) => a.date.localeCompare(b.date)),
    sources: [...sources.values()]
      .sort((a, b) => (b.views + b.whatsapp + b.leads) - (a.views + a.whatsapp + a.leads))
      .slice(0, 12),
    topProperties: [...properties.values()]
      .sort((a, b) => (b.views + b.whatsapp + b.leads) - (a.views + a.whatsapp + a.leads))
      .slice(0, 12),
    sampleLimited: (events || []).length >= 10000,
    generatedAt: new Date().toISOString(),
  });
};
