"use client";

import React, { useState } from 'react';
import { useLanguage } from '@/lib/i18n/context';
import {
    ChevronUp, Pencil, ToggleLeft, ToggleRight
} from 'lucide-react';
import { type SectionMeta } from '@/lib/landing-sections';

interface SectionCardProps {
    section: SectionMeta;
    isEnabled: boolean;
    onToggle: () => void;
    overrides: Record<string, any>;
    onUpdateOverride: (key: string, value: any) => void;
}

export default function SectionCard({
    section,
    isEnabled,
    onToggle,
    overrides,
    onUpdateOverride,
}: SectionCardProps) {
    const { t } = useLanguage();
    const [expanded, setExpanded] = useState(false);
    const content = { ...section.defaultContent, ...overrides };

    // Get editable string and array fields from content, excluding redundant brand/social fields
    const editableFields = Object.entries(content).filter(
        ([key, v]) => (typeof v === 'string' || Array.isArray(v)) && 
                      !key.startsWith('social')
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
                                        placeholder={
                                            key.toLowerCase().includes('url') 
                                            ? 'https://...' 
                                            : ''
                                        }
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2 px-3 text-sm text-slate-700 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF]/10"
                                    />
                                )}
                                {key.toLowerCase().includes('url') && (
                                    <p className="text-[9px] text-[#865BFF] mt-1 font-medium italic opacity-80">
                                        {key.toLowerCase().includes('cta') ? t.landing.urlHelpCta : 
                                         key.toLowerCase().includes('image') || key.toLowerCase().includes('photo') ? t.landing.urlHelpImage :
                                         key.toLowerCase().includes('video') ? t.landing.urlHelpVideo :
                                         key.toLowerCase().includes('social') ? t.landing.urlHelpSocial : 
                                         'Asegúrate de incluir https:// al inicio del enlace.'}
                                    </p>
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
