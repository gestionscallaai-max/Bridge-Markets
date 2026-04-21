"use client";

import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { CreditCard, Loader2, User, Mail, Calendar, Diamond, ShieldCheck, Activity, Crown, Shield, Search, Eye, Clock, Award, Network } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';
import { useAdmin } from '@/lib/context';

export default function ReportsAccountsPage() {
    const { t, lang } = useLanguage();
    const { isAdmin } = useAdmin();
    const [leads, setLeads] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [mounted, setMounted] = useState(false);
    const [partnerId, setPartnerId] = useState('');
    const [totalNetwork, setTotalNetwork] = useState(0);

    useEffect(() => {
        setMounted(true);
        async function fetchData() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            if (isAdmin) {
                // Admin: all accounts from entire network
                const [lRes, pRes] = await Promise.all([
                    supabase.from('leads').select('*, partners(name, email)').order('created_at', { ascending: false }),
                    supabase.from('partners').select('*', { count: 'exact', head: true })
                ]);
                setLeads(lRes.data || []);
                setTotalNetwork(pRes.count || 0);
            } else {
                // Partner View: only their own accounts
                const [lRes, pRes] = await Promise.all([
                    supabase.from('leads').select('*').eq('partner_id', user.id).order('created_at', { ascending: false }),
                    supabase.from('partners').select('partner_id').eq('id', user.id).single()
                ]);
                setLeads(lRes.data || []);
                if (pRes.data?.partner_id) setPartnerId(pRes.data.partner_id);
            }
            setLoading(false);
        }
        fetchData();
    }, [isAdmin]);

    const localeMap: Record<string, string> = { es: 'es-ES', en: 'en-US', zh: 'zh-CN', hi: 'hi-IN', fr: 'fr-FR', ar: 'ar-SA', bn: 'bn-BD', pt: 'pt-BR', ru: 'ru-RU', ja: 'ja-JP' };

    const statusMap: Record<string, { label: string; color: string; icon: any }> = {
        registered: { label: t.reports.statusRegistered, color: 'bg-blue-50 text-blue-600 border-blue-100', icon: User },
        funded: { label: t.reports.statusFunded, color: 'bg-emerald-50 text-emerald-600 border-emerald-100', icon: Diamond },
        trading: { label: t.reports.statusTrading, color: 'bg-[#865BFF]/5 text-[#865BFF] border-[#865BFF]/10', icon: Activity },
    };

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
                            {isAdmin ? <Crown className="w-7 h-7 text-amber-400" /> : <CreditCard className="w-7 h-7 text-[#865BFF]" />}
                        </div>
                        <div>
                            <div className={`text-[9px] font-black uppercase tracking-widest mb-1 px-2 py-0.5 rounded-md border inline-block ${
                                isAdmin ? 'text-amber-400 bg-amber-500/10 border-amber-500/20' : 'text-[#865BFF] bg-[#865BFF]/10 border-[#865BFF]/20'
                            }`}>
                                {isAdmin
                                    ? <><Shield className="w-3 h-3" /><span>Vista Administrador — Toda la Red</span></>
                                    : <><Eye className="w-3 h-3" /><span>Partner View — Mis Cuentas</span></>}
                            </div>
                            <h1 className="text-2xl font-black tracking-tight mt-1 mb-1">
                                {isAdmin ? 'Cuentas — Red Completa' : t.reports.accountsTitle}
                            </h1>
                            <p className="text-white/50 text-sm font-medium">
                                {isAdmin ? 'Todas las cuentas capturadas en la red de partners' : t.reports.accountsSubtitle}
                            </p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-[#865BFF]/10 border-[#865BFF]/20 text-[#865BFF]'}`}>
                            <Clock className="w-4 h-4" />
                            <span className="text-xs font-bold uppercase tracking-wider">
                                {mounted && new Date().toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'short' }).toUpperCase()}
                            </span>
                        </div>
                        <div className={`flex items-center gap-2 px-4 py-2 rounded-xl border ${isAdmin ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' : 'bg-white/10 border-white/10 text-white'}`}>
                            {isAdmin ? <Network className="w-4 h-4" /> : <Award className="w-4 h-4 text-[#865BFF]" />}
                            <span className="text-xs font-mono font-bold tracking-tight">
                                {isAdmin ? `${totalNetwork} PARTNERS` : partnerId}
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Table Card */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                {/* Search + stats */}
                <div className={`p-5 border-b border-slate-50 flex items-center justify-between gap-4 ${isAdmin ? 'bg-amber-50/20' : 'bg-slate-50/30'}`}>
                    <div className="flex items-center gap-2">
                        <span className={`w-2 h-2 rounded-full ${isAdmin ? 'bg-amber-500' : 'bg-[#865BFF]'}`} />
                        <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">
                            {filtered.length} {isAdmin ? 'cuentas · toda la red' : t.reports.totalAccounts}
                        </span>
                    </div>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder={isAdmin ? "Buscar cuenta o partner..." : "Buscar cuenta..."}
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10 pr-4 py-2 text-sm bg-white border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-[#865BFF]/20 focus:border-[#865BFF] w-[260px] transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className={`text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] border-b border-slate-100 ${isAdmin ? 'bg-amber-50/30' : 'bg-slate-50/50'}`}>
                                <th className="px-8 py-6">{t.reports.colHolder}</th>
                                <th className="px-8 py-6">{t.reports.colContactDetails}</th>
                                {isAdmin && <th className="px-8 py-6">Partner Dueño</th>}
                                <th className="px-8 py-6 text-center">{t.reports.colOperationalStatus}</th>
                                <th className="px-8 py-6">{t.reports.colOpening}</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {loading ? (
                                <tr><td colSpan={isAdmin ? 5 : 4} className="px-8 py-20 text-center">
                                    <Loader2 className="w-10 h-10 animate-spin text-[#865BFF] mx-auto mb-4" />
                                    <span className="text-slate-400 font-bold text-xs uppercase tracking-widest">{t.reports.fetchingFinancial}</span>
                                </td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={isAdmin ? 5 : 4} className="px-8 py-20 text-center">
                                    <div className="w-20 h-20 bg-slate-50 rounded-[2rem] flex flex-col items-center justify-center mx-auto mb-4 border border-slate-100">
                                        <CreditCard className="w-10 h-10 text-slate-200" />
                                    </div>
                                    <h3 className="text-lg font-bold text-slate-800">{t.reports.noActiveAccounts}</h3>
                                    <p className="text-slate-400 text-sm max-w-xs mx-auto mt-2 font-medium">{t.reports.noActiveAccountsDesc}</p>
                                </td></tr>
                            ) : filtered.map((lead, idx) => {
                                const s = statusMap[lead.status] || { label: lead.status || 'new', color: 'bg-slate-50 text-slate-600 border-slate-100', icon: Activity };
                                return (
                                    <motion.tr key={lead.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.02 }}
                                        className="hover:bg-slate-50/80 transition-all group">
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 font-black text-xs border border-slate-200/50 group-hover:bg-white group-hover:shadow-md transition-all">
                                                    {(lead.name || 'N').substring(0, 2).toUpperCase()}
                                                </div>
                                                <div className="font-bold text-slate-800 text-sm">{lead.name}</div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
                                                <Mail className="w-3.5 h-3.5 text-slate-300" /> {lead.email}
                                            </div>
                                        </td>
                                        {/* Admin-only partner column */}
                                        {isAdmin && (
                                            <td className="px-8 py-5">
                                                <div className="flex items-center gap-2">
                                                    <Shield className="w-3.5 h-3.5 text-amber-500" />
                                                    <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg border border-amber-200/40">
                                                        {lead.partners?.name || 'N/A'}
                                                    </span>
                                                </div>
                                            </td>
                                        )}
                                        <td className="px-8 py-5 text-center">
                                            <div className={`inline-flex items-center gap-2 px-3 py-1.5 rounded-xl text-[10px] font-black uppercase tracking-wider border ${s.color}`}>
                                                <s.icon className="w-3 h-3" /> {s.label}
                                            </div>
                                        </td>
                                        <td className="px-8 py-5">
                                            <div className="flex items-center gap-2 text-[11px] text-slate-400 font-black uppercase tracking-tighter">
                                                <Calendar className="w-3.5 h-3.5 text-slate-300" />
                                                {new Date(lead.created_at).toLocaleDateString(localeMap[lang] || 'es-ES', { day: '2-digit', month: 'short', year: 'numeric' }).toUpperCase()}
                                            </div>
                                        </td>
                                    </motion.tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
                <div className={`p-6 text-center border-t border-slate-100 ${isAdmin ? 'bg-amber-50/20' : 'bg-slate-50/30'}`}>
                    <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em]">{t.reports.syncedWithMT}</p>
                </div>
            </div>
        </div>
    );
}
