// ─────────────────────────────────────────────────────────────
// Landing Sections Catalog — Modular renderable sections
// Extracted from 14 bocetos for mix-and-match landing pages
// ─────────────────────────────────────────────────────────────

export type SectionCategory = 'hero' | 'content' | 'social_proof' | 'cta' | 'layout';

export interface SectionMeta {
    id: string;
    name: string;
    icon: string;
    category: SectionCategory;
    description: string;
    sourceTemplate: number; // 1-14
    defaultContent: Record<string, any>;
}

export interface BrandConfig {
    partnerName: string;
    whatsapp: string;
    email: string;
    partnerId: string;
    language: string;
    primaryColor?: string;
}

// ─── Section Registry ────────────────────────────────────────
export const SECTION_CATALOG: SectionMeta[] = [
    // ─── HEROES ──────────────────────────
    {
        id: 'hero_dark',
        name: 'Hero Oscuro Premium',
        icon: '🌑',
        category: 'hero',
        description: 'Hero elegante con fondo oscuro, gradientes y CTA prominente',
        sourceTemplate: 1,
        defaultContent: {
            badge: 'Next-Gen Social Trading',
            title: 'Empower Your',
            highlight: 'Financial Future.',
            subtitle: 'Bridge Markets MAM and Copy Trading infrastructure bridges the gap between expert strategy and individual capital.',
            cta1: 'Start Trading Now',
            cta2: 'Learn More',
            stat: '+18.4%',
            statLabel: 'Monthly Yield',
        },
    },
    {
        id: 'hero_light',
        name: 'Hero Claro Corporativo',
        icon: '☀️',
        category: 'hero',
        description: 'Hero con fondo claro, tipografía bold premium y estilo institucional',
        sourceTemplate: 4,
        defaultContent: {
            badge: 'V3 MASTER PORTAL',
            title: 'The Edge of',
            highlight: 'Precision.',
            subtitle: 'Experience the ultimate multi-asset liquidity gateway designed for the next generation of excellence.',
            cta1: 'Explore Ecosystem',
            cta2: 'Documentation',
            stat: '0.02ms',
            statLabel: 'NETWORK SPEED',
        },
    },
    {
        id: 'hero_gradient',
        name: 'Hero Gradiente Dinámico',
        icon: '🌈',
        category: 'hero',
        description: 'Hero con gradiente animado y diseño ultra-moderno',
        sourceTemplate: 6,
        defaultContent: {
            badge: 'PRECISION TRADING',
            title: 'Universo de',
            highlight: 'Oportunidades.',
            subtitle: 'Opera los mercados sintéticos más avanzados del mundo con spreads ultra-competitivos y ejecución instantánea.',
            cta1: 'Abrir Cuenta',
            cta2: 'Ver Plataforma',
            stat: '24/7',
            statLabel: 'MARKETS OPEN',
        },
    },

    // ─── CONTENT ─────────────────────────
    {
        id: 'bento_grid',
        name: 'Bento Grid de Servicios',
        icon: '🧩',
        category: 'content',
        description: 'Grid asimétrico estilo Bento con tarjetas de diferentes tamaños',
        sourceTemplate: 4,
        defaultContent: {
            sectionLabel: 'CORE SOLUTIONS',
            title: 'Unified Infrastructure',
            cards: [
                { title: 'Sintéticos Pro', desc: 'Access exclusive synthetic markets with 24/7 uptime and institutional-grade pricing.', size: 'large' },
                { title: 'Institutional Hub', desc: 'Deep liquidity and prime brokerage services for hedge funds.', size: 'medium', accent: true },
                { title: 'MAM / PAMM', desc: 'Effortless multi-account management for signal providers.', size: 'small' },
                { title: 'Prop Trading', desc: 'Scalable capital allocation for high-performance traders.', size: 'wide' },
            ],
        },
    },
    {
        id: 'feature_split',
        name: 'Características (Imagen + Texto)',
        icon: '📐',
        category: 'content',
        description: 'Dos columnas con imagen a un lado y texto descriptivo al otro',
        sourceTemplate: 1,
        defaultContent: {
            title: 'Granular Insights for',
            highlight: 'Total Control.',
            subtitle: 'View detailed metrics of every master before you invest. Transparency is our core architecture.',
            features: [
                { icon: 'monitoring', title: 'Live Equity Curve', desc: 'Monitor actual drawdown and recovery cycles with tick-by-tick precision.' },
                { icon: 'pie_chart', title: 'Asset Allocation', desc: 'See exactly which instruments are driving the returns.' },
            ],
        },
    },
    {
        id: 'risk_grid',
        name: 'Grid de Seguridad / Riesgo',
        icon: '🛡️',
        category: 'content',
        description: 'Grid de 4 columnas con iconos de seguridad y protección',
        sourceTemplate: 1,
        defaultContent: {
            title: 'Precision Risk Safeguards',
            subtitle: 'Advanced trading protocols designed to preserve your capital while enabling growth.',
            items: [
                { icon: 'gpp_maybe', title: 'Auto-Stop Loss', desc: 'Protect your equity with account-wide drawdown limits.' },
                { icon: 'balance', title: 'Equity Guard', desc: 'Intelligent lot sizing based on your actual balance.' },
                { icon: 'bolt', title: 'Instant Exit', desc: 'One-click disconnection from all active strategies.' },
                { icon: 'radar', title: 'Portfolio Mix', desc: 'Spread risk across multiple managers effortlessly.' },
            ],
        },
    },
    {
        id: 'multi_asset',
        name: 'Grid Multi-Activos',
        icon: '💎',
        category: 'content',
        description: 'Grid de iconos representando activos disponibles',
        sourceTemplate: 4,
        defaultContent: {
            sectionLabel: 'CONNECTIVITY',
            title: 'One Portal.',
            highlight: 'All Markets.',
            subtitle: 'Seamlessly swap between asset classes using a single margin pool.',
            assets: [
                { icon: 'currency_bitcoin', name: 'Crypto' },
                { icon: 'monitoring', name: 'Forex' },
                { icon: 'diamond', name: 'Metals' },
                { icon: 'show_chart', name: 'Stocks' },
                { icon: 'oil_barrel', name: 'Energy' },
                { icon: 'account_balance_wallet', name: 'Indices' },
            ],
            checks: ['2000+ Tradable Instruments', 'Cross-Asset Margin Collateral', 'Deep Institutional Liquidity Tiers'],
        },
    },
    {
        id: 'workflow_steps',
        name: 'Pasos / Cómo Funciona',
        icon: '🔢',
        category: 'content',
        description: 'Sección de pasos numerados con dual track (inversionista / manager)',
        sourceTemplate: 1,
        defaultContent: {
            tracks: [
                {
                    badge: 'Investor Stream', badgeIcon: 'trending_up',
                    title: 'Wealth', highlight: 'Amplified.',
                    steps: [
                        { num: '01', title: 'Sync Account', desc: 'Connect your MT4/MT5 wallet via our high-speed bridge in 30 seconds.' },
                        { num: '02', title: 'Select Master', desc: 'Filter masters by risk, asset class, or history.' },
                        { num: '03', title: 'Auto-Replication', desc: 'Trades are executed in your account within 5ms of the master action.' },
                    ],
                },
                {
                    badge: 'Master Stream', badgeIcon: 'leaderboard',
                    title: 'Skill', highlight: 'Monetized.',
                    steps: [
                        { num: '01', title: 'Audit Check', desc: 'Submit your performance history for verification.' },
                        { num: '02', title: 'Pure Execution', desc: 'Trade as you always have. Our engine handles scaling.' },
                        { num: '03', title: 'Weekly Payouts', desc: 'Collect performance fees directly to your wallet.' },
                    ],
                },
            ],
        },
    },
    {
        id: 'security_fees',
        name: 'Seguridad y Tarifas',
        icon: '🔐',
        category: 'content',
        description: 'Panel dual: arquitectura de seguridad + estructura de tarifas',
        sourceTemplate: 1,
        defaultContent: {
            securityTitle: 'Institutional Security Architecture',
            securityItems: [
                { icon: 'security', title: 'Account Isolation', desc: 'Your funds never leave your personal brokerage account.' },
                { icon: 'verified_user', title: 'Multi-Node Encryption', desc: 'Trade execution commands signed with 256-bit encryption.' },
            ],
            feesTitle: 'Profit Share Economy',
            feesSubtitle: 'Our interests are aligned. We only prosper when you do.',
            fees: [
                { label: 'Platform Fee', value: '$0' },
                { label: 'Performance', value: '10-30%' },
                { label: 'Management', value: '0%' },
            ],
        },
    },

    // ─── SOCIAL PROOF ────────────────────
    {
        id: 'stats_row',
        name: 'Métricas Destacadas',
        icon: '📊',
        category: 'social_proof',
        description: 'Fila de métricas KPI grandes y llamativas',
        sourceTemplate: 4,
        defaultContent: {
            stats: [
                { value: '$142B+', label: 'YEARLY VOLUME' },
                { value: '950K', label: 'ACTIVE USERS' },
                { value: '4.2M', label: 'DAILY TRADES' },
                { value: '99.9%', label: 'UPTIME' },
            ],
        },
    },
    {
        id: 'leaderboard',
        name: 'Top Traders Leaderboard',
        icon: '🏆',
        category: 'social_proof',
        description: 'Tarjetas de traders destacados con métricas de rendimiento',
        sourceTemplate: 1,
        defaultContent: {
            title: 'Top Trading',
            highlight: 'Masters',
            subtitle: 'Performance metrics verified in real-time by our clearing bridge.',
            traders: [
                { name: 'Alpha Quantum', specialty: 'Forex & Indices', returnPct: '+242%', risk: '2.4%', trending: false },
                { name: 'Vantage Equities', specialty: 'Global Bluechips', returnPct: '+156%', risk: '1.1%', trending: true },
                { name: 'Steady Yields', specialty: 'Commodities', returnPct: '+88%', risk: '0.8%', trending: false },
            ],
        },
    },
    {
        id: 'testimonials',
        name: 'Testimonios',
        icon: '💬',
        category: 'social_proof',
        description: 'Carousel horizontal de testimonios con fotos y estrellas',
        sourceTemplate: 4,
        defaultContent: {
            sectionLabel: 'SOCIAL PROOF',
            title: 'Voices of the Portal',
            items: [
                { quote: 'The synthetic markets are unlike anything I\'ve seen. The spread is consistently tight.', name: 'Marco Rossi', role: 'Independent Quant' },
                { quote: 'Managing institutional assets requires extreme precision. Bridge provides the backbone.', name: 'Elena Vance', role: 'Fund Manager' },
                { quote: 'Integration with their API was seamless. Reduced slippage by 40% after migration.', name: 'David Chen', role: 'CTO, Alpha' },
            ],
        },
    },
    {
        id: 'trust_badges',
        name: 'Sellos de Confianza',
        icon: '✅',
        category: 'social_proof',
        description: 'Grid de iconos de regulación y certificaciones de seguridad',
        sourceTemplate: 4,
        defaultContent: {
            sectionLabel: 'TRUST & SAFETY',
            title: 'Regulated & Encrypted',
            badges: [
                { icon: 'verified_user', label: 'ASIC Regulated' },
                { icon: 'security', label: 'FCA Compliant' },
                { icon: 'lock', label: 'AES-256 SECURE' },
                { icon: 'shield_with_heart', label: 'SIPC Insured' },
                { icon: 'gpp_maybe', label: 'Segregated' },
                { icon: 'fingerprint', label: 'Bio-Metric' },
            ],
        },
    },

    // ─── CTA ─────────────────────────────
    {
        id: 'cta_community',
        name: 'CTA Comunidad',
        icon: '🚀',
        category: 'cta',
        description: 'Franja de color con estadísticas de comunidad y botón de acción',
        sourceTemplate: 4,
        defaultContent: {
            title: 'Join the Global',
            highlight: 'Trading Community',
            subtitle: 'Connect with 1M+ active traders across our platforms.',
            communityStats: [
                { value: '250k+', label: 'Discord' },
                { value: '1.2M', label: 'Twitter' },
            ],
            cta: 'Join Discord',
        },
    },
    {
        id: 'calculator',
        name: 'Calculadora de Rendimiento',
        icon: '🧮',
        category: 'cta',
        description: 'Calculadora interactiva de proyección de ganancias',
        sourceTemplate: 1,
        defaultContent: {
            title: 'Projected Growth',
            fields: [
                { label: 'Investment Capital', value: '$25,000' },
                { label: 'Target Monthly ROI', value: '12%' },
                { label: 'Master Fee Share', value: '20%' },
            ],
            resultLabel: 'Estimated Monthly Net Profit',
            resultValue: '$2,400',
        },
    },
];

