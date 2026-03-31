"use client";

import React, { createContext, useContext, useState } from 'react';
import { LayoutDashboard, FileBarChart, Percent, Megaphone, Headphones, ChevronDown, ChevronRight, Bell, Wallet, Settings } from 'lucide-react';
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
    // Auto-open accordions based on the current path
    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => ({
        'Informes': !!(pathname?.startsWith('/dashboard/reports')),
        'Promo': !!(pathname?.startsWith('/dashboard/promo') || pathname === '/dashboard' || pathname?.startsWith('/dashboard/landing')),
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
            'Promo': (pathname === '/dashboard' || pathname?.startsWith('/dashboard/landing') || pathname?.startsWith('/dashboard/promo')) ?? false,
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
                { href: '/dashboard/reports/rewards', label: 'Historial de recompensas' },
                { href: '/dashboard/reports/transactions', label: 'Transacciones' },
                { href: '/dashboard/reports/pending-transactions', label: 'Transacciones pendientes de pago' },
                { href: '/dashboard/reports/stats', label: 'Estadísticas de rendimiento' },
            ]
        },
        { href: '/dashboard/rebates', label: 'Reembolsos', icon: Percent, isSubmenu: false },
        { href: '/dashboard/balance', label: 'Saldo de Cuenta', icon: Wallet, isSubmenu: false },
        {
            label: 'Promo', icon: Megaphone, isSubmenu: true,
            children: [
                { href: '/dashboard', label: 'Materiales promocionales' }, 
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
        if (pathname?.startsWith('/dashboard/reports/rewards')) return { main: 'Informes /', accent: 'Historial de Recompensas' };
        if (pathname?.startsWith('/dashboard/reports/pending-transactions')) return { main: 'Informes /', accent: 'Pendientes de Pago' };
        if (pathname?.startsWith('/dashboard/reports/transactions')) return { main: 'Informes /', accent: 'Transacciones' };
        if (pathname?.startsWith('/dashboard/reports/stats')) return { main: 'Informes /', accent: 'Estadísticas' };
        if (pathname?.startsWith('/dashboard/rebates')) return { main: 'Mis', accent: 'Reembolsos' };
        if (pathname?.startsWith('/dashboard/balance')) return { main: 'Saldo', accent: 'de Cuenta' };
        if (pathname?.startsWith('/dashboard/settings')) return { main: 'Configuración', accent: 'de Cuenta' };
        if (pathname?.startsWith('/dashboard/support')) return { main: 'Centro', accent: 'de Asistencia' };
        if (pathname?.startsWith('/dashboard/promo/guidelines')) return { main: 'Directrices', accent: 'Publicitarias' };
        if (pathname?.startsWith('/dashboard/links')) return { main: 'Links', accent: 'de Referido' };
        if (pathname === '/dashboard') return { main: 'Materiales', accent: 'Promocionales' };
        if (pathname?.startsWith('/dashboard/landing')) return { main: 'Herramientas', accent: 'de Registro' };
        return { main: isAdmin ? 'Panel' : 'Dashboard', accent: isAdmin ? 'Administrador' : 'Overview' };
    };

    const title = getPageTitle();

    return (
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <div className="flex h-screen bg-[#f1f5f9] text-slate-800 overflow-hidden">

                {/* Sidebar — Dark Navy Enterprise */}
                <aside className="w-[280px] bg-[#140633] flex flex-col shrink-0 shadow-sidebar">
                    {/* Logo */}
                    <div className="flex items-center px-5 h-[72px] border-b border-white/[0.06]">
                        <img src="/images/logo.png" alt="Bridge Markets" className="h-10 object-contain" />
                    </div>

                    {/* Navigation */}
                    <div className="flex-1 overflow-y-auto py-6 px-3">
                        <nav className="space-y-1">
                            {menuStructure.map((item) => {
                                const Icon = item.icon;

                                if (item.isSubmenu) {
                                    const isOpen = openMenus[item.label];
                                    const hasActiveChild = item.children?.some(child => pathname === child.href || pathname.startsWith(child.href + '/'));
                                    
                                    return (
                                        <div key={item.label} className="mb-1">
                                            <button
                                                onClick={() => toggleMenu(item.label)}
                                                className={`w-full flex items-center justify-between px-3 py-3 rounded-lg text-[13px] font-medium transition-all duration-150 ${hasActiveChild && !isOpen
                                                    ? 'bg-brand-500/10 text-brand-light'
                                                    : 'text-slate-400 hover:bg-white/[0.04] hover:text-slate-200'
                                                    }`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <Icon className={`w-[18px] h-[18px] ${hasActiveChild ? 'text-brand-light' : 'text-slate-500'}`} />
                                                    {item.label}
                                                </div>
                                                <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180 text-white' : 'text-slate-500'}`} />
                                            </button>
                                            
                                            <AnimatePresence initial={false}>
                                                {isOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: 'auto', opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        transition={{ duration: 0.2 }}
                                                        className="overflow-hidden"
                                                    >
                                                        <div className="pl-11 pr-3 py-2 flex flex-col gap-1.5 border-l border-white/5 ml-5 mt-1">
                                                            {item.children?.map(child => {
                                                                const isChildActive = pathname === child.href || (child.href !== '/dashboard' && pathname.startsWith(child.href));
                                                                return (
                                                                    <Link
                                                                        key={child.href}
                                                                        href={child.href}
                                                                        className={`block text-[13px] py-1.5 transition-colors ${
                                                                            isChildActive 
                                                                            ? 'text-brand-light font-semibold relative before:absolute before:content-[\'\'] before:-left-[17px] before:top-1/2 before:-translate-y-1/2 before:w-1.5 before:h-1.5 before:rounded-full before:bg-brand-500' 
                                                                            : 'text-slate-400 hover:text-slate-200'
                                                                        }`}
                                                                    >
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
                                        className={`flex items-center gap-3 px-3 py-3 rounded-lg text-[13px] font-medium transition-all duration-150 ${isActive
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
                    </div>

                    {/* User Card Bottom */}
                    <div className="px-4 pb-5">
                        <div className={`rounded-xl p-4 transition-colors duration-200 ${isAdmin ? 'bg-slate-800 border border-slate-700' : 'bg-brand-dark/20 border border-brand-500/20'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-400">{isAdmin ? 'Admin ID' : 'Partner ID'}</span>
                                <button onClick={handleLogout} className="text-[10px] font-medium text-slate-500 hover:text-slate-300 transition-colors">
                                    Cerrar Sesión
                                </button>
                            </div>
                            <div className="text-sm font-bold text-white tracking-wide">{isAdmin ? 'ADMIN_ROOT' : partnerId}</div>
                        </div>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">

                    {/* Topbar — Clean Enterprise */}
                    <header className="flex items-center justify-between px-8 h-[72px] bg-white border-b border-slate-200 shrink-0 shadow-sm">
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
