const fs = require('fs');
let code = fs.readFileSync('lib/landing/renderers/features.ts', 'utf8');

// Replace About
code = code.replace(/export function renderSntAbout[\s\S]*?<\/section>`;\s*\}/, `export function renderSntAbout(content: Record<string, any>, brand: BrandConfig): string {
    return \`
    <section class="py-32 px-8 bg-[#050505] relative overflow-hidden border-b border-white/5">
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center section-reveal">
            <div class="order-2 lg:order-1 relative flex justify-center">
                <div class="absolute inset-0 bg-[#a78bfa]/5 rounded-full blur-[100px]"></div>
                <img src="/images/imagenes nuevas/caballo rosa.png" alt="Estrategia y Control" class="w-full max-w-sm h-auto object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-[float_5s_ease-in-out_infinite]" style="animation: float 5s ease-in-out infinite; transform: translateY(0px);">
            </div>
            
            <div class="order-1 lg:order-2">
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-8 border border-white/10">Concepto Core</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-8 tracking-tighter uppercase">¿Qué son los Índices Sintéticos?</h2>
                
                <div class="border-l-2 border-[#a78bfa]/30 pl-8 relative">
                    <p class="text-lg text-white/60 leading-relaxed font-light mb-6">
                        Los Índices Sintéticos de Bridge Markets son instrumentos financieros creados a partir de algoritmos de generación aleatoria controlada (RNG – Random Number Generator) que simulan los movimientos del mercado con base en volatilidad, tendencias y patrones de comportamiento real.
                    </p>
                    <p class="text-lg text-white/60 leading-relaxed font-light">
                        Estos índices no dependen de activos físicos (como acciones o divisas) ni de noticias externas. En cambio, reproducen las condiciones dinámicas de los mercados financieros reales: subidas, caídas, impulsos, consolidaciones y rupturas. Gracias a esto, puedes operar bajo reglas claras y constantes, con condiciones estables, accesibles 24/7 y sin la incertidumbre que provocan los eventos globales.
                    </p>
                </div>
            </div>
        </div>
    </section>\`;
}`);

// Replace Families
code = code.replace(/export function renderSntFamilies[\s\S]*?<\/section>`;\s*\}/, `export function renderSntFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { id: 'fortune', name: 'Fortune (Jump)', desc: 'Saltar a nuevas oportunidades. Gaps explosivos cada hora.', icon: 'rocket_launch', color: 'from-amber-400 to-orange-600' },
        { id: 'vortex', name: 'Vortex (Crash/Boom)', desc: 'Captura impulsos agresivos. Rupturas repentinas en tendencias.', icon: 'bolt', color: 'from-red-400 to-rose-600' },
        { id: 'bullx', name: 'BullX/BearX (Step)', desc: 'Movimientos escalonados. Tendencias consistentes y marcadas.', icon: 'trending_up', color: 'from-emerald-400 to-teal-600' },
        { id: 'fomox', name: 'FomoX (VIX)', desc: 'La verdadera prueba de fuego. Oscilaciones de alta velocidad.', icon: 'speed', color: 'from-[#a78bfa] to-[#865BFF]' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#0a0a0a] relative border-b border-white/5 overflow-hidden">
        <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none">
            <img src="/images/imagenes nuevas/alfiler rosa.png" alt="Alfil" class="w-[500px] h-auto drop-shadow-2xl grayscale blur-sm">
        </div>
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="flex flex-col md:flex-row items-end justify-between mb-20 section-reveal gap-8">
                <div>
                    <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">Diversificación</span>
                    <h2 class="text-4xl md:text-5xl font-black font-headline text-white tracking-tighter uppercase">4 Familias,<br>Infinitas Estrategias.</h2>
                </div>
                <p class="text-white/50 max-w-sm font-light text-right">
                    Diseñadas para adaptarse a cualquier perfil de riesgo y estilo de trading.
                </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 section-reveal" style="animation-delay: 0.1s;">
                \${families.map(fam => \`
                    <div class="p-8 bg-[#050505] border border-white/5 hover:border-white/20 transition-all group flex items-start gap-6 relative overflow-hidden">
                        <div class="absolute -right-4 -bottom-4 opacity-5 text-white text-8xl material-symbols-outlined transform group-hover:scale-110 transition-transform">\${fam.icon}</div>
                        <div class="w-16 h-16 rounded-xl bg-gradient-to-br \${fam.color} flex items-center justify-center shrink-0 shadow-lg relative z-10">
                            <span class="material-symbols-outlined text-white text-3xl">\${fam.icon}</span>
                        </div>
                        <div class="relative z-10">
                            <h3 class="text-xl font-black text-white mb-2 uppercase tracking-wide">\${fam.name}</h3>
                            <p class="text-white/50 font-light leading-relaxed text-sm">\${fam.desc}</p>
                        </div>
                    </div>
                \`).join('')}
            </div>
        </div>
    </section>\`;
}`);

// Replace CTA
code = code.replace(/export function renderSntCTA[\s\S]*?<\/section>`;\s*\}/, `export function renderSntCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaText = content.ctaText || "Comenzar a operar ahora";
    const ctaLink = brand.ctaLink || "#register";
    
    return \`
    <section class="py-32 px-8 bg-[#050505] relative overflow-hidden">
        <div class="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[#a78bfa]/5 rounded-full blur-[150px]"></div>

        <div class="max-w-5xl mx-auto text-center relative z-10 section-reveal">
            <div class="mb-12 flex justify-center">
                <img src="/images/imagenes nuevas/peones rosa.png" alt="Peones" class="w-56 h-auto object-contain drop-shadow-[0_15px_30px_rgba(0,0,0,0.5)] animate-[float_4s_ease-in-out_infinite]" style="animation: float 4s ease-in-out infinite; transform: translateY(0px);">
            </div>
            <h2 class="text-5xl md:text-7xl font-black font-headline text-white mb-8 tracking-tighter uppercase">
                Toma tu posición<br>en el tablero.
            </h2>
            <p class="text-xl text-white/60 font-light mb-12 max-w-2xl mx-auto">
                No importa si el mercado real está cerrado o estancado. Aquí, siempre es momento de operar.
            </p>
            <a href="\${ctaLink}" class="inline-flex px-12 py-6 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#a78bfa] hover:text-white transition-all items-center justify-center gap-4 hover:scale-105 shadow-2xl">
                \${ctaText}
                <span class="material-symbols-outlined text-xl">login</span>
            </a>
            <p class="mt-8 text-white/30 text-xs font-light uppercase tracking-widest">Abre tu cuenta en minutos y domina el juego.</p>
        </div>
    </section>\`;
}`);

// Replace Advantages (just to update its background and colors to match the dark theme)
code = code.replace(/export function renderSntAdvantages[\s\S]*?<\/section>`;\s*\}/, `export function renderSntAdvantages(content: Record<string, any>, brand: BrandConfig): string {
    const advantages = [
        { icon: 'all_inclusive', title: 'Disponibles 24/7', desc: 'Opera sin interrupciones, los 365 días del año. Los índices sintéticos no cierran, no duermen y no se detienen.' },
        { icon: 'policy', title: 'Transparencia total', desc: 'Cada movimiento es generado por un sistema aleatorio auditado, garantizando imparcialidad y consistencia estadística.' },
        { icon: 'tune', title: 'Volatilidad controlada', desc: 'Cada familia tiene niveles definidos de volatilidad para que elijas el perfil que más se adapte a tu estrategia.' },
        { icon: 'block', title: 'Sin influencia de noticias', desc: 'Olvídate de los eventos macroeconómicos. Aquí las condiciones son puramente técnicas.' },
        { icon: 'memory', title: 'Ideal para trading algorítmico', desc: 'Diseñados para bots, estrategias cuantitativas y pruebas de backtesting en entornos consistentes.' },
        { icon: 'query_stats', title: 'Riesgo medible y oportunidades constantes', desc: 'Gracias a la naturaleza matemática de sus series, puedes diseñar sistemas más predecibles y controlar mejor la gestión del riesgo.' },
    ];

    return \`
    <section class="py-32 px-8 bg-[#0a0a0a] relative border-b border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">El Diferencial</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white tracking-tighter uppercase">¿Por qué operar<br>Índices Sintéticos?</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 section-reveal" style="animation-delay: 0.2s;">
                \${advantages.map((adv, i) => \`
                    <div class="p-8 bg-[#050505] border border-white/5 hover:border-[#a78bfa]/40 transition-all group">
                        <div class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#a78bfa] transition-colors">
                            <span class="material-symbols-outlined text-[#a78bfa] group-hover:text-white">\${adv.icon}</span>
                        </div>
                        <h3 class="text-lg font-black text-white mb-3 uppercase tracking-wide">\${adv.title}</h3>
                        <p class="text-sm text-white/50 font-light leading-relaxed">\${adv.desc}</p>
                    </div>
                \`).join('')}
            </div>
        </div>
    </section>\`;
}`);


fs.writeFileSync('lib/landing/renderers/features.ts', code);
console.log("Resto de secciones actualizadas");
