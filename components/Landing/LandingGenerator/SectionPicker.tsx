"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { X, Sparkles } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    SECTION_CATALOG, SECTION_CATEGORIES,
    type SectionCategory
} from '@/lib/landing-sections';

interface SectionPickerProps {
    onAdd: (sectionId: string) => void;
    onClose: () => void;
    alreadySelected: string[];
}

export default function SectionPicker({
    onAdd,
    onClose,
    alreadySelected,
}: SectionPickerProps) {
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
