"use client";

import { Store, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface StoreHeaderProps {
  language: string;
  onCreateStore: () => void;
}

export function StoreHeader({ language, onCreateStore }: StoreHeaderProps) {
  return (
    <div className="relative mb-8 rounded-2xl overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-purple-600 opacity-90"></div>
      
      <div className="relative px-6 md:px-8 py-8 md:py-12 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-white/20 p-2 rounded-lg backdrop-blur-sm">
              <Store className="h-6 w-6 md:h-7 md:w-7 text-white" />
            </div>
            <span className="text-white/70 text-sm font-medium uppercase tracking-wider">
              {language === 'en' ? 'Management' : 'ম্যানেজমেন্ট'}
            </span>
          </div>
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-2">
            {language === 'en' ? 'Your Stores' : 'আপনার স্টোরগুলি'}
          </h1>
          <p className="text-white/80 max-w-lg text-sm md:text-base">
            {language === 'en' 
              ? 'Create and manage your online storefronts. Each store can have its own products, theme, and settings.' 
              : 'আপনার অনলাইন স্টোরফ্রন্টগুলি তৈরি এবং পরিচালনা করুন। প্রতিটি স্টোরের নিজস্ব পণ্য, থিম এবং সেটিংস থাকতে পারে।'}
          </p>
        </div>
        
        <Button 
          onClick={onCreateStore}
          className="bg-white text-indigo-700 hover:bg-white/90 shadow-lg px-4 md:px-5 py-2 md:py-6 h-auto whitespace-nowrap"
          size="lg"
        >
          <PlusCircle className="mr-2 h-4 w-4 md:h-5 md:w-5" />
          {language === 'en' ? 'Create Store' : 'স্টোর তৈরি করুন'}
        </Button>
      </div>
    </div>
  );
} 