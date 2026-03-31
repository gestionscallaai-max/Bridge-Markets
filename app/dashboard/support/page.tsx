"use client";
import React from 'react';
import { Headphones, MessageSquare, Mail, BookOpen, Clock } from 'lucide-react';

const FAQ = [
    { q: '¿Cuándo se pagan las comisiones?', a: 'Las comisiones aprobadas se pagan dentro de los primeros 5 días hábiles del mes siguiente a su aprobación.' },
    { q: '¿Cuál es el mínimo para solicitar un retiro?', a: 'El monto mínimo para solicitar un reembolso es de $10 USD.' },
    { q: '¿Cómo puedo ver si mis leads se registraron?', a: 'Ve a Informes > Clientes para ver todos los leads registrados vinculados a tu cuenta.' },
    { q: '¿Puedo tener varias Landing Pages activas?', a: 'Sí, puedes crear múltiples landing pages desde Promo > Herramientas de Registro, cada una con un slug único.' },
];

export default function DashboardSupportPage() {
    return (
        <div className="space-y-5 pb-10">
            <div className="card p-5 flex items-center gap-3">
                <div className="w-10 h-10 rounded-lg bg-brand-500/10 flex items-center justify-center text-brand-500">
                    <Headphones className="w-5 h-5" />
                </div>
                <div>
                    <h2 className="text-lg font-bold text-slate-800">Asistencia</h2>
                    <p className="text-slate-500 text-sm">Contacta al equipo de soporte dedicado a Partners de Bridge Markets.</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <a href="https://wa.me/1234567890" target="_blank" rel="noreferrer" className="card p-6 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600 mb-4 group-hover:scale-110 transition-transform">
                        <MessageSquare className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm mb-1">WhatsApp Soporte</div>
                    <div className="text-xs text-slate-400 leading-relaxed">Escríbenos directamente. Respuesta en menos de 1 hora en horario de atención.</div>
                    <div className="mt-4 text-xs font-semibold text-emerald-600">Abrir WhatsApp →</div>
                </a>
                <a href="mailto:partners@bridgemarkets.com" className="card p-6 hover:shadow-card-hover transition-all duration-300 group cursor-pointer">
                    <div className="w-12 h-12 rounded-xl bg-blue-100 flex items-center justify-center text-blue-600 mb-4 group-hover:scale-110 transition-transform">
                        <Mail className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm mb-1">Correo Electrónico</div>
                    <div className="text-xs text-slate-400 leading-relaxed">Para consultas detalladas o documentos. Respondemos en máximo 24 horas hábiles.</div>
                    <div className="mt-4 text-xs font-semibold text-blue-600">partners@bridgemarkets.com →</div>
                </a>
                <div className="card p-6">
                    <div className="w-12 h-12 rounded-xl bg-slate-100 flex items-center justify-center text-slate-600 mb-4">
                        <Clock className="w-6 h-6" />
                    </div>
                    <div className="font-bold text-slate-800 text-sm mb-1">Horario de Atención</div>
                    <div className="text-xs text-slate-400 leading-relaxed">
                        <div className="flex justify-between py-1 border-b border-slate-100"><span>Lunes - Viernes</span><span className="font-semibold text-slate-600">9:00 - 18:00 EST</span></div>
                        <div className="flex justify-between py-1"><span>Sábados</span><span className="font-semibold text-slate-600">10:00 - 14:00 EST</span></div>
                    </div>
                </div>
            </div>

            <div className="card p-6">
                <div className="flex items-center gap-2 mb-5">
                    <BookOpen className="w-5 h-5 text-brand-500" />
                    <h3 className="font-bold text-slate-800">Preguntas Frecuentes</h3>
                </div>
                <div className="space-y-3">
                    {FAQ.map((faq, i) => (
                        <details key={i} className="group border border-slate-200 rounded-xl overflow-hidden">
                            <summary className="flex justify-between items-center px-5 py-4 cursor-pointer font-semibold text-slate-700 text-sm hover:bg-slate-50 transition-colors list-none">
                                {faq.q}
                                <span className="text-slate-400 group-open:rotate-45 transition-transform text-lg font-light">+</span>
                            </summary>
                            <div className="px-5 pb-4 text-sm text-slate-500 leading-relaxed border-t border-slate-100">{faq.a}</div>
                        </details>
                    ))}
                </div>
            </div>
        </div>
    );
}
