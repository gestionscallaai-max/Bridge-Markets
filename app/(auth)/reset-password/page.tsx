"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, Lock, Eye, EyeOff, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function ResetPasswordPage() {
    const router = useRouter();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [loading, setLoading] = useState(false);
    const [done, setDone] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    // Supabase session is set automatically from the URL token when the user lands here
    useEffect(() => {
        // Listen for the PASSWORD_RECOVERY event
        const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event) => {
            if (event === 'PASSWORD_RECOVERY') {
                // Session is now active, user can set new password
            }
        });
        return () => subscription.unsubscribe();
    }, []);

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setErrorMsg('');

        if (password.length < 6) {
            setErrorMsg('La contraseña debe tener al menos 6 caracteres.');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMsg('Las contraseñas no coinciden.');
            return;
        }

        setLoading(true);
        const { error } = await supabase.auth.updateUser({ password });
        setLoading(false);

        if (error) {
            setErrorMsg('Error al actualizar la contraseña. El enlace puede haber expirado.');
        } else {
            setDone(true);
            setTimeout(() => router.push('/login'), 3000);
        }
    };

    return (
        <div className="flex h-screen w-screen font-sans overflow-hidden bg-white items-center justify-center">
            <div className="w-full max-w-[420px] px-8">

                {/* Badge */}
                <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-4 h-4 text-[#865BFF]" />
                    <span className="text-xs font-semibold text-[#865BFF] uppercase tracking-wider">Nueva Contraseña</span>
                </div>

                {!done ? (
                    <>
                        <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                            Restablece tu contraseña
                        </h1>
                        <p className="text-sm text-slate-400 mt-1 mb-8">
                            Ingresa tu nueva contraseña para recuperar el acceso.
                        </p>

                        {errorMsg && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-6">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleReset}>
                            {/* New password */}
                            <div className="mb-4">
                                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                                    Nueva contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type={showPassword ? 'text' : 'password'}
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-11 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10"
                                        placeholder="Mínimo 6 caracteres"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Confirm password */}
                            <div className="mb-7">
                                <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                                    Confirmar contraseña
                                </label>
                                <div className="relative">
                                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type={showConfirm ? 'text' : 'password'}
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-11 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10"
                                        placeholder="Repite la contraseña"
                                        required
                                    />
                                    <button type="button" onClick={() => setShowConfirm(!showConfirm)}
                                        className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
                                        {showConfirm ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                    </button>
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white hover:from-[#7344ff] hover:to-[#5c36b8] shadow-lg shadow-[#865BFF]/20 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Actualizando...</>
                                ) : (
                                    <>Actualizar contraseña</>
                                )}
                            </button>
                        </form>
                    </>
                ) : (
                    /* ── Success */
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h1 className="text-2xl font-bold text-slate-800 mb-2">¡Contraseña actualizada!</h1>
                        <p className="text-sm text-slate-400 mb-6">
                            Tu contraseña fue cambiada exitosamente. Redirigiendo al inicio de sesión...
                        </p>
                        <div className="flex items-center justify-center gap-2 text-[#865BFF]">
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span className="text-sm font-medium">Redirigiendo...</span>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
