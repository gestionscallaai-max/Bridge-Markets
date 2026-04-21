const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\lib\\landing\\renderers';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.ts')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        // Replace both literal space and %20
        const newContent = content
            .replace(/imagenes nuevas/g, 'imagenes_nuevas')
            .replace(/imagenes%20nuevas/g, 'imagenes_nuevas')
            .replace(/reyna rosa.png/g, 'reyna_rosa.png') // just in case
            .replace(/reloj rosa.png/g, 'reloj_rosa.png')
            .replace(/caballo negro.png/g, 'caballo_negro.png')
            .replace(/caballo rosa.png/g, 'caballo_rosa.png')
            .replace(/peones rosa.png/g, 'peones_rosa.png')
            .replace(/peones negro.png/g, 'peones_negro.png');
            
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Updated: ${file}`);
        }
    }
});
