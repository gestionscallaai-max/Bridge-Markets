"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import {
    Check, Smartphone, Monitor, AlertCircle, User, Layout, Sparkles, Rocket, Globe, History as HistoryIcon
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ModularPreview from '@/components/Landing/ModularPreview';

// Modular Components
import SectionCard from '../Landing/LandingGenerator/SectionCard';
import SectionPicker from '../Landing/LandingGenerator/SectionPicker';
import DevicePreview from '../Landing/LandingGenerator/DevicePreview';

// Modular Steps
import IdentityStep from '../Landing/LandingGenerator/Steps/IdentityStep';
import TemplateStep from '../Landing/LandingGenerator/Steps/TemplateStep';
import EditorStep from '../Landing/LandingGenerator/Steps/EditorStep';
import GenerateStep from '../Landing/LandingGenerator/Steps/GenerateStep';
import SuccessStep from '../Landing/LandingGenerator/Steps/SuccessStep';
import {
    generateLandingHTML, generateModularLandingHTML, openLandingPreview,
    type LandingData, type ModularConfig, type BrandConfig, LANGUAGES
} from '@/lib/landing-generator';
import {
    SECTION_CATALOG, SECTION_CATEGORIES, SECTION_RENDERERS,
    type SectionMeta, type SectionCategory
} from '@/lib/landing-sections';
import { LANDING_TEMPLATES, type LandingTemplate } from '@/lib/landing-templates';
import { supabase } from '@/lib/supabaseClient';

type Step = 1 | 2 | 3 | 4 | 5;



