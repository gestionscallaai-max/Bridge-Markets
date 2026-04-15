// ─────────────────────────────────────────────────────────────
// Template & Section name translations for 10 languages
// Used by promo/overview to translate template cards
// ─────────────────────────────────────────────────────────────
import type { LangCode } from './translations';

// ── Template descriptions ──
const TEMPLATE_DESC: Record<string, Record<LangCode, string>> = {
    pro_trading_v1: {
        es: 'Landing completa con hero oscuro, leaderboard de traders, analytics y calculadora de rendimiento.',
        en: 'Complete landing with dark hero, trader leaderboard, analytics and performance calculator.',
        zh: '完整落地页：暗色主题、交易员排行榜、分析和收益计算器。',
        hi: 'डार्क हीरो, ट्रेडर लीडरबोर्ड, एनालिटिक्स और कैलकुलेटर वाला पूर्ण लैंडिंग।',
        fr: 'Landing complète avec hero sombre, classement traders, analytics et calculateur.',
        ar: 'صفحة كاملة مع بطل داكن، لوحة تصنيف المتداولين، تحليلات وحاسبة الأداء.',
        bn: 'ডার্ক হিরো, ট্রেডার লিডারবোর্ড, অ্যানালিটিক্স এবং ক্যালকুলেটর সহ সম্পূর্ণ ল্যান্ডিং।',
        pt: 'Landing completa com hero escuro, leaderboard de traders, analytics e calculadora.',
        ru: 'Полный лендинг с тёмным хедером, рейтингом трейдеров, аналитикой и калькулятором.',
        ja: 'ダークヒーロー、トレーダーリーダーボード、アナリティクス、計算機付き完全LP。',
    },
    market_insights: {
        es: 'Enfocada en análisis de mercado con datos en tiempo real y herramientas de investigación.',
        en: 'Focused on market analysis with real-time data and research tools.',
        zh: '专注于市场分析，包含实时数据和研究工具。',
        hi: 'वास्तविक समय डेटा और अनुसंधान टूल के साथ बाजार विश्लेषण पर केंद्रित।',
        fr: 'Axée sur l\'analyse de marché avec données en temps réel et outils de recherche.',
        ar: 'مركّزة على تحليل السوق مع بيانات فورية وأدوات بحث.',
        bn: 'রিয়েল-টাইম ডেটা এবং গবেষণা টুলসহ বাজার বিশ্লেষণে ফোকাস।',
        pt: 'Focada em análise de mercado com dados em tempo real e ferramentas de pesquisa.',
        ru: 'Фокус на анализе рынка с данными в реальном времени и инструментами исследования.',
        ja: 'リアルタイムデータとリサーチツールによる市場分析特化型。',
    },
    liquidity_node: {
        es: 'Diseño institucional para fondos y clientes de alto patrimonio con énfasis en prop trading.',
        en: 'Institutional design for funds and high-net-worth clients focused on prop trading.',
        zh: '面向基金和高净值客户的机构设计，重点自营交易。',
        hi: 'फंड और उच्च संपत्ति वाले ग्राहकों के लिए संस्थागत डिज़ाइन, प्रॉप ट्रेडिंग पर जोर।',
        fr: 'Design institutionnel pour fonds et clients fortunés axé sur le prop trading.',
        ar: 'تصميم مؤسسي للصناديق والعملاء ذوي الثروات العالية مع التركيز على التداول.',
        bn: 'ফান্ড এবং উচ্চ সম্পত্তির ক্লায়েন্টদের জন্য প্রাতিষ্ঠানিক ডিজাইন।',
        pt: 'Design institucional para fundos e clientes de alto patrimônio com foco em prop trading.',
        ru: 'Институциональный дизайн для фондов и состоятельных клиентов, фокус на проп-трейдинге.',
        ja: 'ファンドと富裕層向け機関投資家デザイン、プロップトレーディング重視。',
    },
    crystal_dashboard: {
        es: 'La más completa: hero claro, bento grid, mapa global, testimonios, educación y más.',
        en: 'Most complete: light hero, bento grid, global map, testimonials, education and more.',
        zh: '最全面：亮色主题、Bento网格、全球地图、推荐、教育等。',
        hi: 'सबसे पूर्ण: लाइट हीरो, बेंटो ग्रिड, वैश्विक मानचित्र, प्रशंसापत्र और अधिक।',
        fr: 'La plus complète: hero clair, bento grid, carte mondiale, témoignages et plus.',
        ar: 'الأكثر اكتمالاً: بطل فاتح، شبكة بنتو، خريطة عالمية، شهادات وأكثر.',
        bn: 'সবচেয়ে সম্পূর্ণ: লাইট হিরো, বেন্টো গ্রিড, বিশ্ব মানচিত্র, সাক্ষ্য এবং আরও।',
        pt: 'A mais completa: hero claro, bento grid, mapa global, depoimentos e mais.',
        ru: 'Самый полный: светлый хедер, бенто-сетка, мировая карта, отзывы и многое другое.',
        ja: '最も完成度の高い：ライトヒーロー、ベントグリッド、世界地図、推薦文、教育等。',
    },
    dark_horizon: {
        es: 'Diseño premium ultra-oscuro con enfoque en activos múltiples y seguridad.',
        en: 'Ultra-dark premium design focused on multi-asset trading and security.',
        zh: '超暗高级设计，专注于多资产交易和安全。',
        hi: 'मल्टी-एसेट ट्रेडिंग और सुरक्षा पर केंद्रित अल्ट्रा-डार्क प्रीमियम डिज़ाइन।',
        fr: 'Design premium ultra-sombre axé sur le multi-actifs et la sécurité.',
        ar: 'تصميم بريميوم داكن جداً يركز على التداول متعدد الأصول والأمان.',
        bn: 'মাল্টি-অ্যাসেট ট্রেডিং এবং সুরক্ষায় ফোকাস করা আল্ট্রা-ডার্ক প্রিমিয়াম ডিজাইন।',
        pt: 'Design premium ultra-escuro focado em multi-ativos e segurança.',
        ru: 'Ультра-тёмный премиум-дизайн: мультиактивная торговля и безопасность.',
        ja: 'マルチアセットとセキュリティ重視のウルトラダークプレミアムデザイン。',
    },
    alpha_stream: {
        es: 'Optimizada para conversión con hero gradiente, sintéticos, badges de confianza y CTA potente.',
        en: 'Optimized for conversion with gradient hero, synthetics, trust badges and strong CTA.',
        zh: '优化转化率：渐变主题、合成品、信任徽章和强力CTA。',
        hi: 'ग्रेडिएंट हीरो, सिंथेटिक्स, ट्रस्ट बैज और मजबूत CTA के साथ कन्वर्जन के लिए अनुकूलित।',
        fr: 'Optimisée pour la conversion avec hero gradient, synthétiques, badges et CTA puissant.',
        ar: 'محسّنة للتحويل مع بطل متدرج، أصول صناعية، شارات ثقة وCTA قوي.',
        bn: 'গ্রেডিয়েন্ট হিরো, সিন্থেটিক্স, ট্রাস্ট ব্যাজ এবং শক্তিশালী CTA সহ রূপান্তরের জন্য অপ্টিমাইজড।',
        pt: 'Otimizada para conversão com hero gradiente, sintéticos, badges e CTA forte.',
        ru: 'Оптимизировано для конверсии: градиентный хедер, синтетики, бейджи доверия и мощный CTA.',
        ja: 'グラデーションヒーロー、シンセティクス、信頼バッジ、強力CTA付きコンバージョン最適化。',
    },
    bridge_core: {
        es: 'Diseño corporativo con apalancamiento pro, testimonios y tutoriales integrados.',
        en: 'Corporate design with pro leverage, testimonials and integrated tutorials.',
        zh: '企业设计：专业杠杆、推荐和集成教程。',
        hi: 'प्रो लीवरेज, प्रशंसापत्र और एकीकृत ट्यूटोरियल वाला कॉर्पोरेट डिज़ाइन।',
        fr: 'Design corporate avec levier pro, témoignages et tutoriels intégrés.',
        ar: 'تصميم مؤسسي مع رافعة احترافية، شهادات ودروس مدمجة.',
        bn: 'প্রো লিভারেজ, সাক্ষ্য এবং সমন্বিত টিউটোরিয়াল সহ কর্পোরেট ডিজাইন।',
        pt: 'Design corporativo com alavancagem pro, depoimentos e tutoriais integrados.',
        ru: 'Корпоративный дизайн: профессиональное плечо, отзывы и встроенные руководства.',
        ja: 'プロレバレッジ、推薦文、統合チュートリアル付きコーポレートデザイン。',
    },
    trade_flow: {
        es: 'Landing compacta para índices con diseño limpio y flujo de conversión rápido.',
        en: 'Compact landing for indices with clean design and fast conversion flow.',
        zh: '紧凑型指数落地页，干净设计和快速转化流程。',
        hi: 'क्लीन डिज़ाइन और तेज़ कन्वर्जन फ्लो वाला इंडेक्स के लिए कॉम्पैक्ट लैंडिंग।',
        fr: 'Landing compacte pour indices avec design épuré et conversion rapide.',
        ar: 'صفحة مضغوطة للمؤشرات بتصميم نظيف وتحويل سريع.',
        bn: 'ক্লিন ডিজাইন এবং দ্রুত রূপান্তর ফ্লো সহ ইনডেক্সের জন্য কমপ্যাক্ট ল্যান্ডিং।',
        pt: 'Landing compacta para índices com design limpo e conversão rápida.',
        ru: 'Компактный лендинг для индексов: чистый дизайн и быстрая конверсия.',
        ja: 'クリーンデザインと高速コンバージョンフローの指数向けコンパクトLP。',
    },
    quantum_edge: {
        es: 'Diseño tipo bento con tiles interactivos para traders tecnológicos avanzados.',
        en: 'Bento-style design with interactive tiles for advanced tech traders.',
        zh: 'Bento风格设计，交互式磁贴，面向高级技术交易者。',
        hi: 'उन्नत टेक ट्रेडर्स के लिए इंटरैक्टिव टाइल्स वाला बेंटो-स्टाइल डिज़ाइन।',
        fr: 'Design bento avec tuiles interactives pour traders technologiques avancés.',
        ar: 'تصميم بنتو مع بلاطات تفاعلية للمتداولين التقنيين المتقدمين.',
        bn: 'উন্নত টেক ট্রেডারদের জন্য ইন্টারেক্টিভ টাইলস সহ বেন্টো-স্টাইল ডিজাইন।',
        pt: 'Design bento com tiles interativos para traders tecnológicos avançados.',
        ru: 'Бенто-дизайн с интерактивными плитками для продвинутых техно-трейдеров.',
        ja: '上級テクノロジートレーダー向けインタラクティブタイル付きベントデザイン。',
    },
    nexus_portal: {
        es: 'Portal moderno con hero minimalista y enfoque en apalancamiento profesional.',
        en: 'Modern portal with minimalist hero focused on professional leverage.',
        zh: '现代门户：极简主题，专注于专业杠杆。',
        hi: 'पेशेवर लीवरेज पर केंद्रित न्यूनतम हीरो वाला आधुनिक पोर्टल।',
        fr: 'Portail moderne avec hero minimaliste axé sur le levier professionnel.',
        ar: 'بوابة حديثة مع بطل بسيط يركز على الرافعة المهنية.',
        bn: 'পেশাদার লিভারেজে ফোকাস করা মিনিমালিস্ট হিরো সহ আধুনিক পোর্টাল।',
        pt: 'Portal moderno com hero minimalista focado em alavancagem profissional.',
        ru: 'Современный портал: минималистичный хедер, фокус на профессиональном плече.',
        ja: 'プロフェッショナルレバレッジ重視のミニマリストヒーロー付きモダンポータル。',
    },
    stellar_assets: {
        es: 'Enfocada en criptoactivos y activos digitales con diseño holo-futurista.',
        en: 'Focused on crypto and digital assets with holo-futuristic design.',
        zh: '专注加密和数字资产的全息未来主义设计。',
        hi: 'होलो-फ्यूचरिस्टिक डिज़ाइन के साथ क्रिप्टो और डिजिटल एसेट्स पर केंद्रित।',
        fr: 'Axée sur les crypto-actifs et actifs numériques au design holo-futuriste.',
        ar: 'مركّزة على الأصول الرقمية والمشفرة بتصميم مستقبلي.',
        bn: 'হোলো-ফিউচারিস্টিক ডিজাইনে ক্রিপ্টো এবং ডিজিটাল অ্যাসেটে ফোকাস।',
        pt: 'Focada em cripto e ativos digitais com design holo-futurista.',
        ru: 'Фокус на криптоактивах и цифровых активах с голофутуристическим дизайном.',
        ja: 'ホロフューチャリスティックデザインの暗号資産・デジタル資産特化型。',
    },
    prime_access: {
        es: 'Diseño VIP para sintéticos con enfoque exclusivo y acceso premium.',
        en: 'VIP design for synthetics with exclusive focus and premium access.',
        zh: 'VIP设计：合成品专属，尊享访问。',
        hi: 'विशेष फोकस और प्रीमियम एक्सेस वाला सिंथेटिक्स के लिए VIP डिज़ाइन।',
        fr: 'Design VIP pour synthétiques avec accès premium et focus exclusif.',
        ar: 'تصميم VIP للأصول الصناعية مع تركيز حصري ووصول بريميوم.',
        bn: 'এক্সক্লুসিভ ফোকাস এবং প্রিমিয়াম অ্যাক্সেস সহ সিন্থেটিক্সের জন্য VIP ডিজাইন।',
        pt: 'Design VIP para sintéticos com foco exclusivo e acesso premium.',
        ru: 'VIP-дизайн для синтетиков: эксклюзивный фокус и премиум-доступ.',
        ja: 'シンセティクス向けVIPデザイン：エクスクルーシブフォーカスとプレミアムアクセス。',
    },
    universo_sinteticos_v1: {
        es: 'Primera versión del ecosistema de sintéticos con grid de instrumentos y estadísticas.',
        en: 'First version of the synthetics ecosystem with instrument grid and stats.',
        zh: '合成品生态系统第一版，含工具网格和统计数据。',
        hi: 'इंस्ट्रूमेंट ग्रिड और आँकड़ों के साथ सिंथेटिक्स इकोसिस्टम का पहला संस्करण।',
        fr: 'Première version de l\'écosystème synthétiques avec grille d\'instruments et stats.',
        ar: 'النسخة الأولى من نظام الأصول الصناعية مع شبكة أدوات وإحصائيات.',
        bn: 'ইনস্ট্রুমেন্ট গ্রিড এবং স্ট্যাটস সহ সিন্থেটিক্স ইকোসিস্টেমের প্রথম সংস্করণ।',
        pt: 'Primeira versão do ecossistema de sintéticos com grid de instrumentos e stats.',
        ru: 'Первая версия экосистемы синтетиков: сетка инструментов и статистика.',
        ja: 'インストルメントグリッドと統計付きシンセティクスエコシステムv1。',
    },
    universo_sinteticos_v2: {
        es: 'Evolución definitiva con hero gradiente, testimonios y flujo de registro optimizado.',
        en: 'Definitive evolution with gradient hero, testimonials and optimized registration flow.',
        zh: '终极进化版：渐变主题、推荐和优化注册流程。',
        hi: 'ग्रेडिएंट हीरो, प्रशंसापत्र और अनुकूलित पंजीकरण फ्लो के साथ निश्चित विकास।',
        fr: 'Évolution définitive avec hero gradient, témoignages et flux d\'inscription optimisé.',
        ar: 'التطور النهائي مع بطل متدرج، شهادات وتدفق تسجيل محسّن.',
        bn: 'গ্রেডিয়েন্ট হিরো, সাক্ষ্য এবং অপ্টিমাইজড রেজিস্ট্রেশন ফ্লো সহ চূড়ান্ত বিবর্তন।',
        pt: 'Evolução definitiva com hero gradiente, depoimentos e fluxo de registro otimizado.',
        ru: 'Финальная эволюция: градиентный хедер, отзывы и оптимизированная регистрация.',
        ja: 'グラデーションヒーロー、推薦文、最適化登録フロー付き最終進化版。',
    },
};

