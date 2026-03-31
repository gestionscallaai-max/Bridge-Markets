"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { ArrowLeftRight, Loader2 } from 'lucide-react';

export default function ReportsTransactionsPage() {
    const [items, setItems] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }
            // Combine commissions + withdrawals into a unified transaction list
            const [commsRes, withRes] = await Promise.all([
                supabase.from('commissions').select('id, amount, type, status, created_at').eq('partner_id', user.id),
                supabase.from('withdrawals').select('id, amount, payment_method, status, created_at').eq('partner_id', user.id),
            ]);
            const comms = (commsRes.data || []).map(c => ({ ...c, kind: 'Comisión', description: c.type }));
            const withs = (withRes.data || []).map(w => ({ ...w, kind: 'Retiro', description: w.payment_method }));
            const merged = [...comms, ...withs].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
            setItems(merged);
            setLoading(false);
        }
        fetchData();
    }, []);

    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <ArrowLeftRight className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Transacciones</h2>
                    <p className="text-slate-500 text-sm">Historial completo de comisiones y retiros.</p>
                </div>
            </div>
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[700px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Tipo</th>
                                <th className="px-6 py-4">Descripción</th>
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={5} className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin text-brand-500 mx-auto" /></td></tr>
                            ) : items.length === 0 ? (
                                <tr><td colSpan={5} className="py-16 text-center text-slate-400 text-sm">No hay transacciones aún.</td></tr>
                            ) : items.map(item => (
                                <tr key={item.id + item.kind} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4">
                                        <span className={`px-2.5 py-1 text-xs font-bold rounded border ${item.kind === 'Comisión' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' : 'bg-amber-50 text-amber-600 border-amber-200/60'}`}>{item.kind}</span>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{item.description}</td>
                                    <td className="px-6 py-4 font-bold text-slate-800">${Number(item.amount).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{item.status}</td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(item.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
