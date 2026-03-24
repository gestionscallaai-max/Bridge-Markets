"use client";

import React from 'react';
import Tilt from 'react-parallax-tilt';
import { Download, Link2, ExternalLink } from 'lucide-react';

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
        <Tilt
            tiltMaxAngleX={5}
            tiltMaxAngleY={5}
            scale={1.02}
            transitionSpeed={2500}
            className={`relative group cursor-pointer animate-floatIn transform-style-3d will-change-transform`}
        >
            <div className="bg-white rounded-3xl p-3 shadow-sm border border-slate-100 hover:shadow-xl transition-all duration-300 relative overflow-hidden">

                {/* Shine Hover Effect Overlay */}
                <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-transform duration-700 pointer-events-none bg-gradient-to-r from-transparent via-white/40 to-transparent w-full h-full transform skew-x-[-12deg] translate-x-[-150%] group-hover:translate-x-[150%]" />

                {/* Thumbnail Placeholder */}
                <div className={`relative rounded-2xl bg-gradient-to-br ${backgroundClass} aspect-[4/3] w-full overflow-hidden flex items-center justify-center`}>
                    <div className="absolute inset-0 bg-mesh-gradient opacity-30 mix-blend-overlay" />
                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_40%_40%,_rgba(155,81,224,0.35)_0%,_transparent_60%)]" />

                    {/* Dynamic Template overlay content mockup */}
                    <div className="relative z-10 text-center p-4 transform translate-y-1 transition-transform group-hover:translate-y-0 duration-300">
                        <h3 className="text-xl md:text-2xl font-black text-white uppercase tracking-tighter leading-tight drop-shadow-md">{title}</h3>
                        <div className="mt-3 bg-gradient-to-r from-lila to-lila-light text-white text-xs font-bold px-4 py-1.5 rounded-full shadow-[0_4px_12px_rgba(155,81,224,0.35)] inline-block">
                            {ctaText}
                        </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 right-3 flex justify-between z-30">
                        <span className="bg-white/90 backdrop-blur text-slate-900 text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-sm">
                            {size}
                        </span>
                        {badge === 'cr' ? (
                            <span className="bg-lila text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-md">
                                Mayor CR
                            </span>
                        ) : (
                            <span className="bg-amber-500 text-white text-[10px] font-bold px-2.5 py-1 rounded-lg uppercase tracking-widest shadow-md">
                                Nuevo
                            </span>
                        )}
                    </div>
                </div>

                {/* Card Footer */}
                <div className="pt-4 pb-2 px-2 flex items-center justify-between relative z-30">
                    <div>
                        <h4 className="text-slate-900 font-bold text-[13px] line-clamp-1 truncate max-w-[150px]">{title}</h4>
                        <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-slate-500 text-[11px] font-medium">{type}</span>
                            <span className="w-[3px] h-[3px] rounded-full bg-slate-200" />
                            <span className="text-slate-500 text-[11px] font-medium">{language}</span>
                        </div>
                    </div>

                    <div className="flex bg-slate-50 rounded-xl p-1 border border-slate-100 gap-0.5">
                        <button className="p-2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-lila hover:bg-white rounded-lg transition-colors" title="Download ZIP">
                            <Download className="w-[15px] h-[15px]" />
                        </button>
                        <button onClick={onOpenCode} className="p-2 w-8 h-8 flex items-center justify-center text-slate-400 hover:text-lila hover:bg-white rounded-lg transition-colors" title="Get Affiliate Link">
                            <Link2 className="w-[15px] h-[15px]" />
                        </button>
                    </div>
                </div>
            </div>
        </Tilt>
    );
}
