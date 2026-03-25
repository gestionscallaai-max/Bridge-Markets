"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Mail, Lock, Eye, EyeOff, Shield, BarChart3, Globe, Zap, ShieldCheck, Pencil } from 'lucide-react';

declare global {
    interface Window {
        VANTA: any;
    }
}

export default function LoginPage() {
    const router = useRouter();
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Initialize Vanta.js
    useEffect(() => {
        const loadVantaScripts = async () => {
            if (typeof window !== 'undefined' && !window.VANTA) {
                const threeScript = document.createElement('script');
                threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
                document.head.appendChild(threeScript);
                await new Promise(resolve => threeScript.onload = resolve);

                const vantaScript = document.createElement('script');
                vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
                document.head.appendChild(vantaScript);
                await new Promise(resolve => vantaScript.onload = resolve);
            }

            if (!vantaEffect && vantaRef.current && window.VANTA) {
                const effect = window.VANTA.WAVES({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x9b51e0,
                    shininess: 80.00,
                    waveHeight: 20.00,
                    waveSpeed: 0.65,
                    zoom: 0.8
                });
                setVantaEffect(effect);
            }
        };

        loadVantaScripts();
        return () => { if (vantaEffect) vantaEffect.destroy(); };
    }, [vantaEffect]);

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);
            setTimeout(() => router.push('/dashboard'), 800);
        }, 1200);
    };

    const features = [
        { icon: Pencil, title: 'Piezas Gráficas', desc: '4 formatos, 14 idiomas', color: 'from-pink-500 to-rose-400' },
        { icon: Globe, title: 'Landing Pages', desc: 'Con IA en 3 pasos', color: 'from-brand to-blue-400' },
        { icon: Zap, title: 'Tiempo < 30 min', desc: 'De idea a resultado', color: 'from-amber-500 to-orange-400' },
        { icon: ShieldCheck, title: 'Branding seguro', desc: 'Plantillas bloqueadas', color: 'from-emerald-500 to-teal-400' },
    ];

    return (
        <div className="flex h-screen w-screen font-sans overflow-hidden">

            {/* ========== LEFT PANEL — Branded Info ========== */}
            <div className="relative w-1/2 hidden lg:flex flex-col items-center justify-center overflow-hidden">
                {/* Vanta Background */}
                <div ref={vantaRef} className="absolute inset-0 z-0" />
                <div className="absolute inset-0 z-[1] bg-gradient-to-b from-purple-900/30 via-transparent to-purple-900/40" />

                {/* Content */}
                <div className="relative z-10 text-center px-12 max-w-lg">
                    {/* Logo */}
                    <div className="mx-auto mb-8">
                        <img src="/images/logo.png" alt="Bridge Markets" className="h-16 object-contain drop-shadow-2xl" />
                    </div>

                    <h2 className="text-3xl font-bold text-white tracking-tight mb-3">
                        Bridge Internal Panel
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-10">
                        Plataforma premium para comerciales. Genera piezas gráficas multilenguaje y landing pages con IA en minutos.
                    </p>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-3">
                        {features.map((feat) => {
                            const Icon = feat.icon;
                            return (
                                <div
                                    key={feat.title}
                                    className="bg-white/10 backdrop-blur-md border border-white/15 rounded-xl p-4 text-left hover:bg-white/15 transition-colors"
                                >
                                    <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${feat.color} flex items-center justify-center mb-2.5 shadow-sm`}>
                                        <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="text-white text-[13px] font-semibold">{feat.title}</div>
                                    <div className="text-white/50 text-[11px] mt-0.5">{feat.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* ========== RIGHT PANEL — Login Form ========== */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center relative">
                <div className="w-full max-w-[400px] px-8">
                    {/* Badge */}
                    <div className="flex items-center gap-2 mb-5">
                        <Shield className="w-4 h-4 text-brand" />
                        <span className="text-xs font-semibold text-brand uppercase tracking-wider">Acceso Privado</span>
                    </div>

                    {/* Heading */}
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                        Bienvenido de vuelta
                    </h1>
                    <p className="text-sm text-slate-400 mt-1 mb-8">
                        Ingresa tus credenciales corporativas para continuar
                    </p>

                    {/* Form */}
                    <form onSubmit={handleLogin}>
                        {/* Email */}
                        <div className="mb-5">
                            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                                Email corporativo
                            </label>
                            <div className="relative">
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/10 placeholder:text-slate-400"
                                    placeholder="tu@bridge.com"
                                    required
                                />
                            </div>
                        </div>

                        {/* Password */}
                        <div className="mb-7">
                            <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                                Contraseña
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 pr-11 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/10"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                                </button>
                            </div>
                        </div>

                        {/* Submit */}
                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`w-full rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 ${success
                                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/25'
                                : 'bg-gradient-to-r from-purple-600 to-brand-dark text-white hover:from-purple-700 hover:to-indigo-700 shadow-lg shadow-brand/20 hover:shadow-xl'
                                } disabled:opacity-70 disabled:cursor-not-allowed`}
                        >
                            {loading ? (
                                <><Loader2 className="w-4 h-4 animate-spin" /> Autenticando...</>
                            ) : success ? (
                                <>Acceso concedido</>
                            ) : (
                                <>Iniciar sesión <ArrowRight className="w-4 h-4" /></>
                            )}
                        </button>
                    </form>

                    {/* Help links */}
                    <div className="mt-6 space-y-3">
                        <div className="text-center text-[12px] text-slate-400 bg-slate-50 rounded-lg py-2.5 px-4 border border-slate-100">
                            ¿Sin acceso? Contacta con tu <a href="#" className="font-semibold text-brand hover:text-brand-dark">administrador</a> para que te cree una cuenta.
                        </div>
                        <p className="text-center text-[11px] text-slate-400">
                            ¿Problemas de acceso? Contacta con <a href="mailto:soporte@bridge.com" className="font-semibold text-brand hover:text-brand-dark">soporte@bridge.com</a>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
