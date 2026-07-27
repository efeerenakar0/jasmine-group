const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const filesToCopy = new Set(['404.html', 'blog-detail.html', 'blog.html', 'buy.html', 'buying-guide.html', 'contact.html', 'corporate.html', 'index.html', 'listings.html', 'property-detail.html', 'rent.html', 'sell.html', 'privacy.html', 'kvkk.html', 'terms.html', 'cookie-policy.html', 'style.css', 'script.js', 'blogs.json', 'robots.txt', 'sitemap.xml']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of filesToCopy) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

fs.cpSync(path.join(root, 'images'), path.join(output, 'images'), { recursive: true });
fs.mkdirSync(path.join(output, 'admin'), { recursive: true });
fs.copyFileSync(path.join(root, 'admin', 'data.json'), path.join(output, 'admin', 'data.json'));
fs.copyFileSync(path.join(root, 'admin', 'blogs.json'), path.join(output, 'admin', 'blogs.json'));

console.log('Static Vercel deployment created in dist/.');
