const fs = require('fs');
const path = require('path');

const dir = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\public\\images\\imagenes_nuevas';
const files = fs.readdirSync(dir);

files.forEach(file => {
    if (file.includes(' ')) {
        const oldPath = path.join(dir, file);
        const newPath = path.join(dir, file.replace(/ /g, '_'));
        fs.renameSync(oldPath, newPath);
        console.log(`Renamed: ${file} -> ${file.replace(/ /g, '_')}`);
    }
});
