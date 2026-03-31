"use client";

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, Zap, Download, Database, ArrowUpRight, ArrowDownRight, Globe2, Smartphone, Monitor, Briefcase, Activity, DollarSign, ArrowUpCircle, MousePointerClick, Loader2 } from 'lucide-react';
import { useAdmin } from '../layout';
import { supabase } from '@/lib/supabaseClient';

const PARTNER_CHANNELS = [
    { name: "Orgánico", value: 65, color: "bg-[#865BFF]" },
    { name: "Referidos", value: 25, color: "bg-blue-500" },
    { name: "Redes Sociales", value: 10, color: "bg-emerald-500" }
];

const PARTNER_COUNTRIES = [
    { name: "España", code: "ES", users: "0", percentage: "0%" },
];

const PARTNER_CHART_DATA = [
    { day: 'Lun', value: 0 },
    { day: 'Mar', value: 0 },
    { day: 'Mié', value: 0 },
    { day: 'Jue', value: 0 },
    { day: 'Vie', value: 0 },
    { day: 'Sáb', value: 0 },
    { day: 'Dom', value: 0 }
];

export default function OverviewPage() {
    const { isAdmin } = useAdmin();
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        leads: 0,
        clicks: 0,
        commissions: 0,
        landings: 0
    });

    useEffect(() => {
        async function fetchStats() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;
            
            // Extraer info del partner 
            // (Si isAdmin es true, se podría remover el eq('partner_id') para ver totales de la red).
            const partnerFilter = isAdmin ? {} : { partner_id: user.id };

            let leadsCount = 0;
            let clicksCount = 0;
            let landingsCount = 0;
            let totalCommissions = 0;

            try {
                // Total Leads
                let queryLeads = supabase.from('leads').select('*', { count: 'exact', head: true });
                if (!isAdmin) queryLeads = queryLeads.eq('partner_id', user.id);
                const { count: lc } = await queryLeads;
                leadsCount = lc || 0;
                
                // Total Clicks
                let queryClicks = supabase.from('clicks').select('*', { count: 'exact', head: true });
                if (!isAdmin) queryClicks = queryClicks.eq('partner_id', user.id);
                const { count: cc } = await queryClicks;
                clicksCount = cc || 0;
                
                // Commissions
                let queryComms = supabase.from('commissions').select('amount').eq('status', 'paid');
                if (!isAdmin) queryComms = queryComms.eq('partner_id', user.id);
                const { data: commsData } = await queryComms;
                totalCommissions = commsData?.reduce((acc, curr) => acc + Number(curr.amount), 0) || 0;
                
                // Landings
                let queryLandings = supabase.from('landings').select('*', { count: 'exact', head: true });
                if (!isAdmin) queryLandings = queryLandings.eq('partner_id', user.id);
                const { count: lndc } = await queryLandings;
                landingsCount = lndc || 0;

            } catch (error) {
                console.error("Error fetching live stats:", error);
            }

            setStats({
                leads: leadsCount,
                clicks: clicksCount,
                commissions: totalCommissions,
                landings: landingsCount
            });
            setLoading(false);
        }
        
        fetchStats();
    }, [isAdmin]);

    const REAL_STATS = [
        { id: 1, title: isAdmin ? "Leads Totales Red" : "Mis Leads", value: stats.leads.toString(), change: "0%", timeframe: "este mes", icon: Users, iconColor: "text-[#6b3fd6]", iconBg: "bg-[#f3efff]" },
        { id: 2, title: isAdmin ? "Clics Totales Red" : "Tráfico / Clics", value: stats.clicks.toString(), change: "0%", timeframe: "hoy", icon: MousePointerClick, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
        { id: 3, title: isAdmin ? "Comisiones Pagadas" : "Mis Ganancias", value: `$${stats.commissions.toLocaleString()}`, change: "0%", timeframe: "histórico", icon: DollarSign, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
        { id: 4, title: isAdmin ? "Landings de Partners" : "Mis Landing Pages", value: stats.landings.toString(), change: "0%", timeframe: "activas", icon: Globe2, iconColor: "text-amber-600", iconBg: "bg-amber-50" }
    ];

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
            </div>
        );
    }

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 pb-10"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {REAL_STATS.map((stat, idx) => {
                    const Icon = stat.icon;
                    return (
                        <motion.div
                            key={stat.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4, delay: idx * 0.1 }}
                            className="card p-5 flex items-start gap-4 group hover:shadow-card-hover transition-all duration-300"
                        >
                            <div className={`w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ${stat.iconBg} ${stat.iconColor}`}>
                                <Icon className="w-5 h-5" strokeWidth={1.8} />
                            </div>
                            <div className="flex-1 min-w-0">
                                <h3 className="text-slate-500 text-[11px] font-semibold uppercase tracking-wide">{stat.title}</h3>
                                <div className="text-2xl font-bold text-slate-800 tracking-tight mt-0.5">{stat.value}</div>
                                <div className="flex items-center gap-2 mt-1.5">
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded bg-slate-100 text-slate-500`}>
                                        En tiempo real
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="card p-6"
            >
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h3 className="text-[15px] font-bold text-slate-800">
                            {isAdmin ? 'Volumen Generado Consolidado' : 'Registro de Leads Diarios'}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">Rendimiento basado en tu tráfico (Sin datos históricos aún en DB)</p>
                    </div>
                    <button className="px-4 py-1.5 text-[12px] font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        Estadísticas Activas
                    </button>
                </div>

                {/* Animated Recharts AreaChart */}
                <div className="h-[300px] w-full mt-4 flex items-center justify-center bg-slate-50 rounded-xl border border-slate-100 border-dashed">
                    <div className="text-center">
                        <Activity className="w-8 h-8 text-slate-300 mx-auto mb-2" />
                        <span className="text-sm font-medium text-slate-400">El gráfico se poblará en cuanto comiences a recibir tráfico real</span>
                    </div>
                </div>
            </motion.div>

        </motion.div>
    );
}
