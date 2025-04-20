"use client";

import Link from "next/link";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { 
  Globe, 
  Menu, 
  Search, 
  ShoppingCart, 
  User, 
  Home, 
  Package, 
  Heart,
  LogOut,
  Settings,
  ChevronDown
} from "lucide-react";
import { useState, useEffect } from "react";
import { useSession, signOut } from "next-auth/react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const AppHeader = () => {
  const { language, setLanguage } = useLanguage();
  const { data: session, status } = useSession();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [mounted, setMounted] = useState(false);
  const isAuthenticated = status === "authenticated";

  // Wait for client-side rendering to complete before showing dynamic content
  useEffect(() => {
    setMounted(true);
    // In a real app, fetch this from your cart state/API
    setCartCount(Math.floor(Math.random() * 5));
  }, []);

  // Translations
  const texts = {
    home: {
      en: 'Home',
      bn: 'হোম'
    },
    products: {
      en: 'Products',
      bn: 'পণ্যসমূহ'
    },
    dashboard: {
      en: 'Dashboard',
      bn: 'ড্যাশবোর্ড'
    },
    wishlist: {
      en: 'Wishlist',
      bn: 'ইচ্ছেতালিকা'
    },
    account: {
      en: 'Account',
      bn: 'অ্যাকাউন্ট'
    },
    settings: {
      en: 'Settings',
      bn: 'সেটিংস'
    },
    logout: {
      en: 'Logout',
      bn: 'লগআউট'
    },
    search: {
      en: 'Search',
      bn: 'অনুসন্ধান'
    },
    cart: {
      en: 'Cart',
      bn: 'কার্ট'
    },
    profile: {
      en: 'Profile',
      bn: 'প্রোফাইল'
    },
    orders: {
      en: 'Orders',
      bn: 'অর্ডার'
    }
  };

  // If not mounted yet, render a simplified header to prevent hydration mismatch
  if (!mounted) {
    return (
      <header className="w-full bg-slate-800 border-b border-slate-700/50 py-3 px-4 lg:px-8 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-lg">i</span>
            </div>
            <span className="text-xl font-bold text-white hidden sm:inline-block">iSham</span>
          </Link>
          <div className="w-10 h-10"></div> {/* Placeholder to maintain layout */}
        </div>
      </header>
    );
  }

  return (
    <header className="w-full bg-slate-800 border-b border-slate-700/50 py-3 px-4 lg:px-8 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="h-9 w-9 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center flex-shrink-0">
            <span className="text-white font-bold text-lg">i</span>
          </div>
          <span className="text-xl font-bold text-white hidden sm:inline-block">iSham</span>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link href="/" className="text-gray-300 hover:text-white transition-colors">
            {texts.home[language]}
          </Link>
          <Link href="/products" className="text-gray-300 hover:text-white transition-colors">
            {texts.products[language]}
          </Link>
          {isAuthenticated && (
            <Link href="/dashboard" className="text-gray-300 hover:text-white transition-colors">
              {texts.dashboard[language]}
            </Link>
          )}
        </nav>

        {/* Actions */}
        <div className="flex items-center space-x-4">
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="p-2 rounded-full"
          >
            <Globe className="h-5 w-5 text-gray-300" />
          </Button>
          
          <Link href="/search" className="p-2 text-gray-300 hover:text-white">
            <Search className="h-5 w-5" />
          </Link>
          
          {isAuthenticated && (
            <Link href="/wishlist" className="p-2 text-gray-300 hover:text-white">
              <Heart className="h-5 w-5" />
            </Link>
          )}
          
          <Link href="/cart" className="p-2 text-gray-300 hover:text-white relative">
            <ShoppingCart className="h-5 w-5" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 h-4 w-4 rounded-full bg-blue-600 text-white text-[10px] flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
          
          {isAuthenticated ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="p-1.5 rounded-full bg-slate-700/60 border border-slate-600/50 text-gray-300 hover:text-white">
                  <User className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-slate-800 border border-slate-700 text-gray-200">
                <DropdownMenuLabel className="flex items-center gap-2">
                  <div className="h-8 w-8 rounded-full bg-blue-600 flex items-center justify-center">
                    {session?.user?.name?.charAt(0) || 'U'}
                  </div>
                  <div className="flex flex-col">
                    <span className="font-medium">{session?.user?.name || 'User'}</span>
                    <span className="text-xs text-gray-400">{session?.user?.email || ''}</span>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem asChild>
                  <Link href="/profile" className="flex items-center gap-2 cursor-pointer">
                    <User className="h-4 w-4" />
                    <span>{texts.profile[language]}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/orders" className="flex items-center gap-2 cursor-pointer">
                    <Package className="h-4 w-4" />
                    <span>{texts.orders[language]}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/dashboard" className="flex items-center gap-2 cursor-pointer">
                    <Home className="h-4 w-4" />
                    <span>{texts.dashboard[language]}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/settings" className="flex items-center gap-2 cursor-pointer">
                    <Settings className="h-4 w-4" />
                    <span>{texts.settings[language]}</span>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-slate-700" />
                <DropdownMenuItem 
                  className="flex items-center gap-2 cursor-pointer text-red-400 hover:text-red-300"
                  onClick={() => signOut({ callbackUrl: "/login" })}
                >
                  <LogOut className="h-4 w-4" />
                  <span>{texts.logout[language]}</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Link href="/login" className="p-1.5 rounded-full bg-slate-700/60 border border-slate-600/50 text-gray-300 hover:text-white">
              <User className="h-5 w-5" />
            </Link>
          )}
          
          {/* Mobile menu button */}
          <Button 
            type="button" 
            variant="ghost" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 md:hidden rounded-full"
          >
            <Menu className="h-5 w-5 text-gray-300" />
          </Button>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-slate-800 border-b border-slate-700/50 py-3 px-4">
          <nav className="flex flex-col space-y-3">
            <Link 
              href="/" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-slate-700/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Home className="h-5 w-5" />
              <span>{texts.home[language]}</span>
            </Link>
            <Link 
              href="/products" 
              className="flex items-center space-x-2 text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-slate-700/50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Package className="h-5 w-5" />
              <span>{texts.products[language]}</span>
            </Link>
            {isAuthenticated && (
              <>
                <Link 
                  href="/dashboard" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-slate-700/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <User className="h-5 w-5" />
                  <span>{texts.dashboard[language]}</span>
                </Link>
                <Link 
                  href="/wishlist" 
                  className="flex items-center space-x-2 text-gray-300 hover:text-white px-2 py-1.5 rounded-md hover:bg-slate-700/50 transition-colors"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Heart className="h-5 w-5" />
                  <span>{texts.wishlist[language]}</span>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}; 