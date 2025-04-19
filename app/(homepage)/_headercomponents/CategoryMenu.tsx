"use client"

import Link from 'next/link';

export const CategoryMenu = () => {
  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Home & Garden',
    'Sports',
    'Books',
    'Toys',
    'Automotive'
  ];

  return (
    <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-[2000px] mx-auto px-4">
        <div className="flex items-center gap-8 overflow-x-auto">
          {categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category.toLowerCase()}`}
              className="py-3 text-sm font-medium whitespace-nowrap transition-all duration-200
                text-gray-600 dark:text-gray-300
                hover:text-gray-900 dark:hover:text-white
                relative group"
            >
              {category}
              <span className="absolute bottom-0 left-0 w-full h-0.5 
                bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-blue-500 dark:to-purple-500
                transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}; 