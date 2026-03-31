"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Wallet, Loader2, TrendingUp, Clock, CheckCircle2, ArrowUpRight, PlusCircle } from 'lucide-react';
import Link from 'next/link';

export default function AccountBalancePage() {
    const [loading, setLoading] = useState(true);
    const [balance, setBalance] = useState({
        approved: 0,
        pending: 0,
        paid: 0,
    });
    const [recentComms, setRecentComms] = useState<any[]>([]);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            const { data: comms } = await supabase
                .from('commissions')
                .select('amount, status, type, created_at, leads(name)')
                .eq('partner_id', user.id)
                .order('created_at', { ascending: false });

            const rows = comms || [];
            setBalance({
                approved: rows.filter(c => c.status === 'approved').reduce((a, c) => a + Number(c.amount), 0),
                pending: rows.filter(c => c.status === 'pending').reduce((a, c) => a + Number(c.amount), 0),
                paid: rows.filter(c => c.status === 'paid').reduce((a, c) => a + Number(c.amount), 0),
            });
            setRecentComms(rows.slice(0, 5));
            setLoading(false);
        }
        fetchData();
    }, []);

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
        </div>
    );

    const cards = [
        { label: 'Disponible para retirar', value: balance.approved, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' },
        { label: 'Pendiente de aprobación', value: balance.pending, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
        { label: 'Total cobrado', value: balance.paid, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' },
    ];

    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                        <Wallet className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Saldo de Cuenta</h2>
                        <p className="text-slate-500 text-sm">Resumen de tus comisiones y balance disponible.</p>
                    </div>
                </div>
                <Link href="/dashboard/rebates"
                    className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors">
                    <PlusCircle className="w-4 h-4" /> Solicitar Retiro
                </Link>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {cards.map(card => {
                    const Icon = card.icon;
                    return (
                        <div key={card.label} className={`card p-6 border ${card.border}`}>
                            <div className={`w-10 h-10 rounded-lg ${card.bg} flex items-center justify-center mb-4`}>
                                <Icon className={`w-5 h-5 ${card.color}`} />
                            </div>
                            <div className="text-3xl font-bold text-slate-800">${card.value.toFixed(2)}</div>
                            <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide mt-1">{card.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Recent Commissions */}
            <div className="card overflow-hidden">
                <div className="px-6 pt-5 pb-3 border-b border-slate-100 flex items-center justify-between">
                    <h3 className="font-bold text-slate-800 text-sm">Últimas Comisiones</h3>
                    <Link href="/dashboard/reports/rewards" className="text-xs font-semibold text-brand-500 hover:text-brand-600 flex items-center gap-1">Ver todas <ArrowUpRight className="w-3 h-3" /></Link>
                </div>
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                            <th className="px-6 py-3">Cliente</th>
                            <th className="px-6 py-3">Tipo</th>
                            <th className="px-6 py-3">Monto</th>
                            <th className="px-6 py-3">Estado</th>
                            <th className="px-6 py-3">Fecha</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                        {recentComms.length === 0 ? (
                            <tr><td colSpan={5} className="py-12 text-center text-slate-400 text-sm">No hay comisiones registradas aún.</td></tr>
                        ) : recentComms.map(c => (
                            <tr key={c.id} className="hover:bg-slate-50/50 transition-colors">
                                <td className="px-6 py-4 text-sm font-semibold text-slate-700">{c.leads?.name || '—'}</td>
                                <td className="px-6 py-4"><span className="px-2 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded">{c.type}</span></td>
                                <td className="px-6 py-4 font-bold text-emerald-600">${Number(c.amount).toFixed(2)}</td>
                                <td className="px-6 py-4">
                                    <span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${
                                        c.status === 'paid' ? 'bg-emerald-50 text-emerald-700 border-emerald-200/60' :
                                        c.status === 'approved' ? 'bg-blue-50 text-blue-600 border-blue-200/60' :
                                        'bg-amber-50 text-amber-600 border-amber-200/60'
                                    }`}>{c.status}</span>
                                </td>
                                <td className="px-6 py-4 text-sm text-slate-400">{new Date(c.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
