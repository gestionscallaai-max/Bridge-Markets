// ─────────────────────────────────────────────────────────────
// REFACTORED: This file acts as a re-export bridge to avoid breaking existing imports.
// All logic has been migrated modularly to /lib/landing/
// ─────────────────────────────────────────────────────────────

export * from './landing/generator';
export * from './landing/dictionary';
export * from './landing/types';

export const LANGUAGES = [
    // The 10 main languages
    { code: 'ES', flag: '🇪🇸', label: 'Español' },
    { code: 'GB', flag: '🇬🇧', label: 'English' },
    { code: 'ZH', flag: '🇨🇳', label: '中文 (Chino Mandarín)' },
    { code: 'HI', flag: '🇮🇳', label: 'हिन्दी (Hindi)' },
    { code: 'FR', flag: '🇫🇷', label: 'Français' },
    { code: 'AR', flag: '🇸🇦', label: 'العربية (Árabe)' },
    { code: 'BN', flag: '🇧🇩', label: 'বাংলা (Bengalí)' },
    { code: 'BR', flag: '🇧🇷', label: 'Português' },
    { code: 'RU', flag: '🇷🇺', label: 'Русский (Ruso)' },
    { code: 'JP', flag: '🇯🇵', label: '日本語 (Japonés)' },
    // Existing extras
    { code: 'ID', flag: '🇮🇩', label: 'Bahasa Indonesia' },
    { code: 'VI', flag: '🇻🇳', label: 'Tiếng Việt' },
    // Coming soon placeholder
    { code: 'SOON', flag: '✨', label: 'Próximamente', disabled: true },
];
