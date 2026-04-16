const fs = require('fs');
const path = require('path');

const locales = {
    pt: {
        synthetic_edu_name: `Índices Sintéticos (Educacional)`,
        synthetic_edu_desc: `Foco em explicar e educar sobre o mercado de sintéticos. Ideal para captar novos traders.`,
        propfirm_pro_name: `PropFirm (Contas Financiadas)`,
        propfirm_pro_desc: `Landing de alta conversão para os desafios PropFirm.`,
        unified_copy_mam_name: `MAM & Copy Trading (Unificada)`,
        unified_copy_mam_desc: `Landing dupla que explica o sistema MAM e o Copy Trading com tabelas comparativas.`,
        pro_leverage_x12_name: `Pro Leverage X12`,
        pro_leverage_x12_desc: `Especializada em contas com alavancagem x12 sem avaliação.`,
        institutional_mother_name: `Landing Institucional (Mãe)`,
        institutional_mother_desc: `A landing corporativa principal da Bridge Markets com todos os serviços integrados.`,
        synthetic_universe_total_name: `Universo Total de Sintéticos`,
        synthetic_universe_total_desc: `Landing premium que mostra o ecossistema completo: Deriv + Weltrade + Bridge Markets.`
    },
    fr: {
        synthetic_edu_name: `Indices Synthétiques (Éducatif)`,
        synthetic_edu_desc: `Axée sur l'explication et l'éducation du marché des synthétiques. Idéale pour attirer de nouveaux traders.`,
        propfirm_pro_name: `PropFirm (Comptes Financés)`,
        propfirm_pro_desc: `Landing à haute conversion pour les défis PropFirm.`,
        unified_copy_mam_name: `MAM & Copy Trading (Unifiée)`,
        unified_copy_mam_desc: `Landing double expliquant le système MAM et le Copy Trading avec tableaux comparatifs.`,
        pro_leverage_x12_name: `Pro Leverage X12`,
        pro_leverage_x12_desc: `Spécialisée dans les comptes à effet de levier x12 sans évaluation.`,
        institutional_mother_name: `Landing Institutionnelle (Mère)`,
        institutional_mother_desc: `La landing principale de Bridge Markets intégrant tous les services.`,
        synthetic_universe_total_name: `Univers Total des Synthétiques`,
        synthetic_universe_total_desc: `Landing premium présentant l'écosystème complet : Deriv + Weltrade + Bridge Markets.`
    },
    zh: {
        synthetic_edu_name: `合成指数 (教育)`,
        synthetic_edu_desc: `专注于解释和教育合成市场，是吸引新交易者的理想选择。`,
        propfirm_pro_name: `PropFirm (注资账户)`,
        propfirm_pro_desc: `为 PropFirm 挑战量身定制的高转化率登陆页。`,
        unified_copy_mam_name: `MAM与跟单交易 (统一版)`,
        unified_copy_mam_desc: `双重登陆页，通过对比表解释MAM系统和跟单交易。`,
        pro_leverage_x12_name: `专业杠杆 X12`,
        pro_leverage_x12_desc: `专注于无需评估的 x12 杠杆账户。`,
        institutional_mother_name: `机构主页 (母版)`,
        institutional_mother_desc: `Bridge Markets 整合所有服务的主要企业级登陆页。`,
        synthetic_universe_total_name: `合成宇宙终极版`,
        synthetic_universe_total_desc: `展示完整生态系统的高级体验：Deriv + Weltrade + Bridge Markets。`
    },
    ja: {
        synthetic_edu_name: `シンセティックインデックス（教育）`,
        synthetic_edu_desc: `シンセティック市場の解説と教育に特化。新規トレーダーの獲得に最適。`,
        propfirm_pro_name: `PropFirm（資金運用アカウント）`,
        propfirm_pro_desc: `PropFirmチャレンジ向けの高コンバージョンLP。`,
        unified_copy_mam_name: `MAM & コピートレード（統合版）`,
        unified_copy_mam_desc: `比較表を用いてMAMシステムとコピートレードの両方を解説するデュアルLP。`,
        pro_leverage_x12_name: `プロレバレッジ X12`,
        pro_leverage_x12_desc: `審査なしの12倍レバレッジアカウントに特化。`,
        institutional_mother_name: `コーポレートLP（メイン）`,
        institutional_mother_desc: `全サービスを統合したBridge Marketsのメイン企業向けLP。`,
        synthetic_universe_total_name: `トータル・シンセティック・ユニバース`,
        synthetic_universe_total_desc: `完全なエコシステム（Deriv + Weltrade + Bridge Markets）を全方位から見せるプレミアムLP。`
    },
    ru: {
        synthetic_edu_name: `Синтетические Индексы (Образовательный)`,
        synthetic_edu_desc: `Фокус на объяснении и обучении рынку синтетиков. Идеально для привлечения новых трейдеров.`,
        propfirm_pro_name: `PropFirm (Финансируемые счета)`,
        propfirm_pro_desc: `Лендинг с высокой конверсией для челленджей PropFirm.`,
        unified_copy_mam_name: `MAM & Copy Trading (Единый)`,
        unified_copy_mam_desc: `Двойной лендинг, объясняющий систему MAM и Copy Trading с помощью сравнительных таблиц.`,
        pro_leverage_x12_name: `Pro Leverage X12`,
        pro_leverage_x12_desc: `Специализируется на счетах с кредитным плечом x12 без оценки.`,
        institutional_mother_name: `Институциональный Лендинг (Основной)`,
        institutional_mother_desc: `Главный корпоративный лендинг Bridge Markets со всеми интегрированными услугами.`,
        synthetic_universe_total_name: `Total Synthetics Universe`,
        synthetic_universe_total_desc: `Премиум-лендинг, демонстрирующий полную экосистему: Deriv + Weltrade + Bridge Markets.`
    },
    ar: {
        synthetic_edu_name: `المؤشرات الصناعية (تعليمي)`,
        synthetic_edu_desc: `يركز على شرح وتثقيف سوق الأصول الصناعية. مثالي لجذب المتداولين الجدد.`,
        propfirm_pro_name: `PropFirm (حسابات ممولة)`,
        propfirm_pro_desc: `صفحة هبوط عالية التحويل لتحديات PropFirm.`,
        unified_copy_mam_name: `MAM & Copy Trading (موحد)`,
        unified_copy_mam_desc: `صفحة هبوط مزدوجة تشرح نظام MAM و Copy Trading بجداول مقارنة.`,
        pro_leverage_x12_name: `Pro Leverage X12`,
        pro_leverage_x12_desc: `متخصص في حسابات الرافعة المالية x12 بدون تقييم.`,
        institutional_mother_name: `الصفحة المؤسسية (الأم)`,
        institutional_mother_desc: `الصفحة الرئيسية لشركة Bridge Markets التي تدمج جميع الخدمات.`,
        synthetic_universe_total_name: `الكون الشامل للأصول الصناعية`,
        synthetic_universe_total_desc: `صفحة بريميوم تعرض النظام البيئي الكامل: Deriv + Weltrade + Bridge Markets.`
    },
    hi: {
        synthetic_edu_name: `सिंथेटिक सूचकांक (शैक्षिक)`,
        synthetic_edu_desc: `सिंथेटिक्स बाजार के बारे में समझाने और शिक्षित करने पर केंद्रित। नए व्यापारियों को आकर्षित करने के लिए आदर्श।`,
        propfirm_pro_name: `प्रॉप-फर्म (वित्त पोषित खाते)`,
        propfirm_pro_desc: `प्रॉप-फर्म के लिए उच्च रूपांतरण लैंडिंग पृष्ठ चुनौती।`,
        unified_copy_mam_name: `MAM और कॉपी ट्रेडिंग (एकीकृत)`,
        unified_copy_mam_desc: `तुलनात्मक तालिकाओं के साथ एमएएम प्रणाली और कॉपी ट्रेडिंग दोनों को समझाने वाला दोहरा लैंडिंग।`,
        pro_leverage_x12_name: `प्रो लीवरेज X12`,
        pro_leverage_x12_desc: `बिना मूल्यांकन के x12 लीवरेज खातों में विशेषज्ञता।`,
        institutional_mother_name: `संस्थागत लैंडिंग (मुख्य)`,
        institutional_mother_desc: `सभी सेवाओं को एकीकृत करने वाला Bridge Markets का मुख्य कॉर्पोरेट लैंडिंग पृष्ठ।`,
        synthetic_universe_total_name: `कुल सिंथेटिक्स ब्रह्मांड`,
        synthetic_universe_total_desc: `संपूर्ण पारिस्थितिकी तंत्र दिखाने वाली प्रीमियम लैंडिंग: Deriv + Weltrade + Bridge Markets.`
    },
    bn: {
        synthetic_edu_name: `সিন্থেটিক সূচক (শিক্ষামূলক)`,
        synthetic_edu_desc: `সিন্থেটিক বাজার সম্পর্কে বোঝানো এবং শিক্ষাদানের উপর ফোকাস। নতুন ট্রেডারদের আকৃষ্ট করার জন্য আদর্শ।`,
        propfirm_pro_name: `PropFirm (তহবিলযুক্ত অ্যাকাউন্ট)`,
        propfirm_pro_desc: `PropFirm চ্যালেঞ্জের জন্য উচ্চ রূপান্তর ল্যান্ডিং।`,
        unified_copy_mam_name: `MAM এবং কপি ট্রেডিং (একীভূত)`,
        unified_copy_mam_desc: `তুলনামূলক টেবিলের সাথে MAM সিস্টেম এবং কপি ট্রেডিং উভয়ই ব্যাখ্যা করা দ্বৈত ল্যান্ডিং।`,
        pro_leverage_x12_name: `প্রো লিভারেজ X12`,
        pro_leverage_x12_desc: `মূল্যায়ন ছাড়াই x12 লিভারেজ অ্যাকাউন্টে বিশেষায়িত।`,
        institutional_mother_name: `প্রাতিষ্ঠানিক ল্যান্ডিং (প্রধান)`,
        institutional_mother_desc: `সমস্ত পরিষেবা একত্রিত করে Bridge Markets-এর প্রধান কর্পোরেট ল্যান্ডিং।`,
        synthetic_universe_total_name: `মোট সিন্থেটিক্স ইউনিভার্স`,
        synthetic_universe_total_desc: `সম্পূর্ণ ইকোসিস্টেম প্রদর্শন করা প্রিমিয়াম ল্যান্ডিং: Deriv + Weltrade + Bridge Markets.`
    }
};

const dir = path.join(__dirname, 'lib/i18n/locales');

for (const [lang, translations] of Object.entries(locales)) {
    const file = path.join(dir, `${lang}.ts`);
    if (fs.existsSync(file)) {
        let content = fs.readFileSync(file, 'utf8');
        
        let templatesStr = '    templates: {\n';
        for (const [key, val] of Object.entries(translations)) {
            const escapedVal = val.replace(/'/g, "\\'");
            templatesStr += `        ${key}: '${escapedVal}',\n`;
        }
        templatesStr += '    }';

        // Replace the entire templates: { ... } block
        content = content.replace(/templates:\s*{[\s\S]*?}(?=,|;)/, templatesStr);
        fs.writeFileSync(file, content);
        console.log(`Updated ${lang}.ts`);
    } else {
        console.log(`File not found: ${lang}.ts`);
    }
}
