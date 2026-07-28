import { BrandConfig } from '../types';

/**
 * Evento VIP Bogotá - Componentes de Renderizado
 * Estilo Premium en tonos Violeta Oscuro, Neón y Ajedrez Metálico
 */

export function renderVEHeader(content: Record<string, any>, brand: BrandConfig): string {
    const ctaLink = content.ctaUrl || brand.ctaLink || '#registro';
    
    return `
    <header class="w-full bg-[#070216]/80 backdrop-blur-xl border-b border-white/5 sticky top-0 z-[100] transition-all duration-300">
        <div class="max-w-7xl mx-auto flex justify-between items-center h-20 px-6">
            <!-- Logo -->
            <a href="/" class="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl">
                <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-6 object-contain">
            </a>

            <!-- Nav Links -->
            <nav class="hidden md:flex items-center gap-10 text-xs font-bold uppercase tracking-widest text-white/60">
                <a href="#evento" class="hover:text-white transition-colors">Evento</a>
                <a href="#detalles" class="hover:text-white transition-colors">Reglas</a>
                <a href="#registro" class="hover:text-white transition-colors">PQR</a>
            </nav>

            <!-- Actions -->
            <div class="flex items-center gap-6">
                <a href="https://portal.bridgemarkets.global/login" target="_blank" class="hidden sm:inline-block text-xs font-bold uppercase tracking-widest text-white/50 hover:text-white transition-colors">
                    Ya soy cliente
                </a>
                <a href="${ctaLink}" class="px-6 py-3.5 bg-gradient-to-r from-[#865BFF] to-[#6c40e6] text-white text-xs font-black uppercase tracking-widest rounded-full hover:scale-105 transition-all shadow-[0_10px_30px_rgba(134,91,255,0.25)]">
                    Crear cuenta
                </a>
            </div>
        </div>
    </header>
    `;
}

export function renderVEHero(content: Record<string, any>, brand: BrandConfig): string {
    const c = {
        tag: 'Muy pronto - gran evento',
        title: 'La nueva era <br><span class="text-gradient-v3 font-black">del trading</span> <br>comienza aquí',
        desc: 'Descubre la tecnología que está definiendo los mercados financieros. Un evento íntimo, diseñado para quienes marcan el ritmo del mundo.',
        date: '18 de Julio, 2026 - 19:00 hrs',
        location: 'Hotel Royal Financial Center – Bogotá, Colombia',
        ctaText: 'Ver reto',
        ...content
    };
    const ctaLink = content.ctaUrl || brand.ctaLink || '#registro';

    return `
    <section id="evento" class="relative overflow-visible py-20 px-6 lg:px-20 bg-[#070216] text-white">
        <!-- Background Grid Pattern -->
        <div class="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(134,91,255,0.08)_0%,transparent_70%)] pointer-events-none z-0"></div>
        <div class="absolute inset-0 opacity-[0.03] pointer-events-none z-0" style="background-image: radial-gradient(rgba(255,255,255,0.15) 1px, transparent 1px); background-size: 24px 24px;"></div>
        
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <!-- Chess Visual (Left) -->
            <div class="lg:col-span-6 flex justify-center lg:justify-start relative">
                <div class="absolute w-[450px] h-[450px] bg-[#865BFF]/10 rounded-full blur-[100px] -z-10 animate-pulse"></div>
                <img src="/images/landing-vip/hero-chess.png" alt="Bridge Markets Event" 
                    class="w-full max-w-[500px] object-contain drop-shadow-[0_20px_50px_rgba(134,91,255,0.3)] animate-ve-float">
            </div>

            <!-- Content Card (Right) -->
            <div class="lg:col-span-6 space-y-8 lg:pl-6 text-left">
                <!-- Tag Badge -->
                <div class="inline-flex items-center gap-2.5 px-4 py-2 bg-gradient-to-r from-[#865BFF]/10 to-[#865BFF]/5 border border-[#865BFF]/30 rounded-full">
                    <span class="w-1.5 h-1.5 rounded-full bg-[#865BFF] animate-ping"></span>
                    <span class="text-[10px] font-black uppercase tracking-widest text-[#a885ff]">${c.tag}</span>
                </div>

                <!-- Headline -->
                <h1 class="text-4xl md:text-5xl lg:text-[4rem] font-black leading-[1.1] font-headline tracking-tighter text-white">
                    ${c.title}
                </h1>

                <!-- Subtext -->
                <p class="text-white/60 text-base md:text-lg leading-relaxed max-w-xl font-light">
                    ${c.desc}
                </p>

                <!-- Date & Location -->
                <div class="p-6 bg-white/[0.02] border border-white/5 rounded-3xl space-y-4 max-w-md">
                    <div class="flex items-center gap-4 text-white/80">
                        <span class="material-symbols-outlined text-[#865BFF]">calendar_today</span>
                        <span class="text-sm font-bold tracking-tight">${c.date}</span>
                    </div>
                    <div class="w-full h-px bg-white/5"></div>
                    <div class="flex items-center gap-4 text-white/80">
                        <span class="material-symbols-outlined text-[#865BFF]">location_on</span>
                        <span class="text-sm font-bold tracking-tight">${c.location}</span>
                    </div>
                </div>

                <!-- CTA Button -->
                <div>
                    <a href="${ctaLink}" class="inline-flex items-center justify-center py-5 px-12 rounded-2xl bg-gradient-to-r from-[#865BFF] to-[#6c40e6] text-white font-black text-xs uppercase tracking-widest hover:scale-105 transition-all shadow-[0_20px_40px_rgba(134,91,255,0.3)]">
                        ${c.ctaText}
                    </a>
                </div>
            </div>

        </div>

        <style>
            @keyframes ve-float {
                0%, 100% { transform: translateY(0px) rotate(0deg); }
                50% { transform: translateY(-15px) rotate(1deg); }
            }
            .animate-ve-float {
                animation: ve-float 8s ease-in-out infinite;
            }
        </style>
    </section>
    `;
}

