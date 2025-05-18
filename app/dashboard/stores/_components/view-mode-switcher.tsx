"use client";

import { Grid3x3, List } from "lucide-react";

interface ViewModeSwitcherProps {
  viewMode: 'grid' | 'list';
  setViewMode: (mode: 'grid' | 'list') => void;
  language: string;
}

export function ViewModeSwitcher({ viewMode, setViewMode, language }: ViewModeSwitcherProps) {
  return (
    <div className="flex flex-col xs:flex-row justify-between items-start xs:items-center gap-4 mb-6">
      <h2 className="text-lg md:text-xl font-medium text-white">
        {language === 'en' ? 'Store Overview' : 'স্টোর ওভারভিউ'}
      </h2>
      <div className="flex bg-slate-800/80 rounded-lg p-1 border border-slate-700/50">
        <button
          onClick={() => setViewMode('grid')}
          className={`p-2 rounded-md flex items-center ${viewMode === 'grid' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <Grid3x3 className="h-4 w-4 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm font-medium">{language === 'en' ? 'Grid' : 'গ্রিড'}</span>
        </button>
        <button
          onClick={() => setViewMode('list')}
          className={`p-2 rounded-md flex items-center ${viewMode === 'list' ? 'bg-indigo-600 text-white' : 'text-gray-400 hover:text-white'}`}
        >
          <List className="h-4 w-4 mr-1 md:mr-2" />
          <span className="text-xs md:text-sm font-medium">{language === 'en' ? 'List' : 'তালিকা'}</span>
        </button>
      </div>
    </div>
  );
} 