// ── Template badges ──
const TEMPLATE_BADGE: Record<string, Record<LangCode, string>> = {
    'Top Converting': {
        es: 'Top Conversión', en: 'Top Converting', zh: '高转化', hi: 'शीर्ष रूपांतरण',
        fr: 'Top Conversion', ar: 'أعلى تحويل', bn: 'শীর্ষ রূপান্তর', pt: 'Top Conversão',
        ru: 'Топ конверсия', ja: 'トップコンバージョン',
    },
    'Institutional': {
        es: 'Institucional', en: 'Institutional', zh: '机构级', hi: 'संस्थागत',
        fr: 'Institutionnel', ar: 'مؤسسي', bn: 'প্রাতিষ্ঠানিক', pt: 'Institucional',
        ru: 'Институциональный', ja: '機関投資家向け',
    },
    'Recomendada': {
        es: 'Recomendada', en: 'Recommended', zh: '推荐', hi: 'अनुशंसित',
        fr: 'Recommandée', ar: 'موصى به', bn: 'সুপারিশকৃত', pt: 'Recomendada',
        ru: 'Рекомендован', ja: 'おすすめ',
    },
    'Premium': {
        es: 'Premium', en: 'Premium', zh: '高级', hi: 'प्रीमियम',
        fr: 'Premium', ar: 'بريميوم', bn: 'প্রিমিয়াম', pt: 'Premium',
        ru: 'Премиум', ja: 'プレミアム',
    },
    'Alta Conversión': {
        es: 'Alta Conversión', en: 'High Conversion', zh: '高转化率', hi: 'उच्च रूपांतरण',
        fr: 'Haute Conversion', ar: 'تحويل عالي', bn: 'উচ্চ রূপান্তর', pt: 'Alta Conversão',
        ru: 'Высокая конверсия', ja: '高コンバージョン',
    },
    'Corporate': {
        es: 'Corporativo', en: 'Corporate', zh: '企业', hi: 'कॉर्पोरेट',
        fr: 'Corporate', ar: 'مؤسسي', bn: 'কর্পোরেট', pt: 'Corporativo',
        ru: 'Корпоративный', ja: 'コーポレート',
    },
    'Tech': {
        es: 'Tecnológico', en: 'Tech', zh: '科技', hi: 'तकनीकी',
        fr: 'Tech', ar: 'تقني', bn: 'প্রযুক্তি', pt: 'Tecnológico',
        ru: 'Технологичный', ja: 'テック',
    },
    'VIP': {
        es: 'VIP', en: 'VIP', zh: 'VIP', hi: 'VIP',
        fr: 'VIP', ar: 'VIP', bn: 'VIP', pt: 'VIP',
        ru: 'VIP', ja: 'VIP',
    },
    'Nuevo': {
        es: 'Nuevo', en: 'New', zh: '新', hi: 'नया',
        fr: 'Nouveau', ar: 'جديد', bn: 'নতুন', pt: 'Novo',
        ru: 'Новый', ja: '新着',
    },
    'Featured': {
        es: 'Destacado', en: 'Featured', zh: '精选', hi: 'विशेष',
        fr: 'En Vedette', ar: 'مميز', bn: 'ফিচারড', pt: 'Destaque',
        ru: 'Избранный', ja: '注目',
    },
    'Crypto': {
        es: 'Cripto', en: 'Crypto', zh: '加密', hi: 'क्रिप्टो',
        fr: 'Crypto', ar: 'كريبتو', bn: 'ক্রিপ্টো', pt: 'Cripto',
        ru: 'Крипто', ja: 'クリプト',
    },
};