export function renderVEMetrics(content: Record<string, any>, brand: BrandConfig): string {
    const items = [
        { val: '11,000+', label: 'Traders en Todo el Mundo' },
        { val: '66%', label: 'Capital Fondeado' },
        { val: '85%', label: 'Eficiencia en Retiros' },
        { val: '85+', label: 'Países Operando' },
        { val: '630+', label: 'Mercados Globales Activos' }
    ];

    return `
    <section class="py-6 px-6 bg-[#070216] relative z-20">
        <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-2 md:grid-cols-5 gap-6 p-8 bg-white/[0.02] backdrop-blur-2xl border border-white/5 rounded-[2rem] text-center shadow-2xl">
                ${items.map((x, idx) => `
                    <div class="space-y-2 py-4 ${idx < items.length - 1 ? 'border-b md:border-b-0 md:border-r border-white/5' : ''}">
                        <div class="text-3xl md:text-4xl font-black font-headline text-white tracking-tight">${x.val}</div>
                        <div class="text-[9px] font-black uppercase text-white/40 tracking-wider">${x.label}</div>
                    </div>
                `).join('')}
            </div>
        </div>
    </section>
    `;
}

export function renderVECountdown(content: Record<string, any>, brand: BrandConfig): string {
    const rawTarget = content.countdownTarget || content.targetDate || content.eventDateTime || '2026-10-22T19:00:00';
    const c = {
        targetDate: rawTarget,
        ctaText: 'VER ETAPAS DEL EVENTO',
        ...content
    };
    const ctaLink = content.ctaUrl || brand.ctaLink || '#registro';

    return `
    <section class="py-24 px-6 bg-[#070216] relative overflow-hidden text-center text-white">
        <!-- Countdown Background with Glow -->
        <div class="absolute inset-0 bg-[#0d0426] opacity-40 z-0"></div>
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#865BFF]/5 rounded-full blur-[200px] -z-10"></div>
        
        <div class="max-w-4xl mx-auto relative z-10 space-y-12">
            <!-- Timer Grid -->
            <div class="grid grid-cols-4 gap-4 max-w-2xl mx-auto" id="ve-countdown-timer">
                <div class="bg-white/[0.02] border border-white/5 backdrop-blur-md p-6 rounded-[2rem] space-y-1">
                    <span class="text-4xl md:text-6xl font-black font-headline text-white" id="timer-days">000</span>
                    <span class="block text-[9px] font-black uppercase text-white/30 tracking-widest mt-2">Días</span>
                </div>
                <div class="bg-white/[0.02] border border-white/5 backdrop-blur-md p-6 rounded-[2rem] space-y-1">
                    <span class="text-4xl md:text-6xl font-black font-headline text-white" id="timer-hours">00</span>
                    <span class="block text-[9px] font-black uppercase text-white/30 tracking-widest mt-2">Horas</span>
                </div>
                <div class="bg-white/[0.02] border border-white/5 backdrop-blur-md p-6 rounded-[2rem] space-y-1">
                    <span class="text-4xl md:text-6xl font-black font-headline text-white" id="timer-minutes">00</span>
                    <span class="block text-[9px] font-black uppercase text-white/30 tracking-widest mt-2">Minutos</span>
                </div>
                <div class="bg-white/[0.02] border border-white/5 backdrop-blur-md p-6 rounded-[2rem] space-y-1">
                    <span class="text-4xl md:text-6xl font-black font-headline text-white" id="timer-seconds">00</span>
                    <span class="block text-[9px] font-black uppercase text-white/30 tracking-widest mt-2">Segundos</span>
                </div>
            </div>

            <!-- Button -->
            <div>
                <a href="${ctaLink}" class="inline-flex justify-center items-center py-4 px-10 rounded-2xl border border-[#865BFF]/50 hover:border-[#865BFF] bg-white/[0.01] hover:bg-[#865BFF]/5 text-white font-bold text-xs uppercase tracking-widest transition-all">
                    ${c.ctaText}
                </a>
            </div>
        </div>

        <script>
            (function() {
                const targetStr = "${rawTarget}";
                const target = new Date(targetStr).getTime();
                
                function updateTimer() {
                    const now = new Date().getTime();
                    const diff = target - now;

                    if (isNaN(target) || diff <= 0) {
                        document.getElementById("timer-days").textContent = "000";
                        document.getElementById("timer-hours").textContent = "00";
                        document.getElementById("timer-minutes").textContent = "00";
                        document.getElementById("timer-seconds").textContent = "00";
                        return;
                    }

                    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
                    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
                    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

                    document.getElementById("timer-days").textContent = String(days).padStart(3, '0');
                    document.getElementById("timer-hours").textContent = String(hours).padStart(2, '0');
                    document.getElementById("timer-minutes").textContent = String(minutes).padStart(2, '0');
                    document.getElementById("timer-seconds").textContent = String(seconds).padStart(2, '0');
                }

                updateTimer();
                const interval = setInterval(updateTimer, 1000);
            })();
        </script>
    </section>
    `;
}

