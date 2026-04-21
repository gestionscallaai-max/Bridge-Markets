"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    Clock, CheckCircle2, XCircle, Globe, 
    Copy, ExternalLink, Search, Filter, 
    Loader2, ArrowLeft, MessageSquare, 
    ShieldCheck, AlertCircle, Trash2,
    Layout, Sparkles, Rocket, Pencil
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/lib/i18n/context';

export default function LandingHistoryPage() {
    const { t } = useLanguage();
    const router = useRouter();
    const [landings, setLandings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [copied, setCopied] = useState<string | null>(null);

    useEffect(() => {
        fetchMyLandings();
    }, []);

    const fetchMyLandings = async () => {
        setLoading(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('landings')
                .select('*')
                .eq('partner_id', user.id)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLandings(data || []);
        } catch (err) {
            console.error('Error fetching landings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleCopy = (slug: string) => {
        const url = `${window.location.origin}/l/${slug}`;
        navigator.clipboard.writeText(url);
        setCopied(slug);
        setTimeout(() => setCopied(null), 2000);
    };

    const handleDelete = async (id: string) => {
        if (!confirm('¿Estás seguro de que quieres eliminar esta landing?')) return;
        
        try {
            const res = await fetch(`/api/landings?id=${id}`, { method: 'DELETE' });
            const json = await res.json();
            if (json.success) {
                setLandings(landings.filter(l => l.id !== id));
            }
        } catch (err) {
            console.error('Delete error:', err);
        }
    };

    const filteredLandings = landings.filter(l => 
        l.slug.toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.landing_type.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="flex flex-col items-center gap-4">
                    <Loader2 className="w-10 h-10 animate-spin text-[#865BFF]" />
                    <p className="text-slate-400 font-bold animate-pulse uppercase tracking-widest text-[10px]">Cargando historial...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <button 
                        onClick={() => router.push('/dashboard/promo/overview')}
                        className="flex items-center gap-2 text-slate-400 hover:text-[#865BFF] transition-colors mb-4 group"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-widest">Volver a Promociones</span>
                    </button>
                    <h1 className="text-4xl font-black text-slate-800 tracking-tight">Mi Historial de <span className="text-[#865BFF]">Landings</span></h1>
                    <p className="text-sm text-slate-400 mt-2 font-medium">Gestiona y monitorea el estado de tus páginas de prospección.</p>
                </div>

                <div className="flex items-center gap-4">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre..."
                            className="bg-white border border-slate-200 rounded-2xl pl-11 pr-4 py-3 text-sm w-full md:w-[280px] focus:outline-none focus:ring-4 focus:ring-[#865BFF]/5 focus:border-[#865BFF] transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={() => router.push('/dashboard/landing')}
                        className="p-3.5 bg-[#865BFF] text-white rounded-2xl shadow-lg shadow-indigo-500/20 hover:scale-105 active:scale-95 transition-all"
                        title="Crear Nueva Landing"
                    >
                        <Rocket className="w-5 h-5" />
                    </button>
                </div>
            </div>

            {/* Quick Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-5 group hover:border-[#865BFF]/30 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500 group-hover:scale-110 transition-transform">
                        <Clock className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">En Revisión</div>
                        <div className="text-3xl font-black text-slate-800">{landings.filter(l => l.status === 'pending').length}</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-5 group hover:border-emerald-500/30 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500 group-hover:scale-110 transition-transform">
                        <CheckCircle2 className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Activas</div>
                        <div className="text-3xl font-black text-slate-800">{landings.filter(l => l.status === 'approved').length}</div>
                    </div>
                </div>
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200/60 shadow-sm flex items-center gap-5 group hover:border-slate-800/10 transition-colors">
                    <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400 group-hover:scale-110 transition-transform">
                        <Layout className="w-7 h-7" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 mb-1">Total Generadas</div>
                        <div className="text-3xl font-black text-slate-800">{landings.length}</div>
                    </div>
                </div>
            </div>

            {/* List Table */}
            <div className="bg-white rounded-[2.5rem] border border-slate-200/60 shadow-xl shadow-slate-200/20 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50">
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest">Proyecto</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Estado</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-center">Idioma</th>
                                <th className="px-8 py-6 text-[10px] font-black text-slate-400 uppercase tracking-widest text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {filteredLandings.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-32 text-center">
                                        <div className="max-w-xs mx-auto">
                                            <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6">
                                                <Globe className="w-10 h-10 text-slate-200" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-800 mb-2">No hay landings aún</h3>
                                            <p className="text-sm text-slate-400 mb-8 font-medium">Crea tu primera página de prospección para empezar a captar leads.</p>
                                            <button 
                                                onClick={() => router.push('/dashboard/landing')}
                                                className="px-8 py-3 bg-[#865BFF] text-white rounded-2xl text-xs font-black shadow-lg shadow-indigo-500/20 hover:scale-105 transition-all"
                                            >
                                                CREAR AHORA
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ) : (
                                filteredLandings.map(landing => (
                                    <tr key={landing.id} className="hover:bg-slate-50/50 transition-colors group">
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 group-hover:bg-[#865BFF]/10 group-hover:text-[#865BFF] transition-all">
                                                    <Layout className="w-5 h-5" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-slate-800 mb-0.5">{landing.slug}</div>
                                                    <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{landing.landing_type}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex flex-col items-center gap-2">
                                                <div className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest flex items-center gap-2 ${
                                                    landing.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                                    landing.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                                    'bg-amber-100 text-amber-700'
                                                }`}>
                                                    <span className={`w-1.5 h-1.5 rounded-full ${
                                                        landing.status === 'approved' ? 'bg-emerald-500' :
                                                        landing.status === 'rejected' ? 'bg-rose-500' :
                                                        'bg-amber-500 animate-pulse'
                                                    }`} />
                                                    {landing.status === 'pending' ? 'En Revisión' : 
                                                     landing.status === 'approved' ? 'Activa' : 'Corregir'}
                                                </div>
                                                
                                                {landing.status === 'rejected' && landing.admin_notes && (
                                                    <div className="flex items-center gap-1.5 text-rose-500">
                                                        <AlertCircle className="w-3.5 h-3.5" />
                                                        <span className="text-[10px] font-bold italic">Ver notas del admin</span>
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-center">
                                            <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-400 text-[10px] font-black uppercase border border-slate-200">
                                                {landing.language || 'ES'}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center justify-end gap-2">
                                                {landing.status === 'approved' ? (
                                                    <div className="flex items-center gap-2">
                                                        <button 
                                                            onClick={() => handleCopy(landing.slug)}
                                                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                                                                copied === landing.slug 
                                                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                                                : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                                                            }`}
                                                        >
                                                            {copied === landing.slug ? <CheckCircle2 className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                                                            {copied === landing.slug ? 'Copiado' : 'Copiar URL'}
                                                        </button>
                                                        <a 
                                                            href={`/l/${landing.slug}`} 
                                                            target="_blank" 
                                                            className="p-2 rounded-xl bg-[#865BFF]/10 text-[#865BFF] hover:bg-[#865BFF] hover:text-white transition-all"
                                                            title="Ver en vivo"
                                                        >
                                                            <ExternalLink className="w-4 h-4" />
                                                        </a>
                                                    </div>
                                                ) : landing.status === 'rejected' ? (
                                                    <div className="flex items-center gap-3">
                                                        {landing.admin_notes && (
                                                            <div className="group relative">
                                                                <div className="p-2 rounded-xl bg-amber-50 text-amber-600 cursor-help">
                                                                    <MessageSquare className="w-4 h-4" />
                                                                </div>
                                                                <div className="absolute bottom-full right-0 mb-2 w-64 p-3 bg-slate-900 text-white text-[10px] rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 shadow-2xl">
                                                                    <div className="font-black text-[#865BFF] uppercase mb-1">Notas del Admin:</div>
                                                                    <p className="font-medium leading-relaxed italic">{landing.admin_notes}</p>
                                                                </div>
                                                            </div>
                                                        )}
                                                        <button 
                                                            onClick={() => router.push(`/dashboard/landing?template=${landing.landing_type}&edit=${landing.id}`)}
                                                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#865BFF] text-white text-xs font-bold shadow-lg shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all"
                                                        >
                                                            <Pencil className="w-3.5 h-3.5" /> Editar y Re-enviar
                                                        </button>
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-2 text-slate-300 italic text-[10px] font-bold uppercase tracking-widest">
                                                        <ShieldCheck className="w-3.5 h-3.5 animate-pulse" />
                                                        En proceso de revisión
                                                    </div>
                                                )}
                                                
                                                <button 
                                                    onClick={() => handleDelete(landing.id)}
                                                    className="p-2 rounded-xl text-slate-300 hover:text-rose-500 hover:bg-rose-50 transition-all ml-2"
                                                    title="Eliminar"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Help/Info Card */}
            <div className="bg-gradient-to-br from-[#865BFF]/5 to-transparent p-8 rounded-[2.5rem] border border-[#865BFF]/10 flex flex-col md:flex-row items-center gap-8">
                <div className="w-20 h-20 rounded-3xl bg-white shadow-xl flex items-center justify-center flex-shrink-0">
                    <ShieldCheck className="w-10 h-10 text-[#865BFF]" />
                </div>
                <div className="flex-1 text-center md:text-left">
                    <h4 className="text-xl font-black text-slate-800 mb-2">Compromiso con la Calidad</h4>
                    <p className="text-sm text-slate-500 font-medium leading-relaxed max-w-2xl">
                        Cada landing page es revisada por nuestro equipo para asegurar que tu marca y la de Bridge Markets se representen con el máximo profesionalismo. El proceso suele tardar menos de 24 horas hábiles.
                    </p>
                </div>
                <button 
                    onClick={() => window.open('https://t.me/BridgeMarketsSupport', '_blank')}
                    className="px-8 py-4 bg-white text-slate-800 border border-slate-200 rounded-[2rem] text-xs font-black shadow-sm hover:shadow-lg transition-all whitespace-nowrap"
                >
                    CONTACTAR SOPORTE
                </button>
            </div>
        </div>
    );
}
