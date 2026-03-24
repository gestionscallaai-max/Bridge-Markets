"use client";

import React, { useState } from 'react';
import { Download, Loader2, Image as ImageIcon, Maximize, Globe, AlertCircle, CheckCircle2 } from 'lucide-react';

export default function ImageDownloadForm() {
    const [language, setLanguage] = useState('ES');
    const [size, setSize] = useState('1080x1080');
    const [type, setType] = useState('Post Instagram');
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

    const handleDownload = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setStatus('idle');

        try {
            const response = await fetch('/api/materials/download', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ language, size, type })
            });

            if (!response.ok) throw new Error('Download failed');

            const data = await response.json();

            // Simulating a download from an URL returned by the API
            const link = document.createElement('a');
            link.href = data.downloadUrl || '#';
            link.download = `material_${language}_${size}.png`;
            link.target = '_blank'; // Open in new tab since placehold.co might be blocked by CORS for direct download
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            setStatus('success');
            setTimeout(() => setStatus('idle'), 3000);
        } catch (error) {
            console.error('Error downloading material:', error);
            setStatus('error');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <form onSubmit={handleDownload} className="bg-white/80 backdrop-blur-xl border border-white rounded-3xl p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] w-full relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-lila/5 rounded-full blur-2xl -mt-10 -mr-10 pointer-events-none"></div>

            <div className="flex items-center gap-3 mb-6 relative z-10">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-lila-100 to-purple-50 border border-lila/10 flex items-center justify-center text-lila shadow-sm">
                    <Download className="w-5 h-5" />
                </div>
                <div>
                    <h3 className="text-lg font-bold text-slate-800 tracking-tight">Generar Material Creativo</h3>
                    <p className="text-sm text-slate-500 font-medium leading-tight mt-0.5">Configura y descarga imágenes de alta conversión.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-6 relative z-10">
                {/* Language Select */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Globe className="w-3.5 h-3.5 text-lila/80" />
                        Idioma
                    </label>
                    <div className="relative group">
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            className="w-full appearance-none bg-white/50 border border-slate-200/80 text-slate-700 text-sm font-bold rounded-2xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-4 focus:ring-lila/10 focus:border-lila hover:border-slate-300 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="ES">Español (ES)</option>
                            <option value="EN">Inglés (EN)</option>
                            <option value="PT">Portugués (PT)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover:text-lila transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Size Select */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <Maximize className="w-3.5 h-3.5 text-lila/80" />
                        Tamaño
                    </label>
                    <div className="relative group">
                        <select
                            value={size}
                            onChange={(e) => setSize(e.target.value)}
                            className="w-full appearance-none bg-white/50 border border-slate-200/80 text-slate-700 text-sm font-bold rounded-2xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-4 focus:ring-lila/10 focus:border-lila hover:border-slate-300 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="1080x1080">1080x1080 (Square)</option>
                            <option value="1080x1920">1080x1920 (Story)</option>
                            <option value="300x250">300x250 (M-Rec)</option>
                            <option value="728x90">728x90 (Banner)</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover:text-lila transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>

                {/* Type Select */}
                <div className="space-y-2">
                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                        <ImageIcon className="w-3.5 h-3.5 text-lila/80" />
                        Formato
                    </label>
                    <div className="relative group">
                        <select
                            value={type}
                            onChange={(e) => setType(e.target.value)}
                            className="w-full appearance-none bg-white/50 border border-slate-200/80 text-slate-700 text-sm font-bold rounded-2xl px-4 py-3.5 pr-10 focus:outline-none focus:ring-4 focus:ring-lila/10 focus:border-lila hover:border-slate-300 transition-all cursor-pointer shadow-sm"
                        >
                            <option value="Post Instagram">Post Instagram</option>
                            <option value="Historia FB/IG">Historia FB/IG</option>
                            <option value="Banner Web">Banner Web</option>
                            <option value="Logo Transparente">Logo/Icono</option>
                        </select>
                        <div className="absolute inset-y-0 right-0 flex items-center px-4 pointer-events-none text-slate-400 group-hover:text-lila transition-colors">
                            <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" fillRule="evenodd"></path></svg>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-between pt-5 border-t border-slate-100/80 gap-4">
                <div className="flex items-center min-h-[24px]">
                    {status === 'success' && (
                        <span className="text-[#10b981] text-sm font-bold flex items-center animate-in fade-in slide-in-from-left-2 bg-[#10b981]/10 px-3 py-1.5 rounded-lg border border-[#10b981]/20">
                            <CheckCircle2 className="w-4 h-4 mr-2" /> Descarga completada
                        </span>
                    )}
                    {status === 'error' && (
                        <span className="text-[#ef4444] text-sm font-bold flex items-center animate-in fade-in slide-in-from-left-2 bg-[#ef4444]/10 px-3 py-1.5 rounded-lg border border-[#ef4444]/20">
                            <AlertCircle className="w-4 h-4 mr-2" /> Error al generar creativo
                        </span>
                    )}
                </div>

                <button
                    type="submit"
                    disabled={isLoading}
                    className="relative overflow-hidden group bg-[#1e293b] text-white px-8 py-3.5 rounded-2xl font-bold text-sm shadow-md hover:shadow-xl hover:-translate-y-0.5 transition-all focus:outline-none focus:ring-4 focus:ring-slate-800/20 disabled:opacity-70 disabled:cursor-not-allowed disabled:transform-none w-full sm:w-auto"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-lila to-[#9333ea] opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    <span className="relative flex items-center justify-center min-w-[130px]">
                        {isLoading ? (
                            <>
                                <Loader2 className="w-4 h-4 mr-2.5 animate-spin" /> Procesando...
                            </>
                        ) : (
                            <>
                                <Download className="w-4 h-4 mr-2.5 group-hover:animate-bounce" /> Descargar Ahora
                            </>
                        )}
                    </span>
                </button>
            </div>
        </form>
    );
}
