"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Link2, Copy, Plus, Search, Check, ExternalLink, Loader2, Trash2, X } from 'lucide-react';

export default function ReferralLinksPage() {
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

        // Get real partner_id from profiles
        const { data: profile } = await supabase
            .from('profiles')
            .select('partner_id')
            .eq('id', user.id)
            .single();
        const pid = profile?.partner_id || user.id.substring(0, 8).toUpperCase();
        setPartnerId(pid);

        // Fetch links with click counts
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
        if (!confirm('¿Seguro que quieres eliminar este link?')) return;
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
        <div className="space-y-5 pb-10">
            {/* Header */}
            <div className="card p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                        <Link2 className="w-5 h-5" />
                    </div>
                    <div>
                        <h2 className="text-lg font-bold text-slate-800">Links de Referido</h2>
                        <p className="text-slate-500 text-sm">Crea y gestiona tus enlaces de tracking personalizados.</p>
                    </div>
                </div>
                <button
                    onClick={() => setShowForm(true)}
                    className="flex items-center gap-2 px-4 py-2.5 bg-brand-500 text-white rounded-lg text-sm font-semibold hover:bg-brand-600 transition-colors shadow-sm shadow-brand-500/20 shrink-0"
                >
                    <Plus className="w-4 h-4" /> Nuevo Link
                </button>
            </div>

            {/* Create Form */}
            {showForm && (
                <div className="card p-6">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="font-bold text-slate-800">Crear Nuevo Link de Referido</h3>
                        <button onClick={() => setShowForm(false)} className="text-slate-400 hover:text-slate-700"><X className="w-5 h-5" /></button>
                    </div>
                    <form onSubmit={handleCreate} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Nombre del Link *</label>
                            <input
                                required value={form.name}
                                onChange={e => setForm({ ...form, name: e.target.value })}
                                placeholder="Ej. Campaña Facebook Diciembre"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                            />
                        </div>
                        <div>
                            <label className="text-xs font-semibold text-slate-500 block mb-1.5">Nombre de Campaña (UTM)</label>
                            <input
                                value={form.campaign}
                                onChange={e => setForm({ ...form, campaign: e.target.value })}
                                placeholder="Ej. fb-ads-q1"
                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                            />
                        </div>
                        <div className="sm:col-span-2 flex items-center justify-between pt-1">
                            <p className="text-xs text-slate-400">Se generará una URL única: <span className="font-mono text-brand-500">{baseUrl}/r/{form.campaign ? form.campaign.toLowerCase().replace(/\s/g,'-') : 'tu-campana-xxxx'}</span></p>
                            <button type="submit" disabled={creating}
                                className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-lg text-sm font-semibold hover:bg-brand-600 transition-all disabled:opacity-60">
                                {creating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Plus className="w-4 h-4" />}
                                {creating ? 'Creando...' : 'Crear Link'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            {/* Table */}
            <div className="card overflow-hidden">
                <div className="p-4 border-b border-slate-100 bg-slate-50/50 flex items-center gap-3">
                    <div className="relative flex-1 max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input type="text" placeholder="Buscar links..." value={search} onChange={e => setSearch(e.target.value)}
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:border-brand-500 focus:ring-1 focus:ring-brand-500/10 transition-all" />
                    </div>
                    <span className="text-xs text-slate-400 font-semibold">{filtered.length} link{filtered.length !== 1 ? 's' : ''}</span>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left min-w-[780px]">
                        <thead>
                            <tr className="bg-slate-50 border-b border-slate-200 text-[11px] font-bold text-slate-500 uppercase tracking-wider">
                                <th className="px-6 py-4">Nombre</th>
                                <th className="px-6 py-4">URL de Tracking</th>
                                <th className="px-6 py-4 text-center">Clics</th>
                                <th className="px-6 py-4">Campaña</th>
                                <th className="px-6 py-4">Creado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {loading ? (
                                <tr><td colSpan={6} className="py-16 text-center"><Loader2 className="w-6 h-6 animate-spin text-brand-500 mx-auto" /></td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={6} className="py-16 text-center">
                                    <Link2 className="w-8 h-8 text-slate-200 mx-auto mb-2" />
                                    <span className="text-slate-400 text-sm font-medium block">No tienes links de referido aún.</span>
                                    <button onClick={() => setShowForm(true)} className="mt-3 text-sm font-semibold text-brand-500 hover:text-brand-600">+ Crear tu primer link</button>
                                </td></tr>
                            ) : filtered.map(link => (
                                <tr key={link.id} className="hover:bg-slate-50/50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800 text-sm">{link.name}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 max-w-[240px]">
                                            <div className="truncate text-xs font-mono text-brand-600 bg-brand-50 px-2.5 py-1.5 rounded border border-brand-200/50 flex-1">
                                                {link.url}
                                            </div>
                                            <button onClick={() => handleCopy(link.id, link.url)}
                                                className="p-1.5 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded transition-colors shrink-0">
                                                {copiedId === link.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="font-bold text-slate-700">{link.clicks?.[0]?.count ?? 0}</span>
                                    </td>
                                    <td className="px-6 py-4">
                                        {link.campaign ? (
                                            <span className="px-2 py-1 text-xs font-bold bg-slate-100 text-slate-600 rounded font-mono">{link.campaign}</span>
                                        ) : <span className="text-slate-300">—</span>}
                                    </td>
                                    <td className="px-6 py-4 text-sm text-slate-400">
                                        {new Date(link.created_at).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })}
                                    </td>
                                    <td className="px-6 py-4 text-right flex items-center justify-end gap-1">
                                        <a href={link.url} target="_blank" rel="noreferrer"
                                            className="p-1.5 text-slate-400 hover:text-brand-500 hover:bg-brand-50 rounded transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </a>
                                        <button onClick={() => handleDelete(link.id)}
                                            className="p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded transition-colors">
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
