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
// jsdom does not implement viewport observers used by the page animations.
dom.window.IntersectionObserver = class IntersectionObserver {
    observe() {}
    unobserve() {}
};
// Mock localStorage
dom.window.localStorage = { getItem: () => 'eur' };

dom.window.eval(script);

setTimeout(() => {
    const list = dom.window.document.getElementById('prop-list');
    const count = list ? list.children.length : 0;
    console.log("Children in prop-list:", count);
    if (count === 0) process.exitCode = 1;
}, 2000);