export function renderVESplitInfo(content: Record<string, any>, brand: BrandConfig): string {
    const left = {
        title: 'TÍTULO SECCIÓN',
        sub: 'Lorem Ipsum is simply dummy text',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        btnText: 'VER MÁS INFORMACIÓN',
        ...content.left
    };
    const right = {
        title: 'TÍTULO SECCIÓN',
        sub: 'Lorem Ipsum is simply dummy text',
        desc: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s',
        btnText: 'VER MÁS INFORMACIÓN',
        ...content.right
    };
    
    const ctaLink = content.ctaUrl || brand.ctaLink || '#registro';

    return `
    <section class="py-20 px-6 bg-[#070216] relative z-20">
        <div class="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-10">
            <!-- Left Card -->
            <div class="p-10 md:p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-between space-y-8 hover:border-[#865BFF]/30 transition-all duration-500 group shadow-lg">
                <div class="space-y-6">
                    <div class="px-5 py-2.5 bg-gradient-to-r from-[#865BFF]/25 to-transparent border border-[#865BFF]/20 rounded-xl w-fit">
                        <span class="text-xs font-black uppercase tracking-widest text-[#a885ff] font-headline">${left.title}</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight font-headline">${left.sub}</h3>
                    <p class="text-white/40 text-sm leading-relaxed font-light">${left.desc}</p>
                </div>
                <div>
                    <a href="${ctaLink}" class="w-full py-4 bg-gradient-to-r from-[#865BFF] to-[#6c40e6] text-white rounded-2xl font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center hover:scale-[1.02] transition-transform">
                        ${left.btnText}
                    </a>
                </div>
            </div>

            <!-- Right Card -->
            <div class="p-10 md:p-12 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col justify-between space-y-8 hover:border-[#865BFF]/30 transition-all duration-500 group shadow-lg">
                <div class="space-y-6">
                    <div class="px-5 py-2.5 bg-gradient-to-r from-[#865BFF]/25 to-transparent border border-[#865BFF]/20 rounded-xl w-fit">
                        <span class="text-xs font-black uppercase tracking-widest text-[#a885ff] font-headline">${right.title}</span>
                    </div>
                    <h3 class="text-2xl md:text-3xl font-bold tracking-tight text-white leading-tight font-headline">${right.sub}</h3>
                    <p class="text-white/40 text-sm leading-relaxed font-light">${right.desc}</p>
                </div>
                <div>
                    <a href="${ctaLink}" class="w-full py-4 bg-gradient-to-r from-[#865BFF] to-[#6c40e6] text-white rounded-2xl font-bold text-xs uppercase tracking-widest inline-flex items-center justify-center hover:scale-[1.02] transition-transform">
                        ${right.btnText}
                    </a>
                </div>
            </div>
        </div>
    </section>
    `;
}

