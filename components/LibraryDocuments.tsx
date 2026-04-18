"use client";
import React, { useState, useEffect } from 'react';
import { 
    Search, FileText, Download, Eye, Plus, 
    Filter, LayoutGrid, List, MoreVertical, 
    Trash2, Edit, Check, X, Upload, Loader2, Sparkles,
    Shield
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';

interface LibraryDoc {
    id: string;
    title: string;
    file_url: string;
    thumbnail_url: string;
    category: string;
    language: string;
    size_bytes: number;
    created_at: string;
}

export default function LibraryDocuments() {
    const { t } = useLanguage();
    const [docs, setDocs] = useState<LibraryDoc[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeCategory, setActiveCategory] = useState('all');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [isAdmin, setIsAdmin] = useState(false);
    const [showUploadModal, setShowUploadModal] = useState(false);

    const categories = [
        { id: 'all', label: t.promo.all },
        { id: 'manuales', label: t.promo.catManuales },
        { id: 'pay_retailers', label: t.promo.catPayRetailers },
        { id: 'glosarios', label: t.promo.catGlosarios },
        { id: 'presentaciones', label: t.promo.catPresentaciones },
    ];

    useEffect(() => {
        const checkRoleAndFetch = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                const { data: partner } = await supabase
                    .from('partners')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                
                setIsAdmin(partner?.role === 'admin');
            }
            fetchDocs();
        };
        checkRoleAndFetch();
    }, []);

    const fetchDocs = async () => {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('library_docs')
                .select('*')
                .order('created_at', { ascending: false });
            
            if (error) throw error;
            setDocs(data || []);
        } catch (error) {
            console.error('Error fetching docs:', error);
        } finally {
            setLoading(false);
        }
    };

    const filteredDocs = docs.filter(doc => {
        const matchesSearch = doc.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = activeCategory === 'all' || doc.category === activeCategory;
        return matchesSearch && matchesCategory;
    });

    const formatSize = (bytes: number) => {
        if (bytes === 0) return '0 B';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    };

    const handleDownload = async (fileUrl: string, title: string) => {
        try {
            setLoading(true);
            
            // Extraer la ruta relativa del storage
            // De: https://.../library-documents/files/archivo.pdf
            // A: files/archivo.pdf
            let path = "";
            if (fileUrl.includes('library-documents/')) {
                const parts = fileUrl.split('library-documents/');
                path = parts[parts.length - 1];
                // Limpiar cualquier query string if exists
                path = path.split('?')[0];
            } else {
                // Si no es una URL de storage, abrimos directo
                window.open(fileUrl, '_blank');
                setLoading(false);
                return;
            }
            
            const { data, error } = await supabase.storage.from('library-documents').download(path);
            
            if (error) throw error;

            const blob = new Blob([data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            
            // Asegurar que el nombre tenga la extensión .pdf
            const cleanTitle = title.trim().replace(/[/\\?%*:|"<>]/g, '-');
            link.download = `${cleanTitle}.pdf`;
            
            document.body.appendChild(link);
            link.click();
            
            // Limpieza
            setTimeout(() => {
                window.URL.revokeObjectURL(url);
                link.remove();
            }, 100);

        } catch (e) {
            console.error("Error downloading file:", e);
            // Fallback: abrir en pestaña nueva
            const link = document.createElement('a');
            link.href = fileUrl;
            link.target = '_blank';
            link.download = `${title}.pdf`;
            link.click();
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col xl:flex-row items-start xl:items-center justify-between gap-4 bg-white/50 backdrop-blur-sm p-4 rounded-3xl border border-slate-200 shadow-sm">
                <div className="flex items-center gap-3 w-full xl:w-auto">
                    <div className="relative flex-1 xl:w-80">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text"
                            placeholder={t.promo.docSearch}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-2xl text-sm focus:outline-none focus:ring-4 focus:ring-[#865BFF]/5 focus:border-[#865BFF] transition-all"
                        />
                    </div>
                    <div className="flex items-center bg-slate-100 rounded-xl p-1 shrink-0">
                        <button 
                            onClick={() => setViewMode('grid')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'grid' ? 'bg-white text-[#865BFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <LayoutGrid className="w-4 h-4" />
                        </button>
                        <button 
                            onClick={() => setViewMode('list')}
                            className={`p-2 rounded-lg transition-all ${viewMode === 'list' ? 'bg-white text-[#865BFF] shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                        >
                            <List className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto w-full xl:w-auto no-scrollbar pb-2 xl:pb-0">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`px-5 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all border ${
                                activeCategory === cat.id 
                                ? 'bg-[#865BFF] border-[#865BFF] text-white shadow-lg shadow-[#865BFF]/20' 
                                : 'bg-white text-slate-500 hover:bg-slate-50 border-slate-200'
                            }`}
                        >
                            {cat.label}
                        </button>
                    ))}
                    {isAdmin && (
                        <div className="h-8 w-px bg-slate-200 mx-1 hidden xl:block" />
                    )}
                    {isAdmin && (
                        <button 
                            onClick={() => setShowUploadModal(true)}
                            className="flex items-center gap-2 px-5 py-2.5 rounded-2xl text-xs font-black bg-slate-900 text-white hover:bg-slate-800 transition-all shadow-xl hover:-translate-y-0.5"
                        >
                            <Shield className="w-4 h-4 text-amber-500" /> {t.gallery.manageDocs}
                        </button>
                    )}
                </div>
            </div>

            {loading ? (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] border border-dashed border-slate-200">
                    <Loader2 className="w-12 h-12 text-[#865BFF] animate-spin mb-4" />
                    <p className="text-sm text-slate-400 font-bold uppercase tracking-widest">{t.common.loading}</p>
                </div>
            ) : filteredDocs.length > 0 ? (
                viewMode === 'grid' ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        <AnimatePresence mode='popLayout'>
                            {filteredDocs.map((doc, i) => (
                                <motion.div
                                    key={doc.id}
                                    layout
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, scale: 0.9 }}
                                    transition={{ duration: 0.3, delay: i * 0.05 }}
                                    className="group relative bg-white rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-[#865BFF]/10 transition-all overflow-hidden flex flex-col"
                                >
                                    <div className="relative h-44 xl:h-52 bg-slate-50 overflow-hidden">
                                        {doc.thumbnail_url ? (
                                            <img 
                                                src={doc.thumbnail_url} 
                                                alt={doc.title}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
                                                <FileText className="w-16 h-16 text-slate-200" />
                                            </div>
                                        )}
                                        <div className="absolute inset-0 bg-[#0d0221]/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-3 backdrop-blur-[4px]">
                                            <button 
                                                onClick={() => window.open(doc.file_url, '_blank')}
                                                className="p-4 rounded-2xl bg-white text-slate-900 shadow-2xl hover:scale-110 active:scale-95 transition-all"
                                            >
                                                <Eye className="w-6 h-6" />
                                            </button>
                                            <button 
                                                onClick={() => handleDownload(doc.file_url, doc.title)}
                                                className="p-4 rounded-2xl bg-[#865BFF] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all"
                                            >
                                                <Download className="w-6 h-6" />
                                            </button>
                                        </div>
                                        <div className="absolute top-4 left-4">
                                            <span className="px-3 py-1.5 rounded-full bg-black/30 backdrop-blur-md border border-white/20 text-[10px] font-black text-white uppercase tracking-wider">
                                                {doc.language}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="p-6 flex-1 flex flex-col">
                                        <div className="flex items-start justify-between gap-2 mb-3">
                                            <h3 className="font-black text-slate-800 text-[15px] leading-tight line-clamp-2">{doc.title}</h3>
                                            {isAdmin && (
                                                <button className="p-1 px-2 rounded-lg hover:bg-slate-100 text-slate-300 hover:text-slate-600 transition-colors">
                                                    <MoreVertical className="w-4 h-4" />
                                                </button>
                                            )}
                                        </div>
                                        <div className="mt-auto flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <div className="w-1.5 h-1.5 rounded-full bg-[#865BFF]/30" />
                                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{formatSize(doc.size_bytes)}</span>
                                            </div>
                                            <span className="text-[10px] font-black text-[#865BFF] bg-[#865BFF]/5 border border-[#865BFF]/10 px-3 py-1.5 rounded-xl">
                                                {categories.find(c => c.id === doc.category)?.label || doc.category}
                                            </span>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>
                ) : (
                    <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="border-b border-slate-50 bg-slate-50/50">
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.gallery.visual}</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.gallery.document}</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.gallery.category}</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.gallery.language}</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.gallery.size}</th>
                                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] text-right">{t.gallery.actions}</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {filteredDocs.map(doc => (
                                    <tr key={doc.id} className="group hover:bg-slate-50/80 transition-colors">
                                        <td className="px-8 py-4">
                                            <div className="w-16 h-10 rounded-xl bg-slate-100 overflow-hidden border border-slate-200">
                                                <img src={doc.thumbnail_url} className="w-full h-full object-cover" />
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <div className="flex flex-col">
                                                <span className="font-bold text-slate-800 text-sm mb-0.5">{doc.title}</span>
                                                <span className="text-[10px] text-slate-400 font-medium">{new Date(doc.created_at).toLocaleDateString()}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-4">
                                            <span className="text-[10px] font-black text-slate-500 bg-slate-100 px-3 py-1.5 rounded-xl uppercase tracking-wider">
                                                {categories.find(c => c.id === doc.category)?.label || doc.category}
                                            </span>
                                        </td>
                                        <td className="px-8 py-4 text-xs font-black text-slate-600 tracking-widest">{doc.language}</td>
                                        <td className="px-8 py-4 text-xs font-bold text-slate-400 tracking-tighter">{formatSize(doc.size_bytes)}</td>
                                        <td className="px-8 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-100 xl:opacity-0 xl:group-hover:opacity-100 transition-opacity">
                                                <button onClick={() => window.open(doc.file_url, '_blank')} className="p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 text-slate-400 hover:text-slate-900 transition-all shadow-sm">
                                                    <Eye className="w-4 h-4" />
                                                </button>
                                                <button onClick={() => handleDownload(doc.file_url, doc.title)} className="p-3 rounded-xl bg-[#865BFF]/5 hover:bg-[#865BFF] text-[#865BFF] hover:text-white transition-all shadow-sm">
                                                    <Download className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )
            ) : (
                <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[4rem] border border-dashed border-slate-200">
                    <div className="w-24 h-24 rounded-[2rem] bg-slate-50 flex items-center justify-center mb-8 relative">
                        <FileText className="w-12 h-12 text-slate-200" />
                        <div className="absolute top-0 right-0 w-6 h-6 bg-slate-100 rounded-full border-4 border-white flex items-center justify-center">
                            <X className="w-3 h-3 text-slate-300" />
                        </div>
                    </div>
                    <h3 className="text-2xl font-black text-slate-800 mb-2">{t.common.noData}</h3>
                    <p className="text-sm text-slate-400 font-medium max-w-sm text-center leading-relaxed">
                        {t.gallery.noDocsFound}
                    </p>
                </div>
            )}

            {showUploadModal && (
                <LibraryUploadModal 
                    onClose={() => setShowUploadModal(false)} 
                    onSuccess={() => { setShowUploadModal(false); fetchDocs(); }}
                    categories={categories.filter(c => c.id !== 'all')}
                />
            )}
        </div>
    );
}

function LibraryUploadModal({ onClose, onSuccess, categories }: { onClose: () => void, onSuccess: () => void, categories: any[] }) {
    const { t } = useLanguage();
    const [step, setStep] = useState<'selection' | 'uploading'>('selection');
    const [fileType, setFileType] = useState<'single' | 'migration'>('single');
    const [selectedCategory, setSelectedCategory] = useState(categories[0]?.id || 'manuales');
    const [selectedLang, setSelectedLang] = useState('ES');
    
    const [pdfFile, setPdfFile] = useState<globalThis.File | null>(null);
    const [thumbFile, setThumbFile] = useState<globalThis.File | null>(null);
    const [title, setTitle] = useState('');
    
    const [migrationFiles, setMigrationFiles] = useState<globalThis.File[]>([]);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);

    const handleSingleUpload = async () => {
        if (!pdfFile || !thumbFile || !title) return;
        setStep('uploading');
        
        try {
            const pdfName = `${Date.now()}_${pdfFile.name}`;
            const { data: pdfData, error: pdfErr } = await supabase.storage
                .from('library-documents')
                .upload(`files/${pdfName}`, pdfFile);
            if (pdfErr) throw pdfErr;

            const thumbName = `${Date.now()}_${thumbFile.name}`;
            const { data: thumbData, error: thumbErr } = await supabase.storage
                .from('library-documents')
                .upload(`thumbnails/${thumbName}`, thumbFile);
            if (thumbErr) throw thumbErr;

            const { data: { publicUrl: pdfUrl } } = supabase.storage.from('library-documents').getPublicUrl(`files/${pdfName}`);
            const { data: { publicUrl: thumbUrl } } = supabase.storage.from('library-documents').getPublicUrl(`thumbnails/${thumbName}`);

            const { error: dbErr } = await supabase.from('library_docs').insert({
                title,
                file_url: pdfUrl,
                thumbnail_url: thumbUrl,
                category: selectedCategory,
                language: selectedLang,
                size_bytes: pdfFile.size
            });
            if (dbErr) throw dbErr;

            onSuccess();
        } catch (error: any) {
            alert('Error: ' + error.message);
            setStep('selection');
        }
    };

    const handleMigration = async () => {
        if (migrationFiles.length === 0) return;
        setStep('uploading');
        setLogs(['Iniciando migración...']);
        
        const pdfs = migrationFiles.filter(f => f.name.toLowerCase().endsWith('.pdf'));
        const thumbs = migrationFiles.filter(f => f.name.toLowerCase().endsWith('.jpg') || f.name.toLowerCase().endsWith('.png'));
        
        let processed = 0;
        const total = pdfs.length;

        for (const pdf of pdfs) {
            try {
                const baseName = pdf.name.replace('.pdf', '');
                const thumb = thumbs.find(t => t.name.startsWith(baseName)) || thumbs[0];

                setLogs(prev => [...prev.slice(-4), `Subiendo: ${pdf.name}`]);

                const cleanName = pdf.name.replace(/\s+/g, '_');
                const pdfPath = `files/${Date.now()}_${cleanName}`;
                await supabase.storage.from('library-documents').upload(pdfPath, pdf, { upsert: true });

                let tUrl = '';
                if (thumb) {
                    const thumbPath = `thumbnails/${Date.now()}_${thumb.name.replace(/\s+/g, '_')}`;
                    await supabase.storage.from('library-documents').upload(thumbPath, thumb, { upsert: true });
                    tUrl = supabase.storage.from('library-documents').getPublicUrl(thumbPath).data.publicUrl;
                }

                const { data: { publicUrl: pUrl } } = supabase.storage.from('library-documents').getPublicUrl(pdfPath);

                let cat = 'manuales';
                if (pdf.name.includes('PAY-RETAILERS')) cat = 'pay_retailers';
                if (pdf.name.toLowerCase().includes('glosario') || pdf.name.toLowerCase().includes('glossary')) cat = 'glosarios';
                if (pdf.name.includes('STI') || pdf.name.includes('Social-trading')) cat = 'presentaciones';

                let targetLang = 'ES';
                if (pdf.name.includes('-EN') || pdf.name.includes('ENG')) targetLang = 'EN';
                if (pdf.name.includes('-FR')) targetLang = 'FR';
                if (pdf.name.includes('-BR')) targetLang = 'BR';
                if (pdf.name.includes('-ID')) targetLang = 'ID';

                await supabase.from('library_docs').insert({
                    title: pdf.name.replace('.pdf', '').replaceAll('-', ' '),
                    file_url: pUrl,
                    thumbnail_url: tUrl,
                    category: cat,
                    language: targetLang,
                    size_bytes: pdf.size
                });

                processed++;
                setProgress(Math.round((processed / total) * 100));
            } catch (err) {
                console.error('Error migrando', pdf.name, err);
            }
        }
        setLogs(prev => [...prev, '¡Migración completada!']);
        setTimeout(onSuccess, 1500);
    };

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0d0221]/80 backdrop-blur-xl">
            <motion.div 
                initial={{ opacity: 0, scale: 0.95, y: 40 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                className="bg-white rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl"
            >
                <div className="px-10 py-8 border-b border-slate-100 flex items-center justify-between bg-white">
                    <div>
                        <h2 className="text-2xl font-black text-slate-800 tracking-tight">{t.gallery.manageDocs}</h2>
                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">{t.gallery.adminPortal}</p>
                    </div>
                    <button onClick={onClose} className="p-3 rounded-2xl hover:bg-slate-50 text-slate-400 hover:text-slate-800 transition-all">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <div className="px-10 py-8 max-h-[70vh] overflow-y-auto no-scrollbar">
                    {step === 'selection' ? (
                        <div className="space-y-8">
                            <div className="flex p-1.5 bg-slate-50 rounded-2xl">
                                <button 
                                    onClick={() => setFileType('single')}
                                    className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${fileType === 'single' ? 'bg-white text-slate-900 shadow-sm border border-slate-100' : 'text-slate-400 hover:text-slate-600'}`}
                                >
                                    {t.gallery.manualUpload}
                                </button>
                                <button 
                                    onClick={() => setFileType('migration')}
                                    className={`flex-1 py-3.5 rounded-xl text-[11px] font-black uppercase tracking-widest transition-all ${fileType === 'migration' ? 'bg-white text-[#865BFF] shadow-sm border border-[#865BFF]/10' : 'text-slate-400 hover:text-[#865BFF]'}`}
                                >
                                    <Sparkles className="w-3.5 h-3.5 inline mr-2 text-amber-500" /> {t.gallery.localMigration}
                                </button>
                            </div>

                            {fileType === 'single' ? (
                                <div className="grid grid-cols-1 gap-6">
                                    <div className="space-y-4">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">{t.gallery.docTitle}</label>
                                            <input 
                                                type="text" 
                                                value={title}
                                                onChange={(e) => setTitle(e.target.value)}
                                                placeholder="Ej: Guía de Referidos Bridge Markets"
                                                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-medium focus:bg-white focus:border-[#865BFF]/30 transition-all outline-none"
                                            />
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">{t.gallery.category}</label>
                                                <select 
                                                    value={selectedCategory}
                                                    onChange={(e) => setSelectedCategory(e.target.value)}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:border-[#865BFF]/30"
                                                >
                                                    {categories.map(c => (
                                                        <option key={c.id} value={c.id}>{c.label}</option>
                                                    ))}
                                                </select>
                                            </div>
                                            <div>
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block ml-1">{t.gallery.language}</label>
                                                <select 
                                                    value={selectedLang}
                                                    onChange={(e) => setSelectedLang(e.target.value)}
                                                    className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl text-sm font-bold appearance-none outline-none focus:border-[#865BFF]/30"
                                                >
                                                    <option value="ES">🇪🇸 Español</option>
                                                    <option value="EN">🇬🇧 English</option>
                                                    <option value="PT">🇧🇷 Português</option>
                                                    <option value="FR">🇫🇷 Français</option>
                                                    <option value="ID">🇮🇩 Indonesia</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-2 gap-4">
                                            <div className="relative border-2 border-dashed border-slate-100 rounded-[1.5rem] p-6 text-center hover:border-[#865BFF]/30 hover:bg-[#865BFF]/5 transition-all cursor-pointer group">
                                                <FileText className="w-6 h-6 text-[#865BFF] mx-auto mb-3 transition-transform group-hover:scale-110" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase block truncate">{pdfFile ? pdfFile.name : t.gallery.uploadPdf}</span>
                                                <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            </div>
                                            <div className="relative border-2 border-dashed border-slate-100 rounded-[1.5rem] p-6 text-center hover:border-[#865BFF]/30 hover:bg-[#865BFF]/5 transition-all cursor-pointer group">
                                                <Upload className="w-6 h-6 text-emerald-500 mx-auto mb-3 transition-transform group-hover:scale-110" />
                                                <span className="text-[10px] font-black text-slate-500 uppercase block truncate">{thumbFile ? thumbFile.name : t.gallery.thumbnailJpg}</span>
                                                <input type="file" accept="image/*" onChange={(e) => setThumbFile(e.target.files?.[0] || null)} className="absolute inset-0 opacity-0 cursor-pointer" />
                                            </div>
                                        </div>
                                    </div>
                                    <button 
                                        onClick={handleSingleUpload}
                                        disabled={!pdfFile || !thumbFile || !title}
                                        className="w-full py-5 bg-slate-900 text-white rounded-[1.5rem] font-black text-sm shadow-2xl hover:bg-[#865BFF] disabled:opacity-30 transition-all mt-4"
                                    >
                                        {t.gallery.syncDoc}
                                    </button>
                                </div>
                            ) : (
                                <div className="space-y-6">
                                    <div className="p-10 border-2 border-dashed border-[#865BFF]/30 bg-[#865BFF]/5 rounded-[2.5rem] text-center relative group">
                                        <Sparkles className="w-12 h-12 text-[#865BFF] mx-auto mb-4 group-hover:rotate-12 transition-transform duration-500" />
                                        <h4 className="text-lg font-black text-slate-800 mb-2 tracking-tight">{t.gallery.massiveUpload}</h4>
                                        <p className="text-[11px] text-slate-400 max-w-[240px] mx-auto font-medium leading-relaxed">{t.gallery.dragFilesDesc}</p>
                                        <input 
                                            type="file" multiple 
                                            onChange={(e) => setMigrationFiles(Array.from(e.target.files || []))}
                                            className="absolute inset-0 opacity-0 cursor-pointer" 
                                        />
                                    </div>
                                    {migrationFiles.length > 0 && (
                                        <div className="bg-slate-50 p-6 rounded-[1.5rem] border border-slate-100 flex items-center justify-between">
                                            <span className="text-[11px] font-black text-slate-700 uppercase tracking-widest">{migrationFiles.length} {t.gallery.filesReady}</span>
                                            <button onClick={() => setMigrationFiles([])} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:bg-white px-3 py-1.5 rounded-lg transition-all">{t.gallery.clearBtn}</button>
                                        </div>
                                    )}
                                    <button 
                                        onClick={handleMigration}
                                        disabled={migrationFiles.length === 0}
                                        className="w-full py-5 bg-[#865BFF] text-white rounded-[1.5rem] font-black text-sm shadow-xl hover:bg-[#7349e5] disabled:opacity-30 transition-all"
                                    >
                                        {t.gallery.startProcess}
                                    </button>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="py-12 text-center space-y-8">
                            <div className="w-28 h-28 bg-[#865BFF]/10 rounded-[2rem] flex items-center justify-center mx-auto relative group">
                                <Loader2 className="w-12 h-12 text-[#865BFF] animate-spin" />
                                <div className="absolute inset-0 flex items-center justify-center font-black text-[10px] text-[#865BFF] mt-10">{progress}%</div>
                            </div>
                            <div className="space-y-4">
                                <h3 className="text-xl font-black text-slate-800 tracking-tight">{t.gallery.syncingServer}</h3>
                                <div className="max-w-md mx-auto text-[10px] font-mono text-slate-400 bg-slate-900 p-5 rounded-[1.5rem] text-left h-32 overflow-y-auto custom-scrollbar">
                                    {logs.map((log, i) => (
                                        <div key={i} className="mb-2 flex gap-2">
                                            <span className="text-emerald-500">▶</span>
                                            <span className="text-slate-300">{log}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}
                </div>
                
                <div className="px-10 py-6 bg-slate-50 border-t border-slate-100 flex items-center justify-center">
                    <p className="text-[9px] font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                        <Shield className="w-3 h-3 text-amber-500" /> Bridge Markets Documentation Engine v2.0
                    </p>
                </div>
            </motion.div>
        </div>
    );
}
