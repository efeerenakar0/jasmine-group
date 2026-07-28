const { requireAdmin } = require('../_lib/auth');
const { supabaseRequest } = require('../_lib/supabase');

function clean(value, max = 500) {
  return String(value || '').trim().slice(0, max);
}

function propertyPayload(body) {
  const id = clean(body.id, 80);
  return {
    id: /^[A-Za-z0-9._-]+$/.test(id) ? id : '',
    type: body.type === 'rent' ? 'rent' : 'sale',
    status: ['published', 'draft', 'sold', 'rented'].includes(body.status) ? body.status : 'draft',
    title: clean(body.title, 180),
    location: clean(body.location, 180),
    rooms: clean(body.rooms, 30),
    bathrooms: clean(body.bathrooms, 30),
    area_net: clean(body.area_net, 30),
    area_gross: clean(body.area_gross, 30),
    price_eur: Number(body.price_eur || 0),
    description: clean(body.description || body.desc, 12000),
    badge: clean(body.badge, 50) || null,
    badge_color: ['red', 'blue', 'green'].includes(body.badge_color) ? body.badge_color : null,
    images: Array.isArray(body.images) ? body.images.map(item => clean(item, 1000)).filter(Boolean).slice(0, 40) : [],
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
    const status = error.code === 'SUPABASE_NOT_CONFIGURED' ? 503 : 500;
    return response.status(status).json({ error: status === 503 ? 'Veritabanı henüz yapılandırılmadı.' : 'İlan işlemi tamamlanamadı.' });
  }
};
