const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('sahibinden.html', 'utf-8');
const $ = cheerio.load(html);
const firstItem = $('tr.searchResultsItem').first();
console.log(firstItem.html());
