"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
    BarChart as RechartsBarChart, Bar, Cell
} from 'recharts';
import {
    Users, Globe2, MousePointerClick,
    Activity, ChevronRight, ExternalLink,
    Globe, Zap, BarChart2, Award, Clock, TrendingUp, Sparkles,
    Shield, Crown, Network, Target, Star, Eye, Pencil, Link2
} from 'lucide-react';
import { useAdmin, useRole } from '@/lib/context';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/lib/i18n/context';

export default function OverviewPage() {
    const router = useRouter();
    const { isAdmin } = useAdmin();
    const { userRole } = useRole();
    const { t, lang } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [partnerId, setPartnerId] = useState('BM_PARTNER_01');
    const [partnerName, setPartnerName] = useState('');
    const [totalPartners, setTotalPartners] = useState(0);
    const [stats, setStats] = useState({
        leads: 0,
        clicks: 0,
        landings: 0,
        conversionRate: 0,
        weeklyData: [] as { day: string; count: number }[],
        countryData: [] as { country: string; count: number }[],
        landingPerformance: [] as { slug: string; leads: number; clicks: number; cr: number }[],
    });
    const [topPartners, setTopPartners] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    const DAY_NAMES: Record<string, string[]> = {
        es: ['DOM', 'LUN', 'MAR', 'MIÉ', 'JUE', 'VIE', 'SÁB'],
        en: ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'],
        zh: ['日', '一', '二', '三', '四', '五', '六'],
        hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
        fr: ['DIM', 'LUN', 'MAR', 'MER', 'JEU', 'VEN', 'SAM'],
        ar: ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
        bn: ['রবি', 'সোম', 'মঙ্গ', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
        pt: ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SÁB'],
        ru: ['ВС', 'ПН', 'ВТ', 'СР', 'ЧТ', 'ПТ', 'СБ'],
        ja: ['日', '月', '火', '水', '木', '金', '土'],
    };

    const days = DAY_NAMES[lang] || DAY_NAMES['es'];

    useEffect(() => {
        setMounted(true);
        async function fetchStats() {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) {
                setLoading(false);
                return;
            }

            try {
                // ── Parallelized Initial Queries: Partner identity and total counts
                const [p_res, l, c, ln] = await Promise.all([
                    supabase.from('partners').select('name, role, partner_id').eq('id', user.id).single(),
                    (isAdmin ? supabase.from('leads').select('*', { count: 'exact', head: true }) : supabase.from('leads').select('*', { count: 'exact', head: true }).eq('partner_id', user.id)),
                    (isAdmin ? supabase.from('clicks').select('*', { count: 'exact', head: true }) : supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('partner_id', user.id)),
                    (isAdmin ? supabase.from('landings').select('*', { count: 'exact', head: true }) : supabase.from('landings').select('*', { count: 'exact', head: true }).eq('partner_id', user.id))
                ]);

                if (p_res.data) {
                    const p = p_res.data;
                    if (p.name) setPartnerName(p.name);
                    setPartnerId(p.partner_id || ('BM_' + user.id.replace(/-/g, '').substring(0, 24).toUpperCase()));
                }

                // Global CR computation
                const globalCR = c.count ? (l.count! / c.count) * 100 : 0;

                // ── Sequential Admin Data (If needed, can also be parallelized if we know in advance)
                let topPartnersData = [];
                if (isAdmin) {
                    const [pCount, topLeads] = await Promise.all([
                        supabase.from('partners').select('*', { count: 'exact', head: true }),
                        supabase.from('leads').select('partner_id, partners(name)').limit(200)
                    ]);
                    setTotalPartners(pCount.count || 0);

                    if (topLeads.data) {
                        const countMap: Record<string, { name: string; count: number }> = {};
                        topLeads.data.forEach((lead: any) => {
                            const pid = lead.partner_id;
                            const name = lead.partners?.name || 'Unknown';
                            if (!countMap[pid]) countMap[pid] = { name, count: 0 };
                            countMap[pid].count++;
                        });
                        topPartnersData = Object.values(countMap).sort((a, b) => b.count - a.count).slice(0, 5);
                        setTopPartners(topPartnersData);
                    }
                }

                // ── Parallelized Historical & Performance Data (Last 7 Days)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                let actQuery = supabase.from('leads').select('created_at, country, landing_slug').gte('created_at', sevenDaysAgo.toISOString());
                let geoQuery = supabase.from('clicks').select('country, landing_slug').gte('created_at', sevenDaysAgo.toISOString());

                if (!isAdmin) {
                    actQuery = actQuery.eq('partner_id', user.id);
                    geoQuery = geoQuery.eq('partner_id', user.id);
                }

                const [hLeads, hClicks] = await Promise.all([actQuery, geoQuery]);
                const leadsData = hLeads.data || [];
                const clicksGeoData = hClicks.data || [];

                const activityMap: Record<string, number> = {};
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    activityMap[days[d.getDay()]] = 0;
                }

                const countryStats: Record<string, { leads: number; clicks: number; topPartner?: string }> = {};
                const perfMap: Record<string, { leads: number; clicks: number }> = {};

                leadsData.forEach(lead => {
                    const d = new Date(lead.created_at);
                    const dayName = days[d.getDay()];
                    if (activityMap[dayName] !== undefined) activityMap[dayName]++;

                    // Performance grouping
                    const slug = (lead as any).landing_slug || (lead as any).slug || 'N/A';
                    if (!perfMap[slug]) perfMap[slug] = { leads: 0, clicks: 0 };
                    perfMap[slug].leads++;

                    if (lead.country) {
                        if (!countryStats[lead.country]) countryStats[lead.country] = { leads: 0, clicks: 0 };
                        countryStats[lead.country].leads++;
                        if (isAdmin && (lead as any).partners?.name) {
                            countryStats[lead.country].topPartner = (lead as any).partners.name;
                        }
                    }
                });

                clicksGeoData.forEach(click => {
                    const slug = (click as any).landing_slug || (click as any).slug || 'N/A';
                    if (!perfMap[slug]) perfMap[slug] = { leads: 0, clicks: 0 };
                    perfMap[slug].clicks++;

                    if (click.country) {
                        if (!countryStats[click.country]) countryStats[click.country] = { leads: 0, clicks: 0 };
                        countryStats[click.country].clicks++;
                    }
                });

                const chartData = Object.entries(activityMap).map(([day, count]) => ({ day, count }));
                const formattedCountryData = Object.entries(countryStats).map(([country, data]) => ({
                    country,
                    leads: data.leads,
                    clicks: data.clicks,
                    conversion: data.clicks > 0 ? ((data.leads / data.clicks) * 100).toFixed(1) + '%' : '0%',
                    topPartner: data.topPartner || 'N/A'
                }));

                const landingPerf = Object.entries(perfMap)
                    .map(([slug, data]) => ({
                        slug,
                        leads: data.leads,
                        clicks: data.clicks,
                        cr: data.clicks > 0 ? (data.leads / data.clicks) * 100 : 0
                    }))
                    .sort((a, b) => b.leads - a.leads)
                    .slice(0, 5);

                setStats({
                    leads: l.count || 0,
                    clicks: c.count || 0,
                    landings: ln.count || 0,
                    conversionRate: globalCR,
                    weeklyData: chartData,
                    countryData: formattedCountryData as any,
                    landingPerformance: landingPerf,
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
            setLoading(false);
        }
        fetchStats();
    }, [isAdmin, lang]);

    const adminStatCards = [
        { title: t.overview.adminStatLeads, value: stats.leads.toString(), icon: Users, iconColor: 'text-[#865BFF]', iconBg: 'bg-[#865BFF]/10', accent: '#865BFF', badge: t.overview.global },
        { title: t.overview.adminStatClicks, value: stats.clicks.toString(), icon: MousePointerClick, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', accent: '#3b82f6', badge: t.overview.network },
        { title: t.overview.adminStatLandings, value: stats.landings.toString(), icon: Globe2, iconColor: 'text-amber-500', iconBg: 'bg-amber-50', accent: '#f59e0b', badge: t.overview.total },
        { title: t.overview.adminStatPartners, value: totalPartners.toString(), icon: Network, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', accent: '#10b981', badge: t.overview.network },
    ];

    // ── PARTNER VIEW stat cards
    const partnerStatCards = [
        { title: t.overview.myLeads, value: stats.leads.toString(), icon: Users, iconColor: 'text-[#865BFF]', iconBg: 'bg-[#865BFF]/10', accent: '#865BFF' },
        { title: t.overview.trafficClicks, value: stats.clicks.toString(), icon: MousePointerClick, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', accent: '#3b82f6' },
        { title: t.reports.convRate, value: stats.conversionRate.toFixed(1) + '%', icon: Target, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', accent: '#10b981' },
        { title: t.overview.myLandings, value: stats.landings.toString(), icon: Globe2, iconColor: 'text-amber-500', iconBg: 'bg-amber-50', accent: '#f59e0b' },
    ];

    const statCards = isAdmin ? adminStatCards : partnerStatCards;

    const COUNTRY_COORDS: Record<string, { top: string; left: string }> = {
        'Mexico': { top: '52%', left: '21%' }, 'México': { top: '52%', left: '21%' },
        'Colombia': { top: '62%', left: '28%' }, 'Argentina': { top: '82%', left: '32%' },
        'Spain': { top: '38%', left: '48%' }, 'España': { top: '38%', left: '48%' },
        'Peru': { top: '70%', left: '25%' }, 'United States': { top: '40%', left: '22%' },
        'USA': { top: '40%', left: '22%' }, 'Brazil': { top: '68%', left: '35%' },
        'Chile': { top: '82%', left: '26%' }, 'India': { top: '52%', left: '72%' },
        'China': { top: '42%', left: '80%' }, 'Russia': { top: '25%', left: '75%' },
        'France': { top: '36%', left: '49%' }, 'Ecuador': { top: '62%', left: '25%' },
        'Venezuela': { top: '58%', left: '29%' }, 'Bolivia': { top: '72%', left: '30%' },
        'Panama': { top: '56%', left: '24%' },
    };

    const dynamicHotspots = stats.countryData.map((c: any) => ({
        ...COUNTRY_COORDS[c.country] || { top: '50%', left: '50%' },
        label: c.country, count: c.leads, conversion: c.conversion, topPartner: c.topPartner,
        size: c.leads > 10 ? 'w-5 h-5' : 'w-3 h-3',
        color: c.leads > 20 ? 'bg-[#865BFF]' : 'bg-emerald-400',
        shadow: c.leads > 20 ? 'shadow-[#865BFF]/50' : 'shadow-emerald-400/50',
    }));

    const displayHotspots = dynamicHotspots.length > 0 ? dynamicHotspots : [
        { top: '48%', left: '22%', size: 'w-4 h-4', color: 'bg-emerald-400', shadow: 'shadow-emerald-400/50', label: 'México', count: 340, conversion: '15.2%', topPartner: 'N/A' },
        { top: '56%', left: '26%', size: 'w-5 h-5', color: 'bg-[#865BFF]', shadow: 'shadow-[#865BFF]/50', label: 'Colombia', count: 512, conversion: '22.8%', topPartner: 'N/A' },
        { top: '35%', left: '50%', size: 'w-6 h-6', color: 'bg-rose-400', shadow: 'shadow-rose-400/50', label: 'España', count: 890, conversion: '18.5%', topPartner: 'N/A' },
    ];

    // Quick actions differ by role
    const adminQuickActions = [
        { label: t.overview.managePartners, desc: t.overview.managePartnersDesc, icon: Shield, color: '#865BFF', bg: 'rgba(134,91,255,0.08)', href: '/dashboard/admin/partners' },
        { label: t.overview.globalClients, desc: t.overview.globalClientsDesc, icon: Users, color: '#10b981', bg: 'rgba(16,185,129,0.08)', href: '/dashboard/reports/clients' },
        { label: t.overview.networkStats, desc: t.overview.networkStatsDesc, icon: BarChart2, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', href: '/dashboard/reports/stats' },
        { label: t.overview.activeLandings, desc: t.overview.activeLandingsDesc, icon: Globe, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', href: '/dashboard/landing' },
    ];

    const partnerQuickActions = [
        { label: t.overview.materialPost, desc: t.overview.materialPostDesc, icon: Globe, color: '#865BFF', bg: 'rgba(134,91,255,0.08)', href: '/dashboard/promo/overview' },
        { label: t.overview.landingGen, desc: t.overview.landingGenDesc, icon: Zap, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', href: '/dashboard/landing' },
        { label: t.overview.myClients, desc: t.overview.myClientsDesc, icon: Users, color: '#10b981', bg: 'rgba(16,185,129,0.08)', href: '/dashboard/reports/clients' },
        { label: t.overview.reports, desc: t.overview.reportsDesc, icon: BarChart2, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', href: '/dashboard/reports/stats' },
    ];

    const quickActions = isAdmin ? adminQuickActions : partnerQuickActions;

    const dateLocales: Record<string, string> = {
        es: 'es-ES', en: 'en-US', zh: 'zh-CN', hi: 'hi-IN', fr: 'fr-FR',
        ar: 'ar-SA', bn: 'bn-BD', pt: 'pt-BR', ru: 'ru-RU', ja: 'ja-JP',
    };

    return (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-10 relative">
            {/* Background Watermark */}
            <div className="absolute top-0 right-0 w-[600px] h-[600px] pointer-events-none opacity-[0.03] grayscale select-none -translate-y-20 translate-x-20 overflow-hidden">
                <img src="/images/logo-para-fondos.png" alt="" className="w-full h-full object-contain" />
            </div>

            {/* ── Header Banner */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="relative z-10">
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
                                {isAdmin ? <Crown className="w-7 h-7 text-amber-400" /> : <TrendingUp className="w-7 h-7 text-[#865BFF]" />}
                            </div>
                            <div>
                                <div className={`text-[9px] font-medium uppercase tracking-widest mb-1 px-2 py-0.5 rounded-md border inline-block ${
                                    isAdmin ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-[#865BFF] bg-[#865BFF]/10 border-[#865BFF]/20'
                                }`}>
                                    {isAdmin
                                        ? <><Shield className="w-3 h-3" /><span>{t.overview.adminPanel} — {t.overview.network}</span></>
                                        : <><Eye className="w-3 h-3" /><span>Partner View — {t.overview.personalMetrics}</span></>}
                                </div>
                                <h1 className="text-2xl font-medium tracking-tight mt-1">
                                    {isAdmin 
                                        ? t.overview.adminPanel 
                                        : (partnerName ? `${t.overview.hello}, ${partnerName.split(' ')[0]}!` : t.overview.welcomePartner)}
                                </h1>
                                <p className="text-white/50 text-sm font-medium">
                                    {t.overview.realtimeData} · {isAdmin ? t.overview.network : t.overview.personalMetrics}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3">
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-[#865BFF]/10 border-[#865BFF]/20 text-[#865BFF]'}`}>
                                <Clock className="w-4 h-4" />
                                <span className="text-xs font-bold uppercase tracking-wider">
                                    {mounted && new Date().toLocaleDateString(dateLocales[lang] || 'es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase().replace('.', '')}
                                </span>
                            </div>
                            <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/10 border-white/10 text-white'}`}>
                                {isAdmin ? <Network className="w-4 h-4" /> : <Award className="w-4 h-4 text-[#865BFF]" />}
                                <span className="text-xs font-mono font-bold tracking-tight">
                                    {isAdmin ? `${totalPartners} PARTNERS` : partnerId}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>

            <div className={`grid grid-cols-1 gap-6 ${isAdmin ? 'md:grid-cols-4' : 'md:grid-cols-4'}`}>
                {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={`bg-white rounded-[2rem] p-6 border shadow-sm hover:shadow-xl transition-all duration-300 group ${isAdmin ? 'border-amber-500/10 hover:shadow-amber-500/5' : 'border-slate-100 hover:shadow-[#865BFF]/5'}`}>
                            <div className="flex items-start justify-between mb-4">
                                <div className={`w-10 h-10 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 ${s.iconBg} ${s.iconColor}`}>
                                    <Icon className="w-5 h-5" strokeWidth={1.5} />
                                </div>
                                <div className={`flex items-center gap-1 text-[9px] font-medium px-2 py-0.5 rounded-lg ${isAdmin ? 'bg-amber-50 text-amber-600' : 'bg-[#865BFF]/5 text-[#865BFF]'}`}>
                                    {isAdmin ? (s as any).badge || t.overview.global : t.overview.realTime}
                                </div>
                            </div>
                            <div className="text-xl font-semibold text-slate-800 tracking-tight mb-0.5">{s.value}</div>
                            <div className="text-[11px] font-normal text-slate-400 uppercase tracking-wide">{s.title}</div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Quick Actions + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="lg:col-span-2 space-y-2">
                    <h2 className="text-xs font-normal text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        {isAdmin ? <><Zap className="w-3.5 h-3.5 text-amber-500" /><span>{t.overview.adminQuickActions}</span></> : t.overview.quickActions}
                    </h2>
                    {quickActions.map((action, i) => {
                        const Icon = action.icon;
                        return (
                            <button key={i} onClick={() => router.push(action.href)} className="card w-full px-4 py-3.5 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: action.bg }}>
                                    <Icon className="w-4 h-4" style={{ color: action.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-normal text-slate-800 text-xs">{action.label}</div>
                                    <div className="text-[11px] text-slate-400 mt-0.5 truncate">{action.desc}</div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            </button>
                        );
                    })}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} 
                    className={`rounded-[2.5rem] p-8 text-white shadow-2xl relative overflow-hidden flex flex-col min-h-[450px] lg:col-span-3 ${
                        isAdmin ? 'bg-gradient-to-br from-[#1a0f00] to-[#2d1900]' : 'bg-[#0d0221]'
                    }`}>
                    <div className={`absolute top-0 right-0 w-96 h-96 opacity-10 blur-[100px] -mr-48 -mt-48 ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                    
                    <div className="relative z-10 flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-medium flex items-center gap-2">
                                {isAdmin ? <><BarChart2 className="w-5 h-5 text-amber-500" /><span>{t.overview.consolidatedVolumeAdmin}</span></> : <><TrendingUp className="w-5 h-5 text-[#865BFF]" /><span>{t.overview.dailyLeads}</span></>}
                            </h3>
                            <p className="text-white/40 text-xs mt-1">
                                {isAdmin ? t.overview.consolidatedVolumeAdminDesc : t.overview.realTrafficNote}
                            </p>
                        </div>
                        <button className={`px-4 py-1.5 text-[10px] font-bold uppercase tracking-wider rounded-xl border border-white/10 hover:bg-white/5 transition-colors ${isAdmin ? 'text-amber-400' : 'text-[#865BFF]'}`}>
                            {t.overview.thisWeek}
                        </button>
                    </div>

                    <div className="flex-1 w-full min-h-[300px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats.weeklyData}>
                                <defs>
                                    <linearGradient id="colorCount" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor={isAdmin ? '#f59e0b' : '#865BFF'} stopOpacity={0.8} />
                                        <stop offset="95%" stopColor={isAdmin ? '#f59e0b' : '#865BFF'} stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.05)" />
                                <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fill: 'rgba(255,255,255,0.3)', fontSize: 10, fontWeight: 500 }} dy={10} />
                                <YAxis hide />
                                <Tooltip contentStyle={{ backgroundColor: '#0d0221', borderRadius: '1rem', border: '1px solid rgba(255,255,255,0.1)', fontSize: '12px' }} />
                                <Area type="monotone" dataKey="count" stroke={isAdmin ? '#f59e0b' : '#865BFF'} strokeWidth={4} fillOpacity={1} fill="url(#colorCount)" />
                            </AreaChart>
                        </ResponsiveContainer>
                        {stats.weeklyData.every(d => d.count === 0) && (
                            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                                <div className="text-center opacity-40">
                                    <Activity className="w-8 h-8 mx-auto mb-2 text-white/20" />
                                    <p className="text-[10px] uppercase tracking-widest font-medium">{t.overview.noHistory}</p>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* ── ADMIN ONLY: Top Partners Table */}
            {isAdmin && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
                    className={`rounded-[2.5rem] p-8 bg-white border shadow-sm ${isAdmin ? 'border-amber-500/10 shadow-amber-500/5' : 'border-slate-100'}`}>
                    <div className="flex items-center justify-between mb-8">
                        <div>
                            <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
                                <Crown className={`w-5 h-5 ${isAdmin ? 'text-amber-500' : 'text-[#865BFF]'}`} />
                                {t.overview.topPartnersWeek}
                            </h3>
                            <p className="text-xs text-slate-400 mt-1">{t.overview.topPartnersWeekDesc}</p>
                        </div>
                        <button onClick={() => router.push('/dashboard/admin/partners')} className={`text-xs font-bold uppercase tracking-widest flex items-center gap-1 transition-colors ${isAdmin ? 'text-amber-600 hover:text-amber-700' : 'text-[#865BFF] hover:text-[#6b3fd6]'}`}>
                            {t.overview.viewAll} <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                    {topPartners.length === 0 ? (
                        <div className="text-center py-10 text-slate-400 text-sm italic">{t.overview.noPartnerData}</div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {topPartners.map((p, i) => (
                                <div key={i} className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100 hover:border-[#865BFF]/20 transition-all group">
                                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-black shadow-sm ${
                                        i === 0 ? 'bg-amber-100 text-amber-600' :
                                        i === 1 ? 'bg-slate-200 text-slate-600' :
                                        i === 2 ? 'bg-orange-100 text-orange-600' :
                                        'bg-white text-slate-400'
                                    }`}>#{i + 1}</div>
                                    <div className="flex-1 min-w-0">
                                        <div className="text-sm font-bold text-slate-800 truncate">{p.name}</div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                                <div className={`h-full rounded-full ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`}
                                                    style={{ width: `${(p.count / (topPartners[0]?.count || 1)) * 100}%` }} />
                                            </div>
                                            <span className="text-[10px] font-black text-slate-500 uppercase">{p.count} leads</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </motion.div>
            )}

            {/* ── PARTNER VIEW ONLY: Performance Tips */}
            {!isAdmin && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
                    className="card p-6">
                    <h3 className="text-sm font-normal text-slate-800 flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-[#865BFF]" />
                        {t.overview.howToImprove}
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { Icon: Pencil, tip: t.overview.createGraphics, desc: t.overview.createGraphicsDesc, href: '/dashboard/promo/overview', color: 'text-pink-500', bg: 'bg-pink-50' },
                            { Icon: Globe, tip: t.overview.generateLandingsTip, desc: t.overview.generateLandingsTipDesc, href: '/dashboard/landing', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { Icon: Link2, tip: t.overview.shareLinkTip, desc: t.overview.shareLinkTipDesc, href: '/dashboard/links', color: 'text-[#865BFF]', bg: 'bg-[#865BFF]/10' },
                        ].map((item, i) => (
                            <button key={i} onClick={() => router.push(item.href)}
                                className="text-left p-4 rounded-xl bg-gradient-to-br from-[#865BFF]/5 to-transparent border border-[#865BFF]/10 hover:from-[#865BFF]/10 hover:border-[#865BFF]/20 transition-all group">
                                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                                    <item.Icon className={`w-4 h-4 ${item.color}`} />
                                </div>
                                <div className="text-sm font-normal text-slate-800 group-hover:text-[#865BFF] transition-colors">{item.tip}</div>
                                <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} 
                className={`rounded-[2.5rem] p-8 bg-white border shadow-sm ${isAdmin ? 'border-amber-500/10 shadow-amber-500/5' : 'border-slate-100 shadow-slate-200/50'}`}>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
                            {isAdmin ? <><Globe2 className="w-5 h-5 text-amber-500" /><span>{t.overview.globalDistribution}</span></> : <><Globe className="w-5 h-5 text-[#865BFF]" /><span>{t.overview.heatmapTitle}</span></>}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">
                            {isAdmin ? t.overview.globalDistributionDesc : t.overview.heatmapSubtitle}
                        </p>
                    </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
                    {/* Lista de Países Lateral */}
                    <div className="xl:col-span-1 space-y-3">
                        <h4 className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-4 px-2">Top Países</h4>
                        <div className="space-y-2">
                            {stats.countryData.length > 0 ? stats.countryData.sort((a: any, b: any) => b.leads - a.leads).slice(0, 6).map((c: any, i: any) => (
                                <div key={i} className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-100 group hover:border-[#865BFF]/30 hover:bg-white hover:shadow-lg hover:shadow-slate-200/50 transition-all duration-300">
                                    <div className="flex items-center gap-3">
                                        <div className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                                        <span className="text-xs font-bold text-slate-700">{c.country}</span>
                                    </div>
                                    <div className="text-right">
                                        <div className={`text-xs font-black ${isAdmin ? 'text-amber-600' : 'text-[#865BFF]'}`}>{c.leads}</div>
                                        <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tight">CR: {c.conversion}</div>
                                    </div>
                                </div>
                            )) : (
                                <div className="text-center py-12 border-2 border-dashed border-slate-100 rounded-[2rem]">
                                    <Globe className="w-8 h-8 text-slate-200 mx-auto mb-3" />
                                    <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Sin datos aún</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mapa Interactivo */}
                    <div className="xl:col-span-3 relative bg-slate-900 rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/5 group/map">
                        <div className="aspect-[2/1] w-full relative bg-[#070214]">
                            {/* Map Background */}
                            <img 
                                src="https://upload.wikimedia.org/wikipedia/commons/8/80/World_map_-_low_resolution.svg" 
                                alt="World Map" 
                                className="absolute inset-0 w-full h-full object-cover opacity-30 filter brightness-150 grayscale invert pointer-events-none group-hover/map:scale-105 transition-transform duration-[20s] ease-linear" 
                            />
                            
                            {/* Glow effects */}
                            <div className={`absolute top-1/4 left-1/4 w-64 h-64 rounded-full blur-[100px] opacity-20 pointer-events-none ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                            <div className={`absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full blur-[100px] opacity-10 pointer-events-none ${isAdmin ? 'bg-amber-600' : 'bg-[#5b3fd6]'}`} />
                            
                            {/* Grid overlay */}
                            <div className="absolute inset-0 opacity-[0.05] pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(134,91,255,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(134,91,255,0.2) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                            
                            {dynamicHotspots.map((point, i) => (
                                <div key={i} className="absolute group z-10" style={{ top: point.top, left: point.left }}>
                                    <div className="relative flex items-center justify-center -translate-x-1/2 -translate-y-1/2">
                                        <div className={`absolute ${point.size} ${point.color} rounded-full animate-ping opacity-75`} />
                                        <div className={`relative ${point.size} ${point.color} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] ${point.shadow} border-2 border-white/20 group-hover:scale-150 transition-all duration-300 cursor-pointer`} />
                                    </div>
                                    <div className="absolute bottom-full mb-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white text-slate-800 px-5 py-4 rounded-[1.5rem] shadow-2xl flex flex-col items-center pointer-events-none min-w-[180px] z-20 border border-slate-100 translate-y-2 group-hover:translate-y-0">
                                        <div className="w-full flex justify-between items-center mb-2 pb-2 border-b border-slate-50">
                                            <span className={`text-[10px] uppercase font-black tracking-widest ${isAdmin ? 'text-amber-500' : 'text-[#865BFF]'}`}>{point.label}</span>
                                            <span className="text-[9px] font-black bg-slate-100 px-2 py-0.5 rounded-lg text-slate-500 uppercase">
                                                {point.count > 50 ? 'Hot' : 'Active'}
                                            </span>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="text-center">
                                                <div className="text-xl font-black text-slate-800 leading-none">{point.count}</div>
                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Leads</div>
                                            </div>
                                            <div className="w-px h-6 bg-slate-100" />
                                            <div className="text-center">
                                                <div className="text-xs font-black text-emerald-500 leading-none">{point.conversion}</div>
                                                <div className="text-[9px] text-slate-400 font-bold uppercase tracking-tighter mt-1">Conv.</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}

                            {dynamicHotspots.length === 0 && (
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[1px]">
                                    <div className="flex flex-col items-center">
                                        <div className={`w-12 h-12 rounded-full border-2 border-dashed border-white/20 flex items-center justify-center animate-spin-slow mb-4`}>
                                            <Globe className="w-6 h-6 text-white/20" />
                                        </div>
                                        <p className="text-white text-[10px] font-black uppercase tracking-[0.4em] bg-white/5 border border-white/10 px-8 py-3 rounded-full backdrop-blur-md shadow-2xl">Esperando Tráfico Global</p>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.42 }}
                className={`rounded-[2.5rem] p-8 bg-white border shadow-sm ${isAdmin ? 'border-amber-500/10 shadow-amber-500/5' : 'border-slate-100'}`}>
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-medium text-slate-800 flex items-center gap-2">
                            <Activity className={`w-5 h-5 ${isAdmin ? 'text-amber-500' : 'text-[#865BFF]'}`} />
                            {t.overview.topLandings || 'Rendimiento por Landing'}
                        </h3>
                        <p className="text-xs text-slate-400 mt-1">{t.overview.topLandingsDesc || 'Análisis detallado de conversión por página generada.'}</p>
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="border-b border-slate-100">
                                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400">{t.landing.title || 'Landing'}</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">{t.overview.trafficClicks || 'Clicks'}</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-center">{t.overview.myLeads || 'Leads'}</th>
                                <th className="pb-4 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 text-right">{t.overview.conversion || 'Rendimiento'}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {stats.landingPerformance.length > 0 ? stats.landingPerformance.map((lp, i) => (
                                <tr key={i} className="group hover:bg-slate-50/50 transition-all duration-300">
                                    <td className="py-5">
                                        <div className="flex items-center gap-4">
                                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-sm ${isAdmin ? 'bg-amber-50 text-amber-600' : 'bg-[#865BFF]/5 text-[#865BFF]'}`}>
                                                <Globe className="w-5 h-5" />
                                            </div>
                                            <div>
                                                <div className="text-sm font-bold text-slate-800 group-hover:text-[#865BFF] transition-colors">{lp.slug}</div>
                                                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter mt-0.5">/l/{lp.slug}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="py-5 text-center">
                                        <span className="text-sm font-bold text-slate-600 bg-slate-50 px-3 py-1 rounded-lg border border-slate-100">{lp.clicks}</span>
                                    </td>
                                    <td className="py-5 text-center">
                                        <span className="text-sm font-black text-slate-800">{lp.leads}</span>
                                    </td>
                                    <td className="py-5 text-right">
                                        <div className="flex flex-col items-end gap-2">
                                            <span className={`text-xs font-black px-2 py-0.5 rounded-md ${lp.cr > 15 ? 'bg-emerald-50 text-emerald-600' : 'bg-[#865BFF]/5 text-[#865BFF]'}`}>
                                                {lp.cr.toFixed(1)}%
                                            </span>
                                            <div className="w-20 h-1.5 bg-slate-100 rounded-full overflow-hidden shadow-inner">
                                                <div 
                                                    className={`h-full rounded-full transition-all duration-1000 ${lp.cr > 15 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.3)]' : 'bg-[#865BFF] shadow-[0_0_8px_rgba(134,91,255,0.3)]'}`}
                                                    style={{ width: `${Math.min(lp.cr * 2.5, 100)}%` }}
                                                />
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            )) : (
                                <tr>
                                    <td colSpan={4} className="py-12 text-center text-slate-400 text-xs italic font-medium tracking-wide">
                                        {t.overview.noLandingData || 'No hay datos de rendimiento suficientes aún.'}
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </motion.div>

            {/* ── Materials Banner */}
            <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.45 }}
                className="rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap cursor-pointer relative overflow-hidden"
                style={{ background: isAdmin
                    ? 'linear-gradient(135deg, #1a0f00 0%, #2d1900 50%, #c47b0a 100%)'
                    : 'linear-gradient(135deg,#140633 0%,#2d1060 50%,#865BFF 100%)'
                }}
                onClick={() => router.push(isAdmin ? '/dashboard/admin/partners' : '/dashboard/promo/overview')}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-48 w-32 h-32 rounded-full bg-white/5 translate-y-8" />
                </div>
                <div className="relative z-10">
                    <div className={`text-[10px] font-normal uppercase tracking-widest mb-1 flex items-center gap-1.5 ${
                            isAdmin ? 'text-amber-500/60' : 'text-[#865BFF]/60'
                        }`}>
                        {isAdmin ? <><Shield className="w-3 h-3" /><span>{t.overview.adminZone}</span></> : t.overview.materialsReady}
                    </div>
                    <h3 className="text-white font-normal text-base">
                        {isAdmin ? t.overview.manageNetwork : t.overview.materialsTitle}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">
                        {isAdmin ? t.overview.manageNetworkDesc : t.overview.materialsSubtitle}
                    </p>
                </div>
                <button className="relative z-10 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-normal text-sm px-5 py-2.5 rounded-xl transition-all flex-shrink-0">
                    <ExternalLink className="w-4 h-4" />
                    {isAdmin ? t.overview.viewPartnersList : t.overview.viewMaterials}
                </button>
            </motion.div>
        </motion.div>
    );
}
