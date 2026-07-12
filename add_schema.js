const fs = require('fs');

const schemaStr = `
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "RealEstateAgent",
  "name": "Jasmine Group Proje Pazarlama",
  "image": "https://www.jasminegroup.com.tr/images/favicon.jpg",
  "@id": "",
  "url": "https://www.jasminegroup.com.tr/",
  "telephone": "+905330850769",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Oba Mah.Mesut Cad.13.Sok.Best Home Comfort 7.A-Block No:40/18-19",
    "addressLocality": "Alanya",
    "addressRegion": "Antalya",
    "postalCode": "07400",
    "addressCountry": "TR"
  }
}
</script>
`;

let content = fs.readFileSync('index.html', 'utf8');
if (!content.includes('RealEstateAgent')) {
  content = content.replace('</body>', schemaStr + '\n</body>');
  fs.writeFileSync('index.html', content);
  console.log("Schema added.");
} else {
  console.log("Schema already exists.");
}