const COUNTRIES = [
    'España', 'México', 'Colombia', 'Argentina', 'Chile', 'Perú',
    'Ecuador', 'Venezuela', 'Uruguay', 'Brasil', 'India', 'China',
    'Francia', 'Arabia Saudita', 'Bangladesh', 'Rusia', 'Japón',
    'Indonesia', 'Vietnam', 'Estados Unidos', 'Otro'
];


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
    const isInitialLoad = React.useRef(true);

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
                    .select('id, name, email, referral_link')
                    .eq('id', user.id)
                    .single();
                
                if (partnerData) {
                    // In the partners table, 'id' is used as the link to landings
                    setPartnerId(partnerData.id);
                    if (partnerData.name) setFullName(partnerData.name);
                    if (partnerData.email) setEmail(partnerData.email);
                    if (partnerData.referral_link) setCtaLink(partnerData.referral_link);
                } else {
                    // Fallback to BM_ ID if partner record doesn't exist
                    setPartnerId('BM_' + user.id.substring(0, 24).toUpperCase());
                }
            }
        };
        loadUser();
    }, []);

    // When template is selected, pre-fill sections ONLY if not the very first load of an edit
    useEffect(() => {
        if (selectedTemplate) {
            // If we are editing, we skip the first run because editData effect will handle it
            if (editData && isInitialLoad.current) {
                isInitialLoad.current = false;
                return;
            }
            
            const template = LANDING_TEMPLATES.find(t => t.id === selectedTemplate);
            if (template) {
                setSelectedSections([...template.sections]);
                setSectionOverrides({});
            }
        }
    }, [selectedTemplate, editData]);

    // Pre-select if initialTemplate or editData passed
    useEffect(() => {
        if (editData) {
            setStep(3); // Go straight to editor
            
            // Handle both flat structure and nested 'data' structure from Supabase
            const d = editData.data || editData;
            const config = editData.config || d;
            const modular = d.modularConfig || config.modularConfig || editData.modularConfig;

            setFullName(d.fullName || config.fullName || editData.fullName || '');
            setCountry(d.country || config.country || editData.country || '');
            setWhatsapp(d.whatsapp || config.whatsapp || editData.whatsapp || '');
            setEmail(d.email || config.email || editData.email || '');
            setCommunityName(d.communityName || config.communityName || editData.communityName || '');
            setHeroPhrase(d.heroPhrase || config.heroPhrase || editData.heroPhrase || '');
            setInstagram(d.instagram || config.instagram || editData.instagram || '');
            setTelegram(d.telegram || config.telegram || editData.telegram || '');
            setTiktok(d.tiktok || config.tiktok || editData.tiktok || '');
            setYoutube(d.youtube || config.youtube || editData.youtube || '');
            setCtaLink(d.ctaLink || config.ctaLink || editData.ctaLink || '');
            setVideoUrl(d.videoUrl || config.videoUrl || editData.videoUrl || '');
            setCustomLogoUrl(d.customLogoUrl || config.customLogoUrl || editData.customLogoUrl || '');
            setLanguage(editData.language || d.language || config.language || 'ES');
            
            // Handle template ID mapping (database uses landing_type)
            setSelectedTemplate(editData.landing_type || editData.template_id || editData.landingType || '');
            
            // Handle modular sections mapping
            const sections = editData.sections || modular?.sections || [];
            if (sections.length > 0) {
                setSelectedSections(sections);
            }
            
            setSectionOverrides(modular?.overrides || config.sectionOverrides || {});
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

            <AnimatePresence mode="popLayout">
                <motion.div
                    key={step}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                    className="min-h-[500px]"
                >
                    {step === 1 && (
                        <IdentityStep
                            fullName={fullName} setFullName={setFullName}
                            email={email} setEmail={setEmail}
                            communityName={communityName} setCommunityName={setCommunityName}
                            heroPhrase={heroPhrase} setHeroPhrase={setHeroPhrase}
                            whatsapp={whatsapp} setWhatsapp={setWhatsapp}
                            telegram={telegram} setTelegram={setTelegram}
                            instagram={instagram} setInstagram={setInstagram}
                            tiktok={tiktok} setTiktok={setTiktok}
                            youtube={youtube} setYoutube={setYoutube}
                            ctaLink={ctaLink} setCtaLink={setCtaLink}
                            language={language} setLanguage={setLanguage}
                            DYNAMIC_LANGUAGES={DYNAMIC_LANGUAGES}
                            canAdvance={canAdvance(1)}
                            onNext={() => setStep(2)}
                        />
                    )}

                    {step === 2 && (
                        <TemplateStep
                            selectedTemplate={selectedTemplate}
                            setSelectedTemplate={setSelectedTemplate}
                            templateFilter={templateFilter}
                            setTemplateFilter={setTemplateFilter}
                            filteredTemplates={filteredTemplates}
                            templateCategories={templateCategories}
                            getTemplateName={getTemplateName}
                            getTemplateDesc={getTemplateDesc}
                            canAdvance={canAdvance(2)}
                            onNext={() => setStep(3)}
                            onBack={() => setStep(1)}
                        />
                    )}

                    {step === 3 && (
                        <EditorStep
                            selectedSections={selectedSections}
                            sectionOverrides={sectionOverrides}
                            updateOverride={updateOverride}
                            moveSectionUp={moveSectionUp}
                            moveSectionDown={moveSectionDown}
                            removeSection={removeSection}
                            addSection={addSection}
                            showSectionPicker={showSectionPicker}
                            setShowSectionPicker={setShowSectionPicker}
                            onNext={() => setStep(4)}
                            onBack={() => setStep(2)}
                        />
                    )}

                    {step === 4 && (
                        <GenerateStep
                            isGenerating={isGenerating}
                            processStep={processStep}
                            selectedTemplate={selectedTemplate}
                            selectedSections={selectedSections}
                            language={language}
                            onGenerate={handleGenerate}
                            onBack={() => setStep(3)}
                            getTemplateName={getTemplateName}
                        />
                    )}

                    {step === 5 && (
                        <SuccessStep
                            finalSlug={finalSlug}
                            copied={copied}
                            setCopied={setCopied}
                            onGoToHistory={onGoToHistory}
                            onReset={() => {
                                setStep(1);
                                setSelectedTemplate('');
                                setSelectedSections([]);
                                setSectionOverrides({});
                                setFinalSlug('');
                            }}
                        />
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