export function renderVEVideo(content: Record<string, any>, brand: BrandConfig): string {
    const c = {
        title: 'FALTAN POCOS DÍAS',
        desc: 'Descubre todo lo que debes saber para el gran evento de Bridge Markets',
        ...content
    };

    return `
    <section class="py-32 px-6 bg-[#070216] relative overflow-hidden flex items-center justify-center">
        <!-- Ribbon Strips Background (Crossing diagonal lines) -->
        <div class="absolute inset-x-0 w-[200%] h-40 bg-[#865BFF] -rotate-[15deg] translate-y-8 flex items-center justify-center opacity-90 z-0 select-none overflow-hidden">
            <div class="text-white/10 text-5xl font-black uppercase tracking-[0.2em] whitespace-nowrap animate-ve-marquee">
                Falta poco - Falta poco - Falta poco - Falta poco - Falta poco - Falta poco - Falta poco
            </div>
        </div>
        <div class="absolute inset-x-0 w-[200%] h-40 bg-[#6c40e6] rotate-[15deg] -translate-y-8 flex items-center justify-center opacity-80 z-0 select-none overflow-hidden">
            <div class="text-white/10 text-5xl font-black uppercase tracking-[0.2em] whitespace-nowrap animate-ve-marquee-rev">
                Falta poco - Falta poco - Falta poco - Falta poco - Falta poco - Falta poco - Falta poco
            </div>
        </div>

        <!-- Video Card -->
        <div class="w-full max-w-2xl bg-black rounded-[3rem] overflow-hidden border border-white/15 relative z-10 shadow-[0_50px_100px_rgba(0,0,0,0.5)] group aspect-video">
            <!-- Simulated Video Thumbnail/Cover -->
            <div class="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent flex flex-col justify-end p-10 z-20">
                <button class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-20 h-20 bg-white text-[#070216] rounded-full flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-all">
                    <span class="material-symbols-outlined text-4xl font-black pl-1">play_arrow</span>
                </button>
                <div class="space-y-2 text-left">
                    <h3 class="text-2xl font-black font-headline text-white">${c.title}</h3>
                    <p class="text-white/60 text-sm font-light max-w-md">${c.desc}</p>
                </div>
            </div>
            <div class="absolute inset-0 bg-[#0d0426]/50 mix-blend-color z-10"></div>
            <!-- Standard Placeholder Backdrop -->
            <div class="w-full h-full bg-slate-900 flex items-center justify-center">
                 <span class="material-symbols-outlined text-white/10 text-9xl">movie</span>
            </div>
        </div>

        <style>
            @keyframes ve-marquee {
                0% { transform: translateX(-50%); }
                100% { transform: translateX(0%); }
            }
            @keyframes ve-marquee-rev {
                0% { transform: translateX(0%); }
                100% { transform: translateX(-50%); }
            }
            .animate-ve-marquee {
                animation: ve-marquee 30s linear infinite;
            }
            .animate-ve-marquee-rev {
                animation: ve-marquee-rev 30s linear infinite;
            }
        </style>
    </section>
    `;
}

