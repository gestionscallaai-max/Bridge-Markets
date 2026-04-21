const fs = require('fs');
let code = fs.readFileSync('lib/landing/renderers/features.ts', 'utf8');

code = code.replace(/export function renderSntHero[\s\S]*?<\/section>`;\s*\}/, `export function renderSntHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.ibName || brand.communityName || brand.fullName;
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Abrir mi cuenta";
    const ctaLink = brand.ctaLink || "#register";
    
    return \`
    <section class="relative min-h-[90vh] flex items-center pt-24 pb-20 px-8 bg-[#0a0a0a] overflow-hidden border-b border-white/5">
        <div class="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div class="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#1f1635] to-transparent opacity-30"></div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="section-reveal">
                <div class="flex items-center gap-5 mb-10">
                    <img src="https://bridgemarkets.global/wp-content/uploads/2023/06/Logo-Bridge-Markets-Horizontal-Blanco.png" alt="Bridge Markets" class="h-6 opacity-90">
                    <div class="h-5 w-[1px] bg-white/20"></div>
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Por \${ibName}</span>
                </div>

                <h1 class="text-5xl md:text-7xl lg:text-[5rem] font-black font-headline leading-tight mb-8 tracking-tighter text-white uppercase">
                    Opera en un <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a78bfa]">nuevo Universo</span><br>de Oportunidades.
                </h1>
                
                <p class="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-6 font-light">
                    Bienvenido a los Índices Sintéticos de Bridge Markets, mercados virtuales 24/7 con comportamientos realistas.
                </p>
                \${ibPhrase ? \`<p class="text-sm text-white/40 italic border-l border-white/20 pl-4 mb-12 max-w-lg">\${ibPhrase}</p>\` : '<div class="mb-12"></div>'}

                <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <a href="\${ctaLink}" class="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#a78bfa] hover:text-white transition-colors flex items-center justify-center gap-3 w-fit">
                        \${ctaText}
                        <span class="material-symbols-outlined text-lg">arrow_forward</span>
                    </a>
                </div>

                <div class="flex items-center gap-8 py-6 border-t border-white/10">
                    <div class="flex flex-col">
                        <p class="text-[11px] font-bold text-[#a78bfa] uppercase tracking-[0.2em] mb-1">Sin noticias, sin pausas, sin límites.</p>
                        <p class="text-[10px] font-medium text-white/40 uppercase tracking-widest">Solo pura acción de mercado, siempre disponible.</p>
                    </div>
                </div>
            </div>

            <div class="relative section-reveal lg:flex justify-end hidden">
                <div class="relative w-full max-w-lg aspect-square flex items-center justify-center">
                    <div class="absolute inset-0 bg-[#a78bfa]/10 rounded-full blur-[100px]"></div>
                    <img src="/images/imagenes nuevas/rey rosa.png" alt="Rey Bridge Markets" class="w-full h-auto object-contain relative z-10 drop-shadow-[0_20px_50px_rgba(0,0,0,0.5)] animate-[float_6s_ease-in-out_infinite]" style="animation: float 6s ease-in-out infinite; transform: translateY(0px);">
                </div>
            </div>
            <style>
                @keyframes float {
                    0% { transform: translateY(0px); }
                    50% { transform: translateY(-20px); }
                    100% { transform: translateY(0px); }
                }
            </style>
        </div>
    </section>\`;
}`);

fs.writeFileSync('lib/landing/renderers/features.ts', code);
console.log("Hero reemplazado con exito");
