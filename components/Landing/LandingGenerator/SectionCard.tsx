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

const SPANISH_FIELD_LABELS: Record<string, string> = {
    tag: 'Etiqueta / Distintivo',
    title: 'Título Principal',
    heading: 'Encabezado',
    subtitle: 'Subtítulo',
    badge: 'Distintivo / Badge',
    desc: 'Descripción / Texto Principal',
    text: 'Texto Principal',
    ibPhrase: 'Frase del IB / Socio',
    ctaText: 'Texto del Botón Principal (CTA)',
    ctaUrl: 'Enlace del Botón Principal (URL)',
    secondaryCtaText: 'Texto del Botón Secundario',
    secondaryCtaUrl: 'Enlace del Botón Secundario (URL)',
    communityName: 'Nombre de tu Comunidad',
    communityMessage: 'Mensaje para tu Comunidad',
    photoUrl: 'URL de tu Foto o Logo',
    date: 'Texto de Fecha Visible',
    time: 'Texto de Hora Visible',
    place: 'Lugar / Ubicación del Evento',
    location: 'Ubicación / Sede',
    videoTitle: 'Título del Video Promocional',
    videoDesc: 'Descripción del Video',
    videoUrl: 'URL del Video (YouTube Embed)',
    titleLeft: 'Título Columna Izquierda',
    subtitleLeft: 'Subtítulo Columna Izquierda',
    textLeft: 'Texto Columna Izquierda',
    btnLeftText: 'Texto Botón Izquierdo',
    titleRight: 'Título Columna Derecha',
    subtitleRight: 'Subtítulo Columna Derecha',
    textRight: 'Texto Columna Derecha',
    btnRightText: 'Texto Botón Derecho',
    buttonText: 'Texto del Botón de Envío',
    copyrightText: 'Texto de Pie de Página (Copyright)',
    tab1Label: 'Pestaña 1 (Título)',
    tab2Label: 'Pestaña 2 (Título)',
    metric1Val: 'Métrica 1 (Valor)',
    metric1Label: 'Métrica 1 (Etiqueta)',
    metric2Val: 'Métrica 2 (Valor)',
    metric2Label: 'Métrica 2 (Etiqueta)',
    metric3Val: 'Métrica 3 (Valor)',
    metric3Label: 'Métrica 3 (Etiqueta)',
    ibName: 'Nombre del IB',
    supportContact: 'Contacto de Soporte'
};

function getFieldLabel(key: string) {
    if (SPANISH_FIELD_LABELS[key]) return SPANISH_FIELD_LABELS[key];
    return key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()).trim();
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
                    <span className="material-symbols-outlined text-lg flex-shrink-0 text-[#865BFF]">
                        {section.icon === 'stepper' ? 'alt_route' : section.icon === 'tabs' ? 'tab' : section.icon}
                    </span>
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
                                        {getFieldLabel(key)} (Tabla/Lista)
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
                                                            <label className="text-[8px] font-bold text-slate-400 uppercase mb-1 block">{getFieldLabel(subKey)}</label>
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

                        const isDateTimePicker = key === 'countdownTarget' || key === 'targetDate' || key === 'eventDateTime';

                        if (isDateTimePicker) {
                            const currentVal = (overrides[key] ?? val) as string;
                            let dateForInput = '';
                            try {
                                const d = new Date(currentVal);
                                if (!isNaN(d.getTime())) {
                                    // Local ISO format YYYY-MM-DDTHH:mm
                                    const year = d.getFullYear();
                                    const month = String(d.getMonth() + 1).padStart(2, '0');
                                    const day = String(d.getDate()).padStart(2, '0');
                                    const hours = String(d.getHours()).padStart(2, '0');
                                    const mins = String(d.getMinutes()).padStart(2, '0');
                                    dateForInput = `${year}-${month}-${day}T${hours}:${mins}`;
                                } else {
                                    dateForInput = currentVal.slice(0, 16);
                                }
                            } catch {
                                dateForInput = currentVal;
                            }

                            return (
                                <div key={key} className="p-3 bg-violet-50/60 rounded-xl border border-[#865BFF]/20 space-y-2">
                                    <label className="text-[10px] font-black text-[#865BFF] uppercase tracking-wider block">
                                        📅 Fecha y Hora del Evento (Temporizador Regresivo)
                                    </label>
                                    <input
                                        type="datetime-local"
                                        value={dateForInput}
                                        onChange={(e) => {
                                            const selectedVal = e.target.value;
                                            const newIso = selectedVal ? `${selectedVal}:00` : selectedVal;
                                            onUpdateOverride(key, newIso);

                                            // Auto-formatear texto de fecha y hora si existen en la sección
                                            try {
                                                const d = new Date(selectedVal);
                                                if (!isNaN(d.getTime())) {
                                                    const dayNames = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
                                                    const monthNames = ['enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio', 'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'];
                                                    const dayStr = `${dayNames[d.getDay()]}, ${d.getDate()} de ${monthNames[d.getMonth()]} de ${d.getFullYear()}`;
                                                    const hours = String(d.getHours()).padStart(2, '0');
                                                    const mins = String(d.getMinutes()).padStart(2, '0');
                                                    const timeStr = `${hours}:${mins} Horas`;

                                                    if ('date' in content) onUpdateOverride('date', dayStr);
                                                    if ('time' in content) onUpdateOverride('time', timeStr);
                                                }
                                            } catch (err) {}
                                        }}
                                        className="w-full bg-white border border-[#865BFF]/30 rounded-lg py-2 px-3 text-sm text-slate-800 focus:outline-none focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/20 font-bold"
                                    />
                                    <p className="text-[9px] text-[#865BFF] font-medium italic">
                                        Selecciona fecha y hora. El reloj de la landing y los textos descriptivos se sincronizarán en tiempo real.
                                    </p>
                                </div>
                            );
                        }

                        return (
                            <div key={key}>
                                <label className="text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1 block">
                                    {getFieldLabel(key)}
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
