"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    Users, DollarSign, Globe2, MousePointerClick,
    Loader2, Activity, ChevronRight, ExternalLink,
    Globe, Zap, BarChart2, Award, Clock, TrendingUp
} from 'lucide-react';
import { useAdmin } from '../layout';
import { supabase } from '@/lib/supabaseClient';

export default function OverviewPage() {
    const router = useRouter();
    const { isAdmin } = useAdmin();
    const [loading, setLoading] = useState(true);
    const [partnerId, setPartnerId] = useState('BM_PARTNER_01');
    const [stats, setStats] = useState({
        leads: 0,
        clicks: 0,
        commissions: 0,
        landings: 0,
    });

    useEffect(() => {
        async function fetchStats() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            if (user) setPartnerId('BM_' + user.id.substring(0, 8).toUpperCase());

            let leadsCount = 0, clicksCount = 0, landingsCount = 0, totalCommissions = 0;

            try {
                let queryLeads = supabase.from('leads').select('*', { count: 'exact', head: true });
                if (!isAdmin) queryLeads = queryLeads.eq('partner_id', user.id);
                const { count: lc } = await queryLeads;
                leadsCount = lc || 0;

                let queryClicks = supabase.from('clicks').select('*', { count: 'exact', head: true });
                if (!isAdmin) queryClicks = queryClicks.eq('partner_id', user.id);
                const { count: cc } = await queryClicks;
                clicksCount = cc || 0;

                let queryComms = supabase.from('commissions').select('amount').eq('status', 'paid');
                if (!isAdmin) queryComms = queryComms.eq('partner_id', user.id);
                const { data: commsData } = await queryComms;
                totalCommissions = commsData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;

                let queryLandings = supabase.from('landings').select('*', { count: 'exact', head: true });
                if (!isAdmin) queryLandings = queryLandings.eq('partner_id', user.id);
                const { count: lndc } = await queryLandings;
                landingsCount = lndc || 0;

            } catch (err) {
                console.error('Error fetching stats:', err);
            }

            setStats({ leads: leadsCount, clicks: clicksCount, commissions: totalCommissions, landings: landingsCount });
            setLoading(false);
        }
        fetchStats();
    }, [isAdmin]);

    const statCards = [
        {
            title: isAdmin ? 'Leads Totales Red' : 'Mis Leads',
            value: stats.leads.toString(),
            icon: Users,
            iconColor: 'text-[#865BFF]',
            iconBg: 'bg-[#865BFF]/10',
            accent: '#865BFF',
        },
        {
            title: isAdmin ? 'Clics Totales' : 'Tráfico / Clics',
            value: stats.clicks.toString(),
            icon: MousePointerClick,
            iconColor: 'text-blue-500',
            iconBg: 'bg-blue-50',
            accent: '#3b82f6',
        },
        {
            title: isAdmin ? 'Comisiones Pagadas' : 'Mis Ganancias',
            value: `$${stats.commissions.toLocaleString()}`,
            icon: DollarSign,
            iconColor: 'text-emerald-500',
            iconBg: 'bg-emerald-50',
            accent: '#10b981',
        },
        {
            title: isAdmin ? 'Landings de Partners' : 'Mis Landing Pages',
            value: stats.landings.toString(),
            icon: Globe2,
            iconColor: 'text-amber-500',
            iconBg: 'bg-amber-50',
            accent: '#f59e0b',
        },
    ];

    const quickActions = [
        {
            label: 'Materiales Promocionales',
            desc: 'Landings y links en 8 idiomas',
            icon: Globe,
            color: '#865BFF',
            bg: 'rgba(134,91,255,0.08)',
            href: '/dashboard/promo/overview',
        },
        {
            label: 'Generador de Landings',
            desc: 'Crea tu landing personalizada en 3 pasos',
            icon: Zap,
            color: '#38bdf8',
            bg: 'rgba(56,189,248,0.08)',
            href: '/dashboard/landing',
        },
        {
            label: 'Mis Clientes',
            desc: 'Gestiona tu cartera de clientes',
            icon: Users,
            color: '#10b981',
            bg: 'rgba(16,185,129,0.08)',
            href: '/dashboard/reports/clients',
        },
        {
            label: 'Informes',
            desc: 'Comisiones, volumen y estadísticas',
            icon: BarChart2,
            color: '#f59e0b',
            bg: 'rgba(245,158,11,0.08)',
            href: '/dashboard/reports/stats',
        },
    ];

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
            </div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 pb-10"
        >
            {/* Bienvenida + Partner ID */}
            <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4 }}
                className="card px-6 py-5"
            >
                <div className="flex items-center justify-between gap-4 flex-wrap">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-[#865BFF] to-[#5b3fd6] flex items-center justify-center shadow-lg shadow-[#865BFF]/20">
                            <TrendingUp className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h1 className="text-base font-bold text-slate-800">
                                {isAdmin ? 'Panel Administrador' : 'Bienvenido, Partner'}
                            </h1>
                            <p className="text-xs text-slate-400 mt-0.5">Datos en tiempo real de tu actividad</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        <div className="flex items-center gap-1.5 text-xs text-slate-400 bg-slate-50 border border-slate-200 rounded-lg px-3 py-2">
                            <Clock className="w-3.5 h-3.5" />
                            {new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#865BFF]/8 border border-[#865BFF]/20 rounded-lg px-3 py-2">
                            <Award className="w-3.5 h-3.5 text-[#865BFF]" />
                            <span className="text-xs font-bold font-mono text-[#865BFF]">{partnerId}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats en tiempo real */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {statCards.map((s, i) => {
                    const Icon = s.icon;
                    return (
                        <motion.div
                            key={s.title}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: i * 0.08 }}
                            className="card p-5 flex items-start gap-4 hover:shadow-md transition-all"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${s.iconBg} ${s.iconColor}`}>
                                <Icon className="w-5 h-5" strokeWidth={1.8} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-slate-400 text-[11px] font-semibold uppercase tracking-wide">{s.title}</h3>
                                <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{s.value}</div>
                                <span className="text-[10px] font-semibold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500 mt-1.5 inline-block">
                                    En tiempo real
                                </span>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Accesos Rápidos + Gráfico placeholder */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
                {/* Accesos rápidos */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.3 }}
                    className="lg:col-span-2 space-y-2"
                >
                    <h2 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Accesos Rápidos</h2>
                    {quickActions.map((action, i) => {
                        const Icon = action.icon;
                        return (
                            <button
                                key={i}
                                onClick={() => router.push(action.href)}
                                className="card w-full px-4 py-3.5 flex items-center gap-3 hover:shadow-md hover:-translate-y-0.5 transition-all text-left group"
                            >
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

                {/* Gráfico de actividad */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.35 }}
                    className="card p-6 lg:col-span-3"
                >
                    <div className="flex items-center justify-between mb-5">
                        <div>
                            <h3 className="text-sm font-bold text-slate-800">
                                {isAdmin ? 'Volumen Generado Consolidado' : 'Registro de Leads Diarios'}
                            </h3>
                            <p className="text-xs text-slate-400 mt-0.5">Se poblará cuando recibas tráfico real</p>
                        </div>
                        <button className="px-3 py-1.5 text-[11px] font-semibold text-slate-500 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                            Esta semana
                        </button>
                    </div>
                    <div className="h-[220px] flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                        <div className="text-center">
                            <Activity className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                            <span className="text-xs font-medium text-slate-400">Sin datos históricos aún</span>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Banner CTA materiales */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="rounded-2xl p-6 flex items-center justify-between gap-4 flex-wrap cursor-pointer relative overflow-hidden"
                style={{ background: 'linear-gradient(135deg,#140633 0%,#2d1060 50%,#865BFF 100%)' }}
                onClick={() => router.push('/dashboard/promo/overview')}
            >
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-white/5 translate-x-16 -translate-y-16" />
                    <div className="absolute bottom-0 left-48 w-32 h-32 rounded-full bg-white/5 translate-y-8" />
                </div>
                <div className="relative z-10">
                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#865BFF]/60 mb-1">Materiales listos</div>
                    <h3 className="text-white font-bold text-base">7 landings · 8 idiomas disponibles</h3>
                    <p className="text-white/50 text-sm mt-1">Comparte tu link personalizado en segundos</p>
                </div>
                <button className="relative z-10 flex items-center gap-2 bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold text-sm px-5 py-2.5 rounded-xl transition-all flex-shrink-0">
                    <ExternalLink className="w-4 h-4" />
                    Ver Materiales
                </button>
            </motion.div>
        </motion.div>
    );
}
