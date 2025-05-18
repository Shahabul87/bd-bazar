"use client";

import { Store } from "./types";

interface StoreStatsProps {
  stores: Store[];
  language: string;
  isCreatingStore: boolean;
}

export function StoreStats({ stores, language, isCreatingStore }: StoreStatsProps) {
  if (isCreatingStore || stores.length === 0) {
    return null;
  }

  // Safely calculate total products and revenue, avoiding NaN
  const totalProducts = stores.reduce((acc, store) => {
    const products = typeof store.products === 'number' ? store.products : 0;
    return acc + products;
  }, 0);

  const totalRevenue = stores.reduce((acc, store) => {
    const revenue = typeof store.revenue === 'number' ? store.revenue : 0;
    return acc + revenue;
  }, 0);

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 mb-8">
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
        <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Total Stores' : 'মোট স্টোর'}</span>
        <span className="text-white text-xl md:text-2xl font-bold">{stores.length}</span>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
        <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Active Stores' : 'সক্রিয় স্টোর'}</span>
        <span className="text-white text-xl md:text-2xl font-bold">{stores.filter(s => s.status === 'active').length}</span>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
        <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Total Products' : 'মোট পণ্য'}</span>
        <span className="text-white text-xl md:text-2xl font-bold">{totalProducts}</span>
      </div>
      <div className="bg-slate-800/60 border border-slate-700/50 rounded-xl p-4 flex flex-col">
        <span className="text-slate-400 text-xs md:text-sm mb-1">{language === 'en' ? 'Total Revenue' : 'মোট রাজস্ব'}</span>
        <span className="text-white text-xl md:text-2xl font-bold">${totalRevenue}</span>
      </div>
    </div>
  );
} 