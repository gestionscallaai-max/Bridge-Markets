const fs = require('fs');
const content = fs.readFileSync('c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\app\\dashboard\\promo\\overview\\page.tsx', 'utf8');
const matches = [...content.matchAll(/t\.promo\.([A-Za-z0-9_]+)/g)];
const unique = [...new Set(matches.map(m => m[1]))];
console.log(JSON.stringify(unique));
