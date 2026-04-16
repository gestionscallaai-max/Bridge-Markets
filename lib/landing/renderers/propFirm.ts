import { BrandConfig } from '../types';

export function renderPropHero(content: Record<string, any>, brand: BrandConfig): string {
    const subtitle = content.ibPhrase || brand.heroPhrase || "Demuestra tu talento. Opera capital real. Cobra tus ganancias.";
    const ctaText = content.ctaText || "Empieza tu Challenge";
    const ctaLink = brand.ctaLink || "#register";
    const communityName = content.communityName || brand.communityName || brand.fullName || "Partner Certificado";
    
    return `
    <section class="relative min-h-[95vh] flex items-center pt-20 pb-32 px-8 overflow-hidden bg-[#050505]">
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[#0a0a0a] bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-5"></div>
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(134,91,255,0.15),transparent_50%)]"></div>
            <div class="absolute bottom-0 left-[20%] w-[500px] h-[500px] bg-[#865BFF]/10 rounded-full blur-[150px] animate-pulse pointer-events-none"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div class="section-reveal">
                <div class="flex items-center gap-4 mb-10 p-2 bg-white/5 border border-white/10 rounded-full w-fit pr-6 backdrop-blur-md">
                    <img src="/logo.png" alt="Bridge Markets" class="h-6 ml-4 opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    <div class="w-px h-5 bg-white/20"></div>
                    <span class="text-[9px] font-black text-[#865BFF] uppercase tracking-[0.4em]">Por ${communityName}</span>
                </div>

                <h1 class="text-6xl md:text-8xl lg:text-[7rem] font-black font-headline leading-[0.9] mb-8 tracking-tighter text-white uppercase drop-shadow-2xl">
                    TRADER <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#865BFF] to-white/50">FINANCIADO</span> <br>CERTIFICADO.
                </h1>
                
                <p class="text-xl md:text-2xl text-white/50 leading-relaxed max-w-xl mb-12 font-medium">
                    ${subtitle}
                </p>

                <div class="flex flex-col sm:flex-row gap-6 mb-16">
                    <a href="${ctaLink}" class="group relative px-12 py-6 bg-white text-black font-black rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(255,255,255,0.2)] hover:shadow-[0_0_60px_rgba(134,91,255,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-4">
                        <span class="relative z-10 text-xl uppercase tracking-tighter">${ctaText}</span>
                        <span class="material-symbols-outlined relative z-10 group-hover:translate-x-2 transition-transform">sports_score</span>
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#865BFF]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-500"></div>
                    </a>
                </div>

                <div class="flex items-center gap-6 p-6 bg-[#0a0a0a]/80 border border-white/5 rounded-3xl max-w-md backdrop-blur-xl group hover:border-[#865BFF]/30 transition-colors">
                    <div class="w-12 h-12 bg-[#050505] border border-white/10 rounded-full flex shrink-0 items-center justify-center text-[#865BFF] shadow-[0_0_15px_rgba(134,91,255,0.3)] group-hover:scale-110 transition-transform">
                        <span class="material-symbols-outlined">help</span>
                    </div>
                    <p class="text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                        ¿Qué es PropTrading? — <span class="text-white">Bridge Markets te financia</span> para operar en mercados reales.
                    </p>
                </div>
            </div>

            <div class="relative section-reveal lg:block hidden">
                <div class="absolute inset-0 bg-gradient-to-br from-[#865BFF]/30 to-transparent blur-[80px] rounded-full opacity-50"></div>
                <div class="relative z-10 glass-panel p-2 rounded-[3.5rem] border-white/10 bg-gradient-to-br from-white/10 to-transparent backdrop-blur-sm transform rotate-3 hover:rotate-0 transition-transform duration-700 shadow-2xl">
                    <div class="rounded-[3.3rem] overflow-hidden bg-[#050505] border border-[#865BFF]/20 flex justify-center items-center h-[550px] w-full relative group">
                         <div class="absolute inset-0 opacity-60 bg-[url('https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center mix-blend-overlay group-hover:scale-110 transition-transform duration-[10s]"></div>
                         <div class="absolute inset-0 bg-gradient-to-t from-[#050505] via-[#050505]/40 to-transparent"></div>
                         
                         <div class="relative z-10 flex flex-col items-center mt-32">
                            <span class="material-symbols-outlined text-[180px] text-white drop-shadow-[0_0_40px_rgba(134,91,255,0.8)] mb-6">chess</span>
                            <div class="px-6 py-2 border border-white/20 bg-black/50 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(134,91,255,0.3)]">
                                <p class="text-[10px] font-black text-white uppercase tracking-[0.4em]">Official Certification</p>
                            </div>
                         </div>
                    </div>
                </div>
                <div class="absolute -bottom-8 -left-12 glass-panel p-8 border-[#865BFF]/30 bg-[#050505]/90 backdrop-blur-2xl rotate-[-5deg] shadow-[0_20px_50px_rgba(0,0,0,0.8)] hover:rotate-0 transition-transform duration-500 rounded-3xl z-20">
                    <div class="flex items-center gap-4 mb-2">
                        <span class="material-symbols-outlined text-[#865BFF] text-3xl">verified_user</span>
                        <span class="text-sm font-black text-white uppercase tracking-widest leading-tight">Garantía<br>Institucional</span>
                    </div>
                    <p class="text-[9px] text-white/40 uppercase tracking-[0.3em] pl-11">BM Official Program</p>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderPropAbout(content: Record<string, any>, brand: BrandConfig): string {
    const items = [
        { icon: 'ads_click', title: 'Challenge', desc: 'Bridge Markets evalúa tu operativa a través de un Challenge simulado de alta precisión y condiciones estrictas en MetaTrader.' },
        { icon: 'account_balance', title: 'Flujo Institucional', desc: 'Si superas los objetivos, accedes a una Cuenta Financiada con capital certificado de la firma para operar sin arriesgar tu patrimonio personal.' },
        { icon: 'payments', title: 'Distribución 80/20', desc: 'Opera con el capital de la firma y cobra hasta el 80% de los beneficios generados en tus cuentas de trading certificadas.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0a0a] border-y border-white/5 relative overflow-hidden">
        <div class="absolute left-0 top-1/2 -translate-y-1/2 w-96 h-96 bg-[#865BFF]/5 rounded-full blur-[100px] pointer-events-none"></div>
        <div class="max-w-7xl mx-auto section-reveal relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
                ${items.map((item, i) => `
                    <div class="flex flex-col group p-8 lg:p-10 asym-card border border-white/5 bg-[#050505] hover:bg-white/5 transition-colors relative overflow-hidden">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-[#865BFF]/5 rounded-bl-[100px] transition-colors group-hover:bg-[#865BFF]/20 z-0"></div>
                        <div class="w-16 h-16 bg-[#0a0a0a] border border-white/10 rounded-2xl flex items-center justify-center text-[#865BFF] mb-8 group-hover:text-white group-hover:bg-[#865BFF] transition-all transform group-hover:rotate-6 shadow-xl relative z-10">
                            <span class="material-symbols-outlined text-3xl font-light">${item.icon}</span>
                        </div>
                        <h3 class="text-2xl font-black text-white mb-4 uppercase tracking-tighter relative z-10">${item.title}</h3>
                        <p class="text-sm text-white/40 leading-relaxed font-medium relative z-10">${item.desc}</p>
                        <div class="w-12 h-1 bg-[#865BFF]/20 mt-8 group-hover:w-full transition-all duration-500 relative z-10"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderPropMatrix(content: Record<string, any>, brand: BrandConfig): string {
    const ctaLink = brand.ctaLink || "#register";
    const renderGrid = (title: string, subtitle: string, plans: any[]) => `
        <div class="mb-32 last:mb-0 relative z-10">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
                <div>
                    <h3 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-2">${title}</h3>
                    <p class="text-[#865BFF] text-xs font-black uppercase tracking-[0.4em]">${subtitle}</p>
                </div>
                <div class="px-6 py-2 bg-[#865BFF]/10 border border-[#865BFF]/20 rounded-full flex items-center gap-2">
                    <span class="w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                    <span class="text-[9px] font-black text-white uppercase tracking-[0.3em] whitespace-nowrap">Datos Oficiales BM</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8">
                ${plans.map((p, idx) => `
                    <div class="glass-panel p-10 lg:p-14 asym-card border-${idx === 0 ? 'white/10' : '[#865BFF]/30'} bg-gradient-to-br from-[#0a0a0a] to-[#050505] hover:-translate-y-2 transition-transform duration-500 relative overflow-hidden group shadow-2xl">
                        ${idx === 1 ? `<div class="absolute top-0 right-0 px-6 py-1 bg-[#865BFF] font-black text-[9px] text-white uppercase tracking-widest rounded-bl-xl shadow-lg z-20">Popular</div>` : ''}
                        
                        <div class="absolute -right-20 -top-20 w-64 h-64 bg-[#865BFF]/5 rounded-full blur-3xl pointer-events-none group-hover:bg-[#865BFF]/10 transition-colors"></div>
                        
                        <div class="flex justify-between items-start mb-12 relative z-10">
                            <div>
                                <span class="px-4 py-1.5 bg-white/5 border border-white/10 rounded-full text-[9px] font-black text-white uppercase tracking-[0.3em] mb-6 block w-fit">${p.phases}</span>
                                <h4 class="text-4xl lg:text-5xl font-black text-white tracking-widest uppercase mb-1">${p.name}</h4>
                            </div>
                            <div class="text-right pl-4">
                                <span class="text-[9px] font-bold text-[#865BFF] uppercase tracking-[0.3em] block mb-2">Profit Split</span>
                                <span class="text-4xl lg:text-5xl font-black text-white drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">${p.split}</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-y-10 gap-x-12 mb-16 relative z-10">
                            ${[
                                ['Objetivo F1', p.obj1],
                                ['Objetivo F2', p.obj2],
                                ['Pérdida Total', p.lossT, 'text-rose-500'],
                                ['Pérdida Diaria', p.lossD, 'text-rose-500'],
                                ['Días Mínimos', '5 / 7 Días'],
                                ['Retiros', 'Cada 14 Días', 'text-emerald-400']
                            ].map(item => `
                                <div class="pb-4 border-b border-white/5 group-hover:border-white/10 transition-colors">
                                    <p class="text-[10px] font-bold text-white/30 uppercase tracking-widest mb-2">${item[0]}</p>
                                    <p class="text-xl lg:text-2xl font-black ${item[2] || 'text-white'}">${item[1]}</p>
                                </div>
                            `).join('')}
                        </div>

                        <a href="${ctaLink}" class="w-full relative px-8 py-5 block ${idx === 1 ? 'bg-[#865BFF] text-white' : 'bg-white text-black'} font-black text-center uppercase text-sm tracking-[0.2em] rounded-xl hover:scale-[1.02] transition-all shadow-xl z-10 overflow-hidden">
                            <span class="relative z-10">Comprar Reto ${p.name}</span>
                        </a>
                        <p class="text-center mt-6 text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] relative z-10">Certificación Trader Financiado Incluida</p>
                    </div>
                `).join('')}
            </div>
        </div>
    `;

    const forexPlans = [
        { name: 'OBSIDIAN', phases: '1 Fase evaluación', obj1: '8%', obj2: 'N/A', lossT: '8%', lossD: '4%', split: '80%' },
        { name: 'BASALT', phases: '2 Fases evaluación', obj1: '8%', obj2: '8%', lossT: '10%', lossD: '5%', split: '80%' }
    ];

    const sntPlans = [
        { name: 'ELITE', phases: '1 Fase evaluación', obj1: '8%', obj2: 'N/A', lossT: '8%', lossD: '4%', split: '80%' },
        { name: 'ULTRA', phases: '2 Fases evaluación', obj1: '4%', obj2: '8%', lossT: '10%', lossD: '5%', split: '80%' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505] relative overflow-hidden">
        <div class="absolute top-[20%] right-0 w-[800px] h-screen bg-[#865BFF]/5 skew-y-12 pointer-events-none"></div>
        <div class="max-w-7xl mx-auto relative z-10 section-reveal">
            <div class="text-center mb-32">
                <h2 class="text-5xl md:text-7xl font-black font-headline text-white mb-6 uppercase tracking-tighter">Elije tu <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#865BFF]">Programa</span></h2>
                <div class="inline-flex items-center gap-4 bg-white/5 border border-white/10 px-6 py-2 rounded-full backdrop-blur-md">
                    <span class="material-symbols-outlined text-[#865BFF] animate-pulse">public</span>
                    <p class="text-xs font-black text-white uppercase tracking-[0.5em]">Professional Funded Account Ecosystem</p>
                </div>
            </div>

            ${renderGrid('Forex & CFDs', 'Institutional Liquidity Market', forexPlans)}
            <div class="my-24 h-px w-full bg-gradient-to-r from-transparent via-[#865BFF]/20 to-transparent"></div>
            ${renderGrid('Synthetic Indices', '24/7 Algorithmic Trading', sntPlans)}

            <div class="mt-20 p-8 md:p-12 glass-panel border-[#865BFF]/20 bg-[#865BFF]/5 text-center max-w-4xl mx-auto rounded-[2rem]">
                <p class="text-sm font-bold text-white/50 leading-relaxed uppercase tracking-widest">
                    *Los precios varían según el tamaño de la cuenta seleccionada en el portal. <br>
                    <span class="text-white mt-2 block font-black border-t border-white/10 pt-4">Bridge Markets no cobra comisiones ocultas en la compra de retos.</span>
                </p>
            </div>
        </div>
    </section>`;
}

export function renderPropWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { title: 'Elige el Plan', desc: 'Selecciona Forex (Obsidian/Basalt) o Synthetic (Elite/Ultra).' },
        { title: 'Supera el Reto', desc: 'Cumple los objetivos de beneficio respetando los límites de pérdida.' },
        { title: 'Verificación', desc: 'Nuestro equipo valida tu consistencia y cumplimiento de reglas.' },
        { title: 'FONDEO REAL', desc: 'Recibe tu cuenta certificada y empieza a retirar beneficios al 80%.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div class="max-w-7xl mx-auto relative z-10">
            <h2 class="text-4xl md:text-6xl font-black text-white mb-24 text-center uppercase tracking-tighter section-reveal">Camino a la <br><span class="text-[#865BFF]">Certificación</span></h2>
            
            <div class="relative">
                <div class="hidden lg:block absolute top-[60px] left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-[#865BFF]/30 to-transparent z-0"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
                    ${steps.map((s, i) => `
                        <div class="section-reveal group" style="animation-delay: ${i * 0.1}s">
                            <div class="flex flex-col items-center lg:items-start p-8 asym-card bg-[#050505] border border-white/5 hover:border-[#865BFF]/40 hover:-translate-y-2 transition-all h-full shadow-2xl">
                                <div class="w-20 h-20 rounded-[1.5rem] bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-3xl font-black text-white mb-8 group-hover:border-[#865BFF] group-hover:bg-[#865BFF] transition-all shadow-[0_0_20px_rgba(0,0,0,0.5)]">
                                    0${i + 1}
                                </div>
                                <h3 class="text-xl lg:text-2xl font-black text-white mb-4 uppercase tracking-tighter leading-tight group-hover:text-[#865BFF] transition-colors text-center lg:text-left">${s.title}</h3>
                                <p class="text-sm text-white/40 leading-relaxed font-medium text-center lg:text-left">${s.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>`;
}

export function renderPropRules(content: Record<string, any>, brand: BrandConfig): string {
    const rules = [
        { icon: 'timer', title: 'Duración Mínima', desc: '2 min (FX) / 3 min (SNT) por operación.' },
        { icon: 'shield', title: 'SL Obligatorio', desc: 'Obligatorio en fase financiada (máx 2 min).' },
        { icon: 'analytics', title: 'Consistencia (30%)', desc: 'Ninguna operación > 30% del beneficio neto.' },
        { icon: 'content_copy', title: 'Copy Trading', desc: 'Solo permitido entre cuentas propias (máx 5).' },
        { icon: 'gavel', title: 'Prohibiciones', desc: 'All-in, Grid, Martingala y Arbitraje prohibidos.' },
        { icon: 'campaign', title: 'Noticias', desc: 'Cierre prohibido 5 min antes/después de alta volatilidad.' },
        { icon: 'public', title: 'Regla de IP', desc: 'KYC e IP deben coincidir estrictamente. VPN no permitida.' },
        { icon: 'format_list_numbered', title: 'Límites', desc: 'Máx 5 posiciones por par / 30 lotes totales en todo momento.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="flex flex-col lg:flex-row justify-between items-end gap-12 mb-20 bg-[#0a0a0a] p-10 asym-card border border-white/5">
                <div class="max-w-2xl">
                    <div class="flex items-center gap-3 mb-6">
                        <span class="w-3 h-3 bg-rose-500 rounded-full animate-pulse"></span>
                        <span class="text-[10px] text-rose-500 uppercase tracking-[0.4em] font-black">Reglas Estrictas</span>
                    </div>
                    <h2 class="text-4xl md:text-6xl font-black text-white uppercase tracking-tighter mb-6">Protocolos de <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-rose-500 to-orange-400">Riesgo</span></h2>
                    <p class="text-white/50 font-medium text-lg">Reglas oficiales diseñadas para proteger la liquidez institucional de la firma y fomentar hábitos del trader profesional.</p>
                </div>
                <div class="lg:text-right w-full lg:w-auto p-6 bg-[#050505] rounded-2xl border border-white/10">
                    <span class="material-symbols-outlined text-[40px] text-white/20 mb-4 block lg:inline-block">gavel</span>
                    <span class="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] block mb-2">Bridge Markets Compliance</span>
                    <span class="text-sm font-black text-white uppercase tracking-widest">Tolerancia Cero a Fraude</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${rules.map(r => `
                    <div class="glass-panel p-10 asym-card border-white/5 bg-[#0a0a0a]/80 hover:border-[#865BFF]/30 hover:bg-[#865BFF]/5 transition-all group overflow-hidden relative shadow-lg">
                        <div class="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-10 group-hover:scale-150 transition-all duration-700">
                            <span class="material-symbols-outlined text-[100px] text-white">${r.icon}</span>
                        </div>
                        <div class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center text-white mb-6 group-hover:text-[#865BFF] transition-colors relative z-10">
                            <span class="material-symbols-outlined">${r.icon}</span>
                        </div>
                        <h3 class="text-sm font-black text-white uppercase tracking-[0.2em] mb-4 relative z-10">${r.title}</h3>
                        <p class="text-xs text-white/50 leading-relaxed font-bold relative z-10">${r.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderPropBenefits(content: Record<string, any>, brand: BrandConfig): string {
    const perks = [
        'Insignia Oficial de Trader Financiado',
        'Acceso a Pool de Liquidez Directa A-Book',
        'Validación bajo Estándar Institucional Estricto',
        'Distribución de Ganancias cada 14 días (Bimensual)',
        'Profit Split Fijo en 80% (Sin escalados confusos)'
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0a0a] relative overflow-hidden border-t border-white/5">
        <div class="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[600px] bg-[#865BFF]/5 blur-[200px] rounded-full z-0 pointer-events-none"></div>
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 section-reveal relative z-10">
            <div class="lg:w-1/2">
                <div class="h-1 w-20 bg-[#865BFF] mb-12 rounded-full"></div>
                <h2 class="text-5xl md:text-7xl font-black text-white mb-10 uppercase tracking-tighter leading-[0.9]">Beneficios de la <br><span class="text-[#865BFF]">Certificación</span></h2>
                <div class="space-y-8">
                    ${perks.map(p => `
                        <div class="flex items-start gap-6 group">
                            <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white group-hover:bg-[#865BFF] group-hover:border-[#865BFF] transition-all shrink-0 mt-1">
                                <span class="material-symbols-outlined text-[10px] font-black">done</span>
                            </div>
                            <span class="text-lg font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight leading-relaxed">${p}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="lg:w-1/2 relative w-full">
                <div class="glass-panel p-16 asym-card border border-white/10 bg-gradient-to-br from-white/5 to-[#050505] relative z-10 text-center shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)] backdrop-blur-2xl">
                    <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-20 Mix-blend-overlay"></div>
                    <div class="w-32 h-32 bg-[#050505] border-4 border-[#865BFF] mx-auto rounded-full flex items-center justify-center text-white mb-10 shadow-[0_0_60px_rgba(134,91,255,0.4)] relative z-10">
                        <span class="material-symbols-outlined text-[60px]">shield_person</span>
                        <div class="absolute -right-2 -top-2 w-8 h-8 bg-emerald-500 rounded-full border-4 border-[#050505] flex items-center justify-center"><span class="material-symbols-outlined text-black text-[12px] font-black">check</span></div>
                    </div>
                    <h3 class="text-4xl font-black text-white mb-6 uppercase tracking-tighter relative z-10">Trader Verificado</h3>
                    <div class="flex items-center justify-center gap-3 relative z-10">
                        <span class="w-1.5 h-1.5 bg-[#865BFF] rounded-full"></span>
                        <p class="text-white/40 text-[10px] font-black uppercase tracking-[0.5em]">Bridge Markets Elite Program</p>
                        <span class="w-1.5 h-1.5 bg-[#865BFF] rounded-full"></span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderPropCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const communityName = content.communityName || brand.communityName || brand.fullName;
    const message = content.welcomeMessage || brand.heroPhrase || "Únete a nuestra comunidad y deja que Bridge Markets financie tu talento.";
    const telegram = content.telegramLink || brand.telegram || "#";
    const whatsapp = content.whatsappNumber || brand.whatsapp || "#";
    const instagram = content.instagramUrl || brand.instagram || "#";
    
    return `
    <section class="py-32 px-8 bg-[#050505] relative section-reveal overflow-hidden">
        <div class="max-w-5xl mx-auto bg-[#0a0a0a]/80 border border-white/5 p-12 md:p-24 asym-card relative z-10 group shadow-2xl backdrop-blur-3xl hover:border-white/10 transition-colors">
            <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.03),transparent_60%)]"></div>
            <div class="absolute top-0 right-0 w-64 h-64 bg-[#865BFF]/10 rounded-full blur-[80px] -mr-32 -mt-32"></div>

            <div class="text-center relative z-10">
                <div class="relative w-32 h-32 mx-auto mb-12">
                   <div class="absolute inset-0 bg-white/5 animate-pulse rounded-full"></div>
                   <div class="relative w-full h-full bg-[#050505] rounded-full border-2 border-white/10 flex items-center justify-center text-5xl text-white font-black overflow-hidden group-hover:border-white/30 transition-colors">
                        ${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="IB Logo" class="w-full h-full object-cover">` : communityName.charAt(0)}
                   </div>
                </div>
                
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-8 uppercase tracking-tighter">Comunidad <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#865BFF]">${communityName}</span></h2>
                
                <div class="mx-auto mb-16 text-center max-w-2xl">
                   <p class="text-xl text-white/50 leading-relaxed font-medium italic">"${message}"</p>
                </div>
                
                <div class="flex flex-wrap justify-center gap-6">
                    ${telegram && telegram !== '#' ? `<a href="${telegram}" target="_blank" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-[#229ED9] hover:border-[#229ED9] transition-all shadow-lg text-sm uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[#229ED9]"></span>Telegram</a>` : ''}
                    ${whatsapp && whatsapp !== '#' ? `<a href="${whatsapp.includes('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/\D/g,'')}`}" target="_blank" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-[#25D366] hover:border-[#25D366] transition-all shadow-lg text-sm uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[#25D366]"></span>WhatsApp</a>` : ''}
                    ${instagram && instagram !== '#' ? `<a href="${instagram.includes('http') ? instagram : `https://instagram.com/${instagram.replace('@','')}`}" target="_blank" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:to-[#ee2a7b] transition-all shadow-lg text-sm uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[#ee2a7b]"></span>Instagram</a>` : ''}
                </div>
            </div>
        </div>
    </section>`;
}

export function renderPropFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿OBSIDIAN o BASALT?', a: 'OBSIDIAN: 1 sola fase de evaluación para fondeo rápido. BASALT: 2 fases con reglas ligeramente más holgadas para gestión progresiva.' },
        { q: 'Distribución de Beneficios', a: 'Bridge Markets ofrece hasta un 80% fijo de profit split sobre las ganancias generadas, sin comisiones ocultas.' },
        { q: 'Tiempo de Retiro', a: 'Puedes solicitar tus pagos cada 14 días calendario si cumples con todas las métricas de consistencia.' },
        { q: '¿Necesito mi propio dinero tras ser fondeado?', a: 'No, operarás exclusivamente con el capital de liquidez provisto por Bridge Markets PropFirm.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0a0a] border-t border-white/5">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-20 text-center uppercase tracking-tighter">Consultas <span class="text-white/50">Técnicas</span></h2>
            <div class="grid grid-cols-1 gap-4">
                ${faqs.map(f => `
                    <div class="bg-[#050505] border border-white/5 p-8 md:px-10 asym-card hover:border-[#865BFF]/40 hover:bg-white/5 transition-all group cursor-pointer">
                        <div class="flex justify-between items-center text-left">
                            <span class="text-sm md:text-base font-black text-white uppercase tracking-widest group-hover:text-white transition-colors pr-8 leading-relaxed">${f.q}</span>
                            <span class="material-symbols-outlined text-white/20 group-hover:text-[#865BFF] group-hover:rotate-180 transition-all">add</span>
                        </div>
                        <div class="mt-0 pt-0 opacity-0 max-h-0 overflow-hidden group-hover:mt-6 group-hover:pt-6 group-hover:opacity-100 group-hover:max-h-96 border-t border-white/0 group-hover:border-white/10 transition-all duration-500 ease-in-out">
                            <p class="text-sm text-white/50 leading-relaxed font-medium">${f.a}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderPropCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaLink = brand.ctaLink || "#register";
    return `
    <section class="py-40 bg-[#050505] relative overflow-hidden section-reveal">
        <div class="absolute inset-0 z-0">
             <div class="absolute inset-0 bg-[#865BFF]/5 bg-[url('https://www.transparenttextures.com/patterns/crossed-stripes.png')] opacity-10"></div>
             <div class="absolute bottom-0 left-[50%] -translate-x-[50%] w-full max-w-4xl h-full bg-[#865BFF]/10 rounded-t-full blur-[120px] pointer-events-none"></div>
        </div>
        
        <div class="max-w-6xl mx-auto px-8 relative z-10 text-center text-white">
            <h2 class="text-6xl md:text-8xl lg:text-[7rem] font-black font-headline mb-16 uppercase tracking-tighter leading-[0.9]">DOMINA EL <br><span class="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#865BFF] italic">MERCADO</span></h2>
            
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full max-w-4xl mx-auto mb-16">
                ${['OBSIDIAN', 'BASALT', 'ELITE', 'ULTRA'].map(p => `
                    <a href="${ctaLink}" class="px-6 py-8 asym-card border border-white/10 bg-[#0a0a0a]/80 text-white hover:bg-white/10 hover:text-black font-black text-sm tracking-widest transition-all text-center uppercase shadow-xl hover:-translate-y-2 group backdrop-blur-md">
                        <span class="block text-[9px] text-[#865BFF] uppercase tracking-[0.3em] mb-2 group-hover:text-black/50">Challenge Plan</span>
                        QUIERO ${p}
                    </a>
                `).join('')}
            </div>
            
            <p class="text-[10px] text-white/30 uppercase tracking-[0.4em] font-black max-w-2xl mx-auto">Selecciona tu programa en el portal de cliente. BridgeMarkets LTD.</p>
        </div>
    </section>`;
}

export function renderPropFooter(content: Record<string, any>, brand: BrandConfig): string {
    const year = new Date().getFullYear();
    const communityName = content.communityName || brand.communityName || brand.fullName;
    
    return `
    <footer class="py-24 bg-[#050505] text-white px-8 border-t border-white/5 relative z-10">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div class="md:col-span-2">
                <img src="/logo.png" alt="Bridge Markets" class="h-8 mb-10 opacity-60 grayscale">
                <p class="text-[10px] text-white/20 max-w-sm leading-relaxed uppercase tracking-[0.2em] font-bold">
                    Infraestructura de Grado Mercantil. Bridge Markets Certification Program es un proveedor de evaluación y fondeo simulado.
                </p>
            </div>
            <div class="md:col-start-4">
                <h4 class="text-[9px] font-black text-white/30 uppercase tracking-[0.5em] mb-8">Partner Certificado</h4>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-white/50">${communityName.charAt(0)}</div>
                    <span class="text-[11px] font-black text-white/50 uppercase tracking-widest">${communityName}</span>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p class="text-[9px] font-black text-white/20 uppercase tracking-[0.5em] text-center md:text-left">© ${year} BRIDGE MARKETS GLOBAL. ALL RIGHTS RESERVED.</p>
            <div class="flex gap-4">
                <p class="text-[9px] font-black text-emerald-500/50 uppercase tracking-widest"><span class="w-1.5 h-1.5 bg-emerald-500 rounded-full inline-block mr-2"></span>Systems Operational</p>
            </div>
        </div>
    </footer>`;
}
