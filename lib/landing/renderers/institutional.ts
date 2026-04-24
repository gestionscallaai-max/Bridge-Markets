import { BrandConfig } from '../types';

// ─── INSTITUTIONAL HERO (REFACTORED: ASYMMETRIC & BOLD) ─────
export function renderInstHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaMainText = content.ctaMainText || "Abrir mi cuenta";
    const ctaSecondaryText = content.ctaSecondaryText || "Ver todos los productos";
    const ctaLink = content.ctaMainLink || brand.ctaLink || "#";
    const ctaSecondaryLink = content.ctaSecondaryLink || "#ecosistema";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#020202]">
        <!-- Decorative Background Elements -->
        <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-800/20 blur-[120px] rounded-full"></div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-8 section-reveal">
                    <div class="flex flex-wrap gap-4 mb-8">
                        <div class="px-4 py-1.5 bg-indigo-600/10 border border-indigo-500/30 rounded-full">
                            <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest">Regulado</span>
                        </div>
                        <div class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                            <span class="text-[10px] font-black text-white/40 uppercase tracking-widest">Más de 5 años en el mercado</span>
                        </div>
                        <div class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full">
                            <span class="text-[10px] font-black text-white/40 uppercase tracking-widest">Soporte 24/7</span>
                        </div>
                    </div>
                    
                    <h1 class="text-5xl md:text-[90px] font-black font-montserrat text-white leading-[0.95] uppercase tracking-tighter mb-10">
                        Tu ecosistema <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic">Financiero</span><br>
                        Completo.
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-white/40 font-light mb-12 max-w-3xl leading-relaxed">
                        Opera, invierte y crece con Bridge Markets. Desde Forex y CFDs hasta índices sintéticos exclusivos. <span class="text-white">Un solo broker. Todo lo que necesitas.</span>
                    </p>

                    ${ibPhrase ? `<p class="text-lg text-indigo-400/80 font-medium mb-12 italic tracking-wide leading-relaxed italic border-l-2 border-indigo-600 pl-6">${ibPhrase}</p>` : ''}

                    <div class="flex flex-col md:flex-row items-center gap-8">
                        <a href="${ctaLink}" class="group relative px-12 py-6 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95 shadow-2xl">
                            <span class="relative z-10 uppercase tracking-widest text-xs">${ctaMainText}</span>
                            <span class="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all material-symbols-outlined">arrow_forward</span>
                        </a>
                        <a href="${ctaSecondaryLink}" class="text-xs font-black text-white/60 hover:text-white uppercase tracking-widest border-b border-white/10 pb-1 transition-all">
                            ${ctaSecondaryText}
                        </a>
                    </div>
                </div>

                <div class="lg:col-span-4 relative section-reveal delay-200">
                    <div class="relative z-10 p-10 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                        <div class="flex justify-between items-start mb-12">
                            <img src="/images/logo-bm-blanco.png" class="h-6">
                            <div class="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
                        </div>
                        <div class="space-y-8">
                            <div>
                                <div class="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-black italic">Presentado por</div>
                                <div class="text-2xl font-black text-white uppercase tracking-tighter">${ibName}</div>
                            </div>
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-1 bg-indigo-600 rounded-full"></div>
                                <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Socio Estratégico</span>
                            </div>
                        </div>
                    </div>
                    <!-- Decorative shapes -->
                    <div class="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl"></div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── WHO WE ARE (REFACTORED: MODERN INFO-GRID) ──────────────
export function renderInstAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#020202] relative">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-20 mb-32 section-reveal">
                <div class="lg:w-1/3">
                    <div class="sticky top-32">
                        <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Trayectoria</span>
                        <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase leading-none mb-8 tracking-tighter">¿Quiénes somos?</h2>
                        <div class="w-20 h-1 bg-indigo-600"></div>
                    </div>
                </div>
                <div class="lg:w-2/3 space-y-12">
                    <p class="text-2xl md:text-4xl text-white font-light leading-tight">Bridge Markets es un broker internacional con tecnología de <span class="text-indigo-400 font-bold">nivel institucional</span>, operando desde el Reino Unido y las Islas Marshall.</p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 text-white/50 leading-relaxed">
                        <p>Nuestra misión es conectar traders disciplinados con oportunidades reales de capital, ofreciendo un ecosistema completo que incluye trading personal, gestión de capital y programas de PropTrading de alto nivel.</p>
                        <p>Creemos que el verdadero talento en los mercados no se mide por la suerte, sino por la disciplina, la consistencia y la gestión profesional del riesgo. Ofrecemos las herramientas para que ese talento florezca.</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-2 lg:grid-cols-4 gap-4 section-reveal">
                ${[
                    { v: '2021', t: 'Fundación', i: 'history_edu' },
                    { v: '9+', t: 'Idiomas', i: 'translate' },
                    { v: '4', t: 'Mercados', i: 'public' },
                    { v: '24/7', t: 'Soporte', i: 'support_agent' }
                ].map(s => `
                    <div class="group p-10 bg-white/[0.01] border border-white/5 rounded-[3rem] transition-all hover:bg-white/[0.03]">
                        <span class="material-symbols-outlined text-indigo-500/50 mb-8 block group-hover:scale-110 transition-transform">${s.i}</span>
                        <div class="text-5xl font-black text-white mb-2 font-montserrat">${s.v}</div>
                        <div class="text-[10px] text-white/30 uppercase tracking-[0.2em] font-black">${s.t}</div>
                    </div>
                `).join('')}
            </div>

            <!-- Entities Detail (Sleek Overlay) -->
            <div class="mt-20 p-12 bg-gradient-to-r from-white/[0.02] to-transparent border-l border-white/10 rounded-r-[3rem] section-reveal">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                    <div>
                        <h4 class="text-xs font-black text-white uppercase tracking-widest mb-8">Estructura Corporativa</h4>
                        <div class="space-y-8">
                            <div>
                                <div class="text-[10px] text-indigo-500 font-black uppercase mb-2">United Kingdom</div>
                                <p class="text-xs text-white/40 leading-relaxed font-medium uppercase tracking-wider">Bridge Markets Limited — Reg. 15159310 <br> Owen Avenue, Hessle, Yorkshire, UK.</p>
                            </div>
                            <div>
                                <div class="text-[10px] text-indigo-500 font-black uppercase mb-2">Marshall Islands</div>
                                <p class="text-xs text-white/40 leading-relaxed font-medium uppercase tracking-wider">Bridge Markets Ltd. — Reg. 113891 <br> Estructura internacional de holding global.</p>
                            </div>
                        </div>
                    </div>
                    <div class="flex justify-center opacity-20 grayscale">
                        <img src="/images/logo-bm-blanco.png" class="h-16">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── WHY CHOOSE US (REFACTORED: VISUAL IMPACT) ──────────────
