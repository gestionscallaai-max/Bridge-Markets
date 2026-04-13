"use client";

import React from 'react';
import { Download, Filter, Search, Calendar, ChevronDown, CheckCircle2, Clock, XCircle } from 'lucide-react';

const MOCK_CONVERSIONS = [
    { id: 'CONV-8829', user: 'user_4f92...a1b', amount: '$50.00', date: '12 Sep 2023 14:30', status: 'Aprobado', campaign: 'Campaña Principal ES', type: 'CPA' },
    { id: 'CONV-8828', user: 'user_9c21...8f2', amount: '$12.50', date: '12 Sep 2023 11:15', status: 'Pendiente', campaign: 'Promo Crypto 100%', type: 'RevShare' },
    { id: 'CONV-8827', user: 'user_3b44...7c1', amount: '$120.00', date: '11 Sep 2023 09:45', status: 'Aprobado', campaign: 'Promo VIP', type: 'CPA' },
    { id: 'CONV-8826', user: 'user_1a77...9e3', amount: '-', date: '10 Sep 2023 16:20', status: 'Rechazado', campaign: 'Campaña Principal ES', type: 'CPA' },
    { id: 'CONV-8825', user: 'user_7f33...2d8', amount: '$45.00', date: '09 Sep 2023 08:10', status: 'Aprobado', campaign: 'Blog Post Forex', type: 'CPL' },
    { id: 'CONV-8824', user: 'user_2e55...4b6', amount: '$8.25', date: '08 Sep 2023 19:55', status: 'Aprobado', campaign: 'Promo Crypto 100%', type: 'RevShare' },
];

const StatusBadge = ({ status }: { status: string }) => {
    switch (status) {
        case 'Aprobado':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Aprobado
                </span>
            );
        case 'Pendiente':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-50 text-amber-600 border border-amber-100">
                    <Clock className="w-3.5 h-3.5" /> Pendiente
                </span>
            );
        case 'Rechazado':
            return (
                <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-rose-50 text-rose-600 border border-rose-100">
                    <XCircle className="w-3.5 h-3.5" /> Rechazado
                </span>
            );
        default:
            return null;
    }
};

export default function ConversionsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({ total: 0, approved: 0, pending: 0, rejected: 0 });

    useEffect(() => {
        async function fetchData() {
            setLoading(true);
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) return;

            const { data, error } = await supabase
                .from('leads')
                .select('*')
                .eq('partner_id', user.id)
                .order('created_at', { ascending: false });

            if (data) {
                setLeads(data);
                const approved = data.filter(l => l.status === 'funded' || l.status === 'trading').length;
                const pending = data.filter(l => l.status === 'new' || l.status === 'registered').length;
                const rejected = data.filter(l => l.status === 'rejected').length;
                setStats({ total: data.length, approved, pending, rejected });
            }
            setLoading(false);
        }
        fetchData();
    }, []);

    const mapStatus = (status: string) => {
        if (status === 'funded' || status === 'trading') return 'Aprobado';
        if (status === 'rejected') return 'Rechazado';
        return 'Pendiente';
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Reporte de Conversiones</h2>
                    <p className="text-slate-500 text-sm">Registro detallado de acciones generadas por tus referidos.</p>
                </div>
                <button className="bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm w-fit">
                    <Download className="w-4 h-4" /> Exportar CSV
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                {/* Advanced Filters */}
                <div className="p-4 border-b border-slate-200 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 bg-slate-50/50">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar por ID o usuario..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-[#865BFF] focus:ring-1 focus:ring-[#865BFF] transition-all"
                        />
                    </div>

                    <div className="relative">
                        <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <div className="w-full pl-9 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 cursor-pointer flex justify-between items-center">
                            <span>Últimos 30 días</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3" />
                        </div>
                    </div>

                    <div className="relative flex">
                        <div className="w-full pl-4 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 cursor-pointer flex justify-between items-center">
                            <span>Campaña: Todas</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3" />
                        </div>
                    </div>

                    <div className="relative flex">
                        <div className="w-full pl-4 pr-8 py-2 bg-white border border-slate-300 rounded-lg text-sm text-slate-600 cursor-pointer flex justify-between items-center">
                            <span>Estado: Todos</span>
                            <ChevronDown className="w-4 h-4 text-slate-400 absolute right-3" />
                        </div>
                    </div>
                </div>

                {/* KPI Summary Strip */}
                <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-slate-100 border-b border-slate-200 bg-white">
                    <div className="p-4 text-center">
                        <div className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Total Conversiones</div>
                        <div className="text-xl font-black text-slate-800">{stats.total}</div>
                    </div>
                    <div className="p-4 text-center bg-emerald-50/30">
                        <div className="text-xs font-bold text-emerald-600/70 uppercase tracking-widest mb-1">Aprobadas</div>
                        <div className="text-xl font-black text-emerald-600">{stats.approved}</div>
                    </div>
                    <div className="p-4 text-center bg-amber-50/30">
                        <div className="text-xs font-bold text-amber-600/70 uppercase tracking-widest mb-1">Pendientes</div>
                        <div className="text-xl font-black text-amber-600">{stats.pending}</div>
                    </div>
                    <div className="p-4 text-center bg-rose-50/30">
                        <div className="text-xs font-bold text-rose-600/70 uppercase tracking-widest mb-1">Rechazadas</div>
                        <div className="text-xl font-black text-rose-600">{stats.rejected}</div>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50/80 text-slate-600 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">ID Transacción</th>
                                <th className="px-6 py-4">Fecha & Hora</th>
                                <th className="px-6 py-4">Campaña Original</th>
                                <th className="px-6 py-4">Canal</th>
                                <th className="px-6 py-4 text-right">País</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={6} className="py-20 text-center"><Loader2 className="w-8 h-8 animate-spin text-[#865BFF] mx-auto" /></td></tr>
                            ) : leads.length === 0 ? (
                                <tr><td colSpan={6} className="py-20 text-center text-slate-400 font-medium whitespace-normal px-10">No hay registros de conversión aún.</td></tr>
                            ) : leads.map(lead => (
                                <tr key={lead.id} className="hover:bg-slate-50/80 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{lead.id.substring(0, 8).toUpperCase()}</div>
                                        <div className="text-xs text-slate-400 font-mono mt-0.5" title="Email">{lead.email}</div>
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {new Date(lead.created_at).toLocaleString('es-ES')}
                                    </td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">
                                        {lead.landing_slug || 'Link Directo'}
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex px-2 py-1 bg-slate-100 text-slate-600 rounded text-[11px] font-bold capitalize">
                                            {lead.source}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className="font-black tracking-tight text-slate-800 uppercase">
                                            {lead.country_code || '—'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <StatusBadge status={mapStatus(lead.status)} />
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <div>Mostrando {leads.length} registros</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-slate-200 bg-white rounded-md text-slate-400 cursor-not-allowed">Anterior</button>
                        <button className="px-3 py-1 bg-[#865BFF] text-white rounded-md font-medium shadow-sm">1</button>
                        <button className="px-3 py-1 border border-slate-200 bg-white rounded-md text-slate-400 cursor-not-allowed">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
