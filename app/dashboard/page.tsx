"use client";

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Pencil, X, Download, Copy, Check, Link2, Filter,
    Type, AlignLeft, MousePointer, Palette, ChevronRight, Eye, ChevronDown, Loader2
} from 'lucide-react';
import { BANNER_TEMPLATES, CATEGORIES, LANGUAGES, type BannerTemplate, type BannerCategory, type BannerSize } from '@/lib/data/banners';
import { supabase } from '@/lib/supabaseClient';

const AFFILIATE_ID = "BM_10940382";

export default function PiezasGraficasPage() {
    const [selectedCategory, setSelectedCategory] = useState<BannerCategory | 'all'>('all');
    const [selectedLang, setSelectedLang] = useState('es');
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [selectedBanner, setSelectedBanner] = useState<BannerTemplate | null>(null);
    const [dbMaterials, setDbMaterials] = useState<any[]>([]);
    const [loadingDb, setLoadingDb] = useState(true);

    // Editor state
    const [editorSize, setEditorSize] = useState<BannerSize>('300x250');
    const [editorTitle, setEditorTitle] = useState('');
    const [editorSubtitle, setEditorSubtitle] = useState('');
    const [editorButtonText, setEditorButtonText] = useState('');
    const [editorButtonColor, setEditorButtonColor] = useState('#865BFF');
    const [affiliateLink, setAffiliateLink] = useState(`https://bridge.com/?ref=${AFFILIATE_ID}`);
    const [copied, setCopied] = useState(false);

    useEffect(() => {
        async function fetchDbMaterials() {
            const { data } = await supabase
                .from('materials')
                .select('*')
                .eq('is_active', true)
                .order('is_featured', { ascending: false });
            setDbMaterials(data || []);
            setLoadingDb(false);
        }
        fetchDbMaterials();
    }, []);

    // Merge: convert DB materials to BannerTemplate format, then merge with hardcoded
    const dbAsBanners: BannerTemplate[] = dbMaterials.map(m => ({
        id: `db-${m.id}`,
        name: m.name,
        category: m.category as BannerCategory,
        description: m.description || '',
        sizes: (m.sizes || ['300x250']) as BannerSize[],
        gradient: 'from-[#140633] via-[#1e0a4a] to-[#2a0e5e]',
        previewImage: m.image_url || undefined,
        defaults: {
            title: m.name,
            subtitle: m.description || '',
            buttonText: 'Abrir cuenta',
            buttonColor: '#865BFF',
        },
        languages: m.languages || ['es'],
    }));

    // Merge: DB items override hardcoded items with same name, others appended
    const hardcodedIds = BANNER_TEMPLATES.map(b => b.name.toLowerCase());
    const uniqueDbBanners = dbAsBanners.filter(b => !hardcodedIds.includes(b.name.toLowerCase()));
    const allBanners = [...BANNER_TEMPLATES, ...uniqueDbBanners];

    const filteredBanners = allBanners.filter(b => {
        const matchCategory = selectedCategory === 'all' || b.category === selectedCategory;
        const matchLanguage = b.languages ? b.languages.includes(selectedLang as any) : true;
        return matchCategory && matchLanguage;
    });

    const openEditor = (banner: BannerTemplate) => {
        setSelectedBanner(banner);
        setEditorTitle(banner.defaults.title);
        setEditorSubtitle(banner.defaults.subtitle);
        setEditorButtonText(banner.defaults.buttonText);
        setEditorButtonColor(banner.defaults.buttonColor);
        setEditorSize(banner.sizes[0]);
    };

    const closeEditor = () => {
        setSelectedBanner(null);
    };

    const handleCopyCode = async () => {
        const code = `<a href="${affiliateLink}" target="_blank"><img src="https://cdn.bridgemarkets.com/banners/${selectedBanner?.id}/${editorSize}.png" width="${editorSize.split('x')[0]}" height="${editorSize.split('x')[1]}" alt="${editorTitle}" /></a>`;
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Copy failed:', err);
        }
    };

    // Get aspect ratio for preview based on size
    const getPreviewAspect = (size: BannerSize) => {
        switch (size) {
            case '300x250': return 'aspect-[6/5]';
            case '728x90': return 'aspect-[8/1]';
            case '1248x600': return 'aspect-[2/1]';
            case '160x600': return 'aspect-[4/15]';
            default: return 'aspect-[6/5]';
        }
    };

    return (
        <div className="space-y-5 pb-10">
            {/* Header */}
            <div className="card p-5">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-[#865BFF]/10 flex items-center justify-center text-[#865BFF]">
                        <Pencil className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Generador de Piezas Gráficas</h2>
                        <p className="text-slate-500 text-sm mt-0.5">Filtra, personaliza y exporta banners y landings con tu copy y link de afiliado.</p>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="card p-4">
                <div className="flex items-center gap-2 mb-3">
                    <Filter className="w-4 h-4 text-slate-400" />
                    <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Filtros</span>
                </div>

                <div className="flex flex-col lg:flex-row lg:items-center gap-4">
                    {/* Category */}
                    <div>
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Categoría</div>
                        <div className="flex flex-wrap gap-1.5">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(selectedCategory === cat ? 'all' : cat)}
                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all border ${selectedCategory === cat
                                        ? 'bg-[#865BFF] text-white border-[#865BFF]'
                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#865BFF]/30 hover:text-[#140633]'
                                        }`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-10 bg-slate-200" />

                    {/* Language */}
                    <div>
                        <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Idioma</div>
                        <div className="relative">
                            <button
                                onClick={() => setIsLangOpen(!isLangOpen)}
                                className="w-full min-w-[180px] flex items-center justify-between bg-white border border-slate-200 rounded-lg py-2 pl-4 pr-3 text-xs font-semibold text-slate-600 hover:text-slate-800 focus:outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/10 hover:border-slate-300 transition-all shadow-sm"
                            >
                                <span>{LANGUAGES.find(l => l.code === selectedLang)?.label}</span>
                                <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} />
                            </button>
                            
                            <AnimatePresence>
                                {isLangOpen && (
                                    <>
                                        <div 
                                            className="fixed inset-0 z-30" 
                                            onClick={() => setIsLangOpen(false)} 
                                        />
                                        <motion.div
                                            initial={{ opacity: 0, y: -5 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -5 }}
                                            transition={{ duration: 0.15 }}
                                            className="absolute top-full left-0 mt-1 w-full bg-white border border-slate-200 rounded-lg shadow-xl z-40 overflow-hidden"
                                        >
                                            <div className="py-1">
                                                {LANGUAGES.map(lang => (
                                                    <button
                                                        key={lang.code}
                                                        onClick={() => {
                                                            setSelectedLang(lang.code);
                                                            setIsLangOpen(false);
                                                        }}
                                                        className={`w-full text-left px-4 py-2 text-xs font-semibold hover:bg-slate-50 transition-colors ${selectedLang === lang.code ? 'text-[#865BFF] bg-[#865BFF]/5' : 'text-slate-600'}`}
                                                    >
                                                        {lang.label}
                                                    </button>
                                                ))}
                                            </div>
                                        </motion.div>
                                    </>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </div>

            {/* Banner Grid (2 columns) */}
            {loadingDb ? (
                <div className="flex items-center justify-center py-16 gap-3 text-slate-400">
                    <Loader2 className="w-5 h-5 animate-spin text-brand-500" />
                    <span className="text-sm font-medium">Cargando materiales...</span>
                </div>
            ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {filteredBanners.map((banner) => (
                    <div
                        key={banner.id}
                        onClick={() => openEditor(banner)}
                        className="card overflow-hidden cursor-pointer group hover:shadow-card-hover transition-all duration-200"
                    >
                        {/* Banner Preview */}
                        <div className={`relative ${banner.previewImage ? '' : `bg-gradient-to-br ${banner.gradient}`} aspect-[16/9] flex items-center justify-center overflow-hidden`}>
                            {banner.previewImage ? (
                                <img src={banner.previewImage} alt={banner.name} className="w-full h-full object-cover" />
                            ) : null}
                            {/* Edit overlay on hover */}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-200 flex items-center justify-center z-10">
                                <div className="opacity-0 group-hover:opacity-100 transition-all duration-200 flex items-center gap-2 bg-white text-slate-800 px-4 py-2 rounded-lg font-semibold text-sm shadow-lg">
                                    <Pencil className="w-4 h-4" />
                                    Editar
                                </div>
                            </div>

                            {/* Badge */}
                            <div className="absolute top-3 left-3 z-20 flex gap-2">
                                <span className="bg-white/90 backdrop-blur-sm text-slate-800 text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider">
                                    Banner
                                </span>
                            </div>
                            <div className="absolute top-3 right-3 z-20">
                                <span className={`text-white text-[9px] font-bold px-2 py-1 rounded uppercase tracking-wider ${banner.category === 'Forex' ? 'bg-brand-500' : banner.category === 'Metales Preciosos' ? 'bg-amber-500' : banner.category === 'Acciones' ? 'bg-blue-500' : banner.category === 'Criptomonedas' ? 'bg-purple-500' : banner.category === 'Promociones' ? 'bg-pink-500' : 'bg-rose-500'}`}>
                                    {banner.category}
                                </span>
                            </div>

                            {/* Content preview for gradient banners (no image) */}
                            {!banner.previewImage && (
                                <div className="relative z-0 text-center px-6">
                                    <div className="text-white text-lg font-bold">{banner.defaults.title}</div>
                                    <div className="text-white/70 text-xs mt-1">{banner.defaults.subtitle}</div>
                                </div>
                            )}
                        </div>

                        {/* Info */}
                        <div className="p-4">
                            <h3 className="font-semibold text-slate-800 text-sm">{banner.name}</h3>
                            <p className="text-slate-400 text-xs mt-0.5">{banner.description}</p>
                            <div className="flex items-center gap-1.5 mt-2">
                                {banner.sizes.map(size => (
                                    <span key={size} className="text-[9px] font-semibold text-slate-500 bg-slate-100 px-1.5 py-0.5 rounded">
                                        {size}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))
            }
            </div>
            )}

            {/* =================== EDITOR PANEL (Slide-over) =================== */}
            <AnimatePresence>
                {selectedBanner && (
                    <>
                        {/* Overlay */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={closeEditor}
                            className="fixed inset-0 bg-slate-900/40 backdrop-blur-[3px] z-[200]"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ x: '100%' }}
                            animate={{ x: 0 }}
                            exit={{ x: '100%' }}
                            transition={{ type: 'spring', damping: 28, stiffness: 220 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-[480px] bg-white shadow-[-4px_0_30px_rgba(0,0,0,0.1)] z-[201] flex flex-col"
                        >
                            {/* Panel Header */}
                            <div className="flex items-center justify-between px-6 h-[64px] border-b border-slate-200 shrink-0">
                                <div className="flex items-center gap-2">
                                    <Pencil className="w-4 h-4 text-[#865BFF]" />
                                    <h2 className="text-[15px] font-bold text-slate-800">{selectedBanner.name}</h2>
                                </div>
                                <button
                                    onClick={closeEditor}
                                    className="w-8 h-8 rounded-lg flex items-center justify-center text-slate-400 hover:bg-slate-100 hover:text-slate-600 transition-colors"
                                >
                                    <X className="w-4 h-4" />
                                </button>
                            </div>

                            {/* Panel Body (Scrollable) */}
                            <div className="flex-1 overflow-y-auto">
                                <div className="p-6 space-y-5">
                                    {/* Subtitle */}
                                    <p className="text-xs text-slate-400">Edita el texto y descarga como PNG</p>

                                    {/* Size Selector */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block mb-2">Tamaño del banner</label>
                                        <div className="flex flex-wrap gap-1.5">
                                            {selectedBanner.sizes.map(size => (
                                                <button
                                                    key={size}
                                                    onClick={() => setEditorSize(size)}
                                                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition-all ${editorSize === size
                                                        ? 'bg-[#865BFF] text-white border-[#865BFF]'
                                                        : 'bg-white text-slate-600 border-slate-200 hover:border-[#865BFF]/30'
                                                        }`}
                                                >
                                                    {size}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Title */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                            <Type className="w-3 h-3" /> Título
                                        </label>
                                        <input
                                            type="text"
                                            value={editorTitle}
                                            onChange={(e) => setEditorTitle(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF] transition-all"
                                        />
                                    </div>

                                    {/* Subtitle */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                            <AlignLeft className="w-3 h-3" /> Subtítulo
                                        </label>
                                        <input
                                            type="text"
                                            value={editorSubtitle}
                                            onChange={(e) => setEditorSubtitle(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF] transition-all"
                                        />
                                    </div>

                                    {/* Button Text + Color */}
                                    <div className="grid grid-cols-2 gap-3">
                                        <div>
                                            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                                <MousePointer className="w-3 h-3" /> Texto del botón
                                            </label>
                                            <input
                                                type="text"
                                                value={editorButtonText}
                                                onChange={(e) => setEditorButtonText(e.target.value)}
                                                className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF] transition-all"
                                            />
                                        </div>
                                        <div>
                                            <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                                <Palette className="w-3 h-3" /> Color del botón
                                            </label>
                                            <div className="flex items-center gap-2">
                                                <input
                                                    type="color"
                                                    value={editorButtonColor}
                                                    onChange={(e) => setEditorButtonColor(e.target.value)}
                                                    className="w-10 h-10 rounded-lg border border-slate-200 cursor-pointer p-0.5"
                                                />
                                                <input
                                                    type="text"
                                                    value={editorButtonColor}
                                                    onChange={(e) => setEditorButtonColor(e.target.value)}
                                                    className="flex-1 px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF] transition-all"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Affiliate Link */}
                                    <div>
                                        <label className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider flex items-center gap-1.5 mb-2">
                                            <Link2 className="w-3 h-3" /> Link de afiliado
                                        </label>
                                        <input
                                            type="text"
                                            value={affiliateLink}
                                            onChange={(e) => setAffiliateLink(e.target.value)}
                                            className="w-full px-3 py-2.5 border border-slate-200 rounded-lg text-sm text-slate-800 font-mono focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF] transition-all"
                                        />
                                    </div>

                                    {/* ===== LIVE PREVIEW ===== */}
                                    <div>
                                        <div className="flex items-center gap-1.5 mb-3">
                                            <Eye className="w-3.5 h-3.5 text-[#865BFF]" />
                                            <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">Vista Previa en Tiempo Real</span>
                                        </div>

                                        <div className="bg-slate-50 border border-slate-200 rounded-lg p-4 flex items-center justify-center">
                                            <div className={`w-full max-w-[300px] ${getPreviewAspect(editorSize)} bg-gradient-to-br ${selectedBanner.gradient} rounded-lg overflow-hidden flex flex-col items-center justify-center text-center p-5 relative shadow-lg`}>
                                                {/* Banner badge */}
                                                <div className="absolute top-2 left-2 z-10">
                                                    <span className="bg-white/80 text-slate-800 text-[8px] font-bold px-1.5 py-0.5 rounded uppercase tracking-wider">
                                                        {editorSize}
                                                    </span>
                                                </div>

                                                <div className="relative z-0 flex flex-col items-center justify-center">
                                                    <div className="text-white text-base font-bold leading-tight">{editorTitle}</div>
                                                    <div className="text-white/70 text-[10px] mt-1.5 max-w-[200px] leading-snug">{editorSubtitle}</div>
                                                    <button
                                                        className="mt-3 px-4 py-1.5 rounded-md text-white text-[11px] font-semibold shadow-md transition-transform hover:scale-105"
                                                        style={{ backgroundColor: editorButtonColor }}
                                                    >
                                                        {editorButtonText}
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Panel Footer — Actions */}
                            <div className="border-t border-slate-200 p-4 px-6 space-y-2 shrink-0">
                                <div className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Obtener Código / Descargar</div>

                                <button
                                    onClick={handleCopyCode}
                                    className="w-full flex items-center justify-between px-4 py-3 rounded-lg border border-slate-200 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition-all group"
                                >
                                    <div className="flex items-center gap-2">
                                        {copied ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4 text-slate-400" />}
                                        {copied ? '¡Código copiado!' : 'Copiar código de afiliado'}
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-slate-300 group-hover:text-brand-500 transition-colors" />
                                </button>

                                <button className="w-full flex items-center justify-between px-4 py-3 rounded-lg bg-brand-500 text-white text-sm font-semibold hover:bg-brand-dark transition-all group shadow-sm">
                                    <div className="flex items-center gap-2">
                                        <Download className="w-4 h-4" />
                                        Descargar PNG ({editorSize})
                                    </div>
                                    <ChevronRight className="w-4 h-4 text-white/50 group-hover:text-white transition-colors" />
                                </button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
}
