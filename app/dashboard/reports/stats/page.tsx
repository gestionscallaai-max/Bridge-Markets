"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BarChart2, Loader2, MousePointerClick, Users, Globe, DollarSign } from 'lucide-react';

export default function ReportsStatsPage() {
    const [stats, setStats] = useState({ leads: 0, clicks: 0, landings: 0, conversionRate: '0%' });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            const [l, c, ln] = await Promise.all([
                supabase.from('leads').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                supabase.from('landings').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
            ]);
            
            const leadsCount = l.count || 0;
            const clicksCount = c.count || 0;
            const rate = clicksCount > 0 ? ((leadsCount / clicksCount) * 100).toFixed(1) + '%' : '0%';

            setStats({
                leads: leadsCount,
                clicks: clicksCount,
                landings: ln.count || 0,
                conversionRate: rate,
            });
            setLoading(false);
        }
        fetchData();
    }, []);

    const cards = [
        { label: 'Clics Totales', value: stats.clicks, icon: MousePointerClick, color: 'text-blue-600', bg: 'bg-blue-50' },
        { label: 'Leads Registrados', value: stats.leads, icon: Users, color: 'text-purple-600', bg: 'bg-purple-50' },
        { label: 'Tasa de Conversión', value: stats.conversionRate, icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
        { label: 'Landing Pages', value: stats.landings, icon: Globe, color: 'text-amber-600', bg: 'bg-amber-50' },
    ];

    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <BarChart2 className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Estadísticas de Rendimiento</h2>
                    <p className="text-slate-500 text-sm">Métricas clave de tu actividad como afiliado.</p>
                </div>
            </div>

            {loading ? (
                <div className="flex justify-center py-20"><Loader2 className="w-8 h-8 animate-spin text-brand-500" /></div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {cards.map(card => {
                        const Icon = card.icon;
                        return (
                            <div key={card.label} className="card p-6 flex flex-col gap-3">
                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${card.bg} ${card.color}`}>
                                    <Icon className="w-5 h-5" />
                                </div>
                                <div className="text-3xl font-bold text-slate-800">{card.value}</div>
                                <div className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{card.label}</div>
                            </div>
                        );
                    })}
                </div>
            )}
        </div>
    );
}
