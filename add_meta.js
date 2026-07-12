const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html');

const metaTags = `
  <meta property="og:title" content="Jasmine Group - Alanya Emlak Proje Pazarlama" />
  <meta property="og:description" content="Alanya'da Profesyonel Emlak Hizmetleri, Lüks Daireler ve Villalar." />
  <meta property="og:image" content="https://www.jasminegroup.com.tr/images/favicon.jpg" />
  <meta property="og:url" content="https://www.jasminegroup.com.tr/" />
  <meta property="og:type" content="website" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Jasmine Group - Alanya Emlak Proje Pazarlama" />
  <meta name="twitter:description" content="Alanya'da Profesyonel Emlak Hizmetleri, Lüks Daireler ve Villalar." />
  <meta name="twitter:image" content="https://www.jasminegroup.com.tr/images/favicon.jpg" />
  <meta name="keywords" content="Alanya satılık daire, Alanya emlak, Jasmine Group, satılık ev Alanya, Alanya kiralık daire, Alanya gayrimenkul" />
  <link rel="canonical" href="https://www.jasminegroup.com.tr/" />
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  content = content.replace(/<html(.*?)>/, '<html lang="tr"$1>');
  
  if (!content.includes('og:title')) {
    content = content.replace('</head>', metaTags + '\n</head>');
    fs.writeFileSync(file, content);
  }
}
console.log("Meta tags and language added.");
