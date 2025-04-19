"use client"

import Link from 'next/link';
import Image from 'next/image';
import Logo from '@/assets/logo.png';
import { useLanguage } from '@/app/context/LanguageContext';
import { LanguageSwitcher } from './LanguageSwitcher';

export const TopBar = () => {
  const { t } = useLanguage();

  return (
    <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
      <div className="max-w-[2000px] mx-auto px-4 py-2 flex justify-between items-center">
        <p className="text-center text-sm font-medium bg-gradient-to-r 
          from-indigo-600 to-purple-600 dark:from-blue-200 dark:to-purple-200 
          bg-clip-text text-transparent animate-gradient tracking-wide">
          {t('topbar.message')}
        </p>
        <LanguageSwitcher />
      </div>
    </div>
  );
}; 