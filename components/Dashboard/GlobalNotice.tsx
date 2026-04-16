"use client";

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { Megaphone, X, Sparkles, AlertTriangle } from 'lucide-react';

interface NoticeConfig {
    text: string;
    active: boolean;
    type: 'info' | 'warning' | 'success';
}

export default function GlobalNotice() {
    const [config, setConfig] = useState<NoticeConfig | null>(null);
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        fetchConfig();
        
        // Polling every 60 seconds to refresh notice
        const interval = setInterval(fetchConfig, 60000);
        return () => clearInterval(interval);
    }, []);

    const fetchConfig = async () => {
        const { data, error } = await supabase
            .from('system_config')
            .select('value')
            .eq('key', 'global_notice')
            .single();

        if (data && data.value) {
            setConfig(data.value as unknown as NoticeConfig);
        }
    };

    if (!config || !config.active || !isVisible) return null;

    const getStyles = () => {
        switch (config.type) {
            case 'warning': return 'bg-amber-500 text-white';
            case 'success': return 'bg-emerald-500 text-white';
            default: return 'bg-[#865BFF] text-white';
        }
    };

    const getIcon = () => {
        switch (config.type) {
            case 'warning': return <AlertTriangle className="w-3.5 h-3.5" />;
            case 'success': return <Sparkles className="w-3.5 h-3.5" />;
            default: return <Megaphone className="w-3.5 h-3.5" />;
        }
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                className={`relative overflow-hidden z-[60] ${getStyles()}`}
            >
                <div className="flex items-center h-9">
                    {/* Icon Label */}
                    <div className="flex items-center gap-2 px-4 h-full bg-black/10 z-10">
                        {getIcon()}
                        <span className="text-[10px] font-black uppercase tracking-widest hidden sm:inline">Aviso</span>
                    </div>

                    {/* Marquee Container */}
                    <div className="flex-1 overflow-hidden relative h-full flex items-center">
                        <div className="marquee-content whitespace-nowrap will-change-transform flex items-center gap-20">
                            {[1, 2, 3].map((i) => (
                                <span key={i} className="text-[12px] font-bold tracking-tight inline-flex items-center gap-4">
                                    {config.text}
                                    <span className="w-1.5 h-1.5 rounded-full bg-white/40" />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Close Button */}
                    <button 
                        onClick={() => setIsVisible(false)}
                        className="p-2 hover:bg-black/10 transition-colors z-10"
                    >
                        <X className="w-3.5 h-3.5" />
                    </button>
                </div>

                <style jsx global>{`
                    .marquee-content {
                        display: inline-flex;
                        animation: marquee 25s linear infinite;
                    }
                    
                    .marquee-content:hover {
                        animation-play-state: paused;
                    }

                    @keyframes marquee {
                        0% { transform: translateX(0); }
                        100% { transform: translateX(-50%); }
                    }
                `}</style>
            </motion.div>
        </AnimatePresence>
    );
}
