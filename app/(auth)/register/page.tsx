"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2, ArrowRight, Mail, Lock, Eye, EyeOff, Shield, User, Globe, Zap, ShieldCheck, Pencil, CheckCircle2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
    interface Window {
        VANTA: any;
    }
}

export default function RegisterPage() {
    const router = useRouter();
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');

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

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setErrorMsg('');

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                data: {
                    full_name: name,
                }
            }
        });

        if (error) {
            setErrorMsg(error.message);
            setLoading(false);
            return;
        }

        setSuccess(true);
        setLoading(false);
    };

    const features = [
        { icon: Pencil, title: 'Piezas Gráficas', desc: '4 formatos, 14 idiomas', color: 'from-pink-500 to-rose-400' },
        { icon: Globe, title: 'Landing Pages', desc: 'Con IA en 3 pasos', color: 'from-brand to-blue-400' },
        { icon: Zap, title: 'Tiempo < 30 min', desc: 'De idea a resultado', color: 'from-amber-500 to-orange-400' },
        { icon: ShieldCheck, title: 'Branding seguro', desc: 'Plantillas bloqueadas', color: 'from-emerald-500 to-teal-400' },
    ];

    return (
        <div className="flex h-screen w-screen font-sans overflow-hidden bg-slate-50">

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
                        Únete al Programa
                    </h2>
                    <p className="text-white/70 text-sm leading-relaxed mb-10">
                        Solicita tu cuenta de Partner y accede a la plataforma de generación y captura de leads más avanzada.
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

            {/* ========== RIGHT PANEL — Register Form ========== */}
            <div className="w-full lg:w-1/2 bg-white flex items-center justify-center relative shadow-[-20px_0_30px_-10px_rgba(0,0,0,0.1)] z-10 overflow-y-auto">
                <div className="w-full max-w-[400px] px-8 py-10 relative min-h-[500px] flex items-center justify-center">
                    
                    <AnimatePresence mode="wait">
                        {success ? (
                            <motion.div 
                                key="success"
                                initial={{ opacity: 0, scale: 0.95, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                transition={{ duration: 0.4, ease: "easeOut" }}
                                className="text-center w-full"
                            >
                                <div className="w-16 h-16 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6 text-emerald-600">
                                    <CheckCircle2 className="w-8 h-8" />
                                </div>
                                <h2 className="text-2xl font-bold text-slate-800 tracking-tight mb-2">¡Solicitud Recibida!</h2>
                                <p className="text-sm text-slate-500 mb-8 leading-relaxed">
                                    Hemos creado tu cuenta de Partner. Revisa tu bandeja de entrada para verificar tu correo electrónico antes de iniciar sesión.
                                </p>
                                <button 
                                    onClick={() => router.push('/login')} 
                                    className="w-full bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white hover:from-[#7344ff] hover:to-[#5c36b8] shadow-lg shadow-[#865BFF]/20 py-3 rounded-lg font-semibold transition-all"
                                >
                                    Ir al Inicio de Sesión
                                </button>
                            </motion.div>
                        ) : (
                            <motion.div 
                                key="form"
                                initial={{ opacity: 0, x: -15 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: 15 }}
                                transition={{ duration: 0.35, ease: "easeOut" }}
                                className="w-full"
                            >
                                {/* Badge */}
                                <div className="flex items-center gap-2 mb-5">
                                    <Shield className="w-4 h-4 text-[#865BFF]" />
                                    <span className="text-xs font-semibold text-[#865BFF] uppercase tracking-wider">Nuevo Partner</span>
                                </div>

                                {/* Heading */}
                                <h1 className="text-2xl font-bold text-slate-800 tracking-tight">
                                    Crea tu cuenta
                                </h1>
                                <p className="text-sm text-slate-400 mt-1 mb-8">
                                    Completa tus datos para obtener acceso al panel.
                                </p>

                                {errorMsg && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-semibold flex items-center gap-2 mb-6"
                                    >
                                        {errorMsg}
                                    </motion.div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleRegister}>
                                    
                                    {/* Name */}
                                    <div className="mb-5">
                                        <label className="block text-[12px] font-semibold text-slate-600 mb-1.5">
                                            Nombre completo
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
                                                placeholder="Juan Pérez"
                                                required
                                            />
                                        </div>
                                    </div>

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
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
                                                placeholder="tu@bridge.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-7">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="block text-[12px] font-semibold text-slate-600">
                                                Contraseña
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                minLength={6}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-3 px-4 pr-11 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
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
                                        <p className="mt-2 text-[11px] text-slate-400">Debe tener al menos 6 caracteres.</p>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full rounded-lg py-3 text-sm font-semibold flex items-center justify-center gap-2 transition-all duration-200 
                                            bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white hover:from-[#7344ff] hover:to-[#5c36b8] shadow-lg shadow-[#865BFF]/20 hover:shadow-[#865BFF]/40
                                            disabled:opacity-70 disabled:cursor-not-allowed`}
                                    >
                                        {loading ? (
                                            <><Loader2 className="w-4 h-4 animate-spin" /> Registrando...</>
                                        ) : (
                                            <>Crear Cuenta <ArrowRight className="w-4 h-4" /></>
                                        )}
                                    </button>
                                </form>

                                {/* Info */}
                                <div className="mt-6 flex justify-center text-[12px] text-slate-500">
                                    ¿Ya tienes una cuenta? <button type="button" onClick={() => router.push('/login')} className="ml-1 font-semibold text-[#865BFF] hover:text-[#6b3fd6]">Inicia sesión aquí</button>
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>

                </div>
            </div>
        </div>
    );
}
