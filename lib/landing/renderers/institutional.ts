import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderInstHero(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'inst_hero')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="relative min-h-screen flex items-center justify-center pt-24 pb-32 px-8 overflow-hidden bg-[#05010f]">
        <!-- Fondo Arquitectónico -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full text-[25vw] font-black text-white/[0.02] uppercase tracking-tighter leading-none select-none pointer-events-none flex items-center justify-center overflow-hidden">
                INSTITUTIONAL
            </div>
            <div class="absolute top-[-10%] right-[-5%] w-[800px] h-[800px] bg-[#865BFF]/10 rounded-full blur-[150px]"></div>
            <div class="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] bg-blue-600/5 rounded-full blur-[120px]"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10">
            <div class="relative flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
                
                <!-- Columna de Contenido Principal -->
                <div class="lg:w-7/12 section-reveal z-20">
                    <div class="inline-flex items-center gap-6 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-16 backdrop-blur-xl">
                        <div class="w-2 h-2 rounded-full bg-[#865BFF] animate-ping"></div>
                        <span class="text-[10px] font-black uppercase tracking-[0.4em] text-white/60">Official Institutional Partner — ${ibName}</span>
                    </div>

                    <h1 class="text-6xl md:text-8xl lg:text-[9rem] font-black leading-[0.85] mb-12 tracking-tightest text-white uppercase mix-blend-difference">
                        ${c.title.split(' ').slice(0, 2).join(' ')} <br>
                        <span class="relative inline-block">
                            <span class="text-transparent bg-clip-text bg-gradient-to-r from-[#865BFF] to-white">${c.title.split(' ').slice(2).join(' ')}</span>
                            <div class="absolute -bottom-4 left-0 w-full h-2 bg-[#865BFF]/30 blur-sm rounded-full"></div>
                        </span>
                    </h1>
                    <div class="max-w-xl">
                        <p class="text-2xl md:text-3xl text-white/40 leading-relaxed mb-20 font-light italic tracking-tight border-l-2 border-[#865BFF] pl-10">
                            ${c.phrase}
                        </p>
                        
                        <div class="flex flex-wrap gap-12 items-center">
                            <a href="${ctaLink}" class="group relative px-20 py-10 bg-white text-black font-black overflow-hidden transform hover:-translate-y-2 transition-all duration-500 shadow-[0_0_50px_rgba(255,255,255,0.2)] hover:shadow-[0_0_80px_rgba(134,91,255,0.4)]">
                                <div class="absolute inset-0 bg-[#865BFF] translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                                <span class="relative z-10 uppercase tracking-[0.5em] text-sm group-hover:text-white">${c.ctaText}</span>
                            </a>
                            
                            ${c.videoUrl ? `
                            <button onclick="openVideoModal('${c.videoUrl}')" class="group flex items-center gap-6">
                                <div class="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center group-hover:border-[#865BFF] group-hover:scale-110 transition-all duration-500 relative overflow-hidden">
                                    <div class="absolute inset-0 bg-[#865BFF] opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                    <span class="material-symbols-outlined text-3xl text-white group-hover:text-[#865BFF]">play_arrow</span>
                                </div>
                                <div class="flex flex-col">
                                    <span class="text-[9px] font-black text-white/30 uppercase tracking-[0.4em] mb-1">Corporate Reveal</span>
                                    <span class="text-[11px] font-black text-white uppercase tracking-widest group-hover:text-[#865BFF] transition-colors">WATCH VIDEO</span>
                                </div>
                            </button>
                            ` : ''}
                        </div>
                    </div>

                <!-- Composición Visual Asimétrica -->
                <div class="lg:w-5/12 relative section-reveal">
                    <div class="relative w-full aspect-square lg:aspect-auto lg:h-[800px] flex items-center justify-center">
                        
                        <!-- Main 3D Asset -->
                        <div class="relative z-10 w-full h-full flex items-center justify-center transform lg:-translate-x-20">
                            <img src="/images/imagenes%20nuevas/reyna%20rosa.png" alt="Premium 3D" class="w-full h-full object-contain filter drop-shadow-[0_0_50px_rgba(134,91,255,0.3)] animate-float">
                        </div>

                        <!-- Floating Tech Card -->
                        <div class="absolute top-1/4 -right-10 lg:right-0 z-20 p-8 bg-[#05010f]/80 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl transform rotate-3 hover:rotate-0 transition-all duration-700 max-w-[280px]">
                            <div class="flex items-center gap-4 mb-6">
                                <div class="w-10 h-10 rounded-xl bg-[#865BFF]/20 flex items-center justify-center">
                                    <span class="material-symbols-outlined text-[#865BFF] text-xl">account_balance</span>
                                </div>
                                <span class="text-[10px] font-black text-white/60 uppercase tracking-widest leading-none">Security Protocol</span>
                            </div>
                            <p class="text-sm text-white font-medium leading-relaxed mb-4">Institutional Liquidity aggregated through Tier-1 prime brokers.</p>
                            <div class="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                <div class="h-full w-[85%] bg-[#865BFF] rounded-full shadow-[0_0_10px_rgba(134,91,255,0.5)]"></div>
                            </div>
                        </div>

                        <!-- Floating Performance Card -->
                        <div class="absolute bottom-1/4 -left-10 lg:-left-20 z-0 p-8 bg-white/5 backdrop-blur-md border border-white/10 rounded-[3rem] shadow-2xl transform -rotate-6 hover:rotate-0 transition-all duration-700 min-w-[240px]">
                            <div class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em] mb-4 text-center">Server Latency</div>
                            <div class="text-4xl font-black text-white text-center mb-2 tracking-tighter">0.02ms</div>
                            <div class="flex justify-center">
                                <div class="px-3 py-1 bg-emerald-500/10 text-emerald-500 text-[9px] font-black rounded-full uppercase tracking-widest">Optimized</div>
                            </div>
                        </div>

                        <!-- Background Elements -->
                        <div class="absolute inset-0 bg-gradient-to-tr from-[#865BFF]/20 via-transparent to-transparent rounded-full blur-3xl opacity-30"></div>
                    </div>
                </div>

            </div>
        </div>

        <style>
            @keyframes float {
                0%, 100% { transform: translateY(0) rotate(0); }
                50% { transform: translateY(-30px) rotate(2deg); }
            }
            .animate-float {
                animation: float 8s ease-in-out infinite;
            }
        </style>
    </section>
    `;
}

export function renderInstAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-64 bg-[#05010f] relative overflow-hidden">
        <!-- Fondo Arquitectónico -->
        <div class="absolute inset-0 z-0 opacity-30">
            <div class="absolute top-0 right-0 w-1/2 h-full bg-slate-900/50"></div>
            <img src="/images/imagenes%20nuevas/caballo%20negro.png" class="absolute top-1/2 left-0 -translate-y-1/2 w-[60%] h-auto object-contain opacity-5 grayscale pointer-events-none" alt="Background">
        </div>

        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="flex flex-col lg:flex-row items-center gap-24 lg:gap-40">
                <div class="lg:w-6/12 section-reveal">
                    <div class="flex items-center gap-4 mb-12">
                        <div class="w-12 h-[1px] bg-[#865BFF]"></div>
                        <span class="text-[#865BFF] text-[10px] font-black uppercase tracking-[0.8em]">Core Identity</span>
                    </div>
                    
                    <h2 class="text-7xl md:text-[8rem] font-black text-white leading-[0.85] mb-16 uppercase tracking-tightest italic">
                        REDEFINING <br><span class="text-white/20">THE STANDARD.</span>
                    </h2>
                    
                    <div class="space-y-12 text-2xl text-white/50 font-light leading-relaxed max-w-xl">
                        <p class="first-letter:text-6xl first-letter:font-black first-letter:text-[#865BFF] first-letter:mr-3 first-letter:float-left">
                            Bridge Markets es una arquitectura financiera global. Operamos con tecnología de nivel institucional, conectando el talento real con infraestructuras de capital sólidas en los mercados más dinámicos del mundo.
                        </p>
                        <div class="p-10 border-l-4 border-[#865BFF] bg-white/[0.02] backdrop-blur-xl">
                             <p class="text-white font-medium italic text-xl leading-relaxed">"La disciplina es el único algoritmo que garantiza la consistencia en los mercados financieros."</p>
                        </div>
                    </div>
                </div>

                <div class="lg:w-6/12 grid grid-cols-2 gap-10 section-reveal">
                     ${[
                         { val: '2021', label: 'Foundation' },
                         { val: '9+', label: 'Languages' },
                         { val: '4', label: 'Global Markets' },
                         { val: '24/7', label: 'Expert Support' }
                     ].map((stat, i) => `
                        <div class="p-12 bg-white/[0.02] border border-white/5 rounded-none text-center hover:bg-[#865BFF] hover:text-white transition-all duration-700 group relative overflow-hidden ${i % 2 !== 0 ? 'lg:translate-y-20' : ''}">
                            <div class="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
                            <div class="relative z-10">
                                <div class="text-6xl font-black mb-4 tracking-tighter">${stat.val}</div>
                                <div class="text-[9px] font-black uppercase tracking-[0.4em] opacity-40 group-hover:opacity-100">${stat.label}</div>
                            </div>
                        </div>
                     `).join('')}
                </div>
            </div>

            <!-- Legals Card -->
            <div class="mt-40 grid grid-cols-1 lg:grid-cols-12 gap-10 section-reveal">
                <div class="lg:col-span-4 p-12 bg-[#865BFF] text-white flex flex-col justify-between">
                    <h3 class="text-4xl font-black uppercase tracking-tightest leading-none mb-10 italic">LEGAL <br>FRAMEWORK</h3>
                    <span class="material-symbols-outlined text-6xl opacity-30">gavel</span>
                </div>
                <div class="lg:col-span-8 p-12 bg-white/5 border border-white/10 backdrop-blur-3xl grid grid-cols-1 md:grid-cols-2 gap-12">
                    <div>
                        <h4 class="text-white font-black text-[11px] uppercase tracking-widest mb-4 opacity-40">United Kingdom</h4>
                        <p class="text-white font-bold mb-2">Bridge Markets Limited</p>
                        <p class="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">Registration 15159310. Yorkshire, United Kingdom.</p>
                    </div>
                    <div>
                        <h4 class="text-white font-black text-[11px] uppercase tracking-widest mb-4 opacity-40">Marshall Islands</h4>
                        <p class="text-white font-bold mb-2">Bridge Markets Ltd.</p>
                        <p class="text-[10px] text-white/30 uppercase tracking-widest leading-relaxed">Registration 113891. Business Trust structure.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderInstWhy(content: Record<string, any>, brand: BrandConfig): string {
    const reasons = [
        { t: 'Ecosistema Financiero Completo', d: 'PropTrading, sintéticos, cuentas apalancadas, MAM y Copy Trading en un solo lugar.' },
        { t: 'Todos los Sintéticos', d: 'Deriv + Weltrade + índices propios BM. Más de 100 instrumentos 24/7.' },
        { t: 'Tecnología Institucional', d: 'Servidores MT5 ultra rápidos con spreads competitivos desde 0.0 pips.' },
        { t: 'PropFirm Propio', d: 'Accede a capital financiado real: OBSIDIAN, BASALT, ELITE y ULTRA.' },
        { t: 'Cuentas para cada Perfil', d: 'Desde traders independientes hasta gestores institucionales de alto nivel.' },
        { t: 'Red Global de IBs', d: 'Presencia en México, Nigeria, Filipinas, India y expansión continua.' }
    ];

    return `
    <section class="py-64 bg-[#05010f] relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 relative z-10 section-reveal">
            <div class="flex flex-col lg:flex-row justify-between items-end mb-32 gap-12">
                <h2 class="text-7xl md:text-9xl font-black text-white uppercase tracking-tightest leading-[0.8] italic">
                    WHY <br><span class="text-[#865BFF]">BRIDGE?</span>
                </h2>
                <p class="text-xl text-white/30 max-w-sm uppercase tracking-widest font-black border-l-2 border-[#865BFF] pl-8 italic">
                    The infrastructure of the next generation of institutional traders.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-1">
                ${reasons.map((r, i) => `
                    <div class="group p-16 bg-white/[0.02] border border-white/5 hover:bg-[#865BFF] transition-all duration-700 relative overflow-hidden h-[450px] flex flex-col justify-end">
                        <div class="absolute top-12 left-12 text-7xl font-black text-white/5 group-hover:text-white/20 transition-colors italic">0${i+1}</div>
                        <div class="relative z-10">
                            <h3 class="text-3xl font-black text-white mb-6 uppercase tracking-tighter leading-none group-hover:scale-110 origin-left transition-transform italic">${r.t}</h3>
                            <p class="text-white/40 text-lg leading-relaxed font-light group-hover:text-white transition-colors">${r.d}</p>
                        </div>
                        <div class="absolute bottom-0 right-0 w-32 h-32 bg-white/5 translate-x-16 translate-y-16 rotate-45 group-hover:bg-white/20 transition-all"></div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderInstEcosystem(content: Record<string, any>, brand: BrandConfig): string {
    const products = [
        { id: 'prop', t: 'PropFirm', d: 'OBSIDIAN · BASALT · ELITE · ULTRA. Capital financiado sin arriesgar tu dinero.', badge: 'PROP', color: '#3b82f6', link: '#propfirm' },
        { id: 'snt', t: 'Índices Sintéticos', d: 'Mas de 100 instrumentos 24/7. Fortune, Vortex, BullX y más.', badge: 'SYN', color: '#c084fc', link: '#sinteticos' },
        { id: 'lx12', t: 'Cuentas Leverage X12', d: 'Capital apalancado 12x sin fases de evaluación. 100% de beneficios.', badge: 'X12', color: '#ef4444', link: '#x12' },
        { id: 'mam', t: 'Cuentas MAM', d: 'Gestión profesional centralizada con total transparencia para inversores.', badge: 'MAM', color: '#fbbf24', link: '#mam' },
        { id: 'copy', t: 'Copy Trading', d: 'Replica estrategias verificadas con control total de tu capital.', badge: 'CP', color: '#10b981', link: '#copy' },
        { id: 'fx', t: 'Forex y CFDs', d: 'Mercados reales con ejecución ECN y spreads institucionales.', badge: 'FX', color: '#6366f1', link: '#forex' }
    ];

    return `
    <section id="ecosistema" class="py-48 bg-white text-[#05010f] rounded-[8rem] relative z-20 shadow-[0_-50px_100px_rgba(0,0,0,0.2)]">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center lg:text-left">
            <div class="max-w-4xl mb-32">
                <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[0.8em] mb-10 block">Bridge Ecosystem</span>
                <h2 class="text-6xl md:text-8xl font-black text-[#140633] uppercase tracking-tightest leading-[0.85] mb-12">NUESTRO UNIVERSO <br>DE PRODUCTOS.</h2>
                <p class="text-3xl text-gray-400 font-light leading-relaxed">
                    Cada solución está diseñada para un perfil específico, compartiendo siempre el mismo estándar: tecnología institucional y transparencia total.
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 mb-40">
                ${products.map(p => `
                    <div class="group relative bg-gradient-to-br from-[#F8FAFC] to-white border border-slate-200 shadow-xl p-16 rounded-[4rem] overflow-hidden hover:shadow-[0_40px_80px_rgba(134,91,255,0.15)] transition-all duration-500 hover:-translate-y-4">
                        <div class="absolute -right-20 -top-20 w-64 h-64 opacity-10 blur-3xl transition-all duration-700 group-hover:opacity-30 group-hover:scale-150" style="background: radial-gradient(circle, ${p.color} 0%, transparent 70%);"></div>
                        <div class="flex justify-between items-start mb-12 relative z-10">
                            <span class="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-[#140633]" style="background-color: ${p.color}15; color: ${p.color}">${p.badge}</span>
                            <span class="material-symbols-outlined text-slate-300 text-6xl group-hover:-rotate-12 transition-transform duration-500" style="color: ${p.color}">hub</span>
                        </div>
                        <h3 class="text-3xl font-black text-[#140633] mb-6 uppercase tracking-tighter leading-none relative z-10">${p.t}</h3>
                        <p class="text-lg text-slate-500 font-medium leading-relaxed mb-12 relative z-10">${p.d}</p>
                        <a href="${p.link}" class="inline-flex items-center gap-4 text-[#865BFF] font-black uppercase tracking-widest text-sm hover:gap-8 transition-all duration-300 relative z-10">
                            Ver Detalles <span class="material-symbols-outlined">arrow_forward</span>
                        </a>
                    </div>
                `).join('')}
            </div>

            <div class="overflow-x-auto glass-panel rounded-[4rem] border border-slate-100 p-8 shadow-inner">
                <table class="w-full text-left border-collapse min-w-[900px]">
                    <thead>
                        <tr class="border-b border-slate-200">
                             <th class="py-8 px-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Producto</th>
                             <th class="py-8 px-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Para quién es</th>
                             <th class="py-8 px-8 text-[11px] font-black uppercase tracking-[0.3em] text-gray-400">Propuesta Clave</th>
                             <th class="py-8 px-8 text-right"></th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-slate-100">
                        ${[
                            { p: 'PropFirm FX', who: 'Traders experimentados', raw: '80% Profit Split. Fases 1/2.' },
                            { p: 'Sintéticos Pro', who: 'Traders 24/7 & Scalpers', raw: '100+ Instrumentos exclusivos' },
                            { p: 'Leverage X12', who: 'High Leverage Lovers', raw: 'Sin evaluación. 12x Capital.' },
                            { p: 'MAM Accounts', who: 'Gestores & Fondos', raw: 'LPOA Segura. Master Sync.' },
                            { p: 'Copy Trading', who: 'Inversionistas Pasivos', raw: 'Réplica verificada. Control total.' }
                        ].map(row => `
                            <tr class="hover:bg-white/10 transition-colors group">
                                <td class="py-10 px-8 text-2xl font-black text-[#140633] uppercase tracking-tighter">${row.p}</td>
                                <td class="py-10 px-8 text-gray-400 font-bold uppercase text-xs tracking-widest">${row.who}</td>
                                <td class="py-10 px-8 text-gray-500 font-medium text-lg">${row.raw}</td>
                                <td class="py-10 px-8 text-right">
                                    <button class="px-8 py-4 bg-[#865BFF] text-white text-[10px] font-black uppercase tracking-widest rounded-3xl opacity-0 group-hover:opacity-100 transition-all shadow-xl">Ver Producto</button>
                                </td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </section>`;
}

export function renderInstSelector(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'inst_selector')!.defaultContent, ...content };
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="py-48 bg-white relative">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center">
             <h2 class="text-6xl md:text-8xl font-black text-[#140633] mb-32 uppercase tracking-tightest leading-none">¿CUÁL ES <br><span class="text-gray-200">TU CAMINO?</span></h2>
             
             <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
                 <!-- TRADER -->
                 <div class="relative group p-20 rounded-[5rem] bg-gradient-to-br from-white to-[#F8FAFC] border border-slate-200 shadow-2xl text-left overflow-hidden hover:shadow-[0_50px_100px_rgba(134,91,255,0.2)] hover:-translate-y-4 transition-all duration-700">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#140633] to-[#2a1560] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                    <div class="relative z-10 group-hover:text-white transition-colors duration-700">
                        <span class="text-[11px] font-black uppercase tracking-[0.8em] text-[#865BFF] mb-12 block group-hover:text-white/60 transition-colors">Perfil Activo</span>
                        <h3 class="text-6xl font-black mb-12 uppercase tracking-tighter leading-none group-hover:text-white text-[#140633] transition-colors">SOY <br>TRADER</h3>
                        <p class="text-xl text-slate-500 font-medium mb-16 leading-relaxed group-hover:text-white/70 transition-colors">Quiero operar los mercados y generar beneficios con mi propia estrategia y disciplina.</p>
                        
                        <ul class="space-y-6 mb-16">
                            ${['PropFirm: Sin arriesgar tu capital', 'Sintéticos: Disponibles 24/7', 'Leverage X12: Sin evaluación', 'Forex ECN: Spreads institucionales'].map(item => `
                                <li class="flex items-center gap-4">
                                     <span class="material-symbols-outlined text-[#865BFF] group-hover:text-white transition-colors">check_circle</span>
                                     <span class="text-sm font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors opacity-90">${item}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <a href="${ctaLink}" class="w-full text-center block py-8 bg-[#865BFF] text-white font-black rounded-[2rem] text-xl uppercase tracking-tighter hover:bg-white hover:text-[#865BFF] transition-all shadow-xl group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                             ${c.ctaTrader}
                        </a>
                    </div>
                 </div>

                 <!-- INVERSOR -->
                 <div class="relative group p-20 rounded-[5rem] bg-gradient-to-bl from-white to-[#F8FAFC] border border-slate-200 shadow-2xl text-left overflow-hidden hover:shadow-[0_50px_100px_rgba(59,130,246,0.2)] hover:-translate-y-4 transition-all duration-700">
                    <div class="absolute inset-0 bg-gradient-to-bl from-[#0f172a] to-[#1e3a8a] opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"></div>
                    <div class="relative z-10 group-hover:text-white transition-colors duration-700">
                        <span class="text-[11px] font-black uppercase tracking-[0.8em] text-blue-500 mb-12 block group-hover:text-white/60 transition-colors">Perfil Pasivo</span>
                        <h3 class="text-6xl font-black mb-12 uppercase tracking-tighter leading-none group-hover:text-white text-[#140633] transition-colors">SOY <br>INVERSOR</h3>
                        <p class="text-xl text-slate-500 font-medium mb-16 leading-relaxed group-hover:text-white/70 transition-colors">Quiero hacer crecer mi capital delegando la operativa en gestión profesional o réplica.</p>
                        
                        <ul class="space-y-6 mb-16">
                            ${['Copy Trading: Réplica automática', 'MAM Equity: Transparencia total', 'MAM Cash: Inversión institucional', 'Social Trading: Red de beneficios'].map(item => `
                                <li class="flex items-center gap-4">
                                     <span class="material-symbols-outlined text-blue-500 group-hover:text-white transition-colors">check_circle</span>
                                     <span class="text-sm font-black uppercase tracking-widest text-slate-600 group-hover:text-white transition-colors opacity-90">${item}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <a href="${ctaLink}" class="w-full text-center block py-8 bg-blue-600 text-white font-black rounded-[2rem] text-xl uppercase tracking-tighter hover:bg-white hover:text-blue-600 transition-all shadow-xl group-hover:shadow-[0_20px_40px_rgba(0,0,0,0.3)]">
                             ${c.ctaInvestor}
                        </a>
                    </div>
                 </div>
             </div>
        </div>
    </section>`;
}

export function renderInstPartners(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'inst_partners')!.defaultContent, ...content };
    const benefits = [
        { t: 'Comisiones por referidos', d: 'Genera ingresos por cada cliente que active productos.' },
        { t: 'Landings personalizables', d: 'Acceso a este sistema para crear tu propia red de marca.' },
        { t: 'Soporte dedicado', d: 'Acceso directo al equipo corporativo para resolución de dudas.' },
        { t: 'Materiales Premium', d: 'Presentaciones, documentos y recursos de marketing listos.' },
        { t: 'Panel de seguimiento', d: 'Monitorea volúmenes y comisiones desde tu portal de IB.' }
    ];

    return `
    <section class="py-48 bg-[#05010f] relative overflow-hidden text-white border-t border-white/5">
        <div class="max-w-7xl mx-auto px-8 relative z-10 section-reveal text-center lg:text-left">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center">
                <div>
                     <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[0.8em] mb-12 block">Introducing Broker Program</span>
                     <h2 class="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-16 uppercase tracking-tightest">CONVIÉRTETE <br>EN SOCIO <span class="text-white/20">IB.</span></h2>
                     <p class="text-3xl text-white/40 font-light leading-relaxed mb-16">Nuestra red de IBs opera activamente en México, Nigeria, Filipinas e India, construyendo negocios recurrentes con base tecnológica.</p>
                     
                     <div class="flex flex-col gap-10">
                        ${benefits.map(b => `
                            <div class="flex gap-8 group">
                                <div class="w-14 h-14 rounded-[1.5rem] bg-white/5 border border-white/10 flex items-center justify-center text-[#865BFF] group-hover:bg-[#865BFF] group-hover:text-white transition-all shadow-xl">
                                    <span class="material-symbols-outlined">partnership</span>
                                </div>
                                <div>
                                    <h4 class="text-2xl font-black text-white uppercase tracking-tighter mb-2">${b.t}</h4>
                                    <p class="text-white/40 text-sm font-medium leading-relaxed">${b.d}</p>
                                </div>
                            </div>
                        `).join('')}
                     </div>
                </div>

                <div class="relative">
                    <div class="p-16 rounded-[4rem] bg-white/5 border border-white/10 backdrop-blur-3xl relative overflow-hidden text-center group">
                        <div class="absolute inset-0 bg-gradient-to-tr from-[#865BFF]/20 to-transparent"></div>
                        <span class="material-symbols-outlined text-[200px] text-[#865BFF]/10 mb-12 block group-hover:scale-110 transition-transform duration-[5s]">public</span>
                        <h3 class="text-4xl font-black mb-6 uppercase tracking-tight">Expansión Global</h3>
                        <p class="text-white/40 text-sm uppercase tracking-widest mb-16 leading-relaxed">Únete a la elite de socios <br>comerciales de Bridge Markets.</p>
                        <a href="https://bridgemarkets.global/ib-form" class="inline-block px-16 py-8 bg-white text-black font-black rounded-[2rem] text-xl uppercase tracking-tighter hover:shadow-3xl transition-all">
                            ${c.ctaText}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderInstTech(content: Record<string, any>, brand: BrandConfig): string {
    const stacks = [
        { icon: 'terminal', title: 'MetaTrader 5', desc: 'Escritorio, iOS y Android. Servidor BridgeMarkets-MT5.', badge: 'MT5' },
        { icon: 'monitoring', title: 'Charts Propios', desc: 'Acceso a charts.bridgemarkets.global de forma gratuita.', badge: 'CHART' },
        { icon: 'school', title: 'Academia', desc: 'Webinars, glosario y material educativo para todos los niveles.', badge: 'EDU' },
        { icon: 'dashboard', title: 'Portal Cliente', desc: 'Gestiona fondos, depósitos y retiros desde un solo lugar.', badge: 'UI' }
    ];

    return `
    <section class="py-48 bg-white text-[#140633] border-y border-slate-50 relative">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center">
             <h2 class="text-6xl md:text-8xl font-black text-[#140633] mb-32 uppercase tracking-tightest leading-none">PLATAFORMA <br><span class="text-gray-200">TECNOLÓGICA</span></h2>
             
             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                 ${stacks.map(s => `
                    <div class="relative p-16 bg-gradient-to-br from-white to-[#F8FAFC] border border-slate-200 shadow-xl rounded-[4rem] group hover:shadow-[0_30px_80px_rgba(134,91,255,0.2)] transition-all duration-500 hover:-translate-y-4 overflow-hidden">
                        <div class="absolute inset-0 bg-gradient-to-tr from-[#140633] to-[#3a1d77] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
                        <div class="relative z-10 group-hover:text-white transition-colors duration-500">
                            <div class="w-20 h-20 bg-white shadow-lg rounded-[1.5rem] flex items-center justify-center text-[#865BFF] mb-12 group-hover:bg-white/10 group-hover:text-white group-hover:backdrop-blur-xl border border-transparent group-hover:border-white/20 transition-all duration-500 transform group-hover:rotate-6">
                                <span class="material-symbols-outlined text-4xl drop-shadow-md">${s.icon}</span>
                            </div>
                            <h4 class="text-3xl font-black mb-6 uppercase tracking-tighter leading-none">${s.title}</h4>
                            <p class="text-slate-500 font-medium text-lg leading-relaxed group-hover:text-white/80 transition-colors uppercase tracking-widest text-sm">${s.desc}</p>
                        </div>
                    </div>
                 `).join('')}
             </div>
        </div>
    </section>`;
}

export function renderInstWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { t: 'Crea tu cuenta', d: 'Regístrate en menos de 2 minutos.' },
        { t: 'Completa KYC', d: 'Verifica tu identidad según estándares IL.' },
        { t: 'Elige Producto', d: 'Propfirm, Sintéticos, MAM, Copy o Forex.' },
        { t: 'Fondea / Compra', d: 'Deposita fondos o adquiere tu reto Prop.' },
        { t: 'Descarga MT5', d: 'Instala la plataforma en tu dispositivo.' },
        { t: 'Opera o Invierte', d: 'Tu cuenta está lista para actuar.' },
        { t: 'Gestiona', d: 'Monitorea, escala y retira beneficios.' }
    ];

    return `
    <section class="py-48 bg-white overflow-hidden text-[#140633]">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center">
            <h2 class="text-6xl md:text-8xl font-black text-[#140633] mb-32 uppercase tracking-tightest leading-none">CÓMO <br><span class="text-gray-200">EMPEZAR</span></h2>
            
            <div class="relative">
                <div class="hidden lg:block absolute top-[50%] left-0 w-full h-px bg-slate-200 z-0"></div>
                
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-7 gap-6 relative z-10">
                    ${steps.map((s, i) => `
                        <div class="group h-full">
                            <div class="relative flex flex-col items-center p-8 bg-gradient-to-b from-white to-slate-50 border border-slate-200 shadow-md shadow-slate-200/50 rounded-[3rem] hover:shadow-[0_20px_50px_rgba(134,91,255,0.15)] hover:border-[#865BFF]/30 transition-all duration-500 transform hover:-translate-y-4 overflow-hidden h-full z-10 hover:z-20">
                                <div class="absolute inset-0 bg-gradient-to-t from-[#865BFF]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                <span class="relative z-10 text-5xl font-black text-slate-200 group-hover:text-[#865BFF] transition-colors leading-none tracking-tightest mb-8 drop-shadow-sm group-hover:drop-shadow-[0_0_15px_rgba(134,91,255,0.5)]">0${i+1}</span>
                                <h4 class="relative z-10 text-sm font-black uppercase tracking-widest text-center leading-tight mb-4 text-[#140633] group-hover:text-[#865BFF] transition-colors">${s.t}</h4>
                                <p class="relative z-10 text-[10px] text-slate-400 font-bold uppercase tracking-widest text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-500">${s.d}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>`;
}

export function renderInstCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'inst_community')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';
    const message = brand.heroPhrase || c.welcomeMessage || 'Únete a nuestra comunidad oficial vinculada a Bridge Markets.';
    const logoUrl = brand.logoUrl || '/images/logo-bm-blanco.png';

    return `
    <section class="py-48 bg-[#05010f] text-white relative">
        <div class="max-w-7xl mx-auto px-8 relative z-10 section-reveal">
             <div class="bg-white/5 border border-white/10 rounded-[6rem] p-16 lg:p-32 flex flex-col lg:flex-row items-center gap-24 relative overflow-hidden group">
                <div class="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[#865BFF] to-transparent"></div>
                
                <div class="lg:w-1/3 flex flex-col items-center">
                    <div class="w-64 h-64 bg-black border-4 border-white/5 rounded-full overflow-hidden shadow-4xl group-hover:border-[#865BFF] transition-all duration-1000 rotate-3 hover:rotate-0">
                        <img src="${logoUrl}" alt="IB" class="w-full h-full object-contain p-8">
                    </div>
                    <div class="mt-12 text-center">
                        <h3 class="text-4xl font-black uppercase tracking-tighter mb-4">${ibName}</h3>
                        <div class="px-6 py-2 bg-[#865BFF]/10 border border-[#865BFF]/20 rounded-full text-[10px] font-black uppercase tracking-[0.4em] text-[#865BFF]">Partner Verificado</div>
                    </div>
                </div>

                <div class="lg:w-2/3">
                    <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[1em] mb-12 block">Mensaje de Bienvenida</span>
                    <p class="text-4xl text-white font-light leading-[1.4] mb-16 italic border-l-8 border-[#865BFF] pl-16">
                        "${message}"
                    </p>
                    
                    <div class="flex flex-wrap gap-6">
                        ${brand.telegram ? `<a href="${brand.telegram}" class="px-12 py-6 bg-blue-600 text-white font-black rounded-3xl hover:shadow-3xl transition-all shadow-xl text-lg flex items-center gap-4 uppercase tracking-widest text-sm">Telegram</a>` : ''}
                        ${brand.whatsapp ? `<a href="https://wa.me/${brand.whatsapp}" class="px-12 py-6 bg-emerald-600 text-white font-black rounded-3xl hover:shadow-3xl transition-all shadow-xl text-lg flex items-center gap-4 uppercase tracking-widest text-sm">WhatsApp</a>` : ''}
                    </div>
                </div>
             </div>
        </div>
    </section>`;
}

export function renderInstFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué es Bridge Markets?', a: 'Broker internacional con sede en UK e Islas Marshall, ofreciendo un ecosistema de inversión Institucional completo.' },
        { q: '¿Es seguro operar aquí?', a: 'Sí, contamos con entidades registradas, fondos segregados y ejecución institucional bajo cumplimiento internacional.' },
        { q: '¿Qué productos ofrecen?', a: 'Propfirm, Índices Sintéticos, Leverage X12, MAM, Copy Trading y Forex/CFDs.' },
        { q: '¿Cuál es la plataforma?', a: 'MetaTrader 5 (MT5) oficial de Bridge Markets, servidor: BridgeMarkets-MT5.' },
        { q: '¿Tienen soporte?', a: 'Sí, ofrecemos soporte especializado 24/5 en múltiples idiomas (Español incluido).' },
        { q: '¿Puedo ser IB?', a: 'Sí. Contamos con un programa de socios robusto con comisiones líderes y soporte dedicado.' }
    ];

    return `
    <section class="py-48 bg-white text-[#140633]">
        <div class="max-w-5xl mx-auto px-8 section-reveal text-center">
             <h2 class="text-6xl font-black text-[#140633] mb-32 uppercase tracking-tightest leading-none">CONSULTAS <br><span class="text-gray-300">FRECUENTES</span></h2>
             
             <div class="space-y-8 text-left">
                 ${faqs.map(f => `
                    <div class="glass-panel border border-slate-100 p-12 rounded-[4rem] group hover:bg-white/10 hover:border-[#140633] transition-all shadow-sm hover:shadow-4xl">
                        <h4 class="text-3xl font-black text-[#140633] mb-8 uppercase tracking-tighter flex items-center gap-8 group-hover:text-[#865BFF]">
                             <span class="w-1.5 h-12 bg-[#865BFF] rounded-full"></span> ${f.q}
                        </h4>
                        <p class="text-xl text-gray-400 font-medium leading-relaxed pl-10">${f.a}</p>
                    </div>
                 `).join('')}
             </div>
        </div>
    </section>`;
}

export function renderInstFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'inst_final_cta')!.defaultContent, ...content };
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="py-64 bg-[#05010f] relative overflow-hidden">
        <div class="absolute inset-0 bg-gradient-to-br from-[#140633] via-[#05010f] to-[#865BFF]/40"></div>
        <div class="max-w-7xl mx-auto px-8 relative z-10 text-center section-reveal">
            <h2 class="text-7xl md:text-[12rem] font-black text-white mb-20 uppercase tracking-tightest leading-[0.8] drop-shadow-3xl">UN BROKER. <br><span class="text-[#865BFF] outline-text"> TODO.</span></h2>
            <p class="text-3xl text-white/40 mb-32 font-light uppercase tracking-[0.4em] max-w-5xl mx-auto leading-relaxed">No importa si eres trader, inversor o gestor. <br>En Bridge Markets tienes el ecosistema completo.</p>
            
            <div class="flex flex-wrap justify-center gap-10">
                <a href="${ctaLink}" class="px-20 py-10 bg-white text-black font-black rounded-full hover:scale-110 transition-transform uppercase text-2xl tracking-tighter shadow-3xl">${c.ctaMain}</a>
                <a href="#ecosistema" class="px-20 py-10 bg-white/5 border border-white/10 text-white font-black rounded-full hover:bg-white/20 transition-all uppercase text-2xl tracking-tighter backdrop-blur-md">${c.ctaSecondary}</a>
                <a href="https://bridgemarkets.global/ib-form" class="px-20 py-10 bg-[#865BFF] text-white font-black rounded-full hover:shadow-[0_45px_90px_rgba(134,91,255,0.4)] transition-all uppercase text-2xl tracking-tighter">${c.ctaIB}</a>
            </div>

            <div class="mt-40 text-center">
                 <p class="text-[10px] text-white/20 uppercase font-black tracking-[0.8em]">Risk Disclaimer: Trading involves significant risk. BridgeMarkets LTD 2026.</p>
            </div>
        </div>
    </section>`;
}

export function renderInstFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || brand.ibName || 'Partner Oficial';
    const year = new Date().getFullYear();

    return `
    <footer class="py-48 bg-white border-t border-slate-50 relative z-10 text-[#140633]">
        <div class="max-w-7xl mx-auto px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-24 mb-40 section-reveal">
                <div class="col-span-1 lg:col-span-1">
                    <img src="/images/logo-bm-blanco.png" alt="BM" class="h-10 mb-12">
                    <p class="text-gray-400 text-xs font-black uppercase tracking-[0.2em] leading-loose mb-12">Infraestructura institucional V3. Bridge Markets LTD está regulado internacionalmente para garantizar fondos segregados.</p>
                    <div class="p-8 glass-panel border border-slate-100 rounded-[2rem] flex items-center gap-6">
                        <div class="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center text-[#865BFF] font-black">${ibName.charAt(0)}</div>
                        <div class="text-[9px] font-black text-gray-500 uppercase tracking-widest leading-none">Presentado por <br><span class="text-[#140633] text-sm">${ibName}</span></div>
                    </div>
                </div>

                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-[0.6em] mb-12 text-gray-400">Trading MT5</h4>
                    <ul class="space-y-6 text-xs font-black uppercase tracking-widest">
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Escritorio</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">iOS & Android</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Cuenta ECN</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Social Trading</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-[0.6em] mb-12 text-gray-400">Legal</h4>
                    <ul class="space-y-6 text-xs font-black uppercase tracking-widest">
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Términos</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Acuerdo IB</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">KYC Policy</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Risk Disclaimer</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-[10px] font-black uppercase tracking-[0.6em] mb-12 text-gray-400">Contacto</h4>
                    <ul class="space-y-6 text-xs font-black uppercase tracking-widest text-gray-400">
                        <li>corporate@bridgemarkets.global</li>
                        <li>+1 (786) 979-3392</li>
                        <li>@bridgemarketsbroker</li>
                    </ul>
                </div>
            </div>

            <div class="pt-24 border-t border-slate-100 text-center">
                <p class="text-[10px] font-black text-gray-300 uppercase tracking-[0.4em] mb-16 max-w-5xl mx-auto leading-loose">
                    Advertencia de Riesgo: Los productos financieros implican riesgo. El contenido en este sitio no es un consejo de inversión. Bridge Markets Limited (UK) Reg 15159310. Bridge Markets Ltd (Marshall Islands) Reg 113891.
                </p>
                <div class="text-[10px] font-black text-[#140633] uppercase tracking-[1em]">© ${year} BRIDGE MARKETS GLOBAL.</div>
            </div>
        </div>
    </footer>`;
}
