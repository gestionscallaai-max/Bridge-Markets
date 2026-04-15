"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Link2, Copy, Plus, Search, Check, ExternalLink, Loader2, Trash2, X, MousePointer2, TrendingUp, Calendar, Hash } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';

export default function ReferralLinksPage() {
    const { t } = useLanguage();
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const [showForm, setShowForm] = useState(false);
    const [partnerId, setPartnerId] = useState('');
    const [search, setSearch] = useState('');
    const [form, setForm] = useState({ name: '', campaign: '' });
    const [creating, setCreating] = useState(false);

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const { data: profile } = await supabase
            .from('profiles')
            .select('partner_id')
            .eq('id', user.id)
            .single();
        const pid = profile?.partner_id || user.id.substring(0, 8).toUpperCase();
        setPartnerId(pid);

        const { data } = await supabase
            .from('referral_links')
            .select('*, clicks(count)')
            .eq('partner_id', user.id)
            .order('created_at', { ascending: false });

        setLinks(data || []);
        setLoading(false);
    }

    const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';

    const generateSlug = (name: string) =>
        name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '') + '-' + Math.random().toString(36).substring(2, 6);

    async function handleCreate(e: React.FormEvent) {
        e.preventDefault();
        setCreating(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const slug = generateSlug(form.campaign || form.name);
        const trackingUrl = `${baseUrl}/r/${slug}`;

        await supabase.from('referral_links').insert({
            partner_id: user.id,
            name: form.name,
            slug,
            url: trackingUrl,
            campaign: form.campaign || null,
        });

        setForm({ name: '', campaign: '' });
        setShowForm(false);
        await fetchData();
        setCreating(false);
    }

    async function handleDelete(id: string) {
        if (!confirm(t.links.deleteConfirm)) return;
        await supabase.from('referral_links').delete().eq('id', id);
        setLinks(links.filter(l => l.id !== id));
    }

    const handleCopy = (id: string, url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    const filtered = links.filter(l =>
        l.name?.toLowerCase().includes(search.toLowerCase()) ||
        l.campaign?.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="space-y-6 pb-20">
            {/* Page Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d0221] p-8 text-white shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#865BFF] opacity-10 blur-[100px] -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div className="flex items-center gap-5">
                        <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#865BFF] to-[#6335f8] flex items-center justify-center shadow-lg shadow-[#865BFF]/30">
                            <Link2 className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-black tracking-tight mb-1">{t.links.title}</h1>
                            <p className="text-white/60 text-sm font-medium">{t.links.subtitle}</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setShowForm(true)}
                        className="flex items-center justify-center gap-2 px-6 py-4 bg-white text-[#0d0221] rounded-2xl text-sm font-bold hover:bg-slate-100 transition-all hover:scale-105 active:scale-95 shadow-xl"
                    >
                        <Plus className="w-4 h-4" /> {t.links.createBtn}
                    </button>
                </div>
            </div>

            {/* Filter & Stats Row */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between px-2">
                <div className="relative w-full md:w-96 group">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#865BFF] transition-colors" />
                    <input
                        type="text"
                        placeholder={t.links.searchPlaceholder}
                        value={search}
                        onChange={e => setSearch(e.target.value)}
                        className="w-full pl-12 pr-4 py-4 bg-white/60 backdrop-blur-md border border-slate-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-[#865BFF]/30 focus:ring-4 focus:ring-[#865BFF]/5 transition-all shadow-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <div className="px-5 py-3 bg-white border border-slate-100 rounded-2xl shadow-sm text-sm font-bold text-slate-800 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-[#865BFF]"></span>
                        {links.length} {t.links.totalLinks}
                    </div>
                </div>
            </div>

            {/* Modal Form */}
            <AnimatePresence>
                {showForm && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowForm(false)}
                            className="absolute inset-0 bg-[#0d0221]/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="bg-white rounded-[2.5rem] w-full max-w-xl overflow-hidden shadow-2xl relative z-10 border border-white/20"
                        >
                            <div className="bg-[#0d0221] p-8 text-white relative">
                                <button onClick={() => setShowForm(false)} className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors">
                                    <X className="w-6 h-6" />
                                </button>
                                <h3 className="text-xl font-bold mb-2">{t.links.newLinkTitle}</h3>
                                <p className="text-white/60 text-xs">{t.links.newLinkDesc}</p>
                            </div>
                            <form onSubmit={handleCreate} className="p-8 space-y-6">
                                <div className="space-y-4">
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">{t.links.linkName}</label>
                                        <input
                                            required value={form.name}
                                            onChange={e => setForm({ ...form, name: e.target.value })}
                                            placeholder="Ej. Facebook Ads - Diciembre"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#865BFF] transition-all"
                                        />
                                    </div>
                                    <div>
                                        <label className="text-xs font-bold text-slate-500 uppercase tracking-widest block mb-2">{t.links.campaignName}</label>
                                        <input
                                            value={form.campaign}
                                            onChange={e => setForm({ ...form, campaign: e.target.value })}
                                            placeholder="Ej. fb_ads_winter"
                                            className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm font-medium text-slate-800 focus:outline-none focus:border-[#865BFF] transition-all"
                                        />
                                    </div>
                                </div>
                                <div className="p-4 bg-slate-50 rounded-2xl border border-dashed border-slate-200">
                                    <p className="text-[11px] text-slate-400 font-medium mb-1 uppercase tracking-wider">{t.links.urlPreview}</p>
                                    <p className="text-xs font-mono text-[#865BFF] break-all">
                                        {baseUrl}/r/{form.campaign ? form.campaign.toLowerCase().replace(/\s/g, '-') : 'tu-campana'}
                                    </p>
                                </div>
                                <button type="submit" disabled={creating}
                                    className="w-full flex items-center justify-center gap-2 py-4 bg-[#865BFF] text-white rounded-2xl text-sm font-bold hover:bg-[#7444ff] transition-all disabled:opacity-60 shadow-lg shadow-[#865BFF]/20">
                                    {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                    {creating ? t.links.creating : t.links.generate}
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Grid View */}
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                {loading ? (
                    Array.from({ length: 3 }).map((_, i) => (
                        <div key={i} className="card h-64 bg-slate-50 animate-pulse rounded-[2rem]"></div>
                    ))
                ) : filtered.length === 0 ? (
                    <div className="col-span-full py-20 text-center bg-white/50 backdrop-blur-sm border border-dashed border-slate-300 rounded-[2.5rem]">
                        <div className="w-16 h-16 bg-slate-100 rounded-2xl flex items-center justify-center mx-auto mb-4 text-slate-300">
                            <Link2 className="w-8 h-8" />
                        </div>
                        <h3 className="text-lg font-bold text-slate-800">{t.links.noLinks}</h3>
                        <p className="text-slate-500 text-sm mb-6">{t.links.noLinksDesc}</p>
                        <button onClick={() => setShowForm(true)} className="text-[#865BFF] font-bold text-sm hover:underline">{t.links.createLink}</button>
                    </div>
                ) : (
                    filtered.map((link, idx) => (
                        <motion.div
                            key={link.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="group relative bg-white rounded-[2rem] border border-slate-100 p-6 hover:shadow-2xl hover:shadow-[#865BFF]/5 hover:border-[#865BFF]/20 transition-all duration-300"
                        >
                            <div className="flex items-start justify-between mb-6">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-2xl bg-[#865BFF]/5 flex items-center justify-center text-[#865BFF] group-hover:bg-[#865BFF] group-hover:text-white transition-all duration-300">
                                        <Link2 className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-slate-800 line-clamp-1">{link.name}</h4>
                                        <div className="flex items-center gap-2 mt-0.5">
                                            {link.campaign && (
                                                <span className="text-[10px] font-bold uppercase tracking-widest text-[#865BFF]/60 bg-[#865BFF]/5 px-2 py-0.5 rounded">
                                                    {link.campaign}
                                                </span>
                                            )}
                                            <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(link.created_at).toLocaleDateString()}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex gap-1 group-hover:opacity-100 opacity-0 transition-opacity">
                                    <button onClick={() => handleDelete(link.id)} className="p-2 text-slate-300 hover:text-red-500 transition-colors">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </div>

                            <div className="bg-slate-50 rounded-2xl p-4 mb-6 relative group/url min-h-[80px] flex flex-col justify-center border border-slate-100">
                                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest mb-2">{t.links.referralUrl}</p>
                                <div className="flex items-center gap-2">
                                    <span className="text-xs font-mono text-slate-500 truncate flex-1">{link.url}</span>
                                    <button
                                        onClick={() => handleCopy(link.id, link.url)}
                                        className={`shrink-0 w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                            copiedId === link.id ? 'bg-emerald-500 text-white' : 'bg-white text-slate-400 border border-slate-200 hover:border-[#865BFF] hover:text-[#865BFF]'
                                        }`}
                                    >
                                        {copiedId === link.id ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                    </button>
                                </div>
                                {copiedId === link.id && (
                                    <motion.span initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="absolute -bottom-2 right-4 text-[9px] font-bold text-emerald-600 bg-white px-2 py-0.5 rounded shadow-sm">
                                        {t.links.copied}
                                    </motion.span>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div className="bg-slate-50 rounded-[1.25rem] p-4 flex flex-col items-center justify-center border border-slate-100 transition-colors hover:bg-white hover:border-[#865BFF]/20">
                                    <MousePointer2 className="w-4 h-4 text-[#865BFF] mb-1" />
                                    <div className="text-xl font-black text-slate-800 leading-none">{link.clicks?.[0]?.count ?? 0}</div>
                                    <div className="text-[10px] text-slate-400 font-bold uppercase mt-1">{t.links.clicks}</div>
                                </div>
                                <a
                                    href={link.url} target="_blank" rel="noreferrer"
                                    className="bg-slate-50 rounded-[1.25rem] p-4 flex flex-col items-center justify-center border border-slate-100 transition-all hover:bg-[#865BFF] hover:text-white group/btn"
                                >
                                    <ExternalLink className="w-4 h-4 text-[#865BFF] group-hover/btn:text-white mb-1" />
                                    <div className="text-xl font-black leading-none">{t.links.open}</div>
                                    <div className="text-[10px] font-bold uppercase mt-1 group-hover/btn:text-white text-slate-400">Link</div>
                                </a>
                            </div>
                        </motion.div>
                    ))
                )}
            </div>
        </div>
    );
}
