const fs = require('fs');
const path = require('path');
const { assetVersion, pages: englishPages, shell: englishShell } = require('./generate-english-pages');

const root = path.resolve(__dirname, '..');
const output = path.join(root, 'dist');
const filesToCopy = new Set(['404.html', 'admin-login.html', 'admin.html', 'admin-login.js', 'admin.js', 'admin.css', 'blog-detail.html', 'blog.html', 'buy.html', 'buying-guide.html', 'contact.html', 'corporate.html', 'customer-stories.html', 'index.html', 'property-detail.html', 'regions.html', 'rent.html', 'sell.html', 'services.html', 'team.html', 'privacy.html', 'kvkk.html', 'terms.html', 'cookie-policy.html', 'style.css', 'script.js', 'blogs.json', 'blogs-en.json', 'robots.txt', 'sitemap.xml']);

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

function isoEnglishDate(englishDate) {
  const parsed = new Date(String(englishDate || ''));
  return Number.isNaN(parsed.getTime()) ? '2026-07-28' : parsed.toISOString().slice(0, 10);
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
    .replace(
      '</head>',
      `  <link rel="alternate" hreflang="tr" href="${canonical}" />\n  <link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/blog/${encodeURIComponent(blog.id)}.html" />\n  <script type="application/ld+json">${JSON.stringify(schema)}</script>\n</head>`,
    );

  fs.writeFileSync(path.join(blogOutput, `${blog.id}.html`), page);
}

const englishBlogs = JSON.parse(fs.readFileSync(path.join(root, 'blogs-en.json'), 'utf8'));
const englishBlogOutput = path.join(output, 'en', 'blog');
fs.mkdirSync(englishBlogOutput, { recursive: true });

for (const blog of englishBlogs) {
  const canonical = `https://jasmine-group.vercel.app/en/blog/${encodeURIComponent(blog.id)}.html`;
  const absoluteImage = `https://jasmine-group.vercel.app/${blog.image}`;
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: blog.title,
    description: blog.excerpt,
    image: absoluteImage,
    datePublished: isoEnglishDate(blog.date),
    dateModified: '2026-07-28',
    inLanguage: 'en',
    author: { '@type': 'Organization', name: 'Jasmine Group' },
    publisher: {
      '@type': 'Organization',
      name: 'Jasmine Group',
      logo: { '@type': 'ImageObject', url: 'https://jasmine-group.vercel.app/images/logo.jpg' },
    },
    mainEntityOfPage: canonical,
  };
  const content = `<section class="container content-section"><article class="blog-static-article">
    <a href="blog.html" class="blog-back-link"><i class="fa-solid fa-arrow-left"></i> All guides</a>
    <header><span>${escapeHtml(blog.category)}</span><h1>${escapeHtml(blog.title)}</h1><p>${escapeHtml(blog.excerpt)}</p><time datetime="${isoEnglishDate(blog.date)}">${escapeHtml(blog.date)}</time></header>
    <img class="blog-static-cover" src="../${escapeHtml(blog.image)}" alt="${escapeHtml(blog.title)}" />
    <div class="blog-static-content">${blog.content}</div>
    <aside class="blog-static-note"><strong>Important note</strong><p>This guide is general information. Confirm current legal, financial and technical requirements with the relevant authorities and licensed professionals.</p><a href="contact.html">Share your criteria <i class="fa-solid fa-arrow-right"></i></a></aside>
  </article></section>`;
  const page = englishShell({
    file: `blog/${blog.id}.html`,
    turkishPath: `blog/${blog.id}.html`,
    active: 'blog',
    title: `${blog.title} | Jasmine Group`,
    description: blog.excerpt,
    content,
    schema,
  }).replace('<head>', '<head>\n  <base href="../" />');
  fs.writeFileSync(path.join(englishBlogOutput, `${blog.id}.html`), page);
}

const regions = JSON.parse(fs.readFileSync(path.join(root, 'regions-content.json'), 'utf8'));
const fallbackProperties = JSON.parse(fs.readFileSync(path.join(root, 'admin', 'data.json'), 'utf8')).properties || [];
const turkishRegionOutput = path.join(output, 'regions');
const englishRegionOutput = path.join(output, 'en', 'regions');
fs.mkdirSync(turkishRegionOutput, { recursive: true });
fs.mkdirSync(englishRegionOutput, { recursive: true });

