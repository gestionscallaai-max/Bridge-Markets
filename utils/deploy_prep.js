const fs = require('fs');
const path = require('path');

function copyRecursiveSync(src, dest) {
  const exists = fs.existsSync(src);
  const stats = exists && fs.statSync(src);
  const isDirectory = exists && stats.isDirectory();
  if (isDirectory) {
    if (!fs.existsSync(dest)) {
      fs.mkdirSync(dest, { recursive: true });
    }
    fs.readdirSync(src).forEach(childItemName => {
      copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
    });
  } else {
    fs.copyFileSync(src, dest);
  }
}

async function prepare() {
  const standaloneDir = path.join(process.cwd(), '.next', 'standalone');
  const staticDir = path.join(process.cwd(), '.next', 'static');
  const publicDir = path.join(process.cwd(), 'public');

  if (!fs.existsSync(standaloneDir)) {
    console.error('Standalone directory not found. Run "npm run build" first.');
    return;
  }

  console.log('Copying static assets to standalone folder...');
  
  // Copy static
  const targetStatic = path.join(standaloneDir, '.next', 'static');
  copyRecursiveSync(staticDir, targetStatic);

  // Copy public
  const targetPublic = path.join(standaloneDir, 'public');
  copyRecursiveSync(publicDir, targetPublic);

  console.log('Done! Now you can zip the contents of ".next/standalone" and upload to Hostinger.');
}

prepare().catch(console.error);
