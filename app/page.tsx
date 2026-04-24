"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    ArrowRight, 
    Shield, 
    BarChart3, 
    Globe, 
    Zap, 
    ShieldCheck, 
    Pencil,
    LayoutDashboard,
    Users,
    MousePointer2
} from 'lucide-react';
import { motion } from 'framer-motion';

declare global {
    interface Window {
        VANTA: any;
    }
}

export default function LandingPage() {
    const router = useRouter();
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    // Initialize Vanta.js (Waves effect like login page)
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

    const features = [
        { icon: Pencil, title: 'Generador de Piezas', desc: 'Crea banners y posts profesionales en segundos.' },
        { icon: Globe, title: 'Landings con IA', desc: 'Páginas de aterrizaje personalizadas para tus clientes.' },
        { icon: BarChart3, title: 'Métricas Reales', desc: 'Analiza tu tráfico y conversiones en tiempo real.' },
        { icon: LayoutDashboard, title: 'Panel Premium', desc: 'Gestión centralizada para afiliados profesionales.' },
    ];

    return (
        <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden selection:bg-[#865BFF]/30">
            {/* Background */}
            <div ref={vantaRef} className="fixed inset-0 z-0" />
            <div className="fixed inset-0 z-[1] bg-gradient-to-b from-[#0d0221]/80 via-[#140633]/90 to-[#0d0221]" />

            {/* Navbar */}
            <nav className="relative z-50 w-full px-6 py-6 md:px-12 flex items-center justify-between">
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-3"
                >
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" className="h-10 object-contain" />
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-4"
                >
                    <button 
                        onClick={() => router.push('/login')}
                        className="text-white/70 hover:text-white text-sm font-medium transition-colors hidden sm:block"
                    >
                        Iniciar Sesión
                    </button>
                    <button 
                        onClick={() => router.push('/register')}
                        className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/10 text-white px-5 py-2.5 rounded-xl text-sm font-medium transition-all"
                    >
                        Convertirme en Partner
                    </button>
                </motion.div>
            </nav>

            {/* Hero Section */}
            <main className="relative z-10 flex-grow flex flex-col items-center justify-center px-6 text-center pt-20 pb-32">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="flex items-center gap-2 bg-[#865BFF]/10 border border-[#865BFF]/20 px-4 py-2 rounded-full mb-8"
                >
                    <Shield className="w-4 h-4 text-[#865BFF]" />
                    <span className="text-[#865BFF] text-xs font-bold uppercase tracking-widest">Portal Oficial de Afiliados</span>
                </motion.div>

                <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-5xl md:text-7xl font-black text-white tracking-tighter max-w-4xl leading-[1.1]"
                >
                    Potencia tu red con <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#865BFF] via-[#a07eff] to-[#865BFF]">Tecnología e IA</span>
                </motion.h1>

                <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="text-purple-100/60 text-lg md:text-xl max-w-2xl mt-8 leading-relaxed font-medium"
                >
                    La plataforma definitiva para Partners de Bridge Markets. Genera marketing de alto impacto y escala tus resultados con herramientas de última generación.
                </motion.p>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex flex-col sm:flex-row items-center gap-4 mt-12"
                >
                    <button 
                        onClick={() => router.push('/login')}
                        className="w-full sm:w-auto bg-gradient-to-r from-[#865BFF] to-[#6b3fd6] text-white px-8 py-4 rounded-2xl font-bold flex items-center justify-center gap-2 shadow-[0_10px_40px_-10px_rgba(134,91,255,0.5)] hover:scale-105 transition-all group"
                    >
                        Acceder al Panel <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                    <button 
                        onClick={() => router.push('/register')}
                        className="w-full sm:w-auto bg-white/5 hover:bg-white/10 backdrop-blur-xl border border-white/10 text-white px-8 py-4 rounded-2xl font-bold transition-all"
                    >
                        Solicitar Cuenta
                    </button>
                </motion.div>

                {/* Floating Elements / Features */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-32 w-full max-w-6xl">
                    {features.map((feat, i) => {
                        const Icon = feat.icon;
                        return (
                            <motion.div
                                key={feat.title}
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 + (i * 0.1) }}
                                className="group bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl p-8 text-left hover:bg-white/[0.06] hover:border-white/20 transition-all duration-500"
                            >
                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-[#865BFF] to-[#6b3fd6] flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500">
                                    <Icon className="w-6 h-6 text-white" />
                                </div>
                                <h3 className="text-white text-xl font-bold tracking-tight mb-2">{feat.title}</h3>
                                <p className="text-white/40 text-sm leading-relaxed font-medium">{feat.desc}</p>
                            </motion.div>
                        );
                    })}
                </div>
            </main>

            {/* Footer */}
            <footer className="relative z-10 px-12 py-12 border-t border-white/5 mt-auto">
                <div className="max-w-6xl mx-auto flex flex-col md:row items-center justify-between gap-6">
                    <div className="flex items-center gap-2">
                        <img src="/images/logo-bm-blanco.png" alt="" className="h-6 opacity-30 grayscale" />
                        <span className="text-white/20 text-xs font-medium">© 2026 Bridge Markets. All rights reserved.</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Términos</a>
                        <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Privacidad</a>
                        <a href="#" className="text-white/20 hover:text-white/50 text-xs transition-colors">Soporte</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
