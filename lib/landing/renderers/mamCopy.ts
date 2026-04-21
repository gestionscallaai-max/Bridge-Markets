import { BrandConfig } from '../types';

// ─── MAM & COPY HERO (SHARED) ───────────────────────────────
export function renderMamCopyHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Oficial';
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaMamText = content.ctaMamText || "Quiero una cuenta MAM";
    const ctaCopyText = content.ctaCopyText || "Quiero hacer Copy Trading";
    const ctaMamLink = content.ctaMamLink || brand.ctaLink || "#";
    const ctaCopyLink = content.ctaCopyLink || brand.ctaLink || "#";

    return `
    <section class="relative min-h-screen flex items-center pt-20 overflow-hidden bg-[#050505]">
        <!-- Background logic -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-gradient-to-b from-transparent via-[#050505]/80 to-[#050505]"></div>
            <div class="absolute top-0 left-0 w-full h-full bg-[url('https://images.unsplash.com/photo-1639762681485-074b7f938ba0?auto=format&fit=crop&q=80')] bg-cover bg-center opacity-20 grayscale"></div>
        </div>

        <div class="container mx-auto px-8 relative z-10">
            <div class="max-w-5xl mx-auto text-center">
                <!-- IB Badge -->
                <div class="inline-flex items-center gap-4 px-6 py-3 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md animate-fade-in-up">
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-5 object-contain border-r border-white/20 pr-4">
                    <div class="flex items-center gap-2">
                        <span class="w-2 h-2 rounded-full bg-blue-500 animate-pulse"></span>
                        <span class="text-[10px] font-black text-white/60 uppercase tracking-[0.2em]">Partner Oficial: <span class="text-white">${ibName}</span></span>
                    </div>
                </div>

                <h1 class="text-4xl md:text-7xl font-black font-montserrat text-white mb-8 leading-[1.1] uppercase">
                    Gestiona o invierte capital de forma <span class="text-gradient-mamcopy">profesional, automatizada y transparente.</span>
                </h1>
                
                <p class="text-xl md:text-2xl text-white/60 font-light mb-6 max-w-3xl mx-auto leading-relaxed">
                    Accede a las Cuentas MAM y al Copy Trading de Bridge Markets. Dos soluciones. Un mismo ecosistema profesional.
                </p>

                ${ibPhrase ? `<p class="text-lg text-blue-400/80 font-medium mb-12 tracking-wide italic">${ibPhrase}</p>` : ''}

                <!-- Product Badges -->
                <div class="flex flex-wrap justify-center gap-4 mb-12">
                    <div class="px-6 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full flex items-center gap-2">
                        <span class="material-symbols-outlined text-blue-400 text-sm">work</span>
                        <span class="text-[10px] font-black text-white uppercase tracking-widest">💼 Cuentas MAM</span>
                    </div>
                    <div class="px-6 py-2 bg-emerald-500/10 border border-emerald-500/30 rounded-full flex items-center gap-2">
                        <span class="material-symbols-outlined text-emerald-400 text-sm">assignment</span>
                        <span class="text-[10px] font-black text-white uppercase tracking-widest">📋 Copy Trading</span>
                    </div>
                </div>

                <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                    <a href="${ctaMamLink}" class="group relative px-10 py-5 bg-blue-600 text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(37,99,235,0.3)]">
                        <span class="relative z-10 uppercase tracking-widest text-xs">${ctaMamText}</span>
                    </a>
                    <a href="${ctaCopyLink}" class="group relative px-10 py-5 bg-emerald-600 text-white font-black rounded-2xl overflow-hidden transition-all hover:scale-105 active:scale-95 shadow-[0_20px_50px_rgba(16,185,129,0.3)]">
                        <span class="relative z-10 uppercase tracking-widest text-xs">${ctaCopyText}</span>
                    </a>
                </div>
            </div>
        </div>
        
        <div class="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce opacity-20">
            <span class="material-symbols-outlined text-white text-4xl">expand_more</span>
        </div>
    </section>

    <style>
        .text-gradient-mamcopy {
            background: linear-gradient(135deg, #FFF 0%, #3b82f6 50%, #10b981 100%);
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
        }
    </style>
    `;
}

