import { LANDING_TEMPLATES } from '../landing-templates';
import { SECTION_RENDERERS } from './renderers';
import { BrandConfig } from './types';
import { DEFAULT_SECTIONS, SECTION_LABELS, TRANSLATIONS, SectionConfig, ContentOverrides, LandingConfig, ModularConfig, LandingData } from './dictionary';

export function generateLandingHTML(data: LandingData): string {
    const t = TRANSLATIONS[data.language] || TRANSLATIONS['ES'];
    const cfg = data.config || { enabledSections: DEFAULT_SECTIONS, content: {} };
    const sections = cfg.enabledSections || DEFAULT_SECTIONS;
    const content = cfg.content || {};

    const gaScript = data.googleAnalyticsId ? `
    <script async src="https://www.googletagmanager.com/gtag/js?id=${data.googleAnalyticsId}"></script>
    <script>window.dataLayer=window.dataLayer||[];function gtag(){dataLayer.push(arguments);}gtag('js',new Date());gtag('config','${data.googleAnalyticsId}');</script>` : '';

    const wa = data.whatsapp ? 'https://wa.me/' + data.whatsapp.replace(/[^0-9]/g, '') : '#';

    // Content with overrides
    const heroTitle = content.heroTitle || t.heroTitle;
    const heroHighlight = content.heroHighlight || t.heroHighlight;
    const heroSub = content.heroSub || t.heroSub;
    const benefits = content.benefitsItems && content.benefitsItems.length > 0 ? content.benefitsItems : t.chessBenefits;
    const stepsItems = content.stepsItems && content.stepsItems.length > 0 ? content.stepsItems : t.chessSteps.steps;
    const accountsItems = content.accountsItems && content.accountsItems.length > 0 ? content.accountsItems : t.chessAccounts;
    const servicesItems = content.servicesItems && content.servicesItems.length > 0 ? content.servicesItems : t.servicesGrid;
    const whyCards = content.whyBridgeCards && content.whyBridgeCards.length > 0 ? content.whyBridgeCards : t.whyBridge.cards;
    const whyInfo = content.whyBridgeInfo && content.whyBridgeInfo.length > 0 ? content.whyBridgeInfo : t.whyBridge.info;
    const fctaTitle = content.finalCTATitle || t.finalCTA.title;
    const fctaDesc = content.finalCTADesc || t.finalCTA.desc;
    const fctaBtn = content.finalCTABtn || t.finalCTA.btn;
    const formTitle = content.formTitle || t.formTitle;
    const formSub = content.formSub || t.formSub;

    // Account Cards Builder
    const accountsHTML = sections.accounts ? accountsItems.map((a, i) => {
        const isRight = i === 2; 
        const isWide = i >= 3; 
        
        if (isWide) {
            const isReverse = i === 4; 
            return `
                <article class="reveal bg-[#000000] text-white rounded-[2.5rem] p-8 md:p-12 flex flex-col md:flex-row items-center relative min-h-[320px] overflow-hidden group shadow-2xl border border-white/5">
                    <div class="absolute inset-y-0 ${isReverse ? 'right-0' : 'left-0'} w-1/2 flex items-center transform group-hover:${isReverse ? 'translate-x-4' : '-translate-x-4'} transition duration-700 pointer-events-none z-0">
                        <img src="${a.img}" alt="${a.title}" class="w-full h-full object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.1)] mix-blend-screen">
                    </div>
                    <div class="md:${isReverse ? 'mr-auto' : 'ml-auto'} md:w-1/2 relative z-10 space-y-6">
                        <h3 class="text-4xl font-bold leading-tight">${a.title.split(' ').join('<br>')}</h3>
                        <p class="text-xs text-gray-400 leading-relaxed font-light">${a.desc}</p>
                        <button class="btn-purple text-white w-full py-4 rounded-2xl font-bold text-sm" onclick="location.href='#registro'">${a.btn}</button>
                    </div>
                </article>`;
        }

        return `
                <article class="reveal bg-[#000000] text-white rounded-[2.5rem] p-8 md:p-10 flex flex-col justify-end relative h-[450px] overflow-hidden group shadow-2xl border border-white/5" ${i > 0 ? `style="transition-delay: ${i * 100}ms;"` : ''}>
                    <div class="absolute ${i === 1 ? 'inset-0 flex justify-center items-start pt-4' : i === 2 ? '-top-10 -right-10' : '-top-10 -left-10'} w-full h-full transform group-hover:scale-110 transition duration-700 pointer-events-none">
                        <img src="${a.img}" alt="${a.title}" class="${i === 1 ? 'w-full h-2/3' : 'w-2/3 h-2/3'} object-contain drop-shadow-[0_20px_50px_rgba(255,255,255,0.15)] mix-blend-screen">
                    </div>
                    <div class="relative z-10 space-y-4">
                        <h3 class="text-3xl font-bold uppercase tracking-tighter leading-none ${isRight ? 'text-right md:text-left' : ''}">${a.title.split(' ').join('<br>')}</h3>
                        <p class="text-[10px] text-gray-400 leading-relaxed font-light line-clamp-3 ${isRight ? 'md:text-left text-right' : ''}">${a.desc}</p>
                        <button class="btn-purple text-white w-full py-4 rounded-2xl font-bold text-sm" onclick="location.href='#registro'">${a.btn}</button>
                    </div>
                </article>`;
    }).join('') : '';

    // Form Logic
    const formScript = `
        document.getElementById("leadForm").addEventListener("submit",async function(e){
            e.preventDefault();
            var btn=document.getElementById("submitBtn");
            var msg=document.getElementById("formMessage");
            var fields=document.querySelectorAll(".lead-input");
            btn.disabled=true; btn.textContent="Enviando...";
            try{
                var res=await fetch("/api/leads",{
                    method:"POST",
                    headers:{"Content-Type":"application/json"},
                    body:JSON.stringify({
                        name:fields[0].value,
                        email:fields[1].value,
                        whatsapp:fields[2].value,
                        landingSlug:"${data.slug}",
                        partnerId:"${data.partnerId}"
                    })
                });
                var resData=await res.json();
                if(resData.success){
                    msg.innerHTML="<div class='bg-green-100 text-green-700 p-4 rounded-xl font-bold mt-4'>¡Gracias! Te contactaremos pronto.</div>";
                    document.getElementById("leadForm").reset();
                    btn.textContent="Enviado";
                }else{ throw new Error(); }
            }catch(err){
                msg.innerHTML="<div class='bg-red-100 text-red-700 p-4 rounded-xl font-bold mt-4'>Error al enviar. Intenta de nuevo.</div>";
                btn.disabled=false; btn.textContent="${t.submit}";
            }
        });`;

    // ─── Build Sections ─────────────────────────────────────
    const heroSection = sections.hero ? `
        <section id="social-trading" class="reveal">
            <div class="text-center mb-16">
                <h1 class="text-4xl md:text-7xl font-extrabold mb-6 text-brand-dark tracking-tight">
                    ${heroTitle} <span class="text-brand-purple">${heroHighlight}</span> ${data.language === 'ES' ? 'ahora!' : 'now!'}
                </h1>
                <p class="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">${heroSub}</p>
            </div>
        </section>` : '';

    const benefitsSection = sections.benefits ? `
        <section class="reveal">
            <div class="bg-brand-dark rounded-[3rem] p-8 md:p-16 shadow-[0_20px_50px_rgba(10,5,26,0.3)] relative overflow-hidden">
                <div class="absolute -top-24 -right-24 w-64 h-64 bg-brand-purple opacity-20 blur-[100px]"></div>
                <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20 relative z-10">
                    ${benefits.map(b => `
                        <article class="bg-white rounded-[2rem] p-6 flex items-center gap-5 shadow-xl hover:scale-105 transition duration-300">
                            <div class="bg-brand-dark rounded-2xl w-14 h-14 flex items-center justify-center flex-shrink-0 text-brand-purple text-2xl shadow-lg"><span class="material-symbols-outlined">${b.icon}</span></div>
                            <div>
                                <h4 class="font-bold text-brand-dark text-sm">${b.title}</h4>
                                <p class="text-[10px] text-gray-500 mt-1">${b.desc}</p>
                            </div>
                        </article>
                    `).join('')}
                </div>
                ${sections.steps ? `
                <div class="flex flex-col lg:flex-row gap-16 relative z-10 items-center">
                    <div class="lg:w-1/2">
                        <h2 class="text-4xl md:text-5xl font-light text-gray-300 leading-tight">
                            ${t.chessSteps.title}<br>
                            <span class="text-white font-bold block mt-2">${t.chessSteps.subtitle}</span>
                        </h2>
                        <p class="text-gray-400 mt-6 text-sm">Partner: ${data.fullName} · ${data.country}</p>
                    </div>
                    <div class="lg:w-1/2 space-y-4">
                        ${stepsItems.map(s => `
                            <div class="bg-brand-stepBg/50 border border-white/5 rounded-2xl p-5 flex items-center gap-5">
                                <div class="bg-white text-brand-purple font-black text-xl rounded-xl w-12 h-12 flex items-center justify-center flex-shrink-0">${s.num}</div>
                                <div>
                                    <h4 class="text-white text-sm font-semibold">${s.text}</h4>
                                    ${s.link ? `<span class="text-brand-accent text-xs mt-1 block">${s.link}</span>` : ''}
                                </div>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
            </div>
        </section>` : '';

    const accountsSection = sections.accounts ? `
        <section id="cuentas" class="space-y-8">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">${accountsHTML}</div>
        </section>` : '';

    const servicesSection = sections.services ? `
        <section class="reveal bg-transparent p-10 md:p-20 border-y border-purple-50">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                ${servicesItems.map(s => `
                    <article>
                        <div class="text-brand-purple text-4xl mb-6 flex justify-center md:justify-start"><span class="material-symbols-outlined text-4xl">${s.icon}</span></div>
                        <h3 class="font-bold text-xl text-brand-dark mb-3">${s.title}</h3>
                        <p class="text-sm text-gray-500 mb-8 leading-relaxed">${s.desc}</p>
                        <button class="bg-brand-dark text-white px-8 py-3 rounded-2xl text-xs font-bold hover:bg-brand-purple transition-all w-full md:w-auto" onclick="location.href='#registro'">${s.btn}</button>
                    </article>
                `).join('')}
            </div>
        </section>` : '';

    const whyBridgeSection = sections.whyBridge ? `
        <section id="ib-program" class="py-12 reveal">
            <h2 class="text-4xl md:text-5xl font-black text-center mb-16 text-brand-dark">
                ${t.whyBridge.title.split('Bridge')[0]} <span class="text-brand-purple">Bridge Markets?</span>
            </h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                ${whyCards.map(c => `
                    <article class="bg-white/40 backdrop-blur-md border border-white/50 rounded-3xl p-8 flex gap-6 items-start shadow-sm hover:shadow-xl hover:border-brand-purple/20 transition duration-300">
                        <div class="bg-brand-dark text-white p-4 rounded-2xl text-xl shadow-lg"><span class="material-symbols-outlined">${c.icon}</span></div>
                        <div>
                            <h3 class="font-bold text-lg text-brand-dark mb-2">${c.title}</h3>
                            <p class="text-sm text-gray-500 leading-relaxed">${c.desc}</p>
                        </div>
                    </article>
                `).join('')}
            </div>
            <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                ${whyInfo.map(i => `
                    <article class="${i.variant === 'purple' ? 'bg-brand-purple text-white' : i.variant === 'dark' ? 'bg-brand-dark text-white' : 'bg-white/40 backdrop-blur-md border border-white/50'} rounded-3xl p-8 shadow-lg text-center flex flex-col items-center hover:-translate-y-2 transition duration-300">
                        <div class="${i.variant ? 'bg-white/20' : 'bg-purple-100'} text-brand-purple p-4 rounded-full mb-6 ${i.variant ? 'text-white' : ''}"><span class="material-symbols-outlined">${i.icon}</span></div>
                        <h3 class="font-bold text-sm mb-3">${i.title}</h3>
                        <p class="text-xs ${i.variant ? 'text-purple-100' : 'text-gray-400'}">${i.desc}</p>
                    </article>
                `).join('')}
            </div>
        </section>` : '';

    const finalCTASection = sections.finalCTA ? `
        <section class="reveal bg-brand-purple rounded-[3rem] p-12 md:p-24 shadow-2xl relative overflow-hidden flex flex-col lg:flex-row items-center justify-between text-center lg:text-left gap-10">
            <div class="absolute right-0 bottom-0 opacity-10 pointer-events-none">
                <svg width="600" height="400" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M0 300L50 200L150 250L250 100L400 150V300H0Z" fill="white"/></svg>
            </div>
            <div class="relative z-10 lg:w-2/3">
                <h2 class="text-4xl md:text-6xl font-black text-white mb-6 leading-tight">${fctaTitle}</h2>
                <p class="text-purple-100 text-lg mb-10 font-light">${fctaDesc}</p>
                <a href="#registro" class="bg-white text-brand-purple font-extrabold py-5 px-12 rounded-2xl shadow-2xl hover:bg-gray-50 transform hover:scale-105 transition-all text-lg inline-block">${fctaBtn}</a>
            </div>
        </section>` : '';

    const registrationSection = sections.registration ? `
        <section id="registro" class="reveal bg-transparent p-10 md:p-24 flex flex-col lg:flex-row items-center gap-20 border-t border-purple-50">
            <div class="lg:w-1/2">
                <h2 class="text-4xl md:text-6xl font-black text-brand-dark mb-8 leading-tight">
                    ${t.finalInfo.title.split('referiendo')[0]} <span class="text-brand-purple">Éxito</span>
                </h2>
                <div class="space-y-6">
                    <p class="text-base text-gray-600 leading-relaxed font-medium">${t.finalInfo.desc}</p>
                    <p class="text-xs text-gray-400 leading-relaxed italic border-l-4 border-brand-purple pl-4">${t.finalInfo.quote}</p>
                    <div class="mt-10 p-8 bg-white rounded-3xl shadow-xl border border-purple-50">
                        <h4 class="font-bold text-xl mb-2 text-brand-dark">${formTitle}</h4>
                        <p class="text-sm text-gray-400 mb-6">${formSub}</p>
                        <form id="leadForm" class="space-y-4">
                            ${t.fields.map((f, idx) => `
                                <div>
                                    <label class="block text-xs font-bold text-gray-400 uppercase mb-2">${f}</label>
                                    <input type="${idx === 1 ? 'email' : idx === 2 ? 'tel' : 'text'}" required class="lead-input w-full bg-gray-50 border border-gray-100 rounded-xl p-4 outline-none focus:border-brand-purple transition" placeholder="${f}">
                                </div>
                            `).join('')}
                            <button type="submit" id="submitBtn" class="btn-purple text-white w-full py-5 rounded-xl font-bold text-lg">${t.submit}</button>
                            <div id="formMessage"></div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="lg:w-1/2 flex justify-center relative group">
                <div class="absolute w-80 h-80 bg-brand-purple/10 rounded-full blur-[100px] -z-10 group-hover:bg-brand-purple/20 transition duration-500"></div>
                <img src="/images/imagenes%20nuevas/reloj%20rosa.png" alt="Efectividad" class="w-full max-w-md object-contain drop-shadow-2xl transform group-hover:rotate-6 transition duration-700">
            </div>
        </section>` : '';

    return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}" class="scroll-smooth">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bridge Markets | ${t.chessTitle}</title>
    <meta name="description" content="${heroSub}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />${gaScript}
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Poppins', 'sans-serif'] },
                    colors: {
                        brand: { dark: '#0A051A', purple: '#6D28D9', stepBg: '#2D1B5E', accent: '#8B5CF6' }
                    }
                }
            }
        }
    </script>
    <style>
        body {
            background: linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #F8FAFC 100%);
            background-attachment: fixed; min-height: 100vh;
        }
        
        /* Overrides para evitar cortes */
        section { background: transparent !important; border: none !important; box-shadow: none !important; }

        .btn-purple { background: linear-gradient(90deg, #6D28D9 0%, #8B5CF6 100%); transition: all 0.4s; }
        .btn-purple:hover { transform: translateY(-3px); box-shadow: 0 10px 25px rgba(109, 40, 217, 0.3); }
        
        .reveal { transition: all 0.8s ease-out; }
        .js-enabled .reveal:not(.active) { opacity: 0; transform: translateY(30px); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        .glass { background: rgba(255, 255, 255, 0.6); backdrop-filter: blur(10px); }
    </style>
</head>
<body class="font-sans text-gray-800 antialiased">
    <script>document.body.classList.add('js-enabled');</script>
    <header class="fixed top-0 w-full z-50 px-6 py-4 glass border-b border-purple-50">
        <div class="max-w-7xl mx-auto flex justify-between items-center">
            <div class="flex items-center gap-2">
                <div class="w-8 h-8 bg-brand-purple rounded-lg flex items-center justify-center text-white font-bold">B</div>
                <span class="text-xl font-extrabold tracking-tighter text-brand-dark">BRIDGE <span class="text-brand-purple">MARKETS</span></span>
            </div>
            <nav class="hidden md:flex gap-8 text-sm font-semibold">
                ${sections.hero ? '<a href="#social-trading" class="hover:text-brand-purple transition">Social Trading</a>' : ''}
                ${sections.accounts ? '<a href="#cuentas" class="hover:text-brand-purple transition">Cuentas</a>' : ''}
                ${sections.whyBridge ? '<a href="#ib-program" class="hover:text-brand-purple transition">Programa IB</a>' : ''}
            </nav>
            <a href="#registro" class="bg-brand-dark text-white px-6 py-2 rounded-full text-sm font-bold hover:bg-brand-purple transition-all">${t.cta}</a>
        </div>
    </header>

    <main class="max-w-7xl mx-auto px-4 sm:px-6 pt-32 pb-16 space-y-24">
        ${heroSection}
        ${benefitsSection}
        ${accountsSection}
        ${servicesSection}
        ${whyBridgeSection}
        ${finalCTASection}
        ${registrationSection}
    </main>

    <footer class="bg-brand-dark text-white pt-24 pb-12 mt-24">
        <div class="max-w-7xl mx-auto px-6">
            <div class="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                <div class="md:col-span-2">
                    <div class="flex items-center gap-2 mb-6 text-2xl font-black">
                        <div class="w-10 h-10 bg-brand-purple rounded-xl flex items-center justify-center text-white">B</div>
                        <span>BRIDGE MARKETS</span>
                    </div>
                    <p class="text-gray-400 text-sm max-w-sm mb-8 leading-relaxed">${t.footerText}</p>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-brand-accent uppercase tracking-widest text-xs">Empresa</h4>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Sobre Nosotros</a></li>
                        <li><a href="#" class="hover:text-white transition">Contacto</a></li>
                        <li><a href="#" class="hover:text-white transition">Regulación</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="font-bold mb-6 text-brand-accent uppercase tracking-widest text-xs">Legal</h4>
                    <ul class="space-y-4 text-sm text-gray-400">
                        <li><a href="#" class="hover:text-white transition">Términos y Condiciones</a></li>
                        <li><a href="#" class="hover:text-white transition">Aviso de Riesgo</a></li>
                        <li><a href="#" class="hover:text-white transition">Política de Privacidad</a></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
                <p class="text-xs text-gray-500">&copy; 2026 Bridge Markets. Todos los derechos reservados.</p>
                <div class="flex gap-6">
                    <a href="${wa}" target="_blank" class="text-gray-500 hover:text-white transition">Contact Partner</a>
                    <a href="#" class="text-gray-500 hover:text-white transition">Instagram</a>
                </div>
            </div>
        </div>
    </footer>

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            const reveals = document.querySelectorAll('.reveal');
            const revealOnScroll = new IntersectionObserver((entries, observer) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('active');
                        observer.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            reveals.forEach(reveal => revealOnScroll.observe(reveal));
        });
        ${sections.registration ? formScript : ''}
    </script>
</body>
</html>`;
}


export function downloadLandingHTML(html: string, filename: string) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function openLandingPreview(html: string) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    window.open(URL.createObjectURL(blob), '_blank');
}

// ─── MODULAR GENERATOR ──────────────────────────────────────
// Assembles sections from the catalog to create a full landing page
import { getTemplateById } from '../landing-templates';


function getSharedHead(title: string, desc: string, language: string) {
    return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bridge Markets | ${title}</title>
    <meta name="description" content="${desc}">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0" />
    <script>
        tailwind.config = {
            theme: {
                extend: {
                    fontFamily: { sans: ['Poppins', 'sans-serif'] },
                    colors: {
                        brand: { dark: '#0A051A', purple: '#6D28D9', stepBg: '#2D1B5E', accent: '#8B5CF6' }
                    }
                }
            }
        }
    </script>`;
}

function getSharedStyles(theme: 'light' | 'dark' = 'dark') {
    const isDark = theme === 'dark';
    const bgGradient = isDark 
        ? "linear-gradient(135deg, #0A051A 0%, #170B3B 50%, #0A051A 100%)"
        : "linear-gradient(135deg, #F8FAFC 0%, #E2E8F0 50%, #F8FAFC 100%)";
    const textColor = isDark ? "#FFFFFF" : "#0F172A";

    return `
    <style>
        body { 
            background: ${bgGradient};
            background-attachment: fixed;
            color: ${textColor}; 
            font-family: 'Poppins', sans-serif; 
            overflow-x: hidden; 
        }
        /* Overlapping Sections System to avoid hard cuts */
        .section-wrapper { 
            position: relative;
            z-index: 10;
        }
        
        /* Force transparent backgrounds to avoid cuts */
        section, .bg-brand-dark, .bg-\\[\\#0B061A\\], .bg-\\[\\#000000\\] {
            background-color: transparent !important;
            border-color: transparent !important;
            box-shadow: none !important;
        }

        /* Glassmorphism System */
        .glass-panel { 
            background: ${isDark ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.6)'} !important; 
            backdrop-filter: blur(24px) !important; 
            -webkit-backdrop-filter: blur(24px) !important;
            border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(255, 255, 255, 0.4)'} !important;
            box-shadow: ${isDark ? '0 30px 60px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255,255,255,0.1)' : '0 30px 60px rgba(0, 0, 0, 0.05), inset 0 1px 0 rgba(255,255,255,1)'} !important; 
        }
        .glass { 
            background: ${isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(255, 255, 255, 0.4)'} !important; 
            backdrop-filter: blur(12px) !important; 
            -webkit-backdrop-filter: blur(12px) !important;
            border: 1px solid ${isDark ? 'rgba(255, 255, 255, 0.04)' : 'rgba(255, 255, 255, 0.3)'} !important;
            box-shadow: ${isDark ? '0 10px 30px rgba(0, 0, 0, 0.2)' : '0 10px 30px rgba(0, 0, 0, 0.05)'} !important;
        }
        
        .reveal { transition: all 0.8s cubic-bezier(0.16, 1, 0.3, 1); }
        .js-enabled .reveal:not(.active) { opacity: 0; transform: translateY(40px); }
        .reveal.active { opacity: 1; transform: translateY(0); }
        
        .btn-purple { 
            background: linear-gradient(135deg, #6D28D9 0%, #8B5CF6 100%) !important; 
            transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1) !important; 
            box-shadow: 0 15px 30px rgba(109, 40, 217, 0.2), inset 0 1px 0 rgba(255,255,255,0.2) !important;
            color: white !important;
        }
        .btn-purple:hover { 
            transform: translateY(-4px) scale(1.02) !important; 
            box-shadow: 0 20px 40px rgba(109, 40, 217, 0.4), inset 0 1px 0 rgba(255,255,255,0.3) !important; 
        }
        
        /* Overrides para evitar bordes o cajas duras que corten */
        .bg-white, .bg-\\[\\#F8FAFC\\], .bg-slate-50 { background-color: transparent !important; }
        ` + (isDark ? `
        .bg-white\\/5 { background: rgba(255,255,255,0.02) !important; }
        .text-slate-800, .text-\\[\\#140633\\], .text-brand-dark { color: #FFFFFF !important; }
        ` : `
        .text-white { color: #0f172a !important; }
        .text-white\\/60 { color: rgba(15, 23, 42, 0.6) !important; }
        .text-white\\/40 { color: rgba(15, 23, 42, 0.4) !important; }
        .bg-white\\/5 { background: rgba(255,255,255,0.6) !important; border: 1px solid rgba(0,0,0,0.05) !important; color: #0f172a !important; }
        `) + `
        
        /* Force spacing to look complete and organized */
        .section-wrapper {
            padding: 2rem 0 !important;
        }
    </style>`;
}

export function generateModularLandingHTML(data: LandingData): string {
    const modConf = data.modularConfig;
    if (!modConf) return generateLandingHTML(data); // fallback to legacy

    const template = getTemplateById(modConf.templateId);
    const sectionIds = modConf.selectedSections.length > 0
        ? modConf.selectedSections
        : (template?.sections || ['hero_dark', 'stats_row']);

    const brandConfig: BrandConfig = {
        fullName: data.fullName,
        whatsapp: data.whatsapp,
        email: data.email,
        partnerId: data.partnerId,
        language: data.language,
        communityName: data.communityName,
        heroPhrase: data.heroPhrase,
        instagram: data.instagram,
        telegram: data.telegram,
        tiktok: data.tiktok,
        ctaLink: data.ctaLink,
    };

    const theme = template?.theme || 'dark';
    const isLight = theme === 'light';

    // Render each section wrapped in the overlap system
    const sectionsHtml = sectionIds
        .map((sId: string, idx: number) => {
            const renderer = SECTION_RENDERERS[sId];
            if (!renderer) return `<!-- Section "${sId}" not found -->`;
            const overrides = modConf.sectionOverrides[sId] || {};
            const sectionHtml = renderer(overrides, brandConfig);
            return `<div class="section-wrapper">\n${sectionHtml}\n</div>`;
        })
        .join('\n');

    // Registration form
    const formHtml = `
    <section id="register" class="py-24 px-8 relative" style="background: transparent;">
        <div class="max-w-xl mx-auto glass-panel rounded-[3rem] p-12 md:p-16 relative section-reveal shadow-2xl">
            <div class="text-center mb-10">
                <h2 class="text-3xl font-extrabold font-headline text-white mb-3">${data.language === 'ES' ? 'Abrir Cuenta' : 'Open Account'}</h2>
                <p class="text-white/60 text-sm">${brandConfig.communityName ? `Únete a ${brandConfig.communityName}` : 'Empieza tu camino en Bridge Markets'}</p>
            </div>
            <form id="landing-form" class="space-y-6" onsubmit="return false;">
                <input type="hidden" name="partner_id" value="${data.partnerId}" />
                <div>
                    <label class="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">${data.language === 'ES' ? 'Nombre Completo' : 'Full Name'}</label>
                    <input name="name" type="text" class="w-full bg-white/5 border-white/10 text-white border rounded-xl p-4 placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors focus:bg-white/10" placeholder="John Doe" required />
                </div>
                <div>
                    <label class="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">${data.language === 'ES' ? 'Correo Electrónico' : 'Email'}</label>
                    <input name="email" type="email" class="w-full bg-white/5 border-white/10 text-white border rounded-xl p-4 placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors focus:bg-white/10" placeholder="john@example.com" required />
                </div>
                <div>
                    <label class="text-[10px] font-bold text-white/40 uppercase tracking-widest block mb-2">${data.language === 'ES' ? 'WhatsApp / Teléfono' : 'Phone'}</label>
                    <input name="phone" type="tel" class="w-full bg-white/5 border-white/10 text-white border rounded-xl p-4 placeholder:text-gray-300 focus:outline-none focus:border-primary transition-colors focus:bg-white/10" placeholder="+1 234 567 8900" required />
                </div>
                <button type="submit" class="w-full py-5 bg-primary hover:bg-primary/90 text-white font-bold rounded-xl shadow-lg shadow-primary/20 transition-all hover:scale-[1.02] active:scale-95 text-lg">${data.language === 'ES' ? 'Crear Cuenta Ahora' : 'Create Account Now'}</button>
                <p class="text-[10px] text-white/30 text-center italic mt-4">${data.language === 'ES' ? '* El trading implica riesgos. Invierte solo capital que puedas permitirte perder.' : 'Trading involves risk. Only invest capital you can afford to lose.'}</p>
            </form>
        </div>
    </section>`;

    // Footer
    const footerHtml = `
    <footer class="border-t border-white/5 pt-20 pb-12 bg-transparent text-white">
        <div class="max-w-7xl mx-auto px-8 flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
            <div class="max-w-xs">
                <div class="text-2xl font-bold font-headline mb-6 text-white">Bridge <span class="text-primary">Markets</span></div>
                <p class="text-white/40 text-sm leading-relaxed">The global standard for transparent, institutional-grade social trading and fund management.</p>
            </div>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-12 text-sm font-medium">
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Platform</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Copy Trading</a>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">MAM Engine</a>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Company</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">About</a>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Security</a>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Support</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Knowledge Base</a>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Contact</a>
                </div>
                <div class="flex flex-col gap-4">
                    <p class="text-white/20 uppercase tracking-widest text-[10px] font-black mb-2">Legal</p>
                    <a class="text-white/60 hover:text-accent transition-colors" href="#">Privacy</a>
                </div>
            </div>
        </div>
        <div class="max-w-7xl mx-auto px-8 text-center text-[10px] text-white/10 leading-relaxed border-t border-white/5 pt-12">
            High-Risk Investment Warning: Trading in financial markets involves significant risk. Leverage can work against you as well as for you. Past performance is not indicative of future results. Only invest capital you can afford to lose.
            <br>© ${new Date().getFullYear()} Bridge Markets Global Limited. Partner: ${data.partnerId}
        </div>
    </footer>`;

    return `<!DOCTYPE html>
<html lang="${data.language === 'ES' ? 'es' : data.language === 'BR' ? 'pt' : 'en'}">
<head>
    <meta charset="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Bridge Markets | ${template?.name || 'Trading Platform'}</title>
    ${getSharedHead(template?.name || 'Trading Platform', 'Access institutional markets', data.language)}
    <style>
        body { font-family: 'Inter', sans-serif; margin: 0; overflow-x: hidden; background: transparent; }
        ${getSharedStyles(theme)}
    </style>
</head>
<body class="bg-transparent text-white">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-[100] px-6 py-4">
        <div class="max-w-7xl mx-auto flex justify-between items-center bg-white/5 backdrop-blur-xl border border-white/10 shadow-2xl rounded-full px-8 h-16">
            <div class="text-xl font-bold tracking-tighter text-white font-headline">Bridge <span class="text-primary">Markets</span></div>
            <div class="hidden md:flex items-center gap-10 text-sm font-semibold">
                <a class="text-white/60 hover:text-primary transition-all" href="#">Platform</a>
                <a class="text-white/60 hover:text-primary transition-all" href="#">Security</a>
                <a class="text-white/60 hover:text-primary transition-all" href="#">Pricing</a>
            </div>
            <div class="flex items-center gap-4">
                <a href="#register" class="bg-primary px-6 py-2.5 rounded-full text-white text-sm font-bold shadow-lg hover:shadow-primary/40 active:scale-95 transition-all">Get Started</a>
            </div>
        </div>
    </nav>

    <main class="">
        ${sectionsHtml}
        ${formHtml}
    </main>

    ${footerHtml}

    <script>
        document.addEventListener('DOMContentLoaded', () => {
            // ─── Reveal System ───
            const reveals = document.querySelectorAll('.section-reveal');
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('visible');
                    }
                });
            }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
            reveals.forEach(el => observer.observe(el));

            // ─── Floating/Parallax Removed ───
            // Images from 'imagenes nuevas' were requested removed for inconsistency

            window.addEventListener('scroll', () => {
                // Keep only parallax for text/cards
                document.querySelectorAll('.section-reveal').forEach(el => {
                    const rect = el.getBoundingClientRect();
                    if (rect.top < window.innerHeight && rect.bottom > 0) {
                        const speed = 0.03;
                        const offset = (window.innerHeight / 2 - rect.top) * speed;
                        const title = el.querySelector('h1, h2');
                        if (title) title.style.transform = 'translateY(' + offset + 'px)';
                    }
                });
            });
            
            // ─── Form Submission ───
            const form = document.getElementById('landing-form');
            if (form) {
                form.addEventListener('submit', async (e) => {
                    e.preventDefault();
                    const btn = form.querySelector('button');
                    const originalText = btn.innerText;
                    btn.disabled = true;
                    btn.innerText = 'Processing...';
                    
                    const formData = new FormData(form);
                    const data = {
                        name: formData.get('name'),
                        email: formData.get('email'),
                        phone: formData.get('phone'),
                        partnerId: formData.get('partner_id'),
                        landingSlug: "${data.slug}"
                    };

                    try {
                        const res = await fetch('/api/leads', {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify(data)
                        });
                        if (res.ok) {
                            btn.innerText = 'Success!';
                            btn.style.background = '#10b981';
                            form.reset();
                        } else {
                            btn.innerText = 'Error. Try again';
                            btn.disabled = false;
                        }
                    } catch (err) {
                        btn.innerText = 'Error. Try again';
                        btn.disabled = false;
                    }
                });
            }
        });
    </script>
</body>
</html>`;
}