function normalizedTurkish(value) {
  return String(value || '').toLocaleLowerCase('tr-TR');
}

function currentRegionCount(region) {
  const location = normalizedTurkish(region.location);
  return fallbackProperties.filter(property => (
    (!property.status || property.status === 'published')
    && normalizedTurkish(property.location).includes(location)
  )).length;
}

function regionFaq(region, locale) {
  if (locale === 'en') {
    return [
      {
        question: `Who should consider ${region.enName}?`,
        answer: region.fitEn,
      },
      {
        question: `How should properties in ${region.enName} be compared?`,
        answer: `${region.housingEn} Price, availability and property-specific documentation should be reconfirmed before a decision.`,
      },
      {
        question: `What should be checked during a ${region.enName} viewing?`,
        answer: region.checksEn.join(' '),
      },
    ];
  }
  return [
    {
      question: `${region.name} kimler için uygun olabilir?`,
      answer: region.fitTr,
    },
    {
      question: `${region.name} portföyleri nasıl karşılaştırılmalı?`,
      answer: `${region.housingTr} Karar öncesinde fiyat, müsaitlik ve ilana özel belgeler yeniden teyit edilmelidir.`,
    },
    {
      question: `${region.name} bölge ziyaretinde neler kontrol edilmeli?`,
      answer: region.checksTr.join(' '),
    },
  ];
}

