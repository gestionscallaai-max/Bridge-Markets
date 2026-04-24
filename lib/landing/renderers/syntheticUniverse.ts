import { BrandConfig } from '../types';

// ─── SECTION 1 — HERO (UNIVERSO ESPACIAL) ───────────────────
export function renderSNUHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Abrir mi cuenta";
    const ctaLink = content.ctaUrl || brand.ctaLink || "#";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#000]">
        <!-- Galactic Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.15)_0%,_transparent_70%)]"></div>
            <div class="stars-container opacity-30"></div>
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-8 section-reveal">
                    <!-- Badge Fijo -->
                    <div class="inline-flex items-center gap-3 px-4 py-2 bg-indigo-600/20 border border-indigo-500/30 rounded-full mb-8">
                        <span class="text-indigo-400">🏆</span>
                        <span class="text-[9px] font-black text-indigo-400 uppercase tracking-widest leading-tight">
                            El único broker que conecta Deriv + Weltrade + Índices Propios en una sola cuenta
                        </span>
                    </div>
                    
                    <h1 class="text-5xl md:text-[85px] font-black font-montserrat text-white leading-[0.9] uppercase tracking-tighter mb-10">
                        Opera todos los índices <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-indigo-600 italic">Sintéticos</span><br>
                        del mercado.
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-white/40 font-light mb-8 max-w-3xl leading-relaxed">
                        Bridge Markets es el único broker que conecta en una sola cuenta los índices de <span class="text-white">Deriv</span>, los de <span class="text-white">Weltrade</span> y sus propios índices <span class="text-white font-medium">exclusivos</span>. Más de 100 instrumentos 24/7.
                    </p>

                    ${ibPhrase ? `<p class="text-lg text-indigo-400 font-medium mb-12 italic border-l-2 border-indigo-600 pl-6">"${ibPhrase}"</p>` : ''}

                    <div class="flex flex-col md:flex-row items-center gap-8">
                        <a href="${ctaLink}" class="group relative px-12 py-6 bg-white text-black font-black rounded-xl overflow-hidden transition-all hover:pr-16 active:scale-95 shadow-2xl">
                            <span class="relative z-10 uppercase tracking-widest text-xs font-montserrat">${ctaText}</span>
                            <span class="absolute right-6 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all material-symbols-outlined">arrow_forward</span>
                        </a>
                        <div class="text-left">
                            <div class="text-[10px] text-white/20 uppercase tracking-widest mb-1 font-black italic">Presentado por</div>
                            <div class="text-sm font-black text-white uppercase tracking-tighter">${ibName}</div>
                        </div>
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

