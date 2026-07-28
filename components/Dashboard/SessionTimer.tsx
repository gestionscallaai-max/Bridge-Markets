"use client";

import React, { useEffect, useState, useRef, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Clock, RefreshCw, AlertTriangle } from 'lucide-react';
import { supabase } from '@/lib/supabaseClient';
import { useLanguage } from '@/lib/i18n/context';

const TIMEOUT_SECONDS = 30 * 60; // 30 minutos (1800s)

export default function SessionTimer() {
    const router = useRouter();
    const { lang } = useLanguage();
    const [timeLeft, setTimeLeft] = useState<number>(TIMEOUT_SECONDS);
    const [showWarningModal, setShowWarningModal] = useState<boolean>(false);
    const lastActivityRef = useRef<number>(Date.now());

    const isEs = lang === 'es';

    const handleLogout = useCallback(async () => {
        try {
            await supabase.auth.signOut();
        } catch (error) {
            console.error('Error during auto-logout:', error);
        } finally {
            router.push('/login?reason=timeout');
        }
    }, [router]);

    const resetTimer = useCallback(() => {
        lastActivityRef.current = Date.now();
        setTimeLeft(TIMEOUT_SECONDS);
        setShowWarningModal(false);
    }, []);

    // Escuchar eventos de inactividad del usuario
    useEffect(() => {
        let throttleTimer: NodeJS.Timeout | null = null;

        const handleUserActivity = () => {
            if (throttleTimer) return;
            throttleTimer = setTimeout(() => {
                const now = Date.now();
                // Solo reiniciar si han pasado más de 3 segundos desde la última actividad registrada
                if (now - lastActivityRef.current > 3000) {
                    lastActivityRef.current = now;
                    setTimeLeft(TIMEOUT_SECONDS);
                    setShowWarningModal(false);
                }
                throttleTimer = null;
            }, 1000);
        };

        const events = ['mousemove', 'keydown', 'click', 'scroll', 'touchstart'];
        events.forEach(event => window.addEventListener(event, handleUserActivity, { passive: true }));

        return () => {
            events.forEach(event => window.removeEventListener(event, handleUserActivity));
            if (throttleTimer) clearTimeout(throttleTimer);
        };
    }, []);

    // Intervalo de cuenta regresiva
    useEffect(() => {
        const interval = setInterval(() => {
            const now = Date.now();
            const elapsedSeconds = Math.floor((now - lastActivityRef.current) / 1000);
            const remaining = Math.max(0, TIMEOUT_SECONDS - elapsedSeconds);

            setTimeLeft(remaining);

            // Mostrar modal de advertencia a los últimos 2 minutos (120s)
            if (remaining <= 120 && remaining > 0) {
                setShowWarningModal(true);
            } else {
                setShowWarningModal(false);
            }

            // Expiración total -> Cerrar sesión
            if (remaining <= 0) {
                clearInterval(interval);
                handleLogout();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [handleLogout]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const formattedTime = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;

    // Estilos dinámicos según el tiempo restante
    const isWarning = timeLeft <= 300; // <= 5 min
    const isCritical = timeLeft <= 60; // <= 1 min

    return (
        <>
            {/* Session Timer Badge en la barra superior */}
            <div
                onClick={resetTimer}
                title={isEs ? 'Inactividad: haz clic para renovar sesión' : 'Inactivity: click to refresh session'}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl text-[11px] font-mono font-medium transition-all cursor-pointer border select-none ${
                    isCritical
                        ? 'bg-red-500/10 text-red-600 border-red-500/30 animate-pulse'
                        : isWarning
                        ? 'bg-amber-500/10 text-amber-600 border-amber-500/30'
                        : 'bg-slate-100/80 hover:bg-slate-200/80 text-slate-600 border-slate-200/60'
                }`}
            >
                <Clock className={`w-3.5 h-3.5 ${isCritical ? 'text-red-500 animate-spin' : isWarning ? 'text-amber-500' : 'text-slate-400'}`} />
                <span className="hidden sm:inline text-slate-400 font-sans text-[10px] uppercase font-bold mr-0.5">
                    {isEs ? 'Sesión:' : 'Session:'}
                </span>
                <span>{formattedTime}</span>
                <RefreshCw className="w-3 h-3 text-slate-400 hover:text-slate-600 transition-transform hover:rotate-180 ml-0.5" />
            </div>

            {/* Modal de Advertencia cuando faltan < 2 min de inactividad */}
            {showWarningModal && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-slate-950/60 backdrop-blur-sm animate-fade-in">
                    <div className="bg-white rounded-3xl p-6 max-w-md w-full shadow-2xl border border-amber-200/80 text-center space-y-4">
                        <div className="w-14 h-14 rounded-2xl bg-amber-50 text-amber-500 flex items-center justify-center mx-auto shadow-inner">
                            <AlertTriangle className="w-8 h-8 animate-bounce" />
                        </div>
                        <div>
                            <h3 className="text-lg font-bold text-slate-900">
                                {isEs ? '¿Sigues ahí?' : 'Are you still there?'}
                            </h3>
                            <p className="text-xs text-slate-500 mt-1">
                                {isEs
                                    ? `Tu sesión se cerrará automáticamente en ${formattedTime} debido a inactividad por seguridad.`
                                    : `Your session will automatically expire in ${formattedTime} due to inactivity for security reasons.`}
                            </p>
                        </div>
                        <div className="pt-2 flex flex-col gap-2">
                            <button
                                onClick={resetTimer}
                                className="w-full py-2.5 px-4 rounded-xl bg-[#865BFF] hover:bg-[#7344ff] text-white text-xs font-semibold shadow-lg shadow-[#865BFF]/25 transition-all"
                            >
                                {isEs ? 'Mantener Sesión Activa' : 'Keep Session Active'}
                            </button>
                            <button
                                onClick={handleLogout}
                                className="w-full py-2 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 text-xs font-medium transition-all"
                            >
                                {isEs ? 'Cerrar Sesión Ahora' : 'Log Out Now'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
