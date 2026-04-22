"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Layout, Plus, ChevronUp, ChevronDown, ArrowLeft, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import SectionCard from '../SectionCard';
import SectionPicker from '../SectionPicker';
import { SECTION_CATALOG } from '@/lib/landing-sections';

interface EditorStepProps {
    selectedSections: string[];
    sectionOverrides: Record<string, any>;
    updateOverride: (id: string, key: string, val: any) => void;
    moveSectionUp: (idx: number) => void;
    moveSectionDown: (idx: number) => void;
    removeSection: (id: string) => void;
    addSection: (id: string) => void;
    showSectionPicker: boolean;
    setShowSectionPicker: (v: boolean) => void;
    onNext: () => void;
    onBack: () => void;
}

export default function EditorStep({
    selectedSections,
    sectionOverrides,
    updateOverride,
    moveSectionUp,
    moveSectionDown,
    removeSection,
    addSection,
    showSectionPicker,
    setShowSectionPicker,
    onNext,
    onBack
}: EditorStepProps) {
    const { t } = useLanguage();

    return (
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
                    onClick={onBack}
                    className="flex items-center gap-3 px-6 py-3.5 text-slate-400 font-black text-xs uppercase tracking-[0.1em] hover:text-slate-600 transition-all"
                >
                    <ArrowLeft className="w-4 h-4" /> {t.landing.backBtn}
                </button>
                <button
                    onClick={onNext}
                    disabled={selectedSections.length === 0}
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
    );
}
