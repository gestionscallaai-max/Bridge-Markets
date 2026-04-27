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
    Maximize2,
    MessageSquare,
    PieChart,
    Search,
    Lock
} from 'lucide-react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';

export default function VisuallyRichLanding() {
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

    const cursorLeft = useTransform(springX, [-0.5, 0.5], ['30%', '70%']);
    const cursorTop = useTransform(springY, [-0.5, 0.5], ['30%', '70%']);

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

                .glass-card {
                    background: rgba(255, 255, 255, 0.012);
                    backdrop-filter: blur(30px);
                    border: 1px solid rgba(255, 255, 255, 0.06);
                    transition: all 0.6s cubic-bezier(0.16, 1, 0.3, 1);
                }
                .glass-card:hover {
                    background: rgba(134, 91, 255, 0.04);
                    border-color: rgba(134, 91, 255, 0.4);
                    transform: translateY(-10px);
                }

                .mesh-grid {
                    width: 300%; height: 300%; top: -100%; left: -100%; position: absolute;
                    background-image: linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px);
                    background-size: 50px 50px; transform: rotateX(70deg); animation: mesh-move 50s linear infinite;
                }

                .mesh-nodes {
                    width: 300%; height: 300%; top: -100%; left: -100%; position: absolute;
                    background-image: radial-gradient(rgba(255, 255, 255, 0.1) 1px, transparent 1px);
                    background-size: 50px 50px; transform: rotateX(70deg); animation: mesh-move 50s linear infinite;
                }

                @keyframes mesh-move {
                    from { transform: rotateX(70deg) translateY(0); }
                    to { transform: rotateX(70deg) translateY(50px); }
                }

                .tech-line {
                    position: absolute; background: linear-gradient(90deg, transparent, rgba(134, 91, 255, 0.1), transparent);
                    height: 1px; width: 100%; animation: tech-line-move 20s linear infinite;
                }
                @keyframes tech-line-move {
                    0% { transform: translateY(-100%); opacity: 0; }
                    100% { transform: translateY(100vh); opacity: 0.4; }
                }

                .text-gradient {
                    background: linear-gradient(135deg, #FFFFFF 0%, #C7D2FE 40%, #865BFF 100%);
                    -webkit-background-clip: text; -webkit-text-fill-color: transparent;
                    padding-right: 20px; /* Fix for italic cut-off */
                }

                .animate-float-slow { animation: float-slow 8s ease-in-out infinite; }
                @keyframes float-slow {
                    0%, 100% { transform: translateY(0px) rotate(0deg); }
                    50% { transform: translateY(-30px) rotate(5deg); }
                }
            `}</style>

            {/* BACKGROUND LAYER */}
            <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
                <div className="mesh-grid opacity-60" />
                <div className="mesh-nodes opacity-50" />
                <div className="tech-line" style={{ top: '15%', animationDelay: '0s' }} />
                <div className="tech-line" style={{ top: '50%', animationDelay: '10s' }} />
                
                {/* Visual PNG Decorations in Background */}
                <img src="/Landing-principal/3.png" className="absolute top-[10%] -left-20 w-96 opacity-10 blur-xl animate-float-slow" alt="" />
                <img src="/Landing-principal/4.png" className="absolute bottom-[20%] -right-20 w-96 opacity-10 blur-xl animate-float-slow" style={{ animationDelay: '2s' }} alt="" />

                <motion.div 
                    style={{ left: cursorLeft, top: cursorTop }}
                    className="absolute w-[600px] h-[600px] bg-[#865BFF]/5 blur-[180px] rounded-full"
                />
            </div>

            {/* NAVBAR */}
            <nav className="fixed top-0 w-full z-[100] px-6 lg:px-20 h-20 lg:h-24 border-b border-white/5 backdrop-blur-3xl flex justify-between items-center bg-black/40">
                <div className="flex items-center gap-6 cursor-pointer" onClick={() => router.push('/')}>
                    <img src="/images/logo-bm-blanco.png" alt="Logo" className="h-10 lg:h-12" />
                    <div className="flex flex-col">
                        <span className="text-2xl lg:text-3xl font-black tracking-tighter uppercase font-heading">Bridge Markets</span>
                        <span className="text-[10px] font-bold text-[#865BFF] tracking-[0.5em] uppercase">Marketing Hub</span>
                    </div>
                </div>
                <div className="hidden xl:flex items-center gap-12 text-[11px] font-black uppercase tracking-widest text-white/40">
                    <a href={OFFICIAL_LINK} className="hover:text-white transition-colors">Web Oficial</a>
                    <span onClick={() => router.push('/dashboard')} className="hover:text-white transition-colors cursor-pointer">Panel Control</span>
                    <button onClick={() => router.push('/register')} className="px-10 py-4 bg-[#865BFF] text-white rounded-full text-xs font-black hover:scale-110 transition-all shadow-2xl">
                        REGISTRO
                    </button>
                </div>
                <button className="xl:hidden p-3" onClick={() => setIsMenuOpen(true)}>
                    <Menu className="w-8 h-8" />
                </button>
            </nav>

            {/* HERO SECTION */}
            <section className="relative z-10 pt-48 pb-32 px-6 lg:px-20 min-h-screen flex items-center overflow-visible">
                <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div 
                        initial={{ opacity: 0, x: -30 }} 
                        animate={{ opacity: 1, x: 0 }} 
                        className="relative z-[50]"
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-2 bg-white/5 border border-white/10 rounded-full mb-10 backdrop-blur-md">
                            <Activity className="w-4 h-4 text-[#865BFF] animate-pulse" />
                            <span className="text-[10px] font-bold uppercase tracking-[0.4em] text-white/60">Infraestructura de Grado Global</span>
                        </div>
                        {/* Final scaling and padding to prevent any character cut-off */}
                        <h1 className="text-6xl md:text-8xl lg:text-[7.5rem] font-black leading-[1.1] lg:leading-[0.9] mb-12 tracking-tightest font-heading text-gradient pr-12">
                            Marketing<br /><span className="text-white italic">Tools</span>
                        </h1>
                        <p className="text-xl lg:text-3xl text-white/40 max-w-xl mb-16 font-light leading-relaxed">
                            Potencia tu red con herramientas diseñadas para la máxima conversión. Sincronización total de activos en tiempo real.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-6">
                            <button onClick={() => router.push('/register')} className="px-16 py-8 bg-white text-black font-black rounded-[2.5rem] text-2xl flex items-center justify-center gap-4 hover:bg-[#865BFF] hover:text-white transition-all shadow-3xl group">
                                Acceso Gratuito <ArrowRight className="w-8 h-8 group-hover:translate-x-3 transition-transform" />
                            </button>
                        </div>
                    </motion.div>

                    <motion.div 
                        className="relative hidden lg:block" 
                        initial={{ opacity: 0, scale: 0.9, rotate: -5 }} 
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 1.2, ease: "easeOut" }}
                    >
                        {/* Multi-layered visual content */}
                        <img src="/Landing-principal/13.png" className="w-full relative z-10 drop-shadow-[0_40px_100px_rgba(134,91,255,0.25)] animate-float-slow" alt="" />
                        <img src="/Landing-principal/14.png" className="absolute -top-20 -left-20 w-80 opacity-70 z-20 animate-float-slow" style={{ animationDelay: '1s' }} alt="" />
                        <img src="/Landing-principal/1.png" className="absolute -bottom-20 -left-40 w-64 opacity-40 z-0 animate-float-slow" style={{ animationDelay: '3s' }} alt="" />
                        <img src="/Landing-principal/5.png" className="absolute top-20 -right-20 w-72 opacity-30 z-0 blur-[2px] animate-float-slow" style={{ animationDelay: '4s' }} alt="" />
                    </motion.div>
                </div>
            </section>

            {/* VENTAJAS - WITH FLOATING DECOR */}
            <section className="relative z-10 py-48 px-6 lg:px-20 border-y border-white/5 bg-white/[0.01]">
                {/* Floating decor */}
                <img src="/Landing-principal/3.png" className="absolute top-20 right-20 w-64 opacity-10 animate-float-slow" alt="" />
                
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16">
                    {[
                        { icon: <Shield className="w-12 h-12" />, title: "Cumplimiento Global", desc: "Todo el material cumple con las regulaciones internacionales de marketing financiero." },
                        { icon: <Zap className="w-12 h-12" />, title: "Alta Conversión", desc: "Plantillas optimizadas mediante A/B testing para maximizar el registro de nuevos partners." },
                        { icon: <Globe className="w-12 h-12" />, title: "Sincronización Cloud", desc: "Actualiza tus herramientas al instante desde cualquier parte del mundo sin latencia." },
                        { icon: <Lock className="w-12 h-12" />, title: "Seguridad Bancaria", desc: "Protección de datos de nivel institucional para ti y todos tus prospectos." }
                    ].map((item, i) => (
                        <motion.div key={i} {...fadeInUp} className="flex flex-col gap-8 group">
                            <div className="text-[#865BFF] p-6 bg-white/5 rounded-3xl w-fit group-hover:scale-110 group-hover:bg-[#865BFF]/10 transition-all">{item.icon}</div>
                            <h3 className="text-2xl font-black font-heading uppercase tracking-tighter">{item.title}</h3>
                            <p className="text-white/40 text-base leading-relaxed">{item.desc}</p>
                        </motion.div>
                    ))}
                </div>
            </section>

            {/* PARA CADA PERFIL - MORE VISUAL */}
            <section className="relative z-10 py-48 px-6 lg:px-20 bg-[#020207]">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-32 items-center">
                    <div className="lg:w-1/2">
                        <h2 className="text-5xl lg:text-[7.5rem] font-black mb-16 tracking-tightest font-heading uppercase leading-none">Diseñado<br />Para Ti</h2>
                        <div className="space-y-12">
                            {[
                                { title: "Afiliados y Referidores", desc: "Material listo para compartir en redes sociales y atraer tráfico masivo de forma profesional." },
                                { title: "Introducing Brokers (IB)", desc: "Landings institucionales para formalizar tu presencia global y generar confianza inmediata." },
                                { title: "Creadores de Contenido", desc: "Activos visuales en 4K y videos listos para tus transmisiones, reels y publicaciones." }
                            ].map((profile, i) => (
                                <div key={i} className="flex gap-8 items-start group">
                                    <div className="mt-1 bg-[#865BFF]/20 p-2 rounded-full group-hover:bg-[#865BFF] transition-colors"><CheckCircle2 className="w-6 h-6 text-white" /></div>
                                    <div>
                                        <h4 className="text-2xl font-black font-heading uppercase tracking-tighter mb-3">{profile.title}</h4>
                                        <p className="text-white/40 text-lg">{profile.desc}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="lg:w-1/2 relative">
                        {/* More visual PNG content here */}
                        <img src="/Landing-principal/6.png" className="w-full drop-shadow-[0_40px_80px_rgba(134,91,255,0.3)] rotate-3 animate-float-slow" alt="" />
                        <img src="/Landing-principal/4.png" className="absolute -top-20 -right-20 w-80 opacity-60 z-10 animate-float-slow" style={{ animationDelay: '2s' }} alt="" />
                    </div>
                </div>
            </section>

            {/* ARSENAL - WITH BETTER ICON INTEGRATION */}
            <section className="relative z-10 py-48 px-6 lg:px-20">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center mb-40">
                        <h2 className="text-4xl lg:text-[9rem] font-black mb-12 tracking-tightest font-heading uppercase">El Arsenal</h2>
                        <p className="text-white/20 font-bold uppercase tracking-[0.8em]">Herramientas de Grado Militar</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
                        {[
                            { icon: <Layout />, title: "Landings Forge", desc: "6 plantillas base ultra-modulares con más de 192 millones de combinaciones únicas de edición.", img: "/Landing-principal/1.png" },
                            { icon: <ImageIconIcon />, title: "Media Library", desc: "Acceso a miles de gráficas, videos y mockups oficiales en alta resolución.", img: "/Landing-principal/5.png" },
                            { icon: <BarChart3 />, title: "Analytics Live", desc: "Mide el rendimiento de tus links y landings con precisión de milisegundos.", img: "/Landing-principal/2.png" },
                            { icon: <Globe />, title: "Global Sync", desc: "Todo el material disponible en 10 idiomas para dominar los mercados más importantes.", img: "/Landing-principal/3.png" },
                            { icon: <Cpu />, title: "Cloud Engine", desc: "Tus landings alojadas en servidores de ultra-alta velocidad y baja latencia.", img: "/Landing-principal/13.png" },
                            { icon: <Sparkles />, title: "AI Strategy", desc: "Generación de copys y estrategias de venta mediante nuestra IA propietaria.", img: "/Landing-principal/14.png" }
                        ].map((tool, i) => (
                            <motion.div key={i} whileHover={{ y: -10 }} className="glass-card rounded-[3.5rem] p-16 relative overflow-hidden group">
                                <div className="text-[#865BFF] mb-12 p-5 bg-white/5 rounded-2xl w-fit group-hover:bg-[#865BFF] group-hover:text-white transition-all">{tool.icon}</div>
                                <h4 className="text-3xl font-black mb-8 font-heading uppercase tracking-tighter">{tool.title}</h4>
                                <p className="text-white/40 text-lg leading-relaxed mb-8">{tool.desc}</p>
                                <img src={tool.img} className="absolute -bottom-10 -right-10 w-48 opacity-5 group-hover:opacity-20 group-hover:scale-125 transition-all duration-1000" alt="" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="relative z-10 py-48 px-6 lg:px-20 bg-white/[0.01]">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-4xl lg:text-8xl font-black mb-32 tracking-tightest font-heading uppercase text-center leading-none">Preguntas<br />Frecuentes</h2>
                    <div className="space-y-16">
                        {[
                            { q: "¿Es gratuito el acceso a las herramientas?", a: "Sí, todos los partners oficiales de Bridge Markets tienen acceso ilimitado al hub de marketing de forma vitalicia." },
                            { q: "¿Necesito conocimientos técnicos para las landings?", a: "No, nuestro generador 'Forge' es 100% visual. Solo tienes que elegir, editar y publicar." },
                            { q: "¿Puedo usar mi propio dominio?", a: "Totalmente. Puedes conectar tus propios dominios a las landings que generes para mantener tu marca personal." }
                        ].map((faq, i) => (
                            <div key={i} className="pb-16 border-b border-white/5 group cursor-help">
                                <h4 className="text-2xl font-black font-heading uppercase tracking-tighter mb-6 group-hover:text-[#865BFF] transition-colors">{faq.q}</h4>
                                <p className="text-white/40 text-xl leading-relaxed">{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="relative z-10 py-48 px-6 lg:px-20 border-t border-white/5 bg-[#010105]">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-32">
                    <div className="lg:col-span-2">
                        <div className="flex items-center gap-8 mb-16">
                            <img src="/images/logo-bm-blanco.png" alt="Logo" className="h-16" />
                            <span className="text-4xl font-black tracking-tighter uppercase font-heading">Bridge Markets</span>
                        </div>
                        <p className="text-white/30 text-sm font-bold uppercase tracking-[0.8em] leading-loose max-w-sm">Infraestructura de marketing institucional para el éxito global.</p>
                    </div>
                    <div>
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-[#865BFF] mb-12">Navegación</h5>
                        <ul className="space-y-8 text-xs font-bold uppercase tracking-widest text-white/30">
                            <li className="hover:text-white cursor-pointer transition-colors">Academia</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Herramientas</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Legal</li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-xs font-black uppercase tracking-[0.4em] text-[#865BFF] mb-12">Soporte</h5>
                        <ul className="space-y-8 text-xs font-bold uppercase tracking-widest text-white/30">
                            <li className="hover:text-white cursor-pointer transition-colors">Instagram</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Telegram</li>
                            <li className="hover:text-white cursor-pointer transition-colors">Ayuda</li>
                        </ul>
                    </div>
                </div>
                <div className="max-w-7xl mx-auto mt-40 pt-20 border-t border-white/5 flex flex-col lg:flex-row justify-between items-center gap-16 text-[10px] font-bold uppercase tracking-[0.8em] text-white/10">
                    <span>© 2026 Bridge Markets Marketing Tools Hub</span>
                    <div className="flex items-center gap-8 text-[#865BFF]">
                        <Server className="w-6 h-6 opacity-60 animate-pulse" /> INFRA_LIVE_OK
                    </div>
                </div>
            </footer>
        </div>
    );
}
