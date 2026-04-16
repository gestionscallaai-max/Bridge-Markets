"use client";

import React, { useState } from 'react';
import FilterBar from '../Filters/FilterBar';
import AssetCard from '../Assets/AssetCard';
import CodeGeneratorModal from '../Modals/CodeGeneratorModal';
import { LayoutDashboard, Image as ImageIcon, Video, FileText, Code } from 'lucide-react';

const TABS = [
    { id: 'all', label: 'Todos', count: 124, icon: LayoutDashboard },
    { id: 'banners', label: 'Banners', count: 45, icon: ImageIcon },
    { id: 'landing', label: 'Landing Pages', count: 12, icon: FileText },
    { id: 'video', label: 'Videos', count: 28, icon: Video },
    { id: 'widgets', label: 'Widgets HTML', count: 39, icon: Code },
];

export default function DashboardLayout() {
    const [activeTab, setActiveTab] = useState('banners');
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedAssetId, setSelectedAssetId] = useState<string>('crypto-bull-run');
    const [selectedLanguage, setSelectedLanguage] = useState<'EN' | 'ES' | 'PT'>('ES');

    const openCodeGenerator = (id: string, lang: string) => {
        setSelectedAssetId(id);
        setSelectedLanguage(lang as any);
        setIsModalOpen(true);
    };

    return (
        <div className="min-h-screen pt-8 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            {/* Header */}
            <header className="mb-12">
                <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 mb-2">
                    Promotional Assets
                </h1>
                <p className="text-lg text-slate-500">
                    Find and generate your affiliate tracking links for our premium campaigns.
                </p>
            </header>

            {/* Navigation Tabs */}
            <nav className="flex space-x-1 border-b border-slate-200 mb-8 overflow-x-auto hide-scrollbar pb-1">
                {TABS.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`
                flex items-center px-4 py-3 rounded-t-xl transition-all duration-200 ease-out whitespace-nowrap
                ${isActive
                                    ? 'bg-lila-50 text-lila border-b-2 border-lila font-semibold'
                                    : 'text-slate-500 hover:text-slate-700 hover:bg-slate-50'}
              `}
                        >
                            <Icon className="w-4 h-4 mr-2" />
                            {tab.label}
                            <span className={`ml-2 py-0.5 px-2 rounded-full text-xs ${isActive ? 'bg-lila-100 text-lila-dark' : 'bg-slate-100 text-slate-500'}`}>
                                {tab.count}
                            </span>
                        </button>
                    )
                })}
            </nav>

            {/* Filters */}
            <div className="mb-8">
                <FilterBar />
            </div>

            {/* Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                <AssetCard id="crypto-bull-run" title="Crypto Bull Run" type="Banner" size="300x250" language="ES" ctaText="Operar Ahora" onOpenCode={() => openCodeGenerator('crypto-bull-run', 'ES')} />
                <AssetCard id="forex-mastery" title="Forex Mastery" type="Banner" size="728x90" language="EN" ctaText="Join Now" onOpenCode={() => openCodeGenerator('forex-mastery', 'EN')} />
                <AssetCard id="crypto-bull-run" title="Gold Trading Setup" type="Banner" size="1080x1080" language="PT" ctaText="Começar" onOpenCode={() => openCodeGenerator('crypto-bull-run', 'PT')} />
                <AssetCard id="forex-mastery" title="Zero Spread Promo" type="Landing Page" size="Web" language="ES" ctaText="Ver Más" onOpenCode={() => openCodeGenerator('forex-mastery', 'ES')} />
            </div>

            {/* Modal */}
            <CodeGeneratorModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                assetId={selectedAssetId}
                affiliateId="USER_ID"
                selectedLanguage={selectedLanguage}
            />
        </div>
    );
}
