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
  ChevronDown,
  Package,
  Clock,
  Settings,
  LogOut,
  Truck
} from 'lucide-react';
import { LogoutButton } from '@/components/auth/logout-button';
import Logo from '@/assets/logo.png';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

export const HeaderAfterLogin = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const searchRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  // Close menus when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setIsUserMenuOpen(false);
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
            <div className="flex-1 max-w-3xl relative" ref={searchRef}>
              <div className="flex">
                <div className="relative">
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="h-11 pl-4 pr-8 rounded-l-lg border-r border-gray-200 dark:border-gray-700
                      bg-white dark:bg-gray-800 
                      text-gray-800 dark:text-gray-200 font-medium
                      focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none
                      hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                  >
                    {categories.map((category) => (
                      <option key={category} value={category} 
                        className="bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200">
                        {category}
                      </option>
                    ))}
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="flex-1 h-11 px-4 text-gray-700 dark:text-gray-200 
                    bg-white dark:bg-gray-800 border-y border-gray-200 dark:border-gray-700
                    focus:outline-none focus:ring-2 focus:ring-blue-500
                    text-sm font-medium placeholder:text-gray-400"
                />
                <button className="h-11 px-6 bg-blue-600 hover:bg-blue-700 text-white rounded-r-lg
                  flex items-center justify-center transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </div>
            </div>

            {/* Right Actions */}
            <div className="flex items-center gap-6">
              <ThemeSwitcher />
              {/* Notifications */}
              <button className="relative group">
                <Bell className="h-6 w-6 text-gray-600 dark:text-gray-200 
                  transition-all duration-200 group-hover:text-blue-500
                  drop-shadow-sm hover:drop-shadow-lg" />
                <span className="absolute -top-1 -right-1 h-5 w-5 
                  bg-gradient-to-r from-blue-500 to-purple-500
                  text-white text-xs rounded-full flex items-center justify-center 
                  font-medium animate-pulse shadow-lg">3</span>
              </button>

              {/* Wishlist */}
              <button className="relative group">
                <Heart className="h-6 w-6 text-gray-600 dark:text-gray-200 
                  transition-all duration-200 group-hover:text-pink-500
                  drop-shadow-sm hover:drop-shadow-lg" />
                <span className="absolute -top-1 -right-1 h-5 w-5 
                  bg-gradient-to-r from-pink-500 to-rose-500
                  text-white text-xs rounded-full flex items-center justify-center 
                  font-medium animate-pulse shadow-lg">5</span>
              </button>

              {/* Cart */}
              <Link href="/cart" className="relative group">
                <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-200 
                  transition-all duration-200 group-hover:text-green-500
                  drop-shadow-sm hover:drop-shadow-lg" />
                <span className="absolute -top-1 -right-1 h-5 w-5 
                  bg-gradient-to-r from-green-500 to-emerald-500
                  text-white text-xs rounded-full flex items-center justify-center 
                  font-medium animate-pulse shadow-lg">2</span>
              </Link>

              {/* User Menu */}
              <div className="relative" ref={userMenuRef}>
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-2 group"
                >
                  <User className="h-6 w-6 text-gray-600 dark:text-gray-200 
                    transition-all duration-200 group-hover:text-purple-500
                    drop-shadow-sm hover:drop-shadow-lg" />
                  <span className="hidden md:block text-sm font-medium 
                    text-gray-700 dark:text-gray-200 group-hover:text-purple-500">
                    Account
                  </span>
                  <ChevronDown className={`h-4 w-4 text-gray-500 dark:text-gray-400 
                    transition-transform duration-200 ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg 
                    shadow-xl border border-gray-100 dark:border-gray-700">
                    <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                      <p className="text-sm bg-gradient-to-r from-gray-600 to-gray-800 
                        dark:from-gray-300 dark:to-gray-400 bg-clip-text text-transparent">
                        Welcome back,
                      </p>
                      <p className="font-medium text-lg bg-gradient-to-r from-indigo-600 to-purple-600 
                        dark:from-blue-200 dark:to-purple-200 bg-clip-text text-transparent">
                        John Doe
                      </p>
                    </div>
                    <div className="p-2">
                      <Link href="/account" 
                        className="flex items-center gap-3 px-4 py-2 
                          text-gray-700 dark:text-gray-300 
                          hover:bg-gray-100 dark:hover:bg-gray-700/50 rounded-lg
                          transition-all duration-200">
                        <User className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                        <span>Your Account</span>
                      </Link>
                      <Link href="/orders" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                        <Package className="h-4 w-4" />
                        <span>Orders</span>
                      </Link>
                      <Link href="/track" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                        <Truck className="h-4 w-4" />
                        <span>Track Orders</span>
                      </Link>
                      <Link href="/settings" className="flex items-center gap-3 px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg">
                        <Settings className="h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                      <div className="border-t border-gray-700 my-2"></div>
                      <LogoutButton>
                        <div className="flex items-center gap-3 px-4 py-2 text-red-400 hover:bg-gray-700 rounded-lg w-full">
                          <LogOut className="h-4 w-4" />
                          <span>Logout</span>
                        </div>
                      </LogoutButton>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Bar */}
      <div className="w-full bg-gray-50 dark:bg-gray-800/50 border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-[2000px] mx-auto px-4">
          <div className="flex items-center gap-8 py-3 overflow-x-auto">
            {categories.map((category) => (
              <Link
                key={category}
                href={`/category/${category.toLowerCase()}`}
                className="text-sm font-medium whitespace-nowrap transition-all duration-200
                  text-gray-700 dark:text-gray-300
                  hover:text-indigo-600 dark:hover:text-blue-400
                  relative group"
              >
                {category}
                <span className="absolute inset-x-0 -bottom-1 h-0.5 
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

