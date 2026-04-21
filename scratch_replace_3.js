const fs = require('fs');
let code = fs.readFileSync('lib/landing/renderers/features.ts', 'utf8');

// Replace Workflow
code = code.replace(/export function renderSntWorkflow[\s\S]*?<\/section>`;\s*\}/, `export function renderSntWorkflow(content: Record<string, any>, brand: BrandConfig): string {
    const steps = [
        { num: '01', title: 'Registro y Verificación', desc: 'Abre tu cuenta y completa la verificación KYC en la zona segura de clientes.' },
        { num: '02', title: 'Fondos a tu Wallet', desc: 'Realiza tu depósito utilizando criptomonedas, tarjetas u otros métodos locales.' },
        { num: '03', title: 'Apertura de Cuenta MT5', desc: 'Desde el portal de cliente, crea tu cuenta comercial específica para Índices Sintéticos.' },
        { num: '04', title: 'Transferencia Interna', desc: 'Mueve fondos desde tu wallet principal hacia tu nueva cuenta comercial de MT5.' },
        { num: '05', title: 'Conexión y Trading', desc: 'Descarga MT5, inicia sesión con tus credenciales y comienza a operar las 24 horas.' }
    ];

    return \`
    <section class="py-32 px-8 bg-[#050505] relative border-b border-white/5">
        <div class="max-w-7xl mx-auto">
            <div class="text-center mb-24 section-reveal">
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">El Proceso</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white tracking-tighter uppercase">5 Pasos para Operar</h2>
            </div>
            
            <div class="relative section-reveal" style="animation-delay: 0.2s;">
                <div class="absolute top-1/2 left-0 w-full h-[1px] bg-white/10 -translate-y-1/2 hidden md:block"></div>
                <div class="grid grid-cols-1 md:grid-cols-5 gap-8">
                    \${steps.map((step, i) => \`
                        <div class="relative group">
                            <div class="w-16 h-16 rounded-2xl bg-[#0a0a0a] border border-white/10 flex items-center justify-center mb-6 relative z-10 mx-auto md:mx-0 group-hover:bg-[#a78bfa] transition-colors">
                                <span class="text-xl font-black text-white group-hover:text-black">\${step.num}</span>
                            </div>
                            <div class="text-center md:text-left">
                                <h3 class="text-lg font-black text-white mb-3 uppercase tracking-wide">\${step.title}</h3>
                                <p class="text-sm text-white/50 font-light leading-relaxed">\${step.desc}</p>
                            </div>
                        </div>
                    \`).join('')}
                </div>
            </div>
        </div>
    </section>\`;
}`);

// Replace Specs
code = code.replace(/export function renderSntSpecs[\s\S]*?<\/section>`;\s*\}/, `export function renderSntSpecs(content: Record<string, any>, brand: BrandConfig): string {
    return \`
    <section class="py-32 px-8 bg-[#0a0a0a] relative overflow-hidden border-b border-white/5">
        <div class="max-w-7xl mx-auto relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center section-reveal">
            <div>
                <span class="inline-block px-4 py-2 bg-white/5 text-white/60 text-[10px] font-bold uppercase tracking-[0.3em] mb-4 border border-white/10">Datos Técnicos</span>
                <h2 class="text-4xl md:text-5xl font-black font-headline text-white mb-8 tracking-tighter uppercase">Especificaciones del Producto</h2>
                
                <div class="space-y-4">
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Plataforma</span>
                        <span class="text-white font-bold tracking-widest text-right">MetaTrader 5 (MT5)</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Ejecución</span>
                        <span class="text-white font-bold tracking-widest text-right">Market Execution</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Spreads</span>
                        <span class="text-[#a78bfa] font-bold tracking-widest text-right">[Dato de BM]</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Lotaje Mín/Máx</span>
                        <span class="text-[#a78bfa] font-bold tracking-widest text-right">[Dato de BM]</span>
                    </div>
                    <div class="flex justify-between items-center p-4 bg-[#050505] border border-white/5">
                        <span class="text-white/60 font-light uppercase text-sm tracking-wide">Margin Call / Stop Out</span>
                        <span class="text-[#a78bfa] font-bold tracking-widest text-right">[Dato de BM]</span>
                    </div>
                </div>
            </div>
            
            <div class="relative flex justify-center">
                <div class="absolute inset-0 bg-[#a78bfa]/5 rounded-full blur-[100px]"></div>
                <img src="/images/imagenes nuevas/reloj rosa.png" alt="Reloj 24/7" class="w-full max-w-sm h-auto object-contain relative z-10 drop-shadow-[0_20px_40px_rgba(0,0,0,0.6)] animate-[float_6s_ease-in-out_infinite]" style="animation: float 6s ease-in-out infinite; transform: translateY(0px);">
            </div>
        </div>
    </section>\`;
}`);

fs.writeFileSync('lib/landing/renderers/features.ts', code);
console.log("Secciones de Proceso y Specs actualizadas");
