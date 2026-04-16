"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
    Settings, Save, Megaphone, CheckCircle2, 
    AlertTriangle, Sparkles, Power, RefreshCw
} from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

interface NoticeConfig {
    text: string;
    active: boolean;
    type: 'info' | 'warning' | 'success';
}

export default function AdminSettingsPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [statusMsg, setStatusMsg] = useState('');
    const [config, setConfig] = useState<NoticeConfig>({
        text: '¡Bienvenidos a Bridge Markets!',
        active: false,
        type: 'info'
    });

    useEffect(() => {
        fetchSettings();
    }, []);

    const fetchSettings = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('system_config')
            .select('value')
            .eq('key', 'global_notice')
            .single();

        if (data && data.value) {
            setConfig(data.value as unknown as NoticeConfig);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        setStatusMsg('');
        
        const { error } = await supabase
            .from('system_config')
            .upsert({
                key: 'global_notice',
                value: config,
                updated_at: new Date().toISOString()
            });

        if (error) {
            setStatusMsg('Error al guardar: ' + error.message);
        } else {
            setStatusMsg('Configuración guardada correctamente.');
            setTimeout(() => setStatusMsg(''), 3000);
        }
        setSaving(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <RefreshCw className="w-6 h-6 text-[#865BFF] animate-spin" />
            </div>
        );
    }

    return (
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
            <div className="card p-6 border-slate-200/60">
                <div className="flex items-center gap-4 mb-8">
                    <div className="w-12 h-12 rounded-2xl bg-[#865BFF]/10 flex items-center justify-center text-[#865BFF]">
                        <Settings className="w-6 h-6" />
                    </div>
                    <div>
                        <h1 className="text-xl font-black text-slate-800 tracking-tight">Configuración Global</h1>
                        <p className="text-sm text-slate-400">Gestiona avisos y parámetros críticos del sistema.</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Notice Manager */}
                    <div className="space-y-6">
                        <div className="flex items-center justify-between">
                            <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                <Megaphone className="w-4 h-4 text-[#865BFF]" />
                                Anuncio Global (Marquesina)
                            </h2>
                            <button
                                onClick={() => setConfig({ ...config, active: !config.active })}
                                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                                    config.active 
                                        ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20' 
                                        : 'bg-slate-100 text-slate-400'
                                }`}
                            >
                                <Power className="w-3.5 h-3.5" />
                                {config.active ? 'Activo' : 'Inactivo'}
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Mensaje del Anuncio</label>
                                <textarea
                                    value={config.text}
                                    onChange={(e) => setConfig({ ...config, text: e.target.value })}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 text-sm font-medium focus:ring-2 focus:ring-[#865BFF]/20 focus:border-[#865BFF] transition-all"
                                    rows={3}
                                    placeholder="Escribe el mensaje que verán todos los socios..."
                                />
                            </div>

                            <div>
                                <label className="block text-[11px] font-black text-slate-400 uppercase tracking-widest mb-2">Tipo / Color</label>
                                <div className="grid grid-cols-3 gap-3">
                                    {[
                                        { id: 'info', label: 'Informativo', color: 'bg-[#865BFF]', icon: Megaphone },
                                        { id: 'warning', label: 'Alerta', color: 'bg-amber-500', icon: AlertTriangle },
                                        { id: 'success', label: 'Éxito', color: 'bg-emerald-500', icon: Sparkles },
                                    ].map((type) => (
                                        <button
                                            key={type.id}
                                            onClick={() => setConfig({ ...config, type: type.id as any })}
                                            className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all ${
                                                config.type === type.id 
                                                    ? 'border-[#865BFF] bg-[#865BFF]/5' 
                                                    : 'border-slate-100 bg-white hover:border-slate-200'
                                            }`}
                                        >
                                            <div className={`w-8 h-8 rounded-lg ${type.color} flex items-center justify-center text-white`}>
                                                <type.icon className="w-4 h-4" />
                                            </div>
                                            <span className="text-[10px] font-bold text-slate-600 uppercase">{type.label}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Preview Area */}
                    <div className="space-y-6">
                        <h2 className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            Vista Previa en Tiempo Real
                        </h2>
                        <div className="p-8 bg-slate-900 rounded-2xl flex flex-col items-center justify-center min-h-[200px] gap-6">
                            <div className="w-full max-w-sm bg-white rounded-xl shadow-2xl overflow-hidden border border-white/10">
                                {/* Mock Header */}
                                <div className={`h-8 w-full flex items-center px-4 overflow-hidden relative ${
                                    config.active ? (
                                        config.type === 'warning' ? 'bg-amber-500' :
                                        config.type === 'success' ? 'bg-emerald-500' : 'bg-[#865BFF]'
                                    ) : 'bg-slate-200'
                                }`}>
                                    <div className="text-[8px] font-bold text-white whitespace-nowrap">
                                        {config.active ? config.text : 'El anuncio está desactivado'}
                                    </div>
                                </div>
                                <div className="p-4 border-b border-slate-100 flex justify-between">
                                    <div className="w-20 h-3 bg-slate-100 rounded" />
                                    <div className="w-8 h-3 bg-slate-100 rounded" />
                                </div>
                                <div className="p-4 space-y-2">
                                    <div className="w-full h-2 bg-slate-50 rounded" />
                                    <div className="w-3/4 h-2 bg-slate-50 rounded" />
                                </div>
                            </div>
                            <p className="text-[10px] text-slate-500 font-medium">Así se verá el Topbar de los socios.</p>
                        </div>
                    </div>
                </div>

                <div className="mt-10 pt-6 border-t border-slate-100 flex items-center justify-between">
                    <p className={`text-sm font-medium transition-all ${statusMsg.includes('Error') ? 'text-rose-500' : 'text-emerald-500'}`}>
                        {statusMsg && (
                            <span className="flex items-center gap-1.5">
                                <CheckCircle2 className="w-4 h-4" />
                                {statusMsg}
                            </span>
                        )}
                    </p>
                    <button
                        onClick={handleSave}
                        disabled={saving}
                        className="flex items-center gap-2 bg-[#865BFF] hover:bg-[#6b3fd6] disabled:bg-slate-300 text-white font-black text-xs uppercase tracking-widest px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-[#865BFF]/20"
                    >
                        {saving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                        {saving ? 'Guardando...' : 'Guardar Configuración'}
                    </button>
                </div>
            </div>
        </motion.div>
    );
}
