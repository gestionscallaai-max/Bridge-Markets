const fs = require('fs');
const filePath = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\lib\\i18n\\translations.ts';
let content = fs.readFileSync(filePath, 'utf8');

const missingKeys = {
    zh: {
        documentsTab: '文件', docSearch: '搜索文件...', docType: '类型', docLanguage: '语言',
        catManuales: '手册和常见问题', catPayRetailers: '支付零售商', catGlosarios: '词汇表', catPresentaciones: '演示稿'
    },
    hi: {
        documentsTab: 'दस्तावेज़', docSearch: 'दस्तावेज़ खोजें...', docType: 'प्रकार', docLanguage: 'भाषा',
        catManuales: 'मैनुअल और अक्सर पूछे जाने वाले प्रश्न', catPayRetailers: 'पे रिटेलर्स', catGlosarios: 'शब्दावली', catPresentaciones: 'प्रस्तुतियां'
    },
    fr: {
        documentsTab: 'Documents', docSearch: 'Rechercher des documents...', docType: 'Type', docLanguage: 'Langue',
        catManuales: 'Manuels et FAQ', catPayRetailers: 'Pay Retailers', catGlosarios: 'Glossaires', catPresentaciones: 'Présentations'
    },
    ar: {
        documentsTab: 'المستندات', docSearch: 'البحث عن المستندات...', docType: 'النوع', docLanguage: 'اللغة',
        catManuales: 'كتيبات وأسئلة شائعة', catPayRetailers: 'تجار الدفع بالتجزئة', catGlosarios: 'المصطلحات', catPresentaciones: 'العروض التقديمية'
    },
    bn: {
        documentsTab: 'নথিপত্র', docSearch: 'নথিপত্র অনুসন্ধান করুন...', docType: 'ধরণ', docLanguage: 'ভাষা',
        catManuales: 'ম্যানুয়াল এবং প্রায়শই জিজ্ঞাসিত প্রশ্ন', catPayRetailers: 'পে রিটেইলার্স', catGlosarios: 'শব্দকোষ', catPresentaciones: 'উপস্থাপনা'
    },
    pt: {
        documentsTab: 'Documentos', docSearch: 'Pesquisar documentos...', docType: 'Tipo', docLanguage: 'Idioma',
        catManuales: 'Manuais e FAQ', catPayRetailers: 'Pay Retailers', catGlosarios: 'Glossários', catPresentaciones: 'Apresentações'
    },
    ru: {
        documentsTab: 'Документы', docSearch: 'Поиск документов...', docType: 'Тип', docLanguage: 'Язык',
        catManuales: 'Руководства и FAQ', catPayRetailers: 'Платежные системы', catGlosarios: 'Глоссарии', catPresentaciones: 'Презентации'
    },
    ja: {
        documentsTab: 'ドキュメント', docSearch: 'ドキュメントを検索...', docType: 'タイプ', docLanguage: '言語',
        catManuales: 'マニュアルとFAQ', catPayRetailers: 'ペイ・リテイラーズ', catGlosarios: '用語集', catPresentaciones: 'プレゼンテーション'
    }
};

for (const [lang, keys] of Object.entries(missingKeys)) {
    // Find the promo block for this language
    // Pattern: langCode: { ... promo: { ... } }
    const regex = new RegExp(`${lang}: \\{[\\s\\S]*?promo: \\{([\\s\\S]*?)\\}`, 'm');
    const match = content.match(regex);
    if (match) {
        let promoBody = match[1];
        // Check if already has documentsTab to avoid double adding
        if (!promoBody.includes('documentsTab')) {
            const extra = `,\n            documentsTab: '${keys.documentsTab}', docSearch: '${keys.docSearch}', docType: '${keys.docType}', docLanguage: '${keys.docLanguage}',\n            catManuales: '${keys.catManuales}', catPayRetailers: '${keys.catPayRetailers}', catGlosarios: '${keys.catGlosarios}', catPresentaciones: '${keys.catPresentaciones}',`;
            
            // Replace the end of the last line inside promo {}
            // Find the last property before the closing brace
            const lines = promoBody.split('\n');
            let lastLineIndex = -1;
            for(let i=lines.length-1; i>=0; i--) {
                if(lines[i].trim().length > 0 && lines[i].includes(':')) {
                    lastLineIndex = i;
                    break;
                }
            }
            if (lastLineIndex !== -1) {
                lines[lastLineIndex] = lines[lastLineIndex].replace(/,?$/, extra);
                const newPromoBody = lines.join('\n');
                content = content.replace(match[0], match[0].replace(match[1], newPromoBody));
            }
        }
    }
}

fs.writeFileSync(filePath, content, 'utf8');
console.log('Translations fixed successfully');
