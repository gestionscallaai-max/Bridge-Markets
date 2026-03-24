"use client";

import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check, Copy, CheckCircle2, AlertCircle, Play, Globe, LayoutTemplate, Shield, Smartphone, ArrowRight, Loader2 } from 'lucide-react';
import Link from 'next/link';

type Step = 1 | 2 | 3 | 4;

export default function LandingTypeform() {
    const [step, setStep] = useState<Step>(1);
    const [formData, setFormData] = useState({
        subdomain: '',
        displayName: '',
        whatsapp: '',
        facebookPixel: '',
        googleAnalytics: ''
    });

    const [subdomainStatus, setSubdomainStatus] = useState<'idle' | 'checking' | 'available' | 'taken'>('idle');
    const [isDeploying, setIsDeploying] = useState(false);
    const [deployStatus, setDeployStatus] = useState<'idle' | 'success' | 'error'>('idle');
    const [deployedUrl, setDeployedUrl] = useState('');

    const handleNext = () => setStep((s) => Math.min(s + 1, 4) as Step);
    const handlePrev = () => setStep((s) => Math.max(s - 1, 1) as Step);

    const checkSubdomain = () => {
        if (!formData.subdomain) return;
        setSubdomainStatus('checking');
        // Simulate API call
        setTimeout(() => {
            if (formData.subdomain.includes('admin') || formData.subdomain === 'test') {
                setSubdomainStatus('taken');
            } else {
                setSubdomainStatus('available');
            }
        }, 800);
    };

    const handleDeploy = async () => {
        setIsDeploying(true);
        setDeployStatus('idle');

        try {
            const response = await fetch('/api/landing/deploy', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Deployment failed');

            const data = await response.json();
            setDeployedUrl(data.url);
            setDeployStatus('success');
        } catch (error) {
            console.error('Error deploying landing:', error);
            setDeployStatus('error');
        } finally {
            setIsDeploying(false);
        }
    };

    const renderStepContent = () => {
        switch (step) {
            case 1:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto space-y-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-indigo-100 to-blue-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-indigo-100/50">
                                <Globe className="w-8 h-8 text-indigo-500" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Elige tu Subdominio</h2>
                            <p className="text-slate-500 text-lg font-medium">Esta será la dirección web de tu nueva Landing Page.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-slate-100">
                            <div className="space-y-4">
                                <label className="text-sm font-bold text-slate-700 block">Prefijo del Subdominio</label>
                                <div className="flex bg-slate-50 border-2 border-slate-200 rounded-2xl overflow-hidden focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100 transition-all">
                                    <input
                                        type="text"
                                        value={formData.subdomain}
                                        onChange={(e) => {
                                            setFormData({ ...formData, subdomain: e.target.value.toLowerCase().replace(/[^a-z0-9-]/g, '') });
                                            setSubdomainStatus('idle');
                                        }}
                                        placeholder="mi-nombre"
                                        className="flex-1 bg-transparent px-5 py-4 text-slate-800 font-bold placeholder-slate-400 focus:outline-none min-w-0"
                                    />
                                    <div className="bg-slate-100/80 px-5 flex items-center justify-center border-l-2 border-slate-200 text-slate-500 font-bold text-sm select-none">
                                        .bridgemarkets.com
                                    </div>
                                </div>

                                {formData.subdomain && subdomainStatus === 'idle' && (
                                    <button onClick={checkSubdomain} className="text-indigo-600 text-sm font-bold hover:text-indigo-700 transition-colors flex items-center gap-1">
                                        Verificar disponibilidad <ArrowRight className="w-4 h-4" />
                                    </button>
                                )}

                                {subdomainStatus === 'checking' && (
                                    <div className="flex items-center gap-2 text-indigo-500 text-sm font-bold">
                                        <Loader2 className="w-4 h-4 animate-spin" /> Verificando...
                                    </div>
                                )}

                                {subdomainStatus === 'available' && (
                                    <div className="flex flex-col gap-1 p-4 bg-emerald-50 rounded-xl border border-emerald-100 animate-in zoom-in-95">
                                        <div className="flex items-center gap-2 text-emerald-600 text-sm font-bold">
                                            <CheckCircle2 className="w-5 h-5" /> ¡Subdominio disponible!
                                        </div>
                                    </div>
                                )}

                                {subdomainStatus === 'taken' && (
                                    <div className="flex flex-col gap-1 p-4 bg-rose-50 rounded-xl border border-rose-100 animate-in headShake">
                                        <div className="flex items-center gap-2 text-rose-600 text-sm font-bold">
                                            <AlertCircle className="w-5 h-5" /> Este subdominio ya está en uso. Elige otro.
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                );
            case 2:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto space-y-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-emerald-100 to-green-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-emerald-100/50">
                                <LayoutTemplate className="w-8 h-8 text-emerald-500" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Personalización</h2>
                            <p className="text-slate-500 text-lg font-medium">Añade tu información de contacto a la página.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block">Nombre a Mostrar</label>
                                <input
                                    type="text"
                                    value={formData.displayName}
                                    onChange={(e) => setFormData({ ...formData, displayName: e.target.value })}
                                    placeholder="Ej. Juan Pérez - IB Oficial"
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block flex items-center gap-2">
                                    <Smartphone className="w-4 h-4 text-emerald-500" /> WhatsApp para contactos
                                </label>
                                <input
                                    type="tel"
                                    value={formData.whatsapp}
                                    onChange={(e) => setFormData({ ...formData, whatsapp: e.target.value })}
                                    placeholder="+54 9 11 1234-5678"
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition-all cursor-text text-left"
                                />
                                <p className="text-xs text-slate-400 font-medium">Incluye el código de país. Los usuarios podrán contactarte directamente.</p>
                            </div>
                        </div>
                    </div>
                );
            case 3:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-xl mx-auto space-y-8">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-fuchsia-100 to-pink-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-fuchsia-100/50">
                                <Shield className="w-8 h-8 text-fuchsia-500" />
                            </div>
                            <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Analítica (Opcional)</h2>
                            <p className="text-slate-500 text-lg font-medium">Conecta tus píxeles para seguimiento de conversiones.</p>
                        </div>

                        <div className="bg-white rounded-3xl p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-slate-100 space-y-6">
                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block">Pixel de Meta (Facebook)</label>
                                <input
                                    type="text"
                                    value={formData.facebookPixel}
                                    onChange={(e) => setFormData({ ...formData, facebookPixel: e.target.value })}
                                    placeholder="Ej. 123456789012345"
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all font-mono"
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 block">Google Analytics (G-XXXXX)</label>
                                <input
                                    type="text"
                                    value={formData.googleAnalytics}
                                    onChange={(e) => setFormData({ ...formData, googleAnalytics: e.target.value })}
                                    placeholder="G-..."
                                    className="w-full bg-slate-50 border-2 border-slate-200 rounded-2xl px-5 py-4 text-slate-800 font-bold placeholder-slate-400 focus:outline-none focus:border-fuchsia-500 focus:ring-4 focus:ring-fuchsia-100 transition-all font-mono"
                                />
                            </div>
                        </div>
                    </div>
                );
            case 4:
                return (
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-2xl mx-auto space-y-8">
                        {deployStatus === 'idle' && (
                            <>
                                <div className="text-center">
                                    <div className="w-16 h-16 bg-gradient-to-br from-amber-100 to-yellow-50 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-sm border border-amber-100/50">
                                        <Play className="w-8 h-8 text-amber-500 ml-1" />
                                    </div>
                                    <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Listo para Desplegar</h2>
                                    <p className="text-slate-500 text-lg font-medium">Revisa tus datos. Tu landing se generará en menos de 1 minuto.</p>
                                </div>

                                <div className="bg-white rounded-3xl p-8 shadow-[0_4px_30px_rgb(0,0,0,0.03)] border border-slate-100 divide-y divide-slate-100">
                                    <div className="py-4 flex justify-between items-center">
                                        <span className="text-slate-500 font-bold text-sm">URL Final</span>
                                        <span className="text-slate-800 font-black">https://{formData.subdomain || '[subdominio]'}.bridgemarkets.com</span>
                                    </div>
                                    <div className="py-4 flex justify-between items-center">
                                        <span className="text-slate-500 font-bold text-sm">Nombre</span>
                                        <span className="text-slate-800 font-bold">{formData.displayName || 'No definido'}</span>
                                    </div>
                                    <div className="py-4 flex justify-between items-center">
                                        <span className="text-slate-500 font-bold text-sm">WhatsApp</span>
                                        <span className="text-slate-800 font-bold">{formData.whatsapp || 'No definido'}</span>
                                    </div>
                                    <div className="py-4 flex justify-between items-center">
                                        <span className="text-slate-500 font-bold text-sm">Analítica</span>
                                        <span className="text-slate-800 font-bold">
                                            {formData.facebookPixel ? 'Meta ✅ ' : ''}
                                            {formData.googleAnalytics ? 'Google ✅' : ''}
                                            {!formData.facebookPixel && !formData.googleAnalytics ? 'Ninguna' : ''}
                                        </span>
                                    </div>
                                </div>
                            </>
                        )}

                        {deployStatus === 'success' && (
                            <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 text-center animate-in zoom-in-95 duration-500">
                                <div className="w-24 h-24 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6 animate-in scale-in-75 duration-500 delay-150">
                                    <Check className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">¡Landing Desplegada!</h2>
                                <p className="text-slate-500 text-lg font-medium mb-8">Tu landing page oficial de Bridge Markets ya está activa y configurada.</p>

                                <div className="bg-slate-50 p-6 rounded-2xl flex flex-col items-center border border-slate-200 mb-8 mx-auto max-w-md">
                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Tu Enlace Público</span>
                                    <div className="flex items-center gap-3 w-full">
                                        <div className="flex-1 bg-white border border-slate-200 px-4 py-3 rounded-xl font-mono text-sm text-slate-700 font-bold truncate">
                                            {deployedUrl}
                                        </div>
                                        <button className="bg-slate-200 hover:bg-slate-300 text-slate-700 p-3 rounded-xl transition-colors shrink-0" title="Copiar URL">
                                            <Copy className="w-5 h-5" />
                                        </button>
                                    </div>
                                </div>

                                <Link
                                    href="/dashboard"
                                    className="inline-flex items-center justify-center px-8 py-4 bg-slate-800 text-white rounded-2xl font-bold hover:bg-slate-900 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-0.5"
                                >
                                    Volver al Dashboard principal
                                </Link>
                            </div>
                        )}

                        {deployStatus === 'error' && (
                            <div className="bg-white rounded-3xl p-10 shadow-[0_10px_40px_rgba(0,0,0,0.08)] border border-slate-100 text-center animate-in zoom-in-95">
                                <div className="w-24 h-24 bg-rose-100 text-rose-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <AlertCircle className="w-12 h-12" />
                                </div>
                                <h2 className="text-3xl font-extrabold text-slate-800 mb-3 tracking-tight">Error de Despliegue</h2>
                                <p className="text-slate-500 text-lg font-medium mb-8">Hubo un problema de conexión con el VPS. Por favor, intenta de nuevo.</p>
                                <button
                                    onClick={() => setDeployStatus('idle')}
                                    className="inline-flex items-center justify-center px-8 py-3.5 bg-slate-100 text-slate-800 rounded-2xl font-bold hover:bg-slate-200 transition-colors"
                                >
                                    Reintentar
                                </button>
                            </div>
                        )}
                    </div>
                );
        }
    };

    const isNextDisabled = () => {
        if (step === 1) return !formData.subdomain || subdomainStatus !== 'available';
        if (step === 4) return isDeploying || deployStatus === 'success';
        return false;
    };

    return (
        <div className="w-full relative min-h-[600px] flex flex-col">
            {/* Progress Bar Header */}
            {deployStatus !== 'success' && (
                <div className="mb-10 px-8 pt-8">
                    <div className="flex justify-between relative mb-2">
                        {/* Connecting Line */}
                        <div className="absolute top-1/2 left-0 right-0 h-1 bg-slate-200 -z-10 -translate-y-1/2 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-slate-800 transition-all duration-500 ease-out"
                                style={{ width: `${((step - 1) / 3) * 100}%` }}
                            ></div>
                        </div>

                        {/* Steps */}
                        {[1, 2, 3, 4].map((s) => (
                            <div
                                key={s}
                                className={`w-10 h-10 rounded-full flex items-center justify-center font-black text-sm transition-all duration-300 ${step > s ? 'bg-slate-800 text-white shadow-md' :
                                        step === s ? 'bg-slate-800 text-white shadow-lg shadow-slate-800/20 scale-110 ring-4 ring-white' :
                                            'bg-white border-2 border-slate-200 text-slate-400'
                                    }`}
                            >
                                {step > s ? <Check className="w-5 h-5" /> : s}
                            </div>
                        ))}
                    </div>
                    <div className="flex justify-between text-[11px] font-bold text-slate-400 uppercase tracking-widest px-1">
                        <span className={step >= 1 ? 'text-slate-800' : ''}>Subdominio</span>
                        <span className={step >= 2 ? 'text-slate-800' : ''}>Personalizar</span>
                        <span className={step >= 3 ? 'text-slate-800' : ''}>Analítica</span>
                        <span className={step >= 4 ? 'text-slate-800' : ''}>Desplegar</span>
                    </div>
                </div>
            )}

            {/* Main Form Content */}
            <div className="flex-1 px-4 lg:px-8 pb-32 flex flex-col justify-center">
                {renderStepContent()}
            </div>

            {/* Bottom Actions Bar */}
            {deployStatus !== 'success' && deployStatus !== 'error' && (
                <div className="fixed bottom-0 lg:absolute lg:bottom-0 left-0 right-0 bg-white/80 backdrop-blur-xl border-t border-slate-200/80 p-4 lg:p-6 lg:rounded-b-3xl flex justify-between items-center z-50">
                    <button
                        onClick={handlePrev}
                        disabled={step === 1 || isDeploying}
                        className="px-6 py-3.5 rounded-2xl font-bold text-sm text-slate-500 hover:bg-slate-100 hover:text-slate-800 transition-colors disabled:opacity-30 disabled:hover:bg-transparent disabled:cursor-not-allowed flex items-center"
                    >
                        <ChevronLeft className="w-5 h-5 mr-1" /> Atrás
                    </button>

                    {step < 4 ? (
                        <button
                            onClick={handleNext}
                            disabled={isNextDisabled()}
                            className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-slate-800 text-white hover:bg-slate-900 transition-all shadow-md hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed flex items-center group"
                        >
                            Siguiente <ChevronRight className="w-5 h-5 ml-1 group-hover:translate-x-1 transition-transform" />
                        </button>
                    ) : (
                        <button
                            onClick={handleDeploy}
                            disabled={isDeploying}
                            className="px-8 py-3.5 rounded-2xl font-bold text-sm bg-gradient-to-r from-amber-500 to-amber-600 text-white hover:from-amber-600 hover:to-amber-700 transition-all shadow-lg shadow-amber-500/20 flex items-center group disabled:opacity-70 disabled:cursor-not-allowed"
                        >
                            {isDeploying ? (
                                <>
                                    <Loader2 className="w-5 h-5 mr-2 animate-spin" /> Procesando VPS...
                                </>
                            ) : (
                                <>
                                    <Play className="w-5 h-5 mr-2" /> ¡Desplegar Ahora!
                                </>
                            )}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
