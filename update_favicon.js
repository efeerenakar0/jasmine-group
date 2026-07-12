const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/href="images\/logo\.jpg"/g, 'href="images/favicon.jpg"');
  fs.writeFileSync(file, content);
}
console.log("Favicon updated in all HTML files.");
