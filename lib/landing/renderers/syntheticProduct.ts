import { BrandConfig } from '../types';

// ─── SECTION 1 — HERO (PRODUCTO SINTÉTICOS - NUEVO DISEÑO) ──────────────────
export function renderSPHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.communityName || brand.communityName || brand.fullName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Abrir mi cuenta";
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
                        <span class="text-[10px] font-black text-emerald-400 uppercase tracking-[0.2em]">Sin noticias, sin pausas, sin límites.</span>
                    </div>
                    
                    <h1 class="text-5xl md:text-[85px] font-black font-montserrat text-white leading-[0.9] uppercase tracking-tightest mb-10">
                        Opera en un nuevo <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-emerald-600">Universo</span> de <br>
                        Oportunidades.
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-slate-400 font-light mb-6 max-w-2xl leading-relaxed">
                        Bienvenido a los <span class="text-white font-bold">Índices Sintéticos</span> de Bridge Markets, mercados virtuales 24/7 con comportamientos realistas.
                    </p>

                    ${ibPhrase ? `<p class="text-lg text-emerald-400/80 font-medium mb-12 border-l-4 border-emerald-600 pl-8 italic">"${ibPhrase}"</p>` : ''}

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
                            <div class="text-[9px] text-slate-500 uppercase font-black tracking-widest">Solo acción pura</div>
                        </div>
                    </div>

                    <div class="flex flex-col sm:flex-row items-center gap-6">
                        <a href="${ctaLink}" class="w-full sm:w-auto text-center px-10 py-5 bg-emerald-500 text-black font-black rounded-xl hover:bg-emerald-400 transition-all hover:scale-105 shadow-xl shadow-emerald-500/20 uppercase tracking-widest text-xs">
                            ${ctaText}
                        </a>
                        <div class="text-slate-500 text-[10px] font-black uppercase tracking-widest flex items-center gap-3">
                            <img src="/images/logo-bm-blanco.png" class="h-4 opacity-20">
                            <span>Presentado por <span class="text-emerald-500">${ibName}</span></span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 relative hidden lg:block section-reveal delay-500">
                    <div class="relative">
                        <div class="absolute inset-0 bg-emerald-500/20 blur-[100px] rounded-full animate-pulse-slow"></div>
                        <img src="/images/imagenes_nuevas/caballo_negro.png" 
                             class="w-full h-auto relative z-10 drop-shadow-[0_0_50px_rgba(16,185,129,0.2)] animate-float">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 2 — ABOUT (¿QUÉ SON?) ──────────────────────
export function renderSPAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#050505] relative border-y border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center section-reveal">
                <div class="lg:col-span-5">
                    <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Sección Educativa</span>
                    <h2 class="text-4xl md:text-5xl font-black text-white uppercase leading-tight tracking-tighter">
                        ¿Qué son los <br><span class="text-emerald-400 underline decoration-emerald-500/30 underline-offset-8">Índices Sintéticos?</span>
                    </h2>
                </div>
                <div class="lg:col-span-7 space-y-8">
                    <p class="text-lg md:text-xl text-slate-400 leading-relaxed font-light text-justify">
                        Los <span class="text-white font-bold italic">Índices Sintéticos de Bridge Markets</span> son instrumentos financieros creados a partir de algoritmos de generación aleatoria controlada (RNG – Random Number Generator) que simulan los movimientos del mercado con base en volatilidad, tendencias y patrones de comportamiento real. Estos índices no dependen de activos físicos (como acciones o divisas) ni de noticias externas. En cambio, reproducen las condiciones dinámicas de los mercados financieros reales: subidas, caídas, impulsos, consolidaciones y rupturas. Gracias a esto, puedes operar bajo reglas claras y constantes, con condiciones estables, accesibles 24/7 y sin la incertidumbre que provocan los eventos globales.
                    </p>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 3 — VENTAJAS (CYBER GRID) ────────────────────────────────────
