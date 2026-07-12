const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('<link rel="icon"')) {
    content = content.replace('</head>', '  <link rel="icon" type="image/jpeg" href="images/logo.jpg">\n</head>');
    fs.writeFileSync(file, content);
  }
}
console.log("Favicon added to all HTML files.");
