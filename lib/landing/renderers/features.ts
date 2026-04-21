import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderBentoGrid(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'bento_grid')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'feature_split')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'stats_row')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'risk_grid')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'leaderboard')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'trust_badges')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'multi_asset')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'workflow_steps')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'security_fees')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'cta_community')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'calculator')!.defaultContent, ...content };
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
    const c = { ...SECTION_CATALOG.find(s => s.id === 'synthetic_families')!.defaultContent, ...content };
    const families = (c.families || []).map((f: any, i: number) => `
        <div class="glass-panel p-10 asym-card border-white/5 hover:border-primary/40 transition-all group">
            <div class="w-16 h-16 asym-card-rev bg-primary/10 flex items-center justify-center text-primary mb-8 group-hover:bg-primary group-hover:text-white transition-colors font-bold text-xl">${i + 1}</div>
            <h3 class="text-2xl font-black font-headline text-white mb-4 tracking-tight uppercase">${f.name}</h3>
            <p class="text-white/40 leading-relaxed font-medium">${f.desc}</p>
        </div>
    `).join('\n');

    return `
    <section class="py-32 px-8 relative" style="background: transparent;">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="flex flex-col md:flex-row justify-between items-end mb-20 gap-8 border-b border-white/10 pb-12">
                <div class="max-w-2xl"><h2 class="text-5xl font-black font-headline text-white mb-6 uppercase tracking-tighter">${c.title}</h2>
                <p class="text-xl text-white/40 font-light leading-relaxed">${c.subtitle}</p></div>
                <div class="flex gap-4">
                    <span class="px-6 py-3 rounded-full bg-white/5 border border-white/10 text-accent text-[10px] font-black uppercase tracking-widest">24/7 Availability</span>
                </div>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">${families}</div>
        </div>
    </section>`;
}

export function renderChallengeMatrix(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'challenge_matrix')!.defaultContent, ...content };
    const plans = (c.plans || []).map((p: any) => `
        <div class="glass-panel p-8 asym-card border-white/5 hover:bg-white/10/[0.05] transition-all relative overflow-hidden group">
            <div class="relative z-10 text-center">
                <h3 class="text-sm font-black text-primary uppercase tracking-[0.4em] mb-6">${p.name}</h3>
                <div class="text-5xl font-black font-headline text-white mb-4 tracking-tighter">${p.cap}</div>
                <p class="text-xs text-white/30 uppercase tracking-[0.2em] font-bold mb-10">Starting Fee: ${p.fee}</p>
                <div class="space-y-4 pt-10 border-t border-white/10">
                    <div class="flex justify-between text-xs"><span class="text-white/40">Daily Drawdown</span><span class="text-white font-bold">${p.daily}</span></div>
                    <div class="flex justify-between text-xs"><span class="text-white/40">Total Profit Target</span><span class="text-white font-bold">${p.total}</span></div>
                    <div class="flex justify-between text-xs"><span class="text-white/40">Profit Share</span><span class="text-accent font-bold">80% / 20%</span></div>
                </div>
                <button class="w-full mt-12 py-5 bg-white/5 border border-white/10 rounded-2xl text-white font-bold hover:bg-primary hover:border-primary transition-all uppercase text-[10px] tracking-widest">Start Challenge</button>
            </div>
        </div>
    `).join('\n');

    return `
    <section class="py-32 px-8" style="background: transparent;">
        <div class="max-w-7xl mx-auto section-reveal text-center lg:text-left">
            <h2 class="text-5xl font-black font-headline text-white mb-20 uppercase tracking-tighter text-center">${c.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">${plans}</div>
            <p class="text-center mt-12 text-white/20 text-xs italic tracking-wide lowercase">*No evaluation time limits · Instant payout availability · Professional scaling up to $2M</p>
        </div>
    </section>`;
}

