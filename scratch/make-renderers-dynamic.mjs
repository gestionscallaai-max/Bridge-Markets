import fs from 'fs';
import path from 'path';

const renderersDir = path.resolve(process.cwd(), 'lib/landing/renderers');

// List of target renderer files
const targetFiles = [
    'propFirm.ts',
    'mamCopy.ts',
    'proLeverage.ts',
    'institutional.ts',
    'syntheticUniverse.ts',
    'syntheticProduct.ts',
    'v3.ts'
];

console.log('Reading renderers directory...');

targetFiles.forEach(file => {
    const filePath = path.join(renderersDir, file);
    if (!fs.existsSync(filePath)) {
        console.warn(`File not found: ${file}`);
        return;
    }

    let code = fs.readFileSync(filePath, 'utf8');

    // Make sure content helper is injected in each function if missing
    // We will do precise replacements for each function pattern in the files.
    console.log(`Processing ${file}...`);
});
