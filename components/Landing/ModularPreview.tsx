import React, { useEffect, useRef, useState } from 'react';
import { getSharedHead, getSharedStyles, getSharedScripts } from '@/lib/landing/generator';

interface ModularPreviewProps {
    html: string;
    theme?: 'light' | 'dark';
    className?: string;
    style?: React.CSSProperties;
}

export default function ModularPreview({ html, theme = 'dark', className, style }: ModularPreviewProps) {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [isReady, setIsReady] = useState(false);
    const [isUpdating, setIsUpdating] = useState(false);
    const lastHtml = useRef(html);

    // Initial Shell HTML
    const shellHtml = React.useMemo(() => `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            ${getSharedHead('Bridge Preview', 'Institutional Standard')}
            ${getSharedStyles(theme)}
            <style>
                body { transition: background 0.3s ease; overflow-x: hidden; background: ${theme === 'dark' ? '#000000' : '#ffffff'} !important; }
                #preview-root { min-height: 100vh; opacity: 1; transition: opacity 0.3s ease-in-out; }
                #preview-root.updating { opacity: 0.5; filter: blur(2px); }
                ::-webkit-scrollbar { width: 6px; }
                ::-webkit-scrollbar-thumb { background: rgba(134, 91, 255, 0.3); border-radius: 10px; }
            </style>
        </head>
        <body class="bg-transparent">
            <div id="preview-root">
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: #865BFF; font-family: sans-serif; font-size: 12px; font-weight: 900; text-transform: uppercase; letter-spacing: 0.2em;">
                    Sincronizando Nodo...
                </div>
            </div>
            ${getSharedScripts()}
            <script>
                const root = document.getElementById('preview-root');
                window.addEventListener('message', (e) => {
                    if (e.data.type === 'UPDATE_CONTENT') {
                        root.classList.add('updating');
                        setTimeout(() => {
                            root.innerHTML = e.data.html;
                            root.classList.remove('updating');
                            
                            // Re-trigger reveals
                            const observer = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) entry.target.classList.add('visible');
                                });
                            }, { threshold: 0.05 });
                            document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
                        }, 50);
                    }
                });
                window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
            </script>
        </body>
        </html>
    `, [theme]);

    // Debounced Content Update
    useEffect(() => {
        if (!isReady) return;

        const timer = setTimeout(() => {
            if (iframeRef.current?.contentWindow && lastHtml.current !== html) {
                setIsUpdating(true);
                iframeRef.current.contentWindow.postMessage({
                    type: 'UPDATE_CONTENT',
                    html: html
                }, '*');
                lastHtml.current = html;
                setTimeout(() => setIsUpdating(false), 300);
            }
        }, 300); // 300ms Debounce

        return () => clearTimeout(timer);
    }, [html, isReady]);

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'PREVIEW_READY') {
                setIsReady(true);
                // Initial load
                if (iframeRef.current?.contentWindow) {
                    iframeRef.current.contentWindow.postMessage({
                        type: 'UPDATE_CONTENT',
                        html: html
                    }, '*');
                }
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className={`relative w-full h-full overflow-hidden ${className}`} style={style}>
            <iframe
                ref={iframeRef}
                srcDoc={shellHtml}
                className="w-full h-full border-0 shadow-2xl transition-opacity duration-500"
                style={{ 
                    background: theme === 'dark' ? '#000000' : '#ffffff',
                    opacity: isReady ? 1 : 0,
                    ...style
                }}
                title="Institutional Preview"
                sandbox="allow-same-origin allow-scripts"
            />
            
            {/* Minimalist Tech Loader Overlay */}
            {!isReady && (
                <div className="absolute inset-0 bg-[#000] flex items-center justify-center z-50">
                    <div className="flex flex-col items-center gap-4">
                        <div className="w-12 h-12 border-2 border-indigo-500/20 border-t-indigo-500 rounded-full animate-spin"></div>
                        <div className="text-[10px] font-black text-indigo-500 uppercase tracking-[0.3em] animate-pulse">Initializing Interface</div>
                    </div>
                </div>
            )}
        </div>
    );
}

