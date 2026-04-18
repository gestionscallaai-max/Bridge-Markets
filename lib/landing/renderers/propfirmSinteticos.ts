import { BrandConfig } from '../types';

/**
 * Propfirm Sintéticos: Premium Renderers
 * Basado en el diseño Cyber Purple / Deep Space de Bridge Markets
 */

export function renderPSHero(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "POTENCIALIZA";
    const highlight = content.highlight || "TU TRADING";
    const subtitle = content.subtitle || brand.heroPhrase || "Opera con capital institucional en el mercado más dinámico del mundo.";
    const ctaText = content.ctaText || "Empieza Ahora";
    const ctaLink = brand.ctaLink || "#register";
    const badgeText = content.badgeText || "EL MEJOR CHALLENGE DEL MERCADO";

    return `
    <section class="relative min-h-screen flex items-center pt-24 pb-32 px-6 overflow-hidden bg-[#0C0027]">
        <!-- Fondo Dinámico Premium -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-[-20%] right-[-10%] w-[1000px] h-[1000px] bg-[#865BFF]/10 rounded-full blur-[150px] opacity-80"></div>
            <div class="absolute bottom-[-20%] left-[-10%] w-[800px] h-[800px] bg-[#B086FF]/5 rounded-full blur-[120px] opacity-50"></div>
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <!-- Columna Izquierda: Textos Impactantes -->
                <div class="lg:col-span-7 section-reveal">
                    <div class="inline-flex items-center gap-3 px-5 py-2.5 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-full mb-12 shadow-2xl">
                        <span class="w-2.5 h-2.5 rounded-full bg-[#865BFF] animate-ping"></span>
                        <span class="text-[11px] font-black text-white uppercase tracking-[0.4em]">${badgeText}</span>
                    </div>

                    <h1 class="text-7xl md:text-9xl lg:text-[9.5rem] font-black leading-[0.82] text-white mb-10 tracking-tighter uppercase font-headline">
                        ${title} <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#865BFF] via-[#B086FF] to-white">${highlight}</span>
                    </h1>

                    <p class="text-xl md:text-2xl text-white/50 leading-relaxed max-w-2xl mb-14 font-light">
                        ${subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-8">
                        <a href="${ctaLink}" class="group relative px-12 py-6 bg-[#865BFF] text-white font-black rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(134,91,255,0.4)] hover:shadow-[0_0_80px_rgba(134,91,255,0.6)] transition-all transform hover:-translate-y-1.5 flex items-center justify-center gap-4">
                            <span class="relative z-10 text-xl uppercase tracking-[0.1em]">${ctaText}</span>
                            <span class="material-symbols-outlined relative z-10 group-hover:translate-x-2 transition-transform text-2xl">rocket_launch</span>
                        </a>
                        
                        <div class="flex items-center gap-6 px-8 py-5 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-2xl shadow-2xl">
                           <div class="flex -space-x-4">
                                ${[1, 2, 3, 4].map(i => `<div class="w-10 h-10 rounded-full border-2 border-[#0C0027] overflow-hidden"><img src="https://i.pravatar.cc/100?u=${i+10}" alt="trader"></div>`).join('')}
                           </div>
                           <p class="text-[11px] font-bold text-white/40 uppercase tracking-[0.2em] leading-tight">
                               <span class="text-white text-lg font-black block mb-0.5">+2.5k Traders</span> Operando hoy
                           </p>
                        </div>
                    </div>
                </div>

                <!-- Columna Derecha: 3D Visual Asset -->
                <div class="lg:col-span-5 relative lg:block hidden section-reveal">
                    <div class="relative group">
                        <div class="absolute -inset-10 bg-[#865BFF]/20 rounded-full blur-[100px] group-hover:bg-[#865BFF]/30 transition-all duration-1000"></div>
                        
                        <!-- Visualización de la imagen generada -->
                        <div class="relative z-10 rounded-[4rem] overflow-hidden border border-white/10 shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] transform rotate-2 group-hover:rotate-0 transition-all duration-1000 aspect-[4/5] bg-black">
                            <img src="/propfirm_sinteticos_hero_3d.png" alt="Bridge Markets Premium" class="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-1000 opacity-90">
                            
                            <div class="absolute inset-0 bg-gradient-to-t from-[#0C0027] via-transparent to-transparent"></div>
                            
                            <!-- Overlay Card -->
                            <div class="absolute bottom-10 left-10 right-10 p-8 bg-white/5 backdrop-blur-2xl rounded-3xl border border-white/10 shadow-2xl">
                                <div class="flex justify-between items-start mb-6">
                                    <div>
                                        <p class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em] mb-2">BM Capital Allocated</p>
                                        <p class="text-4xl font-black text-white tracking-tighter">$10,450,000</p>
                                    </div>
                                    <div class="px-4 py-2 bg-[#865BFF]/20 rounded-xl border border-[#865BFF]/30">
                                        <span class="material-symbols-outlined text-white">verified</span>
                                    </div>
                                </div>
                                <div class="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
                                    <div class="w-[75%] h-full bg-[#865BFF] shadow-[0_0_10px_#865BFF]"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </section>`;
}

