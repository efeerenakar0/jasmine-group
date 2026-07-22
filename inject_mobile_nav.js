const fs = require('fs');
const files = fs.readdirSync('.').filter(f => f.endsWith('.html') && f !== '404.html' && f !== 'admin.html' && f !== 'admin-login.html' && f !== 'sahibinden.html');

const mobileBottomNav = `
  <nav class="mobile-bottom-nav">
    <div class="mobile-bottom-nav-inner">
      <a href="index.html" class="mob-nav-item"><i class="fa-solid fa-house"></i><span>Ana Sayfa</span></a>
      <a href="buy.html" class="mob-nav-item"><i class="fa-solid fa-tag"></i><span>Satılık</span></a>
      <a href="rent.html" class="mob-nav-item"><i class="fa-solid fa-key"></i><span>Kiralık</span></a>
      <a href="contact.html" class="mob-nav-item"><i class="fa-solid fa-phone"></i><span>İletişim</span></a>
    </div>
  </nav>
`;

for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (!content.includes('mobile-bottom-nav')) {
    content = content.replace('</body>', mobileBottomNav + '\n</body>');
    fs.writeFileSync(file, content);
    console.log('Added mobile bottom nav to: ' + file);
  } else {
    console.log('Already exists in: ' + file);
  }
}
console.log('Done.');
