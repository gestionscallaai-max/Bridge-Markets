'use client';

import React, { useState, useEffect, Suspense } from "react";
import LandingTypeform from "@/components/Forms/LandingTypeform";
import LandingHistory from "@/components/Promo/LandingHistory";
import { useSearchParams } from 'next/navigation';
import { History as HistoryIcon, Layout, Loader2 } from 'lucide-react';
import { supabase } from "@/lib/supabaseClient";
import { useLanguage } from '@/lib/i18n/context';
import { useRole } from "@/lib/context";

function LandingPageContent() {
    const searchParams = useSearchParams();
    const templateId = searchParams.get('template') || undefined;
    const { t } = useLanguage();
    const { partnerData } = useRole();
    
    const [activeTab, setActiveTab] = useState<'generator' | 'history'>('generator');
    const [partnerId, setPartnerId] = useState<string>('');
    const [editingLanding, setEditingLanding] = useState<any>(null);

    const handleEdit = (landing: any) => {
        setEditingLanding(landing);
        setActiveTab('generator');
    };

    const handleTabChange = (tab: 'generator' | 'history') => {
        if (tab === 'generator' && activeTab === 'history') {
            setEditingLanding(null); // Clear edit state when manually going to new generator
        }
        setActiveTab(tab);
    };

    useEffect(() => {
        if (partnerData) {
            setPartnerId(partnerData.id || '');
        }
    }, [partnerData]);

    return (
        <div className="flex flex-col gap-8 pb-20">
            {/* Tabs Header */}
            <div className="flex items-center gap-2 bg-white/50 p-1.5 rounded-2xl border border-slate-200 w-fit">
                <button
                    onClick={() => handleTabChange('generator')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                        activeTab === 'generator' 
                        ? 'bg-[#865BFF] text-white shadow-lg shadow-[#865BFF]/20' 
                        : 'text-slate-500 hover:bg-white hover:text-[#865BFF]'
                    }`}
                >
                    <Layout className="w-4 h-4" />
                    {editingLanding ? 'Editando Landing' : (t.landing.step2 || 'Generador')}
                </button>
                <button
                    onClick={() => handleTabChange('history')}
                    className={`flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-black transition-all ${
                        activeTab === 'history' 
                        ? 'bg-[#865BFF] text-white shadow-lg shadow-[#865BFF]/20' 
                        : 'text-slate-500 hover:bg-white hover:text-[#865BFF]'
                    }`}
                >
                    <HistoryIcon className="w-4 h-4" />
                    {t.landing.history}
                </button>
            </div>

            {/* Content */}
            <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                {activeTab === 'generator' ? (
                    <div className="space-y-6">
                        <LandingTypeform 
                            initialTemplate={templateId} 
                            editData={editingLanding}
                            onGoToHistory={() => handleTabChange('history')} 
                        />
                    </div>
                ) : (
                    <LandingHistory partnerId={partnerId} onEdit={handleEdit} />
                )}
            </div>
        </div>
    );
}

export default function LandingPageGenerator() {
    return (
        <Suspense fallback={
            <div className="flex items-center justify-center p-20">
                <Loader2 className="w-8 h-8 text-[#865BFF] animate-spin" />
            </div>
        }>
            <LandingPageContent />
        </Suspense>
    );
}
