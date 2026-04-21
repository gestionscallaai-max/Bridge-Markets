import { BrandConfig } from '../types';

export function renderBentoGrid(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const cards = (c.cards || []).map((card: any, i: number) => {
        if (card.size === 'large') {
            return `<div class="md:col-span-8 bg-[#211635] text-white asym-card p-12 relative overflow-hidden group min-h-[280px] flex flex-col justify-between">
                <div class="relative z-10"><h3 class="text-4xl font-headline font-bold mb-4">${card.title}</h3><p class="text-white/60 text-lg max-w-sm">${card.desc}</p></div>
                <div class="absolute -right-20 -bottom-20 w-60 h-60 bg-primary/20 rounded-full blur-[80px]"></div>
            </div>`;
        }
        if (card.accent) {
            return `<div class="md:col-span-4 bg-primary asym-card p-12 flex flex-col justify-between shadow-[0_25px_50px_-12px_rgba(102,53,222,0.25)] hover:translate-y-[-8px] transition-transform">
                <div class="w-16 h-16 asym-card-rev bg-white/10 flex items-center justify-center text-white text-4xl"><span class="material-symbols-outlined">account_balance</span></div>
                <div><h3 class="text-2xl font-headline font-bold text-white mb-4">${card.title}</h3><p class="text-white/80 leading-relaxed">${card.desc}</p></div>
            </div>`;
        }
        if (card.size === 'wide') {
            return `<div class="md:col-span-8 bg-white border border-gray-200 asym-card-sm p-10 flex flex-col md:flex-row items-center justify-between gap-8 group">
                <div class="max-w-md"><h3 class="text-2xl font-headline font-bold mb-4">${card.title}</h3><p class="text-gray-500">${card.desc}</p></div>
            </div>`;
        }
        return `<div class="md:col-span-4 bg-white border border-gray-200 asym-card-sm p-10 shadow-sm flex flex-col items-center text-center">
            <div class="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center text-primary mb-6"><span class="material-symbols-outlined text-4xl">groups</span></div>
            <h3 class="text-xl font-headline font-bold mb-3">${card.title}</h3><p class="text-gray-500 text-sm">${card.desc}</p>
        </div>`;
    }).join('\n');

    return `
    <section class="py-32 relative bg-gray-50">
        <div class="max-w-7xl mx-auto px-8 section-reveal">
            <div class="mb-20 text-center">
                <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase">${c.sectionLabel}</span>
                <h2 class="text-5xl font-headline font-bold text-[#211635] mt-4">${c.title}</h2>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-12 gap-8">${cards}</div>
        </div>
    </section>`;
}

