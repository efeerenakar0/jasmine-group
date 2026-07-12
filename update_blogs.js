const fs = require('fs');

const generateBlogs = () => {
  const blogs = [];
  const categories = ["YATIRIM", "HUKUK", "BÖLGE REHBERİ", "KİRALAMA", "PROJELER", "DEKORASYON"];
  const images = [
    "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1516156008625-3a9d6067fab5?auto=format&fit=crop&w=800&q=80",
    "https://images.unsplash.com/photo-1448630360428-65456885c650?auto=format&fit=crop&w=800&q=80"
  ];

  for (let i = 1; i <= 15; i++) {
    blogs.push(`    {
        "id": "b${8 + i}",
        "category": "${categories[i % categories.length]}",
        "title": "2025 Emlak Piyasasında Yeni Fırsatlar Bölüm ${i}",
        "excerpt": "Yeni yılda gayrimenkul sektörünü nelerin beklediğine dair en güncel detaylar ve tahminler...",
        "content": "Sürekli gelişen emlak sektörü 2025 yılında da yenilikçi fırsatlar sunmaya devam ediyor. Özellikle kıyı şeridindeki projeler yabancı yatırımcıların radarına girmeyi sürdürüyor. Teknoloji ile entegre akıllı evler artık bir standart haline geliyor. Jasmine Group olarak bu süreçte en doğru yatırımı yapmanız için profesyonel destek sağlıyoruz.",
        "date": "${1 + (i % 28)} Şubat 2025",
        "image": "${images[i % images.length]}"
    }`);
  }
  return blogs.join(',\n');
};

let scriptContent = fs.readFileSync('./script.js', 'utf-8');

// Replace 2024 with 2025 in dates
scriptContent = scriptContent.replace(/2024"/g, '2025"');

// Append new blogs to the array
const arrayEndIndex = scriptContent.indexOf('];\n\nfunction renderBlogs');
if (arrayEndIndex !== -1) {
    const newBlogsStr = ',\n' + generateBlogs() + '\n';
    scriptContent = scriptContent.slice(0, arrayEndIndex) + newBlogsStr + scriptContent.slice(arrayEndIndex);
    fs.writeFileSync('./script.js', scriptContent, 'utf-8');
    console.log("Blogs updated!");
} else {
    console.log("Could not find BLOG_POSTS array end.");
}
