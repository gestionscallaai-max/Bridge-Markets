"use client";

import React from 'react';
import { useLanguage } from '@/lib/i18n/context';
import { Rocket, Sparkles, Share2, Copy, Check, ExternalLink, Plus, History as HistoryIcon } from 'lucide-react';
import { motion } from 'framer-motion';

interface SuccessStepProps {
    finalSlug: string;
    copied: boolean;
    setCopied: (v: boolean) => void;
    onGoToHistory?: () => void;
    onReset: () => void;
}

export default function SuccessStep({
    finalSlug,
    copied,
    setCopied,
    onGoToHistory,
    onReset
}: SuccessStepProps) {
    const { t } = useLanguage();
    const landingUrl = `https://bridgemarkets.com/l/${finalSlug}`;

    const handleCopy = () => {
        navigator.clipboard.writeText(landingUrl);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="bg-white rounded-[3rem] border border-slate-200 p-12 shadow-2xl shadow-indigo-500/5 text-center relative overflow-hidden">
            {/* Decorative Background */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-1 bg-gradient-to-r from-transparent via-[#865BFF] to-transparent" />
            <div className="absolute -top-24 -right-24 w-48 h-48 bg-[#865BFF]/5 rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-indigo-50/5 rounded-full blur-3xl" />

            <div className="relative z-10">
                <div className="relative inline-block mb-8">
                    <div className="w-24 h-24 bg-emerald-500 rounded-[2.5rem] flex items-center justify-center shadow-2xl shadow-emerald-500/20 rotate-3">
                        <Rocket className="w-12 h-12 text-white" />
                    </div>
                    <motion.div
                        animate={{ scale: [1, 1.2, 1], rotate: [0, 10, 0] }}
                        transition={{ repeat: Infinity, duration: 3 }}
                        className="absolute -top-4 -right-4 w-12 h-12 bg-amber-400 rounded-2xl flex items-center justify-center shadow-lg -rotate-12"
                    >
                        <Sparkles className="w-6 h-6 text-white" />
                    </motion.div>
                </div>

                <h2 className="text-4xl font-black text-slate-800 tracking-tight mb-4">{t.landing.landingGenerated}</h2>
                <p className="text-slate-400 font-medium max-w-md mx-auto mb-10">
                    {t.landing.landingReadyToShare}
                </p>

                <div className="max-w-2xl mx-auto p-2 bg-slate-50 rounded-[2rem] border border-slate-100 flex flex-col md:flex-row items-center gap-2 mb-12">
                    <div className="flex-1 flex items-center gap-3 px-6 py-3 min-w-0">
                        <Share2 className="w-4 h-4 text-slate-300 shrink-0" />
                        <span className="text-sm font-bold text-slate-400 truncate">{landingUrl}</span>
                    </div>
                    <div className="flex gap-2 w-full md:w-auto p-1">
                        <button
                            onClick={handleCopy}
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-white text-slate-600 font-black rounded-2xl hover:shadow-md transition-all text-xs uppercase tracking-widest border border-slate-100"
                        >
                            {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                            {copied ? t.common.success : t.landing.copyLink}
                        </button>
                        <a
                            href={landingUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex-1 md:flex-none flex items-center justify-center gap-2 px-6 py-3 bg-[#865BFF] text-white font-black rounded-2xl hover:bg-[#7349e5] shadow-lg shadow-[#865BFF]/20 transition-all text-xs uppercase tracking-widest"
                        >
                            <ExternalLink className="w-4 h-4" /> {t.landing.viewLive}
                        </a>
                    </div>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-4">
                    <button
                        onClick={onReset}
                        className="flex items-center gap-2 px-8 py-4 bg-slate-900 text-white font-black rounded-2xl hover:bg-black transition-all text-xs uppercase tracking-widest"
                    >
                        <Plus className="w-4 h-4" /> {t.landing.createAnother}
                    </button>
                    {onGoToHistory && (
                        <button
                            onClick={onGoToHistory}
                            className="flex items-center gap-2 px-8 py-4 bg-white text-slate-600 font-black rounded-2xl border border-slate-200 hover:bg-slate-50 transition-all text-xs uppercase tracking-widest"
                        >
                            <HistoryIcon className="w-4 h-4" /> {t.landing.viewHistory}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}