export function renderDualSteps(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'dual_steps')!.defaultContent, ...content };
    
    const renderTrack = (title: string, steps: string[], accent: boolean) => `
        <div class="glass-panel p-12 asym-card border-white/5 relative overflow-hidden ${accent ? 'bg-primary/5 border-primary/20' : ''}">
            <h3 class="text-3xl font-black font-headline text-white mb-12 uppercase tracking-tight">${title}</h3>
            <div class="space-y-10">
                ${steps.map((s, i) => `
                    <div class="flex gap-6 items-start group">
                        <div class="w-12 h-12 rounded-full ${accent ? 'bg-primary text-white' : 'bg-white/10 text-accent'} flex items-center justify-center font-black flex-shrink-0 group-hover:scale-110 transition-transform">${i + 1}</div>
                        <p class="text-lg text-white/60 font-medium leading-tight pt-2">${s}</p>
                    </div>
                `).join('')}
            </div>
            <div class="mt-12 pt-12 border-t border-white/10 flex items-center gap-4 text-xs font-black uppercase tracking-widest text-white/30">
                <span class="material-symbols-outlined text-sm">verified</span> Verified Infrastructure
            </div>
        </div>
    `;

    return `
    <section class="py-32 px-8" style="background: transparent;">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 section-reveal">
            ${renderTrack(c.titleMAM, c.stepsMAM, true)}
            ${renderTrack(c.titleCopy, c.stepsCopy, false)}
        </div>
    </section>`;
}

export function renderLeverageSpecs(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'leverage_specs')!.defaultContent, ...content };
    const specs = (c.specs || []).map((s: any) => `
        <div class="flex justify-between items-center py-6 border-b border-white/10 group">
            <span class="text-white/40 uppercase tracking-widest text-xs font-black group-hover:text-white transition-colors">${s.label}</span>
            <span class="text-2xl font-black font-headline text-white">${s.value}</span>
        </div>
    `).join('\n');

    return `
    <section class="py-32 px-8" style="background: transparent;">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl font-black font-headline text-white mb-16 uppercase tracking-tighter text-center">${c.title}</h2>
            <div class="glass-panel p-12 asym-card border-white/5 bg-white/[0.02]">
                <div class="space-y-4">${specs}</div>
            </div>
            <p class="text-center mt-12 text-white/30 text-[10px] uppercase font-bold tracking-widest">Sin evaluaciones · Sin esperas · Capitalización inmediata</p>
        </div>
    </section>`;
}

export function renderUniverseLogic(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'universe_logic')!.defaultContent, ...content };
    const steps = (c.steps || []).map((s: any, i: number) => `
        <div class="relative group">
            <div class="glass-panel p-10 asym-card border-white/10 group-hover:border-primary/50 transition-all text-center">
                <div class="w-16 h-16 asym-card-rev bg-primary/10 flex items-center justify-center text-primary mx-auto mb-8 font-black text-2xl group-hover:bg-primary group-hover:text-white transition-all">${s.name.charAt(0)}</div>
                <h4 class="text-xl font-black text-white mb-4 uppercase tracking-[0.2em]">${s.name}</h4>
                <p class="text-white/40 text-sm leading-relaxed">${s.desc}</p>
            </div>
            ${i < 2 ? `<div class="hidden lg:block absolute top-1/2 -right-6 translate-x-1/2 -translate-y-1/2 z-20"><span class="material-symbols-outlined text-primary text-4xl animate-pulse">arrow_forward_ios</span></div>` : ''}
        </div>
    `).join('\n');

    return `
    <section class="py-32 px-8" style="background: transparent;">
        <div class="max-w-7xl mx-auto section-reveal">
            <h2 class="text-5xl font-black font-headline text-white mb-20 uppercase tracking-tighter text-center">${c.title}</h2>
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-12 relative">${steps}</div>
        </div>
    </section>`;
}

