"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Copy, Check, ExternalLink, Eye, X, Globe, Filter, Zap, Star, TrendingUp, ChevronDown, User, Layout, Download, Image as ImageIcon } from 'lucide-react';
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
        title: 'Mercados de Divisas — Spreads 0.0',
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
        title: 'Prop Firm — Evaluación de Capital',
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
    {
        id: 'premium_chess',
        title: 'Premium Black — Ajedrez',
        desc: 'Diseño exclusivo con piezas 3D y temática elite para captación VIP.',
        type: 'premium_chess',
        category: 'top',
        badge: 'Exclusivo',
        badgeColor: '#07020f',
        gradient: 'linear-gradient(135deg,#07020f,#140633,#865BFF)',
        accentColor: '#865BFF',
    },
];

// ─── Idiomas disponibles ─────────────────────────────────────
const LANGUAGES = [
    { code: 'ES', flag: '🇪🇸', label: 'Español' },
    { code: 'GB', flag: '🇬🇧', label: 'English' },
    { code: 'BR', flag: '🇧🇷', label: 'Português' },
    { code: 'FR', flag: '🇫🇷', label: 'Français' },
    { code: 'AR', flag: '🇸🇦', label: 'العربية', rtl: true },
    { code: 'JP', flag: '🇯🇵', label: '日本語' },
    { code: 'ZH', flag: '🇨🇳', label: '中文 (简体)' },
    { code: 'ID', flag: '🇮🇩', label: 'Bahasa Indonesia' },
    { code: 'VI', flag: '🇻🇳', label: 'Tiếng Việt' },
];

const TABS = [
    { id: 'top', label: 'Top Converting', icon: Star },
    { id: 'new', label: 'Nuevas', icon: Zap },
    { id: 'all', label: 'Todas', icon: Globe },
];

const MAIN_CATEGORIES = [
    { id: 'landings', label: 'Landings Web Generables', icon: Globe },
    { id: 'banners', label: 'Piezas Gráficas y Banners', icon: Layout },
];

const PROMO_BANNERS = [
    {
        id: 'b1', title: 'Bono 100% de Bienvenida', format: 'Post (1080x1080)',
        url: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
        category: 'Promociones'
    },
    {
        id: 'b2', title: 'Trading Institucional PRO', format: 'Story (1080x1920)',
        url: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
        category: 'Institucional'
    },
    {
        id: 'b3', title: 'Cuentas de Evaluación', format: 'Banner Web (1920x1080)',
        url: 'https://images.unsplash.com/photo-1642543492481-44e81e3914a7?auto=format&fit=crop&q=80&w=800',
        category: 'Prop Firm'
    },
    {
        id: 'b4', title: 'Mercados de Divisas', format: 'Post Cuadrado (1080x1080)',
        url: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&q=80&w=800',
        category: 'Divisas'
    },
    {
        id: 'b5', title: 'Criptomonedas 24/7', format: 'Reel (1080x1920)',
        url: 'https://images.unsplash.com/photo-1621416894569-0f39ed31d247?auto=format&fit=crop&q=80&w=800',
        category: 'Cripto'
    },
    {
        id: 'b6', title: 'Índices Sintéticos', format: 'Post Cuadrado (1080x1080)',
        url: 'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?auto=format&fit=crop&q=80&w=800',
        category: 'Sintéticos'
    }
];

interface ModalState {
    landing: typeof PROMO_LANDINGS[0];
    selectedLang: string;
    html: string;
    showPreview: boolean;
    langDropdownOpen: boolean;
}

