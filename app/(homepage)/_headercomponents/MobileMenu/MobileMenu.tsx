"use client"

import Link from 'next/link';
import { LogIn, UserPlus } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { User } from "@prisma/client";

interface NavItem {
  label: string;
  href: string;
}

interface Category {
  key: string;
  slug: string;
}

interface LocationOption {
  key: string;
  value: string;
}

interface StoreType {
  key: string;
  value: string;
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  user: User | undefined;
  navItems: NavItem[];
  categories: Category[];
  locationOptions: LocationOption[];
  storeTypes: StoreType[];
  selectedLocation: string;
  onLocationSelect: (key: string) => void;
  selectedStore: string;
  onStoreSelect: (key: string) => void;
}

export const MobileMenu = ({
  isOpen,
  onClose,
  user,
  navItems,
  categories,
  locationOptions,
  storeTypes,
  selectedLocation,
  onLocationSelect,
  selectedStore,
  onStoreSelect
}: MobileMenuProps) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="md:hidden fixed inset-0 z-40 bg-white dark:bg-gray-900 pt-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <nav className="flex flex-col space-y-6">
          {/* Auth Buttons - Top of Mobile Menu when not logged in */}
          {!user && (
            <div className="flex flex-col space-y-3 pb-4 border-b border-gray-200 dark:border-gray-800">
              <Link 
                href="/login" 
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-md bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100 hover:bg-gray-200 dark:hover:bg-gray-700"
                onClick={onClose}
              >
                <LogIn className="h-5 w-5" />
                <span className="font-medium">{t('auth.login')}</span>
              </Link>
              <Link 
                href="/register" 
                className="flex items-center justify-center space-x-2 px-4 py-3 rounded-md text-white bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                onClick={onClose}
              >
                <UserPlus className="h-5 w-5" />
                <span className="font-medium">{t('auth.register')}</span>
              </Link>
            </div>
          )}

          {/* Mobile Navigation */}
          <div className="flex flex-col space-y-4">
            {navItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className="text-lg font-medium text-gray-900 dark:text-gray-100 hover:text-blue-600 dark:hover:text-blue-400"
                onClick={onClose}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('navbar.categories')}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-4">
              {categories.map((category) => (
                <Link 
                  key={category.slug} 
                  href={`/category/${category.slug}`}
                  className="text-base text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                  onClick={onClose}
                >
                  {t(category.key)}
                </Link>
              ))}
            </div>
          </div>

          {/* Location Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('location.filter')}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {locationOptions.map((option) => (
                <div 
                  key={option.value}
                  className={`px-3 py-2 text-sm rounded-md cursor-pointer ${
                    selectedLocation === option.key
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800'
                  }`}
                  onClick={() => onLocationSelect(option.key)}
                >
                  {t(option.key)}
                </div>
              ))}
            </div>
          </div>
          
          {/* Store Type Filter */}
          <div>
            <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider">
              {t('store.filter')}
            </h3>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {storeTypes.slice(0, 6).map((store) => (
                <div 
                  key={store.value}
                  className={`px-3 py-2 text-sm rounded-md cursor-pointer ${
                    selectedStore === store.key
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : 'text-gray-700 dark:text-gray-300 bg-gray-50 dark:bg-gray-800'
                  }`}
                  onClick={() => onStoreSelect(store.key)}
                >
                  {t(store.key)}
                </div>
              ))}
            </div>
          </div>

          {/* Language Switcher */}
          <div className="pt-4 border-t border-gray-200 dark:border-gray-800">
            <LanguageSwitcher />
          </div>
        </nav>
      </div>
    </div>
  );
}; 