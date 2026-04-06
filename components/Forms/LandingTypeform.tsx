"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, Check, Globe, User, MapPin, MessageSquare, Mail, Loader2, Rocket, Target, Layout, Sparkles, Copy, ExternalLink, Download, Eye, X, RefreshCw } from 'lucide-react';
import { generateLandingHTML, downloadLandingHTML, openLandingPreview, type LandingData } from '@/lib/landing-generator';
import { supabase } from '@/lib/supabaseClient';

type Step = 1 | 2 | 3;

const COUNTRIES = [
    'España', 'México', 'Colombia', 'Argentina', 'Chile', 'Perú',
    'Ecuador', 'Venezuela', 'Uruguay', 'Brasil', 'Estados Unidos', 'Otro'
];

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

const LANDING_TYPES = [
    { id: 'institucional', title: 'Institucional', desc: 'Página principal del broker con todos los productos', icon: Layout, color: 'from-[#865BFF] to-[#6b3fd6]' },
    { id: 'forex', title: 'Forex Trading', desc: 'Enfocada en pares de divisas y spreads competitivos', icon: Target, color: 'from-blue-500 to-blue-600' },
    { id: 'cripto', title: 'Criptomonedas', desc: 'Trading de criptoactivos con apalancamiento', icon: Sparkles, color: 'from-amber-500 to-orange-500' },
    { id: 'propfirm', title: 'Prop Firm', desc: 'Modelo de fondeo para traders profesionales', icon: Rocket, color: 'from-emerald-500 to-teal-500' },
    { id: 'sinteticos', title: 'Índices Sintéticos', desc: 'Opera índices sintéticos 24/7 sin interrupciones', icon: Target, color: 'from-rose-500 to-red-600' },
    { id: 'bursatiles', title: 'Índices Bursátiles', desc: 'Los principales índices del mercado global', icon: Layout, color: 'from-indigo-500 to-purple-600' },
    { id: 'promociones', title: 'Promociones (General)', desc: 'Bonos y ofertas especiales para nuevos clientes', icon: Sparkles, color: 'from-pink-500 to-rose-500' },
    { id: 'premium_chess', title: 'Premium Black (Ajedrez)', desc: 'Diseño exclusivo con piezas 3D y temática elite', icon: Sparkles, color: 'from-[#140633] via-[#865BFF] to-[#07020f]' },
];

