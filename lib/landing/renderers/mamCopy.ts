import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderMCHero(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'mc_hero')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';

    return `
    <section class="relative min-h-[95vh] flex flex-col pt-10 pb-32 px-8 overflow-hidden bg-white">
        <!-- Blobs de Profundidad -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-[#865BFF]/5 rounded-full blur-[120px] animate-pulse"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[100px]"></div>
            <div class="absolute inset-0 opacity-[0.03]" style="background-image: radial-gradient(#140633 1px, bg-white 1px); background-size: 40px 40px;"></div>
        </div>
        
        <div class="max-w-7xl mx-auto w-full relative z-10 flex-grow flex flex-col pt-24">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 lg:gap-32 items-center flex-grow">
                <div class="section-reveal">
                    <div class="flex items-center gap-4 mb-12">
                        <span class="inline-block px-5 py-2 rounded-full bg-[#865BFF]/10 text-[#865BFF] text-[10px] font-black uppercase tracking-[0.4em] border border-[#865BFF]/20 shadow-sm">Partner Certificado: ${ibName}</span>
                    </div>
                    
                    <h1 class="text-6xl md:text-8xl lg:text-[7.5rem] font-black font-headline leading-[0.85] mb-12 tracking-tightest text-[#140633] uppercase drop-shadow-sm">
                        ${c.title}
                    </h1>
                    
                    <div class="max-w-xl mb-16 relative">
                        <div class="absolute left-0 top-0 w-1.5 h-full bg-[#865BFF] rounded-full"></div>
                        <p class="text-2xl text-gray-500 leading-relaxed font-medium pl-10">
                            ${c.subtitle}
                        </p>
                    </div>

                    ${brand.heroPhrase ? `<p class="text-xl text-[#865BFF] mb-16 font-black italic opacity-80 decoration-[#865BFF]/30 underline underline-offset-8">"${brand.heroPhrase}"</p>` : ''}
                    
                    <div class="flex flex-col sm:flex-row gap-8">
                        <a href="#register" class="group relative px-14 py-7 bg-[#865BFF] text-white font-black rounded-[2rem] shadow-[0_30px_60px_-15px_rgba(134,91,255,0.5)] hover:shadow-[0_45px_90px_-15px_rgba(134,91,255,0.6)] hover:-translate-y-2 transition-all flex items-center justify-center gap-4 text-xl">
                            <span class="uppercase tracking-tighter">${c.cta1}</span>
                            <span class="material-symbols-outlined group-hover:translate-x-2 transition-transform">bolt</span>
                        </a>
                        <a href="#learn" class="group px-14 py-7 bg-white border-2 border-slate-100 text-[#140633] font-black rounded-[2rem] shadow-[0_15px_30px_rgba(0,0,0,0.03)] hover:border-[#140633] hover:-translate-y-2 transition-all flex items-center justify-center gap-4 text-xl uppercase tracking-tighter">
                            ${c.cta2}
                        </a>
                    </div>
                </div>

                <div class="relative section-reveal lg:block hidden" style="animation-delay: 0.2s;">
                    <div class="relative z-10 p-8 border border-white bg-white/60 backdrop-blur-3xl rounded-[5rem] shadow-[0_60px_120px_-20px_rgba(20,6,51,0.15)]">
                        <div class="aspect-square bg-[#140633] rounded-[4.5rem] p-4 shadow-2xl relative group overflow-hidden">
                             <div class="absolute inset-0 bg-gradient-to-tr from-[#865BFF]/40 to-transparent mix-blend-overlay opacity-50"></div>
                             <div class="absolute inset-0 border-[20px] border-white/5 rounded-[4rem]"></div>
                             <div class="w-full h-full flex flex-col justify-center items-center gap-8 relative z-10">
                                <span class="material-symbols-outlined text-[180px] text-white/5 drop-shadow-[0_0_40px_rgba(134,91,255,0.5)]">shield_person</span>
                                <div class="text-center">
                                    <div class="text-xs font-black text-[#865BFF] uppercase tracking-[0.6em] mb-4">Bridge Markets</div>
                                    <div class="text-5xl font-black text-white uppercase tracking-tighter leading-none">Institutional <br>Standard</div>
                                </div>
                             </div>
                        </div>
                    </div>
                    
                    <div class="absolute -bottom-12 -right-12 p-10 bg-white rounded-[2.5rem] shadow-[0_30px_60px_rgba(0,0,0,0.1)] border border-slate-50 flex flex-col gap-4 z-20">
                        <div class="flex items-center gap-5">
                            <div class="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 shadow-inner">
                                <span class="material-symbols-outlined text-4xl">terminal</span>
                            </div>
                            <div>
                                <div class="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-none mb-2">V3 Core Systems</div>
                                <div class="text-2xl font-black text-[#140633]">Trading Active</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderMCIntro(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section id="learn" class="py-48 bg-white relative">
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-32 items-center section-reveal">
                <div class="max-w-2xl">
                    <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[0.8em] mb-10 block">Filosofía de Inversión</span>
                    <h2 class="text-6xl font-black text-[#140633] leading-[0.85] mb-12 uppercase tracking-tightest">La infraestructura que redefine el éxito.</h2>
                    <p class="text-2xl text-gray-500 font-light leading-relaxed">
                        No se trata solo de copiar operaciones, se trata de acceder a una red institucional diseñada para la consistencia a largo plazo.
                    </p>
                </div>
                <div class="grid grid-cols-1 gap-10">
                    <div class="p-12 glass-panel rounded-[3rem] border border-slate-100 hover:shadow-3xl hover:bg-white/10 transition-all transform hover:-translate-x-4 group">
                        <div class="flex items-center gap-8 mb-8">
                            <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-4xl">account_balance</span></div>
                            <h4 class="text-3xl font-black text-[#140633] uppercase tracking-tighter">MAM Ecosystem</h4>
                        </div>
                        <p class="text-gray-400 font-medium text-lg leading-relaxed">Gestión centralizada de múltiples cuentas bajo una sola terminal maestra con ejecución LPOA.</p>
                    </div>
                    <div class="p-12 glass-panel rounded-[3rem] border border-slate-100 hover:shadow-3xl hover:bg-white/10 transition-all transform hover:-translate-x-2 group">
                        <div class="flex items-center gap-8 mb-8">
                            <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 group-hover:scale-110 transition-transform"><span class="material-symbols-outlined text-4xl">auto_awesome</span></div>
                            <h4 class="text-3xl font-black text-[#140633] uppercase tracking-tighter">Social Copy</h4>
                        </div>
                        <p class="text-gray-400 font-medium text-lg leading-relaxed">Replicación automatizada de milisegundos para inversores que buscan control individual absoluto.</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderMCMamBlock(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section id="mam" class="py-48 glass-panel relative overflow-hidden">
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,#3B82F608,transparent_50%)]"></div>
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="mb-40 section-reveal text-center lg:text-left">
                <span class="text-blue-600 text-[11px] font-black uppercase tracking-[0.6em] mb-10 block">Institutional Asset Management</span>
                <h2 class="text-7xl md:text-[9rem] font-black text-[#140633] uppercase tracking-tightest leading-[0.8] mb-16">CUENTAS <br><span class="text-blue-600 drop-shadow-2xl">MAM</span></h2>
                <div class="max-w-4xl h-2 w-48 bg-blue-600 mb-16 rounded-full mx-auto lg:mx-0"></div>
                <p class="text-3xl text-gray-500 font-light max-w-3xl leading-relaxed mx-auto lg:mx-0 pr-10">La robustez del sistema Maestro Multi-Cuentas de Bridge Markets para gestores de alto rendimiento.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40 section-reveal">
                ${[
                    { icon: 'hub', title: 'Centralizada', desc: 'Control total de subcuentas desde una terminal operativa.' },
                    { icon: 'bolt', title: 'Ultra Fast', desc: 'Ejecución simultánea en todos los clientes sin latencia.' },
                    { icon: 'balance', title: 'Equitativa', desc: 'Distribución de lotaje proporcional basada en el capital.' },
                    { icon: 'security', title: 'Auditada', desc: 'Transparencia total para que el cliente audite su equity.' }
                ].map((item, i) => `
                    <div class="bg-white p-14 rounded-[3.5rem] border border-slate-100 shadow-[0_20px_50px_rgba(20,6,51,0.05)] hover:shadow-[0_50px_100px_rgba(20,6,51,0.12)] transition-all transform hover:-translate-y-6 group">
                        <div class="w-20 h-20 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-12 group-hover:bg-blue-600 group-hover:text-white transition-all duration-700 shadow-inner">
                            <span class="material-symbols-outlined text-5xl">${item.icon}</span>
                        </div>
                        <h4 class="text-3xl font-black text-[#140633] mb-6 uppercase tracking-tighter">${item.title}</h4>
                        <p class="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] leading-loose">${item.desc}</p>
                    </div>
                `).join('')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 mb-40 section-reveal">
                <div class="p-20 rounded-[5rem] bg-[#140633] text-white shadow-3xl relative overflow-hidden group">
                     <div class="absolute top-0 right-0 w-80 h-80 bg-blue-600/10 rounded-full blur-[120px] group-hover:bg-blue-600/20 transition-all"></div>
                     <h4 class="text-4xl font-black mb-12 uppercase tracking-tighter relative z-10">MODELO EQUITY</h4>
                     <p class="text-2xl text-white/50 mb-16 font-light leading-relaxed relative z-10">Visibilidad absoluta. Cada cliente ve de forma individual la flotación y operaciones activas del gestor.</p>
                     <div class="grid grid-cols-2 gap-8 relative z-10">
                        <div class="p-8 border border-white/5 bg-white/5 rounded-3xl">
                            <div class="text-blue-400 text-3xl font-black mb-2">100%</div>
                            <div class="text-[10px] uppercase font-black tracking-widest opacity-40">Transparencia</div>
                        </div>
                        <div class="p-8 border border-white/5 bg-white/5 rounded-3xl">
                            <div class="text-blue-400 text-3xl font-black mb-2">LIVE</div>
                            <div class="text-[10px] uppercase font-black tracking-widest opacity-40">Auditoría</div>
                        </div>
                     </div>
                </div>
                <div class="p-20 rounded-[5rem] bg-white border border-slate-100 shadow-3xl relative overflow-hidden group">
                    <div class="absolute bottom-0 left-0 w-80 h-80 bg-gray-50 rounded-full blur-[100px]"></div>
                    <h4 class="text-4xl font-black text-[#140633] mb-12 uppercase tracking-tighter relative z-10">MODELO CASH</h4>
                    <p class="text-2xl text-gray-500 mb-16 font-light leading-relaxed relative z-10">Gestión por fondeo centralizado. El capital se consolida bajo un enfoque puramente institucional.</p>
                     <div class="flex gap-4 relative z-10">
                         <span class="px-6 py-3 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#140633]">Pool de Liquidez</span>
                         <span class="px-6 py-3 bg-slate-100 rounded-full text-[10px] font-black uppercase tracking-widest text-[#140633]">Master Capital</span>
                     </div>
                </div>
            </div>

            <div class="p-24 bg-white rounded-[5rem] border border-slate-100 shadow-3xl relative overflow-hidden section-reveal">
                <div class="absolute -right-40 -top-40 text-[400px] font-black text-[#140633]/5 select-none pointer-events-none tracking-tightest leading-none">V3</div>
                <div class="relative z-10 flex flex-col items-center text-center max-w-4xl mx-auto">
                    <span class="material-symbols-outlined text-blue-600 text-8xl mb-12 drop-shadow-lg">verified_user</span>
                    <h3 class="text-5xl font-black text-[#140633] mb-10 uppercase tracking-tighter">Protocolo Legal LPOA</h3>
                    <p class="text-3xl text-gray-500 leading-relaxed mb-16 font-light max-w-2xl">
                        "Limited Power of Attorney: La seguridad de que tu capital **siempre** es tuyo."
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-12 w-full text-left">
                        <div class="p-10 glass-panel rounded-[3rem] border border-slate-100 flex gap-8 items-center">
                            <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-blue-600 shrink-0"><span class="material-symbols-outlined text-4xl">lock</span></div>
                            <p class="text-sm font-black text-[#140633] uppercase tracking-[0.2em] leading-relaxed">El gestor tiene restringido el acceso a retiros de fondos de clientes.</p>
                        </div>
                        <div class="p-10 glass-panel rounded-[3rem] border border-slate-100 flex gap-8 items-center">
                            <div class="w-16 h-16 bg-white rounded-2xl shadow-sm border border-slate-100 flex items-center justify-center text-emerald-600 shrink-0"><span class="material-symbols-outlined text-4xl">key</span></div>
                            <p class="text-sm font-black text-[#140633] uppercase tracking-[0.2em] leading-relaxed">Solo el titular de la cuenta puede autorizar depósitos y retiros.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderMCCopyBlock(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section id="copy" class="py-48 bg-white relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-[#F8FAFC] to-white"></div>
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="mb-40 section-reveal text-center lg:text-left">
                <span class="text-emerald-600 text-[11px] font-black uppercase tracking-[0.6em] mb-10 block">Real-Time Sync Infrastructure</span>
                <h2 class="text-7xl md:text-[9rem] font-black text-[#140633] uppercase tracking-tightest leading-[0.8] mb-16">COPY <br><span class="text-emerald-600 drop-shadow-2xl">TRADING</span></h2>
                <div class="max-w-4xl h-2 w-48 bg-emerald-600 mb-16 rounded-full mx-auto lg:mx-0"></div>
                <p class="text-3xl text-gray-500 font-light max-w-3xl leading-relaxed mx-auto lg:mx-0 pr-10">Libertad total. Replica cada movimiento de los mejores traders con un retraso inferior a 10ms.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-40 section-reveal">
                ${[
                    { icon: 'speed', title: '0 Latencia', desc: 'Sincronización instantánea entre cuentas individuales.' },
                    { icon: 'tune', title: 'Risk Control', desc: 'Define lotajes, stop-loss y límites de pérdida propios.' },
                    { icon: 'payments', title: 'Inmediato', desc: 'Retira tus beneficios sin esperar aprobaciones de terceros.' },
                    { icon: 'groups', title: 'Diverso', desc: 'Copia a múltiples estrategias para diversificar tu riesgo.' }
                ].map((item, i) => `
                    <div class="glass-panel p-14 rounded-[3.5rem] border border-slate-100 shadow-inner hover:shadow-3xl hover:bg-white/10 transition-all transform hover:-translate-y-6 group">
                        <div class="w-20 h-20 bg-white rounded-2xl flex items-center justify-center text-emerald-600 mb-12 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-700 shadow-md">
                            <span class="material-symbols-outlined text-5xl">${item.icon}</span>
                        </div>
                        <h4 class="text-3xl font-black text-[#140633] mb-6 uppercase tracking-tighter">${item.title}</h4>
                        <p class="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] leading-loose">${item.desc}</p>
                    </div>
                `).join('')}
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 section-reveal">
                <div class="glass-panel rounded-[5rem] p-20 border border-slate-100 shadow-2xl relative overflow-hidden group">
                    <span class="text-[120px] font-black text-gray-100 absolute -top-10 -right-10 leading-none tracking-tightest group-hover:text-emerald-500/5 transition-colors">SYNC</span>
                    <h4 class="text-emerald-600 text-[11px] font-black uppercase tracking-[0.8em] mb-16 relative z-10">Ventaja Competitiva</h4>
                    <div class="space-y-16 relative z-10">
                        <div>
                            <h5 class="text-3xl font-black text-[#140633] mb-6 uppercase tracking-tighter border-l-8 border-emerald-600 pl-10">Monetización</h5>
                            <p class="text-xl text-gray-400 leading-relaxed font-medium pl-10">Los proveedores de señales cobran comisiones de éxito directamente del beneficio generado.</p>
                        </div>
                        <div>
                            <h5 class="text-3xl font-black text-[#140633] mb-6 uppercase tracking-tighter border-l-8 border-emerald-600 pl-10">Escalabilidad</h5>
                            <p class="text-xl text-gray-400 leading-relaxed font-medium pl-10">Sin límites de seguidores. Tu estrategia puede impactar a miles de inversores a la vez.</p>
                        </div>
                    </div>
                </div>
                <div class="bg-[#140633] rounded-[5rem] p-20 border border-white/5 shadow-3xl relative overflow-hidden group">
                    <h4 class="text-blue-400 text-[11px] font-black uppercase tracking-[0.8em] mb-16">Inversión Pasiva</h4>
                    <div class="space-y-16">
                        <div>
                            <h5 class="text-3xl font-black text-white mb-6 uppercase tracking-tighter border-l-8 border-blue-400 pl-10">Stop Manual</h5>
                            <p class="text-xl text-white/40 leading-relaxed font-medium pl-10">Puedes detener la replicación en un clic, sin contratos de permanencia ni esperas.</p>
                        </div>
                        <div>
                            <h5 class="text-3xl font-black text-white mb-6 uppercase tracking-tighter border-l-8 border-blue-400 pl-10">Control de Lote</h5>
                            <p class="text-xl text-white/40 leading-relaxed font-medium pl-10">Copia de forma proporcional o usa lotajes fijos para una gestión de riesgo personalizada.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderMCComparison(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-48 bg-[#F4F5F7] relative">
        <div class="max-w-7xl mx-auto px-8 section-reveal text-center">
            <h2 class="text-6xl md:text-[8rem] font-black text-[#140633] mb-32 uppercase tracking-tightest leading-none">ANALISIS <br><span class="text-gray-300">DUAL</span></h2>
            
            <div class="bg-white rounded-[5rem] shadow-4xl border border-slate-100 overflow-hidden">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr class="bg-[#140633]">
                                <th class="py-14 px-12 text-white/40 text-[11px] uppercase font-black tracking-[0.5em]">Parámetro de Gestión</th>
                                <th class="py-14 px-12 text-blue-400 text-[11px] uppercase font-black tracking-[0.5em]">MAM Accounts</th>
                                <th class="py-14 px-12 text-emerald-400 text-[11px] uppercase font-black tracking-[0.5em]">Copy Trading</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-slate-50">
                            ${[
                                { c: 'Naturaleza de Gestión', m: 'Gestión Institucional Centralizada', ct: 'Sincronización Individual' },
                                { c: 'Control de Riesgo', m: 'Definido globalmente por el gestor', ct: 'Definido por cada inversionista' },
                                { c: 'Poder Legal (LPOA)', m: 'Requerido para el gestor', ct: 'No requerido (Sync Directo)' },
                                { c: 'Flexibilidad de Fondos', m: 'Fondos segregados por subcuenta', ct: 'Total disponibilidad inmediata' },
                                { c: 'Ejecución Operativa', m: 'Proporcional por Capital', ct: 'Replicada en milisegundos' },
                                { c: 'Perfil Sugerido', m: 'Inversionistas Institucionales / High-Net', ct: 'Retail Traders / Traders Pasivos' }
                            ].map(row => `
                                <tr class="hover:glass-panel transition-colors">
                                    <td class="py-12 px-12 text-[#140633] font-black text-sm uppercase tracking-widest border-r border-slate-50">${row.c}</td>
                                    <td class="py-12 px-12 text-gray-500 text-lg font-medium border-r border-slate-50">${row.m}</td>
                                    <td class="py-12 px-12 text-gray-500 text-lg font-medium">${row.ct}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <p class="mt-16 text-[10px] font-black text-gray-400 uppercase tracking-[0.6em]">Bridge Markets Comparative Engine V3</p>
        </div>
    </section>`;
}

export function renderMCBenefits(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-40 bg-[#140633] relative overflow-hidden">
        <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        <div class="max-w-7xl mx-auto px-8 relative z-10 section-reveal text-center">
            <h2 class="text-4xl font-black text-white/30 mb-24 uppercase tracking-[0.8em] leading-none">Security Stack</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-x-20 gap-y-24">
                ${[
                    'A-Book Execution', 'Capital Segregation', 'Multi-Asset Liquidity', 'Master Gateway MT5',
                    'Bi-Weekly Payouts', 'High-Water Mark Fees', 'V3 Core Bridge', 'SSL Encryption'
                ].map((b, i) => `
                    <div class="flex flex-col items-center gap-8 group">
                        <div class="w-20 h-20 rounded-[1.5rem] border-2 border-white/5 flex items-center justify-center text-[#865BFF] bg-white/5 group-hover:bg-[#865BFF] group-hover:text-white group-hover:border-[#865BFF] transition-all transform group-hover:-rotate-12 shadow-2xl">
                            <span class="material-symbols-outlined text-4xl">verified</span>
                        </div>
                        <span class="text-white/60 font-black text-[11px] uppercase tracking-[0.4em] group-hover:text-white transition-colors">${b}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderMCDualSteps(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-48 bg-white">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="text-center mb-40">
                <h2 class="text-6xl md:text-8xl font-black text-[#140633] uppercase tracking-tighter">RUTA DE <br><span class="text-gray-200">ACCESO</span></h2>
            </div>
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-32">
                <div class="text-left">
                    <div class="flex items-center gap-6 mb-16">
                        <div class="h-px w-16 bg-blue-600"></div>
                        <h3 class="text-[11px] font-black text-blue-600 uppercase tracking-[1em]">Para el Gestor</h3>
                    </div>
                    <div class="space-y-14">
                        ${[
                            { n: '01', t: 'Identidad Digital', d: 'Completa tu registro y verificación KYC bajo el estándar de Bridge Markets.' },
                            { n: '02', t: 'Configuración Maestra', d: 'Habilita tu terminal MAM y conecta tu estrategia Maestra en MT5.' },
                            { n: '03', t: 'Parámetros LPOA', d: 'Firma el acuerdo legal que habilita la gestión proporcional de las subcuentas.' },
                            { n: '04', t: 'Gestión Activa', d: 'Opera y gestiona tus clientes desde un único panel institucional centralizado.' }
                        ].map(step => `
                            <div class="flex gap-12 items-start group">
                                <span class="text-7xl font-black text-blue-50 group-hover:text-blue-600 transition-colors leading-none tracking-tightest">${step.n}</span>
                                <div class="pt-2"><h4 class="text-2xl font-black text-[#140633] mb-4 uppercase tracking-tighter">${step.t}</h4><p class="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] leading-loose">${step.d}</p></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div class="text-left">
                    <div class="flex items-center gap-6 mb-16">
                        <div class="h-px w-16 bg-emerald-600"></div>
                        <h3 class="text-[11px] font-black text-emerald-600 uppercase tracking-[1em]">Para el Inversor</h3>
                    </div>
                    <div class="space-y-14">
                        ${[
                            { n: '01', t: 'Fondeo Directo', d: 'Accede a tu cuenta de inversor y deposita el capital a gestionar en tu billetera segura.' },
                            { n: '02', t: 'Selección de Modelo', d: 'Elige si prefieres delegar en el sistema MAM o replicar vía Copy Trading.' },
                            { n: '03', t: 'Vínculo de Cuenta', d: 'Conéctate a la estrategia o al gestor elegido en tan solo tres clics desde el portal.' },
                            { n: '04', t: 'Performance', d: 'Monitorea el crecimiento de tu capital en tiempo real y gestiona tus retiros bimensuales.' }
                        ].map(step => `
                            <div class="flex gap-12 items-start group">
                                <span class="text-7xl font-black text-emerald-50 group-hover:text-emerald-600 transition-colors leading-none tracking-tightest">${step.n}</span>
                                <div class="pt-2"><h4 class="text-2xl font-black text-[#140633] mb-4 uppercase tracking-tighter">${step.t}</h4><p class="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] leading-loose">${step.d}</p></div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderMCCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'mc_community')!.defaultContent, ...content };
    const communityName = brand.communityName || c.communityName;
    const bannerUrl = c.bannerUrl || 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=2000';
    
    return `
    <section id="community" class="py-48 bg-white relative">
        <div class="max-w-7xl mx-auto px-8 relative z-10 section-reveal">
            <div class="bg-white rounded-[6rem] p-16 lg:p-32 border border-slate-100 shadow-4xl relative overflow-hidden flex flex-col lg:flex-row items-center gap-32 group">
                <div class="absolute inset-0 glass-panel opacity-50 group-hover:opacity-100 transition-opacity"></div>
                <div class="lg:w-1/2 relative">
                    <div class="rounded-[4rem] overflow-hidden shadow-4xl rotate-3 hover:rotate-0 transition-transform duration-1000 aspect-square border-8 border-white">
                        <img src="${bannerUrl}" alt="Banner" class="w-full h-full object-cover">
                    </div>
                    <div class="absolute -bottom-10 -right-10 p-14 bg-[#140633] text-white rounded-[3rem] shadow-4xl z-20">
                        <span class="material-symbols-outlined text-7xl text-[#865BFF]">handshake</span>
                    </div>
                </div>
                <div class="lg:w-1/2 relative z-10">
                    <span class="text-[#865BFF] text-[11px] font-black uppercase tracking-[1em] mb-12 block">Invitación Exclusiva</span>
                    <h2 class="text-6xl font-black text-[#140633] mb-12 uppercase tracking-tightest leading-[0.85]">${communityName}</h2>
                    <p class="text-3xl text-gray-500 font-light italic leading-relaxed mb-16 border-l-[12px] border-[#865BFF] pl-12 shadow-sm italic">"${c.welcomeMessage}"</p>
                    
                    <div class="flex flex-wrap gap-6 mb-20">
                        ${brand.telegram ? `<a href="${brand.telegram}" class="px-12 py-6 bg-white border border-slate-100 text-[#140633] font-black rounded-3xl hover:bg-blue-600 hover:text-white transition-all shadow-xl text-lg">Telegram Community</a>` : ''}
                        ${brand.whatsapp ? `<a href="https://wa.me/${brand.whatsapp}" class="px-12 py-6 bg-white border border-slate-100 text-[#140633] font-black rounded-3xl hover:bg-emerald-600 hover:text-white transition-all shadow-xl text-lg">Direct WhatsApp</a>` : ''}
                    </div>

                    <a href="#register" class="inline-block px-16 py-8 bg-[#140633] text-white font-black rounded-[2.5rem] shadow-[0_30px_60px_-15px_rgba(20,6,51,0.5)] hover:bg-[#865BFF] hover:-translate-y-2 transition-all uppercase tracking-[0.2em] text-xl">Acceder Ahora</a>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderMCFaq(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-48 bg-white border-t border-slate-50">
        <div class="max-w-5xl mx-auto px-8 section-reveal text-center">
            <h2 class="text-6xl font-black text-[#140633] mb-32 uppercase tracking-tightest leading-none">CONSULTAS <br><span class="text-gray-300">FRECUENTES</span></h2>
            
            <div class="space-y-8">
                ${[
                    { q: '¿Qué es exactamente el sistema MAM?', a: 'Es una tecnología de gestión donde un gestor opera una cuenta maestra y el sistema reparte automáticamente los resultados a todas las subcuentas vinculadas proporcionalmente al capital de cada una.' },
                    { q: '¿Tengo que dejar mi computadora encendida para CopyTrading?', a: 'No. La replicación ocurre en la nube, dentro de los servidores de Bridge Markets. Una vez conectada tu cuenta, puedes apagar tu dispositivo y el sistema seguirá replicando 24/5.' },
                    { q: '¿Qué riesgo asumo al copiar a un tercero?', a: 'Asumes el riesgo operativo de la estrategia elegida. Sin embargo, en CopyTrading tú mantienes el control de detener la copia en cualquier momento y de definir tu propio nivel de gestión de riesgo.' }
                ].map((item, i) => `
                    <div class="glass-panel border border-slate-100 p-14 rounded-[4rem] text-left hover:border-[#865BFF]/30 hover:bg-white/10 transition-all group shadow-sm hover:shadow-3xl">
                        <h4 class="text-3xl font-black text-[#140633] mb-8 uppercase tracking-tighter flex items-center gap-8">
                            <span class="w-4 h-4 rounded-full bg-[#865BFF]"></span> ${item.q}
                        </h4>
                        <p class="text-xl text-gray-400 font-medium leading-relaxed pl-12">${item.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderMCFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-48 bg-[#140633] relative overflow-hidden">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
        <div class="absolute inset-0 bg-gradient-to-br from-[#140633] via-[#140633] to-[#865BFF]/30"></div>
        <div class="max-w-7xl mx-auto px-8 relative z-10 text-center section-reveal">
            <h2 class="text-7xl md:text-[10rem] font-black text-white mb-20 uppercase tracking-tightest leading-[0.8] drop-shadow-3xl">DOMINA EL <br><span class="text-[#865BFF]">CAPITAL</span></h2>
            <p class="text-3xl text-white/40 mb-24 font-light uppercase tracking-[0.4em] max-w-5xl mx-auto">MAM para el enfoque institucional · Copy Trading para la libertad total.</p>
            
            <div class="flex flex-wrap justify-center gap-12 mb-32">
                <a href="#register" class="px-20 py-10 bg-white text-[#140633] font-black rounded-[3rem] hover:shadow-[0_50px_100px_rgba(255,255,255,0.3)] transition-all transform hover:scale-110 uppercase text-2xl tracking-tighter shadow-2xl">Empezar MAM</a>
                <a href="#register" class="px-20 py-10 bg-emerald-500 text-white font-black rounded-[3rem] hover:shadow-[0_50px_100px_rgba(16,185,129,0.4)] transition-all transform hover:scale-110 uppercase text-2xl tracking-tighter shadow-2xl">Hacer CopyTrading</a>
            </div>

            <div class="max-w-4xl mx-auto p-16 border border-white/5 rounded-[5rem] bg-white/5 backdrop-blur-3xl relative overflow-hidden group">
                <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
                <p class="text-[11px] text-white/30 uppercase tracking-[0.6em] font-black leading-[2.2] text-center">
                    Advertencia de Riesgo: El trading de margen conlleva un alto nivel de riesgo para su capital y solo debe operar con dinero que pueda permitirse perder. Bridge Markets LTD.
                </p>
            </div>
        </div>
    </section>`;
}

export function renderMCFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';
    const isLight = true;
    return `
    <footer class="py-48 bg-white border-t border-slate-50 relative z-10">
        <div class="max-w-7xl mx-auto px-8">
            <div class="flex flex-col lg:flex-row justify-between gap-40 mb-32 section-reveal">
                <div class="max-w-md">
                    <img src="/logo.png" alt="Bridge Markets" class="w-12 h-12 object-contain filter ${isLight ? 'brightness-0' : 'brightness-100'}">
                    <p class="text-gray-400 text-lg font-bold uppercase tracking-widest leading-loose mb-16">Infraestructura institucional V3. Bridge Markets LTD está regulado internacionalmente para garantizar la máxima seguridad de fondos segregados.</p>
                    <div class="p-12 glass-panel rounded-[4rem] border border-slate-100 flex gap-10 items-center">
                        <div class="w-20 h-20 bg-white rounded-[1.5rem] shadow-sm flex items-center justify-center text-[#865BFF] text-3xl font-black">
                            ${ibName.charAt(0)}
                        </div>
                        <div>
                             <span class="block text-[10px] font-black text-gray-400 uppercase tracking-[0.6em] mb-3">Official Partner Network</span>
                             <span class="text-3xl font-black text-[#140633] uppercase leading-none tracking-tighter">${ibName}</span>
                        </div>
                    </div>
                </div>
                <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-24">
                    <div>
                        <h4 class="text-[#140633] font-black text-xs uppercase tracking-[0.8em] mb-12">Divisiones</h4>
                        <ul class="space-y-8 text-sm text-gray-400 font-black uppercase tracking-[0.2em]">
                            <li><a href="#" class="hover:text-[#865BFF] transition-colors">Maestra MAM V3</a></li>
                            <li><a href="#" class="hover:text-[#865BFF] transition-colors">Social Copy Engine</a></li>
                            <li><a href="#" class="hover:text-[#865BFF] transition-colors">Liquidez A-Book</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-[#140633] font-black text-xs uppercase tracking-[0.8em] mb-12">Recursos</h4>
                        <ul class="space-y-8 text-sm text-gray-400 font-black uppercase tracking-[0.2em]">
                            <li><a href="#" class="hover:text-[#865BFF] transition-colors">Centro de Ayuda</a></li>
                            <li><a href="#" class="hover:text-[#865BFF] transition-colors">Portal Legal</a></li>
                            <li><a href="#" class="hover:text-[#865BFF] transition-colors">Documentación LPOA</a></li>
                        </ul>
                    </div>
                    <div>
                        <h4 class="text-[#140633] font-black text-xs uppercase tracking-[0.8em] mb-12">Contacto</h4>
                        <ul class="space-y-8 text-sm text-gray-500 font-black uppercase tracking-[0.2em]">
                            <li>Soporte 24/5</li>
                            <li>Bridge Markets Global</li>
                            <li>St. Vincent & Grenadines</li>
                        </ul>
                    </div>
                </div>
            </div>
            <div class="pt-24 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-12">
                <span class="text-xs font-black text-gray-300 uppercase tracking-[0.8em]">© 2026 BridgeMarkets. All Rights Reserved. V3 Premium Release.</span>
                <div class="flex gap-16 opacity-20 grayscale">
                     <img src="/logo.png" alt="BM" class="h-8">
                </div>
            </div>
        </div>
    </footer>`;
}
