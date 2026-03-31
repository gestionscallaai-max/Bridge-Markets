"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Percent, Loader2, PlusCircle, X } from 'lucide-react';

export default function DashboardRebatesPage() {
    const [withdrawals, setWithdrawals] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [showForm, setShowForm] = useState(false);
    const [balance, setBalance] = useState(0);
    const [form, setForm] = useState({ amount: '', payment_method: 'crypto_usdt' });
    const [submitting, setSubmitting] = useState(false);

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }
        const [wRes, cRes] = await Promise.all([
            supabase.from('withdrawals').select('*').eq('partner_id', user.id).order('created_at', { ascending: false }),
            supabase.from('commissions').select('amount').eq('partner_id', user.id).eq('status', 'approved'),
        ]);
        setWithdrawals(wRes.data || []);
        setBalance((cRes.data || []).reduce((a, v) => a + Number(v.amount), 0));
        setLoading(false);
    }

    async function handleRequest() {
        setSubmitting(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;
        await supabase.from('withdrawals').insert({
            partner_id: user.id,
            amount: parseFloat(form.amount),
            payment_method: form.payment_method,
            status: 'pending'
        });
        setShowForm(false);
        setForm({ amount: '', payment_method: 'crypto_usdt' });
        await fetchData();
        setSubmitting(false);
    }

    const statusColor: Record<string, string> = {
        pending: 'bg-amber-50 text-amber-600 border-amber-200/60',
        processing: 'bg-blue-50 text-blue-600 border-blue-200/60',
        completed: 'bg-emerald-50 text-emerald-700 border-emerald-200/60',
        rejected: 'bg-red-50 text-red-600 border-red-200/60',
    };

    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-100 flex items-center justify-center text-emerald-600">
                        <Percent className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Reembolsos</h2>
                        <p className="text-slate-500 text-sm">Solicita el retiro de tus comisiones aprobadas.</p>
                    </div>
                </div>
                <div className="flex items-center gap-4">
                    <div className="text-right">
                        <div className="text-xs font-semibold text-slate-400 uppercase">Saldo disponible</div>
                        <div className="text-2xl font-bold text-emerald-600">${balance.toFixed(2)}</div>
                    </div>
                    <button onClick={() => setShowForm(true)} className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors">
                        <PlusCircle className="w-4 h-4" /> Solicitar Reembolso
                    </button>
                </div>
            </div>

            {showForm && (
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800">Nueva Solicitud de Retiro</h3>
                        <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Monto (USD)</label>
                            <input type="number" value={form.amount} onChange={e => setForm({ ...form, amount: e.target.value })}
                                placeholder="Ej. 50.00" className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all" />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Método de Pago</label>
                            <select value={form.payment_method} onChange={e => setForm({ ...form, payment_method: e.target.value })}
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-brand-500 transition-all appearance-none">
                                <option value="crypto_usdt">Crypto (USDT)</option>
                                <option value="bank_transfer">Transferencia Bancaria</option>
                                <option value="paypal">PayPal</option>
                            </select>
                        </div>
                    </div>
                    <div className="mt-4 flex justify-end">
                        <button onClick={handleRequest} disabled={submitting || !form.amount}
                            className="px-6 py-2.5 rounded-lg text-sm font-semibold bg-brand-500 text-white hover:bg-brand-600 transition-all disabled:opacity-50 flex items-center gap-2">
                            {submitting ? <><Loader2 className="w-4 h-4 animate-spin"/> Procesando...</> : 'Enviar Solicitud'}
                        </button>
                    </div>
                </div>
            )}

            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[600px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Monto</th>
                                <th className="px-6 py-4">Método</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4">Fecha</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={4} className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin text-brand-500 mx-auto" /></td></tr>
                            ) : withdrawals.length === 0 ? (
                                <tr><td colSpan={4} className="py-16 text-center text-slate-400 text-sm">No tienes solicitudes de retiro aún.</td></tr>
                            ) : withdrawals.map(w => (
                                <tr key={w.id} className="hover:bg-slate-50/50">
                                    <td className="px-6 py-4 font-bold text-slate-800">${Number(w.amount).toFixed(2)}</td>
                                    <td className="px-6 py-4 text-sm text-slate-600">{w.payment_method?.replace('_', ' ')}</td>
                                    <td className="px-6 py-4"><span className={`px-2.5 py-1 rounded-md text-xs font-bold border ${statusColor[w.status] || 'bg-slate-50 text-slate-500 border-slate-200'}`}>{w.status}</span></td>
                                    <td className="px-6 py-4 text-sm text-slate-500">{new Date(w.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
