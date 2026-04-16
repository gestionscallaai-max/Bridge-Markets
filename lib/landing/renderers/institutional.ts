import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderInstHero(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'inst_hero')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="relative min-h-screen flex flex-col justify-center pt-20 pb-32 px-8 overflow-hidden bg-[#05010f]">
        <!-- Animación de Fondo -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-[-10%] right-[-10%] w-[1000px] h-[1000px] bg-[#865BFF]/10 rounded-full blur-[150px] animate-pulse"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[800px] h-[800px] bg-blue-500/5 rounded-full blur-[120px]"></div>
            <div class="absolute inset-0 opacity-[0.05]" style="background-image: radial-gradient(#865BFF 1px, bg-white 1px); background-size: 50px 50px;"></div>
        </div>
        
        <div class="max-w-7xl mx-auto w-full relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-12 gap-20 items-center">
                <div class="lg:col-span-8 section-reveal">
                    <div class="flex items-center gap-4 mb-12">
                        <img src="/logo.png" alt="BM" class="h-8">
                        <div class="h-6 w-[1px] bg-white/20"></div>
                        <span class="text-[10px] font-black uppercase tracking-[0.5em] text-[#865BFF]">Presentado por ${ibName}</span>
                    </div>
                    
                    <h1 class="text-7xl md:text-9xl lg:text-[10rem] font-black font-headline leading-[0.85] mb-12 tracking-tightest text-white uppercase drop-shadow-2xl">
                        ${c.title.split(' ').slice(0, 2).join(' ')} <br>
                        <span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#865BFF] to-white/50">${c.title.split(' ').slice(2).join(' ')}</span>
                    </h1>
                    
                    <p class="text-2xl md:text-3xl text-white/50 leading-relaxed max-w-3xl mb-12 font-medium">
                        ${c.subtitle}
                    </p>

                    ${c.ibPhrase ? `<p class="text-xl text-[#865BFF]/80 mb-16 font-black italic decoration-[#865BFF]/30 underline underline-offset-8">"${c.ibPhrase}"</p>` : ''}
                    
                    <div class="flex flex-wrap gap-8 mb-20">
                        ${['Regulado', '5+ Años', 'Soporte 24/7'].map(badge => `
                            <div class="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full backdrop-blur-md">
                                <span class="w-2 h-2 rounded-full bg-[#865BFF] animate-ping"></span>
                                <span class="text-[10px] font-black text-white/80 uppercase tracking-widest">${badge}</span>
                            </div>
                        `).join('')}
                    </div>

                    <div class="flex flex-col sm:flex-row gap-8">
                        <a href="${ctaLink}" class="group relative px-16 py-8 bg-[#865BFF] text-white font-black rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(134,91,255,0.5)] hover:shadow-[0_45px_90px_-15px_rgba(134,91,255,0.6)] hover:-translate-y-2 transition-all flex items-center justify-center gap-4 text-2xl">
                            <span class="uppercase tracking-tighter">${c.cta1}</span>
                            <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">bolt</span>
                        </a>
                        <a href="#ecosistema" class="group px-16 py-8 bg-white/5 border border-white/10 text-white font-black rounded-[2rem] hover:bg-white/10 hover:text-black hover:-translate-y-2 transition-all flex items-center justify-center gap-4 text-2xl uppercase tracking-tighter backdrop-blur-md">
                            ${c.cta2}
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderInstAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-48 bg-[#05010f] relative border-y border-white/5">
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center section-reveal">
                <div>
                    <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[0.8em] mb-10 block">Institucional</span>
                    <h2 class="text-6xl md:text-8xl font-black text-white leading-[0.85] mb-16 uppercase tracking-tightest">QUIÉNES <br><span class="text-white/20">SOMOS</span></h2>
                    
                    <div class="space-y-10 text-2xl text-white/50 font-light leading-relaxed">
                        <p>Bridge Markets es un broker internacional con presencia en múltiples mercados globales. Operamos desde el Reino Unido y las Islas Marshall, ofreciendo acceso a los mercados financieros con tecnología de nivel institucional.</p>
                        <p>Nuestra misión es conectar traders disciplinados con oportunidades reales de capital, ofreciendo un ecosistema completo que incluye trading personal, gestión de capital e instrumentos sintéticos exclusivos.</p>
                        <div class="p-8 border-l-8 border-[#865BFF] bg-white/5 rounded-r-3xl">
                             <p class="text-white font-medium italic italic text-xl">"Creemos que el verdadero talento en los mercados no se mide por la suerte, sino por la disciplina, la consistencia y la gestión profesional del riesgo."</p>
                        </div>
                    </div>
                </div>

                <div class="grid grid-cols-2 gap-8">
                     ${[
                         { val: '2021', label: 'Fundación' },
                         { val: '9+', label: 'Idiomas' },
                         { val: '4', label: 'Mercados' },
                         { val: '24/7', label: 'Soporte' }
                     ].map(stat => `
                        <div class="p-12 bg-white/5 border border-white/10 rounded-[3rem] text-center hover:bg-[#865BFF] transition-all group">
                            <div class="text-5xl font-black text-white mb-4 group-hover:scale-110 transition-transform">${stat.val}</div>
                            <div class="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] group-hover:text-white/80">${stat.label}</div>
                        </div>
                     `).join('')}
                     
                     <div class="col-span-2 p-10 bg-white/5 border border-white/10 rounded-[3rem] mt-8">
                        <div class="text-[10px] font-black text-white/30 uppercase tracking-[0.4em] mb-8">Entidades Registradas</div>
                        <div class="space-y-6">
                            <div>
                                <h4 class="text-white font-black text-sm uppercase mb-2">Bridge Markets Limited — Reino Unido</h4>
                                <p class="text-[10px] text-white/40 leading-relaxed uppercase">Registro 15159310. Hessle, HU13 9PD, Yorkshire, United Kingdom.</p>
                            </div>
                            <div class="h-px w-full bg-white/10"></div>
                            <div>
                                <h4 class="text-white font-black text-sm uppercase mb-2">Bridge Markets Ltd. — Islas Marshall</h4>
                                <p class="text-[10px] text-white/40 leading-relaxed uppercase">Registro 113891. Estructura de expansión global del grupo.</p>
                            </div>
                        </div>
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
        { t: 'Red Global de IBs', d: 'Presencia en México, Nigeria, Filipinas, India y expansión continua.' },
        { t: 'Índices Propios', d: 'Fortune, Vortex, BullX, BearX y FomoX: desarrollado por nuestro equipo.' },
        { t: 'Soporte 24/7 Multilingüe', d: 'Atención especializada en los idiomas más importantes de la red global.' },
        { t: 'Transparencia Total', d: 'Fondos segregados y operación bajo estrictos estándares institucionales.' }
    ];

    return `
    <section class="py-48 bg-[#05010f] relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 relative z-10 section-reveal text-center">
            <h2 class="text-6xl md:text-8xl font-black text-white mb-32 uppercase tracking-tightest leading-none">POR QUÉ <br><span class="text-[#865BFF]">ELEGIRNOS</span></h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 text-left">
                ${reasons.map((r, i) => `
                    <div class="p-12 bg-white/5 border border-white/5 rounded-[4rem] hover:border-[#865BFF]/30 hover:bg-[#865BFF]/5 transition-all group">
                        <div class="text-[#865BFF] text-4xl font-black mb-8 opacity-20 outline-text group-hover:opacity-100 transition-opacity">0${i+1}</div>
                        <h3 class="text-2xl font-black text-white mb-6 uppercase tracking-tighter leading-tight">${r.t}</h3>
                        <p class="text-white/40 text-lg leading-relaxed font-medium">${r.d}</p>
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
                    <div class="group relative glass-panel border border-slate-100 p-16 rounded-[5rem] overflow-hidden hover:bg-white/10 hover:shadow-4xl transition-all hover:-translate-y-4">
                        <div class="flex justify-between items-start mb-12">
                            <span class="px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest text-white" style="background-color: ${p.color}">${p.badge}</span>
                            <span class="material-symbols-outlined text-gray-200 text-6xl group-hover:text-[#865BFF] transition-colors">hub</span>
                        </div>
                        <h3 class="text-4xl font-black text-[#140633] mb-8 uppercase tracking-tighter leading-none">${p.t}</h3>
                        <p class="text-xl text-gray-400 font-medium leading-relaxed mb-12">${p.d}</p>
                        <a href="${p.link}" class="inline-flex items-center gap-4 text-[#865BFF] font-black uppercase tracking-widest text-sm hover:gap-6 transition-all">
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
                 <div class="relative group p-20 rounded-[5rem] glass-panel border border-slate-100 text-left overflow-hidden hover:bg-[#140633] hover:text-white transition-all duration-700">
                    <div class="relative z-10">
                        <span class="text-[11px] font-black uppercase tracking-[0.8em] text-[#865BFF] mb-12 block group-hover:text-white/60 transition-colors">Perfil Activo</span>
                        <h3 class="text-6xl font-black mb-12 uppercase tracking-tighter leading-none">SOY <br>TRADER</h3>
                        <p class="text-xl text-gray-400 font-medium mb-16 leading-relaxed group-hover:text-white/40 transition-colors">Quiero operar los mercados y generar beneficios con mi propia estrategia y disciplina.</p>
                        
                        <ul class="space-y-6 mb-16">
                            ${['PropFirm: Sin arriesgar tu capital', 'Sintéticos: Disponibles 24/7', 'Leverage X12: Sin evaluación', 'Forex ECN: Spreads institucionales'].map(item => `
                                <li class="flex items-center gap-4">
                                     <span class="material-symbols-outlined text-[#865BFF] transition-colors">check_circle</span>
                                     <span class="text-sm font-black uppercase tracking-widest">${item}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <a href="${ctaLink}" class="w-full text-center block py-8 bg-[#865BFF] text-white font-black rounded-[2rem] text-xl uppercase tracking-tighter hover:scale-[1.02] transition-all shadow-2xl">
                             ${c.ctaTrader}
                        </a>
                    </div>
                 </div>

                 <!-- INVERSOR -->
                 <div class="relative group p-20 rounded-[5rem] glass-panel border border-slate-100 text-left overflow-hidden hover:bg-[#140633] hover:text-white transition-all duration-700">
                    <div class="relative z-10">
                        <span class="text-[11px] font-black uppercase tracking-[0.8em] text-blue-500 mb-12 block group-hover:text-white/60 transition-colors">Perfil Pasivo</span>
                        <h3 class="text-6xl font-black mb-12 uppercase tracking-tighter leading-none">SOY <br>INVERSOR</h3>
                        <p class="text-xl text-gray-400 font-medium mb-16 leading-relaxed group-hover:text-white/40 transition-colors">Quiero hacer crecer mi capital delegando la operativa en gestión profesional o réplica.</p>
                        
                        <ul class="space-y-6 mb-16">
                            ${['Copy Trading: Réplica automática', 'MAM Equity: Transparencia total', 'MAM Cash: Inversión institucional', 'Social Trading: Red de beneficios'].map(item => `
                                <li class="flex items-center gap-4">
                                     <span class="material-symbols-outlined text-blue-500 transition-colors">check_circle</span>
                                     <span class="text-sm font-black uppercase tracking-widest">${item}</span>
                                </li>
                            `).join('')}
                        </ul>

                        <a href="${ctaLink}" class="w-full text-center block py-8 bg-blue-600 text-white font-black rounded-[2rem] text-xl uppercase tracking-tighter hover:scale-[1.02] transition-all shadow-2xl">
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
                    <div class="p-16 glass-panel border border-slate-100 rounded-[4rem] group hover:bg-[#140633] hover:text-white transition-all duration-500 hover:-translate-y-4">
                        <div class="w-20 h-20 bg-white shadow-xl rounded-[1.5rem] flex items-center justify-center text-[#865BFF] mb-12 group-hover:bg-[#865BFF] group-hover:text-white transition-all transform group-hover:rotate-6">
                            <span class="material-symbols-outlined text-4xl">${s.icon}</span>
                        </div>
                        <h4 class="text-3xl font-black mb-6 uppercase tracking-tighter leading-none">${s.title}</h4>
                        <p class="text-gray-400 font-medium text-lg leading-relaxed group-hover:text-white/40 transition-colors uppercase tracking-widest text-sm">${s.desc}</p>
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
                        <div class="group">
                            <div class="flex flex-col items-center p-8 glass-panel border border-slate-100 rounded-[3rem] hover:bg-white/10 hover:shadow-4xl transition-all transform hover:-translate-y-4 h-full">
                                <span class="text-5xl font-black text-gray-100 group-hover:text-[#865BFF] transition-colors leading-none tracking-tightest mb-8">0${i+1}</span>
                                <h4 class="text-sm font-black uppercase tracking-widest text-center leading-tight mb-4">${s.t}</h4>
                                <p class="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity">${s.d}</p>
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
    const logoUrl = brand.logoUrl || '/logo.png';

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
                    <img src="/logo.png" alt="BM" class="h-10 mb-12">
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
