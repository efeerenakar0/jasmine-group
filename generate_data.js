const fs = require('fs');
const cheerio = require('cheerio');

try {
    // 1. Read existing data.json to get sample gallery
    const dataPath = 'admin/data.json';
    let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    
    // Find sample gallery from the first item
    let sampleGallery = [];
    if (data.properties.length > 0 && data.properties[0].images.length > 5) {
        sampleGallery = data.properties[0].images.slice(1, 10);
    } else {
        // Fallback sample gallery if not found
        sampleGallery = [
            "https://i0.shbdn.com/photos/64/27/60/x5_13216427608o3.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_132164276007e.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_1321642760t51.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_1321642760h8p.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_13216427608l4.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_13216427609ee.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_13216427600w5.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_132164276046e.avif",
            "https://i0.shbdn.com/photos/64/27/60/x5_1321642760cqi.avif"
        ];
    }

    // 2. Parse HTML
    const html = fs.readFileSync('sahibinden.html', 'utf-8');
    const $ = cheerio.load(html);
    const items = $('tr.searchResultsItem');
    
    const newProperties = [];
    
    items.each((i, el) => {
        if(i >= 50) return; // limit to 50
        
        const title = $(el).find('a.classifiedTitle').text().trim();
        const priceStr = $(el).find('td.searchResultsPriceValue span').text().trim();
        const location = $(el).find('td.searchResultsLocationValue').text().trim().replace(/\s+/g, ' ');
        
        const attrs = $(el).find('td.searchResultsAttributeValue');
        let gross = $(attrs[0]).text().trim();
        let rooms = $(attrs[1]).text().trim();
        
        // Sometimes gross and rooms are swapped or missing, handle it:
        if (gross.includes('+')) {
            const temp = gross;
            gross = rooms;
            rooms = temp;
        }

        // Parse price to EUR
        let priceNum = parseInt(priceStr.replace(/\D/g, '')) || 0;
        let priceEur = 0;
        if (priceStr.includes('TL')) {
            priceEur = Math.round(priceNum / 35);
        } else if (priceStr.includes('$')) {
            priceEur = Math.round(priceNum * 0.92);
        } else if (priceStr.includes('€') || priceStr.includes('EUR')) {
            priceEur = priceNum;
        } else if (priceStr.includes('£')) {
            priceEur = Math.round(priceNum * 1.17);
        } else {
            priceEur = Math.round(priceNum / 35); // default TL
        }
        
        // Extract original image URL from source tag
        let srcset = $(el).find('source.avif-source').attr('srcset');
        let imgUrl = "";
        if (srcset) {
            imgUrl = srcset.replace("lthmb_", "x5_");
        } else {
            // fallback
            imgUrl = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=700&q=80";
        }
        
        // Determine badge
        let badge = "";
        let badge_color = "";
        if ($(el).find('img[alt="Yeni İlan"]').length > 0) {
            badge = "YENİ İLAN";
            badge_color = "blue";
        }

        newProperties.push({
            id: `JG-S${100 + i}`,
            type: "sale",
            title: title,
            location: location + " — ALANYA",
            rooms: rooms,
            bathrooms: "1 Banyo", // default
            area_net: Math.round(parseInt(gross)*0.85) + " m²",
            area_gross: gross + " m²",
            desc: "Sahibinden satılık daire.",
            price_eur: priceEur,
            badge: badge,
            badge_color: badge_color,
            images: [imgUrl, ...sampleGallery]
        });
    });

    data.properties = newProperties;
    
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 4));
    console.log(`Successfully extracted and updated ${newProperties.length} properties!`);
    
} catch(e) {
    console.error(e);
}