// ─── TABS NAVIGATION (STICKY) ──────────────────────────────
export function renderMamCopyNav(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <div id="product-nav-trigger"></div>
    <div id="product-nav" class="sticky top-0 z-[90] w-full bg-[#050505]/80 backdrop-blur-xl border-b border-white/5 py-4 transition-all duration-500 opacity-0 -translate-y-full">
        <div class="max-w-7xl mx-auto px-8 flex justify-center gap-4 md:gap-8">
            <button onclick="document.getElementById('mam').scrollIntoView({behavior:'smooth'})" class="flex items-center gap-2 px-6 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 hover:bg-blue-500/20 transition-all group">
                <span class="material-symbols-outlined text-blue-500 text-sm">work</span>
                <span class="text-[10px] font-black text-white uppercase tracking-widest">Cuentas MAM</span>
            </button>
            <button onclick="document.getElementById('copy').scrollIntoView({behavior:'smooth'})" class="flex items-center gap-2 px-6 py-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 hover:bg-emerald-500/20 transition-all group">
                <span class="material-symbols-outlined text-emerald-500 text-sm">assignment</span>
                <span class="text-[10px] font-black text-white uppercase tracking-widest">Copy Trading</span>
            </button>
            <button onclick="document.getElementById('comparativa').scrollIntoView({behavior:'smooth'})" class="hidden md:flex items-center gap-2 px-6 py-2 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-all group">
                <span class="material-symbols-outlined text-white/40 text-sm">compare_arrows</span>
                <span class="text-[10px] font-black text-white/60 uppercase tracking-widest">Comparar</span>
            </button>
        </div>
    </div>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const trigger = document.getElementById('product-nav-trigger');
            const nav = document.getElementById('product-nav');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (!entry.isIntersecting) {
                        nav.classList.remove('opacity-0', '-translate-y-full');
                    } else {
                        nav.classList.add('opacity-0', '-translate-y-full');
                    }
                });
            }, { threshold: 0 });

            if (trigger) observer.observe(trigger);
        });
    </script>
    `;
}

// ─── INTRO SECTION (UNIFIED) ────────────────────────────────
export function renderMamCopyIntro(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#050505] text-center">
        <div class="max-w-4xl mx-auto section-reveal">
            <span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6 block">Dos soluciones, un ecosistema</span>
            <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-10 uppercase">Conectando capital con talento</h2>
            
            <div class="space-y-8 text-white/50 text-lg leading-relaxed">
                <p>En el entorno actual de los mercados financieros, han surgido herramientas que permiten optimizar la gestión de inversiones tanto para traders profesionales como para inversionistas.</p>
                <p>Bridge Markets ofrece dos soluciones de alto nivel para conectar capital con talento:</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16 text-left">
                <div class="p-8 bg-blue-500/5 border border-blue-500/10 rounded-[2.5rem] hover:border-blue-500/30 transition-all">
                    <h3 class="text-xl font-black text-white mb-4">💼 Cuentas MAM</h3>
                    <p class="text-sm text-white/40 leading-relaxed">Multi-Account Manager: gestión centralizada y profesional de múltiples cuentas.</p>
                </div>
                <div class="p-8 bg-emerald-500/5 border border-emerald-500/10 rounded-[2.5rem] hover:border-emerald-500/30 transition-all">
                    <h3 class="text-xl font-black text-white mb-4">📋 Copy Trading</h3>
                    <p class="text-sm text-white/40 leading-relaxed">Replicación automática de estrategias verificadas en tiempo real.</p>
                </div>
            </div>
            
            <p class="mt-16 text-white/60 text-lg">Ambos modelos facilitan el acceso a los mercados financieros de forma estructurada, transparente y escalable.</p>
        </div>
    </section>
    `;
}

