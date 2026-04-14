"use client";
import React from 'react';
import { Headphones, MessageSquare, Mail, BookOpen, Clock, ChevronRight, HelpCircle, ArrowRight, Zap, ExternalLink, Plus } from 'lucide-react';
import { motion } from 'framer-motion';

const FAQ = [
    { q: '¿Cuándo se pagan las comisiones?', a: 'Las comisiones aprobadas se pagan dentro de los primeros 5 días hábiles del mes siguiente a su aprobación.' },
    { q: '¿Cuál es el mínimo para solicitar un retiro?', a: 'El monto mínimo para solicitar un reembolso es de $10 USD.' },
    { q: '¿Cómo puedo ver si mis leads se registraron?', a: 'Ve a Informes > Clientes para ver todos los leads registrados vinculados a tu cuenta.' },
    { q: '¿Puedo tener varias Landing Pages activas?', a: 'Sí, puedes crear múltiples landing pages desde Promo > Herramientas de Registro, cada una con un slug único.' },
];

export default function DashboardSupportPage() {
    return (
        <div className="max-w-6xl mx-auto space-y-10 pb-20">
            {/* Hero Section */}
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0d0221] p-12 text-white shadow-2xl border border-white/5">
                <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#865BFF] opacity-10 blur-[120px] -mr-64 -mt-64"></div>
                <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
                    <div>
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#865BFF]/20 text-[#865BFF] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#865BFF]/30">
                            <Zap className="w-3 h-3 fill-current" /> Soporte Premium
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black tracking-tighter mb-4 leading-tight">
                            ¿Cómo podemos <span className="text-[#865BFF]">ayudarte</span> hoy?
                        </h1>
                        <p className="text-white/50 text-base font-medium max-w-md leading-relaxed">
                            Nuestro equipo especializado en Partners está disponible para resolver cualquier duda sobre comisiones, herramientas o estrategia.
                        </p>
                    </div>
                    <div className="hidden md:flex justify-end">
                        <div className="relative group">
                            <div className="absolute inset-0 bg-[#865BFF] blur-2xl opacity-20 group-hover:opacity-40 transition-opacity"></div>
                            <div className="w-48 h-48 rounded-[2.5rem] bg-gradient-to-br from-[#865BFF] to-[#6335f8] flex items-center justify-center relative z-10">
                                <Headphones className="w-20 h-20 text-white" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact Channels */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { 
                        title: 'WhatsApp Directo', 
                        desc: 'Consultas rápidas y soporte técnico inmediato.', 
                        action: 'Abrir Chat', 
                        link: 'https://wa.me/1234567890', 
                        icon: MessageSquare, 
                        color: 'bg-emerald-500',
                        light: 'bg-emerald-50 text-emerald-600'
                    },
                    { 
                        title: 'Email de Soporte', 
                        desc: 'Para revisiones detalladas o envío de documentos.', 
                        action: 'Enviar Email', 
                        link: 'mailto:partners@bridgemarkets.com', 
                        icon: Mail, 
                        color: 'bg-[#865BFF]',
                        light: 'bg-purple-50 text-[#865BFF]'
                    },
                    { 
                        title: 'Horario Operativo', 
                        desc: 'Lun-Vie 9:00 - 18:00 EST / Sáb 10:00 - 14:00 EST', 
                        action: 'Ver Calendario', 
                        link: '#', 
                        icon: Clock, 
                        color: 'bg-slate-800',
                        light: 'bg-slate-100 text-slate-600'
                    }
                ].map((item, i) => (
                    <motion.a
                        key={i}
                        href={item.link}
                        target={item.link.startsWith('http') ? "_blank" : undefined}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                        className="group relative bg-white rounded-[2.5rem] p-8 border border-slate-100 hover:shadow-2xl hover:shadow-[#865BFF]/5 hover:border-[#865BFF]/20 transition-all duration-300 overflow-hidden"
                    >
                        <div className={`w-14 h-14 rounded-2xl ${item.light} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500`}>
                            <item.icon className="w-7 h-7" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 mb-2">{item.title}</h3>
                        <p className="text-sm text-slate-500 font-medium leading-relaxed mb-6">{item.desc}</p>
                        <div className="flex items-center gap-2 text-xs font-black uppercase tracking-widest group-hover:text-[#865BFF] transition-colors">
                            {item.action} <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </motion.a>
                ))}
            </div>

            {/* FAQ Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
                <div className="lg:col-span-1">
                    <div className="sticky top-6">
                        <div className="w-12 h-12 rounded-2xl bg-[#865BFF]/10 flex items-center justify-center text-[#865BFF] mb-6">
                            <BookOpen className="w-6 h-6" />
                        </div>
                        <h2 className="text-3xl font-black text-slate-800 tracking-tight leading-tight mb-4">Preguntas Frecuentes</h2>
                        <p className="text-slate-500 font-medium text-base mb-8 italic border-l-4 border-[#865BFF]/20 pl-4">
                            "Encuentra respuestas inmediatas a las dudas más comunes de nuestra red de partners."
                        </p>
                        <div className="bg-[#0d0221] rounded-2xl p-6 text-white group cursor-pointer relative overflow-hidden">
                            <div className="absolute inset-0 bg-brand-purple opacity-0 group-hover:opacity-20 transition-opacity"></div>
                            <h4 className="font-bold text-sm mb-2 relative z-10 flex items-center gap-2">
                                <HelpCircle className="w-4 h-4 text-[#865BFF]" /> ¿No encuentras tu duda?
                            </h4>
                            <p className="text-[11px] text-white/40 mb-4 relative z-10 leading-relaxed">Nuestro centro de ayuda completo tiene más de 100 artículos para ti.</p>
                            <span className="text-[#865BFF] text-[10px] font-black uppercase tracking-widest flex items-center gap-1 relative z-10">
                                Visitar Centro de Ayuda <ExternalLink className="w-3 h-3" />
                            </span>
                        </div>
                    </div>
                </div>

                <div className="lg:col-span-2 space-y-4">
                    {FAQ.map((faq, i) => (
                        <details key={i} className="group overflow-hidden">
                            <summary className="flex justify-between items-center px-8 py-6 cursor-pointer bg-white border border-slate-100 rounded-2xl hover:border-[#865BFF]/30 transition-all duration-300 list-none">
                                <span className="font-black text-slate-700 text-sm">{faq.q}</span>
                                <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center group-open:bg-[#865BFF] group-open:text-white transition-all">
                                    <Plus className="w-4 h-4 group-open:rotate-45 transition-transform" />
                                </div>
                            </summary>
                            <motion.div 
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="px-8 py-6 text-sm text-slate-500 font-medium leading-relaxed bg-slate-50/50 border-x border-b border-slate-100 rounded-b-2xl -mt-4 pt-10"
                            >
                                {faq.a}
                            </motion.div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
