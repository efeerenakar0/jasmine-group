const crypto = require('crypto');
const { checkRateLimit } = require('./_lib/rate-limit');
const { configuration, supabaseRequest } = require('./_lib/supabase');

const EVENT_NAMES = new Map([
  ['view_item', 'view_property'],
  ['view_property', 'view_property'],
  ['contact_whatsapp', 'contact_whatsapp'],
  ['generate_lead', 'generate_lead'],
]);

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function safeToken(value, maxLength) {
  const token = clean(value, maxLength);
  return /^[a-z0-9._-]+$/i.test(token) ? token : null;
}

function safePath(value) {
  const pathname = clean(value, 240);
  return /^\/[a-z0-9%_./~-]*$/i.test(pathname) ? pathname : '/';
}

function safeCampaignValue(value, maxLength) {
  const campaign = clean(value, maxLength);
  return campaign && !/[\u0000-\u001f\u007f]/.test(campaign) ? campaign : null;
}

function anonymousSessionHash(sessionId) {
  const salt = process.env.ANALYTICS_PRIVACY_SALT || process.env.LEAD_PRIVACY_SALT;
  const normalized = clean(sessionId, 80);
  if (!salt || !/^[a-z0-9_-]{16,80}$/i.test(normalized)) return null;
  return crypto.createHmac('sha256', salt).update(normalized).digest('hex');
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Yalnızca POST isteği kabul edilir.' });
  }

  const attempt = checkRateLimit(request, 'public-analytics', 120, 10 * 60 * 1000);
  if (!attempt.allowed) {
    response.setHeader('Retry-After', String(attempt.retryAfter));
    return response.status(429).json({ error: 'Ölçüm isteği sınırı aşıldı.' });
  }

  let body;
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : (request.body || {});
  } catch {
    return response.status(400).json({ error: 'Geçersiz istek biçimi.' });
  }

  if (body.consent !== true) {
    return response.status(400).json({ error: 'Analitik onayı doğrulanamadı.' });
  }

  const eventName = EVENT_NAMES.get(clean(body.eventName, 40));
  if (!eventName) {
    return response.status(400).json({ error: 'Desteklenmeyen analitik olayı.' });
  }

  if (!configuration()) {
    return response.status(503).json({ error: 'Analitik veri deposu henüz etkin değil.' });
  }

  const locale = clean(body.locale, 5).toLowerCase();
  const device = clean(body.device, 10).toLowerCase();
  const event = {
    event_name: eventName,
    session_hash: anonymousSessionHash(body.sessionId),
    property_id: safeToken(body.propertyId, 80),
    pathname: safePath(body.pathname),
    locale: ['tr', 'en'].includes(locale) ? locale : 'tr',
    event_source: safeCampaignValue(body.eventSource, 80),
    utm_source: safeCampaignValue(body.utmSource, 120),
    utm_medium: safeCampaignValue(body.utmMedium, 120),
    utm_campaign: safeCampaignValue(body.utmCampaign, 180),
    referrer_host: safeToken(body.referrerHost, 160),
    device: ['desktop', 'tablet', 'mobile'].includes(device) ? device : null,
  };

  try {
    await supabaseRequest('/rest/v1/analytics_events', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify(event),
    });
    return response.status(202).json({ ok: true });
  } catch {
    return response.status(502).json({ error: 'Analitik olayı şu anda kaydedilemedi.' });
  }
};
