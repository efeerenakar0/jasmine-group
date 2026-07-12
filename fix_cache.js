const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html'));
const ts = new Date().getTime();
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<script src="script\.js\?v=\d+"/g, `<script src="script.js?v=${ts}"`);
  fs.writeFileSync(file, content);
}
console.log("Done");
