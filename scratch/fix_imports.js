const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '../lib/landing/renderers');
const files = ['heroes.ts', 'features.ts', 'forms.ts', 'propFirm.ts'];

files.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        // Check if SECTION_CATALOG is used but not imported
        if (content.includes('SECTION_CATALOG') && !content.includes("from '../catalog'")) {
            content = content.replace("import { BrandConfig } from '../types';", 
                "import { BrandConfig } from '../types';\nimport { SECTION_CATALOG } from '../catalog';");
            fs.writeFileSync(filePath, content, 'utf8');
        }
    }
});
console.log('Fixed imports in renderers');
