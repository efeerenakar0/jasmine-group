const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const filesToCopy = new Set(['404.html', 'admin-login.html', 'admin.html', 'admin-login.js', 'admin.js', 'admin.css', 'blog-detail.html', 'blog.html', 'buy.html', 'buying-guide.html', 'contact.html', 'corporate.html', 'customer-stories.html', 'index.html', 'property-detail.html', 'regions.html', 'rent.html', 'sell.html', 'services.html', 'team.html', 'privacy.html', 'kvkk.html', 'terms.html', 'cookie-policy.html', 'style.css', 'script.js', 'blogs.json', 'robots.txt', 'sitemap.xml']);

fs.rmSync(output, { recursive: true, force: true });
fs.mkdirSync(output, { recursive: true });

for (const file of filesToCopy) {
  fs.copyFileSync(path.join(root, file), path.join(output, file));
}

fs.cpSync(path.join(root, 'images'), path.join(output, 'images'), { recursive: true });
fs.cpSync(path.join(root, 'en'), path.join(output, 'en'), { recursive: true });
fs.mkdirSync(path.join(output, 'admin'), { recursive: true });
fs.copyFileSync(path.join(root, 'admin', 'data.json'), path.join(output, 'admin', 'data.json'));

function escapeHtml(value) {
  return String(value || '').replace(/[&<>"']/g, character => ({
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#039;',
  })[character]);
}

function isoDate(turkishDate) {
  const months = {
    Ocak: '01', Şubat: '02', Mart: '03', Nisan: '04', Mayıs: '05', Haziran: '06',
    Temmuz: '07', Ağustos: '08', Eylül: '09', Ekim: '10', Kasım: '11', Aralık: '12',
  };
  const [day, month, year] = String(turkishDate || '').split(' ');
  return year && months[month] ? `${year}-${months[month]}-${String(day).padStart(2, '0')}` : '2026-07-27';
}

const blogs = JSON.parse(fs.readFileSync(path.join(root, 'blogs.json'), 'utf8'));
const blogTemplate = fs.readFileSync(path.join(root, 'blog-detail.html'), 'utf8');
const blogOutput = path.join(output, 'blog');
fs.mkdirSync(blogOutput, { recursive: true });

for (const blog of blogs) {
  const canonical = `https://jasmine-group.vercel.app/blog/${encodeURIComponent(blog.id)}.html`;
  const absoluteImage = `https://jasmine-group.vercel.app/${blog.image}`;
  const article = `
  <article class="blog-static-article">
    <a href="blog.html" class="blog-back-link"><i class="fa-solid fa-arrow-left"></i> Tüm rehberler</a>
    <header>
      <span>${escapeHtml(blog.category)}</span>
      <h1>${escapeHtml(blog.title)}</h1>
      <p>${escapeHtml(blog.excerpt)}</p>
      <time datetime="${isoDate(blog.date)}">${escapeHtml(blog.date)}</time>
    </header>
    <img class="blog-static-cover" src="${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}" />
    <div class="blog-static-content">${blog.content}</div>
    <aside class="blog-static-note">
      <strong>Önemli not</strong>
      <p>Bu içerik genel bilgilendirme amacı taşır. Güncel hukuki, mali ve teknik koşulları yetkili uzmanlarla doğrulayın.</p>
      <a href="contact.html">Kriterlerinizi paylaşın <i class="fa-solid fa-arrow-right"></i></a>
    </aside>
  </article>`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: absoluteImage,
    datePublished: isoDate(blog.date),
    dateModified: '2026-07-27',
    author: { '@type': 'Organization', name: 'Jasmine Group' },
    publisher: {
      '@type': 'Organization',
      name: 'Jasmine Group',
      logo: { '@type': 'ImageObject', url: 'https://jasmine-group.vercel.app/images/logo.jpg' },
    },
    mainEntityOfPage: canonical,
  };

  let page = blogTemplate
    .replace('<head>', '<head>\n  <base href="../" />')
    .replace('<body>', '<body data-static-blog="true">')
    .replace(/<title>[^<]*<\/title>/, `<title>${escapeHtml(blog.title)} | Jasmine Group</title>`)
    .replace(/<meta name="description" content="[^"]*" \/>/, `<meta name="description" content="${escapeHtml(blog.excerpt)}" />`)
    .replace(/<meta property="og:title" content="[^"]*" \/>/, `<meta property="og:title" content="${escapeHtml(blog.title)}" />`)
    .replace(/<meta property="og:description" content="[^"]*" \/>/, `<meta property="og:description" content="${escapeHtml(blog.excerpt)}" />`)
    .replace(/<meta property="og:image" content="[^"]*" \/>/, `<meta property="og:image" content="${absoluteImage}" />`)
    .replace(/<meta property="og:url" content="[^"]*" \/>/, `<meta property="og:url" content="${canonical}" />`)
    .replace(/<meta property="og:type" content="[^"]*" \/>/, '<meta property="og:type" content="article" />')
    .replace(/<meta name="twitter:title" content="[^"]*" \/>/, `<meta name="twitter:title" content="${escapeHtml(blog.title)}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*" \/>/, `<meta name="twitter:description" content="${escapeHtml(blog.excerpt)}" />`)
    .replace(/<meta name="twitter:image" content="[^"]*" \/>/, `<meta name="twitter:image" content="${absoluteImage}" />`)
    .replace(/<link rel="canonical" href="[^"]*" \/>/, `<link rel="canonical" href="${canonical}" />`)
    .replace(
      '  <div class="container" id="blog-detail-container">\n    <div style="text-align:center; padding:50px;"><i class="fa-solid fa-spinner fa-spin fa-3x"></i><p style="margin-top:20px;">Blog Yükleniyor...</p></div>\n  </div>',
      `  <div class="container" id="blog-detail-container">${article}</div>`,
    )
    .replace('</head>', `  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n</head>`);

  fs.writeFileSync(path.join(blogOutput, `${blog.id}.html`), page);
}

const sitemapPath = path.join(output, 'sitemap.xml');
const blogSitemapEntries = blogs.map(blog => `  <url>
    <loc>https://jasmine-group.vercel.app/blog/${encodeURIComponent(blog.id)}.html</loc>
    <lastmod>${isoDate(blog.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');
fs.writeFileSync(
  sitemapPath,
  fs.readFileSync(sitemapPath, 'utf8').replace('</urlset>', `${blogSitemapEntries}\n</urlset>`),
);

const analyticsConfig = {
  ga4Id: process.env.PUBLIC_GA4_ID || '',
  gtmId: process.env.PUBLIC_GTM_ID || '',
  metaPixelId: process.env.PUBLIC_META_PIXEL_ID || '',
};
fs.writeFileSync(
  path.join(output, 'analytics-config.js'),
  `window.JASMINE_ANALYTICS = ${JSON.stringify(analyticsConfig)};\n`,
);

console.log('Static Vercel deployment created in dist/.');
