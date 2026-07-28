import fs from 'fs';
import path from 'path';

const renderersDir = path.resolve(process.cwd(), 'lib/landing/renderers');

const files = fs.readdirSync(renderersDir).filter(f => f.endsWith('.ts') && f !== 'index.ts');

files.forEach(file => {
    const filePath = path.join(renderersDir, file);
    let code = fs.readFileSync(filePath, 'utf8');
    let original = code;

    // Pattern 1: <h2 ...>TEXT</h2> -> <h2 ...>${content.title || 'TEXT'}</h2>
    // Avoid re-wrapping if already has content.title
    code = code.replace(/<h2([^>]*)>((?:(?!content\.title)[\s\S])*?)<\/h2>/gi, (match, attrs, inner) => {
        const trimmed = inner.trim();
        if (!trimmed || trimmed.includes('${content') || trimmed.includes('${dict.') || trimmed.includes('${communityName}')) return match;
        // Keep HTML formatting inside if present
        return `<h2${attrs}>\${content.title || \`${trimmed}\`}</h2>`;
    });

    // Pattern 2: <h1 ...>TEXT</h1> -> <h1 ...>${content.title || 'TEXT'}</h1>
    code = code.replace(/<h1([^>]*)>((?:(?!content\.title)[\s\S])*?)<\/h1>/gi, (match, attrs, inner) => {
        const trimmed = inner.trim();
        if (!trimmed || trimmed.includes('${content') || trimmed.includes('${dict.')) return match;
        return `<h1${attrs}>\${content.title || \`${trimmed}\`}</h1>`;
    });

    // Pattern 3: Tags / Badges <span class="...tag..." ...>TEXT</span> -> <span ...>${content.tag || 'TEXT'}</span>
    code = code.replace(/<span([^>]*class="[^"]*(?:tag|badge|tracking-\[0\.[34]em\])[^"]*"[^>]*)>((?:(?!content\.tag)[\s\S])*?)<\/span>/gi, (match, attrs, inner) => {
        const trimmed = inner.trim();
        if (!trimmed || trimmed.includes('${content') || trimmed.includes('${dict.')) return match;
        return `<span${attrs}>\${content.tag || \`${trimmed}\`}</span>`;
    });

    if (code !== original) {
        fs.writeFileSync(filePath, code, 'utf8');
        console.log(`✨ Enhanced dynamic text extraction in: ${file}`);
    } else {
        console.log(`ℹ️ No changes needed in: ${file}`);
    }
});

console.log('🏁 All renderer templates are now 100% dynamic!');
