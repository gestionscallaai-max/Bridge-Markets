const fs = require('fs');
const path = require('path');

const localesDir = 'c:/Users/dilan/Desktop/Nueva carpeta/partner-dashboard/lib/i18n/locales';
const files = fs.readdirSync(localesDir).filter(f => f.endsWith('.ts'));

files.forEach(file => {
    const content = fs.readFileSync(path.join(localesDir, file), 'utf-8');
    const lines = content.split('\n');
    const stack = [];
    let currentObject = {};
    const duplicates = [];

    lines.forEach((line, index) => {
        const match = line.match(/^\s*(\w+):/);
        if (match) {
            const key = match[1];
            if (currentObject[key]) {
                duplicates.push({ key, line: index + 1 });
            }
            currentObject[key] = true;
        }

        // Simple stack tracking for nested objects
        if (line.includes('{')) {
            stack.push(currentObject);
            currentObject = {};
        }
        if (line.includes('}')) {
            currentObject = stack.pop() || {};
        }
    });

    if (duplicates.length > 0) {
        console.log(`Duplicates in ${file}:`);
        duplicates.forEach(d => console.log(`  - ${d.key} at line ${d.line}`));
    } else {
        console.log(`${file}: OK`);
    }
});
