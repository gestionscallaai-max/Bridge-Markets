"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    Users, Shield, ShieldCheck, Search, Filter, 
    MoreHorizontal, ArrowUpRight, Mail, Calendar,
    ChevronLeft, ChevronRight, Loader2, Award
} from 'lucide-react';
import { motion } from 'framer-motion';
import { formatDateUpperCase } from '@/lib/utils';

export default function PartnersManagementPage() {
    const [partners, setPartners] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        fetchPartners();
    }, []);

    async function fetchPartners() {
        setLoading(true);
        try {
            // Fetch partners with counts for landings and leads
            const { data, error } = await supabase
                .from('partners')
                .select(`
                    *,
                    landings:landings(count),
                    leads:leads(count)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            
            // Format data to have simple count numbers
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

    async function toggleRole(partnerId: string, currentRole: string) {
        const newRole = currentRole === 'admin' ? 'partner' : 'admin';
        const confirmMsg = newRole === 'admin' 
            ? '¿Estás seguro de otorgar permisos de ADMINISTRADOR a este partner? Tendrá control total sobre el sistema.'
            : '¿Estás seguro de quitar los permisos de administrador a este usuario?';

        if (!window.confirm(confirmMsg)) return;

        try {
            const { error } = await supabase
                .from('partners')
                .update({ role: newRole })
                .eq('id', partnerId);
            
            if (error) throw error;
            
            // Update local state
            setPartners(partners.map(p => p.id === partnerId ? { ...p, role: newRole } : p));
        } catch (err) {
            alert('Error actualizando rol: ' + (err as any).message);
        }
    }

    const filteredPartners = partners.filter(p => 
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        p.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            {/* Header section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">Gestión de <span className="text-[#865BFF]">Partners</span></h1>
                    <p className="text-sm text-slate-400 mt-1">Administra los roles y niveles de acceso de tu red</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar por nombre o email..."
                            className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-full md:w-[300px] focus:outline-none focus:ring-2 focus:ring-[#865BFF]/20 focus:border-[#865BFF] transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            {/* Partners Table Card */}
            <div className="bg-white rounded-[24px] border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Partner</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">ID & Registro</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Landings</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 text-center">Leads Totales</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Nivel / Rango</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Rol Sistema</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredPartners.map((partner) => (
                                <tr key={partner.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-slate-100 to-slate-200 flex items-center justify-center text-slate-600 font-bold text-xs uppercase shadow-sm">
                                                {partner.name.substring(0, 2)}
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800">{partner.name}</div>
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400 mt-0.5">
                                                    <Mail className="w-3 h-3" />
                                                    {partner.email}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-1">
                                            <div className="text-[11px] font-mono font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded w-fit">
                                                {partner.partner_id || `BM_${partner.id.replace(/-/g, '').substring(0, 24).toUpperCase()}`}
                                            </div>
                                            <div className="flex items-center gap-1 text-[11px] text-slate-400">
                                                <Calendar className="w-3 h-3" />
                                                {formatDateUpperCase(partner.created_at)}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <span className="text-sm font-black text-slate-700">{partner.landingsCount}</span>
                                    </td>
                                    <td className="px-6 py-5 text-center">
                                        <div className="inline-flex items-center justify-center min-w-[32px] h-6 bg-emerald-50 text-emerald-600 rounded-lg text-xs font-black border border-emerald-100">
                                            {partner.leadsCount}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                            partner.tier === 'Gold' ? 'bg-amber-100 text-amber-700' : 
                                            partner.tier === 'Platinum' ? 'bg-indigo-100 text-indigo-700' : 
                                            'bg-slate-100 text-slate-600'
                                        }`}>
                                            <Award className="w-3 h-3" />
                                            {partner.tier || 'Silver'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[11px] font-bold ${
                                            partner.role === 'admin' 
                                                ? 'bg-slate-800 text-white' 
                                                : 'bg-[#865BFF]/10 text-[#865BFF]'
                                        }`}>
                                            {partner.role === 'admin' ? <ShieldCheck className="w-3 h-3" /> : <Shield className="w-3 h-3" />}
                                            {partner.role === 'admin' ? 'Administrador' : 'Partner'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <button 
                                                onClick={() => toggleRole(partner.id, partner.role)}
                                                className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-[#865BFF] transition-all title='Cambiar Rol'"
                                            >
                                                <Shield className="w-4 h-4" />
                                            </button>
                                            <div className="h-4 w-px bg-slate-200" />
                                            <button className="p-2 rounded-lg hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-all">
                                                <MoreHorizontal className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPartners.length === 0 && (
                    <div className="py-20 text-center">
                        <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-slate-400 font-medium">No se encontraron partners</h3>
                    </div>
                )}

                {/* Pagination placeholder */}
                <div className="px-6 py-4 bg-slate-50/30 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-xs text-slate-400 font-medium">Mostrando {filteredPartners.length} de {partners.length} partners</span>
                    <div className="flex items-center gap-2">
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 cursor-not-allowed opacity-50">
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button className="p-2 rounded-lg bg-white border border-slate-200 text-slate-400 cursor-not-allowed opacity-50">
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
