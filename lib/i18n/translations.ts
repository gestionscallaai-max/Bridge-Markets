import { LangCode, TranslationKeys } from './types';
import { en } from './locales/en';
import { es } from './locales/es';
import { zh } from './locales/zh';
import { hi } from './locales/hi';
import { fr } from './locales/fr';
import { ar } from './locales/ar';
import { bn } from './locales/bn';
import { pt } from './locales/pt';
import { ru } from './locales/ru';
import { ja } from './locales/ja';

export type { LangCode, TranslationKeys };

export const LANGUAGE_META: Record<LangCode, { label: string; nativeLabel: string; flag: string; rtl?: boolean }> = {
    es: { label: 'Español',    nativeLabel: 'Español',    flag: '🇪🇸' },
    en: { label: 'English',    nativeLabel: 'English',    flag: '🇬🇧' },
    zh: { label: 'Chinese',    nativeLabel: '中文',         flag: '🇨🇳' },
    hi: { label: 'Hindi',      nativeLabel: 'हिन्दी',      flag: '🇮🇳' },
    fr: { label: 'French',     nativeLabel: 'Français',   flag: '🇫🇷' },
    ar: { label: 'Arabic',     nativeLabel: 'العربية',    flag: '🇸🇦', rtl: true },
    bn: { label: 'Bengali',    nativeLabel: 'বাংলা',       flag: '🇧🇩' },
    pt: { label: 'Português',  nativeLabel: 'Português',  flag: '🇧🇷' },
    ru: { label: 'Russian',    nativeLabel: 'Русский',    flag: '🇷🇺' },
    ja: { label: 'Japanese',   nativeLabel: '日本語',       flag: '🇯🇵' },
};

const T: Record<LangCode, TranslationKeys> = {
    en,
    es,
    zh,
    hi,
    fr,
    ar,
    bn,
    pt,
    ru,
    ja,
};

export const DASHBOARD_TRANSLATIONS = T;

export function getT(lang: LangCode): TranslationKeys {
    return T[lang] || T['es'];
}
