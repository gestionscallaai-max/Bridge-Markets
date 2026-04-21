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
    const [isLoaded, setIsLoaded] = useState(false);

    // Initial Shell HTML - Only loaded once
    const shellHtml = React.useMemo(() => `
        <!DOCTYPE html>
        <html lang="es">
        <head>
            ${getSharedHead('Bridge Preview', 'Institutional Standard')}
            ${getSharedStyles(theme)}
            <style>
                body { transition: background 0.5s ease; overflow-x: hidden; }
                #preview-root { min-height: 100vh; }
                ::-webkit-scrollbar { display: none; }
            </style>
        </head>
        <body class="bg-transparent">
            <div id="preview-root">
                <div style="display: flex; align-items: center; justify-content: center; height: 100vh; color: #865BFF; font-family: sans-serif; font-weight: bold; opacity: 0.5;">
                    Cargando Vista Previa...
                </div>
            </div>
            ${getSharedScripts()}
            <script>
                function signalReady() {
                    window.parent.postMessage({ type: 'PREVIEW_READY' }, '*');
                }
                
                if (document.readyState === 'complete') signalReady();
                else window.onload = signalReady;
                
                const ping = setInterval(signalReady, 500);

                window.addEventListener('message', (e) => {
                    if (e.data.type === 'UPDATE_CONTENT') {
                        clearInterval(ping);
                        const root = document.getElementById('preview-root');
                        if (root) {
                            root.innerHTML = e.data.html;
                            // Trigger reveals
                            const observer = new IntersectionObserver((entries) => {
                                entries.forEach(entry => {
                                    if (entry.isIntersecting) entry.target.classList.add('visible');
                                });
                            }, { threshold: 0.1 });
                            document.querySelectorAll('.section-reveal').forEach(el => observer.observe(el));
                        }
                    }
                });
            </script>
        </body>
        </html>
    `, [theme]);

    // Update content when html prop changes
    useEffect(() => {
        const update = () => {
            if (iframeRef.current?.contentWindow) {
                iframeRef.current.contentWindow.postMessage({
                    type: 'UPDATE_CONTENT',
                    html: html
                }, '*');
            }
        };

        if (isLoaded) {
            update();
        } else {
            const timer = setTimeout(update, 800);
            return () => clearTimeout(timer);
        }
    }, [html, isLoaded]);

    const handleIframeLoad = () => {
        setIsLoaded(true);
    };

    useEffect(() => {
        const handleMessage = (e: MessageEvent) => {
            if (e.data.type === 'PREVIEW_READY') {
                setIsLoaded(true);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    return (
        <div className={`relative w-full h-full ${className}`} style={style}>
            <iframe
                ref={iframeRef}
                srcDoc={shellHtml}
                onLoad={handleIframeLoad}
                className="w-full h-full border-0 shadow-2xl"
                title="Fast Preview"
                sandbox="allow-same-origin allow-scripts"
                style={{ 
                    background: theme === 'dark' ? '#0d0221' : '#F8FAFC',
                    ...style
                }}
            />
        </div>
    );
}