export function renderVEDetails(content: Record<string, any>, brand: BrandConfig): string {
    const c = {
        date: 'Miércoles, 22 de octubre de 2025',
        time: '19:00 Horas, registro desde las 18 Horas',
        place: 'Hotel Bogotá Plaza - Cra 18A #100-41, Bogotá',
        ...content
    };

    return `
    <section id="detalles" class="py-24 px-6 bg-[#070216] relative z-20 text-center text-white">
        <div class="max-w-7xl mx-auto space-y-16">
            <!-- Header -->
            <div class="text-center space-y-4">
                <h2 class="text-4xl md:text-5xl font-black uppercase font-headline">Detalles del evento</h2>
                <div class="w-20 h-1 bg-[#865BFF] mx-auto rounded-full"></div>
            </div>

            <!-- Grid of Cards -->
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                <!-- Card 1 -->
                <div class="rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative h-[360px] p-8 flex flex-col justify-end text-left group">
                    <img src="/images/landing-vip/details-bg.png" class="absolute inset-0 w-full h-full object-cover z-0 opacity-70 group-hover:scale-105 transition-transform duration-700" alt="">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#070216] via-[#070216]/50 to-transparent z-10"></div>
                    <div class="relative z-20 space-y-6">
                        <h4 class="text-2xl font-black font-headline text-white">Detalles del Evento</h4>
                        <div class="space-y-3.5 text-xs text-white/70">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">calendar_today</span>
                                <span class="font-bold font-headline">Fecha: ${c.date}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">schedule</span>
                                <span class="font-bold font-headline">Hora: ${c.time}</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">location_on</span>
                                <span class="font-bold font-headline">Lugar: ${c.place}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 2 -->
                <div class="rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative h-[360px] p-8 flex flex-col justify-end text-left group">
                    <img src="/images/landing-vip/assistance-bg.png" class="absolute inset-0 w-full h-full object-cover z-0 opacity-70 group-hover:scale-105 transition-transform duration-700" alt="">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#070216] via-[#070216]/50 to-transparent z-10"></div>
                    <div class="relative z-20 space-y-6">
                        <h4 class="text-2xl font-black font-headline text-white">Modalidad de Asistencia</h4>
                        <div class="space-y-3.5 text-xs text-white/70">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">group</span>
                                <span class="font-bold font-headline">Presencial (solo con invitación).</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">videocam</span>
                                <span class="font-bold font-headline">Streaming (recibirás el link privado en tu correo).</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Card 3 -->
                <div class="rounded-[2rem] overflow-hidden border border-white/5 shadow-2xl relative h-[360px] p-8 flex flex-col justify-end text-left group">
                    <img src="/images/landing-vip/dress-bg.png" class="absolute inset-0 w-full h-full object-cover z-0 opacity-70 group-hover:scale-105 transition-transform duration-700" alt="">
                    <div class="absolute inset-0 bg-gradient-to-t from-[#070216] via-[#070216]/50 to-transparent z-10"></div>
                    <div class="relative z-20 space-y-6">
                        <h4 class="text-2xl font-black font-headline text-white">Código de Vestuario</h4>
                        <div class="space-y-3.5 text-xs text-white/70">
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">man</span>
                                <span class="font-bold font-headline">Hombres: Traje formal con corbata</span>
                            </div>
                            <div class="flex items-center gap-3">
                                <span class="material-symbols-outlined text-[#865BFF] text-lg">woman</span>
                                <span class="font-bold font-headline">Mujeres: Vestido largo</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Big Alert Banner -->
            <div class="p-8 bg-gradient-to-r from-[#865BFF] to-[#6c40e6] rounded-[2rem] shadow-2xl">
                <p class="text-xl md:text-3xl font-black uppercase font-headline tracking-wide">
                    Solo se permitirá el ingreso con vestuario formal.
                </p>
            </div>
        </div>
    </section>
    `;
}

