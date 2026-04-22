import { SectionMeta } from './types';

export const SECTION_CATEGORIES = ['Official', 'Community', 'Utility', 'Marketing'];

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
];
