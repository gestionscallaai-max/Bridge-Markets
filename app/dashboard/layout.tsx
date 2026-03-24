"use client";

import React, { createContext, useContext, useState } from 'react';
import { Home, Image as ImageIcon, Link2, Users, LogOut, ChevronDown, Globe } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

// Custom context for Admin View toggle demo
export const AdminContext = createContext<{ isAdmin: boolean; setIsAdmin: (val: boolean) => void }>({
    isAdmin: false,
    setIsAdmin: () => { },
});

export const useAdmin = () => useContext(AdminContext);

export default function DashboardUILayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const [isAdmin, setIsAdmin] = useState(false);

    const navItems = [
        { href: '/dashboard/overview', label: 'Dashboard', icon: Home, exact: false },
        { href: '/dashboard', label: 'Materiales', icon: ImageIcon, exact: true },
        { href: '/dashboard/links', label: 'Mis Links', icon: Link2, exact: false },
        { href: '/dashboard/landing', label: 'Landing Pages', icon: Globe, exact: false },
    ];

    const reportItems = [
        { href: '/dashboard/users', label: 'Usuarios Registrados', icon: Users, exact: false },
    ];

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <div className="flex h-screen bg-[#f8fafc] text-slate-800 font-sans overflow-hidden">

                {/* Sidebar */}
                <aside className="w-64 bg-white border-r border-slate-100 flex flex-col z-50 p-6 shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] relative">
                    <div className="flex items-center gap-3 mb-10 px-2 mt-2">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#a855f7] to-[#d8b4fe] rounded-lg flex items-center justify-center text-white font-black text-sm shadow-sm">
                            BM
                        </div>
                        <div className="font-extrabold text-[#1e293b] text-xl tracking-tight">
                            Bridge<span className="text-[#a855f7] font-medium">Markets</span>
                        </div>
                    </div>

                    <div className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] px-3 mb-3 mt-4">Main</div>
                    <nav className="flex-1 space-y-1">
                        {navItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${isActive
                                        ? 'bg-[#f3e8ff] text-[#a855f7]'
                                        : 'text-[#64748b] hover:bg-slate-50 hover:text-slate-800'
                                        }`}
                                >
                                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#a855f7]' : 'text-[#94a3b8]'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}

                        <div className="text-[10px] font-bold uppercase tracking-widest text-[#94a3b8] px-3 mb-3 mt-8">Reportes</div>

                        {reportItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname.startsWith(item.href);
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-[14px] font-semibold transition-all duration-200 ${isActive
                                        ? 'bg-[#f3e8ff] text-[#a855f7]'
                                        : 'text-[#64748b] hover:bg-slate-50 hover:text-slate-800'
                                        }`}
                                >
                                    <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-[#a855f7]' : 'text-[#94a3b8]'}`} />
                                    {item.label}
                                </Link>
                            );
                        })}
                    </nav>

                    {/* Affiliate Info Card Bottom */}
                    <div className={`mt-auto rounded-xl p-4 text-white relative shadow-sm h-24 flex flex-col justify-center transition-colors duration-300 ${isAdmin ? 'bg-slate-800' : 'bg-[#b483fd]'}`}>
                        <div className="flex justify-between items-center mb-1">
                            <div className="text-[10px] uppercase font-bold tracking-wider opacity-90">{isAdmin ? 'Admin ID' : 'User/Partner ID'}</div>
                            <Link href="/" className="text-[10px] font-bold italic opacity-90 hover:opacity-100 flex items-center gap-1 transition-opacity">
                                Cerrar Sesión
                            </Link>
                        </div>
                        <div className="text-[16px] font-bold tracking-wide">{isAdmin ? 'ADMIN_ROOT' : 'BM_10940382'}</div>
                    </div>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">

                    {/* Topbar */}
                    <header className="flex items-center justify-between px-8 lg:px-10 py-5 bg-[#f8fafc] sticky top-0 z-40 shrink-0">
                        <h1 className="text-[24px] font-bold tracking-tight text-slate-800">
                            {isAdmin ? 'Panel Global ' : 'Visión '}
                            <span className="text-[#a855f7] font-semibold">{isAdmin ? 'Administrador' : 'General'}</span>
                        </h1>

                        <div className="flex items-center gap-4">
                            <button
                                onClick={() => setIsAdmin(!isAdmin)}
                                className={`px-4 py-1.5 rounded-full text-xs font-bold transition-colors ${isAdmin ? 'bg-slate-800 text-white hover:bg-slate-700' : 'bg-[#f3e8ff] text-[#a855f7] hover:bg-purple-200'}`}
                            >
                                {isAdmin ? 'Partner View' : 'Admin View'}
                            </button>

                            <div className="flex items-center bg-white rounded-full border border-slate-200 shadow-sm p-1">
                                {['ES', 'EN', 'PT'].map((lang) => (
                                    <button
                                        key={lang}
                                        className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${lang === 'ES' ? 'bg-[#f8fafc] text-slate-800 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-[13px] font-bold shadow-sm cursor-pointer hover:opacity-90 transition-all ${isAdmin ? 'bg-slate-800' : 'bg-[#a855f7]'}`}>
                                {isAdmin ? 'AD' : 'JP'}
                            </div>
                        </div>
                    </header>

                    {/* Scrollable Page Content */}
                    <div className="flex-1 overflow-y-auto w-full scroll-smooth">
                        <div className="p-8 lg:px-10 lg:py-6 max-w-7xl mx-auto w-full">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </AdminContext.Provider>
    );
}
