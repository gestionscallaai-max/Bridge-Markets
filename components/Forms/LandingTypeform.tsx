"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import {
    ChevronRight, ChevronDown, ChevronUp, Check, Globe, User,
    Loader2, Rocket, Layout, Sparkles, Copy, ExternalLink,
    Pencil, Eye, X, Download, ToggleLeft, ToggleRight,
    Plus, GripVertical, Trash2, ArrowLeft, ArrowRight, Save, Play,
    History as HistoryIcon, Info, MessageCircle, Send, Share2, Smartphone, Monitor, Clock, Bell, AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import ModularPreview from '@/components/Landing/ModularPreview';
import {
    generateLandingHTML, generateModularLandingHTML, openLandingPreview,
    type LandingData, type ModularConfig, type BrandConfig
} from '@/lib/landing-generator';
import {
    SECTION_CATALOG, SECTION_CATEGORIES, SECTION_RENDERERS,
    type SectionMeta, type SectionCategory
} from '@/lib/landing-sections';
import { LANDING_TEMPLATES, type LandingTemplate } from '@/lib/landing-templates';
import { supabase } from '@/lib/supabaseClient';

type Step = 1 | 2 | 3 | 4 | 5;

const LANGUAGES = [
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

const COUNTRIES = [
    'España', 'México', 'Colombia', 'Argentina', 'Chile', 'Perú',
    'Ecuador', 'Venezuela', 'Uruguay', 'Brasil', 'India', 'China',
    'Francia', 'Arabia Saudita', 'Bangladesh', 'Rusia', 'Japón',
    'Indonesia', 'Vietnam', 'Estados Unidos', 'Otro'
];

// ─── Section Editor Component ───────────────────────────────
function SectionCard({
    section,
    isEnabled,
    onToggle,
    overrides,
    onUpdateOverride,
}: {
    section: SectionMeta;
    isEnabled: boolean;
    onToggle: () => void;
    overrides: Record<string, any>;
    onUpdateOverride: (key: string, value: any) => void;
}) {
    const { t } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const content = { ...section.defaultContent, ...overrides };

    // Get editable string and array fields from content, excluding redundant brand/social fields
    const editableFields = Object.entries(content).filter(
        ([key, v]) => (typeof v === 'string' || Array.isArray(v)) && 
                      !key.startsWith('social') && 
                      !['communityName', 'communityMessage', 'welcomeMsg', 'heroPhrase', 'ibPhrase'].includes(key)
    );

    return (
        <div className={`rounded-xl border-2 transition-all duration-300 overflow-hidden ${
            isEnabled
                ? 'border-[#865BFF]/30 bg-white shadow-sm'
                : 'border-slate-200 bg-slate-50/50 opacity-60'
        }`}>
            <div className="flex items-center justify-between px-4 py-3.5">
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    <span className="material-symbols-outlined text-lg flex-shrink-0 text-[#865BFF]">{section.icon}</span>
                    <div className="min-w-0">
                        <div className="flex items-center gap-2">
                            <h4 className={`font-bold text-[13px] truncate ${isEnabled ? 'text-slate-800' : 'text-slate-400'}`}>
                                {t.sections[`${section.id}_name`] || section.name}
                            </h4>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400 font-bold uppercase tracking-wider flex-shrink-0">
                                L{section.sourceTemplate}
                            </span>
                        </div>
                        <p className={`text-[10px] mt-0.5 truncate ${isEnabled ? 'text-slate-400' : 'text-slate-300'}`}>
                            {t.sections[`${section.id}_desc`] || section.description}
                        </p>
                    </div>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    {isEnabled && (
                        <button
                            onClick={() => setExpanded(!expanded)}
                            className="p-1.5 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#865BFF] transition-colors"
                        >
                            {expanded ? <ChevronUp className="w-4 h-4" /> : <Pencil className="w-4 h-4" />}
                        </button>
                    )}
                    <button onClick={onToggle} className="transition-colors">
                        {isEnabled ? (
                            <ToggleRight className="w-7 h-7 text-[#865BFF]" />
                        ) : (
                            <ToggleLeft className="w-7 h-7 text-slate-300" />
                        )}
                    </button>
                </div>
            </div>

            {isEnabled && expanded && (
                <div className="px-4 pb-4 border-t border-slate-100 pt-3 space-y-3">
                    {editableFields.map(([key, val]) => {
                        if (Array.isArray(val)) {
                            return (
                                <div key={key} className="space-y-4 py-2">
                                    <label className="text-[10px] font-black text-[#865BFF] uppercase tracking-[0.2em] mb-2 block">
                                        {key.replace(/([A-Z])/g, ' $1').trim()} (Tabla/Lista)
                                    </label>
                                    <div className="space-y-3 pl-3 border-l-2 border-[#865BFF]/20">
                                        {(overrides[key] || val).map((item: any, idx: number) => (
                                            <div key={idx} className="p-4 bg-slate-50/50 rounded-2xl border border-slate-100 space-y-3">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">Fila #{idx + 1}: {item.family || item.title || ''}</span>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3">
                                                    {Object.entries(item).map(([subKey, subVal]) => (
                                                        <div key={subKey} className={subKey === 'family' || subKey === 'title' ? 'col-span-2' : ''}>
                                                            <label className="text-[8px] font-bold text-slate-400 uppercase mb-1 block">{subKey.replace(/([A-Z])/g, ' $1').trim()}</label>
                                                            <input
                                                                type="text"
                                                                value={subVal as string}
                                                                onChange={(e) => {
                                                                    const newArr = [...(overrides[key] || val)];
                                                                    newArr[idx] = { ...newArr[idx], [subKey]: e.target.value };
                                                                    onUpdateOverride(key, newArr);
                                                                }}
                                                                className="w-full bg-white border border-slate-200 rounded-xl py-2 px-3 text-[11px] text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF]/10 transition-all font-medium"
                                                            />
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div key={key}>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                                    {key.replace(/([A-Z])/g, ' $1').trim()}
                                </label>
                                {(val as string).length > 80 ? (
                                    <textarea
                                        value={(overrides[key] ?? val) as string}
                                        onChange={(e) => onUpdateOverride(key, e.target.value)}
                                        rows={3}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF]/10 resize-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        value={(overrides[key] ?? val) as string}
                                        onChange={(e) => onUpdateOverride(key, e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF]/10"
                                    />
                                )}
                            </div>
                        );
                    })}
                    <p className="text-[10px] text-slate-400 italic pt-1">
                        {t.landing.arraysDefaultNote}
                    </p>
                </div>
            )}
        </div>
    );
}

// ─── Section Picker Modal ───────────────────────────────────
function SectionPicker({
    onAdd,
    onClose,
    alreadySelected,
}: {
    onAdd: (sectionId: string) => void;
    onClose: () => void;
    alreadySelected: string[];
}) {
    const { t } = useLanguage();
    const [filterCat, setFilterCat] = useState<SectionCategory | 'all'>('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [filterTemplate, setFilterTemplate] = useState<number | 'all'>('all');

    const filtered = SECTION_CATALOG.filter(section => {
        const matchesCat = filterCat === 'all' || section.category === filterCat;
        const matchesTemplate = filterTemplate === 'all' || section.sourceTemplate === filterTemplate;
        const matchesSearch = section.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                             section.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                             section.id.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCat && matchesTemplate && matchesSearch;
    });

    const templates = Array.from(new Set(SECTION_CATALOG.map(s => s.sourceTemplate))).sort((a, b) => a - b);

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
            <div className="bg-white/95 border border-slate-200/60 rounded-[32px] w-full max-w-6xl h-[85vh] flex flex-col md:flex-row shadow-[0_20px_80px_-15px_rgba(109,40,217,0.2)] overflow-hidden relative">
                
                {/* Left Sidebar Category Filters */}
                <div className="md:w-72 bg-slate-50/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col relative z-10">
                    <div className="p-8 pb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-purple/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">
                            {t.landing.modularLibrary.split('\n').map((line, i) => <React.Fragment key={i}>{line}{i < 1 && <br/>}</React.Fragment>)}
                        </h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">{t.landing.modularLibraryDesc}</p>
                    </div>

                    <div className="flex-1 overflow-y-auto px-4 py-4 space-y-1">
                        <button
                            onClick={() => setFilterCat('all')}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                                filterCat === 'all'
                                    ? 'bg-brand-purple/10 text-brand-purple shadow-sm border border-brand-purple/20'
                                    : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-800'
                            }`}
                        >
                            <span className="material-symbols-outlined text-[18px]">apps</span>
                            {t.landing.allSections}
                        </button>
                        {(Object.entries(SECTION_CATEGORIES) as [SectionCategory, { label: string; icon: string }][]).map(([key, val]) => (
                            <button
                                key={key}
                                onClick={() => setFilterCat(key)}
                                className={`w-full flex items-center gap-4 px-4 py-3 rounded-2xl text-xs font-bold transition-all duration-300 ${
                                    filterCat === key
                                        ? 'bg-brand-purple/10 text-brand-purple shadow-sm border border-brand-purple/20'
                                        : 'text-slate-500 hover:bg-slate-200/50 hover:text-slate-800'
                                }`}
                            ><span className="material-symbols-outlined text-[18px]">{val.icon}</span> {val.label}</button>
                        ))}
                    </div>
                </div>

                {/* Right Side Content Area */}
                <div className="flex-1 flex flex-col relative z-10 bg-white">
                    {/* Header with Search */}
                    <div className="px-8 py-6 border-b border-slate-100 backdrop-blur-md sticky top-0 z-20 bg-white/80 space-y-4">
                        <div className="flex justify-between items-center">
                            <div>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.landing.showingResults} ({filtered.length})</span>
                                <h4 className="text-lg font-bold text-slate-800 mt-1">
                                    {filterCat === 'all' ? t.landing.completeCatalog : SECTION_CATEGORIES[filterCat as string].label}
                                </h4>
                            </div>
                            <button onClick={onClose} className="p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 hover:rotate-90 text-slate-500 hover:text-slate-800 transition-all duration-300">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        <div className="flex flex-col md:flex-row gap-3">
                            <div className="flex-1 relative group">
                                <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-slate-400 group-focus-within:text-[#865BFF] transition-colors">search</span>
                                <input 
                                    type="text"
                                    placeholder="Buscar por nombre o descripción..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full bg-slate-100 border border-transparent focus:border-[#865BFF]/20 focus:bg-white rounded-2xl py-3.5 pl-12 pr-4 text-sm outline-none transition-all font-medium"
                                />
                            </div>
                            <div className="flex gap-2">
                                <select 
                                    value={filterTemplate}
                                    onChange={(e) => setFilterTemplate(e.target.value === 'all' ? 'all' : Number(e.target.value))}
                                    className="bg-slate-100 border border-transparent focus:border-[#865BFF]/20 rounded-2xl px-4 py-3.5 text-xs font-bold outline-none cursor-pointer hover:bg-slate-200 transition-all"
                                >
                                    <option value="all">Todos los Blueprints</option>
                                    {templates.map(num => (
                                        <option key={num} value={num}>Blueprint L{num}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                    </div>

                    {/* Section Grid */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {filtered.map(section => {
                                const isAlready = alreadySelected.includes(section.id);
                                return (
                                    <motion.div
                                        key={section.id}
                                        layout
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        whileHover={!isAlready ? { y: -8, transition: { duration: 0.2 } } : {}}
                                        className={`group relative overflow-hidden flex flex-col justify-between p-8 rounded-[32px] border transition-all duration-500 ${
                                            isAlready
                                                ? 'border-brand-purple/10 bg-brand-purple/[0.02] opacity-60 cursor-not-allowed'
                                                : 'border-slate-200 bg-white hover:border-brand-purple/40 cursor-pointer shadow-sm hover:shadow-2xl hover:shadow-brand-purple/10'
                                        }`}
                                        onClick={() => !isAlready && onAdd(section.id)}
                                    >
                                        <div className="flex items-start justify-between relative z-10 mb-6">
                                            <div className={`w-16 h-16 rounded-[22px] flex items-center justify-center transition-all duration-700 ${isAlready ? 'bg-brand-purple text-white shadow-lg shadow-brand-purple/30' : 'bg-slate-50 text-brand-purple border border-slate-100 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white shadow-sm'}`}>
                                                <span className="material-symbols-outlined text-2xl">{section.icon}</span>
                                            </div>
                                            
                                            <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest transition-all duration-500 ${
                                                isAlready ? 'bg-emerald-500/10 text-emerald-500' : 'bg-slate-100 text-slate-400 group-hover:bg-brand-purple/10 group-hover:text-brand-purple'
                                            }`}>
                                                {isAlready ? (
                                                    <><span className="material-symbols-outlined text-[12px]">check_circle</span> {t.landing.sectionAdded || 'Añadida'}</>
                                                ) : (
                                                    <><span className="material-symbols-outlined text-[12px]">add_circle</span> {t.landing.available || 'Disponible'}</>
                                                )}
                                            </div>
                                        </div>

                                        <div className="relative z-10">
                                            <h5 className="font-black text-slate-800 uppercase tracking-tight text-lg mb-2 group-hover:text-brand-purple transition-colors">
                                                {t.sections[`${section.id}_name`] || section.name}
                                            </h5>
                                            <p className="text-xs text-slate-500 font-medium leading-relaxed mb-4 line-clamp-2 italic group-hover:text-slate-600 transition-colors">
                                                {t.sections[`${section.id}_desc`] || section.description}
                                            </p>
                                            
                                            <div className="flex items-center gap-3">
                                                <span className="px-3 py-1 bg-slate-100 rounded-lg text-[9px] font-bold text-slate-500 uppercase tracking-wider group-hover:bg-brand-purple/5 transition-colors">Blueprint L{section.sourceTemplate}</span>
                                                <span className="text-[9px] font-bold text-slate-300 uppercase tracking-widest">{section.id}</span>
                                            </div>
                                        </div>

                                        {/* Decorative Background Icon */}
                                        <div className="absolute -bottom-6 -right-6 opacity-[0.03] group-hover:opacity-[0.08] group-hover:scale-125 transition-all duration-1000">
                                            <span className="material-symbols-outlined text-[120px]">{section.icon}</span>
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

// ─── Live Preview Component ───────────────────────────────
function DevicePreview({ html, mode }: { html: string; mode: 'mobile' | 'desktop' }) {
    const { t } = useLanguage();
    
    if (mode === 'desktop') {
        return (
            <div className="sticky top-10 w-full">
                <div className="relative w-full aspect-video bg-[#000] rounded-3xl border-[12px] border-slate-800 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center px-4 gap-2 z-30">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="absolute inset-0 pt-8 bg-[#000]">
                        <ModularPreview html={html} theme="dark" />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Desktop Institutional Hub
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="sticky top-10 w-full max-w-[320px] mx-auto">
            <div className="relative w-full aspect-[9/18.5] bg-[#000000] rounded-[40px] border-[8px] border-[#1a0545] shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a0545] rounded-b-2xl z-30 flex items-center justify-center">
                    <div className="w-10 h-1 bg-white/10 rounded-full" />
                </div>
                
                <div className="absolute inset-0 z-10 bg-[#000000]">
                    <ModularPreview 
                        html={html} 
                        style={{ width: '100%', height: '100%', border: 'none' }} 
                    />
                </div>

                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-30" />
            </div>
            <div className="mt-4 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 line-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t.landing.livePreviewLabel}
                </span>
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────
interface LandingTypeformProps {
    initialTemplate?: string;
    onGoToHistory?: () => void;
    editData?: any;
}

export default function LandingTypeform({ initialTemplate, onGoToHistory, editData }: LandingTypeformProps) {
    const { t, lang } = useLanguage();

    // Dynamic languages: keep static list but translate the SOON label
    const DYNAMIC_LANGUAGES = LANGUAGES.map(l =>
        l.code === 'SOON' ? { ...l, label: t.common.comingSoon } : l
    );

    const [step, setStep] = useState<Step>(initialTemplate ? 2 : 1);
    const [userId, setUserId] = useState('');
    const [partnerId, setPartnerId] = useState('');

    // Step 1: Basic Data
    const [fullName, setFullName] = useState('');
    const [country, setCountry] = useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');
    const [communityName, setCommunityName] = useState('');
    const [heroPhrase, setHeroPhrase] = useState('');
    const [instagram, setInstagram] = useState('');
    const [telegram, setTelegram] = useState('');
    const [tiktok, setTiktok] = useState('');
    const [youtube, setYoutube] = useState('');
    const [ctaLink, setCtaLink] = useState('');
    const [videoUrl, setVideoUrl] = useState('');
    const [customLogoUrl, setCustomLogoUrl] = useState('');
    
    // Debounced HTML for Preview Performance
    const [debouncedHtml, setDebouncedHtml] = useState('');
    // Sync portal language to landing generator language representation
    const getLandingLangFromPortal = (pLang: string) => {
        if (pLang === 'en') return 'GB';
        if (pLang === 'pt') return 'BR';
        return pLang.toUpperCase();
    };

    const [language, setLanguage] = useState(() => {
        // Retrieve locally strictly for the generator if needed, or fallback to portal
        if (typeof window !== 'undefined') {
            const saved = localStorage.getItem('bm_landing_lang');
            if (saved) return saved;
        }
        return 'ES'; // Default safe
    });

    // When portal language changes, auto-update the landing generator
    useEffect(() => {
        const mapped = getLandingLangFromPortal(lang);
        setLanguage(mapped);
    }, [lang]);

    // Persist local selection
    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('bm_landing_lang', language);
        }
    }, [language]);

    // Step 2: Template Selection
    const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate || '');
    const [templateFilter, setTemplateFilter] = useState<string>('all');

    // Step 3: Section Editor
    const [selectedSections, setSelectedSections] = useState<string[]>([]);
    const [sectionOverrides, setSectionOverrides] = useState<Record<string, Record<string, any>>>({});
    const [showSectionPicker, setShowSectionPicker] = useState(false);

    // Step 4-5: Generate
    const [isGenerating, setIsGenerating] = useState(false);
    const [processStep, setProcessStep] = useState<'idle' | 'packaging' | 'security' | 'deploying' | 'finalizing'>('idle');
    const [generatedHTML, setGeneratedHTML] = useState('');
    const [finalSlug, setFinalSlug] = useState('');
    const [copied, setCopied] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [previewMode, setPreviewMode] = useState<'mobile' | 'desktop'>('mobile');

    // Load user
    useEffect(() => {
        const loadUser = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setUserId(user.id);
                // Querying 'partners' table as defined in init_production.sql
                const { data: partnerData } = await supabase
                    .from('partners')
                    .select('id, name, email')
                    .eq('id', user.id)
                    .single();
                
                if (partnerData) {
                    // In the partners table, 'id' is used as the link to landings
                    setPartnerId(partnerData.id);
                    if (partnerData.name) setFullName(partnerData.name);
                    if (partnerData.email) setEmail(partnerData.email);
                } else {
                    // Fallback to BM_ ID if partner record doesn't exist
                    setPartnerId('BM_' + user.id.substring(0, 24).toUpperCase());
                }
            }
        };
        loadUser();
    }, []);

    // When template is selected, pre-fill sections
    useEffect(() => {
        if (selectedTemplate) {
            const template = LANDING_TEMPLATES.find(t => t.id === selectedTemplate);
            if (template) {
                setSelectedSections([...template.sections]);
                setSectionOverrides({});
            }
        }
    }, [selectedTemplate]);

    // Pre-select if initialTemplate or editData passed
    useEffect(() => {
        if (editData) {
            setStep(3); // Go straight to editor
            setFullName(editData.config?.fullName || '');
            setCountry(editData.config?.country || '');
            setWhatsapp(editData.config?.whatsapp || '');
            setEmail(editData.config?.email || '');
            setCommunityName(editData.config?.communityName || '');
            setHeroPhrase(editData.config?.heroPhrase || '');
            setInstagram(editData.config?.instagram || '');
            setTelegram(editData.config?.telegram || '');
            setTiktok(editData.config?.tiktok || '');
            setYoutube(editData.config?.youtube || '');
            setCtaLink(editData.config?.ctaLink || '');
            setVideoUrl(editData.config?.videoUrl || '');
            setCustomLogoUrl(editData.config?.customLogoUrl || '');
            setLanguage(editData.config?.language || 'ES');
            setSelectedTemplate(editData.template_id);
            setSelectedSections(editData.sections || []);
            setSectionOverrides(editData.config?.sectionOverrides || {});
        } else if (initialTemplate) {
            setSelectedTemplate(initialTemplate);
            setStep(2);
        }
    }, [editData, initialTemplate]);

    const toggleSection = useCallback((sectionId: string) => {
        setSelectedSections(prev =>
            prev.includes(sectionId)
                ? prev.filter(s => s !== sectionId)
                : [...prev, sectionId]
        );
    }, []);

    const addSection = useCallback((sectionId: string) => {
        if (!selectedSections.includes(sectionId)) {
            setSelectedSections(prev => [...prev, sectionId]);
        }
    }, [selectedSections]);

    const removeSection = useCallback((sectionId: string) => {
        setSelectedSections(prev => prev.filter(s => s !== sectionId));
    }, []);

    const moveSectionUp = useCallback((index: number) => {
        if (index === 0) return;
        setSelectedSections(prev => {
            const arr = [...prev];
            [arr[index - 1], arr[index]] = [arr[index], arr[index - 1]];
            return arr;
        });
    }, []);

    const moveSectionDown = useCallback((index: number) => {
        setSelectedSections(prev => {
            if (index >= prev.length - 1) return prev;
            const arr = [...prev];
            [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
            return arr;
        });
    }, []);

    const updateOverride = useCallback((sectionId: string, key: string, value: any) => {
        setSectionOverrides(prev => ({
            ...prev,
            [sectionId]: { ...(prev[sectionId] || {}), [key]: value },
        }));
    }, []);

    const handleGenerate = async () => {
        setProcessStep('packaging');
        setIsGenerating(true);

        const data: LandingData = {
            fullName,
            country,
            language,
            whatsapp,
            email,
            landingType: selectedTemplate,
            partnerId,
            slug: editData?.slug || `${selectedTemplate}-${language.toLowerCase()}-${Date.now()}`,
            communityName,
            heroPhrase,
            instagram,
            telegram,
            tiktok,
            youtube,
            ctaLink,
            videoUrl,
            customLogoUrl,
            modularConfig: {
                templateId: selectedTemplate,
                sections: selectedSections,
                overrides: sectionOverrides,
            },
        };

        try {
            // Simulated professional phases
            await new Promise(r => setTimeout(r, 1200));
            setProcessStep('security');
            await new Promise(r => setTimeout(r, 1500));
            setProcessStep('deploying');

            setFinalSlug(data.slug);
            const brandConfig: BrandConfig = {
                fullName, whatsapp, email, partnerId, language,
                slug: data.slug, communityName, heroPhrase, instagram,
                telegram, tiktok, youtube, ctaLink, videoUrl,
                logoUrl: customLogoUrl || '/images/logo-bm-blanco.png'
            };
            const html = generateModularLandingHTML(data.modularConfig!, brandConfig);
            setGeneratedHTML(html);

            // Save to Supabase
            const res = await fetch('/api/landings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    userId,
                    slug: data.slug,
                    html,
                    data: {
                        ...data,
                        modularConfig: data.modularConfig,
                    },
                }),
            });

            if (!res.ok) {
                let errorDetails = "Error desconocido al guardar";
                try {
                    const errorData = await res.json();
                    errorDetails = errorData.details || errorData.error || errorDetails;
                } catch (e) {
                    // Fallback for HTML/Text error responses (like Cloudflare 502)
                    errorDetails = `Error del servidor (${res.status}): ${res.statusText || 'Conexión interrumpida'}. Intenta de nuevo.`;
                }
                console.error('Failed to save landing:', errorDetails);
                setErrorMsg(errorDetails);
            } else {
                setProcessStep('finalizing');
                await new Promise(r => setTimeout(r, 1000));
                setStep(5);
            }
        } catch (err) {
            console.error('Error generating:', err);
        } finally {
            setIsGenerating(false);
            setProcessStep('idle');
        }
    };

    const canAdvance = (s: Step): boolean => {
        if (s === 1) return !!(fullName && language);
        if (s === 2) return !!selectedTemplate;
        if (s === 3) return selectedSections.length >= 1;
        return true;
    };

    const filteredTemplates = templateFilter === 'all'
        ? LANDING_TEMPLATES
        : LANDING_TEMPLATES.filter(t => t.category === templateFilter);

    const templateCategories = ['all', ...Array.from(new Set(LANDING_TEMPLATES.map(t => t.category)))];

    // Helper: get localized template name/description
    const getTemplateName = (tpl: LandingTemplate) => {
        const key = `${tpl.id}_name` as keyof typeof t.templates;
        return (t.templates as any)[key] || tpl.name;
    };
    const getTemplateDesc = (tpl: LandingTemplate) => {
        const key = `${tpl.id}_desc` as keyof typeof t.templates;
        return (t.templates as any)[key] || tpl.description;
    };

    // Step indicator
    const STEPS = [
        { num: 1, label: t.landing.step1, icon: User },
        { num: 2, label: t.landing.step2, icon: Layout },
        { num: 3, label: t.landing.step3, icon: Sparkles },
        { num: 4, label: t.common.generate, icon: Rocket },
    ];

    // Live Preview HTML
    // Live Preview HTML calculation
    const livePreviewHtml = React.useMemo(() => {
        if (!selectedTemplate || selectedSections.length === 0) return '';
        const modularConfig: ModularConfig = {
            templateId: selectedTemplate,
            sections: selectedSections,
            overrides: sectionOverrides,
        };
        const brandConfig: BrandConfig = {
            fullName, whatsapp, email, partnerId, language,
            slug: 'live-preview', communityName, heroPhrase, instagram,
            telegram, tiktok, youtube, ctaLink, videoUrl,
            logoUrl: customLogoUrl || '/images/logo-bm-blanco.png'
        };
        return generateModularLandingHTML(modularConfig, brandConfig, true); // bodyOnly = true
    }, [selectedTemplate, selectedSections, sectionOverrides, fullName, country, language, whatsapp, email, partnerId, communityName, heroPhrase, instagram, telegram, tiktok, youtube, ctaLink, videoUrl, customLogoUrl]);

    // Debounce the HTML update to the iframe to prevent lag
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedHtml(livePreviewHtml);
        }, 100); // Minimal debounce, ModularPreview handles the rest
        return () => clearTimeout(handler);
    }, [livePreviewHtml]);

    return (
        <div className="max-w-[1600px] mx-auto pb-12">
            <div className="flex flex-col lg:flex-row gap-8 items-start">
                
                {/* ─── LEFT COLUMN: CONTROLS (60%) ─── */}
                <div className="flex-1 w-full lg:max-w-3xl">
            {/* Header with History Link */}
            <div className="flex justify-between items-center mb-6 px-2 flex-wrap gap-3">
                <div>
                    <h2 className="text-xl font-black text-slate-800 flex items-center gap-2">
                        <Sparkles className="w-5 h-5 text-[#865BFF]" />
                        {t.landing.title}
                    </h2>
                    <p className="text-xs text-slate-400 mt-1">{t.landing.subtitle}</p>
                </div>
                <div className="flex items-center gap-2">
                    {/* Device Toggle */}
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 mr-4">
                        <button 
                            onClick={() => setPreviewMode('mobile')}
                            title="Mobile Preview"
                            className={`p-2 rounded-lg transition-all ${previewMode === 'mobile' ? 'bg-white text-[#865BFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Smartphone className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setPreviewMode('desktop')}
                            title="Desktop Preview"
                            className={`p-2 rounded-lg transition-all ${previewMode === 'desktop' ? 'bg-white text-[#865BFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <Monitor className="w-4 h-4" />
                        </button>
                    </div>

                    {/* Landing Language Badge — always visible */}
                    <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{t.landing.landingLang}:</span>
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#865BFF]/8 border border-[#865BFF]/20 hover:bg-[#865BFF]/15 transition-all"
                            title={t.landing.changeLangHint}
                        >
                            <span className="text-sm">
                                {DYNAMIC_LANGUAGES.find(l => l.code === language)?.flag ?? '🌐'}
                            </span>
                            <span className="text-[11px] font-bold text-[#865BFF]">
                                {DYNAMIC_LANGUAGES.find(l => l.code === language)?.label?.split(' ')[0] ?? language}
                            </span>
                            <Globe className="w-3 h-3 text-[#865BFF] ml-0.5" />
                        </button>
                    </div>

                    {onGoToHistory && (
                        <button
                            onClick={onGoToHistory}
                            className="flex items-center gap-2 px-4 py-2 text-xs font-black text-[#865BFF] bg-[#865BFF]/5 hover:bg-[#865BFF]/10 rounded-xl transition-all"
                        >
                            <HistoryIcon className="w-4 h-4" />
                            {t.landing.history}
                        </button>
                    )}
                </div>
            </div>

            {/* Step Indicator - Modernized */}
            <div className="flex items-center justify-between mb-10 px-4 py-3 bg-white rounded-2xl border border-slate-100 shadow-sm overflow-x-auto no-scrollbar">
                {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = step === s.num;
                    const isDone = step > s.num;
                    return (
                        <React.Fragment key={s.num}>
                            <div className="flex items-center gap-3 shrink-0">
                                <button
                                    onClick={() => { if (isDone) setStep(s.num as Step); }}
                                    className={`relative flex items-center justify-center w-8 h-8 rounded-lg text-xs font-black transition-all ${
                                        isActive ? 'bg-[#865BFF] text-white shadow-lg shadow-[#865BFF]/30 scale-110' :
                                        isDone ? 'bg-emerald-500 text-white' : 'bg-slate-100 text-slate-400'
                                    }`}
                                >
                                    {isDone ? <Check className="w-4 h-4" /> : s.num}
                                    {isActive && (
                                        <motion.div layoutId="step-glow" className="absolute inset-0 rounded-lg bg-[#865BFF] blur-md opacity-40 -z-10" />
                                    )}
                                </button>
                                <span className={`text-[11px] font-bold uppercase tracking-widest ${isActive ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < STEPS.length - 1 && <div className="w-8 h-[2px] bg-slate-100 mx-2 shrink-0" />}
                        </React.Fragment>
                    );
                })}
            </div>

            <AnimatePresence mode="wait">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >

            {step === 1 && (
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

                            {/* Grupo 2: Personalización Visual & Branding */}
                            <div className="p-6 rounded-2xl bg-[#865BFF]/5 border border-[#865BFF]/10 space-y-6">
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <Sparkles className="w-4 h-4 text-[#865BFF]" />
                                        <span className="text-xs font-black text-[#865BFF] uppercase tracking-wider">{t.landing.brandSettings}</span>
                                    </div>
                                    <span className="text-[9px] font-bold text-[#865BFF]/60 uppercase tracking-tighter bg-[#865BFF]/10 px-2 py-0.5 rounded-md">Opcional</span>
                                </div>
                                
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Logo URL removed by user request - using default only */}

                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.landing.communityName}</label>
                                        <input
                                            type="text" value={communityName}
                                            onChange={(e) => setCommunityName(e.target.value)}
                                            placeholder={t.landing.communityPlaceholder}
                                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">{t.landing.heroPhrase}</label>
                                        <input
                                            type="text" value={heroPhrase}
                                            onChange={(e) => setHeroPhrase(e.target.value)}
                                            placeholder={t.landing.heroPlaceholder}
                                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] transition-all"
                                        />
                                    </div>
                                    {/* Video URL removed by user request */}
                                </div>
                            </div>

                            {/* Grupo 3: Social Hub */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Share2 className="w-4 h-4 text-slate-400" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{t.landing.channels}</span>
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {/* WhatsApp */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 group focus-within:border-emerald-200 transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-emerald-100 flex items-center justify-center">
                                                <MessageCircle className="w-4 h-4 text-emerald-600" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">WhatsApp</span>
                                        </div>
                                        <input
                                            type="text" value={whatsapp}
                                            onChange={(e) => setWhatsapp(e.target.value)}
                                            placeholder="+1..."
                                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                    {/* Telegram */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 group focus-within:border-sky-200 transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-sky-100 flex items-center justify-center">
                                                <Send className="w-3.5 h-3.5 text-sky-600" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">Telegram</span>
                                        </div>
                                        <input
                                            type="text" value={telegram}
                                            onChange={(e) => setTelegram(e.target.value)}
                                            placeholder="@id_canal"
                                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                    {/* Instagram */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 group focus-within:border-pink-200 transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-pink-100 flex items-center justify-center">
                                                <div className="w-3.5 h-3.5 rounded-sm border-2 border-pink-600" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">Instagram</span>
                                        </div>
                                        <input
                                            type="text" value={instagram}
                                            onChange={(e) => setInstagram(e.target.value)}
                                            placeholder="@usuario"
                                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                    {/* TikTok Extra */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 group focus-within:border-slate-800 transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-slate-900 flex items-center justify-center">
                                                <span className="text-[10px] text-white">𝅘𝅥𝅮</span>
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">TikTok</span>
                                        </div>
                                        <input
                                            type="text" value={tiktok}
                                            onChange={(e) => setTiktok(e.target.value)}
                                            placeholder="@tiktok"
                                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                    {/* YouTube */}
                                    <div className="p-4 rounded-2xl border border-slate-100 bg-slate-50/50 group focus-within:border-red-200 transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-red-100 flex items-center justify-center">
                                                <div className="w-3.5 h-3.5 bg-red-600 rounded-[2px]" />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">YouTube</span>
                                        </div>
                                        <input
                                            type="text" value={youtube}
                                            onChange={(e) => setYoutube(e.target.value)}
                                            placeholder="Canal o Video"
                                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                    {/* CTA Link Extra */}
                                    <div className="md:col-span-2 p-4 rounded-2xl border border-[#865BFF]/20 bg-[#865BFF]/5 group focus-within:border-[#865BFF] transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-[#865BFF] flex items-center justify-center">
                                                <ExternalLink className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            <span className="text-[10px] font-black text-[#865BFF] uppercase">{t.landing.ctaLinkLabel}</span>
                                        </div>
                                        <input
                                            type="text" value={ctaLink}
                                            onChange={(e) => setCtaLink(e.target.value)}
                                            placeholder="https://tu-link-de-afiliado.com"
                                            className="w-full bg-transparent text-sm font-bold text-slate-700 outline-none"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                    {/* Language */}
                    <div className="mt-6">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">{t.landing.landingLanguageLabel} *</label>
                        <div className="flex flex-wrap gap-2">
                            {DYNAMIC_LANGUAGES.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => { if (!(lang as any).disabled) setLanguage(lang.code); }}
                                    disabled={(lang as any).disabled}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                        (lang as any).disabled
                                            ? 'bg-slate-100 text-slate-300 cursor-not-allowed border border-dashed border-slate-200'
                                            : language === lang.code
                                                ? 'bg-[#865BFF] text-white shadow-md'
                                                : 'bg-slate-50 border border-slate-200 text-slate-600 hover:border-[#865BFF]/30'
                                    }`}
                                >
                                    <span>{lang.flag}</span> {lang.label}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 flex justify-end">
                        <button
                            onClick={() => setStep(2)}
                            disabled={!canAdvance(1)}
                            className="flex items-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#865BFF]/20"
                        >
                            {t.landing.nextBtn} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 2: Template Selection ─── */}
            {step === 2 && (
                <div>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#865BFF]/10 text-[#865BFF] text-[10px] font-black uppercase tracking-widest mb-4">
                            {t.landing.step2Badge}
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">{t.landing.selectBlueprint}</h2>
                        <p className="text-sm text-slate-400 max-w-lg mx-auto">{t.landing.selectBlueprintDesc}</p>
                    </div>

                    {/* Category filters */}
                    <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
                        {templateCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setTemplateFilter(cat)}
                                className={`px-5 py-2.5 rounded-2xl text-[11px] font-black uppercase tracking-wider transition-all ${
                                    templateFilter === cat
                                        ? 'bg-[#865BFF] text-white shadow-xl shadow-[#865BFF]/20 scale-105'
                                        : 'bg-white border border-slate-100 text-slate-400 hover:border-slate-200 hover:text-slate-600 shadow-sm'
                                }`}
                            >
                                {cat === 'all' ? t.landing.viewAll : cat}
                            </button>
                        ))}
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        {filteredTemplates.map(template => {
                            const isSelected = selectedTemplate === template.id;
                            return (
                                <Tilt
                                    key={template.id}
                                    tiltMaxAngleX={5}
                                    tiltMaxAngleY={5}
                                    perspective={1000}
                                    scale={isSelected ? 1.02 : 1}
                                    className="h-full"
                                >
                                    <div
                                        onClick={() => setSelectedTemplate(template.id)}
                                        className={`h-full group relative rounded-[2.5rem] border-4 overflow-hidden cursor-pointer transition-all duration-500 ${
                                            isSelected
                                                ? 'border-[#865BFF] shadow-2xl shadow-[#865BFF]/20 bg-white'
                                                : 'border-white bg-white/50 hover:bg-white shadow-xl shadow-slate-200/50 grayscale-[0.3] hover:grayscale-0'
                                        }`}
                                    >
                                        {/* Preview Area */}
                                        <div className="h-64 relative overflow-hidden" style={{ background: template.gradient }}>
                                            <div className="absolute inset-0 opacity-30 mix-blend-overlay" style={{
                                                backgroundImage: 'radial-gradient(circle at 71% 9%, rgba(255, 255, 255, 0.4) 0%, transparent 40%)'
                                            }} />
                                            
                                            {/* Badge Layout */}
                                            <div className="absolute top-6 left-6 right-6 flex justify-between items-start">
                                                <div className="flex flex-col gap-1">
                                                    <span className="text-[9px] font-black text-white/50 uppercase tracking-widest">Blueprint</span>
                                                    <span className="text-white font-black text-xl tracking-tighter">{getTemplateName(template)}</span>
                                                </div>
                                                {template.badge && (
                                                    <span className="bg-white/10 backdrop-blur-md border border-white/20 text-white text-[9px] font-black px-3 py-1 rounded-full uppercase tracking-widest">
                                                        {template.badge}
                                                    </span>
                                                )}
                                            </div>

                                            {/* Selection Indicator */}
                                            {isSelected && (
                                                <div className="absolute inset-0 bg-[#865BFF]/10 backdrop-blur-[2px] flex items-center justify-center">
                                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                                        <Check className="w-8 h-8 text-[#865BFF]" />
                                                    </motion.div>
                                                </div>
                                            )}
                                        </div>

                                        {/* Content Area */}
                                        <div className="p-8">
                                            <p className="text-slate-400 text-sm leading-relaxed mb-6 font-medium">
                                                {getTemplateDesc(template)}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {template.sections.slice(0, 5).map((sId: string) => {
                                                    const sec = SECTION_CATALOG.find(s => s.id === sId);
                                                    return sec ? (
                                                        <div key={sId} className="flex items-center gap-1.5 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-100 group-hover:border-[#865BFF]/10 transition-colors">
                                                            <span className="material-symbols-outlined text-[14px] text-[#865BFF]/60">{sec.icon}</span>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider">{(t.sections[`${sec.id}_name`] || sec.name).split(' ')[0]}</span>
                                                        </div>
                                                    ) : null;
                                                })}
                                                {template.sections.length > 5 && (
                                                    <div className="flex items-center justify-center bg-slate-50 text-slate-400 px-3 py-1.5 rounded-xl border border-slate-100 text-[10px] font-black">
                                                        +{template.sections.length - 5}
                                                    </div>
                                                )}
                                            </div>

                                            <button className={`w-full mt-8 py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all ${
                                                isSelected ? 'bg-[#865BFF] text-white shadow-lg' : 'bg-slate-50 text-slate-400 group-hover:bg-slate-100 group-hover:text-slate-600'
                                            }`}>
                                                {isSelected ? t.landing.templateSelected : t.landing.chooseDesign}
                                            </button>
                                        </div>
                                    </div>
                                </Tilt>
                            );
                        })}
                    </div>

                    {/* Nav */}
                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={() => setStep(1)}
                            className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> {t.landing.backBtn}
                        </button>
                        <button
                            onClick={() => setStep(3)}
                            disabled={!canAdvance(2)}
                            className="flex items-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#865BFF]/20"
                        >
                            {t.landing.customizeSections} <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 3: Section Editor (Studio Builder) ─── */}
            {step === 3 && (
                <div className="bg-white rounded-3xl border border-slate-100 p-8 shadow-sm">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-[#865BFF]/10 flex items-center justify-center">
                                <Layout className="w-6 h-6 text-[#865BFF]" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t.landing.modularStructure}</h2>
                                <p className="text-sm text-slate-400 font-medium font-mono">Total: {selectedSections.length} {t.landing.activeBlocks}</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSectionPicker(true)}
                            className="group flex items-center gap-3 px-6 py-3.5 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] transition-all text-xs uppercase tracking-widest shadow-xl shadow-[#865BFF]/30"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> 
                            {t.landing.addBlock}
                        </button>
                    </div>

                    {/* Active sections - Premium Flow */}
                    <div className="space-y-4">
                        <AnimatePresence initial={false}>
                            {selectedSections.map((sId, index) => {
                                const section = SECTION_CATALOG.find(s => s.id === sId);
                                if (!section) return null;
                                return (
                                    <motion.div 
                                        key={`${sId}-${index}`}
                                        layout
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        className="flex items-stretch gap-4 group"
                                    >
                                        {/* Premium Vertical Dock for Controls */}
                                        <div className="hidden md:flex flex-col justify-center items-center gap-1 w-10 bg-slate-50 border border-slate-100 rounded-2xl group-hover:bg-slate-100/100 transition-colors shrink-0">
                                            <button
                                                onClick={() => moveSectionUp(index)}
                                                className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-300 hover:text-[#865BFF] disabled:opacity-10 transition-all"
                                                disabled={index === 0}
                                            >
                                                <ChevronUp className="w-4 h-4" />
                                            </button>
                                            <div className="h-4 w-[1px] bg-slate-200" />
                                            <button
                                                onClick={() => moveSectionDown(index)}
                                                className="p-1.5 rounded-lg hover:bg-white hover:shadow-sm text-slate-300 hover:text-[#865BFF] disabled:opacity-10 transition-all"
                                                disabled={index === selectedSections.length - 1}
                                            >
                                                <ChevronDown className="w-4 h-4" />
                                            </button>
                                        </div>

                                        {/* Section Card Content */}
                                        <div className="flex-1">
                                            <SectionCard
                                                section={section}
                                                isEnabled={true}
                                                onToggle={() => removeSection(sId)}
                                                overrides={sectionOverrides[sId] || {}}
                                                onUpdateOverride={(key, val) => updateOverride(sId, key, val)}
                                            />
                                        </div>
                                    </motion.div>
                                );
                            })}
                        </AnimatePresence>

                        {selectedSections.length === 0 && (
                            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-20 text-center border-2 border-dashed border-slate-100 rounded-[2rem] bg-slate-50/30">
                                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm border border-slate-50 text-slate-200">
                                    <Layout className="w-6 h-6" />
                                </div>
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">{t.landing.emptyDesign}</p>
                                <button
                                    onClick={() => setShowSectionPicker(true)}
                                    className="mt-4 text-[#865BFF] font-black text-xs hover:underline decoration-2 underline-offset-4"
                                >
                                    {t.landing.addFirstBlock}
                                </button>
                            </motion.div>
                        )}
                    </div>

                    {/* Studio Footer Navigation */}
                    <div className="mt-12 flex flex-col sm:flex-row items-center justify-between gap-4 pt-8 border-t border-slate-50">
                        <button
                            onClick={() => setStep(2)}
                            className="flex items-center gap-3 px-6 py-3.5 text-slate-400 font-black text-xs uppercase tracking-[0.1em] hover:text-slate-600 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Blueprints
                        </button>
                        <button
                            onClick={() => setStep(4)}
                            className="w-full sm:w-auto flex items-center justify-center gap-3 px-10 py-4 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] transition-all text-xs uppercase tracking-widest shadow-2xl shadow-[#865BFF]/30 active:scale-[0.98]"
                        >
                            {t.landing.finishAndLaunch} <ArrowRight className="w-4 h-4 shadow-inner" />
                        </button>
                    </div>

                    {/* Section Picker Modal */}
                    {showSectionPicker && (
                        <SectionPicker
                            onAdd={(id) => { addSection(id); }}
                            onClose={() => setShowSectionPicker(false)}
                            alreadySelected={selectedSections}
                        />
                    )}
                </div>
            )}

            {/* ─── STEP 4: Preview & Generate ─── */}
            {step === 4 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <div className="text-center mb-10">
                        <div className="w-20 h-20 bg-[#865BFF]/10 rounded-[2.5rem] flex items-center justify-center mx-auto mb-6 shadow-xl shadow-[#865BFF]/5">
                            <Rocket className="w-10 h-10 text-[#865BFF]" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">{t.landing.launchProtocol}</h2>
                        <p className="text-sm text-slate-400 font-medium">{t.landing.launchProtocolDesc}</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Blueprint Summary Card */}
                        <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#865BFF]/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{t.landing.baseConfig}</h3>
                            
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#865BFF]">
                                        <Layout className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Design Blueprint</p>
                                        <p className="text-sm font-medium text-slate-500">{(() => { const tpl = LANDING_TEMPLATES.find(tp => tp.id === selectedTemplate); return tpl ? getTemplateName(tpl) : ''; })()}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{t.landing.territoryLang}</p>
                                        <p className="text-sm font-medium text-slate-500">{LANGUAGES.find(l => l.code === language)?.flag} {LANGUAGES.find(l => l.code === language)?.label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 border-dashed relative">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">{t.landing.blockInventory}</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <span className="text-xs font-bold text-slate-700">{t.landing.activeSections}</span>
                                    <span className="text-xs font-black text-[#865BFF] bg-[#865BFF]/10 px-2 py-0.5 rounded-lg">{selectedSections.length}</span>
                                </div>
                                <div className="flex flex-wrap gap-1.5 pt-2">
                                    {selectedSections.slice(0, 6).map(sId => {
                                        const sec = SECTION_CATALOG.find(s => s.id === sId);
                                        return sec ? (
                                            <div key={sId} className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-slate-400 hover:text-[#865BFF] transition-colors" title={sec.name}>
                                                <span className="material-symbols-outlined text-[16px]">{sec.icon}</span>
                                            </div>
                                        ) : null;
                                    })}
                                    {selectedSections.length > 6 && (
                                        <div className="w-8 h-8 rounded-lg bg-white border border-slate-100 flex items-center justify-center text-[10px] font-black text-slate-300">
                                            +{selectedSections.length - 6}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4">
                        <button
                            onClick={() => setStep(3)}
                            className="flex-1 flex items-center justify-center gap-3 px-8 py-4 border-2 border-slate-100 text-slate-400 font-black rounded-2xl hover:bg-slate-50 hover:text-slate-600 transition-all text-sm uppercase tracking-widest"
                        >
                            <Pencil className="w-4 h-4" /> {t.landing.backToEditor}
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="flex-[2] flex items-center justify-center gap-4 px-10 py-4 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] disabled:opacity-50 transition-all text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#865BFF]/30 active:scale-[0.98]"
                        >
                            {isGenerating ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    {processStep === 'packaging' ? t.landing.stepPackaging :
                                     processStep === 'security' ? t.landing.stepSecurity :
                                     processStep === 'deploying' ? t.landing.stepDeploying :
                                     processStep === 'finalizing' ? t.landing.stepFinalizing :
                                     t.landing.processing}
                                </>
                            ) : (
                                <><Rocket className="w-5 h-5 shadow-lg" /> {t.landing.deployLanding}</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 5: Success & Review Info ─── */}
            {step === 5 && (
                <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-2xl shadow-indigo-500/5 text-center relative overflow-hidden">
                    {/* Decorative Background */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#865BFF] to-transparent" />
                    <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#865BFF]/5 rounded-full blur-3xl" />
                    <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-500/5 rounded-full blur-3xl" />

                    <div className="relative z-10">
                        <div className="w-24 h-24 bg-amber-50 rounded-[2rem] flex items-center justify-center mx-auto mb-8 shadow-inner border border-amber-100/50">
                            <Clock className="w-10 h-10 text-amber-500 animate-pulse" />
                        </div>
                        
                        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-100 text-amber-700 text-[10px] font-black uppercase tracking-[0.2em] mb-6">
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-ping" />
                            {t.landing.reviewStatusTitle}
                        </div>

                        <h2 className="text-3xl font-black text-slate-800 mb-4 tracking-tight leading-tight max-w-md mx-auto">
                            {t.landing.landingGenerated}
                        </h2>
                        
                        <p className="text-sm text-slate-500 mb-8 max-w-lg mx-auto leading-relaxed font-medium">
                            {t.landing.reviewStatusDesc}
                        </p>

                        <div className="bg-slate-50 border border-slate-100 p-6 rounded-3xl mb-10 max-w-md mx-auto flex items-start gap-4 text-left">
                            <div className="w-10 h-10 rounded-xl bg-white shadow-sm flex items-center justify-center shrink-0 border border-slate-100">
                                <Bell className="w-5 h-5 text-[#865BFF]" />
                            </div>
                            <p className="text-[11px] text-slate-400 font-bold leading-relaxed">
                                {t.landing.reviewNote}
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button
                                onClick={() => openLandingPreview(generatedHTML)}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-slate-800 text-white font-black rounded-2xl hover:bg-slate-900 transition-all text-xs uppercase tracking-widest shadow-xl shadow-slate-900/10"
                            >
                                <Eye className="w-4 h-4" /> {t.landing.viewLive}
                            </button>
                            
                            <button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/l/${finalSlug}`);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 2000);
                                }}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 border-2 border-slate-200 text-slate-700 font-black rounded-2xl hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                            >
                                {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                {copied ? t.landing.copiedLink : t.landing.copyLink}
                            </button>

                            <button
                                onClick={onGoToHistory}
                                className="w-full sm:w-auto flex items-center justify-center gap-3 px-8 py-4 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] transition-all text-xs uppercase tracking-widest shadow-xl shadow-indigo-500/20"
                            >
                                <HistoryIcon className="w-4 h-4" />
                                {t.landing.viewHistory}
                            </button>
                        </div>

                        <div className="mt-12 pt-8 border-t border-slate-100 flex justify-center">
                            <button
                                onClick={() => {
                                    setStep(1);
                                    setSelectedTemplate('');
                                    setSelectedSections([]);
                                    setSectionOverrides({});
                                    setGeneratedHTML('');
                                }}
                                className="group flex items-center gap-2 text-slate-400 hover:text-[#865BFF] text-[10px] font-black uppercase tracking-widest transition-all"
                            >
                                <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-500" />
                                {t.landing.createAnother}
                            </button>
                        </div>
                    </div>
                </div>
            )}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* ─── RIGHT COLUMN: STUDIO PREVIEW (40%) ─── */}
        <div className={`hidden lg:block shrink-0 sticky top-10 transition-all duration-500 ${previewMode === 'desktop' ? 'w-full max-w-[1200px] absolute left-0 right-0 top-32 z-50 px-8' : 'lg:w-[400px]'}`}>
            <div className="bg-slate-50/50 rounded-[3rem] p-8 border border-slate-200/50 backdrop-blur-sm shadow-2xl">
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex items-center gap-2">
                        {previewMode === 'mobile' ? <Smartphone className="w-5 h-5 text-slate-400" /> : <Monitor className="w-5 h-5 text-slate-400" />}
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">{t.landing.studioPreview}</span>
                    </div>
                    {previewMode === 'desktop' && (
                        <button 
                            onClick={() => setPreviewMode('mobile')}
                            className="text-[10px] font-black text-[#865BFF] bg-[#865BFF]/10 px-4 py-1.5 rounded-full hover:bg-[#865BFF] hover:text-white transition-all"
                        >
                            CERRAR VISTA DESKTOP
                        </button>
                    )}
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
                    </div>
                </div>
                
                <DevicePreview html={debouncedHtml} mode={previewMode} />
                
                {previewMode === 'mobile' && (
                    <div className="mt-8 space-y-4">
                        <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                            <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">{t.landing.designStatus}</p>
                            <div className="flex items-center justify-between">
                                <span className="text-sm font-bold text-slate-700">{t.landing.totalProgress}</span>
                                <span className="text-sm font-black text-[#865BFF]">{Math.round((step / 4) * 100)}%</span>
                            </div>
                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-3 overflow-hidden">
                                <motion.div 
                                    className="h-full bg-[#865BFF]" 
                                    initial={{ width: 0 }}
                                    animate={{ width: `${(step / 4) * 100}%` }}
                                />
                            </div>
                        </div>
                        
                        <p className="text-[10px] text-center text-slate-400 px-4">
                            {t.landing.autoSaveNote}
                        </p>
                    </div>
                )}
            </div>
        </div>

        {/* Error Modal */}
        <AnimatePresence>
            {errorMsg && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setErrorMsg(null)}
                        className="absolute inset-0 bg-slate-900/60 backdrop-blur-md"
                    />
                    <motion.div 
                        initial={{ scale: 0.9, opacity: 0, y: 20 }}
                        animate={{ scale: 1, opacity: 1, y: 0 }}
                        exit={{ scale: 0.9, opacity: 0, y: 20 }}
                        className="relative w-full max-w-md bg-white rounded-[3rem] p-10 shadow-2xl border border-slate-100 overflow-hidden"
                    >
                        <div className="absolute top-0 left-0 w-full h-2 bg-red-500" />
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mb-8 mx-auto">
                            <AlertCircle className="w-10 h-10 text-red-500" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 text-center mb-4 uppercase tracking-tight">
                            {t.common.error || 'Error'}
                        </h3>
                        <p className="text-slate-500 text-center mb-10 font-medium leading-relaxed">
                            {errorMsg}
                        </p>
                        <button
                            onClick={() => setErrorMsg(null)}
                            className="w-full py-5 bg-slate-900 text-white font-black rounded-2xl hover:bg-red-500 transition-all uppercase tracking-widest text-xs shadow-xl"
                        >
                            {t.common.close || 'Cerrar'}
                        </button>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    </div>
</div>
);
}
