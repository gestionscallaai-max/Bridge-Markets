"use client";
import React, { useState, useEffect } from 'react';
import { Copy, Check, ExternalLink, Eye, X, Globe, Filter, Zap, Star, TrendingUp, ChevronDown } from 'lucide-react';
import { generateLandingHTML, openLandingPreview, type LandingData } from '@/lib/landing-generator';
import { supabase } from '@/lib/supabaseClient';

// ─── Catálogo — una card por tipo de landing ─────────────────
const PROMO_LANDINGS = [
    {
        id: 'institucional',
        title: 'Bridge Markets — Institucional',
        desc: 'Landing principal del broker. Ideal para audiencias generales en cualquier idioma.',
        type: 'institucional',
        category: 'top',
        badge: 'Top Converting',
        badgeColor: '#865BFF',
        gradient: 'linear-gradient(135deg,#0d0221,#1a0545,#865BFF)',
        accentColor: '#865BFF',
    },
    {
        id: 'forex',
        title: 'Forex Trading — Spreads 0.0',
        desc: 'Enfocada en pares de divisas y ejecución ultra rápida.',
        type: 'forex',
        category: 'top',
        badge: 'Popular',
        badgeColor: '#3b82f6',
        gradient: 'linear-gradient(135deg,#020b18,#0a2440,#1d6fa4)',
        accentColor: '#38bdf8',
    },
    {
        id: 'cripto',
        title: 'Crypto Trading — 24/7',
        desc: 'Bitcoin, Ethereum y más criptoactivos con apalancamiento.',
        type: 'cripto',
        category: 'new',
        badge: 'Nuevo',
        badgeColor: '#f59e0b',
        gradient: 'linear-gradient(135deg,#0f0a00,#2d1500,#f59e0b)',
        accentColor: '#f59e0b',
    },
    {
        id: 'propfirm',
        title: 'Prop Firm — Fondeo Pro',
        desc: 'Para traders que buscan capital de terceros.',
        type: 'propfirm',
        category: 'new',
        badge: 'Nuevo',
        badgeColor: '#10b981',
        gradient: 'linear-gradient(135deg,#001a0f,#003320,#10b981)',
        accentColor: '#10b981',
    },
    {
        id: 'bursatiles',
        title: 'Índices Bursátiles',
        desc: 'S&P500, NASDAQ, DAX y los principales índices globales.',
        type: 'bursatiles',
        category: 'all',
        badge: null,
        badgeColor: '#6366f1',
        gradient: 'linear-gradient(135deg,#0a0a1a,#1e1b4b,#3730a3)',
        accentColor: '#818cf8',
    },
    {
        id: 'sinteticos',
        title: 'Índices Sintéticos 24/7',
        desc: 'Opera índices sintéticos sin importar el horario de mercado.',
        type: 'sinteticos',
        category: 'all',
        badge: null,
        badgeColor: '#e11d48',
        gradient: 'linear-gradient(135deg,#1a000a,#3d0015,#e11d48)',
        accentColor: '#e11d48',
    },
    {
        id: 'promociones',
        title: 'Promociones Especiales',
        desc: 'Bonos exclusivos y ofertas para nuevos clientes.',
        type: 'promociones',
        category: 'new',
        badge: 'Nuevo',
        badgeColor: '#f43f5e',
        gradient: 'linear-gradient(135deg,#1a0010,#4a0030,#f43f5e)',
        accentColor: '#f43f5e',
    },
];

// ─── Idiomas disponibles ─────────────────────────────────────
const LANGUAGES = [
    { code: 'ES', flag: '🇪🇸', label: 'Español' },
    { code: 'GB', flag: '🇬🇧', label: 'English' },
    { code: 'BR', flag: '🇧🇷', label: 'Português' },
    { code: 'FR', flag: '🇫🇷', label: 'Français' },
    { code: 'AR', flag: '🇸🇦', label: 'العربية', rtl: true },
    { code: 'ZH', flag: '🇨🇳', label: '中文 (简体)' },
    { code: 'ID', flag: '🇮🇩', label: 'Bahasa Indonesia' },
    { code: 'VI', flag: '🇻🇳', label: 'Tiếng Việt' },
];

