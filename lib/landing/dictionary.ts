// ============================================================
// Bridge Markets — Premium Landing Page Generator v3
// With Section Editor & Content Customization Support
// ============================================================

// ─── Section Configuration ──────────────────────────────────
export interface SectionConfig {
    hero: boolean;
    benefits: boolean;
    steps: boolean;
    accounts: boolean;
    services: boolean;
    whyBridge: boolean;
    finalCTA: boolean;
    registration: boolean;
}

export interface ContentOverrides {
    heroTitle?: string;
    heroHighlight?: string;
    heroSub?: string;
    benefitsItems?: { icon: string; title: string; desc: string }[];
    stepsItems?: { num: string; text: string; link?: string }[];
    accountsItems?: { title: string; desc: string; img: string; btn: string }[];
    servicesItems?: { icon: string; title: string; desc: string; btn: string }[];
    whyBridgeCards?: { icon: string; title: string; desc: string }[];
    whyBridgeInfo?: { icon: string; title: string; desc: string; variant?: string }[];
    finalCTATitle?: string;
    finalCTADesc?: string;
    finalCTABtn?: string;
    formTitle?: string;
    formSub?: string;
}

export interface LandingConfig {
    enabledSections: SectionConfig;
    content: ContentOverrides;
}

// ─── Modular Template Config ─────────────────────────────────
export interface ModularConfig {
    templateId: string;
    selectedSections: string[];
    sectionOverrides: Record<string, Record<string, any>>;
}

export interface LandingData {
    fullName: string;
    country: string;
    language: string;
    whatsapp: string;
    email: string;
    landingType: string;
    partnerId: string;
    slug: string;
    googleAnalyticsId?: string;
    config?: LandingConfig;
    modularConfig?: ModularConfig;
    // Campos EDITABLES para los bocetos oficiales
    communityName?: string;
    heroPhrase?: string;
    instagram?: string;
    telegram?: string;
    tiktok?: string;
    ctaLink?: string;
}

export const DEFAULT_SECTIONS: SectionConfig = {
    hero: true,
    benefits: true,
    steps: true,
    accounts: true,
    services: true,
    whyBridge: true,
    finalCTA: true,
    registration: true,
};

export const SECTION_LABELS: Record<keyof SectionConfig, { label: string; desc: string; icon: string }> = {
    hero: { label: 'Hero Principal', desc: 'Título, subtítulo y llamado a la acción principal', icon: 'ads_click' },
    benefits: { label: 'Beneficios', desc: 'Tarjetas con las ventajas del Social Trading', icon: 'shield' },
    steps: { label: 'Pasos para Acceder', desc: 'Guía paso a paso para empezar a operar', icon: 'checklist' },
    accounts: { label: 'Tipos de Cuenta', desc: 'Cards con los distintos tipos de cuenta disponibles', icon: 'credit_card' },
    services: { label: 'Servicios', desc: 'Grid de servicios adicionales (señales, ranking, educación)', icon: 'flag' },
    whyBridge: { label: '¿Por qué Bridge?', desc: 'Razones para elegir Bridge Markets como broker', icon: 'emoji_events' },
    finalCTA: { label: 'CTA Final', desc: 'Llamado a la acción grande antes del registro', icon: 'rocket_launch' },
    registration: { label: 'Registro / Formulario', desc: 'Formulario de captura de leads', icon: 'edit_note' },
};