function regionSchemas(region, locale, count) {
  const english = locale === 'en';
  const pageUrl = english
    ? `https://jasmine-group.vercel.app/en/regions/${region.slug}.html`
    : `https://jasmine-group.vercel.app/regions/${region.slug}.html`;
  const hubUrl = english
    ? 'https://jasmine-group.vercel.app/en/regions.html'
    : 'https://jasmine-group.vercel.app/regions.html';
  const faq = regionFaq(region, locale);
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      name: english ? `${region.enName} Area Guide` : `${region.name} Bölge Rehberi`,
      description: english ? region.summaryEn : region.summaryTr,
      url: pageUrl,
      inLanguage: english ? 'en' : 'tr',
      about: {
        '@type': 'Place',
        name: `${english ? region.enName : region.name}, Alanya, Antalya`,
      },
      mainEntity: {
        '@type': 'ItemList',
        name: english ? `Current properties in ${region.enName}` : `${region.name} güncel portföyleri`,
        numberOfItems: count,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: english ? 'Home' : 'Ana Sayfa', item: english ? 'https://jasmine-group.vercel.app/en/' : 'https://jasmine-group.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: english ? 'Areas' : 'Bölgeler', item: hubUrl },
        { '@type': 'ListItem', position: 3, name: english ? region.enName : region.name, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];
}

function relatedRegions(region, locale) {
  const index = regions.findIndex(item => item.slug === region.slug);
  return [1, 2, 3].map(offset => regions[(index + offset) % regions.length]).map(item => {
    const name = locale === 'en' ? item.enName : item.name;
    const label = locale === 'en' ? 'Explore area' : 'Bölgeyi keşfet';
    return `<a href="regions/${item.slug}.html"><span>${escapeHtml(name)}</span><small>${escapeHtml(locale === 'en' ? item.summaryEn : item.summaryTr)}</small><strong>${label} <i class="fa-solid fa-arrow-right"></i></strong></a>`;
  }).join('');
}

function regionPageContent(region, locale, count) {
  const english = locale === 'en';
  const name = english ? region.enName : region.name;
  const kicker = english ? region.kickerEn : region.kickerTr;
  const summary = english ? region.summaryEn : region.summaryTr;
  const lifestyle = english ? region.lifestyleEn : region.lifestyleTr;
  const housing = english ? region.housingEn : region.housingTr;
  const fit = english ? region.fitEn : region.fitTr;
  const tags = english ? region.tagsEn : region.tagsTr;
  const checks = english ? region.checksEn : region.checksTr;
  const faq = regionFaq(region, locale);
  const locationQuery = encodeURIComponent(region.location);
  const image = english ? `../${region.image}` : region.image;
  return `<section class="region-detail-hero"><div class="container region-detail-hero-grid"><div><a class="breadcrumb-link" href="regions.html"><i class="fa-solid fa-arrow-left"></i> ${english ? 'All area guides' : 'Tüm bölge rehberleri'}</a><p class="section-kicker">${escapeHtml(kicker)}</p><h1>${escapeHtml(name)} ${english ? 'Area Guide' : 'Bölge Rehberi'}</h1><p>${escapeHtml(summary)}</p><div class="region-tags">${tags.map(tag => `<span>${escapeHtml(tag)}</span>`).join('')}</div><div class="region-detail-actions"><a href="buy.html?loc=${locationQuery}">${english ? 'View properties for sale' : 'Satılık portföyleri gör'}</a><a href="contact.html">${english ? 'Ask an area advisor' : 'Bölge danışmanına sor'}</a></div></div><figure><img src="${escapeHtml(image)}" alt="${escapeHtml(name)} ${english ? 'area guide' : 'bölge rehberi'}"><figcaption>${english ? 'Area guide visual · Request property-specific verified media from an advisor.' : 'Bölge rehberi görseli · İlana özel doğrulanmış medyayı danışmandan isteyin.'}</figcaption></figure></div></section>
  <section class="region-proof-strip"><div class="container"><div><small>${english ? 'CURRENT JASMINE COLLECTION' : 'GÜNCEL JASMINE SEÇKİSİ'}</small><strong><span data-region-count="${escapeHtml(region.location)}">${count}</span> ${english ? 'properties' : 'portföy'}</strong></div><p>${english ? 'The counter follows published sale and rental listings. Price and availability require advisor confirmation.' : 'Sayaç yayındaki satılık ve kiralık ilanları izler. Fiyat ve müsaitlik danışman teyidine tabidir.'}</p><a href="buy.html?loc=${locationQuery}">${english ? 'Open filtered collection' : 'Filtrelenmiş seçkiyi aç'} <i class="fa-solid fa-arrow-right"></i></a></div></section>
  <section class="container region-decision-section"><div class="section-heading"><div><p class="section-kicker">${english ? 'AREA DECISION FILE' : 'BÖLGE KARAR DOSYASI'}</p><h2>${english ? `Understand ${escapeHtml(name)} beyond the listing cards.` : `${escapeHtml(name)} bölgesini ilan kartlarının ötesinde anlayın.`}</h2></div></div><div class="region-decision-grid"><article><span>01</span><i class="fa-solid fa-person-walking"></i><h3>${english ? 'Daily life' : 'Günlük yaşam'}</h3><p>${escapeHtml(lifestyle)}</p></article><article><span>02</span><i class="fa-solid fa-building"></i><h3>${english ? 'Housing profile' : 'Konut profili'}</h3><p>${escapeHtml(housing)}</p></article><article><span>03</span><i class="fa-solid fa-user-check"></i><h3>${english ? 'Who it may suit' : 'Kimlere uygun olabilir?'}</h3><p>${escapeHtml(fit)}</p></article></div></section>
  <section class="region-checklist-band"><div class="container region-checklist-grid"><div><p class="section-kicker">${english ? 'VIEWING CHECKLIST' : 'BÖLGE ZİYARETİ KONTROLÜ'}</p><h2>${english ? 'Verify the details that change daily life.' : 'Günlük yaşamı değiştiren ayrıntıları yerinde doğrulayın.'}</h2><p>${english ? 'A district name is only the starting point. Use the viewing to test the exact street, route and building conditions.' : 'Mahalle adı yalnızca başlangıçtır. Ziyareti gerçek sokak, rota ve bina koşullarını sınamak için kullanın.'}</p></div><ol>${checks.map((check, index) => `<li><span>0${index + 1}</span><p>${escapeHtml(check)}</p></li>`).join('')}</ol></div></section>
  <section class="container region-faq"><div class="section-heading"><div><p class="section-kicker">${english ? 'AREA QUESTIONS' : 'BÖLGE SORULARI'}</p><h2>${english ? `Frequently asked questions about ${escapeHtml(name)}` : `${escapeHtml(name)} hakkında sık sorulanlar`}</h2></div></div>${faq.map((item, index) => `<details${index === 0 ? ' open' : ''}><summary>${escapeHtml(item.question)}<i class="fa-solid fa-plus"></i></summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}</section>
  <section class="container region-related"><div class="section-heading"><div><p class="section-kicker">${english ? 'COMPARE ALTERNATIVES' : 'ALTERNATİFLERİ KARŞILAŞTIRIN'}</p><h2>${english ? 'Continue with nearby lifestyle options.' : 'Farklı yaşam seçenekleriyle devam edin.'}</h2></div></div><div>${relatedRegions(region, locale)}</div></section>
  <section class="container proof-standard"><div><p class="section-kicker">${english ? 'INFORMATION STANDARD' : 'BİLGİLENDİRME STANDARDI'}</p><h2>${english ? 'General area context, property-specific verification.' : 'Genel bölge bilgisi, ilana özel doğrulama.'}</h2></div><p>${english ? 'This guide supports initial comparison and does not replace current legal, financial, planning or technical advice. Confirm every property-specific fact with the relevant authority or independent licensed professional.' : 'Bu rehber ilk karşılaştırmayı destekler; güncel hukuki, mali, imar veya teknik danışmanlığın yerine geçmez. İlana özel her bilgiyi ilgili kurum veya bağımsız yetkili uzmanla doğrulayın.'}</p></section>
  <section class="container content-cta"><div><p class="section-kicker">${english ? 'PERSONAL AREA BRIEF' : 'KİŞİSEL BÖLGE ANALİZİ'}</p><h2>${english ? `Compare ${escapeHtml(name)} with your daily-life criteria.` : `${escapeHtml(name)} bölgesini günlük yaşam kriterlerinizle karşılaştırın.`}</h2></div><a href="contact.html">${english ? 'Request a shortlist' : 'Kişisel seçki isteyin'}</a></section>`;
}

for (const region of regions) {
  const count = currentRegionCount(region);
  const trCanonical = `https://jasmine-group.vercel.app/regions/${region.slug}.html`;
  const enCanonical = `https://jasmine-group.vercel.app/en/regions/${region.slug}.html`;
  const trTitle = `${region.name} Satılık Daire ve Bölge Rehberi | Jasmine Group`;
  const trDescription = `${region.name} yaşamı, konut profili, bölge kontrol listesi ve güncel Jasmine portföylerini karşılaştırın.`;
  const trSchemas = regionSchemas(region, 'tr', count);
  const trPage = `<!DOCTYPE html>
<html lang="tr">
<head>
  <base href="../" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(trTitle)}</title>
  <meta name="description" content="${escapeHtml(trDescription)}" />
  <meta property="og:title" content="${escapeHtml(trTitle)}" />
  <meta property="og:description" content="${escapeHtml(trDescription)}" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${trCanonical}" />
  <meta property="og:image" content="https://jasmine-group.vercel.app/${escapeHtml(region.image)}" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="${trCanonical}" />
  <link rel="alternate" hreflang="tr" href="${trCanonical}" />
  <link rel="alternate" hreflang="en" href="${enCanonical}" />
  <link rel="alternate" hreflang="x-default" href="${trCanonical}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="style.css?v=${assetVersion}" />
  <script type="application/ld+json">${JSON.stringify(trSchemas)}</script>
</head>
<body>
  <header class="main-header"><div class="container"><a href="index.html" class="site-logo">JASMINE <span>GROUP</span></a><nav class="main-nav"><a href="buy.html">SATILIK</a><a href="rent.html">KİRALIK</a><a href="services.html">HİZMETLER</a><a href="regions.html" class="active">BÖLGELER</a><a href="buying-guide.html">ALIM REHBERİ</a><a href="corporate.html">KURUMSAL</a><a href="contact.html">İLETİŞİM</a><a href="en/regions/${region.slug}.html">EN</a></nav><button class="mobile-menu-btn" type="button" onclick="toggleMobileMenu()" aria-label="Menüyü aç"><i class="fa-solid fa-bars"></i></button></div></header>
  <main>${regionPageContent(region, 'tr', count)}</main>
  <footer class="main-footer compact-footer"><div class="container"><div><a href="index.html" class="site-logo">JASMINE <span>GROUP</span></a><p>Alanya ve çevresinde yerel portföy danışmanlığı.</p></div><nav><a href="services.html">Hizmetler</a><a href="regions.html">Bölgeler</a><a href="buying-guide.html">Alım Rehberi</a><a href="privacy.html">Gizlilik</a><a href="contact.html">İletişim</a></nav></div></footer>
  <div class="msm-overlay" id="msmOverlay" onclick="toggleMobileMenu()"></div><aside class="mobile-side-menu" id="mobileSideMenu"><div class="msm-header"><a href="index.html" class="site-logo">JASMINE <span>GROUP</span></a><button class="msm-close" type="button" onclick="toggleMobileMenu()" aria-label="Menüyü kapat"><i class="fa-solid fa-xmark"></i></button></div><nav class="msm-nav"><a href="index.html">Ana Sayfa</a><a href="buy.html">Satılık</a><a href="rent.html">Kiralık</a><a href="services.html">Hizmetler</a><a href="regions.html">Bölgeler</a><a href="contact.html">İletişim</a><a href="en/regions/${region.slug}.html">English</a></nav></aside>
  <script src="script.js?v=${assetVersion}"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(turkishRegionOutput, `${region.slug}.html`), trPage);

  const enPage = englishShell({
    file: `regions/${region.slug}.html`,
    turkishPath: `regions/${region.slug}.html`,
    active: 'regions',
    title: `${region.enName} Property and Area Guide | Jasmine Group`,
    description: `Compare ${region.enName} lifestyle, housing profile, viewing checks and the current Jasmine property collection.`,
    content: regionPageContent(region, 'en', count),
    schema: regionSchemas(region, 'en', count),
  }).replace('<head>', '<head>\n  <base href="../" />');
  fs.writeFileSync(path.join(englishRegionOutput, `${region.slug}.html`), enPage);
}

const guides = JSON.parse(fs.readFileSync(path.join(root, 'guides-content.json'), 'utf8'));
const turkishGuideOutput = path.join(output, 'guides');
const englishGuideOutput = path.join(output, 'en', 'guides');
fs.mkdirSync(turkishGuideOutput, { recursive: true });
fs.mkdirSync(englishGuideOutput, { recursive: true });

function guideSchemas(guide, locale) {
  const english = locale === 'en';
  const pageUrl = english
    ? `https://jasmine-group.vercel.app/en/guides/${guide.slug}.html`
    : `https://jasmine-group.vercel.app/guides/${guide.slug}.html`;
  const hubUrl = english
    ? 'https://jasmine-group.vercel.app/en/buying-guide.html'
    : 'https://jasmine-group.vercel.app/buying-guide.html';
  const title = english ? guide.titleEn : guide.titleTr;
  const summary = english ? guide.summaryEn : guide.summaryTr;
  const faq = english ? guide.faqEn : guide.faqTr;
  return [
    {
      '@context': 'https://schema.org',
      '@type': 'Article',
      headline: title,
      description: summary,
      url: pageUrl,
      inLanguage: english ? 'en' : 'tr',
      dateModified: '2026-07-28',
      author: { '@type': 'Organization', name: 'Jasmine Group' },
      publisher: {
        '@type': 'Organization',
        name: 'Jasmine Group',
        logo: { '@type': 'ImageObject', url: 'https://jasmine-group.vercel.app/images/logo.jpg' },
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: english ? 'Home' : 'Ana Sayfa', item: english ? 'https://jasmine-group.vercel.app/en/' : 'https://jasmine-group.vercel.app/' },
        { '@type': 'ListItem', position: 2, name: english ? 'Buying Guides' : 'Alım Rehberleri', item: hubUrl },
        { '@type': 'ListItem', position: 3, name: title, item: pageUrl },
      ],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: faq.map(item => ({
        '@type': 'Question',
        name: item.question,
        acceptedAnswer: { '@type': 'Answer', text: item.answer },
      })),
    },
  ];
}

