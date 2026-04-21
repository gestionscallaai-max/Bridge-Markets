"use client";

import React, { useEffect, useRef, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Loader2, ArrowRight, Mail, Lock, Eye, EyeOff, Shield, User, Globe, Zap, ShieldCheck, Pencil, CheckCircle2, Link2 } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

declare global {
    interface Window {
        VANTA: any;
    }
}

function RegisterPageContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [referralLink, setReferralLink] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [autoLogin, setAutoLogin] = useState(false);
    const [errorMsg, setErrorMsg] = useState('');
    useEffect(() => {
        const pId = searchParams.get('partner_id');
        const slug = searchParams.get('slug');
        if (pId || slug) {
            // If we have a slug, we can reconstruct a "friendly" display link
            const baseUrl = typeof window !== 'undefined' ? window.location.origin : '';
            const displayLink = slug ? `${baseUrl}/r/${slug}` : `Partner: ${pId}`;
            setReferralLink(displayLink);
            
            // Log for debug (Production ready)
            console.log('Attribution captured:', { pId, slug });
        }
    }, [searchParams]);

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
                    color: 0x140633,
                    shininess: 35.00,
                    waveHeight: 15.00,
                    waveSpeed: 0.50,
                    zoom: 0.85
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

        try {
            // 1. Create auth user with role partner_view in metadata
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: name,
                        role: 'partner_view',
                        referral_link: referralLink,
                    }
                }
            });

            if (error) {
                setErrorMsg(error.message);
                setLoading(false);
                return;
            }

            // 2. Update the partner record with role 'partner' consistently
            if (data?.user?.id) {
                await supabase
                    .from('partners')
                    .update({ role: 'partner' })
                    .eq('id', data.user.id);

                // --- NEW: Notificar a los Admins ---
                const { data: admins } = await supabase
                    .from('partners')
                    .select('id')
                    .eq('role', 'admin');
                
                if (admins && admins.length > 0) {
                    const notifications = admins.map(admin => ({
                        user_id: admin.id,
                        title: 'Nuevo Socio Registrado',
                        message: `${name} se ha unido al programa como socio.`,
                        type: 'info',
                        link: '/dashboard/admin/partners'
                    }));
                    await supabase.from('notifications').insert(notifications);
                }
            }

            // 3. Handle auto-login if session exists
            if (data?.session) {
                setAutoLogin(true);
                setSuccess(true);
                setTimeout(() => {
                    router.push('/dashboard');
                }, 2000);
            } else {
                setSuccess(true);
                setLoading(false);
            }
        } catch (err: any) {
            setErrorMsg(err?.message || 'Error inesperado al crear la cuenta.');
            setLoading(false);
        }
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
                {/* Vanta Background - Dark purple like login */}
                <div ref={vantaRef} className="absolute inset-0 z-0" style={{ background: '#0d0221' }} />
                <div className="absolute inset-0 z-[1]" style={{ background: 'linear-gradient(160deg, rgba(13,2,33,0.95) 0%, rgba(20,6,51,0.8) 50%, rgba(134,91,255,0.2) 100%)' }} />
                
                {/* Large Background Watermark */}
                <div className="absolute -left-20 -bottom-20 w-[600px] h-[600px] opacity-[0.05] grayscale brightness-0 invert pointer-events-none rotate-12">
                    <img src="/images/LOGO PARA FONDOS.png" alt="" className="w-full h-full object-contain" />
                </div>

                {/* Content */}
                <div className="relative z-10 text-center px-12 w-full max-w-2xl">
                    {/* Logo */}
                    <motion.div 
                        initial={{ opacity: 0, y: -20 }} 
                        animate={{ opacity: 1, y: 0 }}
                        className="mx-auto mb-12"
                    >
                        <img src="/images/logo BM blanco.png" alt="Bridge Markets" className="h-40 mx-auto object-contain drop-shadow-[0_0_30px_rgba(134,91,255,0.3)]" />
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.2 }}
                    >
                        <h2 className="text-3xl font-black text-white tracking-tighter mb-4 uppercase">
                            Bridge Markets <span className="text-[#865BFF]">Internal Panel</span>
                        </h2>
                        <div className="w-20 h-1 bg-gradient-to-r from-[#865BFF] to-transparent mx-auto mb-6 rounded-full" />
                        <p className="text-purple-100/60 text-base leading-relaxed mb-12 font-medium max-w-md mx-auto">
                            Plataforma premium para IB&apos;S &quot;Broker&quot;. Genera piezas gráficas multilenguaje y landing pages con IA en minutos.
                        </p>
                    </motion.div>

                    {/* Feature Cards Grid */}
                    <div className="grid grid-cols-2 gap-4">
                        {features.map((feat, i) => {
                            const Icon = feat.icon;
                            return (
                                <motion.div
                                    key={feat.title}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 + (i * 0.1) }}
                                    className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-2xl p-5 text-left hover:bg-white/[0.08] hover:border-white/20 transition-all duration-300"
                                >
                                    <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${feat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                        <Icon className="w-5 h-5 text-white" />
                                    </div>
                                    <div className="text-white text-sm font-bold tracking-wide">{feat.title}</div>
                                    <div className="text-white/40 text-[11px] mt-1 font-medium leading-tight">{feat.desc}</div>
                                </motion.div>
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
                                {/* Animated checkmark */}
                                <motion.div 
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.15, type: "spring", stiffness: 200, damping: 15 }}
                                    className="w-20 h-20 bg-gradient-to-br from-emerald-400 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-emerald-500/30"
                                >
                                    <CheckCircle2 className="w-10 h-10 text-white" />
                                </motion.div>

                                <motion.h2 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                    className="text-lg font-normal text-slate-800 tracking-tight mb-2"
                                >
                                    ¡Cuenta creada exitosamente!
                                </motion.h2>
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4 }}
                                    className="text-sm text-slate-500 mb-3 leading-relaxed"
                                >
                                    Tu cuenta de Partner ha sido creada con el rango <span className="font-normal text-[#865BFF]">Partner</span>.
                                </motion.p>
                                <motion.p 
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.45 }}
                                    className="text-sm text-slate-400 mb-8 leading-relaxed"
                                >
                                    {autoLogin ? (
                                        <span className="flex items-center justify-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin text-[#865BFF]" />
                                            Iniciando sesión automáticamente...
                                        </span>
                                    ) : (
                                        "Revisa tu bandeja de entrada para verificar tu correo electrónico antes de iniciar sesión."
                                    )}
                                </motion.p>

                                {!autoLogin && (
                                    <motion.div
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.55 }}
                                    >
                                        <button 
                                            onClick={() => router.push('/login')} 
                                            className="w-full bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white hover:from-[#7344ff] hover:to-[#5c36b8] shadow-lg shadow-[#865BFF]/20 py-3 rounded-lg font-normal transition-all hover:shadow-[#865BFF]/40"
                                        >
                                            Ir al Inicio de Sesión
                                        </button>
                                    </motion.div>
                                )}
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
                                    <span className="text-xs font-normal text-[#865BFF] uppercase tracking-wider">Nuevo Partner</span>
                                </div>

                                {/* Heading */}
                                <h1 className="text-lg font-normal text-slate-800 tracking-tight">
                                    Crea tu cuenta
                                </h1>
                                <p className="text-sm text-slate-400 mt-1 mb-7">
                                    Completa tus datos para obtener acceso al panel.
                                </p>

                                {errorMsg && (
                                    <motion.div 
                                        initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}
                                        className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm font-normal flex items-center gap-2 mb-5"
                                    >
                                        {errorMsg}
                                    </motion.div>
                                )}

                                {/* Form */}
                                <form onSubmit={handleRegister}>
                                    
                                    {/* Name */}
                                    <div className="mb-4">
                                        <label className="block text-[12px] font-normal text-slate-600 mb-1.5">
                                            Nombre completo
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                value={name}
                                                onChange={(e) => setName(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
                                                placeholder="Juan Pérez"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Email */}
                                    <div className="mb-4">
                                        <label className="block text-[12px] font-normal text-slate-600 mb-1.5">
                                            Email corporativo
                                        </label>
                                        <div className="relative">
                                            <input
                                                type="email"
                                                value={email}
                                                onChange={(e) => setEmail(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
                                                placeholder="tu@bridge.com"
                                                required
                                            />
                                        </div>
                                    </div>

                                    {/* Password */}
                                    <div className="mb-4">
                                        <div className="flex justify-between items-center mb-1.5">
                                            <label className="block text-[12px] font-normal text-slate-600">
                                                Contraseña
                                            </label>
                                        </div>
                                        <div className="relative">
                                            <input
                                                type={showPassword ? 'text' : 'password'}
                                                value={password}
                                                minLength={6}
                                                onChange={(e) => setPassword(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 px-4 pr-11 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
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
                                        <p className="mt-1.5 text-[11px] text-slate-400">Debe tener al menos 6 caracteres.</p>
                                    </div>

                                    {/* Referral Link */}
                                    <div className="mb-6">
                                        <label className="block text-[12px] font-normal text-slate-600 mb-1.5">
                                            Link de referido
                                        </label>
                                        <div className="relative">
                                            <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400">
                                                <Link2 className="w-4 h-4" />
                                            </div>
                                            <input
                                                type="url"
                                                value={referralLink}
                                                onChange={(e) => setReferralLink(e.target.value)}
                                                className="w-full bg-slate-50 border border-slate-200 rounded-lg py-2.5 pl-10 pr-4 text-sm font-medium text-slate-800 transition-all focus:outline-none focus:bg-white focus:border-[#865BFF] focus:ring-2 focus:ring-[#865BFF]/10 placeholder:text-slate-400"
                                                placeholder="https://tu-link-de-referido.com"
                                            />
                                        </div>
                                        <p className="mt-1.5 text-[11px] text-slate-400">Opcional. Tu enlace de afiliado o referido.</p>
                                    </div>

                                    {/* Submit */}
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className={`w-full rounded-lg py-3 text-sm font-normal flex items-center justify-center gap-2 transition-all duration-200 
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

export default function RegisterPage() {
    return (
        <Suspense fallback={
            <div className="flex h-screen w-screen items-center justify-center bg-[#0d0221]">
                <Loader2 className="w-10 h-10 animate-spin text-[#865BFF]" />
            </div>
        }>
            <RegisterPageContent />
        </Suspense>
    );
}
