import { BrandConfig } from '../types';

// ─── SECTION 1 — HERO (PRODUCTO SINTÉTICOS) ──────────────────
export function renderSPHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Abrir mi cuenta";
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#000]">
        <!-- Galactic Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(134,91,255,0.1)_0%,_transparent_70%)]"></div>
            <div class="stars-container opacity-20"></div>
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-8 section-reveal">
                    <!-- Brand Badge -->
                    <div class="flex items-center gap-4 mb-8">
                        <img src="/images/logo-bm-blanco.png" class="h-6">
                        <div class="h-4 w-px bg-white/20"></div>
                        <span class="text-[10px] font-black text-white/40 uppercase tracking-widest italic">Por ${ibName}</span>
                    </div>
                    
                    <h1 class="text-5xl md:text-[85px] font-black font-montserrat text-white leading-[0.9] uppercase tracking-tighter mb-8">
                        Opera en un nuevo <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic">Universo</span><br>
                        de Oportunidades.
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-white/40 font-light mb-8 max-w-2xl leading-relaxed italic">
                        Bienvenido a los Índices Sintéticos de Bridge Markets, mercados virtuales 24/7 con comportamientos realistas.
                    </p>

                    <div class="flex flex-wrap gap-4 mb-12">
                        <span class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/60 uppercase tracking-widest italic">Sin noticias, sin pausas, sin límites.</span>
                        <span class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-white/60 uppercase tracking-widest italic">Solo pura acción de mercado.</span>
                    </div>

                    ${ibPhrase ? `<p class="text-lg text-indigo-400 font-medium mb-12 italic border-l-2 border-indigo-600 pl-6">"${ibPhrase}"</p>` : ''}

                    <div class="flex flex-col md:flex-row items-center gap-8">
                        <a href="${ctaLink}" class="group relative px-12 py-6 bg-white text-black font-black rounded-xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-2xl shadow-indigo-500/20">
                            <span class="relative z-10 uppercase tracking-widest text-xs">${ctaText}</span>
                        </a>
                    </div>
                </div>

                <div class="lg:col-span-4 relative hidden lg:block section-reveal delay-300">
                    <img src="/images/imagenes_nuevas/reyna_rosa.png" 
                         class="w-full h-auto animate-float drop-shadow-[0_0_80px_rgba(99,102,241,0.3)]">
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 2 — ABOUT ──────────────────────────────────────
export function renderSPAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#020202] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="section-reveal">
                    <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block italic italic">Tecnología RNG</span>
                    <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase leading-tight mb-8 tracking-tighter">¿Qué son los <br><span class="text-indigo-400">Índices Sintéticos?</span></h2>
                    <div class="w-20 h-1 bg-indigo-600 mb-12"></div>
                </div>
                <div class="section-reveal delay-200">
                    <p class="text-lg md:text-xl text-white/50 leading-relaxed font-light italic">
                        Los Índices Sintéticos de Bridge Markets son instrumentos financieros creados a partir de algoritmos de generación aleatoria controlada (RNG) que simulan los movimientos del mercado con base en volatilidad, tendencias y patrones de comportamiento real.
                    </p>
                    <p class="text-lg md:text-xl text-white/50 leading-relaxed font-light mt-8 italic">
                        No dependen de noticias externas ni eventos globales. Reproducen subidas, caídas, impulsos y consolidaciones bajo reglas claras y constantes, accesibles <span class="text-white">24/7/365</span>.
                    </p>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 3 — VENTAJAS ────────────────────────────────────
