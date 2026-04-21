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

        </div>
    );
}
