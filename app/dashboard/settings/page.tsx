"use client";
import React, { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabaseClient';
import { Settings, Loader2, Save, User, Mail, Globe, Phone } from 'lucide-react';

export default function AccountSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [saved, setSaved] = useState(false);
    const [profile, setProfile] = useState({
        full_name: '',
        email: '',
        country: '',
        partner_id: '',
    });

    useEffect(() => {
        async function fetchProfile() {
            const { data: { user } } = await supabase.auth.getUser();
            if (!user) { setLoading(false); return; }

            const { data } = await supabase
                .from('profiles')
                .select('full_name, email, country, partner_id')
                .eq('id', user.id)
                .single();

            if (data) setProfile(data);
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
            .from('profiles')
            .update({
                full_name: profile.full_name,
                country: profile.country,
            })
            .eq('id', user.id);

        setSaved(true);
        setSaving(false);
        setTimeout(() => setSaved(false), 3000);
    }

    if (loading) return (
        <div className="flex h-[60vh] items-center justify-center">
            <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
        </div>
    );

    return (
        <div className="space-y-5 pb-10 max-w-2xl">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <Settings className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Configuración de Cuenta</h2>
                    <p className="text-slate-500 text-sm">Actualiza tu información personal de Partner.</p>
                </div>
            </div>

            {/* Partner ID Badge */}
            <div className="card p-5 flex items-center gap-4 bg-gradient-to-r from-[#140633] to-[#1e0a4a]">
                <div className="w-12 h-12 rounded-xl bg-brand-500/30 flex items-center justify-center text-white font-bold text-lg">
                    {profile.full_name?.substring(0, 2).toUpperCase() || 'BM'}
                </div>
                <div>
                    <div className="text-xs font-semibold text-white/50 uppercase tracking-wider mb-0.5">Tu ID de Partner</div>
                    <div className="text-xl font-bold text-white tracking-wide">{profile.partner_id || 'Sin asignar'}</div>
                </div>
            </div>

            {/* Edit Form */}
            <form onSubmit={handleSave} className="card p-6 space-y-5">
                <h3 className="text-sm font-bold text-slate-700">Información Personal</h3>

                <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
                        <User className="w-3.5 h-3.5" /> Nombre Completo
                    </label>
                    <input
                        type="text"
                        value={profile.full_name || ''}
                        onChange={e => setProfile({ ...profile, full_name: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                        placeholder="Tu nombre completo"
                    />
                </div>

                <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
                        <Mail className="w-3.5 h-3.5" /> Email (no editable)
                    </label>
                    <input
                        type="email"
                        value={profile.email || ''}
                        disabled
                        className="w-full bg-slate-100 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-400 font-medium cursor-not-allowed"
                    />
                    <p className="text-[11px] text-slate-400 mt-1">El email está vinculado a tu cuenta de autenticación y no puede cambiarse aquí.</p>
                </div>

                <div>
                    <label className="flex items-center gap-1.5 text-xs font-semibold text-slate-500 mb-1.5">
                        <Globe className="w-3.5 h-3.5" /> País
                    </label>
                    <input
                        type="text"
                        value={profile.country || ''}
                        onChange={e => setProfile({ ...profile, country: e.target.value })}
                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm text-slate-800 font-medium focus:outline-none focus:border-brand-500 focus:ring-2 focus:ring-brand-500/10 transition-all"
                        placeholder="Ej. España"
                    />
                </div>

                <div className="pt-2 flex items-center gap-3">
                    <button
                        type="submit"
                        disabled={saving}
                        className="flex items-center gap-2 px-5 py-2.5 bg-brand-500 text-white rounded-lg text-sm font-semibold hover:bg-brand-600 transition-all disabled:opacity-60"
                    >
                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Guardando...' : 'Guardar Cambios'}
                    </button>
                    {saved && <span className="text-sm font-semibold text-emerald-600">✓ Cambios guardados</span>}
                </div>
            </form>
        </div>
    );
}
