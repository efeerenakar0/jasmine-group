const MAX_LENGTHS = {
  name: 100,
  phone: 30,
  email: 120,
  message: 2000,
  source: 80,
  propertyId: 80,
};

function clean(value, maxLength) {
  return String(value || '').trim().slice(0, maxLength);
}

function isValidEmail(value) {
  return !value || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

function isValidPhone(value) {
  return /^[+()\d\s.-]{7,30}$/.test(value);
}

function escapeHtml(value) {
  return value.replace(/[&<>"']/g, (character) => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character]);
}

async function saveToSupabase(lead) {
  const baseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!baseUrl || !serviceKey) return { configured: false, ok: false };

  const response = await fetch(`${baseUrl.replace(/\/$/, '')}/rest/v1/leads`, {
    method: 'POST',
    headers: {
      apikey: serviceKey,
      Authorization: `Bearer ${serviceKey}`,
      'Content-Type': 'application/json',
      Prefer: 'return=minimal',
    },
    body: JSON.stringify(lead),
  });

  return { configured: true, ok: response.ok };
}

async function notifyByEmail(lead) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.LEAD_FROM_EMAIL;
  const to = process.env.LEAD_NOTIFICATION_EMAIL;
  if (!apiKey || !from || !to) return { configured: false, ok: false };

  const lines = [
    ['Kaynak', lead.source],
    ['İlan', lead.property_id || '-'],
    ['Ad soyad', lead.name],
    ['Telefon', lead.phone],
    ['E-posta', lead.email || '-'],
    ['Mesaj', lead.message],
  ];
  const html = lines
    .map(([label, value]) => `<p><strong>${label}:</strong> ${escapeHtml(value)}</p>`)
    .join('');

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from,
      to: [to],
      subject: `Yeni Jasmine Group talebi: ${lead.source}`,
      html,
      reply_to: lead.email || undefined,
    }),
  });

  return { configured: true, ok: response.ok };
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (request.method !== 'POST') {
    response.setHeader('Allow', 'POST');
    return response.status(405).json({ error: 'Yalnızca POST isteği kabul edilir.' });
  }

  let body;
  try {
    body = typeof request.body === 'string' ? JSON.parse(request.body || '{}') : (request.body || {});
  } catch {
    return response.status(400).json({ error: 'Geçersiz istek biçimi.' });
  }
  if (clean(body.website, 200)) {
    return response.status(200).json({ ok: true });
  }

  const lead = {
    name: clean(body.name, MAX_LENGTHS.name),
    phone: clean(body.phone, MAX_LENGTHS.phone),
    email: clean(body.email, MAX_LENGTHS.email).toLowerCase(),
    message: clean(body.message, MAX_LENGTHS.message),
    source: clean(body.source, MAX_LENGTHS.source) || 'website',
    property_id: clean(body.propertyId, MAX_LENGTHS.propertyId) || null,
    consent: body.consent === true,
    page_url: clean(body.pageUrl, 500) || null,
  };

  if (lead.name.length < 2 || !isValidPhone(lead.phone) || lead.message.length < 5 || !lead.consent || !isValidEmail(lead.email)) {
    return response.status(400).json({ error: 'Lütfen zorunlu alanları geçerli bilgilerle doldurun.' });
  }

  const results = await Promise.allSettled([saveToSupabase(lead), notifyByEmail(lead)]);
  const providers = results
    .filter((result) => result.status === 'fulfilled')
    .map((result) => result.value);
  const configured = providers.some((provider) => provider.configured);
  const delivered = providers.some((provider) => provider.configured && provider.ok);

  if (!configured) {
    return response.status(503).json({ error: 'Talep sistemi henüz etkinleştirilmedi. Lütfen WhatsApp veya telefon ile ulaşın.' });
  }
  if (!delivered) {
    return response.status(502).json({ error: 'Talep şu anda iletilemedi. Lütfen WhatsApp veya telefon ile ulaşın.' });
  }

  return response.status(201).json({ ok: true, message: 'Talebiniz alındı. Ekibimiz en kısa sürede sizinle iletişime geçecek.' });
};
