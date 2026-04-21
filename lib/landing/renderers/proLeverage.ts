import { BrandConfig } from '../types';

// ─── PRO LEVERAGE HERO ──────────────────────────────────────
export function renderLX12Hero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Quiero mi cuenta apalancada";
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
        <!-- Purple Glow Effects -->
        <div class="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-purple-600/10 blur-[120px] rounded-full"></div>
        <div class="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-900/10 blur-[120px] rounded-full"></div>

        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-[#050505]/50 via-[#050505]/90 to-[#050505]"></div>
            <div class="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-10 grayscale"></div>
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="max-w-5xl mx-auto text-center">
                <!-- Product Badge -->
                <div class="inline-flex items-center gap-4 px-6 py-3 bg-purple-600/10 border border-purple-500/30 rounded-full mb-10 backdrop-blur-md animate-fade-in-up">
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-5 border-r border-white/20 pr-4">
                    <span class="text-[10px] font-black text-purple-400 uppercase tracking-[0.4em]">PRO LEVERAGE X12</span>
                </div>

                <div class="mb-6">
                    <span class="text-[10px] text-white/40 uppercase tracking-widest font-black">Presentado por <span class="text-white">${ibName}</span></span>
                </div>

                <h1 class="text-5xl md:text-8xl font-black font-montserrat text-white mb-8 leading-[1.1] uppercase tracking-tighter">
                    Opera con capital real. <span class="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-purple-600">Sin evaluaciones. Sin esperas.</span>
                </h1>
                
                <p class="text-xl md:text-2xl text-white/60 font-light mb-12 max-w-3xl mx-auto leading-relaxed">
                    Multiplica tu capital hasta x12 y opera directamente en mercados CFDs con una cuenta real financiada por Bridge Markets.
                </p>

                ${ibPhrase ? `<p class="text-lg text-purple-400/80 font-medium mb-12 italic tracking-wide italic leading-relaxed">${ibPhrase}</p>` : ''}

                <!-- Stats Visual -->
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16 max-w-4xl mx-auto">
                    <div class="p-8 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm">
                        <div class="text-3xl font-black text-white mb-2 italic">100%</div>
                        <div class="text-[10px] text-white/30 uppercase tracking-widest font-black leading-tight">División de beneficios</div>
                    </div>
                    <div class="p-8 bg-purple-600/10 border border-purple-500/20 rounded-3xl backdrop-blur-sm shadow-[0_0_50px_rgba(168,85,247,0.1)]">
                        <div class="text-3xl font-black text-purple-400 mb-2 italic">x12 Real</div>
                        <div class="text-[10px] text-white/30 uppercase tracking-widest font-black leading-tight">Capital Apalancado</div>
                    </div>
                    <div class="p-8 bg-white/[0.02] border border-white/10 rounded-3xl backdrop-blur-sm">
                        <div class="text-3xl font-black text-white mb-2 italic">Día 3</div>
                        <div class="text-[10px] text-white/30 uppercase tracking-widest font-black leading-tight">Retiro de ganancias</div>
                    </div>
                </div>

                <div class="flex justify-center">
                    <a href="${ctaLink}" class="group relative px-12 py-6 bg-purple-600 text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(147,51,234,0.4)]">
                        <span class="relative z-10 uppercase tracking-widest text-sm">${ctaText}</span>
                    </a>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── ABOUT / COMPARISON ─────────────────────────────────────
export function renderLX12Intro(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#080808]">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center mb-32 section-reveal">
                <div>
                    <span class="text-purple-500 font-black text-xs uppercase tracking-widest mb-6 block">Acceso Directo a Capital</span>
                    <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-10 uppercase leading-tight">¿Qué es la Cuenta PRO LEVERAGE X12?</h2>
                    <div class="space-y-6 text-white/60 text-lg leading-relaxed">
                        <p>La Cuenta PRO LEVERAGE X12 es un producto de acceso directo a capital real, diseñado para traders con experiencia que buscan multiplicar su capacidad operativa sin aumentar su capital inicial.</p>
                        <p class="p-8 bg-purple-600/5 border-l-4 border-purple-500 rounded-r-3xl">Al adquirir la cuenta, Bridge Markets te otorga un apalancamiento real de 12x sobre tu depósito. No existe fase de evaluación ni challenge previo. Empiezas a operar desde el primer día en mercados CFDs con el capital apalancado activo.</p>
                        <p class="font-bold text-white italic">El 100% de los beneficios netos generados son para el trader.</p>
                    </div>
                </div>
                <div class="relative">
                    <img src="/images/imagenes%20nuevas/reyna%20rosa.png" class="w-full max-w-md mx-auto drop-shadow-[0_0_50px_rgba(168,85,247,0.3)] transform -rotate-6 animate-pulse-slow">
                </div>
            </div>

            <!-- Comparison Table -->
            <div class="section-reveal">
                <h3 class="text-2xl font-black text-white mb-12 uppercase text-center">Diferencia clave vs PropFirm</h3>
                <div class="overflow-x-auto">
                    <table class="w-full text-left border-collapse bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden">
                        <thead>
                            <tr class="border-b border-white/10 bg-white/[0.03]">
                                <th class="py-8 px-6 text-[10px] font-black text-white/30 uppercase tracking-widest">Característica</th>
                                <th class="py-8 px-6 text-[10px] font-black text-purple-400 uppercase tracking-widest">PRO LEVERAGE X12</th>
                                <th class="py-8 px-6 text-[10px] font-black text-white/30 uppercase tracking-widest">PROPFIRM (Elite)</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            ${[
                                ['¿Requiere evaluación?', '❌ No. Acceso directo', '✅ Sí. Challenge previo'],
                                ['Tipo de mercado', 'CFDs (Forex, índices, commodities)', 'Forex/CFDs o Sintéticos'],
                                ['Apalancamiento', '12x el depósito real', 'Capital asignado por BM'],
                                ['División de beneficios', '100% para el trader', '70–80% para el trader'],
                                ['Objetivo de ganancia', 'Sin objetivo obligatorio', '8% para superar challenge'],
                                ['Tope de ganancias', '400% del valor de compra', '10% del valor de la cuenta'],
                                ['Retiro de profits', 'Desde el día 3 (mín. 2%)', 'Cada 14 días'],
                                ['Liquidación total', 'Desde el día 45', 'No aplica (cuenta permanente)']
                            ].map(row => `
                                <tr class="hover:bg-white/[0.03] transition-colors">
                                    <td class="py-6 px-6 text-xs font-bold text-white/80 uppercase">${row[0]}</td>
                                    <td class="py-6 px-6 text-sm text-purple-300 font-bold italic">${row[1]}</td>
                                    <td class="py-6 px-6 text-sm text-white/30">${row[2]}</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── ACCOUNT SIZES ──────────────────────────────────────────
export function renderLX12Pricing(content: Record<string, any>, brand: BrandConfig): string {
    const ctaText = content.ctaText || "Comprar ahora";
    const ctaLink = brand.ctaLink || "#";

    const sizes = [
        { b: '$600', p: '$50' },
        { b: '$1.200', p: '$100' },
        { b: '$2.400', p: '$200' },
        { b: '$3.600', p: '$300' },
        { b: '$6.000', p: '$500' },
        { b: '$12.000', p: '$1,000' },
        { b: '$24.000', p: '$2,000' },
        { b: '$36.000', p: '$3,000' }
    ];

    return `
    <section id="precios" class="py-32 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-6 uppercase">Elige el tamaño de tu cuenta</h2>
                <p class="text-white/40 text-lg max-w-2xl mx-auto">Elige el balance de cuenta que mejor se adapte a tu estrategia. Todos los tamaños incluyen el mismo apalancamiento x12 y el 100% de los beneficios.</p>
            </div>

            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 section-reveal">
                ${sizes.map(s => `
                    <div class="group relative p-10 bg-white/[0.02] border border-white/10 rounded-[2.5rem] hover:border-purple-500/50 transition-all hover:translate-y-[-8px]">
                        <div class="absolute top-6 right-8 text-[10px] font-black text-purple-500 uppercase tracking-widest italic">x12 Real</div>
                        <div class="mb-8">
                            <span class="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-2 italic">Balance de Cuenta</span>
                            <div class="text-4xl font-black text-white font-montserrat italic">${s.b} <span class="text-sm font-light text-white/30">USD</span></div>
                        </div>
                        <div class="mb-10 p-4 bg-white/5 rounded-2xl border border-white/5">
                            <span class="text-[10px] font-black text-white/30 uppercase tracking-widest block mb-1 italic">Precio de Compra</span>
                            <div class="text-2xl font-black text-purple-400 italic">${s.p} <span class="text-xs font-light text-white/30">USD</span></div>
                        </div>
                        <a href="${ctaLink}" class="block w-full py-4 bg-white text-black text-center font-black rounded-xl uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all shadow-xl">
                            ${ctaText}
                        </a>
                    </div>
                `).join('')}
            </div>
            
            <p class="mt-12 text-center text-[10px] text-white/20 uppercase tracking-[0.2em] font-black italic">
                Los precios pueden variar. Consulta condiciones vigentes en tu portal de cliente.
            </p>
        </div>
    </section>
    `;
}

// ─── EXAMPLE / CALCULATOR ──────────────────────────────────
export function renderLX12Example(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#080808] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <span class="text-purple-500 font-black text-xs uppercase tracking-widest mb-4 block">Entiende el poder de tu cuenta</span>
                <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-6 uppercase">¿Cómo funciona? Ejemplo real</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-3 gap-8 section-reveal">
                <div class="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center">
                    <div class="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <span class="material-symbols-outlined text-white text-3xl">payments</span>
                    </div>
                    <h4 class="text-sm font-black text-white/40 uppercase mb-2">Tu Depósito</h4>
                    <div class="text-4xl font-black text-white">$200 <span class="text-xs font-normal">USD</span></div>
                    <p class="mt-4 text-xs text-white/30 uppercase font-bold tracking-widest">Tu capital inicial real</p>
                </div>

                <div class="p-10 bg-purple-600/10 border border-purple-500/30 rounded-[3.5rem] text-center transform scale-110 z-10 shadow-2xl">
                    <div class="w-16 h-16 bg-purple-500/20 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <span class="material-symbols-outlined text-purple-400 text-3xl">bolt</span>
                    </div>
                    <h4 class="text-sm font-black text-purple-300 uppercase mb-2">Capital Apalancado</h4>
                    <div class="text-5xl font-black text-white">$2.400 <span class="text-xs font-normal">USD</span></div>
                    <p class="mt-4 text-xs text-purple-400 uppercase font-black tracking-widest">Apalancamiento x12 activo</p>
                </div>

                <div class="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] text-center">
                    <div class="w-16 h-16 bg-red-500/10 rounded-2xl flex items-center justify-center mx-auto mb-8">
                        <span class="material-symbols-outlined text-red-500 text-3xl">warning</span>
                    </div>
                    <h4 class="text-sm font-black text-white/40 uppercase mb-2">Límite de Pérdida</h4>
                    <div class="text-4xl font-black text-red-500">$240 <span class="text-xs font-normal text-white/30">USD</span></div>
                    <p class="mt-4 text-xs text-white/30 uppercase font-bold tracking-widest">10% sobre el apalancado</p>
                </div>
            </div>

            <div class="mt-20 p-8 bg-white/[0.01] border border-white/5 rounded-3xl text-center max-w-3xl mx-auto section-reveal">
                <p class="text-white/40 text-sm leading-relaxed italic">
                    <span class="text-white font-bold not-italic">✅ EJEMPLO OFICIAL:</span> Depósito de 200 USD → Balance apalancado de 2.400 USD (12x). Límite de pérdida: 10% del balance apalancado = 240 USD. <br>
                    <span class="text-[10px] mt-4 block">Nota: la estructura de cuenta contempla un 20% adicional del broker sobre el depósito inicial.</span>
                </p>
            </div>
        </div>
    </section>
    `;
}

// ─── RULES AND CONDITIONS ──────────────────────────────────
export function renderLX12Rules(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#050505]">
        <div class="max-w-4xl mx-auto">
            <div class="flex items-center gap-6 mb-16 section-reveal">
                <img src="/images/imagenes%20nuevas/rey%20rosa.png" class="h-24 drop-shadow-[0_0_30px_rgba(168,85,247,0.2)]">
                <div>
                    <h2 class="text-4xl font-black font-montserrat text-white uppercase tracking-tight">Condiciones y Reglas</h2>
                    <p class="text-purple-500 font-bold uppercase tracking-widest text-xs mt-2">Protocolo Institucional de Riesgo</p>
                </div>
            </div>

            <div class="space-y-6 section-reveal">
                <!-- Regla 1.1 -->
                <div class="rule-item p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem]">
                    <div class="flex items-center gap-4 mb-6">
                        <span class="w-8 h-8 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center font-black text-xs">1.1</span>
                        <h3 class="text-xl font-black text-white uppercase">Pérdida de la cuenta (límite 10%)</h3>
                    </div>
                    <p class="text-red-500/80 font-bold mb-8 p-4 bg-red-500/5 border border-red-500/20 rounded-xl text-sm uppercase tracking-widest">
                        ⚠️ REGLA CRÍTICA: Si alcanzas o superas el 10% de pérdida sobre el valor de la cuenta apalancada, la cuenta se da por perdida e INHABILITADA.
                    </p>
                    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div class="p-4 bg-[#050505] rounded-xl border border-white/5">
                            <span class="text-[10px] font-black text-white/30 uppercase block mb-2">Pérdida puntual</span>
                            <p class="text-xs text-white/60">Si la pérdida llega al 10% del balance apalancado en cualquier momento.</p>
                        </div>
                        <div class="p-4 bg-[#050505] rounded-xl border border-white/5">
                            <span class="text-[10px] font-black text-white/30 uppercase block mb-2">Pérdida acumulada</span>
                            <p class="text-xs text-white/60">Si en cualquier momento tu capital baja al 90% del balance inicial.</p>
                        </div>
                        <div class="p-4 bg-[#050505] rounded-xl border border-white/5">
                            <span class="text-[10px] font-black text-white/30 uppercase block mb-2">Pérdida diaria</span>
                            <p class="text-xs text-white/60">Si pierdes un 10% respecto a la equidad de las 00:00 UTC servidor.</p>
                        </div>
                    </div>
                </div>

                <!-- Otras Reglas -->
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div class="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem]">
                        <h4 class="text-sm font-black text-white mb-4 uppercase flex items-center gap-3">
                            <span class="material-symbols-outlined text-purple-500">do_not_disturb_on</span>
                            Sin depósitos adicionales
                        </h4>
                        <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest">Las cuentas son productos CERRADOS. No admiten nuevos depósitos tras su activación.</p>
                    </div>
                    <div class="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem]">
                        <h4 class="text-sm font-black text-white mb-4 uppercase flex items-center gap-3">
                            <span class="material-symbols-outlined text-purple-500">front_hand</span>
                            Trading Manual Únicamente
                        </h4>
                        <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest">Prohibido el uso de Bots (HFT), Copy Trading o estructuras MAM/PAMM.</p>
                    </div>
                    <div class="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem]">
                        <h4 class="text-sm font-black text-white mb-4 uppercase flex items-center gap-3">
                            <span class="material-symbols-outlined text-purple-500">emoji_events</span>
                            Límite de Ganancia (400%)
                        </h4>
                        <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest">El beneficio máximo por cuenta es del 400% del valor de compra inicial.</p>
                    </div>
                    <div class="p-8 bg-white/[0.02] border border-white/10 rounded-[2.5rem]">
                        <h4 class="text-sm font-black text-white mb-4 uppercase flex items-center gap-3">
                            <span class="material-symbols-outlined text-purple-500">timer</span>
                            Restricción Scalping (5m)
                        </h4>
                        <p class="text-xs text-white/40 leading-relaxed uppercase tracking-widest">No se permiten operaciones menores a 5 minutos. Evita la cancelación por scalping extremo.</p>
                    </div>
                </div>
            </div>
            
            <p class="mt-16 text-center text-[10px] text-white/20 uppercase tracking-[0.4em] font-black section-reveal">
                "Propósito de estas reglas: Proteger la integridad del producto y evitar prácticas de alto riesgo."
            </p>
        </div>
    </section>
    `;
}

// ─── WITHDRAWALS ────────────────────────────────────────────
export function renderLX12Withdrawals(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#080808] border-y border-white/5 relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col lg:flex-row gap-20 items-center section-reveal">
                <div class="flex-1">
                    <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white mb-8 uppercase leading-none">Retiros y Condiciones Operativas</h2>
                    <p class="text-xl text-white/50 mb-12">Producto directo a liquidez. Tu capital está disponible bajo las siguientes ventanas de tiempo oficial:</p>
                    
                    <div class="space-y-6">
                        <div class="p-8 bg-purple-600/10 border border-purple-500/20 rounded-[2rem] flex items-center gap-8">
                            <div class="text-4xl font-black text-white font-montserrat italic shrink-0">DÍA 3</div>
                            <div>
                                <h4 class="text-sm font-black text-white uppercase mb-1">Retiro de PROFITS (Ganancias)</h4>
                                <p class="text-xs text-white/40 uppercase tracking-widest">Mínimo el 2% del balance inicial de la cuenta.</p>
                            </div>
                        </div>
                        <div class="p-8 bg-white/[0.02] border border-white/10 rounded-[2rem] flex items-center gap-8">
                            <div class="text-4xl font-black text-white font-montserrat italic shrink-0">DÍA 45</div>
                            <div>
                                <h4 class="text-sm font-black text-white uppercase mb-1">Liquidadción Total</h4>
                                <p class="text-xs text-white/40 uppercase tracking-widest">Retira el 100% de beneficio + capital inicial.</p>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="flex-1">
                    <div class="p-12 bg-white/[0.02] border border-white/10 rounded-[3rem] relative">
                        <div class="absolute -top-10 -right-10 w-32 h-32 opacity-20">
                            <img src="/images/imagenes%20nuevas/reloj rosa.png" class="w-full h-full object-contain">
                        </div>
                        <h4 class="text-2xl font-black text-white mb-8 uppercase">Seguridad del Sistema</h4>
                        <div class="flex items-start gap-4 p-6 bg-red-500/5 rounded-2xl border border-red-500/10 mb-6">
                            <span class="material-symbols-outlined text-red-500">lock</span>
                            <p class="text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                                <span class="text-white font-black block mb-2">Bloqueo Inicial</span>
                                30% del capital bloqueado por 60 días para garantizar la exposición al mercado real.
                            </p>
                        </div>
                        <p class="text-[10px] text-white/30 uppercase tracking-[0.2em] font-medium leading-relaxed">
                            * Debes haber realizado al menos 1 operación en la cuenta para calificar a liquidación total.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── BENEFITS ───────────────────────────────────────────────
export function renderLX12Benefits(content: Record<string, any>, brand: BrandConfig): string {
    const benefits = [
        { t: 'Sin challenge ni evaluación', d: 'Acceso directo al capital apalancado desde el primer día. No necesitas demostrar nada.' },
        { t: '100% de los beneficios', d: 'Todo lo que generes es tuyo. Bridge Markets no toma parte de tus ganancias.' },
        { t: 'Apalancamiento x12 real', d: 'Tu capital se multiplica por 12 desde la activación. Opera mucho más con menos.' },
        { t: 'Retiro desde el día 3', d: 'Si tienes ganancias (mín. 2%), puedes retirarlas desde el tercer día operativo.' },
        { t: 'Liquidación al día 45', d: 'Retira capital + ganancias completos a partir del día 45 de actividad.' },
        { t: 'Mercados de Alta Liquidez', d: 'Opera Forex, índices y commodities con condiciones profesionales de mercado real.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
            <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-20 uppercase text-center">¿Por qué elegir PRO LEVERAGE X12?</h2>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-reveal">
                ${benefits.map(b => `
                    <div class="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem] hover:bg-white/[0.04] transition-all group">
                        <div class="w-12 h-12 bg-purple-600/10 rounded-xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform">
                            <span class="material-symbols-outlined text-purple-500">verified</span>
                        </div>
                        <h4 class="text-lg font-black text-white mb-4 uppercase">${b.t}</h4>
                        <p class="text-sm text-white/40 leading-relaxed">${b.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── COMMUNITY ──────────────────────────────────────────────
export function renderLX12Community(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestro ecosistema de traders apalancados. Aquí operamos con capital real desde el primer día.';
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1611974717482-aa8a29910609?auto=format&fit=crop&q=80";
    
    const telegram = content.socialTelegram || brand.telegram || "#";
    const whatsapp = content.socialWhatsApp || brand.whatsapp || "#";
    const instagram = content.socialInstagram || brand.instagram || "#";
    const youtube = content.socialYouTube || brand.youtube || "#";
    
    const supportLabel = content.supportLabel || "Soporte del IB";
    const ctaText = content.ctaText || "Habla con un asesor";
    const ctaLink = brand.ctaLink || "#";

    return `
    <section id="comunidad" class="py-32 px-8 bg-[#080808] relative overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="bg-gradient-to-br from-purple-600/10 via-transparent to-slate-900 border border-white/10 rounded-[4rem] p-12 md:p-24 relative overflow-hidden section-reveal">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
                    <div>
                        <span class="text-purple-500 font-black text-xs uppercase tracking-[0.4em] mb-8 block italic">Sección Personalizada</span>
                        <h2 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-10 uppercase italic leading-none">${ibName}</h2>
                        <div class="text-white/60 text-lg md:text-xl leading-relaxed mb-12 italic">
                            ${message}
                        </div>
                        
                        <div class="flex flex-wrap gap-4 mb-12">
                            ${whatsapp !== '#' ? `<a href="https://wa.me/${whatsapp}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all"><span class="material-symbols-outlined text-sm italic">chat</span></a>` : ''}
                            ${telegram !== '#' ? `<a href="${telegram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#24A1DE] transition-all"><span class="material-symbols-outlined text-sm italic">send</span></a>` : ''}
                            ${instagram !== '#' ? `<a href="${instagram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#E1306C] transition-all"><span class="material-symbols-outlined text-sm italic">photo_camera</span></a>` : ''}
                            ${youtube !== '#' ? `<a href="${youtube}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#FF0000] transition-all"><span class="material-symbols-outlined text-sm italic">play_circle</span></a>` : ''}
                        </div>

                        <div class="flex flex-wrap gap-6">
                            <a href="${ctaLink}" class="px-10 py-5 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all shadow-xl italic">
                                ${ctaText}
                            </a>
                            <a href="${whatsapp !== '#' ? `https://wa.me/${whatsapp}` : '#'}" class="px-10 py-5 bg-purple-600/20 text-purple-400 border border-purple-500/30 rounded-2xl font-black uppercase tracking-widest text-[10px] hover:bg-purple-600 hover:text-white transition-all italic">
                                ${supportLabel}
                            </a>
                        </div>
                    </div>
                    <div class="relative hidden lg:block">
                        <div class="aspect-square rounded-[3rem] overflow-hidden border border-white/10 shadow-2xl group">
                            <img src="${photoUrl}" class="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" alt="Community">
                        </div>
                    </div>
                </div>
                
                <div class="absolute -bottom-20 -right-20 w-1/2 h-1/2 opacity-5 pointer-events-none">
                    <img src="/images/imagenes%20nuevas/caballo rosa.png" class="w-full h-full object-contain transform -rotate-12">
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── FAQ ────────────────────────────────────────────────────
export function renderLX12Faq(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Necesito pasar un challenge para esta cuenta?', a: 'No. La Cuenta PRO LEVERAGE X12 es de acceso directo. Una vez comprada y activada, empiezas a operar sin ninguna evaluación previa.' },
        { q: '¿Cuánto capital voy a tener disponible?', a: 'Tu depósito se multiplica x12. Ejemplo: depositas $200 y operas con $2.400 de balance apalancado.' },
        { q: '¿Puedo depositar más dinero después?', a: 'No. Las cuentas apalancadas son productos cerrados. Una vez activadas, no admiten depósitos adicionales.' },
        { q: '¿Cuándo puedo retirar mis ganancias?', a: 'A partir del día 3 puedes retirar profits con un mínimo del 2% del balance inicial.' },
        { q: '¿Puedo retirar mi capital también?', a: 'Sí, a partir del día 45 puedes liquidar la cuenta completa y retirar el 100% de beneficios + capital.' },
        { q: '¿Cuál es el máximo que puedo ganar?', a: 'El tope es el 400% del valor de compra inicial. Ejemplo: compras por $1.000 → puedes ganar hasta $4.000 de utilidad.' },
        { q: '¿Puedo usar un robot o EA?', a: 'No. Esta cuenta es solo para trading manual. Bots, copy trading y estructuras MAM/PAMM están prohibidos.' },
        { q: '¿Qué pasa si pierdo el 10%?', a: 'La cuenta queda inhabilitada. Se aplica el límite de pérdida del 10% sobre el balance apalancado total.' },
        { q: '¿Qué mercados puedo operar?', a: 'CFDs: Forex, índices y commodities disponibles en la plataforma MetaTrader 5 de Bridge Markets.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505]">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-16 text-center uppercase">Preguntas Frecuentes</h2>
            <div class="space-y-4">
                ${faqs.map(faq => `
                    <div class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:border-purple-500/30 transition-all group">
                        <h4 class="text-white font-bold mb-3 italic group-hover:text-purple-400 transition-colors">${faq.q}</h4>
                        <p class="text-white/40 text-sm leading-relaxed">${faq.a}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── FINAL CTA ──────────────────────────────────────────────
export function renderLX12FinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaLink = brand.ctaLink || "#";

    return `
    <section class="py-40 px-8 bg-gradient-to-t from-purple-900/20 to-[#050505] relative overflow-hidden">
        <div class="max-w-5xl mx-auto text-center relative z-10 section-reveal">
            <p class="text-purple-400 font-bold uppercase tracking-[0.4em] mb-12 text-sm max-w-2xl mx-auto leading-relaxed">
                'Las Cuentas Apalancadas x12 son una herramienta potente de alto rendimiento que exige disciplina en la gestión del riesgo, cumplimiento estricto y control emocional.'
            </p>
            <h2 class="text-5xl md:text-8xl font-black font-montserrat text-white mb-12 uppercase leading-none tracking-tighter">¿Listo para operar con capital real?</h2>
            
            <a href="${ctaLink}" class="inline-block px-16 py-8 bg-white text-black font-black rounded-2xl hover:bg-purple-600 hover:text-white transition-all text-sm uppercase tracking-widest hover:scale-105 active:scale-95 shadow-2xl">
                Activar mi cuenta X12 →
            </a>
            
            <p class="mt-20 text-[10px] text-white/20 uppercase tracking-[0.2em] font-black max-w-xl mx-auto leading-relaxed">
                'El trading con apalancamiento implica alto riesgo. Puedes perder parte o todo tu capital. Opera con responsabilidad.'
            </p>
        </div>
        
        <div class="absolute -bottom-20 left-1/2 -translate-x-1/2 w-full h-full opacity-10 pointer-events-none">
            <img src="/images/imagenes%20nuevas/peones rosa.png" class="w-full h-full object-contain object-bottom">
        </div>
    </section>
    `;
}

// ─── FOOTER (EDITABLE) ──────────────────────────────────────
export function renderLX12Footer(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.fullName || "Partner Oficial";
    const supportLink = content.socialWhatsApp ? `https://wa.me/${content.socialWhatsApp}` : (brand.whatsapp ? `https://wa.me/${brand.whatsapp}` : brand.ctaLink || "#");

    return `
    <footer class="py-20 px-8 bg-[#020202] border-t border-purple-500/10">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 mb-20">
                <div>
                    <div class="text-2xl font-black text-white mb-6 uppercase tracking-tighter italic">Bridge <span class="text-purple-500">Markets</span></div>
                    <p class="text-white/30 text-[10px] leading-relaxed uppercase tracking-[0.2em] font-black italic">Presentado por ${ibName}</p>
                </div>
                <div class="space-y-4">
                    <div class="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic">Contacto Corporativo</div>
                    <p class="text-sm text-white/60 font-medium italic">corporate@bridgemarkets.global</p>
                    <p class="text-sm text-white/60 font-medium italic">+1 (786) 979-3392</p>
                </div>
                <div class="space-y-4 text-right md:text-right">
                    <div class="text-[10px] font-black text-white/40 uppercase tracking-[0.3em] italic">Soporte y Portal</div>
                    <a href="https://www.bridgemarkets.global" class="text-sm text-white/60 hover:text-purple-400 transition-colors block font-medium italic">www.bridgemarkets.global</a>
                    <a href="${supportLink}" class="text-sm text-white/60 hover:text-purple-400 transition-colors block font-medium italic">Soporte del IB</a>
                </div>
            </div>
            
            <div class="p-8 bg-white/[0.02] border border-white/5 rounded-3xl mb-12">
                <p class="text-[9px] text-white/20 leading-relaxed uppercase tracking-widest font-medium italic">
                    Aviso Legal: El trading de CFDs con apalancamiento conlleva un alto nivel de riesgo para su capital y puede dar lugar a pérdidas que superen su depósito inicial. Los productos de Bridge Markets no son adecuados para todos los inversores. Asegúrese de comprender plenamente los riesgos implicados y busque asesoramiento independiente si es necesario. Bridge Markets LTD no ofrece sus servicios a residentes de ciertas jurisdicciones como EE. UU., Irán, Corea del Norte, entre otros.
                </p>
            </div>

            <div class="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-[10px] text-white/10 uppercase tracking-widest font-black italic">© 2026 Bridge Markets. Todos los derechos reservados.</p>
                <div class="flex gap-8">
                    <a href="#" class="text-[10px] text-white/10 uppercase tracking-widest hover:text-white transition-colors font-black italic">Aviso Legal</a>
                    <a href="#" class="text-[10px] text-white/10 uppercase tracking-widest hover:text-white transition-colors font-black italic">Privacidad</a>
                </div>
            </div>
        </div>
    </footer>`;
}

