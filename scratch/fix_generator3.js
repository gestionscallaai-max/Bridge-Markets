const fs = require('fs');
const path = require('path');

const genPath = path.join(__dirname, '../lib/landing/generator.ts');
if (fs.existsSync(genPath)) {
    let genText = fs.readFileSync(genPath, 'utf8');
    
    // Fix: Remove the trailing bad import that hasn't been cleaned up
    genText = genText.replace(/import \{ LANDING_TEMPLATES \} from '\.\/landing-templates';\n/g, "");

    // Fix: Expected 3 arguments but got 0 (at line 524 roughly)
    // The issue is I forced getSharedHead to take 3 arguments, but generateModularLandingHTML calls it with 0 arguments.
    // I should remove my injected getSharedHead and getSharedStyles and replace its body inside generateModularLandingHTML with the raw HTML string, OR define them to take no arguments and just access the closure variables (data, t, heroSub).
    
    genText = genText.replace(/function getSharedHead\(title: string, desc: string, language: string\) \{[\s\S]*?\}

function getSharedStyles\(\) \{[\s\S]*?\}
/, "");
    
    // Inject them without arguments, returning the closures:
    const fixHead = `
    const getSharedHead = () => {
        return \`
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Bridge Markets | \${t?.heroTitle || 'Premium Portal'}</title>
        <meta name="description" content="\${t?.heroSub || 'Access institutional markets'}">
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
    };

    const getSharedStyles = () => {
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
    };
    `;
    genText = genText.replace('export function generateModularLandingHTML(data: LandingData): string {', 'export function generateModularLandingHTML(data: LandingData): string {' + fixHead);
    
    fs.writeFileSync(genPath, genText, 'utf8');
}
console.log('Fixed closure arguments for shared helpers and cleaned up bad imports');
