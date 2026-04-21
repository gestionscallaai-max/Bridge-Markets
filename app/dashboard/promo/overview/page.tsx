"use client";
import React, { useState, useEffect, useContext } from 'react';
import { createPortal } from 'react-dom';
import {
    Copy, Check, ExternalLink, Eye, X, Globe,
    ChevronRight, Layout, Download,
    Image as ImageIcon, Upload, Sparkles, Search,
    ArrowRight, Languages, Link2, TrendingUp, Rocket, Play,
    Pencil, Plus, BarChart3, Shield, Zap, Briefcase, Cpu, Coins, Crown, Sparkle, FileText,
    History as HistoryIcon
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
import MaterialGallery from '@/components/Promo/MaterialGallery';
import { RoleContext } from '@/lib/context';
import { getT, LANGUAGE_META } from '@/lib/i18n/translations';
import type { LangCode } from '@/lib/i18n/types';

// ─── Idiomas ─────────────────────────────────────
const LANGUAGES = Object.entries(LANGUAGE_META).map(([code, meta]) => ({
    code: code.toUpperCase(),
    flag: meta.flag,
    label: meta.nativeLabel
}));

export default function PromoMaterialsPage() {
    const { userRole } = useContext(RoleContext);
    const router = useRouter();
    const { t, lang } = useLanguage();
    const [mainTab, setMainTab] = useState<'landings' | 'banners' | 'documents'>('landings');
    const [activeFilter, setActiveFilter] = useState<string>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedLanding, setSelectedLanding] = useState<string | null>(null);
    const [selectedLang, setSelectedLang] = useState(lang.toUpperCase());

    // Auto-sync local language with global language when it changes
    useEffect(() => {
        setSelectedLang(lang.toUpperCase());
    }, [lang]);

    // State for coordination
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
        communityName: '',
        heroPhrase: '',
        instagram: '',
        telegram: '',
        tiktok: '',
        ctaLink: '',
    });

    useEffect(() => {
        setBaseUrl(window.location.origin);
        const loadInitialData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                // Fetch consolidated data from 'partners'
                const { data: partner } = await supabase
                    .from('partners')
                    .select('partner_id, full_name, email, name')
                    .eq('id', user.id)
                    .single();

                const fId = partner?.partner_id || 'BM_' + user.id.replace(/-/g, '').substring(0, 24).toUpperCase();
                setFriendlyPartnerId(fId);
                setPartnerId(user.id);

                if (partner) {
                    setFormData(prev => ({
                        ...prev,
                        fullName: partner.full_name || partner.name || prev.fullName,
                        email: partner.email || prev.email,
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
        const mappedLang = selectedLang === 'EN' ? 'GB' : selectedLang === 'PT' ? 'BR' : selectedLang;
        
        const data: LandingData = {
            fullName: formData.fullName,
            country: 'Global',
            language: mappedLang,
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
            communityName: formData.communityName,
            heroPhrase: formData.heroPhrase,
            instagram: formData.instagram,
            telegram: formData.telegram,
            tiktok: formData.tiktok,
            ctaLink: formData.ctaLink,
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
                <div className="absolute inset-0 opacity-[0.06]" style={{
                    backgroundImage: 'radial-gradient(circle at 2px 2px, rgba(255,255,255,0.2) 1px, transparent 0)',
                    backgroundSize: '24px 24px'
                }} />
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#865BFF]/15 rounded-full blur-[150px] -translate-y-1/3 translate-x-1/4" />
                <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-500/10 rounded-full blur-[120px] translate-y-1/3 -translate-x-1/4" />
                
                {/* Watermark Logo */}
                <div className="absolute right-10 bottom-0 w-64 h-64 opacity-[0.05] grayscale brightness-0 invert pointer-events-none">
                    <img src="/images/LOGO PARA FONDOS.png" alt="" className="w-full h-full object-contain" />
                </div>

                <div className="relative z-10 px-8 pt-8 pb-6">
                    <div className="flex items-start justify-between gap-8">
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
                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => router.push('/dashboard/promo/history')}
                                className="hidden sm:flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold bg-white text-[#0d0221] shadow-lg border border-slate-200 hover:bg-slate-50 transition-all"
                            >
                                <HistoryIcon className="w-4 h-4" />
                                <span>{t.landing.history}</span>
                            </button>
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
                </div>

                {mainTab === 'landings' && (
                    <div className="relative z-10 border-t border-white/[0.06] bg-black/20 backdrop-blur-sm px-8 py-4">
                        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
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

                            <div className="flex items-center gap-1.5 overflow-x-auto" style={{ scrollbarWidth: 'none' }}>
                                {/* Local language selector removed as it was redundant. Marketing materials now follow the global dashboard language. */}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* ─── LANDINGS TAB ─── */}
            {mainTab === 'landings' && (
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                    {filtered.map(template => {
                        const isSelected = selectedLanding === template.id;
                        const url = getLandingUrl(template);
                        
                        // Correctly map global language to translation keys
                        const previewT = getT(lang as LangCode);

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
                                             <Layout className="w-10 h-10 text-white" />}
                                        </div>
                                    </div>

                                    {template.badge && (
                                        <div className="absolute top-4 right-4 z-10">
                                            <span
                                                className="text-white text-[10px] font-medium px-3 py-1.5 rounded-full uppercase tracking-wider shadow-lg"
                                                style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)', border: '1px solid rgba(255,255,255,0.1)' }}
                                            >{getTemplateBadge(template.badge || 'New', lang as LangCode)}</span>
                                        </div>
                                    )}

                                    <div className="absolute bottom-4 left-5 right-5 z-10">
                                        <div className="text-[10px] font-medium uppercase tracking-[0.2em] text-white/50 mb-1">Bridge Markets</div>
                                        <h3 className="text-xl font-medium text-white leading-tight drop-shadow-md">{previewT.templates[`${template.id}_name` as keyof typeof previewT.templates] || template.name}</h3>
                                    </div>

                                    {/* Hover overlay */}
                                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-300 flex items-center justify-center gap-3 z-20">
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handlePreview(template); }}
                                            className="flex items-center gap-2 bg-white text-slate-900 text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-transform"
                                        >
                                            <Play className="w-3.5 h-3.5" /> Preview
                                        </button>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleCustomize(template.id); }}
                                            className="flex items-center gap-2 bg-[#865BFF] text-white text-xs font-bold px-4 py-2.5 rounded-xl shadow-xl hover:scale-105 transition-transform"
                                        >
                                            <Pencil className="w-3.5 h-3.5" /> Edit
                                        </button>
                                    </div>
                                </div>

                                {/* Card body */}
                                <div className="p-4">
                                    <p className="text-[13px] text-slate-500 leading-relaxed mb-3 line-clamp-2">{previewT.templates[`${template.id}_desc` as keyof typeof previewT.templates] || getTemplateDescription(template.id, lang as LangCode)}</p>

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
                                    </div>

                                    {/* Non-selected CTA */}
                                    {!isSelected && (
                                        <button
                                            onClick={() => setSelectedLanding(template.id)}
                                            className="w-full flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs font-bold text-[#865BFF] bg-[#865BFF]/5 hover:bg-[#865BFF]/10 transition-all border border-[#865BFF]/10"
                                        >
                                            <Link2 className="w-3.5 h-3.5" /> {t.gallery.copyLink} <ArrowRight className="w-3 h-3 ml-0.5" />
                                        </button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            )}

            {/* ─── BANNERS TAB ─── */}
            {mainTab === 'banners' && (
                <div className="space-y-6">
                    <MaterialGallery userRole={userRole} />
                </div>
            )}

            {/* ─── DOCUMENTS TAB ─── */}
            {mainTab === 'documents' && (
                <LibraryDocuments />
            )}

            {showPreviewModal && typeof document !== 'undefined' && createPortal(
                <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                            <span className="text-xs font-mono text-slate-400">preview — modular landing</span>
                            <button onClick={() => setShowPreviewModal(false)} className="p-1 rounded-lg hover:bg-slate-200 text-slate-500"><X className="w-5 h-5" /></button>
                        </div>
                        <iframe srcDoc={previewHtml} className="flex-1 w-full border-0" title="Landing Preview" sandbox="allow-same-origin allow-scripts" />
                    </div>
                </div>,
                document.body
            )}
        </div>
    );
}
