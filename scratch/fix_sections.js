const fs = require('fs');
const path = require('path');

const filePath = 'c:\\Users\\dilan\\Desktop\\Nueva carpeta\\partner-dashboard\\lib\\landing-sections.ts';
let content = fs.readFileSync(filePath, 'utf8');

// The marker line before the corruption
const marker = "// ─── RENDER: prop_hero (Section 1) ───────────────────────────";
const index = content.indexOf(marker);

if (index !== -1) {
    const head = content.substring(0, index);
    
    // The clean code to append
    const cleanCode = `// ─── RENDER: prop_hero (Section 1) ───────────────────────────
export function renderPropHero(content, brand) {
    const subtitle = brand.heroPhrase || "Demuestra tu talento. Opera capital real. Cobra tus ganancias.";
    const ctaText = content.ctaText || "Empieza tu Challenge";
    const ctaLink = brand.ctaLink || "#register";
    
    return \`
    <section class="relative min-h-[90vh] flex items-center pt-20 pb-32 px-8 overflow-hidden bg-[#050505]">
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
            <div class="absolute inset-0 bg-[linear-gradient(rgba(59,130,246,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.03)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div class="section-reveal">
                <div class="flex items-center gap-4 mb-12">
                    <img src="https://bridgemarkets.global/wp-content/uploads/2023/06/Logo-Bridge-Markets-Horizontal-Blanco.png" alt="Bridge Markets" class="h-8">
                    <div class="w-px h-6 bg-white/20"></div>
                    <div class="flex items-center gap-2">
                        <span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em]">Official Partner</span>
                        <span class="text-[10px] font-bold text-white/40 uppercase tracking-widest">/ por \${brand.communityName || brand.fullName}</span>
                    </div>
                </div>

                <h1 class="text-6xl md:text-8xl font-black font-headline leading-[0.9] mb-8 tracking-tighter text-white uppercase">
                    TRADER <span class="text-blue-500">FINANCIADO</span> <br>CERTIFICADO.
                </h1>
                
                <p class="text-xl md:text-2xl text-white/40 leading-relaxed max-w-xl mb-12 font-medium">
                    \${subtitle}
                </p>

                <div class="flex flex-col sm:flex-row gap-6 mb-16">
                    <a href="\${ctaLink}" class="group relative px-14 py-7 bg-blue-600 text-white font-black rounded-xl overflow-hidden shadow-[0_0_40px_rgba(59,130,246,0.3)] hover:shadow-[0_0_60px_rgba(59,130,246,0.5)] transition-all">
                        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                        <span class="relative z-10 text-2xl uppercase tracking-tighter">\${ctaText}</span>
                    </a>
                </div>

                <div class="flex items-center gap-6 p-6 bg-white/5 border border-white/10 rounded-2xl max-w-md backdrop-blur-md">
                    <div class="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white">
                        <span class="material-symbols-outlined">help</span>
                    </div>
                    <p class="text-xs font-bold text-white/60 uppercase tracking-widest leading-relaxed">
                        ¿Qué es PropTrading? — <span class="text-white">Bridge Markets te financia</span> para operar en mercados reales.
                    </p>
                </div>
            </div>

            <div class="relative section-reveal lg:block hidden">
                <div class="relative z-10 glass-panel p-2 rounded-[2rem] border-white/10 bg-gradient-to-br from-white/10 to-transparent">
                    <div class="rounded-[1.8rem] overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1644659513001-9221526016f6?q=80&w=2070&auto=format&fit=crop" alt="Institutional Trading" class="w-full h-auto grayscale brightness-50 contrast-125">
                    </div>
                </div>
                <div class="absolute -bottom-10 -left-10 glass-panel p-8 border-blue-500/30 bg-black/80 backdrop-blur-xl rotate-[-2deg] shadow-2xl">
                    <div class="flex items-center gap-4 mb-2">
                        <span class="material-symbols-outlined text-blue-500">verified_user</span>
                        <span class="text-xs font-black text-white uppercase tracking-widest">Garantía de Pago</span>
                    </div>
                    <p class="text-[10px] text-white/40 uppercase tracking-widest">Insignia Oficial Bridge Markets 2026</p>
                </div>
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_about (Section 2) ──────────────────────────
export function renderPropAbout(content, brand) {
    const items = [
        { icon: 'ads_click', title: 'Challenge Evaluación', desc: 'Bridge Markets evalúa tu operativa a través de un Challenge simulado de alta precisión.' },
        { icon: 'account_balance', title: 'Flujo Institucional', desc: 'Si superas los objetivos, accedes a una Cuenta Financiada con capital certificado.' },
        { icon: 'payments', title: 'Distribución 80/20', desc: 'Opera con el capital de la firma y cobra hasta el 80% de los beneficios generados.' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#0a0a0a] border-y border-white/5">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-16">
                \${items.map((item, i) => \`
                    <div class="flex flex-col group">
                        <div class="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-blue-500 mb-8 group-hover:bg-blue-600 group-hover:text-white transition-all transform group-hover:rotate-6">
                            <span class="material-symbols-outlined text-3xl font-light">\${item.icon}</span>
                        </div>
                        <h3 class="text-2xl font-black text-white mb-4 uppercase tracking-tighter">\${item.title}</h3>
                        <p class="text-sm text-white/30 leading-relaxed font-medium">\${item.desc}</p>
                        <div class="w-12 h-1 bg-blue-500/20 mt-8 group-hover:w-full transition-all duration-500"></div>
                    </div>
                \`).join('')}
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_matrix (Section 3) ──────────────────────────
export function renderPropMatrix(content, brand) {
    const renderGrid = (title, subtitle, plans) => \`
        <div class="mb-32 last:mb-0">
            <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-8 border-b border-white/10">
                <div>
                    <h3 class="text-4xl font-black text-white uppercase tracking-tighter mb-2">\${title}</h3>
                    <p class="text-blue-500 text-xs font-black uppercase tracking-[0.4em]">\${subtitle}</p>
                </div>
                <div class="px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full">
                    <span class="text-[9px] font-black text-blue-400 uppercase tracking-widest whitespace-nowrap">🔒 Datos Oficiales BM</span>
                </div>
            </div>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-1px bg-white/5 border border-white/10 overflow-hidden rounded-2xl">
                \${plans.map(p => \`
                    <div class="bg-[#050505] p-12 hover:bg-[#0a0a0a] transition-colors group">
                        <div class="flex justify-between items-start mb-12">
                            <div>
                                <span class="px-3 py-1 bg-white/5 rounded text-[10px] font-black text-white/40 uppercase tracking-widest mb-4 block w-fit">\${p.phases}</span>
                                <h4 class="text-5xl font-black text-white tracking-widest uppercase">\${p.name}</h4>
                            </div>
                            <div class="text-right">
                                <span class="text-[9px] font-bold text-white/20 uppercase tracking-[0.3em] block mb-2">Profit Split</span>
                                <span class="text-4xl font-black text-blue-500">\${p.split}</span>
                            </div>
                        </div>

                        <div class="grid grid-cols-2 gap-y-8 gap-x-12 mb-16">
                            <div class="pb-4 border-b border-white/5">
                                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Objetivo F1</p>
                                <p class="text-xl font-black text-white">\${p.obj1}</p>
                            </div>
                            <div class="pb-4 border-b border-white/5">
                                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Objetivo F2</p>
                                <p class="text-xl font-black text-white">\${p.obj2}</p>
                            </div>
                            <div class="pb-4 border-b border-white/5">
                                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Pérdida Total</p>
                                <p class="text-xl font-black text-rose-500">\${p.lossT}</p>
                            </div>
                            <div class="pb-4 border-b border-white/5">
                                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Pérdida Diaria</p>
                                <p class="text-xl font-black text-rose-500">\${p.lossD}</p>
                            </div>
                            <div class="pb-4 border-b border-white/5">
                                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Días Mínimos</p>
                                <p class="text-xl font-black text-white">5 / 7 Días</p>
                            </div>
                            <div class="pb-4 border-b border-white/5">
                                <p class="text-[10px] font-bold text-white/20 uppercase tracking-widest mb-2">Retiros</p>
                                <p class="text-xl font-black text-emerald-500">Cada 14 Días</p>
                            </div>
                        </div>

                        <a href="\${brand.ctaLink || '#register'}" class="w-full block py-6 bg-blue-600 text-white font-black text-center uppercase text-sm tracking-[0.2em] rounded-xl hover:bg-blue-500 transition-all shadow-lg group-hover:scale-[1.02]">
                            Comprar Reto \${p.name}
                        </a>
                        <p class="text-center mt-6 text-[9px] font-bold text-white/10 uppercase tracking-[0.3em]">Certificación Trader Financiado Incluida</p>
                    </div>
                \`).join('')}
            </div>
        </div>
    \`;

    const forexPlans = [
        { name: 'OBSIDIAN', phases: '1 Fase evaluación', obj1: '8%', obj2: 'N/A', lossT: '8%', lossD: '4%', split: '80%' },
        { name: 'BASALT', phases: '2 Fases evaluación', obj1: '8%', obj2: '8%', lossT: '10%', lossD: '5%', split: '70%' }
    ];

    const sntPlans = [
        { name: 'ELITE', phases: '1 Fase evaluación', obj1: '8%', obj2: 'N/A', lossT: '8%', lossD: '4%', split: '80%' },
        { name: 'ULTRA', phases: '2 Fases evaluación', obj1: '4%', obj2: '8%', lossT: '10%', lossD: '5%', split: '70%' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#050505] relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10 section-reveal">
            <div class="text-center mb-32">
                <h2 class="text-5xl md:text-7xl font-black font-headline text-white mb-6 uppercase tracking-tighter">Elije tu <span class="text-blue-500">Programa</span></h2>
                <p class="text-xs font-black text-white/20 uppercase tracking-[0.6em]">Professional Funded Account Ecosystem</p>
            </div>

            \${renderGrid('Forex & CFDs', 'Institutional Liquidity Market', forexPlans)}
            <div class="my-24 h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>
            \${renderGrid('Synthetic Indices', '24/7 Algorithmic Trading', sntPlans)}

            <div class="mt-20 p-8 glass-panel border-white/5 bg-white/5 text-center max-w-4xl mx-auto rounded-3xl">
                <p class="text-sm font-bold text-white/40 leading-relaxed italic uppercase tracking-widest">
                    *Los precios varían según el tamaño de la cuenta seleccionada en el portal. <br>
                    <span class="text-blue-500/50">Bridge Markets no cobra comisiones ocultas en la compra de retos.</span>
                </p>
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_workflow (Section 4) ───────────────────────
export function renderPropWorkflow(content, brand) {
    const steps = [
        { title: 'Elige el Plan', desc: 'Selecciona Forex (Obsidian/Basalt) o Synthetic (Elite/Ultra).' },
        { title: 'Supera el Reto', desc: 'Cumple los objetivos de beneficio respetando los límites de pérdida.' },
        { title: 'Verificación', desc: 'Nuestro equipo valida tu consistencia y cumplimiento de reglas.' },
        { title: 'FONDEO REAL', desc: 'Recibe tu cuenta certificada y empieza a retirar beneficios.' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#050505] relative overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
            <h2 class="text-4xl md:text-5xl font-black text-white mb-24 text-center uppercase tracking-tighter section-reveal">Camino a la <span class="text-blue-500">Certificación</span></h2>
            
            <div class="relative">
                <div class="hidden lg:block absolute top-[60px] left-0 w-full h-1 bg-gradient-to-r from-transparent via-blue-500/20 to-transparent z-0"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 relative z-10">
                    \${steps.map((s, i) => \`
                        <div class="section-reveal group" style="animation-delay: \${i * 0.15}s">
                            <div class="flex flex-col items-center lg:items-start">
                                <div class="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center text-2xl font-black text-white mb-8 group-hover:border-blue-500 group-hover:bg-blue-600 transition-all shadow-xl">
                                    \${i + 1}
                                </div>
                                <h3 class="text-xl font-black text-white mb-4 uppercase tracking-widest leading-tight group-hover:text-blue-500 transition-colors">\${s.title}</h3>
                                <p class="text-sm text-white/30 leading-relaxed font-medium text-center lg:text-left">\${s.desc}</p>
                            </div>
                        </div>
                    \`).join('')}
                </div>
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_rules (Section 5) ──────────────────────────
export function renderPropRules(content, brand) {
    const rules = [
        { icon: 'schedule', title: 'Duración Mínima', desc: '2 min (FX) / 3 min (SNT) por operación.' },
        { icon: 'emergency_home', title: 'SL Obligatorio', desc: 'Obligatorio en fase financiada (máx 2 min).' },
        { icon: 'analytics', title: 'Consistencia (30%)', desc: 'Ninguna operación > 30% del beneficio neto.' },
        { icon: 'content_copy', title: 'Copy Trading', desc: 'Solo entre cuentas propias (máx 5 cuentas).' },
        { icon: 'block', title: 'Prohibiciones', desc: 'All-in, Grid, Martingala y Arbitraje prohibidos.' },
        { icon: 'campaign', title: 'Noticias', desc: 'Cierre prohibido 5 min antes/después de noticias.' },
        { icon: 'language', title: 'Regla de IP', desc: 'KYC e IP deben coincidir. VPN no permitida.' },
        { icon: 'format_list_numbered', title: 'Límites', desc: 'Máx 5 posiciones por par / 30 lotes totales.' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#0a0a0a]">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="flex flex-col md:flex-row justify-between items-end gap-8 mb-20">
                <div class="max-w-xl">
                    <h2 class="text-4xl md:text-5xl font-black text-white uppercase tracking-tighter mb-4">Protocolos de <span class="text-blue-500">Riesgo</span></h2>
                    <p class="text-white/30 font-medium">Reglas oficiales 2026 diseñadas para proteger la liquidez de la firma y el capital del trader.</p>
                </div>
                <div class="hidden lg:block text-right">
                    <span class="text-[10px] font-black text-white/20 uppercase tracking-[0.5em] block mb-2">Bridge Markets Compliance</span>
                    <span class="text-xs font-bold text-blue-500 uppercase tracking-widest">Tolerancia Cero a Malas Prácticas</span>
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                \${rules.map(r => \`
                    <div class="glass-panel p-10 border-white/5 bg-[#050505] hover:border-blue-500/30 transition-all group overflow-hidden relative">
                        <div class="absolute top-0 right-0 p-4 opacity-5 group-hover:rotate-12 transition-transform">
                            <span class="material-symbols-outlined text-[60px] text-blue-500">\${r.icon}</span>
                        </div>
                        <h3 class="text-xs font-black text-white uppercase tracking-[0.2em] mb-4 relative z-10">\${r.title}</h3>
                        <p class="text-[11px] text-white/40 leading-relaxed font-bold relative z-10">\${r.desc}</p>
                    </div>
                \`).join('')}
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_benefits (Section 6) ───────────────────────
export function renderPropBenefits(content, brand) {
    const perks = [
        'Insignia Oficial de Trader Financiado',
        'Acceso a Pool de Liquidez Directa',
        'Validación bajo Estándar Institucional',
        'Distribución de Ganancias cada 14 días',
        'Profit Split Escalable hasta 80%'
    ];

    return \`
    <section class="py-32 px-8 bg-[#050505] relative">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-24 section-reveal">
            <div class="lg:w-1/2">
                <div class="h-px w-20 bg-blue-500 mb-12"></div>
                <h2 class="text-4xl md:text-7xl font-black text-white mb-10 uppercase tracking-tighter leading-none">Beneficios de la <span class="text-blue-500">Certificación</span></h2>
                <div class="space-y-8">
                    \${perks.map(p => \`
                        <div class="flex items-center gap-6 group">
                            <div class="w-8 h-8 rounded-full border border-blue-500/30 flex items-center justify-center text-blue-500 group-hover:bg-blue-500 group-hover:text-white transition-all shadow-[0_0_15px_rgba(59,130,246,0.2)]">
                                <span class="material-symbols-outlined text-sm">check</span>
                            </div>
                            <span class="text-xl font-bold text-white/60 group-hover:text-white transition-colors uppercase tracking-tight">\${p}</span>
                        </div>
                    \`).join('')}
                </div>
            </div>
            <div class="lg:w-1/2 relative">
                <div class="glass-panel p-16 border-white/10 bg-gradient-to-br from-white/5 to-transparent relative z-10 text-center rounded-[3rem_1rem_3rem_1rem]">
                    <div class="w-24 h-24 bg-blue-500 mx-auto rounded-full flex items-center justify-center text-white mb-10 shadow-[0_0_60px_rgba(59,130,246,0.4)]">
                        <span class="material-symbols-outlined text-[60px]">shield_with_heart</span>
                    </div>
                    <h3 class="text-3xl font-black text-white mb-4 uppercase tracking-tighter">Trader Verificado</h3>
                    <p class="text-white/20 text-xs font-black uppercase tracking-[0.5em] italic">Bridge Markets Certification Program</p>
                </div>
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_community (Section 7) ──────────────────────
export function renderPropCommunity(content, brand) {
    const communityName = brand.communityName || brand.fullName;
    const message = brand.heroPhrase || "Únete a nuestra comunidad y deja que Bridge Markets financie tu talento.";
    
    return \`
    <section class="py-32 px-8 bg-[#0a0a0a] relative section-reveal overflow-hidden">
        <div class="max-w-5xl mx-auto bg-[#050505] border border-white/5 p-20 rounded-[4rem_1rem_4rem_1rem] relative z-10 group shadow-2xl">
            <div class="text-center relative z-10">
                <div class="relative w-32 h-32 mx-auto mb-12">
                   <div class="relative w-full h-full bg-[#0a0a0a] rounded-full border-2 border-white/10 flex items-center justify-center text-5xl text-white font-black overflow-hidden hover:border-blue-500 transition-colors">
                        \${brand.logoUrl ? \`<img src="\${brand.logoUrl}" alt="IB Logo" class="w-full h-full object-cover">\` : brand.fullName.charAt(0)}
                   </div>
                </div>
                <h2 class="text-5xl md:text-6xl font-black font-headline text-white mb-8 uppercase tracking-tighter">Comunidad <span class="text-blue-500">\${communityName}</span></h2>
                <div class="prose prose-invert mx-auto mb-16 text-center">
                   <p class="text-2xl text-white/50 leading-relaxed font-medium italic">\${message}</p>
                </div>
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_faq (Section 8) ───────────────────────────
export function renderPropFAQ(content, brand) {
    const faqs = [
        { q: '¿OBSIDIAN o BASALT?', a: 'OBSIDIAN: 1 sola fase (rapidez). BASALT: 2 fases (gestión de riesgo progresiva).' },
        { q: 'Distribución de Beneficios', a: 'Recibes entre 70% y 80% de los beneficios netos generados en mercado real.' },
        { q: 'Tiempo de Retiro', a: 'Solicita tus pagos cada 14 días calendario si cumples las métricas.' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#050505] border-t border-white/5">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl font-black font-headline text-white mb-20 text-center uppercase tracking-tighter">Consultas <span class="text-blue-500">Técnicas</span></h2>
            <div class="grid grid-cols-1 gap-4">
                \${faqs.map(f => \`
                    <div class="bg-[#0a0a0a] border border-white/5 p-8 rounded-2xl hover:border-blue-500/40 transition-all group cursor-pointer">
                        <div class="flex justify-between items-center text-left">
                            <span class="text-lg font-bold text-white uppercase tracking-tight group-hover:text-blue-500">\${f.q}</span>
                            <span class="material-symbols-outlined text-blue-500 group-hover:rotate-180 transition-transform">add</span>
                        </div>
                        <div class="mt-6 pt-6 border-t border-white/5 opacity-0 group-hover:opacity-100 h-0 group-hover:h-auto overflow-hidden transition-all duration-500">
                            <p class="text-sm text-white/40 leading-relaxed font-medium">\${f.a}</p>
                        </div>
                    </div>
                \`).join('')}
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_cta (Section 9) ────────────────────────────
export function renderPropCTA(content, brand) {
    const ctaLink = brand.ctaLink || "#register";
    return \`
    <section class="py-40 bg-[#050505] relative overflow-hidden section-reveal">
        <div class="max-w-5xl mx-auto px-8 relative z-10 text-center text-white">
            <h2 class="text-6xl md:text-8xl font-black font-headline mb-10 uppercase tracking-tighter leading-none">DOMINA EL <span class="text-blue-500 italic">MERCADO</span></h2>
            <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 w-full">
                \${['OBSIDIAN', 'BASALT', 'ELITE', 'ULTRA'].map(p => \`
                    <a href="\${ctaLink}" class="px-6 py-6 border border-white/10 bg-white/5 text-white font-black rounded-xl text-sm tracking-widest hover:bg-blue-600 hover:border-blue-600 transition-all text-center">QUIERO \${p}</a>
                \`).join('')}
            </div>
        </div>
    </section>\`;
}

// ─── RENDER: prop_footer (Section 10) ──────────────────────────
export function renderPropFooter(content, brand) {
    const year = new Date().getFullYear();
    return \`
    <footer class="py-24 bg-black text-white px-8 border-t border-white/5">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-20 mb-20">
            <div class="md:col-span-2">
                <img src="https://bridgemarkets.global/wp-content/uploads/2023/06/Logo-Bridge-Markets-Horizontal-Blanco.png" alt="Bridge Markets" class="h-10 mb-12 opacity-80 brightness-125">
                <p class="text-xs text-white/30 max-w-sm leading-relaxed uppercase tracking-[0.2em] font-black">
                    Infraestructura de Grado Mercantil.
                </p>
            </div>
            <div>
                <h4 class="text-[10px] font-black text-blue-500 uppercase tracking-[0.5em] mb-10">Partner Certificado</h4>
                <div class="flex items-center gap-4">
                    <div class="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-blue-500">\${brand.fullName.charAt(0)}</div>
                    <span class="text-xs font-black text-white uppercase tracking-widest">\${brand.fullName}</span>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto pt-12 border-t border-white/5 flex justify-between items-center gap-10">
            <p class="text-[9px] font-black text-white/10 uppercase tracking-[0.6em]">© \${year} BRIDGE MARKETS GLOBAL. ALL RIGHTS RESERVED.</p>
        </div>
    </footer>\`;
}

// ─── RENDER MAP ────────────────
export const SECTION_RENDERERS = {
    hero_dark: renderHeroDark,
    hero_light: renderHeroLight,
    hero_gradient: renderHeroGradient,
    bento_grid: renderBentoGrid,
    feature_split: renderFeatureSplit,
    stats_row: renderStatsRow,
    risk_grid: renderRiskGrid,
    leaderboard: renderLeaderboard,
    testimonials: renderTestimonials,
    trust_badges: renderTrustBadges,
    multi_asset: renderMultiAsset,
    workflow_steps: renderWorkflowSteps,
    security_fees: renderSecurityFees,
    cta_community: renderCtaCommunity,
    calculator: renderCalculator,
    hero_official: renderHeroOfficial,
    synthetic_families: renderSyntheticFamilies,
    challenge_matrix: renderChallengeMatrix,
    dual_steps: renderDualSteps,
    leverage_specs: renderLeverageSpecs,
    universe_logic: renderUniverseLogic,
    snt_hero: renderSntHero,
    snt_about: renderSntAbout,
    snt_advantages: renderSntAdvantages,
    snt_families: renderSntFamilies,
    snt_workflow: renderSntWorkflow,
    snt_specs: renderSntSpecs,
    snt_platforms: renderSntPlatforms,
    snt_community: renderSntCommunity,
    snt_faq: renderSntFAQ,
    snt_cta: renderSntCTA,
    snt_footer: renderSntFooter,
    prop_hero: renderPropHero,
    prop_about: renderPropAbout,
    prop_matrix: renderPropMatrix,
    prop_workflow: renderPropWorkflow,
    prop_rules: renderPropRules,
    prop_benefits: renderPropBenefits,
    prop_community: renderPropCommunity,
    prop_faq: renderPropFAQ,
    prop_cta: renderPropCTA,
    prop_footer: renderPropFooter,
};

// Helpers
export function getSectionById(id) {
    return SECTION_CATALOG.find(s => s.id === id);
}

export function getSectionsByCategory(category) {
    return SECTION_CATALOG.filter(s => s.category === category);
}
`;
    
    fs.writeFileSync(filePath, head + cleanCode, 'utf8');
    console.log('File fixed successfully');
} else {
    console.error('Marker not found');
}
