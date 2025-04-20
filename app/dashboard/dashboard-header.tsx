'use client';

import { User } from '@prisma/client';
import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

interface DashboardHeaderProps {
  user: User | undefined;
  initialDateRange: string;
}

export function DashboardHeader({ user, initialDateRange }: DashboardHeaderProps) {
  const { language } = useLanguage();
  const [dateRange, setDateRange] = useState(initialDateRange);
  
  // Date range options
  const dateRanges = {
    today: {
      en: 'Today',
      bn: 'আজ',
    },
    yesterday: {
      en: 'Yesterday',
      bn: 'গতকাল',
    },
    last7Days: {
      en: 'Last 7 Days',
      bn: 'গত ৭ দিন',
    },
    last30Days: {
      en: 'Last 30 Days',
      bn: 'গত ৩০ দিন',
    },
    thisMonth: {
      en: 'This Month',
      bn: 'এই মাস',
    },
    lastMonth: {
      en: 'Last Month',
      bn: 'গত মাস',
    },
  };
  
  return (
    <div className="bg-slate-800/80 backdrop-blur-sm border-b border-slate-700/50 px-6 py-4 flex items-center justify-between">
      {/* Page Title & Date Range Selector */}
      <div className="flex items-center">
        <h1 className="text-xl font-semibold text-white mr-4">
          {language === 'en' ? 'Dashboard' : 'ড্যাশবোর্ড'}
        </h1>
        
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 px-3 py-1.5 text-sm text-gray-300 bg-slate-700/50 rounded-md hover:bg-slate-700 transition-colors">
              <span>{dateRanges[dateRange][language]}</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="bg-slate-800 border-slate-700 text-gray-200 w-36 z-50">
            {Object.entries(dateRanges).map(([key, value]) => (
              <DropdownMenuItem
                key={key}
                className={`cursor-pointer ${dateRange === key ? 'bg-slate-700' : ''}`}
                onClick={() => setDateRange(key)}
              >
                {value[language]}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      
      {/* Right Side Actions - Just dashboard search */}
      <div className="flex items-center">
        {/* Search */}
        <div className="flex items-center relative bg-slate-700/30 hover:bg-slate-700/50 transition-colors rounded-md">
          <Search className="absolute left-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder={language === 'en' ? 'Search dashboard...' : 'ড্যাশবোর্ড অনুসন্ধান...'}
            className="h-9 w-48 bg-transparent border-none rounded-md pl-8 text-sm text-gray-200 placeholder:text-gray-400 focus:outline-none focus:ring-1 focus:ring-gray-500"
          />
        </div>
      </div>
    </div>
  );
} 