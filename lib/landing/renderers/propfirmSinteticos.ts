import { BrandConfig } from '../types';

/**
 * Propfirm Sintéticos: Premium Renderers
 * Basado en el diseño Cyber Purple / Deep Space de Bridge Markets
 */

export function renderPSHero(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "SYNTHETIC";
    const highlight = content.highlight || "NEXUS";
    const subtitle = content.subtitle || brand.heroPhrase || "Ecosistema Algorítmico de Grado Institucional.";
    const ctaText = content.ctaText || "Deploy Now";
    const ctaLink = brand.ctaLink || "#register";

    return `
    <section class="relative min-h-[110vh] flex items-center pt-32 pb-48 px-8 overflow-hidden bg-[#0a0614]">
        <!-- Fondo Tecnológico Avanzado -->
        <div class="absolute inset-0 z-0">
            <!-- Grid de fondo dinámico -->
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: linear-gradient(rgba(134,91,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(134,91,255,0.1) 1px, transparent 1px); background-size: 80px 80px;"></div>
            
            <!-- Tipografía de Fondo Desfasada -->
            <div class="absolute top-1/2 left-0 -translate-y-1/2 w-full opacity-[0.02] flex flex-col gap-0 select-none pointer-events-none italic font-black text-[25vw] leading-[0.7] uppercase tracking-tightest">
                <span>ALGO</span>
                <span class="ml-[20%]">CORE</span>
            </div>

            <!-- Mancha de luz central -->
            <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[1000px] h-[1000px] bg-[#865BFF]/5 rounded-full blur-[200px]"></div>
        </div>

        <div class="max-w-[1600px] mx-auto w-full relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-32">
                
                <!-- Columna: Tech Info -->
                <div class="lg:w-7/12 section-reveal">
                    <div class="inline-flex items-center gap-4 px-6 py-2 bg-white/5 border border-white/10 rounded-none mb-16 group hover:border-[#865BFF] transition-all">
                        <span class="w-2 h-2 bg-[#865BFF] animate-force-pulse"></span>
                        <span class="text-[10px] font-black text-white/50 uppercase tracking-[0.5em] group-hover:text-white transition-colors italic">High-Frequency Environment</span>
                    </div>

                    <h1 class="text-7xl md:text-[11rem] lg:text-[14rem] font-black leading-[0.75] text-white mb-16 tracking-tightest uppercase italic">
                        ${title} <br>
                        <span class="text-[#865BFF] drop-shadow-[0_0_50px_rgba(134,91,255,0.4)] italic">${highlight}</span>
                    </h1>

                    <div class="flex flex-col md:flex-row gap-16 items-start md:items-center">
                        <div class="max-w-md">
                            <p class="text-xl md:text-2xl text-white/30 leading-relaxed font-light uppercase tracking-tighter mb-0">
                                ${subtitle}
                            </p>
                        </div>
                        
                        <div class="flex gap-10 items-center">
                            <a href="${ctaLink}" class="group relative px-16 py-8 bg-[#865BFF] text-white font-black overflow-hidden hover:scale-105 transition-all duration-500 shadow-[0_0_40px_rgba(134,91,255,0.3)]">
                                <div class="absolute inset-0 bg-white/20 -translate-x-full group-hover:translate-x-0 transition-transform duration-500"></div>
                                <span class="relative z-10 uppercase tracking-[0.4em] text-xs">${ctaText}</span>
                            </a>
                        </div>
                    </div>

                    <!-- Tech HUD Elements -->
                    <div class="mt-24 grid grid-cols-3 gap-12 max-w-2xl opacity-40">
                        ${['LTC_SYNC: ACTIVE', 'BUF_OVERFLOW: CLEAR', 'EXEC_PRIORITY: MAX'].map(txt => `
                            <div class="flex flex-col gap-3">
                                <div class="h-[1px] w-full bg-white/20 relative overflow-hidden">
                                    <div class="absolute inset-0 bg-[#865BFF] animate-scan-line"></div>
                                </div>
                                <span class="text-[8px] font-black text-white/50 tracking-[0.2em] italic">${txt}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Columna: Visual Nexus -->
                <div class="lg:w-5/12 relative section-reveal">
                    <div class="relative w-full aspect-square flex items-center justify-center">
                        
                        <!-- Main 3D Asset (Caballo Rosa) -->
                        <div class="relative z-10 w-full h-full transform scale-125 lg:scale-150">
                            <img src="/images/imagenes%20nuevas/caballo%20rosa.png" alt="Synthetic Nexus" class="w-full h-full object-contain filter drop-shadow-[0_0_100px_rgba(134,91,255,0.3)] animate-float-rotate">
                        </div>

                        <!-- Technical HUD Overlays -->
                        <div class="absolute -top-10 -right-10 z-20 p-12 bg-white/[0.02] backdrop-blur-3xl border border-white/10 rounded-[4rem] hidden xl:block animate-gentle-float shadow-2xl">
                            <div class="text-[9px] font-black text-[#865BFF] uppercase tracking-[0.5em] mb-4">Core Algorithm</div>
                            <div class="text-5xl font-black text-white italic tracking-tightest leading-none">V.8.0</div>
                            <div class="mt-6 flex gap-1">
                                ${[1,2,3,4,5,6,7].map(i => `<div class="w-1 h-4 bg-[#865BFF] animate-pulse" style="animation-delay: ${i*0.1}s"></div>`).join('')}
                            </div>
                        </div>

                    </div>
                </div>

            </div>
        </div>

        <style>
            @keyframes float-rotate {
                0%, 100% { transform: translateY(0) rotate(0deg) scale(1.3); }
                50% { transform: translateY(-40px) rotate(3deg) scale(1.35); }
            }
            @keyframes scan-line {
                0% { transform: translateX(-100%); }
                100% { transform: translateX(100%); }
            }
            @keyframes force-pulse {
                0%, 100% { opacity: 1; transform: scale(1); }
                50% { opacity: 0.3; transform: scale(1.5); }
            }
            .animate-float-rotate { animation: float-rotate 12s ease-in-out infinite; }
            .animate-scan-line { animation: scan-line 3s linear infinite; }
            .animate-force-pulse { animation: force-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite; }
        </style>
    </section>
    `;
}

export function renderPSBanner(content: Record<string, any>, brand: BrandConfig): string {
    const items = content.items || ['Ejecución Instantánea', 'Spread 0.0', 'Soporte 24/7', 'Retiros cada 14 días'];
    
    return `
    <div class="bg-white py-10 relative z-20 overflow-hidden">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-4">
                ${items.map((item: string, i: number) => `
                    <div class="flex items-center gap-4 group">
                        <span class="text-[9px] font-black text-black uppercase tracking-[0.6em] group-hover:text-[#865BFF] transition-colors italic">${item}</span>
                        ${i < items.length - 1 ? '<div class="w-1.5 h-1.5 bg-[#865BFF] rotate-45"></div>' : ''}
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

export function renderPSFeatures(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "OPERATIVE EXCELLENCE";
    const features = content.features || [
        { icon: 'bolt', title: 'HYPER-SPEED', desc: 'Direct connectivity with low-latency servers globally.' },
        { icon: 'security', title: 'INSTITUTIONAL SAFETY', desc: 'Segregated funds and negative balance protection for all tiers.' },
        { icon: 'analytics', title: 'CORE ANALYTICS', desc: 'Advanced dashboard to monitor your operational efficiency.' }
    ];

    return `
    <section class="py-64 px-6 bg-[#0a0515] relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,rgba(134,91,255,0.05),transparent_70%)]"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex flex-col lg:flex-row items-end justify-between mb-40 gap-12 section-reveal">
                <div class="lg:w-7/12">
                    <span class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.8em] mb-10 block italic">The Architecture of Power</span>
                    <h2 class="text-7xl md:text-9xl font-black text-white uppercase tracking-tightest leading-[0.8] italic">${title}</h2>
                </div>
                <div class="lg:w-4/12 border-t-4 border-white/5 pt-12">
                    <p class="text-white/30 text-lg uppercase font-black italic tracking-tighter leading-tight">We don't just provide capital, we provide the infrastructure for legends.</p>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-1">
                ${features.map((f: any, i: number) => `
                    <div class="section-reveal group p-16 bg-white/[0.02] border border-white/5 hover:bg-white transition-all duration-700 flex flex-col justify-between h-[500px]">
                        <div class="text-7xl font-black text-white/5 group-hover:text-black/5 transition-colors italic">0${i+1}</div>
                        <div>
                            <div class="w-16 h-[2px] bg-[#865BFF] mb-12 group-hover:w-full transition-all duration-700"></div>
                            <h3 class="text-4xl font-black text-white mb-8 uppercase tracking-tighter italic group-hover:text-black transition-colors">${f.title}</h3>
                            <p class="text-white/30 font-light text-xl leading-relaxed group-hover:text-black/60 transition-colors">${f.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderPSMatrix(content: Record<string, any>, brand: BrandConfig): string {
    const plans = content.plans || [
        { size: '$5,000', price: '$49' },
        { size: '$10,000', price: '$89' },
        { size: '$25,000', price: '$189' },
        { size: '$50,000', price: '$329' },
        { size: '$100,000', price: '$549' }
    ];
    const ctaLink = brand.ctaLink || "#register";

    return `
    <section class="py-64 px-6 bg-[#05010f] relative overflow-hidden">
        <!-- Background Asset Subtle -->
        <img src="/images/imagenes%20nuevas/reyna%20rosa.png" class="absolute bottom-0 right-0 w-[40%] opacity-[0.02] grayscale pointer-events-none" alt="BG">
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center mb-40 section-reveal">
                <h2 class="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tightest leading-[0.8] italic mb-12">
                    SELECT YOUR <br> <span class="text-[#865BFF]">TIER.</span>
                </h2>
                <div class="flex items-center justify-center gap-6">
                    <div class="h-px w-20 bg-white/10"></div>
                    <p class="text-white/30 font-black text-[10px] uppercase tracking-[0.5em] italic">Institutional Grade Capital</p>
                    <div class="h-px w-20 bg-white/10"></div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-1">
                ${plans.map((p: any, i: number) => `
                    <div class="section-reveal group p-12 bg-white/[0.02] border border-white/5 hover:bg-[#865BFF] transition-all duration-700 flex flex-col justify-between items-center text-center h-[550px] relative overflow-hidden">
                        <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                        <div class="relative z-10 w-full">
                            <p class="text-[9px] font-black text-[#865BFF] uppercase tracking-[0.6em] mb-12 group-hover:text-white italic">Level 0${i+1}</p>
                            <h3 class="text-5xl font-black text-white mb-1 group-hover:scale-110 transition-transform italic">${p.size}</h3>
                            <div class="w-10 h-1 bg-white/10 mx-auto mt-6 group-hover:bg-white/40"></div>
                        </div>
                        
                        <div class="relative z-10 w-full">
                            <div class="mb-12">
                                <p class="text-[9px] font-black text-white/20 uppercase tracking-widest mb-2 group-hover:text-white/40 italic">Entry Fee</p>
                                <p class="text-6xl font-black text-white group-hover:text-black transition-colors italic">${p.price}</p>
                            </div>

                            <a href="${ctaLink}" class="block w-full py-6 bg-white text-black font-black text-[10px] uppercase tracking-[0.4em] hover:bg-black hover:text-white transition-all italic">
                                SECURE CAPITAL
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}


export function renderPSCalculator(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "Calcula tus ganancias";
    const note = content.note || "Basado en un target conservador de 4% mensual.";

    return `
    <section class="py-40 px-6 bg-[#0C0027] relative overflow-hidden">
        <div class="max-w-6xl mx-auto section-reveal">
            <div class="bg-gradient-to-br from-[#140633] to-[#0C0027] p-12 md:p-24 rounded-[5rem] border border-white/5 shadow-[0_50px_100px_rgba(0,0,0,0.5)] relative overflow-hidden">
                <div class="absolute top-0 right-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
                
                <h2 class="text-5xl md:text-[6rem] font-black text-center text-white mb-24 tracking-tighter uppercase italic leading-none">${title}</h2>
                
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center relative z-10">
                    <div class="space-y-12">
                        <div>
                            <label class="text-[11px] font-black uppercase tracking-[0.6em] text-[#865BFF] mb-8 block">Configura tu Reto</label>
                            <div class="grid grid-cols-3 gap-6">
                                ${['5K', '10K', '25K', '50K', '100K'].map(size => `
                                    <button onclick="updatePSCalc('${size}')" class="calc-btn-${size} py-6 bg-white/5 border border-white/10 rounded-2xl font-black text-lg text-white hover:bg-white hover:text-black transition-all shadow-xl">
                                        ${size}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="p-10 bg-[#865BFF]/5 border border-[#865BFF]/20 rounded-[2.5rem] backdrop-blur-xl">
                            <p class="text-lg font-medium text-[#B086FF] italic leading-relaxed">"${note}"</p>
                        </div>
                    </div>

                    <div class="p-16 bg-white rounded-[4rem] text-center shadow-[0_30px_60px_rgba(134,91,255,0.3)] relative group transform hover:-rotate-1 transition-transform">
                        <div class="absolute -top-8 -left-8 w-20 h-20 bg-[#865BFF] rounded-3xl flex items-center justify-center shadow-2xl animate-bounce">
                            <span class="material-symbols-outlined text-white text-3xl">trending_up</span>
                        </div>
                        <p class="text-[12px] font-black text-[#0C0027] uppercase tracking-[0.5em] mb-6 opacity-60">Proyección de Cuenta</p>
                        <p id="ps-calc-size" class="text-5xl font-black text-[#865BFF] mb-10 tracking-tighter">$100,000</p>
                        <div class="h-px w-24 bg-slate-100 mx-auto mb-10"></div>
                        <p class="text-[12px] font-black text-slate-400 uppercase tracking-[0.5em] mb-6">Profit Potencial Neto</p>
                        <p id="ps-calc-result" class="text-8xl font-black text-[#0C0027] tracking-tighter drop-shadow-sm">$4,000</p>
                        <p class="text-[10px] font-bold text-slate-300 uppercase mt-8 tracking-widest">Transferencia Instantánea</p>
                    </div>
                </div>
            </div>
        </div>

        <script>
            function updatePSCalc(size) {
                const val = parseInt(size.replace('K','')) * 1000;
                const profit = val * 0.04;
                document.getElementById('ps-calc-size').innerText = '$' + val.toLocaleString();
                document.getElementById('ps-calc-result').innerText = '$' + profit.toLocaleString();
                
                const el = document.getElementById('ps-calc-result');
                el.classList.add('scale-110', 'text-[#865BFF]');
                setTimeout(() => el.classList.remove('scale-110', 'text-[#865BFF]'), 300);
            }
            setTimeout(() => updatePSCalc('100K'), 500);
        </script>
    </section>`;
}

export function renderPSRules(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "Protocolos Operativos";
    const rules = content.rules || [
        { title: 'Drawdown Diario', value: '5%' },
        { title: 'Drawdown Total', value: '10%' },
        { title: 'Objetivo Fase 1', value: '8%' },
        { title: 'Objetivo Fase 2', value: '5%' }
    ];

    return `
    <section class="py-40 px-6 bg-[#0C0027] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div class="section-reveal">
                    <span class="text-[11px] font-black text-[#865BFF] uppercase tracking-[0.6em] mb-8 block">ESTÁNDARES GLOBALES</span>
                    <h2 class="text-6xl md:text-[7rem] font-black text-white uppercase tracking-tighter mb-12 leading-[0.9]">
                        REGLAS <br> <span class="text-[#865BFF]">PRECISAS</span>
                    </h2>
                    <p class="text-2xl text-white/40 font-light leading-relaxed mb-16 max-w-xl">
                        Nuestros protocolos están diseñados para filtrar a los mejores traders del mundo mediante métricas objetivas y transparentes.
                    </p>
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-8">
                        ${['No Time Limits', 'Hedges Allowed', 'EA Trading Ready', 'News Trading OK'].map(item => `
                            <div class="flex items-center gap-5 p-5 bg-white/5 border border-white/5 rounded-2xl">
                                <span class="material-symbols-outlined text-[#865BFF] text-3xl">check_circle</span>
                                <span class="text-[12px] font-black text-white uppercase tracking-widest">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 section-reveal">
                    ${rules.map((r: any, i: number) => `
                        <div class="p-12 bg-gradient-to-br from-white/5 to-transparent border border-white/10 rounded-[3rem] hover:border-[#865BFF] transition-all duration-500 group relative overflow-hidden">
                            <div class="absolute inset-0 bg-[#865BFF]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            <p class="text-[11px] font-black text-white/30 uppercase tracking-[0.4em] mb-6 group-hover:text-[#865BFF] transition-colors relative z-10">${r.title}</p>
                            <p class="text-6xl font-black text-white tracking-tighter relative z-10">${r.value}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>`;
}

export function renderPSContact(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "CONTÁCTANOS";
    const subtitle = content.subtitle || "¿Tienes dudas? Nuestro equipo está listo para ayudarte.";
    const partnerId = brand.partnerId;

    return `
    <section class="py-40 px-6 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-32 section-reveal">
                <h1 class="text-9xl md:text-[18rem] font-black text-[#0C0027]/[0.02] uppercase tracking-tighter absolute top-0 left-0 w-full select-none -z-0">SOPORTE</h1>
                <h2 class="text-6xl md:text-[8rem] font-black text-[#0C0027] relative z-10 uppercase tracking-tighter italic leading-none mb-10">
                    ${title}
                </h2>
                <p class="text-2xl text-[#0C0027]/50 font-light max-w-2xl mx-auto leading-relaxed relative z-10">
                    ${subtitle}
                </p>
            </div>

            <div class="max-w-5xl mx-auto bg-white p-16 md:p-24 rounded-[5rem] shadow-[0_60px_120px_-20px_rgba(0,0,0,0.15)] relative z-10 border border-slate-100">
                <form id="contact-form" class="grid grid-cols-1 md:grid-cols-2 gap-12">
                    <input type="hidden" name="partner_id" value="${partnerId}">
                    <div class="space-y-6">
                        <label class="text-[12px] font-black text-[#0C0027] uppercase tracking-[0.5em] opacity-40">Tu Nombre</label>
                        <input type="text" placeholder="John Doe" class="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl font-bold text-lg focus:border-[#865BFF] focus:bg-white outline-none transition-all">
                    </div>
                    <div class="space-y-6">
                        <label class="text-[12px] font-black text-[#0C0027] uppercase tracking-[0.5em] opacity-40">Email Corporativo</label>
                        <input type="email" placeholder="john@company.com" class="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl font-bold text-lg focus:border-[#865BFF] focus:bg-white outline-none transition-all">
                    </div>
                    <div class="md:col-span-2 space-y-6">
                        <label class="text-[12px] font-black text-[#0C0027] uppercase tracking-[0.5em] opacity-40">Consulta Detallada</label>
                        <textarea placeholder="Cuéntanos más sobre tu operativa..." rows="5" class="w-full px-8 py-6 bg-slate-50 border-2 border-transparent rounded-3xl font-bold text-lg focus:border-[#865BFF] focus:bg-white outline-none transition-all"></textarea>
                    </div>
                    <div class="md:col-span-2 pt-10">
                        <button type="submit" class="w-full py-8 bg-[#0C0027] text-white font-black rounded-[2.5rem] text-2xl uppercase tracking-[0.2em] hover:bg-[#865BFF] shadow-2xl hover:-translate-y-2 transition-all duration-500">
                            Enviar Solicitud
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </section>`;
}

export function renderPSFooter(content: Record<string, any>, brand: BrandConfig): string {
    const year = new Date().getFullYear();
    const disclaimer = content.disclaimer || "El trading de derivados financieros e índices sintéticos conlleva un riesgo significativo de pérdida y no es adecuado para todos los inversores.";
    
    return `
    <footer class="py-40 bg-[#09001D] text-white px-6 border-t border-white/5 relative z-10 overflow-hidden">
        <div class="absolute bottom-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-[#865BFF]/5 rounded-full blur-[150px] -mb-96"></div>
        
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-24 mb-40 relative z-10">
            <div class="md:col-span-7">
                <img src="/logo.png" alt="Bridge Markets" class="h-12 mb-16 brightness-[10]">
                <p class="text-[12px] text-white/30 max-w-xl leading-relaxed uppercase tracking-[0.25em] font-bold">
                    ${disclaimer}
                </p>
                <div class="mt-16 flex gap-10">
                    <div class="flex flex-col gap-2">
                        <span class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em]">Broker Oficial</span>
                        <span class="text-sm font-bold text-white/60">Bridge Markets Ltd.</span>
                    </div>
                    <div class="flex flex-col gap-2">
                        <span class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em]">Regulación</span>
                        <span class="text-sm font-bold text-white/60">Comoros Finance Authority</span>
                    </div>
                </div>
            </div>
            <div class="md:col-span-4 md:col-start-9">
                <h4 class="text-[12px] font-black text-white uppercase tracking-[0.6em] mb-12">NAVEGACIÓN</h4>
                <ul class="space-y-8">
                    <li><a href="#" class="text-[12px] font-black text-white/40 hover:text-[#865BFF] uppercase tracking-widest transition-colors">Client Portal</a></li>
                    <li><a href="#" class="text-[12px] font-black text-white/40 hover:text-[#865BFF] uppercase tracking-widest transition-colors">Risk Disclosure</a></li>
                    <li><a href="#" class="text-[12px] font-black text-white/40 hover:text-[#865BFF] uppercase tracking-widest transition-colors">Terms of Service</a></li>
                    <li><a href="#" class="text-[12px] font-black text-white/40 hover:text-[#865BFF] uppercase tracking-widest transition-colors">Official Registry</a></li>
                </ul>
            </div>
        </div>

        <div class="max-w-7xl mx-auto pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-12 relative z-10">
            <div class="flex items-center gap-6">
                <div class="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/20">
                    <span class="material-symbols-outlined text-2xl">security</span>
                </div>
                <p class="text-[11px] font-black text-white/20 uppercase tracking-[0.6em] leading-loose">
                    © ${year} BRIDGE MARKETS LTD. <br> THE GLOBAL STANDARD IN PROPFIRM TRADING.
                </p>
            </div>
            
            <div class="flex items-center gap-4 px-6 py-3 bg-[#865BFF]/10 rounded-full border border-[#865BFF]/20">
                <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em]">SYSTEMS OPERATIONAL</span>
            </div>
        </div>
    </footer>`;
}
