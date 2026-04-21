import { BrandConfig } from '../types';

// ─── INSTITUTIONAL HERO (REFACTORED: ASYMMETRIC & BOLD) ─────
export function renderInstHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Oficial';
    const ibPhrase = brand.heroPhrase || "";
    const ctaMainText = content.ctaMainText || "Abrir mi cuenta";
    const ctaMainLink = brand.ctaLink || "#";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#020202]">
        <!-- Decorative Background Elements -->
        <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full animate-pulse-slow"></div>
        <div class="absolute bottom-[-10%] left-[-5%] w-[400px] h-[400px] bg-slate-800/20 blur-[120px] rounded-full"></div>
        
        <!-- Large Background Text (Decorative) -->
        <div class="absolute top-1/2 left-0 -translate-y-1/2 text-[20vw] font-black text-white/[0.02] uppercase select-none pointer-events-none whitespace-nowrap tracking-tighter">
            BRIDGE MARKETS
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-8 section-reveal">
                    <div class="inline-block px-4 py-1.5 bg-indigo-600/10 border border-indigo-500/30 rounded-full mb-8">
                        <span class="text-[10px] font-black text-indigo-400 uppercase tracking-[0.4em]">Ecosistema Institucional Global</span>
                    </div>
                    
                    <h1 class="text-6xl md:text-[120px] font-black font-montserrat text-white leading-[0.9] uppercase tracking-tighter mb-10">
                        Tu mundo <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic">Financiero</span><br>
                        Completo.
                    </h1>
                    
                    <p class="text-xl md:text-3xl text-white/40 font-light mb-12 max-w-2xl leading-tight">
                        Desde Forex y CFDs hasta índices sintéticos exclusivos. Todo lo que necesitas. <span class="text-white">Un solo broker.</span>
                    </p>

                    <div class="flex flex-col md:flex-row items-center gap-8">
                        <a href="${ctaMainLink}" class="group relative px-12 py-6 bg-white text-black font-black rounded-full overflow-hidden transition-all hover:pr-16 active:scale-95 shadow-2xl">
                            <span class="relative z-10 uppercase tracking-widest text-xs">${ctaMainText}</span>
                            <span class="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all material-symbols-outlined">arrow_forward</span>
                        </a>
                        <div class="flex items-center gap-6">
                            <div class="flex -space-x-3">
                                <div class="w-10 h-10 rounded-full border-2 border-[#020202] bg-slate-800 flex items-center justify-center"><span class="text-[10px] text-white">UK</span></div>
                                <div class="w-10 h-10 rounded-full border-2 border-[#020202] bg-slate-700 flex items-center justify-center"><span class="text-[10px] text-white">EU</span></div>
                                <div class="w-10 h-10 rounded-full border-2 border-[#020202] bg-slate-600 flex items-center justify-center"><span class="material-symbols-outlined text-xs text-white">public</span></div>
                            </div>
                            <span class="text-[10px] font-black text-white/30 uppercase tracking-widest">Presencia Global Regulada</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-4 relative section-reveal delay-200">
                    <div class="relative z-10 p-8 bg-white/[0.02] border border-white/10 rounded-[3rem] backdrop-blur-xl transform rotate-3 hover:rotate-0 transition-all duration-700">
                        <div class="flex justify-between items-start mb-12">
                            <img src="/images/logo-bm-blanco.png" class="h-6">
                            <div class="w-3 h-3 bg-indigo-500 rounded-full animate-ping"></div>
                        </div>
                        <div class="space-y-8">
                            <div>
                                <div class="text-[10px] text-white/30 uppercase tracking-widest mb-2 font-black italic">Presentado por</div>
                                <div class="text-2xl font-black text-white uppercase tracking-tighter">${ibName}</div>
                            </div>
                            <p class="text-sm text-white/50 italic leading-relaxed font-light">"${ibPhrase || 'Bienvenidos al estándar institucional de Bridge Markets.'}"</p>
                        </div>
                    </div>
                    <!-- Decorative shapes -->
                    <div class="absolute -top-10 -left-10 w-32 h-32 bg-indigo-600/20 rounded-full blur-2xl"></div>
                    <div class="absolute -bottom-10 -right-10 w-24 h-24 border border-white/10 rounded-full"></div>
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
    return `
    <section id="ecosistema" class="py-40 px-8 bg-[#020202]">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block">Portafolio</span>
                <h2 class="text-4xl md:text-7xl font-black font-montserrat text-white uppercase tracking-tighter mb-8">Ecosistema de Productos</h2>
                <p class="text-white/40 text-xl max-w-3xl leading-relaxed">Cada solución está diseñada para un perfil específico, unificada bajo el mismo estándar de excelencia institucional.</p>
            </div>

            <!-- Bento Grid -->
            <div class="grid grid-cols-1 md:grid-cols-12 gap-6 section-reveal">
                <!-- Large: PropFirm -->
                <div class="md:col-span-8 p-12 bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-white/10 rounded-[3.5rem] group hover:border-indigo-500/50 transition-all flex flex-col justify-between min-h-[400px]">
                    <div>
                        <div class="flex justify-between items-center mb-12">
                            <span class="px-4 py-2 bg-indigo-500/20 text-indigo-400 rounded-full text-[10px] font-black uppercase tracking-widest">Producto Estrella</span>
                            <span class="text-xs text-white/20 font-black">BM-PROP</span>
                        </div>
                        <h3 class="text-4xl md:text-6xl font-black text-white mb-6 uppercase tracking-tighter">PropFirm</h3>
                        <p class="text-white/50 text-lg font-light max-w-md">Opera con capital financiado real sin arriesgar tu dinero. Programas Obsidian, Basalt, Elite y Ultra.</p>
                    </div>
                    <a href="#" class="inline-flex items-center gap-4 text-xs font-black text-white uppercase tracking-widest hover:gap-6 transition-all">Ver Programas <span class="material-symbols-outlined">arrow_right_alt</span></a>
                </div>

                <!-- Small: Synthetics -->
                <div class="md:col-span-4 p-10 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.04] transition-all flex flex-col justify-between">
                    <div>
                        <span class="text-xs text-white/20 font-black mb-12 block">BM-SYN</span>
                        <h3 class="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">Índices Sintéticos</h3>
                        <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Más de 100 instrumentos propios y exclusivos 24/7.</p>
                    </div>
                    <a href="#" class="material-symbols-outlined text-indigo-500">open_in_new</a>
                </div>

                <!-- Medium: Leverage X12 -->
                <div class="md:col-span-4 p-10 bg-white/[0.02] border border-white/5 rounded-[3.5rem] hover:bg-white/[0.04] transition-all flex flex-col justify-between">
                    <div>
                        <span class="text-xs text-white/20 font-black mb-12 block">BM-LX12</span>
                        <h3 class="text-3xl font-black text-white mb-4 uppercase tracking-tight italic">Leverage X12</h3>
                        <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed">Sin evaluación. Multiplica tu capital x12 directamente.</p>
                    </div>
                    <a href="#" class="material-symbols-outlined text-indigo-500">bolt</a>
                </div>

                <!-- Medium: MAM & Copy -->
                <div class="md:col-span-8 p-12 bg-white/[0.01] border border-white/10 rounded-[3.5rem] hover:border-white/30 transition-all grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div class="flex flex-col justify-between">
                        <div>
                            <h3 class="text-2xl font-black text-white mb-4 uppercase">MAM Accounts</h3>
                            <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest">Gestión profesional centralizada para capitales institucionales.</p>
                        </div>
                        <a href="#" class="text-[10px] font-black text-white/60 hover:text-white">LPOA PROTECTED →</a>
                    </div>
                    <div class="flex flex-col justify-between">
                        <div>
                            <h3 class="text-2xl font-black text-white mb-4 uppercase">Copy Trading</h3>
                            <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest">Replica estrategias de traders verificados con control total.</p>
                        </div>
                        <a href="#" class="text-[10px] font-black text-white/60 hover:text-white">SOCIAL TRADING →</a>
                    </div>
                </div>
            </div>

            <!-- Table Detail (Refactored Minimalist) -->
            <div class="mt-32 section-reveal">
                <div class="text-center mb-16">
                    <h4 class="text-xs font-black text-white/20 uppercase tracking-[0.6em]">Detalle Técnico Unificado</h4>
                </div>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse border-y border-white/5">
                        <tbody>
                            ${[
                                ['PropFirm (Forex/CFDs)', 'Traders que buscan capital fondeado', 'Hasta 80% Profit Split'],
                                ['PropFirm (Sintéticos)', 'Traders de índices algorítmicos', 'Programas Elite y Ultra'],
                                ['Índices Sintéticos BM', 'Estrategas y Scalpers 24/7', 'Indices Propios + Deriv + Weltrade'],
                                ['Leverage X12', 'Traders experimentados', '12x Real sin Evaluación'],
                                ['Cuentas MAM / PAMM', 'Gestores y Grandes Inversores', 'Tecnología Equity & Cash'],
                                ['Forex Institucional', 'Traders Retail y Pro', 'Spreads desde 0.0 / MT5']
                            ].map(row => `
                                <tr class="group border-b border-white/5 hover:bg-white/[0.01] transition-all">
                                    <td class="py-8 px-4 text-xs font-black text-white uppercase group-hover:text-indigo-400 transition-colors">${row[0]}</td>
                                    <td class="py-8 px-4 text-[10px] text-white/30 uppercase tracking-widest">${row[1]}</td>
                                    <td class="py-8 px-4 text-[10px] text-white/50 font-bold uppercase italic">${row[2]}</td>
                                    <td class="py-8 px-4 text-right">
                                        <a href="#" class="inline-block p-4 rounded-full border border-white/10 hover:border-indigo-500 transition-all">
                                            <span class="material-symbols-outlined text-xs text-white">north_east</span>
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
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="min-h-screen flex flex-col lg:flex-row relative overflow-hidden bg-[#020202]">
        <!-- Vertical Label -->
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none hidden lg:block">
            <div class="text-[120px] font-black text-white/5 uppercase tracking-tighter transform -rotate-90">CHOOSE</div>
        </div>

        <!-- Left Side: Trader -->
        <div class="flex-1 p-16 md:p-32 flex flex-col justify-center relative group overflow-hidden hover:flex-[1.5] transition-all duration-700">
            <div class="absolute inset-0 bg-indigo-900/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
                <span class="text-indigo-500 font-black text-xs uppercase tracking-widest mb-12 block">Perfil Operativo</span>
                <h2 class="text-5xl md:text-[100px] font-black text-white mb-8 leading-none tracking-tighter uppercase">Soy <br><span class="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Trader</span></h2>
                <ul class="space-y-6 mb-16 max-w-sm">
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> PropFirm
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> Síntéticos
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span class="w-1 h-1 bg-indigo-500 rounded-full"></span> Leverage X12
                    </li>
                </ul>
                <a href="${ctaLink}" class="inline-block px-12 py-6 border-2 border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">Acceso Directo</a>
            </div>
        </div>

        <!-- Right Side: Investor -->
        <div class="flex-1 p-16 md:p-32 flex flex-col justify-center relative group overflow-hidden hover:flex-[1.5] transition-all duration-700 bg-white/[0.01]">
            <div class="absolute inset-0 bg-slate-800/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div class="relative z-10">
                <span class="text-slate-500 font-black text-xs uppercase tracking-widest mb-12 block">Perfil de Crecimiento</span>
                <h2 class="text-5xl md:text-[100px] font-black text-white mb-8 leading-none tracking-tighter uppercase">Soy <br><span class="italic text-transparent bg-clip-text bg-gradient-to-r from-white to-white/20">Inversor</span></h2>
                <ul class="space-y-6 mb-16 max-w-sm">
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> Copy Trading
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> MAM Equity
                    </li>
                    <li class="flex items-center gap-4 text-sm font-black text-white/40 uppercase tracking-widest group-hover:text-white transition-colors">
                        <span class="w-1 h-1 bg-slate-500 rounded-full"></span> MAM Cash
                    </li>
                </ul>
                <a href="${ctaLink}" class="inline-block px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-xl">Ver Estrategias</a>
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
                        <img src="/images/imagenes%20nuevas/reyna%20rosa.png" class="w-full h-full object-contain transform group-hover:scale-110 transition-transform duration-1000 rotate-6">
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
    const ibName = brand.communityName || brand.ibName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestro ecosistema global y conecta con la tecnología institucional.';
    const telegram = brand.telegram || '#';
    const whatsapp = brand.whatsapp || '#';

    return `
    <section id="comunidad" class="py-40 px-8 bg-[#020202]">
        <div class="max-w-7xl mx-auto">
            <div class="relative p-12 md:p-24 bg-gradient-to-br from-indigo-950/20 via-[#050505] to-[#020202] border border-white/10 rounded-[5rem] overflow-hidden section-reveal">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                    <div class="lg:col-span-8">
                        <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-12 block italic">Partner Community</span>
                        <h2 class="text-5xl md:text-8xl font-black font-montserrat text-white uppercase tracking-tighter leading-none mb-10">${ibName}</h2>
                        <p class="text-xl md:text-2xl text-white/50 font-light mb-12 leading-relaxed italic max-w-2xl">"${message}"</p>
                        
                        <div class="flex flex-wrap gap-6">
                            <a href="${telegram}" class="px-12 py-5 bg-[#24A1DE] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">Telegram</a>
                            <a href="${whatsapp}" class="px-12 py-5 bg-[#25D366] text-white rounded-full font-black uppercase tracking-widest text-[10px] hover:scale-105 transition-all">WhatsApp</a>
                        </div>
                    </div>
                    <div class="lg:col-span-4 opacity-10">
                        <img src="/images/imagenes%20nuevas/hourglass.png" class="w-full h-auto transform -rotate-12">
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
        { q: '¿Qué es Bridge Markets?', a: 'Broker financiero internacional (Reino Unido / Marshall) que ofrece Forex, Sintéticos, PropFirm, MAM y Copy Trading en un mismo ecosistema.' },
        { q: '¿Es seguro?', a: 'Entidades registradas, fondos segregados y estándares institucionales. Consulta la documentación legal en el sitio oficial.' },
        { q: '¿Qué productos hay?', a: 'PropFirm, Índices Sintéticos (100+), Leverage X12, MAM, Copy Trading y Forex retail.' },
        { q: '¿Plataforma?', a: 'MetaTrader 5 (MT5) para Windows, iOS y Android. Servidor: BridgeMarkets-MT5.' },
        { q: '¿Depósito mínimo?', a: 'Varía según el producto. Consulta detalles específicos en el portal de cliente tras tu registro.' },
        { q: '¿Sintéticos Propios?', a: 'Sí: Fortune, Vortex, BullX, BearX y FomoX. Integrados con Deriv y Weltrade en una sola MT5.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505]">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl font-black text-white text-center uppercase tracking-tighter mb-24 italic underline decoration-indigo-600 underline-offset-8">Central de Consultas</h2>
            <div class="space-y-4">
                ${faqs.map(faq => `
                    <div class="p-10 bg-white/[0.01] border-b border-white/10 hover:bg-white/[0.03] transition-all group">
                        <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 group-hover:text-indigo-400 transition-colors">${faq.q}</h4>
                        <p class="text-white/30 text-xs leading-relaxed uppercase font-medium tracking-wider">${faq.a}</p>
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

    return `
    <section class="py-60 px-8 bg-[#020202] relative overflow-hidden text-center">
        <!-- Floating Circles -->
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-white/5 rounded-full"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
        
        <div class="max-w-6xl mx-auto relative z-10 section-reveal">
            <h2 class="text-6xl md:text-[140px] font-black text-white uppercase leading-[0.85] tracking-tighter mb-12">
                Un solo Broker. <br>
                <span class="text-indigo-500 italic">Todo</span><br>
                lo que necesitas.
            </h2>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-8 mb-20">
                <a href="${ctaMainLink}" class="px-16 py-8 bg-white text-black font-black rounded-full uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(255,255,255,0.2)]">
                    Abrir Cuenta Real →
                </a>
                <a href="#ecosistema" class="px-12 py-6 text-white font-black uppercase tracking-widest text-xs border-b-2 border-indigo-600 hover:text-indigo-400 transition-all">
                    Explorar Productos
                </a>
            </div>
            
            <p class="text-[9px] text-white/20 uppercase tracking-[0.4em] font-black max-w-2xl mx-auto leading-loose italic">
                "Los productos financieros con apalancamiento conllevan riesgo. Resultados pasados no garantizan rendimientos futuros. Operar con responsabilidad es la clave del éxito."
            </p>
        </div>
    </section>
    `;
}

