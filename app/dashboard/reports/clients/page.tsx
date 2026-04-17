"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Users, Filter, Download, Loader2, Mail, Smartphone, Globe, Calendar, UserCheck, Crown, Shield, Search, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';
import { useAdmin } from '@/lib/context';

export default function ReportsClientsPage() {
    const { t, lang } = useLanguage();
    const { isAdmin } = useAdmin();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    
    // Pagination state
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const pageSize = 15;

    useEffect(() => { fetchLeads(); }, [isAdmin, currentPage]);

    const fetchLeads = async () => {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        try {
            const start = (currentPage - 1) * pageSize;
            const end = start + pageSize - 1;

            let query = supabase.from('leads').select('*, partners(name, email)', { count: 'exact' });

            if (!isAdmin) {
                query = query.eq('partner_id', user.id);
            }

            const { data, count, error } = await query
                .order('created_at', { ascending: false })
                .range(start, end);

            if (error) throw error;
            
            setLeads(data || []);
            setTotalCount(count || 0);
        } catch (err) {
            console.error('Error fetching leads:', err);
        }
        setLoading(false);
    };

    const localeMap: Record<string, string> = { es: 'es-ES', en: 'en-US', zh: 'zh-CN', hi: 'hi-IN', fr: 'fr-FR', ar: 'ar-SA', bn: 'bn-BD', pt: 'pt-BR', ru: 'ru-RU', ja: 'ja-JP' };

    const filtered = leads.filter(lead =>
        lead.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (isAdmin && lead.partners?.name?.toLowerCase().includes(searchQuery.toLowerCase()))
    );

    return (
        <div className="space-y-8 pb-20 max-w-7xl mx-auto">
            {/* ── Header Banner */}
            <div className={`relative overflow-hidden rounded-[2.5rem] p-8 text-white shadow-2xl border ${
                isAdmin ? 'bg-gradient-to-br from-[#1a0f00] to-[#2d1900] border-amber-500/20' : 'bg-[#0d0221] border-white/5'
            }`}>
                <div className={`absolute top-0 right-0 w-96 h-96 opacity-10 blur-[100px] -mr-48 -mt-48 ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border shadow-lg ${
                            isAdmin ? 'bg-amber-500/10 border-amber-500/30 shadow-amber-500/10' : 'bg-[#865BFF]/10 border-[#865BFF]/30 shadow-[#865BFF]/10'
                        }`}>
                            {isAdmin ? <Crown className="w-7 h-7 text-amber-400" /> : <Users className="w-7 h-7 text-[#865BFF]" />}
                        </div>
                        <div>
                            <div className={`text-[9px] font-medium uppercase tracking-widest mb-1 px-2 py-0.5 rounded-md border inline-block ${
                                isAdmin ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-[#865BFF] bg-[#865BFF]/10 border-[#865BFF]/20'
                            }`}>
                                {isAdmin
                                    ? <><Shield className="w-3 h-3" /><span>Vista Administrador — Toda la Red</span></>
                                    : <><Eye className="w-3 h-3" /><span>Partner View — Mis Clientes</span></>}
                            </div>
                            <h1 className="text-2xl font-medium tracking-tight mt-1">
                                {isAdmin ? 'Clientes — Red Completa' : t.reports.clientsTitle}
                            </h1>
                            <p className="text-white/50 text-sm font-medium">
                                {isAdmin ? 'Todos los leads capturados por todos los partners' : t.reports.clientsSubtitle}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3 flex-wrap">
                        {isAdmin && (
                            <div className={`bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-right`}>
                                <div className="text-[10px] font-medium uppercase tracking-widest text-amber-400/60">Total Red</div>
                                <div className="text-xl font-medium text-amber-300">{leads.length}</div>
                            </div>
                        )}
                        {!isAdmin && (
                            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-4 text-right">
                                <div className="text-[10px] font-medium uppercase tracking-widest text-white/30">{t.reports.totalAccounts}</div>
                                <div className="text-xl font-medium text-white">{totalCount}</div>
                            </div>
                        )}
                        <button className="flex items-center justify-center gap-2 px-5 py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-normal border border-white/10 transition-all">
                            <Filter className="w-4 h-4" /> {t.reports.filters}
                        </button>
                        <button className="flex items-center justify-center gap-2 px-6 py-3 bg-white text-[#0d0221] rounded-xl text-sm font-medium hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-xl">
                            <Download className="w-4 h-4" /> {t.reports.exportLeads}
                        </button>
                    </div>
                </div>
            </div>

            {/* ── Table Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Search bar */}
                <div className="p-5 border-b border-slate-50 bg-slate-50/30 flex items-center justify-between gap-4">
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                        <span className="text-xs font-normal text-slate-500 uppercase tracking-widest">
                            {totalCount} {isAdmin ? 'leads en la red' : t.reports.leadsIdentified}
                        </span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={isAdmin ? "Buscar por nombre, email o partner..." : "Buscar cliente..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#865BFF]/20 focus:border-[#865BFF] w-[280px] transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className={`text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 ${isAdmin ? 'bg-amber-50/30' : 'bg-slate-50/50'}`}>
                                <th className="px-8 py-5">{t.reports.colClientInfo}</th>
                                <th className="px-8 py-5">{t.reports.colContact}</th>
                                {isAdmin && <th className="px-8 py-5">Partner</th>}
                                <th className="px-8 py-5 text-center">{t.reports.colStatus}</th>
                                <th className="px-8 py-5 text-center">{t.reports.colOrigin}</th>
                                <th className="px-8 py-5">{t.reports.colDate}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={isAdmin ? 6 : 5} className="px-8 py-20">
                                    <div className="flex justify-center flex-col items-center">
                                        <Loader2 className="w-10 h-10 animate-spin text-[#865BFF] mb-4" />
                                        <span className="text-slate-400 font-normal text-xs uppercase tracking-widest">{t.reports.syncing}</span>
                                    </div>
                                </td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={isAdmin ? 6 : 5} className="px-8 py-20 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <Users className="w-10 h-10 text-slate-200" />
                                    </div>
                                    <h3 className="text-lg font-normal text-slate-800">{t.reports.noLeads}</h3>
                                    <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2 font-medium">{t.reports.noLeadsDesc}</p>
                                </td></tr>
                            ) : filtered.map((lead, idx) => (
                                <motion.tr key={lead.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: idx * 0.02 }}
                                    className="hover:bg-slate-50/80 transition-all group">
                                    <td className="px-8 py-5">
                                        <div className="flex items-center gap-4">
                                            <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-slate-100 to-slate-50 flex items-center justify-center text-slate-500 font-medium text-xs border border-slate-200/50 shadow-sm group-hover:scale-110 transition-transform duration-300">
                                                {(lead.name || 'N').substring(0, 2).toUpperCase()}
                                            </div>
                                            <div>
                                                <div className="font-normal text-slate-800 text-sm flex items-center gap-1.5">
                                                    {lead.name}
                                                    {lead.status === 'funded' && <UserCheck className="w-3.5 h-3.5 text-emerald-500" />}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-medium font-mono uppercase tracking-tighter">ID: {lead.id.substring(0, 8)}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-8 py-5">
                                        <div className="space-y-1.5">
                                            <div className="text-xs font-normal text-slate-600 flex items-center gap-2">
                                                <Mail className="w-3.5 h-3.5 text-slate-400" /> {lead.email}
                                            </div>
                                            {lead.whatsapp && <div className="text-[11px] text-slate-400 font-medium flex items-center gap-2">
                                                <Smartphone className="w-3.5 h-3.5 text-slate-300" /> {lead.whatsapp}
                                            </div>}
                                        </div>
                                    </td>
                                    {/* Admin-only: partner column */}
                                    {isAdmin && (
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2">
                                                <Shield className="w-3.5 h-3.5 text-[#865BFF]" />
                                                <span className="text-xs font-normal text-[#865BFF] bg-[#865BFF]/5 px-2 py-1 rounded-lg border border-[#865BFF]/10">
                                                    {lead.partners?.name || 'N/A'}
                                                </span>
                                            </div>
                                        </td>
                                    )}
                                    <td className="px-8 py-5 text-center">
                                        <span className={`px-3 py-1.5 rounded-xl text-[10px] font-medium uppercase tracking-wider border ${
                                            lead.status === 'registered' ? 'bg-amber-50 text-amber-600 border-amber-200/40' :
                                            lead.status === 'funded' ? 'bg-emerald-50 text-emerald-600 border-emerald-200/40' :
                                            'bg-slate-50 text-slate-500 border-slate-200/40'
                                        }`}>
                                            {lead.status === 'registered' ? t.reports.statusRegistered : lead.status === 'funded' ? t.reports.statusFunded : lead.status || 'new'}
                                        </span>
                                    </td>
                                    <td className="px-8 py-5 text-center">
                                        {lead.link_id ? (
                                            <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-[#865BFF] bg-[#865BFF]/5 px-3 py-1.5 rounded-xl border border-[#865BFF]/10">
                                                <Globe className="w-3 h-3" /> Referral
                                            </div>
                                        ) : (
                                            <div className="inline-flex items-center gap-1.5 text-[10px] font-medium text-slate-400 bg-slate-50 px-3 py-1.5 rounded-xl border border-slate-200/30">
                                                <Calendar className="w-3 h-3" /> Landing
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-8 py-5 text-[11px] text-slate-400 font-medium uppercase tracking-tighter">
                                        {new Date(lead.created_at).toLocaleString(localeMap[lang] || 'es-ES', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' })}
                                    </td>
                                </motion.tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                {/* Pagination Navigation */}
                <div className={`p-6 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4 ${isAdmin ? 'bg-amber-50/20' : 'bg-slate-50/30'}`}>
                    <div className="text-[10px] font-medium text-slate-400 uppercase tracking-[0.2em]">
                        Mostrando {((currentPage - 1) * pageSize) + 1} - {Math.min(currentPage * pageSize, totalCount)} de {totalCount} clientes
                    </div>
                    
                    <div className="flex items-center gap-2">
                        <button 
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1 || loading}
                            className={`p-2 rounded-xl border transition-all ${
                                currentPage === 1 
                                    ? 'bg-slate-50 text-slate-300 border-slate-100' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
                        </button>

                        <div className="flex items-center gap-1 mx-2">
                            {[...Array(Math.min(5, Math.ceil(totalCount / pageSize)))].map((_, i) => {
                                const pageNum = i + 1;
                                // Basic logic to show pages around current page could be added later
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => setCurrentPage(pageNum)}
                                        className={`w-9 h-9 rounded-xl text-xs font-medium transition-all ${
                                            currentPage === pageNum
                                                ? (isAdmin ? 'bg-amber-500 text-white shadow-lg shadow-amber-500/20' : 'bg-[#865BFF] text-white shadow-lg shadow-[#865BFF]/20')
                                                : 'bg-white text-slate-500 border border-slate-200 hover:bg-slate-50'
                                        }`}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            })}
                            {Math.ceil(totalCount / pageSize) > 5 && <span className="text-slate-300 mx-1">...</span>}
                        </div>

                        <button 
                            onClick={() => setCurrentPage(p => p + 1)}
                            disabled={currentPage >= Math.ceil(totalCount / pageSize) || loading}
                            className={`p-2 rounded-xl border transition-all ${
                                currentPage >= Math.ceil(totalCount / pageSize)
                                    ? 'bg-slate-50 text-slate-300 border-slate-100' 
                                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-95'
                            }`}
                        >
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
