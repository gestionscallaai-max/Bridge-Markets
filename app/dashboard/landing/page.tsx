"use client";

import React from 'react';
import LandingTypeform from '@/components/Forms/LandingTypeform';

export default function LandingPageGenerator() {
    return (
        <div className="space-y-6 pb-10">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none"></div>
                <div className="relative z-10 w-full mb-4">
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight mb-2">Generador de Landing Pages</h2>
                    <p className="text-slate-500 font-medium">Crea y despliega tu propia página de captura en menos de un minuto.</p>
                </div>
            </div>

            {/* Formulario Typeform */}
            <LandingTypeform />
        </div>
    );
}