// ── Section short names ──
const SECTION_NAME: Record<string, Record<LangCode, string>> = {
    hero_dark: { es: 'Hero Oscuro', en: 'Dark Hero', zh: '暗色主题', hi: 'डार्क हीरो', fr: 'Hero Sombre', ar: 'بطل داكن', bn: 'ডার্ক হিরো', pt: 'Hero Escuro', ru: 'Тёмный хедер', ja: 'ダークヒーロー' },
    hero_light: { es: 'Hero Claro', en: 'Light Hero', zh: '亮色主题', hi: 'लाइट हीरो', fr: 'Hero Clair', ar: 'بطل فاتح', bn: 'লাইট হিরো', pt: 'Hero Claro', ru: 'Светлый хедер', ja: 'ライトヒーロー' },
    hero_gradient: { es: 'Hero Gradiente', en: 'Gradient Hero', zh: '渐变主题', hi: 'ग्रेडिएंट', fr: 'Hero Gradient', ar: 'بطل متدرج', bn: 'গ্রেডিয়েন্ট', pt: 'Hero Gradiente', ru: 'Градиент', ja: 'グラデーション' },
    bento_grid: { es: 'Bento Grid', en: 'Bento Grid', zh: 'Bento网格', hi: 'बेंटो ग्रिड', fr: 'Grille Bento', ar: 'شبكة بنتو', bn: 'বেন্টো গ্রিড', pt: 'Bento Grid', ru: 'Бенто-сетка', ja: 'ベントグリッド' },
    feature_split: { es: 'Características', en: 'Features', zh: '特性', hi: 'विशेषताएं', fr: 'Fonctionnalités', ar: 'الميزات', bn: 'বৈশিষ্ট্য', pt: 'Recursos', ru: 'Возможности', ja: '機能' },
    risk_grid: { es: 'Seguridad', en: 'Security', zh: '安全', hi: 'सुरक्षा', fr: 'Sécurité', ar: 'الأمان', bn: 'নিরাপত্তা', pt: 'Segurança', ru: 'Безопасность', ja: 'セキュリティ' },
    multi_asset: { es: 'Multi-Activos', en: 'Multi-Asset', zh: '多资产', hi: 'मल्टी-एसेट', fr: 'Multi-Actifs', ar: 'متعدد الأصول', bn: 'মাল্টি-অ্যাসেট', pt: 'Multi-Ativos', ru: 'Мульти-активы', ja: 'マルチアセット' },
    workflow_steps: { es: 'Pasos', en: 'Steps', zh: '步骤', hi: 'चरण', fr: 'Étapes', ar: 'خطوات', bn: 'পদক্ষেপ', pt: 'Passos', ru: 'Шаги', ja: 'ステップ' },
    security_fees: { es: 'Tarifas', en: 'Fees', zh: '费用', hi: 'शुल्क', fr: 'Frais', ar: 'الرسوم', bn: 'ফি', pt: 'Taxas', ru: 'Комиссии', ja: '手数料' },
    stats_row: { es: 'Métricas', en: 'Metrics', zh: '指标', hi: 'मेट्रिक्स', fr: 'Métriques', ar: 'مقاييس', bn: 'মেট্রিক্স', pt: 'Métricas', ru: 'Метрики', ja: 'メトリクス' },
    leaderboard: { es: 'Top Traders', en: 'Top Traders', zh: '排行榜', hi: 'टॉप ट्रेडर्स', fr: 'Top Traders', ar: 'أفضل المتداولين', bn: 'টপ ট্রেডারস', pt: 'Top Traders', ru: 'Топ трейдеры', ja: 'トップトレーダー' },
    testimonials: { es: 'Testimonios', en: 'Testimonials', zh: '推荐', hi: 'प्रशंसापत्र', fr: 'Témoignages', ar: 'شهادات', bn: 'সাক্ষ্য', pt: 'Depoimentos', ru: 'Отзывы', ja: '推薦文' },
    trust_badges: { es: 'Confianza', en: 'Trust', zh: '信任', hi: 'विश्वास', fr: 'Confiance', ar: 'ثقة', bn: 'বিশ্বাস', pt: 'Confiança', ru: 'Доверие', ja: '信頼' },
    cta_community: { es: 'CTA', en: 'CTA', zh: 'CTA', hi: 'CTA', fr: 'CTA', ar: 'CTA', bn: 'CTA', pt: 'CTA', ru: 'CTA', ja: 'CTA' },
    calculator: { es: 'Calculadora', en: 'Calculator', zh: '计算器', hi: 'कैलकुलेटर', fr: 'Calculateur', ar: 'حاسبة', bn: 'ক্যালকুলেটর', pt: 'Calculadora', ru: 'Калькулятор', ja: '計算機' },
};

// ── Public API ──
export function getTemplateDescription(templateId: string, lang: LangCode): string {
    return TEMPLATE_DESC[templateId]?.[lang] || TEMPLATE_DESC[templateId]?.es || '';
}

export function getTemplateBadge(badge: string | null, lang: LangCode): string | null {
    if (!badge) return null;
    return TEMPLATE_BADGE[badge]?.[lang] || badge;
}

export function getSectionName(sectionId: string, lang: LangCode): string {
    return SECTION_NAME[sectionId]?.[lang] || sectionId;
}