function relatedGuides(guide, locale) {
  const index = guides.findIndex(item => item.slug === guide.slug);
  return [1, 2, 3].map(offset => guides[(index + offset) % guides.length]).map(item => {
    const title = locale === 'en' ? item.titleEn : item.titleTr;
    const category = locale === 'en' ? item.categoryEn : item.categoryTr;
    const label = locale === 'en' ? 'Open guide' : 'Rehberi aç';
    return `<a href="guides/${item.slug}.html"><i class="fa-solid ${escapeHtml(item.icon)}"></i><small>${escapeHtml(category)}</small><span>${escapeHtml(title)}</span><strong>${label} <i class="fa-solid fa-arrow-right"></i></strong></a>`;
  }).join('');
}

function guidePageContent(guide, locale) {
  const english = locale === 'en';
  const title = english ? guide.titleEn : guide.titleTr;
  const category = english ? guide.categoryEn : guide.categoryTr;
  const summary = english ? guide.summaryEn : guide.summaryTr;
  const intro = english ? guide.introEn : guide.introTr;
  const steps = english ? guide.stepsEn : guide.stepsTr;
  const checklist = english ? guide.checklistEn : guide.checklistTr;
  const faq = english ? guide.faqEn : guide.faqTr;
  return `<section class="guide-detail-hero"><div class="container guide-detail-hero-grid"><div><a class="breadcrumb-link" href="buying-guide.html"><i class="fa-solid fa-arrow-left"></i> ${english ? 'All buying guides' : 'Tüm alım rehberleri'}</a><p class="section-kicker">${escapeHtml(category)}</p><h1>${escapeHtml(title)}</h1><p>${escapeHtml(summary)}</p><div class="guide-detail-actions"><a href="contact.html">${english ? 'Discuss my transaction' : 'İşlemimi görüşelim'}</a><a href="buy.html">${english ? 'View current properties' : 'Güncel portföyü görün'}</a></div></div><aside><i class="fa-solid ${escapeHtml(guide.icon)}"></i><small>${english ? 'GENERAL PREPARATION GUIDE' : 'GENEL HAZIRLIK REHBERİ'}</small><strong>${english ? 'Verify current requirements with the official authority and an independent licensed professional.' : 'Güncel gereklilikleri resmi kurum ve bağımsız yetkili uzmanla doğrulayın.'}</strong></aside></div></section>
  <section class="guide-authority-bar"><div class="container"><i class="fa-solid fa-shield-halved"></i><div><strong>${english ? 'No fixed figures or outcome guarantees' : 'Sabit tutar veya sonuç garantisi yok'}</strong><p>${escapeHtml(intro)}</p></div></div></section>
  <section class="container guide-process-section"><div class="section-heading"><div><p class="section-kicker">${english ? 'ACTION FILE' : 'İŞLEM DOSYASI'}</p><h2>${english ? 'Move through the subject in a controlled order.' : 'Konuyu kontrollü bir sırayla ilerletin.'}</h2></div></div><div class="guide-process-grid">${steps.map((step, index) => `<article><span>${String(index + 1).padStart(2, '0')}</span><h3>${escapeHtml(step.title)}</h3><p>${escapeHtml(step.body)}</p></article>`).join('')}</div></section>
  <section class="guide-checklist-band"><div class="container guide-checklist-layout"><div><p class="section-kicker">${english ? 'BEFORE YOU COMMIT' : 'KARAR VERMEDEN ÖNCE'}</p><h2>${english ? 'Keep these items in the transaction file.' : 'Bu kalemleri işlem dosyanızda tutun.'}</h2><p>${english ? 'A checklist does not replace professional review, but it helps prevent important questions from being lost between parties.' : 'Kontrol listesi uzman incelemesinin yerine geçmez; önemli soruların taraflar arasında kaybolmasını önler.'}</p></div><ul>${checklist.map(item => `<li><i class="fa-solid fa-circle-check"></i><span>${escapeHtml(item)}</span></li>`).join('')}</ul></div></section>
  <section class="container official-sources"><div class="section-heading"><div><p class="section-kicker">${english ? 'OFFICIAL VERIFICATION' : 'RESMİ DOĞRULAMA'}</p><h2>${english ? 'Open the authority page directly.' : 'İlgili kurum sayfasını doğrudan açın.'}</h2></div></div><div class="official-source-list">${guide.sources.map(source => `<a href="${escapeHtml(source.url)}" target="_blank" rel="noopener noreferrer"><span>${escapeHtml(source.authority)}</span><strong>${escapeHtml(english ? source.labelEn : source.labelTr)}</strong><i class="fa-solid fa-arrow-up-right-from-square"></i></a>`).join('')}</div><p class="official-source-note"><i class="fa-solid fa-circle-info"></i> ${english ? 'External authority pages may change without notice. Confirm that the browser address belongs to the official institution before entering personal data.' : 'Kurum sayfaları bildirim olmadan değişebilir. Kişisel veri girmeden önce tarayıcı adresinin resmi kuruma ait olduğunu doğrulayın.'}</p></section>
  <section class="container region-faq guide-faq"><div class="section-heading"><div><p class="section-kicker">${english ? 'COMMON QUESTIONS' : 'SIK SORULANLAR'}</p><h2>${escapeHtml(title)}</h2></div></div>${faq.map((item, index) => `<details${index === 0 ? ' open' : ''}><summary>${escapeHtml(item.question)}<i class="fa-solid fa-plus"></i></summary><p>${escapeHtml(item.answer)}</p></details>`).join('')}</section>
  <section class="container guide-related"><div class="section-heading"><div><p class="section-kicker">${english ? 'CONTINUE PREPARING' : 'HAZIRLIĞA DEVAM EDİN'}</p><h2>${english ? 'Open the next transaction file.' : 'Sıradaki işlem dosyasını açın.'}</h2></div></div><div>${relatedGuides(guide, locale)}</div></section>
  <section class="container proof-standard"><div><p class="section-kicker">${english ? 'SCOPE' : 'KAPSAM'}</p><h2>${english ? 'General information, independent decision.' : 'Genel bilgi, bağımsız karar.'}</h2></div><p>${english ? 'This page is general information and does not create legal, tax, financial, immigration, insurance or technical advice. Current authority requirements and the buyer-specific file take precedence.' : 'Bu sayfa genel bilgilendirmedir; hukuki, mali, finansal, göçmenlik, sigorta veya teknik danışmanlık oluşturmaz. Güncel resmi kurum koşulları ve alıcıya özel dosya önceliklidir.'}</p></section>
  <section class="container content-cta"><div><p class="section-kicker">${english ? 'PERSONAL TRANSACTION PLAN' : 'KİŞİSEL İŞLEM PLANI'}</p><h2>${english ? 'Turn the guide into a property-specific checklist.' : 'Rehberi taşınmaza özel kontrol listesine dönüştürün.'}</h2></div><a href="contact.html">${english ? 'Request coordination' : 'Koordinasyon isteyin'}</a></section>`;
}

