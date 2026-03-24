export type LocaleLanguage = 'ES' | 'EN' | 'PT';

export interface AssetData {
    id: string;
    type: string;
    instrument: string;
    size: string;
    badge?: 'cr' | 'new';
    locales: Record<LocaleLanguage, { title: string; cta: string }>;
}

export const ASSETS_DATA: AssetData[] = [
    {
        id: "crypto-bull-run",
        type: "Banner",
        instrument: "Cripto",
        size: "300x250",
        badge: "cr",
        locales: {
            ES: { title: "CRYPTO BULL RUN", cta: "Opera Ahora" },
            EN: { title: "CRYPTO BULL RUN", cta: "Trade Now" },
            PT: { title: "CRYPTO BULL RUN", cta: "Negocie Agora" }
        }
    },
    {
        id: "forex-mastery",
        type: "Banner",
        instrument: "Forex",
        size: "728x90",
        badge: "new",
        locales: {
            ES: { title: "MAESTRÍA EN FOREX", cta: "Abre tu Cuenta" },
            EN: { title: "FOREX MASTERY", cta: "Open Account" },
            PT: { title: "MESTRE EM FOREX", cta: "Abra sua Conta" }
        }
    },
    {
        id: "gold-trading",
        type: "Banner",
        instrument: "Metales",
        size: "1080x1080",
        badge: "cr",
        locales: {
            ES: { title: "TRADING DE ORO", cta: "Invierte Ahora" },
            EN: { title: "GOLD TRADING", cta: "Invest Now" },
            PT: { title: "TRADING DE OURO", cta: "Invista Agora" }
        }
    },
    {
        id: "zero-spread",
        type: "Banner",
        instrument: "Forex",
        size: "300x600",
        badge: "new",
        locales: {
            ES: { title: "CERO SPREAD", cta: "Empieza Ya" },
            EN: { title: "ZERO SPREAD", cta: "Start Now" },
            PT: { title: "SPREAD ZERO", cta: "Comece Agora" }
        }
    },
    {
        id: "indices-pro",
        type: "Banner",
        instrument: "Índices",
        size: "300x250",
        badge: "cr",
        locales: {
            ES: { title: "ÍNDICES PRO", cta: "Opera Ahora" },
            EN: { title: "INDICES PRO", cta: "Trade Now" },
            PT: { title: "ÍNDICES PRO", cta: "Negocie Agora" }
        }
    },
    {
        id: "leverage-boost",
        type: "Banner",
        instrument: "Forex",
        size: "728x90",
        badge: "cr",
        locales: {
            ES: { title: "ATA 1:500 APALANCAMIENTO", cta: "Regístrate" },
            EN: { title: "UP TO 1:500 LEVERAGE", cta: "Sign Up" },
            PT: { title: "ATÉ 1:500 ALAVANCAGEM", cta: "Cadastre-se" }
        }
    },
    {
        id: "crypto-package",
        type: "Banner",
        instrument: "Cripto",
        size: "160x600",
        badge: "new",
        locales: {
            ES: { title: "PACK CRIPTO PREMIUM", cta: "Ver Más" },
            EN: { title: "PREMIUM CRYPTO PACK", cta: "Learn More" },
            PT: { title: "PACK CRIPTO PREMIUM", cta: "Ver Mais" }
        }
    },
    {
        id: "vip-account",
        type: "Banner",
        instrument: "Forex",
        size: "1080x1080",
        badge: "cr",
        locales: {
            ES: { title: "CUENTA VIP BRIDGE", cta: "Solicitar Ahora" },
            EN: { title: "BRIDGE VIP ACCOUNT", cta: "Apply Now" },
            PT: { title: "CONTA VIP BRIDGE", cta: "Solicite Agora" }
        }
    }
];