export function renderSPAdvantages(content: Record<string, any>, brand: BrandConfig): string {
    const advantages = [
        { t: 'Disponibles 24/7', d: 'Opera sin interrupciones, los 365 días del año. Los índices sintéticos no cierran, no duermen y no se detienen.', i: 'schedule' },
        { t: 'Transparencia total', d: 'Cada movimiento es generado por un sistema aleatorio auditado, garantizando imparcialidad y consistencia estadística.', i: 'verified_user' },
        { t: 'Volatilidad controlada', d: 'Cada familia tiene niveles definidos de volatilidad para que elijas el perfil que más se adapte a tu estrategia.', i: 'show_chart' },
        { t: 'Sin influencia de noticias', d: 'Olvídate de los eventos macroeconómicos. Aquí las condiciones son puramente técnicas.', i: 'public_off' },
        { t: 'Ideal para algoritmos', d: 'Diseñados para bots, estrategias cuantitativas y pruebas de backtesting en entornos consistentes.', i: 'memory' },
        { t: 'Riesgo medible', d: 'Gracias a la naturaleza matemática de sus series, puedes diseñar sistemas más predecibles y gestionar mejor el riesgo.', i: 'analytics' }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1 section-reveal">
                ${advantages.map((a, i) => `
                    <div class="p-12 bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] transition-all duration-500 group">
                        <span class="material-symbols-outlined text-indigo-500 text-4xl mb-8 group-hover:scale-110 transition-transform">${a.i}</span>
                        <h3 class="text-xl font-black text-white uppercase tracking-tighter mb-4 italic">${a.t}</h3>
                        <p class="text-white/40 text-sm leading-relaxed font-light italic italic italic italic italic">${a.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 4 — FAMILIAS ────────────────────────────────────
export function renderSPFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        {
            id: 'fortune',
            name: 'FORTUNE',
            tag: 'El ritmo constante del mercado en movimiento.',
            desc: 'Los índices Fortune y FortuneX simulan movimientos de precio en "pasos" controlados. Ideal para escenarios de rompimiento y estructura.',
            sub: 'Fortune 100/250/500/1000 — FortuneX 200/300/500',
            feats: ['Movimiento escalonado', 'Comportamiento ordenado', 'Rupturas claras']
        },
        {
            id: 'vortex',
            name: 'VORTEX',
            tag: 'Donde la Intensidad del mercado cobra vida.',
            desc: 'Escenarios de volatilidad constante. Cada número indica el nivel de turbulencia: a mayor cifra, mayor energía y amplitud.',
            sub: 'Vortex 20 / 40 / 60 / 80 / 100',
            feats: ['Volatilidad estable', 'Simulación real', 'Oscilaciones proporcionales']
        },
        {
            id: 'trending',
            name: 'BULLX & BEARX',
            tag: 'Los motores del impulso y la caída.',
            desc: 'Simulan entornos direccionales fuertes con movimientos explosivos periódicos (Spikes). BullX alcista, BearX bajista.',
            sub: 'BullX 400/777/900/1000 — BearX 400/777/900/1000',
            feats: ['Spikes direccionales', 'Eventos extremos', 'Estrategias de Momentum']
        },
        {
            id: 'fomox',
            name: 'FOMOX',
            tag: 'Donde la tendencia aparece sin aviso.',
            desc: 'Tendencia aleatoria y espontánea. Imitan momentos de "hype" o euforia, donde la velocidad y la sorpresa dominan.',
            sub: 'FomoX 111 / 333 / 888 / 999',
            feats: ['Tendencia espontánea', 'Aceleración sin aviso', 'Ideal para Breakouts']
        }
    ];

    return `
    <section class="py-40 px-8 bg-[#020202] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block italic italic">El Ecosistema</span>
                <h2 class="text-4xl md:text-7xl font-black font-montserrat text-white uppercase tracking-tighter italic">Nuestras <span class="text-indigo-400">Familias</span></h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 section-reveal">
                ${families.map(f => `
                    <div class="p-12 bg-white/[0.02] border border-white/10 rounded-[3rem] hover:border-indigo-500/50 transition-all duration-700 group">
                        <div class="flex justify-between items-start mb-8">
                            <h3 class="text-3xl font-black text-white italic tracking-tighter">${f.name}</h3>
                            <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest italic">${f.tag}</span>
                        </div>
                        <p class="text-white/40 font-light mb-8 italic leading-relaxed">${f.desc}</p>
                        <div class="p-6 bg-white/[0.03] rounded-2xl mb-8">
                            <span class="text-[10px] font-black text-indigo-400 uppercase tracking-widest block mb-4 italic">Índices Disponibles:</span>
                            <p class="text-white text-sm font-bold tracking-tight italic">${f.sub}</p>
                        </div>
                        <div class="flex flex-wrap gap-3">
                            ${f.feats.map(feat => `<span class="text-[9px] font-black text-white/30 uppercase tracking-widest border border-white/5 px-4 py-2 rounded-full italic italic italic italic italic italic italic">${feat}</span>`).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Tabla Comparativa -->
            <div class="section-reveal">
                <div class="overflow-x-auto rounded-[3rem] border border-white/10 bg-white/[0.01] backdrop-blur-xl">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="border-b border-white/10">
                                <th class="p-8 text-[11px] font-black text-white/30 uppercase tracking-widest italic">Familia</th>
                                <th class="p-8 text-[11px] font-black text-white/30 uppercase tracking-widest italic">Subfamilias</th>
                                <th class="p-8 text-[11px] font-black text-white/30 uppercase tracking-widest italic">Comportamiento</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm font-bold text-white/60">
                            ${families.map(f => `
                                <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                    <td class="p-8 text-white font-black italic italic italic italic italic italic italic">${f.name}</td>
                                    <td class="p-8 italic italic italic italic italic italic italic">${f.sub}</td>
                                    <td class="p-8 italic italic italic italic italic italic italic">${f.feats[0]} y ${f.feats[1]}</td>
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

// ─── SECTION 5 — HOW TO OPERATE ─────────────────────────────
export function renderSPWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { n: '01', t: 'Elige tu familia', d: 'Decide si buscas estabilidad (Fortune/Vortex), tendencia (BullX/BearX) o caos controlado (FomoX).' },
        { n: '02', t: 'Define tu estrategia', d: 'Usa tus propios indicadores o prueba tus bots en entornos 100% repetibles.' },
        { n: '03', t: 'Gestiona el riesgo', d: 'Ajusta tu tamaño de posición y stop loss según la personalidad de cada índice.' },
        { n: '04', t: 'Analiza patrones', d: 'Ideal para backtesting y optimización de estrategias por su alta consistencia.' },
        { n: '05', t: 'Disfruta el proceso', d: 'Cada tick es una oportunidad. Sin noticias, sin excusas.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block italic italic">Metodología</span>
                <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter italic">¿Cómo <span class="text-indigo-400">Operar?</span></h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-5 gap-12 section-reveal">
                ${steps.map(s => `
                    <div class="relative group">
                        <div class="text-6xl font-black text-white/5 mb-8 group-hover:text-indigo-500/20 transition-colors italic italic italic italic italic italic italic">${s.n}</div>
                        <h4 class="text-lg font-black text-white uppercase mb-4 italic italic italic italic italic italic italic">${s.t}</h4>
                        <p class="text-white/30 text-sm font-light italic leading-relaxed italic italic italic italic italic italic italic italic italic italic">${s.d}</p>
                        <div class="absolute -left-6 top-0 w-px h-full bg-indigo-600/20 hidden md:block"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 6 — TECH SPECS ──────────────────────────────────
export function renderSPTechSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#020202] relative">
        <div class="max-w-7xl mx-auto">
            <div class="max-w-3xl mb-24 section-reveal">
                <h2 class="text-4xl font-black text-white uppercase mb-8 italic italic italic italic italic italic italic italic italic">Especificaciones Técnicas</h2>
                <p class="text-white/40 leading-relaxed font-light italic">
                    Cada familia de índices ha sido diseñada con parámetros precisos que reflejan distintos comportamientos del mercado, niveles de volatilidad y profundidad operativa.
                </p>
            </div>

            <div class="section-reveal">
                <div class="overflow-x-auto rounded-3xl border border-white/10 bg-white/[0.02]">
                    <table class="w-full text-left border-collapse">
                        <thead class="bg-white/[0.03]">
                            <tr>
                                <th class="p-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Familia</th>
                                <th class="p-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Spread</th>
                                <th class="p-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Lotaje Mínimo</th>
                                <th class="p-6 text-[10px] font-black text-indigo-400 uppercase tracking-widest italic">Costo/Tick</th>
                            </tr>
                        </thead>
                        <tbody class="text-white/60 text-sm">
                            <tr class="border-b border-white/5">
                                <td class="p-6 font-black text-white italic italic italic italic italic italic italic italic">FORTUNE</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Fijo (Low)</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">0.01</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Institucional</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-6 font-black text-white italic italic italic italic italic italic italic italic">VORTEX</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Dinámico</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">0.10</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Precisión</td>
                            </tr>
                            <tr class="border-b border-white/5">
                                <td class="p-6 font-black text-white italic italic italic italic italic italic italic italic">BULLX & BEARX</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Competitivo</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">1.00</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">High Vol</td>
                            </tr>
                            <tr>
                                <td class="p-6 font-black text-white italic italic italic italic italic italic italic italic">FOMOX</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Standard</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">0.50</td>
                                <td class="p-6 italic italic italic italic italic italic italic italic">Momentum</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 7 — START / PLATFORMS ───────────────────────────
export function renderSPActivation(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        'Crea tu cuenta en el portal de Bridge Markets.',
        'Completa tu proceso KYC (Identidad).',
        'Deposita fondos en tu cuenta.',
        'Descarga MetaTrader 5 (MT5).',
        'Conéctate al servidor BridgeMarkets-MT5.',
        'Elige tu familia y empieza a operar.'
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="section-reveal">
                    <h2 class="text-5xl font-black text-white uppercase mb-12 italic italic italic italic italic italic italic italic italic italic">Empieza a <br><span class="text-indigo-400">Operar Hoy</span></h2>
                    <div class="space-y-6">
                        ${steps.map((s, i) => `
                            <div class="flex items-center gap-6 p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-indigo-500/30 transition-all">
                                <span class="text-2xl font-black text-indigo-500/40 group-hover:text-indigo-500 italic italic italic italic italic italic italic italic italic italic">0${i+1}</span>
                                <p class="text-white/60 font-medium italic italic italic italic italic italic italic italic italic italic italic">${s}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="section-reveal delay-300">
                    <div class="p-12 bg-gradient-to-br from-indigo-900/20 to-transparent border border-white/10 rounded-[4rem] text-center">
                        <img src="/images/logo-bm-blanco.png" class="h-10 mx-auto mb-12">
                        <h3 class="text-2xl font-black text-white uppercase mb-8 italic italic italic italic italic italic italic italic italic italic italic italic">Disponible en todas <br>las plataformas</h3>
                        <div class="flex justify-center gap-8 text-white/40">
                            <span class="material-symbols-outlined text-5xl">desktop_windows</span>
                            <span class="material-symbols-outlined text-5xl">smartphone</span>
                            <span class="material-symbols-outlined text-5xl">laptop_mac</span>
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
    const ctaLink = brand.whatsapp ? `https://wa.me/${brand.whatsapp}` : (brand.ctaLink || "#");

    return `
    <section class="py-40 px-8 bg-[#020202] relative">
        <div class="max-w-7xl mx-auto">
            <div class="bg-indigo-600/5 border border-indigo-500/20 rounded-[4rem] overflow-hidden section-reveal">
                <div class="grid grid-cols-1 lg:grid-cols-2">
                    <div class="p-16 md:p-24 flex flex-col justify-center">
                        <span class="text-indigo-400 font-black text-[10px] uppercase tracking-[0.5em] mb-6 block italic italic italic italic italic italic italic italic italic italic">Comunidad Exclusiva</span>
                        <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 italic italic italic italic italic italic italic italic italic italic">${ibName}</h2>
                        <p class="text-white/50 text-xl font-light italic leading-relaxed mb-12 italic italic italic italic italic italic italic italic italic italic italic italic">
                            ${message}
                        </p>
                        <a href="${ctaLink}" class="inline-flex items-center gap-3 text-white font-black uppercase tracking-widest text-xs border-b-2 border-indigo-600 pb-2 hover:gap-6 transition-all italic italic italic italic italic italic italic italic italic italic italic italic italic">
                            ${ctaText} <span class="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                    <div class="relative min-h-[400px] lg:min-h-full">
                        <img src="${photoUrl}" class="absolute inset-0 w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 9 — FAQ ────────────────────────────────────────
export function renderSPFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué son los índices sintéticos?', a: 'Son instrumentos generados por algoritmos RNG que simulan movimientos de mercado. No dependen de activos físicos ni de noticias externas.' },
        { q: '¿Están disponibles 24/7?', a: 'Sí. Los índices sintéticos de Bridge Markets operan los 365 días del año, sin cierres ni pausas de mercado.' },
        { q: '¿Puedo usar robots o EAs?', a: 'Sí. Los índices sintéticos son ideales para trading algorítmico por su consistencia y reproducibilidad.' },
        { q: '¿En qué plataforma se operan?', a: 'MetaTrader 5 (MT5). Disponible para escritorio, iOS y Android con servidor BridgeMarkets-MT5.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic italic italic italic italic italic italic italic italic italic italic">Preguntas <span class="text-indigo-400">Frecuentes</span></h2>
            </div>
            <div class="space-y-6 section-reveal">
                ${faqs.map(f => `
                    <div class="p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <h4 class="text-lg font-black text-white mb-4 italic italic italic italic italic italic italic italic italic italic italic italic italic">${f.q}</h4>
                        <p class="text-white/40 font-light italic italic italic italic italic italic italic italic italic italic italic italic italic italic">${f.a}</p>
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
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="py-60 px-8 bg-[#000] relative overflow-hidden text-center">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse-slow"></div>
        <div class="max-w-5xl mx-auto relative z-10 section-reveal">
            <h2 class="text-5xl md:text-[100px] font-black text-white uppercase leading-[0.8] tracking-tightest mb-12 italic italic italic italic italic italic italic italic italic italic italic italic italic">
                Explora. Aprende. <br>
                <span class="text-indigo-500">Opera.</span> Evoluciona.
            </h2>
            <p class="text-xl text-white/40 mb-16 max-w-2xl mx-auto italic italic italic italic italic italic italic italic italic italic italic italic italic italic">
                Sumérgete en el ecosistema de índices sintéticos de Bridge Markets y descubre un nuevo nivel de libertad operativa.
            </p>
            <a href="${ctaLink}" class="inline-block px-16 py-8 bg-white text-black font-black rounded-xl uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all italic italic italic italic italic italic italic italic italic italic italic italic italic italic">
                ${ctaText}
            </a>
            <p class="mt-16 text-[9px] text-white/20 uppercase tracking-widest font-black max-w-xl mx-auto italic italic italic italic italic italic italic italic italic italic italic italic italic italic">
                ADVERTENCIA: LOS ÍNDICES SINTÉTICOS SON INSTRUMENTOS DISEÑADOS PARA TRADERS CON EXPERIENCIA. GESTIONE SU RIESGO.
            </p>
        </div>
    </section>
    `;
}

// ─── SECTION 11 — FOOTER ────────────────────────────────────
export function renderSPFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const year = new Date().getFullYear();

    return `
    <footer class="py-24 px-8 bg-[#010101] border-t border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12">
            <div>
                <img src="/images/logo-bm-blanco.png" class="h-6 mb-8 brightness-50">
                <div class="text-[9px] text-white/10 uppercase tracking-widest font-black italic">© ${year} BridgeMarkets LTD. Todos los derechos reservados.</div>
            </div>
            <div class="text-right">
                <div class="text-[10px] text-white/30 font-black uppercase tracking-widest mb-2 italic">Presentado por <span class="text-white">${ibName}</span></div>
                <div class="text-[8px] text-white/10 uppercase tracking-widest font-bold italic italic italic italic italic italic italic italic italic italic italic">Tecnología Sintética Bridge Markets</div>
            </div>
        </div>
    </footer>
    `;
}
