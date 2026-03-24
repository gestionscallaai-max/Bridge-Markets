"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Copy, Link2, Download, Check, Info } from 'lucide-react';
import { ASSETS_DATA, type LocaleLanguage } from '@/lib/data/locales';

interface CodeGeneratorModalProps {
    isOpen: boolean;
    onClose: () => void;
    assetId: string;
    affiliateId: string;
    selectedLanguage: LocaleLanguage;
}

export default function CodeGeneratorModal({ isOpen, onClose, assetId, affiliateId, selectedLanguage }: CodeGeneratorModalProps) {
    const [copied, setCopied] = useState(false);

    // Stop body scroll when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; }
    }, [isOpen]);

    const asset = ASSETS_DATA.find(a => a.id === assetId);
    if (!asset) return null;

    const translation = asset.locales[selectedLanguage];
    const [width, height] = asset.size.includes('x') ? asset.size.split('x') : ['100%', '400'];

    const embedUrl = `https://${affiliateId}.bridgemarkets.com/embed/${assetId}?lang=${selectedLanguage}`;
    const iframeCode = `<iframe src="${embedUrl}" width="${width}" height="${height}" frameborder="0" scrolling="no"></iframe>`;

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(iframeCode);
            setCopied(true);
            setTimeout(() => setCopied(false), 2200);
        } catch (err) {
            console.error('Failed to copy text: ', err);
        }
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Overlay */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-slate-900/45 backdrop-blur-[6px] z-[200]"
                    />

                    {/* Slide-over Panel */}
                    <motion.div
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed top-0 right-0 bottom-0 w-full max-w-[520px] bg-white shadow-[-4px_0_40px_rgba(0,0,0,0.12)] z-[201] flex flex-col overflow-hidden"
                    >
                        {/* Header */}
                        <div className="flex items-center justify-between p-6 border-b border-slate-200">
                            <h2 className="text-[18px] font-extrabold flex items-center gap-2">
                                <Link2 className="w-5 h-5 text-lila" />
                                Obtener Enlace de Afiliado
                            </h2>
                            <button
                                onClick={onClose}
                                className="w-9 h-9 rounded-xl flex items-center justify-center bg-slate-50 text-slate-500 hover:bg-slate-200 hover:text-slate-900 transition-colors"
                            >
                                <X className="w-4 h-4 text-slate-500" />
                            </button>
                        </div>

                        {/* Body Scrollable */}
                        <div className="flex-1 overflow-y-auto p-6">

                            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-3.5">
                                Vista Previa en Vivo
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-6 mb-7 border border-slate-200 flex items-center justify-center">
                                {/* Mock Live Preview corresponding exactly to the iframe outcome */}
                                <div className="w-full max-w-[300px] aspect-[4/3] bg-gradient-to-br from-slate-800 to-slate-900 rounded-xl overflow-hidden flex flex-col items-center justify-center text-center p-5 relative shadow-[0_8px_24px_rgba(0,0,0,0.2)]">
                                    <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_30%,_rgba(155,81,224,0.5)_0%,_transparent_60%)] pointer-events-none" />
                                    <div className="relative z-10 w-full h-full flex flex-col items-center justify-center">
                                        <div className="text-[22px] font-black text-white uppercase leading-tight">{translation.title}</div>
                                        <div className="mt-3.5 bg-gradient-to-br from-lila to-lila-light text-white px-5 py-2 rounded-full font-bold text-[13px] shadow-[0_4px_16px_rgba(155,81,224,0.5)]">
                                            {translation.cta}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-slate-500 mb-3.5 mt-2">
                                Código de Incrustación
                            </div>

                            <div className="flex items-center justify-between mb-3 text-sm">
                                <span className="text-xs text-slate-500">Tu ID está inyectado automáticamente</span>
                                <div className="flex items-center gap-1.5 text-[11px] font-semibold text-green-600 bg-green-50 px-2.5 py-1 rounded-full border border-green-200">
                                    <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                                    Tracking Activo
                                </div>
                            </div>

                            <div className="relative mb-3">
                                <pre className="bg-slate-900 text-slate-400 p-5 rounded-2xl font-mono text-[12px] leading-[1.7] overflow-x-auto border border-slate-800 whitespace-pre-wrap break-all">
                                    {iframeCode}
                                </pre>
                                <button
                                    onClick={handleCopy}
                                    className={`absolute top-2.5 right-2.5 flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-[11px] font-semibold border transition-all
                    ${copied
                                            ? 'bg-green-500 border-green-500 text-white'
                                            : 'bg-white/10 border-white/10 text-white hover:bg-lila hover:border-lila'}`}
                                >
                                    {copied ? <Check className="w-[13px] h-[13px]" /> : <Copy className="w-[13px] h-[13px]" />}
                                    {copied ? '¡Copiado!' : 'Copiar'}
                                </button>
                            </div>

                            <div className="flex items-start gap-2 text-xs text-slate-500 leading-relaxed bg-lila-50/50 p-4 rounded-xl border border-lila/10">
                                <div className="w-[18px] h-[18px] shrink-0 rounded-full bg-lila-100 text-lila flex items-center justify-center font-bold text-[10px]">
                                    i
                                </div>
                                <span>
                                    Este código atribuye automáticamente todos los leads a tu ID de afiliado: <strong className="text-slate-900">{affiliateId}</strong>. Las cookies de primera parte se activarán cuando el usuario visite el enlace.
                                </span>
                            </div>

                        </div>

                        {/* Footer Buttons */}
                        <div className="p-4 px-6 border-t border-slate-200 flex gap-2.5">
                            <button
                                onClick={handleCopy}
                                className="flex-1 py-3 px-4 bg-gradient-to-br from-lila to-lila-light text-white rounded-xl font-bold text-sm shadow-[0_4px_14px_rgba(155,81,224,0.3)] hover:shadow-[0_6px_20px_rgba(155,81,224,0.45)] transition-all flex items-center justify-center gap-2 hover:-translate-y-px"
                            >
                                <Copy className="w-4 h-4" />
                                Copiar Código
                            </button>
                            <button
                                className="px-5 py-3 bg-slate-50 border border-slate-200 text-slate-900 rounded-xl font-semibold text-sm hover:border-lila hover:text-lila transition-all flex items-center gap-2"
                            >
                                <Download className="w-4 h-4" />
                                ZIP
                            </button>
                        </div>

                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
