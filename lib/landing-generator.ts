// ============================================================
// Bridge Markets — Premium Landing Page Generator v2
// ============================================================

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
}

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
            { icon: '🎯', title: 'Ejecución Ultra Rápida', desc: 'Servidores Equinix NY4 y LD4 para ejecución en < 1ms.' },
            { icon: '📢', title: 'Para herramientas de marketing de impacto', desc: 'Toda la tecnología necesaria para atraer y captar clientes.' },
            { icon: '📝', title: 'Soporte 24/5 confiable', desc: 'Soporte técnico y comercial especializado en su idioma las 24 horas.' },
            { icon: '📊', title: 'Total visibilidad', desc: 'Controle detalladamente sus procesos internos y métricas de desempeño en tiempo real.' },
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
            { name: 'Carlos M.', country: '🇨🇴 Colombia', text: 'Los spreads son increíbles para scalping. Ejecución instantánea y soporte siempre disponible.' },
            { name: 'Ana R.', country: '🇲🇽 México', text: 'Llevo 2 años con Bridge y no cambiaría. Retiros en 24 horas y plataforma muy estable.' },
            { name: 'Luis P.', country: '🇪🇸 España', text: 'La cuenta RAW es perfecta para trading algorítmico. Comisiones muy bajas, ideal para alto volumen.' },
        ],
        formTitle: '¿Listo para empezar?', formSub: 'Déjanos tus datos y un especialista te contactará.',
        fields: ['Nombre completo', 'Correo electrónico', 'Teléfono / WhatsApp'],
        submit: 'Comenzar Ahora →',
        footerText: 'Tecnología institucional al alcance de todos los inversores. Expertos en Social Trading y soluciones de liquidez global.',
        disclaimer: 'El trading de CFDs implica un alto riesgo de pérdida. Más del 70% de los inversores minoristas pierden dinero. Asegúrese de comprender los riesgos antes de invertir.',
        chessTitle: '¡Empieza a copiar Traders ahora!',
        chessSubtitle: 'El Social Trading te permite operar en el mercado sin necesidad de experiencia previa.',
        chessBenefits: [
            { icon: '🛡️', title: 'Transparencia total', desc: 'Ve estadísticas reales de cada trader.' },
            { icon: '🔀', title: 'Flexibilidad', desc: 'Tú decides cuánto invertir y a quién copiar.' },
            { icon: '🏆', title: 'Gana sin operar directamente', desc: 'Aprovecha la experiencia de los mejores.' }
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
            { icon: '🚩', title: 'Canal de señales', desc: 'Referencia ideal para tus primeros pasos. Estructura simple y líquida para máxima ejecución.', btn: 'Saber más' },
            { icon: '🤝', title: 'Ranking Global', desc: 'Visualiza en tiempo real a los operadores líderes y analiza sus métricas de éxito histórico.', btn: 'Ver Ranking' },
            { icon: '💻', title: 'Educación Pro', desc: 'Acceso a webinars exclusivos, ebooks y tutoriales avanzados para potenciar tus habilidades.', btn: 'Ir a la Academia' }
        ],
        whyBridge: {
            title: '¿Por qué Bridge Markets?',
            cards: [
                { icon: '💰', title: 'Ingresos Constantes', desc: 'Como IB, gana desde 6 USD por lote con acuerdos de riesgo personalizados a tu medida.' },
                { icon: '📢', title: 'Marketing de Impacto', desc: 'Recursos publicitarios profesionales: banners, webinars y landing pages para expandir tu marca.' },
                { icon: '📋', title: 'Regulación Confiable', desc: 'Brokers regulados y procesos automatizados de depósitos y retiros para tu total tranquilidad.' },
                { icon: '🖥️', title: 'Soporte Estratégico', desc: 'Equipo de cuentas dedicado y herramientas online de última generación para tu éxito comercial.' }
            ],
            info: [
                { icon: '👥', title: 'Ingresos Ilimitados', desc: 'Escala tu negocio sin techos financieros. El registro es 100% gratuito.' },
                { icon: '📄', title: 'Data Valiosa', desc: 'Información en tiempo real para gestionar riesgos de manera profesional.', variant: 'purple' },
                { icon: '🌍', title: 'Libertad Total', desc: 'Trabaja desde cualquier parte del mundo con herramientas globales.', variant: 'dark' },
                { icon: '🎧', title: 'Expertise 24/7', desc: 'Soporte de Account Managers expertos en mercados financieros.' }
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
            { icon: '🎯', title: 'Ultra-Fast Execution', desc: 'NY4 and LD4 servers for < 1ms execution.' },
            { icon: '📢', title: 'Impactful Marketing Tools', desc: 'All the logic and technology to attract and capture clients.' },
            { icon: '🛡️', title: 'Reliable 24/5 Support', desc: 'Dedicated technical and commercial support in your language.' },
            { icon: '📊', title: 'Total Transparency', desc: 'Detail control of your internal processes and performance metrics.' },
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
            { name: 'Carlos M.', country: '🇨🇴 Colombia', text: 'Incredible spreads for scalping. Instant execution and always-available support.' },
            { name: 'Ana R.', country: '🇲🇽 Mexico', text: '2 years with Bridge and I wouldn\'t change. 24-hour withdrawals and a very stable platform.' },
            { name: 'Luis P.', country: '🇪🇸 Spain', text: 'The RAW account is perfect for algo trading. Very low commissions, ideal for high volume.' },
        ],
        formTitle: 'Ready to start?', formSub: 'Leave us your details and a specialist will contact you.',
        fields: ['Full name', 'Email address', 'Phone / WhatsApp'],
        submit: 'Start Now →',
        footerText: 'Institutional technology within reach of all investors. Experts in Social Trading and global liquidity solutions.',
        disclaimer: 'CFD trading involves high risk of loss. Over 70% of retail investors lose money. Understand risks before investing.',
        chessTitle: 'Start copying Traders now!',
        chessSubtitle: 'Social Trading allows you to trade in the market without needing prior experience.',
        chessBenefits: [
            { icon: '🛡️', title: 'Total Transparency', desc: 'See real statistics of each trader.' },
            { icon: '🔀', title: 'Flexibility', desc: 'You decide how much to invest and who to copy.' },
            { icon: '🏆', title: 'Earn without trading directly', desc: 'Take advantage of the experts\' experience.' }
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
            { icon: '🚩', title: 'Signals Channel', desc: 'Ideal reference for your first steps. Simple and liquid structure for maximum execution.', btn: 'Learn More' },
            { icon: '🤝', title: 'Global Ranking', desc: 'View leading operators in real time and analyze their achievement metrics.', btn: 'View Ranking' },
            { icon: '💻', title: 'Pro Education', desc: 'Access exclusive webinars, ebooks and advanced tutorials to boost your skills.', btn: 'Go to Academy' }
        ],
        whyBridge: {
            title: 'Why Bridge Markets?',
            cards: [
                { icon: '💰', title: 'Constant Income', desc: 'As an IB, earn from 6 USD per lot with customized risk agreements.' },
                { icon: '📢', title: 'Impactful Marketing', desc: 'Professional advertising resources: banners, webinars and landing pages.' },
                { icon: '📋', title: 'Reliable Regulation', desc: 'Regulated brokers and automated processes for your peace of mind.' },
                { icon: '🖥️', title: 'Strategic Support', desc: 'Dedicated accounts team and cutting-edge online tools for your success.' }
            ],
            info: [
                { icon: '👥', title: 'Unlimited Income', desc: 'Scale your business without financial caps. Registration is 100% free.' },
                { icon: '📄', title: 'Valuable Data', desc: 'Real-time information to manage risks professionally.', variant: 'purple' },
                { icon: '🌍', title: 'Total Freedom', desc: 'Work from anywhere in the world with global tools.', variant: 'dark' },
                { icon: '🎧', title: '24/7 Expertise', desc: 'Support from Account Managers experts in financial markets.' }
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
    BR: { heroTitle: 'Comece a copiar', heroHighlight: 'Traders', heroSub: 'Social Trading permite que você opere no mercado sem experiência.', cta: 'Acesso', ctaSec: 'Interesse', statsLabel: ['Ativos', 'Países', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'Ultra Rápido',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Conta',link:''}], testTitle: 'Traders', testimonials: [{name:'C',country:'C',text:'Bom'}], formTitle: 'Início', formSub: 'Dados', fields: ['N', 'E', 'T'], submit: 'Começar', footerText: 'Tech', disclaimer: 'Risco', chessTitle: 'Copiar', chessSubtitle: 'Sem exp', chessBenefits: [{icon:'🛡️',title:'Transparência',desc:'Stats'}], chessSteps: {title:'Acesso',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Cap',desc:'Power',img:'/images/landing/rey.png',btn:'Interesse'}], servicesGrid: [{icon:'🚩',title:'Sinais',desc:'Ref',btn:'Saber'}], whyBridge: {title:'Por que?',cards:[{icon:'💰',title:'Renda',desc:'6 USD'}],info:[{icon:'👥',title:'Incrível',desc:'Free'}]}, finalCTA: {title:'Ative',desc:'Tech',btn:'Conta'}, finalInfo: {title:'Sucesso',desc:'Rebates',quote:'*Win'} },
    FR: { heroTitle: 'Copier', heroHighlight: 'Traders', heroSub: 'Social Trading sans expérience.', cta: 'Accès', ctaSec: 'Intérêt', statsLabel: ['Actifs', 'Pays', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'Rapide',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Compte',link:''}], testTitle: 'Traders', testimonials: [{name:'C',country:'C',text:'Bien'}], formTitle: 'Début', formSub: 'Infos', fields: ['N', 'E', 'T'], submit: 'Commencer', footerText: 'Tech', disclaimer: 'Risque', chessTitle: 'Copier', chessSubtitle: 'Sans exp', chessBenefits: [{icon:'🛡️',title:'Transparence',desc:'Stats'}], chessSteps: {title:'Accès',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Lev',desc:'Power',img:'/images/landing/rey.png',btn:'Intérêt'}], servicesGrid: [{icon:'🚩',title:'Signaux',desc:'Ref',btn:'Savoir'}], whyBridge: {title:'Pourquoi?',cards:[{icon:'💰',title:'Revenus',desc:'6 USD'}],info:[{icon:'👥',title:'Incrédible',desc:'Free'}]}, finalCTA: {title:'Activer',desc:'Tech',btn:'Compte'}, finalInfo: {title:'Succès',desc:'Rebates',quote:'*Win'} },
    AR: { heroTitle: 'ابدأ بالنسخ', heroHighlight: 'المتداولين', heroSub: 'التداول الاجتماعي دون خبرة.', cta: 'دخول', ctaSec: 'مهتم', statsLabel: ['نشط', 'دول', 'حجم', 'ترتيب'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'سريع',desc:'< 1ms.'}], stepsTitle: 'التداول الاجتماعي', steps: [{num:'1',text:'حساب',link:''}], testTitle: 'متداولون', testimonials: [{name:'C',country:'C',text:'جيد'}], formTitle: 'بداية', formSub: 'بيانات', fields: ['ن', 'ب', 'هـ'], submit: 'ابدأ', footerText: 'تكنولوجيا', disclaimer: 'خطر', chessTitle: 'نسخ', chessSubtitle: 'دون خبرة', chessBenefits: [{icon:'🛡️',title:'شفافية',desc:'إحصائيات'}], chessSteps: {title:'دخول',subtitle:'اجتماعي',steps:[{num:'1',text:'تسجيل',link:''}]}, chessAccounts: [{title:'رافعة',desc:'قوة',img:'/images/landing/rey.png',btn:'مهتم'}], servicesGrid: [{icon:'🚩',title:'إشارات',desc:'مرجع',btn:'اعرف'}], whyBridge: {title:'لماذا؟',cards:[{icon:'💰',title:'دخل',desc:'6 USD'}],info:[{icon:'👥',title:'رائع',desc:'مجاني'}]}, finalCTA: {title:'نشط',desc:'تكنولوجيا',btn:'حساب'}, finalInfo: {title:'نجاح',desc:'عمولات',quote:'*ربح'} },
    ZH: { heroTitle: '复制交易', heroHighlight: '交易者', heroSub: '无需经验。', cta: '登录', ctaSec: '兴趣', statsLabel: ['活跃', '国家', '交易量', '排名'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'快速',desc:'< 1ms.'}], stepsTitle: '社交交易', steps: [{num:'1',text:'开户',link:''}], testTitle: '交易者', testimonials: [{name:'C',country:'C',text:'好'}], formTitle: '开始', formSub: '信息', fields: ['名', '邮', '话'], submit: '开始', footerText: '技术', disclaimer: '风险', chessTitle: '复制', chessSubtitle: '无需经验', chessBenefits: [{icon:'🛡️',title:'透明',desc:'数据'}], chessSteps: {title:'访问',subtitle:'社交',steps:[{num:'1',text:'注册',link:''}]}, chessAccounts: [{title:'杠杆',desc:'力量',img:'/images/landing/rey.png',btn:'兴趣'}], servicesGrid: [{icon:'🚩',title:'信号',desc:'参考',btn:'了解'}], whyBridge: {title:'为什么?',cards:[{icon:'💰',title:'收入',desc:'6 USD'}],info:[{icon:'👥',title:'免费',desc:'注册'}]}, finalCTA: {title:'激活',desc:'技术',btn:'开户'}, finalInfo: {title:'成功',desc:'返佣',quote:'*赢'} },
    ID: { heroTitle: 'Salin', heroHighlight: 'Trader', heroSub: 'Tanpa pengalaman.', cta: 'Akses', ctaSec: 'Tertarik', statsLabel: ['Aktif', 'Negara', 'Volume', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'Cepat',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Akun',link:''}], testTitle: 'Trader', testimonials: [{name:'C',country:'C',text:'Bagus'}], formTitle: 'Mulai', formSub: 'Data', fields: ['N', 'E', 'T'], submit: 'Mulai', footerText: 'Tech', disclaimer: 'Risiko', chessTitle: 'Salin', chessSubtitle: 'Tanpa exp', chessBenefits: [{icon:'🛡️',title:'Transparansi',desc:'Stats'}], chessSteps: {title:'Akses',subtitle:'Social',steps:[{num:'1',text:'Reg',link:''}]}, chessAccounts: [{title:'Lev',desc:'Power',img:'/images/landing/rey.png',btn:'Tertarik'}], servicesGrid: [{icon:'🚩',title:'Sinyal',desc:'Ref',btn:'Tahu'}], whyBridge: {title:'Kenapa?',cards:[{icon:'💰',title:'Income',desc:'6 USD'}],info:[{icon:'👥',title:'Free',desc:'Daftar'}]}, finalCTA: {title:'Aktif',desc:'Tech',btn:'Akun'}, finalInfo: {title:'Sukses',desc:'Rebates',quote:'*Win'} },
    VI: { heroTitle: 'Sao chép', heroHighlight: 'Trader', heroSub: 'Không cần kinh nghiệm.', cta: 'Truy cập', ctaSec: 'Quan tâm', statsLabel: ['Hoạt động', 'Quốc gia', 'Khối lượng', 'Rank'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'Nhanh',desc:'< 1ms.'}], stepsTitle: 'Social Trading', steps: [{num:'1',text:'Tài khoản',link:''}], testTitle: 'Trader', testimonials: [{name:'C',country:'C',text:'Tốt'}], formTitle: 'Bắt đầu', formSub: 'Dữ liệu', fields: ['T', 'E', 'S'], submit: 'Bắt đầu', footerText: 'Tech', disclaimer: 'Rủi ro', chessTitle: 'Sao chép', chessSubtitle: 'Không exp', chessBenefits: [{icon:'🛡️',title:'Minh bạch',desc:'Stats'}], chessSteps: {title:'Truy cập',subtitle:'Social',steps:[{num:'1',text:'Đăng ký',link:''}]}, chessAccounts: [{title:'Đòn bẩy',desc:'Power',img:'/images/landing/rey.png',btn:'Quan tâm'}], servicesGrid: [{icon:'🚩',title:'Tín hiệu',desc:'Ref',btn:'Biết'}], whyBridge: {title:'Tại sao?',cards:[{icon:'💰',title:'Thu nhập',desc:'6 USD'}],info:[{icon:'👥',title:'Free',desc:'Đăng ký'}]}, finalCTA: {title:'Kích hoạt',desc:'Tech',btn:'Tài khoản'}, finalInfo: {title:'Thành công',desc:'Rebates',quote:'*Win'} },
    JP: { heroTitle: 'コピー', heroHighlight: 'トレーダー', heroSub: '経験不要。', cta: 'アクセス', ctaSec: '興味', statsLabel: ['活動', '国', '出来高', '順位'], statsVal: ['500K+', '170+', '$2.5B+', '#1'], featTitle: 'Bridge Markets', features: [{icon:'🎯',title:'高速',desc:'< 1ms.'}], stepsTitle: 'ソーシャルトレード', steps: [{num:'1',text:'口座',link:''}], testTitle: 'トレーダー', testimonials: [{name:'C',country:'C',text:'良'}], formTitle: '開始', formSub: '情報', fields: ['名', 'メ', '電'], submit: '開始', footerText: '技術', disclaimer: 'リスク', chessTitle: 'コピー', chessSubtitle: '経験不要', chessBenefits: [{icon:'🛡️',title:'透明性',desc:'データ'}], chessSteps: {title:'アクセス',subtitle:'ソーシャル',steps:[{num:'1',text:'登録',link:''}]}, chessAccounts: [{title:'レバ',desc:'パワー',img:'/images/landing/rey.png',btn:'興味'}], servicesGrid: [{icon:'🚩',title:'シグナル',desc:'参考',btn:'知る'}], whyBridge: {title:'なぜ?',cards:[{icon:'💰',title:'報酬',desc:'6 USD'}],info:[{icon:'👥',title:'無料',desc:'登録'}]}, finalCTA: {title:'有効化',desc:'技術',btn:'口座'}, finalInfo: {title:'成功',desc:'報酬',quote:'*勝'} },
};



