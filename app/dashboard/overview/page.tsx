"use client";

import React from 'react';
import { Users, Zap, Download, Database, ArrowUpRight, ArrowDownRight, Globe2, Smartphone, Monitor, Briefcase, Activity, DollarSign, ArrowUpCircle } from 'lucide-react';
import { useAdmin } from '../layout';

// PARTNER DATAS
const PARTNER_STATS = [
    { id: 1, title: "Usuarios Totales", value: "14,291", change: "+12.4%", timeframe: "este mes", icon: Users, iconColor: "text-[#a855f7]", iconBg: "bg-[#f3e8ff]" },
    { id: 2, title: "Sesiones Activas", value: "847", change: "+8.7%", timeframe: "hoy", icon: Zap, iconColor: "text-[#3b82f6]", iconBg: "bg-[#eff6ff]" },
    { id: 3, title: "Descargas de Material", value: "3,112", change: "+15.2%", timeframe: "este mes", icon: Download, iconColor: "text-[#22c55e]", iconBg: "bg-[#f0fdf4]" },
    { id: 4, title: "Workspaces Creados", value: "940", change: "+22.1%", timeframe: "este mes", icon: Database, iconColor: "text-[#eab308]", iconBg: "bg-[#fefce8]" }
];

const PARTNER_CHANNELS = [
    { name: "Orgánico", value: 65, color: "bg-[#a855f7]" },
    { name: "Referidos", value: 25, color: "bg-[#3b82f6]" },
    { name: "Redes Sociales", value: 10, color: "bg-[#14b8a6]" }
];

const PARTNER_COUNTRIES = [
    { name: "España", code: "ES", users: "4,209", percentage: "45%" },
    { name: "México", code: "MX", users: "2,841", percentage: "30%" },
    { name: "Colombia", code: "CO", users: "1,420", percentage: "15%" },
    { name: "Argentina", code: "AR", users: "980", percentage: "10%" },
];

const PARTNER_CHART_DATA = [35, 55, 25, 65, 45, 80, 85];

// ADMIN DATAS
const ADMIN_STATS = [
    { id: 1, title: "Partners Totales", value: "1,204", change: "+5.2%", timeframe: "este mes", icon: Briefcase, iconColor: "text-slate-800", iconBg: "bg-slate-100" },
    { id: 2, title: "Comisiones Pagadas", value: "$452.8k", change: "+18.4%", timeframe: "este trimestre", icon: DollarSign, iconColor: "text-emerald-600", iconBg: "bg-emerald-100" },
    { id: 3, title: "Volumen de Trading", value: "$12.4M", change: "+8.9%", timeframe: "hoy", icon: Activity, iconColor: "text-[#3b82f6]", iconBg: "bg-[#eff6ff]" },
    { id: 4, title: "Nuevas Cuentas FTD", value: "8,942", change: "+14.1%", timeframe: "este mes", icon: ArrowUpCircle, iconColor: "text-[#a855f7]", iconBg: "bg-[#f3e8ff]" }
];

const ADMIN_CHANNELS = [
    { name: "Afiliados Top 10%", value: 45, color: "bg-slate-800" },
    { name: "Programa Estándar", value: 40, color: "bg-[#3b82f6]" },
    { name: "Campañas Directas", value: 15, color: "bg-[#a855f7]" }
];

const ADMIN_COUNTRIES = [
    { name: "Brasil", code: "BR", users: "12,450", percentage: "35%" },
    { name: "España", code: "ES", users: "8,209", percentage: "25%" },
    { name: "México", code: "MX", users: "6,841", percentage: "20%" },
    { name: "Chile", code: "CL", users: "5,420", percentage: "15%" },
];

const ADMIN_CHART_DATA = [60, 45, 70, 85, 65, 95, 100]; // Higher volume data

