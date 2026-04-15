"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { DASHBOARD_TRANSLATIONS, LANGUAGE_META, getT, type LangCode, type TranslationKeys } from './translations';

// ─── Context Types ───────────────────────────────────────────
interface LanguageContextValue {
    lang: LangCode;
    setLang: (lang: LangCode) => void;
    t: TranslationKeys;
    isRTL: boolean;
    availableLanguages: typeof LANGUAGE_META;
}

const LanguageContext = createContext<LanguageContextValue>({
    lang: 'es',
    setLang: () => {},
    t: DASHBOARD_TRANSLATIONS['es'],
    isRTL: false,
    availableLanguages: LANGUAGE_META,
});

// ─── Provider ────────────────────────────────────────────────
export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [lang, setLangState] = useState<LangCode>('es');

    // Load from localStorage on mount
    useEffect(() => {
        try {
            const stored = localStorage.getItem('bm_lang') as LangCode;
            if (stored && LANGUAGE_META[stored]) {
                setLangState(stored);
            } else {
                // Auto-detect from browser
                const browserLang = navigator.language.split('-')[0].toLowerCase();
                const detected: Record<string, LangCode> = {
                    es: 'es', en: 'en', zh: 'zh', hi: 'hi',
                    fr: 'fr', ar: 'ar', bn: 'bn', pt: 'pt', ru: 'ru', ja: 'ja',
                };
                if (detected[browserLang]) {
                    setLangState(detected[browserLang]);
                }
            }
        } catch {}
    }, []);

    // Apply RTL and lang attribute to HTML
    useEffect(() => {
        const meta = LANGUAGE_META[lang];
        if (typeof document !== 'undefined') {
            document.documentElement.setAttribute('lang', lang);
            document.documentElement.setAttribute('dir', meta?.rtl ? 'rtl' : 'ltr');
        }
    }, [lang]);

    const setLang = useCallback((newLang: LangCode) => {
        setLangState(newLang);
        try {
            localStorage.setItem('bm_lang', newLang);
        } catch {}
    }, []);

    const isRTL = LANGUAGE_META[lang]?.rtl ?? false;
    const t = getT(lang);

    return (
        <LanguageContext.Provider value={{ lang, setLang, t, isRTL, availableLanguages: LANGUAGE_META }}>
            {children}
        </LanguageContext.Provider>
    );
}

// ─── Hook ────────────────────────────────────────────────────
export function useLanguage() {
    return useContext(LanguageContext);
}

export type { LangCode };
