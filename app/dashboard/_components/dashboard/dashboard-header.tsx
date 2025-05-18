"use client"

import { useState } from "react"
import { Download, CalendarIcon, Globe } from "lucide-react"
import { useLanguage } from "@/app/context/LanguageContext"

interface DashboardHeaderProps {
  initialDateRange: string
}

export const DashboardHeader = ({ initialDateRange }: DashboardHeaderProps) => {
  const [dateRange, setDateRange] = useState(initialDateRange)
  const [isExporting, setIsExporting] = useState(false)
  const { language, setLanguage } = useLanguage()

  // Language-specific labels
  const labels = {
    title: language === 'en' ? 'Dashboard Overview' : 'ড্যাশবোর্ড ওভারভিউ',
    subtitle: language === 'en' ? 'AI-Powered eCommerce Management Platform' : 'এআই-চালিত ই-কমার্স ম্যানেজমেন্ট প্ল্যাটফর্ম',
    lastDays7: language === 'en' ? 'Last 7 Days' : 'শেষ ৭ দিন',
    lastDays30: language === 'en' ? 'Last 30 Days' : 'শেষ ৩০ দিন',
    lastDays90: language === 'en' ? 'Last 90 Days' : 'শেষ ৯০ দিন',
    lastYear: language === 'en' ? 'Last Year' : 'গত বছর',
    exporting: language === 'en' ? 'Exporting...' : 'এক্সপোর্ট হচ্ছে...',
    exportReport: language === 'en' ? 'Export Report' : 'রিপোর্ট এক্সপোর্ট করুন',
    selectPeriod: language === 'en' ? 'Select Period' : 'সময়কাল নির্বাচন করুন',
    currentLanguage: language === 'en' ? '🇺🇸 English' : '🇧🇩 বাংলা',
  }

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Implement export logic
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-center">
      <div>
        <div className="flex items-center">
          <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
            {labels.title}
          </h1>
          <button 
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="ml-4 p-2 rounded-full bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 transition-colors flex items-center gap-2"
          >
            <Globe className="h-4 w-4 text-slate-300" />
            <span className="text-xs text-slate-300 hidden sm:inline">{labels.currentLanguage}</span>
          </button>
        </div>
        <p className="text-gray-400 mt-1 text-sm sm:text-base">{labels.subtitle}</p>
      </div>
      
      <div className="flex items-center gap-4 self-end sm:self-auto">
        {/* Date Range Selector */}
        <div className="relative">
          <div className="flex items-center gap-2 p-2 bg-slate-700/30 border border-slate-600/30 rounded-lg text-sm cursor-pointer">
            <CalendarIcon className="h-4 w-4 text-purple-400" />
            <select
              value={dateRange}
              onChange={(e) => setDateRange(e.target.value)}
              className="bg-transparent text-white border-none outline-none appearance-none pr-8 cursor-pointer"
            >
              <option value="7d">{labels.lastDays7}</option>
              <option value="30d">{labels.lastDays30}</option>
              <option value="90d">{labels.lastDays90}</option>
              <option value="1y">{labels.lastYear}</option>
            </select>
            <div className="absolute right-2 top-1/2 -translate-y-1/2 pointer-events-none">
              <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </div>
          </div>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2 bg-slate-700/30 hover:bg-slate-700/50 border border-slate-600/30 rounded-lg transition-colors disabled:opacity-50"
        >
          <Download className="h-4 w-4 text-gray-300" />
          <span className="text-sm text-gray-300">{isExporting ? labels.exporting : labels.exportReport}</span>
        </button>
      </div>
    </div>
  )
} 