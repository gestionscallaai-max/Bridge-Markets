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
                className={`relative overflow-hidden z-[60] shadow-lg border-b border-white/10 ${getStyles()}`}
            >
                <div className="flex items-center min-h-[56px] relative overflow-hidden">
                    {/* Left Fixed Label */}
                    <div className="flex items-center gap-4 shrink-0 bg-inherit z-10 pl-8 pr-4 py-3 border-r border-white/10 shadow-[10px_0_15px_-5px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center gap-2.5">
                            <div className="p-1.5 bg-white/20 rounded-lg backdrop-blur-sm">
                                {getIcon()}
                            </div>
                            <span className="text-[11px] font-black uppercase tracking-[0.2em] hidden sm:inline opacity-90 whitespace-nowrap">Aviso Institucional</span>
                        </div>
                    </div>

                    {/* Marquee Container */}
                    <div className="flex-1 overflow-hidden relative">
                        <motion.div
                            animate={{
                                x: [1000, -2000],
                            }}
                            transition={{
                                x: {
                                    repeat: Infinity,
                                    repeatType: "loop",
                                    duration: 25,
                                    ease: "linear",
                                },
                            }}
                            className="flex items-center gap-12 whitespace-nowrap"
                        >
                            <span className="text-base md:text-lg font-bold tracking-tight leading-tight">
                                {config.text}
                            </span>
                            {/* Duplicate for seamless effect or spacing */}
                            <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                            <span className="text-base md:text-lg font-bold tracking-tight leading-tight">
                                {config.text}
                            </span>
                            <div className="w-2 h-2 rounded-full bg-white/30 animate-pulse" />
                        </motion.div>
                    </div>

                    {/* Close Button */}
                    <div className="bg-inherit z-10 px-4 flex items-center shadow-[-10px_0_15px_-5px_rgba(0,0,0,0.1)]">
                        <button 
                            onClick={() => setIsVisible(false)}
                            className="p-2.5 hover:bg-black/10 rounded-xl transition-all active:scale-90"
                            title="Cerrar aviso"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
}

