const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\lib\\landing\\renderers';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.endsWith('.ts')) {
        const filePath = path.join(dir, file);
        let content = fs.readFileSync(filePath, 'utf8');
        
        const newContent = content
            .replace(/imagenes nuevas/g, 'imagenes_nuevas')
            .replace(/imagenes%20nuevas/g, 'imagenes_nuevas')
            .replace(/reyna%20rosa.png/g, 'reyna_rosa.png')
            .replace(/reyna rosa.png/g, 'reyna_rosa.png')
            .replace(/reloj%20rosa.png/g, 'reloj_rosa.png')
            .replace(/reloj rosa.png/g, 'reloj_rosa.png')
            .replace(/rey%20rosa.png/g, 'rey_rosa.png')
            .replace(/rey rosa.png/g, 'rey_rosa.png')
            .replace(/caballo%20negro.png/g, 'caballo_negro.png')
            .replace(/caballo negro.png/g, 'caballo_negro.png')
            .replace(/peones%20rosa.png/g, 'peones_rosa.png')
            .replace(/peones rosa.png/g, 'peones_rosa.png');
            
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent);
            console.log(`Deep Fix: ${file}`);
        }
    }
});
