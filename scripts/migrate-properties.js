const fs = require('fs');
const path = require('path');

const url = String(process.env.SUPABASE_URL || '').replace(/\/$/, '');
const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
const apply = process.argv.includes('--apply');

if (!url || !key) {
  console.error('SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are required.');
  process.exit(1);
}

const source = JSON.parse(fs.readFileSync(path.join(__dirname, '..', 'admin', 'data.json'), 'utf8'));
function categoryFor(property) {
  if (['apartment', 'villa', 'land', 'commercial'].includes(property.category)) return property.category;
  const title = String(property.title || '').toLocaleLowerCase('tr-TR');
  if (title.includes('villa')) return 'villa';
  if (title.includes('arsa')) return 'land';
  if (title.includes('ticari') || title.includes('dükkan') || title.includes('ofis')) return 'commercial';
  return 'apartment';
}

const seenIds = new Set();
const properties = (source.properties || []).filter(property => {
  const id = String(property.id || '');
  if (!/^[A-Za-z0-9._-]+$/.test(id) || seenIds.has(id)) return false;
  seenIds.add(id);
  return true;
}).map(property => ({
  id: property.id,
  type: property.type === 'rent' ? 'rent' : 'sale',
  status: 'published',
  category: categoryFor(property),
  market_status: ['new', 'resale', 'under_construction'].includes(property.market_status) ? property.market_status : null,
  title: property.title,
  location: property.location,
  rooms: property.rooms || null,
  bathrooms: property.bathrooms || null,
  area_net: property.area_net || null,
  area_gross: property.area_gross || null,
  floor: property.floor || null,
  year_built: property.year_built || null,
  furnished_status: ['furnished', 'unfurnished', 'optional'].includes(property.furnished_status) ? property.furnished_status : null,
  heating: property.heating || null,
  distance_sea_m: property.distance_sea_m ?? null,
  distance_airport_km: property.distance_airport_km ?? null,
  price_eur: Number(property.price_eur || 0),
  description: String(property.desc || '').trim(),
  badge: property.badge || null,
  badge_color: property.badge_color || null,
  images: (property.images || []).filter(item => !/^https?:\/\//i.test(item)),
  features: property.features || [],
}));

if (!apply) {
  const skipped = (source.properties || []).length - properties.length;
  console.log(`Dry run: ${properties.length} unique properties are ready${skipped ? `; ${skipped} invalid or duplicate records skipped` : ''}. Re-run with --apply to upload.`);
  process.exit(0);
}

(async () => {
  const response = await fetch(`${url}/rest/v1/properties?on_conflict=id`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: `Bearer ${key}`,
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates,return=minimal',
    },
    body: JSON.stringify(properties),
  });
  if (!response.ok) {
    console.error(`Migration failed (${response.status}): ${await response.text()}`);
    process.exit(1);
  }
  console.log(`Migrated ${properties.length} properties to Supabase.`);
})();