export function renderVERegistration(content: Record<string, any>, brand: BrandConfig): string {
    const partnerId = brand.partnerId || 'BM_GLOBAL';
    const language = brand.language || 'ES';

    return `
    <section id="registro" class="py-24 px-6 bg-[#070216] relative overflow-hidden text-white z-20">
        <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10">
            
            <!-- Chess Knight Image (Left) -->
            <div class="lg:col-span-5 flex justify-center lg:justify-start">
                <div class="relative">
                    <div class="absolute w-[400px] h-[400px] bg-[#865BFF]/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
                    <img src="/images/landing-vip/knight-chess.png" alt="Bridge Markets" 
                        class="w-full max-w-[420px] object-contain drop-shadow-[0_20px_50px_rgba(134,91,255,0.35)] animate-ve-float-knight">
                </div>
            </div>

            <!-- Form Card (Right) -->
            <div class="lg:col-span-7 bg-white/[0.02] border border-white/5 p-8 md:p-12 rounded-[2.5rem] shadow-2xl backdrop-blur-3xl">
                <div class="space-y-8">
                    <div class="text-left space-y-3">
                        <h2 class="text-3xl md:text-4xl font-black uppercase font-headline tracking-tighter">FORMULARIO DE REGISTRO</h2>
                        <div class="w-16 h-1 bg-[#865BFF] rounded-full"></div>
                    </div>

                    <form id="veRegistrationForm" class="space-y-6 text-left">
                        <input type="hidden" name="partnerId" value="${partnerId}">
                        <input type="hidden" name="landingSlug" value="${brand.slug || 'vip-event'}">
                        
                        <!-- Nombre -->
                        <div>
                            <label class="block text-[10px] font-black uppercase text-white/40 tracking-widest mb-2.5">Nombre completo *</label>
                            <input type="text" name="name" required placeholder="Ingresa tu nombre completo" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4.5 text-white text-sm focus:outline-none focus:border-[#865BFF] transition-all placeholder:text-white/20">
                        </div>

                        <!-- Email -->
                        <div>
                            <label class="block text-[10px] font-black uppercase text-white/40 tracking-widest mb-2.5">Correo electrónico *</label>
                            <input type="email" name="email" required placeholder="Ejemplo: nombre@dominio.com" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4.5 text-white text-sm focus:outline-none focus:border-[#865BFF] transition-all placeholder:text-white/20">
                        </div>

                        <!-- Celular -->
                        <div>
                            <label class="block text-[10px] font-black uppercase text-white/40 tracking-widest mb-2.5">Número de teléfono *</label>
                            <input type="tel" name="whatsapp" required placeholder="Ejemplo: +34 123 456 789" 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4.5 text-white text-sm focus:outline-none focus:border-[#865BFF] transition-all placeholder:text-white/20">
                        </div>

                        <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <!-- Motivo Dropdown -->
                            <div>
                                <label class="block text-[10px] font-black uppercase text-white/40 tracking-widest mb-2.5">Motivo del contacto *</label>
                                <select name="motivo" required 
                                    class="w-full bg-[#0d0723] border border-white/10 rounded-2xl px-6 py-4.5 text-white text-sm focus:outline-none focus:border-[#865BFF] transition-all">
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    <option value="evento_presencial">Asistir al Evento Presencial</option>
                                    <option value="streaming">Acceso a Streaming</option>
                                    <option value="informacion">Recibir Información Comercial</option>
                                </select>
                            </div>

                            <!-- Interes Dropdown -->
                            <div>
                                <label class="block text-[10px] font-black uppercase text-white/40 tracking-widest mb-2.5">¿Qué te interesa más? *</label>
                                <select name="interes" required 
                                    class="w-full bg-[#0d0723] border border-white/10 rounded-2xl px-6 py-4.5 text-white text-sm focus:outline-none focus:border-[#865BFF] transition-all">
                                    <option value="" disabled selected>Selecciona una opción</option>
                                    <option value="cuentas_fondeadas">Cuentas Fondeadas</option>
                                    <option value="copy_trading">Copy Trading</option>
                                    <option value="cuentas_mam">Cuentas PAMM / MAM</option>
                                    <option value="leverage">Apalancamiento PRO x12</option>
                                </select>
                            </div>
                        </div>

                        <!-- Mensaje -->
                        <div>
                            <label class="block text-[10px] font-black uppercase text-white/40 tracking-widest mb-2.5">Mensaje *</label>
                            <textarea name="mensaje" rows="4" placeholder="Escribe tu mensaje aquí..." required 
                                class="w-full bg-white/5 border border-white/10 rounded-2xl px-6 py-4.5 text-white text-sm focus:outline-none focus:border-[#865BFF] transition-all placeholder:text-white/20 resize-none"></textarea>
                        </div>

                        <!-- Submit -->
                        <div>
                            <button type="submit" id="veSubmitBtn" class="w-full py-5 bg-gradient-to-r from-[#865BFF] to-[#6c40e6] text-white font-black text-xs uppercase tracking-widest rounded-2xl hover:scale-[1.01] transition-transform shadow-[0_15px_30px_rgba(134,91,255,0.2)]">
                                Enviar formulario
                            </button>
                        </div>

                        <div id="veFormMessage"></div>
                    </form>
                </div>
            </div>

        </div>

        <style>
            @keyframes ve-float-knight {
                0%, 100% { transform: translateY(0px) scale(1) rotate(0deg); }
                50% { transform: translateY(-10px) scale(1.01) rotate(-1deg); }
            }
            .animate-ve-float-knight {
                animation: ve-float-knight 9s ease-in-out infinite;
            }
        </style>
        
        <script>
            document.getElementById("veRegistrationForm").addEventListener("submit", async function(e) {
                e.preventDefault();
                const btn = document.getElementById("veSubmitBtn");
                const msg = document.getElementById("veFormMessage");
                const formData = new FormData(this);
                const data = Object.fromEntries(formData.entries());
                
                btn.disabled = true;
                btn.textContent = "ENVIANDO...";
                
                try {
                    const res = await fetch("/api/leads", {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({
                            name: data.name,
                            email: data.email,
                            whatsapp: data.whatsapp,
                            landingSlug: data.landingSlug,
                            partnerId: data.partnerId,
                            status: "registered"
                        })
                    });
                    
                    const resJson = await res.json();
                    if (resJson.success) {
                        btn.style.background = "#10b981";
                        btn.textContent = "¡ENVIADO CON ÉXITO!";
                        msg.innerHTML = '<div class="bg-green-500/10 text-green-500 border border-green-500/20 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest mt-4 text-center">¡Registro completado! Nos pondremos en contacto contigo a la brevedad.</div>';
                        this.reset();
                    } else {
                        throw new Error();
                    }
                } catch(err) {
                    btn.disabled = false;
                    btn.textContent = "Enviar formulario";
                    msg.innerHTML = '<div class="bg-red-500/10 text-red-500 border border-red-500/20 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest mt-4 text-center">Error al procesar el envío. Por favor, reintente.</div>';
                }
            });
        </script>
    </section>
    `;
}

