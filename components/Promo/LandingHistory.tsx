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
    ExternalLink,
    Trash2,
    Info,
    Pencil
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { formatDateUpperCase } from '@/lib/utils';

interface Landing {
    id: string;
    slug: string;
    landing_type: string;
    language: string;
    html: string;
    status: string;
    admin_notes: string;
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
    onEdit?: (landing: Landing) => void;
}

export default function LandingHistory({ partnerId, onEdit }: LandingHistoryProps) {
    const [landings, setLandings] = useState<Landing[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [copying, setCopying] = useState<string | null>(null);
    const [landingToDelete, setLandingToDelete] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

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

    const handleDelete = (id: string) => {
        setLandingToDelete(id);
    };

    const confirmDelete = async () => {
        const id = landingToDelete;
        if (!id) return;
        
        setIsDeleting(true);

        try {
            const { error: deleteError } = await supabase
                .from('landings')
                .delete()
                .eq('id', id);

            if (!deleteError) {
                // Remove from local state
                setLandings(prev => prev.filter(l => l.id !== id));
            } else {
                setErrorMsg(`Error al eliminar: ${deleteError.message}`);
            }
        } catch (error) {
            console.error('Error deleting landing:', error);
            setErrorMsg('Error de conexión al intentar eliminar la landing.');
        } finally {
            setIsDeleting(false);
            setLandingToDelete(null);
        }
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
                                    <div className="flex flex-col gap-2 items-start">
                                        <div className="px-3 py-1 bg-[#865BFF]/10 text-[#865BFF] text-[10px] font-black rounded-full uppercase tracking-wider">
                                            {landing.landing_type || 'Personalizada'}
                                        </div>
                                        <div className={`px-2 py-0.5 text-[8px] font-black uppercase tracking-widest rounded flex items-center gap-1 ${
                                            landing.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                            landing.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            <div className={`w-1 h-1 rounded-full ${
                                                landing.status === 'approved' ? 'bg-emerald-500' :
                                                landing.status === 'rejected' ? 'bg-rose-500' :
                                                'bg-amber-500 animate-pulse'
                                            }`} />
                                            {landing.status === 'approved' ? 'Activa' : 
                                             landing.status === 'rejected' ? 'Rechazada' : 'En Revisión'}
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-1 text-slate-400 text-[10px] font-bold">
                                        <Calendar className="w-3 h-3" />
                                        {formatDateUpperCase(landing.created_at)}
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

                                {landing.status === 'rejected' && landing.admin_notes && (
                                    <div className="mt-2 p-3 bg-rose-50 border border-rose-100 rounded-2xl flex gap-2">
                                        <Rocket className="w-3 h-3 text-rose-500 shrink-0 rotate-180" />
                                        <p className="text-[10px] text-rose-700 font-medium leading-relaxed">
                                            <span className="font-black uppercase block mb-0.5">Motivo del rechazo:</span>
                                            {landing.admin_notes}
                                        </p>
                                    </div>
                                )}
                            </div>

                            {/* Actions */}
                            <div className="px-6 py-4 bg-slate-50/50 border-t border-slate-100 grid grid-cols-3 gap-2">
                                <button 
                                    onClick={() => landing.status !== 'rejected' && window.open(`/l/${landing.slug}`, '_blank')}
                                    disabled={landing.status === 'rejected'}
                                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all ${
                                        landing.status !== 'rejected' 
                                            ? 'hover:bg-white hover:shadow-sm text-slate-600 hover:text-[#865BFF]' 
                                            : 'opacity-40 cursor-not-allowed text-slate-400'
                                    }`}
                                    title={landing.status === 'rejected' ? 'Landing rechazada' : 'Ver Landing'}
                                >
                                    <Eye className="w-4 h-4" />
                                    <span className="text-[10px] font-bold uppercase tracking-tight">Ver</span>
                                </button>
                                
                                <button 
                                    onClick={() => landing.status !== 'rejected' && handleCopyLink(landing.slug)}
                                    disabled={landing.status === 'rejected'}
                                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all ${
                                        landing.status !== 'rejected'
                                            ? 'hover:bg-white hover:shadow-sm text-slate-600 hover:text-[#865BFF]'
                                            : 'opacity-40 cursor-not-allowed text-slate-400'
                                    }`}
                                    title={landing.status === 'rejected' ? 'No disponible' : 'Copiar Link'}
                                >
                                    {copying === landing.slug ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                    <span className="text-[10px] font-bold uppercase tracking-tight">Link</span>
                                </button>
                                <button 
                                    onClick={() => (landing.status === 'rejected' || landing.status === 'approved') && onEdit && onEdit(landing)}
                                    disabled={landing.status === 'pending'}
                                    className={`flex flex-col items-center justify-center gap-1 p-2 rounded-xl transition-all ${
                                        landing.status !== 'pending'
                                            ? 'hover:bg-slate-50 hover:shadow-sm text-slate-600 hover:text-indigo-500'
                                            : 'opacity-40 cursor-not-allowed text-slate-400'
                                    }`}
                                    title={
                                        landing.status === 'pending' ? 'No se puede editar mientras está en revisión' :
                                        'Editar Landing'
                                    }
                                >
                                    <Pencil className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase">Editar</span>
                                </button>
                                <button 
                                    onClick={() => handleDelete(landing.id)}
                                    className="flex flex-col items-center justify-center gap-1 p-2 rounded-xl hover:bg-red-50 hover:shadow-sm transition-all text-slate-400 hover:text-red-500"
                                    title="Eliminar Landing"
                                >
                                    <Trash2 className="w-4 h-4" />
                                    <span className="text-[9px] font-black uppercase">Eliminar</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Premium Delete Confirmation Modal */}
            {landingToDelete && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-[#0d0221]/80 backdrop-blur-md animate-in fade-in duration-300"
                        onClick={() => !isDeleting && setLandingToDelete(null)}
                    />
                    
                    {/* Modal Content */}
                    <div className="relative w-full max-w-md bg-white rounded-[2.5rem] shadow-2xl border border-white/20 overflow-hidden animate-in zoom-in-95 duration-300">
                        <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-transparent via-rose-500 to-transparent" />
                        
                        <div className="p-8 sm:p-10 text-center">
                            <div className="w-20 h-20 bg-rose-50 rounded-[2rem] flex items-center justify-center mx-auto mb-6 shadow-inner border border-rose-100/50">
                                <Trash2 className="w-10 h-10 text-rose-500" />
                            </div>
                            
                            <h3 className="text-2xl font-black text-slate-800 mb-3 tracking-tight">¿Eliminar Landing?</h3>
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-8">
                                Estás a punto de eliminar permanentemente esta landing page. Esta acción no se puede deshacer y perderás todos los accesos.
                            </p>
                            
                            <div className="flex flex-col sm:flex-row gap-3">
                                <button
                                    onClick={() => setLandingToDelete(null)}
                                    disabled={isDeleting}
                                    className="flex-1 px-6 py-4 rounded-2xl bg-slate-100 text-slate-600 font-black text-[11px] uppercase tracking-widest hover:bg-slate-200 transition-all disabled:opacity-50"
                                >
                                    Cancelar
                                </button>
                                <button
                                    onClick={confirmDelete}
                                    disabled={isDeleting}
                                    className="flex-[1.5] px-6 py-4 rounded-2xl bg-rose-500 text-white font-black text-[11px] uppercase tracking-widest hover:bg-rose-600 shadow-xl shadow-rose-500/20 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {isDeleting ? (
                                        <>
                                            <Loader2 className="w-4 h-4 animate-spin" />
                                            Eliminando...
                                        </>
                                    ) : (
                                        'Sí, Eliminar Ahora'
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Close button top right */}
                        <button 
                            onClick={() => !isDeleting && setLandingToDelete(null)}
                            className="absolute top-6 right-6 w-10 h-10 rounded-xl bg-slate-50 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-all"
                        >
                            <span className="text-xl">×</span>
                        </button>
                    </div>
                </div>
            )}

            {/* Premium Error Modal */}
            {errorMsg && (
                <div className="fixed inset-0 z-[110] flex items-center justify-center p-4">
                    <div 
                        className="absolute inset-0 bg-[#0d0221]/40 backdrop-blur-sm animate-in fade-in duration-300"
                        onClick={() => setErrorMsg(null)}
                    />
                    <div className="relative w-full max-w-sm bg-white rounded-[2rem] shadow-2xl border border-rose-100 overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
                        <div className="p-8 text-center">
                            <div className="w-16 h-16 bg-rose-50 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <Info className="w-8 h-8 text-rose-500" />
                            </div>
                            <h4 className="text-lg font-black text-slate-800 mb-2">¡Ops! Algo salió mal</h4>
                            <p className="text-sm text-slate-500 font-medium mb-6">{errorMsg}</p>
                            <button 
                                onClick={() => setErrorMsg(null)}
                                className="w-full py-3.5 bg-slate-800 text-white font-black text-[11px] uppercase tracking-widest rounded-xl hover:bg-slate-900 transition-all"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
