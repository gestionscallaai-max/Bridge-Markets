const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'lib/landing/renderers');
const files = fs.readdirSync(dir).filter(f => f.endsWith('.ts'));

files.forEach(f => {
    const file = path.join(dir, f);
    let content = fs.readFileSync(file, 'utf8');

    // Replace loose "transparent" back to "bg-white" in class attributes
    // Only if it's not part of bg-transparent or to-transparent
    content = content.replace(/(?<!bg-|to-|from-|via-|border-|text-)\btransparent\b/g, 'bg-white');

    fs.writeFileSync(file, content);
});

console.log("Fixed transparent back to bg-white");
