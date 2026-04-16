const fs = require('fs');
const path = require('path');

const srcFile = path.join(__dirname, '../lib/landing-generator.ts');
const targetDir = path.join(__dirname, '../lib/landing');

let content = fs.readFileSync(srcFile, 'utf8');

const splitIndex = content.indexOf('export function generateLandingHTML');

let dictionaryContent = content.substring(0, splitIndex).trim();
const generatorContent = content.substring(splitIndex).trim();

// Export local bindings in the dictionary
dictionaryContent = dictionaryContent.replace(/^const /gm, 'export const ');
dictionaryContent = dictionaryContent.replace(/^interface /gm, 'export interface ');
dictionaryContent = dictionaryContent.replace(/^type /gm, 'export type ');

fs.writeFileSync(path.join(targetDir, 'dictionary.ts'), dictionaryContent + '\n', 'utf8');

// Extract all exported names from dictionary to import them in generator
const exportedNames = [];
const matchConsts = [...dictionaryContent.matchAll(/export const ([A-Za-z0-9_]+)/g)];
matchConsts.forEach(m => exportedNames.push(m[1]));

const matchInterfaces = [...dictionaryContent.matchAll(/export interface ([A-Za-z0-9_]+)/g)];
matchInterfaces.forEach(m => exportedNames.push(m[1]));

const matchTypes = [...dictionaryContent.matchAll(/export type ([A-Za-z0-9_]+)/g)];
matchTypes.forEach(m => exportedNames.push(m[1]));

// Generate the imports
let finalGenerator = `import { SECTION_RENDERERS } from './renderers';\n` + 
                     `import { BrandConfig } from './types';\n` + 
                     `import { ${exportedNames.join(', ')} } from './dictionary';\n\n`;

const finalModule = finalGenerator + generatorContent + '\n';
fs.writeFileSync(path.join(targetDir, 'generator.ts'), finalModule, 'utf8');

// Rewrite landing-generator.ts to re-export the generator
const wrapperContent = `// ─────────────────────────────────────────────────────────────
// REFACTORED: This file acts as a re-export bridge to avoid breaking existing imports.
// All logic has been migrated modularly to /lib/landing/
// ─────────────────────────────────────────────────────────────

export * from './landing/generator';
export * from './landing/dictionary';
`;
fs.writeFileSync(srcFile, wrapperContent, 'utf8');

console.log('Successfully refactored landing-generator.ts into lib/landing!');
