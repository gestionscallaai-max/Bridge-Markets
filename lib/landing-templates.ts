import { LandingTemplate } from './landing/types';
export type { LandingTemplate };

export const LANDING_TEMPLATES: LandingTemplate[] = [
    {
        id: 'prop_official_v3',
        name: 'Bridge Markets PropFirm — FOREX/CFDs & Synthetic PropTrading',
        category: 'Official',
        description: 'La landing oficial para cuentas fondeadas. Incluye todas las tablas comparativas, reglas operativas y sección de comunidad personalizada.',
        sourceFile: 'Blueprint 2',
        sections: [
            'prop_hero',
            'prop_about',
            'prop_matrix_forex',
            'prop_matrix_synthetic',
            'prop_workflow',
            'prop_rules',
            'prop_benefits',
            'prop_community',
            'prop_faq',
            'prop_final_cta',
            'prop_registration',
            'prop_footer'
        ],
        gradient: 'linear-gradient(135deg, #050505 0%, #1a1a1a 50%, #D4AF37 100%)',
        accentColor: '#D4AF37',
        badge: 'Premium',
        badgeColor: '#D4AF37',
        theme: 'dark'
    },
    {
        id: 'unified_copy_mam_template',
        name: 'Cuentas MAM y Copy Trading — Bridge Markets | Para uso de IBs',
        category: 'Official',
        description: 'Hub unificado para gestión de capital MAM y sistema de Copy Trading con tablas comparativas y registro.',
        sourceFile: 'Blueprint 3',
        sections: [
            'mc_hero', 
            'mc_tabs_nav', 
            'mc_intro', 
            'mc_mam_block', 
            'mc_copy_block', 
            'mc_comparison', 
            'mc_benefits', 
            'mc_steps', 
            'mc_faq', 
            'mc_registration',
            'mc_final_cta', 
            'mc_footer'
        ],
        gradient: 'linear-gradient(135deg, #050505 0%, #0c1a33 50%, #10b981 100%)',
        accentColor: '#3b82f6',
        badge: 'Hub',
        badgeColor: '#3b82f6',
        theme: 'dark',
    },
    {
        id: 'pro_leverage_x12',
        name: 'Cuentas Apalancadas PRO LEVERAGE X12 — Bridge Markets | Para uso de IBs',
        category: 'Official',
        description: 'Multiplica tu capital hasta x12 y opera directamente en mercados CFDs sin fases de evaluación.',
        sourceFile: 'Blueprint 4',
        sections: [
            'lx12_hero', 
            'lx12_intro', 
            'lx12_pricing', 
            'lx12_example', 
            'lx12_rules', 
            'lx12_withdrawals', 
            'lx12_benefits', 
            'lx12_community', 
            'lx12_faq', 
            'lx12_final_cta',
            'mc_footer'
        ],
        gradient: 'linear-gradient(135deg, #0c0015 0%, #1a0a33 50%, #3b0d99 100%)',
        accentColor: '#c084fc',
        badge: 'Official',
        badgeColor: '#c084fc',
        theme: 'dark',
    },
    {
        id: 'institutional_mother',
        name: 'Bridge Markets — Landing Institucional del Broker | Para uso de IBs',
        category: 'Official',
        description: 'La landing principal corporativa de Bridge Markets con todos los servicios integrados.',
        sourceFile: 'Blueprint 5',
        sections: [
            'inst_hero', 
            'inst_about', 
            'inst_why', 
            'inst_ecosystem', 
            'inst_selector', 
            'inst_partners', 
            'inst_tech', 
            'inst_workflow', 
            'inst_community', 
            'inst_faq', 
            'inst_final_cta', 
            'inst_footer'
        ],
        gradient: 'linear-gradient(135deg, #080411 0%, #0f172a 50%, #1e293b 100%)',
        accentColor: '#6366f1',
        badge: 'Corporate',
        badgeColor: '#6366f1',
        theme: 'dark',
    },
    {
        id: 'synthetic_universe_total',
        name: 'Universo Total de Sintéticos — Bridge Markets | Para uso de IBs',
        category: 'Official',
        description: 'Landing premium que muestra el ecosistema completo: Deriv + Weltrade + Bridge Markets.',
        sourceFile: 'Blueprint 6',
        sections: [
            'snu_hero', 
            'snu_metrics', 
            'snu_universes_intro', 
            'snu_u1_bm', 
            'snu_u2_deriv', 
            'snu_u3_welt', 
            'snu_why', 
            'snu_workflow', 
            'snu_community', 
            'snu_faq', 
            'snu_cta', 
            'snu_footer'
        ],
        gradient: 'linear-gradient(135deg, #0a0614 0%, #2d1070 40%, #865BFF 100%)',
        accentColor: '#865BFF',
        badge: 'Premium',
        badgeColor: '#865BFF',
        theme: 'dark',
    },
    {
        id: 'bridge_v3_premium',
        name: 'Índices Sintéticos PRO V3 (FINAL)',
        category: 'Official',
        description: 'La landing oficial definitiva de Bridge Markets. Diseño premium con elementos 3D y contenido institucional.',
        sourceFile: 'Blueprint V3',
        sections: [
            'v3_header',
            'v3_hero',
            'v3_features',
            'inst_about',
            'inst_ecosystem',
            'inst_tech',
            'inst_workflow',
            'v3_community',
            'inst_faq',
            'v3_footer'
        ],
        gradient: 'linear-gradient(135deg, #050505 0%, #0c0027 50%, #865BFF 100%)',
        accentColor: '#865BFF',
        badge: 'Premium',
        badgeColor: '#865BFF',
        theme: 'dark',
    },
    {
        id: 'synthetic_product_official',
        name: 'Índices Sintéticos — Bridge Markets | Para uso de IBs',
        category: 'Official',
        description: 'La landing oficial definitiva de Bridge Markets para Índices Sintéticos (Fortune, Vortex, BullX/BearX, FomoX).',
        sourceFile: 'Blueprint 8',
        sections: [
            'sp_hero',
            'sp_about',
            'sp_advantages',
            'sp_families',
            'sp_workflow',
            'sp_tech_specs',
            'sp_activation',
            'sp_community',
            'sp_faq',
            'sp_final_cta',
            'sp_footer'
        ],
        gradient: 'linear-gradient(135deg, #000000 0%, #050515 50%, #4f46e5 100%)',
        accentColor: '#6366f1',
        badge: 'Official',
        badgeColor: '#6366f1',
        theme: 'dark',
    }
];

// Helper: get template by ID
export function getTemplateById(id: string): LandingTemplate | undefined {
    return LANDING_TEMPLATES.find(t => t.id === id);
}

// Helper: get templates by category
export function getTemplatesByCategory(category: string): LandingTemplate[] {
    return LANDING_TEMPLATES.filter(t => t.category === category);
}

// Helper: get all unique categories
export function getTemplateCategories(): string[] {
    return Array.from(new Set(LANDING_TEMPLATES.map(t => t.category)));
}
