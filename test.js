const fs = require('fs');
const jsdom = require("jsdom");
const { JSDOM } = jsdom;
const html = fs.readFileSync('buy.html', 'utf8');
const script = fs.readFileSync('script.js', 'utf8');
const data = fs.readFileSync('admin/data.json', 'utf8');
const dom = new JSDOM(html, { 
    url: "http://localhost/buy.html", 
    runScripts: "dangerously", 
    resources: "usable" 
});

// Mock fetch
dom.window.fetch = async (url) => {
    if(url.includes('data.json')) {
        return { ok: true, json: async () => JSON.parse(data) };
    }
    return { ok: false };
};
// Mock Swiper
dom.window.Swiper = class Swiper { constructor(){} };
// Mock localStorage
dom.window.localStorage = { getItem: () => 'eur' };

dom.window.eval(script);

setTimeout(() => {
    const list = dom.window.document.getElementById('prop-list');
    console.log("Children in prop-list:", list ? list.children.length : "NO LIST");
}, 2000);
