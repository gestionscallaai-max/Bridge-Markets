const fs = require('fs');

const path = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\lib\\i18n\\translations.ts';
let code = fs.readFileSync(path, 'utf8');

// 1. Add to TranslationKeys
if (!code.includes('promo: {')) {
    const keysEnd = code.indexOf('// Landing page form');
    if (keysEnd !== -1) {
        const promoTypeBlock = `
    promo: {
        sections: string;
        languages: string;
        documentsTab: string;
        all: string;
        createCustom: string;
        customize: string;
        more: string;
        uploadPiece: string;
        imageUploaded: string;
        dragOrClick: string;
        aspectRatio: string;
        export: string;
    };
    `;
        code = code.substring(0, keysEnd) + promoTypeBlock + code.substring(keysEnd);
    }
}

// 2. Inject translations into each language
const translations = {
    es: {
        sections: 'Secciones', languages: 'Idiomas', documentsTab: 'Documentos', all: 'Todos',
        createCustom: 'Crear Diseño Propio', customize: 'Personalizar', more: 'más',
        uploadPiece: 'Sube tu pieza', imageUploaded: 'Imagen Subida Exitosamente',
        dragOrClick: 'Arrastra tu imagen o haz clic', aspectRatio: 'Relación de Aspecto', export: 'Exportar'
    },
    en: {
        sections: 'Sections', languages: 'Languages', documentsTab: 'Documents', all: 'All',
        createCustom: 'Create Custom Design', customize: 'Customize', more: 'more',
        uploadPiece: 'Upload your piece', imageUploaded: 'Image Uploaded Successfully',
        dragOrClick: 'Drag your image or click', aspectRatio: 'Aspect Ratio', export: 'Export'
    },
    zh: {
        sections: '部分', languages: '语言', documentsTab: '文件', all: '全部',
        createCustom: '创建自定义设计', customize: '自定义', more: '更多',
        uploadPiece: '上传您的作品', imageUploaded: '图像上传成功',
        dragOrClick: '拖曳相片或点选', aspectRatio: '屏幕比例', export: '导出'
    },
    hi: {
        sections: 'अनुभाग', languages: 'भाषाएँ', documentsTab: 'दस्तावेज़', all: 'सभी',
        createCustom: 'कस्टम डिज़ाइन बनाएँ', customize: 'कस्टमाइज़ करें', more: 'और',
        uploadPiece: 'अपनी तस्वीर अपलोड करें', imageUploaded: 'छवि सफलतापूर्वक अपलोड की गई',
        dragOrClick: 'अपनी छवि खींचें या क्लिक करें', aspectRatio: 'पहलू अनुपात', export: 'निर्यात'
    },
    fr: {
        sections: 'Sections', languages: 'Langues', documentsTab: 'Documents', all: 'Tous',
        createCustom: 'Créer un design personnalisé', customize: 'Personnaliser', more: 'plus',
        uploadPiece: 'Téléchargez votre pièce', imageUploaded: 'Image téléchargée avec succès',
        dragOrClick: 'Faites glisser votre image ou cliquez', aspectRatio: "Ratio d'aspect", export: 'Exporter'
    },
    ar: {
        sections: 'الأقسام', languages: 'اللغات', documentsTab: 'مستندات', all: 'الكل',
        createCustom: 'إنشاء تصميم مخصص', customize: 'تخصيص', more: 'المزيد',
        uploadPiece: 'تحميل صورتك', imageUploaded: 'تم تحميل الصورة بنجاح',
        dragOrClick: 'اسحب صورتك أو انقر', aspectRatio: 'نسبة العرض إلى الارتفاع', export: 'تصدير'
    },
    bn: {
        sections: 'বিভাগ', languages: 'ভাষাসমসমূহ', documentsTab: 'নথিপত্র', all: 'সব',
        createCustom: 'কাস্টম ডিজাইন তৈরি করুন', customize: 'কাস্টমাইজ', more: 'আরও',
        uploadPiece: 'আপনার ছবি আপলোড করুন', imageUploaded: 'ছবি সফলভাবে আপলোড করা হয়েছে',
        dragOrClick: 'আপনার ছবি টানুন বা ক্লিক করুন', aspectRatio: 'এসপেক্ট রেসিও', export: 'রপ্তানি'
    },
    pt: {
        sections: 'Seções', languages: 'Idiomas', documentsTab: 'Documentos', all: 'Todos',
        createCustom: 'Criar Design Personalizado', customize: 'Personalizar', more: 'mais',
        uploadPiece: 'Mande sua peça', imageUploaded: 'Imagem Carregada com Sucesso',
        dragOrClick: 'Arraste a capa ou clique', aspectRatio: 'Proporção', export: 'Exportar'
    },
    ru: {
        sections: 'Разделы', languages: 'Языки', documentsTab: 'Документы', all: 'Все',
        createCustom: 'Создать Свой Дизайн', customize: 'Настроить', more: 'еще',
        uploadPiece: 'Загрузить файл', imageUploaded: 'Изображение успешно загружено',
        dragOrClick: 'Перетащите изображение или нажмите', aspectRatio: 'Соотношение сторон', export: 'Экспорт'
    },
    ja: {
        sections: 'セクション', languages: '言語', documentsTab: '文書', all: 'すべて',
        createCustom: 'カスタムデザイン作成', customize: 'カスタマイズ', more: 'もっと',
        uploadPiece: '作品をアップロード', imageUploaded: '画像が正常にアップロードされました',
        dragOrClick: '画像をドラッグするか、クリックしてください', aspectRatio: 'アスペクト比', export: '書き出し'
    }
};

const langObjStart = Object.keys(translations).map(lang => {
    return {
        // Looking for "lang: {" inside "const T: Record<LangCode, TranslationKeys> = {"
        regex: new RegExp(\`\\\\b\${lang}: \\{\\s*nav:\`, 'g'),
        replacement: \`\${lang}: {
        promo: {
            sections: "\${translations[lang].sections}",
            languages: "\${translations[lang].languages}",
            documentsTab: "\${translations[lang].documentsTab}",
            all: "\${translations[lang].all}",
            createCustom: "\${translations[lang].createCustom}",
            customize: "\${translations[lang].customize}",
            more: "\${translations[lang].more}",
            uploadPiece: "\${translations[lang].uploadPiece}",
            imageUploaded: "\${translations[lang].imageUploaded}",
            dragOrClick: "\${translations[lang].dragOrClick}",
            aspectRatio: "\${translations[lang].aspectRatio}",
            export: "\${translations[lang].export}",
        },
        nav:\`
    };
});

let modifiedCode = code;
langObjStart.forEach(({regex, replacement}) => {
    modifiedCode = modifiedCode.replace(regex, replacement);
});

fs.writeFileSync(path, modifiedCode, 'utf8');
console.log('Fixed translations.ts');
