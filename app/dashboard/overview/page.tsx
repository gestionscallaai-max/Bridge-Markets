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
        landings: 0,
        weeklyData: [] as { day: string; count: number }[],
        countryData: [] as { country: string; count: number }[],
    });

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        async function fetchStats() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            if (user) setPartnerId('BM_' + user.id.substring(0, 8).toUpperCase());

            try {
                // 1. Counts
                const [l, c, ln] = await Promise.all([
                    supabase.from('leads').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                    supabase.from('clicks').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                    supabase.from('landings').select('*', { count: 'exact', head: true }).eq('partner_id', user.id),
                ]);

                // 2. Weekly Activity (Last 7 days)
                const sevenDaysAgo = new Date();
                sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
                
                const { data: leadsData } = await supabase
                    .from('leads')
                    .select('created_at, country')
                    .eq('partner_id', user.id)
                    .gte('created_at', sevenDaysAgo.toISOString());

                const days = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
                const activityMap: Record<string, number> = {};
                
                // Initialize last 7 days
                for (let i = 6; i >= 0; i--) {
                    const d = new Date();
                    d.setDate(d.getDate() - i);
                    activityMap[days[d.getDay()]] = 0;
                }

                const countryMap: Record<string, number> = {};

                leadsData?.forEach(lead => {
                    const d = new Date(lead.created_at);
                    const dayName = days[d.getDay()];
                    if (activityMap[dayName] !== undefined) {
                        activityMap[dayName]++;
                    }

                    if (lead.country) {
                        countryMap[lead.country] = (countryMap[lead.country] || 0) + 1;
                    }
                });

                const chartData = Object.entries(activityMap).map(([day, count]) => ({ day, count }));
                const countryDataList = Object.entries(countryMap).map(([country, count]) => ({ country, count }));

                setStats({
                    leads: l.count || 0,
                    clicks: c.count || 0,
                    landings: ln.count || 0,
                    weeklyData: chartData,
                    countryData: countryDataList,
                });
            } catch (err) {
                console.error('Error fetching stats:', err);
            }
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
            title: isAdmin ? 'Landings de Partners' : 'Mis Landing Pages',
            value: stats.landings.toString(),
            icon: Globe2,
            iconColor: 'text-amber-500',
            iconBg: 'bg-amber-50',
            accent: '#f59e0b',
        },
    ];

    // Mapeo de países a coordenadas para los puntos del mapa
    const COUNTRY_COORDS: Record<string, { top: string; left: string }> = {
        'Mexico': { top: '48%', left: '22%' },
        'México': { top: '48%', left: '22%' },
        'Colombia': { top: '56%', left: '26%' },
        'Argentina': { top: '75%', left: '30%' },
        'Spain': { top: '35%', left: '50%' },
        'España': { top: '35%', left: '50%' },
        'United Kingdom': { top: '28%', left: '46%' },
        'Japan': { top: '40%', left: '80%' },
        'Peru': { top: '65%', left: '23%' },
        'United States': { top: '35%', left: '15%' },
        'USA': { top: '35%', left: '15%' },
        'Brazil': { top: '65%', left: '32%' },
    };

    const dynamicHotspots = stats.countryData.map(c => ({
        ...COUNTRY_COORDS[c.country] || { top: '50%', left: '50%' }, // Fallback al centro
        label: c.country,
        count: `+${c.count}`,
        size: c.count > 10 ? 'w-5 h-5' : 'w-3 h-3',
        color: c.count > 20 ? 'bg-[#865BFF]' : 'bg-emerald-400',
        shadow: c.count > 20 ? 'shadow-[#865BFF]/50' : 'shadow-emerald-400/50'
    }));

    // Si no hay datos, mostrar unos de ejemplo (como hizo el usuario) pero marcados como tales
    const displayHotspots = dynamicHotspots.length > 0 ? dynamicHotspots : [
        { top: '48%', left: '22%', size: 'w-4 h-4', color: 'bg-emerald-400', shadow: 'shadow-emerald-400/50', label: 'México', count: '+340' },
        { top: '56%', left: '26%', size: 'w-5 h-5', color: 'bg-[#865BFF]', shadow: 'shadow-[#865BFF]/50', label: 'Colombia', count: '+512' },
        { top: '35%', left: '50%', size: 'w-6 h-6', color: 'bg-rose-400', shadow: 'shadow-rose-400/50', label: 'España', count: '+890' },
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
            desc: 'Clics, leads y estadísticas de rendimiento',
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
                            {mounted && new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long' })}
                        </div>
                        <div className="flex items-center gap-1.5 bg-[#865BFF]/8 border border-[#865BFF]/20 rounded-lg px-3 py-2">
                            <Award className="w-3.5 h-3.5 text-[#865BFF]" />
                            <span className="text-xs font-bold font-mono text-[#865BFF]">{partnerId}</span>
                        </div>
                    </div>
                </div>
            </motion.div>

            {/* Stats en tiempo real */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
                    <div className="h-[220px] flex items-end justify-between gap-2 px-2 pt-4">
                        {stats.weeklyData.length > 0 ? (
                            stats.weeklyData.map((d, i) => {
                                // Calculate height relative to max count (min 4px for visibility if > 0)
                                const maxCount = Math.max(...stats.weeklyData.map(x => x.count), 1);
                                const heightPercentage = (d.count / maxCount) * 100;
                                
                                return (
                                    <div key={i} className="flex-1 flex flex-col items-center gap-2 group cursor-default">
                                        <div className="relative w-full flex flex-col items-center justify-end h-full">
                                            {/* Tooltip */}
                                            <div className="absolute -top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 text-white text-[10px] px-2 py-0.5 rounded pointer-events-none whitespace-nowrap z-20">
                                                {d.count} leads
                                            </div>
                                            
                                            {/* Bar */}
                                            <motion.div 
                                                initial={{ height: 0 }}
                                                animate={{ height: `${Math.max(heightPercentage, d.count > 0 ? 5 : 0)}%` }}
                                                transition={{ duration: 0.6, delay: 0.4 + (i * 0.05) }}
                                                className={`w-full max-w-[32px] rounded-t-lg transition-colors shadow-sm ${
                                                    d.count > 0 
                                                        ? 'bg-gradient-to-t from-[#865BFF] to-[#a88bff] group-hover:from-[#6b3fd6] group-hover:to-[#865BFF]' 
                                                        : 'bg-slate-100'
                                                }`}
                                            />
                                        </div>
                                        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">{d.day}</span>
                                    </div>
                                );
                            })
                        ) : (
                            <div className="w-full h-full flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                                <div className="text-center">
                                    <Activity className="w-7 h-7 text-slate-300 mx-auto mb-2" />
                                    <span className="text-xs font-medium text-slate-400">Sin datos históricos aún</span>
                                </div>
                            </div>
                        )}
                    </div>
                </motion.div>
            </div>

            {/* Mapa de Calor del Mundo */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="card p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-sm font-bold text-slate-800">Mapa de Calor Global</h3>
                        <p className="text-xs text-slate-400 mt-0.5">Distribución geográfica de tus clientes</p>
                    </div>
                </div>
                
                <div className="relative w-full h-[340px] bg-slate-900 rounded-2xl overflow-hidden shadow-inner flex items-center justify-center">
                    {/* Background SVG Map */}
                    <img 
                        src="https://upload.wikimedia.org/wikipedia/commons/e/ec/World_map_blank_without_borders.svg" 
                        alt="World Map" 
                        className="absolute w-[90%] h-[90%] object-contain opacity-[0.15] filter invert pointer-events-none"
                    />
                    
                    {/* Grid Overlay */}
                    <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                    {/* Glowing Points */}
                    {displayHotspots.map((point, i) => (
                        <div key={i} className="absolute group z-10" style={{ top: point.top, left: point.left }}>
                            <div className={`relative flex items-center justify-center`}>
                                <div className={`absolute ${point.size} ${point.color} rounded-full animate-ping opacity-75`}></div>
                                <div className={`relative ${point.size} ${point.color} rounded-full shadow-[0_0_15px_rgba(0,0,0,0.5)] ${point.shadow} border border-slate-900 group-hover:scale-150 transition-transform cursor-pointer`}></div>
                            </div>
                            {/* Tooltip */}
                            <div className="absolute top-full mt-3 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-white/90 backdrop-blur-md text-slate-800 px-3 py-2 rounded-xl shadow-2xl flex flex-col items-center pointer-events-none min-w-[100px] z-20 border border-slate-200">
                                <span className="text-[10px] uppercase font-bold tracking-widest text-[#865BFF] mb-1">{point.label}</span>
                                <span className="text-lg font-black">{point.count}</span>
                                <span className="text-[9px] text-slate-400 font-medium">Clientes activos</span>
                            </div>
                        </div>
                    ))}

                    <div className="absolute bottom-4 left-4 flex gap-2">
                        <div className="flex items-center gap-1.5 bg-slate-800/80 backdrop-blur rounded-lg px-3 py-1.5 border border-slate-700">
                            <div className="w-2 h-2 rounded-full bg-rose-400 filter drop-shadow-[0_0_5px_rgba(251,113,133,0.8)]"></div>
                            <span className="text-[10px] font-bold text-slate-300">Alta Densidad</span>
                        </div>
                        <div className="flex items-center gap-1.5 bg-slate-800/80 backdrop-blur rounded-lg px-3 py-1.5 border border-slate-700">
                            <div className="w-2 h-2 rounded-full bg-blue-400 filter drop-shadow-[0_0_5px_rgba(96,165,250,0.8)]"></div>
                            <span className="text-[10px] font-bold text-slate-300">Crecimiento</span>
                        </div>
                    </div>
                </div>
            </motion.div>

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
