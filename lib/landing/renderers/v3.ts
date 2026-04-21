import { BrandConfig } from '../types';
import { SECTION_CATALOG } from '../catalog';

/**
 * Renders the V3 Premium Hero section based on the Bridge Markets official style.
 * Uses specific rounded corners, gradients, and typography from the snippet.
 */
export function renderV3Hero(content: Record<string, any>, brand: BrandConfig): string {
    const c = { 
        title: 'Conquista los <br><strong class="font-bold">mercados financieros globales</strong>',
        subtitle: 'Bridge Markets es tu plataforma de trading profesional: segura, innovadora y diseñada para llevar tu experiencia al siguiente nivel.',
        ctaText: 'Únete ahora',
        ...content 
    };
    
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <section class="relative overflow-hidden px-3 lg:px-5 pt-3 lg:pt-7 bg-[#F8F9FA]">
        <div class="max-w-[1440px] mx-auto">
            <div class="bg-white rounded-[32px] relative h-full lg:min-h-[650px] overflow-hidden shadow-sm border border-gray-100">
                <div class="container relative mx-auto lg:h-[650px] h-max py-10 lg:py-0">
                    
                    <!-- Content Layer -->
                    <div class="relative z-20 flex lg:justify-center lg:items-center h-full flex-col pt-16 lg:pt-0 mx-auto px-6 lg:px-0">
                        <div class="w-full lg:w-1/2 lg:ml-auto lg:pl-12">
                            <h1 class="text-4xl md:text-5xl xl:text-7xl text-[#2F1E5D] text-start mb-8 font-headline leading-tight">
                                ${c.title}
                            </h1>
                            <p class="text-lg text-[#2F1E5D]/70 text-start mb-10 max-w-lg leading-relaxed">
                                ${c.subtitle}
                            </p>
                            <div>
                                <a href="${ctaLink}" class="inline-flex justify-center items-center py-5 px-16 rounded-2xl bg-[#865BFF] text-white font-bold text-lg hover:bg-[#7342FF] hover:scale-105 transition-all shadow-[0_20px_40px_rgba(134,91,255,0.3)]">
                                    ${c.ctaText}
                                </a>
                            </div>
                        </div>
                    </div>

                    <!-- Geometric Background Elements -->
                    <div class="absolute top-0 left-4 lg:left-0 w-full h-full pointer-events-none z-10">
                        <div class="absolute top-6 left-0 lg:left-6 w-[40%] lg:w-1/5 h-[85%] lg:h-[90%] rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[67px] bg-gradient-to-b from-[#E5D8FF] to-[#AA9AFF] opacity-80"></div>
                        <div class="absolute top-6 left-[45%] lg:left-[24%] w-[40%] lg:w-1/5 h-[85%] lg:h-[90%] rounded-tl-[25px] rounded-tr-[25px] rounded-bl-[25px] rounded-br-[67px] bg-gradient-to-b from-[#E5D8FF] to-[#AA9AFF] opacity-80"></div>
                        
                        <!-- Floating 3D Image placeholder or SVG -->
                        <div class="absolute left-[10%] lg:left-[5%] top-1/2 -translate-y-1/2 w-[80%] lg:w-[45%] aspect-square flex items-center justify-center">
                             <img src="/images/imagenes%20nuevas/reyna%20rosa.png" alt="Bridge Premium" class="w-full h-full object-contain filter drop-shadow-[0_30px_60px_rgba(0,0,0,0.1)] animate-v3-float">
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <style>
            @keyframes v3-float {
                0%, 100% { transform: translateY(0) scale(1); }
                50% { transform: translateY(-20px) scale(1.02); }
            }
            .animate-v3-float {
                animation: v3-float 6s ease-in-out infinite;
            }
        </style>
    </section>
    `;
}

/**
 * Renders the V3 Features section with high-end cards.
 */
export function renderV3Features(content: Record<string, any>, brand: BrandConfig): string {
    const features = [
        { t: 'Seguridad de Grado Institucional', d: 'Tus fondos están protegidos por protocolos de cifrado avanzado y cuentas segregadas.', icon: 'shield_with_heart' },
        { t: 'Tecnología MT5 de Vanguardia', d: 'Ejecución ultra-rápida con latencia mínima para una ventaja competitiva real.', icon: 'bolt' },
        { t: 'Ecosistema Multi-Activo', d: 'Accede a Forex, Sintéticos y Criptomonedas desde una única interfaz unificada.', icon: 'hub' }
    ];

    return `
    <section class="py-32 bg-white relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="text-center max-w-3xl mx-auto mb-24">
                <h2 class="text-5xl font-black text-[#2F1E5D] mb-8 leading-tight uppercase tracking-tighter">Tecnología diseñada para <span class="text-[#865BFF]">el éxito</span></h2>
                <p class="text-xl text-gray-500 font-medium">Nuestra infraestructura V3 combina la robustez institucional con la agilidad necesaria para el trader moderno.</p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
                ${features.map(f => `
                    <div class="group p-12 rounded-[3rem] bg-[#F8FAFC] border border-gray-100 hover:bg-white hover:shadow-[0_40px_80px_rgba(134,91,255,0.1)] transition-all duration-500 hover:-translate-y-4">
                        <div class="w-16 h-16 rounded-2xl bg-[#865BFF]/10 flex items-center justify-center text-[#865BFF] mb-10 group-hover:bg-[#865BFF] group-hover:text-white transition-all duration-500">
                            <span class="material-symbols-outlined text-3xl">${f.icon}</span>
                        </div>
                        <h3 class="text-2xl font-black text-[#2F1E5D] mb-6 leading-tight">${f.t}</h3>
                        <p class="text-gray-500 leading-relaxed font-medium">${f.d}</p>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

/**
 * Renders a V3 Header that mimics the official Bridge Markets navbar.
 */
export function renderV3Header(content: Record<string, any>, brand: BrandConfig): string {
    const logoUrl = brand.logoUrl || '/src/logo.svg';
    const ctaLink = brand.ctaLink || '#registro';

    return `
    <header class="fixed top-0 inset-x-0 z-[1000] px-4 py-6 pointer-events-none">
        <div class="max-w-7xl mx-auto flex justify-between items-center bg-white/70 backdrop-blur-2xl border border-white/20 rounded-[2rem] px-8 py-4 shadow-[0_10px_40px_rgba(0,0,0,0.05)] pointer-events-auto">
            <div class="flex items-center gap-12">
                <a href="/"><img src="${logoUrl}" alt="Logo" class="h-10"></a>
                <nav class="hidden lg:flex items-center gap-8">
                    <a href="#" class="text-sm font-bold text-[#2F1E5D] hover:text-[#865BFF] transition-colors">Servicios</a>
                    <a href="#" class="text-sm font-bold text-[#2F1E5D] hover:text-[#865BFF] transition-colors">Social Trading</a>
                    <a href="#" class="text-sm font-bold text-[#2F1E5D] hover:text-[#865BFF] transition-colors">Propfirm</a>
                </nav>
            </div>
            <div class="flex items-center gap-6">
                <a href="${ctaLink}" class="hidden sm:flex px-8 py-3 bg-[#865BFF] text-white text-sm font-bold rounded-xl hover:bg-[#7342FF] transition-all shadow-lg shadow-[#865BFF]/20">
                    Abrir Cuenta
                </a>
                <div class="lg:hidden w-10 h-10 flex items-center justify-center">
                    <span class="material-symbols-outlined text-[#2F1E5D]">menu</span>
                </div>
            </div>
        </div>
    </header>
    <div class="h-24"></div> <!-- Spacer -->
    `;
}

/**
 * Renders the V3 Community section.
 */
export function renderV3Community(content: Record<string, any>, brand: BrandConfig): string {
    const c = {
        title: 'Únete a nuestra <br>comunidad de éxito',
        subtitle: 'Accede a señales, análisis y una red de traders profesionales que te ayudarán a escalar tus resultados.',
        ctaText: 'Unirse al canal oficial',
        ...content
    };

    return `
    <section class="py-32 bg-[#F8FAFC] relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="bg-gradient-to-br from-[#865BFF] to-[#6366f1] rounded-[4rem] p-16 lg:p-24 flex flex-col lg:flex-row items-center gap-20 shadow-[0_40px_80px_rgba(134,91,255,0.3)] relative overflow-hidden text-white">
                <div class="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                
                <div class="lg:w-1/2 relative z-10">
                    <h2 class="text-5xl md:text-7xl font-black mb-10 leading-tight uppercase tracking-tightest">
                        ${c.title}
                    </h2>
                    <p class="text-xl text-white/80 font-medium mb-12 max-w-lg leading-relaxed">
                        ${c.subtitle}
                    </p>
                    <div class="flex flex-wrap gap-6">
                        <a href="${brand.telegram || '#'}" class="px-12 py-5 bg-white text-[#865BFF] font-black rounded-2xl hover:scale-105 transition-all shadow-2xl flex items-center gap-4 uppercase tracking-widest text-sm">
                            <span class="material-symbols-outlined">send</span> ${c.ctaText}
                        </a>
                    </div>
                </div>

                <div class="lg:w-1/2 relative z-10 flex justify-center">
                    <div class="relative group">
                        <div class="absolute inset-0 bg-white/20 rounded-full blur-[100px] group-hover:bg-white/30 transition-all duration-1000"></div>
                        <img src="/images/imagenes%20nuevas/caballo%20rosa.png" alt="Community" class="w-full max-w-md object-contain drop-shadow-2xl animate-v3-float relative z-10">
                    </div>
                </div>
            </div>
        </div>
    </section>
    `;
}

/**
 * Renders the V3 Premium Footer.
 */
export function renderV3Footer(content: Record<string, any>, brand: BrandConfig): string {
    const year = new Date().getFullYear();
    const ibName = brand.communityName || brand.fullName || 'Partner Oficial';

    return `
    <footer class="py-32 bg-white text-[#2F1E5D] border-t border-gray-100 relative overflow-hidden">
        <div class="max-w-7xl mx-auto px-8 relative z-10">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-20 mb-24">
                <div class="col-span-1 md:col-span-1">
                    <img src="/logo.png" alt="BM" class="h-10 mb-10">
                    <p class="text-[#2F1E5D]/50 text-sm font-medium leading-relaxed mb-10">
                        La infraestructura de trading institucional más avanzada del mundo, ahora disponible para ti.
                    </p>
                    <div class="flex gap-4">
                        <div class="w-10 h-10 rounded-xl bg-gray-50 flex items-center justify-center text-[#2F1E5D] hover:bg-[#865BFF] hover:text-white transition-all">
                            <span class="material-symbols-outlined">public</span>
                        </div>
                    </div>
                </div>

                <div>
                    <h4 class="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#865BFF]">Productos</h4>
                    <ul class="space-y-6 text-sm font-bold opacity-60">
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Cuentas Propfirm</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Índices Sintéticos</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Social Trading</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#865BFF]">Comunidad</h4>
                    <ul class="space-y-6 text-sm font-bold opacity-60">
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Telegram Oficial</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Material Educativo</a></li>
                        <li><a href="#" class="hover:text-[#865BFF] transition-colors">Eventos</a></li>
                    </ul>
                </div>

                <div>
                    <h4 class="text-xs font-black uppercase tracking-[0.3em] mb-10 text-[#865BFF]">Presentado por</h4>
                    <div class="p-8 bg-gray-50 rounded-3xl border border-gray-100">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-10 h-10 rounded-full bg-[#865BFF] flex items-center justify-center text-white font-black text-xs uppercase">${ibName.charAt(0)}</div>
                            <span class="text-sm font-black text-[#2F1E5D]">${ibName}</span>
                        </div>
                        <p class="text-[10px] font-bold text-[#2F1E5D]/40 uppercase tracking-widest leading-relaxed">
                            Official Institutional Partner <br> Bridge Markets Global
                        </p>
                    </div>
                </div>
            </div>

            <div class="pt-20 border-t border-gray-100 text-center">
                <p class="text-[10px] font-bold text-[#2F1E5D]/30 uppercase tracking-[0.4em] mb-12 max-w-4xl mx-auto leading-loose">
                    Advertencia de Riesgo: Los productos financieros implican riesgo. El contenido en este sitio no es un consejo de inversión. Bridge Markets Limited (UK) Reg 15159310.
                </p>
                <div class="text-[10px] font-black text-[#2F1E5D] uppercase tracking-[0.8em]">© ${year} BRIDGE MARKETS GLOBAL.</div>
            </div>
        </div>
    </footer>
    `;
}
