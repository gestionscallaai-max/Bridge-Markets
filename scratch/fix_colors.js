const fs = require('fs');
const path = require('path');

const targetFile = path.join('c:', 'Users', 'dilan', 'Desktop', 'Nueva carpeta', 'partner-dashboard', 'lib', 'landing-sections.ts');
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
    [/text-brand-600/g, 'text-brand-purple'],
    [/text-brand([^-])/g, 'text-brand-purple$1'],
    [/bg-brand-600/g, 'bg-brand-purple'],
    [/bg-brand([^-])/g, 'bg-brand-purple$1'],
    [/border-brand-600/g, 'border-brand-purple'],
    [/border-brand([^-])/g, 'border-brand-purple$1'],
    [/from-brand-600/g, 'from-brand-purple'],
    [/from-brand([^-])/g, 'from-brand-purple$1'],
    [/to-brand-600/g, 'to-brand-purple'],
    [/to-brand([^-])/g, 'to-brand-purple$1'],
    [/text-brand-light/g, 'text-brand-accent'],
    [/bg-brand-light/g, 'bg-brand-accent'],
    [/border-brand-light/g, 'border-brand-accent'],
    // Hex and RGB fixes for brand-purple (#6D28D9)
    [/#865BFF/g, '#6D28D9'],
    [/134,91,255/g, '109,40,217']
];

let modifiedContent = content;
for (const [regex, replacement] of replacements) {
    modifiedContent = modifiedContent.replace(regex, replacement);
}

fs.writeFileSync(targetFile, modifiedContent, 'utf8');
console.log('Fixed Tailwind colors to brand-purple in landing-sections.ts');
