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
    stepsTitle: string; steps: string[];
    testTitle: string; testimonials: { name: string; country: string; text: string }[];
    formTitle: string; formSub: string; fields: string[]; submit: string;
    footerText: string; disclaimer: string;
    chessTitle: string; chessSubtitle: string;
    chessBenefits: { icon: string; title: string }[];
    chessSteps: { title: string; steps: string[] };
    chessAccounts: { title: string; desc: string; img: string }[];
    chessPromo: { title: string; cta: string; img: string };
    chessFooter: { title: string; img: string; text: string[] };
}> = {
    ES: {
        heroTitle: 'Opera en los', heroHighlight: 'Mercados Globales', heroSub: 'Accede a Forex, Acciones, Criptomonedas e Índices con spreads ultra competitivos y ejecución institucional en milisegundos.',
        cta: 'Abrir Cuenta Real', ctaSec: 'Ver Demo',
        statsLabel: ['Traders Activos', 'Países', 'Volumen Diario', 'Clasificación'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Por qué Bridge Markets',
        features: [
            { icon: '🎯', title: 'Ejecución Ultra Rápida', desc: 'Servidores Equinix NY4 y LD4 para ejecución en < 1ms.' },
            { icon: '📢', title: 'Para herramientas de marketing de impacto', desc: 'Toda la tecnología necesaria para atraer y captar clientes.' },
            { icon: '📝', title: 'Soporte 24/5 confiable', desc: 'Soporte técnico y comercial especializado en su idioma las 24 horas.' },
            { icon: '📊', title: 'Total visibilidad', desc: 'Controle detalladamente sus procesos internos y métricas de desempeño en tiempo real.' },
        ],
        stepsTitle: 'Empieza en 3 pasos',
        steps: ['Crea tu cuenta en minutos, sin papeleos', 'Deposita desde $100 USD con tu método preferido', 'Opera Forex, Criptos, Índices y más mercados globales'],
        testTitle: 'Lo que dicen nuestros traders',
        testimonials: [
            { name: 'Carlos M.', country: '🇨🇴 Colombia', text: 'Los spreads son increíbles para scalping. Ejecución instantánea y soporte siempre disponible.' },
            { name: 'Ana R.', country: '🇲🇽 México', text: 'Llevo 2 años con Bridge y no cambiaría. Retiros en 24 horas y plataforma muy estable.' },
            { name: 'Luis P.', country: '🇪🇸 España', text: 'La cuenta RAW es perfecta para trading algorítmico. Comisiones muy bajas, ideal para alto volumen.' },
        ],
        formTitle: '¿Listo para empezar?', formSub: 'Déjanos tus datos y un especialista te contactará.',
        fields: ['Nombre completo', 'Correo electrónico', 'Teléfono / WhatsApp'],
        submit: 'Comenzar Ahora →',
        footerText: 'Página gestionada por el partner comercial autorizado de Bridge Markets',
        disclaimer: 'El trading de CFDs implica un alto riesgo de pérdida. Más del 70% de los inversores minoristas pierden dinero. Asegúrese de comprender los riesgos antes de invertir.',
        chessTitle: '¡Empieza a copiar Traders ahora!',
        chessSubtitle: 'A través del cual usted no solo tiene acceso a una amplia gama de instrumentos sino también a las mejores herramientas del mercado financiero y el más alto nivel de seguridad para su inversión.',
        chessBenefits: [
            { icon: '🛡️', title: 'Ventaja en el mercado' },
            { icon: '📈', title: 'Rentabilidad' },
            { icon: '🏆', title: 'Gane de operar en los mercados' }
        ],
        chessSteps: {
            title: '¿Cómo acceder al Social Trading?',
            steps: [
                'Seleccione su cuenta de trading social.',
                'Elija de la lista los Traders a seguir conforme a su rendimiento.',
                'Ingrese el monto que desea dedicar al trading.',
                'Espere el trading de los operadores y reciba beneficios directos.',
                'Control de capital: Retire fondos cuando desee.'
            ]
        },
        chessAccounts: [
            { title: 'Cuentas Apalancadas', desc: 'Permite al trader operar con más fondos de los que tiene, aumentando su poder de compra y ganancias potenciales.', img: '/images/landing/knight.png' },
            { title: 'Cuentas PAMM', desc: 'Nuestra cuenta gestionada permite a los traders profesionales gestionar múltiples cuentas de inversores simultáneamente.', img: '/images/landing/pawns.png' },
            { title: 'Cuentas MAM', desc: 'Permite a los gestores de activos y fondos financieros asignar operaciones entre una cantidad ilimitada de cuentas.', img: '/images/landing/king.png' },
            { title: 'Cuenta Leverage', desc: 'Acceso a niveles superiores de apalancamiento institucional con ejecución directa al mercado.', img: '/images/landing/queen.png' },
            { title: 'Cuenta ECN', desc: 'Ejecución transparente y directa con los principales proveedores de liquidez global sin mesa de dinero.', img: '/images/landing/knight.png' }
        ],
        chessPromo: {
            title: 'Activa tu cuenta, expande tu universo financiero',
            cta: 'ABRIR TU CUENTA DE TRADING',
            img: '/images/landing/hourglass.png'
        },
        chessFooter: {
            title: 'Conecta clientes con Brokers y gana comisiones',
            img: '/images/landing/hourglass.png',
            text: [
                'Como broker de Bridge Markets, tienes acceso a una red de contactos y socios estratégicos que te ayudan a expandir tu negocio y maximizar tus ingresos por comisiones.',
                'El modelo de gestión de activos que ofrecemos permite recibir comisiones diarias sobre el volumen de operaciones de tus clientes referidos, con total transparencia y liquidación instantánea.'
            ]
        }
    },
    GB: {
        heroTitle: 'Trade the', heroHighlight: 'Global Markets', heroSub: 'Access Forex, Stocks, Crypto and Indices with ultra-competitive spreads and institutional execution in milliseconds.',
        cta: 'Open Live Account', ctaSec: 'Try Demo',
        statsLabel: ['Active Traders', 'Countries', 'Daily Volume', 'Ranking'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Why Bridge Markets',
        features: [
            { icon: '⚡', title: 'Ultra-Fast Execution', desc: 'Equinix NY4 and LD4 co-located servers for execution under 1ms on the most liquid pairs.' },
            { icon: '📉', title: 'Spreads from 0.0 pips', desc: 'The tightest spreads on 100+ instruments including forex, indices and commodities.' },
            { icon: '🛡️', title: 'International Regulation', desc: 'Operating under strict international regulatory frameworks. Your capital is protected and segregated.' },
            { icon: '📊', title: '100+ Instruments', desc: 'Forex, global stocks, crypto, indices and commodities — all in a single account.' },
            { icon: '🤝', title: '24/5 Support', desc: 'Multilingual support team available 24h, 5 days a week via chat, email and phone.' },
            { icon: '💳', title: 'Easy Deposits', desc: 'Deposit from $100 via bank transfer, card, crypto and more local payment methods.' },
        ],
        stepsTitle: 'Get Started in 3 Steps',
        steps: ['Create your account in minutes, no paperwork', 'Deposit from $100 USD with your preferred method', 'Trade Forex, Crypto, Indices and more'],
        testTitle: 'What Our Traders Say',
        testimonials: [
            { name: 'James T.', country: '🇬🇧 United Kingdom', text: 'Incredible spreads for scalping. Instant execution and always-available support.' },
            { name: 'Sofia L.', country: '🇦🇺 Australia', text: '2 years with Bridge and I wouldn\'t switch. 24-hour withdrawals and a very stable platform.' },
            { name: 'Marco B.', country: '🇮🇹 Italy', text: 'The RAW account is perfect for algo trading. Very low commissions, ideal for high volume.' },
        ],
        formTitle: 'Ready to Start?', formSub: 'Leave your details and a specialist will contact you.',
        fields: ['Full name', 'Email address', 'Phone / WhatsApp'],
        submit: 'Get Started →',
        footerText: 'Page managed by authorized commercial partner of Bridge Markets',
        disclaimer: 'CFD trading involves a high risk of loss. Over 70% of retail investors lose money. Make sure you understand the risks before investing.',
        chessTitle: 'Start copying Traders now!',
        chessSubtitle: 'Through which you not only have access to a wide range of instruments but also to the best financial market tools and the highest level of security for your investment.',
        chessBenefits: [
            { icon: '🛡️', title: 'Market Advantage' },
            { icon: '📈', title: 'Profitability' },
            { icon: '🏆', title: 'Earn from market trading' }
        ],
        chessSteps: {
            title: 'How to access Social Trading?',
            steps: [
                'Select your social trading account.',
                'Choose Traders to follow based on their performance.',
                'Enter the amount you wish to dedicate to trading.',
                'Wait for the operators\' trading and receive direct benefits.',
                'Total control to withdraw funds whenever you want.'
            ]
        },
        chessAccounts: [
            { title: 'Leveraged Accounts', desc: 'Allows the trader to operate with more funds than they have, increasing buying power and potential profits.', img: '/images/landing/knight.png' },
            { title: 'PAMM Accounts', desc: 'Our managed account allows professional traders to manage multiple investor accounts simultaneously.', img: '/images/landing/pawns.png' },
            { title: 'MAM Accounts', desc: 'Allows asset and fund managers to allocate trades among an unlimited number of accounts.', img: '/images/landing/king.png' },
            { title: 'Leverage Account', desc: 'Access to superior levels of institutional leverage with direct market execution.', img: '/images/landing/queen.png' },
            { title: 'ECN Account', desc: 'Transparent and direct execution with major global liquidity providers without a dealing desk.', img: '/images/landing/knight.png' }
        ],
        chessPromo: {
            title: 'Activate your account, expand your financial universe',
            cta: 'OPEN YOUR TRADING ACCOUNT',
            img: '/images/landing/hourglass.png'
        },
        chessFooter: {
            title: 'Connect clients with Brokers and earn commissions',
            img: '/images/landing/hourglass.png',
            text: [
                'As a Bridge Markets broker, you have access to a network of contacts and strategic partners that help you expand your business and maximize your commission income.',
                'The asset management model we offer allows you to receive daily commissions on the trading volume of your referred clients, with total transparency and instant settlement.'
            ]
        }
    },
    BR: {
        heroTitle: 'Opere nos', heroHighlight: 'Mercados Globais', heroSub: 'Acesse Forex, Ações, Criptomoedas e Índices com spreads ultra competitivos e execução institucional em milissegundos.',
        cta: 'Abrir Conta Real', ctaSec: 'Ver Demo',
        statsLabel: ['Traders Ativos', 'Países', 'Volume Diário', 'Ranking'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Por que Bridge Markets',
        features: [
            { icon: '⚡', title: 'Execução Ultra Rápida', desc: 'Servidores co-localizados Equinix NY4 e LD4 para execução em menos de 1ms.' },
            { icon: '📉', title: 'Spreads a partir de 0.0 pips', desc: 'Os spreads mais apertados em mais de 100 instrumentos de forex, índices e commodities.' },
            { icon: '🛡️', title: 'Regulação Internacional', desc: 'Operamos sob rígidos marcos regulatórios. Seu capital protegido e segregado.' },
            { icon: '📊', title: '100+ Instrumentos', desc: 'Forex, ações globais, criptomoedas, índices e commodities em uma única conta.' },
            { icon: '🤝', title: 'Suporte 24/5', desc: 'Equipe multilíngue disponível 24h, 5 dias por semana por chat, e-mail e telefone.' },
            { icon: '💳', title: 'Depósitos Fáceis', desc: 'Deposite a partir de $100 via transferência bancária, cartão, criptomoeda e mais. ' },
        ],
        stepsTitle: 'Comece em 3 Passos',
        steps: ['Crie sua conta em minutos, sem burocracia', 'Deposite a partir de $100 com seu método preferido', 'Opere Forex, Cripto, Índices e mais mercados'],
        testTitle: 'O que nossos traders dizem',
        testimonials: [
            { name: 'Bruno F.', country: '🇧🇷 Brasil', text: 'Spreads incríveis para scalping. Execução instantânea e suporte sempre disponível.' },
            { name: 'Juliana C.', country: '🇧🇷 Brasil', text: '2 anos com Bridge e não trocaria. Saques em 24h e plataforma muito estável.' },
            { name: 'Rafael M.', country: '🇧🇷 Brasil', text: 'A conta RAW é perfeita para trading algorítmico. Comissões muito baixas.' },
        ],
        formTitle: 'Pronto para Começar?', formSub: 'Deixe seus dados e um especialista entrará em contato.',
        fields: ['Nome completo', 'E-mail', 'Telefone / WhatsApp'],
        submit: 'Começar Agora →',
        footerText: 'Página gerenciada pelo parceiro comercial autorizado da Bridge Markets',
        disclaimer: 'O trading de CFDs envolve alto risco de perda. Mais de 70% dos investidores de varejo perdem dinheiro.',
        chessTitle: 'Comece a copiar Traders agora!',
        chessSubtitle: 'Através do qual você não apenas tem acesso a uma ampla gama de instrumentos, mas também às melhores ferramentas do mercado financeiro.',
        chessBenefits: [ { icon: '🛡️', title: 'Vantagem no mercado' }, { icon: '📈', title: 'Rentabilidade' }, { icon: '🏆', title: 'Ganhe operando nos mercados' } ],
        chessSteps: { title: 'Como acessar o Social Trading?', steps: [ 'Selecione sua conta de trading social.', 'Escolha os Traders para seguir.', 'Insira o valor que deseja dedicar.', 'Receba benefícios diretos.', 'Controle total para retirar fundos.' ] },
        chessAccounts: [
            { title: 'Contas Alavancadas', desc: 'Permite ao trader operar com mais fundos do que possui.', img: '/images/landing/knight.png' },
            { title: 'Contas PAMM', desc: 'Gestão de múltiplas contas de investidores.', img: '/images/landing/pawns.png' },
            { title: 'Contas MAM', desc: 'Alocação de operações para gestores de ativos.', img: '/images/landing/king.png' },
            { title: 'Conta Leverage', desc: 'Níveis superiores de alavancagem institucional.', img: '/images/landing/queen.png' },
            { title: 'Conta ECN', desc: 'Execução transparente e direta sem mesa de operações.', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: 'Ative sua conta, expanda seu universo financeiro', cta: 'ABRIR SUA CONTA DE TRADING', img: '/images/landing/hourglass.png' },
        chessFooter: { title: 'Conecte clientes com Brokers e ganhe comissões', img: '/images/landing/hourglass.png', text: [ 'Acesso a uma rede de contatos estratégicos.', 'Receba comissões diárias sobre o volume.' ] }
    },
    FR: {
        heroTitle: 'Tradez les', heroHighlight: 'Marchés Mondiaux', heroSub: 'Accédez au Forex, Actions, Crypto et Indices avec des spreads ultra compétitifs et une exécution institutionnelle en millisecondes.',
        cta: 'Ouvrir un Compte Réel', ctaSec: 'Essayer la Démo',
        statsLabel: ['Traders Actifs', 'Pays', 'Volume Quotidien', 'Classement'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Pourquoi Bridge Markets',
        features: [
            { icon: '⚡', title: 'Exécution Ultra Rapide', desc: 'Serveurs co-localisés Equinix NY4 et LD4 pour une exécution en moins de 1ms.' },
            { icon: '📉', title: 'Spreads dès 0.0 pip', desc: 'Les spreads les plus serrés sur 100+ instruments forex, indices et matières premières.' },
            { icon: '🛡️', title: 'Régulation Internationale', desc: 'Opérant sous des cadres réglementaires stricts. Votre capital protégé et ségrégué.' },
            { icon: '📊', title: '100+ Instruments', desc: 'Forex, actions mondiales, crypto, indices et matières premières en un seul compte.' },
            { icon: '🤝', title: 'Support 24/5', desc: 'Équipe multilingue disponible 24h/24, 5j/7 par chat, email et téléphone.' },
            { icon: '💳', title: 'Dépôts Faciles', desc: 'Dépôt à partir de 100$ via virement bancaire, carte, crypto et plus.' },
        ],
        stepsTitle: 'Commencez en 3 Étapes',
        steps: ['Créez votre compte en quelques minutes, sans paperasse', 'Déposez à partir de 100$ avec votre méthode préférée', 'Tradez Forex, Crypto, Indices et plus'],
        testTitle: 'Ce que disent nos traders',
        testimonials: [
            { name: 'Pierre M.', country: '🇫🇷 France', text: 'Des spreads incroyables pour le scalping. Exécution instantanée et support toujours disponible.' },
            { name: 'Marie L.', country: '🇫🇷 France', text: '2 ans avec Bridge et je ne changerais pas. Retraits en 24h et plateforme très stable.' },
            { name: 'Jean R.', country: '🇧🇪 Belgique', text: 'Le compte RAW est parfait pour le trading algorithmique. Commissions très basses.' },
        ],
        formTitle: 'Prêt à Commencer?', formSub: 'Laissez vos coordonnées et un spécialiste vous contactera.',
        fields: ['Nom complet', 'Adresse e-mail', 'Téléphone / WhatsApp'],
        submit: 'Commencer Maintenant →',
        footerText: 'Page gérée par le partenaire commercial autorisé de Bridge Markets',
        disclaimer: 'Le trading de CFDs implique un risque élevé de perte. Plus de 70% des investisseurs particuliers perdent de l\'argent.',
        chessTitle: 'Commencez à copier les Traders maintenant !',
        chessSubtitle: 'Grâce auquel vous avez non seulement accès à une large gamme d\'instruments mais aussi aux meilleurs outils.',
        chessBenefits: [ { icon: '🛡️', title: 'Avantage du marché' }, { icon: '📈', title: 'Rentabilité' }, { icon: '🏆', title: 'Gagnez en tradant' } ],
        chessSteps: { title: 'Comment accéder au Social Trading ?', steps: [ 'Sélectionnez votre compte de trading social.', 'Choisissez les Traders à suivre.', 'Entrez le montant à dédier.', 'Recevez des bénéfices directs.', 'Retrait de fonds à tout moment.' ] },
        chessAccounts: [
            { title: 'Comptes à effet de levier', desc: 'Opérez avec plus de fonds que vous n\'en possédez.', img: '/images/landing/knight.png' },
            { title: 'Comptes PAMM', desc: 'Gestion de plusieurs comptes investisseurs.', img: '/images/landing/pawns.png' },
            { title: 'Comptes MAM', desc: 'Allocation d\'opérations pour les gestionnaires.', img: '/images/landing/king.png' },
            { title: 'Compte Leverage', desc: 'Accès à des niveaux supérieurs de levier.', img: '/images/landing/queen.png' },
            { title: 'Compte ECN', desc: 'Exécution transparente sans bureau de négociation.', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: 'Activez votre compte, élargissez votre univers financier', cta: 'OUVRIR VOTRE COMPTE', img: '/images/landing/hourglass.png' },
        chessFooter: { title: 'Connectez des clients aux courtiers et gagnez des commissions', img: '/images/landing/hourglass.png', text: [ 'Accès à un réseau de partenaires stratégiques.', 'Commissions quotidiennes sur le volume.' ] }
    },
    AR: {
        heroTitle: 'تداول في', heroHighlight: 'الأسواق العالمية', heroSub: 'الوصول إلى الفوركس والأسهم والعملات المشفرة والمؤشرات بسبريدات تنافسية للغاية وتنفيذ مؤسسي في أجزاء من الثانية.',
        cta: 'فتح حساب حقيقي', ctaSec: 'جرب الديمو',
        statsLabel: ['المتداولون النشطون', 'الدول', 'الحجم اليومي', 'الترتيب'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'لماذا Bridge Markets',
        features: [
            { icon: '⚡', title: 'تنفيذ فائق السرعة', desc: 'خوادم Equinix NY4 وLD4 للتنفيذ في أقل من 1 مللي ثانية على أكثر الأزواج سيولة.' },
            { icon: '📉', title: 'سبريدات من 0.0 نقطة', desc: 'أضيق السبريدات على أكثر من 100 أداة من العملات والمؤشرات والسلع.' },
            { icon: '🛡️', title: 'تنظيم دولي', desc: 'نعمل وفق أطر تنظيمية صارمة. رأس مالك محمي ومفصول.' },
            { icon: '📊', title: '+100 أداة', desc: 'الفوركس والأسهم العالمية والعملات المشفرة والمؤشرات والسلع في حساب واحد.' },
            { icon: '🤝', title: 'دعم 24/5', desc: 'فريق دعم متعدد اللغات متاح 24 ساعة 5 أيام في الأسبوع.' },
            { icon: '💳', title: 'إيداع سهل', desc: 'أودع من 100 دولار عبر التحويل البنكي والبطاقة والعملات المشفرة وأكثر.' },
        ],
        stepsTitle: 'ابدأ في 3 خطوات',
        steps: ['أنشئ حسابك في دقائق بدون أوراق', 'أودع من 100 دولار بطريقتك المفضلة', 'تداول الفوركس والعملات المشفرة والمؤشرات والمزيد'],
        testTitle: 'ما يقوله متداولونا',
        testimonials: [
            { name: 'أحمد م.', country: '🇸🇦 السعودية', text: 'سبريدات رائعة للسكالبينج. تنفيذ فوري ودعم متاح دائماً.' },
            { name: 'فاطمة ع.', country: '🇦🇪 الإمارات', text: 'سنتان مع Bridge ولن أغير. سحوبات في 24 ساعة ومنصة مستقرة جداً.' },
            { name: 'محمد ك.', country: '🇪🇬 مصر', text: 'حساب RAW مثالي للتداول الخوارزمي. عمولات منخفضة جداً.' },
        ],
        formTitle: 'مستعد للبدء؟', formSub: 'اترك بياناتك وسيتواصل معك متخصص.',
        fields: ['الاسم الكامل', 'البريد الإلكتروني', 'الهاتف / واتساب'],
        submit: 'ابدأ الآن ←',
        footerText: 'صفحة يديرها الشريك التجاري المعتمد لـ Bridge Markets',
        disclaimer: 'ينطوي تداول العقود مقابل الفروقات على مخاطر عالية بالخسارة. أكثر من 70٪ من المتداولين الأفراد يخسرون أموالهم.',
        chessTitle: 'ابدأ بنسخ المتداولين الآن!',
        chessSubtitle: 'الذي من خلاله لا يمكنك الوصول فقط إلى مجموعة واسعة من الأدوات ولكن أيضاً إلى أفضل أدوات السوق المالي.',
        chessBenefits: [ { icon: '🛡️', title: 'ميزة في السوق' }, { icon: '📈', title: 'الربحية' }, { icon: '🏆', title: 'اربح من التداول' } ],
        chessSteps: { title: 'كيفية الوصول إلى التداول الاجتماعي؟', steps: [ 'اختر حساب التداول الاجتماعي الخاص بك.', 'اختر المتداولين للمتابعة.', 'أدخل المبلغ الذي تريد تخصيصه.', 'احصل على فوائد مباشرة.', 'تحكم كامل لسحب الأموال.' ] },
        chessAccounts: [
            { title: 'حسابات الرافعة المالية', desc: 'تسمح للمتداول بالعمل بمبالغ أكبر.', img: '/images/landing/knight.png' },
            { title: 'حسابات PAMM', desc: 'إدارة حسابات مستثمرين متعددة.', img: '/images/landing/pawns.png' },
            { title: 'حسابات MAM', desc: 'توزيع العمليات لمديري الأصول.', img: '/images/landing/king.png' },
            { title: 'حساب Leverage', desc: 'مستويات أعلى من الرافعة المؤسسية.', img: '/images/landing/queen.png' },
            { title: 'حساب ECN', desc: 'تنفيذ شفاف ومباشر بدون مكتب تداول.', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: 'نشط حسابك، وسع آفاقك المالية', cta: 'افتح حساب تداولك', img: '/images/landing/hourglass.png' },
        chessFooter: { title: 'اربط العملاء بالوسطاء واربح عمولات', img: '/images/landing/hourglass.png', text: [ 'الوصول إلى شبكة من الشركاء الاستراتيجيين.', 'احصل على عمولات يومية على الحجم.' ] }
    },
    ZH: {
        heroTitle: '交易全球', heroHighlight: '金融市场', heroSub: '以超低点差和毫秒级机构执行速度，访问外汇、股票、加密货币和指数市场。',
        cta: '开立真实账户', ctaSec: '体验模拟账户',
        statsLabel: ['活跃交易者', '覆盖国家', '日交易量', '行业排名'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: '为什么选择 Bridge Markets',
        features: [
            { icon: '⚡', title: '超快执行速度', desc: 'Equinix NY4 和 LD4 同机房服务器，最流动货币对执行延迟低于 1ms。' },
            { icon: '📉', title: '点差低至 0.0 点', desc: '100+ 外汇、指数和商品交易品种，提供市场最紧的点差。' },
            { icon: '🛡️', title: '国际监管', desc: '在严格的国际监管框架下运营。您的资金受到保护和隔离。' },
            { icon: '📊', title: '100+ 交易品种', desc: '外汇、全球股票、加密货币、指数和大宗商品——单一账户全部涵盖。' },
            { icon: '🤝', title: '24/5 客户支持', desc: '多语言支持团队，全天候 24 小时、每周 5 天提供聊天、邮件和电话支持。' },
            { icon: '💳', title: '便捷入金', desc: '最低 100 美元入金，支持银行转账、信用卡、加密货币等多种方式。' },
        ],
        stepsTitle: '三步轻松开始',
        steps: ['几分钟内完成账户注册，无需繁琐手续', '以您偏好的方式存入最低 100 美元', '交易外汇、加密货币、指数及更多全球市场'],
        testTitle: '交易者的真实反馈',
        testimonials: [
            { name: '李明', country: '🇨🇳 中国', text: '点差非常适合剥头皮交易。即时执行，客服随时在线。' },
            { name: '张婷', country: '🇸🇬 新加坡', text: '和 Bridge 合作两年了，不会更换。24小时内完成出金，平台非常稳定。' },
            { name: '王浩', country: '🇭🇰 香港', text: 'RAW账户非常适合算法交易，佣金极低，高频交易的理想选择。' },
        ],
        formTitle: '准备好开始了吗？', formSub: '留下您的联系方式，专家将与您联系。',
        fields: ['全名', '电子邮箱', '电话 / WhatsApp'],
        submit: '立即开始 →',
        footerText: '此页面由 Bridge Markets 授权合作伙伴管理',
        disclaimer: '差价合约交易存在高度亏损风险。超过 70% 的散户投资者会蒙受损失。',
        chessTitle: '立即开始复制交易者！',
        chessSubtitle: '通过它，您不仅可以访问广泛的工具，还可以访问最佳金融市场工具。',
        chessBenefits: [ { icon: '🛡️', title: '市场优势' }, { icon: '📈', title: '盈利能力' }, { icon: '🏆', title: '从市场交易中获利' } ],
        chessSteps: { title: '如何访问社交交易？', steps: [ '选择您的社交交易账户。', '选择要关注的交易者。', '输入交易金额。', '获得直接利益。', '随时提取资金。' ] },
        chessAccounts: [
            { title: '杠杆账户', desc: '允许交易者使用更多资金。', img: '/images/landing/knight.png' },
            { title: 'PAMM 账户', desc: '管理多个投资者账户。', img: '/images/landing/pawns.png' },
            { title: 'MAM 账户', desc: '为资产管理分配交易。', img: '/images/landing/king.png' },
            { title: '杠杆账户', desc: '获得更高级级的机构杠杆。', img: '/images/landing/queen.png' },
            { title: 'ECN 账户', desc: '透明直接执行，无交易台。', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: '激活您的账户，扩展您的金融世界', cta: '开设交易账户', img: '/images/landing/hourglass.png' },
        chessFooter: { title: '连接客户与经纪人并赚取佣金', img: '/images/landing/hourglass.png', text: [ '访问战略合作伙伴网络。', '按交易量赚取每日佣金。' ] }
    },
    ID: {
        heroTitle: 'Trading di', heroHighlight: 'Pasar Global', heroSub: 'Akses Forex, Saham, Kripto, dan Indeks dengan spread ultra kompetitif dan eksekusi institusional dalam milidetik.',
        cta: 'Buka Akun Real', ctaSec: 'Coba Demo',
        statsLabel: ['Trader Aktif', 'Negara', 'Volume Harian', 'Peringkat'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Mengapa Bridge Markets',
        features: [
            { icon: '⚡', title: 'Eksekusi Super Cepat', desc: 'Server co-lokasi Equinix NY4 dan LD4 untuk eksekusi di bawah 1ms.' },
            { icon: '📉', title: 'Spread mulai 0.0 pips', desc: 'Spread tersempit di 100+ instrumen forex, indeks, dan komoditas.' },
            { icon: '🛡️', title: 'Regulasi Internasional', desc: 'Beroperasi di bawah kerangka regulasi internasional yang ketat. Modal Anda dilindungi.' },
            { icon: '📊', title: '100+ Instrumen', desc: 'Forex, saham global, kripto, indeks, dan komoditas dalam satu akun.' },
            { icon: '🤝', title: 'Dukungan 24/5', desc: 'Tim multibahasa tersedia 24 jam 5 hari seminggu melalui chat, email, dan telepon.' },
            { icon: '💳', title: 'Deposit Mudah', desc: 'Deposit mulai $100 via transfer bank, kartu, kripto dan lebih banyak metode.' },
        ],
        stepsTitle: 'Mulai dalam 3 Langkah',
        steps: ['Buat akun dalam hitungan menit, tanpa birokrasi', 'Deposit mulai $100 dengan metode pilihan Anda', 'Trading Forex, Kripto, Indeks, dan lebih banyak pasar'],
        testTitle: 'Apa Kata Trader Kami',
        testimonials: [
            { name: 'Budi S.', country: '🇮🇩 Indonesia', text: 'Spread luar biasa untuk scalping. Eksekusi instan dan support selalu tersedia.' },
            { name: 'Sari W.', country: '🇮🇩 Indonesia', text: '2 tahun bersama Bridge dan tidak akan ganti. Penarikan dalam 24 jam, platform sangat stabil.' },
            { name: 'Andi P.', country: '🇮🇩 Indonesia', text: 'Akun RAW sempurna untuk algo trading. Komisi sangat rendah.' },
        ],
        formTitle: 'Siap Memulai?', formSub: 'Tinggalkan data Anda dan spesialis akan menghubungi Anda.',
        fields: ['Nama lengkap', 'Alamat email', 'Telepon / WhatsApp'],
        submit: 'Mulai Sekarang →',
        footerText: 'Halaman dikelola oleh mitra komersial resmi Bridge Markets',
        disclaimer: 'Trading CFD melibatkan risiko kerugian yang tinggi. Lebih dari 70% investor ritel kehilangan uang.',
        chessTitle: 'Mulai menyalin Trader ahora!',
        chessSubtitle: 'Melalui mana Anda tidak hanya memiliki akses ke berbagai instrumen tetapi juga alat pasar keuangan terbaik.',
        chessBenefits: [ { icon: '🛡️', title: 'Keuntungan Pasar' }, { icon: '📈', title: 'Profitabilitas' }, { icon: '🏆', title: 'Dapatkan dari trading' } ],
        chessSteps: { title: 'Cara mengakses Social Trading?', steps: [ 'Pilih akun social trading Anda.', 'Pilih Trader untuk diikuti.', 'Masukkan jumlah trading.', 'Terima manfaat langsung.', 'Tarik dana kapan saja.' ] },
        chessAccounts: [
            { title: 'Akun Leverage', desc: 'Operasikan dengan dana lebih besar.', img: '/images/landing/knight.png' },
            { title: 'Akun PAMM', desc: 'Kelola banyak akun investor.', img: '/images/landing/pawns.png' },
            { title: 'Akun MAM', desc: 'Alokasi trading bagi manajer aset.', img: '/images/landing/king.png' },
            { title: 'Akun Leverage', desc: 'Akses tingkat leverage institusional.', img: '/images/landing/queen.png' },
            { title: 'Akun ECN', desc: 'Eksekusi transparan tanpa dealing desk.', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: 'Aktifkan akun, perluas semesta finansial Anda', cta: 'BUKA AKUN TRADING', img: '/images/landing/hourglass.png' },
        chessFooter: { title: 'Hubungkan klien dengan Broker dan dapatkan komisi', img: '/images/landing/hourglass.png', text: [ 'Akses ke jaringan mitra strategis.', 'Dapatkan komisi harian dari volume.' ] }
    },
    VI: {
        heroTitle: 'Giao dịch trên', heroHighlight: 'Thị Trường Toàn Cầu', heroSub: 'Tiếp cận Forex, Cổ phiếu, Tiền điện tử và Chỉ số với spread siêu cạnh tranh và khớp lệnh tổ chức trong vài mili giây.',
        cta: 'Mở Tài Khoản Thật', ctaSec: 'Dùng Thử Demo',
        statsLabel: ['Trader Hoạt Động', 'Quốc gia', 'Khối lượng Hàng ngày', 'Xếp hạng'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Tại sao chọn Bridge Markets',
        features: [
            { icon: '⚡', title: 'Khớp lệnh Siêu Nhanh', desc: 'Máy chủ đặt chung Equinix NY4 và LD4, khớp lệnh dưới 1ms cho các cặp thanh khoản cao.' },
            { icon: '📉', title: 'Spread từ 0.0 pip', desc: 'Spread cạnh tranh nhất cho 100+ công cụ forex, chỉ số và hàng hóa.' },
            { icon: '🛡️', title: 'Quy định Quốc tế', desc: 'Hoạt động theo khung pháp lý quốc tế nghiêm ngặt. Vốn của bạn được bảo vệ.' },
            { icon: '📊', title: '100+ Công cụ', desc: 'Forex, cổ phiếu toàn cầu, tiền điện tử, chỉ số và hàng hóa trong một tài khoản.' },
            { icon: '🤝', title: 'Hỗ trợ 24/5', desc: 'Đội hỗ trợ đa ngôn ngữ, sẵn sàng 24h, 5 ngày/tuần qua chat, email và điện thoại.' },
            { icon: '💳', title: 'Nạp tiền Dễ dàng', desc: 'Nạp tiền từ $100 qua chuyển khoản, thẻ, tiền điện tử và nhiều phương thức khác.' },
        ],
        stepsTitle: 'Bắt đầu trong 3 Bước',
        steps: ['Tạo tài khoản trong vài phút, không cần giấy tờ', 'Nạp tiền từ $100 theo phương thức bạn thích', 'Giao dịch Forex, Tiền điện tử, Chỉ số và nhiều thị trường hơn'],
        testTitle: 'Trader Nói Gì Về Chúng Tôi',
        testimonials: [
            { name: 'Minh T.', country: '🇻🇳 Việt Nam', text: 'Spread tuyệt vời cho scalping. Khớp lệnh tức thì và hỗ trợ luôn sẵn sàng.' },
            { name: 'Lan P.', country: '🇻🇳 Việt Nam', text: '2 năm với Bridge và không đổi. Rút tiền trong 24h, nền tảng rất ổn định.' },
            { name: 'Hùng N.', country: '🇻🇳 Việt Nam', text: 'Tài khoản RAW hoàn hảo cho giao dịch thuật toán. Hoa hồng rất thấp.' },
        ],
        formTitle: 'Sẵn Sàng Bắt Đầu?', formSub: 'Để lại thông tin và chuyên gia sẽ liên hệ với bạn.',
        fields: ['Họ và tên', 'Địa chỉ email', 'Điện thoại / WhatsApp'],
        submit: 'Bắt Đầu Ngay →',
        footerText: 'Trang được quản lý bởi đối tác thương mại được ủy quyền của Bridge Markets',
        disclaimer: 'Giao dịch CFD liên quan đến rủi ro thua lỗ cao. Hơn 70% nhà đầu tư bán lẻ mất tiền.',
        chessTitle: 'Bắt đầu sao chép Trader ngay!',
        chessSubtitle: 'Qua đó bạn không chỉ tiếp cận nhiều công cụ mà còn có các công cụ thị trường tài chính tốt nhất.',
        chessBenefits: [ { icon: '🛡️', title: 'Lợi thế thị trường' }, { icon: '📈', title: 'Lợi nhuận' }, { icon: '🏆', title: 'Kiếm tiền từ giao dịch' } ],
        chessSteps: { title: 'Làm sao để truy cập Social Trading?', steps: [ 'Chọn tài khoản social trading.', 'Chọn Trader để theo dõi.', 'Nhập số tiền muốn đầu tư.', 'Nhận lợi nhuận trực tiếp.', 'Rút tiền bất cứ lúc nào.' ] },
        chessAccounts: [
            { title: 'Tài khoản Đòn bẩy', desc: 'Giao dịch với số vốn lớn hơn.', img: '/images/landing/knight.png' },
            { title: 'Tài khoản PAMM', desc: 'Quản lý nhiều tài khoản nhà đầu tư.', img: '/images/landing/pawns.png' },
            { title: 'Tài khoản MAM', desc: 'Phân bổ giao dịch cho người quản lý.', img: '/images/landing/king.png' },
            { title: 'Tài khoản Leverage', desc: 'Tiếp cận đòn bẩy tổ chức.', img: '/images/landing/queen.png' },
            { title: 'Tài khoản ECN', desc: 'Khớp lệnh minh bạch, trực tiếp.', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: 'Kích hoạt tài khoản, mở rộng vũ trụ tài chính', cta: 'MỞ TÀI KHOẢN GIAO DỊCH', img: '/images/landing/hourglass.png' },
        chessFooter: { title: 'Kết nối khách hàng với Broker và kiếm hoa hồng', img: '/images/landing/hourglass.png', text: [ 'Tiếp cận mạng lưới đối tác chiến lược.', 'Nhận hoa hồng hàng ngày trên khối lượng.' ] }
    },
    JP: {
        heroTitle: '世界市場で', heroHighlight: 'トレードする', heroSub: '超低スプレッドとミリ秒単位の機関投資家レベルの約定で、FX、株式、仮想通貨、インデックスにアクセス。',
        cta: 'リアル口座開設', ctaSec: 'デモを試す',
        statsLabel: ['アクティブトレーダー', '国', '日次ボリューム', 'ランキング'], statsVal: ['500K+', '170+', '$2.5B+', '#1'],
        featTitle: 'Bridge Markets を選ぶ理由',
        features: [ { icon: '⚡', title: '超高速約定', desc: 'Equinix NY4 および LD4 サーバーで 1ms 未満の約定。' }, { icon: '📉', title: 'スプレッド 0.0 ピップ〜', desc: 'FX、インデックス、コモディティのタイトなスプレッド。' }, { icon: '🛡️', title: '国際規制', desc: '厳格な国際規制枠組みの下で運営。' }, { icon: '📊', title: '100+ 銘柄', desc: '1つのアカウントでFX、個別株、仮想通貨などを取引。' }, { icon: '🤝', title: '24/5 サポート', desc: 'チャット、メール、電話による多言語サポート。' }, { icon: '💳', title: '簡単な入金', desc: '銀行振込、カード、仮想通貨などで100ドルから。' } ],
        stepsTitle: '3ステップで開始',
        steps: ['数分でアカウント作成', 'お好みの方法で100ドル以上入金', 'FX、仮想通貨、インデックスをトレード'],
        testTitle: 'トレーダーの声',
        testimonials: [ { name: '健太', country: '🇯🇵 日本', text: 'スキャルピングに最適なスプレッド。' }, { name: '美香', country: '🇯🇵 日本', text: '安定したプラットフォーム。' }, { name: '浩司', country: '🇯🇵 日本', text: 'RAW口座は完璧。' } ],
        formTitle: '今すぐ始めますか？', formSub: '詳細を入力してください。',
        fields: ['氏名', 'メールアドレス', '電話番号'],
        submit: '今すぐ開始 →',
        footerText: 'Bridge Markets公認パートナーによる管理ページ',
        disclaimer: 'CFD取引には高いリスクが伴います。',
        chessTitle: '今すぐトレーダーのコピーを開始！',
        chessSubtitle: '幅広い銘柄だけでなく、最高レベルのセキュリティにもアクセス可能。',
        chessBenefits: [ { icon: '🛡️', title: '市場の優位性' }, { icon: '📈', title: '収益性' }, { icon: '🏆', title: '市場トレードで稼ぐ' } ],
        chessSteps: { title: 'ソーシャルトレードへのアクセス方法は？', steps: [ 'ソーシャルトレード口座を選択。', 'トレーダーを選択。', '金額を入力。', '利益を受け取る。', 'いつでも出金可能。' ] },
        chessAccounts: [
            { title: 'レバレッジ口座', desc: 'より大きな資金で運用。', img: '/images/landing/knight.png' },
            { title: 'PAMM 口座', desc: '複数投資家を管理。', img: '/images/landing/pawns.png' },
            { title: 'MAM 口座', desc: 'マネージャー向け取引配分。', img: '/images/landing/king.png' },
            { title: 'レバレッジ口座', desc: '機関レベルのレバレッジ。', img: '/images/landing/queen.png' },
            { title: 'ECN 口座', desc: '透明性の高い直接約定。', img: '/images/landing/knight.png' }
        ],
        chessPromo: { title: '口座を有効化し、金融の世界を広げましょう', cta: 'トレード口座を開設', img: '/images/landing/hourglass.png' },
        chessFooter: { title: '顧客とブローカーをつなぎ、報酬を獲得', img: '/images/landing/hourglass.png', text: [ '戦略的パートナーネットワーク。', 'ボリュームに応じて毎日報酬。' ] }
    },
};

// ─── Config por tipo de landing ─────────────────────────────
const TYPE_CONFIG: Record<string, {
    gradient: string; accentHex: string; accentRgb: string;
    darkBg: string; badge: string; heroTag: string;
    particleColor: string;
}> = {
    institucional: {
        gradient: 'linear-gradient(135deg, #0d0221 0%, #1a0545 40%, #2d0e7a 70%, #865BFF 100%)',
        accentHex: '#865BFF', accentRgb: '134,91,255', darkBg: '#0d0221',
        badge: '🏛️ Bridge Markets', heroTag: 'Broker Premium',
        particleColor: 'rgba(134,91,255,',
    },
    forex: {
        gradient: 'linear-gradient(135deg, #020b18 0%, #0a2440 40%, #0f3d6b 70%, #1d6fa4 100%)',
        accentHex: '#38bdf8', accentRgb: '56,189,248', darkBg: '#020b18',
        badge: '📊 Forex Trading', heroTag: 'Especialistas en Divisas',
        particleColor: 'rgba(56,189,248,',
    },
    cripto: {
        gradient: 'linear-gradient(135deg, #0f0a00 0%, #2d1500 40%, #f59e0b 70%, #f97316 100%)',
        accentHex: '#f59e0b', accentRgb: '245,158,11', darkBg: '#0f0a00',
        badge: '₿ Criptomonedas', heroTag: 'Crypto Trading 24/7',
        particleColor: 'rgba(245,158,11,',
    },
    propfirm: {
        gradient: 'linear-gradient(135deg, #001a0f 0%, #003320 40%, #004d30 70%, #10b981 100%)',
        accentHex: '#10b981', accentRgb: '16,185,129', darkBg: '#001a0f',
        badge: '🚀 Prop Firm', heroTag: 'Fondeo para Traders Pro',
        particleColor: 'rgba(16,185,129,',
    },
    sinteticos: {
        gradient: 'linear-gradient(135deg, #1a000a 0%, #3d0015 40%, #7f1d1d 70%, #e11d48 100%)',
        accentHex: '#e11d48', accentRgb: '225,29,72', darkBg: '#1a000a',
        badge: '📈 Índices Sintéticos', heroTag: 'Opera 24/7 Sin Interrupciones',
        particleColor: 'rgba(225,29,72,',
    },
    bursatiles: {
        gradient: 'linear-gradient(135deg, #0a0a1a 0%, #1e1b4b 40%, #3730a3 70%, #6366f1 100%)',
        accentHex: '#818cf8', accentRgb: '129,140,248', darkBg: '#0a0a1a',
        badge: '📉 Índices Bursátiles', heroTag: 'Mercados Bursátiles Globales',
        particleColor: 'rgba(129,140,248,',
    },
    promociones: {
        gradient: 'linear-gradient(135deg, #1a0010 0%, #4a0030 40%, #831843 70%, #f43f5e 100%)',
        accentHex: '#f43f5e', accentRgb: '244,63,94', darkBg: '#1a0010',
        badge: '🎁 Oferta Especial', heroTag: 'Bonos y Promociones Exclusivas',
        particleColor: 'rgba(244,63,94,',
    },
    premium_chess: {
        gradient: 'linear-gradient(180deg, #FFFFFF 0%, #F5F5F5 100%)',
        accentHex: '#865BFF', accentRgb: '134,91,255', darkBg: '#FFFFFF',
        badge: '✨ Exclusivo', heroTag: 'Elite Trading Experience',
        particleColor: 'rgba(134,91,255,',
    },
};

// ─── Generador Principal ─────────────────────────────────────
export function generateLandingHTML(data: LandingData): string {
    const t = TRANSLATIONS[data.language] || TRANSLATIONS['ES'];
    const cfg = TYPE_CONFIG[data.landingType] || TYPE_CONFIG['institucional'];
    const wa = data.whatsapp ? 'https://wa.me/' + data.whatsapp.replace(/[^0-9]/g, '') : '#';
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const refLink = 'https://bridgemarkets.com/register?ref=' + (data.partnerId || data.slug);

    // Build ticker JS separately to avoid TS misinterpreting nested template literals
    const tickerScript = [
        '(function(){',
        'var pairs=[',
        '{pair:"EUR/USD",price:"1.0823",chg:"+0.0012",up:true},',
        '{pair:"GBP/USD",price:"1.2641",chg:"-0.0008",up:false},',
        '{pair:"XAU/USD",price:"2,318.40",chg:"+5.20",up:true},',
        '{pair:"BTC/USD",price:"69,241",chg:"+1.2%",up:true},',
        '{pair:"US30",price:"38,920",chg:"-0.3%",up:false},',
        '{pair:"NAS100",price:"17,845",chg:"+0.8%",up:true},',
        '{pair:"EUR/JPY",price:"164.82",chg:"+0.24",up:true},',
        '{pair:"OIL/USD",price:"79.14",chg:"-0.42",up:false}',
        '];',
        'var track=document.getElementById("tickerTrack");',
        'var all=pairs.concat(pairs);',
        'var html="";',
        'for(var i=0;i<all.length;i++){',
        '  var p=all[i];',
        '  var dir=p.up?"up":"down";',
        '  var arrow=p.up?"\u25b2":"\u25bc";',
        '  html+="<div class=\\"ticker-item\\"><span class=\\"pair\\">"+(p.pair)+"</span><span>"+(p.price)+"</span><span class=\\""+dir+"\\">"+arrow+" "+(p.chg)+"</span></div>";',
        '}',
        'if(track){track.innerHTML=html;}',
        '})();',
    ].join('\n');

    // Build form submit JS separately
    const formScript = [
        'document.getElementById("leadForm").addEventListener("submit",async function(e){',
        '  e.preventDefault();',
        '  var btn=document.getElementById("submitBtn");',
        '  var msg=document.getElementById("formMessage");',
        '  var fields=document.querySelectorAll(".form-input[required]");',
        '  btn.disabled=true;btn.textContent="Enviando...";msg.className="form-message";',
        '  try{',
        '    var res=await fetch("/api/leads",{',
        '      method:"POST",',
        '      headers:{"Content-Type":"application/json"},',
        '      body:JSON.stringify({',
        '        name:fields[0]?fields[0].value:"",',
        '        email:fields[1]?fields[1].value:"",',
        '        whatsapp:fields[2]?fields[2].value:"",',
        '        landingSlug:document.getElementById("landingSlug").value,',
        '        partnerId:document.getElementById("partnerId").value',
        '      })',
        '    });',
        '    var data=await res.json();',
        '    if(data.success){',
        '      msg.textContent="\u00a1Gracias! Nos pondremos en contacto pronto. \uD83C\uDF89";',
        '      msg.className="form-message success";',
        '      document.getElementById("leadForm").reset();',
        '      btn.style.display="none";',
        '    }else{throw new Error(data.error||"Error");}',
        '  }catch(err){',
        '    msg.textContent="Error al enviar. Por favor intenta de nuevo.";',
        '    msg.className="form-message error";',
        '    btn.disabled=false;',
        '    btn.textContent="' + t.submit + '";',
        '  }',
        '});',
    ].join('\n');

    const gaScript = data.googleAnalyticsId ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${data.googleAnalyticsId}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${data.googleAnalyticsId}');</script>` : '';

    const featuresHTML = t.features.map((f, i) => `
        <div class="feat-card" style="animation-delay:${i * 0.08}s">
            <div class="feat-icon">${f.icon}</div>
            <h3 class="feat-title">${f.title}</h3>
            <p class="feat-desc">${f.desc}</p>
        </div>`).join('');

    const stepsHTML = t.steps.map((s, i) => `
        <div class="step-row">
            <div class="step-num">${i + 1}</div>
            <div class="step-line">${i < t.steps.length - 1 ? '<div class="step-connector"></div>' : ''}</div>
            <div class="step-body">
                <p class="step-text">${s}</p>
            </div>
        </div>`).join('');

    const testimonialsHTML = t.testimonials.map(te => `
        <div class="testi-card">
            <div class="testi-stars">★★★★★</div>
            <p class="testi-text">"${te.text}"</p>
            <div class="testi-author">
                <div class="testi-avatar">${te.name.charAt(0)}</div>
                <div>
                    <div class="testi-name">${te.name}</div>
                    <div class="testi-country">${te.country}</div>
                </div>
            </div>
        </div>`).join('');

    const statsHTML = t.statsVal.map((v, i) => `
        <div class="stat-item">
            <div class="stat-val" data-target="${v}">${v}</div>
            <div class="stat-label">${t.statsLabel[i]}</div>
        </div>`).join('');

    // --- TEMPLATE PREMIUM CHESS ---
    if (data.landingType === 'premium_chess') {
        const chessBenefitsHTML = t.chessBenefits?.map(b => `
            <div class="chess-benefit">
                <div class="chess-benefit-icon">${b.icon}</div>
                <div class="chess-benefit-title">${b.title}</div>
            </div>`).join('') || '';

        const chessFeaturesHTML = t.features.slice(0, 4).map(f => `
            <div class="chess-feat-card">
                <div class="chess-feat-icon">${f.icon}</div>
                <div>
                    <div class="chess-feat-title">${f.title}</div>
                    <div class="chess-feat-desc">${f.desc}</div>
                </div>
            </div>`).join('') || '';

        const chessStepsHTML = t.chessSteps?.steps.map((s, i) => `
            <div class="chess-step">
                <div class="chess-step-num">${i + 1}</div>
                <div class="chess-step-text">${s}</div>
            </div>`).join('') || '';

        const chessAccountsHTML = t.chessAccounts?.map(a => `
            <div class="chess-acc-card">
                <div class="chess-acc-img">
                    <img src="${a.img}" alt="${a.title}">
                </div>
                <div class="chess-acc-content">
                    <h3 class="chess-acc-title">${a.title}</h3>
                    <p class="chess-acc-desc">${a.desc}</p>
                    <a href="#registro" class="chess-acc-btn">ME INTERESA</a>
                </div>
            </div>`).join('') || '';

        return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Bridge Markets | ${t.chessTitle}</title>
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">${gaScript}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--accent:${cfg.accentHex};--accent-rgb:${cfg.accentRgb};--dark:#140633;--bg-light:#FFFFFF;--bg-gray:#F8F9FA}
body{font-family:'Inter',sans-serif;background:var(--bg-light);color:#1a1a1a;overflow-x:hidden;-webkit-font-smoothing:antialiased;scroll-behavior:smooth}

/* HERO / HEADER */
.chess-hero{padding:60px 24px;text-align:center;max-width:1200px;margin:0 auto}
.chess-hero h1{font-size:clamp(2rem,5vw,3.5rem);font-weight:900;margin-bottom:16px;color:#1a1a1a;letter-spacing:-0.03em}
.chess-hero h1 span{color:var(--accent)}
.chess-hero p{font-size:1.1rem;color:#666;max-width:800px;margin:0 auto 48px;line-height:1.6}
.chess-benefits{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:60px}
.chess-benefit{background:white;border:1px solid #eee;padding:24px;border-radius:20px;display:flex;align-items:center;gap:16px;text-align:left;box-shadow:0 10px 30px rgba(0,0,0,0.05);transition:transform 0.3s}
.chess-benefit:hover{transform:translateY(-5px)}
.chess-benefit-icon{width:48px;height:48px;border-radius:12px;background:rgba(var(--accent-rgb),0.1);display:flex;align-items:center;justify-content:center;font-size:24px;color:var(--accent)}
.chess-benefit-title{font-weight:700;font-size:14px;color:#333}

/* SOCIAL TRADING SECTION */
.chess-steps-section{background:var(--dark);padding:100px 24px;overflow:hidden;position:relative}
.chess-steps-container{max-width:1200px;margin:0 auto;display:flex;gap:40px;align-items:center;background:rgba(255,255,255,0.02);border-radius:40px;border:1px solid rgba(255,255,255,0.05);overflow:hidden;position:relative}
.chess-steps-container::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg, rgba(255,255,255,0.03) 0, rgba(255,255,255,0.03) 1px, transparent 1px, transparent 40px);z-index:0}
.chess-steps-left{flex:1;padding:80px;position:relative;z-index:1;background:linear-gradient(135deg, rgba(var(--accent-rgb),0.2) 0%, transparent 100%)}
.chess-steps-left h2{font-size:3.5rem;font-weight:900;color:white;line-height:1.1;letter-spacing:-0.03em}
.chess-steps-right{flex:1.2;padding:80px;position:relative;z-index:1}
.chess-step{display:flex;gap:20px;margin-bottom:20px;background:rgba(255,255,255,0.05);padding:20px;border-radius:16px;border:1px solid rgba(255,255,255,0.1);transition:0.3s}
.chess-step:hover{background:rgba(255,255,255,0.1)}
.chess-step-num{width:44px;height:44px;border-radius:50%;background:white;color:var(--accent);display:flex;align-items:center;justify-content:center;font-weight:900;font-size:20px;flex-shrink:0}
.chess-step-text{color:white;font-weight:600;font-size:1.05rem;line-height:1.4}

/* ACCOUNTS */
.chess-accounts{padding:100px 24px;max-width:1200px;margin:0 auto}
.chess-acc-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:24px;margin-bottom:24px}
.chess-acc-grid-v2{display:grid;grid-template-columns:repeat(2,1fr);gap:24px}
.chess-acc-card{background:#000;border-radius:32px;overflow:hidden;transition:transform 0.4s;border:1px solid #222}
.chess-acc-card:hover{transform:translateY(-10px);border-color:var(--accent)}
.chess-acc-img{height:300px;display:flex;align-items:center;justify-content:center;padding:40px}
.chess-acc-img img{max-height:100%;max-width:100%;object-fit:contain;animation:floating 4s ease-in-out infinite}
.chess-acc-content{padding:0 40px 40px;text-align:left}
.chess-acc-title{font-size:1.6rem;font-weight:800;color:white;margin-bottom:12px}
.chess-acc-desc{font-size:13px;color:#999;margin-bottom:30px;line-height:1.6;height:65px;overflow:hidden}
.chess-acc-btn{display:block;width:100%;padding:18px;background:var(--accent);color:white;text-decoration:none;font-weight:900;border-radius:16px;text-align:center;font-size:14px;letter-spacing:1px;transition:0.3s}
.chess-acc-btn:hover{background:#7040ff;box-shadow:0 10px 25px rgba(var(--accent-rgb),0.4)}

/* FEATURES SECTION */
.chess-features-section{background:var(--bg-gray);padding:100px 24px;text-align:center}
.chess-features-section h2{font-size:3rem;font-weight:900;margin-bottom:60px;color:#333}
.chess-features-section h2 span{color:var(--accent)}
.chess-feat-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(2,1fr);gap:20px}
.chess-feat-card{background:white;padding:32px;border-radius:24px;display:flex;align-items:center;gap:20px;text-align:left;border:1px solid #eee}
.chess-feat-icon{width:56px;height:56px;border-radius:16px;background:var(--dark);display:flex;align-items:center;justify-content:center;font-size:28px;color:white;flex-shrink:0}
.chess-feat-title{font-weight:800;font-size:16px;color:#333;margin-bottom:4px}
.chess-feat-desc{font-size:13px;color:#777;line-height:1.5}

/* PROMO BANNER */
.chess-promo{margin:60px 24px;background:var(--accent);padding:80px;border-radius:40px;display:flex;align-items:center;justify-content:space-between;max-width:1200px;margin-left:auto;margin-right:auto;position:relative;overflow:hidden}
.chess-promo::before{content:'';position:absolute;inset:0;background:repeating-linear-gradient(90deg, rgba(255,255,255,0.05) 0, rgba(255,255,255,0.05) 1px, transparent 1px, transparent 30px);z-index:0}
.chess-promo-content{max-width:600px;position:relative;z-index:1}
.chess-promo-title{font-size:2.8rem;font-weight:900;color:white;margin-bottom:32px;line-height:1.1}
.chess-promo-btn{display:inline-block;padding:20px 48px;background:white;color:var(--accent);text-decoration:none;font-weight:900;border-radius:12px;font-size:14px;transition:0.3s}
.chess-promo-btn:hover{transform:translateY(-3px);box-shadow:0 15px 30px rgba(0,0,0,0.2)}

/* COMMISSION SECTION */
.chess-comm-section{padding:100px 24px;max-width:1200px;margin:0 auto;display:flex;align-items:center;gap:80px}
.chess-comm-content{flex:1}
.chess-comm-title{font-size:3rem;font-weight:900;margin-bottom:32px;color:var(--dark);line-height:1.1}
.chess-comm-title span{color:var(--accent)}
.chess-comm-text{font-size:1.1rem;color:#666;line-height:1.7;margin-bottom:24px}
.chess-comm-img{flex:0.8;text-align:right}
.chess-comm-img img{height:450px;animation:floating 5s ease-in-out infinite alternate}

/* FORM OVERLAY */
.form-section{background:var(--bg-gray);padding:100px 24px;border-top:1px solid #eee}
.form-inner{max-width:500px;margin:0 auto;text-align:center}
.form-inner h2{font-size:2.5rem;font-weight:900;margin-bottom:48px}
.lead-form{background:white;padding:40px;border-radius:30px;box-shadow:0 30px 60px rgba(0,0,0,0.1);border:1px solid #eee}
.form-group{margin-bottom:20px;text-align:left}
.form-label{display:block;font-size:12px;font-weight:800;color:#999;text-transform:uppercase;margin-bottom:8px;letter-spacing:1px}
.form-input{width:100%;background:#fcfcfc;border:1px solid #ddd;padding:16px;border-radius:12px;font-family:inherit;outline:none;transition:0.3s}
.form-input:focus{border-color:var(--accent);background:white}
.form-submit{width:100%;padding:18px;background:var(--accent);border:none;border-radius:12px;color:white;font-weight:900;cursor:pointer;transition:0.3s;font-size:16px}
.form-submit:hover{transform:translateY(-2px);box-shadow:0 10px 20px rgba(var(--accent-rgb),0.3)}
.form-message{padding:15px;border-radius:12px;margin-top:20px;display:none;font-weight:700}
.form-message.success{display:block;background:#ecfdf5;color:#10b981}
.form-message.error{display:block;background:#fef2f2;color:#ef4444}

@keyframes floating{0%{transform:translateY(0)}50%{transform:translateY(-15px)}100%{transform:translateY(0)}}

@media (max-width: 968px) {
    .chess-benefits, .chess-steps-container, .chess-acc-grid, .chess-acc-grid-v2, .chess-feat-grid, .chess-promo, .chess-comm-section { grid-template-columns: 1fr; flex-direction: column; padding: 40px 20px; text-align: center; }
    .chess-steps-left, .chess-steps-right, .chess-promo{padding:40px 24px}
    .chess-comm-img img{height:300px}
}
</style>
</head>
<body>
    <section class="chess-hero">
        <h1>¡Empieza a copiar <span>Traders</span> ahora!</h1>
        <p>${t.chessSubtitle}</p>
        <div class="chess-benefits">${chessBenefitsHTML}</div>
    </section>

    <section class="chess-steps-section">
        <div class="chess-steps-container">
            <div class="chess-steps-left">
                <h2>¿Cómo acceder al Social Trading?</h2>
            </div>
            <div class="chess-steps-right">
                ${chessStepsHTML}
            </div>
        </div>
    </section>

    <section class="chess-accounts">
        <div class="chess-acc-grid">${chessAccountsHTML.split('</div>').slice(0,3).join('</div>') + '</div>'}</div>
        <div class="chess-acc-grid-v2">${chessAccountsHTML.split('</div>').slice(3,5).join('</div>') + '</div>'}</div>
    </section>

    <section class="chess-features-section">
        <h2>¿Por qué <span>Bridge Markets?</span></h2>
        <div class="chess-feat-grid">
            ${chessFeaturesHTML}
        </div>
    </section>

    <section class="chess-promo">
        <div class="chess-promo-content">
            <h2 class="chess-promo-title">Activa tu cuenta, expande tu universo financiero</h2>
            <a href="#registro" class="chess-promo-btn">${t.chessPromo.cta}</a>
        </div>
    </section>

    <section class="chess-comm-section">
        <div class="chess-comm-content">
            <h2 class="chess-comm-title">Conecta clientes con Brokers y <span>gana comisiones</span></h2>
            ${t.chessFooter.text.map(tx => `<p class="chess-comm-text">${tx}</p>`).join('')}
        </div>
        <div class="chess-comm-img"><img src="${t.chessFooter.img}" alt=""></div>
    </section>

    <section class="form-section" id="registro">
        <div class="form-inner">
            <h2>${t.formTitle}</h2>
            <form class="lead-form" id="leadForm">
                <input type="hidden" id="partnerId" value="${data.partnerId}">
                <input type="hidden" id="landingSlug" value="${data.slug}">
                ${t.fields.map((f, i) => `
                <div class="form-group">
                    <label class="form-label" for="f${i}">${f}</label>
                    <input class="form-input" id="f${i}" type="${i === 1 ? 'email' : i === 2 ? 'tel' : 'text'}" required placeholder="${f}...">
                </div>`).join('')}
                <button type="submit" class="form-submit" id="submitBtn">ME INTERESA</button>
                <div id="formMessage" class="form-message"></div>
            </form>
        </div>
    </section>

    <script>` + formScript + `</script>
</body>
</html>`;
    }

    return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>Bridge Markets | ${t.heroHighlight} — ${data.fullName}</title>
<meta name="description" content="${t.heroSub}">
<meta property="og:title" content="Bridge Markets | ${t.heroHighlight}">
<meta property="og:description" content="${t.heroSub}">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">${gaScript}
<style>
*,*::before,*::after{margin:0;padding:0;box-sizing:border-box}
:root{--accent:${cfg.accentHex};--accent-rgb:${cfg.accentRgb};--dark:${cfg.darkBg};--page-bg:#07020f}
html{scroll-behavior:smooth}
body{font-family:'Inter',-apple-system,sans-serif;color:rgba(255,255,255,0.85);background:var(--page-bg);-webkit-font-smoothing:antialiased;overflow-x:hidden}

/* ─── NAV ─── */
.nav{position:fixed;top:0;left:0;right:0;z-index:100;padding:0 24px;height:64px;display:flex;align-items:center;justify-content:space-between;background:rgba(0,0,0,0.3);backdrop-filter:blur(20px);border-bottom:1px solid rgba(255,255,255,0.06);transition:background 0.3s}
.nav.scrolled{background:rgba(0,0,0,0.85)}
.nav-logo{font-size:18px;font-weight:800;color:white;letter-spacing:-0.5px}
.nav-logo span{color:var(--accent)}
.nav-cta{background:var(--accent);color:white;padding:9px 22px;border-radius:8px;font-size:13px;font-weight:700;text-decoration:none;transition:all 0.2s;border:none;cursor:pointer}
.nav-cta:hover{opacity:0.9;transform:translateY(-1px)}

/* ─── HERO ─── */
.hero{min-height:100vh;display:flex;align-items:center;justify-content:center;position:relative;overflow:hidden;background:${cfg.gradient}}
#particles-canvas{position:absolute;inset:0;pointer-events:none}
.hero-glow{position:absolute;width:600px;height:600px;border-radius:50%;background:radial-gradient(circle,rgba(var(--accent-rgb),0.15) 0%,transparent 70%);top:50%;left:50%;transform:translate(-50%,-50%);pointer-events:none}
.hero-content{position:relative;z-index:2;text-align:center;max-width:780px;padding:6rem 24px 4rem}
.hero-badge{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);backdrop-filter:blur(12px);border:1px solid rgba(255,255,255,0.12);padding:8px 20px;border-radius:50px;color:rgba(255,255,255,0.85);font-size:13px;font-weight:600;margin-bottom:1.5rem;animation:fadeUp 0.8s ease both}
.hero-tag{font-size:11px;font-weight:700;letter-spacing:2px;text-transform:uppercase;color:var(--accent);margin-bottom:1rem;animation:fadeUp 0.8s 0.1s ease both}
.hero h1{font-size:clamp(2.8rem,6vw,5rem);font-weight:900;color:white;line-height:1.05;letter-spacing:-0.04em;margin-bottom:1.5rem;animation:fadeUp 0.8s 0.2s ease both}
.hero h1 .hl{color:var(--accent);display:block}
.hero-sub{font-size:1.1rem;color:rgba(255,255,255,0.65);line-height:1.75;max-width:580px;margin:0 auto 2.5rem;animation:fadeUp 0.8s 0.3s ease both}
.hero-ctas{display:flex;gap:16px;justify-content:center;flex-wrap:wrap;animation:fadeUp 0.8s 0.4s ease both}
.btn-primary{display:inline-flex;align-items:center;gap:10px;background:var(--accent);color:white;padding:16px 36px;border-radius:12px;font-size:16px;font-weight:700;text-decoration:none;transition:all 0.25s;box-shadow:0 8px 32px rgba(var(--accent-rgb),0.4)}
.btn-primary:hover{transform:translateY(-3px);box-shadow:0 16px 48px rgba(var(--accent-rgb),0.5)}
.btn-secondary{display:inline-flex;align-items:center;gap:8px;background:rgba(255,255,255,0.08);color:white;padding:16px 36px;border-radius:12px;font-size:16px;font-weight:600;text-decoration:none;border:1px solid rgba(255,255,255,0.15);backdrop-filter:blur(10px);transition:all 0.25s}
.btn-secondary:hover{background:rgba(255,255,255,0.15);transform:translateY(-2px)}
.hero-partner{margin-top:2.5rem;font-size:12px;color:rgba(255,255,255,0.3);animation:fadeUp 0.8s 0.5s ease both}

/* ─── TICKER ─── */
.ticker{background:rgba(0,0,0,0.6);backdrop-filter:blur(10px);border-top:1px solid rgba(255,255,255,0.06);padding:12px 0;overflow:hidden}
.ticker-track{display:flex;gap:48px;animation:tickerScroll 30s linear infinite;white-space:nowrap}
.ticker-item{display:flex;align-items:center;gap:8px;font-size:13px;font-weight:600;color:rgba(255,255,255,0.7);flex-shrink:0}
.ticker-item .pair{color:white;font-weight:700}
.ticker-item .up{color:#22c55e}.ticker-item .down{color:#ef4444}

/* ─── STATS ─── */
.stats-section{background:linear-gradient(180deg,rgba(0,0,0,0.5) 0%,rgba(var(--accent-rgb),0.04) 100%);border-top:1px solid rgba(255,255,255,0.04);border-bottom:1px solid rgba(255,255,255,0.04)}
.stats-inner{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(4,1fr);padding:52px 24px}
.stat-item{text-align:center;padding:0 24px;border-right:1px solid rgba(255,255,255,0.06)}
.stat-item:last-child{border-right:none}
.stat-val{font-size:2.5rem;font-weight:900;color:var(--accent);letter-spacing:-0.03em;line-height:1}
.stat-label{font-size:13px;color:rgba(255,255,255,0.4);font-weight:500;margin-top:6px}

/* ─── FEATURES ─── */
.features{padding:100px 24px;background:linear-gradient(180deg,var(--page-bg) 0%,rgba(var(--accent-rgb),0.05) 50%,var(--page-bg) 100%)}
.section-label{text-align:center;font-size:11px;font-weight:700;letter-spacing:3px;text-transform:uppercase;color:var(--accent);margin-bottom:12px;opacity:0.8}
.section-title{text-align:center;font-size:clamp(1.8rem,4vw,2.8rem);font-weight:800;color:white;letter-spacing:-0.03em;margin-bottom:64px}
.feat-grid{max-width:1100px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:16px}
.feat-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:32px;transition:all 0.35s;position:relative;overflow:hidden;opacity:0;transform:translateY(20px);backdrop-filter:blur(10px)}
.feat-card.visible{opacity:1;transform:translateY(0);transition:opacity 0.6s ease,transform 0.6s ease}
.feat-card::before{content:'';position:absolute;inset:0;background:linear-gradient(135deg,rgba(var(--accent-rgb),0.06) 0%,transparent 60%);pointer-events:none}
.feat-card:hover{border-color:rgba(var(--accent-rgb),0.25);box-shadow:0 12px 40px rgba(var(--accent-rgb),0.12),inset 0 1px 0 rgba(255,255,255,0.08);transform:translateY(-4px)}
.feat-icon{width:52px;height:52px;border-radius:14px;background:rgba(var(--accent-rgb),0.12);border:1px solid rgba(var(--accent-rgb),0.2);display:flex;align-items:center;justify-content:center;font-size:26px;margin-bottom:20px}
.feat-title{font-size:1rem;font-weight:700;color:rgba(255,255,255,0.9);margin-bottom:10px}
.feat-desc{font-size:14px;color:rgba(255,255,255,0.45);line-height:1.65}

/* ─── STEPS ─── */
.steps-section{background:linear-gradient(180deg,var(--page-bg) 0%,rgba(var(--accent-rgb),0.06) 50%,var(--page-bg) 100%);padding:100px 24px;border-top:1px solid rgba(255,255,255,0.04)}
.steps-inner{max-width:700px;margin:0 auto}
.steps-inner .section-title{color:white}
.step-row{display:flex;gap:0;margin-bottom:0;position:relative}
.step-num{width:52px;height:52px;border-radius:16px;background:var(--accent);color:white;font-weight:800;font-size:20px;display:flex;align-items:center;justify-content:center;flex-shrink:0;box-shadow:0 8px 24px rgba(var(--accent-rgb),0.4);position:relative;z-index:2}
.step-line{width:2px;background:rgba(var(--accent-rgb),0.15);margin:0 25px;flex-shrink:0;position:relative;min-height:60px}
.step-connector{position:absolute;inset:0;background:rgba(var(--accent-rgb),0.3)}
.step-body{flex:1;padding-bottom:40px;display:flex;align-items:flex-start;padding-top:12px}
.step-text{font-size:1.05rem;font-weight:500;color:rgba(255,255,255,0.8);line-height:1.6}

/* ─── TESTIMONIALS ─── */
.testi-section{padding:100px 24px;background:var(--page-bg);border-top:1px solid rgba(255,255,255,0.04)}
.testi-grid{max-width:1000px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:16px}
.testi-card{background:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.07);border-radius:20px;padding:28px;transition:all 0.35s;backdrop-filter:blur(10px)}
.testi-card:hover{border-color:rgba(var(--accent-rgb),0.2);box-shadow:0 12px 36px rgba(var(--accent-rgb),0.08);transform:translateY(-3px)}
.testi-stars{color:#f59e0b;font-size:18px;letter-spacing:2px;margin-bottom:16px}
.testi-text{font-size:15px;color:rgba(255,255,255,0.55);line-height:1.7;margin-bottom:20px;font-style:italic}
.testi-author{display:flex;align-items:center;gap:12px}
.testi-avatar{width:40px;height:40px;border-radius:50%;background:linear-gradient(135deg,var(--accent) 0%,rgba(var(--accent-rgb),0.5) 100%);display:flex;align-items:center;justify-content:center;color:white;font-weight:800;font-size:16px;flex-shrink:0}
.testi-name{font-weight:700;font-size:14px;color:rgba(255,255,255,0.9)}
.testi-country{font-size:12px;color:rgba(255,255,255,0.35);margin-top:2px}

/* ─── FORM ─── */
.form-section{padding:100px 24px;background:linear-gradient(180deg,var(--page-bg) 0%,rgba(var(--accent-rgb),0.08) 50%,var(--page-bg) 100%);position:relative;overflow:hidden;border-top:1px solid rgba(255,255,255,0.04)}
.form-section::before{content:'';position:absolute;top:-200px;right:-200px;width:500px;height:500px;border-radius:50%;background:radial-gradient(circle,rgba(var(--accent-rgb),0.08) 0%,transparent 70%)}
.form-inner{max-width:500px;margin:0 auto;position:relative;z-index:1}
.form-inner .section-title{color:white;text-align:left}
.form-inner .section-label{text-align:left}
.form-sub{color:rgba(255,255,255,0.5);margin-bottom:32px;font-size:15px;margin-top:8px}
.lead-form{background:rgba(255,255,255,0.04);border:1px solid rgba(255,255,255,0.08);border-radius:20px;padding:32px;backdrop-filter:blur(10px)}
.form-group{margin-bottom:18px}
.form-label{display:block;font-size:12px;font-weight:700;color:rgba(255,255,255,0.5);margin-bottom:8px;text-transform:uppercase;letter-spacing:0.5px}
.form-input{width:100%;padding:14px 18px;border:1px solid rgba(255,255,255,0.1);border-radius:10px;font-size:15px;font-family:'Inter',sans-serif;transition:all 0.2s;outline:none;background:rgba(255,255,255,0.06);color:white}
.form-input::placeholder{color:rgba(255,255,255,0.25)}
.form-input:focus{border-color:var(--accent);box-shadow:0 0 0 4px rgba(var(--accent-rgb),0.15);background:rgba(255,255,255,0.08)}
.form-submit{width:100%;background:var(--accent);color:white;padding:16px;border:none;border-radius:12px;font-weight:800;font-size:16px;cursor:pointer;transition:all 0.25s;margin-top:8px;font-family:'Inter',sans-serif;letter-spacing:-0.3px;box-shadow:0 8px 24px rgba(var(--accent-rgb),0.35)}
.form-submit:hover:not(:disabled){transform:translateY(-2px);box-shadow:0 12px 32px rgba(var(--accent-rgb),0.5)}
.form-submit:disabled{opacity:0.6;cursor:not-allowed}
.form-message{display:none;text-align:center;padding:14px;border-radius:10px;margin-top:16px;font-weight:600;font-size:14px}
.form-message.success{display:block;background:rgba(34,197,94,0.12);color:#4ade80;border:1px solid rgba(34,197,94,0.2)}
.form-message.error{display:block;background:rgba(239,68,68,0.12);color:#f87171;border:1px solid rgba(239,68,68,0.2)}
.wa-alt{display:flex;align-items:center;justify-content:center;gap:8px;margin-top:20px;color:rgba(255,255,255,0.4);font-size:13px}
.wa-link{color:#22c55e;font-weight:600;text-decoration:none}
.wa-link:hover{text-decoration:underline}

/* ─── FOOTER ─── */
footer{background:rgba(0,0,0,0.6);padding:40px 24px;text-align:center;border-top:1px solid rgba(255,255,255,0.05);backdrop-filter:blur(10px)}
.footer-logo{font-size:20px;font-weight:800;color:white;margin-bottom:8px}
.footer-logo span{color:var(--accent)}
.footer-text{font-size:12px;color:rgba(255,255,255,0.35);margin-bottom:6px}
.footer-partner{font-size:11px;color:rgba(255,255,255,0.18);margin-top:12px}
.disclaimer{font-size:10px;color:rgba(255,255,255,0.2);max-width:700px;margin:16px auto 0;line-height:1.6}

/* ─── ANIMATIONS ─── */
@keyframes fadeUp{from{opacity:0;transform:translateY(24px)}to{opacity:1;transform:translateY(0)}}
@keyframes tickerScroll{from{transform:translateX(0)}to{transform:translateX(-50%)}}
@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}

/* ─── RESPONSIVE ─── */
@media(max-width:768px){
.stats-inner{grid-template-columns:repeat(2,1fr);gap:0}
.stat-item{border-right:none;border-bottom:1px solid #f1f5f9;padding:24px}
.hero-ctas{flex-direction:column;align-items:center}
.btn-primary,.btn-secondary{width:100%;justify-content:center;max-width:320px}
.step-row{flex-direction:column}
.step-line{display:none}
.step-body{padding-top:8px;padding-bottom:24px}
.nav-cta{display:none}
}
</style>
</head>
<body>

<!-- NAV -->
<nav class="nav" id="mainNav">
    <div class="nav-logo">Bridge<span>Markets</span></div>
    <a href="#registro" class="nav-cta">${t.cta}</a>
</nav>

<!-- HERO -->
<section class="hero">
    <canvas id="particles-canvas"></canvas>
    <div class="hero-glow"></div>
    <div class="hero-content">
        <div class="hero-badge">${cfg.badge}</div>
        <p class="hero-tag">${cfg.heroTag}</p>
        <h1>${t.heroTitle} <span class="hl">${t.heroHighlight}</span></h1>
        <p class="hero-sub">${t.heroSub}</p>
        <div class="hero-ctas">
            <a href="#registro" class="btn-primary">${t.cta}</a>
            <a href="#registro" class="btn-secondary">${t.ctaSec}</a>
        </div>
        <p class="hero-partner">Partner: ${data.fullName} · ${data.country}</p>
    </div>
</section>

<!-- TICKER -->
<div class="ticker">
    <div class="ticker-track" id="tickerTrack"></div>
</div>

<!-- STATS -->
<section class="stats-section">
    <div class="stats-inner">${statsHTML}</div>
</section>

<!-- FEATURES -->
<section class="features" id="features">
    <p class="section-label">Ventajas Competitivas</p>
    <h2 class="section-title">${t.featTitle}</h2>
    <div class="feat-grid">${featuresHTML}</div>
</section>

<!-- STEPS -->
<section class="steps-section">
    <div class="steps-inner">
        <p class="section-label" style="color:rgba(var(--accent-rgb),0.8)">Proceso Simple</p>
        <h2 class="section-title">${t.stepsTitle}</h2>
        ${stepsHTML}
    </div>
</section>

<!-- TESTIMONIALS -->
<section class="testi-section">
    <p class="section-label">Traders Reales</p>
    <h2 class="section-title">${t.testTitle}</h2>
    <div class="testi-grid">${testimonialsHTML}</div>
</section>

<!-- FORM -->
<section class="form-section" id="registro">
    <div class="form-inner">
        <p class="section-label">Empieza Hoy</p>
        <h2 class="section-title">${t.formTitle}</h2>
        <p class="form-sub">${t.formSub}</p>
        <form class="lead-form" id="leadForm">
            <input type="hidden" id="partnerId" value="${data.partnerId}">
            <input type="hidden" id="landingSlug" value="${data.slug}">
            ${t.fields.map((f, i) => `
            <div class="form-group">
                <label class="form-label" for="field${i}">${f}</label>
                <input class="form-input" type="${i === 1 ? 'email' : i === 2 ? 'tel' : 'text'}" id="field${i}" required placeholder="${f}...">
            </div>`).join('')}
            <button type="submit" class="form-submit" id="submitBtn">${t.submit}</button>
            <div id="formMessage" class="form-message"></div>
        </form>
        <div class="wa-alt">
            ¿Prefieres WhatsApp? <a href="${wa}" class="wa-link" target="_blank">Escríbenos directo →</a>
        </div>
    </div>
</section>

<!-- FOOTER -->
<footer>
    <div class="footer-logo">Bridge<span>Markets</span></div>
    <div class="footer-text">${t.footerText}</div>
    <div class="footer-partner">Partner: ${data.fullName} · ID: ${data.partnerId || data.slug}</div>
    <div class="disclaimer">${t.disclaimer}</div>
</footer>

<script>
// ─── Nav scroll ───
window.addEventListener('scroll',()=>{
    document.getElementById('mainNav').classList.toggle('scrolled',window.scrollY>50)
});

// ─── Particles ───
(function(){
    const canvas=document.getElementById('particles-canvas');
    const ctx=canvas.getContext('2d');
    let W,H,particles=[];
    function resize(){W=canvas.width=window.innerWidth;H=canvas.height=window.innerHeight}
    resize();window.addEventListener('resize',resize);
    for(let i=0;i<60;i++)particles.push({x:Math.random()*1000,y:Math.random()*1000,r:Math.random()*2+0.5,vx:(Math.random()-0.5)*0.3,vy:(Math.random()-0.5)*0.3,o:Math.random()*0.4+0.1});
    function draw(){
        ctx.clearRect(0,0,W,H);
        particles.forEach(p=>{
            p.x+=p.vx;p.y+=p.vy;
            if(p.x<0)p.x=W;if(p.x>W)p.x=0;if(p.y<0)p.y=H;if(p.y>H)p.y=0;
            ctx.beginPath();ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
            ctx.fillStyle='${cfg.particleColor}'+p.o+')';ctx.fill();
        });
        requestAnimationFrame(draw);
    }
    draw();
})();

// ─── Scroll reveal ───
(function(){
  document.querySelectorAll(".feat-card").forEach(function(c){
    new IntersectionObserver(function(en){en.forEach(function(e){if(e.isIntersecting)e.target.classList.add("visible");});},{threshold:0.1}).observe(c);
  });
})();
</script>
<script>` + tickerScript + `</script>
<script>` + formScript + `</script>
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
