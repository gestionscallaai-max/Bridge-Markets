"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CreditCard, Loader2 } from 'lucide-react';

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

    const statusMap: Record<string, { label: string; color: string }> = {
        registered: { label: 'Registrado', color: 'bg-blue-50 text-blue-600 border-blue-200/60' },
        funded: { label: 'Fondeado', color: 'bg-emerald-50 text-emerald-700 border-emerald-200/60' },
        trading: { label: 'Operando', color: 'bg-purple-50 text-purple-700 border-purple-200/60' },
    };

    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <CreditCard className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Cuentas del Cliente</h2>
                    <p className="text-slate-500 text-sm">Estado de las cuentas de los clientes referidos por ti.</p>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Cliente</th>
                                <th className="px-6 py-4">Email</th>
                                <th className="px-6 py-4">Estado de Cuenta</th>
                                <th className="px-6 py-4">Fecha de Registro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={4} className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin text-brand-500 mx-auto" /></td></tr>
                            ) : leads.length === 0 ? (
                                <tr><td colSpan={4} className="py-16 text-center text-slate-400 text-sm font-medium">No hay cuentas de clientes aún.</td></tr>
                            ) : leads.map(lead => {
                                const s = statusMap[lead.status] || { label: lead.status, color: 'bg-slate-50 text-slate-600 border-slate-200' };
                                return (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{lead.name}</td>
                                        <td className="px-6 py-4 text-sm text-slate-500">{lead.email}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${s.color}`}>{s.label}</span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {new Date(lead.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
