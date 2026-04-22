import { BrandConfig } from '../types';

// ─── SECTION 1 — HERO (PRODUCTO SINTÉTICOS - NUEVO DISEÑO) ──────────────────
export function renderSPHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Comenzar Operativa";
    const ctaLink = content.ctaUrl || brand.ctaLink || "#";

    return `
    <section class="relative min-h-[90vh] flex items-center pt-24 pb-20 overflow-hidden bg-[#050505]">
        <!-- Technical Grid Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:40px_40px]"></div>
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_20%_30%,_rgba(16,185,129,0.08)_0%,_transparent_50%)]"></div>
            <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-emerald-500/5 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/3"></div>
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                <div class="lg:col-span-7 section-reveal">
                    <!-- Tech Badge -->
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-10">
                        <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Tecnología Sintética v4.0</span>
                    </div>
                    
                    <h1 class="text-6xl md:text-[95px] font-black font-montserrat text-white leading-[0.85] uppercase tracking-tightest mb-10">
                        Pura <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Matemática</span><br>
                        en Movimiento.
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-slate-400 font-light mb-12 max-w-2xl leading-relaxed">
                        Experimenta los <span class="text-white font-bold">Índices Sintéticos</span> de Bridge Markets. Activos digitales diseñados para el trader algorítmico y de alta frecuencia.
                    </p>

                    <div class="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-12">
                        <div class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                            <div class="text-emerald-500 font-black text-xl mb-1">24/7</div>
                            <div class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Disponibilidad</div>
                        </div>
                        <div class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl">
                            <div class="text-emerald-500 font-black text-xl mb-1">0ms</div>
                            <div class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Slippage Latency</div>
                        </div>
                        <div class="p-4 bg-white/[0.03] border border-white/5 rounded-2xl hidden sm:block">
                            <div class="text-emerald-500 font-black text-xl mb-1">RNG</div>
                            <div class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Auditado BMM</div>
                        </div>
                    </div>

                    ${ibPhrase ? `<p class="text-lg text-emerald-400/80 font-medium mb-12 border-l-4 border-emerald-600 pl-8 italic">"${ibPhrase}"</p>` : ''}

                    <div class="flex flex-col sm:flex-row items-center gap-6">
                        <a href="${ctaLink}" class="w-full sm:w-auto text-center px-10 py-5 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs">
                            ${ctaText}
                        </a>
                        <div class="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                            <img src="/images/logo-bm-blanco.png" class="h-4 opacity-20">
                            <span>Verificado por ${ibName}</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 relative hidden lg:block section-reveal delay-500">
                    <div class="relative">
                        <div class="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse-slow"></div>
                        <img src="/images/imagenes_nuevas/caballo_negro.png" 
                             class="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-float">
                    </div>
                    <!-- Technical Overlay -->
                    <div class="absolute -bottom-10 -right-10 p-8 bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl z-20 max-w-[240px]">
                        <div class="flex items-center gap-3 mb-4">
                            <div class="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span class="text-[10px] font-black text-white uppercase tracking-widest">Market Status</span>
                        </div>
                        <div class="space-y-3">
                            <div class="h-1 bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-emerald-500 w-[85%] animate-pulse"></div></div>
                            <div class="h-1 bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-emerald-500 w-[60%] animate-pulse"></div></div>
                            <div class="h-1 bg-white/5 rounded-full overflow-hidden"><div class="h-full bg-emerald-500 w-[92%] animate-pulse"></div></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 2 — ABOUT (GLASSMORPHISM) ──────────────────────
export function renderSPAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="bg-gradient-to-r from-white/[0.03] to-transparent p-12 md:p-24 rounded-[4rem] border border-white/5 relative overflow-hidden section-reveal">
                <div class="absolute top-0 right-0 p-8">
                    <span class="text-[60px] font-black text-white/[0.02] uppercase leading-none select-none">ALGORITHM</span>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                    <div class="lg:col-span-5">
                        <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Definición Técnica</span>
                        <h2 class="text-4xl md:text-5xl font-black text-white uppercase leading-tight tracking-tighter">
                            ¿Qué son los <br><span class="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">Sintéticos?</span>
                        </h2>
                    </div>
                    <div class="lg:col-span-7 space-y-8">
                        <p class="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                            Son instrumentos diseñados digitalmente mediante algoritmos de <span class="text-white font-bold italic">Generación Aleatoria Controlada (RNG)</span>. Estos simulan las condiciones reales de oferta y demanda sin depender de factores externos como la política o la economía mundial.
                        </p>
                        <p class="text-lg md:text-xl text-slate-400 leading-relaxed font-light">
                            En Bridge Markets, te ofrecemos un entorno operativo donde la <span class="text-emerald-400">volatilidad es constante</span> y la ejecución es instantánea, permitiendo que tu estrategia técnica sea el único factor determinante.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 3 — VENTAJAS (CYBER GRID) ────────────────────────────────────
export function renderSPAdvantages(content: Record<string, any>, brand: BrandConfig): string {
    const advantages = [
        { t: 'Ciclos 24/7/365', d: 'Los algoritmos no descansan. Opera índices de volatilidad en cualquier momento del día o la noche.', i: 'monitoring' },
        { t: 'Ejecución Flash', d: 'Latencia ultra-baja diseñada para sistemas de alta frecuencia y scalping agresivo.', i: 'bolt' },
        { t: 'Independencia Total', d: 'Sin riesgo de gaps por noticias o cierres de sesión. Gráficos continuos y predecibles.', i: 'shield' },
        { t: 'Auditado por BMM', d: 'Sistemas de aleatoriedad verificados por terceros para garantizar imparcialidad estadística.', i: 'verified' },
        { t: 'Optimizado para Bots', d: 'Entornos ideales para el entrenamiento y despliegue de Expert Advisors (EAs).', i: 'memory' },
        { t: 'Spreads Ajustados', d: 'Costos operativos institucionales que maximizan el potencial de cada trade.', i: 'query_stats' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tightest">Ventajas de <span class="text-emerald-500">Nueva Generación</span></h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-reveal">
                ${advantages.map((a, i) => `
                    <div class="p-10 bg-[#0a0a0a] border border-white/5 rounded-3xl group hover:border-emerald-500/40 transition-all duration-500 relative overflow-hidden">
                        <div class="absolute -right-4 -bottom-4 text-emerald-500/5 group-hover:text-emerald-500/10 transition-colors">
                            <span class="material-symbols-outlined text-[100px]">${a.i}</span>
                        </div>
                        <div class="relative z-10">
                            <div class="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 mb-8 group-hover:scale-110 transition-transform">
                                <span class="material-symbols-outlined text-3xl">${a.i}</span>
                            </div>
                            <h3 class="text-xl font-black text-white uppercase tracking-tighter mb-4">${a.t}</h3>
                            <p class="text-slate-500 text-sm leading-relaxed font-light">${a.d}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 4 — FAMILIAS (OBSIDIAN CARDS) ────────────────────────────────────
