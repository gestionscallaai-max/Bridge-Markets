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
const TRANSLATIONS: Record<string, {
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
            { title: 'Cuentas Apalancadas', desc: 'Aumenta tu poder de compra adquiriendo una cuenta apalancada. Con una inversión inicial, puedes acceder a un capital mayor para operar bajo reglas específicas de riesgo, profit y tiempo.', img: '/images/landing/rey.png', btn: 'Me interesa' },
            { title: 'Cuentas PAMM', desc: 'Ideal para operadores que desean gestionar un fondo consolidado con el capital de varios clientes. Con una cuenta PAMM, todas las inversiones se combinan en un solo pool, optimizando la gestión y distribución de ganancias.', img: '/images/landing/peones.png', btn: 'Me interesa' },
            { title: 'Cuentas MAM', desc: 'Si eres un operador que busca conectar clientes a tu estrategia, las cuentas MAM permiten que cada cliente mantenga su cuenta individual mientras se replican automáticamente tus posiciones.', img: '/images/landing/alfil.png', btn: 'Me interesa' },
            { title: 'Cuenta Leverage', desc: 'Sistema dedicado para gestores, goce de la más amplia gama de instrumentos con las comisiones más bajas y potencialice su portafolio MAM con nuestra tecnología.', img: '/images/landing/reyna.png', btn: 'Me interesa' },
            { title: 'Cuenta ECN', desc: 'Velocidad, precisión y spreads cercanos a cero. Conéctate con los mercados reales a través de puentes institucionales y ejecuta cualquier estrategia con máxima eficiencia.', img: '/images/landing/caballo.png', btn: 'Me interesa' }
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
            { title: 'Leveraged Accounts', desc: 'Increase your buying power by acquiring a leveraged account. With an initial investment, you can access larger capital under specific risk rules.', img: '/images/landing/rey.png', btn: 'Interested' },
            { title: 'PAMM Accounts', desc: 'Ideal for traders who want to manage a consolidated fund. With a PAMM account, all investments are combined in a single pool.', img: '/images/landing/peones.png', btn: 'Interested' },
            { title: 'MAM Accounts', desc: 'If you want to connect clients to your strategy, MAM accounts allow each client to maintain an individual account while replicating trades.', img: '/images/landing/alfil.png', btn: 'Interested' },
            { title: 'Leverage Account', desc: 'System dedicated to managers, enjoy the widest range of instruments with the lowest commissions and boost your portfolio.', img: '/images/landing/reyna.png', btn: 'Interested' },
            { title: 'ECN Account', desc: 'Speed, precision and near-zero spreads. Connect with real markets through institutional bridges.', img: '/images/landing/caballo.png', btn: 'Interested' }
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
    BR: { heroTitle: 'Comece a copiar', heroHighlight: 'Traders', heroSub: 'Social Trading permite que você opere no mercado sem experiência.', cta: 'Acesso', ctaSec: 'Interesse', statsLabel: ['Ativos', 'Países', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Ultra Rápido',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Conta',link:''}], testTitle: 'Traders', testimonials: [{name:'C',country:'C',text:'Bom'}], formTitle: 'Início', formSub: 'Dados', fields: ['N', 'E', 'T'], submit: 'Começar', footerText: 'Tech', disclaimer: 'Risco', chessTitle: 'Copiar', chessSubtitle: 'Sem exp', chessBenefits: [{icon:'shield',title:'Transparência',desc:'Stats'}], chessSteps: {title:'Acesso',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Cap',desc:'Power',img:'/images/landing/rey.png',btn:'Interesse'}], servicesGrid: [{icon:'flag',title:'Sinais',desc:'Ref',btn:'Saber'}], whyBridge: {title:'Por que?',cards:[{icon:'payments',title:'Renda',desc:'6 USD'}],info:[{icon:'group',title:'Incrível',desc:'Free'}]}, finalCTA: {title:'Ative',desc:'Tech',btn:'Conta'}, finalInfo: {title:'Sucesso',desc:'Rebates',quote:'*Win'} },
    FR: { heroTitle: 'Copier', heroHighlight: 'Traders', heroSub: 'Social Trading sans expérience.', cta: 'Accès', ctaSec: 'Intérêt', statsLabel: ['Actifs', 'Pays', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Rapide',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Compte',link:''}], testTitle: 'Traders', testimonials: [{name:'C',country:'C',text:'Bien'}], formTitle: 'Début', formSub: 'Infos', fields: ['N', 'E', 'T'], submit: 'Commencer', footerText: 'Tech', disclaimer: 'Risque', chessTitle: 'Copier', chessSubtitle: 'Sans exp', chessBenefits: [{icon:'shield',title:'Transparence',desc:'Stats'}], chessSteps: {title:'Accès',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Lev',desc:'Power',img:'/images/landing/rey.png',btn:'Intérêt'}], servicesGrid: [{icon:'flag',title:'Signaux',desc:'Ref',btn:'Savoir'}], whyBridge: {title:'Pourquoi?',cards:[{icon:'payments',title:'Revenus',desc:'6 USD'}],info:[{icon:'group',title:'Incrédible',desc:'Free'}]}, finalCTA: {title:'Activer',desc:'Tech',btn:'Compte'}, finalInfo: {title:'Succès',desc:'Rebates',quote:'*Win'} },
    AR: { heroTitle: 'ابدأ بالنسخ', heroHighlight: 'المتداولين', heroSub: 'التداول الاجتماعي دون خبرة.', cta: 'دخول', ctaSec: 'مهتم', statsLabel: ['نشط', 'دول', 'حجم', 'ترتيب'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'سريع',desc:'< 1ms.'}], stepsTitle: 'التداول الاجتماعي', steps: [{num:'1',text:'حساب',link:''}], testTitle: 'متداولون', testimonials: [{name:'C',country:'C',text:'جيد'}], formTitle: 'بداية', formSub: 'بيانات', fields: ['ن', 'ب', 'هـ'], submit: 'ابدأ', footerText: 'تكنولوجيا', disclaimer: 'خطر', chessTitle: 'نسخ', chessSubtitle: 'دون خبرة', chessBenefits: [{icon:'shield',title:'شفافية',desc:'إحصائيات'}], chessSteps: {title:'دخول',subtitle:'اجتماعي',steps:[{num:'1',text:'تسجيل',link:''}]}, chessAccounts: [{title:'رافعة',desc:'قوة',img:'/images/landing/rey.png',btn:'مهتم'}], servicesGrid: [{icon:'flag',title:'إشارات',desc:'مرجع',btn:'اعرف'}], whyBridge: {title:'لماذا؟',cards:[{icon:'payments',title:'دخل',desc:'6 USD'}],info:[{icon:'group',title:'رائع',desc:'مجاني'}]}, finalCTA: {title:'نشط',desc:'تكنولوجيا',btn:'حساب'}, finalInfo: {title:'نجاح',desc:'عمولات',quote:'*ربح'} },
    ZH: { heroTitle: '复制交易', heroHighlight: '交易者', heroSub: '无需经验。', cta: '登录', ctaSec: '兴趣', statsLabel: ['活跃', '国家', '交易量', '排名'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'快速',desc:'< 1ms.'}], stepsTitle: '社交交易', steps: [{num:'1',text:'开户',link:''}], testTitle: '交易者', testimonials: [{name:'C',country:'C',text:'好'}], formTitle: '开始', formSub: '信息', fields: ['名', '邮', '话'], submit: '开始', footerText: '技术', disclaimer: '风险', chessTitle: '复制', chessSubtitle: '无需经验', chessBenefits: [{icon:'shield',title:'透明',desc:'数据'}], chessSteps: {title:'访问',subtitle:'社交',steps:[{num:'1',text:'注册',link:''}]}, chessAccounts: [{title:'杠杆',desc:'力量',img:'/images/landing/rey.png',btn:'兴趣'}], servicesGrid: [{icon:'flag',title:'信号',desc:'参考',btn:'了解'}], whyBridge: {title:'为什么?',cards:[{icon:'payments',title:'收入',desc:'6 USD'}],info:[{icon:'group',title:'免费',desc:'注册'}]}, finalCTA: {title:'激活',desc:'技术',btn:'开户'}, finalInfo: {title:'成功',desc:'返佣',quote:'*赢'} },
    ID: { heroTitle: 'Salin', heroHighlight: 'Trader', heroSub: 'Tanpa pengalaman.', cta: 'Akses', ctaSec: 'Tertarik', statsLabel: ['Aktif', 'Negara', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Cepat',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Akun',link:''}], testTitle: 'Trader', testimonials: [{name:'C',country:'C',text:'Bagus'}], formTitle: 'Mulai', formSub: 'Data', fields: ['N', 'E', 'T'], submit: 'Mulai', footerText: 'Tech', disclaimer: 'Risiko', chessTitle: 'Salin', chessSubtitle: 'Tanpa exp', chessBenefits: [{icon:'shield',title:'Transparansi',desc:'Stats'}], chessSteps: {title:'Akses',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Lev',desc:'Power',img:'/images/landing/rey.png',btn:'Tertarik'}], servicesGrid: [{icon:'flag',title:'Sinyal',desc:'Ref',btn:'Tahu'}], whyBridge: {title:'Kenapa?',cards:[{icon:'payments',title:'Income',desc:'6 USD'}],info:[{icon:'group',title:'Free',desc:'Daftar'}]}, finalCTA: {title:'Aktif',desc:'Tech',btn:'Akun'}, finalInfo: {title:'Sukses',desc:'Rebates',quote:'*Win'} },
    VI: { heroTitle: 'Sao chép', heroHighlight: 'Trader', heroSub: 'Không cần kinh nghiệm.', cta: 'Truy cập', ctaSec: 'Quan tâm', statsLabel: ['Hoạt động', 'Quốc gia', 'Khối lượng', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'Nhanh',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Tài khoản',link:''}], testTitle: 'Trader', testimonials: [{name:'C',country:'C',text:'Tốt'}], formTitle: 'Bắt đầu', formSub: 'Dữ liệu', fields: ['T', 'E', 'S'], submit: 'Bắt đầu', footerText: 'Tech', disclaimer: 'Rủi ro', chessTitle: 'Sao chép', chessSubtitle: 'Không exp', chessBenefits: [{icon:'shield',title:'Minh bạch',desc:'Stats'}], chessSteps: {title:'Truy cập',subtitle:'Social',steps:[{num:'1',text:'Đăng ký',link:''}]}, chessAccounts: [{title:'Đòn bẩy',desc:'Power',img:'/images/landing/rey.png',btn:'Quan tâm'}], servicesGrid: [{icon:'flag',title:'Tín hiệu',desc:'Ref',btn:'Biết'}], whyBridge: {title:'Tại sao?',cards:[{icon:'payments',title:'Thu nhập',desc:'6 USD'}],info:[{icon:'group',title:'Free',desc:'Đăng ký'}]}, finalCTA: {title:'Kích hoạt',desc:'Tech',btn:'Tài khoản'}, finalInfo: {title:'Thành công',desc:'Rebates',quote:'*Win'} },
    JP: { heroTitle: 'コピー', heroHighlight: 'トレーダー', heroSub: '経験不要。', cta: 'アクセス', ctaSec: '興味', statsLabel: ['活動', '国', '出来高', '順位'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'ads_click',title:'高速',desc:'< 1ms.'}], stepsTitle: 'ソーシャルトレード', steps: [{num:'1',text:'口座',link:''}], testTitle: 'トレーダー', testimonials: [{name:'C',country:'C',text:'良'}], formTitle: '開始', formSub: '情報', fields: ['名', 'メ', '電'], submit: '開始', footerText: '技術', disclaimer: 'リスク', chessTitle: 'コピー', chessSubtitle: '経験不要', chessBenefits: [{icon:'shield',title:'透明性',desc:'データ'}], chessSteps: {title:'アクセス',subtitle:'ソーシャル',steps:[{num:'1',text:'登録',link:''}]}, chessAccounts: [{title:'レバ',desc:'パワー',img:'/images/landing/rey.png',btn:'興味'}], servicesGrid: [{icon:'flag',title:'シグナル',desc:'参考',btn:'知る'}], whyBridge: {title:'なぜ?',cards:[{icon:'payments',title:'報酬',desc:'6 USD'}],info:[{icon:'group',title:'無料',desc:'登録'}]}, finalCTA: {title:'有効化',desc:'技術',btn:'口座'}, finalInfo: {title:'成功',desc:'報酬',quote:'*勝'} },
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
            { title: 'लीवरेज्ड खाते', desc: 'लीवरेज्ड खाता प्राप्त करके अपनी क्रय शक्ति बढ़ाएं।', img: '/images/landing/rey.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'PAMM खाते', desc: 'कई ग्राहकों की पूंजी से एक समेकित फंड प्रबंधित करना चाहते हैं?', img: '/images/landing/peones.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'MAM खाते', desc: 'ग्राहकों को अपनी रणनीति से जोड़ें, प्रत्येक ग्राहक का अपना खाता बना रहता है।', img: '/images/landing/alfil.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'लीवरेज खाता', desc: 'प्रबंधकों के लिए समर्पित प्रणाली, सबसे कम कमीशन के साथ सबसे व्यापक उपकरण।', img: '/images/landing/reyna.png', btn: 'मुझे दिलचस्पी है' },
            { title: 'ECN खाता', desc: 'गति, सटीकता और शून्य के करीब स्प्रेड। संस्थागत पुलों के माध्यम से वास्तविक बाजारों से जुड़ें।', img: '/images/landing/caballo.png', btn: 'मुझे दिलचस्पी है' },
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
            { title: 'লিভারেজড অ্যাকাউন্ট', desc: 'লিভারেজড অ্যাকাউন্ট নিয়ে আপনার ক্রয় ক্ষমতা বাড়ান।', img: '/images/landing/rey.png', btn: 'আমি আগ্রহী' },
            { title: 'PAMM অ্যাকাউন্ট', desc: 'একাধিক ক্লায়েন্টের মূলধন দিয়ে একটি সমন্বিত ফান্ড পরিচালনা করুন।', img: '/images/landing/peones.png', btn: 'আমি আগ্রহী' },
            { title: 'MAM অ্যাকাউন্ট', desc: 'ক্লায়েন্টদের আপনার কৌশলে সংযুক্ত করুন, প্রতিটি ক্লায়েন্টের নিজস্ব অ্যাকাউন্ট থাকে।', img: '/images/landing/alfil.png', btn: 'আমি আগ্রহী' },
            { title: 'লিভারেজ অ্যাকাউন্ট', desc: 'ব্যবস্থাপকদের জন্য নিবেদিত সিস্টেম, সর্বনিম্ন কমিশনে সবচেয়ে ব্যাপক উপকরণ।', img: '/images/landing/reyna.png', btn: 'আমি আগ্রহী' },
            { title: 'ECN অ্যাকাউন্ট', desc: 'গতি, নির্ভুলতা এবং শূন্যের কাছাকাছি স্প্রেড।', img: '/images/landing/caballo.png', btn: 'আমি আগ্রহী' },
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
            { title: 'Счета с кредитным плечом', desc: 'Увеличьте покупательную способность с помощью счёта с кредитным плечом.', img: '/images/landing/rey.png', btn: 'Мне интересно' },
            { title: 'PAMM Счета', desc: 'Идеально для трейдеров, желающих управлять консолидированным фондом.', img: '/images/landing/peones.png', btn: 'Мне интересно' },
            { title: 'MAM Счета', desc: 'Подключите клиентов к своей стратегии, каждый клиент сохраняет индивидуальный счёт.', img: '/images/landing/alfil.png', btn: 'Мне интересно' },
            { title: 'Счёт с кредитным плечом', desc: 'Система для управляющих с широким спектром инструментов и минимальными комиссиями.', img: '/images/landing/reyna.png', btn: 'Мне интересно' },
            { title: 'ECN Счёт', desc: 'Скорость, точность и спреды близкие к нулю через институциональные мосты.', img: '/images/landing/caballo.png', btn: 'Мне интересно' },
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

export function generateLandingHTML(data: LandingData): string {
    const t = TRANSLATIONS[data.language] || TRANSLATIONS['ES'];
    const cfg = data.config || { enabledSections: DEFAULT_SECTIONS, content: {} };
    const sections = cfg.enabledSections || DEFAULT_SECTIONS;
    const content = cfg.content || {};

    const gaScript = data.googleAnalyticsId ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${data.googleAnalyticsId}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${data.googleAnalyticsId}');</script>` : '';

    const wa = data.whatsapp ? 'https://wa.me/' + data.whatsapp.replace(/[^0-9]/g, '') : '#';

    // Content with overrides
    const heroTitle = content.heroTitle || t.heroTitle;
    const heroHighlight = content.heroHighlight || t.heroHighlight;
    const heroSub = content.heroSub || t.heroSub;
    const benefits = content.benefitsItems && content.benefitsItems.length > 0 ? content.benefitsItems : t.chessBenefits;
    const stepsItems = content.stepsItems && content.stepsItems.length > 0 ? content.stepsItems : t.chessSteps.steps;
    const accountsItems = content.accountsItems && content.accountsItems.length > 0 ? content.accountsItems : t.chessAccounts;
    const servicesItems = content.servicesItems && content.servicesItems.length > 0 ? content.servicesItems : t.servicesGrid;
    const whyCards = content.whyBridgeCards && content.whyBridgeCards.length > 0 ? content.whyBridgeCards : t.whyBridge.cards;
    const whyInfo = content.whyBridgeInfo && content.whyBridgeInfo.length > 0 ? content.whyBridgeInfo : t.whyBridge.info;
    const fctaTitle = content.finalCTATitle || t.finalCTA.title;
    const fctaDesc = content.finalCTADesc || t.finalCTA.desc;
    const fctaBtn = content.finalCTABtn || t.finalCTA.btn;
    const formTitle = content.formTitle || t.formTitle;
    const formSub = content.formSub || t.formSub;

    // Account Cards Builder
    const accountsHTML = sections.accounts ? accountsItems.map((a, i) => {
        const isRight = i === 2; 
        const isWide = i >= 3; 
        
        if (isWide) {
            const isReverse = i === 4; 
            return `
                <article class="reveal bg-[#000000] text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center relative min-h-[320px] overflow-hidden group shadow-2xl border border-white/5">
                    <div class="absolute inset-y-0 ${isReverse ? 'right-0' : 'left-0'} w-1/2 flex items-center transform group-hover:${isReverse ? 'translate-x-4' : '-translate-x-4'} transition duration-700 pointer-events-none z-0">
                        <img src="${a.img}" alt="${a.title}" class="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] mix-blend-screen">
                    </div>
                    <div class="md:${isReverse ? 'mr-auto' : 'ml-auto'} md:w-1/2 relative z-10 space-y-6">
                        <h3 class="text-4xl font-bold leading-tight">${a.title.split(' ').join('<br>')}</h3>
                        <p class="text-xs text-gray-400 leading-relaxed font-light">${a.desc}</p>
                        <button class="btn-purple text-white w-full py-4 rounded-2xl font-bold text-sm" onclick="location.href='#registro'">${a.btn}</button>
                    </div>
                </article>`;
        }

        return `
                <article class="reveal bg-[#000000] text-white rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-end relative h-[450px] overflow-hidden group shadow-2xl border border-white/5" ${i > 0 ? `style="transition-delay: ${i * 100}ms;"` : ''}>
                    <div class="absolute ${i === 1 ? 'inset-0 flex justify-center items-start pt-4' : i === 2 ? '-top-10 -right-10' : '-top-10 -left-10'} w-full h-full transform group-hover:scale-110 transition duration-700 pointer-events-none">
                        <img src="${a.img}" alt="${a.title}" class="${i === 1 ? 'w-full h-2/3' : 'w-2/3 h-2/3'} object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] mix-blend-screen">
                    </div>
                    <div class="relative z-10 space-y-4">
                        <h3 class="text-3xl font-bold uppercase tracking-tighter leading-none ${isRight ? 'text-right md:text-left' : ''}">${a.title.split(' ').join('<br>')}</h3>
                        <p class="text-[10px] text-gray-400 leading-relaxed font-light line-clamp-3 ${isRight ? 'md:text-left text-right' : ''}">${a.desc}</p>
                        <button class="btn-purple text-white w-full py-4 rounded-2xl font-bold text-sm" onclick="location.href='#registro'">${a.btn}</button>
                    </div>
                </article>`;
    }).join('') : '';

    // Form Logic
    const formScript = `
        document.getElementById("leadForm").addEventListener("submit",async function(e){
            e.preventDefault();
            var btn=document.getElementById("submitBtn");
            var msg=document.getElementById("formMessage");
            var fields=document.querySelectorAll(".lead-input");
            btn.disabled=true; btn.textContent="Enviando...";
            try{
                var res=await fetch("/api/leads",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        name:fields[0].value,
                        email:fields[1].value,
                        whatsapp:fields[2].value,
                        landingSlug:"${data.slug}",
                        partnerId:"${data.partnerId}"
                    })
                });
                var resData=await res.json();
                if(resData.success){
                    msg.innerHTML="<div class='bg-green-100 text-green-700 p-4 rounded-xl font-bold mt-4'>¡Gracias! Te contactaremos pronto.</div>";
                    document.getElementById("leadForm").reset();
                    btn.textContent="Enviado";
                }else{ throw new Error(); }
            }catch(err){
                msg.innerHTML="<div class='bg-red-100 text-red-700 p-4 rounded-xl font-bold mt-4'>Error al enviar. Intenta de nuevo.</div>";
                btn.disabled=false; btn.textContent="${t.submit}";
            }
        });`;

    // ─── Build Sections ─────────────────────────────────────
    const heroSection = sections.hero ? `
        <section id="social-trading" class="reveal">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-7xl font-extrabold mb-6 text-brand-dark tracking-tight">
                    ${heroTitle} <span class="text-brand-purple">${heroHighlight}</span> ${data.language === 'ES' ? 'ahora!' : 'now!'}
                </h1>
                <p class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">${heroSub}</p>
            </div>
        </section>` : '';

    const benefitsSection = sections.benefits ? `
        <section class="reveal">
            <div class="bg-brand-dark rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(10,5,26,0.3)] relative overflow-hidden">
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-brand-purple opacity-20 blur-[100px]"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative z-10">
                    ${benefits.map(b => `
                        <article class="bg-white rounded-[2rem] p-6 flex items-center gap-5 shadow-xl hover:scale-105 transition duration-300">
                            <div class="bg-brand-dark rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 text-brand-purple text-2xl shadow-lg"><span class="material-symbols-outlined">${b.icon}</span></div>
                            <div>
                                <h4 class="font-bold text-brand-dark text-sm">${b.title}</h4>
                                <p class="text-[10px] text-gray-500 mt-1">${b.desc}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>
                ${sections.steps ? `
                <div class="flex flex-col lg:flex-row gap-16 relative z-10 items-center">
                    <div class="lg:w-1/2">
                        <h2 class="text-4xl md:text-5xl font-light text-gray-300 leading-tight">
                            ${t.chessSteps.title}<br>
                            <span class="text-white font-bold block mt-2">${t.chessSteps.subtitle}</span>
                        </h2>
                        <p class="text-gray-400 mt-6 text-sm">Partner: ${data.fullName} · ${data.country}</p>
                    </div>
                    <div class="lg:w-1/2 space-y-4">
                        ${stepsItems.map(s => `
                            <div class="bg-brand-stepBg/50 border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                                <div class="bg-white text-brand-purple font-black text-xl rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">${s.num}</div>
                                <div>
                                    <h4 class="text-white text-sm font-semibold">${s.text}</h4>
                                    ${s.link ? `<span class="text-brand-accent text-xs mt-1 block">${s.link}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
        </section>` : '';

    const accountsSection = sections.accounts ? `
        <section id="cuentas" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">${accountsHTML}</div>
        </section>` : '';

    const servicesSection = sections.services ? `
        <section class="reveal bg-transparent p-10 md:p-20 border-y border-purple-50">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                ${servicesItems.map(s => `
                    <article>
                        <div class="text-brand-purple text-4xl mb-6 flex justify-center md:justify-start"><span class="material-symbols-outlined text-4xl">${s.icon}</span></div>
                        <h3 class="font-bold text-xl text-brand-dark mb-3">${s.title}</h3>
                        <p class="text-sm text-gray-500 mb-8 leading-relaxed">${s.desc}</p>
                        <button class="bg-brand-dark text-white px-8 py-3 rounded-2xl text-xs font-bold hover:bg-brand-purple transition-all w-full md:w-auto" onclick="location.href='#registro'">${s.btn}</button>
                    </article>
                `).join('')}
            </div>
        </section>` : '';

    const whyBridgeSection = sections.whyBridge ? `
        <section id="ib-program" class="py-12 reveal">
            <h2 class="text-4xl md:text-5xl font-black text-center mb-16 text-brand-dark">
                ${t.whyBridge.title.split('Bridge')[0]} <span class="text-brand-purple">Bridge Markets?</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                ${whyCards.map(c => `
                    <article class="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 flex gap-6 items-start shadow-sm hover:shadow-xl hover:border-brand-purple/20 transition duration-300">
                        <div class="bg-brand-dark text-white p-4 rounded-2xl text-xl shadow-lg"><span class="material-symbols-outlined">${c.icon}</span></div>
                        <div>
                            <h3 class="font-bold text-lg text-brand-dark mb-2">${c.title}</h3>
                            <p class="text-sm text-gray-500 leading-relaxed">${c.desc}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${whyInfo.map(i => `
                    <article class="${i.variant === 'purple' ? 'bg-brand-purple text-white' : i.variant === 'dark' ? 'bg-brand-dark text-white' : 'bg-white/40 backdrop-blur-md border border-white/50'} rounded-3xl p-8 shadow-lg text-center flex flex-col items-center hover:-translate-y-2 transition duration-300">
                        <div class="${i.variant ? 'bg-white/20' : 'bg-purple-100'} text-brand-purple p-4 rounded-full mb-6 ${i.variant ? 'text-white' : ''}"><span class="material-symbols-outlined">${i.icon}</span></div>
                        <h3 class="font-bold text-sm mb-3">${i.title}</h3>
                        <p class="text-xs ${i.variant ? 'text-purple-100' : 'text-gray-400'}">${i.desc}</p>
                    </article>
                `).join('')}
            </div>
        </section>` : '';

    const finalCTASection = sections.finalCTA ? `
        <section class="reveal bg-brand-purple rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-10">
            <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="600" height="400" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 300L50 200L150 250L250 100L400 150V300H0Z" fill="white"/></svg>
            </div>
            <div class="relative z-10 lg:w-2/3">
                <h2 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">${fctaTitle}</h2>
                <p class="text-purple-100 text-lg mb-10 font-light">${fctaDesc}</p>
                <a href="#registro" class="bg-white text-brand-purple font-extrabold py-5 px-12 rounded-2xl shadow-2xl hover:bg-gray-50 transform hover:scale-105 transition-all text-lg inline-block">${fctaBtn}</a>
            </div>
        </section>` : '';

    const registrationSection = sections.registration ? `
        <section id="registro" class="reveal bg-transparent p-10 md:p-24 flex flex-col lg:flex-row items-center gap-20 border-t border-purple-50">
            <div class="lg:w-1/2">
                <h2 class="text-4xl md:text-6xl font-black text-brand-dark mb-8 leading-tight">
                    ${t.finalInfo.title.split('referiendo')[0]} <span class="text-brand-purple">Éxito</span>
                </h2>
                <div class="space-y-6">
                    <p class="text-base text-gray-600 leading-relaxed font-medium">${t.finalInfo.desc}</p>
                    <p class="text-xs text-gray-400 leading-relaxed italic border-l-4 border-brand-purple pl-4">${t.finalInfo.quote}</p>
                    <div class="mt-10 p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
                        <h4 class="font-bold text-xl mb-2 text-brand-dark">${formTitle}</h4>
                        <p class="text-sm text-gray-400 mb-6">${formSub}</p>
                        <form id="leadForm" class="space-y-4">
                            ${t.fields.map((f, idx) => `
                                <div>
                                    <label class="block text-xs font-bold text-gray-400 uppercase mb-2">${f}</label>
                                    <input type="${idx === 1 ? 'email' : idx === 2 ? 'tel' : 'text'}" required class="lead-input w-full bg-gray-50 border border-gray-100 rounded-xl p-4 outline-none focus:border-brand-purple transition" placeholder="${f}">
                                </div>
                            `).join('')}
                            <button type="submit" id="submitBtn" class="btn-purple text-white w-full py-5 rounded-xl font-bold text-lg">${t.submit}</button>
                            <div id="formMessage"></div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/2 flex justify-center relative group">
                <div class="absolute w-80 h-80 bg-brand-purple/10 rounded-full blur-[100px] -z-10 group-hover:bg-brand-purple/20 transition duration-500"></div>
                <img src="/images/landing/reloj-arena.png" alt="Efectividad" class="w-full max-w-md object-contain drop-shadow-2xl transform group-hover:rotate-6 transition duration-700">
            </div>
        </section>` : '';

    return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bridge Markets | ${t.chessTitle}</title>
    <meta name="description" content="${heroSub}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">${gaScript}
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Poppins', 'sans-serif'] },
                    colors: {
                        brand: { dark: '#0A051A', purple: '#6D28D9', stepBg: '#2D1B5E', accent: '#8B5CF6' }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background-color: #FFFFFF;
            background-image: 
                radial-gradient(at 0% 0%, rgba(245, 243, 255, 0.8) 0, transparent 50%), 
                radial-gradient(at 100% 0%, rgba(219, 234, 254, 0.8) 0, transparent 50%), 
                radial-gradient(at 100% 100%, rgba(245, 243, 255, 0.8) 0, transparent 50%), 
                radial-gradient(at 0% 100%, rgba(219, 234, 254, 0.8) 0, transparent 50%);
            background-attachment: fixed; min-height: 100vh;
        }
        .btn-purple { background: linear-gradient(90deg, #6D28D9 0%, #8B5CF6 100%); transition: all 0.4s; }
        .btn-purple:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(109, 40, 217, 0.3); }
        
        .reveal { transition: all 0.8s ease-out; }
        .js-enabled .reveal:not(.active) { opacity: 0; transform: translateY(30px); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); }
    </style>
</head>
<body class="font-sans text-gray-800 antialiased">
    <script>document.body.classList.add('js-enabled');</script>
    <header class="fixed top-0 w-full z-50 px-6 py-4 glass border-b border-purple-50">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">B</div>
                <span class="text-xl font-extrabold tracking-tighter text-brand-dark">BRIDGE <span class="text-brand-purple">MARKETS</span></span>
            </div>
            <nav class="hidden md:flex gap-8 text-sm font-semibold">
                ${sections.hero ? '<a href="#social-trading" class="hover:text-brand-purple transition">Social Trading</a>' : ''}
                ${sections.accounts ? '<a href="#cuentas" class="hover:text-brand-purple transition">Cuentas</a>' : ''}
                ${sections.whyBridge ? '<a href="#ib-program" class="hover:text-brand-purple transition">Programa IB</a>' : ''}
            </nav>
            <a href="#registro" class="bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-purple transition-all">${t.cta}</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-24">
        ${heroSection}
        ${benefitsSection}
        ${accountsSection}
        ${servicesSection}
        ${whyBridgeSection}
        ${finalCTASection}
        ${registrationSection}
    </main>

    <footer class="bg-brand-dark text-white pt-24 pb-12 mt-24">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-2 mb-6 text-2xl font-black">
                        <div class="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white">B</div>
                        <span>BRIDGE MARKETS</span>
                    </div>
                    <p class="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">${t.footerText}</p>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-brand-accent uppercase tracking-widest text-xs">Empresa</h4>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Sobre Nosotros</a></li>
                        <li><a href="#" class="hover:text-white transition">Contacto</a></li>
                        <li><a href="#" class="hover:text-white transition">Regulación</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-brand-accent uppercase tracking-widest text-xs">Legal</h4>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Términos y Condiciones</a></li>
                        <li><a href="#" class="hover:text-white transition">Aviso de Riesgo</a></li>
                        <li><a href="#" class="hover:text-white transition">Política de Privacidad</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-xs text-gray-500">&copy; 2026 Bridge Markets. Todos los derechos reservados.</p>
                <div class="flex gap-6">
                    <a href="${wa}" target="_blank" class="text-gray-500 hover:text-white transition">Contact Partner</a>
                    <a href="#" class="text-gray-500 hover:text-white transition">Instagram</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            reveals.forEach(reveal => revealOnScroll.observe(reveal));
        });
        ${sections.registration ? formScript : ''}
    </script>
</body>
</html>`;
}


export function downloadLandingHTML(html: string, filename: string) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function openLandingPreview(html: string) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    window.open(URL.createObjectURL(blob), '_blank');
}

// ─── MODULAR GENERATOR ──────────────────────────────────────
// Assembles sections from the catalog to create a full landing page
import { SECTION_RENDERERS, getSharedStyles, getSharedHead, type BrandConfig } from './landing-sections';
import { getTemplateById } from './landing-templates';

export function generateModularLandingHTML(data: LandingData): string {
    const modConf = data.modularConfig;
    if (!modConf) return generateLandingHTML(data); // fallback to legacy

    const template = getTemplateById(modConf.templateId);
    const sectionIds = modConf.selectedSections.length > 0
        ? modConf.selectedSections
        : (template?.sections || ['hero_dark', 'stats_row']);

    const brand: BrandConfig = {
        partnerName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        partnerId: data.partnerId,
        language: data.language,
    };

    // Render each section with alternating slants
    const sectionsHtml = sectionIds
        .map((sId, idx) => {
            const renderer = SECTION_RENDERERS[sId];
            if (!renderer) return `<!-- Section "${sId}" not found -->`;
            const overrides = modConf.sectionOverrides[sId] || {};
            const sectionHtml = renderer(overrides, brand);
            const slantClass = idx % 2 === 0 ? 'slant-down' : 'slant-up';
            return `<div class="${slantClass}">${sectionHtml}</div>`;
        })
        .join('\n');

    // Registration form
    const formHtml = `
    <section id="register" class="py-24 px-8 relative slant-down" style="background: linear-gradient(135deg, #0f081d 0%, #6635de 100%);">
        <div class="max-w-xl mx-auto glass-panel asym-card p-12 md:p-16 relative section-reveal">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-extrabold font-headline text-white mb-3">Open Account</h2>
                <p class="text-white/60 text-sm">Start your trading journey with Bridge Markets</p>
            </div>
            <form id="landing-form" class="space-y-6" onsubmit="return false;">
                <input type="hidden" name="partner_id" value="${data.partnerId}" />
                <div>
                    <label class="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Full Name</label>
                    <input name="name" type="text" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary" placeholder="John Doe" required />
                </div>
                <div>
                    <label class="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Email</label>
                    <input name="email" type="email" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary" placeholder="john@example.com" required />
                </div>
                <div>
                    <label class="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">Phone</label>
                    <input name="phone" type="tel" class="w-full bg-white/5 border border-white/10 rounded-xl p-4 text-white placeholder:text-white/30 focus:outline-none focus:border-primary" placeholder="+1 234 567 8900" required />
                </div>
                <button type="submit" class="w-full py-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-2xl transition-all text-lg">Create Account</button>
                <p class="text-[10px] text-white/30 text-center italic mt-4">Trading involves risk. Only invest capital you can afford to lose.</p>
            </form>
        </div>
    </section>`;

    // Footer
    const footerHtml = `
    <footer class="border-t border-white/5 pt-20 pb-12" style="background: #0f081d;">
        <div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div class="max-w-xs">
                <div class="text-2xl font-bold font-headline mb-6 text-white">Bridge <span class="text-primary">Markets</span></div>
                <p class="text-white/40 text-sm leading-relaxed">The global standard for transparent, institutional-grade social trading and fund management.</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm font-medium">
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Platform</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Copy Trading</a>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">MAM Engine</a>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Company</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">About</a>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Security</a>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Support</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Knowledge Base</a>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Contact</a>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Legal</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Privacy</a>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-8 text-center text-[10px] text-white/10 leading-relaxed border-t border-white/5 pt-12">
            High-Risk Investment Warning: Trading in financial markets involves significant risk. Leverage can work against you as well as for you. Past performance is not indicative of future results. Only invest capital you can afford to lose.
            <br>© ${new Date().getFullYear()} Bridge Markets Global Limited. Partner: ${data.partnerId}
        </div>
    </footer>`;

    return `<!DOCTYPE html>
<html lang="${data.language === 'ES' ? 'es' : data.language === 'BR' ? 'pt' : 'en'}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Bridge Markets | ${template?.name || 'Trading Platform'}</title>
    ${getSharedHead()}
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; overflow-x: hidden; background: #080411; }
        ${getSharedStyles()}
    </style>
</head>
<body class="bg-[#080411] text-[#211635]">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-[100] px-6 py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 rounded-full px-8 h-16 shadow-2xl">
            <div class="text-2xl font-bold tracking-tighter text-white font-headline">Bridge <span class="text-primary">Markets</span></div>
            <div class="hidden md:flex items-center gap-10 text-sm font-semibold">
                <a class="text-white/60 hover:text-primary transition-all" href="#">Platform</a>
                <a class="text-white/60 hover:text-primary transition-all" href="#">Security</a>
                <a class="text-white/60 hover:text-primary transition-all" href="#">Pricing</a>
            </div>
            <div class="flex items-center gap-4">
                <a href="#register" class="bg-primary px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-primary/40 active:scale-95 transition-all">Get Started</a>
            </div>
        </div>
    </nav>

    <main class="">
        ${sectionsHtml}
        ${formHtml}
    </main>

    ${footerHtml}

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // ─── Reveal System ───
            const reveals = document.querySelectorAll('.section-reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            reveals.forEach(el => observer.observe(el));

            // ─── Enhanced Parallax Engine ───
            const sections = document.querySelectorAll('section, div.slant-down, div.slant-up');
            const assetsCatalog = [
                '/images/landing/rey.png',
                '/images/landing/peones.png',
                '/images/landing/alfil.png',
                '/images/landing/reyna.png',
                '/images/landing/caballo.png'
            ];

            // Inject Floating Chess Assets
            sections.forEach((section, index) => {
                if (index % 1 === 0) { // All sections
                    const assetUrl = assetsCatalog[index % assetsCatalog.length];
                    const asset = document.createElement('img');
                    asset.src = assetUrl;
                    asset.className = 'floating-asset';
                    const size = 150 + Math.random() * 200;
                    asset.style.width = size + 'px';
                    asset.style.top = (20 + Math.random() * 60) + '%';
                    asset.style.left = (index % 2 === 0 ? '-5%' : '85%');
                    asset.dataset.speed = (0.05 + Math.random() * 0.1).toString();
                    section.appendChild(asset);
                }
            });

            window.addEventListener('scroll', () => {
                const scrolled = window.scrollY;
                
                // Parallax for assets and elements
                document.querySelectorAll('.floating-asset').forEach(asset => {
                    const speed = parseFloat(asset.dataset.speed || '0.1');
                    const rect = asset.parentElement.getBoundingClientRect();
                    const offset = (window.innerHeight / 2 - rect.top) * speed;
                    asset.style.transform = 'translateY(' + offset + 'px) rotate(' + (offset * 0.05) + 'deg)';
                });

                // Parallax for titles and cards
                document.querySelectorAll('.section-reveal').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const speed = 0.05;
                        const offset = (window.innerHeight / 2 - rect.top) * speed;
                        const title = el.querySelector('h1, h2');
                        if (title) title.style.transform = 'translateY(' + offset + 'px)';
                    }
                });
            });
            
            // ─── Form Submission ───
            const form = document.getElementById('landing-form');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('button');
                    const originalText = btn.innerText;
                    btn.disabled = true;
                    btn.innerText = 'Processing...';
                    
                    const formData = new FormData(form);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        partnerId: formData.get('partner_id'),
                        landingSlug: "${data.slug}"
                    };

                    try {
                        const res = await fetch('/api/leads', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        });
                        if (res.ok) {
                            btn.innerText = 'Success!';
                            btn.style.background = '#10b981';
                            form.reset();
                        } else {
                            btn.innerText = 'Error. Try again';
                            btn.disabled = false;
                        }
                    } catch (err) {
                        btn.innerText = 'Error. Try again';
                        btn.disabled = false;
                    }
                });
            }
        });
    </script>
</body>
</html>`;
}
