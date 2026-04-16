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
    <section class="py-24 px-8 overflow-hidden relative" style="background: #080411;">
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
    <section class="py-24 px-8 relative" style="background: #080411;">
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
    <section class="py-24 px-8" style="background: #080411;">
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
    <section class="py-24 px-8" style="background: #080411;">
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
    <section class="py-24 px-8" style="background: #080411;">
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
    <section class="py-32 px-8 relative" style="background: #080411;">
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
        <div class="glass-panel p-8 asym-card border-white/5 hover:bg-white/[0.05] transition-all relative overflow-hidden group">
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
    <section class="py-32 px-8" style="background: radial-gradient(circle at bottom right, #1a0b3a 0%, #080411 70%);">
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
    <section class="py-32 px-8" style="background: #080411;">
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
    <section class="py-32 px-8" style="background: #080411;">
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
    <section class="py-32 px-8" style="background: radial-gradient(circle at top right, #2a1b4d 0%, #080411 70%);">
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
    <section class="relative min-h-[95vh] flex items-center pt-20 pb-32 px-8 overflow-hidden bg-[#05010f]">
        <!-- Ultra-Premium Dark Background -->
        <div class="absolute inset-0 z-0">
            <div class="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_0%,rgba(134,91,255,0.15),transparent_70%)]"></div>
            <div class="absolute top-[10%] right-[5%] w-[600px] h-[600px] bg-[#865BFF]/20 rounded-full blur-[150px] animate-pulse"></div>
            <div class="absolute bottom-[0%] left-[0%] w-[400px] h-[400px] bg-blue-500/10 rounded-full blur-[120px]"></div>
        </div>

        <div class="max-w-7xl mx-auto w-full relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div class="section-reveal">
                <div class="flex items-center gap-5 mb-10 p-2 bg-white/5 border border-white/10 rounded-full w-fit pr-6 backdrop-blur-md">
                    <img src="https://bridgemarkets.global/wp-content/uploads/2023/06/Logo-Bridge-Markets-Horizontal-Blanco.png" alt="Bridge Markets" class="h-5 md:h-6 ml-4 opacity-90 drop-shadow-[0_0_8px_rgba(255,255,255,0.3)]">
                    <div class="h-4 w-[1px] bg-white/30"></div>
                    <span class="text-[9px] md:text-[10px] font-black uppercase tracking-[0.3em] text-[#865BFF]">Por ${ibName}</span>
                </div>

                <h1 class="text-5xl md:text-7xl lg:text-[5.5rem] font-black font-headline leading-[0.95] mb-8 tracking-tighter text-white">
                    Opera en un <br><span class="text-transparent bg-clip-text bg-gradient-to-r from-white via-[#865BFF] to-blue-400">nuevo Universo</span><br>de Oportunidades.
                </h1>
                
                <p class="text-lg md:text-xl text-white/50 leading-relaxed max-w-xl mb-6 font-medium">
                    Bienvenido a los Índices Sintéticos de Bridge Markets, mercados virtuales 24/7 con comportamientos realistas.
                </p>
                ${ibPhrase ? `<p class="text-md text-white/70 italic border-l-2 border-[#865BFF] pl-4 mb-12 max-w-lg">${ibPhrase}</p>` : '<div class="mb-12"></div>'}

                <div class="flex flex-col sm:flex-row gap-6 mb-12">
                    <a href="${ctaLink}" class="group relative px-10 py-5 bg-[#865BFF] text-white font-black rounded-2xl overflow-hidden transition-all shadow-[0_0_40px_rgba(134,91,255,0.4)] hover:shadow-[0_0_60px_rgba(134,91,255,0.6)] hover:scale-105 text-center flex items-center justify-center gap-3">
                        <span class="relative z-10 uppercase tracking-widest text-sm lg:text-base">${ctaText}</span>
                        <span class="material-symbols-outlined relative z-10 group-hover:translate-x-1 transition-transform">arrow_forward</span>
                        <div class="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300"></div>
                    </a>
                </div>

                <div class="flex items-center gap-8 py-6 border-t border-white/5">
                    <div class="flex flex-col">
                        <p class="text-[11px] font-black text-[#865BFF] uppercase tracking-widest mb-1">Sin noticias, sin pausas, sin límites.</p>
                        <p class="text-[10px] font-bold text-white/40 uppercase tracking-widest">Solo pura acción de mercado, siempre disponible.</p>
                    </div>
                </div>
            </div>

            <div class="relative section-reveal lg:block hidden" style="animation-delay: 0.2s;">
                <div class="relative w-full aspect-square max-w-lg mx-auto">
                    <div class="absolute inset-0 bg-gradient-to-br from-[#865BFF]/30 to-blue-500/10 rounded-full blur-[80px] opacity-70 animate-pulse"></div>
                    <div class="relative z-10 w-full h-full p-1 rounded-full bg-gradient-to-br from-white/10 to-white/0 overflow-hidden shadow-2xl backdrop-blur-sm border border-white/10">
                        <div class="w-full h-full rounded-full bg-[#05010f]/80 flex items-center justify-center relative overflow-hidden">
                            <div class="w-3/4 h-3/4 rounded-full border border-[#865BFF]/30 border-dashed animate-[spin_60s_linear_infinite]"></div>
                            <div class="absolute w-1/2 h-1/2 rounded-full border border-blue-400/20 border-dotted animate-[spin_40s_linear_infinite_reverse]"></div>
                            <span class="material-symbols-outlined absolute text-[120px] text-white/20 filter drop-shadow-[0_0_30px_rgba(134,91,255,0.8)]">change_history</span>
                        </div>
                    </div>
                    
                    <div class="absolute bottom-10 -left-10 glass-panel p-4 bg-black/80 rounded-2xl border border-white/10 backdrop-blur-xl animate-bounce">
                        <div class="flex items-center gap-3">
                            <div class="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981] animate-ping"></div>
                            <div>
                                <p class="text-[9px] font-black uppercase text-white/50 tracking-widest">RNG Engine</p>
                                <p class="text-xs font-bold text-white">En Línea</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>`;
}

export function renderSntAbout(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#0a0515] relative overflow-hidden">
        <div class="absolute top-0 right-0 w-1/2 h-full bg-[radial-gradient(ellipse_at_top_right,rgba(134,91,255,0.05),transparent_50%)]"></div>
        <div class="max-w-4xl mx-auto relative z-10 section-reveal text-center">
            <span class="inline-block px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white text-[10px] font-black uppercase tracking-[0.4em] mb-10 shadow-lg">Concepto Core</span>
            <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-12 tracking-tighter uppercase">¿Qué son los Índices Sintéticos?</h2>
            
            <div class="glass-panel p-10 md:p-14 asym-card border border-white/5 bg-gradient-to-b from-white/5 to-transparent relative group">
                <div class="absolute -top-6 -left-6 text-[#865BFF]/20 text-9xl font-serif">"</div>
                <p class="relative text-lg md:text-xl text-white/60 leading-relaxed font-medium z-10 text-left">
                    Los Índices Sintéticos de Bridge Markets son instrumentos financieros creados a partir de algoritmos de generación aleatoria controlada (RNG – Random Number Generator) que simulan los movimientos del mercado con base en volatilidad, tendencias y patrones de comportamiento real. Estos índices no dependen de activos físicos (como acciones o divisas) ni de noticias externas. En cambio, reproducen las condiciones dinámicas de los mercados financieros reales: subidas, caídas, impulsos, consolidaciones y rupturas. Gracias a esto, puedes operar bajo reglas claras y constantes, con condiciones estables, accesibles 24/7 y sin la incertidumbre que provocan los eventos globales.
                </p>
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
        { icon: 'query_stats', title: 'Riesgo medible y oportunidades', desc: 'Gracias a su naturaleza matemática, puedes diseñar sistemas más predecibles y controlar tu gestión de riesgo.' },
    ];

    return `
    <section class="py-32 px-8 bg-[#05010f] relative border-t border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-6 uppercase tracking-tighter">Ventajas de <span class="text-[#865BFF]">Operar Sintéticos</span></h2>
                <div class="h-1 w-20 bg-[#865BFF] mx-auto rounded-full"></div>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                ${advantages.map((adv, i) => `
                    <div class="glass-panel p-10 rounded-2xl border border-white/5 bg-[#0a0515]/80 group hover:bg-white/5 transition-all duration-500 section-reveal relative overflow-hidden" style="animation-delay: ${i * 0.1}s">
                        <div class="absolute top-0 right-0 w-32 h-32 bg-[#865BFF]/5 rounded-full blur-2xl group-hover:bg-[#865BFF]/20 transition-colors"></div>
                        <div class="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white mb-8 group-hover:rotate-12 transition-transform shadow-lg relative z-10">
                            <span class="material-symbols-outlined text-3xl font-light">${adv.icon}</span>
                        </div>
                        <h3 class="text-xl font-black text-white mb-4 uppercase tracking-widest relative z-10">${adv.title}</h3>
                        <p class="text-sm text-white/40 leading-relaxed font-medium relative z-10">${adv.desc}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntFamilies(content: Record<string, any>, brand: BrandConfig): string {
    const families = [
        { 
            name: 'FORTUNE', tagline: 'El ritmo constante del mercado en movimiento.',
            desc: 'Los índices Fortune y FortuneX simulan movimientos de precio en "pasos" controlados dentro del gráfico.',
            sub: 'Fortune 100, 250, 500, 1000 — FortuneX 200, 300, 500',
            features: ['Movimiento escalonado (step-by-step)', 'Comportamiento ordenado y rangos claros', 'Versiones X con multiplicador de pasos']
        },
        { 
            name: 'VORTEX', tagline: 'Donde la Intensidad del mercado cobra vida.',
            desc: 'Los índices Vortex ofrecen escenarios de volatilidad constante, ideales para medir tu capacidad de reacción y control.',
            sub: 'Vortex 20, 40, 60, 80, 100',
            features: ['Volatilidad estable y predecible', 'Sin interrupciones ni influencias externas', 'Oscilaciones proporcionales realistas']
        },
        { 
            name: 'BULLX & BEARX', tagline: 'Los motores del impulso y la caída.',
            desc: 'La familia Trending simula entornos donde predominan las direcciones fuertes con movimientos explosivos periódicos.',
            sub: 'BullX 400, 777, 900, 1000 — BearX 400, 777, 900, 1000',
            features: ['Direccionalidad clara (Spikes)', 'Eventos extremos programados', 'Momentum, rompimiento o reversión']
        },
        { 
            name: 'FOMOX', tagline: 'Donde la tendencia aparece sin aviso...',
            desc: 'Los índices FomoX representan escenarios de tendencia aleatoria y espontánea; imitan los momentos de hype o euforia.',
            sub: 'FomoX 111, 333, 888, 999',
            features: ['Direccionalidad impredecible', 'Aceleración espontánea de corto plazo', 'Para amantes del Breakout y Reversals']
        }
    ];

    return `
    <section class="py-32 px-8 bg-[#0a0515] relative">
        <div class="max-w-7xl mx-auto section-reveal">
            <div class="text-center mb-24">
                <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-6 uppercase tracking-tighter">Nuestras 4 <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-[#865BFF]">Familias</span></h2>
                <p class="text-lg md:text-xl text-white/50 max-w-3xl mx-auto font-medium">Bridge Markets agrupa sus índices en cuatro familias principales, cada una con un comportamiento característico y un propósito de trading distinto.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-24">
                ${families.map((f, i) => `
                    <div class="glass-panel p-10 rounded-[2rem] border border-white/10 bg-[#05010f]/60 hover:border-[#865BFF]/50 transition-all group overflow-hidden relative">
                        <div class="absolute top-0 right-0 px-6 py-2 bg-white/5 rounded-bl-3xl border-b border-l border-white/5 text-[10px] font-black text-white/30 uppercase tracking-[0.3em]">0${i+1}</div>
                        
                        <h3 class="text-3xl font-black text-white mb-2 uppercase tracking-tighter group-hover:text-[#865BFF] transition-colors">${f.name}</h3>
                        <p class="text-[11px] font-black text-[#865BFF] uppercase tracking-widest mb-6">${f.tagline}</p>
                        <p class="text-white/60 text-sm leading-relaxed font-medium mb-8 pr-12">${f.desc}</p>
                        
                        <div class="p-6 bg-white/5 border border-white/5 rounded-2xl mb-8">
                            <p class="text-[9px] font-black text-white/30 uppercase tracking-widest mb-2">Subfamilias Disponibles</p>
                            <p class="text-sm font-bold text-white">${f.sub}</p>
                        </div>

                        <ul class="space-y-4">
                            ${f.features.map(feat => `
                                <li class="flex items-start gap-4">
                                    <span class="material-symbols-outlined text-[#865BFF] text-base">check_circle</span>
                                    <span class="text-xs font-bold text-white/70 tracking-wide">${feat}</span>
                                </li>
                            `).join('')}
                        </ul>
                    </div>
                `).join('')}
            </div>

            <!-- Comparativa Visual -->
            <div class="glass-panel p-0 rounded-[2rem] border border-white/10 overflow-hidden relative shadow-[0_30px_60px_-15px_rgba(0,0,0,0.8)]">
                <div class="bg-[#05010f] p-8 text-center border-b border-white/10">
                    <h3 class="text-2xl font-black text-white uppercase tracking-widest">Resumen de Comportamientos</h3>
                </div>
                <div class="overflow-x-auto bg-[#0a0515]/90">
                    <table class="w-full text-left min-w-[700px]">
                        <thead>
                            <tr class="bg-white/5">
                                <th class="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#865BFF]">Familia</th>
                                <th class="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#865BFF]">Subfamilias</th>
                                <th class="py-6 px-8 text-[10px] font-black uppercase tracking-[0.2em] text-[#865BFF]">Comportamiento Principal</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5">
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="py-8 px-8 font-black text-white uppercase tracking-widest text-sm">FORTUNE</td>
                                <td class="py-8 px-8 text-white/60 text-xs font-bold leading-relaxed">Fortune 100/250/500/1000<br>FortuneX 200/300/500</td>
                                <td class="py-8 px-8 text-white/60 text-sm font-medium">Movimiento escalonado (step-by-step). Rangos y rupturas claras.</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="py-8 px-8 font-black text-white uppercase tracking-widest text-sm">VORTEX</td>
                                <td class="py-8 px-8 text-white/60 text-xs font-bold leading-relaxed">Vortex 20 / 40 / 60 / 80 / 100</td>
                                <td class="py-8 px-8 text-white/60 text-sm font-medium">Volatilidad constante y predecible. A mayor número, mayor amplitud.</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="py-8 px-8 font-black text-white uppercase tracking-widest text-sm text-nowrap">BULLX & BEARX</td>
                                <td class="py-8 px-8 text-white/60 text-xs font-bold leading-relaxed">BullX 400/777/900/1000<br>BearX 400/777/900/1000</td>
                                <td class="py-8 px-8 text-white/60 text-sm font-medium">Tendencias con spikes direccionales. Momentum e impulso.</td>
                            </tr>
                            <tr class="hover:bg-white/5 transition-colors">
                                <td class="py-8 px-8 font-black text-white uppercase tracking-widest text-sm">FOMOX</td>
                                <td class="py-8 px-8 text-white/60 text-xs font-bold leading-relaxed">FomoX 111 / 333 / 888 / 999</td>
                                <td class="py-8 px-8 text-white/60 text-sm font-medium">Tendencia aleatoria y espontánea. Ideal para breakout y reversals.</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            
            <p class="text-center mt-8 text-[10px] font-bold text-white/20 uppercase tracking-widest">*Consulta el gráfico comparativo visual SVG en el portal oficial de BM.</p>
        </div>
    </section>`;
}

export function renderSntWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { title: 'Elige tu familia', desc: 'Decide si buscas estabilidad (Fortune), tendencia (BullX) o caos controlado (FomoX).' },
        { title: 'Define tu estrategia', desc: 'Usa tus propios indicadores o prueba tus bots en entornos 100% repetibles.' },
        { title: 'Gestiona el riesgo', desc: 'Cada índice tiene su propia personalidad de volatilidad. Ajusta tu lote ideal.' },
        { title: 'Analiza patrones', desc: 'Los índices Bridge Markets ofrecen consistencia. Ideal para backtesting.' },
        { title: 'Ejecuta con precisión', desc: 'Aquí cada tick es una oportunidad de mejora. Sin noticias, sin excusas.' },
    ];

    return `
    <section class="py-32 px-8 bg-[#05010f] border-t border-white/5 relative overflow-hidden">
        <div class="absolute inset-0 bg-[#865BFF]/5 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
        <div class="max-w-7xl mx-auto section-reveal relative z-10">
            <div class="text-center mb-24">
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-6 uppercase tracking-tighter">¿Cómo <span class="text-[#865BFF]">Operar</span>?</h2>
                <div class="h-1 w-24 bg-[#865BFF] mx-auto rounded-full"></div>
            </div>

            <div class="flex flex-col lg:flex-row gap-6 relative">
                <div class="hidden lg:block absolute top-[40%] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#865BFF]/50 to-transparent z-0"></div>
                ${steps.map((s, i) => `
                    <div class="flex-1 flex flex-col group relative z-10 hover:-translate-y-4 transition-transform duration-500">
                        <div class="asym-card p-8 bg-[#0a0515]/90 border border-white/10 hover:border-[#865BFF]/50 transition-all duration-500 h-full backdrop-blur-xl group-hover:shadow-[0_20px_50px_-10px_rgba(134,91,255,0.3)]">
                            <div class="w-16 h-16 bg-[#05010f] border border-white/5 rounded-full flex items-center justify-center text-[#865BFF] mb-8 group-hover:bg-[#865BFF] group-hover:text-white font-black text-2xl transition-all shadow-[0_0_20px_rgba(134,91,255,0.2)] mx-auto lg:mx-0">
                                0${i + 1}
                            </div>
                            <h3 class="text-lg font-black text-white mb-4 uppercase tracking-tight text-center lg:text-left">${s.title}</h3>
                            <p class="text-xs text-white/50 leading-relaxed font-medium text-center lg:text-left">${s.desc}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>`;
}

export function renderSntSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <section class="py-32 px-8 bg-[#0a0515] relative overflow-hidden">
        <div class="absolute -top-32 -right-32 w-96 h-96 bg-[#865BFF]/10 rounded-full blur-[100px]"></div>
        <div class="max-w-6xl mx-auto section-reveal relative z-10">
            <div class="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
                <div>
                     <h2 class="text-4xl md:text-6xl font-black font-headline text-white mb-6 uppercase tracking-tighter">Especificaciones <span class="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">Técnicas</span></h2>
                     <p class="text-lg text-white/50 leading-relaxed font-medium max-w-xl">Parámetros precisos que reflejan distintos comportamientos del mercado y profundidad operativa.</p>
                </div>
                <div class="px-6 py-2 bg-white/5 border border-white/10 rounded-full inline-block">
                    <span class="text-[10px] font-black text-white/40 uppercase tracking-[0.3em]">Institutional Grade</span>
                </div>
            </div>

            <div class="glass-panel asym-card border border-white/10 p-0 overflow-hidden shadow-2xl backdrop-blur-xl">
                <div class="overflow-x-auto">
                    <table class="w-full min-w-[800px] text-left border-collapse">
                        <thead>
                            <tr class="bg-gradient-to-r from-white/5 to-transparent border-b border-white/10">
                                <th class="py-8 px-10 text-[11px] font-black text-[#865BFF] uppercase tracking-[0.2em] w-1/3">Familia de Índice</th>
                                <th class="py-8 px-10 text-[11px] font-black text-[#865BFF] uppercase tracking-[0.2em]">Spread Global</th>
                                <th class="py-8 px-10 text-[11px] font-black text-[#865BFF] uppercase tracking-[0.2em]">Lotaje Mín/Máx</th>
                                <th class="py-8 px-10 text-[11px] font-black text-[#865BFF] uppercase tracking-[0.2em]">Ejecución</th>
                            </tr>
                        </thead>
                        <tbody class="divide-y divide-white/5 bg-[#05010f]/80">
                            ${['FORTUNE / FORTUNEX', 'VORTEX', 'BULLX & BEARX', 'FOMOX'].map((fam, i) => `
                                <tr class="hover:bg-[#865BFF]/5 transition-colors group">
                                    <td class="py-8 px-10 font-black text-white uppercase tracking-widest text-sm flex items-center gap-4">
                                        <span class="w-2 h-2 rounded-full bg-white/10 group-hover:bg-[#865BFF] transition-colors"></span>
                                        ${fam}
                                    </td>
                                    <td class="py-8 px-10 text-white/50 font-mono text-xs font-bold tracking-widest">Desde 0.0 Pips</td>
                                    <td class="py-8 px-10 text-white/50 font-mono text-xs font-bold tracking-widest">Variable</td>
                                    <td class="py-8 px-10 text-emerald-400 font-mono text-xs font-bold tracking-widest">Market Execution</td>
                                </tr>
                            `).join('')}
                        </tbody>
                    </table>
                </div>
            </div>
            <div class="mt-8 flex justify-between items-center text-[10px] font-bold text-white/20 uppercase tracking-widest italic">
                <p>*Los datos técnicos exactos deben validarse en la pasarela de cliente MT5.</p>
                <p>Bridge Markets Server</p>
            </div>
        </div>
    </section>`;
}

export function renderSntPlatforms(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { icon: 'person_add', text: 'Regístrate en Bridge Markets' },
        { icon: 'account_balance_wallet', text: 'Crea tu cuenta de Índices Sintéticos' },
        { icon: 'download', text: 'Descarga MT5 (PC, Mac, iOS, Android)' },
        { icon: 'login', text: 'Conecta con tus credenciales seguras' },
        { icon: 'rocket_launch', text: 'Comienza a operar inmediatamente' }
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
                        <span class="px-8 py-4 rounded-full bg-white/10 border border-white/20 text-white text-[10px] font-black uppercase tracking-widest hover:bg-white hover:text-black transition-colors cursor-pointer shadow-lg">Windows / Mac</span>
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
        { q: '¿Qué es un Índice Sintético?', a: 'Es un mercado simulado por algoritmos RNG que replican el comportamiento de los mercados reales sin depender de activos físicos ni noticias externas.' },
        { q: '¿Puedo operar 24/7?', a: 'Sí, los índices sintéticos están disponibles todos los días del año, incluyendo fines de semana y festivos oficiales.' },
        { q: '¿Necesito una cuenta especial?', a: 'Deberás crear una cuenta exclusiva de "Índices Sintéticos" dentro de tu área de cliente de Bridge Markets (Diferente a Forex o Cryptos).' },
        { q: '¿Qué plataforma se utiliza?', a: 'MetaTrader 5 (MT5) es la terminal institucional oficial para operar nuestras familias de índices.' },
        { q: '¿Cómo se garantiza la transparencia?', a: 'El generador de números (RNG) es auditado por entidades de cumplimiento estrictas para asegurar resultados estadísticamente sólidos.' },
        { q: '¿Existen comisiones ocultas?', a: 'No, los costos operativos están reflejados directamente en el spread de cada mercado sintético en vivo.' }
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
    const ctaText = content.ctaText || "Empezar a Operar";
    const ctaLink = brand.ctaLink || "#register";
    
    return `
    <section class="py-40 bg-[#05010f] relative overflow-hidden section-reveal">
        <div class="absolute inset-0 z-0">
            <div class="absolute bottom-0 left-0 w-full h-1/2 bg-[linear-gradient(0deg,#865BFF,transparent)] opacity-10"></div>
            <div class="absolute top-[20%] left-[50%] -translate-x-[50%] w-full max-w-4xl h-full bg-[#865BFF]/10 rounded-t-full blur-[120px] pointer-events-none"></div>
        </div>
        
        <div class="max-w-4xl mx-auto px-8 relative z-10 text-center text-white">
            <div class="inline-block px-4 py-1.5 rounded-full bg-white/5 border border-white/10 mb-10 backdrop-blur-md">
                 <span class="text-[9px] font-black uppercase text-[#865BFF] tracking-[0.3em] flex items-center gap-2"><span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span> Bridge Markets Live Server</span>
            </div>
            
            <h2 class="text-5xl md:text-7xl lg:text-[6rem] font-black font-headline mb-8 uppercase tracking-tighter leading-[0.9]">DOMINA EL <br><span class="text-transparent bg-clip-text bg-gradient-to-b from-white to-[#865BFF]">MERCADO</span></h2>
            <p class="text-lg md:text-xl text-white/50 mb-16 max-w-2xl mx-auto font-medium">El próximo movimiento del mercado podría ser tuyo. Únete a miles de traders en la red global oficial de Bridge Markets hoy mismo.</p>
            
            <div class="flex flex-col items-center gap-16">
                <a href="${ctaLink}" class="group relative px-12 py-6 bg-white text-black font-black text-xl uppercase tracking-widest rounded-full hover:scale-110 transition-all overflow-hidden flex items-center justify-center gap-4 shadow-[#865BFF]/60 shadow-[0_0_80px_rgba(134,91,255,0.4)]">
                    <span class="relative z-10">${ctaText}</span>
                    <span class="material-symbols-outlined relative z-10 group-hover:translate-x-2 transition-transform">trending_up</span>
                    <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#865BFF]/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                </a>
                
                <div class="max-w-2xl p-8 bg-[#0a0515]/60 asym-card border border-white/5 backdrop-blur-md text-left">
                    <p class="text-[10px] text-white/30 uppercase tracking-[0.3em] font-black mb-4 pb-4 border-b border-white/5">Risk Disclosure — Bridge Markets LTD</p>
                    <p class="text-[9px] text-white/20 leading-relaxed uppercase tracking-widest font-bold">
                        El trading de Índices Sintéticos implica un alto riesgo de pérdida de capital. Estos mercados simulados operan 24/7 y la volatilidad puede ser extrema en familias específicas como FOMOX/BULLX. Asegúrese de comprender los riesgos algorítmicos antes de invertir capital real. Los CFD e Instrumentos RNG son productos apalancados.
                    </p>
                </div>
            </div>
        </div>
    </section>`;
}
