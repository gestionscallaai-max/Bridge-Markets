import { BrandConfig } from '../types';

export function renderTestimonials(content: Record<string, any>, brand: BrandConfig): string {
    const c = content;
    const items = (c.items || []).map((item: any) => `
        <div class="min-w-[380px] bg-white border border-gray-200 asym-card p-12 shadow-sm snap-center flex flex-col justify-between hover:border-primary/40 transition-all group">
            <div>
                <div class="flex gap-1 text-primary mb-8">${'<span class="material-symbols-outlined" style="font-variation-settings: \'FILL\' 1">star</span>'.repeat(5)}</div>
                <p class="text-xl text-[#211635] italic leading-relaxed mb-10">"${item.quote}"</p>
            </div>
            <div class="flex items-center gap-5">
                <div class="w-14 h-14 asym-card-rev bg-primary/10 flex items-center justify-center text-primary font-bold text-lg">${item.name.charAt(0)}</div>
                <div>
                    <div class="font-extrabold text-[#211635] text-lg">${item.name}</div>
                    <div class="text-[10px] text-primary font-bold uppercase tracking-[0.2em]">${item.role}</div>
                </div>
            </div>
        </div>
    `).join('\n');

    return `
    <section class="py-32 bg-white overflow-hidden section-reveal">
        <div class="max-w-7xl mx-auto px-8">
            <div class="text-center mb-20">
                <span class="text-primary text-xs tracking-[0.3em] font-bold uppercase mb-4 block">${c.sectionLabel}</span>
                <h2 class="text-5xl font-headline font-bold text-[#211635]">${c.title}</h2>
            </div>
            <div class="flex gap-8 overflow-x-auto pb-8 snap-x px-4" style="-ms-overflow-style: none; scrollbar-width: none;">${items}</div>
        </div>
    </section>`;
}

export function renderSntFooter(content: Record<string, any>, brand: BrandConfig): string {
    const year = new Date().getFullYear();
    const ibName = content.ibFooterName || brand.fullName || "Partner Oficial";
    const ibContact = content.ibContactInfo || "";
    
    return `
    <footer class="py-24 bg-[#020205] text-white px-8 border-t border-white/5 relative overflow-hidden">
        <!-- Decoration -->
        <div class="absolute bottom-0 right-0 w-[40%] h-[40%] bg-[#8b5cf6]/5 rounded-full blur-[120px]"></div>
        
        <div class="max-w-7xl mx-auto relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-12 gap-16 mb-24">
                <div class="md:col-span-4">
                    <img src="${content.logoUrl || brand.logoUrl || '/images/logo-bm-blanco.png'}" alt="Logo" class="h-10 mb-10 drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                    <p class="text-sm text-white/40 leading-relaxed uppercase tracking-wider font-light mb-12">
                        Bridge Markets es un broker internacional dedicado a brindar soluciones tecnológicas y acceso a mercados globales con los más altos estándares de ejecución y soporte técnico.
                    </p>
                    <div class="flex flex-col gap-4">
                        <p class="text-[10px] font-black text-white/30 uppercase tracking-[0.2em] mb-2">Contacto Corporativo BM:</p>
                        <p class="text-[11px] font-bold text-white/60">corporate@bridgemarkets.global</p>
                        <p class="text-[11px] font-bold text-white/60">+1 (786) 979-3392</p>
                        <p class="text-[11px] font-bold text-white/60">@bridgemarketsbroker</p>
                    </div>
                </div>

                <div class="md:col-span-2">
                    <h4 class="text-[10px] font-black text-[#8b5cf6] uppercase tracking-[0.4em] mb-10">Servicios</h4>
                    <ul class="space-y-5 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                        <li><a href="#" class="hover:text-white transition-colors">Social Trading</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">PropFirm</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Documentos</a></li>
                        <li><a href="https://charts.bridgemarkets.global" target="_blank" class="hover:text-white transition-colors">Gráficos</a></li>
                    </ul>
                </div>

                <div class="md:col-span-2">
                    <h4 class="text-[10px] font-black text-[#8b5cf6] uppercase tracking-[0.4em] mb-10">Legal</h4>
                    <ul class="space-y-5 text-[11px] font-bold text-white/40 uppercase tracking-widest">
                        <li><a href="#" class="hover:text-white transition-colors">Términos</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">KYC / AML</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Declaración Riesgos</a></li>
                        <li><a href="#" class="hover:text-white transition-colors">Privacidad</a></li>
                    </ul>
                </div>

                <div class="md:col-span-4">
                    <div class="glass-panel p-8 rounded-[2rem] border-white/10 bg-white/[0.02] relative overflow-hidden group">
                        <div class="absolute inset-0 bg-[#8b5cf6]/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                        <h4 class="text-[10px] font-black text-[#8b5cf6] uppercase tracking-[0.4em] mb-8 relative z-10">Presentado por</h4>
                        <div class="flex items-center gap-5 mb-8 relative z-10">
                            <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#8b5cf6] to-[#4c1d95] flex items-center justify-center text-xl font-black shadow-xl border border-white/10">
                                ${ibName.charAt(0)}
                            </div>
                            <div>
                                <p class="text-sm font-black text-white uppercase tracking-tight">${ibName}</p>
                                <p class="text-[9px] font-bold text-white/30 uppercase tracking-widest mt-1">Partner Verificado</p>
                            </div>
                        </div>
                        ${ibContact ? `
                            <div class="pt-6 border-t border-white/5 relative z-10">
                                <p class="text-[9px] text-white/30 uppercase font-black tracking-widest mb-2">Soporte del Partner:</p>
                                <p class="text-xs font-bold text-white/70">${ibContact}</p>
                            </div>
                        ` : ''}
                    </div>
                </div>
            </div>

            <div class="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                <p class="text-[9px] font-black text-white/20 uppercase tracking-[0.3em]">© 2026 BridgeMarkets LTD. Todos los derechos reservados.</p>
                <div class="flex gap-6 items-center">
                    <div class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                        <span class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">Institutional Tier-1</span>
                    </div>
                    <div class="flex items-center gap-2">
                        <span class="w-1.5 h-1.5 rounded-full bg-[#8b5cf6] animate-pulse"></span>
                        <span class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">MT5 SSL Secured</span>
                    </div>
                </div>
            </div>
        </div>
    </footer>`;
}
