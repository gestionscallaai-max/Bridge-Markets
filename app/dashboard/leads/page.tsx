"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Users, Filter, Download, ExternalLink } from 'lucide-react';

export default function LeadsPage() {
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchLeads();
    }, []);

    const fetchLeads = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
            setLoading(false);
            return;
        }

        const { data, error } = await supabase
            .from('leads')
            .select('*')
            .eq('partner_id', user.id)
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
        } else {
            setLeads(data || []);
        }
        setLoading(false);
    };

    return (
        <div className="space-y-5 pb-10">
            {/* Header */}
            <div className="card p-5">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-[#865BFF]/10 flex items-center justify-center text-[#865BFF]">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Tus Leads</h2>
                            <p className="text-slate-500 text-sm mt-0.5">Contactos registrados a través de tus landing pages.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filtros
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-[#865BFF] text-white rounded-lg text-sm font-semibold shadow-md hover:bg-[#7344ff] transition-colors">
                            <Download className="w-4 h-4" /> Exportar CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">Contacto</th>
                                <th className="px-6 py-4">Origen (Landing)</th>
                                <th className="px-6 py-4">Fecha de Registro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                                        Cargando leads...
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-10 text-center text-slate-500 font-medium">
                                        No hay leads registrados aún. Empieza a compartir tus landings.
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800 text-sm">{lead.name}</div>
                                        </td>
                                        <td className="px-6 py-4 space-y-1">
                                            <div className="text-sm text-slate-600 font-medium">{lead.email}</div>
                                            <div className="text-xs text-slate-400 font-mono">{lead.whatsapp}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <a href={`/l/${lead.landing_slug}`} target="_blank" rel="noreferrer" className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-[#865BFF]/5 text-[#865BFF] hover:bg-[#865BFF]/10 transition-colors text-xs font-semibold">
                                                /l/{lead.landing_slug}
                                                <ExternalLink className="w-3 h-3" />
                                            </a>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500 font-medium">
                                            {new Date(lead.created_at).toLocaleString('es-ES', { 
                                                day: '2-digit', month: 'short', year: 'numeric',
                                                hour: '2-digit', minute: '2-digit'
                                            })}
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
