import { LandingProduct } from './types';

export const SECTION_CATEGORIES: Record<string, { label: string, icon: string }> = {
    'Official': { label: 'Oficiales', icon: 'verified' },
    'Custom': { label: 'Personalizados', icon: 'edit' },
    'Promotion': { label: 'Promocionales', icon: 'campaign' }
};

export const SECTION_CATALOG: LandingProduct[] = [
    // ─── PROPFIRM (Blueprint 2) ──────────────────────────
    { id: 'prop_hero', name: 'PropFirm: Hero', icon: 'rocket_launch', category: 'Official', description: 'Hero oficial de cuentas fondeadas', sourceTemplate: 2, defaultContent: { ctaText: 'Empieza tu Challenge' } },
    { id: 'prop_about', name: 'PropFirm: Definición', icon: 'school', category: 'Official', description: '¿Qué es PropTrading? Explicación fija', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_matrix_forex', name: 'Programas Forex', icon: 'grid_view', category: 'Official', description: 'Tabla de programas de fondeo Forex.', sourceTemplate: 2, defaultContent: { ctaObsidianText: 'Comprar OBSIDIAN', ctaBasaltText: 'Comprar BASALT' } },
    { id: 'prop_matrix_synthetic', name: 'Programas Sintéticos', icon: 'rebase', category: 'Official', description: 'Tabla de programas de fondeo Sintéticos.', sourceTemplate: 2, defaultContent: { ctaEliteText: 'Comprar ELITE', ctaUltraText: 'Comprar ULTRA' } },
    { id: 'prop_workflow', name: 'PropFirm: Proceso', icon: 'reorder', category: 'Official', description: '4 pasos del flujo de PropTrading', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_rules', name: 'PropFirm: Reglas Clave', icon: 'gavel', category: 'Official', description: '8 reglas operativas oficiales', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_benefits', name: 'PropFirm: Beneficios', icon: 'military_tech', category: 'Official', description: 'Certificación del trader y ventajas', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_community', name: 'PropFirm: Comunidad', icon: 'groups', category: 'Official', description: 'Sección 100% editable por el IB', sourceTemplate: 2, defaultContent: { 
        welcomeMsg: 'Únete a un entorno diseñado para el crecimiento mutuo. Aquí no solo operamos, sino que construimos el futuro del trading institucional juntos.', 
        photoUrl: 'https://images.unsplash.com/photo-1611974717482-aa8a29910609?auto=format&fit=crop&q=80',
        socialWhatsApp: '',
        socialTelegram: '',
        socialInstagram: '',
        socialYouTube: ''
    } },
    { id: 'prop_faq', name: 'PropFirm: FAQ', icon: 'quiz', category: 'Official', description: 'Dudas resueltas sobre fondeo.', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_final_cta', name: 'PropFirm: CTA Final', icon: 'ads_click', category: 'Official', description: 'Botones de compra de cierre', sourceTemplate: 2, defaultContent: { ctaObsidianText: 'Quiero OBSIDIAN', ctaBasaltText: 'Quiero BASALT', ctaEliteText: 'Quiero ELITE', ctaUltraText: 'Quiero ULTRA' } },
    { id: 'prop_registration', name: 'PropFirm: Registro', icon: 'app_registration', category: 'Official', description: 'Captura de leads institucional', sourceTemplate: 2, defaultContent: {} },
    { id: 'prop_footer', name: 'PropFirm: Footer', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página con branding Bridge Markets', sourceTemplate: 2, defaultContent: {} },

    // ─── MAM & COPY (Blueprint 3) ────────────────────────
    { id: 'mc_hero', name: 'MAM & Copy: Hero', icon: 'hub', category: 'Official', description: 'Hero dual para MAM y Copy Trading', sourceTemplate: 3, defaultContent: { ibPhrase: '', ctaMamText: 'Quiero una cuenta MAM', ctaCopyText: 'Quiero hacer Copy Trading' } },
    { id: 'mc_tabs_nav', name: 'MAM & Copy: Navegación', icon: 'tab', category: 'Official', description: 'Selector de pestañas fijo', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_intro', name: 'MAM & Copy: Intro', icon: 'info', category: 'Official', description: 'Introducción unificada fija', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_mam_block', name: 'Bloque: Cuentas MAM', icon: 'account_balance_wallet', category: 'Official', description: 'Detalles técnicos fijos de MAM', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_copy_block', name: 'Bloque: Copy Trading', icon: 'content_copy', category: 'Official', description: 'Detalles técnicos fijos de Copy', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_comparison', name: 'MAM vs Copy: Tabla', icon: 'compare', category: 'Official', description: 'Tabla comparativa fija', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_benefits', name: 'MAM & Copy: Ventajas', icon: 'award_star', category: 'Official', description: 'Beneficios generales fijos', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_steps', name: 'MAM & Copy: Proceso', icon: 'step', category: 'Official', description: 'Pasos para traders e inversores', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_faq', name: 'MAM & Copy: FAQ', icon: 'help_center', category: 'Official', description: 'Preguntas oficiales resueltas', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_registration', name: 'MAM & Copy: Registro', icon: 'how_to_reg', category: 'Official', description: 'Captura de leads dual', sourceTemplate: 3, defaultContent: {} },
    { id: 'mc_community', name: 'MAM & Copy: Comunidad', icon: 'groups', category: 'Official', description: 'Sección editable de conexión IB', sourceTemplate: 3, defaultContent: { 
        communityMessage: 'Únete a nuestro ecosistema y conecta con traders profesionales.', 
        socialWhatsApp: '',
        socialTelegram: '',
        socialInstagram: '',
        socialYouTube: '',
        ctaText: 'Únete a mi comunidad'
    } },
    { id: 'mc_final_cta', name: 'MAM & Copy: CTA Final', icon: 'touch_app', category: 'Official', description: 'Cierre con botones duales', sourceTemplate: 3, defaultContent: { ctaMamText: 'Quiero una cuenta MAM', ctaCopyText: 'Quiero hacer Copy Trading' } },
    { id: 'mc_footer', name: 'MAM & Copy: Footer', icon: 'dock', category: 'Official', description: 'Pie de página unificado', sourceTemplate: 3, defaultContent: {} },

    // ─── PRO LEVERAGE X12 (Blueprint 4) ──────────────────
    { id: 'lx12_hero', name: 'LX12: Hero', icon: 'bolt', category: 'Official', description: 'Hero potente para apalancamiento x12', sourceTemplate: 4, defaultContent: { ibPhrase: '', ctaText: 'Quiero mi cuenta apalancada' } },
    { id: 'lx12_intro', name: 'LX12: Definición', icon: 'info', category: 'Official', description: 'Explicación del producto y comparativa', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_pricing', name: 'LX12: Tamaños', icon: 'payments', category: 'Official', description: 'Selector de cuentas apalancadas', sourceTemplate: 4, defaultContent: { ctaText: 'Comprar ahora' } },
    { id: 'lx12_example', name: 'LX12: Ejemplo', icon: 'calculate', category: 'Official', description: 'Ejemplo visual de apalancamiento', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_rules', name: 'LX12: Reglas', icon: 'gavel', category: 'Official', description: 'Condiciones operativas oficiales', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_withdrawals', name: 'LX12: Retiros', icon: 'event_repeat', category: 'Official', description: 'Ventanas de retiro Día 3 / Día 45', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_benefits', name: 'LX12: Ventajas', icon: 'stars', category: 'Official', description: 'Beneficios clave del producto', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_community', name: 'LX12: Comunidad', icon: 'groups', category: 'Official', description: 'Sección editable del IB para LX12', sourceTemplate: 4, defaultContent: { 
        communityMessage: 'Únete a nuestro ecosistema de traders apalancados. Aquí operamos con capital real desde el primer día.', 
        photoUrl: '',
        socialWhatsApp: '',
        socialTelegram: '',
        socialInstagram: '',
        socialYouTube: '',
        supportLabel: 'Soporte del IB',
        ctaText: 'Habla con un asesor'
    } },
    { id: 'lx12_faq', name: 'LX12: FAQ', icon: 'quiz', category: 'Official', description: 'Preguntas frecuentes de apalancamiento', sourceTemplate: 4, defaultContent: {} },
    { id: 'lx12_final_cta', name: 'LX12: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre con botones de compra', sourceTemplate: 4, defaultContent: { ctaText: 'Activar mi cuenta X12' } },
    { id: 'lx12_footer', name: 'LX12: Footer', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página temático LX12', sourceTemplate: 4, defaultContent: {} },

    // ─── INSTITUTIONAL (Blueprint 5) ─────────────────────
    { id: 'inst_hero', name: 'Inst: Hero', icon: 'account_balance', category: 'Official', description: 'Hero institucional asimétrico y potente', sourceTemplate: 5, defaultContent: { ibPhrase: '', ctaMainText: 'Abrir mi cuenta', ctaSecondaryText: 'Ver todos los productos' } },
    { id: 'inst_about', name: 'Inst: Quiénes Somos', icon: 'history_edu', category: 'Official', description: 'Trayectoria e historia corporativa fija', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_why', name: 'Inst: Por Qué BM', icon: 'verified', category: 'Official', description: 'Ventajas competitivas institucionales fijas', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_ecosystem', name: 'Inst: Ecosistema', icon: 'dashboard', category: 'Official', description: 'Bento grid de productos y tabla técnica', sourceTemplate: 5, defaultContent: {
        ctaPropText: 'Ver PropFirm',
        ctaSynText: 'Ver Sintéticos',
        ctaX12Text: 'Ver Cuentas Leverage',
        ctaMamText: 'Ver Cuentas MAM',
        ctaCopyText: 'Ver Copy Trading',
        ctaForexText: 'Ver Cuentas Forex'
    } },
    { id: 'inst_selector', name: 'Inst: Perfil', icon: 'groups', category: 'Official', description: 'Selector Trader vs Inversor', sourceTemplate: 5, defaultContent: {
        ctaTraderText: 'Acceso Directo',
        ctaInvestorText: 'Ver Estrategias'
    } },
    { id: 'inst_partners', name: 'Inst: Socios IB', icon: 'handshake', category: 'Official', description: 'Información del programa de socios', sourceTemplate: 5, defaultContent: { ctaText: 'Unirme al Programa' } },
    { id: 'inst_tech', name: 'Inst: Tecnología', icon: 'memory', category: 'Official', description: 'Cards de tecnología MT5 y charts', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_workflow', name: 'Inst: Onboarding', icon: 'format_list_numbered', category: 'Official', description: 'Flujo de 7 pasos para empezar', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_community', name: 'Inst: Comunidad', icon: 'groups', category: 'Official', description: 'Sección editable del IB para Institucional', sourceTemplate: 5, defaultContent: { 
        communityMessage: 'Únete a nuestro ecosistema global y conecta con la tecnología institucional.', 
        photoUrl: '',
        socialWhatsApp: '',
        socialTelegram: '',
        socialInstagram: '',
        socialYouTube: '',
        supportLabel: 'Soporte del IB',
        ctaText: 'Habla con un asesor'
    } },
    { id: 'inst_faq', name: 'Inst: FAQ', icon: 'contact_support', category: 'Official', description: 'Consultas corporativas oficiales', sourceTemplate: 5, defaultContent: {} },
    { id: 'inst_final_cta', name: 'Inst: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre institucional multi-perfil', sourceTemplate: 5, defaultContent: {
        ctaRegisterText: 'Abrir Cuenta Real',
        ctaProductsText: 'Explorar Productos',
        ctaIBText: 'Quiero ser IB'
    } },
    { id: 'inst_footer', name: 'Inst: Footer', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página corporativo Bridge Markets', sourceTemplate: 5, defaultContent: {} },

    // ─── SYNTHETIC UNIVERSE (Blueprint 6) ─────────────────
    { id: 'snu_hero', name: 'SNU: Hero Universo', icon: 'public', category: 'Official', description: 'Hero con estética de universo y espacio', sourceTemplate: 6, defaultContent: { ibPhrase: '', ctaText: 'Abrir mi cuenta' } },
    { id: 'snu_value', name: 'SNU: Propuesta Valor', icon: 'analytics', category: 'Official', description: 'Números de impacto: 100+, 3, 24/7, 1', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_universes', name: 'SNU: 3 Universos', icon: 'category', category: 'Official', description: 'Introducción a los 3 universos de índices', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_unv_bm', name: 'SNU: Universo 1 (Propios)', icon: 'stars', category: 'Official', description: 'Índices propios BM (Fortune, Vortex...)', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_unv_deriv', name: 'SNU: Universo 2 (Deriv)', icon: 'waves', category: 'Official', description: 'Equivalencias de mercados Deriv en BM', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_unv_weltrade', name: 'SNU: Universo 3 (Weltrade)', icon: 'trending_up', category: 'Official', description: 'Equivalencias de mercados Weltrade en BM', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_why', name: 'SNU: Por Qué BM', icon: 'fact_check', category: 'Official', description: 'Argumentos competitivos sintéticos', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_workflow', name: 'SNU: Cómo Empezar', icon: 'rocket_launch', category: 'Official', description: '7 pasos para operar todos los sintéticos', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_community', name: 'SNU: Comunidad IB', icon: 'groups', category: 'Official', description: 'Sección editable del IB para Sintéticos', sourceTemplate: 6, defaultContent: {
        communityName: '',
        communityMessage: 'Únete a nuestra comunidad de traders sintéticos y opera con tecnología institucional.',
        photoUrl: '',
        socialWhatsApp: '',
        socialTelegram: '',
        socialInstagram: '',
        socialYouTube: '',
        socialTikTok: '',
        supportLabel: 'Soporte del IB',
        ctaText: 'Habla con un asesor'
    } },
    { id: 'snu_faq', name: 'SNU: FAQ', icon: 'quiz', category: 'Official', description: 'Preguntas oficiales sobre ecosistema sintético', sourceTemplate: 6, defaultContent: {} },
    { id: 'snu_final_cta', name: 'SNU: CTA Final', icon: 'ads_click', category: 'Official', description: 'Cierre con argumento de cuenta única', sourceTemplate: 6, defaultContent: { 
        ctaMainText: 'Abrir mi cuenta ahora',
        ctaSecondaryText: 'Ver gráficos en vivo'
    } },
    { id: 'snu_footer', name: 'SNU: Footer', icon: 'bottom_panel_open', category: 'Official', description: 'Footer sintético con disclaimer legal', sourceTemplate: 6, defaultContent: { ibSupportLabel: '' } },

    // ─── V3 PREMIUM (Blueprint V3) ────────────────────────
    { id: 'v3_header', name: 'V3 Header Minimal', icon: 'horizontal_rule', category: 'Official', description: 'Navegación superior minimalista V3.', sourceTemplate: 7, defaultContent: {} },
    { id: 'v3_hero', name: 'V3 Hero 3D', icon: 'view_in_ar', category: 'Official', description: 'Hero premium con elementos 3D.', sourceTemplate: 7, defaultContent: {} },
    { id: 'v3_features', name: 'V3 Características', icon: 'featured_play_list', category: 'Official', description: 'Grid de características premium.', sourceTemplate: 7, defaultContent: {} },
    { id: 'v3_community', name: 'V3 Comunidad', icon: 'hub', category: 'Official', description: 'Acceso exclusivo comunidad V3.', sourceTemplate: 7, defaultContent: {} },
    { id: 'v3_footer', name: 'V3 Footer Corporativo', icon: 'bottom_panel_open', category: 'Official', description: 'Pie de página premium.', sourceTemplate: 7, defaultContent: {} },
];
