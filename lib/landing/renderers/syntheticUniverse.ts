import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderSNUHero(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'snu_hero')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="relative min-h-screen flex items-center pt-24 pb-32 px-8 overflow-hidden bg-[#0a0614]">
        <!-- Fondo Galáctico Dinámico -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30"></div>
            <div class="absolute top-[-20%] right-[-10%] w-[1200px] h-[1200px] bg-[#865BFF]/10 rounded-full blur-[200px] animate-pulse"></div>
            <div class="absolute bottom-[-20%] left-[-10%] w-[1000px] h-[1000px] bg-blue-600/5 rounded-full blur-[180px]"></div>
            
            <!-- Estrellas fugaces o partículas (CSS simple) -->
            <div class="absolute top-1/4 left-1/4 w-px h-px bg-white shadow-[0_0_10px_2px_white] rounded-full animate-ping"></div>
            <div class="absolute top-2/3 right-1/3 w-px h-px bg-white shadow-[0_0_15px_3px_white] rounded-full animate-ping" style="animation-delay: 1.5s;"></div>
        </div>
        
        <div class="max-w-7xl mx-auto w-full relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
                
                <!-- Columna Izquierda: El Mensaje Universal -->
                <div class="lg:col-span-7 section-reveal">
                    <div class="inline-flex items-center gap-4 mb-10 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-3xl shadow-2xl">
                        <span class="material-symbols-outlined text-[#865BFF] animate-spin-slow">star_half</span>
                        <span class="text-[11px] font-black uppercase tracking-[0.5em] text-white/90">LA TRINIDAD SINTÉTICA: DERIV + WELTRADE + BM</span>
                    </div>
                    
                    <h1 class="text-6xl md:text-8xl lg:text-[9.5rem] font-black font-headline leading-[0.82] mb-12 tracking-tightest text-white uppercase drop-shadow-[0_0_80px_rgba(134,91,255,0.4)]">
                        TODO TU <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#865BFF] to-white/50">UNIVERSO.</span>
                    </h1>
                    
                    <p class="text-2xl md:text-3xl text-white/40 leading-relaxed max-w-2xl mb-16 font-light">
                        ${c.subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-8 items-center">
                        <a href="${ctaLink}" class="group relative px-12 py-6 bg-[#865BFF] text-white font-black rounded-3xl shadow-[0_0_60px_rgba(134,91,255,0.5)] hover:shadow-[0_0_100px_rgba(134,91,255,0.7)] transition-all transform hover:-translate-y-2 flex items-center justify-center gap-6 text-xl">
                            <span class="uppercase tracking-widest">${c.cta}</span>
                            <span class="material-symbols-outlined group-hover:translate-x-3 transition-transform text-3xl">rocket</span>
                        </a>
                        
                        <div class="flex items-center gap-6 p-5 border border-white/5 rounded-[2.5rem] bg-white/[0.02] backdrop-blur-2xl">
                            <div class="w-14 h-14 rounded-2xl bg-black/50 border border-[#865BFF]/30 flex items-center justify-center overflow-hidden">
                                <img src="${brand.logoUrl || '/logo.png'}" alt="IB" class="w-10 object-contain">
                            </div>
                            <div>
                                <p class="text-[10px] font-black uppercase tracking-[0.5em] text-[#865BFF] mb-1">PROYECTO LIDERADO POR</p>
                                <p class="text-lg font-black text-white uppercase tracking-tighter">${ibName}</p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Columna Derecha: El Orbe Galáctico -->
                <div class="lg:col-span-5 relative lg:block hidden section-reveal">
                    <div class="relative group">
                        <div class="absolute -inset-16 bg-blue-600/10 rounded-full blur-[120px] animate-pulse"></div>
                        <div class="absolute -inset-8 bg-[#865BFF]/15 rounded-full blur-[100px] group-hover:bg-[#865BFF]/25 transition-all duration-1000"></div>
                        
                        <div class="relative z-10 rounded-[5rem] overflow-hidden border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.8)] transform rotate-[-2deg] group-hover:rotate-0 transition-all duration-1000 aspect-square bg-[#0a0614]">
                            <img src="/synthetic_universe_3d.png" alt="Synthetic Universe" class="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-80">
                            
                            <!-- Floating Info Tags -->
                            <div class="absolute top-12 left-12 p-5 bg-white/5 backdrop-blur-3xl rounded-3xl border border-white/10 shadow-2xl animate-bounce-slow">
                                <div class="flex items-center gap-4">
                                    <div class="w-3 h-3 bg-emerald-500 rounded-full shadow-[0_0_10px_#10b981]"></div>
                                    <span class="text-[10px] font-black text-white uppercase tracking-widest">LIVE SYNC ACTIVE</span>
                                </div>
                            </div>

                            <div class="absolute bottom-12 right-12 p-6 bg-black/60 backdrop-blur-3xl rounded-3xl border border-[#865BFF]/20 shadow-2xl">
                                <p class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em] mb-2">NETWORK LATENCY</p>
                                <p class="text-3xl font-black text-white tracking-tighter">0.005 ms</p>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>`;
}


export function renderSNUMetrics(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 bg-[#0a0614] border-y border-white/5">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${[
                    { val: '100+', label: 'Instrumentos', desc: 'Sintéticos Disponibles' },
                    { val: '3', label: 'Universos', desc: 'En una sola cuenta' },
                    { val: '24/7', label: 'Operación', desc: 'Los 365 días al año' },
                    { val: '1', label: 'Sola Cuenta', desc: 'Acceso Total a MT5' }
                ].map((m, i) => `
                    <div class="p-12 bg-white/5 border border-white/10 rounded-[4rem] text-center hover:bg-[#865BFF]/10 transition-all group" style="animation-delay: ${i * 0.1}s;">
                         <div class="text-[10rem] font-black text-white/5 absolute inset-0 flex items-center justify-center select-none group-hover:text-[#865BFF]/10 transition-colors">${m.val}</div>
                         <div class="relative z-10">
                            <div class="text-7xl font-black text-white mb-4 drop-shadow-[0_10px_30px_rgba(255,255,255,0.1)]">${m.val}</div>
                            <div class="text-xl font-black text-[#865BFF] uppercase tracking-[0.4em] mb-2">${m.label}</div>
                            <div class="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em]">${m.desc}</div>
                         </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-24 p-12 bg-[#865BFF]/5 border border-[#865BFF]/20 rounded-[4rem] text-center">
                 <p class="text-2xl text-white/60 font-medium leading-relaxed max-w-4xl mx-auto">
                    "Antes necesitabas una cuenta en Deriv Y otra en Weltrade para acceder a todos estos índices. <br>
                    <span class="text-white font-black">En Bridge Markets, tienes todo en una sola cuenta MT5.</span>"
                 </p>
            </div>
        </div>
    </section>`;
}

export function renderSNUUniversesIntro(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-48 bg-[#0a0614] relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <h2 class="text-6xl md:text-8xl font-black text-white text-center mb-32 uppercase tracking-tightest leading-none">LA TRINIDAD <br><span class="text-[#865BFF]">SINTÉTICA</span></h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-10">
                ${[
                    { id: 'u1', t: 'PROPIOS BM', d: 'Fortune, Vortex, BullX, BearX, FomoX. Desarrollados por Bridge Markets.', color: '#865BFF', icon: 'token' },
                    { id: 'u2', t: 'DERIV SYNC', d: 'Boom, Crash, Volatility, Jump, Step, Range Break. El estándar del mercado.', color: '#3b82f6', icon: 'layers' },
                    { id: 'u3', t: 'WELTRADE FX', d: 'VolFX, SpikeFX, FlipX, PainX/GainX. Volatilidad sobre pares mayores.', color: '#ef4444', icon: 'dynamic_feed' }
                ].map(u => `
                    <div class="relative p-20 rounded-[5rem] border border-white/10 bg-white/5 overflow-hidden group hover:-translate-y-4 transition-all duration-700">
                        <div class="absolute inset-x-0 bottom-0 h-2" style="background-color: ${u.color}"></div>
                        <span class="material-symbols-outlined text-[120px] absolute -right-10 -top-10 opacity-5 group-hover:opacity-20 transition-opacity" style="color: ${u.color}">${u.icon}</span>
                        <div class="relative z-10">
                            <span class="text-[10px] font-black uppercase tracking-[0.8em] mb-12 block" style="color: ${u.color}">UNIVERSO ${u.id.toUpperCase()}</span>
                            <h3 class="text-4xl font-black text-white mb-8 uppercase tracking-tighter leading-none">${u.t}</h3>
                            <p class="text-xl text-white/40 font-medium leading-relaxed">${u.d}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSNUU1BM(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { id: 'FORTUNE', i: 'Fortune 100/250/500...', d: 'Movimiento escalonado step-by-step. Ideal para estructura y rangos.' },
        { id: 'VORTEX', i: 'Vortex 20/40/60/80/100', d: 'Volatilidad constante y predecible. A mayor número, mayor amplitud.' },
        { id: 'BULLX', i: 'BullX 400/777/900...', d: 'Tendencia bajista con spikes alcistas. Momentum e impulso direccional.' },
        { id: 'BEARX', i: 'BearX 400/777/900...', d: 'Tendencia alcista con spikes bajistas. Reversiones y momentum bajista.' },
        { id: 'FOMOX', i: 'FomoX 111/333/888/999', d: 'Tendencia aleatoria espontánea. Ideal para breakout y trend following.' }
    ];

    return `
    <section class="py-48 bg-[#0a0614] relative border-t border-white/5">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
                <div class="max-w-3xl">
                    <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[0.8em] mb-10 block">Universo 01</span>
                    <h2 class="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tightest">ÍNDICES PROPIOS <br><span class="text-[#865BFF]">BRIDGE MARKETS</span></h2>
                </div>
                <div class="px-8 py-3 bg-[#865BFF]/10 border border-[#865BFF]/20 rounded-full">
                    <span class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.5em]">Operados exclusivamente por BM</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                ${families.map(f => `
                    <div class="p-16 bg-white/5 border border-white/10 rounded-[4rem] group hover:bg-[#865BFF]/10 transition-all">
                        <h4 class="text-4xl font-black text-[#865BFF] mb-8 uppercase tracking-widest">${f.id}</h4>
                        <div class="h-1 w-12 bg-white/10 mb-8 group-hover:w-full transition-all duration-700"></div>
                        <p class="text-white font-bold text-xs uppercase tracking-[0.2em] mb-6">${f.i}</p>
                        <p class="text-white/40 text-[11px] uppercase tracking-widest leading-relaxed">${f.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSNUU2Deriv(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { name: 'Boom (Impulso Alcista)', items: [['Boom 1000', 'B 1000 Idx'], ['Boom 500', 'B 500 Idx'], ['Boom 300', 'B 300 Idx']] },
        { name: 'Crash (Impulso Bajista)', items: [['Crash 1000', 'C 1000 Idx'], ['Crash 500', 'C 500 Idx'], ['Crash 300', 'C 300 Idx']] },
        { name: 'Range Break (Rupturas)', items: [['Range Break 100', 'R B100 Idx'], ['Range Break 200', 'R B200 Idx']] },
        { name: 'Volatility (Volatilidad)', items: [['Volatility 75', 'V 75 Idx'], ['Volatility 100', 'V 100 Idx'], ['Volatility 10', 'V 10 Idx']] }
    ];

    return `
    <section class="py-48 bg-[#0a0614] relative border-t border-white/5">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
                <div class="max-w-3xl">
                    <span class="text-[#3b82f6] text-[11px] font-black uppercase tracking-[0.8em] mb-10 block">Universo 02</span>
                    <h2 class="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tightest">MERCADOS <br><span class="text-[#3b82f6]">DERIV</span></h2>
                </div>
                <div class="px-8 py-3 bg-blue-600/10 border border-blue-600/20 rounded-full">
                    <span class="text-[10px] font-black text-[#3b82f6] uppercase tracking-[0.5em]">Equivalencia Directa en MT5</span>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10">
                ${families.map(f => `
                    <div class="bg-white/5 border border-white/5 rounded-[4rem] overflow-hidden">
                        <div class="p-10 bg-blue-600/10 border-b border-white/5">
                            <h4 class="text-xl font-black text-white uppercase tracking-widest leading-none">${f.name}</h4>
                        </div>
                        <div class="p-10">
                            <table class="w-full text-left">
                                <thead>
                                    <tr class="text-[9px] font-black text-white/20 uppercase tracking-[0.4em] border-b border-white/5">
                                        <th class="pb-6">SOURCE DERIV</th>
                                        <th class="pb-6">SYMBOL BRIDGE</th>
                                    </tr>
                                </thead>
                                <tbody class="divide-y divide-white/5">
                                    ${f.items.map(row => `
                                        <tr class="group">
                                            <td class="py-6 text-sm font-bold text-white/50 uppercase tracking-widest group-hover:text-white transition-colors">${row[0]} Index</td>
                                            <td class="py-6 text-sm font-black text-[#3b82f6] uppercase tracking-widest">${row[1]}</td>
                                        </tr>
                                    `).join('')}
                                </tbody>
                            </table>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <p class="mt-20 text-center text-[10px] font-black text-white/20 uppercase tracking-[0.8em]">Más de 50 símbolos de Deriv adicionales disponibles en tu terminal MT5</p>
        </div>
    </section>`;
}

export function renderSNUU3Welt(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { n: 'VolFX', s: 'FX Vol 20 / 40 / 60 / 80 / 99', d: 'Volatilidad calculada sobre pares de Forex.' },
        { n: 'SpikeFX', s: 'SFX Vol 20 / 40 / 60 / 80 / 99', d: 'Picos extremos direccionales sobre FX.' },
        { n: 'FlipX', s: 'FlipStatic / Rand2 / Rand3 / Rand4 / Rand5', d: 'Reversiones aleatorias de alta frecuencia.' },
        { n: 'GainX & PainX', s: 'StepRise400 / StepDrop400 ...', d: 'Movimientos escalonados alcistas y bajistas.' }
    ];

    return `
    <section class="py-48 bg-[#0a0614] relative border-t border-white/5">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="flex flex-col lg:flex-row justify-between items-end gap-12 mb-32">
                <div class="max-w-3xl">
                    <span class="text-[#ef4444] text-[11px] font-black uppercase tracking-[0.8em] mb-10 block">Universo 03</span>
                    <h2 class="text-6xl md:text-8xl font-black text-white leading-[0.85] uppercase tracking-tightest">MERCADOS <br><span class="text-[#ef4444]">WELTRADE</span></h2>
                </div>
                <div class="px-8 py-3 bg-red-600/10 border border-red-600/20 rounded-full">
                    <span class="text-[10px] font-black text-[#ef4444] uppercase tracking-[0.5em]">Exclusividad Vía Bridge Markets</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${families.map(f => `
                    <div class="p-12 bg-white/5 border border-white/5 rounded-[3.5rem] relative overflow-hidden group hover:bg-red-600/5 transition-all">
                        <div class="absolute -right-10 -top-10 w-32 h-32 bg-red-600/5 rounded-full blur-3xl"></div>
                        <h4 class="text-3xl font-black text-white mb-8 uppercase tracking-widest border-b border-red-600/20 pb-6 group-hover:border-red-600 transition-all">${f.n}</h4>
                        <p class="text-red-500 font-black text-[10px] uppercase tracking-widest mb-6">${f.s}</p>
                        <p class="text-white/30 text-xs font-medium leading-relaxed">${f.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSNUWhy(content: Record<string, any>, brand: BrandConfig): string {
    const cards = [
        { t: 'Único Ecosistema', d: 'El único broker donde Deriv, Weltrade y BM coexisten en una sola cuenta.' },
        { t: 'Adiós Multibrokers', d: 'No más cuentas separadas. Centraliza tu operativa sintética con nosotros.' },
        { t: 'Abundancia Total', d: 'Más de 100 instrumentos entre los tres ecosistemas garantizados.' },
        { t: 'Operativa 24/7', d: 'Sin cierres de mercado, sin pausas. Los sintéticos no duermen nunca.' },
        { t: 'Inmune a Noticias', d: 'Generados por algoritmos RNG auditados. Sin distorsiones macro.' },
        { t: 'MT5 Profesional', d: 'Servidor BridgeMarkets-MT5: estabilidad institucional para retail.' }
    ];

    return `
    <section class="py-48 bg-[#0a0614] relative border-t border-white/5">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center">
             <h2 class="text-6xl md:text-8xl font-black text-white mb-32 uppercase tracking-tightest leading-none">LA VENTAJA <br><span class="text-gray-300">COMPETITIVA</span></h2>
             
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                 ${cards.map((c, i) => `
                    <div class="p-16 bg-white/5 border border-white/10 rounded-[5rem] hover:bg-white/10 hover:text-[#0a0614] transition-all duration-700 group">
                        <span class="material-symbols-outlined text-6xl text-[#865BFF] mb-12 group-hover:text-[#0a0614] transition-colors">verified</span>
                        <h3 class="text-4xl font-black mb-8 uppercase tracking-tighter leading-none">${c.t}</h3>
                        <p class="text-white/40 font-medium text-lg leading-relaxed group-hover:text-[#0a0614]/60 transition-colors uppercase tracking-widest text-xs">${c.d}</p>
                    </div>
                 `).join('')}
             </div>
        </div>
    </section>`;
}

export function renderSNUWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = ['Crea tu cuenta', 'Completa KYC', 'Deposita USD', 'Descarga MT5', 'Explora Universos', 'Elige Familia', 'Opera 24/7'];

    return `
    <section class="py-48 bg-[#0a0614] relative overflow-hidden border-y border-white/5">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center">
            <h2 class="text-6xl md:text-8xl font-black text-white mb-32 uppercase tracking-tightest leading-none">CÓMO <br><span class="text-gray-300">ACTIVAR</span></h2>
            
            <div class="flex flex-wrap justify-center gap-6">
                ${steps.map((s, i) => `
                    <div class="p-10 bg-white/5 border border-white/10 rounded-[3rem] min-w-[200px] flex-grow hover:bg-[#865BFF] transition-all transform hover:-translate-y-4 group">
                        <span class="text-6xl font-black text-white/5 absolute -top-5 -left-5 group-hover:visible invisible">${i+1}</span>
                        <div class="relative z-10">
                            <div class="text-[#865BFF] text-3xl font-black mb-6 group-hover:text-white transition-colors">0${i+1}</div>
                            <h4 class="text-sm font-black text-white uppercase tracking-widest">${s}</h4>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSNUCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'snu_community')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';
    const message = brand.heroPhrase || c.welcomeMessage || 'Únete a nuestra comunidad de traders sintéticos.';
    const logoUrl = brand.logoUrl || '/logo.png';

    return `
    <section class="py-48 bg-[#0a0614] text-white section-reveal">
        <div class="max-w-7xl mx-auto px-8">
             <div class="bg-white/5 border border-white/10 rounded-[6rem] p-24 lg:p-40 relative overflow-hidden flex flex-col items-center text-center group">
                <div class="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-[#865BFF] to-transparent"></div>
                
                <div class="w-48 h-48 bg-black border-4 border-[#865BFF]/30 rounded-full overflow-hidden mb-16 shadow-[0_0_50px_rgba(134,91,255,0.3)]">
                    <img src="${logoUrl}" alt="IB" class="w-full h-full object-contain">
                </div>

                <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[1em] mb-12 block">Synthetic Collective</span>
                <h2 class="text-6xl md:text-8xl font-black text-white mb-16 uppercase tracking-tightest leading-none">${ibName}</h2>
                <p class="text-3xl text-white/40 font-light italic leading-relaxed mb-16 max-w-4xl">
                    "${message}"
                </p>
                
                <div class="flex flex-wrap justify-center gap-8">
                    ${brand.telegram ? `<a href="${brand.telegram}" class="px-14 py-7 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-blue-600 transition-all text-xl uppercase tracking-widest">Telegram</a>` : ''}
                    ${brand.whatsapp ? `<a href="https://wa.me/${brand.whatsapp}" class="px-14 py-7 bg-white/5 border border-white/10 text-white font-black rounded-3xl hover:bg-emerald-600 transition-all text-xl uppercase tracking-widest">WhatsApp</a>` : ''}
                </div>
             </div>
        </div>
    </section>`;
}

export function renderSNUFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Cuántos sintéticos hay en total?', a: 'Más de 100 instrumentos integrando Deriv, Weltrade y exclusivos BM.' },
        { q: '¿Están 24/7 los 3 universos?', a: 'Sí. Todos operan los 365 días del año sin cierres de mercado.' },
        { q: '¿Necesito cuenta en Deriv o Weltrade?', a: 'No. Todo está integrado en tu cuenta de Bridge Markets. Un solo login en MT5.' },
        { q: '¿Puedo usar robots (EAs)?', a: 'Sí. Los sintéticos son perfectos para algoritmos por su disponibilidad continua.' }
    ];

    return `
    <section class="py-48 bg-[#0a0614] text-white border-t border-white/5">
        <div class="max-w-4xl mx-auto px-8 section-reveal text-center">
             <h2 class="text-6xl font-black text-white mb-32 uppercase tracking-tightest">FAQ <br><span class="text-white/20">TÉCNICA</span></h2>
             
             <div class="space-y-6 text-left">
                 ${faqs.map(f => `
                    <div class="bg-white/5 border border-white/5 p-12 rounded-[4rem] group hover:bg-[#865BFF]/10 transition-all">
                        <h4 class="text-3xl font-black text-white mb-8 uppercase tracking-tighter flex items-center gap-8">
                             <div class="w-1.5 h-10 bg-[#865BFF] rounded-full"></div> ${f.q}
                        </h4>
                        <p class="text-xl text-white/40 font-medium leading-relaxed pl-10 underline decoration-[#865BFF]/20 underline-offset-8">${f.a}</p>
                    </div>
                 `).join('')}
             </div>
        </div>
    </section>`;
}

export function renderSNUCTA(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'snu_cta')!.defaultContent, ...content };
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="py-64 bg-[#0a0614] relative overflow-hidden section-reveal">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,91,255,0.15),transparent_70%)]"></div>
        <div class="max-w-7xl mx-auto px-8 relative z-10 text-center">
            <h2 class="text-7xl md:text-[12rem] font-black text-white mb-16 uppercase tracking-tightest leading-[0.8] drop-shadow-3xl italic">UN BROKER. <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-[#865BFF] via-white to-[#865BFF]">UNIVERSAL.</span></h2>
            <p class="text-3xl text-white/30 mb-32 font-light uppercase tracking-[0.4em] max-w-5xl mx-auto leading-relaxed">
                Antes necesitabas Deriv. Antes necesitabas Weltrade. <br>
                <span class="text-white font-black">Ahora solo necesitas Bridge Markets.</span>
            </p>
            
            <div class="flex flex-wrap justify-center gap-12">
                <a href="${ctaLink}" class="px-24 py-10 bg-[#865BFF] text-white font-black rounded-full hover:shadow-[0_45px_100px_rgba(134,91,255,0.4)] hover:scale-110 transition-all uppercase text-2xl tracking-tighter shadow-3xl">${c.ctaPrimary}</a>
                <a href="https://charts.bridgemarkets.global" class="px-24 py-10 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/10 hover:text-black transition-all uppercase text-2xl tracking-tighter backdrop-blur-md">${c.ctaSecondary}</a>
            </div>

            <div class="mt-40">
                 <p class="text-[10px] text-white/20 uppercase font-black tracking-[1em]">${brand.fullName || 'Bridge Markets'} — Risk Disclaimer Applied.</p>
            </div>
        </div>
    </section>`;
}

export function renderSNUFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || brand.ibName || 'IB Sintéticos';
    const year = new Date().getFullYear();

    return `
    <footer class="py-48 bg-[#0a0614] text-white border-t border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-40 mb-40 section-reveal">
                <div class="col-span-1 lg:col-span-1 text-center lg:text-left">
                    <img src="/logo.png" alt="BM" class="h-10 mb-16 mx-auto lg:mx-0">
                    <div class="p-10 border border-white/10 rounded-[3rem] bg-white/5">
                        <span class="block text-[9px] font-black text-white/30 uppercase tracking-[0.6em] mb-4">Presented By</span>
                        <span class="text-2xl font-black text-white uppercase tracking-tighter">${ibName}</span>
                    </div>
                </div>

                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-[0.8em] mb-12 text-white/30">Productos</h4>
                    <ul class="space-y-8 text-xs font-black uppercase tracking-widest text-white/60">
                        <li>Índices Sintéticos</li>
                        <li>PropFirm Pro</li>
                        <li>Leverage X12</li>
                        <li>MAM/Copy Trading</li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-[0.8em] mb-12 text-white/30">Recursos</h4>
                    <ul class="space-y-8 text-xs font-black uppercase tracking-widest text-white/60">
                        <li><a href="https://charts.bridgemarkets.global" class="hover:text-[#865BFF]">Gráficos Live</a></li>
                        <li><a href="#" class="hover:text-[#865BFF]">Documentos</a></li>
                        <li><a href="#" class="hover:text-[#865BFF]">Portal Cliente</a></li>
                        <li><a href="#" class="hover:text-[#865BFF]">Soporte IB</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-[0.8em] mb-12 text-white/30">Contacto</h4>
                    <ul class="space-y-8 text-xs font-black uppercase tracking-widest text-white/40">
                        <li>corporate@bridgemarkets.global</li>
                        <li>@bridgemarketsbroker</li>
                        <li>UK & Marshall Islands</li>
                    </ul>
                </div>
            </div>

            <div class="pt-24 border-t border-white/5 text-center">
                <p class="text-[11px] font-black text-white/20 uppercase tracking-[0.4em] mb-20 leading-loose max-w-5xl mx-auto">
                    Advertencia: El trading conlleva riesgo para su capital. Bridge Markets LTD no garantiza rentabilidades. © ${year} BridgeMarkets All Rights Reserved.
                </p>
                <div class="text-[10px] font-black text-white/10 uppercase tracking-[2em]">SYNTHETIC UNIVERSE</div>
            </div>
        </div>
    </footer>`;
}
