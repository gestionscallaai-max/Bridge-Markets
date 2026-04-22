import React, { useState, useRef, useEffect } from 'react';
import { 
    X, 
    Download, 
    Globe, 
    Sparkles, 
    Copy, 
    Check, 
    AlertCircle,
    ChevronRight,
    Loader2
} from 'lucide-react';

const Button = ({ children, className, ...props }: any) => (
    <button 
        className={`inline-flex items-center justify-center transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none ${className}`}
        {...props}
    >
        {children}
    </button>
);

interface LocalizerModalProps {
    isOpen: boolean;
    onClose: () => void;
    imageUrl: string;
}

const LANGUAGES = [
    { id: 'es', name: 'Español', code: 'ES', market: 'Spanish' },
    { id: 'en', name: 'English', code: 'GB', market: 'English' },
    { id: 'zh', name: '中文', code: 'CN', market: 'Chinese' },
    { id: 'pt', name: 'Português', code: 'BR', market: 'Portuguese' },
    { id: 'fr', name: 'Français', code: 'FR', market: 'French' },
    { id: 'hi', name: 'हिन्दी', code: 'IN', market: 'Hindi' },
    { id: 'ja', name: '日本語', code: 'JP', market: 'Japanese' },
    { id: 'ru', name: 'Русский', code: 'RU', market: 'Russian' },
    { id: 'ar', name: 'العربية', code: 'SA', market: 'Arabic' },
    { id: 'bn', name: 'বাংলা', code: 'BD', market: 'Bengali' }
];

