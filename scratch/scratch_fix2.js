const fs = require('fs');
const filePath = 'lib/landing/generator.ts';
let code = fs.readFileSync(filePath, 'utf8');

code = code.replace(
    /getSharedHead\(template\?\.name \|\| 'Trading Platform', 'Access institutional markets', data\.language\)/g,
    "getSharedHead(template?.name || 'Trading Platform', 'Access institutional markets')"
);

fs.writeFileSync(filePath, code);
console.log('Fixed generator.ts');
