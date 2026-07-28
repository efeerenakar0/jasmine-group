const { requireAdmin } = require('../_lib/auth');
const { configuration, supabaseRequest } = require('../_lib/supabase');

function clean(value, max = 500) {
  return String(value || '').trim().slice(0, max);
}

function optionalNumber(value, minimum, maximum) {
  if (value === '' || value === null || value === undefined) return null;
  const number = Number(value);
  return Number.isFinite(number) && number >= minimum && number <= maximum ? number : null;
}

function approvedImageUrl(value) {
  const image = clean(value, 1000);
  if (/^\/?images\/[a-z0-9._/-]+$/i.test(image)) {
    const segments = image.replace(/^\//, '').split('/');
    return segments.length > 1 && segments.every(segment => segment && segment !== '.' && segment !== '..');
  }
  const config = configuration();
  if (!config) return false;
  try {
    const imageUrl = new URL(image);
    const projectUrl = new URL(config.url);
    const bucket = String(process.env.SUPABASE_MEDIA_BUCKET || 'property-media').replace(/[^a-zA-Z0-9_-]/g, '');
    const prefix = `/storage/v1/object/public/${bucket}/`;
    if (imageUrl.origin !== projectUrl.origin || !imageUrl.pathname.startsWith(prefix)) return false;
    const objectSegments = decodeURIComponent(imageUrl.pathname.slice(prefix.length)).split('/');
    return objectSegments.every(segment => segment && segment !== '.' && segment !== '..');
  } catch {
    return false;
  }
}

function propertyPayload(body) {
  const id = clean(body.id, 80);
  const images = Array.isArray(body.images) ? body.images.map(item => clean(item, 1000)).filter(Boolean).slice(0, 40) : [];
  const rejectedImages = images.filter(image => !approvedImageUrl(image));
  if (rejectedImages.length) {
    const error = new Error('Yalnızca Jasmine görselleri veya yapılandırılmış Supabase medya bağlantıları kullanılabilir.');
    error.code = 'INVALID_IMAGE_URL';
    throw error;
  }
  return {
    id: /^[A-Za-z0-9._-]+$/.test(id) ? id : '',
    type: body.type === 'rent' ? 'rent' : 'sale',
    status: ['published', 'draft', 'sold', 'rented'].includes(body.status) ? body.status : 'draft',
    category: ['apartment', 'villa', 'land', 'commercial'].includes(body.category) ? body.category : null,
    market_status: ['new', 'resale', 'under_construction'].includes(body.market_status) ? body.market_status : null,
    title: clean(body.title, 180),
    location: clean(body.location, 180),
    rooms: clean(body.rooms, 30),
    bathrooms: clean(body.bathrooms, 30),
    area_net: clean(body.area_net, 30),
    area_gross: clean(body.area_gross, 30),
    floor: clean(body.floor, 30) || null,
    year_built: optionalNumber(body.year_built, 1800, 2100),
    furnished_status: ['furnished', 'unfurnished', 'optional'].includes(body.furnished_status) ? body.furnished_status : null,
    heating: clean(body.heating, 80) || null,
    distance_sea_m: optionalNumber(body.distance_sea_m, 0, 100000),
    distance_airport_km: optionalNumber(body.distance_airport_km, 0, 10000),
    price_eur: Number(body.price_eur || 0),
    description: clean(body.description || body.desc, 12000),
    badge: clean(body.badge, 50) || null,
    badge_color: ['red', 'blue', 'green'].includes(body.badge_color) ? body.badge_color : null,
    images,
    features: Array.isArray(body.features) ? body.features.map(item => clean(item, 100)).filter(Boolean).slice(0, 80) : [],
    updated_at: new Date().toISOString(),
  };
}

module.exports = async function handler(request, response) {
  response.setHeader('Cache-Control', 'no-store');
  if (!requireAdmin(request, response)) return;

  try {
    if (request.method === 'GET') {
      const properties = await supabaseRequest('/rest/v1/properties?select=*&order=updated_at.desc');
      return response.status(200).json({ properties });
    }

    if (request.method === 'POST') {
      const property = propertyPayload(request.body || {});
      if (!property.id || !property.title || !property.location || property.price_eur <= 0) {
        return response.status(400).json({ error: 'İlan kodu, başlık, konum ve fiyat zorunludur.' });
      }
      const created = await supabaseRequest('/rest/v1/properties', {
        method: 'POST',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(property),
      });
      return response.status(201).json({ property: created?.[0] || property });
    }

    if (request.method === 'PATCH') {
      const id = clean(request.query?.id, 80);
      if (!id) return response.status(400).json({ error: 'İlan kodu gerekli.' });
      const property = propertyPayload({ ...request.body, id });
      delete property.id;
      const updated = await supabaseRequest(`/rest/v1/properties?id=eq.${encodeURIComponent(id)}`, {
        method: 'PATCH',
        headers: { Prefer: 'return=representation' },
        body: JSON.stringify(property),
      });
      return response.status(200).json({ property: updated?.[0] || property });
    }

    if (request.method === 'DELETE') {
      const id = clean(request.query?.id, 80);
      if (!id) return response.status(400).json({ error: 'İlan kodu gerekli.' });
      await supabaseRequest(`/rest/v1/properties?id=eq.${encodeURIComponent(id)}`, {
        method: 'DELETE',
        headers: { Prefer: 'return=minimal' },
      });
      return response.status(200).json({ ok: true });
    }

    response.setHeader('Allow', 'GET, POST, PATCH, DELETE');
    return response.status(405).json({ error: 'Desteklenmeyen istek.' });
  } catch (error) {
    const status = error.code === 'SUPABASE_NOT_CONFIGURED' ? 503 : (error.code === 'INVALID_IMAGE_URL' ? 400 : 500);
    const message = status === 503
      ? 'Veritabanı henüz yapılandırılmadı.'
      : (status === 400 ? error.message : 'İlan işlemi tamamlanamadı.');
    return response.status(status).json({ error: message });
  }
};
