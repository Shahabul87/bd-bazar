"use client"

import Link from 'next/link';
import { useLanguage } from '@/app/context/LanguageContext';

interface NavItem {
  label: string;
  href: string;
}

interface MainNavigationProps {
  items: NavItem[];
}

export const MainNavigation = ({ items }: MainNavigationProps) => {
  return (
    <nav className="hidden md:ml-10 md:flex md:space-x-8">
      {items.map((item) => (
        <Link 
          key={item.href} 
          href={item.href}
          className="text-gray-700 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400 px-3 py-2 text-base lg:text-lg font-medium"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}; 