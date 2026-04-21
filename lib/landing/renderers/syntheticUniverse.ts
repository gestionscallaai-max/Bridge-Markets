import { BrandConfig } from '../types';

// ─── UNIVERSE HERO (TECH MINIMALIST + 3D ASSETS) ───────────
export function renderSNUHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Oficial';
    const ctaText = content.ctaMainText || "Acceso Total";
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="relative min-h-screen flex items-center bg-[#000] overflow-hidden">
        <div class="absolute inset-0 opacity-20" 
             style="background-image: linear-gradient(#1e293b 1px, transparent 1px), linear-gradient(90deg, #1e293b 1px, transparent 1px); background-size: 50px 50px;"></div>
        
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-[radial-gradient(circle_at_center,_rgba(99,102,241,0.05)_0%,_transparent_70%)]"></div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                <div class="lg:col-span-7 section-reveal">
                    <div class="flex items-center gap-4 mb-8">
                        <div class="h-px w-12 bg-indigo-500"></div>
                        <span class="text-[10px] font-black text-indigo-500 uppercase tracking-[0.5em]">Infraestructura de Ejecución Unificada</span>
                    </div>
                    
                    <h1 class="text-6xl md:text-[100px] font-black font-montserrat text-white leading-[0.85] uppercase tracking-tighter mb-12">
                        Todo el Mercado <br>
                        <span class="text-transparent" style="-webkit-text-stroke: 1px rgba(255,255,255,0.4);">Sintético</span><br>
                        en un solo Nodo.
                    </h1>
                    
                    <p class="text-xl md:text-2xl text-white/30 font-light mb-16 max-w-2xl leading-relaxed italic">
                        "Bridge Markets unifica los ecosistemas <span class="text-white">Deriv</span>, <span class="text-white">Weltrade</span> y sus propios <span class="text-white">índices exclusivos</span>. Más de 100 instrumentos centralizados."
                    </p>

                    <div class="flex flex-col md:flex-row items-center gap-10">
                        <a href="${ctaLink}" class="group relative px-12 py-6 bg-indigo-600 text-white font-black uppercase tracking-widest text-xs overflow-hidden transition-all hover:bg-indigo-500 shadow-[0_0_40px_rgba(79,70,229,0.3)]">
                            <span class="relative z-10">${ctaText}</span>
                        </a>
                        <div class="flex items-center gap-4">
                            <div class="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                            <span class="text-[10px] font-black text-white/40 uppercase tracking-widest italic font-mono">NODE_STATUS: ACTIVE_MT5</span>
                        </div>
                    </div>
                </div>

                <div class="lg:col-span-5 relative hidden lg:block section-reveal delay-300">
                    <!-- Main 3D Asset: Full Chess Set -->
                    <img src="/images/imagenes%20nuevas/8d25cf7f49c36716ee118242656ba3e722258a6f.png" 
                         class="w-full h-auto animate-float drop-shadow-[0_35px_35px_rgba(99,102,241,0.2)]">
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── METRICS (DATA COUNTERS + 3D COINS) ─────────────────────
export function renderSNUMetrics(content: Record<string, any>, brand: BrandConfig): string {
    const stats = [
        { v: '100+', t: 'Instrumentos', d: 'Liquidez Algorítmica' },
        { v: '3', t: 'Ecosistemas', d: 'Conexión Unificada' },
        { v: '0.0ms', t: 'Latencia', d: 'Ejecución Directa' },
        { v: '24/7', t: 'Uptime', d: 'Operativa Continua' }
    ];

    return `
    <section class="py-24 px-8 bg-[#000] border-y border-white/5 relative overflow-hidden">
        <!-- Decoration: 3D Coins -->
        <img src="/images/imagenes%20nuevas/72a15cb082711bd8b151d88794bbcaef5d89cd98.png" 
             class="absolute -right-20 top-0 h-80 opacity-10 animate-float pointer-events-none">

        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-4 section-reveal">
                ${stats.map(s => `
                    <div class="text-center lg:text-left">
                        <div class="text-5xl md:text-7xl font-black text-white mb-2 font-montserrat tracking-tighter">${s.v}</div>
                        <div class="text-[10px] text-indigo-500 font-black uppercase tracking-[0.3em] mb-2">${s.t}</div>
                        <p class="text-[10px] text-white/20 uppercase tracking-widest font-medium">${s.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── THE 3 ECOSYSTEMS ───────────────────────────────────────
export function renderSNUUniversesIntro(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#000]">
        <div class="max-w-7xl mx-auto">
            <div class="mb-32 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 leading-none italic">Triangulación <br>de Mercados.</h2>
                <p class="text-white/30 text-lg max-w-2xl font-light italic">"Bridge Markets unifica tres universos de índices sintéticos en una sola cuenta profesional MT5."</p>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 section-reveal">
                <div class="group relative p-12 bg-white/[0.02] border border-white/10 hover:border-purple-500/50 transition-all">
                    <div class="text-[10px] font-black text-white/20 mb-16 italic tracking-widest">ECO-01 // BRIDGE PROPRIETARY</div>
                    <h3 class="text-3xl font-black text-white mb-6 uppercase italic">Índices BM</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed mb-12 font-light italic">Fortune, Vortex, BullX, BearX, FomoX. Tecnología exclusiva de BM.</p>
                    <div class="w-12 h-1 bg-purple-600 transition-all group-hover:w-full"></div>
                </div>

                <div class="group relative p-12 bg-white/[0.02] border border-white/10 hover:border-blue-500/50 transition-all">
                    <div class="text-[10px] font-black text-white/20 mb-16 italic tracking-widest">ECO-02 // DERIV NETWORK</div>
                    <h3 class="text-3xl font-black text-white mb-6 uppercase italic">Mercados Deriv</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed mb-12 font-light italic">Boom, Crash, Volatility, Jump, Step, Range Break. El estándar global.</p>
                    <div class="w-12 h-1 bg-blue-600 transition-all group-hover:w-full"></div>
                </div>

                <div class="group relative p-12 bg-white/[0.02] border border-white/10 hover:border-red-500/50 transition-all">
                    <div class="text-[10px] font-black text-white/20 mb-16 italic tracking-widest">ECO-03 // WELTRADE STREAM</div>
                    <h3 class="text-3xl font-black text-white mb-6 uppercase italic">Mercados Weltrade</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest leading-relaxed mb-12 font-light italic">VolFX, SpikeFX, FlipX, PainX/GainX. Índices de alta intensidad.</p>
                    <div class="w-12 h-1 bg-red-600 transition-all group-hover:w-full"></div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── UNIVERSE 1 (BM + PAWN) ─────────────────────────────────
export function renderSNUU1BM(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#020202] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center section-reveal">
                <div class="lg:col-span-5">
                    <h2 class="text-5xl md:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter mb-8">Índices <br><span class="text-purple-600">Propios.</span></h2>
                    <p class="text-white/40 text-lg font-light leading-relaxed mb-12 italic">"Instrumentos desarrollados y operados exclusivamente por Bridge Markets. Sin influencias externas."</p>
                    
                    <div class="space-y-4">
                        ${['Fortune 100/1000', 'Vortex 20/100', 'BullX / BearX', 'FomoX 111/999'].map(i => `
                            <div class="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic border-b border-white/5 pb-2">${i}</div>
                        `).join('')}
                    </div>
                </div>
                <div class="lg:col-span-7 relative">
                    <!-- 3D Asset: Pawn on Silk -->
                    <img src="/images/imagenes%20nuevas/0ba35ff58cd00d6aab66ae503b7d759320e40c7e.png" 
                         class="w-full h-auto opacity-80 mix-blend-lighten">
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── UNIVERSE 2 (DERIV) ─────────────────────────────────────
export function renderSNUU2Deriv(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#000]">
        <div class="max-w-7xl mx-auto">
            <div class="mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8 italic">Data Feed <br><span class="text-blue-600">Deriv Network.</span></h2>
            </div>

            <div class="overflow-x-auto section-reveal">
                <table class="w-full text-left border-collapse border border-white/10">
                    <thead>
                        <tr class="bg-white/5">
                            <th class="p-8 text-[10px] font-black text-white/40 uppercase tracking-widest italic">Source (Deriv)</th>
                            <th class="p-8 text-[10px] font-black text-white/40 uppercase tracking-widest italic">Symbol (Bridge Markets)</th>
                            <th class="p-8 text-[10px] font-black text-white/40 uppercase tracking-widest italic">Live Status</th>
                        </tr>
                    </thead>
                    <tbody class="text-white/60 font-mono text-xs">
                        ${[
                            ['Boom 1000 Index', 'B 1000 Idx', 'LIVE'],
                            ['Crash 1000 Index', 'C 1000 Idx', 'LIVE'],
                            ['Range Break 100', 'R B100 Idx', 'LIVE'],
                            ['Jump 100 Index', 'J 100 Idx', 'LIVE'],
                            ['Step Index 500', 'STP Idx 500', 'LIVE']
                        ].map(row => `
                            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-all">
                                <td class="p-8 italic">${row[0]}</td>
                                <td class="p-8 text-blue-400 font-black">${row[1]}</td>
                                <td class="p-8"><span class="px-2 py-1 bg-blue-500/10 text-blue-500 text-[8px] font-black rounded uppercase">ACTIVE</span></td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    `;
}

// ─── UNIVERSE 3 (WELTRADE + BARREL) ─────────────────────────
export function renderSNUU3Welt(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 px-8 bg-[#020202]">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center section-reveal">
                <div class="order-2 lg:order-1 relative">
                    <!-- 3D Asset: Barrel -->
                    <img src="/images/imagenes%20nuevas/8337d16df907b43ac2769334af6bc3b99adf821e.png" 
                         class="w-full h-auto drop-shadow-[0_0_80px_rgba(239,68,68,0.2)]">
                </div>
                <div class="order-1 lg:order-2">
                    <h2 class="text-5xl md:text-8xl font-black text-white uppercase leading-[0.85] tracking-tighter mb-8 italic">Nodes <br><span class="text-red-600">Weltrade.</span></h2>
                    <p class="text-white/40 text-lg font-light leading-relaxed mb-12 italic">Espejo de alta velocidad para VolFX, SpikeFX, FlipX y la serie Pain/Gain.</p>
                    <div class="space-y-4">
                        ${['VolFX 20/99', 'SpikeFX 20/99', 'FlipStatic/Rand', 'StepRise/Drop'].map(f => `
                            <div class="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] italic border-b border-white/5 pb-2">${f}</div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── WHY BM (TECH + CHART) ──────────────────────────────────
export function renderSNUWhy(content: Record<string, any>, brand: BrandConfig): string {
    const reasons = [
        { t: 'Ecosistema Unificado', d: 'Deriv, Weltrade y BM en una sola terminal.' },
        { t: 'Sin Fragmentación', d: 'Una sola cuenta, una sola MT5.' },
        { t: 'Auditado RNG', d: 'Algoritmos verificados bajo estándares de élite.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] relative overflow-hidden">
        <!-- Decoration: 3D Chart -->
        <img src="/images/imagenes%20nuevas/4239c55232278a1d611b9c3c88def10ad5d611de.png" 
             class="absolute -left-20 bottom-0 h-[600px] opacity-10 rotate-12 pointer-events-none">

        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5 border border-white/5 section-reveal">
                ${reasons.map(r => `
                    <div class="p-16 bg-[#000] hover:bg-indigo-950/10 transition-all group">
                        <h4 class="text-lg font-black text-white mb-6 uppercase tracking-tight italic">${r.t}</h4>
                        <p class="text-[10px] text-white/30 leading-relaxed uppercase tracking-[0.2em] font-medium italic italic">${r.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── HOW TO START ───────────────────────────────────────────
export function renderSNUWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = ['Registro Portal', 'KYC Verification', 'Fund Account', 'MT5 Download', 'Node Sync', 'Asset Choice', 'Execute 24/7'];

    return `
    <section class="py-40 px-8 bg-[#000] border-t border-white/5 text-center">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-wrap justify-center gap-12 section-reveal">
                ${steps.map((step, idx) => `
                    <div class="flex flex-col items-center gap-4 group">
                        <div class="text-[10px] font-black text-indigo-500 font-mono tracking-tighter">NODE_0${idx + 1}</div>
                        <div class="text-[9px] font-black text-white uppercase tracking-[0.3em] italic group-hover:text-indigo-400 transition-colors">${step}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── COMMUNITY ──────────────────────────────────────────────
export function renderSNUCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Admin';
    const message = content.communityMessage || 'Únete al hub de sintéticos más grande del mercado.';
    const telegram = brand.telegram || '#';
    const whatsapp = brand.whatsapp || '#';

    return `
    <section id="comunidad" class="py-40 px-8 bg-[#000]">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="border border-white/10 p-12 md:p-32 bg-white/[0.01] relative overflow-hidden text-center">
                <div class="relative z-10 max-w-4xl mx-auto">
                    <span class="text-indigo-500 font-black text-[10px] uppercase tracking-[0.5em] mb-12 block italic">Access Node: ${ibName.toUpperCase()}</span>
                    <h2 class="text-5xl md:text-[90px] font-black text-white leading-none uppercase tracking-tighter mb-10 italic">${ibName}</h2>
                    <p class="text-xl md:text-2xl text-white/40 font-light mb-16 leading-relaxed italic">"${message}"</p>
                    
                    <div class="flex flex-wrap justify-center gap-8">
                        <a href="${telegram}" class="px-12 py-6 border border-white text-white font-black uppercase tracking-widest text-xs hover:bg-white hover:text-black transition-all">Telegram Hub</a>
                        <a href="${whatsapp}" class="px-12 py-6 bg-white text-black font-black uppercase tracking-widest text-xs hover:bg-indigo-600 hover:text-white transition-all">WhatsApp Direct</a>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── FAQ ────────────────────────────────────────────────────
export function renderSNUFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué es el Nodo Unificado?', a: 'Tecnología de BM que permite operar Deriv, Weltrade y BM desde una sola cuenta MT5.' },
        { q: '¿Necesito cuentas externas?', a: 'No. Todos los feeds están integrados directamente en Bridge Markets.' },
        { q: '¿Disponibilidad?', a: '24/7, 365 días al año. Sin pausas ni cierres de mercado.' },
        { q: '¿Plataforma?', a: 'MetaTrader 5 (MT5). Desktop, Web, iOS y Android.' }
    ];

    return `
    <section class="py-40 px-8 bg-[#000] border-t border-white/5">
        <div class="max-w-3xl mx-auto section-reveal">
            <div class="space-y-12">
                ${faqs.map(faq => `
                    <div class="group border-l border-white/10 pl-8 hover:border-indigo-600 transition-all">
                        <h4 class="text-white font-black uppercase tracking-widest text-xs mb-4 italic group-hover:text-indigo-400 transition-colors">${faq.q}</h4>
                        <p class="text-white/30 text-[9px] leading-relaxed uppercase font-medium tracking-[0.2em] italic">${faq.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── FINAL CTA (ROOK) ───────────────────────────────────────
export function renderSNUCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaMainLink = brand.ctaLink || "#";

    return `
    <section class="py-60 px-8 bg-[#000] text-center border-t border-white/5 relative overflow-hidden">
        <!-- Decoration: 3D Rook -->
        <img src="/images/imagenes%20nuevas/a6167a17df2b6b1d32e1f9330b6cc672864ac12b.png" 
             class="absolute right-0 bottom-0 h-[500px] opacity-10 hover:opacity-20 transition-opacity pointer-events-none">

        <div class="max-w-6xl mx-auto relative z-10 section-reveal">
            <h2 class="text-6xl md:text-[140px] font-black text-white uppercase leading-[0.8] tracking-tighter mb-16 italic">
                Operativa <br>
                <span class="text-indigo-600">Total.</span>
            </h2>
            
            <a href="${ctaMainLink}" class="inline-block px-20 py-10 bg-white text-black font-black uppercase tracking-[0.4em] text-xs hover:bg-indigo-600 hover:text-white transition-all shadow-[0_0_80px_rgba(255,255,255,0.1)]">
                Initialize Real Account
            </a>
            
            <p class="text-[8px] text-white/10 uppercase tracking-[0.6em] font-black mt-20 italic">
                SYSTEM STANDBY // READY FOR EXECUTION
            </p>
        </div>
    </section>
    `;
}

// ─── FOOTER ─────────────────────────────────────────────────
export function renderSNUFooter(content: Record<string, any>, brand: BrandConfig): string {
    const currentYear = new Date().getFullYear();

    return `
    <footer class="py-24 px-8 bg-[#000] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-center gap-12">
                <img src="/images/logo-bm-blanco.png" class="h-5 opacity-50">
                <div class="text-[9px] text-white/10 uppercase tracking-[0.4em] font-black italic">
                    © ${currentYear} BridgeMarkets LTD // Unified Synthetic Protocol v4.0
                </div>
                <div class="flex gap-8">
                    <span class="text-[8px] text-white/20 font-mono tracking-widest">BM_PROPRIETARY</span>
                    <span class="text-[8px] text-white/20 font-mono tracking-widest">DERIV_SYNC</span>
                    <span class="text-[8px] text-white/20 font-mono tracking-widest">WELT_MIRROR</span>
                </div>
            </div>
        </div>
    </footer>
    `;
}
