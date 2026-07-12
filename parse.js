const fs = require('fs');
const cheerio = require('cheerio');

try {
    const html = fs.readFileSync('sahibinden.html', 'utf-8');
    const $ = cheerio.load(html);

    const items = $('tr.searchResultsItem');
    console.log('Found ' + items.length + ' tr.searchResultsItem elements');
    
    if (items.length > 0) {
        items.each((i, el) => {
            if (i > 1) return; // Only print first 2
            
            const title = $(el).find('a.classifiedTitle').text().trim();
            const price = $(el).find('td.searchResultsPriceValue').text().trim();
            const location = $(el).find('td.searchResultsLocationValue').text().trim().replace(/\s+/g, ' ');
            const img = $(el).find('img').attr('src');
            
            // Sometimes it uses data-src for lazy loading
            const dataSrc = $(el).find('img').attr('data-src');
            
            console.log(`\nItem ${i+1}:`);
            console.log(`Title: ${title}`);
            console.log(`Price: ${price}`);
            console.log(`Location: ${location}`);
            console.log(`Image src: ${img}`);
            console.log(`Image data-src: ${dataSrc}`);
        });
    }
} catch (e) {
    console.error(e);
}
