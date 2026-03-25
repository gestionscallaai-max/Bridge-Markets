"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';
import { Users, Zap, Download, Database, ArrowUpRight, ArrowDownRight, Globe2, Smartphone, Monitor, Briefcase, Activity, DollarSign, ArrowUpCircle, TrendingUp } from 'lucide-react';
import { useAdmin } from '../layout';

// PARTNER DATA
const PARTNER_STATS = [
    { id: 1, title: "Usuarios Totales", value: "14,291", change: "+12.4%", timeframe: "este mes", icon: Users, iconColor: "text-[#6b3fd6]", iconBg: "bg-[#f3efff]" },
    { id: 2, title: "Sesiones Activas", value: "847", change: "+8.7%", timeframe: "hoy", icon: Zap, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
    { id: 3, title: "Descargas de Material", value: "3,112", change: "+15.2%", timeframe: "este mes", icon: Download, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    { id: 4, title: "Workspaces Creados", value: "940", change: "+22.1%", timeframe: "este mes", icon: Database, iconColor: "text-amber-600", iconBg: "bg-amber-50" }
];

const PARTNER_CHANNELS = [
    { name: "Orgánico", value: 65, color: "bg-[#865BFF]" },
    { name: "Referidos", value: 25, color: "bg-blue-500" },
    { name: "Redes Sociales", value: 10, color: "bg-emerald-500" }
];

const PARTNER_COUNTRIES = [
    { name: "España", code: "ES", users: "4,209", percentage: "45%" },
    { name: "México", code: "MX", users: "2,841", percentage: "30%" },
    { name: "Colombia", code: "CO", users: "1,420", percentage: "15%" },
    { name: "Argentina", code: "AR", users: "980", percentage: "10%" },
];

const PARTNER_CHART_DATA = [
    { day: 'Lun', value: 35 },
    { day: 'Mar', value: 55 },
    { day: 'Mié', value: 25 },
    { day: 'Jue', value: 65 },
    { day: 'Vie', value: 45 },
    { day: 'Sáb', value: 80 },
    { day: 'Dom', value: 85 }
];

// ADMIN DATA
const ADMIN_STATS = [
    { id: 1, title: "Partners Totales", value: "1,204", change: "+5.2%", timeframe: "este mes", icon: Briefcase, iconColor: "text-slate-700", iconBg: "bg-slate-100" },
    { id: 2, title: "Comisiones Pagadas", value: "$452.8k", change: "+18.4%", timeframe: "este trimestre", icon: DollarSign, iconColor: "text-emerald-600", iconBg: "bg-emerald-50" },
    { id: 3, title: "Volumen de Trading", value: "$12.4M", change: "+8.9%", timeframe: "hoy", icon: Activity, iconColor: "text-blue-600", iconBg: "bg-blue-50" },
    { id: 4, title: "Nuevas Cuentas FTD", value: "8,942", change: "+14.1%", timeframe: "este mes", icon: ArrowUpCircle, iconColor: "text-[#6b3fd6]", iconBg: "bg-[#f3efff]" }
];

const ADMIN_CHANNELS = [
    { name: "Afiliados Top 10%", value: 45, color: "bg-slate-700" },
    { name: "Programa Estándar", value: 40, color: "bg-blue-500" },
    { name: "Campañas Directas", value: 15, color: "bg-[#865BFF]" }
];

const ADMIN_COUNTRIES = [
    { name: "Brasil", code: "BR", users: "12,450", percentage: "35%" },
    { name: "España", code: "ES", users: "8,209", percentage: "25%" },
    { name: "México", code: "MX", users: "6,841", percentage: "20%" },
    { name: "Chile", code: "CL", users: "5,420", percentage: "15%" },
];

const ADMIN_CHART_DATA = [
    { day: 'Lun', value: 60 },
    { day: 'Mar', value: 45 },
    { day: 'Mié', value: 70 },
    { day: 'Jue', value: 85 },
    { day: 'Vie', value: 65 },
    { day: 'Sáb', value: 95 },
    { day: 'Dom', value: 100 }
];

export default function OverviewPage() {
    const { isAdmin } = useAdmin();

    const STATS = isAdmin ? ADMIN_STATS : PARTNER_STATS;
    const CHANNELS = isAdmin ? ADMIN_CHANNELS : PARTNER_CHANNELS;
    const COUNTRIES = isAdmin ? ADMIN_COUNTRIES : PARTNER_COUNTRIES;
    const CHART_DATA = isAdmin ? ADMIN_CHART_DATA : PARTNER_CHART_DATA;

    return (
        <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="space-y-6 pb-10"
        >
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {STATS.map((stat, idx) => {
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
                                    <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${stat.change.startsWith('+') ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-slate-400 text-[10px] font-medium">{stat.timeframe}</span>
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
                            {isAdmin ? 'Ingresos Consolidados Netos (USD)' : 'Nuevos Usuarios Registrados'}
                        </h3>
                        <p className="text-xs text-slate-400 mt-0.5">Rendimiento de los últimos 7 días</p>
                    </div>
                    <button className="px-4 py-1.5 text-[12px] font-semibold text-slate-600 border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors">
                        Últimos 7 días
                    </button>
                </div>

                {/* Animated Recharts AreaChart */}
                <div className="h-[300px] w-full mt-4">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={CHART_DATA} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                                <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor={isAdmin ? "#334155" : "#865BFF"} stopOpacity={0.3} />
                                    <stop offset="95%" stopColor={isAdmin ? "#334155" : "#865BFF"} stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dy={10} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#94a3b8' }} dx={-10} tickFormatter={(val) => isAdmin ? `$${val}k` : val} />
                            <Tooltip
                                contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)' }}
                                labelStyle={{ fontWeight: 'bold', color: '#1e293b', marginBottom: '4px' }}
                                formatter={(value: any) => [isAdmin ? `$${value}k` : value, isAdmin ? 'Ingresos' : 'Usuarios']}
                            />
                            <Area
                                type="monotone"
                                dataKey="value"
                                stroke={isAdmin ? "#334155" : "#865BFF"}
                                strokeWidth={3}
                                fillOpacity={1}
                                fill="url(#colorValue)"
                                animationDuration={1500}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </motion.div>

            {/* Secondary Metrics */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className="grid grid-cols-1 lg:grid-cols-3 gap-4"
            >
                {/* Channels */}
                <div className="card p-6">
                    <h4 className="text-sm font-bold text-slate-800 mb-5">{isAdmin ? 'Distribución de Ingresos' : 'Canales de Adquisición'}</h4>
                    <div className="space-y-4">
                        {CHANNELS.map(channel => (
                            <div key={channel.name}>
                                <div className="flex justify-between text-[12px] font-semibold mb-1.5">
                                    <span className="text-slate-600">{channel.name}</span>
                                    <span className="text-slate-800">{channel.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full transition-all duration-500 ${channel.color}`} style={{ width: `${channel.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Countries */}
                <div className="card p-6">
                    <h4 className="text-sm font-bold text-slate-800 mb-5">{isAdmin ? 'Mercados Principales' : 'Top Países'}</h4>
                    <div className="space-y-3">
                        {COUNTRIES.map((country, idx) => (
                            <div key={country.code} className="flex items-center gap-3">
                                <div className="w-5 text-center text-[11px] font-semibold text-slate-400">{idx + 1}</div>
                                <div className="w-8 h-8 rounded-lg bg-slate-50 border border-slate-200 flex items-center justify-center text-[11px] font-bold text-slate-600">
                                    {country.code}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between text-[12px] font-semibold mb-1">
                                        <span className="text-slate-700">{country.name}</span>
                                        <span className="text-slate-500">{country.users}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-brand-light" style={{ width: country.percentage }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices */}
                <div className="card p-6 flex flex-col justify-between">
                    <h4 className="text-sm font-bold text-slate-800 mb-4">Dispositivos Principales</h4>
                    <div className="space-y-3">
                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div className={`w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center ${isAdmin ? 'text-slate-700' : 'text-brand-500'}`}>
                                <Monitor className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Desktop</div>
                                <div className="text-lg font-bold text-slate-800">{isAdmin ? '54.2%' : '68.5%'}</div>
                            </div>
                            <div className="text-emerald-600 font-semibold text-[12px] flex items-center">
                                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> {isAdmin ? '2.1%' : '5.2%'}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100">
                            <div className={`w-10 h-10 bg-white rounded-lg border border-slate-200 flex items-center justify-center ${isAdmin ? 'text-brand-500' : 'text-blue-500'}`}>
                                <Smartphone className="w-5 h-5" />
                            </div>
                            <div className="flex-1">
                                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">Mobile</div>
                                <div className="text-lg font-bold text-slate-800">{isAdmin ? '45.8%' : '31.5%'}</div>
                            </div>
                            <div className="text-emerald-600 font-semibold text-[12px] flex items-center">
                                <ArrowUpRight className="w-3.5 h-3.5 mr-0.5" /> {isAdmin ? '8.4%' : '1.1%'}
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </motion.div>
    );
}
