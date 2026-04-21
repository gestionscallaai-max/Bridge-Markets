'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabaseClient';
import { Loader2, ShieldAlert } from 'lucide-react';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

    useEffect(() => {
        async function checkAdmin() {
            try {
                const { data: { user } } = await supabase.auth.getUser();
                
                if (!user) {
                    router.push('/login');
                    return;
                }

                const { data: partnerData, error } = await supabase
                    .from('partners')
                    .select('role')
                    .eq('id', user.id)
                    .single();

                if (error || !partnerData || partnerData.role !== 'admin') {
                    console.error('Acceso no autorizado: Se requiere rol de admin');
                    setIsAuthorized(false);
                    // Redirigir después de un pequeño delay para mostrar el mensaje de alerta
                    setTimeout(() => router.push('/dashboard'), 2000);
                } else {
                    setIsAuthorized(true);
                }
            } catch (err) {
                console.error('Error verificando autorización:', err);
                router.push('/dashboard');
            }
        }

        checkAdmin();
    }, [router]);

    if (isAuthorized === null) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] gap-4">
                <Loader2 className="w-10 h-10 animate-spin text-[#865BFF]" />
                <p className="text-xs font-black text-slate-400 uppercase tracking-[0.3em] animate-pulse">Verificando Credenciales de Comando</p>
            </div>
        );
    }

    if (isAuthorized === false) {
        return (
            <div className="flex flex-col items-center justify-center h-[70vh] p-8 text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6 border border-rose-100">
                    <ShieldAlert className="w-10 h-10 text-rose-500" />
                </div>
                <h1 className="text-2xl font-black text-slate-800 mb-2 uppercase tracking-tight">Acceso Denegado</h1>
                <p className="text-slate-500 max-w-sm font-medium">No tienes permisos de administrador para acceder a esta área. Serás redirigido a tu panel personal...</p>
                
                <div className="mt-8 w-48 h-1 bg-slate-100 rounded-full overflow-hidden">
                    <div className="h-full bg-rose-500 animate-[loading_2s_linear]" style={{ width: '100%' }} />
                </div>
                
                <style jsx>{`
                    @keyframes loading {
                        from { width: 0%; }
                        to { width: 100%; }
                    }
                `}</style>
            </div>
        );
    }

    return <>{children}</>;
}
