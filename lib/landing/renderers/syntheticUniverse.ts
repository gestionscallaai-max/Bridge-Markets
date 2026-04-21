import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderSNUHero(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "UNIVERSAL";
    const highlight = content.highlight || "GATEWAY";
    const subtitle = content.subtitle || brand.heroPhrase || "Acceso ilimitado a los mercados globales con tecnología de próxima generación.";
    const ctaText = content.ctaText || "Enter Gateway";
    const ctaLink = brand.ctaLink || "#register";
    const ibName = brand.communityName || brand.fullName || "IB Oficial";

    return `
    <section class="relative min-h-screen flex items-center pt-32 pb-48 px-8 overflow-hidden bg-[#05010f]">
        <!-- Fondo Arquitectónico Universal -->
        <div class="absolute inset-0 z-0">
            <!-- Texto Vertical Gigante -->
            <div class="absolute top-0 right-10 h-full flex items-center opacity-[0.03] select-none pointer-events-none">
                <span class="text-[25vh] font-black text-white uppercase tracking-tightest leading-none rotate-90 origin-center whitespace-nowrap">UNIVERSE</span>
            </div>
            
            <!-- Gradiente de profundidad -->
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_70%_50%,rgba(134,91,255,0.1),transparent_60%)]"></div>
        </div>

        <div class="max-w-[1600px] mx-auto w-full relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-24 items-center">
                
                <!-- Columna: Gateway Info -->
                <div class="lg:col-span-7 section-reveal order-2 lg:order-1">
                    <div class="mb-16">
                        <div class="w-20 h-1 bg-[#865BFF] mb-12"></div>
                        <h1 class="text-7xl md:text-[11rem] lg:text-[15rem] font-black leading-[0.8] text-white mb-16 tracking-tightest uppercase italic">
                            ${title} <br>
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#865BFF] to-white/20 italic">${highlight}</span>
                        </h1>
                    </div>

                    <div class="flex flex-col md:flex-row gap-16 items-start md:items-end">
                        <div class="max-w-md border-l border-white/10 pl-12">
                            <p class="text-2xl text-white/30 leading-relaxed font-light uppercase tracking-tighter italic">
                                ${subtitle}
                            </p>
                        </div>
                        
                        <a href="${ctaLink}" class="group relative px-20 py-10 bg-white text-black font-black overflow-hidden hover:bg-[#865BFF] hover:text-white transition-all duration-700 shadow-2xl">
                            <span class="relative z-10 uppercase tracking-[0.5em] text-xs">${ctaText}</span>
                        </a>
                    </div>
                </div>

                <!-- Visual -->
                <div class="lg:w-6/12 relative section-reveal">
                    <div class="relative w-full aspect-square flex items-center justify-center">
                        
                        <!-- Main Asset -->
                        <div class="relative z-10 w-full h-full flex items-center justify-center transform lg:translate-x-10">
                            <img src="/images/imagenes%20nuevas/reyna%20negra.png" alt="Universal Queen" class="w-full h-full object-contain filter drop-shadow-[0_0_100px_rgba(134,91,255,0.2)] animate-float-slow">
                        </div>

                        <!-- Data Card -->
                        <div class="absolute bottom-0 -right-4 lg:-right-10 z-20 p-10 bg-white/[0.03] backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl min-w-[320px]">
                            <div class="flex items-center gap-6 mb-8">
                                <div class="w-14 h-14 rounded-2xl bg-black border border-white/10 flex items-center justify-center overflow-hidden">
                                    <img src="${brand.logoUrl || '/logo.png'}" alt="IB" class="w-full h-full object-contain p-2" onerror="this.src='/logo.png'">
                                </div>
                                <div>
                                    <p class="text-[9px] font-black uppercase tracking-[0.4em] text-[#865BFF] mb-1">Project Leader</p>
                                    <p class="text-xl font-black text-white uppercase tracking-tighter">${ibName}</p>
                                </div>
                            </div>
                            <div class="space-y-4">
                                <div class="flex justify-between items-center text-[9px] font-black uppercase tracking-widest text-white/30">
                                    <span>Sync Accuracy</span>
                                    <span class="text-white">99.9%</span>
                                </div>
                                <div class="h-1 w-full bg-white/5 rounded-full overflow-hidden">
                                    <div class="h-full w-[99.9%] bg-gradient-to-r from-[#865BFF] to-white shadow-[0_0_10px_rgba(134,91,255,0.5)]"></div>
                                </div>
                            </div>
                        </div>

                        <!-- Background Halo -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-[#865BFF]/10 to-transparent rounded-full blur-[120px] opacity-30"></div>
                    </div>
                </div>

            </div>
        </div>

        <style>
            @keyframes float-slow {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-20px) scale(1.02); }
            }
            .animate-float-slow {
                animation: float-slow 10s ease-in-out infinite;
            }
        </style>
    </section>
    `;
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
