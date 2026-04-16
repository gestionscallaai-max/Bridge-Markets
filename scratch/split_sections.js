const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '../lib/landing-sections.ts');
const targetDir = path.join(__dirname, '../lib/landing');
const renderersDir = path.join(targetDir, 'renderers');

// Create directories
if (!fs.existsSync(targetDir)) fs.mkdirSync(targetDir, { recursive: true });
if (!fs.existsSync(renderersDir)) fs.mkdirSync(renderersDir, { recursive: true });

let content = fs.readFileSync(srcFile, 'utf8');

// 1. EXTRACT TYPES
// From start until "// ─── Section Registry"
const typesMatch = content.match(/([\s\S]*?)(?=\/\/ ─── Section Registry)/);
const typesContent = typesMatch[1].trim();
fs.writeFileSync(path.join(targetDir, 'types.ts'), typesContent + '\n', 'utf8');

// 2. EXTRACT CATALOG
// From "export const SECTION_CATALOG" until the first "export function"
const catalogMatch = content.match(/(export const SECTION_CATALOG: SectionMeta\[\] = \[[\s\S]*?\];)/);
const catalogText = catalogMatch[1];
const catalogContent = `import { SectionMeta } from './types';\n\n` + catalogText + '\n';
fs.writeFileSync(path.join(targetDir, 'catalog.ts'), catalogContent, 'utf8');

// 3. EXTRACT ALL FUNCTIONS
// We capture each "export function Name(...) { ... }"
const functionRegex = /export function (render[A-Za-z0-9_]+)\(content: Record<string, any>, brand: BrandConfig\): string \{([\s\S]*?)\n\}\n/g;
let match;
const functions = {};
while ((match = functionRegex.exec(content)) !== null) {
    functions[match[1]] = match[0]; // Full function string
}

// Group functions
const heroes = [];
const features = [];
const forms = [];
const propFirm = [];

for (const fnName in functions) {
    if (fnName.startsWith('renderHero')) heroes.push(functions[fnName]);
    else if (fnName.startsWith('renderProp')) propFirm.push(functions[fnName]);
    else if (fnName.includes('Form') || fnName.includes('Footer') || fnName.includes('Testimonials') || fnName.includes('Newsletter')) forms.push(functions[fnName]);
    else features.push(functions[fnName]); // The rest are features
}

const headerLines = `import { BrandConfig } from '../types';\n\n`;

fs.writeFileSync(path.join(renderersDir, 'heroes.ts'), headerLines + heroes.join('\n'), 'utf8');
fs.writeFileSync(path.join(renderersDir, 'features.ts'), headerLines + features.join('\n'), 'utf8');
fs.writeFileSync(path.join(renderersDir, 'forms.ts'), headerLines + forms.join('\n'), 'utf8');
fs.writeFileSync(path.join(renderersDir, 'propFirm.ts'), headerLines + propFirm.join('\n'), 'utf8');

// 4. CREATE index.ts with SECTION_RENDERERS
// Extract the SECTION_RENDERERS mapping
const renderersMapMatch = content.match(/(export const SECTION_RENDERERS: Record<string,.*?> = {[\s\S]*?};)/);
let renderersContent = renderersMapMatch[1];

let importsStr = `import { BrandConfig } from '../types';\n`;
importsStr += `import { ${Object.keys(functions).filter(n => heroes.includes(functions[n])).join(', ')} } from './heroes';\n`;
importsStr += `import { ${Object.keys(functions).filter(n => features.includes(functions[n])).join(', ')} } from './features';\n`;
importsStr += `import { ${Object.keys(functions).filter(n => forms.includes(functions[n])).join(', ')} } from './forms';\n`;
importsStr += `import { ${Object.keys(functions).filter(n => propFirm.includes(functions[n])).join(', ')} } from './propFirm';\n\n`;

fs.writeFileSync(path.join(renderersDir, 'index.ts'), importsStr + renderersContent + '\n', 'utf8');

// 5. REWRITE original landing-sections.ts to be a wrapper
const wrapperContent = `// ─────────────────────────────────────────────────────────────
// REFACTORED: This file acts as a re-export bridge to avoid breaking existing imports.
// All logic has been migrated modularly to /lib/landing/
// ─────────────────────────────────────────────────────────────

export * from './landing/types';
export * from './landing/catalog';
export { SECTION_RENDERERS } from './landing/renderers';
`;
fs.writeFileSync(srcFile, wrapperContent, 'utf8');

console.log('Successfully refactored landing-sections.ts into lib/landing!');
