"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Settings, Loader2, Save, User, Mail, Globe, Phone, Check, Shield, BadgeCheck, Camera } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '@/lib/i18n/context';

export default function AccountSettingsPage() {
    const { t } = useLanguage();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        name: '',
        email: '',
        partner_id: '',
    });

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            const { data } = await supabase
                .from('partners')
                .select('name, email, partner_id')
                .eq('id', user.id)
                .single();

            if (data) setProfile(data as any);
            setLoading(false);
        }
        fetchProfile();
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) return;

        await supabase
            .from('partners')
            .update({
                name: profile.name,
            })
            .eq('id', user.id);

        setSaved(true);
        setSaving(false);
        setTimeout(() => setSaved(false), 3000);
    }

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-[#865BFF]" />
        </div>
    );

    return (
        <div className="max-w-4xl mx-auto space-y-8 pb-20">
            {/* Header / Hero */}
            <div className="relative overflow-hidden rounded-[2.5rem] bg-[#0d0221] p-10 text-white shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-96 h-96 bg-[#865BFF] opacity-10 blur-[100px] -mr-48 -mt-48"></div>
                <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                    <div className="relative group">
                        <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#865BFF] to-[#6335f8] flex items-center justify-center text-3xl font-black shadow-2xl">
                            {profile.name?.substring(0, 2).toUpperCase() || 'BM'}
                        </div>
                        <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-xl bg-white text-[#0d0221] flex items-center justify-center shadow-lg border-4 border-[#0d0221] group-hover:scale-110 transition-transform cursor-pointer">
                            <Camera className="w-4 h-4" />
                        </div>
                    </div>
                    <div className="text-center md:text-left">
                        <div className="flex flex-col md:flex-row md:items-center gap-3 mb-2">
                            <h1 className="text-3xl font-black tracking-tight">{profile.name || 'Partner'}</h1>
                            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-bold uppercase tracking-wider border border-emerald-500/20">
                                <BadgeCheck className="w-3 h-3" /> {t.settings.verified}
                            </span>
                        </div>
                        <p className="text-white/50 text-sm font-medium flex items-center justify-center md:justify-start gap-2">
                            <Mail className="w-4 h-4" /> {profile.email}
                        </p>
                    </div>
                    <div className="md:ml-auto bg-white/5 backdrop-blur-md rounded-2xl p-4 border border-white/10 text-center min-w-[140px]">
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Partner ID</div>
                        <div className="text-xl font-mono font-bold text-[#865BFF]">{profile.partner_id || '---'}</div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Navigation / Sidebar Settings */}
                <div className="space-y-2">
                    <h3 className="text-xs font-bold text-slate-400 uppercase tracking-widest px-4 mb-4">{t.settings.menuTitle}</h3>
                    {[
                        { icon: User, label: t.settings.profile, active: true },
                        { icon: Shield, label: t.settings.security, active: false },
                        { icon: Settings, label: t.settings.preferences, active: false },
                    ].map((item, i) => (
                        <button
                            key={i}
                            className={`w-full flex items-center gap-3 px-4 py-4 rounded-2xl text-sm font-bold transition-all ${
                                item.active 
                                    ? 'bg-white text-[#865BFF] shadow-xl shadow-[#865BFF]/5 border border-slate-100' 
                                    : 'text-slate-500 hover:bg-slate-50'
                            }`}
                        >
                            <item.icon className={`w-5 h-5 ${item.active ? 'text-[#865BFF]' : 'text-slate-400'}`} />
                            {item.label}
                        </button>
                    ))}
                </div>

                {/* Main Form */}
                <div className="md:col-span-2 space-y-6">
                    <form onSubmit={handleSave} className="bg-white rounded-[2.5rem] border border-slate-100 shadow-sm overflow-hidden">
                        <div className="p-8 border-b border-slate-50">
                            <h3 className="text-lg font-bold text-slate-800">{t.settings.profileInfo}</h3>
                            <p className="text-slate-400 text-xs">{t.settings.profileInfoDesc}</p>
                        </div>
                        
                        <div className="p-8 space-y-6">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                                        <User className="w-3 h-3" /> {t.settings.fullName}
                                    </label>
                                    <input
                                        type="text"
                                        value={profile.name || ''}
                                        onChange={e => setProfile({ ...profile, name: e.target.value })}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-2xl py-4 px-5 text-sm font-semibold text-slate-800 focus:outline-none focus:border-[#865BFF] focus:ring-4 focus:ring-[#865BFF]/5 transition-all"
                                        placeholder={t.settings.fullName}
                                    />
                                </div>
                                <div className="space-y-2 opacity-50">
                                    <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                                        <Globe className="w-3 h-3" /> {t.settings.country}
                                    </label>
                                    <input
                                        type="text"
                                        value="--"
                                        disabled
                                        className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-4 px-5 text-sm font-semibold text-slate-400 cursor-not-allowed"
                                        placeholder={t.settings.country}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 opacity-60">
                                <label className="text-[11px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-1.5 ml-1">
                                    <Mail className="w-3 h-3" /> {t.settings.emailLabel}
                                </label>
                                <input
                                    type="email"
                                    value={profile.email || ''}
                                    disabled
                                    className="w-full bg-slate-100 border border-slate-200 rounded-2xl py-4 px-5 text-sm font-semibold text-slate-500 cursor-not-allowed"
                                />
                                <div className="flex items-start gap-2 mt-2 px-2">
                                    <Shield className="w-3 h-3 text-slate-400 mt-0.5" />
                                    <p className="text-[10px] text-slate-400 leading-normal">{t.settings.emailSecurityNote}</p>
                                </div>
                            </div>
                        </div>

                        <div className="p-8 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
                            <div className="relative">
                                {saved && (
                                    <motion.div 
                                        initial={{ opacity: 0, x: -10 }} 
                                        animate={{ opacity: 1, x: 0 }} 
                                        className="flex items-center gap-2 text-emerald-600 font-bold text-sm"
                                    >
                                        <div className="w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center">
                                            <Check className="w-3 h-3" />
                                        </div>
                                        {t.settings.savedSuccess}
                                    </motion.div>
                                )}
                            </div>
                            <button
                                type="submit"
                                disabled={saving}
                                className="inline-flex items-center gap-3 px-8 py-4 bg-[#865BFF] text-white rounded-2xl text-sm font-black hover:bg-[#7444ff] transition-all hover:scale-105 active:scale-95 disabled:opacity-60 shadow-xl shadow-[#865BFF]/20"
                            >
                                {saving ? <Loader2 className="w-5 h-5 animate-spin" /> : <Save className="w-5 h-5" />}
                                {saving ? t.settings.saving : t.settings.saveProfile}
                            </button>
                        </div>
                    </form>

                    {/* Danger Zone */}
                    <div className="bg-red-50/50 border border-red-100 rounded-[2.5rem] p-8">
                        <h4 className="text-sm font-black text-red-600 uppercase tracking-widest mb-1">{t.settings.dangerZone}</h4>
                        <p className="text-xs text-red-500 opacity-60 mb-4 font-medium">{t.settings.dangerDesc}</p>
                        <button className="text-red-600 text-sm font-bold hover:underline">{t.settings.deactivate}</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
