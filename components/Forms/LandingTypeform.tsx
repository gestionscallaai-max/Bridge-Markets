"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import {
    ChevronRight, ChevronDown, ChevronUp, Check, Globe, User,
    Loader2, Rocket, Layout, Sparkles, Copy, ExternalLink,
    Pencil, Eye, X, Download, ToggleLeft, ToggleRight,
    Plus, GripVertical, Trash2, ArrowLeft, ArrowRight, Save, Play,
    History as HistoryIcon, Info, MessageCircle, Send, Share2, Smartphone
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Tilt from 'react-parallax-tilt';
import {
    generateLandingHTML, generateModularLandingHTML, openLandingPreview,
    type LandingData, type ModularConfig
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
    const [expanded, setExpanded] = useState(false);
    const content = { ...section.defaultContent, ...overrides };

    // Get editable string fields from content
    const editableFields = Object.entries(content).filter(
        ([, v]) => typeof v === 'string'
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
                                {section.name}
                            </h4>
                            <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-slate-100 text-slate-400 font-bold uppercase tracking-wider flex-shrink-0">
                                L{section.sourceTemplate}
                            </span>
                        </div>
                        <p className={`text-[10px] mt-0.5 truncate ${isEnabled ? 'text-slate-400' : 'text-slate-300'}`}>
                            {section.description}
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
                    {editableFields.map(([key, val]) => (
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
                    ))}
                    <p className="text-[10px] text-slate-400 italic pt-1">
                        Los arrays (items, traders, etc.) usan valores por defecto. Edita los textos básicos aquí.
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
    const [filterCat, setFilterCat] = useState<SectionCategory | 'all'>('all');

    const filtered = filterCat === 'all'
        ? SECTION_CATALOG
        : SECTION_CATALOG.filter(s => s.category === filterCat);

    return (
        <div className="fixed inset-0 z-50 bg-slate-900/30 backdrop-blur-sm flex items-center justify-center p-4 md:p-8">
            <div className="bg-white/95 border border-slate-200/60 rounded-[32px] w-full max-w-6xl h-[85vh] flex flex-col md:flex-row shadow-[0_20px_80px_-15px_rgba(109,40,217,0.2)] overflow-hidden relative">
                
                {/* Left Sidebar Category Filters */}
                <div className="md:w-72 bg-slate-50/80 backdrop-blur-xl border-r border-slate-200/60 flex flex-col relative z-10">
                    <div className="p-8 pb-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-brand-purple to-indigo-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-brand-purple/20">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>
                        <h3 className="text-2xl font-black text-slate-800 tracking-tight mb-2">Librería<br/>Modular</h3>
                        <p className="text-xs text-slate-500 leading-relaxed font-medium">Arrastra o toca para inyectar secciones al Blueprint actual.</p>
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
                            Todas las Secciones
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
                    {/* Header */}
                    <div className="flex justify-between items-center px-8 py-6 border-b border-slate-100 backdrop-blur-md sticky top-0 z-20 bg-white/80">
                        <div>
                            <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Mostrando Resultados</span>
                            <h4 className="text-lg font-bold text-slate-800 mt-1">
                                {filterCat === 'all' ? 'Catálogo Completo' : SECTION_CATEGORIES[filterCat as string].label}
                            </h4>
                        </div>
                        <button onClick={onClose} className="p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 hover:rotate-90 text-slate-500 hover:text-slate-800 transition-all duration-300">
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    {/* Section Grid */}
                    <div className="flex-1 overflow-y-auto p-8">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                            {filtered.map(section => {
                                const isAlready = alreadySelected.includes(section.id);
                                return (
                                    <div
                                        key={section.id}
                                        className={`group relative overflow-hidden flex flex-col justify-between p-6 rounded-[28px] border transition-all duration-500 ease-out ${
                                            isAlready
                                                ? 'border-brand-purple/20 bg-brand-purple/5 shadow-sm cursor-not-allowed'
                                                : 'border-slate-200 bg-white hover:border-brand-purple/40 cursor-pointer hover:-translate-y-1 shadow-sm hover:shadow-xl hover:shadow-brand-purple/10'
                                        }`}
                                        onClick={() => !isAlready && onAdd(section.id)}
                                    >
                                        <div className="flex items-start justify-between relative z-10 mb-6">
                                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all duration-500 ${isAlready ? 'bg-brand-purple text-white' : 'bg-slate-50 text-brand-purple border border-slate-100 group-hover:scale-110 group-hover:bg-brand-purple group-hover:text-white'}`}>
                                                <span className="material-symbols-outlined text-2xl">{section.icon}</span>
                                            </div>
                                            {isAlready ? (
                                                <div className="bg-white border border-brand-purple/30 rounded-full px-3 py-1 flex items-center gap-1 shadow-sm">
                                                    <Check className="w-3 h-3 text-brand-purple" />
                                                    <span className="text-[9px] font-black tracking-widest text-brand-purple uppercase">Añadida</span>
                                                </div>
                                            ) : (
                                                <div className="w-8 h-8 rounded-full border border-slate-200 flex items-center justify-center bg-slate-50 group-hover:border-brand-purple group-hover:bg-brand-purple transition-all duration-300">
                                                    <Plus className="w-4 h-4 text-slate-400 group-hover:text-white" />
                                                </div>
                                            )}
                                        </div>
                                        
                                        <div className="relative z-10">
                                            <h4 className="text-base font-bold text-slate-800 mb-2 tracking-tight group-hover:text-brand-purple transition-colors">{section.name}</h4>
                                            <p className="text-xs text-slate-500 leading-relaxed group-hover:text-slate-600 transition-colors line-clamp-2">{section.description}</p>
                                        </div>

                                        {/* Hover geometric decoration */}
                                        <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-gradient-to-tl from-brand-purple/10 to-transparent rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 blur-xl"></div>
                                    </div>
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
function PhoneMockup({ html }: { html: string }) {
    return (
        <div className="sticky top-10 w-full max-w-[320px] mx-auto">
            <div className="relative w-full aspect-[9/18.5] bg-[#0d0221] rounded-[40px] border-[8px] border-[#1a0545] shadow-2xl overflow-hidden group">
                {/* Speaker/Camera notch */}
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a0545] rounded-b-2xl z-30 flex items-center justify-center">
                    <div className="w-10 h-1 bg-white/10 rounded-full" />
                </div>
                
                {/* Iframe Content */}
                <div className="absolute inset-0 z-10 bg-white">
                    <iframe 
                        srcDoc={html} 
                        className="w-[300%] h-[300%] origin-top-left scale-[0.333]" 
                        style={{ border: 'none' }}
                        title="Live Mobile Preview"
                        sandbox="allow-same-origin allow-scripts"
                    />
                </div>

                {/* Glass overlay/reflection */}
                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30" />
                
                {/* Bottom Bar */}
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-30" />
            </div>
            <div className="mt-4 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 line-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Vista Previa en Vivo
                </span>
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────
interface LandingTypeformProps {
    initialTemplate?: string;
    onGoToHistory?: () => void;
}

export default function LandingTypeform({ initialTemplate, onGoToHistory }: LandingTypeformProps) {
    const { t } = useLanguage();

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
    const [ctaLink, setCtaLink] = useState('');
    const [language, setLanguage] = useState('ES');

    // Step 2: Template Selection
    const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplate || '');
    const [templateFilter, setTemplateFilter] = useState<string>('all');

    // Step 3: Section Editor
    const [selectedSections, setSelectedSections] = useState<string[]>([]);
    const [sectionOverrides, setSectionOverrides] = useState<Record<string, Record<string, any>>>({});
    const [showSectionPicker, setShowSectionPicker] = useState(false);

    // Step 4-5: Generate
    const [isGenerating, setIsGenerating] = useState(false);
    const [generatedHTML, setGeneratedHTML] = useState('');
    const [copied, setCopied] = useState(false);

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

    // Pre-select if initialTemplate passed
    useEffect(() => {
        if (initialTemplate) {
            setSelectedTemplate(initialTemplate);
        }
    }, [initialTemplate]);

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
        setIsGenerating(true);

        const data: LandingData = {
            fullName,
            country,
            language,
            whatsapp,
            email,
            landingType: selectedTemplate,
            partnerId,
            slug: `${selectedTemplate}-${language.toLowerCase()}-${Date.now()}`,
            communityName,
            heroPhrase,
            instagram,
            telegram,
            tiktok,
            ctaLink,
            modularConfig: {
                templateId: selectedTemplate,
                selectedSections,
                sectionOverrides,
            },
        };

        try {
            const html = generateModularLandingHTML(data);
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
                const errorData = await res.json();
                console.error('Failed to save landing:', errorData.details || errorData.error);
                // Also show an alert to the user for immediate feedback if they are looking
                alert("Error al guardar: " + (errorData.details || errorData.error));
            } else {
                setStep(5);
            }
        } catch (err) {
            console.error('Error generating:', err);
        } finally {
            setIsGenerating(false);
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

    // Step indicator
    const STEPS = [
        { num: 1, label: 'Datos', icon: User },
        { num: 2, label: 'Template', icon: Layout },
        { num: 3, label: 'Secciones', icon: Sparkles },
        { num: 4, label: 'Generar', icon: Rocket },
    ];

    // Live Preview HTML
    const livePreviewHtml = React.useMemo(() => {
        if (!selectedTemplate || selectedSections.length === 0) return '';
        const data: LandingData = {
            fullName, country, language, whatsapp, email,
            landingType: selectedTemplate, partnerId,
            slug: 'live-preview',
            communityName,
            heroPhrase,
            instagram,
            telegram,
            tiktok,
            ctaLink,
            modularConfig: { templateId: selectedTemplate, selectedSections, sectionOverrides },
        };
        return generateModularLandingHTML(data);
    }, [selectedTemplate, selectedSections, sectionOverrides, fullName, country, language, whatsapp, email, partnerId, communityName, heroPhrase, instagram, telegram, tiktok, ctaLink]);

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
                                <h2 className="text-xl font-black text-slate-800">Identidad Digital</h2>
                                <p className="text-xs text-slate-400 font-medium">Información oficial que aparecerá en tu landing</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            {/* Grupo 1: Datos Corporativos */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Público *</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#865BFF] transition-colors">
                                            <User className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="text" value={fullName}
                                            onChange={(e) => setFullName(e.target.value)}
                                            placeholder="Tu nombre o marca personal"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-1.5">
                                    <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Email de Contacto</label>
                                    <div className="relative group">
                                        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-300 group-focus-within:text-[#865BFF] transition-colors">
                                            <Globe className="w-4 h-4" />
                                        </div>
                                        <input
                                            type="email" value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder="ejemplo@correo.com"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-3.5 pl-11 pr-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Grupo 2: Personalización Visual */}
                            <div className="p-6 rounded-2xl bg-[#865BFF]/5 border border-[#865BFF]/10 space-y-6">
                                <div className="flex items-center gap-2 mb-2">
                                    <Sparkles className="w-4 h-4 text-[#865BFF]" />
                                    <span className="text-xs font-black text-[#865BFF] uppercase tracking-wider">Ajustes de Marca</span>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Nombre Comunidad (Opcional)</label>
                                        <input
                                            type="text" value={communityName}
                                            onChange={(e) => setCommunityName(e.target.value)}
                                            placeholder="Ej: Wolf Trading Club"
                                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] transition-all"
                                        />
                                    </div>
                                    <div className="space-y-1.5">
                                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest ml-1">Frase Impacto (Hero)</label>
                                        <input
                                            type="text" value={heroPhrase}
                                            onChange={(e) => setHeroPhrase(e.target.value)}
                                            placeholder="Ej: Tu puerta al éxito"
                                            className="w-full bg-white border border-slate-200 rounded-2xl py-3.5 px-4 text-sm text-slate-700 outline-none focus:border-[#865BFF] transition-all"
                                        />
                                    </div>
                                </div>
                            </div>

                            {/* Grupo 3: Social Hub */}
                            <div className="space-y-4">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-2">
                                        <Share2 className="w-4 h-4 text-slate-400" />
                                        <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Canales de Comunicación</span>
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
                                    {/* CTA Link Extra */}
                                    <div className="md:col-span-2 p-4 rounded-2xl border border-[#865BFF]/20 bg-[#865BFF]/5 group focus-within:border-[#865BFF] transition-all">
                                        <div className="flex items-center gap-2 mb-3">
                                            <div className="w-7 h-7 rounded-lg bg-[#865BFF] flex items-center justify-center">
                                                <ExternalLink className="w-3.5 h-3.5 text-white" />
                                            </div>
                                            <span className="text-[10px] font-black text-[#865BFF] uppercase">Botón de Acción (Link Custom)</span>
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
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">Idioma de la Landing *</label>
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
                            Siguiente <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 2: Template Selection ─── */}
            {step === 2 && (
                <div>
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#865BFF]/10 text-[#865BFF] text-[10px] font-black uppercase tracking-widest mb-4">
                            Step 02 — Studio Designs
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 mb-2">Selecciona tu Blueprint</h2>
                        <p className="text-sm text-slate-400 max-w-lg mx-auto">Elige una base profesional diseñada para máxima conversión. Podrás editar cada sección en el siguiente paso.</p>
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
                                {cat === 'all' ? 'Ver Todos' : cat}
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
                                                    <span className="text-white font-black text-xl tracking-tighter">{template.name}</span>
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
                                                {template.description}
                                            </p>
                                            
                                            <div className="flex flex-wrap gap-2">
                                                {template.sections.slice(0, 5).map(sId => {
                                                    const sec = SECTION_CATALOG.find(s => s.id === sId);
                                                    return sec ? (
                                                        <div key={sId} className="flex items-center gap-1.5 bg-slate-50 text-slate-500 px-3 py-1.5 rounded-xl border border-slate-100 group-hover:border-[#865BFF]/10 transition-colors">
                                                            <span className="material-symbols-outlined text-[14px] text-[#865BFF]/60">{sec.icon}</span>
                                                            <span className="text-[10px] font-bold uppercase tracking-wider">{sec.name.split(' ')[0]}</span>
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
                                                {isSelected ? 'Plantilla Seleccionada' : 'Elegir éste Diseño'}
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
                            <ArrowLeft className="w-4 h-4" /> Atrás
                        </button>
                        <button
                            onClick={() => setStep(3)}
                            disabled={!canAdvance(2)}
                            className="flex items-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#865BFF]/20"
                        >
                            Personalizar Secciones <ArrowRight className="w-4 h-4" />
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
                                <h2 className="text-2xl font-black text-slate-800 tracking-tight">Estructura Modular</h2>
                                <p className="text-sm text-slate-400 font-medium font-mono">Total: {selectedSections.length} bloques activos</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowSectionPicker(true)}
                            className="group flex items-center gap-3 px-6 py-3.5 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] transition-all text-xs uppercase tracking-widest shadow-xl shadow-[#865BFF]/30"
                        >
                            <Plus className="w-4 h-4 group-hover:rotate-90 transition-transform duration-300" /> 
                            Agregar Bloque
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
                                <p className="text-slate-400 font-black uppercase text-[10px] tracking-widest">Diseño vacío</p>
                                <button
                                    onClick={() => setShowSectionPicker(true)}
                                    className="mt-4 text-[#865BFF] font-black text-xs hover:underline decoration-2 underline-offset-4"
                                >
                                    Agrega el primer bloque de contenido
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
                            Finalizar y Lanzar <ArrowRight className="w-4 h-4 shadow-inner" />
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
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight">Protocolo de Lanzamiento</h2>
                        <p className="text-sm text-slate-400 font-medium">Todo listo para generar tu nueva herramienta de captación</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                        {/* Blueprint Summary Card */}
                        <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 relative overflow-hidden group">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-[#865BFF]/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700" />
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Configuración Base</h3>
                            
                            <div className="space-y-6 relative z-10">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-[#865BFF]">
                                        <Layout className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Design Blueprint</p>
                                        <p className="text-sm font-medium text-slate-500">{LANDING_TEMPLATES.find(t => t.id === selectedTemplate)?.name}</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                                        <Globe className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-black text-slate-800 uppercase tracking-tight">Territorio / Idioma</p>
                                        <p className="text-sm font-medium text-slate-500">{LANGUAGES.find(l => l.code === language)?.flag} {LANGUAGES.find(l => l.code === language)?.label}</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Inventory Card */}
                        <div className="p-8 rounded-[2rem] bg-slate-50 border border-slate-100 border-dashed relative">
                            <h3 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4">Inventario de Bloques</h3>
                            <div className="space-y-3">
                                <div className="flex items-center justify-between p-3 bg-white rounded-xl border border-slate-100 shadow-sm">
                                    <span className="text-xs font-bold text-slate-700">Secciones Activas</span>
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
                            <Pencil className="w-4 h-4" /> Volver al Editor
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="flex-[2] flex items-center justify-center gap-4 px-10 py-4 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] disabled:opacity-50 transition-all text-sm uppercase tracking-[0.2em] shadow-2xl shadow-[#865BFF]/30 active:scale-[0.98]"
                        >
                            {isGenerating ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Procesando...</>
                            ) : (
                                <><Rocket className="w-5 h-5 shadow-lg" /> ¡Desplegar Landing!</>
                            )}
                        </button>
                    </div>
                </div>
            )}

            {/* ─── STEP 5: Success ─── */}
            {step === 5 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm text-center">
                    <div className="w-16 h-16 bg-emerald-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                        <Check className="w-8 h-8 text-emerald-500" />
                    </div>
                    <h2 className="text-2xl font-black text-slate-800 mb-2">¡Landing Generada!</h2>
                    <p className="text-sm text-slate-400 mb-8">Tu landing modular está lista para compartir</p>

                    <div className="flex flex-wrap gap-3 justify-center">
                        <button
                            onClick={() => openLandingPreview(generatedHTML)}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            <Eye className="w-4 h-4" /> Ver en Vivo
                        </button>
                        <button
                            onClick={() => {
                                navigator.clipboard.writeText(`${window.location.origin}/l/${selectedTemplate}-${language.toLowerCase()}`);
                                setCopied(true);
                                setTimeout(() => setCopied(false), 2000);
                            }}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? '¡Copiado!' : 'Copiar Link'}
                        </button>

                        {onGoToHistory && (
                            <button
                                onClick={onGoToHistory}
                                className="flex items-center gap-2 px-6 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] transition-all shadow-lg shadow-[#865BFF]/20"
                            >
                                <HistoryIcon className="w-4 h-4" />
                                Ver mi Historial
                            </button>
                        )}
                    </div>

                    <div className="mt-8 pt-8 border-t border-slate-100 flex justify-center">
                        <button
                            onClick={() => {
                                setStep(1);
                                setSelectedTemplate('');
                                setSelectedSections([]);
                                setSectionOverrides({});
                                setGeneratedHTML('');
                            }}
                            className="text-slate-400 hover:text-[#865BFF] text-sm font-black uppercase tracking-wider transition-all"
                        >
                            + Crear otra herramienta
                        </button>
                    </div>
                </div>
            )}
                </motion.div>
            </AnimatePresence>
        </div>

        {/* ─── RIGHT COLUMN: STUDIO PREVIEW (40%) ─── */}
        <div className="hidden lg:block lg:w-[400px] shrink-0 sticky top-10">
            <div className="bg-slate-50/50 rounded-[3rem] p-8 border border-slate-200/50 backdrop-blur-sm">
                <div className="flex items-center justify-between mb-8 px-4">
                    <div className="flex items-center gap-2">
                        <Smartphone className="w-5 h-5 text-slate-400" />
                        <span className="text-xs font-black text-slate-400 uppercase tracking-widest">Studio Preview</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                        <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                        <span className="text-[10px] font-bold text-emerald-600 uppercase">Live</span>
                    </div>
                </div>
                
                <PhoneMockup html={livePreviewHtml} />
                
                <div className="mt-8 space-y-4">
                    <div className="p-4 bg-white rounded-2xl border border-slate-100 shadow-sm">
                        <p className="text-[11px] font-bold text-slate-400 uppercase mb-2">Estado del Diseño</p>
                        <div className="flex items-center justify-between">
                            <span className="text-sm font-bold text-slate-700">Progreso total</span>
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
                        Toda la información se guarda automáticamente encriptada en la base de datos oficial.
                    </p>
                </div>
            </div>
        </div>
    </div>
</div>
);
}
