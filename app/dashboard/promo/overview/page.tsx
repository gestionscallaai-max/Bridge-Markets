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
        previewUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'forex',
        title: 'Mercados de Divisas — Spreads 0.0',
        desc: 'Enfocada en pares de divisas y ejecución ultra rápida.',
        type: 'forex',
        category: 'top',
        badge: 'Popular',
        badgeColor: '#3b82f6',
        gradient: 'linear-gradient(135deg,#020b18,#0a2440,#3b82f6)',
        accentColor: '#38bdf8',
        previewUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'cripto',
        title: 'Crypto Trading — 24/7',
        desc: 'Bitcoin, Ethereum y más criptoactivos con apalancamiento.',
        type: 'cripto',
        category: 'new',
        badge: 'Nuevo',
        badgeColor: '#f59e0b',
        gradient: 'linear-gradient(135deg,#000000,#2d1500,#f59e0b)',
        accentColor: '#fbbf24',
        previewUrl: 'https://images.unsplash.com/photo-1518546305927-5a555bb7020d?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'propfirm',
        title: 'Prop Firm — Evaluación de Capital',
        desc: 'Para traders que buscan capital de terceros.',
        type: 'propfirm',
        category: 'new',
        badge: 'Nuevo',
        badgeColor: '#10b981',
        gradient: 'linear-gradient(135deg,#000000,#003320,#10b981)',
        accentColor: '#34d399',
        previewUrl: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'bursatiles',
        title: 'Índices Bursátiles',
        desc: 'S&P500, NASDAQ, DAX y los principales índices globales.',
        type: 'bursatiles',
        category: 'all',
        badge: null,
        badgeColor: '#6366f1',
        gradient: 'linear-gradient(135deg,#0a0a1a,#1e1b4b,#6366f1)',
        accentColor: '#818cf8',
        previewUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'sinteticos',
        title: 'Índices Sintéticos 24/7',
        desc: 'Opera índices sintéticos sin importar el horario de mercado.',
        type: 'sinteticos',
        category: 'all',
        badge: null,
        badgeColor: '#e11d48',
        gradient: 'linear-gradient(135deg,#000000,#3d0015,#e11d48)',
        accentColor: '#f43f5e',
        previewUrl: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&q=80&w=800',
    },
    {
        id: 'promociones',
        title: 'Promociones Especiales',
        desc: 'Bonos exclusivos y ofertas para nuevos clientes.',
        type: 'promociones',
        category: 'new',
        badge: 'Nuevo',
        badgeColor: '#f43f5e',
        gradient: 'linear-gradient(135deg,#000000,#4a0030,#f43f5e)',
        accentColor: '#fb7185',
        previewUrl: 'https://images.unsplash.com/photo-1513885535751-8b9238bd345a?auto=format&fit=crop&q=80&w=800',
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
    type: 'landing' | 'banner';
    item: any;
    selectedLang: string;
    html?: string;
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
                type: 'landing',
                item: landing,
                selectedLang: defaultLang,
                html,
                showPreview: false,
                langDropdownOpen: false,
            });
            setIsEditingData(false); 
            setLoadingId(null);
        }, 350);
    };

    const handleOpenBannerModal = (banner: typeof PROMO_BANNERS[0]) => {
        setModal({
            type: 'banner',
            item: banner,
            selectedLang: bannerLanguages[banner.id] || 'ES',
            showPreview: true,
            langDropdownOpen: false,
        });
    };

    const handleLangChange = (langCode: string) => {
        if (!modal) return;
        if (modal.type === 'landing') {
            const data = buildLandingData(modal.item, langCode);
            const html = generateLandingHTML(data);
            setModal({ ...modal, selectedLang: langCode, html, langDropdownOpen: false });
        } else {
            setModal({ ...modal, selectedLang: langCode, langDropdownOpen: false });
            setBannerLanguages(prev => ({ ...prev, [modal.item.id]: langCode }));
        }
    };

    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleApplyChanges = () => {
        if (!modal || modal.type !== 'landing') return;
        const data = buildLandingData(modal.item, modal.selectedLang);
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
    const currentUrl = (modal && modal.type === 'landing') ? getLandingUrl(modal.item, modal.selectedLang) : '';

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
            <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-8">
                {filtered.map(landing => (
                    <div
                        key={landing.id}
                        className="bg-white border border-slate-200 rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group"
                    >
                        {/* Visual preview thumbnail */}
                        <div className="relative h-64 overflow-hidden bg-slate-900">
                            {/* Background Image with Overlay */}
                            <div className="absolute inset-0 z-0">
                                <img 
                                    src={landing.previewUrl} 
                                    alt={landing.title}
                                    className="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-1000"
                                />
                                <div 
                                    className="absolute inset-0 opacity-80"
                                    style={{ background: landing.gradient }}
                                />
                            </div>

                            <div className="absolute top-4 left-4 right-4 bg-white/10 backdrop-blur-md rounded-xl px-4 py-2 flex items-center gap-2 border border-white/15 z-10">
                                <div className="flex gap-1.5">
                                    <div className="w-2.5 h-2.5 rounded-full bg-red-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-yellow-400"></div>
                                    <div className="w-2.5 h-2.5 rounded-full bg-green-400"></div>
                                </div>
                                <div className="flex-1 bg-white/10 rounded-md px-3 py-1 text-white/70 text-[10px] font-mono truncate">
                                    bridgemarkets.com/l/{landing.id}?ref={partnerId}
                                </div>
                            </div>

                            <div className="absolute bottom-6 left-6 right-6 space-y-2 z-10">
                                <div className="text-[10px] font-bold uppercase tracking-widest text-white/40">Bridge Markets</div>
                                <div className="text-white font-black text-xl leading-tight drop-shadow-xl">
                                    {landing.title.split('—')[1]?.trim() || landing.title}
                                </div>
                                <div className="h-1 rounded-full w-16" style={{ background: landing.accentColor }}></div>
                            </div>

                            {landing.badge && (
                                <div className="absolute top-4 right-4 text-white text-[11px] font-black px-3.5 py-1.5 rounded-full z-10 shadow-lg" style={{ background: landing.badgeColor }}>
                                    {landing.badge}
                                </div>
                            )}

                            {/* Quick preview hover */}
                            <div className="absolute inset-0 bg-slate-950/60 backdrop-blur-[3px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center z-20">
                                <button
                                    onClick={() => {
                                        const html = generateLandingHTML(buildLandingData(landing, 'ES'));
                                        openLandingPreview(html);
                                    }}
                                    className="flex items-center gap-2 bg-white text-slate-900 text-sm font-black px-7 py-3.5 rounded-2xl shadow-2xl hover:scale-110 transition-all active:scale-95"
                                >
                                    <Eye className="w-5 h-5" /> Vista rápida
                                </button>
                            </div>
                        </div>

                        {/* Card body */}
                        <div className="p-6">
                            <div className="flex items-start justify-between mb-2">
                                <h3 className="font-black text-slate-800 text-lg leading-tight">{landing.title}</h3>
                                <div className="flex gap-1 ml-3 flex-shrink-0">
                                    {LANGUAGES.slice(0,4).map(l => (
                                        <span key={l.code} className="text-sm" title={l.label}>{l.flag}</span>
                                    ))}
                                    <span className="text-xs text-slate-400 font-bold">+{LANGUAGES.length - 4}</span>
                                </div>
                            </div>
                            <p className="text-sm text-slate-500 mb-6 leading-relaxed line-clamp-2">{landing.desc}</p>

                            {/* Link preview */}
                            <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 mb-4">
                                <Globe className="w-4 h-4 text-slate-400 flex-shrink-0" />
                                <span className="text-xs font-mono text-slate-500 truncate flex-1">
                                    /l/{landing.id}?ref={partnerId}
                                </span>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-3">
                                <button
                                    onClick={() => handleGetLink(landing)}
                                    disabled={loadingId === landing.id}
                                    className="flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl text-sm font-black transition-all shadow-sm hover:shadow-md active:scale-[0.98]"
                                    style={{ background: landing.accentColor, color: 'white' }}
                                >
                                    {loadingId === landing.id ? (
                                        <span className="animate-pulse">Cargando...</span>
                                    ) : (
                                        <><ExternalLink className="w-4 h-4" /> Obtener link</>
                                    )}
                                </button>
                                <button
                                    onClick={() => handleCopy(`${baseUrl}/l/${landing.id}-es?ref=${partnerId}`, landing.id)}
                                    className="w-12 h-12 flex items-center justify-center border border-slate-200 rounded-xl text-slate-400 hover:text-slate-800 hover:bg-slate-50 transition-all flex-shrink-0"
                                >
                                    {copied === landing.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
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
                                            onClick={() => handleOpenBannerModal(banner)}
                                            className="w-full flex items-center justify-center gap-2 bg-[#865BFF] text-white py-2.5 rounded-lg font-bold text-sm hover:bg-[#6b3fd6] transition-colors shadow-lg"
                                        >
                                            <ExternalLink className="w-4 h-4" /> Configurar y Descargar
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

            {/* ─── Modal Unificado (Landings y Banners) ─── */}
            {modal && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-3xl w-full max-w-[850px] shadow-2xl overflow-hidden border border-white/20 animate-in fade-in zoom-in duration-200">

                        {/* Modal header */}
                        <div className="flex items-center justify-between px-8 py-5 border-b border-slate-100">
                            <div>
                                <h2 className="font-black text-slate-800 text-xl tracking-tight">
                                    {modal.type === 'landing' ? 'Obtener link' : 'Configurar Descarga'}
                                </h2>
                                <p className="text-sm text-slate-400 mt-0.5">{modal.item.title}</p>
                            </div>
                            <button
                                onClick={() => setModal(null)}
                                className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-slate-100 text-slate-500 transition-all active:scale-95"
                            >
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-0">
                            {/* Preview thumbnail left */}
                            <div
                                className="relative w-full md:w-[320px] shrink-0 cursor-pointer overflow-hidden group/modal"
                                style={{ background: modal.type === 'landing' ? modal.item.gradient : '#0f172a', minHeight: '400px' }}
                                onClick={() => setModal({ ...modal, showPreview: !modal.showPreview })}
                            >
                                {/* Modal side image background */}
                                <div className="absolute inset-0 z-0">
                                    <img 
                                        src={modal.type === 'landing' ? modal.item.previewUrl : modal.item.url} 
                                        className={`w-full h-full object-cover ${modal.type === 'landing' ? 'opacity-30 blur-[2px] scale-125' : 'opacity-100'}`} 
                                        alt="Preview"
                                    />
                                    {modal.type === 'landing' && <div className="absolute inset-0 bg-black/20" />}
                                </div>
                                
                                {modal.type === 'landing' && (
                                    <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 z-10">
                                        <div className="text-white font-black text-2xl mb-3 leading-tight drop-shadow-lg">
                                            {modal.item.title.split('—')[1]?.trim() || modal.item.title}
                                        </div>
                                        <div className="text-white/60 text-sm mb-6 font-medium">Haz clic para previsualizar</div>
                                        <div className="flex items-center gap-2.5 bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xl group-hover/modal:bg-white/30 transition-all">
                                            <Eye className="w-4 h-4" /> Vista previa
                                        </div>
                                    </div>
                                )}

                                {/* Mini lang label */}
                                <div className="absolute bottom-6 left-6 right-6 text-center z-10">
                                    <span className="text-white/70 text-xs font-bold px-3 py-1 bg-black/40 rounded-full backdrop-blur-md border border-white/10">
                                        {currentLangObj?.flag} {currentLangObj?.label}
                                    </span>
                                </div>
                            </div>

                            {/* Right panel */}
                            <div className="flex-1 p-8 space-y-6 overflow-y-auto max-h-[85vh] bg-slate-50/30">
                                {/* Language selector */}
                                <div>
                                    <label className="text-[11px] font-black text-slate-400 uppercase tracking-[0.1em] block mb-2.5 px-1">
                                        Idioma del Material
                                    </label>
                                    <div className="relative">
                                        <button
                                            onClick={() => setModal({ ...modal, langDropdownOpen: !modal.langDropdownOpen })}
                                            className="w-full flex items-center justify-between px-5 py-4 bg-white border border-slate-200 rounded-2xl text-sm font-bold text-slate-800 hover:border-[#865BFF] hover:shadow-md transition-all group"
                                        >
                                            <span className="flex items-center gap-3">
                                                <span className="text-xl filter drop-shadow-sm">{currentLangObj?.flag}</span>
                                                {currentLangObj?.label}
                                            </span>
                                            <ChevronDown className={`w-5 h-5 text-slate-400 transition-transform duration-300 ${modal.langDropdownOpen ? 'rotate-180' : ''}`} />
                                        </button>

                                        {modal.langDropdownOpen && (
                                            <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-slate-200 rounded-2xl shadow-2xl z-50 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
                                                <div className="max-h-[280px] overflow-y-auto py-2">
                                                    {LANGUAGES.map(lang => (
                                                        <button
                                                            key={lang.code}
                                                            onClick={() => handleLangChange(lang.code)}
                                                            className={`w-full flex items-center gap-4 px-5 py-3.5 text-sm transition-colors text-left ${modal.selectedLang === lang.code
                                                                    ? 'bg-[#865BFF]/5 text-[#865BFF] font-bold'
                                                                    : 'text-slate-600 hover:bg-slate-50'
                                                                }`}
                                                        >
                                                            <span className="text-xl">{lang.flag}</span>
                                                            <span className="flex-1">{lang.label}</span>
                                                            {modal.selectedLang === lang.code && (
                                                                <Check className="w-4 h-4" />
                                                            )}
                                                        </button>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {modal.type === 'landing' ? (
                                    <>
                                        {/* User Form Data Toggle */}
                                        <div className="border border-slate-200 rounded-2xl overflow-hidden bg-white">
                                            <button 
                                                onClick={() => setIsEditingData(!isEditingData)}
                                                className="w-full flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors"
                                            >
                                                <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest flex items-center gap-2.5">
                                                    <User className="w-4 h-4 text-[#865BFF]" />
                                                    Personalización de Datos
                                                </span>
                                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isEditingData ? 'rotate-180' : ''}`} />
                                            </button>
                                            
                                            {isEditingData && (
                                                <div className="p-5 border-t border-slate-100 space-y-4 animate-in fade-in slide-in-from-top-1">
                                                    <div>
                                                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Nombre en la Landing</label>
                                                        <input 
                                                            type="text" 
                                                            name="fullName"
                                                            value={formData.fullName} 
                                                            onChange={handleFormChange}
                                                            className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#865BFF] focus:bg-white transition-all"
                                                        />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div>
                                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">WhatsApp</label>
                                                            <input 
                                                                type="text" 
                                                                name="whatsapp"
                                                                value={formData.whatsapp} 
                                                                onChange={handleFormChange}
                                                                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#865BFF]"
                                                            />
                                                        </div>
                                                        <div>
                                                            <label className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">Email</label>
                                                            <input 
                                                                type="email" 
                                                                name="email"
                                                                value={formData.email} 
                                                                onChange={handleFormChange}
                                                                className="w-full px-4 py-2.5 text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#865BFF]"
                                                            />
                                                        </div>
                                                    </div>
                                                    <button 
                                                        onClick={handleApplyChanges}
                                                        className="w-full mt-2 bg-slate-900 text-white font-bold text-xs py-3 rounded-xl hover:bg-[#865BFF] transition-all shadow-lg shadow-slate-200 active:scale-[0.98]"
                                                    >
                                                        Aplicar cambios al link
                                                    </button>
                                                </div>
                                            )}
                                        </div>

                                        {/* Link personalizado */}
                                        <div className="space-y-2.5">
                                            <label className="text-[11px] font-black text-slate-400 uppercase tracking-widest px-1">Tu link de Afiliado</label>
                                            <div className="bg-white border border-slate-200 rounded-2xl px-5 py-4 font-mono text-xs text-[#865BFF] break-all leading-relaxed shadow-sm">
                                                {currentUrl}
                                            </div>
                                        </div>

                                        {/* Inline preview iframe */}
                                        {modal.showPreview && (
                                            <div className="border-2 border-slate-200 rounded-2xl overflow-hidden shadow-inner bg-slate-100" style={{ height: '220px' }}>
                                                <iframe srcDoc={modal.html} className="w-full h-full border-0 scale-[0.6] origin-top-left" style={{ width: '167%', height: '367%' }} title="Preview" sandbox="allow-same-origin" />
                                            </div>
                                        )}

                                        {/* Buttons Landing */}
                                        <div className="flex gap-4 pt-2">
                                            <button
                                                onClick={() => openLandingPreview(modal.html!)}
                                                className="flex-1 flex items-center justify-center gap-2.5 py-4 rounded-2xl border-2 border-slate-200 text-sm font-bold text-slate-700 hover:bg-white hover:border-slate-300 transition-all active:scale-95"
                                            >
                                                <Eye className="w-5 h-5" /> Ver en vivo
                                            </button>
                                            <button
                                                onClick={() => handleCopy(currentUrl, 'modal')}
                                                className="flex-2 flex-[2] flex items-center justify-center gap-2.5 py-4 rounded-2xl text-sm font-black text-white transition-all shadow-xl active:scale-95"
                                                style={{ background: modal.item.accentColor }}
                                            >
                                                {copied === 'modal' ? (
                                                    <><Check className="w-5 h-5" /> ¡Copiado!</>
                                                ) : (
                                                    <><Copy className="w-5 h-5" /> Copiar link de Afiliado</>
                                                )}
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        {/* Contenido para Banners */}
                                        <div className="bg-white border border-slate-200 rounded-2xl p-6 flex flex-col items-center justify-center text-center space-y-4">
                                            <div className="w-16 h-16 bg-emerald-50 rounded-full flex items-center justify-center">
                                                <ImageIcon className="w-8 h-8 text-emerald-500" />
                                            </div>
                                            <div>
                                                <h3 className="font-black text-slate-800">Listo para descargar</h3>
                                                <p className="text-sm text-slate-500 mt-1">
                                                    El archivo se generará en formato **{modal.item.format}** con el idioma seleccionado: **{currentLangObj?.label}**.
                                                </p>
                                            </div>
                                        </div>

                                        <div className="space-y-4 pt-4">
                                            <button
                                                onClick={() => {
                                                    handleCopy(`${modal.item.url}?lang=${modal.selectedLang}`, 'modal');
                                                    alert(`Descargando banner en ${currentLangObj?.label}...`);
                                                }}
                                                className="w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-lg font-black text-white shadow-2xl transition-all active:scale-[0.98]"
                                                style={{ background: '#865BFF' }}
                                            >
                                                {copied === 'modal' ? <Check className="w-6 h-6" /> : <Download className="w-6 h-6" />}
                                                {copied === 'modal' ? '¡Descargado!' : 'Descargar en Alta Definición'}
                                            </button>
                                            <p className="text-[11px] text-center text-slate-400 font-medium italic">
                                                * Resolución recomendada para {modal.item.format.split(' ')[0]}
                                            </p>
                                        </div>
                                    </>
                                )}
                            </div>
                        </div>
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
