import fs from 'fs';
import path from 'path';

const localesDir = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\lib\\i18n\\locales';
const files = ['ar.ts', 'bn.ts', 'fr.ts', 'hi.ts', 'ja.ts', 'pt.ts', 'ru.ts', 'zh.ts'];

const translations = {
    ar: 'متاح',
    bn: 'উপলব্ধ',
    fr: 'Disponible',
    hi: 'उपलब्ध',
    ja: '利用可能',
    pt: 'Disponível',
    ru: 'Доступно',
    zh: '可用'
};

files.forEach(file => {
    const filePath = path.join(localesDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    const lang = file.split('.')[0];
    const availableText = translations[lang] || 'Available';

    // Look for sectionAdded: '...', and insert available: '...' after it
    // We need to match the pattern carefully
    if (content.includes("sectionAdded:")) {
        content = content.replace(
            /(sectionAdded:\s*['"][^'"]+['"]),?/,
            `$1, available: '${availableText}',`
        );
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${file}`);
    } else {
        console.log(`Could not find sectionAdded in ${file}`);
    }
});
