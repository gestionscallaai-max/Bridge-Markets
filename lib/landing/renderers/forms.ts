import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

export function renderTestimonials(content: Record<string, any>, brand: BrandConfig): string {
    const c = { ...SECTION_CATALOG.find(s => s.id === 'testimonials')!.defaultContent, ...content };
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
    return `
    <footer class="py-20 bg-black text-white px-8 border-t border-white/5">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-16 mb-20">
            <div class="md:col-span-2">
                <img src="https://bridgemarkets.global/wp-content/uploads/2023/06/Logo-Bridge-Markets-Horizontal-Blanco.png" alt="Bridge Markets" class="h-8 mb-8">
                <p class="text-xs text-white/30 max-w-sm leading-relaxed uppercase tracking-wider">
                    Bridge Markets es un broker internacional dedicado a brindar soluciones tecnológicas y acceso a mercados globales con los más altos estándares de ejecución y soporte técnico.
                </p>
            </div>
            <div>
                <h4 class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">Navegación</h4>
                <div class="flex flex-col gap-4 text-xs font-bold text-white/50 uppercase tracking-widest">
                    <a href="#" class="hover:text-white transition-colors">Broker Oficial</a>
                    <a href="#" class="hover:text-white transition-colors">Términos y Condiciones</a>
                    <a href="#" class="hover:text-white transition-colors">Aviso de Privacidad</a>
                </div>
            </div>
            <div>
                <h4 class="text-[10px] font-black text-primary uppercase tracking-[0.3em] mb-8">IB Partner</h4>
                <div class="flex flex-col gap-4">
                    <div class="flex items-center gap-3">
                        <div class="w-8 h-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[10px] font-black text-primary">${brand.fullName.charAt(0)}</div>
                        <span class="text-sm font-black text-white">${brand.fullName}</span>
                    </div>
                    <span class="text-[9px] font-bold text-white/30 uppercase tracking-[0.2em]">Verified Bridge Markets Partner</span>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
            <p class="text-[9px] font-black text-white/20 uppercase tracking-[0.5em]">© ${year} BRIDGE MARKETS ALL RIGHTS RESERVED.</p>
            <div class="flex gap-4 items-center">
                <span class="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>
                <span class="text-[9px] font-black text-white/40 uppercase tracking-[0.2em]">System Operational</span>
            </div>
        </div>
    </footer>`;
}
