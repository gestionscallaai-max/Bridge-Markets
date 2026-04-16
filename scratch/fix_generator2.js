const fs = require('fs');
const path = require('path');

// Fix LandingTypeform Section_Categories
const catalogPath = path.join(__dirname, '../lib/landing/catalog.ts');
let catText = fs.readFileSync(catalogPath, 'utf8');
// Fix 'name:' to 'label:' inside SECTION_CATEGORIES
catText = catText.replace(/name: 'Heroes'/g, "label: 'Heroes'");
catText = catText.replace(/name: 'Contenido'/g, "label: 'Contenido'");
catText = catText.replace(/name: 'Validaci.n'/g, "label: 'Validación'");
catText = catText.replace(/name: 'Llamados a la Acci.n'/g, "label: 'Llamados a la Acción'");
catText = catText.replace(/name: 'Estructura'/g, "label: 'Estructura'");
fs.writeFileSync(catalogPath, catText, 'utf8');

const genPath = path.join(__dirname, '../lib/landing/generator.ts');
let genText = fs.readFileSync(genPath, 'utf8');

// Fix landing-templates import
genText = genText.replace(/import \{ LANDING_TEMPLATES \} from '\.\.\/landing-templates';/g, ""); // if present poorly
genText = genText.replace(/import \{.*?LANDING_TEMPLATES.*?\} from '\.\/landing-templates';/g, ""); 
genText = `import { LANDING_TEMPLATES } from '../landing-templates';\n` + genText;

// Fix sId and idx implicitly any inside arrow functions
genText = genText.replace(/\(sId, idx\)/g, "(sId: string, idx: number)");

// Inject getSharedHead and getSharedStyles directly (they were tiny helper functions top of old file)
if (!genText.includes('function getSharedHead')) {
    const helpers = `
function getSharedHead(title: string, desc: string, language: string) {
    return \`
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bridge Markets | \${title}</title>
    <meta name="description" content="\${desc}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Poppins', 'sans-serif'] },
                    colors: {
                        brand: { dark: '#0A051A', purple: '#6D28D9', stepBg: '#2D1B5E', accent: '#8B5CF6' }
                    }
                }
            }
        }
    </script>\`;
}

function getSharedStyles() {
    return \`
    <style>
        body { background-color: #0A051A; color: #FFFFFF; font-family: 'Poppins', sans-serif; overflow-x: hidden; }
        .glass-panel { background: rgba(255, 255, 255, 0.05); backdrop-filter: blur(20px); border: 1px solid rgba(255, 255, 255, 0.1); }
        .glass { background: rgba(255, 255, 255, 0.03); backdrop-filter: blur(10px); }
        .reveal { transition: all 0.8s ease-out; }
        .js-enabled .reveal:not(.active) { opacity: 0; transform: translateY(30px); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .btn-purple { background: linear-gradient(90deg, #6D28D9 0%, #8B5CF6 100%); transition: all 0.4s; }
        .btn-purple:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(109, 40, 217, 0.3); }
    </style>\`;
}
`;
    // Add before generateModularLandingHTML if it exists
    genText = genText.replace('export function generateModularLandingHTML', helpers + '\nexport function generateModularLandingHTML');
}

fs.writeFileSync(genPath, genText, 'utf8');

// Ensure they aren't somehow duplicated or missing in Dictionary
const dictPath = path.join(__dirname, '../lib/landing/dictionary.ts');
let dictText = fs.readFileSync(dictPath, 'utf8');
dictText = dictText.replace(/function getSharedHead[\s\S]*?<\/script>`;\n}/m, "");
dictText = dictText.replace(/function getSharedStyles[\s\S]*?<\/style>`;\n}/m, "");
fs.writeFileSync(dictPath, dictText, 'utf8');

console.log('Fixed final TS errors');
