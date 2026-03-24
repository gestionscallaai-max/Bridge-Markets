"use client";

import React, { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import * as THREE from 'three';
import { Loader2, ArrowRight } from 'lucide-react';

// Declare VANTA for TypeScript
declare global {
    interface Window {
        VANTA: any;
    }
}

export default function LoginPage() {
    const router = useRouter();
    const vantaRef = useRef<HTMLDivElement>(null);
    const cardRef = useRef<HTMLDivElement>(null);
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [vantaEffect, setVantaEffect] = useState<any>(null);

    const [email, setEmail] = useState('partner@bridgemarkets.com');
    const [password, setPassword] = useState('demo123');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    // Initialize Vanta.js only on the client
    useEffect(() => {
        // We dynamically inject the scripts to ensure they load in the correct order for Next.js
        const loadVantaScripts = async () => {
            if (typeof window !== 'undefined' && !window.VANTA) {
                // Load Three.js
                const threeScript = document.createElement('script');
                threeScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js';
                document.head.appendChild(threeScript);

                await new Promise(resolve => threeScript.onload = resolve);

                // Load Vanta.js Waves
                const vantaScript = document.createElement('script');
                vantaScript.src = 'https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.waves.min.js';
                document.head.appendChild(vantaScript);

                await new Promise(resolve => vantaScript.onload = resolve);
            }

            // Initialize Effect
            if (!vantaEffect && vantaRef.current && window.VANTA) {
                const effect = window.VANTA.WAVES({
                    el: vantaRef.current,
                    mouseControls: true,
                    touchControls: true,
                    gyroControls: false,
                    minHeight: 200.00,
                    minWidth: 200.00,
                    scale: 1.00,
                    scaleMobile: 1.00,
                    color: 0x9b51e0,
                    shininess: 80.00,
                    waveHeight: 20.00,
                    waveSpeed: 0.65,
                    zoom: 0.8
                });
                setVantaEffect(effect);
            }
        };

        loadVantaScripts();

        return () => {
            if (vantaEffect) vantaEffect.destroy();
        };
    }, [vantaEffect]);

    // Handle 3D Parallax Mouse movement
    const handleMouseMove = (e: React.MouseEvent) => {
        if (!cardRef.current) return;
        const xAxis = (window.innerWidth / 2 - e.pageX) / 25;
        const yAxis = (window.innerHeight / 2 - e.pageY) / 25;
        cardRef.current.style.transform = `rotateY(${xAxis}deg) rotateX(${yAxis}deg)`;
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        cardRef.current.style.transition = 'transform 0.5s ease';
        cardRef.current.style.transform = `rotateY(0deg) rotateX(0deg)`;
        setTimeout(() => {
            if (cardRef.current) cardRef.current.style.transition = 'transform 0.1s';
        }, 500);
    };

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        setTimeout(() => {
            setLoading(false);
            setSuccess(true);

            // Animate card out
            if (cardRef.current) {
                cardRef.current.style.transition = 'all 0.6s cubic-bezier(0.25, 0.8, 0.25, 1)';
                cardRef.current.style.transform = 'translateY(-100px) scale(0.9) rotateX(15deg)';
                cardRef.current.style.opacity = '0';
            }

            if (vantaRef.current) {
                vantaRef.current.style.transition = 'opacity 1s ease';
                vantaRef.current.style.opacity = '0';
            }

            setTimeout(() => {
                router.push('/dashboard');
            }, 800);
        }, 1200);
    };

    return (
        <div className="relative w-screen h-screen overflow-hidden bg-slate-900 text-slate-900 font-sans">

            {/* 3D Background */}
            <div ref={vantaRef} className="absolute inset-0 z-0" />

            {/* Interactive Wrapper */}
            <div
                ref={wrapperRef}
                onMouseMove={handleMouseMove}
                onMouseLeave={handleMouseLeave}
                className="relative z-10 w-full h-full flex items-center justify-center perspective-[1200px]"
            >
                <div
                    ref={cardRef}
                    className="bg-white/75 backdrop-blur-xl border border-white/40 rounded-3xl p-12 w-full max-w-md shadow-[0_24px_80px_rgba(0,0,0,0.15),inset_0_0_0_1px_rgba(255,255,255,0.6)] animate-floatIn transform-style-3d will-change-transform"
                >
                    <div className="flex flex-col items-center justify-center mb-10 translate-z-[30px]">
                        <div className="w-16 h-16 bg-gradient-to-br from-lila to-lila-light rounded-2xl flex items-center justify-center text-white font-black text-2xl shadow-[0_12px_32px_rgba(155,81,224,0.4)] mb-4">
                            BM
                        </div>
                        <div className="text-2xl font-extrabold tracking-tight">
                            Bridge<span className="text-lila">Markets</span>
                        </div>
                        <div className="text-[13px] font-semibold text-slate-500 uppercase tracking-[0.15em] mt-1">
                            Partner Portal
                        </div>
                    </div>

                    <form onSubmit={handleLogin}>
                        <div className="mb-6 translate-z-[20px]">
                            <label className="block text-[13px] font-semibold text-slate-900 mb-2">Affiliate Email</label>
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                                </svg>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl py-4 pl-11 pr-4 text-[15px] font-medium transition-all focus:outline-none focus:bg-white/90 focus:border-lila focus:ring-4 focus:ring-lila/15"
                                    required
                                />
                            </div>
                        </div>

                        <div className="mb-6 translate-z-[20px]">
                            <label className="block text-[13px] font-semibold text-slate-900 mb-2">Password</label>
                            <div className="relative">
                                <svg className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                                </svg>
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-white/60 border border-white/80 rounded-2xl py-4 pl-11 pr-4 text-[15px] font-medium transition-all focus:outline-none focus:bg-white/90 focus:border-lila focus:ring-4 focus:ring-lila/15"
                                    required
                                />
                            </div>
                            <a href="#" className="block text-right text-xs font-semibold text-lila mt-2 hover:opacity-80">Forgot password?</a>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || success}
                            className={`w-full text-white border-none rounded-2xl p-4 text-base font-bold flex items-center justify-center gap-2 shadow-[0_12px_24px_rgba(155,81,224,0.3)] transition-all translate-z-[25px] mt-2 ${success ? 'bg-green-500 shadow-green-500/30' : 'bg-gradient-to-br from-lila to-lila-light hover:translate-y-[-2px] hover:shadow-[0_16px_32px_rgba(155,81,224,0.4)]'}`}
                        >
                            {loading ? (
                                <><Loader2 className="w-5 h-5 animate-spin" /> Authenticating...</>
                            ) : success ? (
                                <>Success! Redirecting...</>
                            ) : (
                                <>Access Dashboard <ArrowRight className="w-5 h-5" /></>
                            )}
                        </button>
                    </form>

                </div>
            </div>
        </div>
    );
}