export function renderPSBanner(content: Record<string, any>, brand: BrandConfig): string {
    const items = content.items || ['Ejecución Instantánea', 'Spread 0.0', 'Soporte 24/7', 'Retiros cada 14 días'];
    
    return `
    <div class="bg-[#0C0027] py-12 border-y border-white/5 relative z-20">
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-center md:justify-between items-center gap-12 md:gap-4">
                ${items.map((item: string, i: number) => `
                    <div class="flex items-center gap-5 group">
                        <div class="w-2 h-2 rounded-full bg-[#865BFF] shadow-[0_0_15px_#865BFF] animate-pulse"></div>
                        <span class="text-[12px] font-black text-white/40 uppercase tracking-[0.5em] group-hover:text-white group-hover:tracking-[0.6em] transition-all duration-300">${item}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </div>`;
}

export function renderPSFeatures(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "¿Por qué elegir nuestro reto?";
    const features = content.features || [
        { icon: 'bolt', title: 'Velocidad', desc: 'Conectividad directa con los servidores de baja latencia.' },
        { icon: 'security', title: 'Seguridad', desc: 'Fondos segregados y protección contra saldo negativo.' },
        { icon: 'analytics', title: 'Analítica', desc: 'Dashboard avanzado para monitorear tu operativa.' }
    ];

    return `
    <section class="py-40 px-6 bg-[#0C0027] relative overflow-hidden">
        <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-px bg-gradient-to-r from-transparent via-[#865BFF]/50 to-transparent"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center mb-32 section-reveal">
                <span class="text-[11px] font-black text-[#865BFF] uppercase tracking-[0.6em] mb-6 block italic">EXCELENCIA OPERATIVA</span>
                <h2 class="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none">${title}</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${features.map((f: any, i: number) => `
                    <div class="section-reveal group relative p-12 bg-white/5 border border-white/5 rounded-[3rem] hover:bg-white/10 hover:border-[#865BFF]/30 transition-all duration-700 overflow-hidden">
                        <div class="absolute -right-10 -top-10 w-40 h-40 bg-[#865BFF]/5 rounded-full blur-3xl group-hover:bg-[#865BFF]/10 transition-all"></div>
                        
                        <div class="relative z-10">
                            <div class="w-20 h-20 bg-[#865BFF] rounded-2xl flex items-center justify-center text-white mb-12 shadow-[0_15px_30px_rgba(134,91,255,0.4)] group-hover:rotate-[360deg] transition-transform duration-1000">
                                <span class="material-symbols-outlined text-4xl">${f.icon}</span>
                            </div>
                            <h3 class="text-3xl font-black text-white mb-8 uppercase tracking-tight">${f.title}</h3>
                            <p class="text-white/40 font-medium text-lg leading-relaxed group-hover:text-white/60 transition-colors">${f.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderPSMatrix(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "REGLAS BM 2 FASES";
    const plans = content.plans || [
        { size: '$5,000', price: '$49' },
        { size: '$10,000', price: '$89' },
        { size: '$25,000', price: '$189' },
        { size: '$50,000', price: '$329' },
        { size: '$100,000', price: '$549' }
    ];
    const ctaLink = brand.ctaLink || "#register";

    return `
    <section class="py-40 px-6 bg-[#09001D] relative overflow-hidden">
        <div class="absolute top-0 right-0 w-full h-[800px] bg-gradient-to-b from-[#865BFF]/5 to-transparent"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex flex-col lg:flex-row justify-between items-center gap-16 mb-32 section-reveal">
                <div class="max-w-3xl text-center lg:text-left">
                    <h2 class="text-6xl md:text-[7rem] font-black text-white uppercase tracking-tighter leading-[0.9] mb-8">
                        ELIGE TU <br> <span class="text-[#865BFF]">CAPITAL</span>
                    </h2>
                    <p class="text-white/40 font-medium text-xl uppercase tracking-[0.3em]">Cuentas institucionales listas para operar.</p>
                </div>
                <div class="flex items-center gap-8 p-8 bg-white/5 border border-white/10 rounded-3xl backdrop-blur-xl">
                    <div class="text-center">
                        <p class="text-4xl font-black text-white mb-1">98%</p>
                        <p class="text-[9px] font-bold text-white/30 uppercase tracking-widest">Payout Ratio</p>
                    </div>
                    <div class="w-px h-12 bg-white/10"></div>
                    <div class="text-center">
                        <p class="text-4xl font-black text-[#865BFF] mb-1">Instant</p>
                        <p class="text-[9px] font-bold text-white/30 uppercase tracking-widest">Verification</p>
                    </div>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
                ${plans.map((p: any, i: number) => `
                    <div class="section-reveal group relative p-12 bg-white/[0.03] border border-white/5 rounded-[3.5rem] hover:bg-[#865BFF] hover:border-[#865BFF] transition-all duration-500 shadow-2xl overflow-hidden">
                        <div class="absolute -right-12 -top-12 w-32 h-32 bg-white/5 rounded-full blur-3xl group-hover:bg-white/20 transition-all"></div>
                        
                        <div class="relative z-10 text-center">
                            <p class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.5em] mb-6 group-hover:text-white/60">Cuenta Pro</p>
                            <h3 class="text-4xl font-black text-white mb-12 group-hover:scale-110 transition-transform origin-center">${p.size}</h3>
                            
                            <div class="mb-14 h-px w-full bg-white/10 group-hover:bg-white/20"></div>

                            <div class="mb-14">
                                <p class="text-[10px] font-black text-white/20 uppercase tracking-widest group-hover:text-white/40 mb-3">Acceso Único</p>
                                <p class="text-5xl font-black text-white group-hover:text-black transition-colors">${p.price}</p>
                            </div>

                            <a href="${ctaLink}" class="w-full py-5 bg-white/5 border border-white/10 text-white font-black text-xs uppercase tracking-[0.2em] rounded-2xl text-center group-hover:bg-black group-hover:border-black transition-all block shadow-lg">
                                Adquirir
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
