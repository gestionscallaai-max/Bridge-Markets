"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Check, ArrowLeft, ArrowRight } from 'lucide-react';
import Tilt from 'react-parallax-tilt';
import { type LandingTemplate } from '@/lib/landing-templates';
import { SECTION_CATALOG } from '@/lib/landing-sections';

interface TemplateStepProps {
    selectedTemplate: string;
    setSelectedTemplate: (v: string) => void;
    templateFilter: string;
    setTemplateFilter: (v: string) => void;
    filteredTemplates: LandingTemplate[];
    templateCategories: string[];
    getTemplateName: (tpl: LandingTemplate) => string;
    getTemplateDesc: (tpl: LandingTemplate) => string;
    canAdvance: boolean;
    onNext: () => void;
    onBack: () => void;
}

export default function TemplateStep({
    selectedTemplate, setSelectedTemplate,
    templateFilter, setTemplateFilter,
    filteredTemplates, templateCategories,
    getTemplateName, getTemplateDesc,
    canAdvance, onNext, onBack
}: TemplateStepProps) {
    const { t } = useLanguage();

    return (
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
                                            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-2xl">
                                                <Check className="w-8 h-8 text-[#865BFF]" />
                                            </div>
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
                    onClick={onBack}
                    className="flex items-center gap-2 px-6 py-3 border border-slate-200 text-slate-600 font-bold rounded-xl hover:bg-slate-50 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> {t.landing.backBtn}
                </button>
                <button
                    onClick={onNext}
                    disabled={!canAdvance}
                    className="flex items-center gap-2 px-8 py-3 bg-[#865BFF] text-white font-bold rounded-xl hover:bg-[#7349e5] disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-[#865BFF]/20"
                >
                    {t.landing.customizeSections} <ArrowRight className="w-4 h-4" />
                </button>
            </div>
        </div>
    );
}
