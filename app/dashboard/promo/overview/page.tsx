"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import {
    Copy, Check, ExternalLink, Eye, X, Globe,
    ChevronRight, Layout, Download,
    Image as ImageIcon, Upload, Sparkles, Search,
    ArrowRight, Languages, Link2, TrendingUp, Rocket, Play,
    Pencil, Plus, BarChart3, Shield, Zap, Briefcase, Cpu, Coins, Crown, Sparkle, FileText
} from 'lucide-react';
import {
    generateModularLandingHTML, openLandingPreview,
    type LandingData, type ModularConfig
} from '@/lib/landing-generator';
import { LANDING_TEMPLATES, type LandingTemplate } from '@/lib/landing-templates';
import { SECTION_CATALOG } from '@/lib/landing-sections';
import { supabase } from '@/lib/supabaseClient';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';
import { getTemplateDescription, getTemplateBadge, getSectionName } from '@/lib/i18n/template-translations';
import LibraryDocuments from '@/components/LibraryDocuments';

// ─── Idiomas ─────────────────────────────────────
const LANGUAGES = [
    { code: 'ES', flag: '🇪🇸', label: 'Español' },
    { code: 'GB', flag: '🇬🇧', label: 'English' },
    { code: 'BR', flag: '🇧🇷', label: 'Português' },
    { code: 'FR', flag: '🇫🇷', label: 'Français' },
    { code: 'AR', flag: '🇸🇦', label: 'العربية' },
    { code: 'JP', flag: '🇯🇵', label: '日本語' },
    { code: 'ZH', flag: '🇨🇳', label: '中文' },
    { code: 'ID', flag: '🇮🇩', label: 'Indonesia' },
    { code: 'VI', flag: '🇻🇳', label: 'Tiếng Việt' },
];

