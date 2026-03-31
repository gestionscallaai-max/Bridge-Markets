"use client";
import React from 'react';
import { BookOpenCheck, CheckCircle2, XCircle } from 'lucide-react';

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
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <BookOpenCheck className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Directrices Publicitarias</h2>
                    <p className="text-slate-500 text-sm">Lineamientos obligatorios para todos los Partners de Bridge Markets.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="card p-6">
                    <h3 className="font-bold text-emerald-700 flex items-center gap-2 mb-4 text-sm">
                        <CheckCircle2 className="w-5 h-5" /> Lo que SÍ puedes hacer
                    </h3>
                    <ul className="space-y-3">
                        {DO_LIST.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
                <div className="card p-6">
                    <h3 className="font-bold text-red-600 flex items-center gap-2 mb-4 text-sm">
                        <XCircle className="w-5 h-5" /> Lo que NO puedes hacer
                    </h3>
                    <ul className="space-y-3">
                        {DONT_LIST.map((item, i) => (
                            <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                                <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>

            <div className="card p-6 bg-amber-50 border-amber-200">
                <div className="flex items-start gap-3">
                    <BookOpenCheck className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                    <div>
                        <div className="font-bold text-amber-800 text-sm mb-1">Aviso Legal Importante</div>
                        <p className="text-amber-700 text-xs leading-relaxed">
                            El trading en los mercados financieros implica un riesgo significativo de pérdida de capital. Los Partners deben asegurarse de que sus clientes comprendan y acepten estos riesgos antes de registrarse. El incumplimiento de estas directrices puede resultar en la suspensión o terminación del programa de afiliados.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
