"use client";

import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { 
    ArrowRight, 
    Zap,
    Shield,
    TrendingUp,
    Globe,
    Cpu,
    MousePointer2,
    ChevronRight,
    BarChart3,
    Layers,
    Sparkles,
    FileText,
    ImageIcon as ImageIconIcon,
    Layout,
    Download,
    CheckCircle2,
    Monitor,
    Menu,
    X,
    Server,
    Activity,
    Clock,
    Target,
    Users,
    Rocket,
    Briefcase,
    Hexagon,
    Terminal,
    Maximize2
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export default function CleanElaborateLanding() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 30, damping: 20 });
    const springY = useSpring(mouseY, { stiffness: 30, damping: 20 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    const OFFICIAL_LINK = "https://www.bridgemarkets.global/es";

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-[#020108] text-white font-sans selection:bg-[#865BFF]/30 overflow-x-hidden"
        >
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
                
                body { 
                    font-family: 'Plus Jakarta Sans', sans-serif; 
                    background: #020108;
                }

                .font-heading { font-family: 'Space Grotesk', sans-serif; }

                .glass-premium {
                    background: rgba(255, 255, 255, 0.01);
                    backdrop-filter: blur(40px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                }

                .mesh-container {
                    perspective: 1200px;
                    transform-style: preserve-3d;
                }

                .mesh-grid {
                    width: 300%;
                    height: 300%;
                    top: -100%;
                    left: -100%;
                    position: absolute;
                    background-image: 
                        linear-gradient(rgba(255, 255, 255, 0.04) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.04) 1px, transparent 1px);
                    background-size: 60px 60px;
                    transform: rotateX(70deg);
                    animation: mesh-move 50s linear infinite;
                }

                .mesh-nodes {
                    width: 300%;
                    height: 300%;
                    top: -100%;
                    left: -100%;
                    position: absolute;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 60px 60px;
                    transform: rotateX(70deg);
                    animation: mesh-move 50s linear infinite;
                }

                @keyframes mesh-move {
                    from { transform: rotateX(70deg) translateY(0); }
                    to { transform: rotateX(70deg) translateY(60px); }
                }

                .text-gradient-premium {
                    background: linear-gradient(135deg, #FFFFFF 0%, #C7D2FE 50%, #A5B4FC 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            {/* REFINED ELABORATE BACKGROUND SYSTEM */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="mesh-container w-full h-full opacity-50">
                    <div className="mesh-grid" />
                    <div className="mesh-nodes" />
                </div>
                
                {/* Subtle Moving Blobs */}
                <motion.div 
                    style={{ x: useTransform(springX, [-0.5, 0.5], [-100, 100]), y: useTransform(springY, [-0.5, 0.5], [-100, 100]) }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#865BFF]/5 via-transparent to-[#4F46E5]/5 blur-[150px]"
                />

                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                
                {/* Corner Accents (No text) */}
                <div className="absolute top-10 left-10 w-16 h-16 border-l border-t border-white/5" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border-r border-b border-white/5" />
            </div>

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-[100] px-8 lg:px-20 flex justify-between items-center h-24 border-b border-white/5 backdrop-blur-3xl bg-[#020108]/60">
                <div className="flex items-center gap-6 cursor-pointer group" onClick={() => router.push('/')}>
                    <img src="/images/logo-bm-blanco.png" alt="" className="h-10 lg:h-12 group-hover:scale-110 transition-transform duration-700" />
                    <div className="flex flex-col">
                        <span className="text-2xl lg:text-3xl font-black tracking-tighter uppercase leading-none font-heading">Bridge Markets</span>
                        <span className="text-[10px] font-bold text-[#865BFF] tracking-[0.5em] uppercase mt-1">Marketing Tools Hub</span>
                    </div>
                </div>

                <div className="hidden xl:flex items-center gap-16 text-[11px] font-bold uppercase tracking-[0.5em] text-white/40">
                    <a href={OFFICIAL_LINK} target="_blank" className="hover:text-white transition-colors">Oficial</a>
                    <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Panel</span>
                    <button onClick={() => router.push('/register')} className="px-14 py-4 bg-white text-black font-black rounded-full text-xs uppercase tracking-[0.4em] hover:bg-[#865BFF] hover:text-white transition-all shadow-2xl">
                        Registro
                    </button>
                </div>

                <button className="lg:hidden p-3 text-white/60" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                    <Menu className="w-8 h-8" />
                </button>
            </nav>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-48 pb-32 px-8 lg:px-20 min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md">
                            <Activity className="w-4 h-4 text-[#865BFF]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Infraestructura de Grado Institucional</span>
                        </div>
                        
                        <h1 className="text-6xl lg:text-[10.5rem] font-black leading-[0.8] mb-12 tracking-tightest font-heading text-gradient-premium">
                            Marketing<br />
                            <span className="text-white">Tools</span>
                        </h1>
                        
                        <p className="text-lg lg:text-2xl text-white/40 max-w-xl mb-16 font-light leading-relaxed mx-auto lg:mx-0">
                            Centraliza tu estrategia de marketing con herramientas de alta gama diseñadas para la red global de partners.
                        </p>

                        <button onClick={() => router.push('/register')} className="w-full sm:w-auto px-20 py-8 bg-white text-black font-black rounded-3xl flex items-center justify-center gap-4 text-2xl hover:bg-[#865BFF] hover:text-white transition-all shadow-3xl">
                            Comenzar ahora <ArrowRight className="w-8 h-8" />
                        </button>
                    </motion.div>

                    <motion.div 
                        style={{ 
                            rotateX: useTransform(springY, [-0.5, 0.5], [6, -6]), 
                            rotateY: useTransform(springX, [-0.5, 0.5], [-6, 6]),
                            y: useTransform(springY, [-0.5, 0.5], [-20, 20])
                        }}
                        className="relative hidden lg:flex justify-center"
                    >
                        <img 
                            src="/Landing-principal/13.png" 
                            className="w-full h-auto relative z-10 drop-shadow-[0_40px_100px_rgba(134,91,255,0.25)]"
                            alt=""
                        />
                        <motion.img 
                            style={{ x: useTransform(springX, [-0.5, 0.5], [-40, 40]), y: useTransform(springY, [-0.5, 0.5], [40, -40]) }}
                            src="/Landing-principal/14.png" 
                            className="absolute -top-16 -left-16 w-80 opacity-70 drop-shadow-3xl pointer-events-none"
                            alt=""
                        />
                    </motion.div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="relative z-10 py-48 px-8 lg:px-20 bg-white/[0.01] border-y border-white/5">
                <div className="max-w-7xl mx-auto relative">
                    <img src="/Landing-principal/4.png" className="absolute -top-60 -left-60 w-[600px] opacity-10 blur-2xl pointer-events-none" alt="" />
                    <img src="/Landing-principal/3.png" className="absolute -bottom-60 -right-60 w-[600px] opacity-10 blur-2xl pointer-events-none" alt="" />

                    <div className="text-center mb-40">
                        <h2 className="text-5xl lg:text-[9rem] font-black mb-12 tracking-tightest font-heading uppercase">Ecosistema</h2>
                        <div className="h-1.5 w-24 bg-[#865BFF]/30 mx-auto" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                        {[
                            { icon: <Target className="w-14 h-14" />, title: '01. Regístrate', desc: 'Acceso inmediato a la red de partners Bridge.', img: '/Landing-principal/1.png' },
                            { icon: <Briefcase className="w-14 h-14" />, title: '02. Elige Material', desc: 'Selecciona activos de marketing de alta conversión.', img: '/Landing-principal/5.png' },
                            { icon: <Rocket className="w-14 h-14" />, title: '03. Escala Red', desc: 'Potencia tus resultados con herramientas globales.', img: '/Landing-principal/2.png' }
                        ].map((step, i) => (
                            <motion.div 
                                key={i} 
                                whileHover={{ y: -10 }} 
                                className="glass-premium rounded-[3.5rem] p-16 relative overflow-hidden group border-white/5 hover:border-[#865BFF]/20 transition-all duration-700"
                            >
                                <div className="text-[#865BFF]/50 mb-12 group-hover:text-[#865BFF] transition-colors duration-500">{step.icon}</div>
                                <h3 className="text-3xl font-black mb-8 font-heading uppercase tracking-tighter">{step.title}</h3>
                                <p className="text-white/40 text-lg leading-relaxed mb-10 group-hover:text-white/80 transition-colors">{step.desc}</p>
                                
                                <img src={step.img} className="absolute -bottom-10 -right-10 w-56 opacity-10 group-hover:opacity-40 transition-all duration-1000" alt="" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* ARSENAL */}
            <section className="relative z-10 py-48 px-8 lg:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
                        <motion.div whileHover={{ scale: 0.99 }} className="lg:col-span-8 glass-premium rounded-[4rem] p-20 relative overflow-hidden group border-white/5">
                            <div className="relative z-10">
                                <Layout className="w-16 h-16 text-[#865BFF] mb-12 opacity-50" />
                                <h3 className="text-5xl font-black mb-10 font-heading uppercase tracking-tighter">Landings Forge</h3>
                                <p className="text-white/40 text-xl max-w-md leading-relaxed group-hover:text-white/70 transition-colors">
                                    Generación de herramientas de prospección automatizadas para partners globales.
                                </p>
                            </div>
                            <img src="/Landing-principal/6.png" className="absolute -bottom-20 -right-20 w-[600px] opacity-10 group-hover:opacity-50 transition-all duration-1000" alt="" />
                        </motion.div>

                        <motion.div whileHover={{ scale: 0.99 }} className="lg:col-span-4 glass-premium rounded-[4rem] p-16 relative overflow-hidden group border-white/5 flex flex-col justify-between">
                            <ImageIconIcon className="w-16 h-16 text-[#865BFF] mb-12 opacity-50" />
                            <div>
                                <h4 className="text-3xl font-black mb-6 font-heading uppercase tracking-tighter text-white/80">Recursos Ads</h4>
                                <p className="text-white/30 text-lg">Activos de alto impacto listos para usar.</p>
                            </div>
                            <img src="/Landing-principal/1.png" className="absolute -bottom-10 -right-10 w-56 opacity-20 group-hover:scale-110 transition-transform" alt="" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 py-32 px-8 lg:px-20 border-t border-white/5 bg-[#020108]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-20">
                    <div className="flex flex-col items-center lg:items-start">
                        <div className="flex items-center gap-8 mb-10">
                            <img src="/images/logo-bm-blanco.png" alt="" className="h-12" />
                            <span className="text-2xl font-black tracking-tighter uppercase font-heading text-white/80">Bridge Markets</span>
                        </div>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.6em] font-heading">Marketing Infrastructure Hub</p>
                    </div>
                    <div className="flex items-center gap-10 text-white/30 text-[11px] font-bold uppercase tracking-widest font-heading">
                        <Server className="w-6 h-6 text-[#865BFF]/50" /> SISTEMA_SINCRO_ACTIVO
                    </div>
                </div>
            </footer>
        </div>
    );
}
