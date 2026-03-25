"use client";

import React, { createContext, useContext, useState } from 'react';
import { Home, Pencil, Link2, Users, Globe, ChevronRight, Bell, Settings } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

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
        { href: '/dashboard', label: 'Piezas Gráficas', icon: Pencil, exact: true },
        { href: '/dashboard/links', label: 'Mis Links', icon: Link2, exact: false },
        { href: '/dashboard/landing', label: 'Landing Pages', icon: Globe, exact: false },
    ];

    const reportItems = [
        { href: '/dashboard/users', label: 'Usuarios Registrados', icon: Users, exact: false },
    ];

    const getPageTitle = () => {
        if (pathname === '/dashboard/overview') return { main: isAdmin ? 'Panel' : 'Dashboard', accent: isAdmin ? 'Administrador' : 'Overview' };
        if (pathname === '/dashboard') return { main: 'Piezas', accent: 'Gráficas' };
        if (pathname?.startsWith('/dashboard/links')) return { main: 'Tracking', accent: 'Links' };
        if (pathname?.startsWith('/dashboard/landing')) return { main: 'Landing', accent: 'Pages' };
        if (pathname?.startsWith('/dashboard/users')) return { main: 'Usuarios', accent: 'Registrados' };
        return { main: isAdmin ? 'Panel' : 'Visión', accent: isAdmin ? 'Administrador' : 'General' };
    };

    const title = getPageTitle();

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <div className="flex h-screen bg-[#f1f5f9] text-slate-800 overflow-hidden">

                {/* Sidebar — Dark Navy Enterprise */}
                <aside className="w-[260px] bg-[#140633] flex flex-col shrink-0 shadow-sidebar">
                    {/* Logo */}
                    <div className="flex items-center px-5 h-[72px] border-b border-white/[0.06]">
                        <img src="/images/logo.png" alt="Bridge Markets" className="h-10 object-contain" />
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-4">
                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 px-3 mb-3">Principal</div>
                        <nav className="space-y-0.5">
                            {navItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = item.exact ? pathname === item.href : pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${isActive
                                            ? 'bg-brand-500/10 text-brand-light border-l-2 border-brand-light ml-0 pl-[10px]'
                                            : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                            }`}
                                    >
                                        <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-brand-light' : 'text-slate-500'}`} />
                                        {item.label}
                                        {isActive && <ChevronRight className="w-3.5 h-3.5 ml-auto text-brand-light/60" />}
                                    </Link>
                                );
                            })}
                        </nav>

                        <div className="text-[10px] font-semibold uppercase tracking-[0.15em] text-slate-500 px-3 mb-3 mt-8">Reportes</div>
                        <nav className="space-y-0.5">
                            {reportItems.map((item) => {
                                const Icon = item.icon;
                                const isActive = pathname.startsWith(item.href);
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-[13px] font-medium transition-all duration-150 ${isActive
                                            ? 'bg-brand-500/10 text-brand-light border-l-2 border-brand-light ml-0 pl-[10px]'
                                            : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                            }`}
                                    >
                                        <Icon className={`w-[18px] h-[18px] ${isActive ? 'text-brand-light' : 'text-slate-500'}`} />
                                        {item.label}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* User Card Bottom */}
                    <div className="px-4 pb-5">
                        <div className={`rounded-lg p-4 transition-colors duration-200 ${isAdmin ? 'bg-slate-800 border border-slate-700' : 'bg-brand-dark/20 border border-brand-500/20'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{isAdmin ? 'Admin ID' : 'Partner ID'}</span>
                                <Link href="/" className="text-[10px] font-medium text-slate-500 hover:text-slate-300 transition-colors">
                                    Cerrar Sesión
                                </Link>
                            </div>
                            <div className="text-sm font-bold text-white tracking-wide">{isAdmin ? 'ADMIN_ROOT' : 'BM_10940382'}</div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">

                    {/* Topbar — Clean Enterprise */}
                    <header className="flex items-center justify-between px-8 h-[72px] bg-white border-b border-slate-200 shrink-0">
                        <div>
                            <h1 className="text-xl font-bold tracking-tight text-slate-800">
                                {title.main}{' '}
                                <span className="text-brand-500 font-semibold">{title.accent}</span>
                            </h1>
                        </div>

                        <div className="flex items-center gap-3">
                            <button
                                onClick={() => setIsAdmin(!isAdmin)}
                                className={`px-4 py-1.5 rounded-lg text-xs font-semibold transition-all border ${isAdmin
                                    ? 'bg-slate-800 text-white border-slate-700 hover:bg-slate-700'
                                    : 'bg-brand-50 text-brand-dark border-brand-200 hover:bg-brand-100'
                                    }`}
                            >
                                {isAdmin ? '← Partner View' : 'Admin View'}
                            </button>

                            <div className="h-6 w-px bg-slate-200"></div>

                            <div className="flex items-center bg-slate-50 rounded-lg border border-slate-200 p-0.5">
                                {['ES', 'EN', 'PT'].map((lang) => (
                                    <button
                                        key={lang}
                                        className={`px-3 py-1 text-[11px] font-semibold rounded-md transition-all ${lang === 'ES'
                                            ? 'bg-white text-slate-800 shadow-sm border border-slate-200'
                                            : 'text-slate-400 hover:text-slate-600'
                                            }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            <button className="w-9 h-9 rounded-lg border border-slate-200 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-50 transition-all">
                                <Bell className="w-4 h-4" />
                            </button>

                            <div className={`w-9 h-9 rounded-lg flex items-center justify-center text-white text-[12px] font-bold transition-all ${isAdmin ? 'bg-slate-800' : 'bg-brand-500'}`}>
                                {isAdmin ? 'AD' : 'JP'}
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="flex-1 overflow-y-auto w-full scroll-smooth">
                        <div className="p-8 max-w-[1400px] mx-auto w-full">
                            {children}
                        </div>
                    </div>
                </main>
            </div>
        </AdminContext.Provider>
    );
}
