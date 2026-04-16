import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderLX12Hero(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'lx12_hero')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';

    return `
    <section class="relative min-h-screen flex items-center pt-28 pb-32 px-8 overflow-hidden bg-[#05010f]">
        <!-- Animación de Fondo Premium -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-0 right-0 w-[800px] h-[800px] bg-[#865BFF]/10 rounded-full blur-[150px] animate-pulse"></div>
            <div class="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]"></div>
            <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div class="section-reveal">
                <div class="flex items-center gap-4 mb-10">
                    <img src="/logo.png" alt="BM" class="h-6 opacity-80">
                    <div class="h-4 w-[1px] bg-white/20"></div>
                    <span class="text-[10px] font-black uppercase tracking-[0.4em] text-[#865BFF]">Presentado por ${ibName}</span>
                </div>

                <div class="inline-flex items-center gap-2 px-4 py-2 bg-[#865BFF] rounded-full mb-8 shadow-[0_0_30px_rgba(134,91,255,0.4)]">
                    <span class="material-symbols-outlined text-white text-sm">verified</span>
                    <span class="text-[10px] font-black text-white uppercase tracking-widest">PRO LEVERAGE X12</span>
                </div>

                <h1 class="text-6xl md:text-8xl font-black font-headline leading-[0.9] text-white mb-10 tracking-tightest uppercase">
                    ${c.title}
                </h1>
                
                <p class="text-xl md:text-2xl text-white/50 leading-relaxed max-w-xl mb-12 font-medium">
                    ${c.subtitle}
                </p>

                <div class="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-16 py-8 border-y border-white/5">
                    <div>
                        <div class="text-4xl font-black text-white mb-1">100%</div>
                        <div class="text-[9px] font-black text-[#865BFF] uppercase tracking-widest">División de Beneficios</div>
                    </div>
                    <div>
                        <div class="text-4xl font-black text-white mb-1">X12</div>
                        <div class="text-[9px] font-black text-[#865BFF] uppercase tracking-widest">Apalancamiento Real</div>
                    </div>
                    <div>
                        <div class="text-4xl font-black text-white mb-1">DÍA 3</div>
                        <div class="text-[9px] font-black text-[#865BFF] uppercase tracking-widest">Retiro de Ganancias</div>
                    </div>
                </div>

                ${brand.heroPhrase ? `<p class="text-lg text-white/70 italic mb-12 pl-6 border-l-2 border-[#865BFF]">${brand.heroPhrase}</p>` : ''}

                <div class="flex flex-col sm:flex-row gap-6">
                    <a href="#pricing" class="group px-12 py-6 bg-[#865BFF] text-white font-black rounded-2xl shadow-[0_20px_40px_rgba(134,91,255,0.3)] hover:shadow-[0_25px_60px_rgba(134,91,255,0.5)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 text-lg uppercase tracking-widest">
                        ${c.ctaText} <span class="material-symbols-outlined group-hover:translate-x-1 transition-transform">rocket_launch</span>
                    </a>
                </div>
            </div>

            <div class="relative section-reveal lg:block hidden">
                <div class="relative p-2 bg-gradient-to-br from-white/20 to-transparent rounded-[4rem] shadow-2xl">
                    <div class="bg-[#05010f] rounded-[3.8rem] overflow-hidden p-10 border border-white/5 relative">
                        <!-- Simulated Chart Interface -->
                        <div class="space-y-6 opacity-40">
                            <div class="h-4 w-1/3 bg-white/10 rounded-full"></div>
                            <div class="h-64 bg-gradient-to-t from-transparent via-[#865BFF]/10 to-transparent rounded-2xl border border-white/5 relative overflow-hidden">
                                <div class="absolute inset-0 flex items-center justify-center">
                                    <div class="w-full h-[1px] bg-[#865BFF]/30"></div>
                                </div>
                                <div class="absolute bottom-10 left-10 text-white font-black text-4xl">X12</div>
                            </div>
                            <div class="grid grid-cols-2 gap-4">
                                <div class="h-20 bg-white/5 rounded-2xl"></div>
                                <div class="h-20 bg-[#865BFF]/20 rounded-2xl"></div>
                            </div>
                        </div>
                        <!-- Centered Badge -->
                        <div class="absolute inset-0 flex items-center justify-center">
                            <div class="px-8 py-4 bg-white text-black font-black rounded-2xl shadow-4xl rotate-[-5deg] text-xl tracking-tighter">INSTANT ACCESS</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderLX12Intro(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#0a0515] relative overflow-hidden">
        <div class="max-w-4xl mx-auto text-center section-reveal">
            <span class="text-[#865BFF] text-[10px] font-black uppercase tracking-[0.6em] mb-10 block">Concepto Pro Leverage</span>
            <h2 class="text-4xl md:text-6xl font-black text-white mb-12 uppercase tracking-tightest leading-tight">¿Qué es la Cuenta <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#865BFF]">PRO LEVERAGE X12?</span></h2>
            
            <div class="p-12 md:p-16 rounded-[4rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl text-left relative group">
                <div class="absolute -top-10 -left-10 w-24 h-24 bg-[#865BFF]/20 rounded-full blur-2xl group-hover:bg-[#865BFF]/40 transition-all"></div>
                <p class="text-xl md:text-2xl text-white/50 leading-relaxed font-medium">
                    La Cuenta PRO LEVERAGE X12 es un producto de acceso directo a capital real, diseñado para traders con experiencia que buscan multiplicar su capacidad operativa sin aumentar su capital inicial. Al adquirir la cuenta, Bridge Markets te otorga un apalancamiento real de 12x sobre tu depósito. No existe fase de evaluación ni challenge previo. Empiezas a operar desde el primer día en mercados CFDs con el capital apalancado activo. El 100% de los beneficios netos generados son para el trader.
                </p>
            </div>
        </div>
    </section>`;
}

