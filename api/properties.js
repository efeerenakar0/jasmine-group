const fs = require('fs');
const path = require('path');
const { configuration, supabaseRequest } = require('./_lib/supabase');

function readFallbackProperties() {
  const file = path.join(process.cwd(), 'admin', 'data.json');
  return JSON.parse(fs.readFileSync(file, 'utf8')).properties || [];
}

function normalize(value) {
  return String(value || '').toLocaleLowerCase('tr-TR');
}

function filterProperties(properties, query) {
  const type = normalize(query.type);
  const location = normalize(query.location);
  const rooms = normalize(query.rooms);
  const keyword = normalize(query.q);
  const min = Number(query.min || 0);
  const max = Number(query.max || Number.MAX_SAFE_INTEGER);

  const filtered = properties.filter(property => {
    const haystack = normalize(`${property.title} ${property.location} ${property.description || property.desc || ''} ${(property.features || []).join(' ')}`);
    return (!type || type === normalize(property.type))
      && (!location || normalize(property.location).includes(location))
      && (!rooms || normalize(property.rooms) === rooms)
      && (!keyword || haystack.includes(keyword))
      && Number(property.price_eur || 0) >= min
      && Number(property.price_eur || 0) <= max
      && (!property.status || property.status === 'published');
  });

  const sort = query.sort || 'newest';
  filtered.sort((left, right) => {
    if (sort === 'price-asc') return Number(left.price_eur) - Number(right.price_eur);
    if (sort === 'price-desc') return Number(right.price_eur) - Number(left.price_eur);
    return String(right.created_at || right.id).localeCompare(String(left.created_at || left.id));
  });
  return filtered;
}

module.exports = async function handler(request, response) {
  if (request.method !== 'GET') {
    response.setHeader('Allow', 'GET');
    return response.status(405).json({ error: 'Yalnızca GET isteği kabul edilir.' });
  }

  try {
    const properties = configuration()
      ? await supabaseRequest('/rest/v1/properties?select=*&order=created_at.desc')
      : readFallbackProperties();
    const filtered = filterProperties(properties, request.query || {});
    const page = Math.max(1, Number(request.query?.page || 1));
    const limit = Math.min(500, Math.max(1, Number(request.query?.limit || 24)));
    const start = (page - 1) * limit;

    response.setHeader('Cache-Control', 'public, max-age=30, s-maxage=60, stale-while-revalidate=300');
    return response.status(200).json({
      properties: filtered.slice(start, start + limit),
      pagination: { page, limit, total: filtered.length, pages: Math.max(1, Math.ceil(filtered.length / limit)) },
      source: configuration() ? 'database' : 'static-fallback',
    });
  } catch {
    return response.status(500).json({ error: 'İlanlar şu anda yüklenemiyor.' });
  }
};
