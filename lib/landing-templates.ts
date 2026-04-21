// ─────────────────────────────────────────────────────────────
// Landing Templates — 14 presets from bocetos
// Each template is a predefined combination of sections
// ─────────────────────────────────────────────────────────────

export interface LandingTemplate {
    id: string;
    name: string;
    category: string;
    description: string;
    sourceFile: string;
    sections: string[];  // Array of section IDs from landing-sections.ts
    gradient: string;    // For UI card display
    accentColor: string;
    badge: string | null;
    badgeColor: string;
    theme?: 'light' | 'dark';
}

export const LANDING_TEMPLATES: LandingTemplate[] = [
    {
        id: 'synthetic_edu',
        name: 'Índices Sintéticos Pro V3 (Final)',
        category: 'Official',
        description: 'La landing oficial y definitiva de Bridge Markets para Índices Sintéticos. Diseño premium y corporativo con elementos 3D.',
        sourceFile: 'Blueprint 1',
        sections: ['snt_hero', 'snt_about', 'snt_advantages', 'snt_families', 'snt_workflow', 'snt_specs', 'snt_platforms', 'snt_community', 'snt_faq', 'snt_cta', 'snt_footer'],
        gradient: 'linear-gradient(135deg, #0A051A 0%, #1a0545 50%, #7c3aed 100%)',
        accentColor: '#8b5cf6',
        badge: 'Premium',
        badgeColor: '#8b5cf6',
        theme: 'dark'
    },
    {
        id: 'unified_copy_mam',
        name: 'MAM & Copy Trading (Unificada)',
        category: 'Official',
        description: 'Landing dual que explica tanto el sistema MAM como el Copy Trading con tablas comparativas.',
        sourceFile: 'Blueprint 3',
        sections: [
            'mc_hero', 
            'mc_intro', 
            'mc_mam_block', 
            'mc_copy_block', 
            'mc_comparison', 
            'mc_benefits', 
            'mc_dual_steps', 
            'mc_community', 
            'mc_faq', 
            'mc_final_cta', 
            'mc_footer'
        ],
        gradient: 'linear-gradient(135deg, #0f081d 0%, #2a1b4d 50%, #6635de 100%)',
        accentColor: '#a78bfa',
        badge: 'Hot',
        badgeColor: '#ef4444',
        theme: 'light',
    },
    {
        id: 'pro_leverage_x12',
        name: 'Pro Leverage X12',
        category: 'Official',
        description: 'Especializada en cuentas con apalancamiento x12 sin evaluación. Sin límites de tiempo.',
        sourceFile: 'Blueprint 4',
        sections: [
            'lx12_hero', 
            'lx12_intro', 
            'lx12_table_compare', 
            'lx12_pricing', 
            'lx12_example', 
            'lx12_rules', 
            'lx12_withdrawals', 
            'lx12_benefits', 
            'lx12_community', 
            'lx12_faq', 
            'lx12_final_cta'
        ],
        gradient: 'linear-gradient(135deg, #0c0015 0%, #1a0a33 50%, #3b0d99 100%)',
        accentColor: '#c084fc',
        badge: 'Official',
        badgeColor: '#10b981',
        theme: 'dark',
    },
    {
        id: 'institutional_mother',
        name: 'Landing Institucional (Madre)',
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
        name: 'Universo Total de Sintéticos',
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
        id: 'propfirm_sinteticos_premium',
        name: 'PropFirm - Sintéticos (Premium)',
        category: 'Official',
        description: 'Diseño ultra-premium optimizado para retos de fondeo en índices sintéticos. Alta conversión y estética Cyber Purple.',
        sourceFile: 'Blueprint 7',
        sections: [
            'ps_hero',
            'ps_banner',
            'ps_features',
            'ps_matrix',
            'ps_calculator',
            'ps_rules',
            'ps_contact',
            'ps_footer'
        ],
        gradient: 'linear-gradient(135deg, #050112 0%, #0c0027 50%, #865BFF 100%)',
        accentColor: '#865BFF',
        badge: 'New',
        badgeColor: '#865BFF',
        theme: 'dark',
    },
    {
        id: 'bridge_v3_premium',
        name: 'Bridge V3 Premium (Oficial)',
        category: 'Official',
        description: 'La experiencia definitiva de Bridge Markets. Diseño oficial V3 con estética de vanguardia, 3D y máxima conversión.',
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
        gradient: 'linear-gradient(135deg, #F8FAFC 0%, #E5D8FF 50%, #AA9AFF 100%)',
        accentColor: '#865BFF',
        badge: 'Official V3',
        badgeColor: '#865BFF',
        theme: 'light',
    },
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
