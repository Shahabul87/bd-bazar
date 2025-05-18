"use client"

import { Globe } from "lucide-react"
import { useLanguage } from "@/app/context/LanguageContext"

export const LanguageToggle = () => {
  const { language, setLanguage } = useLanguage()

  const labels = {
    currentLanguage: language === 'en' ? '🇺🇸 English' : '🇧🇩 বাংলা',
  }

  return (
    <button 
      onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
      className="p-2 rounded-full bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 transition-colors flex items-center gap-2"
    >
      <Globe className="h-4 w-4 text-slate-300" />
      <span className="text-xs text-slate-300 hidden sm:inline">{labels.currentLanguage}</span>
    </button>
  )
} 