export function renderSntHero(content: Record<string, any>, brand: BrandConfig): string {
    const ibName = content.ibName || brand.communityName || brand.fullName;
    const ibPhrase = content.ibPhrase || brand.heroPhrase || "";
    const ctaText = content.ctaText || "Abrir mi cuenta";
    const ctaLink = brand.ctaLink || "#register";
    
    return `
    <section class="relative min-h-[90vh] flex items-center pt-24 pb-20 px-8 bg-[#0a0a0a] overflow-hidden border-b border-white/5">
        <div class="absolute inset-0 z-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
        <div class="absolute right-0 top-0 w-1/3 h-full bg-gradient-to-l from-[#1f1635] to-transparent opacity-30"></div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="section-reveal">
                <div class="flex items-center gap-5 mb-10">
                    <img src="https://bridgemarkets.global/wp-content/uploads/2023/06/Logo-Bridge-Markets-Horizontal-Blanco.png" alt="Bridge Markets" class="h-6 opacity-90">
                    <div class="h-5 w-[1px] bg-white/20"></div>
                    <span class="text-[10px] font-bold uppercase tracking-[0.3em] text-white/50">Por ${ibName}</span>
                </div>

                <h1 class="text-5xl md:text-7xl lg:text-[5rem] font-black font-headline leading-tight mb-8 tracking-tighter text-white uppercase">
                    Opera en un <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a78bfa]">nuevo Universo</span><br>de Oportunidades.
                </h1>
                
                <p class="text-lg md:text-xl text-white/60 leading-relaxed max-w-xl mb-6 font-light">
                    Bienvenido a los Índices Sintéticos de Bridge Markets, mercados virtuales 24/7 con comportamientos realistas.
                </p>
                ${ibPhrase ? `<p class="text-sm text-white/40 italic border-l border-white/20 pl-4 mb-12 max-w-lg">${ibPhrase}</p>` : '<div class="mb-12"></div>'}

                <div class="flex flex-col sm:flex-row gap-4 mb-12">
                    <a href="${ctaLink}" class="px-10 py-5 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#a78bfa] hover:text-white transition-colors flex items-center justify-center gap-3 w-fit">
                        ${ctaText}
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
    </section>`;
}

