"use client";

import React from 'react';
import { CreditCard, DollarSign, Download, ArrowUpRight, ArrowDownRight, Clock, CheckCircle2 } from 'lucide-react';

const PAYOUTS = [
    { id: 'PAY-1004', date: '01 Sep 2023', amount: '$2,450.00', method: 'Transferencia Bancaria', status: 'Pagado', ref: 'TRX-99827361' },
    { id: 'PAY-1003', date: '01 Ago 2023', amount: '$1,820.50', method: 'USDT (TRC20)', status: 'Pagado', ref: 'TX-abc123xyz' },
    { id: 'PAY-1002', date: '01 Jul 2023', amount: '$2,100.00', method: 'Transferencia Bancaria', status: 'Pagado', ref: 'TRX-88716253' },
    { id: 'PAY-1001', date: '01 Jun 2023', amount: '$950.00', method: 'USDT (TRC20)', status: 'Pagado', ref: 'TX-def456uvw' },
];

export default function CommissionsPage() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Mis Comisiones y Pagos</h2>
                    <p className="text-slate-500 text-sm">Resumen de ganancias, balance actual e historial de retiros.</p>
                </div>
                <button className="bg-lila hover:bg-lila-light text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm w-fit">
                    <DollarSign className="w-5 h-5 -mx-1" /> Solicitar Retiro
                </button>
            </div>

            {/* Balance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Available Balance */}
                <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-2xl p-6 text-white shadow-lg relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-2xl -mt-10 -mr-10"></div>
                    <div className="relative z-10">
                        <div className="flex items-center gap-2 mb-2 opacity-80">
                            <CreditCard className="w-4 h-4" />
                            <h3 className="text-xs font-bold uppercase tracking-widest">Balance Disponible</h3>
                        </div>
                        <div className="text-4xl font-black mb-1">$4,102.50</div>
                        <div className="text-sm font-medium text-emerald-400 flex items-center gap-1">
                            <ArrowUpRight className="w-4 h-4" /> +$850.00 este mes
                        </div>
                    </div>
                </div>

                {/* Pending Balance */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-amber-50 rounded-full blur-2xl -mt-10 -mr-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-amber-50 text-amber-500 flex items-center justify-center">
                                <Clock className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Balance Pendiente</h3>
                        <div className="text-3xl font-black text-slate-800">$325.00</div>
                        <div className="text-xs text-slate-400 mt-2 font-medium">Se liberará en los próximos 15 días</div>
                    </div>
                </div>

                {/* Total Withdrawn */}
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-50 rounded-full blur-2xl -mt-10 -mr-10 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <div className="relative z-10">
                        <div className="flex items-center justify-between mb-4">
                            <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-500 flex items-center justify-center">
                                <DollarSign className="w-5 h-5" />
                            </div>
                        </div>
                        <h3 className="text-slate-500 text-xs font-bold uppercase tracking-widest mb-1">Total Retirado</h3>
                        <div className="text-3xl font-black text-slate-800">$18,450.00</div>
                        <div className="text-xs text-slate-400 mt-2 font-medium">Histórico desde tu registro</div>
                    </div>
                </div>

            </div>

            {/* Payout History */}
            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col mt-8">
                <div className="p-5 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-slate-50/50">
                    <h3 className="text-lg font-bold text-slate-800">Historial de Pagos</h3>
                    <button className="flex items-center gap-2 px-3 py-1.5 bg-white border border-slate-300 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                        <Download className="w-3.5 h-3.5" /> Descargar Todo
                    </button>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50/80 text-slate-500 font-bold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">ID Pago</th>
                                <th className="px-6 py-4">Fecha</th>
                                <th className="px-6 py-4">Método</th>
                                <th className="px-6 py-4">Referencia</th>
                                <th className="px-6 py-4 text-center">Estado</th>
                                <th className="px-6 py-4 text-right">Monto</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {PAYOUTS.map(payout => (
                                <tr key={payout.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4 font-bold text-slate-800">{payout.id}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{payout.date}</td>
                                    <td className="px-6 py-4 text-slate-600 font-medium">{payout.method}</td>
                                    <td className="px-6 py-4 font-mono text-xs text-slate-400 bg-slate-50 px-2 py-1 rounded inline-block mt-2">{payout.ref}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-50 text-emerald-600 border border-emerald-100">
                                            <CheckCircle2 className="w-3.5 h-3.5" /> {payout.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right font-black text-slate-800 text-base">{payout.amount}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Empty State Mock for demonstration if no payments (hidden usually) */}
                {PAYOUTS.length === 0 && (
                    <div className="p-12 text-center flex flex-col items-center">
                        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-4">
                            <DollarSign className="w-8 h-8" />
                        </div>
                        <h4 className="text-slate-800 font-bold mb-1">Aún no hay pagos</h4>
                        <p className="text-slate-500 text-sm">Tus retiros completados aparecerán aquí.</p>
                    </div>
                )}
            </div>
        </div>
    );
}
