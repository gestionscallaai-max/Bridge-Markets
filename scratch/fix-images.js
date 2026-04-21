const fs = require('fs');
const path = require('path');

const baseDir = path.join(process.cwd(), 'public', 'images');
const oldDir = path.join(baseDir, 'imagenes nuevas');
const newDir = path.join(baseDir, 'assets-v3');

if (fs.existsSync(oldDir)) {
    console.log('Renaming folder...');
    fs.renameSync(oldDir, newDir);
    
    console.log('Renaming files inside...');
    const files = fs.readdirSync(newDir);
    files.forEach(file => {
        const oldFile = path.join(newDir, file);
        const newFile = path.join(newDir, file.replace(/\s+/g, '-'));
        if (oldFile !== newFile) {
            fs.renameSync(oldFile, newFile);
            console.log(`Renamed: ${file} -> ${path.basename(newFile)}`);
        }
    });
} else {
    console.log('Directory not found:', oldDir);
}