export function renderSntAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
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
    </section>`;
}

export function renderSntAdvantages(content: Record<string, any>, brand: BrandConfig): string {
    const advantages = [
        { icon: 'all_inclusive', title: 'Disponibles 24/7', desc: 'Opera sin interrupciones, los 365 días del año. Los índices sintéticos no cierran, no duermen y no se detienen.' },
        { icon: 'policy', title: 'Transparencia total', desc: 'Cada movimiento es generado por un sistema aleatorio auditado, garantizando imparcialidad y consistencia estadística.' },
        { icon: 'tune', title: 'Volatilidad controlada', desc: 'Cada familia tiene niveles definidos de volatilidad para que elijas el perfil que más se adapte a tu estrategia.' },
        { icon: 'block', title: 'Sin influencia de noticias', desc: 'Olvídate de los eventos macroeconómicos. Aquí las condiciones son puramente técnicas.' },
        { icon: 'memory', title: 'Ideal para trading algorítmico', desc: 'Diseñados para bots, estrategias cuantitativas y pruebas de backtesting en entornos consistentes.' },
        { icon: 'query_stats', title: 'Riesgo medible y oportunidades constantes', desc: 'Gracias a la naturaleza matemática de sus series, puedes diseñar sistemas más predecibles y controlar mejor la gestión del riesgo.' },
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0a0a] relative border-b border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-20 section-reveal">
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">El Diferencial</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white tracking-tighter uppercase">¿Por qué operar<br>Índices Sintéticos?</h2>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 section-reveal" style="animation-delay: 0.2s;">
                ${advantages.map((adv, i) => `
                    <div class="p-8 bg-[#050505] border border-white/5 hover:border-[#a78bfa]/40 transition-all group">
                        <div class="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mb-6 group-hover:bg-[#a78bfa] transition-colors">
                            <span class="material-symbols-outlined text-[#a78bfa] group-hover:text-white">${adv.icon}</span>
                        </div>
                        <h3 class="text-lg font-black text-white mb-3 uppercase tracking-wide">${adv.title}</h3>
                        <p class="text-sm text-white/50 font-light leading-relaxed">${adv.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { id: 'fortune', name: 'Fortune (Jump)', desc: 'Saltar a nuevas oportunidades. Gaps explosivos cada hora.', icon: 'rocket_launch', color: 'from-amber-400 to-orange-600' },
        { id: 'vortex', name: 'Vortex (Crash/Boom)', desc: 'Captura impulsos agresivos. Rupturas repentinas en tendencias.', icon: 'bolt', color: 'from-red-400 to-rose-600' },
        { id: 'bullx', name: 'BullX/BearX (Step)', desc: 'Movimientos escalonados. Tendencias consistentes y marcadas.', icon: 'trending_up', color: 'from-emerald-400 to-teal-600' },
        { id: 'fomox', name: 'FomoX (VIX)', desc: 'La verdadera prueba de fuego. Oscilaciones de alta velocidad.', icon: 'speed', color: 'from-[#a78bfa] to-[#865BFF]' }
    ];

    return `
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
                ${families.map(fam => `
                    <div class="p-8 bg-[#050505] border border-white/5 hover:border-white/20 transition-all group flex items-start gap-6 relative overflow-hidden">
                        <div class="absolute -right-4 -bottom-4 opacity-5 text-white text-8xl material-symbols-outlined transform group-hover:scale-110 transition-transform">${fam.icon}</div>
                        <div class="w-16 h-16 rounded-xl bg-gradient-to-br ${fam.color} flex items-center justify-center shrink-0 shadow-lg relative z-10">
                            <span class="material-symbols-outlined text-white text-3xl">${fam.icon}</span>
                        </div>
                        <div class="relative z-10">
                            <h3 class="text-xl font-black text-white mb-2 uppercase tracking-wide">${fam.name}</h3>
                            <p class="text-white/50 font-light leading-relaxed text-sm">${fam.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { num: '01', title: 'Registro y Verificación', desc: 'Abre tu cuenta y completa la verificación KYC en la zona segura de clientes.' },
        { num: '02', title: 'Fondos a tu Wallet', desc: 'Realiza tu depósito utilizando criptomonedas, tarjetas u otros métodos locales.' },
        { num: '03', title: 'Apertura de Cuenta MT5', desc: 'Desde el portal de cliente, crea tu cuenta comercial específica para Índices Sintéticos.' },
        { num: '04', title: 'Transferencia Interna', desc: 'Mueve fondos desde tu wallet principal hacia tu nueva cuenta comercial de MT5.' },
        { num: '05', title: 'Conexión y Trading', desc: 'Descarga MT5, inicia sesión con tus credenciales y comienza a operar las 24 horas.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#050505] relative border-b border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">El Proceso</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white tracking-tighter uppercase">5 Pasos para Operar</h2>
            </div>
            
            <div class="relative section-reveal" style="animation-delay: 0.2s;">
                <div class="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block"></div>
                <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
                    ${steps.map((step, i) => `
                        <div class="relative group">
                            <div class="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0 group-hover:bg-[#a78bfa] transition-colors">
                                <span class="text-xl font-black text-white group-hover:text-black">${step.num}</span>
                            </div>
                            <div class="text-center md:text-left">
                                <h3 class="text-lg font-black text-white mb-3 uppercase tracking-wide">${step.title}</h3>
                                <p class="text-sm text-white/50 font-light leading-relaxed">${step.desc}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#0a0a0a] relative overflow-hidden border-b border-white/5">
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center section-reveal">
            <div>
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">Datos Técnicos</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-8 tracking-tighter uppercase">Especificaciones del Producto</h2>
                
                <div class="space-y-4">
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Plataforma</span>
                        <span class="text-white font-bold tracking-widest text-right">MetaTrader 5 (MT5)</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Ejecución</span>
                        <span class="text-white font-bold tracking-widest text-right">Market Execution</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Spreads</span>
                        <span class="text-[#a78bfa] font-bold tracking-widest text-right">[Dato de BM]</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Lotaje Mín/Máx</span>
                        <span class="text-[#a78bfa] font-bold tracking-widest text-right">[Dato de BM]</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Margin Call / Stop Out</span>
                        <span class="text-[#a78bfa] font-bold tracking-widest text-right">[Dato de BM]</span>
                    </div>
                </div>
            </div>
            
            <div class="relative flex justify-center">
                <div class="absolute inset-0 bg-[#a78bfa]/5 rounded-full blur-[100px]"></div>
                <img src="/images/imagenes nuevas/reloj rosa.png" alt="Reloj 24/7" class="w-full max-w-sm h-auto object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-[float_6s_ease-in-out_infinite]" style="animation: float 6s ease-in-out infinite; transform: translateY(0px);">
            </div>
        </div>
    </section>`;
}

export function renderSntPlatforms(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { icon: 'person_add', text: 'Crea tu cuenta en el portal de Bridge Markets' },
        { icon: 'policy', text: 'Completa tu proceso KYC (verificación de identidad)' },
        { icon: 'account_balance_wallet', text: 'Deposita fondos en tu cuenta de trading' },
        { icon: 'download', text: 'Descarga MetaTrader 5 (MT5) en escritorio, iOS o Android' },
        { icon: 'login', text: 'Conéctate al servidor BridgeMarkets-MT5' },
        { icon: 'rocket_launch', text: 'Elige tu familia favorita y empieza a operar 24/7' }
    ];

    return `
    <section class="py-32 px-8 bg-[#05010f] border-t border-white/5 relative overflow-hidden">
        <div class="max-w-7xl mx-auto flex flex-col lg:flex-row gap-20 items-center section-reveal relative z-10">
            <div class="lg:w-1/2">
                <h2 class="text-4xl md:text-5xl lg:text-7xl font-black font-headline text-white mb-6 uppercase tracking-tighter">Empieza en <span class="text-[#865BFF]">5 Minutos</span></h2>
                <p class="text-lg text-white/40 mb-12 font-medium">Barrer la barrera de entrada es nuestro compromiso. Infraestructura de grado mercantil lista a un clic.</p>
                
                <div class="space-y-6">
                    ${steps.map((s, i) => `
                        <div class="flex items-center gap-6 group p-4 border border-transparent hover:border-white/5 bg-transparent hover:bg-white/5 rounded-2xl transition-all">
                            <div class="w-14 h-14 rounded-[1rem] bg-[#0a0515] border border-white/10 flex items-center justify-center text-[#865BFF] font-black text-lg group-hover:bg-[#865BFF] group-hover:text-white transition-all shadow-xl">${i + 1}</div>
                            <div class="flex items-center gap-4">
                                <span class="material-symbols-outlined text-white/10 group-hover:text-[#865BFF]/50 text-2xl transition-colors">${s.icon}</span>
                                <p class="text-white/80 font-bold tracking-tight uppercase text-xs md:text-sm group-hover:text-white transition-colors">${s.text}</p>
                            </div>
                        </div>
                    `).join('')}
                </div>
            </div>
            
            <div class="lg:w-1/2 w-full relative">
                <div class="glass-panel p-12 lg:p-20 asym-card border border-[#865BFF]/30 bg-gradient-to-br from-[#865BFF]/10 to-transparent relative z-10 text-center shadow-[0_0_100px_rgba(134,91,255,0.15)] backdrop-blur-2xl">
                    <div class="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/40 to-transparent"></div>
                    <span class="material-symbols-outlined text-[120px] text-[#865BFF] mb-10 drop-shadow-[0_0_30px_rgba(134,91,255,0.5)]">devices</span>
                    <h3 class="text-4xl font-black text-white mb-6 uppercase tracking-tighter">MetaTrader 5</h3>
                    <p class="text-white/50 text-sm mb-12 font-medium leading-relaxed">Considerada la plataforma más robusta y veloz para el trading algorítmico e institucional. Tus índices corren aquí.</p>
                    <div class="flex flex-wrap justify-center gap-4">
                        <span class="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white/10 hover:text-black transition-colors cursor-pointer shadow-lg">Windows / Mac</span>
                        <span class="px-8 py-4 rounded-full bg-[#0a0515] border border-white/5 text-white/50 text-[10px] font-black uppercase tracking-widest">Mobile Apps</span>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntCommunity(content: Record<string, any>, brand: BrandConfig): string {
    const communityName = content.communityName || brand.communityName || brand.fullName;
    const message = content.welcomeMessage || brand.heroPhrase || "Únete a nuestra comunidad exclusiva y opera con el respaldo de expertos en el mercado de sintéticos.";
    const telegram = content.telegramLink || brand.telegram || "#";
    const whatsapp = content.whatsappNumber || brand.whatsapp || "#";
    const instagram = content.instagramUrl || brand.instagram || "#";

    return `
    <section class="py-32 px-8 bg-[#0a0515] relative section-reveal overflow-hidden">
        <div class="max-w-5xl mx-auto glass-panel p-12 md:p-24 asym-card border border-white/10 bg-[#05010f]/80 relative overflow-hidden group hover:border-[#865BFF]/30 transition-colors shadow-2xl backdrop-blur-3xl">
            <div class="absolute top-0 right-0 w-96 h-96 bg-[#865BFF]/10 rounded-full blur-[100px] -mr-40 -mt-40 pointer-events-none"></div>
            <div class="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-[100px] -ml-40 -mb-40 pointer-events-none"></div>
            
            <div class="text-center relative z-10">
                <div class="w-32 h-32 bg-[#05010f] rounded-full mx-auto mb-12 border-2 border-white/10 flex items-center justify-center text-5xl text-white font-black overflow-hidden group-hover:border-[#865BFF] transition-colors relative shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                    <div class="absolute inset-0 bg-[#865BFF]/10 animate-pulse"></div>
                    <div class="relative z-10 w-full h-full flex items-center justify-center text-white/90">
                        ${brand.logoUrl ? `<img src="${brand.logoUrl}" alt="IB Logo" class="w-full h-full object-cover">` : communityName.charAt(0)}
                    </div>
                </div>
                
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-6 uppercase tracking-tighter">
                    Comunidad <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-[#865BFF]">${communityName}</span>
                </h2>
                
                <p class="text-lg md:text-xl text-white/50 leading-relaxed max-w-2xl mx-auto mb-16 font-medium italic">"${message}"</p>
                
                <div class="flex flex-wrap justify-center gap-6">
                    ${telegram && telegram !== '#' ? `<a href="${telegram}" target="_blank" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-[#229ED9] hover:border-[#229ED9] transition-all shadow-lg text-sm uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[#229ED9]"></span>Telegram</a>` : ''}
                    ${whatsapp && whatsapp !== '#' ? `<a href="${whatsapp.includes('http') ? whatsapp : `https://wa.me/${whatsapp.replace(/\D/g,'')}`}" target="_blank" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-[#25D366] hover:border-[#25D366] transition-all shadow-lg text-sm uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[#25D366]"></span>WhatsApp</a>` : ''}
                    ${instagram && instagram !== '#' ? `<a href="${instagram.includes('http') ? instagram : `https://instagram.com/${instagram.replace('@','')}`}" target="_blank" class="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl flex items-center gap-3 hover:-translate-y-1 hover:bg-gradient-to-tr hover:from-[#f9ce34] hover:to-[#ee2a7b] transition-all shadow-lg text-sm uppercase tracking-widest"><span class="w-2 h-2 rounded-full bg-[#ee2a7b]"></span>Instagram</a>` : ''}
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntFAQ(content: Record<string, any>, brand: BrandConfig): string {
    const faqs = [
        { q: '¿Qué son los índices sintéticos?', a: 'Son instrumentos generados por algoritmos RNG que simulan movimientos de mercado. No dependen de activos físicos ni de noticias externas.' },
        { q: '¿Están disponibles 24/7?', a: 'Sí. Los índices sintéticos de Bridge Markets operan los 365 días del año, sin cierres ni pausas de mercado.' },
        { q: '¿Cuántas familias hay?', a: '4 familias: Fortune (step-by-step), Vortex (volatilidad constante), BullX/BearX (trending con spikes) y FomoX (tendencia aleatoria).' },
        { q: '¿Puedo usar robots o EAs?', a: 'Sí. Los índices sintéticos son ideales para trading algorítmico por su consistencia y reproducibilidad en backtesting.' },
        { q: '¿En qué plataforma se operan?', a: 'MetaTrader 5 (MT5). Disponible para escritorio (Windows), iOS y Android con servidor BridgeMarkets-MT5.' },
        { q: '¿Qué diferencia hay entre BullX y BearX?', a: 'BullX tiene tendencia bajista con spikes alcistas. BearX tiene tendencia alcista con spikes bajistas.' },
        { q: '¿Qué índice es mejor para empezar?', a: 'Fortune o Vortex son ideales para traders que buscan estructura y predecibilidad. FomoX y BullX/BearX son para traders con más experiencia.' },
        { q: '¿Los resultados son manipulables?', a: 'No. Cada movimiento es generado por un RNG auditado que garantiza imparcialidad y consistencia estadística.' }
    ];

    return `
    <section class="py-32 px-8 bg-[#05010f] border-t border-white/5">
        <div class="max-w-4xl mx-auto section-reveal">
            <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-20 text-center uppercase tracking-tighter">Preguntas Frecuentes</h2>
            
            <div class="space-y-4">
                ${faqs.map(f => `
                    <div class="glass-panel asym-card bg-[#0a0515]/60 border border-white/5 hover:border-[#865BFF]/40 hover:bg-white/5 transition-all p-8 md:px-10 cursor-pointer group">
                        <div class="flex justify-between items-center text-left">
                            <span class="text-sm md:text-base font-black text-white uppercase tracking-widest group-hover:text-[#865BFF] transition-colors pr-8 leading-relaxed">${f.q}</span>
                            <span class="material-symbols-outlined text-[#865BFF] group-hover:rotate-180 transition-transform">add</span>
                        </div>
                        <div class="mt-0 pt-0 opacity-0 max-h-0 overflow-hidden group-hover:mt-6 group-hover:pt-6 group-hover:opacity-100 group-hover:max-h-96 border-t border-white/0 group-hover:border-white/10 transition-all duration-500 ease-in-out">
                            <p class="text-sm text-white/50 leading-relaxed font-medium">${f.a}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntCTA(content: Record<string, any>, brand: BrandConfig): string {
    const ctaText = content.ctaText || "Comenzar a operar ahora";
    const ctaLink = brand.ctaLink || "#register";
    
    return `
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
            <a href="${ctaLink}" class="inline-flex px-12 py-6 bg-white text-black font-bold uppercase tracking-widest text-sm hover:bg-[#a78bfa] hover:text-white transition-all items-center justify-center gap-4 hover:scale-105 shadow-2xl">
                ${ctaText}
                <span class="material-symbols-outlined text-xl">login</span>
            </a>
            <p class="mt-8 text-white/30 text-xs font-light uppercase tracking-widest">Abre tu cuenta en minutos y domina el juego.</p>
        </div>
    </section>`;
}
