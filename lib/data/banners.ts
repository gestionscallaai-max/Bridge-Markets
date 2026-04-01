export type BannerSize = '300x250' | '728x90' | '1248x600' | '160x600';
export type BannerCategory = 'Forex' | 'Metales Preciosos' | 'Acciones' | 'Criptomonedas' | 'Índices Bursátiles' | 'Índices Sintéticos' | 'Promociones';
export type BannerLanguage = 'es' | 'en' | 'pt';

export interface BannerTemplate {
    id: string;
    name: string;
    category: BannerCategory;
    description: string;
    sizes: BannerSize[];
    gradient: string;
    previewImage?: string; // Path to a real generated image in /public
    defaults: {
        title: string;
        subtitle: string;
        buttonText: string;
        buttonColor: string;
    };
    languages?: BannerLanguage[];
}

export const BANNER_TEMPLATES: BannerTemplate[] = [
    {
        id: 'forex-spread-bajo',
        name: 'Forex Spread Bajo',
        category: 'Forex',
        description: 'Banner campaña spread cero en majors',
        sizes: ['300x250', '728x90', '1248x600', '160x600'],
        gradient: 'from-indigo-900 via-indigo-800 to-purple-900',
        previewImage: '/banners/banner_forex.png',
        defaults: {
            title: 'Empieza a operar hoy',
            subtitle: 'Los mejores spreads del mercado, sin comisiones ocultas.',
            buttonText: 'Abrir cuenta',
            buttonColor: '#865BFF',
        },
        languages: ['es', 'en', 'pt'],
    },
    {
        id: 'forex-pro-trader',
        name: 'Forex Pro Trader',
        category: 'Forex',
        description: 'Banner para traders avanzados',
        sizes: ['300x250', '728x90', '1248x600', '160x600'],
        gradient: 'from-slate-900 via-slate-800 to-slate-700',
        defaults: {
            title: 'Trading Profesional',
            subtitle: 'Herramientas avanzadas para traders experimentados.',
            buttonText: 'Abrir cuenta',
            buttonColor: '#865BFF',
        },
        languages: ['es', 'en'],
    },
    {
        id: 'prop-firm',
        name: 'Prop Firm Challenge',
        category: 'Promociones',
        description: 'Banner fondeo hasta $200K USD',
        sizes: ['300x250', '728x90', '1248x600'],
        gradient: 'from-zinc-900 via-neutral-800 to-stone-900',
        previewImage: '/banners/banner_propfirm.png',
        defaults: {
            title: 'Prop Firm',
            subtitle: 'Fondeo de hasta $200,000 USD para operar.',
            buttonText: 'Aplicar ahora',
            buttonColor: '#d97706',
        },
        languages: ['es', 'en', 'pt'],
    },
    {
        id: 'gold-trading',
        name: 'Gold Trading',
        category: 'Metales Preciosos',
        description: 'Banner campaña XAUUSD',
        sizes: ['300x250', '728x90', '1248x600'],
        gradient: 'from-amber-900 via-yellow-800 to-orange-900',
        defaults: {
            title: 'Invierte en Oro',
            subtitle: 'Opera XAUUSD con los mejores spreads del mercado.',
            buttonText: 'Invertir ahora',
            buttonColor: '#d97706',
        },
        languages: ['es', 'pt'],
    },
    {
        id: 'silver-platinum',
        name: 'Silver & Platinum',
        category: 'Metales Preciosos',
        description: 'Banner metales preciosos diversificados',
        sizes: ['300x250', '728x90', '160x600'],
        gradient: 'from-slate-700 via-gray-600 to-zinc-700',
        defaults: {
            title: 'Metales Preciosos',
            subtitle: 'Diversifica tu portafolio con plata y platino.',
            buttonText: 'Ver condiciones',
            buttonColor: '#71717a',
        },
        languages: ['es', 'en', 'pt'],
    },
    {
        id: 'tech-stocks-rally',
        name: 'Tech Stocks Rally',
        category: 'Acciones',
        description: 'Banner tecnológicas NASDAQ',
        sizes: ['300x250', '728x90', '1248x600'],
        gradient: 'from-blue-900 via-blue-800 to-cyan-900',
        defaults: {
            title: 'Acciones Tech',
            subtitle: 'Opera las principales tecnológicas del NASDAQ.',
            buttonText: 'Operar ahora',
            buttonColor: '#2563eb',
        },
        languages: ['es', 'en'],
    },
    {
        id: 'dividendos-eu',
        name: 'Dividendos EU',
        category: 'Acciones',
        description: 'Banner acciones europeas con dividendos',
        sizes: ['300x250', '728x90', '1248x600', '160x600'],
        gradient: 'from-emerald-900 via-teal-800 to-green-900',
        defaults: {
            title: 'Dividendos Europa',
            subtitle: 'Invierte en acciones europeas de alto rendimiento.',
            buttonText: 'Ver portafolio',
            buttonColor: '#059669',
        },
        languages: ['es', 'en', 'pt'],
    },
    {
        id: 'crypto-bull',
        name: 'Crypto Bull Run',
        category: 'Criptomonedas',
        description: 'Banner campaña cripto alcista',
        sizes: ['300x250', '728x90', '1248x600'],
        gradient: 'from-violet-900 via-purple-800 to-fuchsia-900',
        previewImage: '/banners/banner_crypto.png',
        defaults: {
            title: 'Crypto Bull Run',
            subtitle: 'Opera Bitcoin, Ethereum y más con apalancamiento.',
            buttonText: 'Opera ahora',
            buttonColor: '#7c3aed',
        },
        languages: ['es', 'pt'],
    },
    {
        id: 'indices-global',
        name: 'Índices Globales',
        category: 'Índices Bursátiles',
        description: 'Banner principales índices mundiales',
        sizes: ['300x250', '728x90', '1248x600', '160x600'],
        gradient: 'from-rose-900 via-pink-800 to-red-900',
        previewImage: '/banners/banner_indices.png',
        defaults: {
            title: 'Índices Globales',
            subtitle: 'S&P 500, DAX, Nikkei — opera los mercados del mundo.',
            buttonText: 'Comenzar',
            buttonColor: '#e11d48',
        },
        languages: ['es', 'en', 'pt'],
    },
];

export const CATEGORIES: BannerCategory[] = ['Forex', 'Metales Preciosos', 'Acciones', 'Criptomonedas', 'Índices Bursátiles', 'Índices Sintéticos', 'Promociones'];
export const LANGUAGES = [
    { code: 'es' as BannerLanguage, label: 'Spanish (LATAM)' },
    { code: 'en' as BannerLanguage, label: 'English' },
    { code: 'pt' as BannerLanguage, label: 'Português' },
];
