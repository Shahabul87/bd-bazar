"use client"

import { useState } from 'react';
import { MapPin, ChevronDown } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';

interface LocationFilterProps {
  selectedLocation: string;
  onLocationSelect: (key: string) => void;
}

export const LocationFilter = ({ selectedLocation, onLocationSelect }: LocationFilterProps) => {
  const { t } = useLanguage();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const locationOptions = [
    { key: 'location.all', value: 'all' },
    { key: 'location.division', value: 'division' },
    { key: 'location.district', value: 'district' },
    { key: 'location.thana', value: 'thana' },
    { key: 'location.localbazar', value: 'localbazar' },
  ];

  const divisions = [
    { key: 'location.dhaka', value: 'dhaka' },
    { key: 'location.chittagong', value: 'chittagong' },
    { key: 'location.rajshahi', value: 'rajshahi' },
    { key: 'location.khulna', value: 'khulna' },
    { key: 'location.barishal', value: 'barishal' },
    { key: 'location.sylhet', value: 'sylhet' },
    { key: 'location.rangpur', value: 'rangpur' },
    { key: 'location.mymensingh', value: 'mymensingh' },
  ];

  const handleSelect = (key: string) => {
    onLocationSelect(key);
    setIsDropdownOpen(false);
  };
  
  return (
    <div className="relative mt-3 md:mt-0 md:w-56 location-dropdown">
      <div 
        className="flex items-center justify-between w-full px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 cursor-pointer"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
      >
        <div className="flex items-center">
          <MapPin className="h-5 w-5 mr-2 text-gray-500 dark:text-gray-400" />
          <span className="truncate">{t(selectedLocation)}</span>
        </div>
        <ChevronDown className={`h-5 w-5 text-gray-500 dark:text-gray-400 transition-transform ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
      </div>
      
      {/* Dropdown Menu */}
      {isDropdownOpen && (
        <div className="absolute w-full mt-1 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md shadow-lg z-20">
          <div className="py-1">
            {locationOptions.map((option) => (
              <div 
                key={option.value}
                className={`px-4 py-2 cursor-pointer ${
                  selectedLocation === option.key
                    ? 'bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400'
                    : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                }`}
                onClick={() => handleSelect(option.key)}
              >
                {t(option.key)}
              </div>
            ))}
          </div>
          
          {/* Divisions Submenu */}
          {selectedLocation === 'location.division' && (
            <div className="border-t border-gray-200 dark:border-gray-700 py-1">
              {divisions.map((division) => (
                <div 
                  key={division.value}
                  className="px-4 py-2 cursor-pointer text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  {t(division.key)}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}; 