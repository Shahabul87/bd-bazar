"use client"

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/context/LanguageContext';

export const SearchBar = () => {
  const { t } = useLanguage();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [isFocused, setIsFocused] = useState(false);
  const router = useRouter();

  const handleSearch = () => {
    if (searchQuery.trim()) {
      const searchParams = new URLSearchParams({
        q: searchQuery,
        category: selectedCategory !== 'All Categories' ? selectedCategory : ''
      });
      
      router.push(`/search?${searchParams.toString()}`);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
  ];

  return (
    <div className="flex-1 max-w-3xl mx-auto">
      <div className="relative flex items-center">
        {/* Category Selector */}
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="h-12 px-4 rounded-l-lg bg-gray-100 dark:bg-gray-800 
            border-r border-gray-300 dark:border-gray-600 
            text-gray-700 dark:text-gray-300 focus:outline-none"
        >
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>

        {/* Search Input Container */}
        <div className="relative flex-1">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={handleKeyPress}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            className="w-full h-12 px-4 bg-gray-100 dark:bg-gray-800 
              text-gray-700 dark:text-gray-300 
              focus:outline-none"
          />
          {/* Floating Label */}
          <span 
            className={`absolute left-4 pointer-events-none transition-all duration-200
              ${isFocused || searchQuery 
                ? 'transform -translate-y-3 text-xs text-blue-500' 
                : 'transform translate-y-3 text-gray-400'
              }`}
          >
            {t('search.placeholder')}
          </span>
        </div>

        {/* Search Button */}
        <button 
          onClick={handleSearch}
          className="h-12 px-6 bg-gray-100 dark:bg-gray-800 rounded-r-lg
            hover:bg-gray-200 dark:hover:bg-gray-700
            transition-colors duration-200
            text-gray-700 dark:text-gray-300"
          aria-label="Search"
        >
          <Search className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
}; 