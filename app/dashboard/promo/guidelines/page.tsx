"use client";

import React from 'react';
import { BookOpenCheck, CheckCircle2, XCircle, AlertTriangle, ShieldCheck, Info, FileText, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

const DO_LIST = [
    'Usar los materiales gráficos y plantillas aprobadas disponibles en el panel.',
    'Identificarte siempre como "Partner Autorizado de Bridge Markets".',
    'Respetar las regulaciones locales de publicidad financiera en tu país.',
    'Dirigir el tráfico únicamente a través de tu link de afiliado personalizado.',
    'Informar a los clientes sobre los riesgos inherentes al trading en los mercados financieros.',
];

const DONT_LIST = [
    'Garantizar rendimientos o beneficios específicos a clientes potenciales.',
    'Usar el nombre o logo de Bridge Markets sin los materiales aprobados.',
    'Crear publicidad engañosa o que omita los riesgos del trading.',
    'Compartir credenciales de acceso al panel con terceros.',
    'Participar en prácticas de spam o marketing no solicitado.',
];

export default function PromoGuidelinesPage() {
    return (
        <div className="max-w-5xl mx-auto space-y-10 pb-20">
            {/* Header Hero */}
            <div className="relative overflow-hidden rounded-[3rem] bg-[#0d0221] p-10 text-white shadow-2xl border border-white/5 text-center">
                <div className="absolute top-0 left-0 w-64 h-64 bg-[#865BFF] opacity-10 blur-[80px] -ml-32 -mt-32"></div>
                <div className="relative z-10">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#865BFF]/20 text-[#865BFF] text-[10px] font-black uppercase tracking-[0.2em] mb-6 border border-[#865BFF]/30">
                        <ShieldCheck className="w-3 h-3" /> Compliance Center
                    </div>
                    <h1 className="text-3xl md:text-4xl font-black tracking-tight mb-4 leading-tight">
                        Directrices <span className="text-[#865BFF]">Publicitarias</span>
                    </h1>
                    <p className="text-white/40 text-sm font-medium max-w-xl mx-auto leading-relaxed">
                        Para mantener la integridad de nuestra marca y cumplir con las regulaciones internacionales, todos los partners deben adherirse a estos lineamientos obligatorios.
                    </p>
                </div>
            </div>

            {/* Guidelines Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <CheckCircle2 className="w-20 h-20 text-emerald-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-emerald-50 flex items-center justify-center text-emerald-600">
                            <CheckCircle2 className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Buenas Prácticas</h3>
                    </div>
                    <ul className="space-y-5">
                        {DO_LIST.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium leading-relaxed group/item">
                                <div className="mt-1 w-5 h-5 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-500 shrink-0 group-hover/item:bg-emerald-500 group-hover/item:text-white transition-colors">
                                    <CheckCircle2 className="w-3 h-3" />
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>

                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm relative overflow-hidden group"
                >
                    <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:scale-110 transition-transform duration-500">
                        <XCircle className="w-20 h-20 text-red-500" />
                    </div>
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-12 h-12 rounded-2xl bg-red-50 flex items-center justify-center text-red-600">
                            <XCircle className="w-6 h-6" />
                        </div>
                        <h3 className="text-xl font-black text-slate-800 tracking-tight">Restricciones</h3>
                    </div>
                    <ul className="space-y-5">
                        {DONT_LIST.map((item, i) => (
                            <li key={i} className="flex items-start gap-4 text-sm text-slate-600 font-medium leading-relaxed group/item">
                                <div className="mt-1 w-5 h-5 rounded-full bg-red-50 flex items-center justify-center text-red-500 shrink-0 group-hover/item:bg-red-500 group-hover/item:text-white transition-colors">
                                    <XCircle className="w-3 h-3" />
                                </div>
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </motion.div>
            </div>

            {/* Legal Notice */}
            <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-[#0d0221] rounded-[2.5rem] p-10 text-white relative overflow-hidden group border border-white/5"
            >
                <div className="absolute bottom-0 right-0 w-64 h-64 bg-amber-500 opacity-5 blur-[80px] -mr-32 -mb-32"></div>
                <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
                    <div className="w-20 h-20 rounded-[2rem] bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20 shadow-xl shadow-amber-500/5">
                        <AlertTriangle className="w-10 h-10" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                        <h4 className="text-xl font-black mb-3 flex items-center justify-center md:justify-start gap-2">
                            <Info className="w-5 h-5 text-[#865BFF]" /> Aviso Legal Crítico
                        </h4>
                        <p className="text-white/40 text-sm leading-relaxed font-medium">
                            El trading en los mercados financieros implica un riesgo significativo de pérdida de capital. Como Partner, es tu responsabilidad legal asegurar que tus clientes comprendan y acepten estos riesgos. El incumplimiento de estas directrices resultará en la revocación inmediata de tu estatus de afiliado y la pérdida de comisiones acumuladas.
                        </p>
                    </div>
                    <div className="shrink-0">
                        <button className="flex items-center gap-2 px-6 py-4 rounded-2xl bg-white/5 hover:bg-white/10 text-white text-xs font-black uppercase tracking-widest border border-white/10 transition-all">
                            Descargar PDF <FileText className="w-4 h-4" />
                        </button>
                    </div>
                </div>
            </motion.div>

            {/* Footer hint */}
            <div className="text-center">
                <p className="text-[10px] font-black text-slate-400 uppercase tracking-[0.3em] flex items-center justify-center gap-4">
                    <div className="h-px w-10 bg-slate-100"></div>
                    Actualizado para Q2 2026
                    <div className="h-px w-10 bg-slate-100"></div>
                </p>
            </div>
        </div>
    );
}
