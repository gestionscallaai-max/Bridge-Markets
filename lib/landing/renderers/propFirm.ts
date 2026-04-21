import { BrandConfig } from '../types';

// ─── PROP HERO ──────────────────────────────────────────────
export function renderPropHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Oficial';
    const ctaText = content.ctaText || "Empieza tu Challenge";
    const ctaLink = brand.ctaLink || "#register";
    const heroPhrase = brand.heroPhrase || "Demuestra tu talento. Opera capital real. Cobra tus ganancias.";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
        <!-- Background elements -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
            <div class="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1642388691919-400d9841315b?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale"></div>
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="max-w-4xl">
                <!-- IB Badge -->
                <div class="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md animate-fade-in-up">
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-5 object-contain border-r border-white/20 pr-4">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></span>
                        <span class="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Partner Oficial: <span class="text-white">${ibName}</span></span>
                    </div>
                </div>

                <h1 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 tracking-tighter leading-[1.1] uppercase italic">
                    Bridge Markets <span class="text-gradient-gold">PropFirm</span> — FOREX/CFDs & Synthetic PropTrading
                </h1>
                
                <p class="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-2xl leading-relaxed italic">
                    ${heroPhrase}
                </p>

                <div class="flex flex-col md:flex-row items-center gap-12">
                    <div class="flex flex-col md:flex-row items-center gap-6">
                        <a href="${ctaLink}" class="group relative px-10 py-6 bg-[#D4AF37] text-black font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(212,175,55,0.2)]">
                            <span class="relative z-10 uppercase tracking-widest text-sm">${ctaText}</span>
                        </a>
                        <div class="flex flex-col">
                            <span class="text-[10px] font-black text-white/30 uppercase tracking-[0.3em] mb-1">¿Qué es PropTrading?</span>
                            <span class="text-xs font-bold text-white/80 italic">Bridge Markets te financia para operar en mercados reales.</span>
                        </div>
                    </div>
                    
                    <!-- 3D Horse Asset -->
                    <div class="relative hidden lg:block">
                        <div class="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-[80px] animate-pulse"></div>
                        <img src="/images/imagenes%20nuevas/caballo%20negro.png" alt="Horse" class="w-48 h-auto object-contain relative z-10 animate-[heroFloat_6s_ease-in-out_infinite] drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <span class="material-symbols-outlined text-white text-4xl font-light">expand_more</span>
        </div>
    </section>

    <style>
        .text-gradient-gold {
            background: linear-gradient(135deg, #FFF 0%, #D4AF37 50%, #B8860B 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
    `;
}

// ─── WHAT IS PROPTRADING ─────────────────────────────────────
export function renderPropEducation(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#080808] relative overflow-hidden border-y border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="section-reveal">
                    <span class="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-4 block italic">El Modelo de Éxito</span>
                    <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 leading-[1.1] uppercase italic">Tú pones el talento. <br>Nosotros el capital.</h2>
                    <div class="space-y-6">
                        <div class="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <span class="material-symbols-outlined text-[#D4AF37] text-3xl italic">ads_click</span>
                            <p class="text-white/60 font-medium leading-relaxed italic">Bridge Markets evalúa tu operativa a través de un Challenge simulado.</p>
                        </div>
                        <div class="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <span class="material-symbols-outlined text-[#D4AF37] text-3xl italic">verified_user</span>
                            <p class="text-white/60 font-medium leading-relaxed italic">Si superas los objetivos, accedes a una Cuenta Financiada en Mercado Real.</p>
                        </div>
                        <div class="flex items-start gap-4 p-6 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <span class="material-symbols-outlined text-[#D4AF37] text-3xl italic">payments</span>
                            <p class="text-white/60 font-medium leading-relaxed italic">Opera con capital de la firma y cobra hasta el 80% de las ganancias.</p>
                        </div>
                        <p class="text-xs font-black text-[#D4AF37] uppercase tracking-widest pt-4 italic">Sin riesgo de capital propio. Tú pones el talento. Nosotros ponemos el dinero.</p>
                    </div>
                </div>
                
                <div class="relative section-reveal flex justify-center">
                    <div class="relative group">
                        <div class="absolute inset-0 bg-[#D4AF37]/10 rounded-full blur-[100px] animate-pulse"></div>
                        <img src="/images/imagenes%20nuevas/hourglass.png" alt="Hourglass" class="w-80 h-auto object-contain relative z-10 animate-[heroFloat_8s_ease-in-out_infinite] drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] grayscale hover:grayscale-0 transition-all duration-700">
                        
                        <div class="absolute -bottom-10 -right-10 w-full h-full rounded-[4rem] flex flex-col items-center justify-center p-12 text-center pointer-events-none">
                            <div class="text-7xl font-black text-white mb-4 italic">0% <span class="text-xl block text-white/40 uppercase font-black tracking-widest mt-2 italic">Riesgo Propio</span></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── CHOOSE PROGRAM (OBSIDIAN & BASALT) ───────────────────────
export function renderPropProgramsForex(content: Record<string, any>, brand: BrandConfig): string {
    const ctaObsidianText = content.ctaObsidianText || "Comprar OBSIDIAN";
    const ctaBasaltText = content.ctaBasaltText || "Comprar BASALT";
    const ctaObsidianLink = content.ctaObsidianLink || brand.ctaLink || "#";
    const ctaBasaltLink = content.ctaBasaltLink || brand.ctaLink || "#";

    return `
    <section class="py-32 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-4 uppercase tracking-tight italic">FOREX / CFDs PropTrading — Mercados Reales Internacionales</h2>
                <p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">Opera Forex, índices, commodities y más bajo estándares institucionales.</p>
            </div>

            <div class="overflow-x-auto section-reveal">
                <table class="w-full border-collapse min-w-[800px] bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden">
                    <thead>
                        <tr class="bg-white/5">
                            <th class="p-8 text-left text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/10 italic">Característica</th>
                            <th class="p-8 text-center bg-[#D4AF37]/10 border-b border-[#D4AF37]/20">
                                <span class="block text-2xl font-black text-[#D4AF37] mb-1 italic">OBSIDIAN</span>
                                <span class="text-[9px] font-bold text-white/60 uppercase tracking-widest italic">(1 Fase)</span>
                            </th>
                            <th class="p-8 text-center bg-white/5 border-b border-white/10">
                                <span class="block text-2xl font-black text-white mb-1 italic">BASALT</span>
                                <span class="text-[9px] font-bold text-white/60 uppercase tracking-widest italic">(2 Fases)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm font-medium">
                        ${[
                            ['Modelo de evaluación', '1 Fase (One Phase)', '2 Fases (Two Phase)'],
                            ['Objetivo Fase 1', '8%', '8%'],
                            ['Objetivo Fase 2', 'No aplica', '8%'],
                            ['Días mínimos (Evaluación)', '5 días', '7 días (F1) + 5 días (F2)'],
                            ['Pérdida total (Evaluación)', '8%', '10%'],
                            ['Pérdida diaria (Evaluación)', '4%', '5%'],
                            ['Días mínimos (Cuenta Real)', '5 días', '7 días'],
                            ['Pérdida total (Cuenta Real)', '8%', '10%'],
                            ['Pérdida diaria (Cuenta Real)', '4%', '5%'],
                            ['Profit Split', '80% Trader', '70% Trader'],
                            ['Retiros', 'Cada 14 días', 'Cada 14 días'],
                            ['Máximo pago acumulado', '10% del valor de la cuenta', '10% del valor de la cuenta'],
                            ['Certificación', 'Insignia Trader Financiado', 'Insignia Trader Financiado']
                        ].map(row => `
                            <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td class="p-6 text-white/40 border-r border-white/5 italic">${row[0]}</td>
                                <td class="p-6 text-center text-[#D4AF37] font-bold border-r border-white/5 italic">${row[1]}</td>
                                <td class="p-6 text-center text-white/80 italic">${row[2]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 section-reveal">
                <div class="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center group hover:border-[#D4AF37]/40 transition-all">
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Programa OBSIDIAN</h3>
                    <a href="${ctaObsidianLink}" class="inline-block w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-xl italic">${ctaObsidianText}</a>
                    <p class="mt-6 text-[10px] text-white/30 italic">"Los precios varían según el tamaño de cuenta. Consulta tu portal de cliente."</p>
                </div>
                <div class="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center group hover:border-white/40 transition-all">
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Programa BASALT</h3>
                    <a href="${ctaBasaltLink}" class="inline-block w-full py-5 bg-white text-black font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-xl italic">${ctaBasaltText}</a>
                    <p class="mt-6 text-[10px] text-white/30 italic">"Los precios varían según el tamaño de cuenta. Consulta tu portal de cliente."</p>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── CHOOSE PROGRAM (ELITE & ULTRA) ─────────────────────────
export function renderPropProgramsSynthetic(content: Record<string, any>, brand: BrandConfig): string {
    const ctaEliteText = content.ctaEliteText || "Comprar ELITE";
    const ctaUltraText = content.ctaUltraText || "Comprar ULTRA";
    const ctaEliteLink = content.ctaEliteLink || brand.ctaLink || "#";
    const ctaUltraLink = content.ctaUltraLink || brand.ctaLink || "#";

    return `
    <section class="py-32 px-8 bg-[#080808] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <h2 class="text-3xl md:text-5xl font-black font-headline text-white mb-4 uppercase tracking-tight italic">Synthetic PropTrading — Índices Sintéticos 24/7</h2>
                <p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">Opera BullX500, índices sintéticos y más, disponibles los 7 días de la semana.</p>
            </div>

            <div class="overflow-x-auto section-reveal">
                <table class="w-full border-collapse min-w-[800px] bg-white/[0.02] border border-white/10 rounded-[2rem] overflow-hidden">
                    <thead>
                        <tr class="bg-white/5">
                            <th class="p-8 text-left text-[10px] font-black text-white/40 uppercase tracking-widest border-b border-white/10 italic">Característica</th>
                            <th class="p-8 text-center bg-blue-500/10 border-b border-blue-500/20">
                                <span class="block text-2xl font-black text-blue-400 mb-1 italic">ELITE</span>
                                <span class="text-[9px] font-bold text-white/60 uppercase tracking-widest italic">(1 Fase)</span>
                            </th>
                            <th class="p-8 text-center bg-purple-500/10 border-b border-purple-500/20">
                                <span class="block text-2xl font-black text-purple-400 mb-1 italic">ULTRA</span>
                                <span class="text-[9px] font-bold text-white/60 uppercase tracking-widest italic">(2 Fases)</span>
                            </th>
                        </tr>
                    </thead>
                    <tbody class="text-sm font-medium">
                        ${[
                            ['Modelo de evaluación', '1 Fase (One Phase)', '2 Fases (Two Phase)'],
                            ['Objetivo Fase 1', '8%', '4%'],
                            ['Objetivo Fase 2', 'No aplica', '8%'],
                            ['Días mínimos (Evaluación)', '5 días', '7 días (F1) + 5 días (F2)'],
                            ['Pérdida total (Evaluación)', '8%', '10%'],
                            ['Pérdida diaria (Evaluación)', '4%', '5%'],
                            ['Días mínimos (Cuenta Real)', '5 días', '7 días'],
                            ['Pérdida total (Cuenta Real)', '8%', '10%'],
                            ['Pérdida diaria (Cuenta Real)', '4%', '5%'],
                            ['Profit Split', '80% Trader / 20% BM', '70% Trader / 30% BM'],
                            ['Retiros', 'Cada 14 días', 'Cada 14 días'],
                            ['Máximo pago acumulado', '10% del valor de la cuenta', '10% del valor de la cuenta'],
                            ['Certificación', 'Insignia Trader Financiado', 'Insignia Trader Financiado']
                        ].map(row => `
                            <tr class="border-b border-white/5 hover:bg-white/5 transition-colors">
                                <td class="p-6 text-white/40 border-r border-white/5 italic">${row[0]}</td>
                                <td class="p-6 text-center text-blue-400 font-bold border-r border-white/5 italic">${row[1]}</td>
                                <td class="p-6 text-center text-purple-400 font-bold italic">${row[2]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12 section-reveal">
                <div class="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center group hover:border-blue-500/40 transition-all">
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Programa ELITE</h3>
                    <a href="${ctaEliteLink}" class="inline-block w-full py-5 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-xl shadow-blue-600/20 italic">${ctaEliteText}</a>
                    <p class="mt-6 text-[10px] text-white/30 italic">"Los precios varían según el tamaño de cuenta. Consulta tu portal de cliente."</p>
                </div>
                <div class="p-10 bg-white/5 border border-white/10 rounded-[3rem] text-center group hover:border-purple-500/40 transition-all">
                    <h3 class="text-2xl font-black text-white mb-6 uppercase italic">Programa ULTRA</h3>
                    <a href="${ctaUltraLink}" class="inline-block w-full py-5 bg-purple-600 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all uppercase tracking-widest text-sm shadow-xl shadow-purple-600/20 italic">${ctaUltraText}</a>
                    <p class="mt-6 text-[10px] text-white/30 italic">"Los precios varían según el tamaño de cuenta. Consulta tu portal de cliente."</p>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── STEP BY STEP ──────────────────────────────────────────
export function renderPropSteps(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { title: 'Elige tu programa', desc: 'Selecciona entre OBSIDIAN, BASALT (Forex/CFDs) o ELITE, ULTRA (Synthetic). Cada uno tiene diferentes fases y condiciones.', icon: 'ads_click' },
        { title: 'Supera el Challenge', desc: 'Opera en cuenta simulada cumpliendo los objetivos de rentabilidad, días mínimos y límites de riesgo establecidos.', icon: 'trending_up' },
        { title: 'Recibe tu Cuenta Financiada', desc: 'Una vez validado, accedes a una cuenta en mercado real como Trader Financiado Certificado Bridge Markets.', icon: 'workspace_premium' },
        { title: 'Opera y cobra', desc: 'Opera bajo los parámetros de la cuenta financiada y solicita tu distribución de beneficios cada 14 días.', icon: 'payments' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505] relative z-10">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="text-[10px] font-black text-white/40 uppercase tracking-[0.4em] mb-4 block italic">El Camino al Éxito</span>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white uppercase italic">Proceso Paso a Paso</h2>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative section-reveal">
                ${steps.map((step, i) => `
                    <div class="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[2.5rem] hover:bg-white/[0.04] transition-all duration-500">
                        <div class="w-16 h-16 bg-[#D4AF37]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#D4AF37] group-hover:text-black transition-all duration-500">
                            <span class="material-symbols-outlined text-3xl transition-colors italic">${step.icon}</span>
                        </div>
                        <div class="text-xs font-black text-[#D4AF37] mb-4 uppercase tracking-widest italic">PASO ${i + 1}</div>
                        <h3 class="text-xl font-black text-white mb-4 uppercase italic">${step.title}</h3>
                        <p class="text-white/40 text-sm leading-relaxed font-medium italic">${step.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── RULES (ACCORDION) ──────────────────────────────────────
export function renderPropRules(content: Record<string, any>, brand: BrandConfig): string {
    const rules = [
        { title: 'Duración mínima de operaciones', desc: 'Forex/CFDs: mín. 2 minutos por operación. Synthetic: mín. 3 minutos por operación.' },
        { title: 'Stop Loss obligatorio', desc: 'Solo en fase financiada. Cada operación debe tener Stop Loss activo en máximo 2 minutos desde su apertura.' },
        { title: 'Regla de consistencia (30%)', desc: 'Ninguna operación individual puede representar el 30% o más del beneficio neto acumulado al momento del retiro (solo fase financiada).' },
        { title: 'Copy Trading', desc: 'Permitido solo entre cuentas propias del mismo titular (máx. 5 cuentas). Prohibido copiar entre cuentas de terceros.' },
        { title: 'Estrategias prohibidas', desc: 'Gambling, All-in, Grid/Martingala, Arbitraje, Quick Strike. Tolerancia cero.' },
        { title: 'Operación en noticias económicas', desc: 'Prohibido abrir posiciones 5 minutos antes o después de una noticia de alto impacto.' },
        { title: 'Control de IP y acceso', desc: 'Prohibido uso de VPN, acceso desde jurisdicciones restringidas u operación por terceros. Los EAs deben ejecutarse desde la IP del KYC.' },
        { title: 'Límite de posiciones abiertas', desc: 'Máx. 5 posiciones simultáneas en el mismo instrumento/dirección. Máx. 30 lotes totales simultáneos (solo fase financiada).' }
    ];

    return `
    <section class="py-32 px-8 bg-[#080808] border-y border-white/5">
        <div class="max-w-4xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <span class="material-symbols-outlined text-6xl text-[#D4AF37] mb-6 italic">gavel</span>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white uppercase italic">Reglas Clave</h2>
                <p class="text-white/40 mt-4 font-medium uppercase tracking-[0.2em] text-[10px] italic">Parámetros Operativos Oficiales 2026</p>
            </div>

            <div class="space-y-4 section-reveal">
                ${rules.map((rule, i) => `
                    <div class="group bg-white/[0.02] border border-white/5 rounded-3xl overflow-hidden">
                        <details class="w-full">
                            <summary class="flex items-center justify-between p-8 cursor-pointer list-none group-hover:bg-white/[0.02] transition-colors">
                                <span class="text-lg font-black text-white uppercase italic">${rule.title}</span>
                                <span class="material-symbols-outlined text-[#D4AF37] transition-transform duration-300 italic">add</span>
                            </summary>
                            <div class="px-8 pb-8 text-white/50 font-medium leading-relaxed border-t border-white/5 pt-6 italic">
                                ${rule.desc}
                            </div>
                        </details>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    <style>
        details[open] summary span:last-child { transform: rotate(45deg); }
        summary::-webkit-details-marker { display: none; }
    </style>
    `;
}

// ─── IB COMMUNITY (EDITABLE) ────────────────────────────────
export function renderPropCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const communityName = brand.communityName || brand.ibName || "Nuestra Comunidad";
    const welcomeMsg = content.welcomeMsg || "Únete a un entorno diseñado para el crecimiento mutuo. Aquí no solo operamos, sino que construimos el futuro del trading institucional juntos.";
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&q=80";
    
    const whatsapp = content.socialWhatsApp || brand.whatsapp || "";
    const telegram = content.socialTelegram || brand.telegram || "";
    const instagram = content.socialInstagram || brand.instagram || "";
    const youtube = content.socialYouTube || brand.youtube || "";
    
    return `
    <section class="py-32 px-8 bg-[#050505] overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="relative section-reveal order-2 lg:order-1">
                    <div class="aspect-[4/5] rounded-[4rem] overflow-hidden border border-white/10 shadow-2xl">
                        <img src="${photoUrl}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700" alt="Community">
                    </div>
                    <div class="absolute -bottom-10 -right-10 p-12 bg-[#D4AF37] rounded-[3rem] text-black shadow-2xl animate-float hidden md:block">
                        <div class="text-4xl font-black italic">Soporte 1:1</div>
                        <div class="text-sm font-bold uppercase tracking-widest opacity-60 italic">Asistencia para IBs</div>
                    </div>
                </div>

                <div class="section-reveal order-1 lg:order-2">
                    <span class="text-[10px] font-black text-[#D4AF37] uppercase tracking-[0.4em] mb-4 block italic">Liderazgo & Comunidad</span>
                    <h2 class="text-4xl md:text-7xl font-black font-headline text-white mb-8 uppercase leading-[0.9] italic">${communityName}</h2>
                    <div class="prose prose-invert max-w-none mb-12">
                        <p class="text-xl text-white/60 font-light leading-relaxed italic">
                            ${welcomeMsg}
                        </p>
                    </div>

                    <div class="flex flex-wrap gap-6">
                        ${whatsapp ? `<a href="https://wa.me/${whatsapp}" class="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#25D366] hover:text-white transition-all duration-500 shadow-xl"><span class="material-symbols-outlined italic">chat</span></a>` : ''}
                        ${telegram ? `<a href="${telegram}" class="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#0088cc] hover:text-white transition-all duration-500 shadow-xl"><span class="material-symbols-outlined italic">send</span></a>` : ''}
                        ${instagram ? `<a href="${instagram}" class="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#E1306C] hover:text-white transition-all duration-500 shadow-xl"><span class="material-symbols-outlined italic">photo_camera</span></a>` : ''}
                        ${youtube ? `<a href="${youtube}" class="w-14 h-14 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center hover:bg-[#FF0000] hover:text-white transition-all duration-500 shadow-xl"><span class="material-symbols-outlined italic">play_circle</span></a>` : ''}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── FAQ (FIXED) ────────────────────────────────────────────
export function renderPropFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué diferencia hay entre OBSIDIAN y BASALT?', a: 'OBSIDIAN evalúa en 1 sola fase (más rápido). BASALT evalúa en 2 fases (más progresivo y con mayor tolerancia al riesgo).' },
        { q: '¿Cuánto puedo ganar?', a: 'Con OBSIDIAN/ELITE el 80% de los beneficios netos son tuyos. Con BASALT/ULTRA el 70%. El límite máximo pagado es el 10% del valor de la cuenta.' },
        { q: '¿Cada cuánto puedo retirar?', a: 'Cada 14 días calendario, cumpliendo todas las condiciones del programa.' },
        { q: '¿Puedo usar robots o EAs?', a: 'Sí, siempre que cumplan las reglas operativas. Deben ejecutarse desde la IP de tu KYC verificado.' },
        { q: '¿Se permite el copy trading?', a: 'Solo entre tus propias cuentas (mismo titular, misma IP). No está permitido copiar de cuentas de terceros.' },
        { q: '¿Cuál es la duración mínima de mis operaciones?', a: 'Forex/CFDs: más de 2 minutos. Synthetic: más de 3 minutos. Operaciones más cortas no son válidas.' },
        { q: '¿Puedo operar en noticias?', a: 'No. Está prohibido abrir posiciones en los 5 minutos previos ni en los 5 minutos posteriores a una noticia de alto impacto.' },
        { q: '¿Qué pasa si incumplo una regla?', a: 'Dependiendo de la regla, puede resultar en reinicio de cuenta al 50%, rechazo de retiro o cancelación definitiva del producto.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#080808]">
        <div class="max-w-6xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="section-reveal">
                    <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-12 uppercase italic">Preguntas Frecuentes</h2>
                    <div class="space-y-6">
                        ${faqs.map((faq, i) => `
                            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.03] transition-colors">
                                <h3 class="text-lg font-black text-white mb-3 italic">${faq.q}</h3>
                                <p class="text-white/40 text-sm font-medium leading-relaxed italic">${faq.a}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="relative section-reveal flex justify-center order-first lg:order-last">
                    <div class="relative">
                        <div class="absolute inset-0 bg-white/5 rounded-full blur-[100px] animate-pulse"></div>
                        <img src="/images/imagenes%20nuevas/peones%20negro.png" alt="Pawns" class="w-96 h-auto object-contain relative z-10 animate-[heroFloat_7s_ease-in-out_infinite] drop-shadow-[0_20px_40px_rgba(0,0,0,0.5)]">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── CERTIFICATION & BENEFITS ───────────────────────
export function renderPropBenefits(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#050505] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                <div class="section-reveal">
                    <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 uppercase italic">Certificación y Beneficios</h2>
                    <ul class="space-y-6">
                        ${[
                            'Insignia Oficial de Certificación — Trader Financiado Certificado Bridge Markets',
                            'Acceso a una Cuenta Financiada en Mercado Real',
                            'Validación como operador alineado a estándares institucionales',
                            'Derecho a solicitar distribución de beneficios cada 14 días calendario',
                            'Profit Split de hasta el 80% de los beneficios netos (programa OBSIDIAN / ELITE)'
                        ].map(item => `
                            <li class="flex items-center gap-4 text-white/60 font-medium italic">
                                <span class="material-symbols-outlined text-[#D4AF37] italic">check_circle</span>
                                ${item}
                            </li>
                        `).join('')}
                    </ul>
                </div>
                <div class="relative section-reveal flex justify-center">
                    <div class="relative group">
                        <div class="absolute inset-0 bg-[#D4AF37]/20 rounded-full blur-[100px] animate-pulse"></div>
                        <img src="/images/imagenes%20nuevas/reyna%20negra.png" alt="Queen" class="w-80 h-auto object-contain relative z-10 animate-[heroFloat_5s_ease-in-out_infinite] drop-shadow-[0_40px_80px_rgba(0,0,0,0.9)]">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── FINAL CTA ──────────────────────────────────────────────
export function renderPropFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaObsidianText = content.ctaObsidianText || "Quiero OBSIDIAN";
    const ctaBasaltText = content.ctaBasaltText || "Quiero BASALT";
    const ctaEliteText = content.ctaEliteText || "Quiero ELITE";
    const ctaUltraText = content.ctaUltraText || "Quiero ULTRA";
    
    const ctaObsidianLink = content.ctaObsidianLink || brand.ctaLink || "#";
    const ctaBasaltLink = content.ctaBasaltLink || brand.ctaLink || "#";
    const ctaEliteLink = content.ctaEliteLink || brand.ctaLink || "#";
    const ctaUltraLink = content.ctaUltraLink || brand.ctaLink || "#";

    return `
    <section class="py-40 px-8 bg-[#050505] relative overflow-hidden">
        <div class="absolute inset-0 z-0">
             <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#D4AF37]/10 blur-[120px] rounded-full"></div>
        </div>
        
        <div class="max-w-4xl mx-auto text-center relative z-10 section-reveal">
            <h2 class="text-5xl md:text-8xl font-black font-headline text-white mb-8 tracking-tighter uppercase italic">¿Listo para operar con <span class="text-[#D4AF37]">capital real?</span></h2>
            <p class="text-xl md:text-2xl text-white/50 font-light mb-12 italic">Elige tu programa y demuestra tu talento como trader</p>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <a href="${ctaObsidianLink}" class="p-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-[#D4AF37] hover:text-black transition-all italic">${ctaObsidianText}</a>
                <a href="${ctaBasaltLink}" class="p-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-white hover:text-black transition-all italic">${ctaBasaltText}</a>
                <a href="${ctaEliteLink}" class="p-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-blue-600 hover:text-white transition-all italic">${ctaEliteText}</a>
                <a href="${ctaUltraLink}" class="p-6 bg-white/5 border border-white/10 rounded-2xl text-white font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all italic">${ctaUltraText}</a>
            </div>
            
            <p class="mt-12 text-[10px] text-white/20 uppercase tracking-[0.4em] font-black italic">"Los resultados del trading implican riesgo. El desempeño pasado no garantiza resultados futuros."</p>
        </div>
    </section>
    `;
}

// ─── FOOTER (EDITABLE) ──────────────────────────────────────
export function renderPropFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || "Partner Oficial";
    const supportLink = brand.ctaLink || "#";

    return `
    <footer class="py-20 px-8 bg-[#020202] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div>
                    <div class="text-2xl font-black text-white mb-6 uppercase tracking-tighter italic">Bridge <span class="text-[#D4AF37]">Markets</span></div>
                    <p class="text-white/30 text-xs leading-relaxed uppercase tracking-widest font-black italic">Presentado por ${ibName}</p>
                </div>
                <div class="space-y-4">
                    <div class="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic">Contacto Corporativo</div>
                    <p class="text-sm text-white/60 font-medium italic">corporate@bridgemarkets.global</p>
                    <p class="text-sm text-white/60 font-medium italic">+1 (786) 979-3392</p>
                </div>
                <div class="space-y-4 text-right md:text-right">
                    <div class="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic">Portal Oficial</div>
                    <a href="https://www.bridgemarkets.global" class="text-sm text-white/60 hover:text-[#D4AF37] transition-colors block font-medium italic">www.bridgemarkets.global</a>
                    <a href="${supportLink}" class="text-sm text-white/60 hover:text-[#D4AF37] transition-colors block font-medium italic">Soporte del IB</a>
                </div>
            </div>
            <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-[10px] text-white/20 uppercase tracking-widest font-black italic">© 2026 Bridge Markets. Todos los derechos reservados.</p>
                <div class="flex gap-8">
                    <a href="#" class="text-[10px] text-white/20 uppercase tracking-widest hover:text-white transition-colors font-black italic">Aviso Legal</a>
                    <a href="#" class="text-[10px] text-white/20 uppercase tracking-widest hover:text-white transition-colors font-black italic">Privacidad</a>
                </div>
            </div>
        </div>
    </footer>`;
}

// ─── REGISTRATION FORM (OBSIDIAN & GOLD) ───────────────────
export function renderPropRegistration(content: Record<string, any>, brand: BrandConfig): string {
    const partnerId = brand.partnerId || "BM_GLOBAL";
    const isES = brand.language === 'ES';
    
    const dict = {
        title: isES ? 'Comienza tu Challenge' : 'Start your Challenge',
        sub: isES ? 'Regístrate para acceder a tu portal de trader y elegir tu cuenta.' : 'Register to access your trader portal and choose your account.',
        name: isES ? 'Nombre Completo' : 'Full Name',
        email: isES ? 'Correo Electrónico' : 'Email Address',
        phone: isES ? 'WhatsApp / Teléfono' : 'WhatsApp / Phone',
        btn: isES ? 'Crear Cuenta Ahora' : 'Create Account Now',
        disc: isES ? '* El trading implica riesgos. Invierte solo lo que puedas permitirte perder.' : '* Trading involves risk. Only invest what you can afford to lose.'
    };

    return `
    <section id="registro" class="py-32 px-8 bg-[#050505] relative overflow-hidden">
        <div class="absolute inset-0 z-0">
             <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#D4AF37]/5 blur-[150px] rounded-full"></div>
             <div class="absolute bottom-0 left-0 w-[500px] h-[500px] bg-white/5 blur-[150px] rounded-full"></div>
        </div>

        <div class="max-w-xl mx-auto relative z-10 section-reveal">
            <div class="bg-white/[0.02] border border-white/10 rounded-[3rem] p-10 md:p-16 backdrop-blur-3xl shadow-2xl">
                <div class="text-center mb-12">
                    <h2 class="text-4xl font-black font-headline text-white mb-4 uppercase italic">${dict.title}</h2>
                    <p class="text-white/40 text-sm font-medium italic">${dict.sub}</p>
                </div>
                
                <form id="landing-form" class="space-y-6" onsubmit="return false;">
                    <input type="hidden" name="partner_id" value="${partnerId}" />
                    <div>
                        <label class="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2 italic">${dict.name}</label>
                        <input name="name" type="text" class="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-colors focus:bg-white/10 italic" placeholder="John Doe" required />
                    </div>
                    <div>
                        <label class="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2 italic">${dict.email}</label>
                        <input name="email" type="email" class="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-colors focus:bg-white/10 italic" placeholder="john@example.com" required />
                    </div>
                    <div>
                        <label class="text-[10px] font-black text-white/40 uppercase tracking-widest block mb-2 italic">${dict.phone}</label>
                        <input name="phone" type="tel" class="w-full bg-white/5 border border-white/10 text-white placeholder:text-white/20 rounded-2xl p-5 focus:outline-none focus:border-[#D4AF37] transition-colors focus:bg-white/10 italic" placeholder="+1 234 567 8900" required />
                    </div>
                    <button type="submit" class="w-full py-5 bg-[#D4AF37] text-black font-black rounded-2xl shadow-xl transition-all hover:scale-[1.02] active:scale-95 text-lg uppercase tracking-widest mt-4 italic">${dict.btn}</button>
                    <p class="text-[10px] text-white/30 text-center italic mt-6 font-medium">${dict.disc}</p>
                </form>
            </div>
        </div>
    </section>

    <script>
        // Registration Logic
        document.getElementById('landing-form')?.addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = e.target.querySelector('button');
            const originalText = btn.innerText;
            btn.disabled = true;
            btn.innerText = '...';
            
            const formData = new FormData(e.target);
            const data = Object.fromEntries(formData.entries());
            
            try {
                const res = await fetch('https://crm.bridgemarkets.global/api/register', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                });
                
                if (res.ok) {
                    window.location.href = 'https://portal.bridgemarkets.global/register?partner=' + data.partner_id;
                } else {
                    alert('Error en el registro. Por favor intenta de nuevo.');
                    btn.disabled = false;
                    btn.innerText = originalText;
                }
            } catch (err) {
                console.error(err);
                // Fallback to direct redirect if API fails
                window.location.href = 'https://portal.bridgemarkets.global/register?partner=' + data.partner_id;
            }
        });
    </script>
    `;
}

