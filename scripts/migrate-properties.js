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
const properties = (source.properties || []).map(property => ({
  id: property.id,
  type: property.type === 'rent' ? 'rent' : 'sale',
  status: 'published',
  title: property.title,
  location: property.location,
  rooms: property.rooms || null,
  bathrooms: property.bathrooms || null,
  area_net: property.area_net || null,
  area_gross: property.area_gross || null,
  price_eur: Number(property.price_eur || 0),
  description: String(property.desc || '').trim(),
  badge: property.badge || null,
  badge_color: property.badge_color || null,
  images: (property.images || []).filter(item => !/^https?:\/\//i.test(item)),
  features: property.features || [],
}));

if (!apply) {
  console.log(`Dry run: ${properties.length} properties are ready. Re-run with --apply to upload.`);
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
