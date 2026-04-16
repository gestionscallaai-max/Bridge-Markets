const fs = require('fs');
const path = require('path');

const targetFile = path.join('c:', 'Users', 'dilan', 'Desktop', 'Nueva carpeta', 'partner-dashboard', 'lib', 'landing-sections.ts');
let content = fs.readFileSync(targetFile, 'utf8');

const replacements = [
    [/text-blue-500/g, 'text-brand'],
    [/text-blue-600/g, 'text-brand-600'],
    [/bg-blue-500/g, 'bg-brand'],
    [/bg-blue-600/g, 'bg-brand-600'],
    [/border-blue-500/g, 'border-brand'],
    [/border-blue-600/g, 'border-brand-600'],
    [/from-blue-500/g, 'from-brand'],
    [/from-blue-600/g, 'from-brand-600'],
    [/to-blue-500/g, 'to-brand'],
    [/to-blue-600/g, 'to-brand-600'],
    [/text-blue-400/g, 'text-brand-light'],
    [/bg-blue-400/g, 'bg-brand-light'],
    [/border-blue-400/g, 'border-brand-light'],
    // RGB for blue-500 (59,130,246) to Bridge Purple brand DEFAULT #865BFF (134,91,255)
    [/59,130,246/g, '134,91,255'],
    // Hex occurrences
    [/#3B82F6/g, '#865BFF']
];

let modifiedContent = content;
for (const [regex, replacement] of replacements) {
    modifiedContent = modifiedContent.replace(regex, replacement);
}

fs.writeFileSync(targetFile, modifiedContent, 'utf8');
console.log('Colors successfully updated in landing-sections.ts');
