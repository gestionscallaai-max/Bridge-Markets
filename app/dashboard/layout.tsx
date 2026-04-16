"use client";

import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { LayoutDashboard, FileBarChart, Megaphone, Headphones, ChevronDown, ChevronRight, Bell, Settings, LogOut, Sparkles, Menu, X, Shield, Globe, Eye } from 'lucide-react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import { LanguageProvider, useLanguage, type LangCode } from '@/lib/i18n/context';
import { LANGUAGE_META } from '@/lib/i18n/translations';

import { AdminContext, RoleContext } from '@/lib/context';

// ─── Language Selector Dropdown ──────────────────────────────
function LanguageSelector() {
    const { lang, setLang, availableLanguages } = useLanguage();
    const [open, setOpen] = useState(false);
    const [pos, setPos] = useState({ top: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => { setMounted(true); }, []);

    // Close on outside click (delayed so open-click doesn't immediately close)
    useEffect(() => {
        if (!open) return;
        const id = setTimeout(() => {
            function handleClick(e: MouseEvent) {
                if (triggerRef.current && !triggerRef.current.contains(e.target as Node)) {
                    setOpen(false);
                }
            }
            document.addEventListener('mousedown', handleClick);
            return () => document.removeEventListener('mousedown', handleClick);
        }, 0);
        return () => clearTimeout(id);
    }, [open]);

    // Close on scroll
    useEffect(() => {
        if (!open) return;
        const close = () => setOpen(false);
        window.addEventListener('scroll', close, true);
        return () => window.removeEventListener('scroll', close, true);
    }, [open]);

    const handleOpen = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPos({ top: rect.bottom + 6 });
        }
        setOpen(v => !v);
    };

    const current = availableLanguages[lang];

    // ↓↓↓ PORTAL: renders directly into document.body — escapes ALL stacking contexts
    const dropdownMarkup = (
        <AnimatePresence>
            {open && (
                <motion.div
                    key="lang-dropdown"
                    initial={{ opacity: 0, y: -6, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -6, scale: 0.97 }}
                    transition={{ duration: 0.13 }}
                    style={{
                        position: 'fixed',
                        top: pos.top,
                        right: 16,
                        width: 220,
                        maxHeight: 'min(440px, 70vh)',
                        zIndex: 2147483647,
                        pointerEvents: 'auto',
                    }}
                    className="bg-white rounded-2xl shadow-2xl border border-slate-200 py-2 overflow-y-auto"
                >
                    {(Object.entries(availableLanguages) as [LangCode, typeof LANGUAGE_META[LangCode]][]).map(([code, meta]) => (
                        <button
                            key={code}
                            onClick={() => { setLang(code); setOpen(false); }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 text-[12px] font-medium transition-colors text-left hover:bg-violet-50
                                ${code === lang ? 'bg-violet-50 text-[#865BFF] font-bold' : 'text-slate-700'}`}
                        >
                            <span className="text-lg leading-none flex-shrink-0">{meta.flag}</span>
                            <span className="flex-1">{meta.nativeLabel}</span>
                            {code === lang && <span className="w-1.5 h-1.5 rounded-full bg-[#865BFF] flex-shrink-0" />}
                        </button>
                    ))}
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button
                ref={triggerRef}
                onClick={handleOpen}
                className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 hover:text-slate-800 transition-all text-[11px] font-bold"
            >
                <span className="text-base leading-none">{current.flag}</span>
                <span className="hidden md:inline">{current.nativeLabel}</span>
                <ChevronDown className={`w-3 h-3 transition-transform ${open ? 'rotate-180' : ''}`} />
            </button>

            {/* Portal renders dropdown directly into <body> — no stacking context can trap it */}
            {mounted && createPortal(dropdownMarkup, document.body)}
        </>
    );
}

// ─── Inner Layout (has access to language context) ───────────
function DashboardInner({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const { t, isRTL } = useLanguage();
    const [isAdmin, setIsAdmin] = useState(false);
    const [userRole, setUserRole] = useState('partner_view');
    const [partnerId, setPartnerId] = useState('...');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    React.useEffect(() => {
        const loadUserData = async () => {
            const { data: { user } } = await supabase.auth.getUser();
            if (user) {
                setPartnerId('BM_' + user.id.substring(0, 8).toUpperCase());
                const { data: profile } = await supabase
                    .from('partners')
                    .select('role')
                    .eq('id', user.id)
                    .single();
                if (profile) {
                    setUserRole(profile.role || 'partner_view');
                    setIsAdmin(profile.role === 'admin');
                }
            }
        };
        loadUserData();
    }, []);

    const [openMenus, setOpenMenus] = useState<Record<string, boolean>>(() => ({
        reports: !!(pathname?.startsWith('/dashboard/reports')),
        promo: !!(pathname?.startsWith('/dashboard/promo') || pathname?.startsWith('/dashboard/landing')),
        admin: !!(pathname?.startsWith('/dashboard/admin')),
    }));

    React.useEffect(() => { setIsMobileMenuOpen(false); }, [pathname]);
    React.useEffect(() => {
        setOpenMenus(prev => ({
            ...prev,
            reports: pathname?.startsWith('/dashboard/reports') ?? false,
            promo: (pathname?.startsWith('/dashboard/landing') || pathname?.startsWith('/dashboard/promo')) ?? false,
        }));
    }, [pathname]);

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/login');
    };

    const toggleMenu = (key: string) => {
        setOpenMenus(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const menuStructure = [
        { href: '/dashboard/overview', label: t.nav.overview, icon: LayoutDashboard, isSubmenu: false, roles: ['admin', 'partner', 'partner_view'] },
        {
            key: 'reports', label: t.nav.reports, icon: FileBarChart, isSubmenu: true, roles: ['admin', 'partner', 'partner_view'],
            children: [
                { href: '/dashboard/reports/clients', label: t.nav.clients },
                { href: '/dashboard/reports/accounts', label: t.nav.accounts },
                { href: '/dashboard/reports/stats', label: t.nav.stats },
            ]
        },
        {
            key: 'promo', label: t.nav.promo, icon: Megaphone, isSubmenu: true, roles: ['admin', 'partner', 'partner_view'],
            children: [
                { href: '/dashboard/promo/overview', label: t.nav.materialPost },
                { href: '/dashboard/landing', label: t.nav.landingTools },
                { href: '/dashboard/links', label: t.nav.referralLinks },
                { href: '/dashboard/promo/guidelines', label: t.nav.guidelines },
            ]
        },
        { href: '/dashboard/support', label: t.nav.support, icon: Headphones, isSubmenu: false, roles: ['admin', 'partner', 'partner_view'] },
        {
            key: 'admin', label: t.nav.admin, icon: Shield, isSubmenu: true, roles: ['admin'],
            children: [
                { href: '/dashboard/admin/partners', label: t.nav.partnerManagement },
                { href: '/dashboard/admin/settings', label: t.nav.globalSettings },
            ]
        },
        { href: '/dashboard/settings', label: t.nav.settings, icon: Settings, isSubmenu: false, roles: ['admin', 'partner', 'partner_view'] },
    ];

    const filteredMenu = menuStructure.filter(item => item.roles.includes(userRole));

    const getPageTitle = () => {
        if (pathname === '/dashboard/overview') return { main: t.overview.title, accent: t.overview.subtitle };
        if (pathname?.startsWith('/dashboard/reports/clients')) return { main: t.nav.reports + ' /', accent: t.nav.clients };
        if (pathname?.startsWith('/dashboard/reports/accounts')) return { main: t.nav.reports + ' /', accent: t.nav.accounts };
        if (pathname?.startsWith('/dashboard/reports/stats')) return { main: t.nav.reports + ' /', accent: t.nav.stats };
        if (pathname?.startsWith('/dashboard/settings')) return { main: t.nav.settings, accent: '' };
        if (pathname?.startsWith('/dashboard/support')) return { main: t.nav.support, accent: '' };
        if (pathname?.startsWith('/dashboard/landing')) return { main: t.landing.title, accent: t.landing.subtitle };
        if (pathname?.startsWith('/dashboard/promo/overview')) return { main: t.nav.promo, accent: t.nav.materialPost };
        if (pathname?.startsWith('/dashboard/links')) return { main: t.nav.referralLinks, accent: '' };
        if (pathname?.startsWith('/dashboard/admin/partners')) return { main: t.nav.admin, accent: t.nav.partnerManagement };
        return { main: isAdmin ? t.overview.adminPanel : 'Dashboard', accent: '' };
    };

    const title = getPageTitle();

    return (
        <RoleContext.Provider value={{ userRole }}>
        <AdminContext.Provider value={{ isAdmin, setIsAdmin }}>
            <div className={`flex h-screen bg-[#f8fafc] text-slate-800 overflow-hidden relative ${isRTL ? 'flex-row-reverse' : ''}`}>

                {/* Mobile Backdrop */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className="fixed inset-0 bg-[#0d0221]/60 backdrop-blur-sm z-40 lg:hidden"
                        />
                    )}
                </AnimatePresence>

                {/* ─── Sidebar ─── */}
                <aside className={`
                    fixed inset-y-0 ${isRTL ? 'right-0' : 'left-0'} w-[280px] z-50 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex lg:flex-col shrink-0 overflow-hidden
                    ${isMobileMenuOpen ? 'translate-x-0' : (isRTL ? 'translate-x-full' : '-translate-x-full')}
                `}>
                    <div className="absolute inset-0 bg-gradient-to-b from-[#0d0221] via-[#140633] to-[#0d0221]" />
                    <div className="absolute inset-0 opacity-[0.04]" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)', backgroundSize: '20px 20px' }} />
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[300px] h-[200px] bg-[#865BFF]/10 rounded-full blur-[100px]" />
                    <div className="absolute bottom-20 left-0 w-[200px] h-[200px] bg-indigo-500/5 rounded-full blur-[80px]" />

                    {/* Logo */}
                    <div className="relative z-10 flex items-center justify-between px-6 h-[72px]">
                        <img src="/images/logo.png" alt="Bridge Markets" className="h-9 object-contain" />
                        <button onClick={() => setIsMobileMenuOpen(false)} className="lg:hidden text-white/50 hover:text-white">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    <div className="relative z-10 mx-5"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

                    {/* Navigation */}
                    <div className="relative z-10 flex-1 overflow-y-auto py-5 px-3" style={{ scrollbarWidth: 'none' }}>
                        <nav className="space-y-0.5">
                            {filteredMenu.map((item) => {
                                const Icon = item.icon;
                                if (item.isSubmenu) {
                                    const menuKey = (item as any).key || item.label;
                                    const isOpen = openMenus[menuKey];
                                    const hasActiveChild = item.children?.some(child => pathname === child.href || pathname.startsWith(child.href + '/'));
                                    return (
                                        <div key={item.label} className="mb-0.5">
                                            <button
                                                onClick={() => toggleMenu(menuKey)}
                                                className={`group w-full flex items-center justify-between px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${hasActiveChild ? 'bg-[#865BFF]/10 text-white' : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'}`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${hasActiveChild ? 'bg-[#865BFF]/20 text-[#865BFF]' : 'bg-white/[0.04] text-white/40 group-hover:bg-white/[0.06] group-hover:text-white/60'}`}>
                                                        <Icon className="w-[16px] h-[16px]" />
                                                    </div>
                                                    <span>{item.label}</span>
                                                </div>
                                                <ChevronDown className={`w-3.5 h-3.5 transition-all duration-200 ${isOpen ? 'rotate-180 text-white/60' : 'text-white/20 group-hover:text-white/40'}`} />
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
                                                                    <Link key={child.href} href={child.href} className={`relative block text-[13px] py-2 px-3 rounded-lg transition-all duration-150 ${isChildActive ? 'text-white font-semibold bg-[#865BFF]/10' : 'text-white/40 hover:text-white/70 hover:bg-white/[0.03]'}`}>
                                                                        {isChildActive && <span className="absolute -left-[17px] top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-[#865BFF] shadow-[0_0_8px_rgba(134,91,255,0.6)]" />}
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
                                    <Link key={item.href} href={item.href!} className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-[13px] font-medium transition-all duration-200 ${isActive ? 'bg-gradient-to-r from-[#865BFF]/15 to-[#865BFF]/5 text-white' : 'text-white/50 hover:bg-white/[0.04] hover:text-white/80'}`}>
                                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center transition-all ${isActive ? 'bg-[#865BFF]/20 text-[#865BFF]' : 'bg-white/[0.04] text-white/40 group-hover:bg-white/[0.06] group-hover:text-white/60'}`}>
                                            <Icon className="w-[16px] h-[16px]" />
                                        </div>
                                        <span>{item.label}</span>
                                        {isActive && <div className="ml-auto w-1.5 h-1.5 rounded-full bg-[#865BFF] shadow-[0_0_8px_rgba(134,91,255,0.6)]" />}
                                    </Link>
                                );
                            })}
                        </nav>
                    </div>

                    <div className="relative z-10 mx-5"><div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" /></div>

                    {/* User Card */}
                    <div className="relative z-10 px-4 py-4">
                        <div className={`rounded-2xl p-4 transition-all duration-300 ${
                            isAdmin 
                                ? 'bg-amber-500/5 border border-amber-500/20' 
                                : 'bg-gradient-to-br from-[#865BFF]/10 to-[#865BFF]/5 border border-[#865BFF]/15'
                        }`}>
                            {/* Role Badge */}
                            <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[9px] font-black uppercase tracking-widest mb-3 ${
                                isAdmin 
                                    ? 'bg-amber-500/15 text-amber-400 border border-amber-500/20' 
                                    : 'bg-[#865BFF]/15 text-[#a88bff] border border-[#865BFF]/20'
                            }`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${
                                    isAdmin ? 'bg-amber-400' : 'bg-[#865BFF]'
                                } shadow-[0_0_6px_currentColor]`} />
                                <Shield className="w-2.5 h-2.5" />
                                {isAdmin ? 'Administrador' : <><Eye className="w-2.5 h-2.5" /><span>Partner View</span></>}
                            </div>

                            <div className="flex items-center gap-3 mb-3">
                                <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-black shadow-lg ${
                                    isAdmin 
                                        ? 'bg-gradient-to-br from-amber-500 to-amber-600 shadow-amber-500/20' 
                                        : 'bg-gradient-to-br from-[#865BFF] to-[#6635de] shadow-[#865BFF]/20'
                                }`}>
                                    {partnerId.substring(3, 5)}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <div className="text-[10px] font-bold uppercase tracking-widest text-white/30 mb-0.5">
                                        {isAdmin ? 'Admin ID' : 'Partner ID'}
                                    </div>
                                    <div className="text-[12px] font-bold text-white tracking-wide truncate font-mono">
                                        {partnerId}
                                    </div>
                                </div>
                            </div>
                            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 py-2 rounded-xl text-[11px] font-bold text-white/40 hover:text-white hover:bg-white/[0.06] transition-all">
                                <LogOut className="w-3.5 h-3.5" />
                                {t.common.logout}
                            </button>
                        </div>
                    </div>
                </aside>

                {/* ─── Main Content ─── */}
                <main className="flex-1 relative z-10 flex flex-col h-screen overflow-hidden">
                    {/* Topbar */}
                    <header className="flex items-center justify-between px-4 lg:px-8 h-[64px] bg-white/80 backdrop-blur-xl border-b border-slate-200/60 shrink-0 relative">
                        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#865BFF]/40 to-transparent" />

                        <div className="flex items-center gap-3 lg:gap-4">
                            <button onClick={() => setIsMobileMenuOpen(true)} className="lg:hidden w-10 h-10 rounded-xl bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200">
                                <Menu className="w-5 h-5" />
                            </button>
                            <div>
                                <h1 className="text-sm lg:text-lg font-black tracking-tight text-slate-800 leading-tight">
                                    {title.main}{' '}
                                    {title.accent && <span className="bg-gradient-to-r from-[#865BFF] to-[#6635de] bg-clip-text text-transparent font-black">{title.accent}</span>}
                                </h1>
                            </div>
                        </div>

                        <div className="flex items-center gap-1.5 lg:gap-2.5">
                            {/* Language Selector */}
                            <LanguageSelector />

                            <div className="hidden sm:block h-6 w-px bg-slate-200" />

                            {/* Notifications */}
                            <button className="relative w-9 h-9 rounded-xl bg-slate-100 flex items-center justify-center text-slate-400 hover:text-slate-600 hover:bg-slate-200 transition-all">
                                <Bell className="w-4 h-4" />
                                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#865BFF] rounded-full border-2 border-white" />
                            </button>

                            {/* Avatar */}
                            <div className={`w-9 h-9 rounded-xl flex items-center justify-center text-white text-[11px] font-black ring-2 ring-offset-2 ring-offset-white transition-all ${isAdmin ? 'bg-slate-700 ring-slate-300' : 'bg-gradient-to-br from-[#865BFF] to-[#6635de] ring-[#865BFF]/30'}`}>
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
                            className="px-4 lg:px-8 py-6 max-w-[1400px] mx-auto w-full"
                        >
                            {children}
                        </motion.div>
                    </div>
                </main>
            </div>
        </AdminContext.Provider>
        </RoleContext.Provider>
    );
}

// ─── Root Layout (wraps with LanguageProvider) ───────────────
export default function DashboardUILayout({ children }: { children: React.ReactNode }) {
    return (
        <LanguageProvider>
            <DashboardInner>{children}</DashboardInner>
        </LanguageProvider>
    );
}
