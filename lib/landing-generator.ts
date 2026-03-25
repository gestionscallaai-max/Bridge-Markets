// Landing page HTML template generator
// Generates a complete, self-contained HTML landing page based on form data

export interface LandingData {
    fullName: string;
    country: string;
    language: string;
    whatsapp: string;
    email: string;
    landingType: string;
    partnerId: string;
}

const TRANSLATIONS: Record<string, {
    heroTitle: string;
    heroSubtitle: string;
    cta: string;
    featuresTitle: string;
    features: { title: string; desc: string }[];
    whyTitle: string;
    whyItems: string[];
    contactTitle: string;
    contactCta: string;
    footerText: string;
}> = {
    ES: {
        heroTitle: 'Opera en los Mercados Globales',
        heroSubtitle: 'Accede a Forex, Acciones, Criptomonedas e Índices con spreads ultra competitivos y ejecución institucional.',
        cta: 'Abrir Cuenta Real',
        featuresTitle: 'Por qué elegirnos',
        features: [
            { title: 'Spreads desde 0.0 pips', desc: 'Los spreads más competitivos del mercado en los principales pares de divisas.' },
            { title: 'Ejecución Ultra Rápida', desc: 'Servidores colocados en Equinix para ejecución en milisegundos.' },
            { title: 'Regulación Internacional', desc: 'Operamos bajo estrictos estándares regulatorios internacionales.' },
            { title: 'Soporte 24/5', desc: 'Equipo de soporte multilingüe disponible las 24 horas, 5 días a la semana.' },
        ],
        whyTitle: 'Empieza en 3 simples pasos',
        whyItems: ['Registra tu cuenta en minutos', 'Deposita desde $100 USD', 'Comienza a operar mercados globales'],
        contactTitle: '¿Tienes preguntas?',
        contactCta: 'Contactar por WhatsApp',
        footerText: 'Página gestionada por el partner comercial autorizado',
    },
    GB: {
        heroTitle: 'Trade Global Markets',
        heroSubtitle: 'Access Forex, Stocks, Crypto and Indices with ultra-competitive spreads and institutional execution.',
        cta: 'Open Live Account',
        featuresTitle: 'Why Choose Us',
        features: [
            { title: 'Spreads from 0.0 pips', desc: 'The most competitive spreads on major currency pairs.' },
            { title: 'Ultra-Fast Execution', desc: 'Equinix co-located servers for millisecond execution.' },
            { title: 'International Regulation', desc: 'Operating under strict international regulatory standards.' },
            { title: '24/5 Support', desc: 'Multilingual support team available 24 hours, 5 days a week.' },
        ],
        whyTitle: 'Start in 3 Simple Steps',
        whyItems: ['Register your account in minutes', 'Deposit from $100 USD', 'Start trading global markets'],
        contactTitle: 'Have Questions?',
        contactCta: 'Contact via WhatsApp',
        footerText: 'Page managed by authorized commercial partner',
    },
    BR: {
        heroTitle: 'Opere nos Mercados Globais',
        heroSubtitle: 'Acesse Forex, Ações, Criptomoedas e Índices com spreads ultra competitivos e execução institucional.',
        cta: 'Abrir Conta Real',
        featuresTitle: 'Por que nos escolher',
        features: [
            { title: 'Spreads a partir de 0.0 pips', desc: 'Os spreads mais competitivos nos principais pares de moedas.' },
            { title: 'Execução Ultra Rápida', desc: 'Servidores co-localizados no Equinix para execução em milissegundos.' },
            { title: 'Regulação Internacional', desc: 'Operamos sob rigorosos padrões regulatórios internacionais.' },
            { title: 'Suporte 24/5', desc: 'Equipe de suporte multilíngue disponível 24 horas, 5 dias por semana.' },
        ],
        whyTitle: 'Comece em 3 Passos Simples',
        whyItems: ['Registre sua conta em minutos', 'Deposite a partir de $100 USD', 'Comece a operar mercados globais'],
        contactTitle: 'Tem perguntas?',
        contactCta: 'Contatar por WhatsApp',
        footerText: 'Página gerenciada pelo parceiro comercial autorizado',
    },
    FR: {
        heroTitle: 'Tradez les Marchés Mondiaux',
        heroSubtitle: 'Accédez au Forex, Actions, Crypto et Indices avec des spreads ultra compétitifs et une exécution institutionnelle.',
        cta: 'Ouvrir un Compte Réel',
        featuresTitle: 'Pourquoi Nous Choisir',
        features: [
            { title: 'Spreads à partir de 0.0 pips', desc: 'Les spreads les plus compétitifs sur les principales paires de devises.' },
            { title: 'Exécution Ultra Rapide', desc: 'Serveurs co-localisés chez Equinix pour une exécution en millisecondes.' },
            { title: 'Régulation Internationale', desc: 'Nous opérons selon des normes réglementaires internationales strictes.' },
            { title: 'Support 24/5', desc: 'Équipe de support multilingue disponible 24h/24, 5j/7.' },
        ],
        whyTitle: 'Commencez en 3 Étapes',
        whyItems: ['Créez votre compte en quelques minutes', 'Déposez à partir de 100$ USD', 'Commencez à trader les marchés mondiaux'],
        contactTitle: 'Des Questions?',
        contactCta: 'Contacter par WhatsApp',
        footerText: 'Page gérée par le partenaire commercial autorisé',
    },
};

