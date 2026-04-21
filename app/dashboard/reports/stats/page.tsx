"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { BarChart2, Loader2, MousePointerClick, Users, Globe, TrendingUp, ArrowUpRight, ArrowDownRight, Activity, Zap, Crown, Shield, Network, Eye, Pencil, Check, Clock, Award } from 'lucide-react';
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
    const [monthlyGoal, setMonthlyGoal] = useState(100);
    const [isEditingGoal, setIsEditingGoal] = useState(false);
    const [savingGoal, setSavingGoal] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [partnerId, setPartnerId] = useState('');

    useEffect(() => {
        setMounted(true);
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            // Fetch current goal and identity
            const { data: partnerData } = await supabase.from('partners').select('monthly_goal, partner_id').eq('id', user.id).single();
            if (partnerData?.monthly_goal) setMonthlyGoal(partnerData.monthly_goal);
            if (partnerData?.partner_id) setPartnerId(partnerData.partner_id);

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

                // Aggregating real daily data for the chart (Global)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const [clicksRes, leadsRes] = await Promise.all([
                    supabase.from('clicks')
                        .select('created_at')
                        .gte('created_at', sevenDaysAgo.toISOString()),
                    supabase.from('leads')
                        .select('created_at')
                        .gte('created_at', sevenDaysAgo.toISOString())
                ]);

                const dayMap: any[] = [];
                const now = new Date();
                
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(now);
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toISOString().split('T')[0];
                    
                    const dayClicks = clicksRes.data?.filter(c => c.created_at.startsWith(dateStr)).length || 0;
                    const dayLeads = leadsRes.data?.filter(l => l.created_at.startsWith(dateStr)).length || 0;
                    
                    dayMap.push({
                        name: d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase(),
                        clicks: dayClicks,
                        leads: dayLeads
                    });
                }
                setChartData(dayMap);
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

                // Aggregating real daily data for the chart
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                const [clicksRes, leadsRes] = await Promise.all([
                    supabase.from('clicks')
                        .select('created_at')
                        .gte('created_at', sevenDaysAgo.toISOString())
                        .eq('partner_id', user.id),
                    supabase.from('leads')
                        .select('created_at')
                        .gte('created_at', sevenDaysAgo.toISOString())
                        .eq('partner_id', user.id)
                ]);

                const dayMap: any[] = [];
                const now = new Date();
                
                for (let i = 6; i >= 0; i--) {
                    const d = new Date(now);
                    d.setDate(d.getDate() - i);
                    const dateStr = d.toISOString().split('T')[0];
                    
                    const dayClicks = clicksRes.data?.filter(c => c.created_at.startsWith(dateStr)).length || 0;
                    const dayLeads = leadsRes.data?.filter(l => l.created_at.startsWith(dateStr)).length || 0;
                    
                    dayMap.push({
                        name: d.toLocaleDateString(undefined, { weekday: 'short' }).toUpperCase(),
                        clicks: dayClicks,
                        leads: dayLeads
                    });
                }
                setChartData(dayMap);
            }
            setLoading(false);
        }
        fetchData();
    }, [t, isAdmin]);

    const handleSaveGoal = async () => {
        setSavingGoal(true);
        try {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                await supabase.from('partners').update({ monthly_goal: monthlyGoal }).eq('id', user.id);
                setIsEditingGoal(false);
            }
        } catch (error) {
            console.error('Error saving goal:', error);
        }
        setSavingGoal(false);
    };

    // Admin metrics (4 cards including network total)
    const adminMetrics = [
        { label: 'Clicks Totales - Red', value: stats.clicks, icon: MousePointerClick, color: '#865BFF', trend: '+12%', isUp: true },
        { label: 'Leads Capturados - Red', value: stats.leads, icon: Users, color: '#f59e0b', trend: '+5%', isUp: true },
        { label: 'TASA CONVERSIÓN REGISTRADO', value: stats.conversionRate, icon: Activity, color: '#10B981', trend: '-2%', isUp: false },
        { label: 'Partners Activos', value: stats.totalPartners, icon: Network, color: '#3B82F6', trend: 'Red', isUp: true },
    ];

    // Partner View metrics (personal)
    const partnerMetrics = [
        { label: t.reports.totalClicks, value: stats.clicks, icon: MousePointerClick, color: '#865BFF', trend: '+12%', isUp: true },
        { label: t.reports.leadsCapt, value: stats.leads, icon: Users, color: '#FF5B86', trend: '+5%', isUp: true },
        { label: 'TASA CONVERSIÓN REGISTRADO', value: stats.conversionRate, icon: Activity, color: '#10B981', trend: '-2%', isUp: false },
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
            {/* -- Header Banner */}
            <div className={`relative rounded-[2.5rem] p-8 text-white shadow-2xl border z-20 ${
                isAdmin ? 'bg-gradient-to-br from-[#1a0f00] to-[#2d1900] border-amber-500/20' : 'bg-[#0d0221] border-white/5'
            }`}>
                {/* Background Effects Container */}
                <div className="absolute inset-0 overflow-hidden rounded-[2.5rem] pointer-events-none">
                    <div className={`absolute top-0 right-0 w-96 h-96 opacity-10 blur-[100px] -mr-48 -mt-48 ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                </div>

                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                            isAdmin ? 'bg-amber-500/10 border-amber-500/30 shadow-amber-500/10' : 'bg-[#865BFF]/10 border-[#865BFF]/30 shadow-[#865BFF]/10'
                        }`}>
                            {isAdmin ? <Crown className="w-7 h-7 text-amber-400" /> : <BarChart2 className="w-7 h-7 text-[#865BFF]" />}
                        </div>
                        <div>
                            <div className={`text-[9px] font-medium uppercase tracking-widest mb-1 px-2 py-0.5 rounded-md border inline-block ${
                                isAdmin ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-[#865BFF] bg-[#865BFF]/10 border-[#865BFF]/20'
                            }`}>
                                {isAdmin
                                    ? <><Shield className="w-3 h-3" /><span>Vista Administrador - Red Global</span></>
                                    : <><Eye className="w-3 h-3" /><span>Partner View - Tus Métricas</span></>}
                            </div>
                            <h1 className="text-2xl font-medium tracking-tight mt-1">
                                {isAdmin ? 'Análisis de Red' : t.reports.statsTitle}
                            </h1>
                            <p className="text-white/50 text-sm font-medium">
                                {isAdmin ? 'Métricas consolidadas de todos los partners y la red completa' : t.reports.statsSubtitle}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-[#865BFF]/10 border-[#865BFF]/20 text-[#865BFF]'}`}>
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {mounted && new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase().replace('.', '')}
                            </span>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/10 border-white/10 text-white'}`}>
                            {isAdmin ? <Network className="w-4 h-4" /> : <Award className="w-4 h-4 text-[#865BFF]" />}
                            <span className="text-xs font-mono font-bold tracking-tight">
                                {isAdmin ? `${stats.totalPartners} PARTNERS` : partnerId}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* -- Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {metrics.map((m, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1 }}
                        className={`bg-white rounded-[2.5rem] p-8 border shadow-sm hover:shadow-xl transition-all duration-300 group ${
                            isAdmin ? 'border-amber-500/10 hover:shadow-amber-500/5' : 'border-slate-100 hover:shadow-[#865BFF]/5'
                        }`}>
                        <div className="flex items-start justify-between mb-4">
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500`}
                                style={{ backgroundColor: `${m.color}10`, color: m.color }}>
                                <m.icon className="w-5 h-5" strokeWidth={1.5} />
                            </div>
                            <div className={`flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-lg ${m.isUp ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600'}`}>
                                {m.isUp ? <ArrowUpRight className="w-2.5 h-2.5" /> : <ArrowDownRight className="w-2.5 h-2.5" />}
                                {m.trend}
                            </div>
                        </div>
                        <div className="text-xl font-semibold text-slate-800 tracking-tight mb-0.5">{m.value}</div>
                        <div className="text-[11px] font-normal text-slate-400 uppercase tracking-wide">{m.label}</div>
                    </motion.div>
                ))}
            </div>

            {/* -- Charts row */}
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
                                {isAdmin ? 'Tendencia Semanal - Red Completa' : t.reports.weeklyTrend}
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

                {/* Side panel - different by role */}
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
                                        <div className="flex items-center gap-2">
                                            {isEditingGoal ? (
                                                <div className="flex items-center gap-2 bg-white shadow-lg border border-[#865BFF]/20 rounded-xl px-2 py-1 -mt-1">
                                                    <input 
                                                        type="number" 
                                                        value={monthlyGoal} 
                                                        onChange={(e) => setMonthlyGoal(parseInt(e.target.value))}
                                                        className="w-16 bg-transparent text-sm font-black text-[#865BFF] focus:outline-none"
                                                        autoFocus
                                                    />
                                                    <button 
                                                        onClick={handleSaveGoal} 
                                                        disabled={savingGoal} 
                                                        className="w-7 h-7 rounded-lg bg-emerald-500 text-white flex items-center justify-center hover:bg-emerald-600 transition-colors shadow-sm"
                                                    >
                                                        {savingGoal ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-4 h-4" />}
                                                    </button>
                                                </div>
                                            ) : (
                                                <div className="flex items-center gap-2">
                                                    <span className="text-sm font-black text-[#865BFF] bg-[#865BFF]/5 px-2 py-0.5 rounded-lg border border-[#865BFF]/10">
                                                        {stats.leads} / {monthlyGoal}
                                                    </span>
                                                    <button 
                                                        onClick={() => setIsEditingGoal(true)} 
                                                        className="w-7 h-7 rounded-lg bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-[#865BFF] hover:text-white transition-all shadow-sm"
                                                        title="Editar meta"
                                                    >
                                                        <Pencil className="w-3.5 h-3.5" />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                    <div className="w-full h-3 bg-slate-50 rounded-full overflow-hidden border border-slate-100 p-0.5 shadow-inner">
                                        <motion.div 
                                            initial={{ width: 0 }} 
                                            animate={{ width: `${Math.min((stats.leads / (monthlyGoal || 1)) * 100, 100)}%` }}
                                            className="h-full bg-gradient-to-r from-[#865BFF] to-[#6335f8] rounded-full shadow-[0_0_10px_rgba(134,91,255,0.3)]" 
                                        />
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
                </div>
            </div>
        </div>
    );
}
