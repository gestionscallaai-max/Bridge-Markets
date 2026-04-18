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
    <section class="relative min-h-[90vh] flex items-center pt-24 pb-32 px-6 overflow-hidden bg-[#E9EFF4]">
        <!-- Fondo Abstracto Premium -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#865BFF]/20 rounded-full blur-[120px] opacity-60 animate-pulse"></div>
            <div class="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] bg-[#B086FF]/10 rounded-full blur-[100px] opacity-40"></div>
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
                
                <!-- Columna Izquierda: Textos -->
                <div class="lg:col-span-7 section-reveal">
                    <div class="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md border border-white/80 rounded-full mb-10 shadow-sm">
                        <span class="w-2 h-2 rounded-full bg-[#865BFF] animate-ping"></span>
                        <span class="text-[10px] font-black text-[#0C0027] uppercase tracking-[0.3em]">${badgeText}</span>
                    </div>

                    <h1 class="text-7xl md:text-9xl lg:text-[10rem] font-black leading-[0.85] text-[#0C0027] mb-10 tracking-tighter uppercase font-headline">
                        ${title} <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#865BFF] to-[#0C0027]">${highlight}</span>
                    </h1>

                    <p class="text-xl md:text-2xl text-[#0C0027]/70 leading-relaxed max-w-2xl mb-12 font-medium">
                        ${subtitle}
                    </p>

                    <div class="flex flex-col sm:flex-row gap-6">
                        <a href="${ctaLink}" class="group relative px-10 py-5 bg-[#0C0027] text-white font-black rounded-2xl overflow-hidden shadow-2xl hover:bg-[#865BFF] transition-all transform hover:-translate-y-1 flex items-center justify-center gap-4">
                            <span class="relative z-10 text-lg uppercase tracking-widest">${ctaText}</span>
                            <span class="material-symbols-outlined relative z-10 group-hover:translate-x-2 transition-transform">trending_up</span>
                        </a>
                        
                        <div class="flex items-center gap-4 px-6 py-4 bg-white/80 backdrop-blur-xl border border-white/50 rounded-2xl shadow-lg">
                           <div class="flex -space-x-3">
                                <div class="w-8 h-8 rounded-full bg-slate-200 border-2 border-white flex items-center justify-center text-[8px] font-bold">JD</div>
                                <div class="w-8 h-8 rounded-full bg-slate-300 border-2 border-white flex items-center justify-center text-[8px] font-bold">MS</div>
                                <div class="w-8 h-8 rounded-full bg-slate-400 border-2 border-white flex items-center justify-center text-[8px] font-bold text-white">TR</div>
                           </div>
                           <p class="text-[10px] font-bold text-[#0C0027]/60 uppercase tracking-widest">
                               <span class="text-[#0C0027]">+1.8k Traders</span> <br> Certificados
                           </p>
                        </div>
                    </div>
                </div>

                <!-- Columna Derecha: Abstract 3D (Placeholder with Effect) -->
                <div class="lg:col-span-5 relative lg:block hidden section-reveal">
                    <div class="relative z-10 p-4 bg-gradient-to-br from-white to-white/40 backdrop-blur-3xl rounded-[3rem] border border-white shadow-2xl transform rotate-2 hover:rotate-0 transition-all duration-700">
                        <div class="rounded-[2.5rem] overflow-hidden bg-[#0C0027] aspect-square flex items-center justify-center relative group">
                            <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,91,255,0.3)_0%,transparent_70%)]"></div>
                            <span class="material-symbols-outlined text-[180px] text-white drop-shadow-[0_0_40px_rgba(134,91,255,0.6)] group-hover:scale-110 transition-transform duration-1000">chess</span>
                            <div class="absolute bottom-8 left-8 right-8 p-6 bg-white/10 backdrop-blur-md rounded-2xl border border-white/10">
                                <div class="flex justify-between items-end">
                                    <div>
                                        <p class="text-[9px] font-black text-[#865BFF] uppercase tracking-widest mb-1">Live Profit</p>
                                        <p class="text-3xl font-black text-white">$4,250.00</p>
                                    </div>
                                    <span class="px-3 py-1 bg-emerald-500 text-black text-[9px] font-black rounded-lg uppercase">+12%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                    <!-- Decoración -->
                    <div class="absolute -top-10 -right-10 w-32 h-32 bg-[#865BFF]/30 rounded-full blur-3xl"></div>
                    <div class="absolute -bottom-10 -left-10 w-40 h-40 bg-white/50 rounded-full blur-3xl"></div>
                </div>

            </div>
        </div>
    </section>`;
}

export function renderPSBanner(content: Record<string, any>, brand: BrandConfig): string {
    const items = content.items || ['Ejecución Instantánea', 'Spread 0.0', 'Soporte 24/7', 'Retiros cada 14 días'];
    
    return `
    <div class="bg-[#0C0027] py-8 border-y border-white/10 relative z-20 overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10"></div>
        <div class="max-w-7xl mx-auto px-6">
            <div class="flex flex-wrap justify-between items-center gap-8 md:gap-4">
                ${items.map((item: string, i: number) => `
                    <div class="flex items-center gap-4 group">
                        <div class="w-1.5 h-1.5 rounded-full bg-[#865BFF] shadow-[0_0_10px_#865BFF]"></div>
                        <span class="text-[11px] font-black text-white uppercase tracking-[0.4em] group-hover:text-[#865BFF] transition-colors">${item}</span>
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
    <section class="py-32 px-6 bg-[#E9EFF4] relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black text-[#0C0027] uppercase tracking-tighter italic">${title}</h2>
                <div class="w-20 h-1.5 bg-[#865BFF] mx-auto mt-6 rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${features.map((f: any, i: number) => `
                    <div class="section-reveal group p-12 bg-white border border-slate-200 rounded-[2.5rem] shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_40px_80px_-20px_rgba(134,91,255,0.15)] transition-all duration-500 hover:-translate-y-2">
                        <div class="w-20 h-20 bg-[#0C0027] rounded-3xl flex items-center justify-center text-white mb-10 group-hover:bg-[#865BFF] group-hover:rotate-6 transition-all duration-500 shadow-xl">
                            <span class="material-symbols-outlined text-4xl">${f.icon}</span>
                        </div>
                        <h3 class="text-2xl font-black text-[#0C0027] mb-6 uppercase tracking-tight">${f.title}</h3>
                        <p class="text-slate-500 font-medium leading-relaxed">${f.desc}</p>
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
    <section class="py-32 px-6 bg-[#0C0027] relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_left,rgba(134,91,255,0.15),transparent_50%)]"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-end gap-12 mb-20 section-reveal">
                <div class="max-w-2xl">
                    <h2 class="text-5xl md:text-8xl font-black text-white uppercase tracking-tighter leading-none mb-6">
                        ${title}
                    </h2>
                    <p class="text-violet-300/60 font-medium text-lg uppercase tracking-widest">Condiciones institucionales para el trader moderno.</p>
                </div>
                <div class="flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full">
                    <span class="w-3 h-3 bg-emerald-500 rounded-full animate-pulse"></span>
                    <span class="text-[10px] font-black text-white uppercase tracking-[0.3em]">Servidores Live BM</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
                ${plans.map((p: any, i: number) => `
                    <div class="section-reveal group relative p-10 bg-white/5 border border-white/10 rounded-[2rem] hover:bg-[#865BFF] hover:border-[#865BFF] transition-all duration-500 overflow-hidden shadow-2xl">
                        <div class="absolute -right-8 -top-8 w-24 h-24 bg-white/5 rounded-full blur-2xl group-hover:bg-white/20 transition-all"></div>
                        
                        <div class="relative z-10">
                            <p class="text-[10px] font-black text-violet-400 uppercase tracking-[0.4em] mb-4 group-hover:text-white/60">Cuenta</p>
                            <h3 class="text-3xl font-black text-white mb-10 group-hover:scale-110 transition-transform origin-left">${p.size}</h3>
                            
                            <div class="mb-12">
                                <p class="text-[10px] font-black text-white/30 uppercase tracking-widest group-hover:text-white/40 mb-2">Inscripción Única</p>
                                <p class="text-4xl font-black text-white drop-shadow-xl group-hover:text-black transition-colors">${p.price}</p>
                            </div>

                            <a href="${ctaLink}" class="w-full py-4 bg-white/10 border border-white/10 text-white font-black text-[11px] uppercase tracking-widest rounded-xl text-center group-hover:bg-black group-hover:border-black transition-all block">
                                Comprar
                            </a>
                        </div>
                    </div>
                `).join('')}
            </div>
            
            <div class="mt-20 p-8 rounded-[2rem] border border-white/5 bg-white/5 text-center">
                <p class="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] leading-loose">
                    *Precios en USD. Sin cuotas mensuales. Pago único por acceso al reto.
                </p>
            </div>
        </div>
    </section>`;
}

export function renderPSCalculator(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || "Calcula tus ganancias";
    const note = content.note || "Basado en un target conservador de 4% mensual.";

    return `
    <section class="py-32 px-6 bg-[#E9EFF4] relative overflow-hidden">
        <div class="max-w-5xl mx-auto section-reveal">
            <div class="bg-[#0C0027] p-12 md:p-20 rounded-[4rem] shadow-[-20px_40px_80px_rgba(12,0,39,0.3)] relative overflow-hidden text-white">
                <div class="absolute top-0 right-0 w-80 h-80 bg-[#865BFF]/10 rounded-full blur-[100px] -mr-40 -mt-40"></div>
                
                <h2 class="text-4xl md:text-7xl font-black text-center mb-16 tracking-tighter uppercase italic">${title}</h2>
                
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
                    <div class="space-y-10">
                        <div>
                            <label class="text-[10px] font-black uppercase tracking-[0.5em] text-[#865BFF] mb-6 block">Selecciona el Reto</label>
                            <div class="grid grid-cols-3 gap-4">
                                ${['5K', '10K', '25K', '50K', '100K'].map(size => `
                                    <button onclick="updatePSCalc('${size}')" class="calc-btn-${size} py-4 border border-white/20 rounded-2xl font-black text-sm hover:bg-white hover:text-black transition-all">
                                        ${size}
                                    </button>
                                `).join('')}
                            </div>
                        </div>
                        
                        <div class="p-8 bg-white/5 border border-white/10 rounded-3xl">
                            <p class="text-sm font-medium text-white/60 italic">"${note}"</p>
                        </div>
                    </div>

                    <div class="p-12 bg-white rounded-[3rem] text-center shadow-2xl relative">
                        <div class="absolute -top-6 -left-6 w-12 h-12 bg-[#865BFF] rounded-full flex items-center justify-center shadow-lg">
                            <span class="material-symbols-outlined text-white">bolt</span>
                        </div>
                        <p class="text-[10px] font-black text-[#0C0027] uppercase tracking-[0.4em] mb-4">Ganas un 4% de</p>
                        <p id="ps-calc-size" class="text-4xl font-black text-[#865BFF] mb-8">$100,000</p>
                        <div class="h-px w-20 bg-slate-200 mx-auto mb-8"></div>
                        <p class="text-[10px] font-black text-slate-400 uppercase tracking-[0.4em] mb-4">Tu Profit Potencial</p>
                        <p id="ps-calc-result" class="text-7xl font-black text-[#0C0027] tracking-tighter">$4,000</p>
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
                
                // Efecto visual de feedback
                const el = document.getElementById('ps-calc-result');
                el.classList.add('scale-110', 'text-[#865BFF]');
                setTimeout(() => el.classList.remove('scale-110', 'text-[#865BFF]'), 300);
            }
            // Initialize
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
    <section class="py-32 px-6 bg-[#0C0027] border-y border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                <div class="section-reveal">
                    <h2 class="text-5xl md:text-7xl font-black text-white uppercase tracking-tighter mb-10 leading-none">
                        Transparencia <br> <span class="text-[#865BFF]">Absoluta</span>
                    </h2>
                    <p class="text-xl text-white/50 font-medium leading-relaxed mb-12">
                        Nuestras reglas son claras y están diseñadas para proteger la liquidez institucional mientras tú demuestras tu talento.
                    </p>
                    <div class="space-y-6">
                        ${['Sin límites de tiempo en fases', 'Hedges permitidos', 'Expert Advisors permitidos', 'Noticias operables'].map(item => `
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-[#865BFF]">check_circle</span>
                                <span class="text-sm font-black text-white uppercase tracking-widest">${item}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6 section-reveal">
                    ${rules.map((r: any, i: number) => `
                        <div class="p-10 bg-white/5 border border-white/10 rounded-[2.5rem] hover:border-[#865BFF]/50 transition-colors group">
                            <p class="text-[10px] font-black text-white/30 uppercase tracking-widest mb-4 group-hover:text-[#865BFF] transition-colors">${r.title}</p>
                            <p class="text-5xl font-black text-white tracking-tighter">${r.value}</p>
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
    <section class="py-32 px-6 bg-[#E9EFF4] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <h1 class="text-7xl md:text-9xl lg:text-[12rem] font-black text-[#0C0027]/10 uppercase tracking-tighter absolute top-0 left-0 w-full select-none -z-0">BRIDGE</h1>
                <h2 class="text-6xl md:text-8xl font-black text-[#0C0027] relative z-10 uppercase tracking-tighter italic leading-none mb-8">
                    ${title}
                </h2>
                <p class="text-xl text-[#0C0027]/60 font-medium max-w-xl mx-auto leading-relaxed relative z-10">
                    ${subtitle}
                </p>
            </div>

            <div class="max-w-4xl mx-auto bg-white p-12 md:p-20 rounded-[4rem] shadow-2xl relative z-10 border border-slate-100">
                <form id="contact-form" class="grid grid-cols-1 md:grid-cols-2 gap-10">
                    <input type="hidden" name="partner_id" value="${partnerId}">
                    <div class="space-y-4">
                        <label class="text-[10px] font-black text-[#0C0027] uppercase tracking-[0.4em]">Nombre Completo</label>
                        <input type="text" placeholder="Tu nombre" class="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#865BFF] outline-none">
                    </div>
                    <div class="space-y-4">
                        <label class="text-[10px] font-black text-[#0C0027] uppercase tracking-[0.4em]">Correo Electrónico</label>
                        <input type="email" placeholder="hola@ejemplo.com" class="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#865BFF] outline-none">
                    </div>
                    <div class="md:col-span-2 space-y-4">
                        <label class="text-[10px] font-black text-[#0C0027] uppercase tracking-[0.4em]">Mensaje</label>
                        <textarea placeholder="¿En qué podemos ayudarte?" rows="4" class="w-full px-6 py-5 bg-slate-50 border-none rounded-2xl font-bold text-sm focus:ring-2 focus:ring-[#865BFF] outline-none"></textarea>
                    </div>
                    <div class="md:col-span-2 pt-6">
                        <button type="submit" class="w-full py-6 bg-[#0C0027] text-white font-black rounded-3xl text-lg uppercase tracking-widest hover:bg-[#865BFF] shadow-xl hover:-translate-y-1 transition-all">
                            Enviar Mensaje
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
    <footer class="py-32 bg-[#0C0027] text-white px-6 border-t border-white/5 relative z-10 overflow-hidden">
        <div class="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#865BFF]/5 rounded-full blur-[120px] -mb-80 -mr-80"></div>
        
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-20 mb-32 relative z-10">
            <div class="md:col-span-6">
                <img src="/logo.png" alt="Bridge Markets" class="h-10 mb-12 opacity-80 brightness-200">
                <p class="text-[11px] text-white/30 max-w-lg leading-relaxed uppercase tracking-[0.2em] font-bold">
                    ${disclaimer}
                </p>
            </div>
            <div class="md:col-span-3 md:col-start-10">
                <h4 class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.6em] mb-10">Legal</h4>
                <ul class="space-y-6">
                    <li><a href="#" class="text-[11px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">Risk Disclosure</a></li>
                    <li><a href="#" class="text-[11px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">Privacy Policy</a></li>
                    <li><a href="#" class="text-[11px] font-black text-white/40 hover:text-white uppercase tracking-widest transition-colors">Terms of Service</a></li>
                </ul>
            </div>
        </div>

        <div class="max-w-7xl mx-auto pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 relative z-10">
            <div class="flex items-center gap-4">
                <div class="w-12 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-white/30">
                    <span class="material-symbols-outlined text-sm">verified</span>
                </div>
                <p class="text-[10px] font-black text-white/20 uppercase tracking-[0.5em]">
                    © ${year} BRIDGE MARKETS LTD. <br> OFFICIAL PARTNER NETWORK
                </p>
            </div>
            
            <div class="flex gap-8">
                <div class="flex items-center gap-3">
                    <span class="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span class="text-[9px] font-black text-white/40 uppercase tracking-widest">Global Servers Online</span>
                </div>
            </div>
        </div>
    </footer>`;
}
