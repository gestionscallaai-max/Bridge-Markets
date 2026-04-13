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
}

export const LANDING_TEMPLATES: LandingTemplate[] = [
    {
        id: 'pro_trading_v1',
        name: 'Pro Trading v1',
        category: 'Standard',
        description: 'Landing completa con hero oscuro, leaderboard de traders, analytics y calculadora de rendimiento.',
        sourceFile: 'Landing 1.html',
        sections: ['hero_dark', 'leaderboard', 'feature_split', 'risk_grid', 'security_fees', 'stats_row', 'workflow_steps', 'calculator'],
        gradient: 'linear-gradient(135deg, #080411 0%, #1a0b3a 50%, #6635de 100%)',
        accentColor: '#865BFF',
        badge: 'Top Converting',
        badgeColor: '#865BFF',
    },
    {
        id: 'market_insights',
        name: 'Market Insights',
        category: 'Analytics',
        description: 'Enfocada en análisis de mercado con datos en tiempo real y herramientas de investigación.',
        sourceFile: 'Landing 2.html',
        sections: ['hero_gradient', 'stats_row', 'bento_grid', 'feature_split', 'testimonials', 'cta_community'],
        gradient: 'linear-gradient(135deg, #0a0a2e 0%, #1a1060 50%, #4338ca 100%)',
        accentColor: '#818cf8',
        badge: null,
        badgeColor: '#818cf8',
    },
    {
        id: 'liquidity_node',
        name: 'Liquidity Node',
        category: 'Institutional',
        description: 'Diseño institucional para fondos y clientes de alto patrimonio con énfasis en prop trading.',
        sourceFile: 'Landing 3.html',
        sections: ['hero_dark', 'bento_grid', 'stats_row', 'workflow_steps', 'security_fees', 'trust_badges'],
        gradient: 'linear-gradient(135deg, #0f081d 0%, #2a1b4d 50%, #6635de 100%)',
        accentColor: '#a78bfa',
        badge: 'Institutional',
        badgeColor: '#a78bfa',
    },
    {
        id: 'crystal_dashboard',
        name: 'Crystal Dashboard',
        category: 'Modern',
        description: 'La más completa: hero claro, bento grid, mapa global, testimonios, educación y más.',
        sourceFile: 'Landing 4.html',
        sections: ['hero_light', 'bento_grid', 'stats_row', 'multi_asset', 'trust_badges', 'testimonials', 'cta_community'],
        gradient: 'linear-gradient(135deg, #fef7ff 0%, #ede9fe 50%, #6635de 100%)',
        accentColor: '#7c3aed',
        badge: 'Recomendada',
        badgeColor: '#7c3aed',
    },
    {
        id: 'dark_horizon',
        name: 'Dark Horizon',
        category: 'Premium',
        description: 'Diseño premium ultra-oscuro con enfoque en activos múltiples y seguridad.',
        sourceFile: 'Landing 5.html',
        sections: ['hero_dark', 'multi_asset', 'feature_split', 'stats_row', 'risk_grid', 'workflow_steps', 'trust_badges'],
        gradient: 'linear-gradient(135deg, #0c0015 0%, #1a0a33 50%, #3b0d99 100%)',
        accentColor: '#c084fc',
        badge: 'Premium',
        badgeColor: '#c084fc',
    },
    {
        id: 'alpha_stream',
        name: 'Alpha Stream',
        category: 'High Conversion',
        description: 'Optimizada para conversión con hero gradiente, sintéticos, badges de confianza y CTA potente.',
        sourceFile: 'Landing 6.html',
        sections: ['hero_gradient', 'bento_grid', 'stats_row', 'feature_split', 'trust_badges', 'testimonials', 'cta_community'],
        gradient: 'linear-gradient(135deg, #0a0614 0%, #1a0b3a 30%, #6635de 100%)',
        accentColor: '#a855f7',
        badge: 'Alta Conversión',
        badgeColor: '#a855f7',
    },
    {
        id: 'bridge_core',
        name: 'Bridge Core',
        category: 'Corporate',
        description: 'Diseño corporativo con apalancamiento pro, testimonios y tutoriales integrados.',
        sourceFile: 'Landing 7.html',
        sections: ['hero_light', 'multi_asset', 'stats_row', 'feature_split', 'leaderboard', 'testimonials', 'cta_community'],
        gradient: 'linear-gradient(135deg, #fef7ff 0%, #f3e8ff 40%, #7c3aed 100%)',
        accentColor: '#8b5cf6',
        badge: 'Corporate',
        badgeColor: '#8b5cf6',
    },
    {
        id: 'trade_flow',
        name: 'Trade Flow',
        category: 'Dynamic',
        description: 'Landing compacta para índices con diseño limpio y flujo de conversión rápido.',
        sourceFile: 'Landing 8.html',
        sections: ['hero_gradient', 'stats_row', 'feature_split', 'risk_grid', 'calculator'],
        gradient: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #3b82f6 100%)',
        accentColor: '#60a5fa',
        badge: null,
        badgeColor: '#60a5fa',
    },
    {
        id: 'quantum_edge',
        name: 'Quantum Edge',
        category: 'Tech',
        description: 'Diseño tipo bento con tiles interactivos para traders tecnológicos avanzados.',
        sourceFile: 'Landing 9.html',
        sections: ['hero_dark', 'bento_grid', 'stats_row', 'multi_asset', 'leaderboard', 'cta_community'],
        gradient: 'linear-gradient(135deg, #0f081d 0%, #1e1b4b 50%, #4f46e5 100%)',
        accentColor: '#6366f1',
        badge: 'Tech',
        badgeColor: '#6366f1',
    },
    {
        id: 'nexus_portal',
        name: 'Nexus Portal',
        category: 'Gateway',
        description: 'Portal moderno con hero minimalista y enfoque en apalancamiento profesional.',
        sourceFile: 'Landing 10.html',
        sections: ['hero_dark', 'stats_row', 'feature_split', 'bento_grid', 'trust_badges', 'calculator'],
        gradient: 'linear-gradient(135deg, #020617 0%, #0f172a 50%, #1d4ed8 100%)',
        accentColor: '#3b82f6',
        badge: null,
        badgeColor: '#3b82f6',
    },
    {
        id: 'stellar_assets',
        name: 'Stellar Assets',
        category: 'Crypto',
        description: 'Enfocada en criptoactivos y activos digitales con diseño holo-futurista.',
        sourceFile: 'Landing 11.html',
        sections: ['hero_gradient', 'multi_asset', 'stats_row', 'feature_split', 'workflow_steps'],
        gradient: 'linear-gradient(135deg, #0c0a09 0%, #1c1917 40%, #f59e0b 100%)',
        accentColor: '#fbbf24',
        badge: 'Crypto',
        badgeColor: '#fbbf24',
    },
    {
        id: 'prime_access',
        name: 'Prime Access',
        category: 'VIP',
        description: 'Diseño VIP para sintéticos con enfoque exclusivo y acceso premium.',
        sourceFile: 'Landing 12.html',
        sections: ['hero_light', 'stats_row', 'bento_grid', 'feature_split', 'trust_badges', 'cta_community'],
        gradient: 'linear-gradient(135deg, #fef7ff 0%, #fce7f3 50%, #ec4899 100%)',
        accentColor: '#ec4899',
        badge: 'VIP',
        badgeColor: '#ec4899',
    },
    {
        id: 'universo_sinteticos_v1',
        name: 'Universo Sintéticos v1',
        category: 'Evolution',
        description: 'Primera versión del ecosistema de sintéticos con grid de instrumentos y estadísticas.',
        sourceFile: 'Landing 13.html',
        sections: ['hero_dark', 'multi_asset', 'stats_row', 'risk_grid', 'feature_split', 'cta_community'],
        gradient: 'linear-gradient(135deg, #0a0614 0%, #1a0545 50%, #7c3aed 100%)',
        accentColor: '#8b5cf6',
        badge: 'Nuevo',
        badgeColor: '#10b981',
    },
    {
        id: 'universo_sinteticos_v2',
        name: 'Universo Sintéticos v2',
        category: 'Featured',
        description: 'Evolución definitiva con hero gradiente, testimonios y flujo de registro optimizado.',
        sourceFile: 'Landing 14.html',
        sections: ['hero_gradient', 'multi_asset', 'stats_row', 'risk_grid', 'feature_split', 'testimonials', 'cta_community'],
        gradient: 'linear-gradient(135deg, #0a0614 0%, #2d1070 40%, #865BFF 100%)',
        accentColor: '#865BFF',
        badge: 'Featured',
        badgeColor: '#865BFF',
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
