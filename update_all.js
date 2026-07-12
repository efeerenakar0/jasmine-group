const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

const oldAddressRegex1 = /Oba Mah\., Hacıkadiroğlu Cad\., No: 4\/2A<br>Alanya\/Antalya/g;
const oldAddressRegex2 = /Oba Mah\., Hacıkadiroğlu Cad\., No: 4\/2A, Alanya\/Antalya/g;
const newAddressHtml = 'Oba Mah.Mesut Cad.13.Sok.Best Home Comfort 7.A-Block No:40/18-19<br>07400 Alanya/Antalya';
const newAddressInline = 'Oba Mah.Mesut Cad.13.Sok.Best Home Comfort 7.A-Block No:40/18-19, 07400 Alanya/Antalya';

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf-8');
    let original = content;

    // 1. Remove "ilan bulundu" spans
    content = content.replace(/<span><strong>\d+<\/strong> ilan bulundu<\/span>/g, '');

    // 2. Replace addresses
    content = content.replace(oldAddressRegex1, newAddressHtml);
    content = content.replace(oldAddressRegex2, newAddressInline);

    if (content !== original) {
        fs.writeFileSync(file, content, 'utf-8');
        console.log(`Updated ${file}`);
    }
});

// 3. Remove script.js logic for ilan bulundu
let scriptContent = fs.readFileSync('script.js', 'utf-8');
const scriptOriginal = scriptContent;

// Remove the block from `const countEl = document.querySelector('.sort-bar span strong');` to `  } // end of if(countEl)`
const blockStart = scriptContent.indexOf("const countEl = document.querySelector('.sort-bar span strong');");
if (blockStart !== -1) {
    const nextCode = scriptContent.indexOf("// Swiperları yeniden başlat", blockStart);
    if (nextCode !== -1) {
        scriptContent = scriptContent.slice(0, blockStart) + scriptContent.slice(nextCode);
    }
}

if (scriptContent !== scriptOriginal) {
    fs.writeFileSync('script.js', scriptContent, 'utf-8');
    console.log("Updated script.js");
}

console.log('Update complete.');