const LANDING_TYPE_CONFIG: Record<string, { gradient: string; accent: string; icon: string }> = {
    institucional: { gradient: 'linear-gradient(135deg, #140633 0%, #2d1566 50%, #865BFF 100%)', accent: '#865BFF', icon: '🏛️' },
    forex: { gradient: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #3b82f6 100%)', accent: '#3b82f6', icon: '📊' },
    cripto: { gradient: 'linear-gradient(135deg, #1a1a2e 0%, #e94560 50%, #f59e0b 100%)', accent: '#f59e0b', icon: '₿' },
    propfirm: { gradient: 'linear-gradient(135deg, #064e3b 0%, #065f46 50%, #10b981 100%)', accent: '#10b981', icon: '🚀' },
};

export function generateLandingHTML(data: LandingData): string {
    const t = TRANSLATIONS[data.language] || TRANSLATIONS['ES'];
    const config = LANDING_TYPE_CONFIG[data.landingType] || LANDING_TYPE_CONFIG['institucional'];
    const whatsappLink = data.whatsapp ? `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}` : '#';
    const referralLink = `https://bridge.com/?ref=${data.partnerId}`;

    return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Bridge Markets | ${data.fullName}</title>
    <meta name="description" content="${t.heroSubtitle}">
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap" rel="stylesheet">
    <style>
        *, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Inter', -apple-system, sans-serif; color: #1e293b; background: #f8fafc; -webkit-font-smoothing: antialiased; }
        
        /* Hero */
        .hero { background: ${config.gradient}; min-height: 85vh; display: flex; align-items: center; justify-content: center; position: relative; overflow: hidden; }
        .hero::before { content: ''; position: absolute; inset: 0; background: radial-gradient(circle at 30% 50%, rgba(255,255,255,0.05) 0%, transparent 50%); }
        .hero-content { position: relative; z-index: 1; text-align: center; max-width: 720px; padding: 2rem; }
        .hero-badge { display: inline-flex; align-items: center; gap: 8px; background: rgba(255,255,255,0.1); backdrop-filter: blur(10px); border: 1px solid rgba(255,255,255,0.15); padding: 8px 20px; border-radius: 50px; color: rgba(255,255,255,0.9); font-size: 13px; font-weight: 600; margin-bottom: 2rem; }
        .hero h1 { font-size: clamp(2.5rem, 5vw, 4rem); font-weight: 800; color: white; line-height: 1.1; margin-bottom: 1.5rem; letter-spacing: -0.03em; }
        .hero p { font-size: 1.15rem; color: rgba(255,255,255,0.7); line-height: 1.7; max-width: 580px; margin: 0 auto 2.5rem; }
        .hero-cta { display: inline-flex; align-items: center; gap: 10px; background: ${config.accent}; color: white; padding: 16px 40px; border-radius: 12px; font-size: 16px; font-weight: 700; text-decoration: none; transition: all 0.2s; box-shadow: 0 12px 30px rgba(0,0,0,0.3); }
        .hero-cta:hover { transform: translateY(-2px); box-shadow: 0 16px 40px rgba(0,0,0,0.4); }
        .hero-cta svg { width: 20px; height: 20px; }
        .hero-partner { margin-top: 2rem; font-size: 13px; color: rgba(255,255,255,0.4); }
        
        /* Features */
        .features { padding: 100px 24px; max-width: 1100px; margin: 0 auto; }
        .features h2 { text-align: center; font-size: 2.2rem; font-weight: 800; margin-bottom: 4rem; letter-spacing: -0.02em; color: #0f172a; }
        .features-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(240px, 1fr)); gap: 24px; }
        .feature-card { background: white; border: 1px solid #e2e8f0; border-radius: 16px; padding: 32px; transition: all 0.2s; }
        .feature-card:hover { box-shadow: 0 8px 30px rgba(0,0,0,0.06); transform: translateY(-2px); }
        .feature-icon { width: 48px; height: 48px; border-radius: 12px; background: ${config.accent}15; display: flex; align-items: center; justify-content: center; margin-bottom: 20px; font-size: 24px; }
        .feature-card h3 { font-size: 1rem; font-weight: 700; margin-bottom: 8px; color: #0f172a; }
        .feature-card p { font-size: 14px; color: #64748b; line-height: 1.6; }
        
        /* Steps */
        .steps { background: #0f172a; padding: 100px 24px; }
        .steps-inner { max-width: 800px; margin: 0 auto; text-align: center; }
        .steps h2 { font-size: 2.2rem; font-weight: 800; color: white; margin-bottom: 4rem; letter-spacing: -0.02em; }
        .steps-list { display: flex; flex-direction: column; gap: 24px; text-align: left; }
        .step-item { display: flex; align-items: center; gap: 20px; background: rgba(255,255,255,0.05); border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px 28px; }
        .step-num { width: 44px; height: 44px; border-radius: 12px; background: ${config.accent}; color: white; font-weight: 800; font-size: 18px; display: flex; align-items: center; justify-content: center; flex-shrink: 0; }
        .step-text { font-size: 1rem; font-weight: 600; color: rgba(255,255,255,0.85); }
        
        /* Contact */
        .contact { padding: 100px 24px; text-align: center; }
        .contact h2 { font-size: 2.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; }
        .contact-info { display: inline-flex; flex-direction: column; gap: 12px; margin-top: 2rem; }
        .contact-btn { display: inline-flex; align-items: center; gap: 10px; background: #25d366; color: white; padding: 16px 32px; border-radius: 12px; font-weight: 700; font-size: 15px; text-decoration: none; transition: all 0.2s; }
        .contact-btn:hover { background: #1fb855; transform: translateY(-2px); }
        .contact-email { font-size: 14px; color: #64748b; }
        .contact-email a { color: ${config.accent}; font-weight: 600; text-decoration: none; }
        
        /* Footer */
        .footer { background: #0f172a; padding: 40px 24px; text-align: center; }
        .footer-logo { font-size: 20px; font-weight: 800; color: white; margin-bottom: 8px; }
        .footer-logo span { color: ${config.accent}; font-weight: 400; }
        .footer-text { font-size: 12px; color: rgba(255,255,255,0.4); }
        .footer-partner { font-size: 11px; color: rgba(255,255,255,0.25); margin-top: 16px; }
        
        @media (max-width: 768px) {
            .hero { min-height: 70vh; }
            .features-grid { grid-template-columns: 1fr; }
        }
    </style>
</head>
<body>
    <!-- Hero -->
    <section class="hero">
        <div class="hero-content">
            <div class="hero-badge">${config.icon} Bridge Markets</div>
            <h1>${t.heroTitle}</h1>
            <p>${t.heroSubtitle}</p>
            <a href="${referralLink}" class="hero-cta" target="_blank">
                ${t.cta}
                <svg fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3"/></svg>
            </a>
            <div class="hero-partner">${data.fullName} · ${data.country}</div>
        </div>
    </section>

    <!-- Features -->
    <section class="features">
        <h2>${t.featuresTitle}</h2>
        <div class="features-grid">
            ${t.features.map((f, i) => `
            <div class="feature-card">
                <div class="feature-icon">${['📈', '⚡', '🛡️', '🎧'][i]}</div>
                <h3>${f.title}</h3>
                <p>${f.desc}</p>
            </div>`).join('')}
        </div>
    </section>

    <!-- Steps -->
    <section class="steps">
        <div class="steps-inner">
            <h2>${t.whyTitle}</h2>
            <div class="steps-list">
                ${t.whyItems.map((item, i) => `
                <div class="step-item">
                    <div class="step-num">${i + 1}</div>
                    <div class="step-text">${item}</div>
                </div>`).join('')}
            </div>
        </div>
    </section>

    <!-- Contact -->
    <section class="contact">
        <h2>${t.contactTitle}</h2>
        <div class="contact-info">
            ${data.whatsapp ? `<a href="${whatsappLink}" class="contact-btn" target="_blank">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/><path d="M12 0C5.373 0 0 5.373 0 12c0 2.625.846 5.059 2.284 7.034L.789 23.492a.5.5 0 00.612.616l4.584-1.466A11.954 11.954 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-2.239 0-4.308-.724-5.993-1.953l-.42-.307-2.723.87.897-2.658-.336-.443A9.956 9.956 0 012 12C2 6.486 6.486 2 12 2s10 4.486 10 10-4.486 10-10 10z"/></svg>
                ${t.contactCta}
            </a>` : ''}
            ${data.email ? `<div class="contact-email">${data.email.includes('@') ? `<a href="mailto:${data.email}">${data.email}</a>` : data.email}</div>` : ''}
        </div>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-logo">Bridge<span>Markets</span></div>
        <div class="footer-text">${t.footerText}</div>
        <div class="footer-partner">Partner: ${data.fullName} | ID: ${data.partnerId}</div>
    </footer>
</body>
</html>`;
}

export function downloadLandingHTML(html: string, filename: string) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export function openLandingPreview(html: string) {
    const blob = new Blob([html], { type: 'text/html;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    window.open(url, '_blank');
}
