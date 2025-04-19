"use client"

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Search, 
  ShoppingCart, 
  User, 
  Menu as MenuIcon, 
  Heart,
  Bell,
  MapPin,
  ChevronDown
} from 'lucide-react';
import Logo from '@/assets/logo.png';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const searchRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // Add store menu items
  const storeMenuItems = [
    { label: 'Store', href: '/store' },
    { label: 'Service Store', href: '/service-store' }
  ];

  const storeCategories = [
    { 
      label: 'Store',
      href: '/store',
      subCategories: [
        { label: 'Fashion Store', href: '/store/fashion' },
        { label: 'Electronics Store', href: '/store/electronics' },
        { label: 'Home & Living Store', href: '/store/home-living' },
        { label: 'Sports Store', href: '/store/sports' },
        { label: 'Beauty Store', href: '/store/beauty' },
        { label: 'Kids Store', href: '/store/kids' },
        { label: 'Grocery Store', href: '/store/grocery' },
      ]
    },
    {
      label: 'Service Store',
      href: '/service-store',
      subCategories: [
        { label: 'Home Services', href: '/service-store/home' },
        { label: 'Professional Services', href: '/service-store/professional' },
        { label: 'Health & Wellness', href: '/service-store/health' },
        { label: 'Education & Training', href: '/service-store/education' },
        { label: 'Auto Services', href: '/service-store/auto' },
        { label: 'Tech Support', href: '/service-store/tech' },
        { label: 'Event Services', href: '/service-store/events' },
      ]
    }
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white dark:bg-gray-900 shadow-md">
      {/* Top Bar */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-[2000px] mx-auto px-4 py-2">
          <p className="text-center text-sm font-medium bg-gradient-to-r 
            from-indigo-600 to-purple-600 dark:from-blue-200 dark:to-purple-200 
            bg-clip-text text-transparent animate-gradient tracking-wide">
            Free shipping on orders over $100 • Express delivery available
          </p>
        </div>
      </div>

      {/* Main Header */}
      <div className="w-full border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[2000px] mx-auto px-4 py-4">
          <div className="flex items-center justify-between gap-8">
            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <Image 
                src={Logo} 
                alt="Store Logo" 
                height={40} 
                width={40} 
                className="rounded-full" 
              />
            </Link>

            {/* Location Selector */}
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

            {/* Search Bar */}
            <div className="flex-1 max-w-4xl relative" ref={searchRef}>
              <div className="relative flex items-center rounded-lg overflow-hidden">
                {/* Categories Selector */}
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-12 pl-4 pr-8 text-sm bg-gray-100 dark:bg-gray-800 
                      border-r border-gray-300 dark:border-gray-600
                      text-gray-600 dark:text-gray-300
                      focus:outline-none
                      appearance-none cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700
                      transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 
                    text-gray-500 dark:text-gray-400 pointer-events-none" />
                </div>

                {/* Search Input */}
                <div className="flex-1 relative">
                  <input
                    type="text"
                    id="searchInput"
                    placeholder=" "  // Empty placeholder
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full h-12 pl-4 pr-12 text-sm bg-gray-100 dark:bg-gray-800 
                      text-gray-900 dark:text-gray-100
                      focus:outline-none
                      peer" // Add peer class for floating label
                  />
                  {/* Floating Label */}
                  <label
                    htmlFor="searchInput"
                    className="absolute text-sm text-gray-500 dark:text-gray-400
                      left-4 top-1/2 -translate-y-1/2
                      peer-focus:text-xs peer-focus:text-blue-500 
                      peer-focus:-translate-y-8
                      peer-[:not(:placeholder-shown)]:text-xs 
                      peer-[:not(:placeholder-shown)]:-translate-y-8
                      transform-gpu transition-all duration-200
                      pointer-events-none z-20"
                  >
                    Search for products, brands and more...
                  </label>
                  <button 
                    className="absolute right-0 top-0 h-full px-4
                      text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200
                      transition-colors z-10"
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              </div>

              {/* Search Results Dropdown */}
              {isSearchOpen && searchQuery && (
                <div className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 
                  rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                      Popular Searches
                    </h3>
                    <div className="space-y-2">
                      {/* Example search results */}
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 
                        dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg
                        transition-colors">
                        iPhone 13 Pro Max
                      </button>
                      <button className="w-full text-left px-3 py-2 text-sm text-gray-700 
                        dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg
                        transition-colors">
                        Samsung Galaxy S22
                      </button>
                      {/* Add more search results as needed */}
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <ThemeSwitcher />
              
              {/* Wishlist */}
              <button className="relative group">
                <Heart className="h-6 w-6 text-gray-600 dark:text-gray-200 
                  transition-all duration-200 group-hover:text-pink-500
                  drop-shadow-sm hover:drop-shadow-lg" />
                <span className="absolute -top-1 -right-1 h-5 w-5 
                  bg-gradient-to-r from-pink-500 to-rose-500
                  text-white text-xs rounded-full flex items-center justify-center 
                  font-medium animate-pulse shadow-lg">0</span>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative group">
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-200 
                  transition-all duration-200 group-hover:text-green-500
                  drop-shadow-sm hover:drop-shadow-lg" />
                <span className="absolute -top-1 -right-1 h-5 w-5 
                  bg-gradient-to-r from-green-500 to-emerald-500
                  text-white text-xs rounded-full flex items-center justify-center 
                  font-medium animate-pulse shadow-lg">0</span>
              </Link>

              {/* Auth Buttons */}
              <div className="hidden md:flex items-center gap-4">
                <Link href="/auth/login" 
                  className="text-gray-700 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white">
                  Sign In
                </Link>
                <Link href="/auth/register" 
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    transition-colors">
                  Create Account
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Combined Store and Categories Menu Bar */}
      <div className="bg-gray-100 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="flex items-center space-x-8">
            {/* Store and Service Store Dropdowns */}
            {storeCategories.map((store) => (
              <div key={store.label} className="relative group">
                <Link
                  href={store.href}
                  className="py-3 text-gray-600 dark:text-gray-300 hover:text-gray-900 
                    dark:hover:text-white relative group inline-flex items-center gap-1"
                >
                  {store.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-blue-600 
                    transform scale-x-0 group-hover:scale-x-100 transition-transform"></span>
                </Link>

                {/* Store Dropdown Menu */}
                <div className="absolute left-0 top-full mt-1 w-64 bg-white dark:bg-gray-800 
                  rounded-lg shadow-lg border border-gray-200 dark:border-gray-700
                  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
                  transition-all duration-200 z-50">
                  <div className="py-2">
                    {store.subCategories.map((subCategory) => (
                      <Link
                        key={subCategory.label}
                        href={subCategory.href}
                        className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 
                          hover:bg-gray-100 dark:hover:bg-gray-700/50 transition-colors"
                      >
                        {subCategory.label}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            ))}

            {/* Divider */}
            <div className="h-6 w-px bg-gray-300 dark:bg-gray-700"></div>

            {/* Categories */}
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
    </header>
  );
};

