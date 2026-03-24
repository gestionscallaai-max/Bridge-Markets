"use client";

import React from 'react';
import { Filter, Globe, MonitorSmartphone, Maximize } from 'lucide-react';

export default function FilterBar() {
    return (
        <div className="flex flex-wrap items-center gap-4 p-4 glass rounded-2xl shadow-sm border border-slate-200/50">
            <div className="flex items-center text-slate-400 mr-2">
                <Filter className="w-5 h-5 mr-2" />
                <span className="text-sm font-medium">Filters</span>
            </div>

            {/* Language Filter */}
            <div className="relative group">
                <div className="flex items-center bg-white px-3 py-2 rounded-xl border border-slate-200 hover:border-lila transition-colors cursor-pointer shadow-sm">
                    <Globe className="w-4 h-4 text-slate-400 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Language: </span>
                    <span className="text-sm text-slate-900 ml-1 font-semibold">ES</span>
                </div>
            </div>

            {/* Size Filter */}
            <div className="relative group">
                <div className="flex items-center bg-white px-3 py-2 rounded-xl border border-slate-200 hover:border-lila transition-colors cursor-pointer shadow-sm">
                    <Maximize className="w-4 h-4 text-slate-400 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Size: </span>
                    <span className="text-sm text-slate-900 ml-1 font-semibold">All</span>
                </div>
            </div>

            {/* Platform Filter */}
            <div className="relative group">
                <div className="flex items-center bg-white px-3 py-2 rounded-xl border border-slate-200 hover:border-lila transition-colors cursor-pointer shadow-sm">
                    <MonitorSmartphone className="w-4 h-4 text-slate-400 mr-2" />
                    <span className="text-sm font-medium text-slate-700">Platform: </span>
                    <span className="text-sm text-slate-900 ml-1 font-semibold">All</span>
                </div>
            </div>
        </div>
    );
}