// ─── Traducciones ────────────────────────────────────────────
export const TRANSLATIONS: Record<string, {
    heroTitle: string; heroHighlight: string; heroSub: string; cta: string; ctaSec: string;
    statsLabel: string[]; statsVal: string[];
    featTitle: string; features: { icon: string; title: string; desc: string }[];
    stepsTitle: string; steps: { num: string; text: string; link?: string }[];
    testTitle: string; testimonials: { name: string; country: string; text: string }[];
    formTitle: string; formSub: string; fields: string[]; submit: string;
    footerText: string; disclaimer: string;
    chessTitle: string; chessSubtitle: string;
    chessBenefits: { icon: string; title: string; desc: string }[];
    chessSteps: { title: string; subtitle: string; steps: { num: string; text: string; link?: string }[] };
    chessAccounts: { title: string; desc: string; img: string; btn: string }[];
    servicesGrid: { icon: string; title: string; desc: string; btn: string }[];
    whyBridge: {
        title: string;
        cards: { icon: string; title: string; desc: string }[];
        info: { icon: string; title: string; desc: string; variant?: string }[];
    };
    finalCTA: { title: string; desc: string; btn: string };
    finalInfo: { title: string; desc: string; quote: string };
}> = {
    ES: {
        heroTitle: '¡Empieza a copiar', heroHighlight: 'Traders', heroSub: 'El Social Trading te permite operar en el mercado sin necesidad de experiencia previa. Copia automáticamente las estrategias de Traders exitosos y decide a quién seguir según su rendimiento.',
        cta: 'Acceso Clientes', ctaSec: 'Me interesa',
        statsLabel: ['Traders Activos', 'Países', 'Volumen Diario', 'Clasificación'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Por qué Bridge Markets',
        features: [
            { icon: 'ads_click', title: 'Ejecución Ultra Rápida', desc: 'Servidores Equinix NY4 y LD4 para ejecución en < 1ms.' },
            { icon: 'campaign', title: 'Para herramientas de marketing de impacto', desc: 'Toda la tecnología necesaria para atraer y captar clientes.' },
            { icon: 'edit_note', title: 'Soporte 24/5 confiable', desc: 'Soporte técnico y comercial especializado en su idioma las 24 horas.' },
            { icon: 'bar_chart', title: 'Total visibilidad', desc: 'Controle detalladamente sus procesos internos y métricas de desempeño en tiempo real.' },
        ],
        stepsTitle: '¿Cómo acceder al Social Trading?',
        steps: [
            { num: '1', text: 'Crea tu cuenta en nuestro portal', link: 'trading.bridgemarketsclients.com' },
            { num: '2', text: 'Haz tu primer depósito para activar tu cuenta.' },
            { num: '3', text: 'Ingresa a la plataforma de Social Trading', link: 'socialtrading.bridgemarkets.eu' },
            { num: '4', text: 'Explora el ranking de operadores y elige a tu líder.' }
        ],
        testTitle: 'Lo que dicen nuestros traders',
        testimonials: [
            { name: 'Carlos M.', country: 'Colombia', text: 'Los spreads son increíbles para scalping. Ejecución instantánea y soporte siempre disponible.' },
            { name: 'Ana R.', country: 'México', text: 'Llevo 2 años con Bridge y no cambiaría. Retiros en 24 horas y plataforma muy estable.' },
            { name: 'Luis P.', country: 'España', text: 'La cuenta RAW es perfecta para trading algorítmico. Comisiones muy bajas, ideal para alto volumen.' },
        ],
        formTitle: '¿Listo para empezar?', formSub: 'Déjanos tus datos y un especialista te contactará.',
        fields: ['Nombre completo', 'Correo electrónico', 'Teléfono / WhatsApp'],
        submit: 'Comenzar Ahora →',
        footerText: 'Tecnología institucional al alcance de todos los inversores. Expertos en Social Trading y soluciones de liquidez global.',
        disclaimer: 'El trading de CFDs implica un alto riesgo de pérdida. Más del 70% de los inversores minoristas pierden dinero. Asegúrese de comprender los riesgos antes de invertir.',
        chessTitle: '¡Empieza a copiar Traders ahora!',
        chessSubtitle: 'El Social Trading te permite operar en el mercado sin necesidad de experiencia previa.',
        chessBenefits: [
            { icon: 'shield', title: 'Transparencia total', desc: 'Ve estadísticas reales de cada trader.' },
            { icon: 'swap_horiz', title: 'Flexibilidad', desc: 'Tú decides cuánto invertir y a quién copiar.' },
            { icon: 'emoji_events', title: 'Gana sin operar directamente', desc: 'Aprovecha la experiencia de los mejores.' }
        ],
        chessSteps: {
            title: '¿Cómo acceder al',
            subtitle: 'Social Trading?',
            steps: [
                { num: '1', text: 'Crea tu cuenta en nuestro portal', link: 'trading.bridgemarketsclients.com' },
                { num: '2', text: 'Haz tu primer depósito para activar tu cuenta.' },
                { num: '3', text: 'Ingresa a la plataforma de Social Trading', link: 'socialtrading.bridgemarkets.eu' },
                { num: '4', text: 'Explora el ranking de operadores y elige a tu líder.' }
            ]
        },
        chessAccounts: [
            { title: 'Cuentas Apalancadas', desc: 'Aumenta tu poder de compra adquiriendo una cuenta apalancada. Con una inversión inicial, puedes acceder a un capital mayor para operar bajo reglas específicas de riesgo, profit y tiempo.', img: '/images/imagenes%20nuevas/rey%20rosa.png', btn: 'Me interesa' },
            { title: 'Cuentas PAMM', desc: 'Ideal para operadores que desean gestionar un fondo consolidado con el capital de varios clientes. Con una cuenta PAMM, todas las inversiones se combinan en un solo pool, optimizando la gestión y distribución de ganancias.', img: '/images/imagenes%20nuevas/peones%20rosa.png', btn: 'Me interesa' },
            { title: 'Cuentas MAM', desc: 'Si eres un operador que busca conectar clientes a tu estrategia, las cuentas MAM permiten que cada cliente mantenga su cuenta individual mientras se replican automáticamente tus posiciones.', img: '/images/imagenes%20nuevas/alfiler%20rosa.png', btn: 'Me interesa' },
            { title: 'Cuenta Leverage', desc: 'Sistema dedicado para gestores, goce de la más amplia gama de instrumentos con las comisiones más bajas y potencialice su portafolio MAM con nuestra tecnología.', img: '/images/imagenes%20nuevas/reyna%20rosa.png', btn: 'Me interesa' },
            { title: 'Cuenta ECN', desc: 'Velocidad, precisión y spreads cercanos a cero. Conéctate con los mercados reales a través de puentes institucionales y ejecuta cualquier estrategia con máxima eficiencia.', img: '/images/imagenes%20nuevas/caballo%20rosa.png', btn: 'Me interesa' }
        ],
        servicesGrid: [
            { icon: 'flag', title: 'Canal de señales', desc: 'Referencia ideal para tus primeros pasos. Estructura simple y líquida para máxima ejecución.', btn: 'Saber más' },
            { icon: 'handshake', title: 'Ranking Global', desc: 'Visualiza en tiempo real a los operadores líderes y analiza sus métricas de éxito histórico.', btn: 'Ver Ranking' },
            { icon: 'computer', title: 'Educación Pro', desc: 'Acceso a webinars exclusivos, ebooks y tutoriales avanzados para potenciar tus habilidades.', btn: 'Ir a la Academia' }
        ],
        whyBridge: {
            title: '¿Por qué Bridge Markets?',
            cards: [
                { icon: 'payments', title: 'Ingresos Constantes', desc: 'Como IB, gana desde 6 USD por lote con acuerdos de riesgo personalizados a tu medida.' },
                { icon: 'campaign', title: 'Marketing de Impacto', desc: 'Recursos publicitarios profesionales: banners, webinars y landing pages para expandir tu marca.' },
                { icon: 'checklist', title: 'Regulación Confiable', desc: 'Brokers regulados y procesos automatizados de depósitos y retiros para tu total tranquilidad.' },
                { icon: 'desktop_windows', title: 'Soporte Estratégico', desc: 'Equipo de cuentas dedicado y herramientas online de última generación para tu éxito comercial.' }
            ],
            info: [
                { icon: 'group', title: 'Ingresos Ilimitados', desc: 'Escala tu negocio sin techos financieros. El registro es 100% gratuito.' },
                { icon: 'description', title: 'Data Valiosa', desc: 'Información en tiempo real para gestionar riesgos de manera profesional.', variant: 'purple' },
                { icon: 'public', title: 'Libertad Total', desc: 'Trabaja desde cualquier parte del mundo con herramientas globales.', variant: 'dark' },
                { icon: 'headset_mic', title: 'Expertise 24/7', desc: 'Soporte de Account Managers expertos en mercados financieros.' }
            ]
        },
        finalCTA: {
            title: 'Activa tu universo financiero',
            desc: 'Despega con tecnología de otro nivel y conquista los mercados globales con estrategia.',
            btn: 'Abre tu cuenta ahora'
        },
        finalInfo: {
            title: 'Gana comisiones referiendo Éxito',
            desc: 'Como Introducing Broker, recibirás reembolsos por cada transacción que realicen tus referidos. Sin restricciones de ganancias y con el apoyo de un broker líder.',
            quote: '*El éxito de tus clientes se traduce en tu éxito comercial. No hay límites para el volumen que puedes gestionar ni para las comisiones que puedes generar.'
        }
    },
    GB: {
        heroTitle: 'Start copying', heroHighlight: 'Traders', heroSub: 'Social Trading allows you to trade in the market without needing prior experience. Automatically copy the strategies of successful Traders and decide who to follow based on their performance.',
        cta: 'Client Access', ctaSec: 'I\'m interested',
        statsLabel: ['Active Traders', 'Countries', 'Daily Volume', 'Ranking'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Why Bridge Markets',
        features: [
            { icon: 'ads_click', title: 'Ultra-Fast Execution', desc: 'NY4 and LD4 servers for < 1ms execution.' },
            { icon: 'campaign', title: 'Impactful Marketing Tools', desc: 'All the logic and technology to attract and capture clients.' },
            { icon: 'shield', title: 'Reliable 24/5 Support', desc: 'Dedicated technical and commercial support in your language.' },
            { icon: 'bar_chart', title: 'Total Transparency', desc: 'Detail control of your internal processes and performance metrics.' },
        ],
        stepsTitle: 'How to access Social Trading?',
        steps: [
            { num: '1', text: 'Create your account in our portal', link: 'trading.bridgemarketsclients.com' },
            { num: '2', text: 'Make your first deposit to activate your account.' },
            { num: '3', text: 'Enter the Social Trading platform', link: 'socialtrading.bridgemarkets.eu' },
            { num: '4', text: 'Explore the ranking of operators and choose your leader.' }
        ],
        testTitle: 'What our traders say',
        testimonials: [
            { name: 'Carlos M.', country: 'Colombia', text: 'Incredible spreads for scalping. Instant execution and always-available support.' },
            { name: 'Ana R.', country: 'Mexico', text: '2 years with Bridge and I wouldn\'t change. 24-hour withdrawals and a very stable platform.' },
            { name: 'Luis P.', country: 'Spain', text: 'The RAW account is perfect for algo trading. Very low commissions, ideal for high volume.' },
        ],
        formTitle: 'Ready to start?', formSub: 'Leave us your details and a specialist will contact you.',
        fields: ['Full name', 'Email address', 'Phone / WhatsApp'],
        submit: 'Start Now →',
        footerText: 'Institutional technology within reach of all investors. Experts in Social Trading and global liquidity solutions.',
        disclaimer: 'CFD trading involves high risk of loss. Over 70% of retail investors lose money. Understand risks before investing.',
        chessTitle: 'Start copying Traders now!',
        chessSubtitle: 'Social Trading allows you to trade in the market without needing prior experience.',
        chessBenefits: [
            { icon: 'shield', title: 'Total Transparency', desc: 'See real statistics of each trader.' },
            { icon: 'swap_horiz', title: 'Flexibility', desc: 'You decide how much to invest and who to copy.' },
            { icon: 'emoji_events', title: 'Earn without trading directly', desc: 'Take advantage of the experts\' experience.' }
        ],
        chessSteps: {
            title: 'How to access',
            subtitle: 'Social Trading?',
            steps: [
                { num: '1', text: 'Create your account in our portal', link: 'trading.bridgemarketsclients.com' },
                { num: '2', text: 'Make your first deposit to activate your account.' },
                { num: '3', text: 'Enter the Social Trading platform', link: 'socialtrading.bridgemarkets.eu' },
                { num: '4', text: 'Explore the ranking of operators and choose your leader.' }
            ]
        },
        chessAccounts: [
            { title: 'Leveraged Accounts', desc: 'Increase your buying power by acquiring a leveraged account. With an initial investment, you can access larger capital under specific risk rules.', img: '/images/imagenes%20nuevas/rey%20rosa.png', btn: 'Interested' },
            { title: 'PAMM Accounts', desc: 'Ideal for traders who want to manage a consolidated fund. With a PAMM account, all investments are combined in a single pool.', img: '/images/imagenes%20nuevas/peones%20rosa.png', btn: 'Interested' },
            { title: 'MAM Accounts', desc: 'If you want to connect clients to your strategy, MAM accounts allow each client to maintain an individual account while replicating trades.', img: '/images/imagenes%20nuevas/alfiler%20rosa.png', btn: 'Interested' },
            { title: 'Leverage Account', desc: 'System dedicated to managers, enjoy the widest range of instruments with the lowest commissions and boost your portfolio.', img: '/images/imagenes%20nuevas/reyna%20rosa.png', btn: 'Interested' },
            { title: 'ECN Account', desc: 'Speed, precision and near-zero spreads. Connect with real markets through institutional bridges.', img: '/images/imagenes%20nuevas/caballo%20rosa.png', btn: 'Interested' }
        ],
        servicesGrid: [
            { icon: 'flag', title: 'Signals Channel', desc: 'Ideal reference for your first steps. Simple and liquid structure for maximum execution.', btn: 'Learn More' },
            { icon: 'handshake', title: 'Global Ranking', desc: 'View leading operators in real time and analyze their achievement metrics.', btn: 'View Ranking' },
            { icon: 'computer', title: 'Pro Education', desc: 'Access exclusive webinars, ebooks and advanced tutorials to boost your skills.', btn: 'Go to Academy' }
        ],
        whyBridge: {
            title: 'Why Bridge Markets?',
            cards: [
                { icon: 'payments', title: 'Constant Income', desc: 'As an IB, earn from 6 USD per lot with customized risk agreements.' },
                { icon: 'campaign', title: 'Impactful Marketing', desc: 'Professional advertising resources: banners, webinars and landing pages.' },
                { icon: 'checklist', title: 'Reliable Regulation', desc: 'Regulated brokers and automated processes for your peace of mind.' },
                { icon: 'desktop_windows', title: 'Strategic Support', desc: 'Dedicated accounts team and cutting-edge online tools for your success.' }
            ],
            info: [
                { icon: 'group', title: 'Unlimited Income', desc: 'Scale your business without financial caps. Registration is 100% free.' },
                { icon: 'description', title: 'Valuable Data', desc: 'Real-time information to manage risks professionally.', variant: 'purple' },
                { icon: 'public', title: 'Total Freedom', desc: 'Work from anywhere in the world with global tools.', variant: 'dark' },
                { icon: 'headset_mic', title: '24/7 Expertise', desc: 'Support from Account Managers experts in financial markets.' }
            ]
        },
        finalCTA: {
            title: 'Activate your financial universe',
            desc: 'Blast off with next-level technology and conquer global markets with strategy.',
            btn: 'Open your account now'
        },
        finalInfo: {
            title: 'Earn commissions referring Success',
            desc: 'As an Introducing Broker, you will receive rebates for every transaction made by your referrals.',
            quote: '*The success of your clients translates into your commercial success. There are no limits to the volume you can manage.'
        }
    },
    BR: { heroTitle: 'Comece a copiar', heroHighlight: 'Traders', heroSub: 'Social Trading permite que você opere no mercado sem experiência.', cta: 'Acesso', ctaSec: 'Interesse', statsLabel: ['Ativos', 'Países', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Ultra Rápido',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Conta',link:''}], testTitle: 'Traders', testimonials: [{name:'C',country:'C',text:'Bom'}], formTitle: 'Início', formSub: 'Dados', fields: ['N', 'E', 'T'], submit: 'Começar', footerText: 'Tech', disclaimer: 'Risco', chessTitle: 'Copiar', chessSubtitle: 'Sem exp', chessBenefits: [{icon:'shield',title:'Transparência',desc:'Stats'}], chessSteps: {title:'Acesso',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Cap',desc:'Power',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'Interesse'}], servicesGrid: [{icon:'flag',title:'Sinais',desc:'Ref',btn:'Saber'}], whyBridge: {title:'Por que?',cards:[{icon:'payments',title:'Renda',desc:'6 USD'}],info:[{icon:'group',title:'Incrível',desc:'Free'}]}, finalCTA: {title:'Ative',desc:'Tech',btn:'Conta'}, finalInfo: {title:'Sucesso',desc:'Rebates',quote:'*Win'} },
    FR: { heroTitle: 'Copier', heroHighlight: 'Traders', heroSub: 'Social Trading sans expérience.', cta: 'Accès', ctaSec: 'Intérêt', statsLabel: ['Actifs', 'Pays', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Rapide',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Compte',link:''}], testTitle: 'Traders', testimonials: [{name:'C',country:'C',text:'Bien'}], formTitle: 'Début', formSub: 'Infos', fields: ['N', 'E', 'T'], submit: 'Commencer', footerText: 'Tech', disclaimer: 'Risque', chessTitle: 'Copier', chessSubtitle: 'Sans exp', chessBenefits: [{icon:'shield',title:'Transparence',desc:'Stats'}], chessSteps: {title:'Accès',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Lev',desc:'Power',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'Intérêt'}], servicesGrid: [{icon:'flag',title:'Signaux',desc:'Ref',btn:'Savoir'}], whyBridge: {title:'Pourquoi?',cards:[{icon:'payments',title:'Revenus',desc:'6 USD'}],info:[{icon:'group',title:'Incrédible',desc:'Free'}]}, finalCTA: {title:'Activer',desc:'Tech',btn:'Compte'}, finalInfo: {title:'Succès',desc:'Rebates',quote:'*Win'} },
    AR: { heroTitle: 'ابدأ بالنسخ', heroHighlight: 'المتداولين', heroSub: 'التداول الاجتماعي دون خبرة.', cta: 'دخول', ctaSec: 'مهتم', statsLabel: ['نشط', 'دول', 'حجم', 'ترتيب'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'سريع',desc:'< 1ms.'}], stepsTitle: 'التداول الاجتماعي', steps: [{num:'1',text:'حساب',link:''}], testTitle: 'متداولون', testimonials: [{name:'C',country:'C',text:'جيد'}], formTitle: 'بداية', formSub: 'بيانات', fields: ['ن', 'ب', 'هـ'], submit: 'ابدأ', footerText: 'تكنولوجيا', disclaimer: 'خطر', chessTitle: 'نسخ', chessSubtitle: 'دون خبرة', chessBenefits: [{icon:'shield',title:'شفافية',desc:'إحصائيات'}], chessSteps: {title:'دخول',subtitle:'اجتماعي',steps:[{num:'1',text:'تسجيل',link:''}]}, chessAccounts: [{title:'رافعة',desc:'قوة',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'مهتم'}], servicesGrid: [{icon:'flag',title:'إشارات',desc:'مرجع',btn:'اعرف'}], whyBridge: {title:'لماذا؟',cards:[{icon:'payments',title:'دخل',desc:'6 USD'}],info:[{icon:'group',title:'رائع',desc:'مجاني'}]}, finalCTA: {title:'نشط',desc:'تكنولوجيا',btn:'حساب'}, finalInfo: {title:'نجاح',desc:'عمولات',quote:'*ربح'} },
    ZH: { heroTitle: '复制交易', heroHighlight: '交易者', heroSub: '无需经验。', cta: '登录', ctaSec: '兴趣', statsLabel: ['活跃', '国家', '交易量', '排名'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'快速',desc:'< 1ms.'}], stepsTitle: '社交交易', steps: [{num:'1',text:'开户',link:''}], testTitle: '交易者', testimonials: [{name:'C',country:'C',text:'好'}], formTitle: '开始', formSub: '信息', fields: ['名', '邮', '话'], submit: '开始', footerText: '技术', disclaimer: '风险', chessTitle: '复制', chessSubtitle: '无需经验', chessBenefits: [{icon:'shield',title:'透明',desc:'数据'}], chessSteps: {title:'访问',subtitle:'社交',steps:[{num:'1',text:'注册',link:''}]}, chessAccounts: [{title:'杠杆',desc:'力量',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'兴趣'}], servicesGrid: [{icon:'flag',title:'信号',desc:'参考',btn:'了解'}], whyBridge: {title:'为什么?',cards:[{icon:'payments',title:'收入',desc:'6 USD'}],info:[{icon:'group',title:'免费',desc:'注册'}]}, finalCTA: {title:'激活',desc:'技术',btn:'开户'}, finalInfo: {title:'成功',desc:'返佣',quote:'*赢'} },
    ID: { heroTitle: 'Salin', heroHighlight: 'Trader', heroSub: 'Tanpa pengalaman.', cta: 'Akses', ctaSec: 'Tertarik', statsLabel: ['Aktif', 'Negara', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Cepat',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Akun',link:''}], testTitle: 'Trader', testimonials: [{name:'C',country:'C',text:'Bagus'}], formTitle: 'Mulai', formSub: 'Data', fields: ['N', 'E', 'T'], submit: 'Mulai', footerText: 'Tech', disclaimer: 'Risiko', chessTitle: 'Salin', chessSubtitle: 'Tanpa exp', chessBenefits: [{icon:'shield',title:'Transparansi',desc:'Stats'}], chessSteps: {title:'Akses',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Lev',desc:'Power',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'Tertarik'}], servicesGrid: [{icon:'flag',title:'Sinyal',desc:'Ref',btn:'Tahu'}], whyBridge: {title:'Kenapa?',cards:[{icon:'payments',title:'Income',desc:'6 USD'}],info:[{icon:'group',title:'Free',desc:'Daftar'}]}, finalCTA: {title:'Aktif',desc:'Tech',btn:'Akun'}, finalInfo: {title:'Sukses',desc:'Rebates',quote:'*Win'} },
    VI: { heroTitle: 'Sao chép', heroHighlight: 'Trader', heroSub: 'Không cần kinh nghiệm.', cta: 'Truy cập', ctaSec: 'Quan tâm', statsLabel: ['Hoạt động', 'Quốc gia', 'Khối lượng', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Nhanh',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Tài khoản',link:''}], testTitle: 'Trader', testimonials: [{name:'C',country:'C',text:'Tốt'}], formTitle: 'Bắt đầu', formSub: 'Dữ liệu', fields: ['T', 'E', 'S'], submit: 'Bắt đầu', footerText: 'Tech', disclaimer: 'Rủi ro', chessTitle: 'Sao chép', chessSubtitle: 'Không exp', chessBenefits: [{icon:'shield',title:'Minh bạch',desc:'Stats'}], chessSteps: {title:'Truy cập',subtitle:'Social',steps:[{num:'1',text:'Đăng ký',link:''}]}, chessAccounts: [{title:'Đòn bẩy',desc:'Power',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'Quan tâm'}], servicesGrid: [{icon:'flag',title:'Tín hiệu',desc:'Ref',btn:'Biết'}], whyBridge: {title:'Tại sao?',cards:[{icon:'payments',title:'Thu nhập',desc:'6 USD'}],info:[{icon:'group',title:'Free',desc:'Đăng ký'}]}, finalCTA: {title:'Kích hoạt',desc:'Tech',btn:'Tài khoản'}, finalInfo: {title:'Thành công',desc:'Rebates',quote:'*Win'} },
    JP: { heroTitle: 'コピー', heroHighlight: 'トレーダー', heroSub: '経験不要。', cta: 'アクセス', ctaSec: '興味', statsLabel: ['活動', '国', '出来高', '順位'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'高速',desc:'< 1ms.'}], stepsTitle: 'ソーシャルトレード', steps: [{num:'1',text:'口座',link:''}], testTitle: 'トレーダー', testimonials: [{name:'C',country:'C',text:'良'}], formTitle: '開始', formSub: '情報', fields: ['名', 'メ', '電'], submit: '開始', footerText: '技術', disclaimer: 'リスク', chessTitle: 'コピー', chessSubtitle: '経験不要', chessBenefits: [{icon:'shield',title:'透明性',desc:'データ'}], chessSteps: {title:'アクセス',subtitle:'ソーシャル',steps:[{num:'1',text:'登録',link:''}]}, chessAccounts: [{title:'レバ',desc:'パワー',img:'/images/imagenes%20nuevas/rey%20rosa.png',btn:'興味'}], servicesGrid: [{icon:'flag',title:'シグナル',desc:'参考',btn:'知る'}], whyBridge: {title:'なぜ?',cards:[{icon:'payments',title:'報酬',desc:'6 USD'}],info:[{icon:'group',title:'無料',desc:'登録'}]}, finalCTA: {title:'有効化',desc:'技術',btn:'口座'}, finalInfo: {title:'成功',desc:'報酬',quote:'*勝'} },
    HI: {
        heroTitle: 'ट्रेडर्स को कॉपी करना शुरू करें', heroHighlight: 'अभी!', heroSub: 'सोशल ट्रेडिंग आपको बिना किसी पूर्व अनुभव के बाजार में ट्रेड करने की सुविधा देता है। सफल ट्रेडर्स की रणनीतियों को स्वतः कॉपी करें।',
        cta: 'ग्राहक पहुंच', ctaSec: 'मुझे दिलचस्पी है',
        statsLabel: ['सक्रिय ट्रेडर', 'देश', 'दैनिक वॉल्यूम', 'रैंकिंग'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Bridge Markets क्यों?',
        features: [
            { icon: 'ads_click', title: 'अति-तेज़ निष्पादन', desc: '<1ms में ऑर्डर निष्पादन।' },
            { icon: 'campaign', title: 'मार्केटिंग उपकरण', desc: 'ग्राहकों को आकर्षित करने की सभी तकनीक।' },
            { icon: 'edit_note', title: '24/5 विश्वसनीय सहायता', desc: 'आपकी भाषा में तकनीकी और वाणिज्यिक सहायता।' },
            { icon: 'bar_chart', title: 'पूर्ण दृश्यता', desc: 'रियल-टाइम में आंतरिक प्रक्रियाओं और मेट्रिक्स का विस्तृत नियंत्रण।' },
        ],
        stepsTitle: 'सोशल ट्रेडिंग कैसे शुरू करें?',
        steps: [
            { num: '1', text: 'हमारे पोर्टल पर अपना खाता बनाएं', link: 'trading.bridgemarketsclients.com' },
            { num: '2', text: 'अपना खाता सक्रिय करने के लिए पहली जमा राशि डालें।' },
            { num: '3', text: 'सोशल ट्रेडिंग प्लेटफ़ॉर्म पर जाएं', link: 'socialtrading.bridgemarkets.eu' },
            { num: '4', text: 'ऑपरेटर रैंकिंग एक्सप्लोर करें और अपना लीडर चुनें।' },
        ],
        testTitle: 'हमारे ट्रेडर्स क्या कहते हैं',
        testimonials: [
            { name: 'राहुल M.', country: 'भारत', text: 'स्केल्पिंग के लिए अविश्वसनीय स्प्रेड। तत्काल निष्पादन और हमेशा उपलब्ध सहायता।' },
            { name: 'प्रिया R.', country: 'भारत', text: '2 साल से Bridge के साथ हूं और नहीं बदलूंगी। 24 घंटे में निकासी और बहुत स्थिर प्लेटफ़ॉर्म।' },
            { name: 'अमित P.', country: 'भारत', text: 'RAW खाता एल्गोरिदमिक ट्रेडिंग के लिए परफेक्ट है।' },
        ],
        formTitle: 'शुरू करने के लिए तैयार हैं?', formSub: 'अपनी जानकारी दें और एक विशेषज्ञ आपसे संपर्क करेगा।',
        fields: ['पूरा नाम', 'ईमेल पता', 'फ़ोन / WhatsApp'],
        submit: 'अभी शुरू करें →',
        footerText: 'सभी निवेशकों के लिए संस्थागत तकनीक। सोशल ट्रेडिंग और वैश्विक तरलता समाधान में विशेषज्ञ।',
        disclaimer: 'CFD ट्रेडिंग में नुकसान का उच्च जोखिम है। निवेश से पहले जोखिमों को समझें।',
        chessTitle: 'ट्रेडर्स को कॉपी करना शुरू करें!',
        chessSubtitle: 'सोशल ट्रेडिंग आपको बिना किसी पूर्व अनुभव के बाजार में ट्रेड करने की सुविधा देता है।',
        chessBenefits: [
            { icon: 'shield', title: 'पूर्ण पारदर्शिता', desc: 'प्रत्येक ट्रेडर के वास्तविक आंकड़े देखें।' },
            { icon: 'swap_horiz', title: 'लचीलापन', desc: 'आप तय करें कितना निवेश करना है और किसे कॉपी करना है।' },
            { icon: 'emoji_events', title: 'सीधे ट्रेड किए बिना कमाएं', desc: 'सर्वश्रेष्ठ ट्रेडर्स के अनुभव का लाभ उठाएं।' },
        ],
        chessSteps: {
            title: 'सोशल ट्रेडिंग कैसे',
            subtitle: 'शुरू करें?',
            steps: [
                { num: '1', text: 'हमारे पोर्टल पर खाता बनाएं', link: 'trading.bridgemarketsclients.com' },
                { num: '2', text: 'पहली जमा राशि डालें।' },
                { num: '3', text: 'सोशल ट्रेडिंग प्लेटफ़ॉर्म पर जाएं', link: 'socialtrading.bridgemarkets.eu' },
                { num: '4', text: 'ऑपरेटर रैंकिंग एक्सप्लोर करें।' },
            ],
        },
        chessAccounts: [
            { title: 'लीवरेज्ड खाते', desc: 'लीवरेज्ड खाता प्राप्त करके अपनी क्रय शक्ति बढ़ाएं।', img: '/images/imagenes%20nuevas/rey%20rosa.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'PAMM खाते', desc: 'कई ग्राहकों की पूंजी से एक समेकित फंड प्रबंधित करना चाहते हैं?', img: '/images/imagenes%20nuevas/peones%20rosa.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'MAM खाते', desc: 'ग्राहकों को अपनी रणनीति से जोड़ें, प्रत्येक ग्राहक का अपना खाता बना रहता है।', img: '/images/imagenes%20nuevas/alfiler%20rosa.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'लीवरेज खाता', desc: 'प्रबंधकों के लिए समर्पित प्रणाली, सबसे कम कमीशन के साथ सबसे व्यापक उपकरण।', img: '/images/imagenes%20nuevas/reyna%20rosa.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'ECN खाता', desc: 'गति, सटीकता और शून्य के करीब स्प्रेड। संस्थागत पुलों के माध्यम से वास्तविक बाजारों से जुड़ें।', img: '/images/imagenes%20nuevas/caballo%20rosa.png', btn: 'मुझे दिलचस्पी है' },
        ],
        servicesGrid: [
            { icon: 'flag', title: 'सिग्नल चैनल', desc: 'आपके पहले कदमों के लिए आदर्श संदर्भ।', btn: 'अधिक जानें' },
            { icon: 'handshake', title: 'वैश्विक रैंकिंग', desc: 'अग्रणी ऑपरेटरों को रियल-टाइम में देखें।', btn: 'रैंकिंग देखें' },
            { icon: 'computer', title: 'प्रो शिक्षा', desc: 'विशेष वेबिनार, ईबुक और ट्यूटोरियल।', btn: 'अकादमी जाएं' },
        ],
        whyBridge: {
            title: 'Bridge Markets क्यों?',
            cards: [
                { icon: 'payments', title: 'निरंतर आय', desc: 'IB के रूप में, कस्टमाइज्ड जोखिम समझौतों के साथ प्रति लॉट 6 USD से कमाएं।' },
                { icon: 'campaign', title: 'इंपैक्ट मार्केटिंग', desc: 'पेशेवर विज्ञापन संसाधन: बैनर, वेबिनार और लैंडिंग पेज।' },
                { icon: 'checklist', title: 'विश्वसनीय विनियमन', desc: 'विनियमित ब्रोकर और स्वचालित जमा/निकासी प्रक्रियाएं।' },
                { icon: 'desktop_windows', title: 'रणनीतिक सहायता', desc: 'समर्पित खाता टीम और अत्याधुनिक ऑनलाइन उपकरण।' },
            ],
            info: [
                { icon: 'group', title: 'असीमित आय', desc: 'अपने व्यवसाय को बिना वित्तीय सीमाओं के विकसित करें। पंजीकरण 100% निःशुल्क।' },
                { icon: 'description', title: 'मूल्यवान डेटा', desc: 'जोखिमों को पेशेवर तरीके से प्रबंधित करने के लिए रियल-टाइम जानकारी।', variant: 'purple' },
                { icon: 'public', title: 'पूर्ण स्वतंत्रता', desc: 'वैश्विक उपकरणों के साथ दुनिया में कहीं से भी काम करें।', variant: 'dark' },
                { icon: 'headset_mic', title: '24/7 विशेषज्ञता', desc: 'वित्तीय बाजारों के विशेषज्ञ अकाउंट मैनेजर्स से सहायता।' },
            ],
        },
        finalCTA: { title: 'अपना वित्तीय ब्रह्मांड सक्रिय करें', desc: 'अगले स्तर की तकनीक के साथ उड़ान भरें।', btn: 'अभी खाता खोलें' },
        finalInfo: { title: 'सफलता का संदर्भ देकर कमीशन कमाएं', desc: 'Introducing Broker के रूप में, आपके रेफरल के प्रत्येक लेनदेन पर रिबेट प्राप्त करें।', quote: '*आपके ग्राहकों की सफलता आपकी व्यावसायिक सफलता में तब्दील होती है।' },
    },
    BN: {
        heroTitle: 'ট্রেডারদের কপি করা শুরু করুন', heroHighlight: 'এখনই!', heroSub: 'সোশ্যাল ট্রেডিং আপনাকে কোনো পূর্ব অভিজ্ঞতা ছাড়াই বাজারে ট্রেড করতে দেয়। সফল ট্রেডারদের কৌশল স্বয়ংক্রিয়ভাবে কপি করুন।',
        cta: 'ক্লায়েন্ট অ্যাক্সেস', ctaSec: 'আমি আগ্রহী',
        statsLabel: ['সক্রিয় ট্রেডার', 'দেশ', 'দৈনিক ভলিউম', 'র‍্যাংকিং'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'কেন Bridge Markets?',
        features: [
            { icon: 'ads_click', title: 'অতি-দ্রুত এক্সিকিউশন', desc: '<1ms এ অর্ডার এক্সিকিউশন।' },
            { icon: 'campaign', title: 'মার্কেটিং টুলস', desc: 'ক্লায়েন্ট আকর্ষণের সমস্ত প্রযুক্তি।' },
            { icon: 'edit_note', title: '24/5 নির্ভরযোগ্য সহায়তা', desc: 'আপনার ভাষায় প্রযুক্তিগত ও বাণিজ্যিক সহায়তা।' },
            { icon: 'bar_chart', title: 'সম্পূর্ণ দৃশ্যমানতা', desc: 'রিয়েল-টাইমে মেট্রিক্সের বিস্তারিত নিয়ন্ত্রণ।' },
        ],
        stepsTitle: 'সোশ্যাল ট্রেডিং কীভাবে শুরু করবেন?',
        steps: [
            { num: '1', text: 'আমাদের পোর্টালে আপনার অ্যাকাউন্ট তৈরি করুন', link: 'trading.bridgemarketsclients.com' },
            { num: '2', text: 'আপনার অ্যাকাউন্ট সক্রিয় করতে প্রথম ডিপোজিট করুন।' },
            { num: '3', text: 'সোশ্যাল ট্রেডিং প্ল্যাটফর্মে প্রবেশ করুন', link: 'socialtrading.bridgemarkets.eu' },
            { num: '4', text: 'অপারেটর র‍্যাংকিং এক্সপ্লোর করুন এবং আপনার লিডার বেছে নিন।' },
        ],
        testTitle: 'আমাদের ট্রেডাররা কী বলেন',
        testimonials: [
            { name: 'রহিম M.', country: 'বাংলাদেশ', text: 'স্কেল্পিংয়ের জন্য অবিশ্বাস্য স্প্রেড। তাৎক্ষণিক এক্সিকিউশন।' },
            { name: 'নাজমা R.', country: 'বাংলাদেশ', text: '২ বছর ধরে Bridge এর সাথে আছি। ২৪ ঘন্টায় উইথড্রয়াল।' },
            { name: 'করিম P.', country: 'বাংলাদেশ', text: 'RAW অ্যাকাউন্ট অ্যালগো ট্রেডিংয়ের জন্য পারফেক্ট।' },
        ],
        formTitle: 'শুরু করতে প্রস্তুত?', formSub: 'আপনার তথ্য দিন এবং একজন বিশেষজ্ঞ আপনার সাথে যোগাযোগ করবেন।',
        fields: ['পূর্ণ নাম', 'ইমেইল ঠিকানা', 'ফোন / WhatsApp'],
        submit: 'এখনই শুরু করুন →',
        footerText: 'সকল বিনিয়োগকারীদের নাগালে প্রাতিষ্ঠানিক প্রযুক্তি।',
        disclaimer: 'CFD ট্রেডিংয়ে ক্ষতির উচ্চ ঝুঁকি রয়েছে। বিনিয়োগের আগে ঝুঁকি বুঝুন।',
        chessTitle: 'ট্রেডারদের কপি করা শুরু করুন!',
        chessSubtitle: 'সোশ্যাল ট্রেডিং আপনাকে কোনো পূর্ব অভিজ্ঞতা ছাড়াই ট্রেড করতে দেয়।',
        chessBenefits: [
            { icon: 'shield', title: 'সম্পূর্ণ স্বচ্ছতা', desc: 'প্রতিটি ট্রেডারের প্রকৃত পরিসংখ্যান দেখুন।' },
            { icon: 'swap_horiz', title: 'নমনীয়তা', desc: 'আপনি সিদ্ধান্ত নিন কতটুকু বিনিয়োগ করবেন।' },
            { icon: 'emoji_events', title: 'সরাসরি ট্রেড ছাড়াই আয় করুন', desc: 'সেরা ট্রেডারদের অভিজ্ঞতার সুবিধা নিন।' },
        ],
        chessSteps: {
            title: 'সোশ্যাল ট্রেডিং কীভাবে',
            subtitle: 'শুরু করবেন?',
            steps: [
                { num: '1', text: 'আমাদের পোর্টালে অ্যাকাউন্ট তৈরি করুন', link: 'trading.bridgemarketsclients.com' },
                { num: '2', text: 'প্রথম ডিপোজিট করুন।' },
                { num: '3', text: 'সোশ্যাল ট্রেডিং প্ল্যাটফর্মে যান', link: 'socialtrading.bridgemarkets.eu' },
                { num: '4', text: 'অপারেটর র‍্যাংকিং এক্সপ্লোর করুন।' },
            ],
        },
        chessAccounts: [
            { title: 'লিভারেজড অ্যাকাউন্ট', desc: 'লিভারেজড অ্যাকাউন্ট নিয়ে আপনার ক্রয় ক্ষমতা বাড়ান।', img: '/images/imagenes%20nuevas/rey%20rosa.png', btn: 'আমি আগ্রহী' },
            { title: 'PAMM অ্যাকাউন্ট', desc: 'একাধিক ক্লায়েন্টের মূলধন দিয়ে একটি সমন্বিত ফান্ড পরিচালনা করুন।', img: '/images/imagenes%20nuevas/peones%20rosa.png', btn: 'আমি আগ্রহী' },
            { title: 'MAM অ্যাকাউন্ট', desc: 'ক্লায়েন্টদের আপনার কৌশলে সংযুক্ত করুন, প্রতিটি ক্লায়েন্টের নিজস্ব অ্যাকাউন্ট থাকে।', img: '/images/imagenes%20nuevas/alfiler%20rosa.png', btn: 'আমি আগ্রহী' },
            { title: 'লিভারেজ অ্যাকাউন্ট', desc: 'ব্যবস্থাপকদের জন্য নিবেদিত সিস্টেম, সর্বনিম্ন কমিশনে সবচেয়ে ব্যাপক উপকরণ।', img: '/images/imagenes%20nuevas/reyna%20rosa.png', btn: 'আমি আগ্রহী' },
            { title: 'ECN অ্যাকাউন্ট', desc: 'গতি, নির্ভুলতা এবং শূন্যের কাছাকাছি স্প্রেড।', img: '/images/imagenes%20nuevas/caballo%20rosa.png', btn: 'আমি আগ্রহী' },
        ],
        servicesGrid: [
            { icon: 'flag', title: 'সিগনাল চ্যানেল', desc: 'আপনার প্রথম পদক্ষেপের জন্য আদর্শ রেফারেন্স।', btn: 'আরো জানুন' },
            { icon: 'handshake', title: 'গ্লোবাল র‍্যাংকিং', desc: 'রিয়েল-টাইমে শীর্ষ অপারেটরদের দেখুন।', btn: 'র‍্যাংকিং দেখুন' },
            { icon: 'computer', title: 'প্রো শিক্ষা', desc: 'বিশেষ ওয়েবিনার, ইবুক এবং টিউটোরিয়াল।', btn: 'অ্যাকাডেমিতে যান' },
        ],
        whyBridge: {
            title: 'কেন Bridge Markets?',
            cards: [
                { icon: 'payments', title: 'ধ্রুবক আয়', desc: 'IB হিসাবে, কাস্টমাইজড ঝুঁকি চুক্তি সহ প্রতি লটে $6 USD থেকে আয় করুন।' },
                { icon: 'campaign', title: 'ইমপ্যাক্ট মার্কেটিং', desc: 'পেশাদার বিজ্ঞাপন সম্পদ: ব্যানার, ওয়েবিনার এবং ল্যান্ডিং পেজ।' },
                { icon: 'checklist', title: 'নির্ভরযোগ্য বিধিমালা', desc: 'নিয়ন্ত্রিত ব্রোকার এবং স্বয়ংক্রিয় ডিপোজিট/উইথড্রয়াল প্রক্রিয়া।' },
                { icon: 'desktop_windows', title: 'কৌশলগত সহায়তা', desc: 'নিবেদিত অ্যাকাউন্ট টিম এবং অত্যাধুনিক অনলাইন সরঞ্জাম।' },
            ],
            info: [
                { icon: 'group', title: 'সীমাহীন আয়', desc: 'আর্থিক সীমা ছাড়াই আপনার ব্যবসা স্কেল করুন। পংজীকরণ ১০০% বিনামূল্যে।' },
                { icon: 'description', title: 'মূল্যবান ডেটা', desc: 'পেশাদারভাবে ঝুঁকি পরিচালনার জন্য রিয়েল-টাইম তথ্য।', variant: 'purple' },
                { icon: 'public', title: 'সম্পূর্ণ স্বাধীনতা', desc: 'বৈশ্বিক সরঞ্জাম নিয়ে বিশ্বের যেকোনো প্রান্ত থেকে কাজ করুন।', variant: 'dark' },
                { icon: 'headset_mic', title: '24/7 দক্ষতা', desc: 'আর্থিক বাজারের বিশেষজ্ঞ অ্যাকাউন্ট ম্যানেজারদের সহায়তা।' },
            ],
        },
        finalCTA: { title: 'আপনার আর্থিক মহাবিশ্ব সক্রিয় করুন', desc: 'পরবর্তী স্তরের প্রযুক্তি দিয়ে উড়ান নিন।', btn: 'এখনই আপনার অ্যাকাউন্ট খুলুন' },
        finalInfo: { title: 'সাফল্যের রেফারেন্স দিয়ে কমিশন আয় করুন', desc: 'Introducing Broker হিসাবে, আপনার রেফারেলের প্রতিটি লেনদেনে রিবেট পাবেন।', quote: '*আপনার ক্লায়েন্টদের সাফল্য আপনার বাণিজ্যিক সাফল্যে রূপান্তরিত হয়।' },
    },
    RU: {
        heroTitle: 'Начните копировать', heroHighlight: 'трейдеров', heroSub: 'Социальная торговля позволяет вам торговать на рынке без предварительного опыта. Автоматически копируйте стратегии успешных трейдеров.',
        cta: 'Доступ клиентов', ctaSec: 'Мне интересно',
        statsLabel: ['Активные трейдеры', 'Страны', 'Дневной объём', 'Рейтинг'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Почему Bridge Markets?',
        features: [
            { icon: 'ads_click', title: 'Сверхбыстрое исполнение', desc: 'Серверы NY4 и LD4 для исполнения менее 1 мс.' },
            { icon: 'campaign', title: 'Маркетинговые инструменты', desc: 'Все технологии для привлечения и захвата клиентов.' },
            { icon: 'edit_note', title: 'Надёжная поддержка 24/5', desc: 'Техническая и коммерческая поддержка на вашем языке.' },
            { icon: 'bar_chart', title: 'Полная прозрачность', desc: 'Детальный контроль внутренних процессов и метрик в реальном времени.' },
        ],
        stepsTitle: 'Как получить доступ к социальной торговле?',
        steps: [
            { num: '1', text: 'Создайте аккаунт на нашем портале', link: 'trading.bridgemarketsclients.com' },
            { num: '2', text: 'Внесите первый депозит для активации аккаунта.' },
            { num: '3', text: 'Войдите на платформу социальной торговли', link: 'socialtrading.bridgemarkets.eu' },
            { num: '4', text: 'Изучите рейтинг операторов и выберите своего лидера.' },
        ],
        testTitle: 'Что говорят наши трейдеры',
        testimonials: [
            { name: 'Алексей M.', country: 'Россия', text: 'Невероятные спреды для скальпинга. Мгновенное исполнение и всегда доступная поддержка.' },
            { name: 'Мария R.', country: 'Россия', text: '2 года с Bridge, не изменю. Вывод за 24 часа и очень стабильная платформа.' },
            { name: 'Дмитрий P.', country: 'Россия', text: 'RAW счёт идеален для алго-трейдинга. Очень низкие комиссии, идеально для больших объёмов.' },
        ],
        formTitle: 'Готовы начать?', formSub: 'Оставьте свои данные, и специалист свяжется с вами.',
        fields: ['Полное имя', 'Электронная почта', 'Телефон / WhatsApp'],
        submit: 'Начать сейчас →',
        footerText: 'Институциональные технологии в пределах досягаемости всех инвесторов. Эксперты в социальной торговле и глобальной ликвидности.',
        disclaimer: 'Торговля CFD сопряжена с высоким риском убытков. Убедитесь, что понимаете риски перед инвестированием.',
        chessTitle: 'Начните копировать трейдеров сейчас!',
        chessSubtitle: 'Социальная торговля позволяет торговать без предварительного опыта.',
        chessBenefits: [
            { icon: 'shield', title: 'Полная прозрачность', desc: 'Видите реальную статистику каждого трейдера.' },
            { icon: 'swap_horiz', title: 'Гибкость', desc: 'Вы решаете, сколько инвестировать и кого копировать.' },
            { icon: 'emoji_events', title: 'Зарабатывайте без прямой торговли', desc: 'Используйте опыт лучших трейдеров.' },
        ],
        chessSteps: {
            title: 'Как получить доступ к',
            subtitle: 'социальной торговле?',
            steps: [
                { num: '1', text: 'Создайте аккаунт на нашем портале', link: 'trading.bridgemarketsclients.com' },
                { num: '2', text: 'Внесите первый депозит.' },
                { num: '3', text: 'Войдите на платформу социальной торговли', link: 'socialtrading.bridgemarkets.eu' },
                { num: '4', text: 'Изучите рейтинг операторов.' },
            ],
        },
        chessAccounts: [
            { title: 'Счета с кредитным плечом', desc: 'Увеличьте покупательную способность с помощью счёта с кредитным плечом.', img: '/images/imagenes%20nuevas/rey%20rosa.png', btn: 'Мне интересно' },
            { title: 'PAMM Счета', desc: 'Идеально для трейдеров, желающих управлять консолидированным фондом.', img: '/images/imagenes%20nuevas/peones%20rosa.png', btn: 'Мне интересно' },
            { title: 'MAM Счета', desc: 'Подключите клиентов к своей стратегии, каждый клиент сохраняет индивидуальный счёт.', img: '/images/imagenes%20nuevas/alfiler%20rosa.png', btn: 'Мне интересно' },
            { title: 'Счёт с кредитным плечом', desc: 'Система для управляющих с широким спектром инструментов и минимальными комиссиями.', img: '/images/imagenes%20nuevas/reyna%20rosa.png', btn: 'Мне интересно' },
            { title: 'ECN Счёт', desc: 'Скорость, точность и спреды близкие к нулю через институциональные мосты.', img: '/images/imagenes%20nuevas/caballo%20rosa.png', btn: 'Мне интересно' },
        ],
        servicesGrid: [
            { icon: 'flag', title: 'Канал сигналов', desc: 'Идеальный ориентир для первых шагов.', btn: 'Узнать больше' },
            { icon: 'handshake', title: 'Глобальный рейтинг', desc: 'Смотрите ведущих операторов в режиме реального времени.', btn: 'Смотреть рейтинг' },
            { icon: 'computer', title: 'Профессиональное образование', desc: 'Эксклюзивные вебинары, электронные книги и расширенные учебные пособия.', btn: 'В академию' },
        ],
        whyBridge: {
            title: 'Почему Bridge Markets?',
            cards: [
                { icon: 'payments', title: 'Постоянный доход', desc: 'Как IB, зарабатывайте от 6 USD за лот с индивидуальными соглашениями о рисках.' },
                { icon: 'campaign', title: 'Эффективный маркетинг', desc: 'Профессиональные рекламные ресурсы: баннеры, вебинары и лендинги.' },
                { icon: 'checklist', title: 'Надёжное регулирование', desc: 'Регулируемые брокеры и автоматизированные процессы депозита и вывода.' },
                { icon: 'desktop_windows', title: 'Стратегическая поддержка', desc: 'Выделенная команда по работе со счетами и передовые онлайн-инструменты.' },
            ],
            info: [
                { icon: 'group', title: 'Неограниченный доход', desc: 'Масштабируйте бизнес без финансовых ограничений. Регистрация бесплатная.' },
                { icon: 'description', title: 'Ценные данные', desc: 'Информация в реальном времени для профессионального управления рисками.', variant: 'purple' },
                { icon: 'public', title: 'Полная свобода', desc: 'Работайте из любой точки мира с глобальными инструментами.', variant: 'dark' },
                { icon: 'headset_mic', title: 'Экспертиза 24/7', desc: 'Поддержка опытных аккаунт-менеджеров в финансовых рынках.' },
            ],
        },
        finalCTA: { title: 'Активируйте свою финансовую вселенную', desc: 'Взлетайте с технологиями следующего уровня и покорите глобальные рынки.', btn: 'Открыть счёт сейчас' },
        finalInfo: { title: 'Зарабатывайте комиссии, рекомендуя успех', desc: 'Как Introducing Broker, получайте рибейты за каждую транзакцию ваших рефералов.', quote: '*Успех ваших клиентов равен вашему коммерческому успеху. Никаких ограничений по объёму.' },
    },
};

// ─── Helper: get translations for a language ──────────────────
export function getTranslationsForLanguage(lang: string) {
    return TRANSLATIONS[lang] || TRANSLATIONS['ES'];
}
