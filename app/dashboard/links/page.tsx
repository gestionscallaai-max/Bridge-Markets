"use client";
import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Link2, Copy, Check, ExternalLink, Loader2, Save, Edit3, Globe, ShieldCheck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';

export default function ReferralLinksPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [mainLink, setMainLink] = useState('');
    const [initialLink, setInitialLink] = useState('');

    useEffect(() => { fetchData(); }, []);

    async function fetchData() {
        setLoading(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) { setLoading(false); return; }

        const { data: partner } = await supabase
            .from('partners')
            .select('referral_link')
            .eq('id', user.id)
            .single();
        
        const link = partner?.referral_link || '';
        setMainLink(link);
        setInitialLink(link);
        setLoading(false);
    }

    async function handleSave() {
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        const { error } = await supabase
            .from('partners')
            .update({ referral_link: mainLink })
            .eq('id', user.id);

        if (!error) {
            setInitialLink(mainLink);
            setIsEditing(false);
        }
        setSaving(false);
    }

    const handleCopy = () => {
        if (!mainLink) return;
        navigator.clipboard.writeText(mainLink);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
        </div>
    );

    return (
        <div className="max-w-5xl mx-auto space-y-8 pb-20">
            {/* Page Header */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d0221] p-10 text-white shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#865BFF] opacity-10 blur-[100px] -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col md:flex-row md:items-center gap-8">
                    <div className="w-20 h-20 rounded-[2rem] bg-gradient-to-br from-[#865BFF] to-[#6335f8] flex items-center justify-center shadow-2xl shadow-[#865BFF]/20">
                        <Link2 className="w-10 h-10 text-white" />
                    </div>
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black tracking-tight">{t.links.title}</h1>
                            <span className="px-3 py-1 rounded-full bg-white/10 text-white/60 text-[10px] font-bold uppercase tracking-widest border border-white/10">
                                Oficial
                            </span>
                        </div>
                        <p className="text-white/50 text-sm font-medium max-w-xl">
                            Este es tu enlace único de afiliado. Utilízalo en tus campañas, redes sociales y materiales promocionales para trackear a tus referidos.
                        </p>
                    </div>
                </div>
            </div>

            {/* Main Link Management Card */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden"
            >
                <div className="p-8 border-b border-slate-50 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h3 className="text-lg font-bold text-slate-800">Enlace de Referido Principal</h3>
                        <p className="text-slate-400 text-xs">Gestiona tu identidad de afiliado única en Bridge Markets.</p>
                    </div>
                    {!isEditing ? (
                        <button 
                            onClick={() => setIsEditing(true)}
                            className="flex items-center justify-center gap-2 px-6 py-3 rounded-2xl bg-slate-50 text-slate-600 text-xs font-bold hover:bg-[#865BFF] hover:text-white transition-all border border-slate-100"
                        >
                            <Edit3 className="w-4 h-4" /> Editar Enlace
                        </button>
                    ) : (
                        <div className="flex items-center gap-2">
                            <button 
                                onClick={() => { setMainLink(initialLink); setIsEditing(false); }}
                                className="px-5 py-3 rounded-2xl text-slate-400 text-xs font-bold hover:text-slate-600 transition-all"
                            >
                                Cancelar
                            </button>
                            <button 
                                onClick={handleSave}
                                disabled={saving}
                                className="flex items-center gap-2 px-6 py-3 rounded-2xl bg-[#865BFF] text-white text-xs font-bold hover:bg-[#7444ff] transition-all shadow-lg shadow-[#865BFF]/20 disabled:opacity-60"
                            >
                                {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                Guardar Cambios
                            </button>
                        </div>
                    )}
                </div>

                <div className="p-10 space-y-8">
                    <div className="space-y-4">
                        <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 ml-1">
                            <Globe className="w-4 h-4 text-[#865BFF]" /> URL de Afiliado Activa
                        </label>
                        <div className="relative group">
                            {isEditing ? (
                                <input
                                    type="url"
                                    value={mainLink}
                                    onChange={e => setMainLink(e.target.value)}
                                    placeholder="https://client.bridgemarkets.com/register?partner_id=..."
                                    className="w-full bg-slate-50 border border-slate-200 rounded-[2rem] py-6 px-8 text-lg font-mono text-[#865BFF] focus:outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all"
                                />
                            ) : (
                                <div className="w-full bg-slate-50 border border-slate-100 rounded-[2rem] py-6 px-8 flex items-center justify-between gap-4 group-hover:border-[#865BFF]/30 transition-all">
                                    <span className="text-lg font-mono text-slate-500 truncate select-all">
                                        {mainLink || "No se ha configurado un enlace aún"}
                                    </span>
                                    <div className="flex items-center gap-2">
                                        {mainLink && (
                                            <>
                                                <button 
                                                    onClick={handleCopy}
                                                    className={`flex items-center gap-2 px-6 py-3 rounded-xl text-xs font-bold transition-all ${
                                                        copied ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' : 'bg-white text-slate-600 border border-slate-200 hover:border-[#865BFF] hover:text-[#865BFF]'
                                                    }`}
                                                >
                                                    {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                                                    {copied ? t.links.copied : t.common.copy}
                                                </button>
                                                <a 
                                                    href={mainLink} target="_blank" rel="noreferrer"
                                                    className="w-12 h-12 rounded-xl bg-white text-slate-400 border border-slate-200 flex items-center justify-center hover:text-[#865BFF] hover:border-[#865BFF] transition-all"
                                                >
                                                    <ExternalLink className="w-5 h-5" />
                                                </a>
                                            </>
                                        )}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
                        {[
                            { title: 'Estado de Red', value: 'Activo', icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' },
                            { title: 'Sincronización', value: 'MT4/MT5 Real', icon: Globe, color: 'text-blue-500', bg: 'bg-blue-50' },
                            { title: 'Seguridad Link', value: 'AES-256', icon: ShieldCheck, color: 'text-purple-500', bg: 'bg-purple-50' },
                        ].map((stat, i) => (
                            <div key={i} className="p-6 rounded-[2rem] border border-slate-100 bg-slate-50/50 flex flex-col items-center text-center">
                                <div className={`w-12 h-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center mb-3 shadow-sm`}>
                                    <stat.icon className="w-6 h-6" />
                                </div>
                                <div className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">{stat.title}</div>
                                <div className="text-sm font-black text-slate-800">{stat.value}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {!mainLink && !isEditing && (
                    <div className="p-10 bg-amber-50 border-t border-amber-100 flex items-start gap-4">
                        <div className="w-10 h-10 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center shrink-0">
                            <Link2 className="w-5 h-5" />
                        </div>
                        <div>
                            <p className="text-sm font-bold text-amber-800 mb-1">Enlace no detectado</p>
                            <p className="text-xs text-amber-600 font-medium leading-relaxed">
                                No has configurado tu enlace de referido principal. Pulsa el botón de editar para agregar tu URL de afiliado oficial de Bridge Markets.
                            </p>
                        </div>
                    </div>
                )}
            </motion.div>

            {/* Help Section */}
            <div className="bg-[#0d0221] rounded-[2.5rem] p-10 text-white relative overflow-hidden group border border-white/5">
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#865BFF] opacity-5 blur-[80px] -mr-32 -mb-32"></div>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-white/40 border border-white/10">
                        <Globe className="w-8 h-8" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xl font-black mb-2">¿Dónde obtengo mi enlace?</h4>
                        <p className="text-white/40 text-sm leading-relaxed font-medium">
                            Tu enlace oficial de referido se encuentra en tu portal de cliente de Bridge Markets. Asegúrate de copiarlo correctamente para que todas las captaciones se asignen a tu cuenta de forma automática.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
