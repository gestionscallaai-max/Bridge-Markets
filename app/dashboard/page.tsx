"use client";

import React, { useState } from 'react';
import { ASSETS_DATA, type LocaleLanguage } from '@/lib/data/locales';
import AssetCard from '@/components/Assets/AssetCard';
import CodeGeneratorModal from '@/components/Modals/CodeGeneratorModal';
import ImageDownloadForm from '@/components/Forms/ImageDownloadForm';
import { LayoutDashboard, Image as ImageIcon, Video, FileText, Code, Filter, Sparkles } from 'lucide-react';

const AFFILIATE_ID = "BM_10940382";

const TABS = [
    { id: 'all', label: 'Todos', count: 124, icon: LayoutDashboard },
    { id: 'banners', label: 'Banners', count: ASSETS_DATA.filter(a => a.type === 'Banner').length, icon: ImageIcon },
    { id: 'landing', label: 'Landing Pages', count: 12, icon: FileText },
    { id: 'video', label: 'Videos', count: 28, icon: Video },
    { id: 'widgets', label: 'Widgets HTML', count: 39, icon: Code },
];

export default function DashboardIndex() {
    const [activeTab, setActiveTab] = useState('banners');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState<string>(ASSETS_DATA[0].id);
    const [selectedLanguage, setSelectedLanguage] = useState<LocaleLanguage>('ES');

    const openCodeGenerator = (id: string, lang: LocaleLanguage) => {
        setSelectedAssetId(id);
        setSelectedLanguage(lang);
        setIsModalOpen(true);
    };

    const activeAssets = activeTab === 'all'
        ? ASSETS_DATA
        : ASSETS_DATA.filter(a => a.type.toLowerCase() === activeTab.replace(/s$/, ''));

    return (
        <div className="space-y-6 pb-10">
            {/* Header / Intro */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 bg-white/50 backdrop-blur-md p-6 rounded-3xl border border-white/60 shadow-sm relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl -mt-20 -mr-20 pointer-events-none"></div>
                <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                        <Sparkles className="w-5 h-5 text-lila" />
                        <span className="text-sm font-bold tracking-widest text-lila uppercase">Creativos</span>
                    </div>
                    <h2 className="text-3xl font-extrabold text-slate-800 tracking-tight">Materiales de Marketing</h2>
                    <p className="text-slate-500 font-medium mt-1">Explora, filtra y utiliza los recursos de alta conversión listos para tus campañas.</p>
                </div>
            </div>

            <div className="flex items-center justify-between mt-4">
                {/* Navigation Tabs */}
                <nav className="flex space-x-1 border-b border-slate-200/60 overflow-x-auto hide-scrollbar pb-0 w-full">
                    {TABS.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`
                  flex items-center px-4 py-3 border-b-2 transition-all duration-200 ease-out whitespace-nowrap -mb-[2px]
                  ${isActive
                                        ? 'border-lila text-lila font-bold drop-shadow-sm'
                                        : 'border-transparent text-slate-500 hover:text-slate-800 font-medium hover:bg-slate-50/50 rounded-t-xl'}
                `}
                            >
                                <Icon className={`w-4 h-4 mr-2 ${isActive ? 'text-lila drop-shadow-md' : 'opacity-70'}`} />
                                {tab.label}
                                <span className={`ml-2 py-0.5 px-2 rounded-full text-[10px] font-black tracking-wide ${isActive ? 'bg-lila-100 text-lila border border-lila/20 shadow-sm' : 'bg-slate-100/80 text-slate-500'}`}>
                                    {tab.count}
                                </span>
                            </button>
                        )
                    })}
                </nav>
            </div>

            {/* Image Download Form Service */}
            <div className="mb-8">
                <ImageDownloadForm />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
                {activeAssets.map((asset, index) => {
                    // Mock Backgrounds based on index for variety
                    const gradients = [
                        "from-indigo-950 to-purple-900 border-purple-500/20",
                        "from-slate-900 to-slate-800 border-slate-500/20",
                        "from-violet-950 to-fuchsia-900 border-fuchsia-500/20",
                        "from-emerald-950 to-teal-900 border-teal-500/20",
                        "from-rose-950 to-orange-900 border-orange-500/20",
                        "from-blue-950 to-cyan-900 border-cyan-500/20"
                    ];
                    const mockBgClass = gradients[index % gradients.length];
                    const translation = asset.locales[selectedLanguage];

                    return (
                        <div key={asset.id} className="transition-all hover:scale-[1.02] hover:-translate-y-1 duration-300">
                            <AssetCard
                                id={asset.id}
                                title={translation.title}
                                type={asset.type}
                                size={asset.size}
                                language={selectedLanguage}
                                ctaText={translation.cta}
                                badge={asset.badge}
                                backgroundClass={mockBgClass}
                                onOpenCode={() => openCodeGenerator(asset.id, selectedLanguage)}
                            />
                        </div>
                    );
                })}
            </div>

            {/* Modal */}
            <CodeGeneratorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                assetId={selectedAssetId}
                affiliateId={AFFILIATE_ID}
                selectedLanguage={selectedLanguage}
            />
        </div>
    );
}
