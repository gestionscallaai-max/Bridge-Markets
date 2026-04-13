"use client";

import React from 'react';
import { Globe } from 'lucide-react';
import { useSearchParams } from 'next/navigation';
import LandingTypeform from '@/components/Forms/LandingTypeform';

export default function LandingPageGenerator() {
    const searchParams = useSearchParams();
    const templateId = searchParams.get('template') || undefined;

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="card px-6 py-5 flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#f3efff] flex items-center justify-center shrink-0">
                    <Globe className="w-5 h-5 text-[#865BFF]" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Generador Modular de Landing Pages</h2>
                    <p className="text-sm text-slate-400 mt-0.5">Elige un template, personaliza las secciones y genera tu landing</p>
                </div>
            </div>

            {/* Wizard */}
            <LandingTypeform initialTemplateId={templateId} />
        </div>
    );
}
