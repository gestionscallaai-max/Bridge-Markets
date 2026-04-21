"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { 
    Users, Search, Filter, Download, 
    ExternalLink, Loader2, User, Globe,
    ArrowUpRight, Mail, Phone
} from 'lucide-react';
import { formatDateUpperCase } from '@/lib/utils';

export default function AdminMasterLeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filterSource, setFilterSource] = useState('all');

    useEffect(() => {
        fetchMasterLeads();
    }, []);

    const fetchMasterLeads = async () => {
        setLoading(true);
        try {
            // Join with partners to show who owns the lead
            const { data, error } = await supabase
                .from('leads')
                .select(`
                    *,
                    partners:partner_id (name, email)
                `)
                .order('created_at', { ascending: false });

            if (error) throw error;
            setLeads(data || []);
        } catch (err) {
            console.error('Error fetching master leads:', err);
        } finally {
            setLoading(false);
        }
    };

    const filteredLeads = leads.filter(l => 
        l.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (l.partners?.name || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        l.landing_slug.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const exportToCSV = () => {
        const headers = ['Fecha', 'Lead', 'Email', 'WhatsApp', 'Socio', 'Landing'];
        const rows = filteredLeads.map(l => [
            new Date(l.created_at).toLocaleString(),
            l.name,
            l.email,
            l.whatsapp,
            l.partners?.name || 'N/A',
            l.landing_slug
        ]);

        const csvContent = "data:text/csv;charset=utf-8," 
            + headers.join(",") + "\n" 
            + rows.map(e => e.join(",")).join("\n");

        const encodedUri = encodeURI(csvContent);
        const link = document.createElement("a");
        link.setAttribute("href", encodedUri);
        link.setAttribute("download", `BM_Master_Leads_${new Date().toISOString().split('T')[0]}.csv`);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (loading) {
        return (
            <div className="flex h-[60vh] items-center justify-center">
                <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
            </div>
        );
    }

    return (
        <div className="space-y-6 pb-20">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-black text-slate-800">Master <span className="text-[#865BFF]">Leads</span></h1>
                    <p className="text-sm text-slate-400 mt-1">Supervisión global de prospectos y conversión</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1-2 w-4 h-4 text-slate-400" />
                        <input 
                            type="text" 
                            placeholder="Buscar lead, socio o landing..."
                            className="bg-white border border-slate-200 rounded-xl pl-10 pr-4 py-2.5 text-sm w-full md:w-[320px] focus:outline-none focus:ring-2 focus:ring-[#865BFF]/20 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <button 
                        onClick={exportToCSV}
                        className="flex items-center gap-2 px-5 py-2.5 bg-slate-800 text-white rounded-xl text-xs font-black uppercase tracking-widest hover:bg-slate-700 transition-all shadow-lg shadow-slate-200"
                    >
                        <Download className="w-4 h-4" /> Exportar
                    </button>
                </div>
            </div>

            {/* Leads Table */}
            <div className="bg-white rounded-[24px] border border-slate-200/60 shadow-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50/50 border-b border-slate-100">
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Prospecto</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Socio Responsable</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Origen / Landing</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Fecha de Captura</th>
                                <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Acción</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {filteredLeads.map((lead) => (
                                <tr key={lead.id} className="hover:bg-slate-50/30 transition-colors group">
                                    <td className="px-6 py-5">
                                        <div className="flex flex-col gap-0.5">
                                            <div className="text-sm font-bold text-slate-800">{lead.name}</div>
                                            <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                <Mail className="w-3 h-3" /> {lead.email}
                                            </div>
                                            {lead.whatsapp && (
                                                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                                                    <Phone className="w-3 h-3" /> {lead.whatsapp}
                                                </div>
                                            )}
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <div className="w-8 h-8 rounded-lg bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-500">
                                                {lead.partners?.name?.substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="text-xs font-black text-slate-700">{lead.partners?.name || 'N/A'}</div>
                                                <div className="text-[10px] text-slate-400">{lead.partners?.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5">
                                        <div className="flex items-center gap-2">
                                            <Globe className="w-3.5 h-3.5 text-slate-300" />
                                            <span className="text-xs font-bold text-[#865BFF] bg-[#865BFF]/5 px-2.5 py-1 rounded-lg">
                                                /l/{lead.landing_slug}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-5 text-xs text-slate-500 font-medium">
                                        {formatDateUpperCase(lead.created_at)}
                                    </td>
                                    <td className="px-6 py-5">
                                        <button className="p-2 rounded-lg hover:bg-[#865BFF]/10 text-slate-300 hover:text-[#865BFF] transition-all">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredLeads.length === 0 && (
                    <div className="py-20 text-center">
                        <Users className="w-12 h-12 text-slate-200 mx-auto mb-4" />
                        <h3 className="text-slate-400 font-bold uppercase tracking-widest text-xs">No hay prospectos registrados</h3>
                    </div>
                )}
            </div>
        </div>
    );
}
