"use client";

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
    ArrowRight, 
    Shield, 
    Zap, 
    ShieldCheck, 
    Pencil,
    LayoutDashboard,
    Globe,
    BarChart3,
    ChevronRight,
    Star,
    CheckCircle2
} from 'lucide-react';
import { motion, useScroll, useTransform } from 'framer-motion';

export default function ElaborateLandingPage() {
    const router = useRouter();
    const { scrollY } = useScroll();
    
    // Parallax effects for background orbs
    const y1 = useTransform(scrollY, [0, 500], [0, 100]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);

    return (
        <div className="relative min-h-screen w-full bg-[#fef7ff] text-[#211635] font-sans selection:bg-[#865BFF]/30 overflow-x-hidden">
            
            {/* Custom Styles for Asymmetric Design */}
            <style jsx global>{`
                .asym-card { border-radius: 4rem 1rem 4rem 1rem; }
                .asym-card-sm { border-radius: 2rem 0.5rem 2rem 0.5rem; }
                .glass-card { 
                    background: rgba(255, 255, 255, 0.4); 
                    backdrop-filter: blur(12px); 
                    border: 1px solid rgba(255, 255, 255, 0.5); 
                }
                .text-gradient {
                    background: linear-gradient(135deg, #140633 0%, #865BFF 100%);
                    -webkit-background-clip: text;
                    -webkit-text-fill-color: transparent;
                }
                .glow-orb {
                    filter: blur(80px);
                    opacity: 0.4;
                }
            `}</style>

            {/* Background Decorative Elements */}
            <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
                <motion.div style={{ y: y1 }} className="absolute -top-[10%] -right-[5%] w-[600px] h-[600px] bg-[#865BFF]/10 rounded-full glow-orb" />
                <motion.div style={{ y: y2 }} className="absolute top-[40%] -left-[10%] w-[500px] h-[500px] bg-[#6438dc]/10 rounded-full glow-orb" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]" />
            </div>

            {/* NAVIGATION */}
            <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-purple-100">
                <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center h-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-2 cursor-pointer"
                        onClick={() => router.push('/')}
                    >
                        <div className="w-10 h-10 bg-[#140633] rounded-xl flex items-center justify-center shadow-lg">
                            <img src="/images/logo-bm-blanco.png" alt="" className="h-6 object-contain" />
                        </div>
                        <span className="text-xl font-black tracking-tighter text-[#140633]">Bridge <span className="text-[#865BFF]">Markets</span></span>
                    </motion.div>

                    <div className="hidden lg:flex items-center gap-10">
                        {['Plataforma', 'Seguridad', 'Herramientas', 'FAQ'].map((item) => (
                            <a key={item} href={`#${item.toLowerCase()}`} className="text-sm font-bold text-[#494455] hover:text-[#865BFF] transition-colors">{item}</a>
                        ))}
                    </div>

                    <motion.div 
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="flex items-center gap-4"
                    >
                        <button 
                            onClick={() => router.push('/login')}
                            className="px-6 py-2 text-sm font-bold text-[#140633] hover:translate-y-[-2px] transition-all"
                        >
                            Login
                        </button>
                        <button 
                            onClick={() => router.push('/register')}
                            className="px-6 py-3 bg-[#865BFF] text-white font-bold asym-card-sm shadow-xl shadow-[#865BFF]/25 hover:scale-105 transition-all text-sm"
                        >
                            Get Started
                        </button>
                    </motion.div>
                </div>
            </nav>

            {/* HERO SECTION */}
            <section className="relative pt-44 pb-32 px-6 overflow-hidden">
                <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="z-10"
                    >
                        <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#865BFF]/10 text-[#865BFF] rounded-full text-[10px] font-black tracking-[0.2em] uppercase mb-8 border border-[#865BFF]/20">
                            <span className="w-2 h-2 rounded-full bg-[#865BFF] animate-ping"></span>
                            Partner Ecosystem 2.0
                        </div>
                        <h1 className="text-6xl md:text-[5.5rem] font-black leading-[0.95] tracking-tighter text-[#140633] mb-8">
                            Master the <br />
                            <span className="text-gradient italic">Affiliate</span> <br />
                            Universe.
                        </h1>
                        <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-lg mb-12 font-medium">
                            Potencia tu red con herramientas de IA y análisis en tiempo real. La precisión de Bridge Markets, ahora para nuestros partners.
                        </p>
                        <div className="flex flex-wrap items-center gap-8">
                            <button 
                                onClick={() => router.push('/register')}
                                className="px-10 py-5 bg-[#140633] text-white text-lg font-bold asym-card shadow-2xl shadow-[#140633]/30 hover:scale-105 transition-all flex items-center gap-3 group"
                            >
                                Iniciar Ahora <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-all" />
                            </button>
                            <div className="flex items-center gap-4">
                                <div className="flex -space-x-3">
                                    {[1,2,3].map(i => (
                                        <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden shadow-sm">
                                            <img src={`https://i.pravatar.cc/100?img=${i+10}`} alt="" />
                                        </div>
                                    ))}
                                </div>
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">+500 Partners activos</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, rotate: 5 }}
                        animate={{ opacity: 1, scale: 1, rotate: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="relative"
                    >
                        <div className="absolute inset-0 bg-[#865BFF]/20 blur-[120px] rounded-full scale-75"></div>
                        <div className="relative z-10 asym-card overflow-hidden aspect-[4/5] shadow-[0_40px_100px_-20px_rgba(20,6,51,0.3)] border border-white/50 bg-slate-100">
                            <img 
                                src="https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop" 
                                alt="Trading Interface" 
                                className="absolute inset-0 w-full h-full object-cover transition-transform duration-1000 hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-[#140633]/60 to-transparent"></div>
                            
                            {/* Floating Glass Card */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                transition={{ delay: 1 }}
                                className="absolute bottom-8 left-8 right-8 glass-card p-8 asym-card-sm border border-white/30 shadow-2xl"
                            >
                                <div className="flex items-center justify-between mb-4">
                                    <p className="text-white text-3xl font-black">99.9%</p>
                                    <div className="bg-emerald-500/20 px-2 py-1 rounded text-[10px] font-bold text-emerald-400">LIVE</div>
                                </div>
                                <p className="text-white/70 text-[10px] font-bold tracking-[0.2em] uppercase">Métricas de conversión en tiempo real</p>
                                <div className="mt-4 flex gap-1 h-8 items-end">
                                    {[0.4, 0.7, 0.5, 0.9, 0.6, 1].map((h, i) => (
                                        <div key={i} className="flex-1 bg-[#865BFF] rounded-t-sm" style={{ height: `${h*100}%` }}></div>
                                    ))}
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                </div>
            </section>

            {/* LIVE MATRIX SECTION */}
            <section className="py-32 px-6">
                <div className="max-w-7xl mx-auto">
                    <div className="flex flex-col md:flex-row justify-between items-end mb-20 gap-8">
                        <div className="max-w-2xl">
                            <h2 className="text-5xl font-black tracking-tighter text-[#140633]">Live Growth Matrix</h2>
                            <p className="text-slate-500 mt-6 text-lg font-medium">Monitoreo continuo del rendimiento de nuestros mejores afiliados.</p>
                        </div>
                        <div className="px-5 py-3 bg-white rounded-full border border-purple-100 shadow-sm flex items-center gap-3">
                            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse"></span>
                            <span className="text-[10px] font-black uppercase tracking-widest text-[#140633]">Feed en vivo</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {[
                            { title: 'Generación IA', icon: Zap, val: '+145%', color: '#865BFF', desc: 'Optimización de contenido' },
                            { title: 'Retención IB', icon: ShieldCheck, val: '92.4%', color: '#059669', desc: 'Lealtad de clientes' },
                            { title: 'Landings Activas', icon: Globe, val: '1.2k', color: '#6366f1', desc: 'Alcance global' },
                            { title: 'Conversión', icon: BarChart3, val: '+24%', color: '#f59e0b', desc: 'Crecimiento mensual' }
                        ].map((item, i) => (
                            <motion.div
                                key={item.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                className="bg-white p-10 asym-card-sm border border-purple-50 hover:border-[#865BFF]/30 transition-all group hover:-translate-y-2 shadow-sm"
                            >
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-[#140633] group-hover:bg-[#865BFF] group-hover:text-white transition-all shadow-inner">
                                        <item.icon className="w-6 h-6" />
                                    </div>
                                    <span className="font-black text-sm" style={{ color: item.color }}>{item.val}</span>
                                </div>
                                <h3 className="text-2xl font-black tracking-tight mb-2 text-[#140633]">{item.title}</h3>
                                <p className="text-slate-400 text-sm font-medium">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FEATURES ELABORATE GRID */}
            <section className="py-32 bg-[#140633] asym-card mx-6 md:mx-12 mb-32 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_top_right,rgba(134,91,255,0.15),transparent)]"></div>
                <div className="max-w-7xl mx-auto px-12 relative z-10">
                    <div className="text-center max-w-3xl mx-auto mb-24">
                        <h2 className="text-5xl md:text-6xl font-black text-white mb-8 tracking-tighter">Everything you need to <span className="text-[#865BFF]">Scale</span>.</h2>
                        <p className="text-purple-100/40 text-xl leading-relaxed">Herramientas diseñadas para brokers y afiliados que no se conforman con lo estándar.</p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                        {[
                            { title: 'Dashboard Premium', icon: LayoutDashboard, desc: 'Control total de tus campañas, leads y comisiones desde una interfaz de élite.' },
                            { title: 'Generador Visual', icon: Pencil, desc: 'Crea contenido publicitario en 14 idiomas con un solo clic usando nuestra IA.' },
                            { title: 'Soporte VIP', icon: Shield, desc: 'Atención personalizada 24/7 para ayudarte a optimizar tus estrategias de captación.' }
                        ].map((item) => (
                            <div key={item.title} className="bg-white/5 backdrop-blur-md p-12 asym-card border border-white/10 hover:bg-white/10 transition-all group">
                                <item.icon className="w-12 h-12 text-[#865BFF] mb-8 group-hover:scale-110 transition-transform" />
                                <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
                                <p className="text-purple-100/40 leading-relaxed text-sm">{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA */}
            <section className="py-32 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    className="max-w-4xl mx-auto"
                >
                    <h2 className="text-5xl md:text-7xl font-black text-[#140633] tracking-tighter mb-12 leading-[1.1]">
                        Ready to join the <br />
                        <span className="italic text-[#865BFF]">Next-Gen</span> Partners?
                    </h2>
                    <div className="flex flex-wrap justify-center gap-6">
                        <button 
                            onClick={() => router.push('/register')}
                            className="px-12 py-6 bg-[#865BFF] text-white text-xl font-black asym-card shadow-2xl shadow-[#865BFF]/40 hover:scale-105 transition-all"
                        >
                            Get Started Now
                        </button>
                        <button 
                            onClick={() => router.push('/login')}
                            className="px-12 py-6 bg-white text-[#140633] text-xl font-black asym-card border border-purple-100 hover:bg-slate-50 transition-all"
                        >
                            Partner Login
                        </button>
                    </div>
                </motion.div>
            </section>

            {/* FOOTER */}
            <footer className="py-20 px-6 border-t border-purple-50">
                <div className="max-w-7xl mx-auto flex flex-col md:row items-center justify-between gap-10">
                    <div className="flex flex-col items-center md:items-start gap-4">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-[#140633] rounded-lg flex items-center justify-center">
                                <img src="/images/logo-bm-blanco.png" alt="" className="h-4" />
                            </div>
                            <span className="font-black tracking-tighter text-[#140633]">Bridge Markets</span>
                        </div>
                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest">© 2026 Professional Affiliate Portal</p>
                    </div>
                    <div className="flex gap-10 text-xs font-bold text-slate-400 uppercase tracking-widest">
                        <a href="#" className="hover:text-[#865BFF] transition-colors">Términos</a>
                        <a href="#" className="hover:text-[#865BFF] transition-colors">Privacidad</a>
                        <a href="#" className="hover:text-[#865BFF] transition-colors">Soporte</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}
