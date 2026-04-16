"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Users, Globe2, MousePointerClick,
    Activity, ChevronRight, ExternalLink,
    Globe, Zap, BarChart2, Award, Clock, TrendingUp,
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
        weeklyData: [] as { day: string; count: number }[],
        countryData: [] as { country: string; count: number }[],
    });
    const [topPartners, setTopPartners] = useState<any[]>([]);
    const [mounted, setMounted] = useState(false);

    const DAY_NAMES: Record<string, string[]> = {
        es: ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'],
        en: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        zh: ['日', '一', '二', '三', '四', '五', '六'],
        hi: ['रवि', 'सोम', 'मंगल', 'बुध', 'गुरु', 'शुक्र', 'शनि'],
        fr: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
        ar: ['أحد', 'اثن', 'ثلا', 'أرب', 'خمي', 'جمع', 'سبت'],
        bn: ['রবি', 'সোম', 'মঙ্গ', 'বুধ', 'বৃহ', 'শুক্র', 'শনি'],
        pt: ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'],
        ru: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
        ja: ['日', '月', '火', '水', '木', '金', '土'],
    };

    const days = DAY_NAMES[lang] || DAY_NAMES['es'];

    useEffect(() => {
        setMounted(true);
        async function fetchStats() {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            if (user) setPartnerId('BM_' + user.id.substring(0, 8).toUpperCase());

            try {
                // ── Fetch partner name
                const { data: partnerData } = await supabase
                    .from('partners')
                    .select('name, role')
                    .eq('id', user.id)
                    .single();
                if (partnerData?.name) setPartnerName(partnerData.name);

                let leadsQuery = supabase.from('leads').select('*', { count: 'exact' });
                let clicksQuery = supabase.from('clicks').select('*', { count: 'exact' });
                let landingsQuery = supabase.from('landings').select('*', { count: 'exact' });

                if (!isAdmin) {
                    leadsQuery = leadsQuery.eq('partner_id', user.id);
                    clicksQuery = clicksQuery.eq('partner_id', user.id);
                    landingsQuery = landingsQuery.eq('partner_id', user.id);
                }

                const [l, c, ln] = await Promise.all([leadsQuery, clicksQuery, landingsQuery]);

                // Admin: fetch total partners count
                if (isAdmin) {
                    const { count: partnersCount } = await supabase
                        .from('partners')
                        .select('*', { count: 'exact', head: true });
                    setTotalPartners(partnersCount || 0);

                    // Top partners by leads
                    const { data: topData } = await supabase
                        .from('leads')
                        .select('partner_id, partners(name)')
                        .limit(100);

                    if (topData) {
                        const countMap: Record<string, { name: string; count: number }> = {};
                        topData.forEach((lead: any) => {
                            const pid = lead.partner_id;
                            const name = lead.partners?.name || 'Unknown';
                            if (!countMap[pid]) countMap[pid] = { name, count: 0 };
                            countMap[pid].count++;
                        });
                        const sorted = Object.values(countMap).sort((a, b) => b.count - a.count).slice(0, 5);
                        setTopPartners(sorted);
                    }
                }

                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

                let activityQuery = supabase
                    .from('leads')
                    .select('created_at, country, partner_id, partners(name)')
                    .gte('created_at', sevenDaysAgo.toISOString());

                let clicksGeoQuery = supabase
                    .from('clicks')
                    .select('country')
                    .gte('created_at', sevenDaysAgo.toISOString());

                if (!isAdmin) {
                    activityQuery = activityQuery.eq('partner_id', user.id);
                    clicksGeoQuery = clicksGeoQuery.eq('partner_id', user.id);
                }

                const { data: leadsData } = await activityQuery;
                const { data: clicksGeoData } = await clicksGeoQuery;

                const activityMap: Record<string, number> = {};
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    activityMap[days[d.getDay()]] = 0;
                }

                const countryStats: Record<string, { leads: number; clicks: number; topPartner?: string }> = {};

                leadsData?.forEach(lead => {
                    const d = new Date(lead.created_at);
                    const dayName = days[d.getDay()];
                    if (activityMap[dayName] !== undefined) activityMap[dayName]++;

                    if (lead.country) {
                        if (!countryStats[lead.country]) countryStats[lead.country] = { leads: 0, clicks: 0 };
                        countryStats[lead.country].leads++;
                        if (isAdmin && (lead as any).partners?.name) {
                            countryStats[lead.country].topPartner = (lead as any).partners.name;
                        }
                    }
                });

                clicksGeoData?.forEach(click => {
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

                setStats({
                    leads: l.count || 0,
                    clicks: c.count || 0,
                    landings: ln.count || 0,
                    weeklyData: chartData,
                    countryData: formattedCountryData as any,
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
            setLoading(false);
        }
        fetchStats();
    }, [isAdmin, lang]);

    // ── ADMIN stat cards
    const adminStatCards = [
        { title: 'Red Total - Leads', value: stats.leads.toString(), icon: Users, iconColor: 'text-[#865BFF]', iconBg: 'bg-[#865BFF]/10', accent: '#865BFF', badge: 'Global' },
        { title: 'Clicks Totales Red', value: stats.clicks.toString(), icon: MousePointerClick, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', accent: '#3b82f6', badge: 'Red' },
        { title: 'Landings Activas', value: stats.landings.toString(), icon: Globe2, iconColor: 'text-amber-500', iconBg: 'bg-amber-50', accent: '#f59e0b', badge: 'Total' },
        { title: 'Partners Activos', value: totalPartners.toString(), icon: Network, iconColor: 'text-emerald-500', iconBg: 'bg-emerald-50', accent: '#10b981', badge: 'Red' },
    ];

    // ── PARTNER VIEW stat cards
    const partnerStatCards = [
        { title: t.overview.myLeads, value: stats.leads.toString(), icon: Users, iconColor: 'text-[#865BFF]', iconBg: 'bg-[#865BFF]/10', accent: '#865BFF' },
        { title: t.overview.trafficClicks, value: stats.clicks.toString(), icon: MousePointerClick, iconColor: 'text-blue-500', iconBg: 'bg-blue-50', accent: '#3b82f6' },
        { title: t.overview.myLandings, value: stats.landings.toString(), icon: Globe2, iconColor: 'text-amber-500', iconBg: 'bg-amber-50', accent: '#f59e0b' },
    ];

    const statCards = isAdmin ? adminStatCards : partnerStatCards;

    const COUNTRY_COORDS: Record<string, { top: string; left: string }> = {
        'Mexico': { top: '48%', left: '22%' }, 'México': { top: '48%', left: '22%' },
        'Colombia': { top: '56%', left: '26%' }, 'Argentina': { top: '75%', left: '30%' },
        'Spain': { top: '35%', left: '50%' }, 'España': { top: '35%', left: '50%' },
        'United Kingdom': { top: '28%', left: '46%' }, 'Japan': { top: '40%', left: '80%' },
        'Peru': { top: '65%', left: '23%' }, 'United States': { top: '35%', left: '15%' },
        'USA': { top: '35%', left: '15%' }, 'Brazil': { top: '65%', left: '32%' },
        'Chile': { top: '75%', left: '22%' }, 'India': { top: '45%', left: '68%' },
        'China': { top: '38%', left: '76%' }, 'Russia': { top: '28%', left: '68%' },
        'Bangladesh': { top: '47%', left: '71%' }, 'France': { top: '32%', left: '49%' },
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
        { label: 'Gestionar Partners', desc: 'Ver y administrar toda la red', icon: Shield, color: '#865BFF', bg: 'rgba(134,91,255,0.08)', href: '/dashboard/admin/partners' },
        { label: 'Clientes Globales', desc: 'Ver todos los leads de la red', icon: Users, color: '#10b981', bg: 'rgba(16,185,129,0.08)', href: '/dashboard/reports/clients' },
        { label: 'Estadísticas Red', desc: 'Métricas consolidadas', icon: BarChart2, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', href: '/dashboard/reports/stats' },
        { label: 'Landings Activas', desc: 'Todas las landings de la red', icon: Globe, color: '#38bdf8', bg: 'rgba(56,189,248,0.08)', href: '/dashboard/landing' },
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
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-6 pb-10">

            {/* ── Welcome Banner — Visual diferente por rol */}
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
                {isAdmin ? (
                    /* ADMIN Banner — dorado/oscuro */
                    <div className="relative overflow-hidden rounded-2xl p-5 border border-amber-500/20" style={{ background: 'linear-gradient(135deg, #1a0f00 0%, #2d1a00 50%, #1a0f00 100%)' }}>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px] -mr-32 -mt-32 pointer-events-none" />
                        <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-600/5 rounded-full blur-[60px] pointer-events-none" />
                        <div className="relative z-10 flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 rounded-xl bg-amber-500/15 border border-amber-500/30 flex items-center justify-center shadow-lg shadow-amber-500/10">
                                    <Crown className="w-6 h-6 text-amber-400" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-amber-500/60 bg-amber-500/10 px-2 py-0.5 rounded-md border border-amber-500/20">
                                            <Shield className="w-2.5 h-2.5" /> Panel Administrador
                                        </span>
                                    </div>
                                    <h1 className="text-base font-bold text-white">{t.overview.adminPanel}</h1>
                                    <p className="text-xs text-white/40 mt-0.5">{t.overview.realtimeData} · Toda la red</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-1.5 text-xs text-amber-300/60 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                                    <Clock className="w-3.5 h-3.5" />
                                    {mounted && new Date().toLocaleDateString(dateLocales[lang] || 'es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </div>
                                <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/20 rounded-lg px-3 py-2">
                                    <Network className="w-3.5 h-3.5 text-amber-400" />
                                    <span className="text-xs font-bold font-mono text-amber-400">{totalPartners} Partners</span>
                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    /* PARTNER VIEW Banner — morado */
                    <div className="card px-6 py-5">
                        <div className="flex items-center justify-between gap-4 flex-wrap">
                            <div className="flex items-center gap-4">
                                <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#865BFF] to-[#5b3fd6] flex items-center justify-center shadow-lg shadow-[#865BFF]/20">
                                    <TrendingUp className="w-5 h-5 text-white" />
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-0.5">
                                        <span className="inline-flex items-center gap-1.5 text-[9px] font-black uppercase tracking-widest text-[#865BFF] bg-[#865BFF]/8 px-2 py-0.5 rounded-md border border-[#865BFF]/15">
                                            <Eye className="w-2.5 h-2.5" /> Partner View
                                        </span>
                                    </div>
                                    <h1 className="text-base font-bold text-slate-800">
                                        {partnerName ? `¡Hola, ${partnerName.split(' ')[0]}!` : t.overview.welcomePartner}
                                    </h1>
                                    <p className="text-xs text-slate-400 mt-0.5">{t.overview.realtimeData} · Tus métricas personales</p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 flex-wrap">
                                <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                                    <Clock className="w-3.5 h-3.5" />
                                    {mounted && new Date().toLocaleDateString(dateLocales[lang] || 'es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                                </div>
                                <div className="flex items-center gap-1.5 bg-[#865BFF]/8 border border-[#865BFF]/20 rounded-lg px-3 py-2">
                                    <Award className="w-3.5 h-3.5 text-[#865BFF]" />
                                    <span className="text-xs font-bold font-mono text-[#865BFF]">{partnerId}</span>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* ── Stat Cards */}
            <div className={`grid grid-cols-1 gap-4 ${isAdmin ? 'md:grid-cols-4' : 'md:grid-cols-3'}`}>
                {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }}
                            className={`card p-5 flex items-start gap-4 hover:shadow-md transition-all ${isAdmin ? 'border-amber-500/10' : ''}`}>
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.iconBg} ${s.iconColor}`}>
                                <Icon className="w-5 h-5" strokeWidth={1.8} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-slate-400 text-[11px] font-semibold uppercase tracking-wide">{s.title}</h3>
                                <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{s.value}</div>
                                <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded mt-1.5 inline-block ${
                                    isAdmin ? 'bg-amber-50 text-amber-600' : 'bg-slate-100 text-slate-500'
                                }`}>
                                    {isAdmin ? (s as any).badge || 'Global' : t.overview.realTime}
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* ── Quick Actions + Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: 0.3 }} className="lg:col-span-2 space-y-2">
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 flex items-center gap-1.5">
                        {isAdmin ? <><Zap className="w-3.5 h-3.5 text-amber-500" /><span>Accesos Rápidos — Admin</span></> : t.overview.quickActions}
                    </h2>
                    {quickActions.map((action, i) => {
                        const Icon = action.icon;
                        return (
                            <button key={i} onClick={() => router.push(action.href)} className="card w-full px-4 py-3.5 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group">
                                <div className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0" style={{ background: action.bg }}>
                                    <Icon className="w-4 h-4" style={{ color: action.color }} />
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="font-semibold text-slate-800 text-xs">{action.label}</div>
                                    <div className="text-[11px] text-slate-400 mt-0.5 truncate">{action.desc}</div>
                                </div>
                                <ChevronRight className="w-3.5 h-3.5 text-slate-300 group-hover:text-slate-500 group-hover:translate-x-0.5 transition-all flex-shrink-0" />
                            </button>
                        );
                    })}
                </motion.div>

                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.35 }} className="card p-6 lg:col-span-3">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-1.5">
                                {isAdmin ? <><BarChart2 className="w-4 h-4 text-amber-500" /><span>Volumen Consolidado — Red</span></> : t.overview.dailyLeads}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">
                                {isAdmin ? 'Actividad total de todos los partners' : t.overview.realTrafficNote}
                            </p>
                        </div>
                        <button className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            {t.overview.thisWeek}
                        </button>
                    </div>
                    <div className="h-[220px] flex items-end justify-between gap-2 px-2 pt-4">
                        {stats.weeklyData.length > 0 ? stats.weeklyData.map((d, i) => {
                            const maxCount = Math.max(...stats.weeklyData.map(x => x.count), 1);
                            const heightPercentage = (d.count / maxCount) * 100;
                            return (
                                <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-default">
                                    <div className="relative w-full flex flex-col items-center justify-end h-full">
                                        <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">{d.count} leads</div>
                                        <motion.div
                                            initial={{ height: 0 }}
                                            animate={{ height: `${Math.max(heightPercentage, d.count > 0 ? 5 : 0)}%` }}
                                            transition={{ duration: 0.6, delay: 0.4 + (i * 0.05) }}
                                            className={`w-full max-w-[32px] rounded-t-lg transition-colors shadow-sm ${d.count > 0
                                                ? isAdmin
                                                    ? 'bg-gradient-to-t from-amber-500 to-amber-300 group-hover:from-amber-600 group-hover:to-amber-400'
                                                    : 'bg-gradient-to-t from-[#865BFF] to-[#a88bff] group-hover:from-[#6b3fd6] group-hover:to-[#865BFF]'
                                                : 'bg-slate-100'}`}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{d.day}</span>
                                </div>
                            );
                        }) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                <div className="text-center">
                                    <Activity className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                                    <span className="text-xs font-medium text-slate-400">{t.overview.noHistory}</span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* ── ADMIN ONLY: Top Partners Table */}
            {isAdmin && (
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.38 }}
                    className="card p-6 border-amber-500/10">
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                                <Star className="w-4 h-4 text-amber-500" />
                                Top Partners — Esta Semana
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">Ranking por volumen de leads generados</p>
                        </div>
                        <button onClick={() => router.push('/dashboard/admin/partners')} className="text-xs font-bold text-[#865BFF] hover:text-[#6b3fd6] flex items-center gap-1">
                            Ver todos <ChevronRight className="w-3 h-3" />
                        </button>
                    </div>
                    {topPartners.length === 0 ? (
                        <div className="text-center py-8 text-slate-400 text-sm">No hay datos de partners aún</div>
                    ) : (
                        <div className="space-y-2">
                            {topPartners.map((p, i) => (
                                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors">
                                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-black ${
                                        i === 0 ? 'bg-amber-100 text-amber-600' :
                                        i === 1 ? 'bg-slate-100 text-slate-600' :
                                        i === 2 ? 'bg-orange-100 text-orange-600' :
                                        'bg-slate-50 text-slate-400'
                                    }`}>#{i + 1}</div>
                                    <div className="flex-1">
                                        <div className="text-sm font-bold text-slate-800">{p.name}</div>
                                    </div>
                                    <div className="text-sm font-bold text-[#865BFF]">{p.count} leads</div>
                                    <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                                        <div className="h-full bg-gradient-to-r from-[#865BFF] to-[#a88bff] rounded-full"
                                            style={{ width: `${(p.count / (topPartners[0]?.count || 1)) * 100}%` }} />
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
                    <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-[#865BFF]" />
                        Cómo mejorar tu rendimiento
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                        {[
                            { Icon: Pencil, tip: 'Crea piezas gráficas', desc: 'Usa los materiales en 14 idiomas para llegar a más mercados', href: '/dashboard/promo/overview', color: 'text-pink-500', bg: 'bg-pink-50' },
                            { Icon: Globe, tip: 'Genera Landing Pages', desc: 'Landing pages personalizadas con IA convierten 3x más', href: '/dashboard/landing', color: 'text-blue-500', bg: 'bg-blue-50' },
                            { Icon: Link2, tip: 'Comparte tu link', desc: 'Distribuye tus links de referido en todos tus canales', href: '/dashboard/links', color: 'text-[#865BFF]', bg: 'bg-[#865BFF]/10' },
                        ].map((item, i) => (
                            <button key={i} onClick={() => router.push(item.href)}
                                className="text-left p-4 rounded-xl bg-gradient-to-br from-[#865BFF]/5 to-transparent border border-[#865BFF]/10 hover:from-[#865BFF]/10 hover:border-[#865BFF]/20 transition-all group">
                                <div className={`w-9 h-9 rounded-xl ${item.bg} flex items-center justify-center mb-3`}>
                                    <item.Icon className={`w-4 h-4 ${item.color}`} />
                                </div>
                                <div className="text-sm font-bold text-slate-800 group-hover:text-[#865BFF] transition-colors">{item.tip}</div>
                                <div className="text-xs text-slate-400 mt-1">{item.desc}</div>
                            </button>
                        ))}
                    </div>
                </motion.div>
            )}

            {/* ── Heatmap */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.4 }} className="card p-6">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800 flex items-center gap-2">
                            {isAdmin ? <><Globe2 className="w-4 h-4 text-amber-500" /><span>Distribución Global — Toda la Red</span></> : t.overview.heatmapTitle}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">
                            {isAdmin ? 'Origen geográfico consolidado de todos los leads' : t.overview.heatmapSubtitle}
                        </p>
                    </div>
                </div>
                <div className="relative w-full h-[340px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                    <img src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" alt="World Map" className="absolute w-[90%] h-[90%] object-contain opacity-[0.15] filter invert pointer-events-none" />
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
                    {displayHotspots.map((point, i) => (
                        <div key={i} className="absolute group z-10" style={{ top: point.top, left: point.left }}>
                            <div className="relative flex items-center justify-center">
                                <div className={`absolute ${point.size} ${point.color} rounded-full animate-ping opacity-75`} />
                                <div className={`relative ${point.size} ${point.color} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] ${point.shadow} border border-slate-900 group-hover:scale-150 transition-transform cursor-pointer`} />
                            </div>
                            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 bg-white/95 backdrop-blur-md text-slate-800 px-4 py-3 rounded-2xl shadow-2xl flex flex-col items-center pointer-events-none min-w-[160px] z-20 border border-slate-200 translate-y-2 group-hover:translate-y-0">
                                <div className="w-full flex justify-between items-center mb-2 border-b border-slate-100 pb-1.5">
                                    <span className="text-[10px] uppercase font-black tracking-widest text-[#865BFF]">{point.label}</span>
                                    <span className="text-[9px] font-bold bg-slate-100 px-1.5 py-0.5 rounded text-slate-500 uppercase">
                                        {point.count > 100 ? t.overview.highDensity?.split('(')[0]?.trim() || 'Alto' : t.overview.medDensity?.split('(')[0]?.trim() || 'Medio'}
                                    </span>
                                </div>
                                <div className="flex flex-col items-center">
                                    <span className="text-2xl font-black text-slate-800 leading-none">+{point.count}</span>
                                    <span className="text-[9px] text-slate-400 font-bold uppercase tracking-tight mt-1">Leads</span>
                                </div>
                                {isAdmin && (
                                    <div className="w-full mt-2 pt-2 border-t border-slate-100 text-center">
                                        <div className="text-[8px] text-slate-400 font-bold uppercase mb-1">{t.overview.topPartner}</div>
                                        <div className="text-[10px] font-bold text-[#865BFF] truncate w-full">{(point as any).topPartner}</div>
                                    </div>
                                )}
                                <div className="mt-2 pt-2 border-t border-slate-100 w-full flex justify-around">
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-bold text-emerald-500">{point.conversion || '0%'}</span>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase">{t.overview.conversion}</span>
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <span className="text-xs font-bold text-blue-500">↑ 5%</span>
                                        <span className="text-[8px] text-slate-400 font-bold uppercase">{t.overview.growth}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
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
                    <div className={`text-[10px] font-bold uppercase tracking-widest mb-1 flex items-center gap-1.5 ${
                            isAdmin ? 'text-amber-500/60' : 'text-[#865BFF]/60'
                        }`}>
                        {isAdmin ? <><Shield className="w-3 h-3" /><span>ZONA ADMIN</span></> : t.overview.materialsReady}
                    </div>
                    <h3 className="text-white font-bold text-base">
                        {isAdmin ? 'Gestiona tu red de Partners' : t.overview.materialsTitle}
                    </h3>
                    <p className="text-white/50 text-sm mt-1">
                        {isAdmin ? 'Ver roles, actividades y estadísticas de cada partner' : t.overview.materialsSubtitle}
                    </p>
                </div>
                <button className="relative z-10 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex-shrink-0">
                    <ExternalLink className="w-4 h-4" />
                    {isAdmin ? 'Ver Partners' : t.overview.viewMaterials}
                </button>
            </motion.div>
        </motion.div>
    );
}
