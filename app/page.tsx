"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    ArrowRight, 
    Zap 
} from 'lucide-react';
import { motion } from 'framer-motion';

declare global {
    interface Window {
        VANTA: any;
    }
}

export default function UnifiedLandingPage() {
    const router = useRouter();
    const vantaRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    // Initialize Vanta.js (EXACTLY like the login page)
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
        { img: '/images/imagenes_nuevas/caballo_rosa.png', title: 'Piezas Gráficas', desc: 'Generación instantánea en 14 idiomas.' },
        { img: '/images/imagenes_nuevas/reyna_rosa.png', title: 'Landing Pages', desc: 'Tecnología IA de alta conversión.' },
        { img: '/images/imagenes_nuevas/reloj_rosa.png', title: 'Tiempo Real', desc: 'Resultados en menos de 30 minutos.' },
        { img: '/images/imagenes_nuevas/peones_rosa.png', title: 'Branding Seguro', desc: 'Protección de identidad corporativa.' }
    ];

    return (
        <div className="relative min-h-screen w-full bg-[#0d0221] text-white font-sans selection:bg-[#865BFF]/30 overflow-x-hidden">
            
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;400;600;800&display=swap');
                body { font-family: 'Plus Jakarta Sans', sans-serif; }
                .asym-card { border-radius: 4rem 1rem 4rem 1rem; }
                .glass-card {
                    background: rgba(255, 255, 255, 0.03);
                    backdrop-filter: blur(15px);
                    border: 1px solid rgba(255, 255, 255, 0.05);
                }
                .floating-3d {
                    filter: drop-shadow(0 25px 50px rgba(134, 91, 255, 0.3));
                }
            `}</style>

            {/* BACKGROUND SYSTEM (CLONED FROM LOGIN) */}
            <div ref={vantaRef} className="fixed inset-0 z-0" style={{ background: '#0d0221' }} />
            
            {/* Gradient Overlay from Login */}
            <div className="fixed inset-0 z-[1]" style={{ background: 'linear-gradient(160deg, rgba(13,2,33,0.95) 0%, rgba(20,6,51,0.8) 50%, rgba(134,91,255,0.2) 100%)' }} />
            
            {/* Watermark from Login */}
            <div className="fixed -left-20 -bottom-20 w-[600px] h-[600px] opacity-[0.05] grayscale brightness-0 invert pointer-events-none rotate-12 z-[1]">
                <img src="/images/logo-para-fondos.png" alt="" className="w-full h-full object-contain" />
            </div>

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-50 px-8 flex justify-between items-center h-24 bg-black/10 backdrop-blur-md border-b border-white/5">
                <div className="flex items-center gap-3 cursor-pointer" onClick={() => router.push('/')}>
                    <img src="/images/logo-bm-blanco.png" alt="Bridge Markets" className="h-10 object-contain" />
                    <span className="text-2xl font-extrabold tracking-tighter uppercase hidden sm:block">Bridge <span className="text-[#865BFF]">Markets</span></span>
                </div>
                <div className="flex items-center gap-6">
                    <button onClick={() => router.push('/login')} className="text-sm font-bold text-white/70 hover:text-white transition-colors">Entrar</button>
                    <button onClick={() => router.push('/register')} className="px-8 py-3 bg-[#865BFF] text-white font-black asym-card shadow-[0_10px_30px_rgba(134,91,255,0.3)] hover:scale-105 transition-all text-xs uppercase tracking-widest">Registrarme</button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-48 pb-32 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }}>
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/5 border border-white/10 text-[#865BFF] rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8">
                            <Zap className="w-3 h-3 animate-pulse" /> Official Partner Portal
                        </div>
                        <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.9] tracking-tighter mb-8 italic uppercase">
                            Master the <br />
                            <span className="text-[#865BFF]">Synthetic</span> <br />
                            Universe.
                        </h1>
                        <p className="text-xl text-white/40 max-w-lg mb-12 font-medium leading-relaxed">
                            Potencia tu red con herramientas de IA y análisis institucional. El estándar de oro para los afiliados de Bridge Markets.
                        </p>
                        <button onClick={() => router.push('/register')} className="px-12 py-6 bg-white text-[#0d0221] text-xl font-black asym-card shadow-2xl hover:scale-105 transition-all flex items-center gap-4 group">
                            Empezar Ahora <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </button>
                    </motion.div>

                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="relative flex justify-center">
                        <motion.img 
                            animate={{ y: [0, -30, 0] }}
                            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                            src="/images/imagenes_nuevas/rey_rosa.png" 
                            alt="King 3D" 
                            className="w-full max-w-lg h-auto floating-3d relative z-10"
                        />
                    </motion.div>
                </div>
            </section>

            {/* FEATURES GRID */}
            <section className="relative z-10 py-32 px-8">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feat, i) => (
                        <motion.div
                            key={feat.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.1 }}
                            className="glass-card p-10 asym-card border-white/5 hover:border-[#865BFF]/30 transition-all group text-center"
                        >
                            <div className="w-32 h-32 mx-auto mb-8">
                                <motion.img 
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    src={feat.img} 
                                    alt={feat.title} 
                                    className="w-full h-full object-contain floating-3d"
                                />
                            </div>
                            <h3 className="text-2xl font-black tracking-tight mb-4 uppercase italic">{feat.title}</h3>
                            <p className="text-white/30 text-sm leading-relaxed font-medium">{feat.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 py-20 px-12 border-t border-white/5 bg-black/20">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
                    <div className="flex items-center gap-3">
                        <img src="/images/logo-bm-blanco.png" alt="" className="h-8 opacity-50" />
                        <span className="font-black tracking-tighter text-white/30 uppercase text-xs">Bridge Markets Institutional Node</span>
                    </div>
                    <div className="flex gap-10 text-[10px] font-black text-white/20 uppercase tracking-widest">
                        {/* Links eliminados por solicitud del usuario */}
                    </div>
                </div>
            </footer>
        </div>
    );
}
