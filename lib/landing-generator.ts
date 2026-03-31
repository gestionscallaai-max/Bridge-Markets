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
    slug: string;
    googleAnalyticsId?: string;
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
    sinteticos: { gradient: 'linear-gradient(135deg, #4c0519 0%, #9f1239 50%, #e11d48 100%)', accent: '#e11d48', icon: '📈' },
    bursatiles: { gradient: 'linear-gradient(135deg, #312e81 0%, #4f46e5 50%, #818cf8 100%)', accent: '#6366f1', icon: '📉' },
    promociones: { gradient: 'linear-gradient(135deg, #831843 0%, #be185d 50%, #f43f5e 100%)', accent: '#f43f5e', icon: '🎁' },
};

export function generateLandingHTML(data: LandingData): string {
    const t = TRANSLATIONS[data.language] || TRANSLATIONS['ES'];
    const config = LANDING_TYPE_CONFIG[data.landingType] || LANDING_TYPE_CONFIG['institucional'];
    const whatsappLink = data.whatsapp ? `https://wa.me/${data.whatsapp.replace(/[^0-9]/g, '')}` : '#';
    const referralLink = `https://bridge.com/?ref=${data.partnerId}`;

    const gaScript = data.googleAnalyticsId ? `
    <!-- Google tag (gtag.js) -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=${data.googleAnalyticsId}"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${data.googleAnalyticsId}');
    </script>` : '';

    return `<!DOCTYPE html>
<html lang="${data.language.toLowerCase()}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">${gaScript}
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
        
        /* Contact Form */
        .contact { padding: 100px 24px; text-align: center; background: white; }
        .contact h2 { font-size: 2.2rem; font-weight: 800; color: #0f172a; margin-bottom: 1rem; }
        .contact p { color: #64748b; margin-bottom: 2.5rem; font-size: 1.1rem; }
        .lead-form { max-width: 440px; margin: 0 auto; text-align: left; background: #f8fafc; padding: 32px; border-radius: 16px; border: 1px solid #e2e8f0; }
        .form-group { margin-bottom: 20px; }
        .form-label { display: block; font-size: 13px; font-weight: 700; color: #475569; margin-bottom: 8px; }
        .form-input { width: 100%; padding: 14px 16px; border: 1px solid #cbd5e1; border-radius: 10px; font-size: 15px; transition: all 0.2s; outline: none; background: white; }
        .form-input:focus { border-color: ${config.accent}; box-shadow: 0 0 0 4px ${config.accent}20; }
        .form-submit { width: 100%; background: ${config.accent}; color: white; padding: 16px; border: none; border-radius: 10px; font-weight: 800; font-size: 16px; cursor: pointer; transition: all 0.2s; margin-top: 8px; }
        .form-submit:hover { transform: translateY(-2px); box-shadow: 0 8px 20px ${config.accent}40; }
        .form-submit:disabled { opacity: 0.7; cursor: not-allowed; transform: none; box-shadow: none; }
        .form-message { display: none; text-align: center; padding: 16px; border-radius: 8px; margin-top: 16px; font-weight: 600; font-size: 14px; }
        .form-message.success { display: block; background: #dcfce7; color: #166534; border: 1px solid #bbf7d0; }
        .form-message.error { display: block; background: #fee2e2; color: #991b1b; border: 1px solid #fecaca; }
        
        /* Footer */
        .footer { background: #0f172a; padding: 40px 24px; text-align: center; border-top: 1px solid rgba(255,255,255,0.05); }
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
            <a href="#registro" class="hero-cta">
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

    <!-- Contact Form -->
    <section class="contact" id="registro">
        <h2>${t.contactTitle}</h2>
        <p>Déjanos tus datos y un especialista se pondrá en contacto preventivo contigo.</p>
        
        <form class="lead-form" id="leadForm">
            <input type="hidden" id="partnerId" value="${data.partnerId}">
            <input type="hidden" id="landingSlug" value="${data.slug}">
            
            <div class="form-group">
                <label class="form-label" for="name">Nombre Completo</label>
                <input class="form-input" type="text" id="name" required placeholder="Ej. Juan Pérez">
            </div>
            
            <div class="form-group">
                <label class="form-label" for="email">Correo Electrónico</label>
                <input class="form-input" type="email" id="email" required placeholder="juan@ejemplo.com">
            </div>
            
            <div class="form-group">
                <label class="form-label" for="whatsapp">Teléfono / WhatsApp</label>
                <input class="form-input" type="tel" id="whatsapp" required placeholder="+34 600 000 000">
            </div>
            
            <button type="submit" class="form-submit" id="submitBtn">${t.contactCta || 'Comenzar Ahora'}</button>
            <div id="formMessage" class="form-message"></div>
        </form>
    </section>

    <!-- Footer -->
    <footer class="footer">
        <div class="footer-logo">Bridge<span>Markets</span></div>
        <div class="footer-text">${t.footerText}</div>
        <div class="footer-partner">Partner: ${data.fullName} | ID: ${data.partnerId}</div>
    </footer>

    <script>
        document.getElementById('leadForm').addEventListener('submit', async (e) => {
            e.preventDefault();
            const btn = document.getElementById('submitBtn');
            const msg = document.getElementById('formMessage');
            
            btn.disabled = true;
            btn.textContent = 'Enviando...';
            msg.className = 'form-message';
            
            try {
                const res = await fetch('/api/leads', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        name: document.getElementById('name').value,
                        email: document.getElementById('email').value,
                        whatsapp: document.getElementById('whatsapp').value,
                        landingSlug: document.getElementById('landingSlug').value,
                        partnerId: document.getElementById('partnerId').value
                    })
                });
                
                const data = await res.json();
                
                if (data.success) {
                    msg.textContent = '¡Gracias por registrarte! Nos pondremos en contacto pronto.';
                    msg.className = 'form-message success';
                    document.getElementById('leadForm').reset();
                    btn.style.display = 'none';
                } else {
                    throw new Error(data.error || 'Error al enviar');
                }
            } catch (err) {
                msg.textContent = 'Hubo un error al enviar el formulario. Inténtalo de nuevo.';
                msg.className = 'form-message error';
                btn.disabled = false;
                btn.textContent = '${t.contactCta || 'Comenzar Ahora'}';
            }
        });
    </script>
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