export function renderFeatureSplit(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const features = (c.features || []).map((f: any) => `
        <div class="flex gap-6 group">
            <div class="w-12 h-12 flex-shrink-0 bg-primary/20 asym-card flex items-center justify-center border border-primary/30 group-hover:bg-primary transition-all">
                <span class="material-symbols-outlined text-accent group-hover:text-white">${f.icon}</span>
            </div>
            <div><h4 class="text-xl font-bold mb-2 text-white">${f.title}</h4><p class="text-white/40 text-sm">${f.desc}</p></div>
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8 overflow-hidden relative" style="background: transparent;">
        <div class="absolute right-0 top-1/2 -translate-y-1/2 w-1/3 h-full bg-primary/10 blur-[150px] rounded-full"></div>
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center section-reveal">
            <div class="lg:w-1/2 relative z-10">
                <h2 class="text-5xl font-extrabold font-headline leading-tight mb-8 text-white">${c.title} <span class="text-gradient-purple">${c.highlight}</span></h2>
                <p class="text-lg text-white/50 mb-12 leading-relaxed">${c.subtitle}</p>
                <div class="space-y-10">${features}</div>
            </div>
            <div class="lg:w-1/2 relative">
                <div class="glass-panel asym-card p-6 shadow-2xl">
                    <div class="w-full h-64 rounded-[3rem_0.5rem_3rem_0.5rem] bg-gradient-to-br from-primary/20 to-accent/10 flex items-center justify-center">
                        <span class="material-symbols-outlined text-8xl text-primary/30">analytics</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderStatsRow(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const stats = (c.stats || []).map((s: any) => `
        <div class="group text-center">
            <div class="text-[10px] text-primary font-bold uppercase tracking-[0.4em] mb-4">${s.label}</div>
            <div class="text-5xl md:text-6xl font-headline font-extrabold tracking-tighter group-hover:scale-110 transition-transform ${s.label === 'UPTIME' ? 'text-emerald-500' : 'text-[#211635]'}">${s.value}</div>
        </div>
    `).join('\n');

    return `
    <section class="py-24 bg-white relative section-reveal">
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-2 lg:grid-cols-4 gap-12">${stats}</div>
    </section>`;
}

export function renderRiskGrid(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const items = (c.items || []).map((item: any) => `
        <div class="text-center group">
            <div class="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 transition-all border border-white/10 group-hover:border-primary/50">
                <span class="material-symbols-outlined text-3xl text-accent">${item.icon}</span>
            </div>
            <h4 class="font-bold mb-3 text-white">${item.title}</h4>
            <p class="text-sm text-white/40 leading-relaxed">${item.desc}</p>
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8 relative" style="background: transparent;">
        <div class="max-w-7xl mx-auto glass-panel asym-card bg-[#0f081d]/40 p-12 md:p-20 border-white/5 section-reveal">
            <div class="text-center mb-20">
                <h2 class="text-4xl font-extrabold font-headline mb-4 text-white">${c.title}</h2>
                <p class="text-white/50 max-w-2xl mx-auto">${c.subtitle}</p>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12">${items}</div>
        </div>
    </section>`;
}

export function renderLeaderboard(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const traders = (c.traders || []).map((t: any) => {
        const isTrending = t.trending;
        return `
        <div class="glass-panel p-10 asym-card ${isTrending ? 'border-primary shadow-[0_0_50px_rgba(102,53,222,0.15)]' : 'hover:border-primary/50'} transition-all duration-500 group relative overflow-hidden">
            ${isTrending ? '<div class="absolute top-0 right-0 bg-primary px-6 py-2 rounded-bl-3xl text-[10px] font-black uppercase tracking-widest text-white">Trending</div>' : ''}
            <div class="flex items-center gap-5 mb-10">
                <div class="w-16 h-16 asym-card-rev bg-primary/20 flex items-center justify-center rounded-full text-2xl font-bold text-primary">${t.name.charAt(0)}</div>
                <div>
                    <h3 class="text-xl font-bold ${isTrending ? 'text-accent' : 'group-hover:text-accent'} transition-colors text-white">${t.name}</h3>
                    <p class="text-xs text-white/40 uppercase tracking-widest font-bold">${t.specialty}</p>
                </div>
            </div>
            <div class="grid grid-cols-2 gap-4 mb-10">
                <div class="${isTrending ? 'bg-white/10' : 'bg-white/5'} p-4 rounded-xl">
                    <p class="text-[10px] text-white/30 uppercase font-bold mb-1">Return</p>
                    <p class="text-2xl font-bold text-accent">${t.returnPct}</p>
                </div>
                <div class="${isTrending ? 'bg-white/10' : 'bg-white/5'} p-4 rounded-xl">
                    <p class="text-[10px] text-white/30 uppercase font-bold mb-1">Risk</p>
                    <p class="text-2xl font-bold text-white">${t.risk}</p>
                </div>
            </div>
            <button class="w-full py-4 ${isTrending ? 'bg-primary text-white' : 'bg-primary/20 text-accent hover:bg-primary hover:text-white'} font-bold asym-card transition-all">Copy Portfolio</button>
        </div>`;
    }).join('\n');

    return `
    <section class="py-24 px-8" style="background: transparent;">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
                <div><h2 class="text-4xl font-extrabold font-headline mb-4 text-white">${c.title} <span class="text-accent">${c.highlight}</span></h2>
                <p class="text-white/50">${c.subtitle}</p></div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">${traders}</div>
        </div>
    </section>`;
}

export function renderTrustBadges(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const badges = (c.badges || []).map((b: any) => `
        <div class="flex flex-col items-center gap-4 opacity-40 hover:opacity-100 transition-all cursor-pointer transform hover:scale-110">
            <span class="material-symbols-outlined text-6xl text-primary">${b.icon}</span>
            <span class="text-[10px] font-bold uppercase tracking-[0.2em]">${b.label}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-24 bg-gray-50 relative overflow-hidden section-reveal">
        <div class="max-w-7xl mx-auto px-8 relative z-10 text-center">
            <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-4 block">${c.sectionLabel}</span>
            <h2 class="text-4xl font-headline font-bold mb-16 text-[#211635]">${c.title}</h2>
            <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-10">${badges}</div>
        </div>
    </section>`;
}

export function renderMultiAsset(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const assets = (c.assets || []).map((a: any) => `
        <div class="asym-card-sm p-8 bg-gray-50 border border-gray-200 flex flex-col items-center justify-center hover:bg-primary hover:text-white transition-all duration-500 cursor-pointer shadow-sm hover:shadow-[0_25px_50px_-12px_rgba(102,53,222,0.25)] group">
            <span class="material-symbols-outlined text-4xl mb-3">${a.icon}</span>
            <span class="font-bold text-sm tracking-widest uppercase">${a.name}</span>
        </div>
    `).join('\n');
    const checks = (c.checks || []).map((ch: string) => `
        <div class="flex items-center gap-4 group cursor-default">
            <div class="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <span class="material-symbols-outlined text-xl" style="font-variation-settings: 'FILL' 1;">check_circle</span>
            </div>
            <span class="font-bold text-[#211635]">${ch}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-32 bg-white relative section-reveal">
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
            <div class="order-2 lg:order-1 grid grid-cols-2 md:grid-cols-3 gap-6">${assets}</div>
            <div class="order-1 lg:order-2">
                <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase">${c.sectionLabel}</span>
                <h2 class="text-5xl font-headline font-extrabold tracking-tighter mt-6 mb-8 leading-tight text-[#211635]">${c.title} <br>${c.highlight}</h2>
                <p class="text-gray-500 text-lg leading-relaxed mb-10 font-medium">${c.subtitle}</p>
                <div class="space-y-6">${checks}</div>
            </div>
        </div>
    </section>`;
}

export function renderWorkflowSteps(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const tracks = (c.tracks || []).map((track: any, ti: number) => {
        const isSecond = ti === 1;
        const steps = (track.steps || []).map((s: any) => `
            <div class="flex gap-8 group">
                <div class="w-14 h-14 ${isSecond ? 'asym-card-rev bg-accent text-[#21005d]' : 'asym-card bg-primary text-white'} flex items-center justify-center font-black text-xl flex-shrink-0 group-hover:scale-110 transition-transform">${s.num}</div>
                <div><p class="font-bold text-xl mb-2 text-white">${s.title}</p><p class="text-white/40 text-sm leading-relaxed">${s.desc}</p></div>
            </div>
        `).join('\n');

        return `
        <div class="space-y-12">
            <div class="inline-flex items-center gap-3 glass-panel px-6 py-2 rounded-full border-accent/20">
                <span class="material-symbols-outlined text-accent">${track.badgeIcon}</span>
                <span class="text-xs font-black uppercase tracking-widest text-accent">${track.badge}</span>
            </div>
            <h3 class="text-5xl font-extrabold font-headline text-white">${track.title} <span class="text-accent">${track.highlight}</span></h3>
            <div class="space-y-12">${steps}</div>
        </div>`;
    }).join('\n');

    return `
    <section class="py-24 px-8" style="background: transparent;">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-24 section-reveal">${tracks}</div>
    </section>`;
}

export function renderSecurityFees(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const secItems = (c.securityItems || []).map((item: any) => `
        <div class="bg-white/5 p-8 asym-card border border-white/5">
            <p class="font-bold text-accent mb-4 flex items-center gap-3"><span class="material-symbols-outlined">${item.icon}</span> ${item.title}</p>
            <p class="text-sm text-white/50 leading-relaxed">${item.desc}</p>
        </div>
    `).join('\n');
    const fees = (c.fees || []).map((f: any) => `
        <div class="flex justify-between items-end border-b border-white/20 pb-4">
            <span class="text-sm font-medium opacity-70">${f.label}</span>
            <span class="text-2xl font-black">${f.value}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-24 px-8" style="background: transparent;">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8 section-reveal">
            <div class="lg:col-span-2 glass-panel asym-card p-16 flex flex-col justify-between group">
                <div><h3 class="text-4xl font-extrabold font-headline mb-10 group-hover:text-accent transition-colors text-white">${c.securityTitle}</h3>
                <div class="grid grid-cols-1 md:grid-cols-2 gap-12">${secItems}</div></div>
            </div>
            <div class="bg-primary asym-card p-16 text-white flex flex-col justify-between shadow-[0_0_60px_rgba(102,53,222,0.3)]">
                <div><h3 class="text-3xl font-bold font-headline mb-6">${c.feesTitle}</h3><p class="text-white/70 mb-12">${c.feesSubtitle}</p>
                <div class="space-y-8">${fees}</div></div>
                <p class="text-[10px] text-white/50 italic mt-12 leading-relaxed">Fees are automatically deducted only on Net New Profit (High Water Mark methodology).</p>
            </div>
        </div>
    </section>`;
}

export function renderCtaCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const stats = (c.communityStats || []).map((s: any) => `
        <div><div class="text-5xl font-headline font-black tracking-tighter">${s.value}</div><div class="text-[10px] font-bold uppercase tracking-[0.3em] opacity-60">${s.label}</div></div>
    `).join('\n');

    return `
    <section class="py-20 relative bg-primary section-reveal">
        <div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-center gap-12 text-white">
            <div><h3 class="text-4xl font-headline font-extrabold mb-4 leading-tight">${c.title} <br>${c.highlight}</h3><p class="text-white/70 max-w-sm">${c.subtitle}</p></div>
            <div class="flex flex-wrap gap-12 text-center md:text-left">${stats}</div>
            <a href="#register" class="px-10 py-5 rounded-full bg-white text-primary font-bold text-lg hover:scale-105 shadow-xl transition-all inline-block">${c.cta}</a>
        </div>
    </section>`;
}

export function renderCalculator(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    return `
    <section class="py-24 bg-dark-bg">
        <div class="max-w-4xl mx-auto px-8 text-center text-white">
            <h3 class="text-3xl font-bold mb-8">${c.title || 'Inversion Calculator'}</h3>
            <div class="glass-panel p-10 rounded-2xl">
                 <p class="opacity-70 text-sm mb-6">${c.description || 'Estimate your profits with our professional management system.'}</p>
                 <div class="grid grid-cols-1 md:grid-cols-2 gap-8 text-left">
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest opacity-40">Initial Deposit</label>
                        <div class="text-2xl font-black mt-2">$10,000</div>
                    </div>
                    <div>
                        <label class="text-[10px] font-black uppercase tracking-widest opacity-40">Monthly Target</label>
                        <div class="text-2xl font-black text-primary mt-2">15% - 40%</div>
                    </div>
                 </div>
            </div>
        </div>
    </section>`;
}

export function renderSyntheticFamilies(content: Record<string, any>, brand: BrandConfig): string {
    return `<section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-8">
            <h2 class="text-3xl font-headline font-bold text-center mb-12">${content.title || 'Nuestras Familias'}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                ${(content.families || []).map((f: any) => `
                    <div class="p-8 border border-gray-100 rounded-2xl hover:shadow-xl transition-shadow">
                        <h3 class="text-xl font-bold mb-4">${f.name}</h3>
                        <p class="text-gray-500 text-sm">${f.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderChallengeMatrix(content: Record<string, any>, brand: BrandConfig): string {
    return `<section class="py-24 bg-gray-50">
        <div class="max-w-7xl mx-auto px-8">
            <h2 class="text-3xl font-headline font-bold text-center mb-16">${content.title || 'Plan de Desafíos'}</h2>
            <div class="overflow-x-auto">
                <table class="w-full text-left">
                    <thead>
                        <tr class="border-b border-gray-200">
                            <th class="py-4 font-bold">Concepto</th>
                            ${(content.plans || []).map((p: any) => `<th class="py-4 font-bold">${p.name}</th>`).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${(content.rows || []).map((r: any) => `
                            <tr class="border-b border-gray-100">
                                <td class="py-4 text-sm text-gray-500">${r.label}</td>
                                ${(r.values || []).map((v: string) => `<td class="py-4 font-medium">${v}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </div>
    </section>`;
}

export function renderDualSteps(content: Record<string, any>, brand: BrandConfig): string {
    return `<section class="py-24">
        <div class="max-w-7xl mx-auto px-8 grid grid-cols-1 md:grid-cols-2 gap-16">
            ${(content.sides || []).map((side: any) => `
                <div class="glass-panel p-10 rounded-3xl">
                    <h3 class="text-2xl font-bold mb-8">${side.title}</h3>
                    <div class="space-y-6">
                        ${(side.steps || []).map((s: any) => `
                            <div class="flex gap-4">
                                <div class="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center flex-shrink-0 text-sm font-bold">${s.num}</div>
                                <p class="text-gray-600">${s.desc}</p>
                            </div>
                        `).join('')}
                    </div>
                </div>
            `).join('')}
        </div>
    </section>`;
}

export function renderLeverageSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return `<section class="py-24 bg-dark-bg text-white">
        <div class="max-w-7xl mx-auto px-8">
            <h2 class="text-4xl font-headline font-bold mb-12">${content.title || 'Apalancamiento'}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                ${(content.items || []).map((item: any) => `
                    <div class="p-8 bg-white/5 rounded-2xl border border-white/10">
                        <div class="text-accent text-3xl font-black mb-2">${item.value}</div>
                        <div class="text-sm opacity-50 uppercase tracking-widest">${item.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderUniverseLogic(content: Record<string, any>, brand: BrandConfig): string {
    return `<section class="py-24 bg-white">
        <div class="max-w-7xl mx-auto px-8 text-center">
            <h2 class="text-3xl font-headline font-bold mb-12">${content.title || 'Lógica del Sistema'}</h2>
            <p class="max-w-2xl mx-auto text-gray-500">${content.desc || ''}</p>
        </div>
    </section>`;
}

export function renderSntHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.ibName || brand.fullName || "Partner Oficial";
    const ibPhrase = content.ibPhrase || "";
    const ctaText = content.ctaText || "Abrir mi cuenta";
    const ctaLink = brand.ctaLink || "#register";
    
    return `
    <section class="relative min-h-screen flex items-center pt-24 pb-20 px-8 bg-[#020205] overflow-hidden border-b border-white/5">
        <!-- Deep Space Galaxy Animation -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 opacity-40" style="background: radial-gradient(circle at 20% 30%, #4c1d95 0%, transparent 50%), radial-gradient(circle at 80% 70%, #8b5cf6 0%, transparent 50%); filter: blur(80px);"></div>
            <canvas id="starfield" class="absolute inset-0 z-0 opacity-80"></canvas>
            <div class="absolute top-[-10%] left-[-10%] w-[70%] h-[70%] bg-[#8b5cf6]/20 rounded-full blur-[120px] opacity-70"></div>
            <div class="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-[#4c1d95]/20 rounded-full blur-[120px] opacity-70"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="section-reveal">
                <!-- Branding Row -->
                <div class="flex items-center gap-5 mb-10">
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-8 md:h-10 opacity-100 drop-shadow-[0_0_20px_rgba(255,255,255,0.4)]">
                    <div class="h-6 w-[1px] bg-white/20"></div>
                    <div class="flex flex-col">
                        <span class="text-[10px] font-black text-white/40 uppercase tracking-widest">Presentado por</span>
                        <div class="flex items-center gap-2">
                            ${brand.logoUrl ? `<img src="${brand.logoUrl}" class="h-5 w-auto object-contain">` : ''}
                            <span class="text-xs font-bold text-white uppercase tracking-tight">${ibName}</span>
                        </div>
                    </div>
                </div>

                <!-- Fixed Main Title -->
                <h1 class="text-4xl md:text-7xl font-black text-white leading-tight mb-8 tracking-tighter uppercase">
                    OPERA EN UN NUEVO <br>
                    <span class="text-gradient-purple animate-gradient-x">UNIVERSO</span> DE OPORTUNIDADES.
                </h1>

                <!-- Fixed Subtitle -->
                <p class="text-lg md:text-xl text-white/60 leading-relaxed mb-10 font-medium max-w-xl">
                    Bienvenido a los Índices Sintéticos de Bridge Markets, mercados virtuales 24/7 con comportamientos realistas.
                </p>

                <!-- Editable IB Phrase -->
                ${ibPhrase ? `
                    <div class="inline-block p-[1px] rounded-xl bg-gradient-to-r from-[#8b5cf6]/50 to-transparent mb-12">
                        <div class="bg-[#020205] px-6 py-3 rounded-xl border border-white/5">
                            <p class="text-sm text-[#c4b5fd] font-medium tracking-wide italic">"${ibPhrase}"</p>
                        </div>
                    </div>
                ` : '<div class="mb-12"></div>'}

                <!-- CTA and Taglines -->
                <div class="flex flex-col sm:flex-row gap-8 items-center">
                    <a href="${ctaLink}" class="w-full sm:w-auto px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all shadow-[0_20px_40px_rgba(255,255,255,0.1)] hover:shadow-[#8b5cf6]/40 text-center">
                        ${ctaText}
                    </a>
                    
                    <div class="flex flex-col gap-3">
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span class="text-[10px] font-black text-white/80 uppercase tracking-widest whitespace-nowrap">Sin noticias, sin pausas, sin límites.</span>
                        </div>
                        <div class="flex items-center gap-3">
                            <span class="w-2 h-2 rounded-full bg-[#8b5cf6] animate-pulse" style="animation-delay: 1s"></span>
                            <span class="text-[10px] font-black text-white/40 uppercase tracking-widest whitespace-nowrap">Solo pura acción de mercado, siempre disponible.</span>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Visual Asset -->
            <div class="relative hidden lg:flex justify-center">
                <div class="absolute inset-0 bg-[#8b5cf6]/20 rounded-full blur-[100px] animate-pulse"></div>
                <img src="/images/imagenes_nuevas/rey_rosa.png" alt="Chess King" class="relative z-10 w-[80%] drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] animate-[heroFloat_6s_ease-in-out_infinite]">
            </div>
        </div>
    </section>`;
}

export function renderSntAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section id="about" class="py-32 px-8 bg-[#020205] relative overflow-hidden border-b border-white/5">
        <div class="absolute top-1/2 left-0 w-[40%] h-[40%] bg-[#8b5cf6]/5 rounded-full blur-[120px]"></div>
        
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center section-reveal">
            <div class="order-2 lg:order-1 relative flex justify-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#8b5cf6]/20 to-transparent rounded-full blur-[80px]"></div>
                    <img src="/images/imagenes_nuevas/caballo_rosa.png" alt="Estrategia y Control" class="w-full max-w-sm h-auto object-contain relative z-10 drop-shadow-[0_30px_60px_rgba(0,0,0,0.8)] animate-[heroFloat_5s_ease-in-out_infinite]">
                    
                    <!-- Decorative Element -->
                    <div class="absolute -right-8 -top-8 w-24 h-24 border border-white/10 rounded-full flex items-center justify-center animate-spin-slow">
                        <div class="w-2 h-2 bg-[#8b5cf6] rounded-full"></div>
                    </div>
                </div>
            </div>
            
            <div class="order-1 lg:order-2">
                <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                    <span class="material-symbols-outlined text-sm text-[#8b5cf6]">school</span>
                    <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Sección Educativa</span>
                </div>
                
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-10 tracking-tighter uppercase leading-[1.1]">
                    ¿Qué son los <br><span class="text-gradient-purple">Índices Sintéticos?</span>
                </h2>
                
                <div class="space-y-8">
                    <p class="text-xl text-white/60 leading-relaxed font-light">
                        Los <span class="text-white font-bold">Índices Sintéticos de Bridge Markets</span> son instrumentos financieros creados a partir de algoritmos de generación aleatoria controlada (RNG – Random Number Generator) que simulan los movimientos del mercado con base en volatilidad, tendencias y patrones de comportamiento real.
                    </p>
                    
                    <div class="p-8 bg-white/[0.02] border border-white/5 rounded-3xl backdrop-blur-sm">
                        <p class="text-lg text-white/50 leading-relaxed font-light italic">
                            "Estos índices no dependen de activos físicos (como acciones o divisas) ni de noticias externas. En cambio, reproducen las condiciones dinámicas de los mercados financieros reales: subidas, caídas, impulsos, consolidaciones y rupturas."
                        </p>
                    </div>
                    
                    <p class="text-lg text-white/60 leading-relaxed font-light">
                        Gracias a esto, puedes operar bajo reglas claras y constantes, con condiciones estables, accesibles 24/7 y sin la incertidumbre que provocan los eventos globales.
                    </p>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntAdvantages(content: Record<string, any>, brand: BrandConfig): string {
    const advantages = [
        { icon: 'schedule', title: 'Disponibles 24/7', desc: 'Opera sin interrupciones, los 365 días del año. Los índices sintéticos no cierran, no duermen y no se detienen.' },
        { icon: 'verified_user', title: 'Transparencia total', desc: 'Cada movimiento es generado por un sistema aleatorio auditado, garantizando imparcialidad y consistencia estadística.' },
        { icon: 'legend_toggle', title: 'Volatilidad controlada', desc: 'Cada familia tiene niveles definidos de volatilidad para que elijas el perfil que más se adapte a tu estrategia.' },
        { icon: 'notifications_off', title: 'Sin influencia de noticias', desc: 'Olvídate de los eventos macroeconómicos. Aquí las condiciones son puramente técnicas.' },
        { icon: 'memory', title: 'Ideal para trading algorítmico', desc: 'Diseñados para bots, estrategias cuantitativas y pruebas de backtesting en entornos consistentes.' },
        { icon: 'analytics', title: 'Riesgo medible y oportunidades constantes', desc: 'Gracias a la naturaleza matemática de sus series, puedes diseñar sistemas más predecibles y controlar mejor la gestión del riesgo.' },
    ];

    return `
    <section class="py-32 px-8 bg-[#020205] relative border-b border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="inline-block px-5 py-2 bg-[#8b5cf6]/10 text-[#c4b5fd] text-[10px] font-black uppercase tracking-[0.4em] mb-6 rounded-full border border-[#8b5cf6]/20">Ventajas Exclusivas</span>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white tracking-tighter uppercase leading-tight">
                    ¿Por qué operar con <br><span class="text-gradient-purple">Bridge Markets?</span>
                </h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 section-reveal">
                ${advantages.map((adv, i) => `
                    <div class="group relative p-10 bg-white/[0.02] border border-white/5 rounded-[2rem] hover:bg-white/[0.04] hover:border-[#8b5cf6]/30 transition-all duration-500 overflow-hidden">
                        <!-- Card Glow -->
                        <div class="absolute -right-20 -top-20 w-40 h-40 bg-[#8b5cf6]/10 rounded-full blur-[50px] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        
                        <div class="relative z-10">
                            <div class="w-16 h-16 bg-[#8b5cf6]/10 rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 group-hover:bg-[#8b5cf6] transition-all duration-500 shadow-lg">
                                <span class="material-symbols-outlined text-3xl text-[#c4b5fd] group-hover:text-white transition-colors">${adv.icon}</span>
                            </div>
                            <h3 class="text-xl font-black text-white mb-4 uppercase tracking-tight leading-snug">${adv.title}</h3>
                            <p class="text-white/40 font-light leading-relaxed">${adv.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { 
            id: 'fortune', 
            name: 'FORTUNE', 
            type: 'Step by Step RNG Indices',
            tagline: '"El ritmo constante del mercado en movimiento."',
            desc: 'Los índices Fortune y FortuneX simulan movimientos de precio en "pasos" controlados. Cada "step" representa un avance o retroceso discreto dentro del gráfico, ofreciendo un entorno ideal para quienes buscan estructura, precisión y escenarios de rompimiento.',
            subs: 'Fortune 100, 250, 500, 1000 | FortuneX 200, 300, 500',
            features: ['Movimiento escalonado', 'Comportamiento ordenado', 'Versiones "X" con multiplicador'],
            icon: 'stairs',
            color: 'from-blue-500 to-indigo-600'
        },
        { 
            id: 'vortex', 
            name: 'VORTEX', 
            type: 'Volatility Indices',
            tagline: '"Donde la Intensidad del mercado cobra vida."',
            desc: 'Los índices Vortex ofrecen escenarios de volatilidad constante, ideales para medir tu capacidad de reacción y control. Cada número indica el nivel de turbulencia del mercado: a mayor cifra, mayor energía y amplitud de movimiento.',
            subs: 'Vortex 20, Vortex 40, Vortex 60, Vortex 80, Vortex 100',
            features: ['Volatilidad estable', 'Sin interrupciones', 'Oscilaciones proporcionales'],
            icon: 'cyclone',
            color: 'from-purple-500 to-pink-600'
        },
        { 
            id: 'trending', 
            name: 'BULLX & BEARX', 
            type: 'Volatility Indices — Trending',
            tagline: '"Los motores del impulso y la caída."',
            desc: 'La familia Trending está compuesta por los índices BullX (tendencia bajista con Spikes Alcistas) y BearX (tendencia alcista con Spikes Bajistas). Simulan entornos donde predominan las direcciones fuertes, con movimientos explosivos periódicos.',
            subs: 'BullX/BearX 400, 777, 900, 1000',
            features: ['Direccionalidad clara', 'Spikes estadísticos', 'Ideal para Momentum'],
            icon: 'trending_up',
            color: 'from-emerald-500 to-teal-600'
        },
        { 
            id: 'fomox', 
            name: 'FOMOX', 
            type: 'Random Trend Indices',
            tagline: '"Donde la tendencia aparece sin aviso... y desaparece igual."',
            desc: 'Los índices FomoX representan escenarios de tendencia aleatoria y espontánea; los movimientos pueden iniciar o revertirse sin un patrón fijo. Imitan los momentos de "hype" o euforia de mercado, donde la velocidad domina.',
            subs: 'FomoX 111, 333, 888, 999',
            features: ['Tendencias espontáneas', 'Aceleración rápida', 'Breakout & Trend Following'],
            icon: 'bolt',
            color: 'from-orange-500 to-red-600'
        }
    ];

    return `
    <section id="families" class="py-32 px-8 bg-[#020205] relative border-b border-white/5 overflow-hidden">
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="text-center mb-24 section-reveal">
                <span class="inline-block px-5 py-2 bg-[#8b5cf6]/10 text-[#c4b5fd] text-[10px] font-black uppercase tracking-[0.4em] mb-6 rounded-full border border-[#8b5cf6]/20">Catálogo de Activos</span>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white tracking-tighter uppercase mb-6">Nuestras Familias de Índices</h2>
                <p class="text-xl text-white/40 max-w-3xl mx-auto font-light leading-relaxed">
                    Bridge Markets agrupa sus índices en cuatro familias principales, cada una con un comportamiento característico y un propósito de trading distinto.
                </p>
            </div>
            
            <!-- Cards Grid -->
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-32 section-reveal">
                ${families.map(fam => `
                    <div class="group relative p-1 bg-gradient-to-br from-white/10 to-transparent rounded-[2.5rem] transition-all hover:from-[#8b5cf6]/40">
                        <div class="bg-[#050508] p-10 rounded-[2.4rem] h-full flex flex-col">
                            <div class="flex items-center gap-6 mb-8">
                                <div class="w-20 h-20 rounded-2xl bg-gradient-to-br ${fam.color} flex items-center justify-center shadow-2xl shadow-black/50 group-hover:scale-110 transition-transform duration-500">
                                    <span class="material-symbols-outlined text-4xl text-white">${fam.icon}</span>
                                </div>
                                <div>
                                    <h3 class="text-3xl font-black text-white uppercase tracking-tighter">${fam.name}</h3>
                                    <p class="text-[10px] font-black text-[#8b5cf6] uppercase tracking-[0.3em]">${fam.type}</p>
                                </div>
                            </div>
                            
                            <p class="text-[#c4b5fd] font-bold text-sm italic mb-6">${fam.tagline}</p>
                            <p class="text-white/50 font-light leading-relaxed mb-8 flex-grow">${fam.desc}</p>
                            
                            <div class="space-y-6 pt-8 border-t border-white/5">
                                <div>
                                    <p class="text-[10px] font-black text-white/30 uppercase tracking-widest mb-3">Subfamilias</p>
                                    <p class="text-sm text-white/80 font-bold tracking-tight">${fam.subs}</p>
                                </div>
                                <div class="flex flex-wrap gap-2">
                                    ${fam.features.map(f => `<span class="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-white/40 uppercase tracking-widest">${f}</span>`).join('')}
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>

            <!-- Comparison Table -->
            <div class="section-reveal">
                <div class="text-center mb-16">
                    <h3 class="text-2xl font-black text-white uppercase tracking-tighter">Comparativa de Comportamiento</h3>
                </div>
                <div class="glass-panel rounded-[2rem] border-white/5 overflow-hidden">
                    <table class="w-full text-left border-collapse">
                        <thead>
                            <tr class="bg-white/5 border-b border-white/10">
                                <th class="p-6 text-[10px] font-black text-[#8b5cf6] uppercase tracking-widest">Familia</th>
                                <th class="p-6 text-[10px] font-black text-[#8b5cf6] uppercase tracking-widest">Índices</th>
                                <th class="p-6 text-[10px] font-black text-[#8b5cf6] uppercase tracking-widest">Comportamiento Principal</th>
                            </tr>
                        </thead>
                        <tbody class="text-sm">
                            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td class="p-6 text-white font-bold">FORTUNE</td>
                                <td class="p-6 text-white/60">Fortune 100/1000 — FortuneX</td>
                                <td class="p-6 text-white/60">Movimiento escalonado (step-by-step). Rangos y rupturas claras.</td>
                            </tr>
                            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td class="p-6 text-white font-bold">VORTEX</td>
                                <td class="p-6 text-white/60">Vortex 20 / 40 / 60 / 80 / 100</td>
                                <td class="p-6 text-white/60">Volatilidad constante y predecible. A mayor número, mayor amplitud.</td>
                            </tr>
                            <tr class="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                                <td class="p-6 text-white font-bold">BULLX & BEARX</td>
                                <td class="p-6 text-white/60">BullX/BearX 400/777/900/1000</td>
                                <td class="p-6 text-white/60">Tendencias con spikes direccionales. Momentum e impulso.</td>
                            </tr>
                            <tr class="hover:bg-white/[0.02] transition-colors">
                                <td class="p-6 text-white font-bold">FOMOX</td>
                                <td class="p-6 text-white/60">FomoX 111 / 333 / 888 / 999</td>
                                <td class="p-6 text-white/60">Tendencia aleatoria y espontánea. Ideal para breakout y reversals.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { num: '01', title: 'Elige tu familia', desc: 'Decide si buscas estabilidad (Fortune/Vortex), tendencia (BullX/BearX) o caos controlado (FomoX).' },
        { num: '02', title: 'Define tu estrategia', desc: 'Usa tus propios indicadores o prueba tus bots en entornos 100% repetibles.' },
        { num: '03', title: 'Gestiona el riesgo', desc: 'Cada índice tiene su propia personality. Ajusta tu tamaño de posición y stop loss.' },
        { num: '04', title: 'Analiza patrones', desc: 'Los índices Bridge Markets ofrecen consistencia. Ideal para backtesting y optimización.' },
        { num: '05', title: 'Disfruta el proceso', desc: 'Aquí cada tick es una oportunidad. Sin noticias, sin excusas.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050508] relative border-b border-white/5 overflow-hidden">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="inline-block px-5 py-2 bg-[#8b5cf6]/10 text-[#c4b5fd] text-[10px] font-black uppercase tracking-[0.4em] mb-6 rounded-full border border-[#8b5cf6]/20">Metodología</span>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white tracking-tighter uppercase mb-6">¿Cómo operar Sintéticos?</h2>
                <p class="text-white/40 max-w-2xl mx-auto font-light leading-relaxed">Sigue este flujo profesional para maximizar tu eficiencia operativa.</p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-5 gap-8 section-reveal">
                ${steps.map((step, i) => `
                    <div class="relative group">
                        <!-- Step Connector Line -->
                        ${i < steps.length - 1 ? `<div class="hidden md:block absolute top-10 left-[60%] w-full h-[1px] bg-white/10 z-0"></div>` : ''}
                        
                        <div class="relative z-10 flex flex-col items-center md:items-start">
                            <div class="w-20 h-20 rounded-[2rem] bg-[#0a0a0f] border border-white/10 flex items-center justify-center mb-8 group-hover:bg-[#8b5cf6] group-hover:border-[#8b5cf6] transition-all duration-500 shadow-xl group-hover:scale-110 group-hover:rotate-6">
                                <span class="text-2xl font-black text-[#8b5cf6] group-hover:text-white transition-colors">${step.num}</span>
                            </div>
                            <div class="text-center md:text-left">
                                <h3 class="text-xl font-black text-white mb-4 uppercase tracking-tight">${step.title}</h3>
                                <p class="text-sm text-white/40 font-light leading-relaxed">${step.desc}</p>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntSpecs(content: Record<string, any>, brand: BrandConfig): string {
    const title = content.title || 'Parámetros de Ejecución';
    const intro = content.intro || 'Cada familia de índices ha sido diseñada con parámetros precisos que reflejan distintos comportamientos del mercado, niveles de volatilidad y profundidad operativa.';
    const rows = content.rows || [
        { family: 'FORTUNE / FORTUNEX', spread: '0.00', lotajeMinimo: '0.01', limiteOperacion: '50.00', costoTick: '0.01' },
        { family: 'VORTEX', spread: '0.00', lotajeMinimo: '0.10', limiteOperacion: '100.00', costoTick: '0.10' },
        { family: 'BULLX & BEARX', spread: '0.00', lotajeMinimo: '0.50', limiteOperacion: '200.00', costoTick: '0.50' },
        { family: 'FOMOX', spread: '0.00', lotajeMinimo: '0.20', limiteOperacion: '150.00', costoTick: '0.20' }
    ];

    return `
    <section id="specs" class="py-32 px-8 bg-[#020205] relative overflow-hidden border-b border-white/5">
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-24 items-center section-reveal">
            <div>
                <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                    <span class="material-symbols-outlined text-sm text-[#8b5cf6]">terminal</span>
                    <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Especificaciones Técnicas</span>
                </div>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-10 tracking-tighter uppercase leading-[1.1]">${title.replace('de Ejecución', '<br><span class="text-gradient-purple">de Ejecución</span>')}</h2>
                
                <p class="text-white/50 font-light leading-relaxed mb-12">${intro}</p>
                
                <div class="space-y-3">
                    <div class="grid grid-cols-5 p-4 bg-white/[0.03] border border-white/5 rounded-2xl text-[8px] md:text-[9px] font-black text-[#8b5cf6] uppercase tracking-widest text-center">
                        <div class="col-span-1 text-left">Familia</div>
                        <div>Spread</div>
                        <div>Lotaje Mín</div>
                        <div>Lím. Operación</div>
                        <div>Costo / Tick</div>
                    </div>
                    ${rows.map((row: any) => `
                        <div class="grid grid-cols-5 p-5 bg-white/[0.01] border border-white/5 rounded-2xl hover:bg-white/[0.04] transition-colors items-center text-center">
                            <div class="col-span-1 text-white font-bold text-[10px] md:text-xs uppercase tracking-tight text-left">${row.family}</div>
                            <div class="text-[#c4b5fd] font-medium text-xs">${row.spread || '0.00'}</div>
                            <div class="text-white/60 text-xs">${row.lotajeMinimo || '0.01'}</div>
                            <div class="text-white/60 text-xs">${row.limiteOperacion || '50.00'}</div>
                            <div class="text-white/60 text-xs">${row.costoTick || '0.01'}</div>
                        </div>
                    `).join('')}
                </div>
                
                <p class="mt-8 text-[10px] text-white/30 italic">
                    * Los datos técnicos deben ser consultados directamente en el panel del Broker para valores actualizados en tiempo real.
                </p>
            </div>
            
            <div class="relative flex justify-center lg:justify-end">
                <div class="relative">
                    <div class="absolute inset-0 bg-gradient-to-tr from-[#8b5cf6]/30 to-transparent rounded-full blur-[100px]"></div>
                    <img src="/images/imagenes_nuevas/reloj_rosa.png" alt="Reloj 24/7" class="w-full max-w-md h-auto object-contain relative z-10 drop-shadow-[0_40px_80px_rgba(0,0,0,0.8)] animate-[heroFloat_6s_ease-in-out_infinite]">
                    
                    <div class="absolute -left-10 bottom-10 glass-panel p-6 rounded-3xl border-white/10 animate-[bounce_5s_ease-in-out_infinite]">
                        <div class="flex items-center gap-4">
                            <span class="material-symbols-outlined text-3xl text-emerald-400">update</span>
                            <div>
                                <p class="text-[10px] font-black text-white/40 uppercase tracking-widest">Disponibilidad</p>
                                <p class="text-lg font-black text-white">24 / 7 / 365</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntPlatforms(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { title: 'Crea tu cuenta', desc: 'Regístrate en el portal de Bridge Markets a través del botón de tu IB.' },
        { title: 'Completa KYC', desc: 'Verifica tu identidad para asegurar la transparencia de tus operaciones.' },
        { title: 'Deposita fondos', desc: 'Carga saldo en tu cuenta de trading de forma rápida y segura.' },
        { title: 'Descarga MT5', desc: 'Bájate la plataforma en escritorio, iOS o Android.' },
        { title: 'Conéctate', desc: 'Busca el servidor BridgeMarkets-MT5 en el panel de instrumentos.' },
        { title: 'Opera 24/7', desc: 'Elige tu familia favorita y empieza a operar sin límites.' }
    ];

    return `
    <section id="platforms" class="py-32 px-8 bg-[#020205] relative overflow-hidden border-b border-white/5">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-24 items-center section-reveal">
            <div class="lg:w-1/2">
                <div class="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                    <span class="material-symbols-outlined text-sm text-[#8b5cf6]">download_for_offline</span>
                    <span class="text-[10px] font-black uppercase tracking-[0.3em] text-white/60">Tecnología de Vanguardia</span>
                </div>
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-10 tracking-tighter uppercase leading-[1.1]">Dominio <br><span class="text-gradient-purple">Multiplataforma</span></h2>
                
                <p class="text-lg text-white/50 font-light leading-relaxed mb-12">
                    Lleva el mercado contigo. Nuestra infraestructura está optimizada para ofrecer la menor latencia y la mayor estabilidad en cualquier dispositivo.
                </p>
                
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    ${steps.map((s, i) => `
                        <div class="p-6 bg-white/[0.02] border border-white/5 rounded-2xl group hover:border-[#8b5cf6]/40 transition-all">
                            <div class="flex items-center gap-4 mb-4">
                                <span class="w-8 h-8 rounded-lg bg-[#8b5cf6]/20 flex items-center justify-center text-[10px] font-black text-[#c4b5fd] group-hover:bg-[#8b5cf6] group-hover:text-white transition-colors">0${i + 1}</span>
                                <h4 class="text-white font-bold uppercase tracking-tight">${s.title}</h4>
                            </div>
                            <p class="text-xs text-white/40 leading-relaxed font-light">${s.desc}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="lg:w-1/2 w-full">
                <div class="relative group">
                    <!-- Glow effect -->
                    <div class="absolute inset-0 bg-[#8b5cf6]/20 blur-[100px] opacity-50 group-hover:opacity-80 transition-opacity"></div>
                    
                    <div class="relative glass-panel p-10 md:p-16 rounded-[3rem] border-white/10 backdrop-blur-3xl overflow-hidden shadow-2xl">
                        <div class="absolute top-0 right-0 p-8">
                            <span class="material-symbols-outlined text-6xl text-white/5 group-hover:text-[#8b5cf6]/20 transition-colors">hub</span>
                        </div>
                        
                        <div class="flex flex-col items-center text-center">
                            <div class="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center mb-10 border border-white/10 group-hover:rotate-12 transition-transform">
                                <img src="/images/logo-bm-blanco.png" alt="MT5" class="w-12 h-12 grayscale group-hover:grayscale-0 transition-all">
                            </div>
                            <h3 class="text-3xl font-black text-white uppercase tracking-tighter mb-6">MetaTrader 5</h3>
                            <p class="text-sm text-white/40 font-light leading-relaxed mb-10 max-w-sm">
                                La plataforma estándar de la industria para el trading de alta precisión. Disponible en todas las tiendas de aplicaciones.
                            </p>
                            
                            <div class="flex flex-wrap justify-center gap-4">
                                <div class="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-sm">laptop_mac</span>
                                    <span class="text-[9px] font-black text-white uppercase tracking-widest">Escritorio</span>
                                </div>
                                <div class="flex items-center gap-3 px-6 py-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 transition-colors cursor-pointer">
                                    <span class="material-symbols-outlined text-sm">smartphone</span>
                                    <span class="text-[9px] font-black text-white uppercase tracking-widest">Mobile</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const communityName = content.communityName || brand.communityName || brand.fullName;
    const message = content.welcomeMessage || "Escribe aquí un mensaje de bienvenida para tu comunidad (máx. 3 párrafos). Sin promesas de rendimientos.";
    const language = content.language || "Español";
    
    // Social Links
    const telegram = content.socialTelegram || brand.telegram || "";
    const whatsapp = content.socialWhatsApp || brand.whatsapp || "";
    const instagram = content.socialInstagram || brand.instagram || "";
    const youtube = content.socialYouTube || brand.youtube || "";
    const tiktok = content.socialTikTok || brand.tiktok || "";
    
    const contactButtonText = content.contactButtonText || "Habla con soporte";
    const ctaText = content.ctaText || "Únete a mi comunidad";
    const ctaLink = brand.ctaLink || "#register";

    return `
    <section class="py-32 px-8 bg-[#020205] relative section-reveal overflow-hidden border-b border-white/5">
        <div class="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
        
        <div class="max-w-6xl mx-auto relative z-10">
            <div class="glass-panel p-12 md:p-24 rounded-[4rem] border-white/10 bg-gradient-to-br from-white/[0.03] to-transparent shadow-2xl backdrop-blur-xl relative overflow-hidden group">
                <!-- Background Decoration -->
                <div class="absolute top-0 right-0 w-[500px] h-[500px] bg-[#8b5cf6]/5 rounded-full blur-[120px] -mr-64 -mt-64 group-hover:bg-[#8b5cf6]/10 transition-colors duration-700"></div>
                
                <div class="grid grid-cols-1 lg:grid-cols-5 gap-16 items-center">
                    <div class="lg:col-span-2 flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div class="w-32 h-32 md:w-48 md:h-48 rounded-full bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95] p-1 mb-10 shadow-2xl shadow-[#8b5cf6]/20">
                            <div class="w-full h-full rounded-full bg-[#050508] flex items-center justify-center overflow-hidden border-4 border-[#050508]">
                                ${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="IB Logo" class="w-full h-full object-cover">` : `<span class="text-6xl font-black text-white">${communityName.charAt(0)}</span>`}
                            </div>
                        </div>
                        <div class="space-y-4">
                            <span class="px-4 py-1.5 bg-[#8b5cf6]/20 text-[#c4b5fd] text-[10px] font-black uppercase tracking-[0.3em] rounded-full border border-[#8b5cf6]/30 inline-block">IB Partner Oficial</span>
                            <h2 class="text-4xl md:text-6xl font-black font-headline text-white tracking-tighter uppercase leading-tight">${communityName}</h2>
                            <p class="text-sm font-bold text-white/30 uppercase tracking-widest flex items-center gap-2 justify-center lg:justify-start">
                                <span class="material-symbols-outlined text-sm">language</span>
                                Idioma: ${language}
                            </p>
                        </div>
                    </div>
                    
                    <div class="lg:col-span-3 space-y-10">
                        <div class="space-y-6">
                            <p class="text-xl md:text-2xl text-white/70 leading-relaxed font-light italic">
                                "${message}"
                            </p>
                        </div>
                        
                        <div class="flex flex-wrap gap-4 justify-center lg:justify-start">
                            ${telegram ? `
                                <a href="${telegram}" target="_blank" class="w-14 h-14 rounded-2xl bg-[#0088cc]/10 border border-[#0088cc]/30 flex items-center justify-center text-[#0088cc] hover:bg-[#0088cc] hover:text-white transition-all shadow-lg group/social">
                                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm5.894 8.221l-1.97 9.28c-.145.658-.537.818-1.084.508l-3-2.21-1.446 1.394c-.14.14-.25.25-.51.25l.213-3.03 5.518-4.982c.24-.213-.054-.331-.372-.12l-6.821 4.293-2.937-.92c-.639-.2-.65-.639.133-.946l11.482-4.425c.532-.193.997.126.804.899z"/></svg>
                                </a>
                            ` : ''}
                            ${whatsapp ? `
                                <a href="https://wa.me/${whatsapp.replace(/\D/g, '')}" target="_blank" class="w-14 h-14 rounded-2xl bg-[#25d366]/10 border border-[#25d366]/30 flex items-center justify-center text-[#25d366] hover:bg-[#25d366] hover:text-white transition-all shadow-lg">
                                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.417-.003 6.557-5.338 11.892-11.893 11.892-1.997-.001-3.951-.5-5.688-1.448l-6.305 1.652zm6.599-3.835c1.406.836 2.915 1.277 4.453 1.277 5.143 0 9.327-4.183 9.33-9.325.001-2.491-.97-4.831-2.736-6.596s-4.105-2.737-6.596-2.737c-5.142 0-9.325 4.183-9.328 9.325-.001 1.634.425 3.23 1.233 4.636l-1.074 3.92 4.019-1.054z"/></svg>
                                </a>
                            ` : ''}
                            ${instagram ? `
                                <a href="${instagram}" target="_blank" class="w-14 h-14 rounded-2xl bg-[#e1306c]/10 border border-[#e1306c]/30 flex items-center justify-center text-[#e1306c] hover:bg-[#e1306c] hover:text-white transition-all shadow-lg">
                                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
                                </a>
                            ` : ''}
                            ${youtube ? `
                                <a href="${youtube}" target="_blank" class="w-14 h-14 rounded-2xl bg-[#ff0000]/10 border border-[#ff0000]/30 flex items-center justify-center text-[#ff0000] hover:bg-[#ff0000] hover:text-white transition-all shadow-lg">
                                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.186c-.272-1.034-1.046-1.847-2.036-2.128-1.797-.488-9.007-.488-9.007-.488s-7.21 0-9.007.488c-.99.281-1.764 1.094-2.036 2.128-.475 1.806-.475 5.578-.475 5.578s0 3.771.475 5.578c.272 1.034 1.046 1.847 2.036 2.128 1.797.488 9.007.488 9.007.488s7.21 0 9.007-.488c.99-.281 1.764-1.094 2.036-2.128.475-1.806.475-5.578.475-5.578s0-3.771-.475-5.578zM9.545 15.568V8.163l6.364 3.702-6.364 3.703z"/></svg>
                                </a>
                            ` : ''}
                            ${tiktok ? `
                                <a href="${tiktok}" target="_blank" class="w-14 h-14 rounded-2xl bg-white/5 border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all shadow-lg">
                                    <svg class="w-6 h-6 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-2.54.03-5.08.04-7.62 0-3.37-.02-6.75-.02-10.12z"/></svg>
                                </a>
                            ` : ''}
                        </div>
                        
                        <div class="pt-8 flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
                            <a href="${ctaLink}" class="px-12 py-5 bg-white text-black font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-[#8b5cf6] hover:text-white transition-all shadow-xl text-center">
                                ${ctaText}
                            </a>
                            <button class="px-12 py-5 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-sm rounded-2xl hover:bg-white/10 transition-all text-center">
                                ${contactButtonText}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué son los Índices Sintéticos?', a: 'Son instrumentos financieros generados por algoritmos RNG que simulan movimientos de mercado con base en volatilidad y patrones técnicos reales. No dependen de activos externos ni noticias macroeconómicas.' },
        { q: '¿Están disponibles 24/7?', a: 'Sí. Los Índices Sintéticos de Bridge Markets operan los 365 días del año, sin cierres ni pausas de mercado.' },
        { q: '¿Cuántas familias existen?', a: 'Contamos con 4 familias: Fortune (Step by Step), Vortex (Volatility), BullX & BearX (Trending) y FomoX (Random Trend).' },
        { q: '¿Puedo usar robots o EAs?', a: 'Sí. Son ideales para trading algorítmico por su consistencia y reproducibilidad en backtesting.' },
        { q: '¿En qué plataforma se operan?', a: 'MetaTrader 5 (MT5). Disponible para escritorio, iOS y Android con el servidor BridgeMarkets-MT5.' },
        { q: '¿Qué diferencia hay entre BullX y BearX?', a: 'BullX tiene tendencia bajista con spikes alcistas. BearX tiene tendencia alcista con spikes bajistas.' },
        { q: '¿Qué índice es mejor para empezar?', a: 'Fortune o Vortex son ideales para traders que buscan estructura. FomoX y BullX/BearX son para traders con más experiencia.' },
        { q: '¿Los resultados son manipulables?', a: 'No. Cada movimiento es generado por un RNG auditado que garantiza imparcialidad y consistencia estadística.' }
    ];

    return `
    <section id="faq" class="py-32 px-8 bg-[#020205] border-t border-white/5 relative overflow-hidden">
        <!-- Deep Space Galaxy Animation -->
        <div class="absolute inset-0 z-0 pointer-events-none">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,#1a0b2e_0%,#020205_100%)]"></div>
            <div class="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-[#8b5cf6]/10 rounded-full blur-[120px] animate-pulse"></div>
            <div class="absolute bottom-[-10%] left-[-10%] w-[60%] h-[60%] bg-[#4c1d95]/10 rounded-full blur-[120px] animate-pulse" style="animation-delay: 3s;"></div>
            <div class="star-field"></div>
        </div>
        
        <div class="max-w-4xl mx-auto section-reveal relative z-10">
            <div class="text-center mb-20">
                <span class="inline-block px-5 py-2 bg-[#8b5cf6]/20 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-6 rounded-full border border-[#8b5cf6]/40">Soporte y Dudas</span>
                <h2 class="text-5xl md:text-7xl font-black font-headline text-white mb-6 uppercase tracking-tighter drop-shadow-2xl">Preguntas Frecuentes</h2>
            </div>
            
            <div class="space-y-6">
                ${faqs.map(f => `
                    <div class="relative group cursor-pointer">
                        <div class="relative glass-panel bg-[#0a0514] border border-white/10 group-hover:border-[#8b5cf6] transition-all p-8 md:p-12 rounded-[2.5rem] shadow-2xl overflow-hidden">
                            <!-- Inner Glow -->
                            <div class="absolute -right-20 -top-20 w-40 h-40 bg-[#8b5cf6]/5 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
                            
                            <div class="flex justify-between items-center text-left gap-8 relative z-10">
                                <span class="text-xl md:text-3xl font-black text-white tracking-tight leading-tight uppercase group-hover:text-[#c4b5fd] transition-colors">${f.q}</span>
                                <div class="w-14 h-14 rounded-full bg-[#8b5cf6] flex items-center justify-center text-white shadow-[0_0_20px_rgba(139,92,246,0.5)] group-hover:scale-110 transition-transform">
                                    <span class="material-symbols-outlined text-3xl font-bold">add</span>
                                </div>
                            </div>
                            <div class="mt-0 opacity-0 max-h-0 overflow-hidden group-hover:mt-10 group-hover:opacity-100 group-hover:max-h-96 transition-all duration-700 ease-in-out">
                                <div class="pt-10 border-t border-white/10">
                                    <p class="text-xl text-white leading-relaxed font-medium">${f.a}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <style>
            .star-field {
                position: absolute;
                inset: 0;
                background-image: 
                    radial-gradient(1px 1px at 20px 30px, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 50px 160px, #ddd, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 90px 40px, #fff, rgba(0,0,0,0)),
                    radial-gradient(1px 1px at 130px 80px, #fff, rgba(0,0,0,0)),
                    radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
                background-repeat: repeat;
                background-size: 200px 200px;
                opacity: 0.15;
                animation: starsMove 100s linear infinite;
            }
            @keyframes starsMove {
                from { background-position: 0 0; }
                to { background-position: 0 1000px; }
            }
        </style>
    </section>`;
}

export function renderSntCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaText = content.ctaText || "Abrir cuenta ahora";
    const ctaSecondary = content.ctaSecondary || "Ver gráficos en vivo";
    const ctaLink = brand.ctaLink || "#register";
    const secondaryLink = "https://charts.bridgemarkets.global";
    
    return `
    <section class="py-40 px-8 bg-[#020205] relative overflow-hidden">
        <!-- Deep Galaxy CTA Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute inset-0 bg-[radial-gradient(circle_at_bottom,#1a0b2e_0%,#020205_70%)]"></div>
            <div class="absolute bottom-[-20%] left-1/2 -translate-x-1/2 w-[120%] h-[120%] bg-[#8b5cf6]/5 rounded-full blur-[150px]"></div>
        </div>
        
        <div class="max-w-5xl mx-auto text-center relative z-10 section-reveal">
            <div class="mb-20 flex justify-center">
                <div class="relative">
                    <div class="absolute inset-0 bg-[#8b5cf6]/30 rounded-full blur-[100px] animate-pulse"></div>
                    <img src="/images/imagenes_nuevas/peones_rosa.png" alt="Peones" class="w-80 h-auto object-contain relative z-10 drop-shadow-[0_0_80px_rgba(139,92,246,0.4)] animate-[heroFloat_5s_ease-in-out_infinite]">
                </div>
            </div>
            
            <h2 class="text-5xl md:text-8xl font-black font-headline text-white mb-12 tracking-tighter uppercase leading-[0.85]">
                Explora. Aprende.<br>Opera. <span class="text-gradient-purple">Evoluciona.</span>
            </h2>
            
            <p class="text-xl md:text-2xl text-white/50 font-light mb-20 max-w-3xl mx-auto leading-relaxed">
                Sumérgete en el ecosistema de índices sintéticos de Bridge Markets y descubre un nuevo nivel de libertad y precisión operativa.
            </p>
            
            <div class="flex flex-col sm:flex-row gap-8 justify-center items-center">
                <a href="${ctaLink}" class="group relative px-16 py-8 bg-white text-black font-black uppercase tracking-widest text-lg rounded-2xl overflow-hidden transition-all hover:scale-105 shadow-[0_20px_50px_rgba(255,255,255,0.2)] w-full sm:w-auto">
                    <span class="relative z-10">${ctaText}</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-white via-[#8b5cf6]/30 to-white transform translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000"></div>
                </a>
                <a href="${secondaryLink}" target="_blank" class="px-16 py-8 bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-lg rounded-2xl hover:bg-white/10 transition-all w-full sm:w-auto">
                    ${ctaSecondary}
                </a>
            </div>
            <div class="mt-20 border-t border-white/5 pt-10">
                <p class="text-[10px] text-white/20 uppercase tracking-[0.2em] font-black">
                    ⚠️ Riesgo: La operativa en índices sintéticos conlleva un alto riesgo. Asegúrate de comprender la gestión de capital antes de operar con fondos reales.
                </p>
            </div>
        </div>
    </section>`;
}