export default function OverviewPage() {
    const { isAdmin } = useAdmin();

    const STATS = isAdmin ? ADMIN_STATS : PARTNER_STATS;
    const CHANNELS = isAdmin ? ADMIN_CHANNELS : PARTNER_CHANNELS;
    const COUNTRIES = isAdmin ? ADMIN_COUNTRIES : PARTNER_COUNTRIES;
    const CHART_DATA = isAdmin ? ADMIN_CHART_DATA : PARTNER_CHART_DATA;

    return (
        <div className="space-y-8 pb-10">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {STATS.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div
                            key={stat.id}
                            className={`bg-white rounded-[20px] p-6 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex items-start gap-4 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-shadow duration-300 relative overflow-hidden group ${isAdmin ? 'border-2 border-slate-900/5' : 'border border-slate-100'}`}
                        >
                            <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${stat.iconBg} ${stat.iconColor}`}>
                                <Icon className="w-6 h-6" strokeWidth={1.5} />
                            </div>
                            <div className="flex-1 min-w-0 flex flex-col">
                                <h3 className="text-[#64748b] text-[12px] font-bold tracking-wide">{stat.title}</h3>
                                <div className="text-[26px] leading-tight font-extrabold text-slate-800 tracking-tight my-1">{stat.value}</div>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded-full tracking-wide ${stat.change.startsWith('+') ? 'bg-[#dcfce7] text-[#166534]' : 'bg-rose-100 text-rose-700'}`}>
                                        {stat.change}
                                    </span>
                                    <span className="text-[#0f172a] text-[10px] font-bold">{stat.timeframe}</span>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Main Content Area */}
            <div className="space-y-4">
                <h3 className="text-[20px] font-bold text-slate-800 tracking-tight">Rendimiento de los últimos 7 días</h3>

                <div className="bg-white rounded-[20px] border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col overflow-hidden p-8">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-4">
                        <h4 className="text-[15px] font-extrabold text-slate-800">
                            {isAdmin ? 'Ingresos Consolidados Netos (USD)' : 'Nuevos Usuarios Registrados'}
                        </h4>
                        <button className="px-5 py-2 text-[12px] font-bold text-slate-600 border border-slate-200 rounded-xl hover:bg-slate-50 transition-colors">
                            Últimos 7 días
                        </button>
                    </div>

                    {/* Main Chart Container */}
                    <div className="flex w-full min-h-[320px] relative mt-4">

                        {/* Y-Axis Labels */}
                        <div className="flex flex-col justify-between py-6 pr-4 text-[11px] font-bold text-slate-400 text-right w-12 shrink-0 border-r border-slate-100 z-10">
                            <span>{isAdmin ? '500k' : '100'}</span>
                            <span>{isAdmin ? '375k' : '75'}</span>
                            <span>{isAdmin ? '250k' : '50'}</span>
                            <span>{isAdmin ? '125k' : '25'}</span>
                            <span>0</span>
                        </div>

                        <div className="flex-1 flex flex-col relative px-4">
                            {/* Grid lines */}
                            <div className="absolute inset-x-4 inset-y-6 flex flex-col justify-between pointer-events-none z-0">
                                {[1, 2, 3, 4, 5].map((_, i) => (
                                    <div key={i} className={`w-full h-px ${i === 4 ? 'bg-slate-100' : 'border-t border-dashed border-slate-100'}`}></div>
                                ))}
                            </div>

                            {/* Bars mock */}
                            <div className="flex-1 w-full flex items-end justify-around relative z-10 pt-6 pb-6">
                                {CHART_DATA.map((height, i) => (
                                    <div key={i} className="relative w-full max-w-[42px] flex justify-center items-end h-full group">
                                        {/* Tooltip */}
                                        <div className="opacity-0 group-hover:opacity-100 absolute -top-10 left-1/2 -translate-x-1/2 bg-slate-800 text-white text-[11px] font-bold px-3 py-1.5 rounded-lg transition-all duration-200 z-20 shadow-lg pointer-events-none mb-2 translate-y-2 group-hover:translate-y-0">
                                            {isAdmin ? `$${height * 5}k` : height * 12}
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-800 rotate-45"></div>
                                        </div>

                                        <div
                                            className={`w-full rounded-t-lg transition-all duration-300 cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.05)] ${isAdmin ? 'bg-slate-800 hover:bg-slate-700' : 'bg-gradient-to-t from-[#cfabff] to-[#a855f7] hover:from-[#a855f7] hover:to-[#9333ea] group-hover:shadow-[0_8px_20px_rgba(168,85,247,0.3)]'}`}
                                            style={{ height: `${height}%` }}
                                        ></div>
                                    </div>
                                ))}
                            </div>

                            {/* X-Axis Labels */}
                            <div className="flex justify-around mt-2">
                                {['Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb', 'Dom'].map(day => (
                                    <div key={day} className="text-[11px] font-bold text-slate-500 w-full max-w-[42px] text-center">{day}</div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Secondary Metrics Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Acquisition Channels */}
                <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col">
                    <h4 className="text-[15px] font-extrabold text-slate-800 mb-6"> {isAdmin ? 'Distribución de Ingresos' : 'Canales de Adquisición'}</h4>
                    <div className="space-y-5 flex-1 flex flex-col justify-center">
                        {CHANNELS.map(channel => (
                            <div key={channel.name}>
                                <div className="flex justify-between text-[13px] font-bold mb-2">
                                    <span className="text-slate-600">{channel.name}</span>
                                    <span className="text-slate-800">{channel.value}%</span>
                                </div>
                                <div className="w-full bg-slate-100 h-2.5 rounded-full overflow-hidden">
                                    <div className={`h-full rounded-full ${channel.color}`} style={{ width: `${channel.value}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Top Countries */}
                <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col">
                    <h4 className="text-[15px] font-extrabold text-slate-800 mb-6">{isAdmin ? 'Mercados Principales' : 'Top Países'}</h4>
                    <div className="space-y-4 flex-1">
                        {COUNTRIES.map((country, idx) => (
                            <div key={country.code} className="flex items-center gap-4">
                                <div className="w-6 text-center text-[12px] font-bold text-slate-400">{idx + 1}</div>
                                <div className="w-8 h-8 rounded-full bg-slate-50 border border-slate-100 flex items-center justify-center text-[12px] font-black shrink-0 text-slate-600">
                                    {country.code}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="flex justify-between text-[13px] font-bold mb-1">
                                        <span className="text-slate-700 truncate">{country.name}</span>
                                        <span className="text-slate-500">{country.users}</span>
                                    </div>
                                    <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                                        <div className="h-full rounded-full bg-slate-300" style={{ width: country.percentage }}></div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Devices Summary */}
                <div className="bg-white rounded-[20px] p-6 border border-slate-100 shadow-[0_4px_24px_rgba(0,0,0,0.02)] flex flex-col justify-between">
                    <h4 className="text-[15px] font-extrabold text-slate-800 mb-2">Dispositivos Principales</h4>
                    <div className="flex-1 flex flex-col justify-center gap-6">
                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                            <div className={`w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center ${isAdmin ? 'text-slate-800' : 'text-[#a855f7]'}`}>
                                <Monitor className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Desktop</div>
                                <div className="text-[20px] font-black text-slate-800">{isAdmin ? '54.2%' : '68.5%'}</div>
                            </div>
                            <div className="ml-auto text-emerald-500 font-bold text-[13px] flex items-center">
                                <ArrowUpRight className="w-4 h-4 mr-0.5" /> {isAdmin ? '2.1%' : '5.2%'}
                            </div>
                        </div>

                        <div className="flex items-center gap-4 p-4 rounded-2xl bg-slate-50 border border-slate-100/50">
                            <div className={`w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center ${isAdmin ? 'text-[#a855f7]' : 'text-[#3b82f6]'}`}>
                                <Smartphone className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-[12px] font-bold text-slate-500 uppercase tracking-wide">Mobile</div>
                                <div className="text-[20px] font-black text-slate-800">{isAdmin ? '45.8%' : '31.5%'}</div>
                            </div>
                            <div className="ml-auto text-emerald-500 font-bold text-[13px] flex items-center">
                                <ArrowUpRight className="w-4 h-4 mr-0.5" /> {isAdmin ? '8.4%' : '1.1%'}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
