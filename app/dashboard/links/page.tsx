"use client";

import React, { useState } from 'react';
import { Link as LinkIcon, Copy, Plus, Filter, Search, Check, ExternalLink } from 'lucide-react';

const MOCK_LINKS = [
    { id: '1', name: 'Campaña Principal ES', url: 'https://bm.io/ref/BM_10940382/main-es', clicks: 1240, conversions: 45, date: '12 Sep 2023', status: 'Activo' },
    { id: '2', name: 'Promo Crypto 100%', url: 'https://bm.io/ref/BM_10940382/crypto-promo', clicks: 850, conversions: 12, date: '05 Sep 2023', status: 'Activo' },
    { id: '3', name: 'Landing FB Ads', url: 'https://bm.io/ref/BM_10940382/fb-landing', clicks: 3200, conversions: 110, date: '01 Ang 2023', status: 'Inactivo' },
    { id: '4', name: 'Blog Post Forex', url: 'https://bm.io/ref/BM_10940382/blog-forex', clicks: 450, conversions: 8, date: '20 Jul 2023', status: 'Activo' },
];

export default function LinksPage() {
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopy = (id: string, url: string) => {
        navigator.clipboard.writeText(url);
        setCopiedId(id);
        setTimeout(() => setCopiedId(null), 2000);
    };

    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                    <h2 className="text-2xl font-bold text-slate-800">Mis Links de Tracking</h2>
                    <p className="text-slate-500 text-sm">Gestiona y crea enlaces personalizados para tus campañas.</p>
                </div>
                <button className="bg-lila hover:bg-lila-light text-white px-5 py-2.5 rounded-xl font-bold text-sm flex items-center gap-2 transition-colors shadow-sm w-fit">
                    <Plus className="w-5 h-5" /> Nuevo Link
                </button>
            </div>

            <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                {/* Toolbar */}
                <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row items-center gap-4 justify-between bg-slate-50/50">
                    <div className="relative w-full sm:max-w-xs">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Buscar links..."
                            className="w-full pl-9 pr-4 py-2 bg-white border border-slate-300 rounded-lg text-sm focus:outline-none focus:border-lila focus:ring-1 focus:ring-lila transition-all"
                        />
                    </div>
                    <div className="flex items-center gap-2 w-full sm:w-auto">
                        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-semibold text-slate-600 hover:bg-slate-50 transition-colors w-full sm:w-auto justify-center">
                            <Filter className="w-4 h-4" /> Filtros
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm whitespace-nowrap">
                        <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-200">
                            <tr>
                                <th className="px-6 py-4">Nombre del Link</th>
                                <th className="px-6 py-4">URL de Tracking</th>
                                <th className="px-6 py-4 text-center">Clicks</th>
                                <th className="px-6 py-4 text-center">Conversiones</th>
                                <th className="px-6 py-4">Estado</th>
                                <th className="px-6 py-4 text-right">Acciones</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                            {MOCK_LINKS.map(link => (
                                <tr key={link.id} className="hover:bg-slate-50/80 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="font-bold text-slate-800">{link.name}</div>
                                        <div className="text-xs text-slate-400 mt-0.5">Creado: {link.date}</div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2 max-w-[200px] lg:max-w-sm">
                                            <div className="truncate text-lila font-medium text-xs bg-lila-50 px-3 py-1.5 rounded-md border border-lila/20 flex-1">
                                                {link.url}
                                            </div>
                                            <button
                                                onClick={() => handleCopy(link.id, link.url)}
                                                className="p-1.5 text-slate-400 hover:text-lila hover:bg-lila-50 rounded-md transition-colors"
                                                title="Copiar URL"
                                            >
                                                {copiedId === link.id ? <Check className="w-4 h-4 text-emerald-500" /> : <Copy className="w-4 h-4" />}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-center font-bold text-slate-700">{link.clicks.toLocaleString()}</td>
                                    <td className="px-6 py-4 text-center">
                                        <div className="inline-flex px-2.5 py-1 bg-emerald-50 text-emerald-600 font-bold rounded-md">
                                            {link.conversions}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-wider ${link.status === 'Activo' ? 'bg-emerald-50 text-emerald-600' : 'bg-slate-100 text-slate-500'
                                            }`}>
                                            <span className={`w-1.5 h-1.5 rounded-full ${link.status === 'Activo' ? 'bg-emerald-500' : 'bg-slate-400'}`}></span>
                                            {link.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <button className="text-slate-400 hover:text-lila p-1.5 rounded-md hover:bg-lila-50 transition-colors">
                                            <ExternalLink className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Mock) */}
                <div className="p-4 border-t border-slate-200 flex items-center justify-between text-sm text-slate-500 bg-slate-50/50">
                    <div>Mostrando 1 a 4 de 12 links</div>
                    <div className="flex items-center gap-2">
                        <button className="px-3 py-1 border border-slate-200 bg-white rounded-md text-slate-400 cursor-not-allowed">Anterior</button>
                        <button className="px-3 py-1 bg-lila text-white rounded-md font-medium shadow-sm">1</button>
                        <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50 text-slate-700">2</button>
                        <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50 text-slate-700">3</button>
                        <button className="px-3 py-1 border border-slate-200 bg-white rounded-md hover:bg-slate-50 text-slate-700">Siguiente</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