export function renderSPAdvantages(content: Record<string, any>, brand: BrandConfig): string {
    const advantages = [
        { t: 'Disponibles 24/7', d: 'Opera sin interrupciones, los 365 días del año. Los índices sintéticos no cierran, no duermen y no se detienen.', i: 'schedule' },
        { t: 'Transparencia total', d: 'Cada movimiento es generado por un sistema aleatorio auditado, garantizando imparcialidad y consistencia estadística.', i: 'verified_user' },
        { t: 'Volatilidad controlada', d: 'Cada familia tiene niveles definidos de volatilidad para que elijas el perfil que más se adapte a tu estrategia.', i: 'speed' },
        { t: 'Sin influencia de noticias', d: 'Olvídate de los eventos macroeconómicos. Aquí las condiciones son puramente técnicas.', i: 'public_off' },
        { t: 'Ideal para trading algorítmico', d: 'Diseñados para bots, estrategias cuantitativas y pruebas de backtesting en entornos consistentes.', i: 'smart_toy' },
        { t: 'Riesgo medible', d: 'Gracias a la naturaleza matemática de sus series, puedes diseñar sistemas más predecibles y controlar mejor la gestión del riesgo.', i: 'query_stats' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Propuesta de Valor</span>
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tightest">Ventajas de <span class="text-emerald-500 underline decoration-emerald-500/20 underline-offset-8">Operar Sintéticos</span></h2>
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

// ─── SECTION 4 — FAMILIAS (FAMILIAS DE ÍNDICES) ────────────────────────────────────
export function renderSPFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        {
            name: 'FORTUNE',
            tag: 'EL RITMO CONSTANTE',
            desc: 'Los índices Fortune y FortuneX simulan movimientos de precio en "pasos" controlados. Cada "step" representa un avance o retroceso discreto, ideal para estructura y precisión.',
            sub: 'F100, F250, F500, F1000 / FortuneX Series',
            icon: 'leaderboard'
        },
        {
            name: 'VORTEX',
            tag: 'INTENSIDAD DE MERCADO',
            desc: 'Escenarios de volatilidad constante para medir reacción. El número indica el nivel de turbulencia: a mayor cifra, mayor energía y amplitud.',
            sub: 'Vortex 20, 40, 60, 80, 100',
            icon: 'cyclone'
        },
        {
            name: 'BULLX & BEARX',
            tag: 'MOTORES DE IMPULSO',
            desc: 'BullX (tendencia bajista con Spikes Alcistas) y BearX (tendencia alcista con Spikes Bajistas). Movimientos explosivos periódicos para momentum.',
            sub: 'BullX/BearX 400, 777, 900, 1000',
            icon: 'trending_up'
        },
        {
            name: 'FOMOX',
            tag: 'TENDENCIA ALEATORIA',
            desc: 'Movimientos que inician o revierten sin patrón fijo. Imitan momentos de "hype" o euforia, donde la velocidad y sorpresa dominan el flujo.',
            sub: 'FomoX 111, 333, 888, 999',
            icon: 'speed'
        }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-4 block">Catálogo Oficial</span>
                <h2 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tightest">Nuestras <span class="text-emerald-500">Familias</span></h2>
                <p class="mt-8 text-slate-500 max-w-2xl mx-auto font-medium">Bridge Markets agrupa sus índices en cuatro familias principales, cada una con un comportamiento característico y un propósito de trading distinto.</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 section-reveal">
                ${families.map(f => `
                    <div class="p-12 bg-[#0a0a0a] border border-white/5 rounded-[2.5rem] hover:bg-emerald-500/[0.02] transition-all duration-700 group">
                        <div class="flex items-center gap-6 mb-8">
                            <div class="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-all">
                                <span class="material-symbols-outlined text-4xl">${f.icon}</span>
                            </div>
                            <div>
                                <h3 class="text-3xl font-black text-white tracking-tighter">${f.name}</h3>
                                <span class="text-[10px] font-black text-emerald-500 uppercase tracking-widest">${f.tag}</span>
                            </div>
                        </div>
                        <p class="text-slate-400 font-light mb-10 leading-relaxed text-lg">${f.desc}</p>
                        <div class="p-6 bg-white/5 rounded-2xl flex items-center justify-between">
                            <span class="text-[10px] font-black text-slate-500 uppercase tracking-widest">Símbolos</span>
                            <span class="text-emerald-400 text-sm font-bold">${f.sub}</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 5 — WORKFLOW (¿CÓMO OPERAR?) ─────────────────────────────
export function renderSPWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { t: 'Elige tu familia', d: 'Decide si buscas estabilidad (Fortune/Vortex), tendencia (BullX/BearX) o caos controlado (FomoX).' },
        { t: 'Define tu estrategia', d: 'Usa tus propios indicadores o prueba tus bots en entornos 100% repetibles.' },
        { t: 'Gestiona el riesgo', d: 'Cada índice tiene su propia "personalidad" de volatilidad. Ajusta tu tamaño de posición.' },
        { t: 'Analiza patrones', d: 'Los índices ofrecen consistencia. Ideal para backtesting y optimización.' },
        { t: 'Disfruta el proceso', d: 'Sin noticias, sin excusas. Aquí cada tick es una oportunidad de mejora.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] border-y border-white/5 relative">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <h2 class="text-4xl font-black text-white uppercase tracking-widest text-sm mb-4">Metodología de Inicio</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-12 section-reveal">
                ${steps.map((s, i) => `
                    <div class="text-center group">
                        <div class="w-20 h-20 bg-emerald-500/10 border border-emerald-500/20 rounded-full flex items-center justify-center text-emerald-500 font-black text-2xl mx-auto mb-8 group-hover:bg-emerald-500 group-hover:text-black transition-all duration-500">
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

// ─── SECTION 6 — TECH SPECS (ESPECIFICACIONES) ──────────────────────────────────
export function renderSPTechSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-start">
                <div class="lg:col-span-4 section-reveal">
                    <h2 class="text-4xl font-black text-white uppercase mb-8">Especificaciones <br><span class="text-emerald-500">Técnicas</span></h2>
                    <p class="text-slate-400 font-light leading-relaxed mb-8">
                        Cada familia de índices ha sido diseñada con parámetros precisos que reflejan distintos comportamientos del mercado, niveles de volatilidad y profundidad operativa.
                    </p>
                    <div class="p-6 bg-emerald-500/5 border border-emerald-500/10 rounded-2xl">
                        <div class="text-[10px] font-black text-emerald-500 uppercase tracking-widest mb-2">Certificación</div>
                        <p class="text-white text-xs font-bold leading-tight">Garantizando condiciones consistentes para estrategias de alta frecuencia.</p>
                    </div>
                </div>
                <div class="lg:col-span-8 section-reveal delay-200">
                    <div class="overflow-hidden rounded-3xl border border-white/10 bg-[#0a0a0a]">
                        <table class="w-full text-left">
                            <thead class="bg-white/5">
                                <tr>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Familia</th>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Spread</th>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Lotaje Mín</th>
                                    <th class="p-8 text-[11px] font-black text-slate-500 uppercase tracking-widest">Costo / Tick</th>
                                </tr>
                            </thead>
                            <tbody class="divide-y divide-white/5">
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black text-xs uppercase">Fortune</td><td class="p-8 text-emerald-400 font-mono text-xs">0.0</td><td class="p-8 text-slate-400 text-xs">0.01</td><td class="p-8 text-slate-400 text-xs">$0.001</td></tr>
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black text-xs uppercase">Vortex</td><td class="p-8 text-emerald-400 font-mono text-xs">0.0</td><td class="p-8 text-slate-400 text-xs">0.10</td><td class="p-8 text-slate-400 text-xs">$0.01</td></tr>
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black text-xs uppercase">Bull/Bear</td><td class="p-8 text-emerald-400 font-mono text-xs">0.0</td><td class="p-8 text-slate-400 text-xs">1.00</td><td class="p-8 text-slate-400 text-xs">$0.10</td></tr>
                                <tr class="hover:bg-white/[0.02] transition-colors"><td class="p-8 text-white font-black text-xs uppercase">FomoX</td><td class="p-8 text-emerald-400 font-mono text-xs">0.0</td><td class="p-8 text-slate-400 text-xs">0.50</td><td class="p-8 text-slate-400 text-xs">$0.05</td></tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 7 — ACTIVATION (¿CÓMO EMPEZAR?) ───────────────────────────
export function renderSPActivation(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        'Crea tu cuenta en el portal de Bridge Markets.',
        'Completa tu proceso KYC.',
        'Deposita fondos en tu cuenta.',
        'Descarga MetaTrader 5 (MT5).',
        'Conéctate al servidor BridgeMarkets-MT5.',
        'Elige tu familia favorita y opera 24/7.'
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div class="order-2 lg:order-1 section-reveal">
                    <div class="relative">
                        <div class="absolute inset-0 bg-emerald-500/10 blur-[120px] rounded-full"></div>
                        <img src="/images/imagenes_nuevas/peones_negro.png" class="w-full h-auto relative z-10 animate-float">
                    </div>
                </div>
                <div class="order-1 lg:order-2 section-reveal delay-200">
                    <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Pasos para Operar</span>
                    <h2 class="text-5xl md:text-6xl font-black text-white uppercase mb-12">¿Cómo <span class="text-emerald-500 italic">Empezar?</span></h2>
                    <div class="space-y-4">
                        ${steps.map((s, i) => `
                            <div class="p-6 bg-white/[0.03] border border-white/5 rounded-2xl flex items-center gap-6 group hover:bg-emerald-500/10 transition-all duration-300">
                                <div class="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-500 font-black group-hover:bg-emerald-500 group-hover:text-black transition-colors">
                                    ${i+1}
                                </div>
                                <p class="text-slate-300 font-medium text-lg">${s}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 8 — COMMUNITY (COMUNIDAD IB) ──────────────────────────────
export function renderSPCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.communityName || brand.communityName || brand.fullName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestra comunidad de traders sintéticos y opera con tecnología institucional.';
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1611974717482-aa8a29910609?auto=format&fit=crop&q=80";
    const ctaText = content.ctaText || 'Habla con un asesor';
    const ctaLink = content.ctaUrl || (content.whatsapp ? `https://wa.me/${content.whatsapp}` : (brand.ctaLink || "#"));

    const socials = [
        { icon: 'send', link: content.telegram || brand.telegram, label: 'Telegram' },
        { icon: 'message', link: content.whatsapp || brand.whatsapp, label: 'WhatsApp' },
        { icon: 'photo_camera', link: content.instagram || brand.instagram, label: 'Instagram' },
        { icon: 'videocam', link: content.tiktok || brand.tiktok, label: 'TikTok' },
        { icon: 'play_circle', link: content.youtube || brand.youtube, label: 'YouTube' }
    ].filter(s => s.link);

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 bg-[#0a0a0a] rounded-[4rem] border border-white/5 overflow-hidden section-reveal shadow-2xl">
                <div class="p-16 md:p-24 flex flex-col justify-center">
                    <span class="text-emerald-500 font-black text-[10px] uppercase tracking-[0.4em] mb-6 block">Espacio del Partner</span>
                    <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tightest mb-8">${ibName}</h2>
                    <p class="text-slate-400 text-xl font-light leading-relaxed mb-12">${message}</p>
                    
                    <div class="flex flex-wrap gap-4 mb-12">
                        ${socials.map(s => `
                            <a href="${s.link}" target="_blank" class="w-12 h-12 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white/40 hover:text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all">
                                <span class="material-symbols-outlined">${s.icon}</span>
                            </a>
                        `).join('')}
                    </div>

                    <a href="${ctaLink}" class="group inline-flex items-center gap-4 text-white font-black uppercase tracking-widest text-xs border border-emerald-500/30 px-10 py-5 rounded-full hover:bg-emerald-500 hover:text-black transition-all">
                        ${ctaText} <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">arrow_forward</span>
                    </a>
                </div>
                <div class="relative min-h-[500px]">
                    <img src="${photoUrl}" class="absolute inset-0 w-full h-full object-cover grayscale opacity-50 hover:opacity-100 hover:grayscale-0 transition-all duration-1000">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-transparent to-transparent"></div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 9 — FAQ (PREGUNTAS FRECUENTES) ────────────────────────────────────────
export function renderSPFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué son los índices sintéticos?', a: 'Son instrumentos generados por algoritmos RNG que simulan movimientos de mercado. No dependen de activos físicos ni de noticias externas.' },
        { q: '¿Están disponibles 24/7?', a: 'Sí. Los índices sintéticos de Bridge Markets operan los 365 días del año, sin cierres ni pausas de mercado.' },
        { q: '¿Cuántas familias hay?', a: '4 familias: Fortune (step-by-step), Vortex (volatilidad constante), BullX/BearX (trending con spikes) y FomoX (tendencia aleatoria).' },
        { q: '¿Puedo usar robots o EAs?', a: 'Sí. Los índices sintéticos son ideales para trading algorítmico por su consistencia y reproducibilidad.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#050505] relative">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl md:text-6xl font-black text-white uppercase text-center mb-24">Dudas <br><span class="text-emerald-500 underline decoration-emerald-500/20 underline-offset-[12px]">Técnicas</span></h2>
            <div class="space-y-4">
                ${faqs.map(f => `
                    <div class="p-8 bg-[#0a0a0a] border border-white/5 rounded-[2rem] hover:border-emerald-500/20 transition-all group">
                        <h4 class="text-lg font-black text-white mb-4 uppercase tracking-tighter group-hover:text-emerald-400 transition-colors">${f.q}</h4>
                        <p class="text-slate-500 font-light leading-relaxed">${f.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 10 — FINAL CTA (CTA FINAL) ─────────────────────────────────
export function renderSPFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaText = content.ctaText || "Abrir cuenta ahora";
    const ctaLink = content.ctaUrl || brand.ctaLink || "#";
    const secCtaText = content.secondaryCtaText || "Ver gráficos en vivo";
    const secCtaLink = content.secondaryCtaUrl || "https://charts.bridgemarkets.global";

    return `
    <section class="py-60 px-8 bg-[#050505] relative overflow-hidden text-center border-t border-white/5">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-emerald-500/5 blur-[180px] rounded-full"></div>
        <div class="max-w-5xl mx-auto relative z-10 section-reveal">
            <h2 class="text-6xl md:text-[100px] font-black text-white uppercase leading-[0.85] tracking-tightest mb-16">
                Explora. Aprende. <br>
                <span class="text-emerald-500">Opera. Evoluciona.</span>
            </h2>
            <p class="text-xl text-slate-400 mb-16 max-w-3xl mx-auto font-light">
                Sumérgete en el ecosistema de índices sintéticos de Bridge Markets y descubre un nuevo nivel de libertad y precisión operativa.
            </p>
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6 mb-16">
                <a href="${ctaLink}" class="w-full sm:w-auto px-14 py-6 bg-emerald-500 text-black font-black rounded-xl uppercase tracking-[0.2em] text-xs hover:scale-110 active:scale-95 transition-all shadow-2xl shadow-emerald-500/30">
                    ${ctaText}
                </a>
                <a href="${secCtaLink}" target="_blank" class="w-full sm:w-auto px-14 py-6 border border-white/10 text-white font-black rounded-xl uppercase tracking-[0.2em] text-xs hover:bg-white/5 hover:border-white/20 transition-all">
                    ${secCtaText}
                </a>
            </div>
            <p class="text-[10px] text-slate-600 uppercase tracking-widest font-bold max-w-2xl mx-auto italic">
                "Los índices sintéticos son instrumentos diseñados para traders con experiencia. Su volatilidad puede generar pérdidas rápidas si no se aplica una correcta gestión del riesgo."
            </p>
        </div>
    </section>
    `;
}

// ─── SECTION 11 — FOOTER (PIE DE PÁGINA) ────────────────────────────────────
export function renderSPFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.ibName || brand.communityName || brand.fullName || 'Partner Oficial';
    const support = content.supportContact || "";
    const year = new Date().getFullYear();

    return `
    <footer class="py-20 px-8 bg-[#050505] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-center gap-12 mb-12">
                <div class="flex flex-col items-center md:items-start gap-4">
                    <img src="/images/logo-bm-blanco.png" class="h-5 opacity-30">
                    <p class="text-[9px] text-slate-600 uppercase tracking-widest font-black">© ${year} BridgeMarkets LTD. Todos los derechos reservados.</p>
                </div>
                <div class="text-center md:text-right">
                    <div class="text-[10px] text-slate-500 font-black uppercase tracking-widest mb-2">PRESENTADO POR: <span class="text-white">${ibName}</span></div>
                    ${support ? `<div class="text-[9px] text-emerald-500/50 font-black uppercase tracking-widest">${support}</div>` : ''}
                </div>
            </div>
            <div class="pt-8 border-t border-white/[0.03] text-center">
                <p class="text-[8px] text-slate-700 uppercase tracking-[0.2em] leading-relaxed max-w-4xl mx-auto">
                    Bridge Markets Global es un bróker registrado. Los productos financieros ofrecidos implican un alto nivel de riesgo. Los índices sintéticos son activos digitales generados algorítmicamente y no están vinculados a activos reales. Asegúrese de comprender los riesgos antes de operar.
                </p>
            </div>
        </div>
    </footer>
    `;
}
