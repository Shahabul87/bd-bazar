"use client"

import { Sun, Moon } from 'lucide-react';
import { useTheme } from '@/contexts/ThemeContext';

export const ThemeSwitcher = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative inline-flex items-center justify-center w-10 h-10 rounded-full
        bg-gray-800 dark:bg-gray-200 transition-colors duration-200
        hover:bg-gray-700 dark:hover:bg-gray-300 group"
      aria-label="Toggle theme"
    >
      {theme === 'dark' ? (
        <Sun className="w-4 h-4 text-amber-400 transition-transform duration-200
          group-hover:scale-110 group-hover:rotate-12" />
      ) : (
        <Moon className="w-4 h-4 text-blue-900 transition-transform duration-200
          group-hover:scale-110 group-hover:-rotate-12" />
      )}
      <span className="absolute -bottom-8 left-1/2 -translate-x-1/2 px-2 py-1 
        bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 text-xs rounded-md
        opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        {theme === 'dark' ? 'Light mode' : 'Dark mode'}
      </span>
    </button>
  );
}; 