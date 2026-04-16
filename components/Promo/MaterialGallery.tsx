"use client";
import React, { useState, useEffect } from 'react';
import { 
    Download, Upload, Trash2, RefreshCcw, 
    Image as ImageIcon, Check, Loader2, Plus,
    ExternalLink, Search, Filter
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/lib/i18n/context';

interface MaterialPost {
    id: string;
    title: string;
    url: string;
    filename: string;
    mime_type: string;
    language: string;
    created_at: string;
}

interface MaterialGalleryProps {
    userRole: string;
}

export default function MaterialGallery({ userRole }: MaterialGalleryProps) {
    const { t } = useLanguage();
    const isAdmin = userRole === 'admin';
    const [assets, setAssets] = useState<MaterialPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [uploading, setUploading] = useState(false);
    const [syncing, setSyncing] = useState(false);
    const [filter, setFilter] = useState('');

    const fetchAssets = async () => {
        setLoading(true);
        try {
            const res = await fetch('/api/promo/assets');
            const json = await res.json();
            if (json.success) {
                setAssets(json.data);
            }
        } catch (error) {
            console.error('Error fetching assets:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAssets();
    }, []);

    const handleDownload = (asset: MaterialPost) => {
        const link = document.createElement('a');
        link.href = asset.url;
        link.download = asset.filename;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('¿Eliminar este material?')) return;
        try {
            const res = await fetch(`/api/promo/assets?id=${id}`, { method: 'DELETE' });
            const json = await res.json();
            if (json.success) {
                setAssets(prev => prev.filter(a => a.id !== id));
            }
        } catch (error) {
            console.error('Error deleting asset:', error);
        }
    };

    const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setUploading(true);
        try {
            // 1. Upload to Supabase Storage
            const fileExt = file.name.split('.').pop();
            const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
            const filePath = `posts/${fileName}`;

            const { error: uploadError, data } = await supabase.storage
                .from('material_posts')
                .upload(filePath, file);

            if (uploadError) throw uploadError;

            // 2. Get Public URL
            const { data: { publicUrl } } = supabase.storage
                .from('material_posts')
                .getPublicUrl(filePath);

            // 3. Save to Database via API
            const res = await fetch('/api/promo/assets', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title: file.name.split('.')[0],
                    url: publicUrl,
                    filename: fileName,
                    mime_type: file.type,
                    language: 'ES'
                })
            });

            const json = await res.json();
            if (json.success) {
                setAssets(prev => [json.data, ...prev]);
            }
        } catch (error: any) {
            console.error('Upload error:', error);
            alert('Error al subir: ' + error.message);
        } finally {
            setUploading(false);
        }
    };

    // Special function to seed existing images (one-time use for Admin)
    const handleSync = async () => {
        setSyncing(true);
        try {
            // Existing images found in public/images/post during research
            const existingImages = [
                "565335905_17966788319960408_7328447827544933734_n.jpg",
                "633716288_17980057172960408_1799203224339714297_n.jpg",
                "641778364_17980875920960408_6917174705232821628_n.jpg",
                "649247749_17982279329960408_7869012741016348100_n.jpg",
                "649974393_17982279338960408_2609828454851882493_n.jpg",
                "650259519_17982279347960408_1123960496112064618_n.jpg",
                "651875078_17982657434960408_2237570490623767172_n.jpg",
                "656075691_17984420582960408_2365253967730201803_n.jpg",
                "656302584_17984331458960408_4879877030546046990_n.jpg",
                "656817299_17984331440960408_5606829115110227020_n.jpg",
                "656861413_17984420591960408_7052707175451910868_n.jpg",
                "657455042_17984420555960408_7323440667998608053_n.jpg",
                "657455042_17984420555960408_7323440667998608053_n76.png",
                "657455042_17984420555960408_7323440667998608053_n8.png",
                "657689893_17984331467960408_8921749978703847411_n.jpg",
                "658608184_17984420564960408_2399279151338614934_n.jpg",
                "658831516_17984331449960408_6465304618229026105_n.jpg",
                "HISTORIA CUPON.jpg"
            ];

            for (const img of existingImages) {
                await fetch('/api/promo/assets', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        title: img.split('.')[0],
                        url: `/images/post/${img}`,
                        filename: img,
                        mime_type: img.endsWith('.png') ? 'image/png' : 'image/jpeg',
                        language: 'ES'
                    })
                });
            }
            fetchAssets();
        } catch (error) {
            console.error('Sync error:', error);
        } finally {
            setSyncing(false);
        }
    };

    const filteredAssets = assets.filter(a => 
        a.title.toLowerCase().includes(filter.toLowerCase()) || 
        a.filename.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="space-y-6">
            {/* Header / Controls */}
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                <div>
                    <h3 className="text-xl font-black text-slate-800 tracking-tight">{t.gallery.materialGalleryTitle}</h3>
                    <p className="text-sm text-slate-500">{t.gallery.materialGalleryDesc}</p>
                </div>
                
                <div className="flex items-center gap-2 w-full md:w-auto">
                    <div className="relative flex-1 md:w-64">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder={t.gallery.searchMaterial}
                            value={filter}
                            onChange={(e) => setFilter(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#865BFF]/20 transition-all"
                        />
                    </div>
                    
                    {isAdmin && (
                        <>
                            <button 
                                onClick={handleSync}
                                disabled={syncing}
                                className="flex items-center gap-2 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-600 rounded-xl text-sm font-bold transition-all disabled:opacity-50"
                                title={t.gallery.syncExistingImages}
                            >
                                {syncing ? <Loader2 className="w-4 h-4 animate-spin" /> : <RefreshCcw className="w-4 h-4" />}
                                <span className="hidden sm:inline">Sync</span>
                            </button>
                            
                            <label className="flex items-center gap-2 px-4 py-2 bg-[#865BFF] hover:bg-[#7349e5] text-white rounded-xl text-sm font-bold shadow-lg shadow-[#865BFF]/20 cursor-pointer transition-all">
                                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                <span>{uploading ? t.gallery.uploading : t.gallery.upload}</span>
                                <input type="file" className="hidden" onChange={handleUpload} accept="image/*" disabled={uploading} />
                            </label>
                        </>
                    )}
                </div>
            </div>

            {/* Gallery Grid */}
            {loading ? (
                <div className="flex flex-col items-center justify-center py-20 grayscale opacity-50">
                    <Loader2 className="w-10 h-10 animate-spin text-[#865BFF] mb-4" />
                    <p className="font-bold text-slate-400">{t.gallery.loadingGallery}</p>
                </div>
            ) : filteredAssets.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {filteredAssets.map(asset => (
                        <div key={asset.id} className="group relative bg-white rounded-2xl border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300">
                            {/* Image Container */}
                            <div className="aspect-square bg-slate-100 overflow-hidden relative">
                                <img 
                                    src={asset.url} 
                                    alt={asset.title}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                
                                {/* Hover Overlay */}
                                <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-3">
                                    <button 
                                        onClick={() => window.open(asset.url, '_blank')}
                                        className="p-3 bg-white/20 backdrop-blur-md rounded-xl text-white hover:bg-white/40 transition-all shadow-xl"
                                        title={t.gallery.viewFullSize}
                                    >
                                        <ExternalLink className="w-5 h-5" />
                                    </button>
                                    <button 
                                        onClick={() => handleDownload(asset)}
                                        className="p-3 bg-white text-slate-900 rounded-xl hover:scale-105 transition-all shadow-xl"
                                        title={t.gallery.downloadMaterial}
                                    >
                                        <Download className="w-5 h-5" />
                                    </button>
                                    {isAdmin && (
                                        <button 
                                            onClick={() => handleDelete(asset.id)}
                                            className="p-3 bg-red-500/80 text-white rounded-xl hover:bg-red-600 transition-all shadow-xl"
                                            title={t.gallery.deleteFromGallery}
                                        >
                                            <Trash2 className="w-5 h-5" />
                                        </button>
                                    )}
                                </div>
                            </div>

                            {/* Info */}
                            <div className="p-4 border-t border-slate-100 bg-white flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black uppercase text-slate-500 tracking-widest bg-slate-50 px-2 py-0.5 rounded border border-slate-200 shadow-sm">
                                        {asset.mime_type.split('/')[1]}
                                    </span>
                                    <span className="text-[10px] text-slate-400 font-medium">
                                        {new Date(asset.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                                <button 
                                    onClick={() => handleDownload(asset)}
                                    className="text-[10px] font-bold text-[#865BFF] hover:text-[#7349e5] transition-colors"
                                >
                                    {t.gallery.downloadBtn}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="bg-white border-2 border-dashed border-slate-200 rounded-3xl p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <ImageIcon className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">{t.gallery.emptyGallery}</h3>
                    <p className="text-slate-500 max-w-sm mx-auto mb-8">
                        {t.gallery.noMaterialAvailable}
                    </p>
                    {isAdmin && (
                        <button 
                            onClick={handleSync}
                            disabled={syncing}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-[#865BFF] text-white rounded-xl font-bold shadow-lg shadow-[#865BFF]/20 hover:scale-105 transition-all"
                        >
                            {syncing ? <Loader2 className="w-5 h-5 animate-spin" /> : <RefreshCcw className="w-5 h-5" />}
                            {t.gallery.syncBtn}
                        </button>
                    )}
                </div>
            )}
        </div>
    );
}
