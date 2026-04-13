"use client";

import React, { useState, useEffect, useCallback } from 'react';
import {
    ChevronRight, ChevronDown, ChevronUp, Check, Globe, User,
    Loader2, Rocket, Layout, Sparkles, Copy, ExternalLink,
    Pencil, Eye, X, Download, ToggleLeft, ToggleRight,
    Plus, GripVertical, Trash2, ArrowLeft, ArrowRight, Save, Play
} from 'lucide-react';
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
    { code: 'ES', flag: '🇪🇸', label: 'Español' },
    { code: 'GB', flag: '🇬🇧', label: 'English' },
    { code: 'BR', flag: '🇧🇷', label: 'Português' },
    { code: 'FR', flag: '🇫🇷', label: 'Français' },
    { code: 'AR', flag: '🇸🇦', label: 'العربية' },
    { code: 'JP', flag: '🇯🇵', label: '日本語' },
    { code: 'ZH', flag: '🇨🇳', label: '中文' },
    { code: 'VI', flag: '🇻🇳', label: 'Tiếng Việt' },
];

const COUNTRIES = [
    'España', 'México', 'Colombia', 'Argentina', 'Chile', 'Perú',
    'Ecuador', 'Venezuela', 'Uruguay', 'Brasil', 'Estados Unidos', 'Otro'
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
                    <span className="text-lg flex-shrink-0">{section.icon}</span>
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
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
            <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[80vh] flex flex-col shadow-2xl overflow-hidden">
                <div className="flex items-center justify-between px-6 py-4 border-b border-slate-200">
                    <div>
                        <h3 className="text-lg font-black text-slate-800">Agregar Sección</h3>
                        <p className="text-xs text-slate-400">Selecciona secciones de cualquier template</p>
                    </div>
                    <button onClick={onClose} className="p-2 rounded-xl hover:bg-slate-100 text-slate-400">
                        <X className="w-5 h-5" />
                    </button>
                </div>

                {/* Category filters */}
                <div className="flex items-center gap-1.5 px-6 py-3 border-b border-slate-100 overflow-x-auto">
                    <button
                        onClick={() => setFilterCat('all')}
                        className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                            filterCat === 'all'
                                ? 'bg-[#865BFF] text-white'
                                : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                        }`}
                    >Todas</button>
                    {(Object.entries(SECTION_CATEGORIES) as [SectionCategory, { label: string; icon: string }][]).map(([key, val]) => (
                        <button
                            key={key}
                            onClick={() => setFilterCat(key)}
                            className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all flex-shrink-0 ${
                                filterCat === key
                                    ? 'bg-[#865BFF] text-white'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
                            }`}
                        >{val.icon} {val.label}</button>
                    ))}
                </div>

                {/* Section list */}
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                    {filtered.map(section => {
                        const isAlready = alreadySelected.includes(section.id);
                        return (
                            <div
                                key={section.id}
                                className={`flex items-center justify-between p-4 rounded-xl border transition-all ${
                                    isAlready
                                        ? 'border-emerald-200 bg-emerald-50'
                                        : 'border-slate-200 hover:border-[#865BFF]/30 hover:bg-[#865BFF]/5 cursor-pointer'
                                }`}
                                onClick={() => !isAlready && onAdd(section.id)}
                            >
                                <div className="flex items-center gap-3">
                                    <span className="text-lg">{section.icon}</span>
                                    <div>
                                        <h4 className="text-sm font-bold text-slate-800">{section.name}</h4>
                                        <p className="text-[10px] text-slate-400">{section.description}</p>
                                    </div>
                                </div>
                                {isAlready ? (
                                    <span className="text-xs font-bold text-emerald-600 flex items-center gap-1">
                                        <Check className="w-3.5 h-3.5" /> Incluida
                                    </span>
                                ) : (
                                    <Plus className="w-5 h-5 text-[#865BFF]" />
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

// ─── Main Component ─────────────────────────────────────────
interface LandingTypeformProps {
    initialTemplateId?: string; // Pre-select a template
}

export default function LandingTypeform({ initialTemplateId }: LandingTypeformProps) {
    const [step, setStep] = useState<Step>(initialTemplateId ? 2 : 1);
    const [userId, setUserId] = useState('');
    const [partnerId, setPartnerId] = useState('');

    // Step 1: Basic Data
    const [fullName, setFullName] = useState('');
    const [country, setCountry] = useState('');
    const [language, setLanguage] = useState('ES');
    const [whatsapp, setWhatsapp] = useState('');
    const [email, setEmail] = useState('');

    // Step 2: Template Selection
    const [selectedTemplate, setSelectedTemplate] = useState<string>(initialTemplateId || '');
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
                const { data: profile } = await supabase
                    .from('profiles')
                    .select('partner_id, full_name, email, whatsapp, country')
                    .eq('id', user.id)
                    .single();
                if (profile) {
                    setPartnerId(profile.partner_id || 'BM_' + user.id.substring(0, 8).toUpperCase());
                    if (profile.full_name) setFullName(profile.full_name);
                    if (profile.email) setEmail(profile.email);
                    if (profile.whatsapp) setWhatsapp(profile.whatsapp);
                    if (profile.country) setCountry(profile.country);
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

    // Pre-select if initialTemplateId passed
    useEffect(() => {
        if (initialTemplateId) {
            setSelectedTemplate(initialTemplateId);
        }
    }, [initialTemplateId]);

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

            if (!res.ok) console.error('Failed to save landing');

            setStep(5);
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

    return (
        <div className="max-w-5xl mx-auto pb-12">
            {/* Step Indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
                {STEPS.map((s, i) => {
                    const Icon = s.icon;
                    const isActive = step === s.num;
                    const isDone = step > s.num;
                    return (
                        <React.Fragment key={s.num}>
                            <button
                                onClick={() => { if (isDone) setStep(s.num as Step); }}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    isActive
                                        ? 'bg-[#865BFF] text-white shadow-md shadow-[#865BFF]/20'
                                        : isDone
                                            ? 'bg-emerald-100 text-emerald-700 cursor-pointer hover:bg-emerald-200'
                                            : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                {isDone ? <Check className="w-3.5 h-3.5" /> : <Icon className="w-3.5 h-3.5" />}
                                {s.label}
                            </button>
                            {i < STEPS.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300" />}
                        </React.Fragment>
                    );
                })}
            </div>

            {/* ─── STEP 1: Basic Data ─── */}
            {step === 1 && (
                <div className="bg-white rounded-2xl border border-slate-200 p-8 shadow-sm">
                    <h2 className="text-2xl font-black text-slate-800 mb-1">Datos del Partner</h2>
                    <p className="text-sm text-slate-400 mb-8">Información que se reflejará en la landing generada</p>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Nombre Completo *</label>
                            <input
                                type="text" value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                placeholder="John Doe"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">Email</label>
                            <input
                                type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="partner@email.com"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">WhatsApp</label>
                            <input
                                type="text" value={whatsapp}
                                onChange={(e) => setWhatsapp(e.target.value)}
                                placeholder="+1 234 567 8900"
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10"
                            />
                        </div>
                        <div>
                            <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-2 block">País</label>
                            <select
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                                className="w-full bg-slate-50 border border-slate-200 rounded-xl py-3 px-4 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10"
                            >
                                <option value="">Seleccionar...</option>
                                {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                            </select>
                        </div>
                    </div>

                    {/* Language */}
                    <div className="mt-6">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-wider mb-3 block">Idioma de la Landing *</label>
                        <div className="flex flex-wrap gap-2">
                            {LANGUAGES.map(lang => (
                                <button
                                    key={lang.code}
                                    onClick={() => setLanguage(lang.code)}
                                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                                        language === lang.code
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
                    <div className="text-center mb-6">
                        <h2 className="text-2xl font-black text-slate-800 mb-1">Elegir Template Base</h2>
                        <p className="text-sm text-slate-400">Selecciona un diseño como punto de partida. Podrás personalizar las secciones después.</p>
                    </div>

                    {/* Category filters */}
                    <div className="flex items-center justify-center gap-1.5 mb-6 flex-wrap">
                        {templateCategories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setTemplateFilter(cat)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                    templateFilter === cat
                                        ? 'bg-[#865BFF] text-white shadow-sm'
                                        : 'bg-white border border-slate-200 text-slate-500 hover:border-slate-300'
                                }`}
                            >
                                {cat === 'all' ? '🌐 Todas' : cat}
                            </button>
                        ))}
                    </div>

                    {/* Template Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                        {filteredTemplates.map(template => {
                            const isSelected = selectedTemplate === template.id;
                            return (
                                <div
                                    key={template.id}
                                    onClick={() => setSelectedTemplate(template.id)}
                                    className={`group relative rounded-2xl border-2 overflow-hidden cursor-pointer transition-all duration-300 ${
                                        isSelected
                                            ? 'border-[#865BFF] shadow-xl shadow-[#865BFF]/10 ring-2 ring-[#865BFF]/20'
                                            : 'border-slate-200 hover:border-slate-300 hover:shadow-lg hover:-translate-y-0.5'
                                    }`}
                                >
                                    {/* Gradient Header */}
                                    <div
                                        className="h-28 relative overflow-hidden"
                                        style={{ background: template.gradient }}
                                    >
                                        <div className="absolute inset-0 opacity-20" style={{
                                            backgroundImage: 'radial-gradient(circle at 70% 30%, rgba(255,255,255,0.2) 0%, transparent 50%)',
                                        }} />
                                        {template.badge && (
                                            <span className="absolute top-3 right-3 text-white text-[9px] font-black px-2 py-0.5 rounded-lg uppercase tracking-wider"
                                                style={{ background: 'rgba(0,0,0,0.3)', backdropFilter: 'blur(10px)' }}
                                            >{template.badge}</span>
                                        )}
                                        <div className="absolute bottom-3 left-4">
                                            <div className="text-[8px] font-bold uppercase tracking-[0.2em] text-white/40">Bridge Markets</div>
                                            <h3 className="text-lg font-black text-white leading-tight">{template.name}</h3>
                                        </div>
                                        {isSelected && (
                                            <div className="absolute top-3 left-3">
                                                <div className="w-6 h-6 bg-white rounded-full flex items-center justify-center">
                                                    <Check className="w-4 h-4 text-[#865BFF]" />
                                                </div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Body */}
                                    <div className="p-4 bg-white">
                                        <p className="text-[12px] text-slate-500 mb-3 line-clamp-2">{template.description}</p>
                                        <div className="flex items-center gap-1 flex-wrap">
                                            {template.sections.slice(0, 4).map(sId => {
                                                const sec = SECTION_CATALOG.find(s => s.id === sId);
                                                return sec ? (
                                                    <span key={sId} className="text-[9px] bg-slate-100 text-slate-500 px-2 py-0.5 rounded-full font-semibold">
                                                        {sec.icon} {sec.name.split(' ')[0]}
                                                    </span>
                                                ) : null;
                                            })}
                                            {template.sections.length > 4 && (
                                                <span className="text-[9px] text-slate-400 font-bold">+{template.sections.length - 4}</span>
                                            )}
                                        </div>
                                    </div>
                                </div>
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

            {/* ─── STEP 3: Section Editor ─── */}
            {step === 3 && (
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <div>
                            <h2 className="text-2xl font-black text-slate-800 mb-1">Editor de Secciones</h2>
                            <p className="text-sm text-slate-400">
                                Activa/desactiva, reordena y edita el contenido de cada sección.
                                <span className="font-bold text-[#865BFF] ml-1">{selectedSections.length} activas</span>
                            </p>
                        </div>
                        <button
                            onClick={() => setShowSectionPicker(true)}
                            className="flex items-center gap-2 px-4 py-2.5 bg-[#865BFF]/10 text-[#865BFF] font-bold rounded-xl hover:bg-[#865BFF]/20 transition-all text-sm border border-[#865BFF]/20"
                        >
                            <Plus className="w-4 h-4" /> Agregar Sección
                        </button>
                    </div>

                    {/* Active sections */}
                    <div className="space-y-3 mb-6">
                        {selectedSections.map((sId, index) => {
                            const section = SECTION_CATALOG.find(s => s.id === sId);
                            if (!section) return null;
                            return (
                                <div key={`${sId}-${index}`} className="flex items-start gap-2">
                                    {/* Reorder controls */}
                                    <div className="flex flex-col gap-0.5 pt-3">
                                        <button
                                            onClick={() => moveSectionUp(index)}
                                            className="p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                                            disabled={index === 0}
                                        >
                                            <ChevronUp className="w-4 h-4" />
                                        </button>
                                        <button
                                            onClick={() => moveSectionDown(index)}
                                            className="p-0.5 rounded hover:bg-slate-100 text-slate-400 hover:text-slate-600 disabled:opacity-20"
                                            disabled={index === selectedSections.length - 1}
                                        >
                                            <ChevronDown className="w-4 h-4" />
                                        </button>
                                    </div>

                                    {/* Section card */}
                                    <div className="flex-1">
                                        <SectionCard
                                            section={section}
                                            isEnabled={true}
                                            onToggle={() => removeSection(sId)}
                                            overrides={sectionOverrides[sId] || {}}
                                            onUpdateOverride={(key, val) => updateOverride(sId, key, val)}
                                        />
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Available sections not yet added */}
                    {SECTION_CATALOG.filter(s => !selectedSections.includes(s.id)).length > 0 && (
                        <div className="border-t border-slate-200 pt-6">
                            <h3 className="text-sm font-bold text-slate-400 mb-3">Secciones Disponibles</h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {SECTION_CATALOG.filter(s => !selectedSections.includes(s.id)).map(section => (
                                    <SectionCard
                                        key={section.id}
                                        section={section}
                                        isEnabled={false}
                                        onToggle={() => addSection(section.id)}
                                        overrides={{}}
                                        onUpdateOverride={() => {}}
                                    />
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Nav */}
                    <div className="mt-8 flex justify-between">
                        <button
                            onClick={() => setStep(2)}
                            className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Cambiar Template
                        </button>
                        <button
                            onClick={() => setStep(4)}
                            disabled={!canAdvance(3)}
                            className="flex items-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#865BFF]/20"
                        >
                            Preview y Generar <ArrowRight className="w-4 h-4" />
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
                    <h2 className="text-2xl font-black text-slate-800 mb-1">Preview y Generar</h2>
                    <p className="text-sm text-slate-400 mb-6">Revisa tu configuración antes de generar</p>

                    {/* Summary */}
                    <div className="bg-slate-50 rounded-xl p-6 mb-6 space-y-4">
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Template</span>
                                <p className="text-sm font-bold text-slate-800">
                                    {LANDING_TEMPLATES.find(t => t.id === selectedTemplate)?.name}
                                </p>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Idioma</span>
                                <p className="text-sm font-bold text-slate-800">
                                    {LANGUAGES.find(l => l.code === language)?.flag} {LANGUAGES.find(l => l.code === language)?.label}
                                </p>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Secciones</span>
                                <p className="text-sm font-bold text-[#865BFF]">{selectedSections.length} activas</p>
                            </div>
                            <div>
                                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Partner</span>
                                <p className="text-sm font-bold text-slate-800">{partnerId}</p>
                            </div>
                        </div>

                        {/* Section list */}
                        <div className="flex flex-wrap gap-1.5 pt-2">
                            {selectedSections.map(sId => {
                                const sec = SECTION_CATALOG.find(s => s.id === sId);
                                return sec ? (
                                    <span key={sId} className="text-[10px] bg-white border border-slate-200 text-slate-600 px-2.5 py-1 rounded-lg font-semibold">
                                        {sec.icon} {sec.name}
                                    </span>
                                ) : null;
                            })}
                        </div>
                    </div>

                    {/* Action buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={() => setStep(3)}
                            className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" /> Editar
                        </button>
                        <button
                            onClick={() => {
                                const data: LandingData = {
                                    fullName, country, language, whatsapp, email,
                                    landingType: selectedTemplate, partnerId,
                                    slug: `preview-${Date.now()}`,
                                    modularConfig: { templateId: selectedTemplate, selectedSections, sectionOverrides },
                                };
                                const html = generateModularLandingHTML(data);
                                openLandingPreview(html);
                            }}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-[#865BFF]/30 text-[#865BFF] font-bold rounded-xl hover:bg-[#865BFF]/5 transition-all"
                        >
                            <Play className="w-4 h-4" /> Preview en Vivo
                        </button>
                        <button
                            onClick={handleGenerate}
                            disabled={isGenerating}
                            className="flex-1 flex items-center justify-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 transition-all shadow-lg shadow-[#865BFF]/20"
                        >
                            {isGenerating ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Generando...</>
                            ) : (
                                <><Rocket className="w-4 h-4" /> Generar y Guardar</>
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
                                const blob = new Blob([generatedHTML], { type: 'text/html' });
                                const url = URL.createObjectURL(blob);
                                const a = document.createElement('a');
                                a.href = url;
                                a.download = `landing-${selectedTemplate}-${language.toLowerCase()}.html`;
                                a.click();
                                URL.revokeObjectURL(url);
                            }}
                            className="flex items-center gap-2 px-6 py-3 border-2 border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-all"
                        >
                            <Download className="w-4 h-4" /> Descargar HTML
                        </button>
                        <button
                            onClick={() => {
                                setStep(1);
                                setSelectedTemplate('');
                                setSelectedSections([]);
                                setSectionOverrides({});
                                setGeneratedHTML('');
                            }}
                            className="flex items-center gap-2 px-6 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] transition-all shadow-lg shadow-[#865BFF]/20"
                        >
                            <Plus className="w-4 h-4" /> Crear Otra
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}
