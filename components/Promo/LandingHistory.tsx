'use client';

import React, { useEffect, useState } from 'react';
import { 
    Eye, 
    Download, 
    Copy, 
    Search as SearchIcon, 
    Calendar, 
    Globe, 
    MessageCircle, 
    Rocket,
    MoreVertical,
    Check,
    Loader2,
    FileText,
    ExternalLink
} from 'lucide-react';

interface Landing {
    id: string;
    slug: string;
    landing_type: string;
    language: string;
    html: string;
    created_at: string;
    data: {
        fullName?: string;
        country?: string;
        whatsapp?: string;
        email?: string;
    };
}

interface LandingHistoryProps {
    partnerId: string;
    onViewHistory?: () => void;
}

export default function LandingHistory({ partnerId }: LandingHistoryProps) {
    const [landings, setLandings] = useState<Landing[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [copying, setCopying] = useState<string | null>(null);

    const extractMetadata = (html: string, existingData: any) => {
        try {
            const match = html.match(/<!--METADATA:(.*?)-->/);
            if (match && match[1]) {
                const parsed = JSON.parse(match[1]);
                return { ...parsed, ...existingData };
            }
        } catch (e) {
            console.error("Error parsing metadata from HTML", e);
        }
        return existingData || {};
    };

    const fetchLandings = async () => {
        if (!partnerId) {
            setLoading(false);
            return;
        }
        setLoading(true);
        try {
            const res = await fetch(`/api/landings?partnerId=${partnerId}`);
            const json = await res.json();
            if (json.success) {
                const hydratedData = (json.data || []).map((l: Landing) => ({
                    ...l,
                    data: extractMetadata(l.html, l.data)
                }));
                setLandings(hydratedData);
            }
        } catch (error) {
            console.error('Error fetching landings:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchLandings();
    }, [partnerId]);

    const handleCopyLink = (slug: string) => {
        const url = `${window.location.origin}/l/${slug}`;
        navigator.clipboard.writeText(url);
        setCopying(slug);
        setTimeout(() => setCopying(null), 2000);
    };

    const handleDownload = (landing: Landing) => {
        const filename = `landing-${landing.slug}.html`;
        const blob = new Blob([landing.html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        a.click();
        URL.revokeObjectURL(url);
    };

    const filteredLandings = landings.filter(l => 
        l.slug.toLowerCase().includes(searchTerm.toLowerCase()) ||
        l.data?.fullName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
                <Loader2 className="w-12 h-12 text-[#865BFF] animate-spin mb-4" />
                <p className="text-slate-500 font-bold">Cargando tus landings...</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header / Search */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <div>
                    <h2 className="text-2xl font-black text-[#0d0221] flex items-center gap-2">
                        <FileText className="w-6 h-6 text-[#865BFF]" />
                        Mis Landings Guardadas
                    </h2>
                    <p className="text-slate-500 text-sm font-medium">Gestiona y comparte tus herramientas de captación</p>
                </div>

                <div className="relative w-full md:w-72">
                    <SearchIcon className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input 
                        type="text" 
                        placeholder="Buscar por nombre o slug..."
                        className="w-full pl-11 pr-4 py-3 bg-slate-50 border-none rounded-2xl text-sm focus:ring-2 focus:ring-[#865BFF]/20 transition-all font-medium"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {filteredLandings.length === 0 ? (
                <div className="bg-white rounded-3xl border-2 border-dashed border-slate-200 p-20 text-center">
                    <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                        <Rocket className="w-10 h-10 text-slate-300" />
                    </div>
                    <h3 className="text-xl font-black text-slate-800 mb-2">No se encontraron landings</h3>
                    <p className="text-slate-500 mb-8 max-w-sm mx-auto">
                        Aún no tienes landings generadas o ninguna coincide con tu búsqueda.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredLandings.map((landing) => (
                        <div key={landing.id} className="group bg-white rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl hover:shadow-[#865BFF]/5 transition-all duration-300 overflow-hidden">
                            {/* Preview Badge */}
                            <div className="p-6 pb-4">
                                <div className="flex justify-between items-start mb-4">
                                    <div className="px-3 py-1 bg-[#865BFF]/10 text-[#865BFF] text-[10px] font-black rounded-full uppercase tracking-wider">
                                        {landing.landing_type || 'Personalizada'}
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(landing.created_at).toLocaleDateString()}
                                    </div>
                                </div>
                                <h3 className="text-lg font-black text-slate-800 mb-1 group-hover:text-[#865BFF] transition-colors">
                                    {landing.data?.fullName || 'Sin nombre'}
                                </h3>
                                <p className="text-xs font-bold text-slate-400 mb-4 flex items-center gap-1">
                                    <Globe className="w-3 h-3" />
                                    {landing.slug}
                                </p>

                                <div className="grid grid-cols-2 gap-2 mb-6">
                                    <div className="bg-slate-50 p-3 rounded-2xl">
                                        <span className="text-[9px] uppercase font-black text-slate-400 block mb-1">Idioma</span>
                                        <span className="text-xs font-bold text-slate-700">{landing.language?.toUpperCase() || 'ES'}</span>
                                    </div>
                                    <div className="bg-slate-50 p-3 rounded-2xl">
                                        <span className="text-[9px] uppercase font-black text-slate-400 block mb-1">País</span>
                                        <span className="text-xs font-bold text-slate-700 truncate">{landing.data?.country || 'Global'}</span>
                                    </div>
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => window.open(`/l/${landing.slug}`, '_blank')}
                                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-[#865BFF]"
                                    title="Ver en vivo"
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase">Ver</span>
                                </button>
                                <button 
                                    onClick={() => handleCopyLink(landing.slug)}
                                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-[#865BFF]"
                                    title="Copiar enlace"
                                >
                                    {copying === landing.slug ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    <span className="text-[9px] font-black uppercase">{copying === landing.slug ? 'Listo' : 'Link'}</span>
                                </button>
                                <button 
                                    onClick={() => handleDownload(landing)}
                                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-white hover:shadow-sm transition-all text-slate-600 hover:text-[#865BFF]"
                                    title="Descargar HTML"
                                >
                                    <Download className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase">HTML</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
