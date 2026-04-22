"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Rocket, Layout, Globe, Pencil, Loader2 } from 'lucide-react';
import { LANDING_TEMPLATES } from '@/lib/landing-templates';
import { SECTION_CATALOG } from '@/lib/landing-sections';
import { LANGUAGES } from '@/lib/landing-generator'; // Adjust import if needed

interface GenerateStepProps {
    isGenerating: boolean;
    processStep: string;
    selectedTemplate: string;
    selectedSections: string[];
    language: string;
    onGenerate: () => void;
    onBack: () => void;
    getTemplateName: (tpl: any) => string;
}

export default function GenerateStep({
    isGenerating,
    processStep,
    selectedTemplate,
    selectedSections,
    language,
    onGenerate,
    onBack,
    getTemplateName
}: GenerateStepProps) {
    const { t } = useLanguage();

    return (
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
                                <p className="text-sm font-medium text-slate-500">
                                    {(() => { 
                                        const tpl = LANDING_TEMPLATES.find(tp => tp.id === selectedTemplate); 
                                        return tpl ? getTemplateName(tpl) : (selectedTemplate || 'Custom Design'); 
                                    })()}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm text-emerald-500">
                                <Globe className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="text-xs font-black text-slate-800 uppercase tracking-tight">{t.landing.territoryLang}</p>
                                <p className="text-sm font-medium text-slate-500">
                                    {(() => {
                                        const langObj = LANGUAGES.find(l => l.code === language);
                                        return langObj ? `${langObj.flag} ${langObj.label}` : `🌐 ${language}`;
                                    })()}
                                </p>
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
                    onClick={onBack}
                    className="flex-1 flex items-center justify-center gap-3 px-8 py-4 border-2 border-slate-100 text-slate-400 font-black rounded-2xl hover:bg-slate-50 hover:text-slate-600 transition-all text-sm uppercase tracking-widest"
                >
                    <Pencil className="w-4 h-4" /> {t.landing.backToEditor}
                </button>
                <button
                    onClick={onGenerate}
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
    );
}
