const fs = require('fs');
const path = require('path');
const cheerio = require('cheerio');

const dir = 'Sahibinden 6';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const dataPath = 'admin/data.json';
let db = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

files.forEach((file, index) => {
    const html = fs.readFileSync(path.join(dir, file), 'utf-8');
    const $ = cheerio.load(html);
    
    // Extract Title
    const title = $('h1').first().text().trim() || file.replace('.html', '');
    
    // Check for duplicates
    if (db.properties.some(p => p.title === title)) {
        return; // Skip if already exists
    }
    
    // Extract Price using Regex
    let priceEur = 0;
    const priceMatch = html.match(/([\d\.]+)\s*TL/);
    if (priceMatch) {
        let priceNum = parseInt(priceMatch[1].replace(/\./g, '')) || 0;
        priceEur = Math.round(priceNum / 35);
    } else {
        const h3Price = $('h3').text().replace(/\D/g, '');
        if (h3Price) {
            priceEur = Math.round(parseInt(h3Price) / 35);
        }
    }
    
    // Location
    const location = $('.classifiedInfo h2').text().trim().replace(/\s+/g, ' ') || "Alanya";
    
    // Attributes
    let gross = "100";
    let rooms = "2+1";
    $('ul.classifiedInfoList li').each((i, el) => {
        const key = $(el).find('strong').text().trim();
        const val = $(el).find('span').text().trim();
        if (key.includes('Brüt')) gross = val;
        if (key.includes('Oda')) rooms = val;
    });

    // Description
    let desc = $('#classifiedDescription').text().trim() || "Sahibinden satılık daire.";
    
    // Images
    const imgMatches = html.match(/https:\/\/i0\.shbdn\.com\/photos\/[a-zA-Z0-9_\/]+\.(avif|jpg|jpeg|png)/g) || [];
    
    let images = [...new Set(imgMatches)];
    let highResImages = images.filter(url => url.includes('x5_'));
    
    if (highResImages.length === 0) {
        highResImages = images.map(url => url.replace(/thmb_|lthmb_|mthmb_/g, 'x5_'));
    }
    
    highResImages = [...new Set(highResImages)];

    let uniqueBases = new Set();
    let finalImages = [];
    highResImages.forEach(img => {
        let cleanName = img.split('/').pop().split('?')[0];
        let baseName = cleanName;
        let lastDot = cleanName.lastIndexOf('.');
        if (lastDot > 0) baseName = cleanName.substring(0, lastDot);
        
        if (!uniqueBases.has(baseName)) {
            uniqueBases.add(baseName);
            finalImages.push(img);
        }
    });
    highResImages = finalImages;

    if (highResImages.length === 0) {
        highResImages = ["https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80"];
    }

    db.properties.push({
        id: `JG-S${Date.now() + index}`,
        type: "sale",
        title: title,
        location: location,
        rooms: rooms,
        bathrooms: "1 Banyo",
        area_net: Math.round(parseInt(gross)*0.85) + " m²",
        area_gross: gross + (gross.includes('m') ? '' : ' m²'),
        desc: desc,
        price_eur: priceEur,
        badge: index === 0 ? "YENİ İLAN" : "",
        badge_color: index === 0 ? "blue" : "",
        images: highResImages
    });
});

fs.writeFileSync(dataPath, JSON.stringify(db, null, 4));
console.log(`Successfully processed ${files.length} HTML files from ${dir} and appended to data.json`);