export function renderLX12TableCompare(content: Record<string, any>, brand: BrandConfig): string {
    const rows = [
        { c: '¿Requiere evaluación?', lx: '❌ No. Acceso directo', pf: '✅ Sí. Challenge previo' },
        { c: 'Tipo de mercado', lx: 'CFDs (Forex, índices, commodities)', pf: 'Forex/CFDs o Sintéticos' },
        { c: 'Apalancamiento', lx: '12x el depósito real', pf: 'Capital asignado por BM' },
        { c: 'División de beneficios', lx: '100% para el trader', pf: '70–80% para el trader' },
        { c: 'Objetivo de ganancia', lx: 'Sin objetivo obligatorio', pf: '8% para superar el challenge' },
        { c: 'Retiro de profits', lx: 'Desde el día 3 (mín. 2%)', pf: 'Cada 14 días' },
        { c: 'Liquidación total', lx: 'Desde el día 45', pf: 'No aplica (cuenta permanente)' },
    ];

    return `
    <section class="py-32 px-8 bg-[#05010f] relative">
        <div class="max-w-6xl mx-auto section-reveal">
            <div class="text-center mb-24">
                <h2 class="text-4xl font-black text-white uppercase tracking-widest">DIFERENCIA CLAVE VS PROPFIRM</h2>
                <div class="h-1 w-20 bg-emerald-500 mx-auto mt-6 rounded-full"></div>
            </div>

            <div class="rounded-[4rem] border border-white/10 overflow-hidden bg-white/5 shadow-2xl backdrop-blur-sm">
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse min-w-[700px]">
                        <thead>
                            <tr class="bg-white/5">
                                <th class="py-8 px-10 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">Característica</th>
                                <th class="py-8 px-10 text-[10px] font-black text-[#865BFF] uppercase tracking-[0.3em]">PRO LEVERAGE X12</th>
                                <th class="py-8 px-10 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">PROPFIRM (Obsidian/Elite)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            ${rows.map(r => `
                                <tr class="hover:bg-white/[0.02] transition-colors">
                                    <td class="py-6 px-10 text-white font-bold text-sm tracking-tight">${r.c}</td>
                                    <td class="py-6 px-10 text-white font-black text-sm">${r.lx}</td>
                                    <td class="py-6 px-10 text-white/40 text-sm font-medium">${r.pf}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderLX12Pricing(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'lx12_pricing')!.defaultContent, ...content };
    const plans = [
        { balance: '$600', price: '$50' },
        { balance: '$1.200', price: '$100' },
        { balance: '$2.400', price: '$200' },
        { balance: '$3.600', price: '$300' },
        { balance: '$6.000', price: '$500' },
        { balance: '$12.000', price: '$1,000' },
        { balance: '$24.000', price: '$2,000' },
        { balance: '$36.000', price: '$3,000' },
    ];

    return `
    <section id="pricing" class="py-32 px-8 bg-[#0a0515] relative">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="text-center mb-24">
                <h2 class="text-5xl font-black text-white mb-6 uppercase tracking-tighter">ELIGE EL TAMAÑO DE TU CUENTA</h2>
                <p class="text-xl text-white/40 max-w-2xl mx-auto font-medium">Todos los tamaños incluyen el mismo apalancamiento x12 y el 100% de los beneficios para el trader.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                ${plans.map(p => `
                    <div class="p-10 rounded-[2.5rem] border border-white/5 bg-white/[0.02] hover:bg-[#865BFF]/5 hover:border-[#865BFF]/50 transition-all group flex flex-col items-center">
                        <div class="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.4em] mb-4">Account Balance</div>
                        <div class="text-5xl font-black text-white mb-8 tracking-tighter">${p.balance}</div>
                        <div class="w-full h-px bg-white/5 mb-8"></div>
                        <div class="text-center mb-10">
                            <div class="text-[10px] font-black text-white/30 uppercase tracking-widest mb-1">Precio Compra</div>
                            <div class="text-3xl font-black text-emerald-400">${p.price} <span class="text-xs text-white/40">USD</span></div>
                        </div>
                        <a href="#register" class="w-full py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-black text-xs uppercase tracking-widest hover:bg-[#865BFF] hover:border-[#865BFF] transition-all text-center">
                            ${c.ctaText}
                        </a>
                    </div>
                `).join('')}
            </div>
            
            <p class="text-center mt-12 text-white/20 text-[10px] font-bold uppercase tracking-widest">
                *Los precios pueden variar. Consulta condiciones vigentes en tu portal de cliente.
            </p>
        </div>
    </section>`;
}

