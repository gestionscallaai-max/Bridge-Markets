"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Gift, Loader2 } from 'lucide-react';

export default function ReportsRewardsPage() {
    const [commissions, setCommissions] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [total, setTotal] = useState(0);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }
            const { data } = await supabase
                .from('commissions')
                .select('*, leads(name, email)')
                .eq('partner_id', user.id)
                .order('created_at', { ascending: false });
            const rows = data || [];
            setCommissions(rows);
            setTotal(rows.reduce((acc, c) => acc + Number(c.amount), 0));
            setLoading(false);
        }
        fetchData();
    }, []);

    const statusColor: Record<string, string> = {
        pending: 'bg-amber-50 text-amber-600 border-amber-200/60',
        approved: 'bg-blue-50 text-blue-600 border-blue-200/60',
        paid: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        rejected: 'bg-red-50 text-red-600 border-red-200/60',
    };

    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                        <Gift className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Historial de Recompensas</h2>
                        <p className="text-slate-500 text-sm">Comisiones generadas por tu actividad de referidos.</p>
                    </div>
                </div>
                <div className="text-right">
                    <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">Total Acumulado</div>
                    <div className="text-2xl font-bold text-brand-500">${total.toFixed(2)}</div>
                </div>
            </div>

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Cliente Referido</th>
                                <th className="px-6 py-4">Tipo</th>
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={5} className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin text-brand-500 mx-auto" /></td></tr>
                            ) : commissions.length === 0 ? (
                                <tr><td colSpan={5} className="py-16 text-center text-slate-400 text-sm font-medium">Aún no tienes recompensas registradas.</td></tr>
                            ) : commissions.map(c => (
                                <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4 font-semibold text-slate-800 text-sm">{c.leads?.name || '—'}</td>
                                    <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded">{c.type}</span></td>
                                    <td className="px-6 py-4 font-bold text-emerald-600">${Number(c.amount).toFixed(2)}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${statusColor[c.status] || 'bg-slate-50 text-slate-500 border-slate-200'}`}>
                                            {c.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-500">
                                        {new Date(c.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