export default function PromoMaterialsPage() {
    const router = useRouter();
    const { t, lang } = useLanguage();
    const [mainTab, setMainTab] = useState<'landings' | 'banners' | 'documents'>('landings');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanding, setSelectedLanding] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState('ES');

    // Banner state
    const [selectedAspectRatio, setSelectedAspectRatio] = useState('16:9');
    const [uploadedImage, setUploadedImage] = useState<string | null>(null);

    const [copied, setCopied] = useState<string | null>(null);
    const [partnerId, setPartnerId] = useState('');
    const [friendlyPartnerId, setFriendlyPartnerId] = useState('');
    const [baseUrl, setBaseUrl] = useState('');
    const [showPreviewModal, setShowPreviewModal] = useState(false);
    const [previewHtml, setPreviewHtml] = useState('');

    const [formData, setFormData] = useState({
        fullName: 'Bridge Markets Partner',
        whatsapp: '+1234567890',
        email: 'partner@bridgemarkets.com',
    });

    useEffect(() => {
        setBaseUrl(window.location.origin);
        const loadInitialData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('partner_id, full_name, email')
                    .eq('id', user.id)
                    .single();
                const fId = profile?.partner_id || 'BM_' + user.id.substring(0, 8).toUpperCase();
                setFriendlyPartnerId(fId);
                setPartnerId(user.id);
                if (profile) {
                    setFormData(prev => ({
                        ...prev,
                        fullName: profile.full_name || prev.fullName,
                        email: profile.email || prev.email,
                    }));
                }
            }
        };
        loadInitialData();
    }, []);

    // Template categories
    const categories = ['all', ...Array.from(new Set(LANDING_TEMPLATES.map(t => t.category)))];

    const filtered = LANDING_TEMPLATES.filter(t => {
        const matchesFilter = activeFilter === 'all' || t.category === activeFilter;
        const desc = getTemplateDescription(t.id, lang);
        const matchesSearch = searchQuery === '' ||
            t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            desc.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
    });

    const handleCopy = (text: string, id: string) => {
        navigator.clipboard.writeText(text);
        setCopied(id);
        setTimeout(() => setCopied(null), 2000);
    };

    const handlePreview = (template: LandingTemplate) => {
        const data: LandingData = {
            fullName: formData.fullName,
            country: 'Global',
            language: selectedLang,
            whatsapp: formData.whatsapp,
            email: formData.email,
            landingType: template.id,
            partnerId: friendlyPartnerId || partnerId,
            slug: `preview-${template.id}`,
            modularConfig: {
                templateId: template.id,
                selectedSections: template.sections,
                sectionOverrides: {},
            },
        };
        const html = generateModularLandingHTML(data);
        setPreviewHtml(html);
        setShowPreviewModal(true);
    };

    const handleCustomize = (templateId: string) => {
        router.push(`/dashboard/landing?template=${templateId}`);
    };

    const getLandingUrl = (template: LandingTemplate) =>
        `${baseUrl}/l/${template.id}-${selectedLang.toLowerCase()}?ref=${friendlyPartnerId || partnerId}`;

    return (
        <div className="space-y-0 pb-10">
            {/* ─── Hero Header ─── */}
            <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#0d0221] via-[#1a0545] to-[#2d1070] mb-8">
                {/* Background effects */}
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#865BFF]/15 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[200px] bg-purple-600/5 rounded-full rotate-12 blur-[100px]" />

                {/* Main content area */}
                <div className="relative z-10 px-8 pt-8 pb-6">
                    <div className="flex items-start justify-between gap-8">
                        {/* Left: Title + Description */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#865BFF] to-[#6635de] flex items-center justify-center shadow-lg shadow-[#865BFF]/30">
                                    <Rocket className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <h2 className="text-2xl font-black text-white tracking-tight leading-tight">{t.overview.materialPost}</h2>
                                    <p className="text-sm text-purple-200/50 font-medium">{t.overview.materialPostDesc}</p>
                                </div>
                            </div>
                        </div>

                        {/* Right: Stats */}
                        <div className="hidden lg:flex items-center gap-1 bg-white/[0.06] backdrop-blur-xl border border-white/10 rounded-2xl px-6 py-3">
                            <div className="text-center px-4">
                                <div className="text-2xl font-black text-white leading-none">{LANDING_TEMPLATES.length}</div>
                                <div className="text-[9px] font-bold text-purple-300/50 uppercase tracking-widest mt-1">{t.nav.landingTools}</div>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-center px-4">
                                <div className="text-2xl font-black text-white leading-none">{SECTION_CATALOG.length}</div>
                                <div className="text-[9px] font-bold text-purple-300/50 uppercase tracking-widest mt-1">{t.promo.sections}</div>
                            </div>
                            <div className="w-px h-8 bg-white/10" />
                            <div className="text-center px-4">
                                <div className="text-2xl font-black text-white leading-none">{LANGUAGES.length}</div>
                                <div className="text-[9px] font-bold text-purple-300/50 uppercase tracking-widest mt-1">{t.promo.languages}</div>
                            </div>
                        </div>
                    </div>

                    {/* Tab switcher + Create button row */}
                    <div className="flex items-center justify-between mt-5">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => setMainTab('landings')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    mainTab === 'landings'
                                        ? 'bg-white text-[#0d0221] shadow-lg shadow-white/10'
                                        : 'bg-white/[0.07] text-white/60 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]'
                                }`}
                            >
                                <Globe className="w-4 h-4" /> {t.nav.landingTools}
                            </button>
                            <button
                                onClick={() => setMainTab('banners')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    mainTab === 'banners'
                                        ? 'bg-white text-[#0d0221] shadow-lg shadow-white/10'
                                        : 'bg-white/[0.07] text-white/60 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]'
                                }`}
                            >
                                <ImageIcon className="w-4 h-4" /> {t.nav.materialPost}
                            </button>
                            <button
                                onClick={() => setMainTab('documents')}
                                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold transition-all ${
                                    mainTab === 'documents'
                                        ? 'bg-white text-[#0d0221] shadow-lg shadow-white/10'
                                        : 'bg-white/[0.07] text-white/60 hover:bg-white/[0.12] hover:text-white border border-white/[0.08]'
                                }`}
                            >
                                <FileText className="w-4 h-4" /> {t.promo.documentsTab}
                            </button>
                        </div>
                        <button
                            onClick={() => router.push('/dashboard/landing')}
                            className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-[#865BFF] to-[#6635de] text-white shadow-lg shadow-[#865BFF]/30 hover:shadow-[#865BFF]/50 hover:scale-[1.02] active:scale-[0.98] transition-all group"
                        >
                            <Plus className="w-4 h-4" />
                            <span>{t.landing.title} +</span>
                            <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                        </button>
                    </div>
                </div>

                {/* Integrated toolbar strip — inside the hero but as a darker bottom bar */}
                {mainTab === 'landings' && (
                    <div className="relative z-10 border-t border-white/[0.06] bg-black/20 backdrop-blur-sm px-8 py-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                            {/* Search + Category filters */}
                            <div className="flex items-center gap-3 flex-1">
                                <div className="relative w-full md:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
                                    <input
                                        type="text"
                                        placeholder={t.topbar.search}
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="w-full pl-9 pr-4 py-2 bg-white/[0.07] border border-white/[0.08] rounded-xl text-sm text-white/90 placeholder:text-white/25 focus:outline-none focus:bg-white/[0.1] focus:border-[#865BFF]/50 transition-all"
                                    />
                                </div>
                                <div className="flex items-center gap-1 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                    {categories.map(cat => (
                                        <button
                                            key={cat}
                                            onClick={() => setActiveFilter(cat)}
                                            className={`px-3 py-1.5 rounded-lg text-[11px] font-bold transition-all flex-shrink-0 ${
                                                activeFilter === cat
                                                    ? 'bg-[#865BFF] text-white shadow-md shadow-[#865BFF]/30'
                                                    : 'text-white/40 hover:text-white/70 hover:bg-white/[0.07]'
                                            }`}
                                        >
                                            {cat === 'all' ? t.promo.all : cat}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Language selector */}
                            <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                <Languages className="w-3.5 h-3.5 text-white/25 flex-shrink-0" />
                                {LANGUAGES.map(l => (
                                    <button
                                        key={l.code}
                                        onClick={() => setSelectedLang(l.code)}
                                        className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-[11px] font-semibold transition-all flex-shrink-0 ${
                                            selectedLang === l.code
                                                ? 'bg-white/15 text-white border border-white/20'
                                                : 'text-white/35 hover:text-white/60 hover:bg-white/[0.06]'
                                        }`}
                                    >
                                        <span className="text-sm">{l.flag}</span>
                                        <span className="hidden xl:inline">{l.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── LANDINGS TAB ─── */}
            {mainTab === 'landings' && (
                <>
                    {/* Mobile create button */}
                    <div className="mb-6 sm:hidden">
                        <button
                            onClick={() => router.push('/dashboard/landing')}
                            className="w-full flex items-center justify-center gap-3 py-4 rounded-2xl border-2 border-dashed border-[#865BFF]/30 bg-[#865BFF]/5 text-[#865BFF] font-bold hover:bg-[#865BFF]/10 hover:border-[#865BFF]/50 transition-all group"
                        >
                            <Plus className="w-5 h-5 group-hover:scale-110 transition-transform" />
                            <span>{t.promo.createCustom}</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                        {filtered.map(template => {
                            const isSelected = selectedLanding === template.id;
                            const url = getLandingUrl(template);

                            return (
                                <div
                                    key={template.id}
                                    className={`group relative bg-white rounded-2xl border-2 overflow-hidden transition-all duration-300 ${
                                        isSelected
                                            ? 'border-[#865BFF] shadow-xl shadow-[#865BFF]/10 ring-2 ring-[#865BFF]/20'
                                            : 'border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5'
                                    }`}
                                >
                                    {/* Thumbnail Header */}
                                    <div
                                        className="relative h-40 overflow-hidden cursor-pointer"
                                        onClick={() => setSelectedLanding(isSelected ? null : template.id)}
                                        style={{ background: template.gradient }}
                                    >
                                        <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500" />
                                        
                                        {/* Glassmorphism Icon Overlay */}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="p-4 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 shadow-2xl transition-transform duration-500 group-hover:scale-110">
                                                {template.category === 'Analytics' ? <BarChart3 className="w-10 h-10 text-white" /> :
                                                 template.category === 'Institutional' ? <Shield className="w-10 h-10 text-white" /> :
                                                 template.category === 'High Conversion' ? <Zap className="w-10 h-10 text-white" /> :
                                                 template.category === 'Corporate' ? <Briefcase className="w-10 h-10 text-white" /> :
                                                 template.category === 'Tech' ? <Cpu className="w-10 h-10 text-white" /> :
                                                 template.category === 'Crypto' ? <Coins className="w-10 h-10 text-white" /> :
                                                 template.category === 'VIP' ? <Crown className="w-10 h-10 text-white" /> :
                                                 <Layout className="w-10 h-10 text-white" />}
                                            </div>
                                        </div>

                                        {template.badge && (
                                            <div className="absolute top-4 right-4 z-10">
                                                <span
                                                    className="text-white text-[10px] font-black px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                                                    style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
                                                >{getTemplateBadge(template.badge, lang)}</span>
                                            </div>
                                        )}

                                        <div className="absolute bottom-4 left-5 right-5 z-10">
                                            <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-white/50 mb-1">Bridge Markets</div>
                                            <h3 className="text-xl font-black text-white leading-tight drop-shadow-md">{template.name}</h3>
                                            <div className="text-xs font-semibold text-white/70 mt-1 flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                                {template.category}
                                            </div>
                                        </div>

                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handlePreview(template); }}
                                                className="flex items-center gap-2 bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-transform"
                                            >
                                                <Play className="w-3.5 h-3.5" /> {t.common.preview}
                                            </button>
                                            <button
                                                onClick={(e) => { e.stopPropagation(); handleCustomize(template.id); }}
                                                className="flex items-center gap-2 bg-[#865BFF] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-transform"
                                            >
                                                <Pencil className="w-3.5 h-3.5" /> {t.promo.customize}
                                            </button>
                                        </div>
                                    </div>

                                    {/* Card body */}
                                    <div className="p-4">
                                        <p className="text-[13px] text-slate-500 leading-relaxed mb-3 line-clamp-2">{getTemplateDescription(template.id, lang)}</p>

                                        {/* Section pills */}
                                        <div className="flex items-center gap-1 flex-wrap mb-4">
                                            {template.sections.slice(0, 3).map(sId => {
                                                const sec = SECTION_CATALOG.find(s => s.id === sId);
                                                return sec ? (
                                                    <span key={sId} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
                                                        <span className="material-symbols-outlined text-[10px]">{sec.icon}</span> {getSectionName(sId, lang)}
                                                    </span>
                                                ) : null;
                                            })}
                                            {template.sections.length > 3 && (
                                                <span className="text-[9px] text-slate-400 font-bold">+{template.sections.length - 3} {t.promo.more}</span>
                                            )}
                                        </div>

                                        {/* Action area - expanded */}
                                        <div className={`transition-all duration-300 overflow-hidden ${isSelected ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                                            <div className="flex items-center gap-2 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2.5 mb-3">
                                                <Link2 className="w-3.5 h-3.5 text-[#865BFF] flex-shrink-0" />
                                                <span className="text-[11px] font-mono text-slate-500 truncate flex-1">{url}</span>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleCopy(url, template.id); }}
                                                    className="p-1 rounded-md hover:bg-[#865BFF]/10 text-slate-400 hover:text-[#865BFF] transition-colors flex-shrink-0"
                                                >
                                                    {copied === template.id ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                                                </button>
                                            </div>
                                            <div className="flex gap-2">
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handlePreview(template); }}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-slate-200 text-xs font-bold text-slate-600 hover:bg-slate-50 transition-all"
                                                >
                                                    <Eye className="w-3.5 h-3.5" /> Preview
                                                </button>
                                                <button
                                                    onClick={(e) => { e.stopPropagation(); handleCustomize(template.id); }}
                                                    className="flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg border border-[#865BFF]/30 text-xs font-bold text-[#865BFF] hover:bg-[#865BFF]/5 transition-all"
                                                >
                                                    <Pencil className="w-3.5 h-3.5" /> {t.common.edit}
                                                </button>
                                                <button
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleCopy(url, `${template.id}-btn`);
                                                    }}
                                                    className="flex-[2] flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold text-white transition-all shadow-sm hover:shadow-md"
                                                    style={{ background: template.accentColor }}
                                                >
                                                    {copied === `${template.id}-btn` ? <><Check className="w-3.5 h-3.5" /> {t.common.success}!</> : <><Copy className="w-3.5 h-3.5" /> {t.common.copy} Link</>}
                                                </button>
                                            </div>
                                        </div>

                                        {/* Non-selected CTA */}
                                        {!isSelected && (
                                            <button
                                                onClick={() => setSelectedLanding(template.id)}
                                                className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold text-[#865BFF] bg-[#865BFF]/5 hover:bg-[#865BFF]/10 transition-all border border-[#865BFF]/10"
                                            >
                                                <Link2 className="w-3.5 h-3.5" /> {t.common.copy} Link <ArrowRight className="w-3 h-3 ml-0.5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </>
            )}

            {/* ─── BANNERS TAB ─── */}
            {mainTab === 'banners' && (
                <div className="flex flex-col xl:flex-row gap-0 border border-slate-200 rounded-2xl overflow-hidden bg-white shadow-sm min-h-[600px]">
                    <div className="w-full xl:w-[440px] p-8 border-r border-slate-200 flex flex-col shrink-0 bg-slate-50/50">
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight mb-1">{t.nav.materialPost}</h2>
                        <p className="text-sm text-slate-400 mb-8">{t.overview.materialsSubtitle}</p>

                        <div className="space-y-8 flex-1">
                            <div>
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-[#865BFF] text-white text-[10px] font-black flex items-center justify-center">1</span>
                                    {t.promo.uploadPiece}
                                </label>
                                <div className="border-2 border-dashed border-slate-300 rounded-xl bg-white hover:bg-slate-50 hover:border-[#865BFF]/30 transition-all cursor-pointer group flex flex-col items-center justify-center py-10 relative overflow-hidden">
                                    {uploadedImage ? (
                                        <div className="text-center">
                                            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-2">
                                                <Check className="w-6 h-6 text-emerald-500" />
                                            </div>
                                            <span className="text-sm font-semibold text-emerald-600">{t.promo.imageUploaded}</span>
                                        </div>
                                    ) : (
                                        <>
                                            <div className="w-12 h-12 bg-slate-100 rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform group-hover:bg-[#865BFF]/10">
                                                <Upload className="w-5 h-5 text-slate-400 group-hover:text-[#865BFF]" />
                                            </div>
                                            <span className="text-sm font-semibold text-slate-500">{t.promo.dragOrClick}</span>
                                            <span className="text-[10px] text-slate-400 mt-1">PNG, JPG, WebP — Max 10MB</span>
                                        </>
                                    )}
                                    <input
                                        type="file" className="absolute inset-0 opacity-0 cursor-pointer" accept="image/*"
                                        onChange={(e) => {
                                            if (e.target.files?.[0]) setUploadedImage(URL.createObjectURL(e.target.files[0]));
                                        }}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="text-[11px] font-black text-slate-500 uppercase tracking-widest mb-3 block flex items-center gap-2">
                                    <span className="w-5 h-5 rounded-md bg-[#865BFF] text-white text-[10px] font-black flex items-center justify-center">2</span>
                                    {t.promo.aspectRatio}
                                </label>
                                <div className="grid grid-cols-5 gap-2">
                                    {['16:9', '1:1', '9:16', '4:3', '3:4'].map(ratio => (
                                        <button
                                            key={ratio}
                                            onClick={() => setSelectedAspectRatio(ratio)}
                                            className={`py-2.5 rounded-xl text-xs font-bold border-2 transition-all ${
                                                selectedAspectRatio === ratio
                                                    ? 'bg-[#865BFF] border-[#865BFF] text-white shadow-md shadow-[#865BFF]/20'
                                                    : 'bg-white border-slate-200 text-slate-600 hover:border-slate-300'
                                            }`}
                                        >{ratio}</button>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button className={`w-full mt-8 flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all ${
                            uploadedImage
                                ? 'bg-[#865BFF] text-white hover:bg-[#7349e5] shadow-xl shadow-[#865BFF]/20 active:scale-[0.98]'
                                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                        }`}>
                            <Globe className="w-4 h-4" /> {t.common.generate}
                        </button>
                    </div>

                    <div className="flex-1 bg-white flex flex-col items-center justify-center p-12 min-h-[500px] relative">
                        <div className="absolute inset-0 opacity-[0.03]" style={{
                            backgroundImage: 'radial-gradient(circle at 2px 2px, #000 1px, transparent 0)',
                            backgroundSize: '24px 24px'
                        }} />
                        {uploadedImage ? (
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="mb-4 text-xs font-bold text-[#865BFF] tracking-widest uppercase bg-[#865BFF]/10 px-4 py-1.5 rounded-full">Preview</span>
                                <div className="rounded-xl overflow-hidden shadow-2xl border border-slate-200"
                                    style={{
                                        width: selectedAspectRatio === '16:9' ? '400px' : selectedAspectRatio === '1:1' ? '300px' : selectedAspectRatio === '9:16' ? '225px' : '360px',
                                        height: selectedAspectRatio === '16:9' ? '225px' : selectedAspectRatio === '1:1' ? '300px' : selectedAspectRatio === '9:16' ? '400px' : '270px',
                                        backgroundImage: `url(${uploadedImage})`, backgroundSize: 'cover', backgroundPosition: 'center',
                                    }}
                                >
                                    <div className="w-full h-full bg-black/10 flex items-end justify-center pb-4">
                                        <button className="bg-white/90 backdrop-blur font-bold text-slate-800 px-5 py-2 rounded-lg shadow-xl hover:scale-105 transition-transform flex items-center gap-2 text-sm">
                                            <Download className="w-4 h-4" /> {t.promo.export} {selectedAspectRatio}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className="text-center max-w-sm relative z-10">
                                <div className="w-20 h-20 rounded-2xl bg-slate-100 flex items-center justify-center mx-auto mb-6">
                                    <ImageIcon className="w-9 h-9 text-slate-300" />
                                </div>
                                <h3 className="text-xl font-black text-slate-800 mb-2">{t.landing.generatedTitle}</h3>
                                <p className="text-sm text-slate-400 leading-relaxed">
                                    {t.landing.generatedSubtitle}
                                </p>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* ─── DOCUMENTS TAB ─── */}
            {mainTab === 'documents' && (
                <LibraryDocuments />
            )}

            {/* Preview Modal */}
            {showPreviewModal && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-mono text-slate-400">preview — modular landing</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => openLandingPreview(previewHtml)}
                                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-200"
                                >
                                    <ExternalLink className="w-3.5 h-3.5" /> {t.common.preview}
                                </button>
                                <button
                                    onClick={() => setShowPreviewModal(false)}
                                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <iframe srcDoc={previewHtml} className="flex-1 w-full border-0" title="Landing Preview" sandbox="allow-same-origin allow-scripts" />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