export function renderVEFooter(content: Record<string, any>, brand: BrandConfig): string {
    return `
    <footer class="py-16 px-6 bg-[#04010a] border-t border-white/5 text-center text-white relative z-20">
        <div class="max-w-7xl mx-auto space-y-8 flex flex-col items-center">
            <!-- Logo -->
            <div class="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-2.5 rounded-2xl">
                <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" class="h-6 object-contain">
            </div>

            <!-- Social Media Links -->
            <div class="flex gap-4">
                <a href="${brand.instagram || '#'}" target="_blank" class="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-[#865BFF]/15 hover:border-[#865BFF]/30 transition-all text-white/50 hover:text-white">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
                </a>
                <a href="${brand.tiktok || '#'}" target="_blank" class="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-[#865BFF]/15 hover:border-[#865BFF]/30 transition-all text-white/50 hover:text-white">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M12.525.02c1.31-.03 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.17-2.89-.74-3.94-1.78-.22-.22-.41-.47-.59-.73v7.02c0 3.82-3.14 7.23-7.05 7.49-3.68.25-7.23-2.15-7.79-5.78-.65-4.21 2.37-8.15 6.53-8.52.79-.07 1.58-.02 2.35.13v4.13c-.63-.26-1.34-.37-2.03-.29-2.07.23-3.67 2.19-3.41 4.26.23 1.83 1.93 3.19 3.77 2.99 1.74-.19 3.03-1.69 2.97-3.43V0c-.01.01-.01.02 0 .02z"/></svg>
                </a>
                <a href="#" target="_blank" class="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-[#865BFF]/15 hover:border-[#865BFF]/30 transition-all text-white/50 hover:text-white">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/></svg>
                </a>
                <a href="${brand.youtube || '#'}" target="_blank" class="w-11 h-11 rounded-xl bg-white/[0.03] border border-white/5 flex items-center justify-center hover:bg-[#865BFF]/15 hover:border-[#865BFF]/30 transition-all text-white/50 hover:text-white">
                    <svg class="w-5 h-5 fill-current" viewBox="0 0 24 24"><path d="M23.498 6.163a3.003 3.003 0 00-2.11-2.11C19.517 3.545 12 3.545 12 3.545s-7.517 0-9.388.508a3.003 3.003 0 00-2.11 2.11C0 8.033 0 12 0 12s0 3.967.502 5.837a3.003 3.003 0 002.11 2.11c1.871.508 9.388.508 9.388.508s7.517 0 9.388-.508a3.003 3.003 0 002.11-2.11C24 15.967 24 12 24 12s0-3.967-.502-5.837zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
                </a>
            </div>
            
            <p class="text-[9px] font-black uppercase text-white/20 tracking-wider">
                © ${new Date().getFullYear()} Bridge Markets Global Limited. Partner Oficial: ${brand.fullName || 'Introducing Broker'}
            </p>
        </div>
    </footer>
    `;
}