const LocalizerModal: React.FC<LocalizerModalProps> = ({ isOpen, onClose, imageUrl }) => {
    const [selectedLang, setSelectedLang] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    const [results, setResults] = useState<any[]>([]);
    const [activeTab, setActiveTab] = useState<string | null>(null);
    const [copied, setCopied] = useState(false);
    
    // Hidden canvas for processing
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const toggleLang = (id: string) => {
        setSelectedLang(id);
    };

    const handleLocalizeAll = async () => {
        if (!selectedLang) return;
        
        setIsGenerating(true);
        const langInfo = LANGUAGES.find(l => l.id === selectedLang);
        const newResults = [{
            id: selectedLang,
            market: langInfo?.market || '',
            loading: true,
            image: null,
            translation: null,
            error: null
        }];
        
        setResults(newResults);
        setActiveTab(newResults[0].id);

        try {
            // 1. Prepare base64 image
            const imgRes = await fetch(imageUrl);
            const blob = await imgRes.blob();
            const base64 = await new Promise<string>((resolve) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve((reader.result as string).split(',')[1]);
                reader.readAsDataURL(blob);
            });

            // 2. Process each language
            await Promise.all(newResults.map(async (resItem) => {
                const market = resItem.market;
                
                try {
                    const apiRes = await fetch('/api/marketing/localize', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ market, image: base64 })
                    });
                    
                    const json = await apiRes.json();
                    if (!json.success) throw new Error(json.error || 'Error en la IA');

                    let finalImage = "";
                    if (json.type === 'image') {
                        finalImage = json.data;
                    } else if (json.type === 'layers') {
                        // Fallback render logic
                        const canvas = document.createElement('canvas');
                        const ctx = canvas.getContext('2d');
                        const img = new Image();
                        img.src = `data:image/jpeg;base64,${base64}`;
                        await new Promise((resolve) => img.onload = resolve);
                        canvas.width = img.width;
                        canvas.height = img.height;
                        if (ctx) {
                            ctx.drawImage(img, 0, 0);
                            // Simple text overlay as fallback
                            ctx.fillStyle = 'white';
                            ctx.font = '40px Anton';
                            ctx.textAlign = 'center';
                            ctx.fillText(json.data.socialCopy?.substring(0, 20) || 'Localized', canvas.width/2, 100);
                        }
                        finalImage = canvas.toDataURL('image/jpeg');
                    }

                    setResults(prev => prev.map(r => 
                        r.id === resItem.id ? { 
                            ...r, 
                            loading: false, 
                            image: finalImage, 
                            translation: { socialCopy: json.socialCopy || json.data?.socialCopy },
                            error: null 
                        } : r
                    ));

                } catch (err: any) {
                    console.error(`Error localizing ${market}:`, err);
                    setResults(prev => prev.map(r => 
                        r.id === resItem.id ? { ...r, loading: false, error: err.message } : r
                    ));
                }
            }));
        } catch (err) {
            console.error('Error general:', err);
        } finally {
            setIsGenerating(false);
        }
    };

    const downloadImage = (url: string, market: string) => {
        const link = document.createElement('a');
        link.href = url;
        link.download = `Flyer_BridgeMarkets_${market}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    if (!isOpen) return null;

    const currentResult = results.find(r => r.id === activeTab);

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-[#0d0221]/40 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="bg-white/95 w-full max-w-6xl h-[85vh] rounded-[32px] border border-slate-200/60 shadow-[0_20px_80px_-15px_rgba(109,40,217,0.2)] flex flex-col overflow-hidden relative">
                
                {/* Header */}
                <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-white/80 backdrop-blur-md sticky top-0 z-20">
                    <div className="flex items-center gap-4">
                        <div className="w-11 h-11 bg-gradient-to-br from-[#865BFF] to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-[#865BFF]/20">
                            <Sparkles className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <h2 className="text-xl font-black text-slate-800 tracking-tight">AI Flyer Localizer</h2>
                            <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-0.5">Globalización Instantánea</p>
                        </div>
                    </div>
                    <button 
                        onClick={onClose} 
                        className="p-3 bg-slate-100 rounded-2xl hover:bg-slate-200 hover:rotate-90 text-slate-500 hover:text-slate-800 transition-all duration-300"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="flex-1 flex overflow-hidden">
                    {/* Left: Controls */}
                    <div className="w-1/3 p-6 border-r border-slate-100 bg-slate-50/80 backdrop-blur-xl flex flex-col overflow-hidden relative z-10">
                        <div className="flex flex-col h-full space-y-5">
                            <section>
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Imagen de Origen</label>
                                <div className="rounded-2xl overflow-hidden border border-slate-200 h-40 bg-white relative group shadow-sm">
                                    <img src={imageUrl} className="w-full h-full object-contain bg-slate-100 transition-transform duration-700 group-hover:scale-110" alt="Original" />
                                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                                        <span className="text-[9px] text-white font-black tracking-widest uppercase bg-black/20 backdrop-blur-md px-3 py-1 rounded-lg">Original</span>
                                    </div>
                                </div>
                            </section>

                            <section className="flex-1 min-h-0 overflow-y-auto pr-2 custom-scrollbar">
                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] mb-3 block">Idiomas de Destino</label>
                                <div className="grid grid-cols-2 gap-1.5 pb-4">
                                    {LANGUAGES.map(lang => (
                                        <button
                                            key={lang.id}
                                            onClick={() => toggleLang(lang.id)}
                                            className={`p-2.5 rounded-xl border text-[11px] font-bold transition-all duration-300 flex items-center gap-2 ${
                                                selectedLang === lang.id
                                                    ? 'bg-[#865BFF] border-[#865BFF] text-white shadow-lg shadow-[#865BFF]/20 scale-[1.02]'
                                                    : 'bg-white border-slate-200 text-slate-500 hover:border-[#865BFF]/40 hover:text-slate-800'
                                            }`}
                                        >
                                            <span className="text-base opacity-90">
                                                {lang.id === 'es' ? '🇪🇸' :
                                                 lang.id === 'en' ? '🇬🇧' : 
                                                 lang.id === 'zh' ? '🇨🇳' : 
                                                 lang.id === 'pt' ? '🇧🇷' : 
                                                 lang.id === 'fr' ? '🇫🇷' : 
                                                 lang.id === 'hi' ? '🇮🇳' : 
                                                 lang.id === 'ja' ? '🇯🇵' : 
                                                 lang.id === 'ru' ? '🇷🇺' : 
                                                 lang.id === 'ar' ? '🇸🇦' : '🇧🇩'}
                                            </span>
                                            {lang.name}
                                        </button>
                                    ))}
                                </div>
                            </section>

                            <Button 
                                onClick={handleLocalizeAll} 
                                disabled={isGenerating || !selectedLang}
                                className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#865BFF] to-indigo-600 hover:shadow-xl hover:shadow-[#865BFF]/20 disabled:opacity-50 text-white group relative overflow-hidden transition-all duration-500 mt-auto"
                            >
                                <div className="relative z-10 flex items-center justify-center gap-3">
                                    {isGenerating ? (
                                        <Loader2 className="w-5 h-5 animate-spin" />
                                    ) : (
                                        <Sparkles className="w-5 h-5 group-hover:rotate-12 transition-transform" />
                                    )}
                                    <span className="font-black uppercase tracking-widest text-[11px]">Traducir Flyer</span>
                                </div>
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
                            </Button>
                        </div>
                    </div>

                    {/* Right: Preview Area */}
                    <div className="flex-1 bg-white flex flex-col relative overflow-hidden">
                        {results.length > 0 ? (
                            <>
                                {/* Preview Header */}
                                <div className="flex items-center p-5 gap-3 border-b border-slate-100 bg-white/50 backdrop-blur-sm z-10">
                                    <div className="flex bg-slate-100/50 p-1 rounded-2xl border border-slate-200/50">
                                        {results.map(res => (
                                            <button
                                                key={res.id}
                                                onClick={() => setActiveTab(res.id)}
                                                className={`px-5 py-2 rounded-xl text-[10px] font-black whitespace-nowrap transition-all uppercase tracking-widest flex items-center gap-2 ${
                                                    activeTab === res.id 
                                                        ? 'bg-white text-[#865BFF] shadow-sm ring-1 ring-slate-200/50' 
                                                        : 'text-slate-400 hover:text-slate-600'
                                                }`}
                                            >
                                                {res.market}
                                                {res.loading && <Loader2 className="w-3 h-3 animate-spin" />}
                                            </button>
                                        ))}
                                    </div>
                                    
                                    {results.some(r => r.image) && (
                                        <Button 
                                            onClick={() => results.filter(r => r.image).forEach(r => downloadImage(r.image, r.market))}
                                            className="ml-auto bg-[#865BFF] text-white px-5 py-2.5 rounded-xl text-[10px] font-black uppercase tracking-widest flex items-center gap-2.5 transition-all shadow-lg shadow-[#865BFF]/20 hover:scale-105"
                                        >
                                            <Download className="w-4 h-4" />
                                            <span>Descargar Todo</span>
                                        </Button>
                                    )}
                                </div>

                                {/* Main Preview */}
                                <div className="flex-1 p-8 flex items-center justify-center overflow-hidden bg-slate-50 relative">
                                    {/* Subtle pattern background */}
                                    <div className="absolute inset-0 opacity-[0.4]" style={{ 
                                        backgroundImage: 'radial-gradient(#865BFF 0.5px, transparent 0.5px)',
                                        backgroundSize: '24px 24px'
                                    }} />
                                    
                                    <div className="relative w-full max-w-md aspect-[3/4] min-h-[500px] bg-white rounded-[40px] border border-slate-200/60 overflow-hidden shadow-[0_40px_100px_-20px_rgba(0,0,0,0.1)] group z-10">
                                        {currentResult?.loading ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-8 bg-white/95 backdrop-blur-sm z-30 animate-in fade-in duration-500">
                                                <div className="relative">
                                                    <div className="w-24 h-24 border-4 border-slate-100 rounded-full animate-[spin_4s_linear_infinite]" />
                                                    <Loader2 className="w-14 h-14 text-[#865BFF] animate-spin absolute top-5 left-5" />
                                                    <div className="absolute -top-2 -right-2 w-6 h-6 bg-[#865BFF] rounded-full flex items-center justify-center animate-bounce shadow-lg shadow-[#865BFF]/30">
                                                        <Sparkles className="w-3.5 h-3.5 text-white" />
                                                    </div>
                                                </div>
                                                <div className="text-center px-8">
                                                    <h3 className="text-xl font-black text-slate-800 tracking-tight mb-2 uppercase">IA Trabajando en tu Diseño</h3>
                                                    <p className="text-xs text-slate-500 font-bold leading-relaxed mb-8 max-w-xs mx-auto">Estamos adaptando los textos y la estética visual al mercado seleccionado...</p>
                                                    
                                                    {/* Warning Banner */}
                                                    <div className="bg-amber-50 border border-amber-200/50 p-4 rounded-2xl flex items-start gap-3 text-left shadow-sm">
                                                        <div className="w-8 h-8 bg-amber-100 rounded-xl flex items-center justify-center shrink-0">
                                                            <AlertCircle className="w-4 h-4 text-amber-600" />
                                                        </div>
                                                        <p className="text-[11px] text-amber-900 font-black leading-snug">
                                                            <span className="block uppercase text-[9px] mb-1 text-amber-600/70">Aviso Importante</span>
                                                            No cierres esta ventana ni refresques la página mientras se procesa el material.
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ) : currentResult?.error ? (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-10 gap-6 text-center z-30 bg-white">
                                                <div className="p-5 bg-rose-50 rounded-3xl border border-rose-100">
                                                    <AlertCircle className="w-10 h-10 text-rose-500" />
                                                </div>
                                                <div>
                                                    <h3 className="text-lg font-black text-slate-800 uppercase tracking-tight">Error de Generación</h3>
                                                    <p className="text-sm text-slate-400 mt-2 font-medium leading-relaxed">{currentResult.error}</p>
                                                </div>
                                                <Button onClick={handleLocalizeAll} className="bg-slate-900 text-white px-10 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest hover:scale-105 transition-all">Reintentar</Button>
                                            </div>
                                        ) : currentResult?.image ? (
                                            <div className="w-full h-full flex flex-col animate-in zoom-in-95 duration-700">
                                                <div className="p-6 absolute top-0 left-0 right-0 z-20 flex justify-between">
                                                    <span className="px-4 py-2 bg-[#865BFF] rounded-xl text-[10px] font-black text-white uppercase tracking-widest shadow-xl shadow-[#865BFF]/30 flex items-center gap-2.5">
                                                        <Sparkles className="w-3.5 h-3.5" />
                                                        IA Localizada
                                                    </span>
                                                    <Button 
                                                        onClick={() => downloadImage(currentResult.image, currentResult.market)}
                                                        className="p-3 bg-white border border-slate-200 rounded-xl text-slate-800 shadow-xl hover:scale-110 hover:text-[#865BFF] transition-all"
                                                    >
                                                        <Download className="w-5 h-5" />
                                                    </Button>
                                                </div>
                                                <img src={currentResult.image} className="w-full h-full object-cover" alt="Localized Result" />
                                                
                                            </div>
                                        ) : (
                                            <div className="absolute inset-0 flex flex-col items-center justify-center p-12 text-center">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center mb-6 animate-pulse">
                                                    <Sparkles className="w-8 h-8 text-slate-200" />
                                                </div>
                                                <p className="text-[10px] font-black text-slate-300 tracking-[0.2em] uppercase">Esperando Generación</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </>
                        ) : (
                            <div className="flex-1 flex flex-col items-center justify-center p-12 text-center bg-slate-50/30 relative">
                                <div className="absolute inset-0 opacity-[0.03] grayscale select-none pointer-events-none p-20">
                                    <img src="/images/logo-para-fondos.png" alt="" className="w-full h-full object-contain" />
                                </div>
                                
                                <div className="w-28 h-28 bg-white rounded-[44px] border border-slate-200 flex items-center justify-center mb-8 relative group shadow-xl">
                                    <Globe className="w-12 h-12 text-slate-200 group-hover:text-[#865BFF] group-hover:rotate-[360deg] transition-all duration-1000" />
                                    <div className="absolute inset-0 rounded-[44px] bg-[#865BFF]/5 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                                </div>
                                <h2 className="text-3xl font-black text-slate-800 tracking-tight mb-4 relative z-10">Internacionaliza tu Marca</h2>
                                <p className="text-slate-400 max-w-sm font-bold leading-relaxed mb-10 relative z-10">Adapta tus diseños a cualquier mercado con un solo clic. Nuestra IA mantiene la estética mientras localiza el mensaje.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <style jsx>{`
                .custom-scrollbar::-webkit-scrollbar {
                    width: 4px;
                }
                .custom-scrollbar::-webkit-scrollbar-track {
                    background: transparent;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb {
                    background: #e2e8f0;
                    border-radius: 10px;
                }
                .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                    background: #cbd5e1;
                }
            `}</style>
        </div>
    );
};

export default LocalizerModal;
