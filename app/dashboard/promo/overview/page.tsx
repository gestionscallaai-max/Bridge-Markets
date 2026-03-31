"use client";
import React from 'react';
import { Info, Globe, TrendingUp, Shield, Zap, Award } from 'lucide-react';

const FEATURES = [
    { icon: Globe, title: 'Presencia Global', desc: 'Operamos en más de 100 países con una base de clientes activa en constante crecimiento.', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: TrendingUp, title: 'Mercados Disponibles', desc: 'Forex, Indices Bursátiles, Criptomonedas, Materias Primas y más.', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Shield, title: 'Regulación y Seguridad', desc: 'Trabajamos bajo estrictos estándares regulatorios internacionales para proteger a los clientes.', color: 'text-red-500', bg: 'bg-red-50' },
    { icon: Zap, title: 'Ejecución Ultra Rápida', desc: 'Servidores de clase institucional con ejecución de órdenes en milisegundos.', color: 'text-amber-600', bg: 'bg-amber-50' },
    { icon: Award, title: 'Premio al Partner', desc: 'Programa de incentivos para los afiliados con mejores resultados cada trimestre.', color: 'text-purple-600', bg: 'bg-purple-50' },
];

export default function PromoOverviewPage() {
    return (
        <div className="space-y-6 pb-10">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <Info className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Visión General de Bridge Markets</h2>
                    <p className="text-slate-500 text-sm">Información clave del broker que puedes compartir con tus clientes potenciales.</p>
                </div>
            </div>

            <div className="card p-8">
                <div className="flex flex-col lg:flex-row items-center gap-8">
                    <div className="lg:w-1/2">
                        <img src="/images/logo.png" alt="Bridge Markets" className="h-12 mb-6 object-contain" />
                        <h3 className="text-2xl font-bold text-slate-800 leading-tight mb-3">El broker con el que sí vale la pena trabajar</h3>
                        <p className="text-slate-500 text-sm leading-relaxed mb-5">
                            Bridge Markets nació con la misión de democratizar el acceso a los mercados financieros globales, ofreciendo tecnología de nivel institucional a traders de todos los niveles. Como Partner, representas una marca confiable, regulada y con un programa de afiliados transparente.
                        </p>
                        <div className="flex gap-6">
                            <div>
                                <div className="text-2xl font-bold text-brand-500">100+</div>
                                <div className="text-xs text-slate-400 font-medium">Países</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-brand-500">0.0</div>
                                <div className="text-xs text-slate-400 font-medium">Spreads desde</div>
                            </div>
                            <div>
                                <div className="text-2xl font-bold text-brand-500">24/5</div>
                                <div className="text-xs text-slate-400 font-medium">Soporte</div>
                            </div>
                        </div>
                    </div>
                    <div className="lg:w-1/2 grid grid-cols-1 sm:grid-cols-2 gap-3 w-full">
                        {FEATURES.map(f => {
                            const Icon = f.icon;
                            return (
                                <div key={f.title} className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                                    <div className={`w-8 h-8 rounded-lg ${f.bg} flex items-center justify-center mb-3`}>
                                        <Icon className={`w-4 h-4 ${f.color}`} />
                                    </div>
                                    <div className="text-sm font-bold text-slate-800 mb-1">{f.title}</div>
                                    <div className="text-xs text-slate-400 leading-relaxed">{f.desc}</div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
