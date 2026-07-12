const fs = require('fs');
const path = require('path');

const dir = './';
const files = fs.readdirSync(dir).filter(f => f.endsWith('.html'));

files.forEach(file => {
    const filePath = path.join(dir, file);
    let content = fs.readFileSync(filePath, 'utf-8');
    
    // Replace all variations of the old email with the new one
    const newContent = content
        .replace(/info@jasminegroup\.com\.tr/g, 'jasminegroupemlak@gmail.com')
        .replace(/info@jasminegroup\.com/g, 'jasminegroupemlak@gmail.com');
        
    if (content !== newContent) {
        fs.writeFileSync(filePath, newContent, 'utf-8');
        console.log(`Updated email in ${file}`);
    }
});

console.log('Email update complete.');
