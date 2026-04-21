const fs = require('fs');
let code = fs.readFileSync('components/Forms/LandingTypeform.tsx', 'utf8');
code = code.replace(/theme=\{theme\}\s*\n\s*/g, '');
fs.writeFileSync('components/Forms/LandingTypeform.tsx', code);
console.log('Fixed theme error in LandingTypeform.tsx');
