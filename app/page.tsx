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

export default function CompleteAnimatedLanding() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const springX = useSpring(mouseX, { stiffness: 35, damping: 25 });
    const springY = useSpring(mouseY, { stiffness: 35, damping: 25 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    const OFFICIAL_LINK = "https://www.bridgemarkets.global/es";

    // Reveal animation variants
    const fadeInUp = {
        initial: { opacity: 0, y: 40 },
        whileInView: { opacity: 1, y: 0 },
        viewport: { once: true },
        transition: { duration: 0.8, ease: "easeOut" }
    };

    const staggerContainer = {
        initial: {},
        whileInView: { transition: { staggerChildren: 0.15 } }
    };

    // Correct Hook usage (top level)
    const cursorLeft = useTransform(springX, [-0.5, 0.5], ['35%', '65%']);
    const cursorTop = useTransform(springY, [-0.5, 0.5], ['35%', '65%']);

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-[#010105] text-white font-sans selection:bg-[#865BFF]/30 overflow-x-hidden"
        >
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;500;700&display=swap');
                
                body { 
                    font-family: 'Plus Jakarta Sans', sans-serif; 
                    background: #010105;
                }

                .font-heading { font-family: 'Space Grotesk', sans-serif; }

                .glass-premium {
                    background: rgba(255, 255, 255, 0.015);
                    backdrop-filter: blur(25px);
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
                        linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 50px 50px;
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
                    background-size: 50px 50px;
                    transform: rotateX(70deg);
                    animation: mesh-move 50s linear infinite;
                }

                @keyframes mesh-move {
                    from { transform: rotateX(70deg) translateY(0); }
                    to { transform: rotateX(70deg) translateY(50px); }
                }

                .cursor-trail {
                    position: fixed;
                    width: 400px;
                    height: 400px;
                    background: radial-gradient(circle, rgba(134, 91, 255, 0.06) 0%, transparent 70%);
                    pointer-events: none;
                    z-index: 1;
                    transform: translate(-50%, -50%);
                }

                .tech-line {
                    position: absolute;
                    background: linear-gradient(90deg, transparent, rgba(134, 91, 255, 0.1), transparent);
                    height: 1px;
                    width: 100%;
                    animation: tech-line-move 12s linear infinite;
                }

                @keyframes tech-line-move {
                    0% { transform: translateY(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateY(100vh); opacity: 0; }
                }

                .text-gradient-premium {
                    background: linear-gradient(135deg, #FFFFFF 0%, #C7D2FE 50%, #A5B4FC 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
            `}</style>

            {/* CURSOR LIGHT TRAIL */}
            {mounted && (
                <motion.div 
                    style={{ left: cursorLeft, top: cursorTop }}
                    className="cursor-trail"
                />
            )}

            {/* FULL ELABORATE BACKGROUND SYSTEM */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <div className="mesh-container w-full h-full opacity-50">
                    <div className="mesh-grid" />
                    <div className="mesh-nodes" />
                </div>
                
                {/* Tech Moving Lines */}
                <div className="tech-line" style={{ animationDelay: '0s' }} />
                <div className="tech-line" style={{ animationDelay: '6s' }} />

                <motion.div 
                    style={{ x: useTransform(springX, [-0.5, 0.5], [-100, 100]), y: useTransform(springY, [-0.5, 0.5], [-100, 100]) }}
                    className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#865BFF]/5 via-transparent to-[#4F46E5]/5 blur-[150px]"
                />

                <div className="absolute inset-0 opacity-[0.04] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
                
                {/* Corner Accents */}
                <div className="absolute top-10 left-10 w-16 h-16 border-l border-t border-white/5" />
                <div className="absolute bottom-10 right-10 w-16 h-16 border-r border-b border-white/5" />
            </div>

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-[100] px-6 lg:px-20 flex justify-between items-center h-20 lg:h-24 border-b border-white/5 backdrop-blur-3xl bg-black/40">
                <div className="flex items-center gap-4 lg:gap-6 cursor-pointer group" onClick={() => router.push('/')}>
                    <img src="/images/logo-bm-blanco.png" alt="" className="h-8 lg:h-12 group-hover:scale-110 transition-transform duration-700" />
                    <div className="flex flex-col">
                        <span className="text-xl lg:text-3xl font-black tracking-tighter uppercase leading-none font-heading">Bridge Markets</span>
                        <span className="text-[8px] lg:text-[10px] font-bold text-[#865BFF] tracking-[0.4em] lg:tracking-[0.5em] uppercase mt-1">Marketing Tools Hub</span>
                    </div>
                </div>

                <div className="hidden xl:flex items-center gap-16 text-[11px] font-bold uppercase tracking-[0.5em] text-white/40">
                    <a href={OFFICIAL_LINK} target="_blank" className="hover:text-white transition-colors">Oficial</a>
                    <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Panel</span>
                    <button onClick={() => router.push('/register')} className="px-12 py-3 bg-white text-black font-black rounded-full text-xs uppercase tracking-[0.4em] hover:bg-[#865BFF] hover:text-white transition-all shadow-2xl">
                        Registro
                    </button>
                </div>

                <button className="xl:hidden p-3 text-white/60" onClick={() => setIsMenuOpen(true)}>
                    <Menu className="w-8 h-8" />
                </button>
            </nav>

            {/* MOBILE MENU DRAWER */}
            <AnimatePresence>
                {isMenuOpen && (
                    <motion.div 
                        initial={{ x: '100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '100%' }}
                        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                        className="fixed inset-0 z-[200] bg-[#010105] p-10 flex flex-col justify-between"
                    >
                        <div>
                            <div className="flex justify-between items-center mb-20">
                                <img src="/images/logo-bm-blanco.png" className="h-10" alt="" />
                                <button onClick={() => setIsMenuOpen(false)} className="p-3 text-white/60">
                                    <X className="w-10 h-10" />
                                </button>
                            </div>
                            <div className="flex flex-col gap-12 text-3xl font-black font-heading uppercase tracking-tighter">
                                <span onClick={() => { router.push('/'); setIsMenuOpen(false); }}>Inicio</span>
                                <span onClick={() => { router.push('/dashboard'); setIsMenuOpen(false); }}>Panel</span>
                                <a href={OFFICIAL_LINK} target="_blank">Web Oficial</a>
                            </div>
                        </div>
                        <button onClick={() => { router.push('/register'); setIsMenuOpen(false); }} className="w-full py-8 bg-[#865BFF] text-white font-black text-2xl rounded-3xl">
                            REGISTRO
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-32 lg:pt-48 pb-20 lg:pb-32 px-6 lg:px-20 min-h-screen flex flex-col items-center justify-center">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1 }}
                        className="text-center lg:text-left order-2 lg:order-1"
                    >
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.5 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-8 backdrop-blur-md"
                        >
                            <Activity className="w-4 h-4 text-[#865BFF] animate-pulse" />
                            <span className="text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Sincronización de Activos Live</span>
                        </motion.div>
                        
                        <h1 className="text-5xl md:text-7xl lg:text-[10.5rem] font-black leading-[1] lg:leading-[0.8] mb-8 lg:mb-12 tracking-tightest font-heading text-gradient-premium">
                            Marketing<br />
                            <span className="text-white italic">Tools</span>
                        </h1>
                        
                        <p className="text-base lg:text-2xl text-white/40 max-w-xl mb-12 font-light leading-relaxed mx-auto lg:mx-0">
                            Infraestructura de marketing institucional. Activa tu red global con herramientas diseñadas para el máximo rendimiento.
                        </p>

                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => router.push('/register')} 
                            className="w-full lg:w-auto px-12 lg:px-20 py-6 lg:py-8 bg-white text-black font-black rounded-2xl lg:rounded-3xl flex items-center justify-center gap-4 text-xl lg:text-2xl shadow-2xl transition-all"
                        >
                            Empezar ahora <ArrowRight className="w-6 h-6 lg:w-8 lg:h-8" />
                        </motion.button>
                    </motion.div>

                    <motion.div 
                        className="relative order-1 lg:order-2 flex justify-center"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                    >
                        <motion.img 
                            animate={{ y: [0, -15, 0] }}
                            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                            src="/Landing-principal/13.png" 
                            className="w-48 sm:w-64 lg:w-full h-auto relative z-10 drop-shadow-[0_40px_100px_rgba(134,91,255,0.2)]"
                            alt=""
                        />
                        <motion.img 
                            animate={{ y: [0, 15, 0], rotate: [0, 5, 0] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                            src="/Landing-principal/14.png" 
                            className="absolute -top-10 -left-10 w-48 lg:w-80 opacity-70 pointer-events-none drop-shadow-3xl"
                            alt=""
                        />
                    </motion.div>
                </div>
            </section>

            {/* PROCESS SECTION */}
            <section className="relative z-10 py-24 lg:py-48 px-6 lg:px-20 bg-white/[0.01] border-y border-white/5 overflow-hidden">
                <div className="max-w-7xl mx-auto relative">
                    <motion.div 
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        className="text-center mb-20 lg:mb-40"
                    >
                        <h2 className="text-4xl lg:text-[9rem] font-black mb-8 lg:mb-12 tracking-tightest font-heading uppercase">Ecosistema</h2>
                        <div className="h-1.5 w-24 bg-[#865BFF]/30 mx-auto" />
                    </motion.div>

                    <motion.div 
                        variants={staggerContainer}
                        initial="initial"
                        whileInView="whileInView"
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12"
                    >
                        {[
                            { icon: <Target className="w-10 h-10 lg:w-14 lg:h-14" />, title: '01. Regístrate', desc: 'Acceso inmediato a la red de partners Bridge.', img: '/Landing-principal/1.png' },
                            { icon: <Briefcase className="w-10 h-10 lg:w-14 lg:h-14" />, title: '02. Elige Material', desc: 'Selecciona activos de alta conversión.', img: '/Landing-principal/5.png' },
                            { icon: <Rocket className="w-10 h-10 lg:w-14 lg:h-14" />, title: '03. Escala Red', desc: 'Potencia tus resultados con herramientas globales.', img: '/Landing-principal/2.png' }
                        ].map((step, i) => (
                            <motion.div 
                                key={i} 
                                variants={fadeInUp}
                                whileHover={{ y: -10 }}
                                className="glass-premium rounded-[2.5rem] lg:rounded-[3.5rem] p-10 lg:p-16 relative overflow-hidden group border-white/5 hover:border-[#865BFF]/20 transition-all duration-700"
                            >
                                <div className="text-[#865BFF]/50 mb-8 lg:mb-12 group-hover:text-[#865BFF] transition-colors">{step.icon}</div>
                                <h3 className="text-2xl lg:text-3xl font-black mb-6 lg:mb-8 font-heading uppercase tracking-tighter">{step.title}</h3>
                                <p className="text-white/40 text-base lg:text-lg leading-relaxed mb-8 group-hover:text-white/80 transition-colors">{step.desc}</p>
                                <img src={step.img} className="absolute -bottom-10 -right-10 w-40 lg:w-56 opacity-10 group-hover:opacity-40 transition-all duration-1000" alt="" />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            {/* ARSENAL */}
            <section className="relative z-10 py-24 lg:py-48 px-6 lg:px-20 overflow-hidden">
                <div className="max-w-7xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
                        <motion.div 
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:col-span-8 glass-premium rounded-[2.5rem] lg:rounded-[4rem] p-10 lg:p-20 relative overflow-hidden group border-white/5"
                        >
                            <div className="relative z-10">
                                <Layout className="w-12 h-12 lg:w-16 lg:h-16 text-[#865BFF] mb-10 lg:mb-12 opacity-50" />
                                <h3 className="text-3xl lg:text-5xl font-black mb-6 lg:mb-10 font-heading uppercase tracking-tighter">Landings Forge</h3>
                                <p className="text-white/40 text-lg lg:text-xl max-w-md leading-relaxed group-hover:text-white/70 transition-colors">
                                    Generación de herramientas de prospección automatizadas para partners globales.
                                </p>
                            </div>
                            <img src="/Landing-principal/6.png" className="absolute -bottom-20 -right-20 w-80 lg:w-[600px] opacity-10 group-hover:opacity-50 transition-all duration-1000" alt="" />
                        </motion.div>

                        <motion.div 
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            className="lg:col-span-4 glass-premium rounded-[2.5rem] lg:rounded-[4rem] p-10 lg:p-16 relative overflow-hidden group border-white/5 flex flex-col justify-between min-h-[300px]"
                        >
                            <ImageIconIcon className="w-12 h-12 lg:w-16 lg:h-16 text-[#865BFF] mb-10 lg:mb-12 opacity-50" />
                            <div>
                                <h4 className="text-2xl lg:text-3xl font-black mb-4 lg:mb-6 font-heading uppercase tracking-tighter text-white/80">Recursos Ads</h4>
                                <p className="text-white/30 text-base lg:text-lg">Diseño institucional listo para usar.</p>
                            </div>
                            <img src="/Landing-principal/1.png" className="absolute -bottom-10 -right-10 w-40 lg:w-56 opacity-20 group-hover:scale-110 transition-transform" alt="" />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 py-20 lg:py-32 px-6 lg:px-20 border-t border-white/5 bg-[#010105]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row justify-between items-center gap-16 lg:gap-24">
                    <div className="flex flex-col items-center lg:items-start text-center lg:text-left">
                        <div className="flex items-center gap-6 mb-8 lg:mb-12">
                            <img src="/images/logo-bm-blanco.png" alt="" className="h-10 lg:h-14" />
                            <span className="text-2xl lg:text-3xl font-black tracking-tighter uppercase font-heading text-white/80">Bridge Markets</span>
                        </div>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.5em] font-heading">Marketing Infrastructure Hub</p>
                    </div>
                    <div className="flex flex-col items-center lg:items-end justify-center">
                        <div className="flex items-center gap-4 text-[#865BFF] font-black text-lg lg:text-xl mb-4 lg:mb-6">
                            <Server className="w-5 h-5 opacity-60 animate-pulse" /> SISTEMA_SINCRO_ACTIVO
                        </div>
                        <span className="text-white/10 text-[8px] lg:text-[10px] font-bold uppercase tracking-[0.6em] text-center lg:text-right">© 2026 Bridge Markets Marketing Tools</span>
                    </div>
                </div>
            </footer>
        </div>
    );
}
