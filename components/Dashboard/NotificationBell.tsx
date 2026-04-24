import React, { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { Bell, Check, X, Clock, ExternalLink, Trash2, ShieldCheck, AlertCircle, Info, Zap } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { useRole } from '@/lib/context';

interface Notification {
    id: string;
    user_id: string;
    title: string;
    message: string;
    type: 'info' | 'success' | 'warning' | 'error';
    link?: string;
    read: boolean;
    created_at: string;
}

export default function NotificationBell() {
    const { partnerData, loading: roleLoading } = useRole();
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [pos, setPos] = useState({ top: 0, right: 0 });
    const triggerRef = useRef<HTMLButtonElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const unreadCount = notifications.filter(n => !n.read).length;

    useEffect(() => {
        setMounted(true);
        if (!roleLoading && partnerData) {
            fetchNotifications();
        }
        
        // Listen for clicks outside to close dropdown
        const handleClickOutside = (event: MouseEvent) => {
            if (triggerRef.current && !triggerRef.current.contains(event.target as Node) && 
                dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const toggleDropdown = () => {
        if (triggerRef.current) {
            const rect = triggerRef.current.getBoundingClientRect();
            setPos({ 
                top: rect.bottom + 12, 
                right: window.innerWidth - rect.right 
            });
        }
        setIsOpen(!isOpen);
    };

    const fetchNotifications = async () => {
        if (!partnerData?.id) return;

        const { data, error } = await supabase
            .from('notifications')
            .select('*')
            .eq('user_id', partnerData.id)
            .order('created_at', { ascending: false })
            .limit(10);

        if (data) setNotifications(data);
    };

    const markAsRead = async (id: string) => {
        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('id', id);

        if (!error) {
            setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
        }
    };

    const markAllAsRead = async () => {
        if (!partnerData?.id) return;

        const { error } = await supabase
            .from('notifications')
            .update({ read: true })
            .eq('user_id', partnerData.id)
            .eq('read', false);

        if (!error) {
            setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        }
    };

    const deleteNotification = async (id: string, e: React.MouseEvent) => {
        e.stopPropagation();
        const { error } = await supabase
            .from('notifications')
            .delete()
            .eq('id', id);

        if (!error) {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }
    };

    const getTimeAgo = (dateStr: string) => {
        const date = new Date(dateStr);
        const now = new Date();
        const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

        if (diffInSeconds < 60) return 'Ahora';
        if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m`;
        if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h`;
        return `${Math.floor(diffInSeconds / 86400)}d`;
    };

    const getTypeStyles = (type: string) => {
        switch (type) {
            case 'success': return { icon: ShieldCheck, color: 'text-emerald-500', bg: 'bg-emerald-50' };
            case 'error': return { icon: AlertCircle, color: 'text-rose-500', bg: 'bg-rose-50' };
            case 'warning': return { icon: Zap, color: 'text-amber-500', bg: 'bg-amber-50' };
            default: return { icon: Info, color: 'text-blue-500', bg: 'bg-blue-50' };
        }
    };

    const dropdownMarkup = (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    ref={dropdownRef}
                    initial={{ opacity: 0, y: 10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    style={{
                        position: 'fixed',
                        top: pos.top,
                        right: pos.right,
                        width: 'min(380px, 90vw)',
                        zIndex: 2147483647,
                    }}
                    className="bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-200 overflow-hidden"
                >
                    {/* Header */}
                    <div className="px-5 py-4 border-b border-slate-100 bg-slate-50/50 flex items-center justify-between">
                        <div>
                            <h3 className="text-sm font-black text-slate-800 tracking-tight">Notificaciones</h3>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mt-0.5">Tienes {unreadCount} sin leer</p>
                        </div>
                        {unreadCount > 0 && (
                            <button 
                                onClick={markAllAsRead}
                                className="text-[11px] font-bold text-[#865BFF] hover:text-[#6635de] transition-colors bg-[#865BFF]/5 hover:bg-[#865BFF]/10 px-3 py-1.5 rounded-lg"
                            >
                                Marcar todo leído
                            </button>
                        )}
                    </div>

                    {/* Notifications List */}
                    <div className="max-h-[min(400px,60vh)] overflow-y-auto">
                        {notifications.length > 0 ? (
                            <div className="divide-y divide-slate-50">
                                {notifications.map((n) => {
                                    const { icon: TypeIcon, color, bg } = getTypeStyles(n.type);
                                    return (
                                        <div
                                            key={n.id}
                                            onClick={() => markAsRead(n.id)}
                                            className={`group relative px-5 py-4 hover:bg-slate-50 transition-all cursor-pointer ${!n.read ? 'bg-[#865BFF]/[0.02]' : ''}`}
                                        >
                                            <div className="flex gap-4">
                                                <div className={`w-10 h-10 rounded-xl ${bg} ${color} flex-shrink-0 flex items-center justify-center`}>
                                                    <TypeIcon className="w-5 h-5" />
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center justify-between mb-0.5">
                                                        <h4 className={`text-[13px] font-bold truncate ${!n.read ? 'text-slate-900' : 'text-slate-600'}`}>
                                                            {n.title}
                                                        </h4>
                                                        <span className="text-[10px] font-medium text-slate-400 flex items-center gap-1">
                                                            <Clock className="w-2.5 h-2.5" />
                                                            {getTimeAgo(n.created_at)}
                                                        </span>
                                                    </div>
                                                    <p className="text-[12px] text-slate-500 leading-relaxed line-clamp-2">
                                                        {n.message}
                                                    </p>
                                                    
                                                    {n.link && (
                                                        <Link 
                                                            href={n.link}
                                                            className="inline-flex items-center gap-1 mt-2 text-[10px] font-bold text-[#865BFF] hover:underline"
                                                            onClick={(e) => e.stopPropagation()}
                                                        >
                                                            Ver detalles <ExternalLink className="w-2.5 h-2.5" />
                                                        </Link>
                                                    )}
                                                </div>
                                            </div>

                                            {/* Hidden buttons visible on hover */}
                                            <div className="absolute right-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col gap-1">
                                                <button 
                                                    onClick={(e) => deleteNotification(n.id, e)}
                                                    className="p-1.5 rounded-lg bg-white border border-slate-200 text-slate-400 hover:text-rose-500 hover:border-rose-200 shadow-sm"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>
                                            </div>

                                            {!n.read && (
                                                <div className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-8 bg-[#865BFF] rounded-r-full" />
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="py-20 flex flex-col items-center justify-center text-center px-10">
                                <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center mb-4">
                                    <Bell className="w-8 h-8 text-slate-200" />
                                </div>
                                <h4 className="text-sm font-bold text-slate-800 mb-1">Sin notificaciones</h4>
                                <p className="text-[11px] text-slate-400 leading-relaxed">Te avisaremos cuando haya novedades en tu panel de socios.</p>
                            </div>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="px-5 py-3 border-t border-slate-100 bg-slate-50/50 text-center">
                        <button className="text-[11px] font-black text-slate-400 uppercase tracking-widest hover:text-[#865BFF] transition-colors">
                            Ver todo el historial
                        </button>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );

    return (
        <>
            <button
                ref={triggerRef}
                onClick={toggleDropdown}
                className={`relative w-9 h-9 rounded-xl flex items-center justify-center transition-all ${
                    isOpen ? 'bg-[#865BFF] text-white' : 'bg-slate-100 text-slate-400 hover:text-slate-600 hover:bg-slate-200'
                }`}
            >
                <Bell className={`w-4 h-4 ${unreadCount > 0 && !isOpen ? 'animate-[bell-ring_1.5s_infinite_ease-in-out]' : ''}`} />
                {unreadCount > 0 && (
                    <span className={`absolute top-1.5 right-1.5 w-2 h-2 rounded-full border-2 border-white ${isOpen ? 'bg-white' : 'bg-[#865BFF]'}`} />
                )}
            </button>

            {mounted && createPortal(dropdownMarkup, document.body)}

            <style jsx global>{`
                @keyframes bell-ring {
                    0% { transform: rotate(0); }
                    10% { transform: rotate(15deg); }
                    20% { transform: rotate(-15deg); }
                    30% { transform: rotate(10deg); }
                    40% { transform: rotate(-10deg); }
                    50% { transform: rotate(0); }
                    100% { transform: rotate(0); }
                }
            `}</style>
        </>
    );
}