// ─── SECTION 2 — VALOR (NÚMEROS QUE DIFERENCIAN) ────────────
export function renderSNUValue(content: Record<string, any>, brand: BrandConfig): string {
    const stats = [
        { v: '100+', t: 'Instrumentos Sintéticos', d: 'Disponibles 24/7' },
        { v: '3', t: 'Universos de Mercado', d: 'En una sola cuenta' },
        { v: '24/7', t: 'Operación Continua', d: '365 días al año' },
        { v: '1', t: 'Sola Cuenta MT5', d: 'Para acceder a todo' }
    ];

    return `
    <section class="py-24 px-8 bg-[#020202] border-y border-white/5 relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4 section-reveal mb-20">
                ${stats.map(s => `
                    <div class="text-center">
                        <div class="text-5xl md:text-7xl font-black text-white mb-4 font-montserrat tracking-tighter">${s.v}</div>
                        <div class="text-[10px] text-indigo-500 font-black uppercase tracking-[0.3em] mb-2 leading-tight px-4">${s.t}</div>
                    </div>
                `).join('')}
            </div>
            
            <div class="text-center section-reveal">
                <p class="text-white/30 text-lg md:text-xl font-light italic max-w-4xl mx-auto leading-relaxed">
                    "Antes necesitabas una cuenta en <span class="text-white">Deriv</span> y otra en <span class="text-white">Weltrade</span> para acceder a todos estos índices. <br class="hidden md:block">
                    En Bridge Markets: <span class="text-white font-medium">Deriv + Weltrade + Índices Propios BM</span>. Todo en una sola cuenta MT5."
                </p>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 3 — LOS 3 UNIVERSOS (ARQUITECTURA) ──────────────
export function renderSNUUniverses(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#000]">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none italic">Los 3 Universos de <br>Índices Sintéticos</h2>
                <p class="text-white/30 text-lg max-w-2xl font-light italic">Bridge Markets conecta en una sola cuenta tres universos de índices sintéticos de diferentes ecosistemas:</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 section-reveal">
                <!-- Universo 1 -->
                <div class="group relative p-12 bg-white/[0.01] border border-white/10 hover:border-purple-600/50 transition-all rounded-3xl overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 text-4xl opacity-10">🟣</div>
                    <div class="text-[10px] font-black text-purple-500 mb-16 italic tracking-widest uppercase">Universo 1</div>
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Índices Propios <br>Bridge Markets</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed font-light italic">Fortune, Vortex, BullX, BearX, FomoX. Tecnología exclusiva de BM.</p>
                </div>

                <!-- Universo 2 -->
                <div class="group relative p-12 bg-white/[0.01] border border-white/10 hover:border-blue-600/50 transition-all rounded-3xl overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 text-4xl opacity-10">🔵</div>
                    <div class="text-[10px] font-black text-blue-500 mb-16 italic tracking-widest uppercase">Universo 2</div>
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Mercados Deriv <br>(vía Bridge Markets)</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed font-light italic">Boom, Crash, Volatility, Jump, Step, Range Break. El estándar global integrado.</p>
                </div>

                <!-- Universo 3 -->
                <div class="group relative p-12 bg-white/[0.01] border border-white/10 hover:border-red-600/50 transition-all rounded-3xl overflow-hidden">
                    <div class="absolute top-0 right-0 p-8 text-4xl opacity-10">🔴</div>
                    <div class="text-[10px] font-black text-red-500 mb-16 italic tracking-widest uppercase">Universo 3</div>
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Mercados Weltrade <br>(vía Bridge Markets)</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed font-light italic">VolFX, SpikeFX, FlipX, PainX/GainX (StepRise/StepDrop). Índices de alta intensidad.</p>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 4 — UNIVERSO 1: PROPIOS ────────────────────────
export function renderSNUUnvBM(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { f: 'FORTUNE', i: '100/250/500/1000 — FortuneX', c: 'Movimiento escalonado (step-by-step). Rangos y rupturas claras.' },
        { f: 'VORTEX', i: 'Vortex 20 / 40 / 60 / 80 / 100', c: 'Volatilidad constante y predecible. Mayor número = Mayor amplitud.' },
        { f: 'BULLX', i: 'BullX 400 / 777 / 900 / 1000', c: 'Tendencia bajista con spikes alcistas. Momentum e impulso direccional.' },
        { f: 'BEARX', i: 'BearX 400 / 777 / 900 / 1000', c: 'Tendencia alcista con spikes bajistas. Reversiones y momentum bajista.' },
        { f: 'FOMOX', i: 'FomoX 111 / 333 / 888 / 999', c: 'Tendencia aleatoria y espontánea. Ideal para breakout.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#020202] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center mb-32 section-reveal">
                <div class="lg:col-span-7">
                    <div class="flex items-center gap-4 mb-6">
                        <span class="text-2xl">🟣</span>
                        <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Índices Propios <br>Bridge Markets</h2>
                    </div>
                    <p class="text-white/40 text-lg font-light leading-relaxed italic border-l-2 border-purple-600 pl-8">
                        Desarrollados y operados exclusivamente por Bridge Markets. Infraestructura propietaria diseñada para traders algorítmicos y manuales.
                    </p>
                </div>
                <div class="lg:col-span-5 hidden lg:block">
                    <img src="/images/imagenes_nuevas/reyna_rosa.png" class="h-60 opacity-20 transform -rotate-12 animate-float">
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 section-reveal">
                ${families.map(f => `
                    <div class="p-12 bg-[#020202] hover:bg-purple-950/10 transition-all group">
                        <div class="text-[10px] font-black text-purple-500 mb-8 tracking-widest uppercase">Familia ${f.f}</div>
                        <h4 class="text-xl font-black text-white mb-4 uppercase italic tracking-tight">${f.i}</h4>
                        <p class="text-[10px] text-white/40 uppercase tracking-widest leading-relaxed font-medium italic">${f.c}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 5 — UNIVERSO 2: DERIV ──────────────────────────
export function renderSNUUnvDeriv(content: Record<string, any>, brand: BrandConfig): string {
    const tableData = [
        { f: 'Boom (Impulso Alcista)', d: [ ['Boom 1000 Index', 'B 1000 Idx'], ['Boom 300 Index', 'B 300 Idx'], ['Boom 500 Index', 'B 500 Idx'], ['Boom 900 Index', 'B 900 Idx'] ] },
        { f: 'Crash (Impulso Bajista)', d: [ ['Crash 1000 Index', 'C 1000 Idx'], ['Crash 300 Index', 'C 300 Idx'], ['Crash 500 Index', 'C 500 Idx'], ['Crash 900 Index', 'C 900 Idx'] ] },
        { f: 'Range Break (Rupturas)', d: [ ['Range Break 100', 'R B100 Idx'], ['Range Break 900', 'R B 900 Idx'] ] },
        { f: 'Jump (Mov. Bruscos)', d: [ ['Jump 10 Index', 'J 10 Idx'], ['Jump 100 Index', 'J 100 Idx'], ['Jump 25 Index', 'J 25 Idx'], ['Jump 50 Index', 'J 50 Idx'] ] },
        { f: 'Step (Escalonado)', d: [ ['Step Index', 'STP Idx'], ['Step Index 200', 'STP Idx 200'], ['Step Index 500', 'STP Idx 500'] ] },
        { f: 'Volatility (Controlada)', d: [ ['Volatility 10 Index', 'V 10 Idx'], ['Volatility 100 Index', 'V 100 Idx'], ['Volatility 150 Index', 'V 150 Idx'], ['Volatility 75 Index', 'V 75 Idx'] ] }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <div class="flex items-center gap-4 mb-6">
                    <span class="text-2xl">🔵</span>
                    <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Mercados Deriv <br>(vía Bridge Markets)</h2>
                </div>
                <p class="text-white/40 text-lg font-light leading-relaxed italic border-l-2 border-blue-600 pl-8">
                    Opera los índices del ecosistema Deriv directamente desde tu cuenta BM. Equiparación de símbolos oficial.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-reveal">
                ${tableData.map(group => `
                    <div class="p-8 bg-white/[0.02] border border-white/5 rounded-2xl">
                        <h4 class="text-xs font-black text-blue-500 uppercase tracking-widest mb-6 italic underline decoration-blue-500/30 underline-offset-8">${group.f}</h4>
                        <table class="w-full text-left text-[9px] uppercase tracking-widest font-mono">
                            <thead>
                                <tr class="border-b border-white/10 text-white/30">
                                    <th class="pb-4">SOURCE DERIV</th>
                                    <th class="pb-4">SYMBOL BRIDGE</th>
                                </tr>
                            </thead>
                            <tbody class="text-white/60">
                                ${group.d.map(row => `
                                    <tr class="border-b border-white/5">
                                        <td class="py-4">${row[0]}</td>
                                        <td class="py-4 text-blue-400 font-black">${row[1]}</td>
                                    </tr>
                                `).join('')}
                            </tbody>
                        </table>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 6 — UNIVERSO 3: WELTRADE ───────────────────────
export function renderSNUUnvWeltrade(content: Record<string, any>, brand: BrandConfig): string {
    const tableData = [
        { f: 'Familia VolFX (Volatilidad FX)', d: [ ['FX Vol 20', 'VolFX20'], ['FX Vol 60', 'VolFX60'], ['FX Vol 99', 'VolFX99'] ] },
        { f: 'Familia SpikeFX (Picos FX)', d: [ ['SFX Vol 20', 'SpikeFX20'], ['SFX Vol 60', 'SpikeFX60'], ['SFX Vol 99', 'SpikeFX99'] ] },
        { f: 'Familia FlipX (Reversiones)', d: [ ['FlipX 1', 'FlipStatic'], ['FlipX 3', 'FlipRand3'], ['FlipX 5', 'FlipRand5'] ] },
        { f: 'Familia PainX & GainX (Rise/Drop)', d: [ ['PainX 400', 'StepRise400'], ['GainX 800', 'StepDrop800'], ['PainX 1200', 'StepRise1200'] ] }
    ];

    return `
    <section class="py-40 px-8 bg-[#020202] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <div class="flex items-center gap-4 mb-6">
                    <span class="text-2xl">🔴</span>
                    <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">Mercados Weltrade <br>(vía Bridge Markets)</h2>
                </div>
                <p class="text-white/40 text-lg font-light leading-relaxed italic border-l-2 border-red-600 pl-8">
                    Conexión directa con los índices de alta intensidad de Weltrade. Todo en una sola MT5.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 section-reveal">
                ${tableData.map(group => `
                    <div class="p-10 bg-white/[0.01] border border-white/5 rounded-[2.5rem]">
                        <h4 class="text-xs font-black text-red-500 uppercase tracking-widest mb-8 italic">${group.f}</h4>
                        <div class="grid grid-cols-2 gap-8 text-[10px] uppercase font-mono tracking-widest border-b border-white/10 pb-4 text-white/30">
                            <div>SOURCE WELTRADE</div>
                            <div>SYMBOL BRIDGE</div>
                        </div>
                        <div class="space-y-4 pt-6">
                            ${group.d.map(row => `
                                <div class="grid grid-cols-2 gap-8 text-[10px] uppercase font-mono tracking-widest text-white/60">
                                    <div>${row[0]}</div>
                                    <div class="text-red-400 font-black">${row[1]}</div>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 7 — POR QUÉ BM? ────────────────────────────────
export function renderSNUWhy(content: Record<string, any>, brand: BrandConfig): string {
    const reasons = [
        { t: 'Único ecosistema completo', d: 'Deriv, Weltrade y BM en una sola cuenta MT5.' },
        { t: 'Sin necesidad de múltiples brokers', d: 'Si antes necesitabas cuentas en Deriv y Weltrade por separado, aquí tienes todo en un solo lugar.' },
        { t: 'Más de 100 instrumentos sintéticos', d: 'La mayor oferta de índices sintéticos del mercado global.' },
        { t: 'Disponibles 24/7, 365 días', d: 'Sin cierres de mercado. Sin pausas. Los sintéticos no duermen.' },
        { t: 'Sin influencia de noticias', d: 'Independientes de eventos macroeconómicos. Generados por algoritmos RNG auditados.' },
        { t: 'Ideal para cualquier perfil', d: 'Desde scalpers hasta swing traders, manuales o algorítmicos.' },
        { t: 'Tecnología MT5 Bridge', d: 'Plataforma estable y rápida disponible en escritorio, iOS y Android.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal text-center">
                <h2 class="text-4xl md:text-7xl font-black text-white uppercase tracking-tighter italic leading-none mb-10">La Conexión que <br>Ningún Otro Broker Tiene</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/10 border border-white/10 section-reveal">
                ${reasons.map(r => `
                    <div class="p-12 bg-[#000] hover:bg-indigo-950/10 transition-all group">
                        <div class="w-8 h-8 bg-indigo-500/20 text-indigo-500 rounded-full flex items-center justify-center mb-8 font-black text-xs">★</div>
                        <h4 class="text-xl font-black text-white mb-4 uppercase italic tracking-tight">${r.t}</h4>
                        <p class="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest font-medium italic italic">${r.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 8 — CÓMO EMPEZAR ───────────────────────────────
export function renderSNUWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { t: 'Crea tu cuenta', d: 'Regístrate en el portal a través del link de tu IB.' },
        { t: 'Completa tu KYC', d: 'Verifica tu identidad para activar el acceso total.' },
        { t: 'Deposita fondos', d: 'Deposita en USD para activar tu cuenta de trading.' },
        { t: 'Descarga MT5', d: 'Instala MT5 (Servidor: BridgeMarkets-MT5).' },
        { f: 'Explora el universo', d: 'Busca los índices en MT5. Los 3 universos disponibles.' },
        { f: 'Elige tu familia', d: 'Selecciona el índice que se adapta a tu estrategia.' },
        { f: 'Opera 24/7', d: 'Sin pausas, sin noticias. El mercado siempre abierto.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#020202] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal text-center">
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter italic">¿Cómo empezar a operar?</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-8 section-reveal">
                ${steps.map((s, i) => `
                    <div class="flex flex-col items-center text-center group">
                        <div class="w-12 h-12 rounded-full border border-white/10 flex items-center justify-center text-indigo-500 font-black text-xs mb-6 group-hover:bg-indigo-600 group-hover:text-white transition-all">${i + 1}</div>
                        <h4 class="text-[10px] font-black text-white uppercase tracking-widest mb-4 italic">${s.t}</h4>
                        <p class="text-[8px] text-white/30 uppercase tracking-[0.2em] leading-relaxed font-bold italic">${s.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 9 — COMUNIDAD DEL IB ───────────────────────────
export function renderSNUCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.communityName || brand.communityName || brand.fullName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestro hub de sintéticos y opera con tecnología institucional.';
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1611974717482-aa8a29910609?auto=format&fit=crop&q=80";
    
    const telegram = content.socialTelegram || brand.telegram || "#";
    const whatsapp = content.socialWhatsApp || brand.whatsapp || "#";
    const instagram = content.socialInstagram || brand.instagram || "#";
    const youtube = content.socialYouTube || brand.youtube || "#";
    const tiktok = content.socialTikTok || brand.tiktok || "#";
    
    const supportLabel = content.supportLabel || "Soporte del IB";
    const ctaText = content.ctaText || "Habla con un asesor";
    const ctaLink = content.ctaUrl || brand.ctaLink || "#";

    return `
    <section id="comunidad" class="py-40 px-8 bg-[#000]">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="relative p-12 md:p-24 bg-gradient-to-br from-indigo-950/20 via-[#050505] to-[#000] border border-white/10 rounded-[4rem] overflow-hidden">
                <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
                    <div class="lg:col-span-7">
                        <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-12 block italic underline underline-offset-8 decoration-indigo-600">IB Partner Community</span>
                        <h2 class="text-5xl md:text-[80px] font-black text-white uppercase tracking-tighter leading-none mb-10 italic">${ibName}</h2>
                        <div class="text-xl md:text-2xl text-white/50 font-light mb-12 leading-relaxed italic max-w-2xl border-l-2 border-indigo-600 pl-8">
                            ${message}
                        </div>
                        
                        <div class="flex flex-wrap gap-4 mb-12">
                            ${whatsapp !== '#' ? `<a href="https://wa.me/${whatsapp}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all shadow-lg text-white font-black italic">W</a>` : ''}
                            ${telegram !== '#' ? `<a href="${telegram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#24A1DE] transition-all shadow-lg text-white font-black italic">T</a>` : ''}
                            ${instagram !== '#' ? `<a href="${instagram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#E1306C] transition-all shadow-lg text-white font-black italic">I</a>` : ''}
                            ${youtube !== '#' ? `<a href="${youtube}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#FF0000] transition-all shadow-lg text-white font-black italic">Y</a>` : ''}
                            ${tiktok !== '#' ? `<a href="${tiktok}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-black transition-all shadow-lg text-white font-black italic">K</a>` : ''}
                        </div>

                        <div class="flex flex-wrap gap-6">
                            <a href="${ctaLink}" class="px-12 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all shadow-2xl italic">
                                ${ctaText}
                            </a>
                            <a href="https://wa.me/${whatsapp}" class="px-12 py-5 bg-indigo-600/20 text-indigo-400 border border-indigo-500/30 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-indigo-600 hover:text-white transition-all italic">
                                ${supportLabel}
                            </a>
                        </div>
                    </div>
                    <div class="lg:col-span-5 relative hidden lg:block">
                        <div class="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group relative">
                            <img src="${photoUrl}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000">
                            <div class="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-40"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 10 — FAQ (ACORDEÓN FIJO) ───────────────────────
export function renderSNUFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué hace único a Bridge Markets en mercados sintéticos?', a: 'Es el único broker donde una sola cuenta MT5 da acceso a los tres ecosistemas: Deriv, Weltrade y los índices exclusivos propios de Bridge Markets.' },
        { q: '¿Cuántos instrumentos sintéticos hay disponibles?', a: 'Más de 100 instrumentos entre los tres universos: propios BM, Deriv y exclusivos Bridge.' },
        { q: '¿Todos los índices de los tres ecosistemas están disponibles 24/7?', a: 'Si. Todos los índices de Deriv, Weltrade y propios BM operan 24/7, los 365 días del año sin cierres de mercado.' },
        { q: '¿Los índices de Deriv y Weltrade están disponibles sin abrir otra cuenta?', a: 'Si. Tanto los índices de Deriv como los de Weltrade están integrados en tu cuenta BM. No necesitas registrarte en esas plataformas.' },
        { q: '¿Qué son los índices propios de Bridge Markets?', a: 'Son los índices exclusivos desarrollados por BM: Fortune, Vortex, BullX, BearX y FomoX. Solo disponibles en Bridge Markets.' },
        { q: '¿En qué plataforma se operan?', a: 'MetaTrader 5 (MT5). Disponible para escritorio, iOS y Android. Servidor: BridgeMarkets-MT5.' },
        { q: '¿Puedo usar robots o EAs?', a: 'Sí. Los índices sintéticos son ideales para trading algorítmico por su consistencia y disponibilidad continua.' },
        { q: '¿Hay noticias económicas que afecten los sintéticos?', a: 'No. Todos los índices son generados por algoritmos RNG auditados, completamente independientes de eventos macroeconómicos.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#020202] border-t border-white/5">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl font-black text-white text-center uppercase tracking-tighter mb-24 italic underline decoration-indigo-600 underline-offset-8">Central de Consultas Sintéticas</h2>
            <div class="space-y-4">
                ${faqs.map(faq => `
                    <div class="p-10 bg-white/[0.01] border border-white/5 rounded-3xl hover:bg-white/[0.03] transition-all group">
                        <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 group-hover:text-indigo-400 transition-colors italic">${faq.q}</h4>
                        <p class="text-white/30 text-xs leading-relaxed uppercase font-medium tracking-wider italic">${faq.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── SECTION 11 — CTA FINAL ─────────────────────────────────
export function renderSNUFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaMainText = content.ctaMainText || "Abrir mi cuenta ahora";
    const ctaSecondaryText = content.ctaSecondaryText || "Ver gráficos en vivo";
    const ctaMainLink = content.ctaMainLink || brand.ctaLink || "#";
    const ctaSecondaryLink = content.ctaSecondaryLink || "https://charts.bridgemarkets.global";

    return `
    <section class="py-60 px-8 bg-[#000] text-center relative overflow-hidden">
        <div class="max-w-6xl mx-auto relative z-10 section-reveal">
            <h2 class="text-5xl md:text-[100px] font-black text-white uppercase leading-[0.85] tracking-tighter mb-12 italic">
                Deriv, Weltrade y propios BM. <br>
                <span class="text-indigo-600">Todo en Bridge Markets.</span>
            </h2>
            <p class="text-xl text-white/30 mb-20 max-w-2xl mx-auto italic font-light uppercase tracking-widest">
                Más de 100 instrumentos. Tres ecosistemas. Una sola cuenta. Disponible 24/7.
            </p>
            
            <div class="flex flex-col md:flex-row items-center justify-center gap-6 mb-24">
                <a href="${ctaMainLink}" class="px-16 py-8 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-xs hover:scale-105 active:scale-95 transition-all shadow-2xl italic">
                    ${ctaMainText}
                </a>
                <a href="${ctaSecondaryLink}" class="px-12 py-8 bg-white/5 text-white border border-white/10 rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-white/10 transition-all italic">
                    ${ctaSecondaryText}
                </a>
            </div>
            
            <p class="text-[9px] text-white/20 uppercase tracking-[0.5em] font-black max-w-3xl mx-auto italic leading-loose">
                DISCLAIMER: LOS ÍNDICES SINTÉTICOS IMPLICAN RIESGO. OPERA SIEMPRE CON UNA ESTRATEGIA Y GESTIÓN DE RIESGO PROBADA.
            </p>
        </div>
    </section>
    `;
}

// ─── SECTION 12 — FOOTER ────────────────────────────────────
export function renderSNUFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const currentYear = new Date().getFullYear();

    return `
    <footer class="py-24 px-8 bg-[#010101] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-24">
                <div class="max-w-xs">
                    <img src="/images/logo-bm-blanco.png" class="h-6 mb-8">
                    <p class="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed font-bold italic">
                        El ecosistema sintético más potente del mercado. Deriv, Weltrade y BM en una sola MT5.
                    </p>
                </div>
                <div class="grid grid-cols-2 lg:grid-cols-3 gap-12 text-[10px] uppercase font-black tracking-widest italic">
                    <div class="space-y-4">
                        <div class="text-white/20 mb-6">Productos</div>
                        <a href="#" class="text-white/40 block hover:text-white transition-colors">Índices Sintéticos</a>
                        <a href="#" class="text-white/40 block hover:text-white transition-colors">PropFirm</a>
                        <a href="#" class="text-white/40 block hover:text-white transition-colors">MT5 Download</a>
                    </div>
                    <div class="space-y-4">
                        <div class="text-white/20 mb-6">Recursos</div>
                        <a href="https://charts.bridgemarkets.global" class="text-white/40 block hover:text-white transition-colors">Gráficos</a>
                        <a href="#" class="text-white/40 block hover:text-white transition-colors">Academia</a>
                    </div>
                    <div class="col-span-2 lg:col-span-1 space-y-4">
                        <div class="text-white/20 mb-6">Contacto BM</div>
                        <div class="text-white/40 lowercase tracking-normal">corporate@bridgemarkets.global</div>
                        <div class="text-white/40">+1 (786) 979-3392</div>
                    </div>
                </div>
            </div>

            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-3xl mb-12">
                <p class="text-[8px] text-white/20 leading-relaxed uppercase tracking-widest font-medium italic">
                    ADVERTENCIA DE RIESGO: OPERAR EN MERCADOS FINANCIEROS Y DE ÍNDICES SINTÉTICOS CONLLEVA UN NIVEL DE RIESGO ELEVADO. LOS RESULTADOS PASADOS NO GARANTIZAN RENDIMIENTOS FUTUROS. BRIDGE MARKETS LTD NO OFRECE SERVICIOS A RESIDENTES DE CIERTAS JURISDICCIONES COMO EE. UU. Y COREA DEL NORTE.
                </p>
            </div>

            <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <div class="text-[9px] text-white/10 uppercase tracking-widest font-black italic">© ${currentYear} BridgeMarkets LTD. Todos los derechos reservados.</div>
                <div class="text-[10px] text-white/40 font-black uppercase tracking-widest italic">
                    Presentado por <span class="text-white">${ibName}</span>
                </div>
            </div>
        </div>
    </footer>
    `;
}

/**
 * Renders the Synthetic Universe Registration Form.
 * Galactic dark style with indigo highlights.
 */
export function renderSNURegistration(content: Record<string, any>, brand: BrandConfig): string {
    const partnerId = brand.partnerId || "BM_GLOBAL";
    const slug = brand.slug || 'default';
    
    return `
    <section id="registro" class="py-40 px-8 bg-[#000] relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)]"></div>
        
        <div class="max-w-6xl mx-auto relative z-10">
            <div class="bg-gradient-to-br from-indigo-950/20 via-[#050505] to-[#000] border border-indigo-500/20 rounded-[4rem] overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.1)] flex flex-col lg:flex-row">
                <!-- Info -->
                <div class="lg:w-1/2 p-16 lg:p-24 flex flex-col justify-center relative overflow-hidden">
                    <div class="absolute top-0 left-0 w-full h-full opacity-10 stars-container"></div>
                    <div class="relative z-10">
                        <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-12 block italic">Acceso Galáctico</span>
                        <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase leading-none mb-10 tracking-tighter italic">Entra al Universo <br><span class="text-indigo-400">Sintético.</span></h2>
                        <p class="text-lg text-white/40 font-light mb-12 leading-relaxed italic">
                            La mayor oferta de índices sintéticos del planeta te espera. Regístrate y activa tu cuenta MT5 en minutos.
                        </p>
                        <div class="grid grid-cols-2 gap-6">
                            <div class="p-6 bg-white/5 border border-white/5 rounded-2xl">
                                <div class="text-xl font-black text-white mb-2">100+</div>
                                <div class="text-[8px] text-white/30 uppercase tracking-widest font-black">Activos</div>
                            </div>
                            <div class="p-6 bg-white/5 border border-white/5 rounded-2xl">
                                <div class="text-xl font-black text-white mb-2">24/7</div>
                                <div class="text-[8px] text-white/30 uppercase tracking-widest font-black">Operativa</div>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Form -->
                <div class="lg:w-1/2 p-16 lg:p-24 bg-white/[0.01] backdrop-blur-3xl border-l border-white/5">
                    <form id="snuLeadForm" class="space-y-8">
                        <input type="hidden" name="partnerId" value="${partnerId}">
                        <input type="hidden" name="landingSlug" value="${slug}">
                        <input type="hidden" name="source" value="synthetic_universe_registration">
                        
                        <div>
                            <label class="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Identidad del Trader</label>
                            <input type="text" required name="name" placeholder="NOMBRE COMPLETO" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 uppercase font-black">
                        </div>
                        
                        <div>
                            <label class="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">Canal de Contacto (Email)</label>
                            <input type="email" required name="email" placeholder="EMAIL@TRADING.COM" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 uppercase font-black">
                        </div>

                        <div>
                            <label class="block text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-4">WhatsApp / Signal</label>
                            <input type="tel" required name="whatsapp" placeholder="+00 000 000 000" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-5 text-white text-sm focus:outline-none focus:border-indigo-500 transition-all placeholder:text-white/10 uppercase font-black">
                        </div>

                        <button type="submit" id="snuSubmitBtn" class="w-full py-6 bg-indigo-600 text-white font-black uppercase tracking-[0.3em] text-[10px] rounded-2xl hover:bg-indigo-500 transition-all shadow-[0_20px_40px_rgba(79,70,229,0.3)] active:scale-95 italic">
                            Iniciar mi Viaje →
                        </button>
                    </form>
                    <div id="snuFormMessage" class="mt-8 text-center"></div>
                </div>
            </div>
        </div>

        <script>
            document.getElementById("snuLeadForm").addEventListener("submit", async function(e) {
                e.preventDefault();
                const btn = document.getElementById("snuSubmitBtn");
                const msg = document.getElementById("snuFormMessage");
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                const originalText = btn.textContent;
                btn.disabled = true;
                btn.textContent = "CONECTANDO CON EL HUB...";
                
                try {
                    const res = await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify(data)
                    });
                    
                    if (res.ok) {
                        btn.style.backgroundColor = "#10b981";
                        btn.textContent = "ACCESO CONCEDIDO";
                        msg.innerHTML = '<p class="text-emerald-500 font-black text-[10px] uppercase tracking-widest italic">Tu solicitud ha sido enviada al universo Bridge Markets.</p>';
                        this.reset();
                        
                        setTimeout(() => {
                            window.location.href = 'https://portal.bridgemarkets.global/register?partner=' + data.partnerId;
                        }, 2000);
                    } else {
                        throw new Error();
                    }
                } catch (err) {
                    btn.style.backgroundColor = "#ef4444";
                    btn.textContent = "ERROR DE CONEXIÓN";
                    setTimeout(() => {
                        btn.disabled = false;
                        btn.style.backgroundColor = "#4f46e5";
                        btn.textContent = originalText;
                    }, 3000);
                }
            });
        </script>
    </section>`;
}
