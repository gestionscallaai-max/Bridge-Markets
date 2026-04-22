"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { User, Globe, Sparkles, Share2, MessageCircle, Send, ExternalLink, ArrowRight } from 'lucide-react';

interface IdentityStepProps {
    fullName: string;
    setFullName: (v: string) => void;
    email: string;
    setEmail: (v: string) => void;
    communityName: string;
    setCommunityName: (v: string) => void;
    heroPhrase: string;
    setHeroPhrase: (v: string) => void;
    whatsapp: string;
    setWhatsapp: (v: string) => void;
    telegram: string;
    setTelegram: (v: string) => void;
    instagram: string;
    setInstagram: (v: string) => void;
    tiktok: string;
    setTiktok: (v: string) => void;
    youtube: string;
    setYoutube: (v: string) => void;
    ctaLink: string;
    setCtaLink: (v: string) => void;
    language: string;
    setLanguage: (v: string) => void;
    DYNAMIC_LANGUAGES: any[];
    canAdvance: boolean;
    onNext: () => void;
}

export default function IdentityStep({
    fullName, setFullName,
    email, setEmail,
    communityName, setCommunityName,
    heroPhrase, setHeroPhrase,
    whatsapp, setWhatsapp,
    telegram, setTelegram,
    instagram, setInstagram,
    tiktok, setTiktok,
    youtube, setYoutube,
    ctaLink, setCtaLink,
    language, setLanguage,
    DYNAMIC_LANGUAGES,
    canAdvance,
    onNext
}: IdentityStepProps) {
    const { t } = useLanguage();

    return (
        <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center">
                    <User className="w-5 h-5 text-slate-400" />
                </div>
                <div>
                    <h2 className="text-xl font-black text-slate-800">{t.landing.digitalIdentity}</h2>
                    <p className="text-xs text-slate-400 font-medium">{t.landing.officialInfo}</p>
                </div>
            </div>

            <div className="space-y-8">
                {/* Grupo 1: Datos Corporativos */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.landing.publicName} *</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#865BFF] transition-colors">
                                <User className="w-4 h-4" />
                            </div>
                            <input
                                type="text" value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder={t.landing.publicNamePlaceholder}
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all"
                            />
                        </div>
                    </div>
                    <div className="space-y-1.5">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.landing.contactEmail}</label>
                        <div className="relative group">
                            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#865BFF] transition-colors">
                                <Globe className="w-4 h-4" />
                            </div>
                            <input
                                type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="partner@bridgemarkets.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all"
                            />
                        </div>
                    </div>
                </div>

                {/* Grupo 2: Link de Referido (Bridge Markets) */}
                <div className="p-6 rounded-2xl bg-[#865BFF]/5 border border-[#865BFF]/20 space-y-4">
                    <div className="flex items-center gap-2 mb-2">
                        <div className="w-8 h-8 rounded-lg bg-[#865BFF] flex items-center justify-center">
                            <ExternalLink className="w-4 h-4 text-white" />
                        </div>
                        <span className="text-xs font-black text-[#865BFF] uppercase tracking-wider">{t.landing.ctaLinkLabel} (Bridge Markets)</span>
                    </div>
                    
                    <div className="relative group">
                        <input
                            type="text" 
                            value={ctaLink}
                            onChange={(e) => setCtaLink(e.target.value)}
                            placeholder="https://bridgemarkets.com/BM_XXXXXX"
                            className="w-full bg-white border border-slate-200 rounded-2xl py-4 px-5 text-sm font-bold text-slate-700 outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all shadow-sm"
                        />
                        <div className="mt-2 flex flex-col gap-1.5">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#865BFF] animate-pulse"></span>
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tight">Este enlace se usará en todos los botones de registro de tu landing</p>
                            </div>
                            <p className="text-[9px] text-[#865BFF] font-medium italic opacity-80 px-1">
                                {t.landing.urlHelpCta}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Language */}
            <div className="mt-6">
                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">{t.landing.landingLanguageLabel} *</label>
                <div className="flex flex-wrap gap-2">
                    {DYNAMIC_LANGUAGES.map(l => (
                        <button
                            key={l.code}
                            onClick={() => { if (!l.disabled) setLanguage(l.code); }}
                            disabled={l.disabled}
                            className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                l.disabled
                                    ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-dashed border-slate-200'
                                    : language === l.code
                                        ? 'bg-[#865BFF] text-white shadow-md'
                                        : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#865BFF]/30'
                            }`}
                        >
                            <span>{l.flag}</span> {l.label}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-8 flex justify-end">
                <button
                    onClick={onNext}
                    disabled={!canAdvance}
                    className="flex items-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#865BFF]/20"
                >
                    {t.landing.nextBtn} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
