"use client"

import { MapPin } from 'lucide-react';

export const LocationSelector = () => {
  return (
    <button className="hidden lg:flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
      <MapPin className="h-5 w-5" />
      <div className="text-left">
        <p className="text-xs bg-gradient-to-r from-gray-600 to-gray-800 
          dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
          Deliver to
        </p>
        <p className="text-sm font-medium bg-gradient-to-r from-indigo-600 to-purple-600 
          dark:from-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
          New York, 10001
        </p>
      </div>
    </button>
  );
}; 