// Category labels for UI grouping
export const SECTION_CATEGORIES: Record<SectionCategory, { label: string; icon: string }> = {
    hero: { label: 'Heroes', icon: '🎯' },
    content: { label: 'Contenido', icon: '📋' },
    social_proof: { label: 'Social Proof', icon: '⭐' },
    cta: { label: 'Llamadas a Acción', icon: '🚀' },
    layout: { label: 'Estructura', icon: '🏗️' },
};

// ─── RENDER FUNCTIONS ────────────────────────────────────────
// Shared styles for all sections
const sharedStyles = `
    .material-symbols-outlined { font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24; }
    .text-gradient-purple { background: linear-gradient(135deg, #cebdff 0%, #7f54f8 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .text-gradient-dark { background: linear-gradient(135deg, #6635de 0%, #a855f7 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
    .glass-panel { background: rgba(255,255,255,0.03); backdrop-filter: blur(12px); border: 1px solid rgba(255,255,255,0.1); }
    .asym-card { border-radius: 3rem 0.75rem 3rem 0.75rem; overflow: hidden; }
    .asym-card-sm { border-radius: 1.5rem 0.4rem 1.5rem 0.4rem; }
    .asym-card-rev { border-radius: 0.75rem 3rem 0.75rem 3rem; }
    .section-reveal { opacity: 0; transform: translateY(30px); transition: all 0.8s ease; }
    .section-reveal.visible { opacity: 1; transform: translateY(0); }
`;

