"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Users, Filter, Download, ExternalLink, Loader2, Mail, Smartphone } from 'lucide-react';

export default function ReportsClientsPage() {
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
            .select('*, profiles!inner(full_name)')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching leads:', error);
            // Default fallback if profiles join fails
            const fallback = await supabase
                .from('leads')
                .select('*')
                .eq('partner_id', user.id)
                .order('created_at', { ascending: false });
            setLeads(fallback.data || []);
        } else {
            // Check if isAdmin? If yes show all. Otherwise filter by user.id
            // Para simplificar, mostramos los que son de este partner filtrado en DB RLS, 
            // supabase RLS (policy) solo trae los suyos automáticamente.
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
                        <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                            <Users className="w-5 h-5" />
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-slate-800">Clientes (Leads)</h2>
                            <p className="text-slate-500 text-sm mt-0.5">Lista de clientes que se registraron mediante tus enlaces o landings.</p>
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <button className="flex items-center gap-2 px-4 py-2 border border-slate-200 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors">
                            <Filter className="w-4 h-4" /> Filtros
                        </button>
                        <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 text-white rounded-lg text-sm font-semibold shadow-sm shadow-brand-500/20 hover:bg-brand-600 transition-colors">
                            <Download className="w-4 h-4" /> Exportar CSV
                        </button>
                    </div>
                </div>
            </div>

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse min-w-[800px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Nombre del Cliente</th>
                                <th className="px-6 py-4">Información de Contacto</th>
                                <th className="px-6 py-4">Estatus</th>
                                <th className="px-6 py-4">Origen</th>
                                <th className="px-6 py-4">Fecha de Registro</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16">
                                        <div className="flex justify-center flex-col items-center">
                                            <Loader2 className="w-8 h-8 animate-spin text-brand-500 mb-2" />
                                            <span className="text-slate-400 text-sm">Cargando base de datos...</span>
                                        </div>
                                    </td>
                                </tr>
                            ) : leads.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-16 text-center">
                                        <div className="w-16 h-16 bg-slate-50 rounded-full flex flex-col items-center justify-center mx-auto mb-3">
                                            <Users className="w-8 h-8 text-slate-300" />
                                        </div>
                                        <span className="text-slate-500 font-medium">Aún no hay clientes registrados bajo tu cuenta.</span>
                                        <p className="text-xs text-slate-400 mt-1">Comparte tus links o landing pages para iniciar.</p>
                                    </td>
                                </tr>
                            ) : (
                                leads.map((lead) => (
                                    <tr key={lead.id} className="hover:bg-slate-50/50 transition-colors">
                                        <td className="px-6 py-4">
                                            <div className="font-semibold text-slate-800 text-sm flex items-center gap-2">
                                                <div className="w-8 h-8 rounded bg-slate-100 flex items-center justify-center text-slate-500 font-bold text-xs">
                                                    {lead.name.substring(0, 2).toUpperCase()}
                                                </div>
                                                {lead.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 space-y-1">
                                            <div className="text-sm text-slate-600 font-medium flex items-center gap-1.5"><Mail className="w-3.5 h-3.5 text-slate-400"/> {lead.email}</div>
                                            {lead.whatsapp && <div className="text-xs text-slate-500 font-mono flex items-center gap-1.5"><Smartphone className="w-3.5 h-3.5 text-slate-400"/> {lead.whatsapp}</div>}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-amber-50 text-amber-600 border border-amber-200/50">
                                                {lead.status === 'registered' ? 'Registrado' : lead.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            {lead.link_id ? (
                                                <span className="text-xs font-semibold text-brand-500 bg-brand-50 px-2 py-1 rounded">Vía Referral Link</span>
                                            ) : (
                                                <span className="text-xs font-medium text-slate-500 bg-slate-50 px-2 py-1 rounded">Vía Landing Page</span>
                                            )}
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