// ─── MAM BLOCK ──────────────────────────────────────────────
export function renderMamBlock(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section id="mam" class="py-32 px-8 bg-[#080808] relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <img src="/images/imagenes%20nuevas/rey%20rosa.png" class="w-full h-full object-contain object-right transform rotate-12">
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex items-center gap-4 mb-12 section-reveal">
                <div class="w-16 h-16 bg-blue-600/10 rounded-2xl flex items-center justify-center">
                    <span class="material-symbols-outlined text-3xl text-blue-500">work</span>
                </div>
                <div>
                    <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">Cuentas MAM</h2>
                    <p class="text-blue-500 font-bold uppercase tracking-widest text-xs">Multi-Account Manager — Gestión profesional centralizada</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start section-reveal">
                <div>
                    <h3 class="text-2xl font-black text-white mb-6 uppercase">¿Qué es una Cuenta MAM?</h3>
                    <p class="text-white/60 text-lg leading-relaxed mb-8">Una cuenta MAM (Multi-Account Manager) es una solución tecnológica que permite a un gestor profesional administrar múltiples cuentas de trading desde una única plataforma.</p>
                    <p class="text-white/60 text-lg leading-relaxed border-l-2 border-blue-500 pl-6">Todas las operaciones realizadas en la cuenta principal del gestor se replican automáticamente en las cuentas de los inversionistas, de forma proporcional al capital de cada uno.</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    ${[
                        { i: 'account_balance', t: 'Gestión centralizada', d: 'Administra múltiples cuentas desde un solo lugar.' },
                        { i: 'bolt', t: 'Ejecución simultánea', d: 'Operaciones replicadas al instante en toda la red.' },
                        { i: 'analytics', t: 'Distribución proporcional', d: 'Resultados asignados según el capital de cada cuenta.' },
                        { i: 'search', t: 'Transparencia total', d: 'Control detallado y auditoría de cada operación.' }
                    ].map(f => `
                        <div class="p-6 bg-white/[0.02] border border-white/10 rounded-3xl hover:bg-white/[0.04] transition-all group">
                            <span class="material-symbols-outlined text-blue-500 mb-4 group-hover:scale-110 transition-transform">${f.i}</span>
                            <h4 class="text-sm font-black text-white mb-2 uppercase">${f.t}</h4>
                            <p class="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">${f.d}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <!-- Types -->
            <div class="mt-32 grid grid-cols-1 md:grid-cols-2 gap-8 section-reveal">
                <div class="p-10 bg-gradient-to-br from-blue-600/20 to-transparent border border-blue-500/20 rounded-[3rem]">
                    <h4 class="text-2xl font-black text-white mb-6 uppercase">MAM EQUITY</h4>
                    <p class="text-white/50 mb-8 text-sm">El inversionista puede visualizar en tiempo real todas las operaciones del gestor.</p>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 text-xs font-bold text-white/80 uppercase"><span class="text-blue-500">✓</span> Alta transparencia</li>
                        <li class="flex items-center gap-3 text-xs font-bold text-white/80 uppercase"><span class="text-blue-500">✓</span> Monitoreo constante del rendimiento</li>
                        <li class="flex items-center gap-3 text-xs font-bold text-white/80 uppercase"><span class="text-blue-500">✓</span> Control visual del capital</li>
                    </ul>
                </div>
                <div class="p-10 bg-gradient-to-br from-slate-600/20 to-transparent border border-white/10 rounded-[3rem]">
                    <h4 class="text-2xl font-black text-white mb-6 uppercase">MAM CASH</h4>
                    <p class="text-white/50 mb-8 text-sm">El inversionista delega completamente la gestión operativa al trader profesional.</p>
                    <ul class="space-y-3">
                        <li class="flex items-center gap-3 text-xs font-bold text-white/80 uppercase"><span class="text-blue-500">✓</span> Gestión totalmente automatizada</li>
                        <li class="flex items-center gap-3 text-xs font-bold text-white/80 uppercase"><span class="text-blue-500">✓</span> Enfoque pasivo del inversionista</li>
                        <li class="flex items-center gap-3 text-xs font-bold text-white/80 uppercase"><span class="text-blue-500">✓</span> Ejecución profesional de estrategias</li>
                    </ul>
                </div>
            </div>

            <!-- LPOA -->
            <div class="mt-32 bg-white/[0.01] border border-white/5 rounded-[3rem] p-12 section-reveal">
                <div class="flex flex-col md:flex-row gap-12 items-center">
                    <div class="flex-1">
                        <h3 class="text-3xl font-black text-white mb-6">¿Qué es el LPOA?</h3>
                        <p class="text-white/60 text-lg leading-relaxed">El LPOA (Limited Power of Attorney) es un documento legal que autoriza al gestor a ejecutar operaciones en nombre del cliente bajo condiciones previamente establecidas.</p>
                    </div>
                    <div class="flex-1 grid grid-cols-1 gap-4">
                        <div class="flex items-start gap-4 p-6 bg-[#050505] rounded-2xl border border-white/5">
                            <span class="material-symbols-outlined text-blue-500">verified</span>
                            <p class="text-sm text-white/60"><span class="text-white font-bold block mb-1">Propiedad Total</span> El cliente mantiene la propiedad total de sus fondos en todo momento.</p>
                        </div>
                        <div class="flex items-start gap-4 p-6 bg-[#050505] rounded-2xl border border-white/5">
                            <span class="material-symbols-outlined text-red-500">lock</span>
                            <p class="text-sm text-white/60"><span class="text-white font-bold block mb-1">Sin Retiros</span> El gestor NO puede retirar dinero bajo ninguna circunstancia.</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- How it works Stepper -->
            <div class="mt-32 section-reveal">
                <h3 class="text-2xl font-black text-white mb-12 uppercase text-center">¿Cómo funciona una Cuenta MAM?</h3>
                <div class="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
                    ${[
                        { n: '1', t: 'El gestor abre la MAM', d: 'El gestor abre una cuenta MAM con Bridge Markets.' },
                        { n: '2', t: 'Se crean subcuentas', d: 'Se crean subcuentas individuales para cada inversionista.' },
                        { n: '3', t: 'Depósito de fondos', d: 'Los inversionistas depositan fondos en sus respectivas cuentas.' },
                        { n: '4', t: 'Firma del LPOA', d: 'Se firma el acuerdo de gestión autorizada (LPOA).' },
                        { n: '5', t: 'Operación centralizada', d: 'El gestor ejecuta operaciones desde la cuenta principal.' },
                        { n: '6', t: 'Distribución automática', d: 'Las operaciones se distribuyen proporcionalmente a cada subcuenta.' }
                    ].map(step => `
                        <div class="relative p-8 bg-white/[0.02] border border-white/5 rounded-3xl">
                            <div class="text-5xl font-black text-blue-500/20 absolute top-4 right-8">${step.n}</div>
                            <h4 class="text-lg font-black text-white mb-4">${step.t}</h4>
                            <p class="text-sm text-white/40 leading-relaxed">${step.d}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <!-- Advantages for Trader and Investor -->
            <div class="mt-32 grid grid-cols-1 md:grid-cols-2 gap-16 section-reveal">
                <div>
                    <h3 class="text-xl font-black text-blue-500 mb-8 uppercase tracking-widest">Ventajas para el Trader Gestor</h3>
                    <div class="space-y-4">
                        ${[
                            { t: 'Escalabilidad', d: 'Gestiona grandes volúmenes de capital sin operar múltiples cuentas manualmente.' },
                            { t: 'Ingresos adicionales', d: 'Recibe comisiones por rendimiento o gestión como proveedor de estrategias.' },
                            { t: 'Eficiencia operativa', d: 'Ejecución simultánea en múltiples cuentas, reducción de errores y optimización.' },
                            { t: 'Infraestructura profesional', d: 'Servidores rápidos, plataformas MT4/MT5 y soporte técnico continuo.' },
                            { t: 'Crecimiento profesional', d: 'Construye historial verificable, atrae inversionistas y desarrolla tu marca personal.' }
                        ].map(v => `
                            <div class="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex gap-4">
                                <span class="material-symbols-outlined text-blue-500 text-sm pt-1">check_circle</span>
                                <div>
                                    <h4 class="text-sm font-black text-white uppercase mb-1">${v.t}</h4>
                                    <p class="text-xs text-white/40">${v.d}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div>
                    <h3 class="text-xl font-black text-blue-400 mb-8 uppercase tracking-widest">Ventajas para el Inversionista</h3>
                    <div class="space-y-4">
                        ${[
                            { t: 'Acceso a gestión profesional', d: 'Tu capital es operado por un trader certificado bajo condiciones controladas.' },
                            { t: 'Transparencia total', d: 'Monitorea en tiempo real las operaciones según el tipo de cuenta MAM elegida.' },
                            { t: 'Control sobre el capital', d: 'Mantienes la propiedad de tus fondos en todo momento. El gestor solo opera, no retira.' },
                            { t: 'Flexibilidad en niveles de riesgo', d: 'Elige el perfil de riesgo y el tipo de cuenta que mejor se adapte a tus objetivos.' },
                            { t: 'Operaciones proporcionales', d: 'Las ganancias y pérdidas se distribuyen según tu participación de capital.' }
                        ].map(v => `
                            <div class="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex gap-4">
                                <span class="material-symbols-outlined text-blue-400 text-sm pt-1">check_circle</span>
                                <div>
                                    <h4 class="text-sm font-black text-white uppercase mb-1">${v.t}</h4>
                                    <p class="text-xs text-white/40">${v.d}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── COPY TRADING BLOCK ─────────────────────────────────────
export function renderCopyBlock(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section id="copy" class="py-32 px-8 bg-[#050505] relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/3 h-full opacity-10 pointer-events-none">
            <img src="/images/imagenes%20nuevas/caballo%20rosa.png" class="w-full h-full object-contain object-right transform -rotate-12">
        </div>

        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex items-center gap-4 mb-12 section-reveal">
                <div class="w-16 h-16 bg-emerald-600/10 rounded-2xl flex items-center justify-center">
                    <span class="material-symbols-outlined text-3xl text-emerald-500">assignment</span>
                </div>
                <div>
                    <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">Copy Trading</h2>
                    <p class="text-emerald-500 font-bold uppercase tracking-widest text-xs">Replica automáticamente estrategias de traders profesionales verificados</p>
                </div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start section-reveal">
                <div>
                    <h3 class="text-2xl font-black text-white mb-6 uppercase">¿Qué es el Copy Trading?</h3>
                    <p class="text-white/60 text-lg leading-relaxed mb-8">El Copy Trading es un modelo de inversión que permite a los usuarios replicar automáticamente las operaciones de traders profesionales en tiempo real.</p>
                    <p class="text-white/60 text-lg leading-relaxed border-l-2 border-emerald-500 pl-6">A diferencia de las cuentas MAM, el Copy Trading ofrece mayor flexibilidad al inversionista, quien puede elegir, seguir o dejar de copiar estrategias en cualquier momento.</p>
                </div>
                
                <div class="grid grid-cols-2 gap-4">
                    ${[
                        { i: 'sync', t: 'Replicación automática', d: 'Copia operaciones al instante y sin intervención manual.' },
                        { i: 'verified', t: 'Estrategias verificadas', d: 'Accede a traders con historial real y auditado.' },
                        { i: 'tune', t: 'Control directo', d: 'Ajusta el capital asignado y detén la copia cuando desees.' },
                        { i: 'public', t: 'Diversificación total', d: 'Distribuye tu capital entre múltiples traders expertos.' }
                    ].map(f => `
                        <div class="p-6 bg-white/[0.02] border border-white/10 rounded-3xl hover:bg-white/[0.04] transition-all group">
                            <span class="material-symbols-outlined text-emerald-500 mb-4 group-hover:scale-110 transition-transform">${f.i}</span>
                            <h4 class="text-sm font-black text-white mb-2 uppercase">${f.t}</h4>
                            <p class="text-[10px] text-white/40 leading-relaxed uppercase tracking-widest">${f.d}</p>
                        </div>
                    `).join('')}
                </div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-12 mt-32 section-reveal">
                <!-- Trader Side -->
                <div>
                    <h3 class="text-xl font-black text-emerald-500 mb-8 uppercase tracking-widest">Ventajas para el Trader Proveedor</h3>
                    <div class="space-y-4">
                        ${[
                            { t: 'Monetiza tu estrategia', d: 'Conviértete en proveedor de señales y recibe comisiones por rendimiento.' },
                            { t: 'Atrae inversionistas', d: 'Tu historial verificable en la plataforma atrae capital de forma orgánica.' },
                            { t: 'Marca Personal', d: 'Desarrolla reputación profesional dentro del ecosistema Bridge Markets.' },
                            { t: 'Escalabilidad sin esfuerzo extra', d: 'Tus operaciones se replican automáticamente. Sin gestión manual adicional.' }
                        ].map(v => `
                            <div class="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex gap-4">
                                <span class="material-symbols-outlined text-emerald-500 text-sm pt-1">check_circle</span>
                                <div>
                                    <h4 class="text-sm font-black text-white uppercase mb-1">${v.t}</h4>
                                    <p class="text-xs text-white/40">${v.d}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Investor Side -->
                <div>
                    <h3 class="text-xl font-black text-blue-400 mb-8 uppercase tracking-widest">Ventajas para el Inversionista</h3>
                    <div class="space-y-4">
                        ${[
                            { t: 'Simplicidad total', d: 'No necesitas experiencia en trading. Eliges un trader y tu cuenta replica sus operaciones.' },
                            { t: 'Alta flexibilidad', d: 'Puedes cambiar de trader, pausar o detener la copia en cualquier momento.' },
                            { t: 'Diversificación', d: 'Copia varios traders simultáneamente para distribuir el riesgo.' },
                            { t: 'Estrategias verificadas', d: 'Los traders visibles tienen historial real y verificable en la plataforma.' },
                            { t: 'Control sobre tu capital', d: 'Tú decides cuánto asignar a cada trader y puedes retirar cuando lo necesites.' }
                        ].map(v => `
                            <div class="p-6 bg-white/[0.01] border border-white/5 rounded-2xl flex gap-4">
                                <span class="material-symbols-outlined text-blue-400 text-sm pt-1">check_circle</span>
                                <div>
                                    <h4 class="text-sm font-black text-white uppercase mb-1">${v.t}</h4>
                                    <p class="text-xs text-white/40">${v.d}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── COMPARISON MAM vs COPY ────────────────────────────────
export function renderMamCopyComparison(content: Record<string, any>, brand: BrandConfig): string {
    const rows = [
        ['Gestión', 'Centralizada por el gestor', 'Elegida por el inversionista'],
        ['Control del cliente', 'Medio — delegado al gestor', 'Alto — control total del usuario'],
        ['Ejecución', 'Proporcional automática', 'Copia directa de operaciones'],
        ['Flexibilidad', 'Moderada', 'Alta — cambia de trader cuando quieras'],
        ['Perfil ideal del inversionista', 'Busca gestión profesional pasiva', 'Quiere participar activamente en la selección'],
        ['Requiere firma de LPOA', 'Sí', 'No'],
        ['Diversificación', 'Por subcuenta del gestor', 'Entre múltiples traders simultáneamente'],
        ['Transparencia', 'Alta (especialmente MAM Equity)', 'Alta — historial verificable']
    ];

    return `
    <section id="comparativa" class="py-32 px-8 bg-[#050505]">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-4 uppercase tracking-tight">Comparativa MAM vs Copy Trading</h2>
                <p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">Elige el modelo que mejor se adapte a tu perfil operativo</p>
            </div>

            <div class="overflow-x-auto section-reveal">
                <table class="w-full text-left border-collapse">
                    <thead>
                        <tr class="border-b border-white/10">
                            <th class="py-6 px-4 text-[10px] font-black text-white/30 uppercase tracking-widest">Característica</th>
                            <th class="py-6 px-4 text-[10px] font-black text-blue-500 uppercase tracking-widest">Cuenta MAM</th>
                            <th class="py-6 px-4 text-[10px] font-black text-emerald-500 uppercase tracking-widest">Copy Trading</th>
                        </tr>
                    </thead>
                    <tbody class="divide-y divide-white/5">
                        ${rows.map(row => `
                            <tr class="hover:bg-white/[0.02] transition-colors group">
                                <td class="py-6 px-4 text-xs font-bold text-white uppercase tracking-wider">${row[0]}</td>
                                <td class="py-6 px-4 text-sm text-white/50 group-hover:text-blue-400 transition-colors">${row[1]}</td>
                                <td class="py-6 px-4 text-sm text-white/50 group-hover:text-emerald-400 transition-colors">${row[2]}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </section>
    `;
}

// ─── GENERAL BENEFITS ──────────────────────────────────────
export function renderMamCopyBenefits(content: Record<string, any>, brand: BrandConfig): string {
    const benefits = [
        'Capital segregado', 'Operaciones proporcionales', 
        'Subcuentas ilimitadas', 'Inversión en USD', 
        'Posibilidad de incrementar capital', 'Operaciones desde 0.01 lotes', 
        'Soporte 24/7', 'Plataforma MT4 / MT5'
    ];

    return `
    <section class="py-32 px-8 bg-[#080808] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <h2 class="text-3xl md:text-5xl font-black font-montserrat text-white mb-4 uppercase">Beneficios Generales del Sistema</h2>
                <p class="text-white/40 font-medium uppercase tracking-[0.2em] text-xs italic">Infraestructura institucional para tu éxito</p>
            </div>

            <div class="grid grid-cols-2 md:grid-cols-4 gap-4 section-reveal">
                ${benefits.map(b => `
                    <div class="p-6 bg-white/[0.02] border border-white/5 rounded-2xl flex items-center gap-3 group hover:bg-white/[0.04] transition-all">
                        <span class="material-symbols-outlined text-[#3b82f6] text-sm">check_circle</span>
                        <span class="text-[10px] font-black text-white/70 uppercase tracking-widest">${b}</span>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

// ─── HOW TO START ──────────────────────────────────────────
export function renderMamCopySteps(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#080808] border-y border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white uppercase tracking-tighter">¿Cómo empezar?</h2>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 section-reveal">
                <!-- Traders -->
                <div class="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                    <h3 class="text-2xl font-black text-white mb-10 uppercase border-b border-white/10 pb-6">Para Traders Gestores / Proveedores</h3>
                    <div class="space-y-8">
                        ${[
                            { n: '1', t: 'Crea tu cuenta', d: 'Regístrate en el portal de Bridge Markets a través del link de tu IB.' },
                            { n: '2', t: 'Completa tu KYC', d: 'Verifica tu identidad para activar el acceso completo.' },
                            { n: '3', t: 'Solicita tu cuenta MAM o activa Copy Trading', d: 'Contacta a tu IB o al soporte de BM para configurar tu cuenta gestora.' },
                            { n: '4', t: 'Define tus condiciones', d: 'Establece las comisiones, el perfil de riesgo y los parámetros de gestión.' },
                            { n: '5', t: 'Opera y atrae inversionistas', d: 'Ejecuta tu estrategia. Tu historial verificable atrae capital automáticamente.' }
                        ].map(s => `
                            <div class="flex gap-6">
                                <div class="w-10 h-10 rounded-full bg-blue-600/20 text-blue-400 flex items-center justify-center font-black shrink-0">${s.n}</div>
                                <div>
                                    <h4 class="text-white font-bold mb-1 uppercase text-sm">${s.t}</h4>
                                    <p class="text-xs text-white/40">${s.d}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>

                <!-- Investors -->
                <div class="p-10 bg-white/[0.02] border border-white/5 rounded-[3rem]">
                    <h3 class="text-2xl font-black text-white mb-10 uppercase border-b border-white/10 pb-6">Para Inversionistas</h3>
                    <div class="space-y-8">
                        ${[
                            { n: '1', t: 'Crea tu cuenta', d: 'Regístrate en el portal de Bridge Markets a través del link de tu IB.' },
                            { n: '2', t: 'Completa tu KYC', d: 'Verifica tu identidad y deposita fondos.' },
                            { n: '3', t: 'Elige tu modelo', d: 'Decide si prefieres una cuenta MAM (gestión delegada) o Copy Trading.' },
                            { n: '4', t: 'Asigna tu capital', d: 'Conecta tu cuenta al gestor MAM firmando el LPOA o elige un trader.' },
                            { n: '5', t: 'Monitorea y retira', d: 'Sigue tu rendimiento en tiempo real y solicita retiros según condiciones.' }
                        ].map(s => `
                            <div class="flex gap-6">
                                <div class="w-10 h-10 rounded-full bg-emerald-600/20 text-emerald-400 flex items-center justify-center font-black shrink-0">${s.n}</div>
                                <div>
                                    <h4 class="text-white font-bold mb-1 uppercase text-sm">${s.t}</h4>
                                    <p class="text-xs text-white/40">${s.d}</p>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── MAM & COPY FAQ ─────────────────────────────────────────
export function renderMamCopyFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const mamFaqs = [
        { q: '¿Qué es una cuenta MAM?', a: 'Es una solución tecnológica que permite a un gestor profesional administrar múltiples cuentas desde una sola plataforma, replicando operaciones de forma proporcional.' },
        { q: '¿Cuál es la diferencia entre MAM Equity y MAM Cash?', a: 'MAM Equity permite al inversionista ver las operaciones en tiempo real. MAM Cash delega completamente la gestión al trader profesional.' },
        { q: '¿Qué es el LPOA?', a: 'Es un documento legal que autoriza al gestor a operar en nombre del cliente. El cliente mantiene siempre la propiedad de sus fondos; el gestor solo opera, no retira.' },
        { q: '¿Puede el gestor retirar mi dinero?', a: 'No. El LPOA solo autoriza al gestor a ejecutar operaciones. Los fondos siempre pertenecen al cliente.' },
        { q: '¿Desde cuánto puedo empezar a invertir en MAM?', a: 'Las operaciones se pueden ejecutar desde 0.01 lotes. Consulta con tu IB el capital mínimo recomendado para el gestor de tu elección.' },
        { q: '¿Cuántas subcuentas puede gestionar un MAM?', a: 'La plataforma permite subcuentas ilimitadas, permitiendo al gestor escalar su cartera de inversionistas sin límite operativo.' }
    ];
    const copyFaqs = [
        { q: '¿Qué es el Copy Trading?', a: 'Es un modelo donde tu cuenta replica automáticamente y en tiempo real las operaciones de un trader profesional que tú elige.' },
        { q: '¿Necesito saber de trading para hacer Copy Trading?', a: 'No. Simplemente eliges un trader con historial verificado, asignas capital y tu cuenta copia sus operaciones automáticamente.' },
        { q: '¿Puedo dejar de copiar a un trader en cualquier momento?', a: 'Sí. Tienes control total. Puedes pausar, cambiar o detener la copia cuando lo desees.' },
        { q: '¿Puedo copiar a varios traders a la vez?', a: 'Sí. Puedes diversificar copiando múltiples traders simultáneamente para distribuir el riesgo.' },
        { q: '¿Cómo ganan los traders proveedores?', a: 'Los traders proveedores reciben comisiones por rendimiento o gestión según las condiciones establecidas en la plataforma.' },
        { q: '¿Los traders tienen historial verificable?', a: 'Sí. Los traders visibles en la plataforma de Copy Trading tienen historial real y verificable públicamente.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505]">
        <div class="max-w-6xl mx-auto">
            <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white mb-20 text-center uppercase">Preguntas Frecuentes</h2>
            
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 section-reveal">
                <div>
                    <h3 class="text-lg font-black text-blue-400 mb-8 uppercase tracking-widest">FAQ — Cuentas MAM</h3>
                    <div class="space-y-4">
                        ${mamFaqs.map(faq => `
                            <div class="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <h4 class="text-white font-bold mb-3 italic">${faq.q}</h4>
                                <p class="text-white/40 text-sm leading-relaxed">${faq.a}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
                <div>
                    <h3 class="text-lg font-black text-emerald-400 mb-8 uppercase tracking-widest">FAQ — Copy Trading</h3>
                    <div class="space-y-4">
                        ${copyFaqs.map(faq => `
                            <div class="p-6 bg-white/[0.02] border border-white/5 rounded-2xl">
                                <h4 class="text-white font-bold mb-3 italic">${faq.q}</h4>
                                <p class="text-white/40 text-sm leading-relaxed">${faq.a}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── FINAL CTA ──────────────────────────────────────────────
export function renderMamCopyFinalCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaMamText = content.ctaMamText || "Quiero una cuenta MAM";
    const ctaCopyText = content.ctaCopyText || "Quiero hacer Copy Trading";
    const ctaMamLink = content.ctaMamLink || brand.ctaLink || "#";
    const ctaCopyLink = content.ctaCopyLink || brand.ctaLink || "#";

    return `
    <section class="py-40 px-8 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div class="absolute inset-0 opacity-10 pointer-events-none">
            <img src="/images/imagenes%20nuevas/reyna%20rosa.png" class="absolute -bottom-20 -right-20 w-1/3 object-contain transform -rotate-12">
        </div>
        <div class="max-w-5xl mx-auto text-center relative z-10 section-reveal">
            <h2 class="text-5xl md:text-8xl font-black font-montserrat text-white mb-8 tracking-tighter uppercase leading-none">Conecta talento con <span class="text-blue-500">capital.</span></h2>
            <p class="text-xl md:text-2xl text-white/50 font-light mb-12">Elige tu modelo: gestión centralizada con MAM o libertad total con Copy Trading.</p>
            
            <div class="flex flex-col sm:flex-row items-center justify-center gap-6">
                <a href="${ctaMamLink}" class="w-full sm:w-auto px-12 py-6 bg-blue-600 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">${ctaMamText}</a>
                <a href="${ctaCopyLink}" class="w-full sm:w-auto px-12 py-6 bg-emerald-600 text-white font-black rounded-2xl hover:scale-105 active:scale-95 transition-all text-sm uppercase tracking-widest">${ctaCopyText}</a>
            </div>
            
            <p class="mt-16 text-[10px] text-white/20 uppercase tracking-[0.4em] font-black max-w-2xl mx-auto">
                "Los resultados pasados no garantizan rendimientos futuros. Toda inversión conlleva riesgo. Opera o invierte con responsabilidad."
            </p>
        </div>
    </section>
    `;
}

// ─── MC COMMUNITY SECTION ──────────────────────────────────
export function renderMCCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Nuestra Comunidad';
    const message = content.communityMessage || 'Únete a nuestro ecosistema y conecta con traders profesionales.';
    const photoUrl = content.photoUrl || "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&q=80";
    
    const telegram = content.socialTelegram || brand.telegram || "#";
    const whatsapp = content.socialWhatsApp || brand.whatsapp || "#";
    const instagram = content.socialInstagram || brand.instagram || "#";
    const youtube = content.socialYouTube || brand.youtube || "#";
    
    const ctaText = content.ctaText || "Únete a mi comunidad";
    const ctaLink = brand.ctaLink || "#";

    return `
    <section id="comunidad" class="py-32 px-8 bg-[#050505] relative overflow-hidden border-t border-white/5">
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="bg-gradient-to-br from-blue-600/10 via-transparent to-emerald-600/10 border border-white/10 rounded-[3rem] p-10 md:p-20 backdrop-blur-3xl overflow-hidden relative">
                <div class="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                    <div>
                        <span class="text-[10px] font-black text-blue-500 uppercase tracking-[0.4em] mb-6 block">Comunidad Exclusiva</span>
                        <h2 class="text-4xl md:text-6xl font-black font-montserrat text-white mb-8 uppercase">${ibName}</h2>
                        <p class="text-white/60 text-lg md:text-xl leading-relaxed mb-12">${message}</p>
                        
                        <div class="flex flex-wrap gap-4 mb-12">
                            ${whatsapp !== '#' ? `<a href="https://wa.me/${whatsapp}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#25D366] transition-all"><span class="material-symbols-outlined text-sm">chat</span></a>` : ''}
                            ${telegram !== '#' ? `<a href="${telegram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#24A1DE] transition-all"><span class="material-symbols-outlined text-sm">send</span></a>` : ''}
                            ${instagram !== '#' ? `<a href="${instagram}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#E1306C] transition-all"><span class="material-symbols-outlined text-sm">photo_camera</span></a>` : ''}
                            ${youtube !== '#' ? `<a href="${youtube}" class="w-12 h-12 bg-white/5 border border-white/10 rounded-xl flex items-center justify-center hover:bg-[#FF0000] transition-all"><span class="material-symbols-outlined text-sm">play_circle</span></a>` : ''}
                        </div>

                        <a href="${ctaLink}" class="inline-block px-10 py-5 bg-white text-black font-black rounded-2xl uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all shadow-2xl">
                            ${ctaText}
                        </a>
                    </div>
                    <div class="relative hidden lg:block">
                        <div class="aspect-square rounded-[3rem] overflow-hidden border border-white/10">
                            <img src="${photoUrl}" class="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-1000" alt="Community">
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

// ─── MC FOOTER ──────────────────────────────────────────────
export function renderMCFooter(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = brand.communityName || brand.ibName || 'Partner Oficial';
    const currentYear = new Date().getFullYear();

    return `
    <footer class="py-20 px-8 bg-[#020202] border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="flex flex-col md:flex-row justify-between items-start gap-12 mb-16">
                <div class="max-w-xs">
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-8 mb-8">
                    <p class="text-white/30 text-xs leading-relaxed">
                        Tecnología institucional al alcance de todos los inversores. Expertos en gestión MAM y Copy Trading global.
                    </p>
                </div>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-12">
                    <div class="flex flex-col gap-4">
                        <span class="text-[10px] font-black text-white/20 uppercase tracking-widest">Productos</span>
                        <a href="#mam" class="text-xs text-white/50 hover:text-blue-500 transition-colors">Cuentas MAM</a>
                        <a href="#copy" class="text-xs text-white/50 hover:text-emerald-500 transition-colors">Copy Trading</a>
                    </div>
                    <div class="flex flex-col gap-4">
                        <span class="text-[10px] font-black text-white/20 uppercase tracking-widest">Legal</span>
                        <a href="#" class="text-xs text-white/50 hover:text-white transition-colors">Advertencia de Riesgo</a>
                        <a href="#" class="text-xs text-white/50 hover:text-white transition-colors">Términos y Condiciones</a>
                    </div>
                    <div class="flex flex-col gap-4">
                        <span class="text-[10px] font-black text-white/20 uppercase tracking-widest">Soporte</span>
                        <a href="mailto:corporate@bridgemarkets.global" class="text-xs text-white/50 hover:text-white transition-colors">Soporte BM</a>
                    </div>
                </div>
            </div>
            
            <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-[10px] text-white/20 uppercase tracking-[0.2em] font-medium">© ${currentYear} BridgeMarkets LTD. Todos los derechos reservados.</p>
                <div class="text-[10px] text-white/40 uppercase tracking-widest font-black">Presentado por ${ibName}</div>
            </div>
        </div>
    </footer>
    `;
}

// ─── MC REGISTRATION FORM ──────────────────────────────────
export function renderMCRegistration(content: Record<string, any>, brand: BrandConfig): string {
    const slug = brand.slug || 'default';
    const partnerId = brand.partnerId || '';
    
    return `
    <section id="registro" class="py-32 px-8 bg-[#050505]">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white/[0.02] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
                <div class="grid grid-cols-1 md:grid-cols-2">
                    <!-- Info Side -->
                    <div class="p-12 md:p-16 bg-gradient-to-br from-blue-600/20 to-emerald-600/20 flex flex-col justify-center">
                        <h2 class="text-3xl font-black font-montserrat text-white mb-6 uppercase">Únete al ecosistema</h2>
                        <p class="text-white/60 text-sm leading-relaxed mb-8">
                            Completa el formulario y un especialista de Bridge Markets te guiará en el proceso de apertura y configuración de tu cuenta.
                        </p>
                        <div class="space-y-4">
                            <div class="flex items-center gap-3 text-xs text-white/40 uppercase tracking-widest font-black">
                                <span class="material-symbols-outlined text-blue-500 text-sm">verified</span>
                                Tecnología Segura
                            </div>
                            <div class="flex items-center gap-3 text-xs text-white/40 uppercase tracking-widest font-black">
                                <span class="material-symbols-outlined text-emerald-500 text-sm">verified</span>
                                Soporte Institucional
                            </div>
                        </div>
                    </div>

                    <!-- Form Side -->
                    <div class="p-12 md:p-16 bg-white/[0.02]">
                        <form id="mcLeadForm" class="space-y-6">
                            <input type="hidden" name="landingSlug" value="${slug}">
                            <input type="hidden" name="partnerId" value="${partnerId}">
                            
                            <div>
                                <label class="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Nombre Completo</label>
                                <input type="text" required name="name" placeholder="Ej: Juan Pérez" 
                                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all">
                            </div>
                            
                            <div>
                                <label class="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Correo Electrónico</label>
                                <input type="email" required name="email" placeholder="juan@ejemplo.com" 
                                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all">
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">WhatsApp / Teléfono</label>
                                <input type="tel" required name="whatsapp" placeholder="+1 234 567 890" 
                                    class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all">
                            </div>

                            <div>
                                <label class="block text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Producto de Interés</label>
                                <select name="product" required class="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-4 text-white text-sm focus:outline-none focus:border-blue-500 transition-all appearance-none">
                                    <option value="MAM" class="bg-slate-900">Cuentas MAM</option>
                                    <option value="Copy Trading" class="bg-slate-900">Copy Trading</option>
                                    <option value="Ambos" class="bg-slate-900">Ambos Productos</option>
                                </select>
                            </div>

                            <button type="submit" id="mcSubmitBtn" class="w-full py-5 bg-white text-black font-black rounded-xl uppercase tracking-widest text-xs hover:bg-blue-500 hover:text-white transition-all active:scale-95 shadow-xl">
                                Enviar Solicitud →
                            </button>
                            
                            <div id="mcFormMessage" class="mt-4 text-center"></div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <script>
        document.getElementById("mcLeadForm").addEventListener("submit", async function(e) {
            e.preventDefault();
            const btn = document.getElementById("mcSubmitBtn");
            const msg = document.getElementById("mcFormMessage");
            const formData = new FormData(this);
            const data = Object.fromEntries(formData.entries());
            
            btn.disabled = true;
            btn.textContent = "Procesando...";
            
            try {
                const res = await fetch("/api/leads", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(data)
                });
                
                if (res.ok) {
                    msg.innerHTML = '<p class="text-emerald-500 font-bold text-xs uppercase tracking-widest">¡Solicitud recibida! Te contactaremos pronto.</p>';
                    this.reset();
                    btn.textContent = "Enviado";
                } else {
                    throw new Error();
                }
            } catch (err) {
                msg.innerHTML = '<p class="text-red-500 font-bold text-xs uppercase tracking-widest">Error al enviar. Intenta de nuevo.</p>';
                btn.disabled = false;
                btn.textContent = "Enviar Solicitud →";
            }
        });
    </script>
    `;
}
