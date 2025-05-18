"use client";

import { Store } from "lucide-react";

interface StoreLoadingProps {
  language: string;
}

export function StoreLoading({ language }: StoreLoadingProps) {
  return (
    <div className="flex flex-col items-center justify-center py-20 bg-slate-800/30 border border-slate-700/50 rounded-xl backdrop-blur-sm">
      <div className="relative">
        <div className="h-16 w-16 rounded-full border-4 border-indigo-300/30 border-t-indigo-600 animate-spin"></div>
        <Store className="h-6 w-6 text-indigo-400 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
      </div>
      <p className="text-gray-300 mt-6 font-medium">
        {language === 'en' ? 'Loading your stores...' : 'আপনার স্টোরগুলি লোড হচ্ছে...'}
      </p>
    </div>
  );
} 