// ─── INSTITUTIONAL FOOTER ──────────────────────────────────
export function renderInstFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Oficial';
    const currentYear = new Date().getFullYear();

    return `
    <footer class="py-24 px-8 bg-[#010101] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-12 mb-24">
                <div class="col-span-2">
                    <img src="/images/logo-bm-blanco.png" class="h-6 mb-8">
                    <p class="text-[10px] text-white/30 uppercase tracking-[0.2em] leading-relaxed mb-8 max-w-xs">Tecnología de ejecución institucional para traders e inversores globales.</p>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6">Trading</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">MetaTrader 5</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Cuentas ECN</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">MAM / PAMM</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6">Soporte</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Glosario</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Academia</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Contacto</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6">Legal</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Términos</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Privacidad</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">KYC</a></li>
                    </ul>
                </div>
                <div>
                    <h5 class="text-[10px] font-black text-white uppercase tracking-widest mb-6">Red</h5>
                    <ul class="space-y-4 text-[9px] text-white/40 uppercase font-bold tracking-widest">
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Ser IB</a></li>
                        <li><a href="#" class="hover:text-indigo-400 transition-colors">Programa Socios</a></li>
                    </ul>
                </div>
            </div>

            <div class="pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-end gap-12">
                <div class="text-[9px] text-white/10 uppercase tracking-widest font-black italic">© ${currentYear} BridgeMarkets LTD. UK & Marshall Islands.</div>
                <div class="text-right">
                    <div class="text-[10px] text-white/40 font-black uppercase tracking-widest mb-2 italic">Presentado por <span class="text-white">${ibName}</span></div>
                    <div class="text-[8px] text-white/10 uppercase tracking-widest leading-relaxed">ADVERTENCIA: Operar productos financieros conlleva un alto riesgo. <br> Resultados pasados no garantizan rendimientos futuros.</div>
                </div>
            </div>
        </div>
    </footer>
    `;
}