export default function PromoMaterialsPage() {
    const [mainTab, setMainTab] = useState<'landings' | 'banners'>('landings');
    const [activeTab, setActiveTab] = useState<'top' | 'new' | 'all'>('top');
    const [bannerCategory, setBannerCategory] = useState<string>('all');
    const [bannerLanguages, setBannerLanguages] = useState<Record<string, string>>({});
    const [modal, setModal] = useState<ModalState | null>(null);
    const [copied, setCopied] = useState<string | null>(null);
    const [loadingId, setLoadingId] = useState<string | null>(null);
    const [partnerId, setPartnerId] = useState('BM_PARTNER_01');
    const [baseUrl, setBaseUrl] = useState('');
    
    // Default form data for the modal
    const [formData, setFormData] = useState({
        fullName: 'Bridge Markets Partner',
        whatsapp: '+1234567890',
        email: 'partner@bridgemarkets.com',
    });

    // Custom toggle for edit section in modal
    const [isEditingData, setIsEditingData] = useState(false);

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
        fullName: formData.fullName,
        country: langCode === 'BR' ? 'Brasil' : langCode === 'GB' ? 'Global' : 'España', // Simplified mapping, but works
        language: langCode,
        whatsapp: formData.whatsapp,
        email: formData.email,
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
            setIsEditingData(false); // reset on open
            setLoadingId(null);
        }, 350);
    };

    const handleLangChange = (langCode: string) => {
        if (!modal) return;
        const data = buildLandingData(modal.landing, langCode);
        const html = generateLandingHTML(data);
        setModal({ ...modal, selectedLang: langCode, html, langDropdownOpen: false });
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyChanges = () => {
        if (!modal) return;
        const data = buildLandingData(modal.landing, modal.selectedLang);
        const html = generateLandingHTML(data);
        setModal({ ...modal, html });
        setIsEditingData(false);
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

            {/* Main Tabs (Landings vs Banners) */}
            <div className="flex bg-slate-100 p-1.5 rounded-xl w-fit mb-6">
                {MAIN_CATEGORIES.map(cat => {
                    const Icon = cat.icon;
                    return (
                        <button
                            key={cat.id}
                            onClick={() => setMainTab(cat.id as any)}
                            className={`flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all ${
                                mainTab === cat.id
                                    ? 'bg-white text-slate-800 shadow-sm border border-slate-200/50'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'
                            }`}
                        >
                            <Icon className={`w-4 h-4 ${mainTab === cat.id ? 'text-[#865BFF]' : 'text-slate-400'}`} />
                            {cat.label}
                        </button>
                    );
                })}
            </div>

            {mainTab === 'landings' && (
                <>
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

            {/* Grid de landing cards - Larger cards! */}
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-6">
                {filtered.map(landing => (
                    <div
                        key={landing.id}
                        className="bg-white border border-slate-200 rounded-2xl overflow-hidden shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 group"
                    >
                        {/* Visual preview thumbnail */}
                        <div className="relative h-48 overflow-hidden" style={{ background: landing.gradient }}>
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
                </>
            )}

            {/* PIEZAS GRÁFICAS - BANNERS SECTION */}
            {mainTab === 'banners' && (
                <div className="space-y-6">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
                            {['all', 'Promociones', 'Institucional', 'Prop Firm', 'Divisas', 'Cripto', 'Sintéticos'].map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setBannerCategory(cat)}
                                    className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all whitespace-nowrap ${
                                        bannerCategory === cat 
                                            ? 'bg-slate-800 text-white' 
                                            : 'bg-white border border-slate-200 text-slate-500 hover:bg-slate-50'
                                    }`}
                                >
                                    {cat === 'all' ? 'Todas las Categorías' : cat}
                                </button>
                            ))}
                        </div>
                        <button className="flex items-center gap-2 px-4 py-2 bg-white border border-slate-200 text-slate-600 rounded-lg text-sm font-semibold hover:bg-slate-50 transition-all">
                            <Filter className="w-4 h-4" /> Filtros
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {PROMO_BANNERS.filter(b => bannerCategory === 'all' || b.category === bannerCategory).map((banner) => (
                            <div key={banner.id} className="bg-white rounded-2xl border border-slate-200 overflow-hidden group hover:shadow-xl transition-all duration-300">
                                <div className="aspect-[4/5] relative bg-slate-100 overflow-hidden flex items-center justify-center">
                                    <img src={banner.url} alt={banner.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                                        <button 
                                            onClick={() => {
                                                const lang = bannerLanguages[banner.id] || 'ES';
                                                console.log(`Iniciando descarga: ${banner.url}?lang=${lang}`);
                                                handleCopy(`${banner.url}?lang=${lang}`, banner.id);
                                                // Simulación visual en vez de descarga real
                                                alert(`Descargando ${banner.title} en el idioma seleccionado: ${lang}`);
                                            }}
                                            className="w-full flex items-center justify-center gap-2 bg-[#865BFF] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#6b3fd6] transition-colors shadow-lg"
                                        >
                                            {copied === banner.id ? <Check className="w-4 h-4" /> : <Download className="w-4 h-4" />}
                                            {copied === banner.id ? 'Descargado' : 'Descargar Alta Calidad'}
                                        </button>
                                    </div>
                                    <div className="absolute top-3 left-3 bg-black/60 backdrop-blur-md px-2.5 py-1 text-white text-[10px] font-bold rounded-md tracking-wider border border-white/20">
                                        {banner.category}
                                    </div>
                                </div>
                                <div className="p-4">
                                    <h3 className="font-bold text-slate-800 mb-2 truncate" title={banner.title}>{banner.title}</h3>
                                    <div className="flex items-center justify-between mb-3">
                                        <span className="text-[11px] font-semibold text-slate-500 bg-slate-100 px-2 py-0.5 rounded-md">{banner.format}</span>
                                        <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
                                            <ImageIcon className="w-3 h-3" /> HD
                                        </span>
                                    </div>
                                    <div className="border-t border-slate-100 pt-3 flex items-center justify-between">
                                        <div className="flex items-center gap-1.5 w-full">
                                            <Globe className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                                            <select
                                                value={bannerLanguages[banner.id] || 'ES'}
                                                onChange={(e) => setBannerLanguages(prev => ({ ...prev, [banner.id]: e.target.value }))}
                                                className="w-full text-xs font-bold text-slate-700 bg-transparent border-none appearance-none outline-none cursor-pointer hover:text-[#865BFF] transition-colors"
                                            >
                                                {LANGUAGES.map(l => (
                                                    <option key={l.code} value={l.code}>{l.flag} {l.label} ({l.code})</option>
                                                ))}
                                            </select>
                                            <ChevronDown className="w-3 h-3 text-slate-400 shrink-0 pointer-events-none" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    
                    {/* Placeholder when filtered but none match */}
                    {PROMO_BANNERS.filter(b => bannerCategory === 'all' || b.category === bannerCategory).length === 0 && (
                        <div className="py-20 text-center border-2 border-dashed border-slate-200 rounded-2xl bg-slate-50">
                            <ImageIcon className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                            <h3 className="text-slate-600 font-bold mb-1">No hay piezas en esta categoría</h3>
                            <p className="text-slate-400 text-sm">Estamos agregando material publicitario. Vuelve pronto.</p>
                        </div>
                    )}
                </div>
            )}

            {/* ─── Modal "Obtener link" con selector de idioma ─── */}
            {modal && typeof document !== 'undefined' && createPortal(
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
                            <div className="flex-1 p-6 space-y-5 overflow-y-auto max-h-[85vh]">
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

                                {/* User Form Data Toggle */}
                                <div className="border border-slate-200 rounded-xl overflow-hidden">
                                    <button 
                                        onClick={() => setIsEditingData(!isEditingData)}
                                        className="w-full flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 transition-colors"
                                    >
                                        <span className="text-xs font-bold text-slate-700 uppercase tracking-wider flex items-center gap-2">
                                            <User className="w-4 h-4 text-emerald-500" />
                                            Datos del Partner (Formularios)
                                        </span>
                                        <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isEditingData ? 'rotate-180' : ''}`} />
                                    </button>
                                    
                                    {isEditingData && (
                                        <div className="p-4 bg-white border-t border-slate-200 space-y-3">
                                            <div>
                                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Nombre Completo</label>
                                                <input 
                                                    type="text" 
                                                    name="fullName"
                                                    value={formData.fullName} 
                                                    onChange={handleFormChange}
                                                    className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF]"
                                                />
                                            </div>
                                            <div className="grid grid-cols-2 gap-3">
                                                <div>
                                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">WhatsApp</label>
                                                    <input 
                                                        type="text" 
                                                        name="whatsapp"
                                                        value={formData.whatsapp} 
                                                        onChange={handleFormChange}
                                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#865BFF]"
                                                    />
                                                </div>
                                                <div>
                                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1">Email</label>
                                                    <input 
                                                        type="email" 
                                                        name="email"
                                                        value={formData.email} 
                                                        onChange={handleFormChange}
                                                        className="w-full px-3 py-2 text-sm border border-slate-200 rounded-lg focus:outline-none focus:border-[#865BFF]"
                                                    />
                                                </div>
                                            </div>
                                            <button 
                                                onClick={handleApplyChanges}
                                                className="w-full mt-2 bg-[#865BFF] text-white font-semibold text-xs py-2.5 rounded-lg hover:bg-[#6b3fd6] transition-colors"
                                            >
                                                Aplicar y Actualizar Landing
                                            </button>
                                        </div>
                                    )}
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
                </div>,
                document.body
            )}
        </div>
    );
}
