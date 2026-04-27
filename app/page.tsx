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
    Monitor
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';

export default function MouseInteractiveLanding() {
    const router = useRouter();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Mouse Tracking Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Smoothed Springs
    const springX = useSpring(mouseX, { stiffness: 60, damping: 30 });
    const springY = useSpring(mouseY, { stiffness: 60, damping: 30 });

    const handleMouseMove = (e: React.MouseEvent) => {
        const { clientX, clientY } = e;
        const { innerWidth, innerHeight } = window;
        // Normalize mouse position from -0.5 to 0.5
        mouseX.set((clientX / innerWidth) - 0.5);
        mouseY.set((clientY / innerHeight) - 0.5);
    };

    const OFFICIAL_LINK = "https://www.bridgemarkets.global/es";

    // Dynamic Transforms for Mouse Parallax
    const heroRotateX = useTransform(springY, [-0.5, 0.5], [10, -10]);
    const heroRotateY = useTransform(springX, [-0.5, 0.5], [-10, 10]);
    const meshRotateX = useTransform(springY, [-0.5, 0.5], [55, 65]);
    const meshTranslateX = useTransform(springX, [-0.5, 0.5], [-30, 30]);
    const meshTranslateY = useTransform(springY, [-0.5, 0.5], [-30, 30]);

    return (
        <div 
            onMouseMove={handleMouseMove}
            className="relative min-h-screen w-full bg-[#020108] text-white font-sans selection:bg-[#865BFF]/30 overflow-x-hidden"
        >
            <style jsx global>{`
                @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@200;300;400;500;600;700;800&display=swap');
                @import url('https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;700&display=swap');
                
                body { 
                    font-family: 'Plus Jakarta Sans', sans-serif; 
                    background: #020108;
                }

                .font-heading { font-family: 'Space Grotesk', sans-serif; }

                .glass-premium {
                    background: rgba(255, 255, 255, 0.02);
                    backdrop-filter: blur(25px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    transition: all 0.3s ease;
                }

                .text-gradient {
                    background: linear-gradient(135deg, #fff 0%, #865BFF 50%, #4F46E5 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }

                .noise {
                    position: fixed;
                    top: 0; left: 0; width: 100%; height: 100%;
                    background: url('https://grainy-gradients.vercel.app/noise.svg');
                    opacity: 0.05;
                    pointer-events: none;
                    z-index: 99;
                }

                .mesh-grid {
                    width: 250%;
                    height: 250%;
                    top: -75%;
                    left: -75%;
                    position: absolute;
                    background-image: 
                        linear-gradient(rgba(134, 91, 255, 0.12) 1px, transparent 1px),
                        linear-gradient(90deg, rgba(134, 91, 255, 0.12) 1px, transparent 1px);
                    background-size: 50px 50px;
                    animation: mesh-flow 30s linear infinite;
                }

                @keyframes mesh-flow {
                    from { transform: translateY(0); }
                    to { transform: translateY(50px); }
                }
            `}</style>

            <div className="noise" />

            {/* LIGHT FOLLOWING MOUSE */}
            <motion.div 
                style={{ 
                    x: useTransform(springX, [-0.5, 0.5], ["-50%", "50%"]),
                    y: useTransform(springY, [-0.5, 0.5], ["-50%", "50%"]),
                    left: "50%",
                    top: "50%"
                }}
                className="fixed w-[600px] h-[600px] bg-[#865BFF]/5 blur-[150px] rounded-full pointer-events-none z-10"
            />

            {/* ANIMATED MESH (MALLA) */}
            <div className="fixed inset-0 z-0 pointer-events-none opacity-40" style={{ perspective: "1000px" }}>
                <motion.div 
                    style={{ 
                        rotateX: meshRotateX,
                        x: meshTranslateX,
                        y: meshTranslateY
                    }}
                    className="mesh-grid"
                />
            </div>

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-[100] px-6 lg:px-12 flex justify-between items-center h-24 border-b border-white/5 backdrop-blur-xl bg-black/40">
                <motion.div 
                    style={{ x: useTransform(springX, [-0.5, 0.5], [-10, 10]) }}
                    className="flex items-center gap-6 cursor-pointer group" 
                    onClick={() => router.push('/')}
                >
                    <img src="/images/logo-bm-blanco.png" alt="" className="h-10 lg:h-14 transition-transform group-hover:scale-110" />
                    <div className="flex flex-col">
                        <span className="text-2xl lg:text-3xl font-black tracking-tighter uppercase leading-none font-heading">Bridge Markets</span>
                        <span className="text-[11px] font-bold text-[#865BFF] tracking-[0.4em] uppercase mt-1">Marketing Tools</span>
                    </div>
                </motion.div>
                
                <div className="flex items-center gap-10">
                    <div className="hidden xl:flex items-center gap-10 text-[11px] font-bold uppercase tracking-[0.4em] text-white/30">
                        <a href={OFFICIAL_LINK} target="_blank" className="hover:text-white transition-all">Web Oficial</a>
                        <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-all cursor-pointer">Dashboard</span>
                    </div>
                    <button onClick={() => router.push('/register')} className="px-10 py-3.5 bg-[#865BFF] text-white font-bold rounded-full text-[11px] uppercase tracking-[0.3em] shadow-2xl">
                        Registro
                    </button>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-40 pb-20 px-6 lg:px-12 min-h-[90vh] flex items-center justify-center">
                <div className="max-w-7xl w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        style={{ 
                            x: useTransform(springX, [-0.5, 0.5], [-15, 15]),
                            y: useTransform(springY, [-0.5, 0.5], [-15, 15])
                        }}
                    >
                        <div className="inline-flex items-center gap-3 px-5 py-2 bg-white/5 border border-white/10 rounded-full mb-10">
                            <Monitor className="w-4 h-4 text-[#865BFF]" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60 font-heading">Portal de Recursos</span>
                        </div>
                        
                        <h1 className="text-6xl lg:text-[9rem] font-black leading-[0.9] mb-10 tracking-tightest font-heading">
                            Marketing<br />
                            <span className="text-gradient">Tools</span>
                        </h1>
                        
                        <p className="text-lg lg:text-xl text-white/40 max-w-lg mb-14 font-light leading-relaxed">
                            Potencia tu red con herramientas de marketing institucionales y landings de alta gama.
                        </p>

                        <button onClick={() => router.push('/register')} className="px-14 py-6 bg-white text-black font-black rounded-2xl hover:bg-[#865BFF] hover:text-white transition-all duration-500 flex items-center gap-4 text-xl shadow-2xl">
                            Comenzar ahora <ArrowRight className="w-6 h-6" />
                        </button>
                    </motion.div>

                    <motion.div 
                        style={{ 
                            rotateX: heroRotateX,
                            rotateY: heroRotateY,
                            x: useTransform(springX, [-0.5, 0.5], [20, -20]),
                            y: useTransform(springY, [-0.5, 0.5], [20, -20])
                        }}
                        className="relative hidden lg:block"
                    >
                        <img 
                            src="/Landing-principal/13.png" 
                            className="w-full h-auto relative z-10 drop-shadow-[0_40px_80px_rgba(134,91,255,0.2)]"
                            alt="Marketing Visual"
                        />
                        <motion.div 
                            style={{ 
                                x: useTransform(springX, [-0.5, 0.5], [40, -40]),
                                y: useTransform(springY, [-0.5, 0.5], [40, -40])
                            }}
                            className="absolute top-1/4 -right-12 glass-premium p-8 rounded-[2.5rem] z-20 border-[#865BFF]/30 shadow-2xl shadow-[#865BFF]/20"
                        >
                            <div className="flex items-center gap-4 mb-2">
                                <CheckCircle2 className="w-6 h-6 text-[#865BFF]" />
                                <span className="text-2xl font-black font-heading">Activo</span>
                            </div>
                            <span className="text-[10px] font-bold text-white/20 uppercase tracking-[0.3em] font-heading">Bridge Markets Global</span>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* TOOLS GRID */}
            <section className="relative z-10 py-24 px-6 lg:px-12">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-24">
                        <h2 className="text-5xl lg:text-7xl font-black mb-8 font-heading">Recursos Oficiales</h2>
                        <p className="text-white/30 text-lg lg:text-xl font-light max-w-2xl mx-auto italic">Diseñados para maximizar tus resultados como partner.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {[
                            { icon: <Layout className="w-14 h-14" />, title: 'Landings', desc: 'Generador de páginas de alta conversión personalizadas.', img: '/Landing-principal/6.png', large: true },
                            { icon: <ImageIconIcon className="w-12 h-12" />, title: 'Redes', desc: 'Material gráfico para Instagram, Facebook y TikTok.', img: '/Landing-principal/1.png' },
                            { icon: <FileText className="w-12 h-12" />, title: 'Documentos', desc: 'Presentaciones y brochures en alta resolución.', img: '/Landing-principal/3.png' }
                        ].map((tool, i) => (
                            <motion.div 
                                key={i}
                                style={{ 
                                    rotateX: useTransform(springY, [-0.5, 0.5], [5, -5]),
                                    rotateY: useTransform(springX, [-0.5, 0.5], [-5, 5])
                                }}
                                className={`${tool.large ? 'lg:col-span-2' : ''} glass-premium rounded-[3.5rem] p-12 lg:p-16 relative overflow-hidden group border-[#865BFF]/10 hover:border-[#865BFF]/40`}
                            >
                                <div className="relative z-10 flex flex-col h-full justify-between">
                                    <div className="text-[#865BFF] mb-12">{tool.icon}</div>
                                    <div>
                                        <h3 className="text-3xl font-black mb-6 font-heading">{tool.title}</h3>
                                        <p className="text-white/40 text-lg max-w-sm leading-relaxed mb-10">{tool.desc}</p>
                                        <button onClick={() => router.push('/dashboard')} className="flex items-center gap-3 text-xs font-bold text-[#865BFF] uppercase tracking-widest font-heading">
                                            Acceder <ChevronRight className="w-4 h-4" />
                                        </button>
                                    </div>
                                </div>
                                <motion.img 
                                    style={{ 
                                        x: useTransform(springX, [-0.5, 0.5], [20, -20]),
                                        y: useTransform(springY, [-0.5, 0.5], [20, -20])
                                    }}
                                    src={tool.img} 
                                    className="absolute -bottom-10 -right-10 w-96 opacity-10 group-hover:opacity-40 transition-opacity duration-700" 
                                    alt="" 
                                />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="relative z-10 py-40 px-6 lg:px-12 text-center">
                <div className="max-w-4xl mx-auto">
                    <motion.img 
                        style={{ 
                            rotate: useTransform(springX, [-0.5, 0.5], [-10, 10]),
                            scale: useTransform(springY, [-0.5, 0.5], [1.1, 0.9])
                        }}
                        src="/Landing-principal/14.png" 
                        className="w-64 mx-auto mb-16 drop-shadow-2xl" 
                        alt="" 
                    />
                    <h2 className="text-6xl lg:text-[9rem] font-black mb-12 font-heading tracking-tightest">Forja tu éxito</h2>
                    <button 
                        onClick={() => router.push('/register')}
                        className="px-16 py-8 bg-white text-black font-black text-2xl rounded-full hover:bg-[#865BFF] hover:text-white transition-all shadow-2xl"
                    >
                        Registrarme ahora
                    </button>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 py-24 px-6 lg:px-12 border-t border-white/5 bg-[#020108] backdrop-blur-3xl">
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-20">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-6 mb-12">
                            <img src="/images/logo-bm-blanco.png" alt="" className="h-10 lg:h-12" />
                            <span className="text-2xl font-black tracking-tighter uppercase font-heading">Bridge Markets</span>
                        </div>
                        <p className="text-white/20 text-[10px] font-bold uppercase tracking-[0.4em] leading-loose max-w-xs font-heading">
                            Marketing de alto rendimiento para partners oficiales globales.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#865BFF] mb-12 font-heading">Recursos</h5>
                        <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/20 font-heading">
                            <li className="hover:text-white transition-colors cursor-pointer" onClick={() => router.push('/dashboard')}>Landings</li>
                            <li className="hover:text-white transition-colors cursor-pointer" onClick={() => router.push('/dashboard')}>Material</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-[11px] font-bold uppercase tracking-[0.5em] text-[#865BFF] mb-12 font-heading">Legal</h5>
                        <ul className="space-y-6 text-[10px] font-bold uppercase tracking-widest text-white/20 font-heading">
                            <li className="hover:text-white transition-colors cursor-pointer"><a href={OFFICIAL_LINK} target="_blank">Privacidad</a></li>
                            <li className="hover:text-white transition-colors cursor-pointer"><a href={OFFICIAL_LINK} target="_blank">Términos</a></li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-24 pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-10 font-heading text-[10px] font-bold uppercase tracking-[0.6em] text-white/10">
                    <span>© 2026 Bridge Markets Marketing Tools Hub</span>
                    <div className="flex items-center gap-4 text-[#865BFF]/60 font-heading">
                        <Zap className="w-4 h-4 animate-pulse" /> [Sistemas Online]
                    </div>
                </div>
            </footer>
        </div>
    );
}