const TABS = [
    { id: 'top', label: 'Top Converting', icon: Star },
    { id: 'new', label: 'Nuevas', icon: Zap },
    { id: 'all', label: 'Todas', icon: Globe },
];

interface ModalState {
    landing: typeof PROMO_LANDINGS[0];
    selectedLang: string;
    html: string;
    showPreview: boolean;
    langDropdownOpen: boolean;
}

export default function PromoMaterialsPage() {
    const [activeTab, setActiveTab] = useState<'top' | 'new' | 'all'>('top');
    const [modal, setModal] = useState<ModalState | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [partnerId, setPartnerId] = useState('BM_PARTNER_01');
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        setBaseUrl(window.location.origin);
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) setPartnerId('BM_' + user.id.substring(0, 8).toUpperCase());
        });
    }, []);

    const filtered = PROMO_LANDINGS.filter(l => {
        if (activeTab === 'all') return true;
        return l.category === activeTab;
    });

    const buildLandingData = (landing: typeof PROMO_LANDINGS[0], langCode: string): LandingData => ({
        fullName: 'Bridge Markets Partner',
        country: langCode === 'BR' ? 'Brasil' : langCode === 'GB' ? 'Global' : langCode === 'AR' ? 'Arabia' : langCode === 'ZH' ? 'China' : langCode === 'ID' ? 'Indonesia' : langCode === 'VI' ? 'Vietnam' : langCode === 'FR' ? 'Francia' : 'España',
        language: langCode,
        whatsapp: '',
        email: 'partner@bridgemarkets.com',
        landingType: landing.type,
        partnerId,
        slug: `${landing.id}-${langCode.toLowerCase()}`,
    });

    const getLandingUrl = (landing: typeof PROMO_LANDINGS[0], langCode: string) =>
        `${baseUrl}/l/${landing.id}-${langCode.toLowerCase()}?ref=${partnerId}`;

    const handleGetLink = (landing: typeof PROMO_LANDINGS[0]) => {
        setLoadingId(landing.id);
        const defaultLang = 'ES';
        const data = buildLandingData(landing, defaultLang);
        const html = generateLandingHTML(data);
        setTimeout(() => {
            setModal({
                landing,
                selectedLang: defaultLang,
                html,
                showPreview: false,
                langDropdownOpen: false,
            });
            setLoadingId(null);
        }, 350);
    };

    const handleLangChange = (langCode: string) => {
        if (!modal) return;
        const data = buildLandingData(modal.landing, langCode);
        const html = generateLandingHTML(data);
        setModal({ ...modal, selectedLang: langCode, html, langDropdownOpen: false });
    };

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const currentLangObj = modal ? LANGUAGES.find(l => l.code === modal.selectedLang) : null;
    const currentUrl = modal ? getLandingUrl(modal.landing, modal.selectedLang) : '';

    return (
        <div className="space-y-6 pb-10">

            {/* Header */}
            <div className="card px-6 py-5">
                <div className="flex items-center gap-4">
                    <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#865BFF] to-[#6b3fd6] flex items-center justify-center shadow-lg shadow-[#865BFF]/20">
                        <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                        <h1 className="text-lg font-bold text-slate-800">Materiales Promocionales</h1>
                        <p className="text-sm text-slate-400 mt-0.5">{PROMO_LANDINGS.length} landings disponibles · {LANGUAGES.length} idiomas</p>
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="flex items-center gap-1 bg-white border border-slate-200 rounded-xl p-1 w-fit shadow-sm">
                {TABS.map(tab => {
                    const Icon = tab.icon;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id as 'top' | 'new' | 'all')}
                            className={`flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-all ${activeTab === tab.id
                                    ? 'bg-[#865BFF] text-white shadow-md shadow-[#865BFF]/20'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'
                                }`}
                        >
                            <Icon className="w-3.5 h-3.5" />
                            {tab.label}
                        </button>
                    );
                })}
            </div>

            {/* Idiomas rápidos info */}
            <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs text-slate-400 font-medium">Idiomas disponibles:</span>
                {LANGUAGES.map(l => (
                    <span key={l.code} className="text-xs bg-white border border-slate-200 rounded-full px-2.5 py-1 font-medium text-slate-600 flex items-center gap-1">
                        {l.flag} {l.label}
                    </span>
                ))}
            </div>

            {/* Grid de landing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {filtered.map(landing => (
                    <div
                        key={landing.id}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                        {/* Visual preview thumbnail */}
                        <div className="relative h-40 overflow-hidden" style={{ background: landing.gradient }}>
                            <div className="absolute top-3 left-3 right-3 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center gap-2 border border-white/15">
                                <div className="flex gap-1">
                                    <div className="w-2 h-2 rounded-full bg-red-400/80"></div>
                                    <div className="w-2 h-2 rounded-full bg-yellow-400/80"></div>
                                    <div className="w-2 h-2 rounded-full bg-green-400/80"></div>
                                </div>
                                <div className="flex-1 bg-white/10 rounded px-2 py-0.5 text-white/60 text-[9px] font-mono truncate">
                                    bridgemarkets.com/l/{landing.id}?ref={partnerId}
                                </div>
                            </div>
                            <div className="absolute bottom-4 left-4 right-4 space-y-1.5">
                                <div className="text-[8px] font-bold uppercase tracking-wider" style={{ color: `${landing.accentColor}99` }}>Bridge Markets</div>
                                <div className="text-white font-bold text-sm leading-tight">{landing.title.split('—')[1]?.trim() || landing.title}</div>
                                <div className="h-1 rounded-full w-16" style={{ background: landing.accentColor }}></div>
                            </div>
                            {landing.badge && (
                                <div className="absolute top-3 right-3 text-white text-[10px] font-bold px-2.5 py-1 rounded-full" style={{ background: landing.badgeColor }}>
                                    {landing.badge}
                                </div>
                            )}
                            {/* Quick preview hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100">
                                <button
                                    onClick={() => {
                                        const html = generateLandingHTML(buildLandingData(landing, 'ES'));
                                        openLandingPreview(html);
                                    }}
                                    className="flex items-center gap-1.5 bg-white/20 backdrop-blur-sm border border-white/30 text-white text-xs font-semibold px-4 py-2 rounded-lg hover:bg-white/30 transition-all"
                                >
                                    <Eye className="w-3.5 h-3.5" /> Vista rápida
                                </button>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-4">
                            <div className="flex items-start justify-between mb-1">
                                <h3 className="font-bold text-slate-800 text-sm leading-tight">{landing.title}</h3>
                                <div className="flex gap-0.5 ml-2 flex-shrink-0">
                                    {LANGUAGES.slice(0,4).map(l => (
                                        <span key={l.code} className="text-xs" title={l.label}>{l.flag}</span>
                                    ))}
                                    <span className="text-[10px] text-slate-400 font-semibold">+{LANGUAGES.length - 4}</span>
                                </div>
                            </div>
                            <p className="text-xs text-slate-400 mb-4 leading-relaxed">{landing.desc}</p>

                            {/* Link preview */}
                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2 mb-3">
                                <Globe className="w-3 h-3 text-slate-400 flex-shrink-0" />
                                <span className="text-[10px] font-mono text-slate-500 truncate flex-1">
                                    /l/{landing.id}?ref={partnerId}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                                <button
                                    onClick={() => handleGetLink(landing)}
                                    disabled={loadingId === landing.id}
                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold transition-all"
                                    style={{ background: landing.accentColor, color: 'white' }}
                                >
                                    {loadingId === landing.id ? (
                                        <span className="animate-pulse">Cargando...</span>
                                    ) : (
                                        <><ExternalLink className="w-3.5 h-3.5" /> Obtener link</>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleCopy(`${baseUrl}/l/${landing.id}-es?ref=${partnerId}`, landing.id)}
                                    className="w-9 h-9 flex items-center justify-center border border-slate-200 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all flex-shrink-0"
                                >
                                    {copied === landing.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* ─── Modal "Obtener link" con selector de idioma ─── */}
            {modal && (
                <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-[680px] shadow-2xl overflow-hidden">

                        {/* Modal header */}
                        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100">
                            <div>
                                <h2 className="font-bold text-slate-800">Obtener link</h2>
                                <p className="text-xs text-slate-400 mt-0.5">{modal.landing.title}</p>
                            </div>
                            <button
                                onClick={() => setModal(null)}
                                className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-slate-100 text-slate-500 transition-colors"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="flex gap-0">
                            {/* Preview thumbnail left */}
                            <div
                                className="relative w-[260px] shrink-0 cursor-pointer"
                                style={{ background: modal.landing.gradient, minHeight: '320px' }}
                                onClick={() => setModal({ ...modal, showPreview: !modal.showPreview })}
                            >
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6">
                                    <div className="text-white font-bold text-base mb-2 leading-tight">{modal.landing.title}</div>
                                    <div className="text-white/40 text-xs mb-4">Haz clic para previsualizar</div>
                                    <div className="flex items-center gap-1.5 bg-white/10 backdrop-blur border border-white/20 text-white text-[10px] font-semibold px-3 py-1.5 rounded-lg">
                                        <Eye className="w-3 h-3" /> Vista previa
                                    </div>
                                </div>
                                {/* Mini lang label */}
                                <div className="absolute bottom-3 left-3 right-3 text-center">
                                    <span className="text-white/50 text-[10px]">
                                        {currentLangObj?.flag} {currentLangObj?.label}
                                    </span>
                                </div>
                            </div>

                            {/* Right panel */}
                            <div className="flex-1 p-6 space-y-5">
                                {/* Language selector — exactamente como Exness */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">
                                        <Globe className="w-3 h-3 inline mr-1" />Idioma
                                    </label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setModal({ ...modal, langDropdownOpen: !modal.langDropdownOpen })}
                                            className="w-full flex items-center justify-between px-4 py-3 border border-slate-200 rounded-xl text-sm font-semibold text-slate-800 hover:bg-slate-50 transition-colors"
                                        >
                                            <span className="flex items-center gap-2">
                                                <span className="text-base">{currentLangObj?.flag}</span>
                                                {currentLangObj?.label}
                                            </span>
                                            <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${modal.langDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {modal.langDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-slate-200 rounded-xl shadow-xl z-50 overflow-hidden">
                                                {LANGUAGES.map(lang => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => handleLangChange(lang.code)}
                                                        className={`w-full flex items-center gap-3 px-4 py-3 text-sm transition-colors text-left ${modal.selectedLang === lang.code
                                                                ? 'bg-[#865BFF]/8 text-[#865BFF] font-semibold'
                                                                : 'text-slate-700 hover:bg-slate-50'
                                                            }`}
                                                    >
                                                        <span className="text-base">{lang.flag}</span>
                                                        <span>{lang.label}</span>
                                                        {modal.selectedLang === lang.code && (
                                                            <Check className="w-3.5 h-3.5 ml-auto" />
                                                        )}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Link personalizado */}
                                <div>
                                    <label className="text-xs font-bold text-slate-500 uppercase tracking-wider block mb-2">Tu link personalizado</label>
                                    <div className="bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 font-mono text-xs text-slate-700 break-all leading-relaxed">
                                        {currentUrl}
                                    </div>
                                </div>

                                {/* Inline preview iframe */}
                                {modal.showPreview && (
                                    <div className="border border-slate-200 rounded-xl overflow-hidden" style={{ height: '180px' }}>
                                        <iframe srcDoc={modal.html} className="w-full h-full border-0 scale-[0.6] origin-top-left" style={{ width: '167%', height: '167%' }} title="Preview" sandbox="allow-same-origin" />
                                    </div>
                                )}

                                {/* Buttons */}
                                <div className="flex gap-3 pt-1">
                                    <button
                                        onClick={() => openLandingPreview(modal.html)}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all"
                                    >
                                        <Eye className="w-4 h-4" /> Ver
                                    </button>
                                    <button
                                        onClick={() => handleCopy(currentUrl, 'modal')}
                                        className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-bold text-white transition-all"
                                        style={{ background: modal.landing.accentColor }}
                                    >
                                        {copied === 'modal' ? (
                                            <><Check className="w-4 h-4" /> Copiado!</>
                                        ) : (
                                            <><Copy className="w-4 h-4" /> Copiar link</>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