export function renderLX12Example(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#05010f] relative overflow-hidden">
        <div class="max-w-6xl mx-auto section-reveal">
            <div class="text-center mb-24">
                <h2 class="text-4xl font-black text-white uppercase tracking-widest">EJEMPLO DE APALANCAMIENTO</h2>
                <div class="h-1 w-24 bg-[#865BFF] mx-auto mt-6 rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div class="p-12 rounded-[3.5rem] bg-white text-black group text-center shadow-2xl transform hover:-translate-y-2 transition-all">
                    <span class="material-symbols-outlined text-black text-6xl mb-8">payments</span>
                    <h3 class="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-50">Tu Depósito</h3>
                    <div class="text-5xl font-black tracking-tighter mb-4">$200 <span class="text-lg">USD</span></div>
                    <p class="text-xs font-bold uppercase tracking-widest opacity-40">Capital Real Invertido</p>
                </div>

                <div class="p-12 rounded-[3.5rem] bg-[#865BFF] text-white group text-center shadow-[0_0_60px_rgba(134,91,255,0.4)] relative overflow-hidden transform hover:-translate-y-2 transition-all">
                    <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <span class="material-symbols-outlined text-white text-6xl mb-8">bolt</span>
                    <h3 class="text-[10px] font-black uppercase tracking-[0.4em] mb-2 opacity-60">Capital Apalancado</h3>
                    <div class="text-5xl font-black tracking-tighter mb-4">$2.400 <span class="text-lg">USD</span></div>
                    <p class="text-xs font-bold uppercase tracking-widest opacity-60">Poder de Operación (X12)</p>
                </div>

                <div class="p-12 rounded-[3.5rem] bg-white/5 border border-white/10 text-white group text-center transform hover:-translate-y-2 transition-all">
                    <span class="material-symbols-outlined text-red-500 text-6xl mb-8">gpp_maybe</span>
                    <h3 class="text-[10px] font-black uppercase tracking-[0.4em] mb-2 text-white/40">Límite de Pérdida</h3>
                    <div class="text-5xl font-black tracking-tighter mb-4">$240 <span class="text-lg text-red-500">USD</span></div>
                    <p class="text-xs font-bold uppercase tracking-widest text-red-500/50">10% del Capital Apalancado</p>
                </div>
            </div>

            <div class="mt-16 p-8 bg-black/40 rounded-3xl border border-white/5 text-center">
                <p class="text-white/40 text-sm font-medium">
                    <span class="text-emerald-400 font-bold">Nota de Transparencia:</span> La estructura de cuenta contempla un 20% adicional del broker sobre el depósito inicial para garantizar margen operativo.
                </p>
            </div>
        </div>
    </section>`;
}

export function renderLX12Rules(content: Record<string, any>, brand: BrandConfig): string {
    const rules = [
        { q: 'Pérdida de la cuenta (Límite 10%)', a: 'Si alcanzas o superas el 10% de pérdida sobre el valor de la cuenta apalancada, la cuenta queda inhabilitada de forma permanente. Esto aplica tanto para pérdida puntual, acumulada o diaria.' },
        { q: 'Depósitos adicionales restringidos', a: 'Las cuentas apalancadas son productos cerrados. Una vez activadas, NO admiten nuevos depósitos. Para aumentar capital, se debe adquirir una nueva cuenta.' },
        { q: 'Prohibición de Software Externo', a: 'Está prohibido el uso de bots (HFT o tradicionales), copy trading o estructuras MAM. Es un producto para trading manual exclusivamente.' },
        { q: 'Límite de Ganancias (400%)', a: 'El beneficio máximo retirable es del 400% del valor de compra inicial. Una vez alcanzado, la cuenta cumple su ciclo operacional.' },
        { q: 'Restricción de Scalping Extremo', a: 'No se permiten operaciones con duración menor a 5 minutos. Incumplir esta regla conlleva la cancelación de la cuenta y sus beneficios.' },
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0515] relative">
        <div class="max-w-4xl mx-auto section-reveal">
            <div class="text-center mb-24">
                <h2 class="text-4xl font-black text-white uppercase tracking-widest">CONDICIONES Y REGLAS</h2>
                <div class="h-1 w-20 bg-red-500/50 mx-auto mt-6 rounded-full"></div>
            </div>

            <div class="space-y-6">
                ${rules.map((r, i) => `
                    <div class="bg-white/5 border border-white/5 p-10 rounded-3xl group hover:border-[#865BFF]/30 transition-all">
                        <h4 class="text-xl font-black text-white mb-6 uppercase tracking-tighter flex items-center gap-6">
                            <span class="text-[#865BFF]">0${i + 1}</span> ${r.q}
                        </h4>
                        <p class="text-white/40 font-medium leading-relaxed">${r.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderLX12Withdrawals(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#05010f] relative border-y border-white/5">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center section-reveal">
            <div>
                <span class="text-emerald-500 text-[10px] font-black uppercase tracking-[0.8em] mb-10 block">Liquidez de Salida</span>
                <h2 class="text-5xl font-black text-white mb-10 uppercase tracking-tighter leading-tight">Retiros Rápidos y <br>Sencillos.</h2>
                <p class="text-xl text-white/50 leading-relaxed font-medium mb-12">
                    Nadie guarda tu dinero más tiempo del necesario. Disfruta de beneficios reales en periodos cortos de tiempo.
                </p>
                <div class="space-y-8">
                    <div class="flex gap-8 group">
                        <div class="w-16 h-16 bg-white rounded-2xl flex items-center justify-center text-black font-black text-2xl group-hover:bg-emerald-500 group-hover:text-white transition-all shadow-xl">3</div>
                        <div>
                            <h4 class="text-xl font-black text-white mb-2 uppercase tracking-tight">Cosecha de Profits (Día 3)</h4>
                            <p class="text-white/40 text-sm font-medium">Retira tus ganancias acumuladas con un mínimo del 2% del balance inicial.</p>
                        </div>
                    </div>
                    <div class="flex gap-8 group">
                        <div class="w-16 h-16 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center text-white font-black text-2xl group-hover:bg-[#865BFF] transition-all shadow-xl">45</div>
                        <div>
                            <h4 class="text-xl font-black text-white mb-2 uppercase tracking-tight">Liquidación Total (Día 45)</h4>
                            <p class="text-white/40 text-sm font-medium">Retira tu capital inicial + el 100% de beneficios generados y cierra el ciclo.</p>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="p-16 rounded-[4rem] bg-[#865BFF] text-white shadow-[0_0_80px_rgba(134,91,255,0.3)] relative overflow-hidden">
                <div class="absolute right-[-20%] top-[-20%] w-[400px] h-[400px] bg-white/10 rounded-full blur-[100px]"></div>
                <h3 class="text-3xl font-black mb-10 uppercase tracking-tightest">BLOQUEO DE SEGURIDAD</h3>
                <p class="text-lg opacity-80 leading-relaxed mb-10 font-medium italic">
                    "El 30% del capital de compra queda bloqueado por 60 días al activar la cuenta para garantizar exposición real al mercado y estabilidad operativa."
                </p>
                <div class="flex items-center gap-4 text-[10px] font-black uppercase tracking-widest opacity-60">
                    <span class="material-symbols-outlined">verified</span> Standard Compliance
                </div>
            </div>
        </div>
    </section>`;
}

export function renderLX12Benefits(content: Record<string, any>, brand: BrandConfig): string {
    const bens = [
        { icon: 'lock_open', t: 'Sin Challenge', d: 'Empieza en real sin evaluaciones previas.' },
        { icon: 'trending_up', t: '100% Profits', d: 'Todo el beneficio neto es para ti.' },
        { icon: 'bolt', t: 'x12 Leverage', d: 'Multiplica tu poder de compra instantáneamente.' },
        { icon: 'schedule', t: 'Retiro día 3', d: 'Liquidez rápida para tus ganancias.' },
        { icon: 'rocket', t: 'Velocidad', d: 'Activación de cuenta en menos de 24h.' },
        { icon: 'public', t: 'CFDs Globales', d: 'Opera Forex, Oro e Índices Mayores.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0515] relative">
        <div class="max-w-7xl mx-auto section-reveal text-center">
            <h2 class="text-5xl font-black text-white mb-24 uppercase tracking-widest">WHY BRIDGE MARKETS?</h2>
            <div class="grid grid-cols-2 lg:grid-cols-3 gap-8">
                ${bens.map(b => `
                    <div class="p-10 rounded-[2.5rem] bg-white text-black group hover:shadow-[0_20px_50px_rgba(255,255,255,0.1)] transition-all flex flex-col items-center">
                        <span class="material-symbols-outlined text-black text-5xl mb-6 group-hover:scale-125 transition-transform">${b.icon}</span>
                        <h4 class="text-xl font-black uppercase tracking-tighter mb-4">${b.t}</h4>
                        <p class="text-xs font-bold opacity-40 uppercase tracking-widest leading-relaxed">${b.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderLX12Community(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'lx12_community')!.defaultContent, ...content };
    const ibName = brand.communityName || brand.fullName || 'IB Oficial';

    return `
    <section class="py-32 px-8 bg-[#05010f] relative">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="p-16 lg:p-24 rounded-[5rem] bg-white text-black flex flex-col lg:flex-row items-center gap-20 shadow-4xl relative overflow-hidden group">
                <div class="absolute inset-0 bg-gradient-to-tr from-slate-50 to-white"></div>
                
                <div class="lg:w-1/2 relative space-y-10">
                    <div class="inline-flex items-center gap-4 px-6 py-2 bg-black text-white rounded-full">
                        <span class="text-[9px] font-black uppercase tracking-[0.4em]">Official Community</span>
                    </div>
                    <h2 class="text-6xl font-black uppercase leading-[0.85] tracking-tightest">PRO <br>${ibName}</h2>
                    <p class="text-2xl text-gray-500 font-light italic leading-relaxed border-l-8 border-[#865BFF] pl-10 shadow-sm">
                        "${brand.heroPhrase || c.welcomeMessage}"
                    </p>
                    
                    <div class="flex flex-wrap gap-4 pt-6">
                        ${brand.whatsapp ? `<a href="https://wa.me/${brand.whatsapp}" class="p-4 bg-emerald-500 text-white rounded-2xl flex items-center justify-center shadow-lg"><span class="material-symbols-outlined text-4xl">chat</span></a>` : ''}
                        ${brand.telegram ? `<a href="${brand.telegram}" class="px-10 py-4 bg-[#865BFF] text-white font-black rounded-2xl flex items-center justify-center shadow-lg text-sm uppercase tracking-widest">Join Telegram</a>` : ''}
                    </div>
                </div>

                <div class="lg:w-1/2 relative">
                    <div class="aspect-video bg-[#05010f] rounded-[3rem] overflow-hidden shadow-4xl group-hover:scale-105 transition-transform duration-700 relative">
                        <div class="absolute inset-0 bg-gradient-to-br from-[#865BFF]/30 via-transparent to-transparent"></div>
                        <div class="w-full h-full flex items-center justify-center">
                            <span class="material-symbols-outlined text-white text-[120px] opacity-10">groups</span>
                        </div>
                    </div>
                    <div class="absolute -bottom-6 -left-6 p-8 bg-[#865BFF] text-white rounded-3xl shadow-2xl">
                        <div class="text-3xl font-black">X12</div>
                        <div class="text-[9px] font-black uppercase tracking-widest opacity-60">Verified Support</div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderLX12Faq(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Necesito pasar un challenge?', a: 'No. La Cuenta PRO LEVERAGE X12 es de acceso directo. Una vez comprada y activada, empiezas a operar sin ninguna evaluación previa.' },
        { q: '¿Cuánto capital voy a tener disponible?', a: 'Tu depósito se multiplica x12. Ejemplo: compras una cuenta de $1.200 por tan solo $100 y operas con ese balance apalancado total.' },
        { q: '¿Puedo depositar más dinero después?', a: 'No. Las cuentas apalancadas son productos cerrados. Una vez activadas, no admiten depósitos adicionales.' },
        { q: '¿Cuándo puedo retirar mis ganancias?', a: 'A partir del día 3 puedes retirar profits con un mínimo del 2% del balance inicial.' },
        { q: '¿Cuál es el máximo que puedo ganar?', a: 'El tope es el 400% del valor de compra inicial. Ejemplo: compras por $1.000 → puedes ganar hasta $4.000 de utilidad.' },
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0515] relative">
        <div class="max-w-4xl mx-auto section-reveal text-center">
            <h2 class="text-4xl font-black text-white mb-24 uppercase tracking-widest">FREQUENTLY ASKED</h2>
            <div class="space-y-6">
                ${faqs.map(f => `
                    <div class="bg-white/5 p-12 rounded-[2.5rem] text-left hover:bg-white/[0.08] transition-all cursor-pointer group">
                        <h4 class="text-xl font-black text-white mb-6 uppercase tracking-tighter group-hover:text-[#865BFF] transition-colors">${f.q}</h4>
                        <p class="text-white/40 leading-relaxed font-medium">${f.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderLX12FinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'lx12_final_cta')!.defaultContent, ...content };
    const ctaLink = brand.ctaLink || '#register';
    return `
    <section class="py-48 px-8 bg-[#865BFF] relative overflow-hidden text-center">
        <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-20"></div>
        <div class="absolute -top-40 -left-40 w-[600px] h-[600px] bg-white/10 rounded-full blur-[120px]"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 section-reveal">
            <h2 class="text-7xl md:text-[10rem] font-black text-white uppercase tracking-tightest leading-[0.8] mb-16 drop-shadow-4xl">GO PRO <br>X12 NOW</h2>
            <p class="text-2xl text-white/60 mb-20 font-light italic max-w-4xl mx-auto leading-relaxed">
                "Las Cuentas Apalancadas x12 son una herramienta potente de alto rendimiento que exige disciplina en la gestión del riesgo, cumplimiento estricto y control emocional."
            </p>
            
            <a href="${ctaLink}" class="px-24 py-10 bg-white text-[#140633] font-black rounded-[3rem] hover:scale-110 shadow-3xl transition-all uppercase text-2xl tracking-tighter inline-block">
                ${c.ctaText}
            </a>
            
            <div class="mt-24 p-12 border border-white/20 bg-black/10 rounded-[3rem] backdrop-blur-3xl text-center">
                <p class="text-[10px] font-black text-white/40 uppercase tracking-[0.6em] leading-loose">
                    Advertencia de Riesgo: El trading con apalancamiento implica alto riesgo. Puedes perder parte o todo tu capital. Bridge Markets LTD.
                </p>
            </div>
        </div>
    </section>`;
}