for (const guide of guides) {
  const trCanonical = `https://jasmine-group.vercel.app/guides/${guide.slug}.html`;
  const enCanonical = `https://jasmine-group.vercel.app/en/guides/${guide.slug}.html`;
  const trSchemas = guideSchemas(guide, 'tr');
  const trPage = `<!DOCTYPE html>
<html lang="tr">
<head>
  <base href="../" />
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(guide.titleTr)} | Jasmine Group</title>
  <meta name="description" content="${escapeHtml(guide.summaryTr)}" />
  <meta property="og:title" content="${escapeHtml(guide.titleTr)} | Jasmine Group" />
  <meta property="og:description" content="${escapeHtml(guide.summaryTr)}" />
  <meta property="og:type" content="article" />
  <meta property="og:url" content="${trCanonical}" />
  <meta property="og:image" content="https://jasmine-group.vercel.app/images/office.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <link rel="canonical" href="${trCanonical}" />
  <link rel="alternate" hreflang="tr" href="${trCanonical}" />
  <link rel="alternate" hreflang="en" href="${enCanonical}" />
  <link rel="alternate" hreflang="x-default" href="${trCanonical}" />
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&amp;family=Playfair+Display:wght@500;600;700&amp;display=swap" rel="stylesheet" />
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css" />
  <link rel="stylesheet" href="style.css?v=${assetVersion}" />
  <script type="application/ld+json">${JSON.stringify(trSchemas)}</script>
</head>
<body>
  <header class="main-header"><div class="container"><a href="index.html" class="site-logo">JASMINE <span>GROUP</span></a><nav class="main-nav"><a href="buy.html">SATILIK</a><a href="rent.html">KİRALIK</a><a href="services.html">HİZMETLER</a><a href="regions.html">BÖLGELER</a><a href="buying-guide.html" class="active">ALIM REHBERİ</a><a href="corporate.html">KURUMSAL</a><a href="contact.html">İLETİŞİM</a><a href="en/guides/${guide.slug}.html">EN</a></nav><button class="mobile-menu-btn" type="button" onclick="toggleMobileMenu()" aria-label="Menüyü aç"><i class="fa-solid fa-bars"></i></button></div></header>
  <main>${guidePageContent(guide, 'tr')}</main>
  <footer class="main-footer compact-footer"><div class="container"><div><a href="index.html" class="site-logo">JASMINE <span>GROUP</span></a><p>Alanya ve çevresinde portföy seçimi, gösterim ve işlem koordinasyonu.</p></div><nav><a href="services.html">Hizmetler</a><a href="regions.html">Bölgeler</a><a href="buying-guide.html">Alım Rehberi</a><a href="privacy.html">Gizlilik</a><a href="contact.html">İletişim</a></nav></div></footer>
  <div class="msm-overlay" id="msmOverlay" onclick="toggleMobileMenu()"></div><aside class="mobile-side-menu" id="mobileSideMenu"><div class="msm-header"><a href="index.html" class="site-logo">JASMINE <span>GROUP</span></a><button class="msm-close" type="button" onclick="toggleMobileMenu()" aria-label="Menüyü kapat"><i class="fa-solid fa-xmark"></i></button></div><nav class="msm-nav"><a href="index.html">Ana Sayfa</a><a href="buy.html">Satılık</a><a href="services.html">Hizmetler</a><a href="regions.html">Bölgeler</a><a href="buying-guide.html">Alım Rehberi</a><a href="contact.html">İletişim</a><a href="en/guides/${guide.slug}.html">English</a></nav></aside>
  <script src="script.js?v=${assetVersion}"></script>
</body>
</html>`;
  fs.writeFileSync(path.join(turkishGuideOutput, `${guide.slug}.html`), trPage);

  const enPage = englishShell({
    file: `guides/${guide.slug}.html`,
    turkishPath: `guides/${guide.slug}.html`,
    active: 'guide',
    title: `${guide.titleEn} | Jasmine Group`,
    description: guide.summaryEn,
    content: guidePageContent(guide, 'en'),
    schema: guideSchemas(guide, 'en'),
  }).replace('<head>', '<head>\n  <base href="../" />');
  fs.writeFileSync(path.join(englishGuideOutput, `${guide.slug}.html`), enPage);
}

