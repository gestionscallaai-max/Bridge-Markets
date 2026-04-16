const fs = require('fs');
const path = require('path');

// 1. FIX duplicate imports in generator.ts
const generatorPath = path.join(__dirname, '../lib/landing/generator.ts');
if (fs.existsSync(generatorPath)) {
    let generatorText = fs.readFileSync(generatorPath, 'utf8');
    // Remove the original imports from the top of the content that might be conflicting
    generatorText = generatorText.replace(/import \{ SECTION_RENDERERS.*?\} from '\.\/landing-sections';\n/g, '');
    generatorText = generatorText.replace(/import \{.*?BrandConfig.*?\} from '\.\/landing-sections';\n/g, '');
    generatorText = generatorText.replace(/import \{ LANDING_TEMPLATES \} from '\.\/landing-templates';/g, "import { LANDING_TEMPLATES } from '../landing-templates';");
    
    // Fix parameter 'sId' implicitly has an 'any' type
    generatorText = generatorText.replace(/\\(sId, idx\\) => \{/g, "(sId: string, idx: number) => {");
    
    fs.writeFileSync(generatorPath, generatorText, 'utf8');
}

// 2. RESTORE SECTION_CATEGORIES in catalog.ts or landing-sections.ts
// Wait, the client code LandingTypeform expects SECTION_CATEGORIES from landing-sections.
// It's just a constant list. We can synthesize it safely in types.ts or catalog.ts
const catalogPath = path.join(__dirname, '../lib/landing/catalog.ts');
if (fs.existsSync(catalogPath)) {
    let catText = fs.readFileSync(catalogPath, 'utf8');
    if (!catText.includes('SECTION_CATEGORIES')) {
        const catStr = `\nexport const SECTION_CATEGORIES = [
    { id: 'hero', name: 'Heroes', icon: 'view_carousel' },
    { id: 'content', name: 'Contenido', icon: 'dashboard' },
    { id: 'social_proof', name: 'Validación', icon: 'verified_user' },
    { id: 'cta', name: 'Llamados a la Acción', icon: 'ads_click' },
    { id: 'layout', name: 'Estructura', icon: 'view_agenda' }
];\n`;
        fs.writeFileSync(catalogPath, catText + catStr, 'utf8');
    }
}

// Ensure wrapper landing-sections exports SECTION_CATEGORIES
const wrapperPath = path.join(__dirname, '../lib/landing-sections.ts');
if (fs.existsSync(wrapperPath)) {
    let wrapperText = fs.readFileSync(wrapperPath, 'utf8');
    if (!wrapperText.includes('SECTION_CATEGORIES')) {
        wrapperText = wrapperText.replace("export * from './landing/catalog';", "export * from './landing/catalog';\nexport { SECTION_CATEGORIES } from './landing/catalog';");
        fs.writeFileSync(wrapperPath, wrapperText, 'utf8');
    }
}

console.log('Fixed imports and duplicates!');