export function getSharedStyles(): string {
    return sharedStyles;
}

export function getSharedHead(): string {
    return `
        <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet">
        <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap" rel="stylesheet">
        <script src="https://cdn.tailwindcss.com"></script>
        <script>
            tailwind.config = {
                theme: {
                    extend: {
                        colors: {
                            "primary": "#6635de",
                            "primary-dark": "#21005d",
                            "accent": "#cebdff",
                            "dark-bg": "#0f081d",
                            "card-dark": "#1a122d",
                            "deep-violet": "#211635",
                        },
                        fontFamily: {
                            "headline": ["Plus Jakarta Sans"],
                            "body": ["Inter"],
                        },
                    },
                },
            }
        </script>
    `;
}

// ─── RENDER: hero_dark ───────────────────────────────────────
export function renderHeroDark(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_dark')!.defaultContent, ...content };
    return `
    <section class="relative py-24 px-8 overflow-hidden" style="background: radial-gradient(circle at top left, #2a1b4d 0%, #080411 50%), radial-gradient(circle at bottom right, #1a0b3a 0%, #080411 50%);">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="relative z-10 section-reveal">
                <span class="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/30 text-accent text-xs font-bold uppercase tracking-widest mb-8">${c.badge}</span>
                <h1 class="text-6xl md:text-7xl font-extrabold font-headline leading-[1.05] mb-8 tracking-tighter text-white">
                    ${c.title} <br><span class="text-gradient-purple">${c.highlight}</span>
                </h1>
                <p class="text-xl text-white/60 leading-relaxed mb-10 max-w-xl font-light">${c.subtitle}</p>
                <div class="flex flex-wrap gap-6">
                    <a href="#register" class="px-10 py-5 bg-primary text-white font-bold asym-card hover:shadow-2xl transition-all scale-100 hover:scale-105 inline-block">${c.cta1}</a>
                    <a href="#learn" class="px-10 py-5 glass-panel text-white font-bold asym-card hover:bg-white/10 transition-all inline-block">${c.cta2}</a>
                </div>
            </div>
            <div class="relative group section-reveal" style="animation-delay: 0.2s;">
                <div class="absolute -inset-4 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
                <div class="relative glass-panel asym-card p-4 shadow-2xl">
                    <div class="w-full h-64 rounded-[3rem_0.5rem_3rem_0.5rem] bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                        <span class="text-8xl font-headline font-black text-white/20 tracking-tighter">BM</span>
                    </div>
                    <div class="absolute -bottom-8 -left-8 glass-panel p-8 asym-card shadow-2xl border-white/20">
                        <p class="text-xs font-bold text-accent uppercase mb-1">${c.statLabel}</p>
                        <p class="text-4xl font-extrabold font-headline text-white">${c.stat}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ─── RENDER: hero_light ──────────────────────────────────────
export function renderHeroLight(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_light')!.defaultContent, ...content };
    return `
    <section class="relative pt-40 pb-20 overflow-hidden min-h-[80vh] flex items-center bg-[#fef7ff]">
        <div class="absolute inset-0 z-0">
            <div class="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[100px]"></div>
        </div>
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div class="flex flex-col section-reveal">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 w-fit mb-8">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span class="text-primary text-[10px] tracking-[0.2em] font-bold uppercase">${c.badge}</span>
                </div>
                <h1 class="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter text-[#211635] leading-[0.85] mb-8">
                    ${c.title} <br><span class="text-gradient-dark">${c.highlight}</span>
                </h1>
                <p class="text-xl text-[#494455] max-w-lg mb-12 leading-relaxed font-medium">${c.subtitle}</p>
                <div class="flex flex-wrap gap-4">
                    <a href="#register" class="bg-primary px-10 py-5 asym-card-rev text-white font-bold flex items-center gap-3 shadow-2xl hover:translate-y-[-2px] transition-all inline-flex">
                        ${c.cta1} <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a href="#learn" class="px-10 py-5 asym-card bg-white border border-gray-200 text-[#211635] font-bold hover:bg-gray-50 transition-all inline-block">${c.cta2}</a>
                </div>
            </div>
            <div class="relative section-reveal" style="animation-delay: 0.2s;">
                <div class="asym-card bg-[#211635] p-4 shadow-[0_25px_50px_-12px_rgba(102,53,222,0.25)] transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden">
                    <div class="w-full h-80 rounded-[3rem_0.5rem_3rem_0.5rem] bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center">
                        <span class="text-9xl font-headline font-black text-white/15 tracking-tighter">V3</span>
                    </div>
                    <div class="absolute bottom-10 left-10 right-10">
                        <div class="backdrop-blur-2xl bg-[#0f071d]/75 p-6 asym-card-rev border border-white/10">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <span class="material-symbols-outlined">bolt</span>
                                </div>
                                <div>
                                    <div class="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">${c.statLabel}</div>
                                    <div class="text-2xl font-headline font-extrabold text-white">${c.stat}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ─── RENDER: hero_gradient ───────────────────────────────────
export function renderHeroGradient(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_gradient')!.defaultContent, ...content };
    return `
    <section class="relative py-32 px-8 overflow-hidden" style="background: linear-gradient(135deg, #0a0614 0%, #1a0b3a 30%, #2d1070 60%, #6635de 100%);">
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 32px 32px;"></div>
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[200px] -translate-y-1/3 translate-x-1/3"></div>
        <div class="max-w-5xl mx-auto text-center relative z-10 section-reveal">
            <span class="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur">${c.badge}</span>
            <h1 class="text-6xl md:text-8xl font-extrabold font-headline leading-[0.9] mb-8 tracking-tighter text-white">
                ${c.title} <span class="text-gradient-purple">${c.highlight}</span>
            </h1>
            <p class="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">${c.subtitle}</p>
            <div class="flex flex-wrap justify-center gap-6">
                <a href="#register" class="px-10 py-5 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all scale-100 hover:scale-105 inline-block text-lg">${c.cta1}</a>
                <a href="#learn" class="px-10 py-5 glass-panel text-white font-bold rounded-full hover:bg-white/10 transition-all inline-block text-lg">${c.cta2}</a>
            </div>
            <div class="mt-16 inline-flex items-center gap-4 glass-panel px-8 py-4 rounded-full">
                <span class="text-4xl font-black font-headline text-accent">${c.stat}</span>
                <span class="text-xs font-bold uppercase tracking-widest text-white/40">${c.statLabel}</span>
            </div>
        </div>
    </section>`;
}

// ─── RENDER: bento_grid ──────────────────────────────────────
export function renderBentoGrid(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'bento_grid')!.defaultContent, ...content };
    const cards = (c.cards || []).map((card: any, i: number) => {
        if (card.size === 'large') {
            return `<div class="md:col-span-8 bg-[#211635] text-white asym-card p-12 relative overflow-hidden group min-h-[280px] flex flex-col justify-between">
                <div class="relative z-10"><h3 class="text-4xl font-headline font-bold mb-4">${card.title}</h3><p class="text-white/60 text-lg max-w-sm">${card.desc}</p></div>
                <div class="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px]"></div>
            </div>`;
        }
        if (card.accent) {
            return `<div class="md:col-span-4 bg-primary asym-card p-12 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(102,53,222,0.25)] hover:translate-y-[-8px] transition-transform">
                <div class="w-16 h-16 asym-card-rev bg-white/10 flex items-center justify-center text-white text-4xl"><span class="material-symbols-outlined">account_balance</span></div>
                <div><h3 class="text-2xl font-headline font-bold text-white mb-4">${card.title}</h3><p class="text-white/80 leading-relaxed">${card.desc}</p></div>
            </div>`;
        }
        if (card.size === 'wide') {
            return `<div class="md:col-span-8 bg-white border border-gray-200 asym-card-sm p-10 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div class="max-w-md"><h3 class="text-2xl font-headline font-bold mb-4">${card.title}</h3><p class="text-gray-500">${card.desc}</p></div>
            </div>`;
        }
        return `<div class="md:col-span-4 bg-white border border-gray-200 asym-card-sm p-10 shadow-sm flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6"><span class="material-symbols-outlined text-4xl">groups</span></div>
            <h3 class="text-xl font-headline font-bold mb-3">${card.title}</h3><p class="text-gray-500 text-sm">${card.desc}</p>
        </div>`;
    }).join('\n');

    return `
    <section class="py-32 relative bg-gray-50">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="mb-20 text-center">
                <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase">${c.sectionLabel}</span>
                <h2 class="text-5xl font-headline font-bold text-[#211635] mt-4">${c.title}</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8">${cards}</div>
        </div>
    </section>`;
}