export function renderSPFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        {
            id: 'fortune',
            name: 'FORTUNE SERIES',
            tag: 'PASOS CONTROLADOS',
            color: 'from-emerald-500/20',
            desc: 'Simula el movimiento del mercado en "escalones" fijos. Ideal para identificar tendencias estructurales puras.',
            sub: 'F100, F250, F500, F1000, FX Series',
            icon: 'leaderboard'
        },
        {
            id: 'vortex',
            name: 'VORTEX CORE',
            tag: 'ENERGÍA CONSTANTE',
            color: 'from-blue-500/20',
            desc: 'Niveles de volatilidad calculada. Desde el flujo suave de Vortex 20 hasta la tormenta de Vortex 100.',
            sub: 'V20, V40, V60, V80, V100',
            icon: 'cyclone'
        },
        {
            id: 'trending',
            name: 'BULL & BEAR X',
            tag: 'MOMENTUM EXPLOSIVO',
            color: 'from-rose-500/20',
            desc: 'Especializados en movimientos direccionales con spikes periódicos. Diseñados para estrategias de "Catch the Spike".',
            sub: 'BULLX 400-1000 / BEARX 400-1000',
            icon: 'trending_up'
        },
        {
            id: 'fomox',
            name: 'FOMO X-TREME',
            tag: 'VOLATILIDAD ESPONTÁNEA',
            color: 'from-amber-500/20',
            desc: 'Imitan la euforia del mercado. Movimientos rápidos y sorpresivos que premian la velocidad de reacción.',
            sub: 'FOMOX 111, 333, 888, 999',
            icon: 'speed'
        }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-end mb-24 gap-8 section-reveal">
                <div>
                    <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Catálogo de Activos</span>
                    <h2 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tightest">Explora las <br><span class="text-emerald-400">Familias</span></h2>
                </div>
                <div class="text-right">
                    <p class="text-slate-500 text-sm max-w-xs font-medium">Cada familia ofrece una personalidad de mercado única para diversificar tu portafolio.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5 border border-white/5 rounded-[3rem] overflow-hidden section-reveal">
                ${families.map(f => `
                    <div class="p-12 md:p-16 bg-[#0a0a0a] hover:bg-gradient-to-br ${f.color} to-transparent transition-all duration-700 group">
                        <div class="flex items-center gap-6 mb-8">
                            <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center text-white/20 group-hover:text-emerald-400 group-hover:scale-110 transition-all">
                                <span class="material-symbols-outlined text-4xl">${f.icon}</span>
                            </div>
                            <div>
                                <h3 class="text-3xl font-black text-white tracking-tighter">${f.name}</h3>
                                <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">${f.tag}</span>
                            </div>
                        </div>
                        <p class="text-slate-400 font-light mb-10 leading-relaxed text-lg">${f.desc}</p>
                        <div class="flex items-center justify-between p-6 bg-white/5 rounded-2xl">
                            <div class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Símbolos</div>
                            <div class="text-white text-sm font-bold">${f.sub}</div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 5 — WORKFLOW (TECHNICAL STEPS) ─────────────────────────────
export function renderSPWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { t: 'Selección', d: 'Identifica la familia según tu perfil de riesgo.' },
        { t: 'Análisis', d: 'Aplica indicadores técnicos sobre gráficos puros.' },
        { t: 'Despliegue', d: 'Ejecuta manualmente o mediante sistemas automáticos.' },
        { t: 'Gestión', d: 'Monitorea el comportamiento y ajusta tu lotaje.' },
        { t: 'Escalado', d: 'Replica tu éxito en múltiples instrumentos.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] border-y border-white/5 relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 section-reveal">
                ${steps.map((s, i) => `
                    <div class="text-center group">
                        <div class="w-16 h-16 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-black text-xl mx-auto mb-8 group-hover:scale-110 group-hover:bg-emerald-500 group-hover:text-black transition-all">
                            0${i+1}
                        </div>
                        <h4 class="text-white font-black uppercase tracking-widest text-sm mb-4">${s.t}</h4>
                        <p class="text-slate-500 text-xs leading-relaxed font-medium">${s.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 6 — TECH SPECS (DATA TABLE) ──────────────────────────────────
export function renderSPTechSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                <div class="lg:col-span-4 section-reveal">
                    <h2 class="text-4xl font-black text-white uppercase mb-8">Technical <br><span class="text-emerald-500">Benchmarks</span></h2>
                    <p class="text-slate-400 font-light leading-relaxed mb-8">
                        Nuestro motor algorítmico mantiene una precisión milimétrica en la entrega de precios, asegurando que cada familia cumpla con sus parámetros de volatilidad.
                    </p>
                    <div class="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                        <div class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Certificación</div>
                        <p class="text-white text-xs font-bold leading-tight">Infraestructura alojada en servidores de baja latencia con respaldo BMM.</p>
                    </div>
                </div>
                <div class="lg:col-span-8 section-reveal delay-200">
                    <div class="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
                        <table class="w-full text-left">
                            <thead class="bg-white/5">
                                <tr>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Activo</th>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Volatilidad</th>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Lotes</th>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Tick Speed</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black">FORTUNE</td><td class="p-8 text-slate-400 text-xs uppercase font-bold">Standard</td><td class="p-8 text-emerald-400 font-mono text-xs">0.01</td><td class="p-8 text-slate-400 text-xs">300ms</td></tr>
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black">VORTEX</td><td class="p-8 text-slate-400 text-xs uppercase font-bold">Variable High</td><td class="p-8 text-emerald-400 font-mono text-xs">0.10</td><td class="p-8 text-slate-400 text-xs">150ms</td></tr>
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black">BULL/BEAR</td><td class="p-8 text-slate-400 text-xs uppercase font-bold">Explosive</td><td class="p-8 text-emerald-400 font-mono text-xs">1.00</td><td class="p-8 text-slate-400 text-xs">Inst</td></tr>
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black">FOMOX</td><td class="p-8 text-slate-400 text-xs uppercase font-bold">Hyper Trend</td><td class="p-8 text-emerald-400 font-mono text-xs">0.50</td><td class="p-8 text-slate-400 text-xs">Custom</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 7 — START / PLATFORMS ───────────────────────────
export function renderSPActivation(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div class="order-2 lg:order-1 section-reveal">
                    <img src="/images/imagenes_nuevas/peones_negro.png" class="w-full h-auto animate-float">
                </div>
                <div class="order-1 lg:order-2 section-reveal delay-200">
                    <h2 class="text-5xl md:text-6xl font-black text-white uppercase mb-12">Activa tu <br><span class="text-emerald-500 italic">Edge Operativo</span></h2>
                    <div class="space-y-4">
                        <div class="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 hover:bg-emerald-500/5 transition-colors">
                            <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black">1</div>
                            <p class="text-slate-300 font-medium">Registra tu cuenta en Bridge Markets.</p>
                        </div>
                        <div class="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 hover:bg-emerald-500/5 transition-colors">
                            <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black">2</div>
                            <p class="text-slate-300 font-medium">Instala MetaTrader 5 en cualquier dispositivo.</p>
                        </div>
                        <div class="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 hover:bg-emerald-500/5 transition-colors">
                            <div class="w-10 h-10 rounded-full bg-emerald-500 flex items-center justify-center text-black font-black">3</div>
                            <p class="text-slate-300 font-medium">Fondea tu cuenta y selecciona tu familia de índices.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 8 — IB COMMUNITY ───────────────────────────────
export function renderSPCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.communityName || brand.communityName || brand.fullName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestra comunidad de traders sintéticos y opera con tecnología institucional.';
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1611974717482-aa8a29910609?auto=format&fit=crop&q=80";
    const ctaText = content.ctaText || 'Habla con un asesor';
    const ctaLink = content.ctaUrl || (brand.whatsapp ? `https://wa.me/${brand.whatsapp}` : (brand.ctaLink || "#"));

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 bg-[#0a0a0a] rounded-[4rem] border border-white/5 overflow-hidden section-reveal">
                <div class="p-16 md:p-24 flex flex-col justify-center">
                    <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Comunidad Pro</span>
                    <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tightest mb-8">${ibName}</h2>
                    <p class="text-slate-400 text-xl font-light leading-relaxed mb-12">
                        ${message}
                    </p>
                    <a href="${ctaLink}" class="group inline-flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs border border-emerald-500/30 px-8 py-4 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                        ${ctaText} <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </a>
                </div>
                <div class="relative min-h-[500px]">
                    <img src="${photoUrl}" class="absolute inset-0 w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent"></div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 9 — FAQ ────────────────────────────────────────
export function renderSPFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué diferencia hay con los mercados reales?', a: 'Los sintéticos no dependen de activos físicos, sino de algoritmos auditados. Esto elimina los gaps por noticias y permite operativa 24/7.' },
        { q: '¿Es legal operar estos índices?', a: 'Sí, son productos financieros derivados regulados y auditados que funcionan bajo estándares internacionales de aleatoriedad.' },
        { q: '¿Qué lotaje puedo utilizar?', a: 'Depende de la familia. Desde micro-lotes de 0.01 en Fortune hasta lotes estándar en BullX/BearX.' },
        { q: '¿Necesito una cuenta especial?', a: 'Sí, debes abrir una cuenta específica para Sintéticos en tu portal de Bridge Markets.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl md:text-6xl font-black text-white uppercase text-center mb-24">Dudas <br><span class="text-emerald-500">Técnicas</span></h2>
            <div class="space-y-6">
                ${faqs.map(f => `
                    <div class="p-8 bg-[#0a0a0a] border border-white/5 rounded-3xl hover:border-emerald-500/20 transition-all">
                        <h4 class="text-lg font-black text-white mb-4 uppercase tracking-tighter">${f.q}</h4>
                        <p class="text-slate-500 font-light leading-relaxed">${f.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 10 — FINAL CTA ─────────────────────────────────
export function renderSPFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaText = content.ctaText || "Abrir cuenta ahora";
    const ctaLink = content.ctaUrl || brand.ctaLink || "#";

    return `
    <section class="py-60 px-8 bg-[#050505] relative overflow-hidden text-center">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 blur-[150px] rounded-full"></div>
        <div class="max-w-5xl mx-auto relative z-10 section-reveal">
            <h2 class="text-6xl md:text-[110px] font-black text-white uppercase leading-[0.8] tracking-tightest mb-16">
                Domina la <br>
                <span class="text-emerald-500">Volatilidad.</span>
            </h2>
            <p class="text-xl text-slate-400 mb-16 max-w-2xl mx-auto font-light">
                Únete a la evolución del trading digital con Bridge Markets y opera en los mercados más consistentes del mundo.
            </p>
            <a href="${ctaLink}" class="inline-block px-14 py-6 bg-emerald-500 text-black font-black rounded-xl uppercase tracking-[0.2em] text-xs hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-emerald-500/20">
                ${ctaText}
            </a>
        </div>
    </section>
    `;
}

// ─── SECTION 11 — FOOTER ────────────────────────────────────
export function renderSPFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const year = new Date().getFullYear();

    return `
    <footer class="py-20 px-8 bg-[#050505] border-t border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div class="flex flex-col items-center md:items-start gap-4">
                <img src="/images/logo-bm-blanco.png" class="h-5 opacity-30">
                <p class="text-[9px] text-slate-600 uppercase tracking-widest font-black">© ${year} Bridge Markets Global. All Rights Reserved.</p>
            </div>
            <div class="text-center md:text-right">
                <div class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2 italic">IB PRESENTATION: <span class="text-white">${ibName}</span></div>
                <div class="flex gap-4 justify-center md:justify-end opacity-20">
                    <span class="w-6 h-1 bg-emerald-500"></span>
                    <span class="w-6 h-1 bg-emerald-500"></span>
                    <span class="w-6 h-1 bg-emerald-500"></span>
                </div>
            </div>
        </div>
    </footer>
    `;
}