export function renderInstWhy(content: Record<string, any>, brand: BrandConfig): string {
    const reasons = [
        { t: 'Ecosistema Completo', d: 'PropTrading, sintéticos, cuentas apalancadas, MAM y Copy Trading en un solo lugar.' },
        { t: 'Todos los Sintéticos', d: 'Deriv + Weltrade + Índices Propios en una sola cuenta MT5 24/7.' },
        { t: 'Tecnología MT5', d: 'Servidores ultra-rápidos, spreads desde 0.0 pips y ejecución profesional.' },
        { t: 'Programa PropFirm', d: 'Accede a capital financiado real. Programas Obsidian, Basalt, Elite y Ultra.' },
        { t: 'Cuentas a Medida', d: 'Desde traders independientes hasta gestores profesionales y cuentas x12.' },
        { t: 'Soporte 24/7', d: 'Atención en 9 idiomas incluyendo español, ruso, thai y alemán.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] overflow-hidden">
        <div class="max-w-7xl mx-auto relative">
            <div class="flex justify-between items-end mb-24 section-reveal">
                <div class="max-w-2xl">
                    <h2 class="text-5xl md:text-8xl font-black font-montserrat text-white uppercase leading-[0.9] tracking-tighter mb-8">El estándar <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-slate-500">Bridge.</span></h2>
                    <p class="text-white/40 text-lg font-light">¿Por qué el 1% de los traders profesionales eligen nuestra infraestructura?</p>
                </div>
                <div class="hidden lg:block text-indigo-900/20 text-9xl font-black select-none">01</div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 rounded-[4rem] overflow-hidden section-reveal">
                ${reasons.map(r => `
                    <div class="p-12 bg-[#050505] hover:bg-white/[0.02] transition-all group">
                        <div class="mb-12 flex justify-between items-start">
                            <span class="text-[10px] font-black text-indigo-500 uppercase tracking-widest">Core Feature</span>
                            <span class="material-symbols-outlined text-white/10 group-hover:text-indigo-500 transition-colors">verified</span>
                        </div>
                        <h4 class="text-xl font-black text-white mb-6 uppercase tracking-tight">${r.t}</h4>
                        <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest font-medium">${r.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── PRODUCT ECOSISTEM (REFACTORED: BENTO GRID) ─────────────
export function renderInstEcosystem(content: Record<string, any>, brand: BrandConfig): string {
    const ctaLink = brand.ctaLink || "#";
    
    const products = [
        { id: 'PROP', t: 'PropFirm', d: 'OBSIDIAN · BASALT · ELITE · ULTRA Capital financiado sin arriesgar tu dinero', cta: content.ctaPropText || 'Ver PropFirm' },
        { id: 'SYN', t: 'Índices Sintéticos', d: 'Fortune · Vortex · BullX · BearX · FomoX Más de 100 instrumentos 24/7', cta: content.ctaSynText || 'Ver Sintéticos' },
        { id: 'X12', t: 'Cuentas Leverage X12', d: 'Capital apalancado 12x Sin evaluación. 100% beneficios tuyos', cta: content.ctaX12Text || 'Ver Cuentas Leverage' },
        { id: 'MAM', t: 'Cuentas MAM', d: 'MAM Equity · MAM Cash Gestión profesional centralizada', cta: content.ctaMamText || 'Ver Cuentas MAM' },
        { id: 'CP', t: 'Copy Trading', d: 'Replica estrategias verificadas Control total del inversionista', cta: content.ctaCopyText || 'Ver Copy Trading' },
        { id: 'FX', t: 'Forex y CFDs', d: 'Cuentas ECN · Apalancadas · PAMM Mercados reales internacionales', cta: content.ctaForexText || 'Ver Cuentas Forex' }
    ];

    return `
    <section id="ecosistema" class="py-40 px-8 bg-[#020202]">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block italic underline underline-offset-8 decoration-indigo-600">Portafolio</span>
                <h2 class="text-4xl md:text-7xl font-black font-montserrat text-white uppercase tracking-tighter mb-8 leading-none">Nuestro Ecosistema <br>de Productos</h2>
                <p class="text-white/40 text-xl max-w-4xl leading-relaxed italic">
                    En Bridge Markets encontrarás el ecosistema financiero más completo para traders e inversores. Cada producto está diseñado para un perfil específico, pero todos comparten el mismo estándar: tecnología institucional, transparencia total y un equipo dedicado a tu crecimiento.
                </p>
            </div>

            <!-- Bento Grid -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 section-reveal mb-32">
                <!-- Large: PropFirm -->
                <div class="md:col-span-8 p-12 bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-white/10 rounded-[3.5rem] group hover:border-indigo-500/50 transition-all flex flex-col justify-between min-h-[450px] relative overflow-hidden">
                    <div class="relative z-10">
                        <div class="flex justify-between items-center mb-12">
                            <span class="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">BM-PROP</span>
                            <span class="text-xs text-white/20 font-black italic tracking-widest">CAPITAL FINANCIADO</span>
                        </div>
                        <h3 class="text-5xl md:text-7xl font-black text-white mb-6 uppercase tracking-tighter italic">PropFirm</h3>
                        <p class="text-white/50 text-lg font-light max-w-md italic mb-12">Accede a capital financiado real sin arriesgar tu dinero. Programas Obsidian, Basalt, Elite y Ultra con hasta 80% de Profit Split.</p>
                        <a href="${ctaLink}" class="inline-flex items-center gap-4 text-xs font-black text-white bg-indigo-600 px-8 py-4 rounded-xl uppercase tracking-widest hover:gap-6 transition-all shadow-xl italic">
                            ${content.ctaPropText || 'Ver Programas'} <span class="material-symbols-outlined">arrow_right_alt</span>
                        </a>
                    </div>
                    <!-- Chess Asset -->
                    <div class="absolute -bottom-10 -right-10 w-1/2 h-full opacity-10 grayscale pointer-events-none group-hover:opacity-20 group-hover:grayscale-0 transition-all duration-1000">
                        <img src="/images/imagenes_nuevas/rey_rosa.png" class="w-full h-full object-contain object-bottom transform rotate-12">
                    </div>
                </div>

                <!-- Small: Synthetics -->
                <div class="md:col-span-4 p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.04] transition-all flex flex-col justify-between group">
                    <div>
                        <span class="text-xs text-indigo-500 font-black mb-12 block italic">BM-SYN</span>
                        <h3 class="text-3xl font-black text-white mb-4 uppercase tracking-tight italic leading-tight">Índices <br>Sintéticos</h3>
                        <p class="text-xs text-white/30 uppercase tracking-widest leading-relaxed mb-8">Fortune · Vortex · BullX · BearX · FomoX. Más de 100 instrumentos propios 24/7.</p>
                    </div>
                    <a href="${ctaLink}" class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                        <span class="material-symbols-outlined text-white text-sm">open_in_new</span>
                    </a>
                </div>

                <!-- Medium: Leverage X12 -->
                <div class="md:col-span-4 p-12 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.04] transition-all flex flex-col justify-between group">
                    <div>
                        <span class="text-xs text-indigo-500 font-black mb-12 block italic">BM-LX12</span>
                        <h3 class="text-3xl font-black text-white mb-4 uppercase tracking-tight italic leading-tight">Leverage <br>X12</h3>
                        <p class="text-xs text-white/30 uppercase tracking-widest leading-relaxed mb-8">Sin evaluación. Capital apalancado 12x con retiros desde el tercer día de operativa.</p>
                    </div>
                    <a href="${content.ctaX12Link || ctaLink}" class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center border border-white/10 group-hover:bg-indigo-600 group-hover:border-indigo-600 transition-all">
                        <span class="material-symbols-outlined text-white text-sm">bolt</span>
                    </a>
                </div>

                <!-- Medium: MAM & Copy -->
                <div class="md:col-span-8 p-12 bg-white/[0.01] border border-white/10 rounded-[3.5rem] hover:border-white/30 transition-all grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="flex flex-col justify-between group">
                        <div>
                            <div class="text-[10px] text-indigo-500 font-black uppercase mb-4 tracking-widest italic">Gestión Profesional</div>
                            <h3 class="text-2xl font-black text-white mb-4 uppercase italic">MAM Accounts</h3>
                            <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest font-medium mb-8">MAM Equity · MAM Cash Gestión centralizada con transparencia institucional total.</p>
                        </div>
                        <a href="${content.ctaMamLink || ctaLink}" class="text-[10px] font-black text-white/60 group-hover:text-indigo-400 flex items-center gap-2 uppercase tracking-widest italic transition-colors">LPOA PROTECTED <span class="material-symbols-outlined text-[10px]">arrow_forward</span></a>
                    </div>
                    <div class="flex flex-col justify-between group">
                        <div>
                            <div class="text-[10px] text-indigo-500 font-black uppercase mb-4 tracking-widest italic">Social Trading</div>
                            <h3 class="text-2xl font-black text-white mb-4 uppercase italic">Copy Trading</h3>
                            <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest font-medium mb-8">Replica estrategias verificadas. Control total del capital y transparencia de resultados.</p>
                        </div>
                        <a href="${content.ctaCopyLink || ctaLink}" class="text-[10px] font-black text-white/60 group-hover:text-indigo-400 flex items-center gap-2 uppercase tracking-widest italic transition-colors">START COPYING <span class="material-symbols-outlined text-[10px]">arrow_forward</span></a>
                    </div>
                </div>
            </div>

            <!-- Table Detail (Refactored Minimalist) -->
            <div class="mt-32 section-reveal">
                <div class="text-center mb-16">
                    <h4 class="text-xs font-black text-indigo-500 uppercase tracking-[0.8em] italic">Detalle Técnico de Productos</h4>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse border-y border-white/5">
                        <tbody>
                            ${[
                                ['PropFirm (Forex/CFDs)', 'Traders que buscan capital fondeado', '1 o 2 fases. Hasta 80% Profit Split', content.ctaPropText || 'Ver PropFirm'],
                                ['PropFirm (Sintéticos)', 'Traders de índices algorítmicos', 'Programas Elite y Ultra', content.ctaSynText || 'Ver Sintéticos'],
                                ['Índices Sintéticos BM', 'Estrategas y Scalpers 24/7', 'Propios + Deriv + Weltrade', content.ctaSynText || 'Ver Sintéticos'],
                                ['Leverage X12', 'Traders experimentados', '12x Real sin Evaluación. Día 3', content.ctaX12Text || 'Ver Cuentas'],
                                ['Cuentas MAM / PAMM', 'Gestores y Grandes Inversores', 'Tecnología Equity & Cash. LPOA', content.ctaMamText || 'Ver Cuentas MAM'],
                                ['Copy Trading', 'Inversores que buscan rendimientos', 'Replica estrategias verificadas', content.ctaCopyText || 'Ver Copy Trading'],
                                ['Forex Institucional', 'Traders Retail y Pro', 'Spreads desde 0.0 / MT5 ECN', content.ctaForexText || 'Ver Cuentas Forex']
                            ].map(row => `
                                <tr class="group border-b border-white/5 hover:bg-white/[0.01] transition-all">
                                    <td class="py-10 px-4 text-xs font-black text-white uppercase group-hover:text-indigo-400 transition-colors italic">${row[0]}</td>
                                    <td class="py-10 px-4 text-[10px] text-white/30 uppercase tracking-widest font-medium italic">${row[1]}</td>
                                    <td class="py-10 px-4 text-[10px] text-white/50 font-black uppercase italic tracking-wider">${row[2]}</td>
                                    <td class="py-10 px-4 text-right">
                                        <a href="${ctaLink}" class="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-indigo-500 hover:bg-indigo-600/10 transition-all text-[9px] font-black uppercase tracking-widest text-white italic">
                                            ${row[3]} <span class="material-symbols-outlined text-[10px]">north_east</span>
                                        </a>
                                    </td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── TRADER vs INVESTOR (REFACTORED: SPLIT SCREEN EXPERIENCE) ──
export function renderInstSelector(content: Record<string, any>, brand: BrandConfig): string {
    const traderLink = content.ctaTraderLink || brand.ctaLink || "#";
    const investorLink = content.ctaInvestorLink || brand.ctaLink || "#";
    const traderText = content.ctaTraderText || "Acceso Directo";
    const investorText = content.ctaInvestorText || "Ver Estrategias";

    return `
    <section class="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-[#020202]">
        <!-- Left Side: Trader -->
        <div class="flex-1 p-16 md:p-32 flex flex-col justify-center relative group overflow-hidden hover:flex-[1.5] transition-all duration-700">
            <div class="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
                <span class="text-indigo-500 font-black text-xs uppercase tracking-widest mb-12 block italic">Quiero operar y generar beneficios</span>
                <h2 class="text-5xl md:text-[100px] font-black text-white mb-8 leading-none tracking-tighter uppercase">Soy <br><span class="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Trader</span></h2>
                <ul class="space-y-6 mb-16 max-w-sm">
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> PropFirm: Capital financiado
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> Índices Sintéticos: 100+ activos
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> Leverage X12: Sin evaluación
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> Forex retail: Spreads 0.0
                    </li>
                </ul>
                <a href="${traderLink}" class="inline-block px-12 py-6 border-2 border-white text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all italic shadow-2xl">
                    ${traderText}
                </a>
            </div>
        </div>

        <!-- Right Side: Investor -->
        <div class="flex-1 p-16 md:p-32 flex flex-col justify-center relative group overflow-hidden hover:flex-[1.5] transition-all duration-700 bg-white/[0.01]">
            <div class="absolute inset-0 bg-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
                <span class="text-slate-500 font-black text-xs uppercase tracking-widest mb-12 block italic">Quiero inversión con gestión pro</span>
                <h2 class="text-5xl md:text-[100px] font-black text-white mb-8 leading-none tracking-tighter uppercase">Soy <br><span class="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Inversor</span></h2>
                <ul class="space-y-6 mb-16 max-w-sm">
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> Copy Trading: Réplica verificada
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> MAM Equity: Transparencia total
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> MAM Cash: Inversión pasiva
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors italic">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> Social Trading: Conecta pro
                    </li>
                </ul>
                <a href="${investorLink}" class="inline-block px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-xl italic">
                    ${investorText}
                </a>
            </div>
        </div>
    </section>
    `;
}

// ─── IB PROGRAM (REFACTORED: BOLD & GRAPHIC) ────────────────
export function renderInstPartners(content: Record<string, any>, brand: BrandConfig): string {
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="py-40 px-8 bg-[#020202]">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center section-reveal">
                <div class="lg:col-span-7">
                    <h2 class="text-6xl md:text-[100px] font-black font-montserrat text-white leading-[0.85] uppercase tracking-tighter mb-12">Construye <br>tu Propia <br><span class="text-indigo-500">Red.</span></h2>
                    <p class="text-xl md:text-3xl text-white/40 font-light mb-12 max-w-2xl leading-tight">Conviértete en socio IB y conecta traders con el ecosistema más completo del mercado.</p>
                    
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-8 mb-16">
                        ${[
                            ['Comisiones Recurrentes', 'Ingresos por cada lote operado por tus referidos.'],
                            ['Marketing List', 'Acceso a landings personalizables y banners.'],
                            ['Soporte VIP', 'Canal directo con el equipo de Bridge Markets.'],
                            ['Panel IB Pro', 'Monitoreo total de volúmenes y comisiones.']
                        ].map(item => `
                            <div>
                                <div class="text-indigo-400 font-black text-[10px] uppercase tracking-widest mb-2">${item[0]}</div>
                                <p class="text-xs text-white/30 font-medium uppercase tracking-wider leading-relaxed">${item[1]}</p>
                            </div>
                        `).join('')}
                    </div>

                    <a href="${ctaLink}" class="inline-block px-12 py-6 bg-indigo-600 text-white font-black rounded-full uppercase tracking-[0.2em] text-[10px] hover:scale-105 transition-all shadow-2xl">
                        Unirme al Programa →
                    </a>
                </div>
                <div class="lg:col-span-5 relative">
                    <div class="aspect-square bg-gradient-to-br from-indigo-600/20 to-slate-900 border border-white/10 rounded-[4rem] flex items-center justify-center p-12 overflow-hidden group">
                        <img src="/images/imagenes_nuevas/reyna_rosa.png" class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000 rotate-6">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── TECHNOLOGY CARDS (REFACTORED: MINIMALIST GRID) ─────────
export function renderInstTech(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 section-reveal">
                ${[
                    { t: 'MT5', s: 'PLATAFORMA INSTITUCIONAL' },
                    { t: 'CHARTS', s: 'GRÁFICOS 24/7' },
                    { t: 'ACADEMY', s: 'EDUCACIÓN PRO' },
                    { t: 'PORTAL', s: 'GESTIÓN TOTAL' }
                ].map(item => `
                    <div class="p-12 bg-white/[0.01] border border-white/5 rounded-[3.5rem] text-center hover:border-indigo-500/50 transition-all">
                        <h4 class="text-4xl font-black text-white mb-2 uppercase italic tracking-tighter">${item.t}</h4>
                        <p class="text-[10px] text-indigo-500 font-black tracking-[0.4em]">${item.s}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── ONBOARDING STEPS (REFACTORED: MINIMALIST FLOW) ─────────
export function renderInstWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
            <div class="section-reveal text-center">
                <h2 class="text-3xl md:text-5xl font-black text-white uppercase tracking-tighter mb-20">Cómo empezar en <span class="italic text-indigo-500">Bridge</span></h2>
                <div class="flex flex-wrap justify-center gap-4">
                    ${[
                        'Crea tu cuenta', 'Completa KYC', 'Elige producto', 'Deposita', 'Descarga MT5', 'Opera o Invierte', 'Crece'
                    ].map((step, idx) => `
                        <div class="flex items-center gap-4 px-8 py-4 bg-white/[0.02] border border-white/5 rounded-full hover:bg-indigo-600 transition-all group">
                            <span class="text-xs font-black text-white/20 group-hover:text-white/40 font-montserrat">${idx + 1}</span>
                            <span class="text-[10px] font-black text-white uppercase tracking-widest whitespace-nowrap">${step}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── COMMUNITY ──────────────────────────────────────────────
export function renderInstCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.communityName || brand.communityName || brand.fullName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestro ecosistema global y conecta con la tecnología institucional.';
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1611974717482-aa8a29910609?auto=format&fit=crop&q=80";
    
    const telegram = content.socialTelegram || brand.telegram || "#";
    const whatsapp = content.socialWhatsApp || brand.whatsapp || "#";
    const instagram = content.socialInstagram || brand.instagram || "#";
    const youtube = content.socialYouTube || brand.youtube || "#";
    
    const supportLabel = content.supportLabel || "Soporte del IB";
    const ctaText = content.ctaText || "Habla con un asesor";
    const ctaLink = brand.ctaLink || "#";

    return `
    <section id="comunidad" class="py-40 px-8 bg-[#020202] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="relative p-12 md:p-24 bg-gradient-to-br from-indigo-950/20 via-[#050505] to-[#020202] border border-white/10 rounded-[5rem] overflow-hidden section-reveal">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                    <div class="lg:col-span-8">
                        <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-12 block italic underline underline-offset-8 decoration-indigo-600">Partner Community</span>
                        <h2 class="text-5xl md:text-[90px] font-black font-montserrat text-white uppercase tracking-tighter leading-none mb-10 italic">${ibName}</h2>
                        <div class="text-xl md:text-2xl text-white/50 font-light mb-12 leading-relaxed italic max-w-2xl border-l-2 border-indigo-600 pl-8">
                            ${message}
                        </div>
                        
                        <div class="flex flex-wrap gap-4 mb-12">
                            ${whatsapp !== '#' ? `<a href="https://wa.me/${whatsapp}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all shadow-lg"><span class="material-symbols-outlined text-sm italic">chat</span></a>` : ''}
                            ${telegram !== '#' ? `<a href="${telegram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#24A1DE] transition-all shadow-lg"><span class="material-symbols-outlined text-sm italic">send</span></a>` : ''}
                            ${instagram !== '#' ? `<a href="${instagram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#E1306C] transition-all shadow-lg"><span class="material-symbols-outlined text-sm italic">photo_camera</span></a>` : ''}
                            ${youtube !== '#' ? `<a href="${youtube}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#FF0000] transition-all shadow-lg"><span class="material-symbols-outlined text-sm italic">play_circle</span></a>` : ''}
                        </div>

                        <div class="flex flex-wrap gap-6">
                            <a href="${ctaLink}" class="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl italic">
                                ${ctaText}
                            </a>
                            <a href="${whatsapp !== '#' ? `https://wa.me/${whatsapp}` : '#'}" class="px-12 py-5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all italic">
                                ${supportLabel}
                            </a>
                        </div>
                    </div>
                    <div class="lg:col-span-4 relative hidden lg:block">
                        <div class="aspect-square rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl group">
                            <img src="${photoUrl}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Community">
                        </div>
                        <div class="absolute -bottom-10 -right-10 w-40 h-40 opacity-10 pointer-events-none transform rotate-12">
                            <img src="/images/imagenes_nuevas/reyna_rosa.png" class="w-full h-full object-contain">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── FAQ (REFACTORED: CLEAN MINIMALIST) ─────────────────────
export function renderInstFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué es Bridge Markets?', a: 'Bridge Markets es un broker financiero internacional con sede en el Reino Unido y las Islas Marshall. Ofrece acceso a Forex, CFDs, índices sintéticos, PropTrading, MAM, Copy Trading y cuentas apalancadas, todo en un mismo ecosistema.' },
        { q: '¿Es seguro operar con Bridge Markets?', a: 'Sí. BM opera bajo entidades registradas internacionalmente, con fondos segregados y estándares institucionales de gestión del riesgo. Consulta nuestra documentación legal completa en el sitio.' },
        { q: '¿Qué productos ofrece Bridge Markets?', a: 'PropFirm (OBSIDIAN, BASALT, ELITE, ULTRA), Índices Sintéticos (más de 100 instrumentos), Leverage X12, Cuentas MAM, Copy Trading, Social Trading y cuentas Forex/CFDs.' },
        { q: '¿Cuál es la plataforma de trading?', a: 'MetaTrader 5 (MT5). Disponible para Windows, iOS y Android. Servidor: BridgeMarkets-MT5.' },
        { q: '¿Cuál es el depósito mínimo?', a: 'Depende del producto. Consulta las condiciones específicas de cada cuenta en el portal de cliente. Los precios varían según el producto y el tamaño de cuenta.' },
        { q: '¿En cuántos idiomas opera BM?', a: 'La plataforma está disponible en 9 idiomas: español, inglés, ruso, portugués, polaco, alemán, francés, rumano y thai.' },
        { q: '¿Puedo ser IB de Bridge Markets?', a: 'Sí. Contamos con un programa activo de Introducing Brokers con comisiones, materiales y soporte dedicado. Contacta a tu referido o al equipo BM para más información.' },
        { q: '¿Tienen programa de educación?', a: 'Sí. Bridge Markets ofrece academia de trading, webinars regulares, glosario institucional y material educativo disponible en el sitio oficial.' },
        { q: '¿Cómo solicito un retiro?', a: 'Los retiros se solicitan desde el portal de cliente. Las condiciones de tiempo y monto mínimo dependen del producto contratado.' },
        { q: '¿Bridge Markets tiene índices sintéticos propios?', a: 'Sí. BM ha desarrollado sus propios índices: Fortune, Vortex, BullX, BearX y FomoX. Además, ofrece índices de los ecosistemas Deriv y Weltrade, todos desde una sola cuenta.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505]">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl font-black text-white text-center uppercase tracking-tighter mb-24 italic underline decoration-indigo-600 underline-offset-8">Central de Consultas</h2>
            <div class="space-y-4">
                ${faqs.map(faq => `
                    <div class="p-10 bg-white/[0.01] border border-white/5 rounded-[2rem] hover:bg-white/[0.03] transition-all group">
                        <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 group-hover:text-indigo-400 transition-colors italic">${faq.q}</h4>
                        <p class="text-white/30 text-xs leading-relaxed uppercase font-medium tracking-wider italic">${faq.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── FINAL CTA ──────────────────────────────────────────────
export function renderInstFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaMainLink = brand.ctaLink || "#";
    const ctaRegisterText = content.ctaRegisterText || "Abrir Cuenta Real";
    const ctaProductsText = content.ctaProductsText || "Explorar Productos";
    const ctaIBText = content.ctaIBText || "Quiero ser IB";

    return `
    <section class="py-60 px-8 bg-[#020202] relative overflow-hidden text-center">
        <!-- Floating Circles -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
        
        <div class="max-w-6xl mx-auto relative z-10 section-reveal">
            <span class="text-indigo-500 font-black text-xs uppercase tracking-[0.5em] mb-12 block italic">Tu camino comienza aquí</span>
            <h2 class="text-6xl md:text-[120px] font-black text-white uppercase leading-[0.85] tracking-tighter mb-12 italic">
                Un solo Broker. <br>
                <span class="text-indigo-500">Todo</span> lo que necesitas.
            </h2>
            
            <p class="text-xl text-white/40 mb-20 max-w-2xl mx-auto italic">No importa si eres trader, inversor o gestor. En Bridge Markets tienes el ecosistema completo para crecer.</p>
            
            <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
                <a href="${content.ctaRegisterLink || ctaMainLink}" class="px-12 py-6 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-[10px] hover:scale-105 active:scale-95 transition-all shadow-2xl italic">
                    ${ctaRegisterText}
                </a>
                <a href="${content.ctaProductsLink || '#ecosistema'}" class="px-12 py-6 bg-white/5 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-white/10 transition-all italic">
                    ${ctaProductsText}
                </a>
                <a href="${content.ctaIBLink || ctaMainLink}" class="px-12 py-6 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all italic">
                    ${ctaIBText}
                </a>
            </div>
            
            <p class="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black max-w-3xl mx-auto leading-loose italic">
                DISCLAIMER: LOS PRODUCTOS FINANCIEROS CON APALANCAMIENTO CONLLEVAN RIESGO. RESULTADOS PASADOS NO GARANTIZAN RENDIMIENTOS FUTUROS. LEA NUESTRA DECLARACIÓN DE RIESGOS ANTES DE OPERAR.
            </p>
        </div>
    </section>
    `;
}

// ─── INSTITUTIONAL FOOTER ──────────────────────────────────
export function renderInstFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const currentYear = new Date().getFullYear();
    const supportLink = content.socialWhatsApp ? `https://wa.me/${content.socialWhatsApp}` : (brand.whatsapp ? `https://wa.me/${brand.whatsapp}` : brand.ctaLink || "#");

    return `
    <footer class="py-24 px-8 bg-[#010101] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
                <div class="col-span-2">
                    <img src="/images/logo-bm-blanco.png" class="h-6 mb-8">
                    <p class="text-[10px] text-white/30 uppercase tracking-[0.2em] leading-relaxed mb-8 max-w-xs font-black italic">Ecosistema financiero completo para traders e inversores globales.</p>
                    <div class="space-y-2">
                        <div class="text-[9px] text-white/20 uppercase tracking-widest font-black italic">Bridge Markets Limited — UK Reg. 15159310</div>
                        <div class="text-[9px] text-white/20 uppercase tracking-widest font-black italic">Bridge Markets Ltd. — Marshall Islands Reg. 113891</div>
                    </div>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6 italic underline decoration-indigo-600 decoration-2 underline-offset-4">Trading</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest italic">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">MetaTrader 5</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Cuentas ECN</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">MAM / PAMM</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">PropFirm</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6 italic underline decoration-indigo-600 decoration-2 underline-offset-4">Educación</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest italic">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Glosario</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Academia</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Webinars</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6 italic underline decoration-indigo-600 decoration-2 underline-offset-4">Legal</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest italic">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Términos</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Privacidad</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">AML / KYC</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Riesgos</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6 italic underline decoration-indigo-600 decoration-2 underline-offset-4">Soporte</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest italic">
                        <li><a href="${supportLink}" class="hover:text-indigo-400 transition-colors">Soporte IB</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Corporate Mail</a></li>
                    </ul>
                </div>
            </div>

            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-3xl mb-12">
                <p class="text-[9px] text-white/20 leading-relaxed uppercase tracking-widest font-medium italic">
                    ADVERTENCIA DE RIESGO: EL TRADING DE CFDS CON APALANCAMIENTO CONLLEVA UN ALTO NIVEL DE RIESGO PARA SU CAPITAL Y PUEDE DAR LUGAR A PÉRDIDAS QUE SUPEREN SU DEPÓSITO INICIAL. LOS PRODUCTOS DE BRIDGE MARKETS NO SON ADECUADOS PARA TODOS LOS INVERSORES. ASEGÚRESE DE COMPRENDER PLENAMENTE LOS RIESGOS IMPLICADOS. BRIDGE MARKETS LTD NO OFRECE SERVICIOS A RESIDENTES DE CIERTAS JURISDICCIONES COMO EE. UU., IRÁN, COREA DEL NORTE, ENTRE OTROS.
                </p>
            </div>

            <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12">
                <div class="text-[9px] text-white/10 uppercase tracking-widest font-black italic">© ${currentYear} BridgeMarkets LTD. UK & Marshall Islands. All rights reserved.</div>
                <div class="text-right">
                    <div class="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2 italic">Presentado por <span class="text-white">${ibName}</span></div>
                    <div class="text-[8px] text-white/10 uppercase tracking-widest leading-relaxed font-bold italic italic italic italic italic">Tecnología Institucional Bridge Markets</div>
                </div>
            </div>
        </div>
    </footer>
    `;
}

/**
 * Renders the Institutional Registration Form.
 * Minimalist, professional, and corporate style.
 */
export function renderInstRegistration(content: Record<string, any>, brand: BrandConfig): string {
    const partnerId = brand.partnerId || "BM_GLOBAL";
    const slug = brand.slug || 'default';
    
    return `
    <section id="registro" class="py-40 px-8 bg-[#020202] relative">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/10 rounded-[4rem] overflow-hidden shadow-2xl">
                <!-- Info -->
                <div class="p-16 md:p-24 bg-[#050505] flex flex-col justify-center">
                    <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-12 block italic">Apertura de Cuenta</span>
                    <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase leading-none mb-10 tracking-tighter italic">Forma parte de la <br><span class="text-white/40 italic">Nueva Era.</span></h2>
                    <p class="text-lg text-white/40 font-light mb-12 leading-relaxed italic">
                        Inicia tu proceso de registro institucional. Un especialista se pondrá en contacto contigo para finalizar la configuración de tu portafolio.
                    </p>
                    <div class="space-y-6">
                        <div class="flex items-center gap-6">
                            <span class="w-12 h-px bg-indigo-600"></span>
                            <span class="text-[10px] font-black text-white/60 uppercase tracking-widest italic">Verificación KYC Instantánea</span>
                        </div>
                        <div class="flex items-center gap-6">
                            <span class="w-12 h-px bg-indigo-600"></span>
                            <span class="text-[10px] font-black text-white/60 uppercase tracking-widest italic">Soporte Multilingüe 24/7</span>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="p-16 md:p-24 bg-[#080808]">
                    <form id="instLeadForm" class="space-y-10">
                        <input type="hidden" name="partnerId" value="${partnerId}">
                        <input type="hidden" name="landingSlug" value="${slug}">
                        <input type="hidden" name="source" value="institutional_registration">
                        
                        <div class="relative group">
                            <label class="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 group-focus-within:text-indigo-500 transition-colors">Nombre Completo</label>
                            <input type="text" required name="name" placeholder="JUAN PÉREZ" 
                                class="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/5 uppercase tracking-widest font-bold">
                        </div>
                        
                        <div class="relative group">
                            <label class="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 group-focus-within:text-indigo-500 transition-colors">Email Corporativo</label>
                            <input type="email" required name="email" placeholder="JUAN@EMPRESA.COM" 
                                class="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/5 uppercase tracking-widest font-bold">
                        </div>

                        <div class="relative group">
                            <label class="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4 group-focus-within:text-indigo-500 transition-colors">WhatsApp / Móvil</label>
                            <input type="tel" required name="whatsapp" placeholder="+34 600 000 000" 
                                class="w-full bg-transparent border-b border-white/10 py-4 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/5 uppercase tracking-widest font-bold">
                        </div>

                        <button type="submit" id="instSubmitBtn" class="w-full py-8 bg-white text-black font-black uppercase tracking-[0.3em] text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl active:scale-95 italic">
                            Solicitar Acceso →
                        </button>
                    </form>
                    <div id="instFormMessage" class="mt-8 text-center"></div>
                </div>
            </div>
        </div>

        <script>
            document.getElementById("instLeadForm").addEventListener("submit", async function(e) {
                e.preventDefault();
                const btn = document.getElementById("instSubmitBtn");
                const msg = document.getElementById("instFormMessage");
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                const originalText = btn.textContent;
                btn.disabled = true;
                btn.textContent = "PROCESANDO SOLICITUD...";
                
                try {
                    const res = await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });
                    
                    if (res.ok) {
                        btn.style.backgroundColor = "#4f46e5";
                        btn.style.color = "white";
                        btn.textContent = "SOLICITUD ENVIADA CON ÉXITO";
                        msg.innerHTML = '<p class="text-indigo-500 font-black text-[10px] uppercase tracking-widest italic">Un asesor se pondrá en contacto contigo a la brevedad.</p>';
                        this.reset();
                        
                        setTimeout(() => {
                            window.location.href = 'https://portal.bridgemarkets.global/register?partner=' + data.partnerId;
                        }, 2000);
                    } else {
                        throw new Error();
                    }
                } catch (err) {
                    btn.style.backgroundColor = "#ef4444";
                    btn.textContent = "ERROR EN EL SISTEMA";
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.style.backgroundColor = "white";
                        btn.style.color = "black";
                        btn.textContent = originalText;
                    }, 3000);
                }
            });
        </script>
    </section>`;
}
