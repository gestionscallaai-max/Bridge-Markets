"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    FileText, CheckCircle2, XCircle, Clock, Eye, 
    Search, Filter, ExternalLink, Loader2, MessageSquare,
    AlertCircle, ChevronRight, User, Globe
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function AdminLandingApprovalPage() {
    const [landings, setLandings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    
    const [selectedLanding, setSelectedLanding] = useState<any>(null);
    const [previewContent, setPreviewContent] = useState<string>('');
    const [adminNotes, setAdminNotes] = useState('');
    const [isProcessing, setIsProcessing] = useState(false);

    useEffect(() => {
        fetchLandings();
    }, []);

    const fetchLandings = async () => {
        setLoading(true);
        try {
            // Join with partners to get partner name
            const { data, error } = await supabase
                .from('landings')
                .select(`
                    *,
                    partners:partner_id (name, email)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLandings(data || []);
        } catch (err) {
            console.error('Error fetching landings:', err);
        } finally {
            setLoading(false);
        }
    };

    const handleUpdateStatus = async (id: string, newStatus: string) => {
        setIsProcessing(true);
        try {
            const res = await fetch('/api/landings', {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    id,
                    status: newStatus,
                    adminNotes: adminNotes
                })
            });

            const json = await res.json();
            if (json.success) {
                setLandings(landings.map(l => l.id === id ? { ...l, status: newStatus, admin_notes: adminNotes } : l));
                setSelectedLanding(null);
                setAdminNotes('');
            } else {
                alert('Error: ' + json.error);
            }
        } catch (err) {
            alert('Error de conexión');
        } finally {
            setIsProcessing(false);
        }
    };

    const filteredLandings = landings.filter(l => {
        const matchesSearch = 
            l.slug.toLowerCase().includes(searchQuery.toLowerCase()) || 
            (l.partners?.name || '').toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = filterStatus === 'all' || l.status === filterStatus;
        return matchesSearch && matchesStatus;
    });

    const pendingCount = landings.filter(l => l.status === 'pending').length;

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">Verificación de <span className="text-[#865BFF]">Landings</span></h1>
                    <p className="text-sm text-slate-400 mt-1">Revisa y aprueba las herramientas de los socios</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar slug o socio..."
                            className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-full md:w-[260px] focus:outline-none focus:ring-2 focus:ring-[#865BFF]/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Stats Overview */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-50 flex items-center justify-center text-amber-500">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Pendientes</div>
                        <div className="text-2xl font-black text-slate-800">{pendingCount}</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-500">
                        <CheckCircle2 className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Aprobadas</div>
                        <div className="text-2xl font-black text-slate-800">{landings.filter(l => l.status === 'approved').length}</div>
                    </div>
                </div>
                <div className="bg-white p-5 rounded-3xl border border-slate-200/60 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center text-slate-400">
                        <FileText className="w-6 h-6" />
                    </div>
                    <div>
                        <div className="text-[10px] font-black uppercase tracking-widest text-slate-400">Total</div>
                        <div className="text-2xl font-black text-slate-800">{landings.length}</div>
                    </div>
                </div>
            </div>

            {/* Filters */}
            <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-2xl border border-slate-200 w-fit">
                {[
                    { id: 'all', label: 'Todas', icon: FileText },
                    { id: 'pending', label: 'Pendientes', icon: Clock },
                    { id: 'approved', label: 'Aprobadas', icon: CheckCircle2 },
                    { id: 'rejected', label: 'Rechazadas', icon: XCircle },
                ].map(tab => (
                    <button
                        key={tab.id}
                        onClick={() => setFilterStatus(tab.id)}
                        className={`flex items-center gap-2 px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                            filterStatus === tab.id 
                            ? 'bg-slate-800 text-white shadow-lg shadow-slate-200' 
                            : 'text-slate-500 hover:bg-white hover:text-slate-800'
                        }`}
                    >
                        <tab.icon className="w-3.5 h-3.5" />
                        {tab.label}
                    </button>
                ))}
            </div>

            {/* List */}
            <div className="grid grid-cols-1 gap-4">
                {filteredLandings.length === 0 ? (
                    <div className="bg-white rounded-[32px] border-2 border-dashed border-slate-200 py-20 text-center">
                        <FileText className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <p className="text-slate-400 font-bold">No se encontraron landings</p>
                    </div>
                ) : (
                    filteredLandings.map(landing => (
                        <div key={landing.id} className="bg-white rounded-[24px] border border-slate-200/60 p-6 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:shadow-xl hover:shadow-indigo-500/5 transition-all group">
                            <div className="flex items-start gap-4 flex-1 min-w-0">
                                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center flex-shrink-0 ${
                                    landing.status === 'approved' ? 'bg-emerald-50 text-emerald-500' :
                                    landing.status === 'rejected' ? 'bg-rose-50 text-rose-500' :
                                    'bg-amber-50 text-amber-500'
                                }`}>
                                    <Globe className="w-6 h-6" />
                                </div>
                                <div className="min-w-0">
                                    <div className="flex items-center gap-3 mb-1">
                                        <h3 className="text-base font-bold text-slate-800 truncate">{landing.slug}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-[9px] font-black uppercase tracking-widest ${
                                            landing.status === 'approved' ? 'bg-emerald-100 text-emerald-700' :
                                            landing.status === 'rejected' ? 'bg-rose-100 text-rose-700' :
                                            'bg-amber-100 text-amber-700'
                                        }`}>
                                            {landing.status === 'pending' ? 'Pendiente' : 
                                             landing.status === 'approved' ? 'Aprobada' : 'Rechazada'}
                                        </span>
                                    </div>
                                    <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                                        <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                            <User className="w-3.5 h-3.5" />
                                            {landing.partners?.name || landing.full_name || 'Socio Independiente'}
                                        </div>
                                        <div className="flex items-center gap-1.5 text-xs text-slate-400 font-medium">
                                            <div className="w-4 h-4 rounded bg-slate-100 flex items-center justify-center text-[8px] font-bold">
                                                {landing.language?.toUpperCase()}
                                            </div>
                                            {landing.landing_type}
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 shrink-0">
                                <button 
                                    onClick={() => {
                                        setSelectedLanding(landing);
                                        setPreviewContent(landing.html);
                                        setAdminNotes(landing.admin_notes || '');
                                    }}
                                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 text-slate-600 hover:bg-slate-200 text-xs font-bold transition-all"
                                >
                                    <Eye className="w-4 h-4" />
                                    Revisar
                                </button>
                                {landing.status !== 'approved' && (
                                    <button 
                                        onClick={() => handleUpdateStatus(landing.id, 'approved')}
                                        className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#865BFF] text-white hover:bg-[#6b3fd6] text-xs font-bold shadow-lg shadow-indigo-500/20 transition-all"
                                    >
                                        <CheckCircle2 className="w-4 h-4" />
                                        Aprobar
                                    </button>
                                )}
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* Review Modal */}
            <AnimatePresence>
                {selectedLanding && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setSelectedLanding(null)}
                            className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm"
                        />
                        <motion.div 
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            className="relative w-full max-w-5xl h-[90vh] bg-white rounded-[32px] shadow-2xl overflow-hidden flex flex-col"
                        >
                            {/* Modal Header */}
                            <div className="p-6 border-b border-slate-100 flex items-center justify-between flex-shrink-0">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-xl bg-[#865BFF]/10 flex items-center justify-center text-[#865BFF]">
                                        <FileText className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h2 className="text-lg font-black text-slate-800">{selectedLanding.slug}</h2>
                                        <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Revisión de Seguridad</p>
                                    </div>
                                </div>
                                <button onClick={() => setSelectedLanding(null)} className="p-2 bg-slate-100 rounded-xl hover:bg-slate-200 text-slate-400 transition-all">
                                    <XCircle className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Modal Content */}
                            <div className="flex-1 flex flex-col md:flex-row min-h-0">
                                {/* Preview Iframe */}
                                <div className="flex-1 bg-slate-100 relative overflow-hidden group">
                                    <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                                        <div className="px-3 py-1 bg-slate-900/80 backdrop-blur-md rounded-full text-white text-[10px] font-black uppercase tracking-widest border border-white/10 flex items-center gap-1.5">
                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                                            Vista Previa en Vivo
                                        </div>
                                    </div>
                                    <iframe 
                                        srcDoc={previewContent} 
                                        className="w-full h-full border-0 shadow-lg"
                                        title="Landing Preview"
                                        sandbox="allow-same-origin allow-scripts"
                                    />
                                </div>

                                {/* Controls Panel */}
                                <div className="w-full md:w-80 border-l border-slate-100 bg-slate-50/50 p-6 flex flex-col overflow-y-auto">
                                    <div className="space-y-6">
                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Info del Socio</label>
                                            <div className="space-y-2">
                                                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                                                    <div className="text-[10px] text-slate-400 font-bold mb-0.5">Nombre</div>
                                                    <div className="text-xs font-black text-slate-800">{selectedLanding.partners?.name}</div>
                                                </div>
                                                <div className="bg-white p-3 rounded-2xl border border-slate-100 shadow-sm">
                                                    <div className="text-[10px] text-slate-400 font-bold mb-0.5">Email</div>
                                                    <div className="text-xs font-bold text-[#865BFF]">{selectedLanding.partners?.email}</div>
                                                </div>
                                            </div>
                                        </div>

                                        <div>
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 block">Notas para el Socio</label>
                                            <textarea 
                                                value={adminNotes}
                                                onChange={(e) => setAdminNotes(e.target.value)}
                                                placeholder="Ej: Por favor elimina el logo no oficial..."
                                                className="w-full bg-white border border-slate-200 rounded-2xl p-4 text-xs font-medium focus:ring-2 focus:ring-[#865BFF]/20 focus:border-[#865BFF] transition-all outline-none resize-none h-40"
                                            />
                                        </div>

                                        <div className="space-y-3 pt-4 border-t border-slate-200/60">
                                            {selectedLanding.status === 'approved' ? (
                                                <div className="w-full flex items-center justify-center gap-2 py-3.5 bg-emerald-50 text-emerald-600 rounded-2xl text-xs font-black border border-emerald-100 italic">
                                                    <CheckCircle2 className="w-4 h-4" />
                                                    Esta landing ya se encuentra activa
                                                </div>
                                            ) : (
                                                <>
                                                    <button 
                                                        disabled={isProcessing}
                                                        onClick={() => handleUpdateStatus(selectedLanding.id, 'approved')}
                                                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-[#865BFF] text-white rounded-2xl text-xs font-black shadow-xl shadow-indigo-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50"
                                                    >
                                                        {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle2 className="w-4 h-4" />}
                                                        Aprobar Publicación
                                                    </button>
                                                    <button 
                                                        disabled={isProcessing}
                                                        onClick={() => handleUpdateStatus(selectedLanding.id, 'rejected')}
                                                        className="w-full flex items-center justify-center gap-2 py-3.5 bg-white text-rose-500 border border-rose-200 rounded-2xl text-xs font-black hover:bg-rose-50 transition-all disabled:opacity-50"
                                                    >
                                                        <XCircle className="w-4 h-4" />
                                                        Rechazar Landing
                                                    </button>
                                                </>
                                            )}
                                        </div>

                                        <div className="bg-amber-50 p-4 rounded-2xl border border-amber-200/50 flex gap-3">
                                            <AlertCircle className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                            <p className="text-[10px] font-bold text-amber-600 leading-relaxed italic">
                                                Al aprobar, la landing será accesible públicamente de inmediato. Al rechazar, el socio recibirá tus notas.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}
