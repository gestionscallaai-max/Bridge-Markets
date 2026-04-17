"use client";

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowLeft, Mail, Shield, CheckCircle2, AlertCircle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';

export default function ForgotPasswordPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

    const handleReset = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });

        setLoading(false);

        if (error) {
            setErrorMsg('No encontramos una cuenta con ese email. Verifica e intenta de nuevo.');
        } else {
            setSent(true);
        }
    };

    return (
        <div className="flex h-screen w-screen font-sans overflow-hidden bg-white items-center justify-center">
            <div className="w-full max-w-[420px] px-8">

                {/* Badge */}
                <div className="flex items-center gap-2 mb-6">
                    <Shield className="w-4 h-4 text-[#865BFF]" />
                    <span className="text-xs font-normal text-[#865BFF] uppercase tracking-wider">Recuperar Acceso</span>
                </div>

                {!sent ? (
                    <>
                        <h1 className="text-lg font-normal text-slate-800 tracking-tight">
                            ¿Olvidaste tu contraseña?
                        </h1>
                        <p className="text-sm text-slate-400 mt-1 mb-8">
                            Ingresa tu email corporativo y te enviaremos un enlace para restablecer tu contraseña.
                        </p>

                        {/* Error */}
                        {errorMsg && (
                            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-medium flex items-center gap-2 mb-6">
                                <AlertCircle className="w-4 h-4 flex-shrink-0" />
                                {errorMsg}
                            </div>
                        )}

                        <form onSubmit={handleReset}>
                            <div className="mb-6">
                                <label className="block text-[12px] font-normal text-slate-600 mb-1.5">
                                    Email corporativo
                                </label>
                                <div className="relative">
                                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 pl-10 pr-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
                                        placeholder="tu@bridge.com"
                                        required
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full rounded-lg py-3 text-sm font-normal flex items-center justify-center gap-2 transition-all duration-200 bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white hover:from-[#7344ff] hover:to-[#5c36b8] shadow-lg shadow-[#865BFF]/20 hover:shadow-[#865BFF]/40 disabled:opacity-70 disabled:cursor-not-allowed"
                            >
                                {loading ? (
                                    <><Loader2 className="w-4 h-4 animate-spin" /> Enviando enlace...</>
                                ) : (
                                    <>Enviar enlace de recuperación</>
                                )}
                            </button>
                        </form>

                        <button
                            onClick={() => router.push('/login')}
                            className="mt-5 w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-lg text-sm font-normal text-slate-600 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al inicio de sesión
                        </button>
                    </>
                ) : (
                    /* ── Success state */
                    <div className="text-center">
                        <div className="w-16 h-16 rounded-2xl bg-emerald-50 border border-emerald-100 flex items-center justify-center mx-auto mb-5">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h1 className="text-lg font-normal text-slate-800 tracking-tight mb-2">
                            ¡Revisa tu correo!
                        </h1>
                        <p className="text-sm text-slate-400 mb-2">
                            Enviamos un enlace de recuperación a:
                        </p>
                        <p className="text-sm font-normal text-[#865BFF] bg-[#865BFF]/5 border border-[#865BFF]/15 rounded-lg px-4 py-2 mb-6 font-mono">
                            {email}
                        </p>
                        <p className="text-xs text-slate-400 mb-8">
                            El enlace expira en 60 minutos. Si no lo ves, revisa tu carpeta de spam.
                        </p>
                        <button
                            onClick={() => router.push('/login')}
                            className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-normal text-slate-700 bg-slate-50 border border-slate-200 hover:bg-slate-100 transition-all"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Volver al inicio de sesión
                        </button>
                    </div>
                )}

                <p className="text-center text-[11px] text-slate-400 mt-6">
                    ¿Necesitas ayuda? Contacta con{' '}
                    <a href="mailto:soporte@bridge.com" className="font-normal text-[#865BFF] hover:text-[#6b3fd6]">
                        soporte@bridge.com
                    </a>
                </p>
            </div>
        </div>
    );
}