// ─── RENDER: feature_split ───────────────────────────────────
export function renderFeatureSplit(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'feature_split')!.defaultContent, ...content };
    const features = (c.features || []).map((f: any) => `
        <div class="flex gap-6 group">
            <div class="w-12 h-12 flex-shrink-0 bg-primary/20 asym-card flex items-center justify-center border border-primary/30 group-hover:bg-primary transition-all">
                <span class="material-symbols-outlined text-accent group-hover:text-white">${f.icon}</span>
            </div>
            <div><h4 class="text-xl font-bold mb-2 text-white">${f.title}</h4><p class="text-white/40 text-sm">${f.desc}</p></div>
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8 overflow-hidden relative" style="background: #080411;">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-primary/10 blur-[150px] rounded-full"></div>
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center section-reveal">
            <div class="lg:w-1/2 relative z-10">
                <h2 class="text-5xl font-extrabold font-headline leading-tight mb-8 text-white">${c.title} <span class="text-gradient-purple">${c.highlight}</span></h2>
                <p class="text-lg text-white/50 mb-12 leading-relaxed">${c.subtitle}</p>
                <div class="space-y-10">${features}</div>
            </div>
            <div class="lg:w-1/2 relative">
                <div class="glass-panel asym-card p-6 shadow-2xl">
                    <div class="w-full h-64 rounded-[3rem_0.5rem_3rem_0.5rem] bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                        <span class="material-symbols-outlined text-8xl text-primary/30">analytics</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

// ─── RENDER: stats_row ───────────────────────────────────────
export function renderStatsRow(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'stats_row')!.defaultContent, ...content };
    const stats = (c.stats || []).map((s: any) => `
        <div class="group text-center">
            <div class="text-[10px] text-primary font-bold uppercase tracking-[0.4em] mb-4">${s.label}</div>
            <div class="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter group-hover:scale-110 transition-transform ${s.label === 'UPTIME' ? 'text-emerald-500' : 'text-[#211635]'}">${s.value}</div>
        </div>
    `).join('\n');

    return `
    <section class="py-24 bg-white relative section-reveal">
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">${stats}</div>
    </section>`;
}

// ─── RENDER: risk_grid ───────────────────────────────────────
export function renderRiskGrid(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'risk_grid')!.defaultContent, ...content };
    const items = (c.items || []).map((item: any) => `
        <div class="text-center group">
            <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all border border-white/10 group-hover:border-primary/50">
                <span class="material-symbols-outlined text-3xl text-accent">${item.icon}</span>
            </div>
            <h4 class="font-bold mb-3 text-white">${item.title}</h4>
            <p class="text-sm text-white/40 leading-relaxed">${item.desc}</p>
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8 relative" style="background: #080411;">
        <div class="max-w-7xl mx-auto glass-panel asym-card bg-[#0f081d]/40 p-12 md:p-20 border-white/5 section-reveal">
            <div class="text-center mb-20">
                <h2 class="text-4xl font-extrabold font-headline mb-4 text-white">${c.title}</h2>
                <p class="text-white/50 max-w-2xl mx-auto">${c.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">${items}</div>
        </div>
    </section>`;
}

// ─── RENDER: leaderboard ─────────────────────────────────────
export function renderLeaderboard(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'leaderboard')!.defaultContent, ...content };
    const traders = (c.traders || []).map((t: any) => {
        const isTrending = t.trending;
        return `
        <div class="glass-panel p-10 asym-card ${isTrending ? 'border-primary shadow-[0_0_50px_rgba(102,53,222,0.15)]' : 'hover:border-primary/50'} transition-all duration-500 group relative overflow-hidden">
            ${isTrending ? '<div class="absolute top-0 right-0 bg-primary px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest text-white">Trending</div>' : ''}
            <div class="flex items-center gap-5 mb-10">
                <div class="w-16 h-16 asym-card-rev bg-primary/20 flex items-center justify-center rounded-full text-2xl font-bold text-primary">${t.name.charAt(0)}</div>
                <div>
                    <h3 class="text-xl font-bold ${isTrending ? 'text-accent' : 'group-hover:text-accent'} transition-colors text-white">${t.name}</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest font-bold">${t.specialty}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-10">
                <div class="${isTrending ? 'bg-white/10' : 'bg-white/5'} p-4 rounded-xl">
                    <p class="text-[10px] text-white/30 uppercase font-bold mb-1">Return</p>
                    <p class="text-2xl font-bold text-accent">${t.returnPct}</p>
                </div>
                <div class="${isTrending ? 'bg-white/10' : 'bg-white/5'} p-4 rounded-xl">
                    <p class="text-[10px] text-white/30 uppercase font-bold mb-1">Risk</p>
                    <p class="text-2xl font-bold text-white">${t.risk}</p>
                </div>
            </div>
            <button class="w-full py-4 ${isTrending ? 'bg-primary text-white' : 'bg-primary/20 text-accent hover:bg-primary hover:text-white'} font-bold asym-card transition-all">Copy Portfolio</button>
        </div>`;
    }).join('\n');

    return `
    <section class="py-24 px-8" style="background: #080411;">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div><h2 class="text-4xl font-extrabold font-headline mb-4 text-white">${c.title} <span class="text-accent">${c.highlight}</span></h2>
                <p class="text-white/50">${c.subtitle}</p></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">${traders}</div>
        </div>
    </section>`;
}

// ─── RENDER: testimonials ────────────────────────────────────
export function renderTestimonials(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'testimonials')!.defaultContent, ...content };
    const items = (c.items || []).map((item: any) => `
        <div class="min-w-[380px] bg-white border border-gray-200 asym-card p-12 shadow-sm snap-center flex flex-col justify-between hover:border-primary/40 transition-all group">
            <div>
                <div class="flex gap-1 text-primary mb-8">${'<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1">star</span>'.repeat(5)}</div>
                <p class="text-xl text-[#211635] italic leading-relaxed mb-10">"${item.quote}"</p>
            </div>
            <div class="flex items-center gap-5">
                <div class="w-14 h-14 asym-card-rev bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">${item.name.charAt(0)}</div>
                <div>
                    <div class="font-extrabold text-[#211635] text-lg">${item.name}</div>
                    <div class="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">${item.role}</div>
                </div>
            </div>
        </div>
    `).join('\n');

    return `
    <section class="py-32 bg-white overflow-hidden section-reveal">
        <div class="max-w-7xl mx-auto px-8">
            <div class="text-center mb-20">
                <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-4 block">${c.sectionLabel}</span>
                <h2 class="text-5xl font-headline font-bold text-[#211635]">${c.title}</h2>
            </div>
            <div class="flex gap-8 overflow-x-auto pb-8 snap-x px-4" style="-ms-overflow-style: none; scrollbar-width: none;">${items}</div>
        </div>
    </section>`;
}

// ─── RENDER: trust_badges ────────────────────────────────────
export function renderTrustBadges(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'trust_badges')!.defaultContent, ...content };
    const badges = (c.badges || []).map((b: any) => `
        <div class="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-all cursor-pointer transform hover:scale-110">
            <span class="material-symbols-outlined text-6xl text-primary">${b.icon}</span>
            <span class="text-[10px] font-bold uppercase tracking-[0.2em]">${b.label}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-24 bg-gray-50 relative overflow-hidden section-reveal">
        <div class="max-w-7xl mx-auto px-8 relative z-10 text-center">
            <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-4 block">${c.sectionLabel}</span>
            <h2 class="text-4xl font-headline font-bold mb-16 text-[#211635]">${c.title}</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">${badges}</div>
        </div>
    </section>`;
}

// ─── RENDER: multi_asset ─────────────────────────────────────
export function renderMultiAsset(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'multi_asset')!.defaultContent, ...content };
    const assets = (c.assets || []).map((a: any) => `
        <div class="asym-card-sm p-8 bg-gray-50 border border-gray-200 flex flex-col items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(102,53,222,0.25)] group">
            <span class="material-symbols-outlined text-4xl mb-3">${a.icon}</span>
            <span class="font-bold text-sm tracking-widest uppercase">${a.name}</span>
        </div>
    `).join('\n');
    const checks = (c.checks || []).map((ch: string) => `
        <div class="flex items-center gap-4 group cursor-default">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <span class="font-bold text-[#211635]">${ch}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-32 bg-white relative section-reveal">
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div class="order-2 lg:order-1 grid grid-cols-2 md:grid-cols-3 gap-6">${assets}</div>
            <div class="order-1 lg:order-2">
                <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase">${c.sectionLabel}</span>
                <h2 class="text-5xl font-headline font-extrabold tracking-tighter mt-6 mb-8 leading-tight text-[#211635]">${c.title} <br>${c.highlight}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-10 font-medium">${c.subtitle}</p>
                <div class="space-y-6">${checks}</div>
            </div>
        </div>
    </section>`;
}

// ─── RENDER: workflow_steps ──────────────────────────────────
export function renderWorkflowSteps(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'workflow_steps')!.defaultContent, ...content };
    const tracks = (c.tracks || []).map((track: any, ti: number) => {
        const isSecond = ti === 1;
        const steps = (track.steps || []).map((s: any) => `
            <div class="flex gap-8 group">
                <div class="w-14 h-14 ${isSecond ? 'asym-card-rev bg-accent text-[#21005d]' : 'asym-card bg-primary text-white'} flex items-center justify-center font-black text-xl flex-shrink-0 group-hover:scale-110 transition-transform">${s.num}</div>
                <div><p class="font-bold text-xl mb-2 text-white">${s.title}</p><p class="text-white/40 text-sm leading-relaxed">${s.desc}</p></div>
            </div>
        `).join('\n');

        return `
        <div class="space-y-12">
            <div class="inline-flex items-center gap-3 glass-panel px-6 py-2 rounded-full border-accent/20">
                <span class="material-symbols-outlined text-accent">${track.badgeIcon}</span>
                <span class="text-xs font-black uppercase tracking-widest text-accent">${track.badge}</span>
            </div>
            <h3 class="text-5xl font-extrabold font-headline text-white">${track.title} <span class="text-accent">${track.highlight}</span></h3>
            <div class="space-y-12">${steps}</div>
        </div>`;
    }).join('\n');

    return `
    <section class="py-24 px-8" style="background: #080411;">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 section-reveal">${tracks}</div>
    </section>`;
}

// ─── RENDER: security_fees ───────────────────────────────────
export function renderSecurityFees(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'security_fees')!.defaultContent, ...content };
    const secItems = (c.securityItems || []).map((item: any) => `
        <div class="bg-white/5 p-8 asym-card border border-white/5">
            <p class="font-bold text-accent mb-4 flex items-center gap-3"><span class="material-symbols-outlined">${item.icon}</span> ${item.title}</p>
            <p class="text-sm text-white/50 leading-relaxed">${item.desc}</p>
        </div>
    `).join('\n');
    const fees = (c.fees || []).map((f: any) => `
        <div class="flex justify-between items-end border-b border-white/20 pb-4">
            <span class="text-sm font-medium opacity-70">${f.label}</span>
            <span class="text-2xl font-black">${f.value}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8" style="background: #080411;">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 section-reveal">
            <div class="lg:col-span-2 glass-panel asym-card p-16 flex flex-col justify-between group">
                <div><h3 class="text-4xl font-extrabold font-headline mb-10 group-hover:text-accent transition-colors text-white">${c.securityTitle}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">${secItems}</div></div>
            </div>
            <div class="bg-primary asym-card p-16 text-white flex flex-col justify-between shadow-[0_0_60px_rgba(102,53,222,0.3)]">
                <div><h3 class="text-3xl font-bold font-headline mb-6">${c.feesTitle}</h3><p class="text-white/70 mb-12">${c.feesSubtitle}</p>
                <div class="space-y-8">${fees}</div></div>
                <p class="text-[10px] text-white/50 italic mt-12 leading-relaxed">Fees are automatically deducted only on Net New Profit (High Water Mark methodology).</p>
            </div>
        </div>
    </section>`;
}

// ─── RENDER: cta_community ───────────────────────────────────
export function renderCtaCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'cta_community')!.defaultContent, ...content };
    const stats = (c.communityStats || []).map((s: any) => `
        <div><div class="text-5xl font-headline font-black tracking-tighter">${s.value}</div><div class="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">${s.label}</div></div>
    `).join('\n');

    return `
    <section class="py-20 relative bg-primary section-reveal">
        <div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
            <div><h3 class="text-4xl font-headline font-extrabold mb-4 leading-tight">${c.title} <br>${c.highlight}</h3><p class="text-white/70 max-w-sm">${c.subtitle}</p></div>
            <div class="flex flex-wrap gap-12 text-center md:text-left">${stats}</div>
            <a href="#register" class="px-10 py-5 rounded-full bg-white text-primary font-bold text-lg hover:scale-105 shadow-xl transition-all inline-block">${c.cta}</a>
        </div>
    </section>`;
}

// ─── RENDER: calculator ──────────────────────────────────────
export function renderCalculator(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'calculator')!.defaultContent, ...content };
    const fields = (c.fields || []).map((f: any) => `
        <div>
            <label class="text-[10px] font-black uppercase tracking-widest text-white/40 block mb-4">${f.label}</label>
            <input class="w-full bg-white/5 border border-white/10 rounded-xl p-5 font-bold text-white focus:outline-none focus:border-accent" type="text" value="${f.value}" />
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8" style="background: #080411;">
        <div class="max-w-4xl mx-auto glass-panel asym-card p-12 md:p-20 shadow-[0_0_100px_rgba(102,53,222,0.1)] relative section-reveal">
            <div class="absolute -top-10 -left-10 w-32 h-32 bg-accent/20 blur-3xl"></div>
            <h2 class="text-4xl font-extrabold font-headline mb-12 text-center text-white">${c.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">${fields}</div>
            <div class="bg-primary/20 p-10 asym-card border border-primary/30 text-center">
                <p class="text-xs uppercase tracking-[0.2em] font-black text-accent mb-4">${c.resultLabel}</p>
                <p class="text-6xl font-black font-headline text-gradient-purple">${c.resultValue}</p>
            </div>
            <p class="text-[10px] text-white/20 text-center mt-8 italic">Simulations are based on historical model data. Capital is at risk.</p>
        </div>
    </section>`;
}

// ─── RENDER MAP: section ID → render function ────────────────
export const SECTION_RENDERERS: Record<string, (content: Record<string, any>, brand: BrandConfig) => string> = {
    hero_dark: renderHeroDark,
    hero_light: renderHeroLight,
    hero_gradient: renderHeroGradient,
    bento_grid: renderBentoGrid,
    feature_split: renderFeatureSplit,
    stats_row: renderStatsRow,
    risk_grid: renderRiskGrid,
    leaderboard: renderLeaderboard,
    testimonials: renderTestimonials,
    trust_badges: renderTrustBadges,
    multi_asset: renderMultiAsset,
    workflow_steps: renderWorkflowSteps,
    security_fees: renderSecurityFees,
    cta_community: renderCtaCommunity,
    calculator: renderCalculator,
};

// Helper: get section by ID
export function getSectionById(id: string): SectionMeta | undefined {
    return SECTION_CATALOG.find(s => s.id === id);
}

// Helper: get sections by category
export function getSectionsByCategory(category: SectionCategory): SectionMeta[] {
    return SECTION_CATALOG.filter(s => s.category === category);
}
