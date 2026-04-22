"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    Users, Shield, ShieldCheck, Search, Filter, 
    MoreHorizontal, ArrowUpRight, Mail, Calendar,
    ChevronLeft, ChevronRight, Loader2, Award
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { formatDateUpperCase } from '@/lib/utils';

export default function PartnersManagementPage() {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [showConfirmModal, setShowConfirmModal] = useState<{show: boolean, partner: any, targetRole: string}>({
        show: false,
        partner: null,
        targetRole: ''
    });

    const [isProcessing, setIsProcessing] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        fetchPartners();
    }, []);

    async function fetchPartners() {
        setLoading(true);
        try {
            const { data, error } = await supabase
                .from('partners')
                .select(`
                    *,
                    landings:landings(count),
                    leads:leads(count)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            const formattedPartners = (data || []).map(p => ({
                ...p,
                landingsCount: p.landings?.[0]?.count || 0,
                leadsCount: p.leads?.[0]?.count || 0
            }));

            setPartners(formattedPartners);
        } catch (err) {
            console.error('Error fetching partners:', err);
        }
        setLoading(false);
    }

    const openRoleModal = (partner: any) => {
        const targetRole = partner.role === 'admin' ? 'partner' : 'admin';
        setShowConfirmModal({
            show: true,
            partner,
            targetRole
        });
    };

    async function handleConfirmRole() {
        if (!showConfirmModal.partner) return;
        
        setIsProcessing(true);
        const { partner, targetRole } = showConfirmModal;

        try {
            // Get current user to prevent self-demotion without warning
            const { data: { user } } = await supabase.auth.getUser();
            if (user?.id === partner.id && targetRole !== 'admin') {
                const proceed = window.confirm('Estás a punto de quitarte tus propios permisos de administrador. Perderás acceso a este panel inmediatamente. ¿Deseas continuar?');
                if (!proceed) {
                    setIsProcessing(false);
                    return;
                }
            }

            const { error } = await supabase
                .from('partners')
                .update({ role: targetRole })
                .eq('id', partner.id);
            
            if (error) throw error;
            
            // Success feedback
            setPartners(partners.map(p => p.id === partner.id ? { ...p, role: targetRole } : p));
            setShowConfirmModal({ show: false, partner: null, targetRole: '' });
            
            // If the user changed their own role, we might want to reload to update global context
            if (user?.id === partner.id) {
                window.location.reload();
            }
        } catch (err) {
            alert('Error actualizando rol: ' + (err as any).message);
        } finally {
            setIsProcessing(false);
        }
    }

    const filteredPartners = partners.filter(p => 
        (p.name || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
        (p.email || '').toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalPages = Math.ceil(filteredPartners.length / itemsPerPage);
    const paginatedPartners = filteredPartners.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Reset to page 1 when search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [searchQuery]);

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <div className="relative">
                    <div className="w-16 h-16 border-4 border-[#865BFF]/20 border-t-[#865BFF] rounded-full animate-spin"></div>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <Users className="w-6 h-6 text-[#865BFF] animate-pulse" />
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                <div>
                    <h1 className="text-3xl font-black text-slate-900 tracking-tight">Gestión de <span className="bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] bg-clip-text text-transparent">Partners</span></h1>
                    <p className="text-sm text-slate-400 mt-1 font-medium italic">Administra los roles y niveles de acceso de tu red institucional</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-300 group-focus-within:text-[#865BFF] transition-colors" />
                        <input 
                            type="text" 
                            placeholder="Buscar socio por nombre..."
                            className="bg-white border border-slate-200/60 rounded-2xl pl-12 pr-6 py-3.5 text-sm w-full md:w-[340px] focus:outline-none focus:ring-4 focus:ring-[#865BFF]/5 focus:border-[#865BFF] transition-all shadow-sm"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Partners Table Card */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[32px] border border-slate-200/50 shadow-[0_20px_50px_rgba(0,0,0,0.02)] overflow-hidden"
            >
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/40 border-b border-slate-100/60">
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Socio</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Identificación</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Landings</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">Leads</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Rango</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Acceso</th>
                                <th className="px-8 py-5 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {paginatedPartners.map((partner, idx) => (
                                <motion.tr 
                                    key={partner.id} 
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.05 }}
                                    className="hover:bg-slate-50/50 transition-all duration-300 group"
                                >
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-4">
                                            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#865BFF]/10 to-[#6b3fd6]/5 flex items-center justify-center text-[#865BFF] font-black text-sm uppercase shadow-inner group-hover:scale-110 transition-transform duration-500">
                                                {partner.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-black text-slate-800 group-hover:text-[#865BFF] transition-colors">{partner.name}</div>
                                                <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-bold mt-1">
                                                    <Mail className="w-3 h-3 text-[#865BFF]/40" />
                                                    {partner.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex flex-col gap-1.5">
                                            <div className="text-[10px] font-mono font-black text-slate-400 bg-slate-100/50 px-2.5 py-1 rounded-lg w-fit border border-slate-200/50">
                                                {partner.partner_id || `BM_${partner.id.replace(/-/g, '').substring(0, 16).toUpperCase()}`}
                                            </div>
                                            <div className="flex items-center gap-1.5 text-[10px] text-slate-300 font-bold uppercase tracking-widest">
                                                <Calendar className="w-3 h-3" />
                                                {formatDateUpperCase(partner.created_at)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-slate-50 text-slate-800 text-sm font-black border border-slate-100 group-hover:bg-white transition-colors">
                                            {partner.landingsCount}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6 text-center">
                                        <div className="inline-flex items-center justify-center min-w-[40px] h-10 bg-emerald-50 text-emerald-600 rounded-xl text-xs font-black border border-emerald-100 group-hover:shadow-lg group-hover:shadow-emerald-500/10 transition-all">
                                            {partner.leadsCount}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] border transition-all ${
                                            partner.tier === 'Gold' ? 'bg-amber-50 text-amber-600 border-amber-100 shadow-sm shadow-amber-500/5' : 
                                            partner.tier === 'Platinum' ? 'bg-indigo-50 text-indigo-600 border-indigo-100 shadow-sm shadow-indigo-500/5' : 
                                            'bg-slate-50 text-slate-500 border-slate-100 shadow-sm shadow-slate-500/5'
                                        }`}>
                                            <Award className={`w-3.5 h-3.5 ${partner.tier === 'Gold' ? 'animate-pulse' : ''}`} />
                                            {partner.tier || 'Silver'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl text-[10px] font-black uppercase tracking-[0.1em] transition-all shadow-sm ${
                                            partner.role === 'admin' 
                                                ? 'bg-slate-900 text-white border border-slate-800' 
                                                : 'bg-white text-[#865BFF] border border-[#865BFF]/20 shadow-[#865BFF]/5'
                                        }`}>
                                            {partner.role === 'admin' ? <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" /> : <Shield className="w-3.5 h-3.5 opacity-50" />}
                                            {partner.role === 'admin' ? 'Administrador' : 'Partner'}
                                        </div>
                                    </td>
                                    <td className="px-8 py-6">
                                        <div className="flex items-center gap-3">
                                            <button 
                                                onClick={() => openRoleModal(partner)}
                                                className={`p-3 rounded-2xl transition-all duration-300 ${
                                                    partner.role === 'admin' 
                                                    ? 'bg-rose-50 text-rose-500 hover:bg-rose-500 hover:text-white hover:shadow-lg hover:shadow-rose-500/20' 
                                                    : 'bg-emerald-50 text-emerald-500 hover:bg-emerald-500 hover:text-white hover:shadow-lg hover:shadow-emerald-500/20'
                                                }`}
                                                title={partner.role === 'admin' ? 'Quitar Admin' : 'Hacer Admin'}
                                            >
                                                {partner.role === 'admin' ? <Shield className="w-4.5 h-4.5" /> : <ShieldCheck className="w-4.5 h-4.5" />}
                                            </button>
                                            <button className="p-3 rounded-2xl bg-slate-50 text-slate-400 hover:bg-slate-800 hover:text-white transition-all duration-300">
                                                <MoreHorizontal className="w-4.5 h-4.5" />
                                            </button>
                                        </div>
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPartners.length === 0 && (
                    <div className="py-24 text-center">
                        <div className="w-20 h-20 bg-slate-50 rounded-[40%] flex items-center justify-center mx-auto mb-6">
                            <Users className="w-10 h-10 text-slate-200" />
                        </div>
                        <h3 className="text-slate-900 font-black text-lg">Sin resultados</h3>
                        <p className="text-slate-400 text-sm mt-1 max-w-xs mx-auto">No hay socios que coincidan con tu búsqueda actual.</p>
                    </div>
                )}

                {/* Pagination */}
                <div className="px-8 py-6 bg-slate-50/20 border-t border-slate-100/60 flex items-center justify-between">
                    <span className="text-[10px] text-slate-400 font-black uppercase tracking-widest italic">
                        Mostrando <span className="text-slate-800">{paginatedPartners.length}</span> de <span className="text-slate-800">{filteredPartners.length}</span> socios
                    </span>
                    <div className="flex items-center gap-3">
                        <button 
                            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                            disabled={currentPage === 1}
                            className={`p-2.5 rounded-xl bg-white border border-slate-200 transition-all ${currentPage === 1 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:border-[#865BFF] hover:text-[#865BFF] shadow-sm'}`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        
                        <div className="flex items-center gap-1">
                            {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                                <button
                                    key={page}
                                    onClick={() => setCurrentPage(page)}
                                    className={`w-9 h-9 rounded-xl text-[11px] font-black transition-all ${
                                        currentPage === page 
                                            ? 'bg-[#865BFF] text-white shadow-lg shadow-[#865BFF]/20' 
                                            : 'bg-white text-slate-400 border border-slate-200 hover:border-slate-300'
                                    }`}
                                >
                                    {page}
                                </button>
                            ))}
                        </div>

                        <button 
                            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                            disabled={currentPage === totalPages || totalPages === 0}
                            className={`p-2.5 rounded-xl bg-white border border-slate-200 transition-all ${currentPage === totalPages || totalPages === 0 ? 'text-slate-300 cursor-not-allowed' : 'text-slate-600 hover:border-[#865BFF] hover:text-[#865BFF] shadow-sm'}`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Custom Confirmation Modal */}
            <AnimatePresence>
                {showConfirmModal.show && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
                        <motion.div 
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => !isProcessing && setShowConfirmModal({...showConfirmModal, show: false})}
                            className="absolute inset-0 bg-slate-900/40 backdrop-blur-md"
                        />
                        <motion.div 
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-md bg-white rounded-[40px] shadow-2xl overflow-hidden p-10 text-center"
                        >
                            <div className={`w-20 h-20 rounded-[35%] mx-auto mb-8 flex items-center justify-center ${
                                showConfirmModal.targetRole === 'admin' ? 'bg-emerald-50 text-emerald-500' : 'bg-rose-50 text-rose-500'
                            }`}>
                                {showConfirmModal.targetRole === 'admin' ? <ShieldCheck className="w-10 h-10" /> : <Shield className="w-10 h-10" />}
                            </div>
                            
                            <h2 className="text-2xl font-black text-slate-900 mb-4 tracking-tight leading-tight uppercase italic">
                                {showConfirmModal.targetRole === 'admin' ? 'Elevar a Administrador' : 'Restringir Acceso'}
                            </h2>
                            
                            <p className="text-slate-500 text-sm font-medium leading-relaxed mb-10 px-4 italic">
                                {showConfirmModal.targetRole === 'admin' 
                                    ? `¿Estás seguro de otorgar control total a ${showConfirmModal.partner.name}? Podrá gestionar otros socios y configuraciones globales.`
                                    : `¿Estás seguro de quitar los permisos de administrador a ${showConfirmModal.partner.name}? Volverá a ser un partner regular.`}
                            </p>

                            <div className="flex flex-col gap-3">
                                <button 
                                    disabled={isProcessing}
                                    onClick={handleConfirmRole}
                                    className={`w-full py-5 rounded-2xl text-xs font-black uppercase tracking-widest shadow-xl transition-all active:scale-95 flex items-center justify-center gap-2 italic ${
                                        showConfirmModal.targetRole === 'admin' 
                                        ? 'bg-emerald-500 text-white shadow-emerald-500/20 hover:bg-emerald-600' 
                                        : 'bg-rose-500 text-white shadow-rose-500/20 hover:bg-rose-600'
                                    }`}
                                >
                                    {isProcessing ? <Loader2 className="w-4 h-4 animate-spin" /> : <CheckCircle className="w-4 h-4" />}
                                    {showConfirmModal.targetRole === 'admin' ? 'Sí, Otorgar Permisos' : 'Sí, Quitar Permisos'}
                                </button>
                                <button 
                                    disabled={isProcessing}
                                    onClick={() => setShowConfirmModal({...showConfirmModal, show: false})}
                                    className="w-full py-5 text-slate-400 text-xs font-black uppercase tracking-widest hover:text-slate-600 transition-colors italic"
                                >
                                    Cancelar
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
}

// Helper icons missing in imports
function CheckCircle(props: any) {
    return (
        <svg {...props} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-check-circle"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>
    )
}