const sitemapPath = path.join(output, 'sitemap.xml');
const blogSitemapEntries = blogs.map(blog => `  <url>
    <loc>https://jasmine-group.vercel.app/blog/${encodeURIComponent(blog.id)}.html</loc>
    <lastmod>${isoDate(blog.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');
const englishStaticSitemapEntries = englishPages
  .filter(page => page.file !== 'property-detail.html')
  .map(page => `  <url>
    <loc>https://jasmine-group.vercel.app/en/${page.file}</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://jasmine-group.vercel.app/${page.turkishPath}" />
    <xhtml:link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/${page.file}" />
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`).join('\n');
const englishBlogSitemapEntries = englishBlogs.map(blog => `  <url>
    <loc>https://jasmine-group.vercel.app/en/blog/${encodeURIComponent(blog.id)}.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://jasmine-group.vercel.app/blog/${encodeURIComponent(blog.id)}.html" />
    <xhtml:link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/blog/${encodeURIComponent(blog.id)}.html" />
    <lastmod>${isoEnglishDate(blog.date)}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>`).join('\n');
const regionSitemapEntries = regions.flatMap(region => [
  `  <url>
    <loc>https://jasmine-group.vercel.app/regions/${region.slug}.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://jasmine-group.vercel.app/regions/${region.slug}.html" />
    <xhtml:link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/regions/${region.slug}.html" />
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
  `  <url>
    <loc>https://jasmine-group.vercel.app/en/regions/${region.slug}.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://jasmine-group.vercel.app/regions/${region.slug}.html" />
    <xhtml:link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/regions/${region.slug}.html" />
    <lastmod>2026-07-28</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>`,
]).join('\n');
const guideSitemapEntries = guides.flatMap(guide => [
  `  <url>
    <loc>https://jasmine-group.vercel.app/guides/${guide.slug}.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://jasmine-group.vercel.app/guides/${guide.slug}.html" />
    <xhtml:link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/guides/${guide.slug}.html" />
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
  `  <url>
    <loc>https://jasmine-group.vercel.app/en/guides/${guide.slug}.html</loc>
    <xhtml:link rel="alternate" hreflang="tr" href="https://jasmine-group.vercel.app/guides/${guide.slug}.html" />
    <xhtml:link rel="alternate" hreflang="en" href="https://jasmine-group.vercel.app/en/guides/${guide.slug}.html" />
    <lastmod>2026-07-28</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
  </url>`,
]).join('\n');
fs.writeFileSync(
  sitemapPath,
  fs.readFileSync(sitemapPath, 'utf8').replace('</urlset>', `${blogSitemapEntries}\n${englishStaticSitemapEntries}\n${englishBlogSitemapEntries}\n${regionSitemapEntries}\n${guideSitemapEntries}\n</urlset>`),
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
