"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BarChart2, Loader2, MousePointerClick, Users, Globe, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Zap, Crown, Shield, Network, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart, Bar, Cell
} from 'recharts';
import { useLanguage } from '@/lib/i18n/context';
import { useAdmin } from '@/lib/context';

export default function ReportsStatsPage() {
    const { t } = useLanguage();
    const { isAdmin } = useAdmin();
    const [stats, setStats] = useState({ leads: 0, clicks: 0, landings: 0, conversionRate: '0%', totalPartners: 0 });
    const [chartData, setChartData] = useState<any[]>([]);
    const [partnerRankings, setPartnerRankings] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            if (isAdmin) {
                // Admin: global network stats
                const [l, c, ln, pr] = await Promise.all([
                    supabase.from('leads').select('*', { count: 'exact', head: true }),
                    supabase.from('clicks').select('*', { count: 'exact', head: true }),
                    supabase.from('landings').select('*', { count: 'exact', head: true }),
                    supabase.from('partners').select('*', { count: 'exact', head: true }),
                ]);

                const leadsCount = l.count || 0;
                const clicksCount = c.count || 0;
                const rate = clicksCount > 0 ? ((leadsCount / clicksCount) * 100).toFixed(1) + '%' : '0%';
                setStats({ leads: leadsCount, clicks: clicksCount, landings: ln.count || 0, conversionRate: rate, totalPartners: pr.count || 0 });

                // Partner rankings
                const { data: leadsData } = await supabase.from('leads').select('partner_id, partners(name)');
                if (leadsData) {
                    const map: Record<string, { name: string; count: number }> = {};
                    leadsData.forEach((l: any) => {
                        const pid = l.partner_id;
                        const name = l.partners?.name || 'Desconocido';
                        if (!map[pid]) map[pid] = { name, count: 0 };
                        map[pid].count++;
                    });
                    setPartnerRankings(Object.values(map).sort((a, b) => b.count - a.count).slice(0, 8));
                }

                const days = [t.reports.dayMon, t.reports.dayTue, t.reports.dayWed, t.reports.dayThu, t.reports.dayFri, t.reports.daySat, t.reports.daySun];
                const mockData = days.map((day) => ({
                    name: day,
                    clicks: Math.floor(clicksCount / 7 * (0.8 + Math.random() * 0.4)),
                    leads: Math.floor(leadsCount / 7 * (0.7 + Math.random() * 0.6))
                }));
                setChartData(mockData);
            } else {
                // Partner View: only their data
                const [l, c, ln] = await Promise.all([
                    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                    supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                    supabase.from('landings').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                ]);

                const leadsCount = l.count || 0;
                const clicksCount = c.count || 0;
                const rate = clicksCount > 0 ? ((leadsCount / clicksCount) * 100).toFixed(1) + '%' : '0%';
                setStats({ leads: leadsCount, clicks: clicksCount, landings: ln.count || 0, conversionRate: rate, totalPartners: 0 });

                const days = [t.reports.dayMon, t.reports.dayTue, t.reports.dayWed, t.reports.dayThu, t.reports.dayFri, t.reports.daySat, t.reports.daySun];
                const mockData = days.map((day) => ({
                    name: day,
                    clicks: Math.floor(clicksCount / 7 * (0.8 + Math.random() * 0.4)),
                    leads: Math.floor(leadsCount / 7 * (0.7 + Math.random() * 0.6))
                }));
                setChartData(mockData);
            }
            setLoading(false);
        }
        fetchData();
    }, [t, isAdmin]);

    // Admin metrics (4 cards including network total)
    const adminMetrics = [
        { label: 'Clicks Totales — Red', value: stats.clicks, icon: MousePointerClick, color: '#865BFF', trend: '+12%', isUp: true },
        { label: 'Leads Capturados — Red', value: stats.leads, icon: Users, color: '#f59e0b', trend: '+5%', isUp: true },
        { label: 'Tasa Conversión Global', value: stats.conversionRate, icon: Activity, color: '#10B981', trend: '-2%', isUp: false },
        { label: 'Partners Activos', value: stats.totalPartners, icon: Network, color: '#3B82F6', trend: 'Red', isUp: true },
    ];

    // Partner View metrics (personal)
    const partnerMetrics = [
        { label: t.reports.totalClicks, value: stats.clicks, icon: MousePointerClick, color: '#865BFF', trend: '+12%', isUp: true },
        { label: t.reports.leadsCapt, value: stats.leads, icon: Users, color: '#FF5B86', trend: '+5%', isUp: true },
        { label: t.reports.convRate, value: stats.conversionRate, icon: Activity, color: '#10B981', trend: '-2%', isUp: false },
        { label: 'Landings', value: stats.landings, icon: Globe, color: '#3B82F6', trend: 'N/A', isUp: true },
    ];

    const metrics = isAdmin ? adminMetrics : partnerMetrics;

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
        </div>
    );

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {/* ── Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-2">
                <div>
                    <div className="flex items-center gap-3 mb-1">
                        {isAdmin
                            ? <Crown className="w-7 h-7 text-amber-500" />
                            : <BarChart2 className="w-8 h-8 text-[#865BFF]" />
                        }
                        <h1 className="text-3xl font-black text-slate-800 tracking-tight">
                            {isAdmin ? 'Estadísticas — Red Global' : t.reports.statsTitle}
                        </h1>
                    </div>
                    <div className={`inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg border ${
                        isAdmin ? 'text-amber-500 bg-amber-50 border-amber-200' : 'text-[#865BFF] bg-[#865BFF]/5 border-[#865BFF]/20'
                    }`}>
                        {isAdmin
                            ? <><Shield className="w-3 h-3" /><span>Vista Administrador — Métricas de toda la red</span></>
                            : <><Eye className="w-3 h-3" /><span>Partner View — Tus métricas personales</span></>}
                    </div>
                    <p className="text-slate-500 font-medium mt-2">
                        {isAdmin ? 'Métricas consolidadas de todos los partners y la red completa' : t.reports.statsSubtitle}
                    </p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="flex -space-x-2">
                        {Array.from({ length: 4 }).map((_, i) => (
                            <div key={i} className={`w-8 h-8 rounded-full border-2 border-white ${isAdmin ? 'bg-amber-200' : 'bg-slate-200'}`} />
                        ))}
                    </div>
                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">
                        {isAdmin ? `${stats.totalPartners} Partners` : `+500 ${t.reports.activeTraders}`}
                    </span>
                </div>
            </div>

            {/* ── Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className={`bg-white rounded-[2.5rem] p-8 border shadow-sm hover:shadow-xl transition-all duration-300 group ${
                            isAdmin ? 'border-amber-500/10 hover:shadow-amber-500/5' : 'border-slate-100 hover:shadow-[#865BFF]/5'
                        }`}>
                        <div className="flex items-start justify-between mb-6">
                            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                                style={{ backgroundColor: `${m.color}10`, color: m.color }}>
                                <m.icon className="w-7 h-7" />
                            </div>
                            <div className={`flex items-center gap-1 text-[10px] font-black px-2 py-1 rounded-full ${m.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {m.isUp ? <ArrowUpRight className="w-3 h-3" /> : <ArrowDownRight className="w-3 h-3" />}
                                {m.trend}
                            </div>
                        </div>
                        <div className="text-4xl font-black text-slate-800 tracking-tighter mb-1">{m.value}</div>
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-[0.1em]">{m.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* ── Charts row */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main chart */}
                <div className={`lg:col-span-2 rounded-[3rem] p-10 text-white shadow-2xl relative overflow-hidden flex flex-col min-h-[450px] ${
                    isAdmin ? 'bg-gradient-to-br from-[#1a0f00] to-[#2d1900]' : 'bg-[#0d0221]'
                }`}>
                    <div className={`absolute top-0 right-0 w-96 h-96 opacity-10 blur-[100px] -mr-48 -mt-48 ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                    <div className="relative z-10 flex items-center justify-between mb-10">
                        <div>
                            <h3 className="text-xl font-bold flex items-center gap-2">
                                <TrendingUp className={`w-5 h-5 ${isAdmin ? 'text-amber-400' : 'text-[#865BFF]'}`} />
                                {isAdmin ? 'Tendencia Semanal — Red Completa' : t.reports.weeklyTrend}
                            </h3>
                            <p className="text-white/40 text-xs mt-1">
                                {isAdmin ? 'Clicks y leads consolidados de toda la red' : t.reports.weeklyTrendDesc}
                            </p>
                        </div>
                        <div className="flex items-center gap-4 bg-white/5 rounded-xl p-1 border border-white/10">
                            <button className={`px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`}>{t.reports.week}</button>
                            <button className="px-4 py-1.5 rounded-lg text-[10px] font-bold uppercase tracking-wider text-white/40 hover:text-white transition-colors">{t.reports.month}</button>
                        </div>
                    </div>
                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={chartData}>
                                <defs>
                                    <linearGradient id="colorClicks" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isAdmin ? '#f59e0b' : '#865BFF'} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={isAdmin ? '#f59e0b' : '#865BFF'} stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorLeads" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isAdmin ? '#fbbf24' : '#FF5B86'} stopOpacity={0.3} />
                                        <stop offset="95%" stopColor={isAdmin ? '#fbbf24' : '#FF5B86'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 700 }} dy={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ backgroundColor: '#0d0221', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="clicks" stroke={isAdmin ? '#f59e0b' : '#865BFF'} strokeWidth={4} fillOpacity={1} fill="url(#colorClicks)" />
                                <Area type="monotone" dataKey="leads" stroke={isAdmin ? '#fbbf24' : '#FF5B86'} strokeWidth={2} fillOpacity={1} fill="url(#colorLeads)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Side panel — different by role */}
                <div className="space-y-8">
                    {isAdmin ? (
                        /* Admin: Top Partners Ranking */
                        <div className="bg-white rounded-[2.5rem] p-8 border border-amber-500/10 shadow-sm">
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Crown className="w-4 h-4 text-amber-500" /> Top Partners
                            </h4>
                            <div className="space-y-3">
                                {partnerRankings.length === 0 ? (
                                    <div className="text-center py-4 text-slate-400 text-sm">Sin datos aún</div>
                                ) : partnerRankings.map((p, i) => (
                                    <div key={i} className="flex items-center gap-3">
                                        <div className={`w-6 h-6 rounded-lg flex items-center justify-center text-[10px] font-black flex-shrink-0 ${
                                            i === 0 ? 'bg-amber-100 text-amber-600' :
                                            i === 1 ? 'bg-slate-100 text-slate-500' :
                                            i === 2 ? 'bg-orange-100 text-orange-500' : 'bg-slate-50 text-slate-400'
                                        }`}>{i + 1}</div>
                                        <div className="flex-1 min-w-0">
                                            <div className="text-xs font-bold text-slate-700 truncate">{p.name}</div>
                                            <div className="w-full h-1.5 bg-slate-100 rounded-full mt-1 overflow-hidden">
                                                <div className="h-full bg-gradient-to-r from-amber-400 to-amber-500 rounded-full"
                                                    style={{ width: `${(p.count / (partnerRankings[0]?.count || 1)) * 100}%` }} />
                                            </div>
                                        </div>
                                        <div className="text-xs font-black text-amber-600 flex-shrink-0">{p.count}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ) : (
                        /* Partner View: Personal performance */
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h4 className="text-sm font-black text-slate-800 uppercase tracking-widest mb-6 flex items-center gap-2">
                                <Zap className="w-4 h-4 text-amber-500" /> {t.reports.proPerfTitle}
                            </h4>
                            <div className="space-y-6">
                                <div>
                                    <div className="flex justify-between text-xs font-bold mb-2 uppercase tracking-tighter">
                                        <span className="text-slate-400">{t.reports.monthlyGoal}</span>
                                        <span className="text-[#865BFF]">{stats.leads} / 100</span>
                                    </div>
                                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5">
                                        <motion.div initial={{ width: 0 }} animate={{ width: `${Math.min(stats.leads, 100)}%` }}
                                            className="h-full bg-gradient-to-r from-[#865BFF] to-[#6335f8] rounded-full" />
                                    </div>
                                </div>
                                <div className="pt-4 grid grid-cols-2 gap-4">
                                    <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.reports.impact}</div>
                                        <div className="text-xl font-black text-slate-800">+{(stats.clicks / 1000).toFixed(1)}k</div>
                                    </div>
                                    <div className="text-center p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                        <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">{t.reports.reach}</div>
                                        <div className="text-xl font-black text-slate-800">Global</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    <div className={`rounded-[2.5rem] p-8 text-white shadow-xl relative overflow-hidden group cursor-pointer ${
                        isAdmin
                            ? 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/20'
                            : 'bg-gradient-to-br from-[#865BFF] to-[#6335f8] shadow-[#865BFF]/20'
                    }`}>
                        <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-white/10 rounded-full group-hover:scale-150 transition-transform duration-700" />
                        <h4 className="text-xl font-black mb-2 relative z-10 leading-tight">
                            {isAdmin ? 'Exportar Reporte Completo' : t.reports.improveTitle}
                        </h4>
                        <p className="text-white/70 text-xs font-medium mb-6 relative z-10">
                            {isAdmin ? 'Descarga métricas de toda la red en CSV' : t.reports.improveDesc}
                        </p>
                        <button className="bg-white text-[#865BFF] px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest shadow-xl group-hover:translate-x-2 transition-all relative z-10">
                            {isAdmin ? 'Exportar CSV' : t.reports.goToAcademy}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
