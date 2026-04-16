import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderHeroDark(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_dark')!.defaultContent, ...content };
    return `
    <section class="relative py-24 px-8 overflow-hidden" style="background: radial-gradient(circle at top left, #2a1b4d 0%, #080411 50%), radial-gradient(circle at bottom right, #1a0b3a 0%, #080411 50%);">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="relative z-10 section-reveal">
                <span class="inline-block px-4 py-1 rounded-full bg-primary/20 border border-primary/30 text-accent text-xs font-bold uppercase tracking-widest mb-8">${c.badge}</span>
                <h1 class="text-6xl md:text-7xl font-extrabold font-headline leading-[1.05] mb-8 tracking-tighter text-white">
                    ${c.title} <br><span class="text-gradient-purple">${c.highlight}</span>
                </h1>
                <p class="text-xl text-white/60 leading-relaxed mb-10 max-w-xl font-light">${c.subtitle}</p>
                <div class="flex flex-wrap gap-6">
                    <a href="#register" class="px-10 py-5 bg-primary text-white font-bold asym-card hover:shadow-2xl transition-all scale-100 hover:scale-105 inline-block">${c.cta1}</a>
                    <a href="#learn" class="px-10 py-5 glass-panel text-white font-bold asym-card hover:bg-white/10 transition-all inline-block">${c.cta2}</a>
                </div>
            </div>
            <div class="relative group section-reveal" style="animation-delay: 0.2s;">
                <div class="absolute -inset-4 bg-primary/20 blur-3xl group-hover:bg-primary/30 transition-all duration-700"></div>
                <div class="relative glass-panel asym-card p-4 shadow-2xl">
                    <div class="w-full h-64 rounded-[3rem_0.5rem_3rem_0.5rem] bg-gradient-to-br from-primary/30 to-primary/10 flex items-center justify-center">
                        <span class="text-8xl font-headline font-black text-white/20 tracking-tighter">BM</span>
                    </div>
                    <div class="absolute -bottom-8 -left-8 glass-panel p-8 asym-card shadow-2xl border-white/20">
                        <p class="text-xs font-bold text-accent uppercase mb-1">${c.statLabel}</p>
                        <p class="text-4xl font-extrabold font-headline text-white">${c.stat}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderHeroLight(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_light')!.defaultContent, ...content };
    return `
    <section class="relative pt-40 pb-20 overflow-hidden min-h-[80vh] flex items-center bg-[#fef7ff]">
        <div class="absolute inset-0 z-0">
            <div class="absolute top-[-10%] right-[-10%] w-[800px] h-[800px] bg-primary/10 rounded-full blur-[120px]"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-purple-400/10 rounded-full blur-[100px]"></div>
        </div>
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 relative z-10 items-center">
            <div class="flex flex-col section-reveal">
                <div class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 w-fit mb-8">
                    <span class="w-2 h-2 rounded-full bg-primary animate-pulse"></span>
                    <span class="text-primary text-[10px] tracking-[0.2em] font-bold uppercase">${c.badge}</span>
                </div>
                <h1 class="text-6xl md:text-8xl font-headline font-extrabold tracking-tighter text-[#211635] leading-[0.85] mb-8">
                    ${c.title} <br><span class="text-gradient-dark">${c.highlight}</span>
                </h1>
                <p class="text-xl text-[#494455] max-w-lg mb-12 leading-relaxed font-medium">${c.subtitle}</p>
                <div class="flex flex-wrap gap-4">
                    <a href="#register" class="bg-primary px-10 py-5 asym-card-rev text-white font-bold flex items-center gap-3 shadow-2xl hover:translate-y-[-2px] transition-all inline-flex">
                        ${c.cta1} <span class="material-symbols-outlined">arrow_forward</span>
                    </a>
                    <a href="#learn" class="px-10 py-5 asym-card bg-white border border-gray-200 text-[#211635] font-bold hover:bg-gray-50 transition-all inline-block">${c.cta2}</a>
                </div>
            </div>
            <div class="relative section-reveal" style="animation-delay: 0.2s;">
                <div class="asym-card bg-[#211635] p-4 shadow-[0_25px_50px_-12px_rgba(102,53,222,0.25)] transform lg:rotate-2 hover:rotate-0 transition-transform duration-700 overflow-hidden">
                    <div class="w-full h-80 rounded-[3rem_0.5rem_3rem_0.5rem] bg-gradient-to-br from-primary/40 to-primary/10 flex items-center justify-center">
                        <span class="text-9xl font-headline font-black text-white/15 tracking-tighter">V3</span>
                    </div>
                    <div class="absolute bottom-10 left-10 right-10">
                        <div class="backdrop-blur-2xl bg-[#0f071d]/75 p-6 asym-card-rev border border-white/10">
                            <div class="flex items-center gap-4">
                                <div class="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                                    <span class="material-symbols-outlined">bolt</span>
                                </div>
                                <div>
                                    <div class="text-[10px] font-bold text-white/50 uppercase tracking-[0.2em]">${c.statLabel}</div>
                                    <div class="text-2xl font-headline font-extrabold text-white">${c.stat}</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderHeroGradient(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_gradient')!.defaultContent, ...content };
    return `
    <section class="relative py-32 px-8 overflow-hidden" style="background: linear-gradient(135deg, #0a0614 0%, #1a0b3a 30%, #2d1070 60%, #6635de 100%);">
        <div class="absolute inset-0 opacity-20" style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.1) 1px, transparent 0); background-size: 32px 32px;"></div>
        <div class="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/30 rounded-full blur-[200px] -translate-y-1/3 translate-x-1/3"></div>
        <div class="max-w-5xl mx-auto text-center relative z-10 section-reveal">
            <span class="inline-block px-5 py-2 rounded-full bg-white/10 border border-white/20 text-accent text-xs font-bold uppercase tracking-[0.2em] mb-8 backdrop-blur">${c.badge}</span>
            <h1 class="text-6xl md:text-8xl font-extrabold font-headline leading-[0.9] mb-8 tracking-tighter text-white">
                ${c.title} <span class="text-gradient-purple">${c.highlight}</span>
            </h1>
            <p class="text-xl text-white/60 leading-relaxed mb-12 max-w-2xl mx-auto">${c.subtitle}</p>
            <div class="flex flex-wrap justify-center gap-6">
                <a href="#register" class="px-10 py-5 bg-white text-primary font-bold rounded-full hover:shadow-2xl transition-all scale-100 hover:scale-105 inline-block text-lg">${c.cta1}</a>
                <a href="#learn" class="px-10 py-5 glass-panel text-white font-bold rounded-full hover:bg-white/10 transition-all inline-block text-lg">${c.cta2}</a>
            </div>
            <div class="mt-16 inline-flex items-center gap-4 glass-panel px-8 py-4 rounded-full">
                <span class="text-4xl font-black font-headline text-accent">${c.stat}</span>
                <span class="text-xs font-bold uppercase tracking-widest text-white/40">${c.statLabel}</span>
            </div>
        </div>
    </section>`;
}

export function renderHeroOfficial(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'hero_official')!.defaultContent, ...content };
    // Prioridad: brand.heroPhrase > content.editableSubtitle
    const subtitle = brand.heroPhrase || c.editableSubtitle;
    const partnerInfo = brand.communityName ? `Comunidad: ${brand.communityName}` : `${brand.fullName} Portfolio`;

    return `
    <section class="relative py-32 px-8 overflow-hidden" style="background: radial-gradient(circle at 0% 0%, #2a1b4d 0%, #080411 70%);">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
            <div class="lg:w-2/3 section-reveal">
                <div class="inline-flex items-center gap-3 glass-panel px-6 py-2 rounded-full mb-10 border-primary/30">
                    <span class="w-2 h-2 rounded-full bg-primary animate-ping"></span>
                    <span class="text-[10px] font-black uppercase tracking-[0.3em] text-accent">${partnerInfo}</span>
                </div>
                <h1 class="text-6xl md:text-8xl font-black font-headline leading-[0.9] mb-10 tracking-tighter text-white">
                    ${c.fixedTitle} <br><span class="text-gradient-purple">${c.highlight}</span>
                </h1>
                <p class="text-2xl text-white/50 leading-relaxed max-w-2xl mb-12 font-light">${subtitle}</p>
                <div class="flex flex-wrap gap-8">
                    <a href="#register" class="px-12 py-6 bg-primary text-white font-black asym-card text-xl hover:shadow-[0_0_50px_rgba(102,53,222,0.4)] transition-all transform hover:scale-105">${c.ctaText}</a>
                    <div class="flex items-center gap-6 glass-panel px-8 py-4 asym-card border-white/10">
                        <div class="flex -space-x-4">
                            ${[1, 2, 3].map(i => `<div class="w-10 h-10 rounded-full border-2 border-dark-bg bg-primary/20 flex items-center justify-center text-[10px] font-bold text-white overflow-hidden"><img src="https://i.pravatar.cc/100?u=${i}" alt="user"></div>`).join('')}
                        </div>
                        <div class="text-xs font-bold text-white/40 uppercase tracking-widest">Join +50k Traders</div>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/3 relative group section-reveal" style="animation-delay: 0.2s;">
                <div class="relative glass-panel asym-card p-6 border-white/5 shadow-2xl overflow-hidden">
                    <div class="absolute inset-0 bg-gradient-to-br from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div class="w-full aspect-square rounded-[2rem_0.5rem_2rem_0.5rem] bg-dark-bg flex items-center justify-center relative z-10 border border-white/5">
                        <span class="text-[120px] font-black text-white/5">BM</span>
                        <div class="absolute inset-8 border border-primary/20 rounded-[1.5rem_0.3rem_1.5rem_0.3rem] flex items-center justify-center">
                            <span class="material-symbols-outlined text-8xl text-primary/40">signal_cellular_alt</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}
