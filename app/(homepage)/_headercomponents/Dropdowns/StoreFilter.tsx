"use client"

import { useState } from 'react';
import { Store, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface StoreFilterProps {
  selectedStore: string;
  onStoreSelect: (key: string) => void;
}

export const StoreFilter = ({ selectedStore, onStoreSelect }: StoreFilterProps) => {
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const storeTypes = [
    { key: 'store.all', value: 'all' },
    { key: 'store.official', value: 'official' },
    { key: 'store.retail', value: 'retail' },
    { key: 'store.wholesale', value: 'wholesale' },
    { key: 'store.local', value: 'local' },
    { key: 'store.global', value: 'global' },
    { key: 'store.mall', value: 'mall' },
    { key: 'store.verified', value: 'verified' },
    { key: 'store.premium', value: 'premium' },
  ];

  const handleSelect = (key: string) => {
    onStoreSelect(key);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="relative mt-3 md:mt-0 md:ml-2 md:w-56 store-dropdown">
      <div 
        className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center">
          <Store className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
          <span className="truncate">{t(selectedStore)}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20">
          <div className="py-1">
            {storeTypes.map((store) => (
              <div 
                key={store.value}
                className={`px-4 py-2 cursor-pointer ${
                  selectedStore === store.key
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleSelect(store.key)}
              >
                {t(store.key)}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}; 