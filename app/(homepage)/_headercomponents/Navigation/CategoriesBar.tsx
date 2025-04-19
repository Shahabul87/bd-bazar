"use client"

import Link from 'next/link';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface Category {
  key: string;
  slug: string;
}

interface CategoriesBarProps {
  categories: Category[];
}

export const CategoriesBar = ({ categories }: CategoriesBarProps) => {
  const { t } = useLanguage();

  return (
    <div className="border-t border-gray-200 dark:border-gray-800 hidden md:block">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 py-2 overflow-x-auto scrollbar-hide">
          {categories.map((category) => (
            <Link 
              key={category.slug} 
              href={`/category/${category.slug}`}
              className="whitespace-nowrap text-base lg:text-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
            >
              {t(category.key)}
            </Link>
          ))}
          <Link 
            href="/categories" 
            className="whitespace-nowrap text-base lg:text-lg text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 flex items-center"
          >
            <span>{t('category.more')}</span>
            <ChevronDown className="h-5 w-5 ml-1" />
          </Link>
        </div>
      </div>
    </div>
  );
}; 