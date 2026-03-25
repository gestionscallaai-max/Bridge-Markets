"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Download, Link2 } from 'lucide-react';

interface AssetCardProps {
    id: string;
    title: string;
    type: string;
    size: string;
    language: string;
    ctaText: string;
    badge?: string;
    backgroundClass?: string;
    onOpenCode: () => void;
}

export default function AssetCard({ id, title, type, size, language, ctaText, badge, backgroundClass = "from-slate-800 to-slate-900", onOpenCode }: AssetCardProps) {
    return (
        <div className="card overflow-hidden group cursor-pointer animate-floatIn hover:shadow-card-hover transition-all duration-200">
            {/* Thumbnail */}
            <div className={`relative bg-gradient-to-br ${backgroundClass} aspect-[4/3] w-full overflow-hidden flex items-center justify-center`}>
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,_rgba(99,102,241,0.2)_0%,_transparent_60%)]" />
                <div className="relative z-10 text-center p-4">
                    <h3 className="text-lg font-bold text-white uppercase tracking-tight leading-tight">{title}</h3>
                    <div className="mt-3 bg-brand-500 text-white text-[11px] font-semibold px-4 py-1.5 rounded-md inline-block">
                        {ctaText}
                    </div>
                </div>

                {/* Badges */}
                <div className="absolute top-2.5 left-2.5 right-2.5 flex justify-between z-20">
                    <span className="bg-white/90 backdrop-blur text-slate-800 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                        {size}
                    </span>
                    {badge === 'cr' ? (
                        <span className="bg-brand-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Mayor CR
                        </span>
                    ) : (
                        <span className="bg-amber-500 text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                            Nuevo
                        </span>
                    )}
                </div>
            </div>

            {/* Footer */}
            <div className="p-3 flex items-center justify-between">
                <div className="min-w-0">
                    <h4 className="text-slate-800 font-semibold text-[13px] line-clamp-1 truncate max-w-[160px]">{title}</h4>
                    <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-slate-400 text-[11px] font-medium">{type}</span>
                        <span className="w-1 h-1 rounded-full bg-slate-200" />
                        <span className="text-slate-400 text-[11px] font-medium">{language}</span>
                    </div>
                </div>

                <div className="flex bg-slate-50 rounded-lg p-0.5 border border-slate-100 gap-0.5">
                    <button className="p-1.5 w-7 h-7 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-white rounded-md transition-colors" title="Download ZIP">
                        <Download className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={onOpenCode} className="p-1.5 w-7 h-7 flex items-center justify-center text-slate-400 hover:text-brand-500 hover:bg-white rounded-md transition-colors" title="Get Affiliate Link">
                        <Link2 className="w-3.5 h-3.5" />
                    </button>
                </div>
            </div>
        </div>
    );
}
