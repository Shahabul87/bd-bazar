"use client";

import { useState, useCallback } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { Globe } from "lucide-react";

interface LanguageSwitcherProps {
  currentLanguage: string;
}

export function LanguageSwitcher({ currentLanguage }: LanguageSwitcherProps) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);
  
  const setLanguage = useCallback((lang: string) => {
    document.cookie = `NEXT_LOCALE=${lang}; path=/; max-age=31536000`;
    router.refresh();
    setIsOpen(false);
  }, [router]);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-white/10 backdrop-blur-sm hover:bg-white/15 text-white px-3 py-2 rounded-lg transition-all duration-200"
      >
        <Globe className="h-4 w-4" />
        <span className="font-medium">
          {currentLanguage === 'en' ? 'English' : 'বাংলা'}
        </span>
        <motion.span
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
          className="text-xs opacity-70"
        >
          ▼
        </motion.span>
      </button>
      
      {isOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="absolute right-0 mt-2 w-40 rounded-lg bg-slate-800 shadow-lg ring-1 ring-black ring-opacity-5 overflow-hidden z-50"
        >
          <div className="py-1">
            <button
              className={`w-full text-left px-4 py-2 text-sm ${
                currentLanguage === 'en' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-white/90 hover:bg-slate-700'
              }`}
              onClick={() => setLanguage('en')}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-800 flex items-center justify-center text-xs font-bold mr-2">EN</span>
                <span>English</span>
              </div>
            </button>
            <button
              className={`w-full text-left px-4 py-2 text-sm ${
                currentLanguage === 'bn' 
                  ? 'bg-indigo-600 text-white' 
                  : 'text-white/90 hover:bg-slate-700'
              }`}
              onClick={() => setLanguage('bn')}
            >
              <div className="flex items-center">
                <span className="w-6 h-6 rounded-full bg-green-100 text-green-800 flex items-center justify-center text-xs font-bold mr-2">বাং</span>
                <span>বাংলা</span>
              </div>
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
} 