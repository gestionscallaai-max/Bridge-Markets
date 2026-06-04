import { SectionMeta } from './types';



export const SECTION_CATEGORIES: Record<string, { label: string; icon: string }> = {
    'Official': { label: 'Oficial', icon: 'verified_user' },
    'Community': { label: 'Comunidad', icon: 'groups' },
    'Utility': { label: 'Utilidad', icon: 'build' },
    'Marketing': { label: 'Marketing', icon: 'campaign' }
};

export const SECTION_CATALOG: SectionMeta[] = [
    // Blueprints para PropFirm (Blueprint 2)
    { id: 'prop_hero', name: 'PropFirm: Hero', icon: 'rocket_launch', category: 'Official', description: 'Hero oficial de cuentas fondeadas', sourceTemplate: 2, defaultContent: { ibPhrase: '', ctaText: 'Comenzar ahora', ctaUrl: '' } },
    { id: 'prop_about', name: 'PropFirm: Definición', icon: 'info', category: 'Official', description: '¿Qué es PropTrading? Explicación fija', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_matrix_forex', name: 'PropFirm: Forex Matrix', icon: 'grid_view', category: 'Official', description: 'Tabla comparativa de retos Forex', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_matrix_synthetic', name: 'PropFirm: Synthetic Matrix', icon: 'grid_view', category: 'Official', description: 'Tabla comparativa de retos Sintéticos', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_workflow', name: 'PropFirm: Proceso', icon: 'stepper', category: 'Official', description: '4 pasos del flujo de PropTrading', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_rules', name: 'PropFirm: Reglas Clave', icon: 'gavel', category: 'Official', description: '8 reglas operativas oficiales', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_benefits', name: 'PropFirm: Beneficios', icon: 'verified', category: 'Official', description: 'Certificación del trader y ventajas', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_community', name: 'PropFirm: Comunidad', icon: 'groups', category: 'Official', description: 'Sección editable para IB', sourceTemplate: 2, defaultContent: { communityName: '', communityMessage: '', photoUrl: '', ctaText: 'Únete ahora', ctaUrl: '' } },
    { id: 'prop_faq', name: 'PropFirm: FAQ', icon: 'quiz', category: 'Official', description: '8 FAQs oficiales de PropTrading', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_final_cta', name: 'PropFirm: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre motivacional para cuenta fondeada', sourceTemplate: 2, defaultContent: { ctaText: 'Obtener cuenta fondeada', ctaUrl: '' } },
    { id: 'prop_registration', name: 'PropFirm: Registro', icon: 'person_add', category: 'Official', description: 'Formulario de registro integrado', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_footer', name: 'PropFirm: Pie de página', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página con atribución IB', sourceTemplate: 2, defaultContent: {} },

    // Blueprints para MAM/Copy (Blueprint 3)
    { id: 'mc_hero', name: 'MAM/Copy: Hero Dual', icon: 'rocket_launch', category: 'Official', description: 'Hero dual para MAM y Copy Trading', sourceTemplate: 3, defaultContent: { ibPhrase: '', ctaText: 'Comenzar ahora', ctaUrl: '' } },
    { id: 'mc_tabs_nav', name: 'MAM/Copy: Navegación', icon: 'tabs', category: 'Official', description: 'Selector de producto MAM/Copy', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_intro', name: 'MAM/Copy: Introducción', icon: 'info', category: 'Official', description: 'Introducción a ambos productos', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_mam_block', name: 'MAM/Copy: Bloque MAM', icon: 'account_balance', category: 'Official', description: 'Explicación técnica del sistema MAM', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_copy_block', name: 'MAM/Copy: Bloque Copy', icon: 'content_copy', category: 'Official', description: 'Explicación técnica de Copy Trading', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_comparison', name: 'MAM/Copy: Comparación', icon: 'compare', category: 'Official', description: 'Tabla comparativa lado a lado', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_benefits', name: 'MAM/Copy: Beneficios', icon: 'verified', category: 'Official', description: 'Beneficios de cada producto', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_steps', name: 'MAM/Copy: Pasos Inicio', icon: 'stepper', category: 'Official', description: 'Pasos de registro para ambos productos', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_faq', name: 'MAM/Copy: FAQ Dual', icon: 'quiz', category: 'Official', description: 'Preguntas frecuentes para ambos productos', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_registration', name: 'MAM/Copy: Registro', icon: 'person_add', category: 'Official', description: 'Formulario de registro integrado', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_final_cta', name: 'MAM/Copy: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre motivacional combinado', sourceTemplate: 3, defaultContent: { ctaText: 'Empezar a copiar', ctaUrl: '' } },
    { id: 'mc_footer', name: 'MAM/Copy: Pie de página', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página con atribución IB', sourceTemplate: 3, defaultContent: {} },

    // Blueprints para Pro Leverage X12 (Blueprint 4)
    { id: 'lx12_hero', name: 'X12: Hero', icon: 'rocket_launch', category: 'Official', description: 'Hero para apalancamiento x12', sourceTemplate: 4, defaultContent: { ibPhrase: '', ctaText: 'Obtener cuenta X12', ctaUrl: '' } },
    { id: 'lx12_intro', name: 'X12: Definición', icon: 'info', category: 'Official', description: '¿Qué es Pro Leverage x12?', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_pricing', name: 'X12: Precios', icon: 'payments', category: 'Official', description: 'Tabla de precios de cuentas', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_example', name: 'X12: Ejemplo x12', icon: 'analytics', category: 'Official', description: 'Ejemplo práctico de trading x12', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_rules', name: 'X12: Reglas', icon: 'gavel', category: 'Official', description: 'Reglas clave y condiciones', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_withdrawals', name: 'X12: Retiros', icon: 'account_balance_wallet', category: 'Official', description: 'Reglas de retiro y horarios', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_benefits', name: 'X12: Beneficios', icon: 'verified', category: 'Official', description: 'Ventajas y beneficios para IB', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_community', name: 'X12: Comunidad IB', icon: 'groups', category: 'Official', description: 'Sección editable de comunidad IB', sourceTemplate: 4, defaultContent: { communityName: '', communityMessage: '', photoUrl: '', ctaText: 'Habla conmigo', ctaUrl: '' } },
    { id: 'lx12_faq', name: 'X12: FAQ', icon: 'quiz', category: 'Official', description: 'Preguntas frecuentes', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_final_cta', name: 'X12: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre motivacional para x12', sourceTemplate: 4, defaultContent: { ctaText: 'Comprar mi cuenta X12', ctaUrl: '' } },

    // Blueprints para Institucional (Blueprint 5)
    { id: 'inst_hero', name: 'Inst: Hero', icon: 'rocket_launch', category: 'Official', description: 'Hero corporativo principal', sourceTemplate: 5, defaultContent: { ibPhrase: '', ctaText: 'Abrir cuenta', ctaUrl: '' } },
    { id: 'inst_about', name: 'Inst: Sobre Nosotros', icon: 'info', category: 'Official', description: '¿Quién es Bridge Markets?', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_why', name: 'Inst: Por qué BM', icon: 'verified', category: 'Official', description: 'Diferenciadores clave', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_ecosystem', name: 'Inst: Ecosistema', icon: 'hub', category: 'Official', description: 'Vista general de todos los productos', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_selector', name: 'Inst: Perfil', icon: 'person_search', category: 'Official', description: 'Selector de perfil de inversor', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_partners', name: 'Inst: Partners IB', icon: 'handshake', category: 'Official', description: 'Beneficios del programa de partners', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_tech', name: 'Inst: Tecnología', icon: 'memory', category: 'Official', description: 'Stack tecnológico e infraestructura', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_workflow', name: 'Inst: Comenzar', icon: 'stepper', category: 'Official', description: 'Pasos del flujo de bienvenida', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_community', name: 'Inst: Comunidad IB', icon: 'groups', category: 'Official', description: 'Sección editable para IB', sourceTemplate: 5, defaultContent: { communityName: '', communityMessage: '', photoUrl: '', ctaText: 'Habla con soporte', ctaUrl: '' } },
    { id: 'inst_faq', name: 'Inst: FAQ', icon: 'quiz', category: 'Official', description: 'Preguntas frecuentes corporativas', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_final_cta', name: 'Inst: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre motivacional corporativo', sourceTemplate: 5, defaultContent: { ctaText: 'Registrarme ahora', ctaUrl: '' } },
    { id: 'inst_footer', name: 'Inst: Pie de página', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página corporativo', sourceTemplate: 5, defaultContent: {} },

    // Blueprints para Synthetic Universe (Blueprint 6)
    { id: 'snu_hero', name: 'SNU: Hero', icon: 'rocket_launch', category: 'Official', description: 'Hero con display degradado y emblema BM', sourceTemplate: 6, defaultContent: { ibPhrase: '', ctaText: 'Unirse al Universo', ctaUrl: '' } },
    { id: 'snu_metrics', name: 'SNU: Métricas', icon: 'analytics', category: 'Official', description: 'Tarjetas de impacto con contadores', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_universes_intro', name: 'SNU: Los 3 Ecosistemas', icon: 'hub', category: 'Official', description: 'Intro visual de los 3 brokers', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_u1_bm', name: 'SNU: 1. Índices Propios', icon: 'grid_view', category: 'Official', description: 'Display de familias BM', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_u2_deriv', name: 'SNU: 2. Mercados Deriv', icon: 'grid_view', category: 'Official', description: 'Tabla de equivalencias Deriv', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_u3_welt', name: 'SNU: 3. Mercados Weltrade', icon: 'grid_view', category: 'Official', description: 'Tabla de mercados Weltrade', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_why', name: 'SNU: Por qué BM', icon: 'verified', category: 'Official', description: '8 argumentos competitivos', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_workflow', name: 'SNU: Cómo Empezar', icon: 'stepper', category: 'Official', description: 'Flujo de 7 pasos', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_community', name: 'SNU: Comunidad IB', icon: 'groups', category: 'Official', description: 'Sección editable de comunidad', sourceTemplate: 6, defaultContent: { communityName: '', communityMessage: '', photoUrl: '', ctaText: 'Entrar al grupo', ctaUrl: '' } },
    { id: 'snu_faq', name: 'SNU: FAQ', icon: 'quiz', category: 'Official', description: 'FAQs oficiales de SNU', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_cta', name: 'SNU: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre motivacional SNU', sourceTemplate: 6, defaultContent: { ctaText: 'Empezar ahora', ctaUrl: '' } },
    { id: 'snu_footer', name: 'SNU: Pie de página', icon: 'bottom_panel_open', category: 'Official', description: 'Pie corporativo con atribución IB', sourceTemplate: 6, defaultContent: {} },

    // Blueprints para Índices Sintéticos (Blueprint 8)
    { id: 'sp_hero', name: 'SP: Hero Oficial', icon: 'rocket_launch', category: 'Official', description: 'Hero institucional de sintéticos', sourceTemplate: 8, defaultContent: { 
        communityName: '',
        ibPhrase: '', 
        ctaText: 'Abrir mi cuenta', 
        ctaUrl: '' 
    } },
    { id: 'sp_about', name: 'SP: Definición', icon: 'info', category: 'Official', description: '¿Qué son los índices sintéticos?', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_advantages', name: 'SP: Ventajas', icon: 'check_circle', category: 'Official', description: '6 tarjetas de ventajas oficiales', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_families', name: 'SP: Familias', icon: 'category', category: 'Official', description: 'Las 4 familias de índices BM', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_workflow', name: 'SP: Cómo Operar', icon: 'stepper', category: 'Official', description: '5 pasos de metodología', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_tech_specs', name: 'SP: Especificaciones', icon: 'analytics', category: 'Official', description: 'Tabla técnica de spreads y lotajes', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_activation', name: 'SP: Plataformas', icon: 'download', category: 'Official', description: '6 pasos para empezar y MT5', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_community', name: 'SP: Comunidad IB', icon: 'groups', category: 'Official', description: 'Sección editable del IB', sourceTemplate: 8, defaultContent: {
        communityName: '',
        communityMessage: 'Únete a nuestra comunidad de traders sintéticos.',
        photoUrl: '',
        ctaText: 'Habla con un asesor',
        ctaUrl: '',
        whatsapp: '',
        telegram: '',
        instagram: '',
        tiktok: '',
        youtube: ''
    } },
    { id: 'sp_faq', name: 'SP: FAQ', icon: 'quiz', category: 'Official', description: 'Preguntas oficiales del producto', sourceTemplate: 8, defaultContent: {} },
    { id: 'sp_final_cta', name: 'SP: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre motivacional', sourceTemplate: 8, defaultContent: { 
        ctaText: 'Abrir cuenta ahora', 
        ctaUrl: '',
        secondaryCtaText: 'Ver gráficos en vivo',
        secondaryCtaUrl: 'https://charts.bridgemarkets.global'
    } },
    { id: 'sp_footer', name: 'SP: Footer', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página corporativo', sourceTemplate: 8, defaultContent: {
        ibName: '',
        supportContact: ''
    } },
    { id: 've_header', name: 'Evento VIP: Navegación', icon: 'menu', category: 'Official', description: 'Barra de navegación translúcida oficial del evento', sourceTemplate: 9, defaultContent: {} },
    { id: 've_hero', name: 'Evento VIP: Hero', icon: 'rocket_launch', category: 'Official', description: 'Hero con piezas de ajedrez cromadas y detalles del evento', sourceTemplate: 9, defaultContent: { tag: 'Muy pronto - gran evento', title: 'La nueva era del trading comienza aquí', date: '18 de Julio, 2026 - 19:00 hrs', location: 'Hotel Royal Financial Center – Bogotá, Colombia', ctaText: 'Ver reto', ctaUrl: '' } },
    { id: 've_metrics', name: 'Evento VIP: Métricas', icon: 'analytics', category: 'Official', description: 'Fila de métricas clave con fondo de cristal', sourceTemplate: 9, defaultContent: {} },
    { id: 've_countdown', name: 'Evento VIP: Temporizador', icon: 'timer', category: 'Official', description: 'Contador regresivo con llamada a la acción', sourceTemplate: 9, defaultContent: { countdownTarget: '2026-07-18T19:00:00', ctaText: 'VER ETAPAS DEL EVENTO', ctaUrl: '' } },
    { id: 've_split_info', name: 'Evento VIP: Información Dual', icon: 'grid_view', category: 'Official', description: 'Dos columnas simétricas de información', sourceTemplate: 9, defaultContent: { titleLeft: 'TÍTULO SECCIÓN', subtitleLeft: 'Lorem Ipsum is simply dummy text', textLeft: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', btnLeftText: 'VER MÁS INFORMACIÓN', titleRight: 'TÍTULO SECCIÓN', subtitleRight: 'Lorem Ipsum is simply dummy text', textRight: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.', btnRightText: 'VER MÁS INFORMACIÓN' } },
    { id: 've_video', name: 'Evento VIP: Vídeo Promocional', icon: 'video_library', category: 'Official', description: 'Card de vídeo interactivo con cintas diagonales de fondo', sourceTemplate: 9, defaultContent: { videoTitle: 'FALTAN POCOS DÍAS', videoDesc: 'Descubre todo lo que debes saber para el gran evento de Bridge Markets', videoUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ' } },
    { id: 've_details', name: 'Evento VIP: Detalles y Dress Code', icon: 'event', category: 'Official', description: 'Grid de 3 tarjetas de datos y banner de código de vestimenta', sourceTemplate: 9, defaultContent: { date: 'Miércoles, 22 de octubre de 2025', time: '19:00 Horas, registro desde las 18 Horas', place: 'Hotel Bogotá Plaza - Cra 18A #100-41, Bogotá' } },
    { id: 've_registration', name: 'Evento VIP: Registro', icon: 'person_add', category: 'Official', description: 'Formulario de registro premium', sourceTemplate: 9, defaultContent: {} },
    { id: 've_footer', name: 'Evento VIP: Pie de Página', icon: 'bottom_panel_open', category: 'Official', description: 'Footer con logotipos y redes sociales', sourceTemplate: 9, defaultContent: {} }
];
