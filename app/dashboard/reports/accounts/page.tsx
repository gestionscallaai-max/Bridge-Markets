"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CreditCard, Loader2, User, Mail, Calendar, Diamond, ShieldCheck, Activity } from 'lucide-react';
import { motion } from 'framer-motion';

export default function ReportsAccountsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }
            const { data } = await supabase
                .from('leads')
                .select('*')
                .eq('partner_id', user.id)
                .order('created_at', { ascending: false });
            setLeads(data || []);
            setLoading(false);
        }
        fetchData();
    }, []);

    const statusMap: Record<string, { label: string; color: string; icon: any }> = {
        registered: { label: 'Registrado', color: 'bg-blue-50 text-blue-600 border-blue-100', icon: User },
        funded: { label: 'Fondeado', color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: Diamond },
        trading: { label: 'Operando', color: 'bg-[#865BFF]/5 text-[#865BFF] border-[#865BFF]/10', icon: Activity },
    };

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {/* Page Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d0221] p-8 text-white shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#865BFF] opacity-10 blur-[100px] -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-[#865BFF]/10 flex items-center justify-center border border-[#865BFF]/30 shadow-lg shadow-[#865BFF]/10">
                            <CreditCard className="w-7 h-7 text-[#865BFF]" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight mb-1">Cuentas Operativas</h1>
                            <p className="text-white/50 text-sm font-medium">Monitorea la actividad y el estatus financiero de tus referidos.</p>
                        </div>
                    </div>
                    <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 flex items-center gap-4">
                        <div className="text-right">
                            <div className="text-[10px] font-black uppercase tracking-widest text-white/30">Total Cuentas</div>
                            <div className="text-xl font-black text-white">{leads.length}</div>
                        </div>
                        <div className="w-px h-8 bg-white/10 mx-2"></div>
                        <ShieldCheck className="w-8 h-8 text-[#865BFF] opacity-50" />
                    </div>
                </div>
            </div>

            {/* Table Area */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100">
                                <th className="px-8 py-6">Titular de la Cuenta</th>
                                <th className="px-8 py-6">Detalles de Contacto</th>
                                <th className="px-8 py-6 text-center">Estatus Operativo</th>
                                <th className="px-8 py-6">Apertura</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-[#865BFF] mx-auto mb-4" />
                                        <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">Obteniendo estados financieros...</span>
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-8 py-20 text-center">
                                        <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center mx-auto mb-4 border border-slate-100">
                                            <CreditCard className="w-10 h-10 text-slate-200" />
                                        </div>
                                        <h3 className="text-lg font-bold text-slate-800">No hay cuentas activas</h3>
                                        <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2 font-medium">Las cuentas fondeadas de tus clientes se listarán automáticamente aquí.</p>
                                    </td>
                                </tr>
                            ) : leads.map((lead, idx) => {
                                const s = statusMap[lead.status] || { label: lead.status, color: 'bg-slate-50 text-slate-600 border-slate-100', icon: Activity };
                                return (
                                    <motion.tr 
                                        key={lead.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.03 }}
                                        className="hover:bg-slate-50/80 transition-all group"
                                    >
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs border border-slate-200/50 group-hover:bg-white group-hover:shadow-md transition-all">
                                                    {lead.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="font-bold text-slate-800 text-sm">{lead.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                <Mail className="w-3.5 h-3.5 text-slate-300" />
                                                {lead.email}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5 text-center">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${s.color}`}>
                                                <s.icon className="w-3 h-3" />
                                                {s.label}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-tighter">
                                                <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                                {new Date(lead.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                
                {/* Footer hint */}
                <div className="p-6 bg-slate-50/30 text-center border-t border-slate-100">
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">Datos sincronizados con MetaTrader</p>
                </div>
            </div>
        </div>
    );
}
