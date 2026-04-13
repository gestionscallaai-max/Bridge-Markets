"use client";

import React, { createContext, useContext, useState } from 'react';
import { LayoutDashboard, FileBarChart, Megaphone, Headphones, ChevronDown, ChevronRight, Bell, Settings, LogOut, Sparkles, Search, Menu, X } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';

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
    const router = useRouter();
    const [isAdmin, setIsAdmin] = useState(false);
    const [partnerId, setPartnerId] = useState('Cargando...');
    const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
    // Auto-open accordions based on the current path
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => ({
        'Informes': !!(pathname?.startsWith('/dashboard/reports')),
        'Promo': !!(pathname?.startsWith('/dashboard/promo') || pathname?.startsWith('/dashboard/landing')),
    }));

    React.useEffect(() => {
        supabase.auth.getUser().then(({ data: { user } }) => {
            if (user) {
                // Generamos un "ID de afiliado" corto apartir del UUID real para mostrarlo de forma estética
                setPartnerId('BM_' + user.id.substring(0, 8).toUpperCase());
            }
        });
    }, []);

    // Re-open accordion when navigating directly via URL
    React.useEffect(() => {
        setOpenMenus(prev => ({
            ...prev,
            'Informes': pathname?.startsWith('/dashboard/reports') ?? false,
            'Promo': (pathname?.startsWith('/dashboard/landing') || pathname?.startsWith('/dashboard/promo')) ?? false,
        }));
    }, [pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const toggleMenu = (menuLabel: string) => {
        setOpenMenus(prev => ({ ...prev, [menuLabel]: !prev[menuLabel] }));
    };

    const menuStructure = [
        { href: '/dashboard/overview', label: 'Panel de control', icon: LayoutDashboard, isSubmenu: false },
        {
            label: 'Informes', icon: FileBarChart, isSubmenu: true,
            children: [
                { href: '/dashboard/reports/clients', label: 'Clientes' },
                { href: '/dashboard/reports/accounts', label: 'Cuentas del cliente' },
                { href: '/dashboard/reports/stats', label: 'Estadísticas de rendimiento' },
            ]
        },
        {
            label: 'Promo', icon: Megaphone, isSubmenu: true,
            children: [
                { href: '/dashboard/promo/overview', label: 'Materiales promocionales' }, 
                { href: '/dashboard/landing', label: 'Herramientas de registro' },
                { href: '/dashboard/links', label: 'Links de Referido' },
                { href: '/dashboard/promo/guidelines', label: 'Directrices publicitarias' },
            ]
        },
        { href: '/dashboard/support', label: 'Asistencia', icon: Headphones, isSubmenu: false },
        { href: '/dashboard/settings', label: 'Configuración', icon: Settings, isSubmenu: false },
    ];

    const getPageTitle = () => {
        if (pathname === '/dashboard/overview') return { main: 'Panel', accent: 'de Control' };
        if (pathname?.startsWith('/dashboard/reports/clients')) return { main: 'Informes /', accent: 'Clientes' };
        if (pathname?.startsWith('/dashboard/reports/accounts')) return { main: 'Informes /', accent: 'Cuentas del Cliente' };
        if (pathname?.startsWith('/dashboard/reports/stats')) return { main: 'Informes /', accent: 'Estadísticas' };
        if (pathname?.startsWith('/dashboard/settings')) return { main: 'Configuración', accent: 'de Cuenta' };
        if (pathname?.startsWith('/dashboard/support')) return { main: 'Centro', accent: 'de Asistencia' };
        if (pathname?.startsWith('/dashboard/promo/guidelines')) return { main: 'Directrices', accent: 'Publicitarias' };
        if (pathname?.startsWith('/dashboard/links')) return { main: 'Links', accent: 'de Referido' };
        if (pathname?.startsWith('/dashboard/promo/overview')) return { main: 'Materiales', accent: 'Promocionales' };
        if (pathname?.startsWith('/dashboard/landing')) return { main: 'Generador de', accent: 'Landing Pages' };
        return { main: isAdmin ? 'Panel' : 'Dashboard', accent: isAdmin ? 'Administrador' : 'Overview' };
    };

    const title = getPageTitle();

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <div className="flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden">

                {/* ─── Sidebar ─── Premium Glassmorphism Dark */}
                <aside className="w-[260px] flex flex-col shrink-0 relative overflow-hidden">
                    {/* Background layers */}
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d0221] via-[#140633] to-[#0d0221]" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{
                        backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)',
                        backgroundSize: '20px 20px'
                    }} />
                    {/* Glow orbs */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#865BFF]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 left-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />

                    {/* Logo area */}
                    <div className="relative z-10 flex items-center gap-3 px-6 h-[72px]">
                        <div className="relative">
                            <img src="/images/logo.png" alt="Bridge Markets" className="h-9 object-contain" />
                        </div>
                    </div>

                    {/* Separator */}
                    <div className="relative z-10 mx-5">
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* Navigation */}
                    <div className="relative z-10 flex-1 overflow-y-auto py-5 px-3" style={{ scrollbarWidth: 'none' }}>
                        <nav className="space-y-0.5">
                            {menuStructure.map((item) => {
                                const Icon = item.icon;

                                if (item.isSubmenu) {
                                    const isOpen = openMenus[item.label];
                                    const hasActiveChild = item.children?.some(child => pathname === child.href || pathname.startsWith(child.href + '/'));
                                    
                                    return (
                                        <div key={item.label} className="mb-0.5">
                                            <button
                                                onClick={() => toggleMenu(item.label)}
                                                className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                                                    hasActiveChild
                                                        ? 'bg-[#865BFF]/10 text-white'
                                                        : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
                                                }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                                        hasActiveChild 
                                                            ? 'bg-[#865BFF]/20 text-[#865BFF]' 
                                                            : 'bg-white/[0.04] text-white/40 group-hover:bg-white/[0.06] group-hover:text-white/60'
                                                    }`}>
                                                        <Icon className="w-[16px] h-[16px]" />
                                                    </div>
                                                    <span>{item.label}</span>
                                                </div>
                                                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-200 ${
                                                    isOpen ? 'rotate-180 text-white/60' : 'text-white/20 group-hover:text-white/40'
                                                }`} />
                                            </button>
                                            
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="ml-[22px] pl-4 py-1.5 flex flex-col gap-0.5 border-l border-white/[0.06]">
                                                            {item.children?.map(child => {
                                                                const isChildActive = pathname === child.href || (child.href !== '/dashboard' && pathname.startsWith(child.href));
                                                                return (
                                                                    <Link
                                                                        key={child.href}
                                                                        href={child.href}
                                                                        className={`relative block text-[13px] py-2 px-3 rounded-lg transition-all duration-150 ${
                                                                            isChildActive 
                                                                                ? 'text-white font-semibold bg-[#865BFF]/10' 
                                                                                : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'
                                                                        }`}
                                                                    >
                                                                        {isChildActive && (
                                                                            <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#865BFF] shadow-[0_0_8px_rgba(134,91,255,0.6)]" />
                                                                        )}
                                                                        {child.label}
                                                                    </Link>
                                                                );
                                                            })}
                                                        </div>
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>
                                    );
                                }

                                const isActive = pathname === item.href;
                                return (
                                    <Link
                                        key={item.href}
                                        href={item.href!}
                                        className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${
                                            isActive
                                                ? 'bg-gradient-to-r from-[#865BFF]/15 to-[#865BFF]/5 text-white'
                                                : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'
                                        }`}
                                    >
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${
                                            isActive 
                                                ? 'bg-[#865BFF]/20 text-[#865BFF]'
                                                : 'bg-white/[0.04] text-white/40 group-hover:bg-white/[0.06] group-hover:text-white/60'
                                        }`}>
                                            <Icon className="w-[16px] h-[16px]" />
                                        </div>
                                        <span>{item.label}</span>
                                        {isActive && (
                                            <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#865BFF] shadow-[0_0_8px_rgba(134,91,255,0.6)]" />
                                        )}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    {/* Bottom section — separator */}
                    <div className="relative z-10 mx-5">
                        <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                    </div>

                    {/* User Card - Bottom */}
                    <div className="relative z-10 px-4 py-4">
                        <div className={`rounded-2xl p-4 transition-all duration-300 ${
                            isAdmin 
                                ? 'bg-slate-800/50 border border-slate-700/50' 
                                : 'bg-gradient-to-br from-[#865BFF]/10 to-[#865BFF]/5 border border-[#865BFF]/15'
                        }`}>
                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-black shadow-lg ${
                                    isAdmin ? 'bg-slate-700' : 'bg-gradient-to-br from-[#865BFF] to-[#6635de] shadow-[#865BFF]/20'
                                }`}>
                                    {isAdmin ? 'AD' : 'JP'}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                                        {isAdmin ? 'Admin ID' : 'Partner ID'}
                                    </div>
                                    <div className="text-[13px] font-bold text-white tracking-wide truncate">
                                        {isAdmin ? 'ADMIN_ROOT' : partnerId}
                                    </div>
                                </div>
                            </div>
                            <button 
                                onClick={handleLogout} 
                                className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold text-white/40 hover:text-white hover:bg-white/[0.06] transition-all"
                            >
                                <LogOut className="w-3.5 h-3.5" />
                                Cerrar Sesión
                            </button>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">

                    {/* ─── Header / Topbar ─── Premium Frosted */}
                    <header className="flex items-center justify-between px-8 h-[64px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shrink-0 relative">
                        {/* Subtle gradient accent line on top */}
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#865BFF]/40 to-transparent" />

                        {/* Title */}
                        <div className="flex items-center gap-4">
                            <div>
                                <h1 className="text-lg font-black tracking-tight text-slate-800 leading-tight">
                                    {title.main}{' '}
                                    <span className="bg-gradient-to-r from-[#865BFF] to-[#6635de] bg-clip-text text-transparent font-black">{title.accent}</span>
                                </h1>
                            </div>
                        </div>

                        {/* Right side actions */}
                        <div className="flex items-center gap-2.5">
                            {/* Admin Toggle */}
                            <button
                                onClick={() => setIsAdmin(!isAdmin)}
                                className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-[11px] font-bold transition-all ${isAdmin
                                    ? 'bg-slate-800 text-white shadow-md hover:bg-slate-700'
                                    : 'bg-slate-100 text-slate-500 hover:bg-slate-200 hover:text-slate-700'
                                }`}
                            >
                                <Sparkles className="w-3.5 h-3.5" />
                                {isAdmin ? '← Partner View' : 'Admin View'}
                            </button>

                            {/* Divider */}
                            <div className="h-6 w-px bg-slate-200" />

                            {/* Language Switcher */}
                            <div className="flex items-center bg-slate-100 rounded-xl p-0.5">
                                {['ES', 'EN', 'PT'].map((lang) => (
                                    <button
                                        key={lang}
                                        className={`px-3 py-1.5 text-[11px] font-bold rounded-lg transition-all ${lang === 'ES'
                                            ? 'bg-white text-slate-800 shadow-sm'
                                            : 'text-slate-400 hover:text-slate-600'
                                        }`}
                                    >
                                        {lang}
                                    </button>
                                ))}
                            </div>

                            {/* Notifications */}
                            <button className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all">
                                <Bell className="w-4 h-4" />
                                <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 bg-[#865BFF] rounded-full border-2 border-white" />
                            </button>

                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-black ring-2 ring-offset-2 ring-offset-white transition-all ${
                                isAdmin ? 'bg-slate-700 ring-slate-300' : 'bg-gradient-to-br from-[#865BFF] to-[#6635de] ring-[#865BFF]/30'
                            }`}>
                                {isAdmin ? 'AD' : 'JP'}
                            </div>
                        </div>
                    </header>

                    {/* Page Content */}
                    <div className="flex-1 overflow-y-auto w-full scroll-smooth bg-[#f8fafc]">
                        <motion.div 
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="px-8 py-6 max-w-[1400px] mx-auto w-full"
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </AdminContext.Provider>
    );
}
