const { requireAdmin } = require('../_lib/auth');
const { configuration, supabaseRequest } = require('../_lib/supabase');

function configured(...names) {
  return names.every(name => Boolean(String(process.env[name] || '').trim()));
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (!requireAdmin(request, response)) return;
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Yalnızca GET isteği kabul edilir.' });
  }

  const supabaseConfigured = Boolean(configuration());
  let databaseReachable = false;
  let analyticsReachable = false;
  let databaseMessage = supabaseConfigured ? 'Bağlantı kontrol ediliyor.' : 'Supabase değişkenleri eksik.';

  if (supabaseConfigured) {
    const checks = await Promise.allSettled([
      supabaseRequest('/rest/v1/properties?select=id&limit=1'),
      supabaseRequest('/rest/v1/leads?select=id&limit=1'),
      supabaseRequest('/rest/v1/analytics_events?select=id&limit=1'),
    ]);
    databaseReachable = checks.slice(0, 2).every(check => check.status === 'fulfilled');
    analyticsReachable = checks[2].status === 'fulfilled';
    databaseMessage = databaseReachable
      ? 'İlan ve CRM tablolarına erişim doğrulandı.'
      : 'Supabase erişimi veya tablo kurulumu doğrulanamadı.';
  }

  const services = [
    {
      id: 'admin',
      label: 'Güvenli admin oturumu',
      status: configured('ADMIN_EMAIL', 'ADMIN_PASSWORD_HASH', 'ADMIN_SESSION_SECRET') ? 'ready' : 'missing',
      detail: 'E-posta, parola hash’i ve imza anahtarı',
    },
    {
      id: 'database',
      label: 'Supabase veritabanı',
      status: databaseReachable ? 'ready' : (supabaseConfigured ? 'error' : 'missing'),
      detail: databaseMessage,
    },
    {
      id: 'media',
      label: 'Medya depolama',
      status: supabaseConfigured && configured('SUPABASE_MEDIA_BUCKET') ? 'ready' : 'missing',
      detail: configured('SUPABASE_MEDIA_BUCKET') ? 'Storage bucket adı tanımlı.' : 'SUPABASE_MEDIA_BUCKET eksik.',
    },
    {
      id: 'email',
      label: 'E-posta bildirimi',
      status: configured('RESEND_API_KEY', 'LEAD_FROM_EMAIL', 'LEAD_NOTIFICATION_EMAIL') ? 'ready' : 'missing',
      detail: 'Resend anahtarı, doğrulanmış gönderici ve bildirim adresi',
    },
    {
      id: 'privacy',
      label: 'Talep gizlilik koruması',
      status: configured('LEAD_PRIVACY_SALT') ? 'ready' : 'missing',
      detail: 'IP değerleri yalnızca tek yönlü hash olarak tutulur.',
    },
    {
      id: 'first-party-analytics',
      label: 'Birinci taraf dönüşüm ölçümü',
      status: analyticsReachable ? 'ready' : (supabaseConfigured ? 'error' : 'missing'),
      detail: analyticsReachable ? 'Onaylı olay deposuna erişim doğrulandı.' : 'analytics_events tablosu veya Supabase bağlantısı bekliyor.',
    },
    {
      id: 'external-analytics',
      label: 'Harici analitik ve reklam',
      status: configured('PUBLIC_GA4_ID') || configured('PUBLIC_GTM_ID') || configured('PUBLIC_META_PIXEL_ID') ? 'ready' : 'optional',
      detail: 'GA4, GTM veya Meta Pixel kimliklerinden en az biri',
    },
  ];

  const required = services.filter(service => service.status !== 'optional');
  const ready = required.filter(service => service.status === 'ready').length;
  return response.status(200).json({
    services,
    summary: {
      ready,
      total: required.length,
      productionReady: ready === required.length,
    },
    checkedAt: new Date().toISOString(),
  });
};
