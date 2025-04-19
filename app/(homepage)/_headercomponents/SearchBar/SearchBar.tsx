"use client"

import { Search, X } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { LocationFilter } from '../Dropdowns/LocationFilter';
import { StoreFilter } from '../Dropdowns/StoreFilter';

interface SearchBarProps {
  isOpen: boolean;
  onClose: () => void;
  selectedLocation: string;
  onLocationSelect: (key: string) => void;
  selectedStore: string;
  onStoreSelect: (key: string) => void;
}

export const SearchBar = ({
  isOpen,
  onClose,
  selectedLocation,
  onLocationSelect,
  selectedStore,
  onStoreSelect
}: SearchBarProps) => {
  const { t } = useLanguage();

  if (!isOpen) return null;

  return (
    <div className="border-t border-gray-200 dark:border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:gap-4">
          {/* Search Box */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <input 
              type="search" 
              placeholder={t('search.placeholder')}
              className="block w-full pl-12 pr-3 py-3 border border-gray-300 dark:border-gray-600 rounded-md leading-5 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 text-base md:text-lg"
            />
            <button 
              onClick={onClose}
              className="absolute inset-y-0 right-0 pr-3 flex items-center md:hidden"
            >
              <X className="h-6 w-6 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
            </button>
          </div>
          
          {/* Location Filter */}
          <LocationFilter
            selectedLocation={selectedLocation}
            onLocationSelect={onLocationSelect}
          />
          
          {/* Store Type Filter */}
          <StoreFilter
            selectedStore={selectedStore}
            onStoreSelect={onStoreSelect}
          />

          {/* Close Button (Desktop) */}
          <button 
            onClick={onClose}
            className="hidden md:flex items-center justify-center py-3 px-4 ml-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800"
          >
            <X className="h-6 w-6 text-gray-400 hover:text-gray-500 dark:hover:text-gray-300" />
          </button>
        </div>
      </div>
    </div>
  );
}; 