export function generateLandingHTML(data: LandingData): string {
    const t = TRANSLATIONS[data.language] || TRANSLATIONS['ES'];
    const gaScript = data.googleAnalyticsId ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${data.googleAnalyticsId}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${data.googleAnalyticsId}');</script>` : '';

    const wa = data.whatsapp ? 'https://wa.me/' + data.whatsapp.replace(/[^0-9]/g, '') : '#';

    // Account Cards Builder
    const accountsHTML = t.chessAccounts.map((a, i) => {
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
    }).join('');

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
                    btn.textContent="Enviado ✓";
                }else{ throw new Error(); }
            }catch(err){
                msg.innerHTML="<div class='bg-red-100 text-red-700 p-4 rounded-xl font-bold mt-4'>Error al enviar. Intenta de nuevo.</div>";
                btn.disabled=false; btn.textContent="${t.submit}";
            }
        });`;

    return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bridge Markets | ${t.chessTitle}</title>
    <meta name="description" content="${t.heroSub}">
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
        .reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease-out; }
        .reveal.active { opacity: 1; transform: translateY(0); }
        .glass { background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(10px); }
    </style>
</head>
<body class="font-sans text-gray-800 antialiased">
    <header class="fixed top-0 w-full z-50 px-6 py-4 glass border-b border-purple-50">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">B</div>
                <span class="text-xl font-extrabold tracking-tighter text-brand-dark">BRIDGE <span class="text-brand-purple">MARKETS</span></span>
            </div>
            <nav class="hidden md:flex gap-8 text-sm font-semibold">
                <a href="#social-trading" class="hover:text-brand-purple transition">Social Trading</a>
                <a href="#cuentas" class="hover:text-brand-purple transition">Cuentas</a>
                <a href="#ib-program" class="hover:text-brand-purple transition">Programa IB</a>
            </nav>
            <a href="#registro" class="bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-purple transition-all">${t.cta}</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-24">
        <section id="social-trading" class="reveal">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-7xl font-extrabold mb-6 text-brand-dark tracking-tight">
                    ${t.heroTitle} <span class="text-brand-purple">${t.heroHighlight}</span> ${data.language === 'ES' ? 'ahora!' : 'now!'}
                </h1>
                <p class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">${t.heroSub}</p>
            </div>

            <div class="bg-brand-dark rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(10,5,26,0.3)] relative overflow-hidden">
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-brand-purple opacity-20 blur-[100px]"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative z-10">
                    ${t.chessBenefits.map(b => `
                        <article class="bg-white rounded-[2rem] p-6 flex items-center gap-5 shadow-xl hover:scale-105 transition duration-300">
                            <div class="bg-brand-dark rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 text-brand-purple text-2xl shadow-lg">${b.icon}</div>
                            <div>
                                <h4 class="font-bold text-brand-dark text-sm">${b.title}</h4>
                                <p class="text-[10px] text-gray-500 mt-1">${b.desc}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>

                <div class="flex flex-col lg:flex-row gap-16 relative z-10 items-center">
                    <div class="lg:w-1/2">
                        <h2 class="text-4xl md:text-5xl font-light text-gray-300 leading-tight">
                            ${t.chessSteps.title}<br>
                            <span class="text-white font-bold block mt-2">${t.chessSteps.subtitle}</span>
                        </h2>
                        <p class="text-gray-400 mt-6 text-sm">Partner: ${data.fullName} · ${data.country}</p>
                    </div>
                    <div class="lg:w-1/2 space-y-4">
                        ${t.chessSteps.steps.map(s => `
                            <div class="bg-brand-stepBg/50 border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                                <div class="bg-white text-brand-purple font-black text-xl rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">${s.num}</div>
                                <div>
                                    <h4 class="text-white text-sm font-semibold">${s.text}</h4>
                                    ${s.link ? `<span class="text-brand-accent text-xs mt-1 block">${s.link}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </section>

        <section id="cuentas" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">${accountsHTML}</div>
        </section>

        <section class="reveal bg-transparent p-10 md:p-20 border-y border-purple-50">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                ${t.servicesGrid.map(s => `
                    <article>
                        <div class="text-brand-purple text-4xl mb-6 flex justify-center md:justify-start">${s.icon}</div>
                        <h3 class="font-bold text-xl text-brand-dark mb-3">${s.title}</h3>
                        <p class="text-sm text-gray-500 mb-8 leading-relaxed">${s.desc}</p>
                        <button class="bg-brand-dark text-white px-8 py-3 rounded-2xl text-xs font-bold hover:bg-brand-purple transition-all w-full md:w-auto" onclick="location.href='#registro'">${s.btn}</button>
                    </article>
                `).join('')}
            </div>
        </section>

        <section id="ib-program" class="py-12 reveal">
            <h2 class="text-4xl md:text-5xl font-black text-center mb-16 text-brand-dark">
                ${t.whyBridge.title.split('Bridge')[0]} <span class="text-brand-purple">Bridge Markets?</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                ${t.whyBridge.cards.map(c => `
                    <article class="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 flex gap-6 items-start shadow-sm hover:shadow-xl hover:border-brand-purple/20 transition duration-300">
                        <div class="bg-brand-dark text-white p-4 rounded-2xl text-xl shadow-lg">${c.icon}</div>
                        <div>
                            <h3 class="font-bold text-lg text-brand-dark mb-2">${c.title}</h3>
                            <p class="text-sm text-gray-500 leading-relaxed">${c.desc}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${t.whyBridge.info.map(i => `
                    <article class="${i.variant === 'purple' ? 'bg-brand-purple text-white' : i.variant === 'dark' ? 'bg-brand-dark text-white' : 'bg-white/40 backdrop-blur-md border border-white/50'} rounded-3xl p-8 shadow-lg text-center flex flex-col items-center hover:-translate-y-2 transition duration-300">
                        <div class="${i.variant ? 'bg-white/20' : 'bg-purple-100'} text-brand-purple p-4 rounded-full mb-6 ${i.variant ? 'text-white' : ''}">${i.icon}</div>
                        <h3 class="font-bold text-sm mb-3">${i.title}</h3>
                        <p class="text-xs ${i.variant ? 'text-purple-100' : 'text-gray-400'}">${i.desc}</p>
                    </article>
                `).join('')}
            </div>
        </section>

        <section class="reveal bg-brand-purple rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-10">
            <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="600" height="400" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 300L50 200L150 250L250 100L400 150V300H0Z" fill="white"/></svg>
            </div>
            <div class="relative z-10 lg:w-2/3">
                <h2 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">${t.finalCTA.title}</h2>
                <p class="text-purple-100 text-lg mb-10 font-light">${t.finalCTA.desc}</p>
                <a href="#registro" class="bg-white text-brand-purple font-extrabold py-5 px-12 rounded-2xl shadow-2xl hover:bg-gray-50 transform hover:scale-105 transition-all text-lg inline-block">${t.finalCTA.btn}</a>
            </div>
        </section>

        <section id="registro" class="reveal bg-transparent p-10 md:p-24 flex flex-col lg:flex-row items-center gap-20 border-t border-purple-50">
            <div class="lg:w-1/2">
                <h2 class="text-4xl md:text-6xl font-black text-brand-dark mb-8 leading-tight">
                    ${t.finalInfo.title.split('referiendo')[0]} <span class="text-brand-purple">Éxito</span>
                </h2>
                <div class="space-y-6">
                    <p class="text-base text-gray-600 leading-relaxed font-medium">${t.finalInfo.desc}</p>
                    <p class="text-xs text-gray-400 leading-relaxed italic border-l-4 border-brand-purple pl-4">${t.finalInfo.quote}</p>
                    <div class="mt-10 p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
                        <h4 class="font-bold text-xl mb-6 text-brand-dark">${t.formTitle}</h4>
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
        </section>
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
        ${formScript}
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
