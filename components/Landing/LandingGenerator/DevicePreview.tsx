"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Smartphone, Monitor } from 'lucide-react';
import ModularPreview from '@/components/Landing/ModularPreview';

interface DevicePreviewProps {
    html: string;
    mode: 'mobile' | 'desktop';
}

export default function DevicePreview({ html, mode }: DevicePreviewProps) {
    const { t } = useLanguage();
    
    if (mode === 'desktop') {
        return (
            <div className="sticky top-10 w-full">
                <div className="relative w-full aspect-video bg-[#000] rounded-3xl border-[12px] border-slate-800 shadow-2xl overflow-hidden group">
                    <div className="absolute top-0 left-0 w-full h-8 bg-slate-800 flex items-center px-4 gap-2 z-30">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                    </div>
                    <div className="absolute inset-0 pt-8 bg-[#000]">
                        <ModularPreview html={html} theme="dark" />
                    </div>
                </div>
                <div className="mt-4 text-center">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-indigo-500 animate-pulse" />
                        Desktop Institutional Hub
                    </span>
                </div>
            </div>
        );
    }

    return (
        <div className="sticky top-10 w-full max-w-[320px] mx-auto">
            <div className="relative w-full aspect-[9/18.5] bg-[#000000] rounded-[40px] border-[8px] border-[#1a0545] shadow-2xl overflow-hidden group">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-[#1a0545] rounded-b-2xl z-30 flex items-center justify-center">
                    <div className="w-10 h-1 bg-white/10 rounded-full" />
                </div>
                
                <div className="absolute inset-0 z-10 bg-[#000000]">
                    <ModularPreview 
                        html={html} 
                        style={{ width: '100%', height: '100%', border: 'none' }} 
                    />
                </div>

                <div className="absolute inset-0 z-20 pointer-events-none bg-gradient-to-tr from-white/5 to-transparent opacity-30" />
                <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-24 h-1 bg-white/20 rounded-full z-30" />
            </div>
            <div className="mt-4 text-center">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest flex items-center justify-center gap-1.5 line-pulse">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {t.landing.livePreviewLabel}
                </span>
            </div>
        </div>
    );
}