export default function LandingTypeform() {
    const [step, setStep] = useState<Step>(1);
    const [formData, setFormData] = useState({
        fullName: '',
        country: 'España',
        language: 'ES',
        whatsapp: '',
        email: '',
        landingType: 'institucional',
        googleAnalyticsId: '',
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [generated, setGenerated] = useState(false);
    const [generatedHtml, setGeneratedHtml] = useState('');
    const [showPreview, setShowPreview] = useState(false);
    const [copied, setCopied] = useState(false);
    const [deployedUrl, setDeployedUrl] = useState('');
    const [partnerId, setPartnerId] = useState('');
    const [savedLandings, setSavedLandings] = useState<{name: string; date: string; type: string; language: string}[]>([]);
    const [baseUrl, setBaseUrl] = useState('');

    useEffect(() => {
        setBaseUrl(window.location.origin);
        const saved = localStorage.getItem('bridge_landings');
        if (saved) {
            setSavedLandings(JSON.parse(saved));
        }

        // Recuperar la ID real del Partner
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) setPartnerId(user.id);
        });
    }, []);

    const iframeRef = useRef<HTMLIFrameElement>(null);

    const previewUrl = formData.fullName
        ? (baseUrl || 'https://bridge.com') + `/l/${formData.fullName.toLowerCase().replace(/\s+/g, '-')}`
        : 'https://bridge.com/l/tu-nombre';

    const handleNext = () => setStep((s) => Math.min(s + 1, 3) as Step);
    const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

    const handleGenerate = async () => {
        setIsGenerating(true);

        const slug = formData.fullName.toLowerCase().replace(/\s+/g, '-');

        const landingData: LandingData = {
            fullName: formData.fullName,
            country: formData.country,
            language: formData.language,
            whatsapp: formData.whatsapp,
            email: formData.email,
            landingType: formData.landingType,
            partnerId,
            slug,
            googleAnalyticsId: formData.googleAnalyticsId,
        };

        const html = generateLandingHTML(landingData);
        
        try {
            await fetch('/api/landings', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ slug, html, data: landingData })
            });
        } catch (error) {
            console.error('Error deploying landing:', error);
        }

        setGeneratedHtml(html);
        setDeployedUrl((baseUrl || 'https://bridge.com') + '/l/' + slug);
        setIsGenerating(false);
        setGenerated(true);

        // Save to history
        const newLanding = {
            name: formData.fullName,
            date: new Date().toLocaleString('es-ES'),
            type: LANDING_TYPES.find(t => t.id === formData.landingType)?.title || formData.landingType,
            language: formData.language,
        };
        const updated = [newLanding, ...savedLandings].slice(0, 10);
        setSavedLandings(updated);
        localStorage.setItem('bridge_landings', JSON.stringify(updated));
    };

    const handlePreview = () => {
        if (generatedHtml) {
            setShowPreview(true);
        }
    };

    const handleOpenNewTab = () => {
        if (deployedUrl) {
            window.open(deployedUrl, '_blank');
        } else if (generatedHtml) {
            openLandingPreview(generatedHtml);
        }
    };

    const handleDownload = () => {
        if (generatedHtml) {
            const filename = `landing-${formData.fullName.toLowerCase().replace(/\s+/g, '-')}-${formData.landingType}.html`;
            downloadLandingHTML(generatedHtml, filename);
        }
    };

    const handleCopyHtml = () => {
        navigator.clipboard.writeText(generatedHtml);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleReset = () => {
        setStep(1);
        setGenerated(false);
        setGeneratedHtml('');
        setFormData({ fullName: '', country: 'España', language: 'ES', whatsapp: '', email: '', landingType: 'institucional', googleAnalyticsId: '' });
    };

    const steps = [
        { num: 1, label: 'Datos' },
        { num: 2, label: 'Enfoque' },
        { num: 3, label: 'Generar' },
    ];

    const isStep1Valid = formData.fullName.trim().length > 0 && formData.email.trim().length > 0;

    return (
        <>
            <div className="w-full">
                {/* Stepper */}
                <div className="flex items-center gap-2 mb-8">
                    {steps.map((s, i) => (
                        <React.Fragment key={s.num}>
                            <div className="flex items-center gap-2">
                                <div className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all ${
                                    step > s.num ? 'bg-[#865BFF] text-white' :
                                    step === s.num ? 'bg-[#865BFF] text-white ring-4 ring-[#865BFF]/20' :
                                    'bg-slate-100 text-slate-400 border border-slate-200'
                                }`}>
                                    {step > s.num ? <Check className="w-3.5 h-3.5" /> : s.num}
                                </div>
                                <span className={`text-sm font-semibold ${step >= s.num ? 'text-slate-800' : 'text-slate-400'}`}>
                                    {s.label}
                                </span>
                            </div>
                            {i < steps.length - 1 && (
                                <ChevronRight className="w-4 h-4 text-slate-300 mx-1" />
                            )}
                        </React.Fragment>
                    ))}
                </div>

                {/* Step Content */}
                <div className="bg-white rounded-xl border border-slate-200 shadow-card">
                    {/* === STEP 1: Datos === */}
                    {step === 1 && (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Datos del comercial</h3>
                                <p className="text-sm text-slate-400 mt-0.5">Esta información aparecerá en tu landing personalizada</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                                <div>
                                    <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 mb-1.5">
                                        <User className="w-3.5 h-3.5" /> Nombre completo *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                                        placeholder="Carlos Martínez"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 transition-all"
                                    />
                                </div>

                                <div>
                                    <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 mb-1.5">
                                        <MapPin className="w-3.5 h-3.5" /> País *
                                    </label>
                                    <select
                                        value={formData.country}
                                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 transition-all appearance-none"
                                    >
                                        {COUNTRIES.map(c => <option key={c} value={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 mb-2">
                                    <Globe className="w-3.5 h-3.5" /> Idioma de la landing *
                                </label>
                                <div className="relative">
                                    <select
                                        value={formData.language}
                                        onChange={(e) => setFormData({ ...formData, language: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 transition-all appearance-none"
                                    >
                                        {LANGUAGES.map(lang => (
                                            <option key={lang.code} value={lang.code}>
                                                {lang.flag} {lang.label} ({lang.code})
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mt-5">
                                <div>
                                    <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 mb-1.5">
                                        <MessageSquare className="w-3.5 h-3.5" /> WhatsApp *
                                    </label>
                                    <input
                                        type="tel"
                                        value={formData.whatsapp}
                                        onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                        placeholder="+34 600 000 000"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 transition-all"
                                    />
                                </div>
                                <div>
                                    <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 mb-1.5">
                                        <Mail className="w-3.5 h-3.5" /> Email *
                                    </label>
                                    <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                        placeholder="admin@bridge.com"
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 transition-all"
                                    />
                                </div>
                            </div>

                            <div className="mt-5">
                                <label className="flex items-center gap-1.5 text-[12px] font-semibold text-slate-600 mb-1.5">
                                    <Target className="w-3.5 h-3.5" /> ID de Google Analytics (Opcional)
                                </label>
                                <input
                                    type="text"
                                    value={formData.googleAnalyticsId}
                                    onChange={(e) => setFormData({ ...formData, googleAnalyticsId: e.target.value })}
                                    placeholder="Ej. G-XXXXXXXXXX"
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 transition-all font-mono"
                                />
                                <p className="text-[10px] text-slate-400 mt-1.5">Permite rastrear visitantes a través de Google Analytics 4.</p>
                            </div>

                            <div className="mt-6">
                                <div className="bg-[#865BFF]/5 border border-[#865BFF]/20 rounded-lg px-4 py-3 flex items-center gap-3">
                                    <div className="flex items-center gap-1.5 text-[#865BFF]">
                                        <Globe className="w-4 h-4" />
                                        <span className="text-[11px] font-bold uppercase">Tu URL</span>
                                    </div>
                                    <span className="text-sm font-mono text-slate-600 truncate">{previewUrl}</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                                <button disabled className="text-sm font-medium text-slate-400 cursor-not-allowed">
                                    Atrás
                                </button>
                                <button
                                    onClick={handleNext}
                                    disabled={!isStep1Valid}
                                    className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#865BFF] text-white hover:bg-[#6b3fd6] transition-all shadow-sm disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-1.5"
                                >
                                    Continuar <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 2: Enfoque === */}
                    {step === 2 && (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Tipo de landing</h3>
                                <p className="text-sm text-slate-400 mt-0.5">Selecciona el enfoque de tu página personalizada</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {LANDING_TYPES.map(type => {
                                    const Icon = type.icon;
                                    const selected = formData.landingType === type.id;
                                    return (
                                        <button
                                            key={type.id}
                                            onClick={() => setFormData({ ...formData, landingType: type.id })}
                                            className={`p-5 rounded-xl border-2 text-left transition-all ${
                                                selected
                                                    ? 'border-[#865BFF] bg-[#865BFF]/5 shadow-sm'
                                                    : 'border-slate-200 bg-white hover:border-slate-300'
                                            }`}
                                        >
                                            <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${type.color} flex items-center justify-center mb-3`}>
                                                <Icon className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="font-bold text-slate-800 text-sm">{type.title}</div>
                                            <div className="text-xs text-slate-400 mt-0.5">{type.desc}</div>
                                            {selected && (
                                                <div className="mt-3 flex items-center gap-1 text-[#865BFF] text-xs font-semibold">
                                                    <Check className="w-3.5 h-3.5" /> Seleccionado
                                                </div>
                                            )}
                                        </button>
                                    );
                                })}
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                                <button onClick={handlePrev} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                                    Atrás
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-[#865BFF] text-white hover:bg-[#6b3fd6] transition-all shadow-sm flex items-center gap-1.5"
                                >
                                    Continuar <ChevronRight className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 3: Generar === */}
                    {step === 3 && !generated && (
                        <div className="p-8">
                            <div className="mb-6">
                                <h3 className="text-lg font-bold text-slate-800">Resumen y generación</h3>
                                <p className="text-sm text-slate-400 mt-0.5">Revisa tus datos antes de generar la landing page</p>
                            </div>

                            <div className="divide-y divide-slate-100 border border-slate-200 rounded-xl overflow-hidden">
                                {[
                                    { label: 'Nombre', value: formData.fullName },
                                    { label: 'País', value: formData.country },
                                    { label: 'Idioma', value: LANGUAGES.find(l => l.code === formData.language)?.label || formData.language },
                                    { label: 'WhatsApp', value: formData.whatsapp || '—' },
                                    { label: 'Email', value: formData.email },
                                    { label: 'Tipo', value: LANDING_TYPES.find(t => t.id === formData.landingType)?.title || formData.landingType },
                                ].map(row => (
                                    <div key={row.label} className="flex items-center justify-between px-5 py-3 text-sm">
                                        <span className="font-medium text-slate-400">{row.label}</span>
                                        <span className="font-semibold text-slate-800">{row.value}</span>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center justify-between mt-8 pt-6 border-t border-slate-100">
                                <button onClick={handlePrev} className="text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors">
                                    Atrás
                                </button>
                                <button
                                    onClick={handleGenerate}
                                    disabled={isGenerating}
                                    className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white hover:from-[#6b3fd6] hover:to-[#5530b0] transition-all shadow-lg shadow-[#865BFF]/20 flex items-center gap-2 disabled:opacity-70"
                                >
                                    {isGenerating ? (
                                        <><Loader2 className="w-4 h-4 animate-spin" /> Generando landing...</>
                                    ) : (
                                        <><Rocket className="w-4 h-4" /> Generar Landing Page</>
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* === STEP 3: Success === */}
                    {step === 3 && generated && (
                        <div className="p-8">
                            <div className="text-center mb-8">
                                <div className="w-14 h-14 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Check className="w-7 h-7 text-emerald-500" />
                                </div>
                                <h3 className="text-xl font-bold text-slate-800 mb-1">¡Landing generada exitosamente!</h3>
                                <p className="text-sm text-slate-400">Tu landing personalizada está lista. Previsualiza, descarga o copia el código.</p>
                            </div>

                            {/* Action buttons */}
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
                                <button
                                    onClick={handlePreview}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-[#865BFF] text-white font-semibold text-sm hover:bg-[#6b3fd6] transition-all"
                                >
                                    <Eye className="w-4 h-4" /> Vista Previa
                                </button>
                                <button
                                    onClick={handleOpenNewTab}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
                                >
                                    <ExternalLink className="w-4 h-4" /> Abrir en Nueva Pestaña
                                </button>
                                <button
                                    onClick={handleDownload}
                                    className="flex items-center justify-center gap-2 px-4 py-3 rounded-lg bg-slate-100 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition-all"
                                >
                                    <Download className="w-4 h-4" /> Descargar HTML
                                </button>
                            </div>

                            {/* Copy HTML source */}
                            <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">Código HTML</span>
                                    <button
                                        onClick={handleCopyHtml}
                                        className="text-xs font-semibold text-[#865BFF] hover:text-[#6b3fd6] transition-colors flex items-center gap-1"
                                    >
                                        {copied ? <><Check className="w-3 h-3" /> Copiado!</> : <><Copy className="w-3 h-3" /> Copiar código</>}
                                    </button>
                                </div>
                                <div className="bg-[#0f172a] rounded-lg p-4 max-h-32 overflow-y-auto">
                                    <pre className="text-xs text-emerald-400 font-mono whitespace-pre-wrap break-all leading-relaxed">
                                        {generatedHtml.substring(0, 500)}...
                                    </pre>
                                </div>
                            </div>

                            {/* Create another */}
                            <div className="flex items-center justify-center mt-6 pt-6 border-t border-slate-100">
                                <button
                                    onClick={handleReset}
                                    className="text-sm font-semibold text-[#865BFF] hover:text-[#6b3fd6] transition-colors flex items-center gap-1.5"
                                >
                                    <RefreshCw className="w-3.5 h-3.5" /> Crear otra landing
                                </button>
                            </div>
                        </div>
                    )}
                </div>

                {/* Saved Landings History */}
                {savedLandings.length > 0 && (
                    <div className="mt-6 bg-white rounded-xl border border-slate-200 shadow-card p-6">
                        <h4 className="text-sm font-bold text-slate-800 mb-3">Landings generadas recientemente</h4>
                        <div className="divide-y divide-slate-100">
                            {savedLandings.map((landing, i) => (
                                <div key={i} className="flex items-center justify-between py-2.5 text-sm">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-lg bg-[#865BFF]/10 flex items-center justify-center text-xs font-bold text-[#865BFF]">
                                            {landing.language}
                                        </div>
                                        <div>
                                            <div className="font-semibold text-slate-800">{landing.name}</div>
                                            <div className="text-xs text-slate-400">{landing.type} · {landing.date}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Preview Modal */}
            {showPreview && (
                <div className="fixed inset-0 z-[9999] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
                    <div className="bg-white rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-slate-200 bg-slate-50">
                            <div className="flex items-center gap-3">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400" />
                                    <div className="w-3 h-3 rounded-full bg-green-400" />
                                </div>
                                <span className="text-xs font-mono text-slate-400">{previewUrl}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={handleDownload}
                                    className="text-xs font-semibold text-slate-500 hover:text-slate-800 transition-colors flex items-center gap-1 px-2 py-1 rounded hover:bg-slate-200"
                                >
                                    <Download className="w-3.5 h-3.5" /> Descargar
                                </button>
                                <button
                                    onClick={() => setShowPreview(false)}
                                    className="p-1 rounded-lg hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                        <iframe
                            ref={iframeRef}
                            srcDoc={generatedHtml}
                            className="flex-1 w-full border-0"
                            title="Landing Preview"
                            sandbox="allow-same-origin"
                        />
                    </div>
                </div>
            )}
        </>
    );
}
