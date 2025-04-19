"use client"

import Link from 'next/link';
import { Search, ShoppingBag, Heart, User, CreditCard, Menu, X, LogIn, UserPlus } from 'lucide-react';
import { LanguageSwitcher } from '../LanguageSwitcher';
import { useLanguage } from '@/app/context/LanguageContext';
import { User as PrismaUser } from "@prisma/client";
import { useCart } from '@/hooks/use-cart';
import { UserDropdown } from '../Dropdowns/UserDropdown';

interface HeaderActionsProps {
  user: PrismaUser | undefined;
  onSearchToggle: () => void;
  isMobileMenuOpen: boolean;
  toggleMobileMenu: () => void;
}

export const HeaderActions = ({ 
  user, 
  onSearchToggle,
  isMobileMenuOpen,
  toggleMobileMenu
}: HeaderActionsProps) => {
  const { t } = useLanguage();
  const cart = useCart();

  return (
    <div className="flex items-center space-x-5 md:space-x-6">
      {/* Language Switcher */}
      <div className="hidden md:block">
        <LanguageSwitcher />
      </div>
      
      {/* Search toggle */}
      <button 
        onClick={onSearchToggle} 
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
        aria-label="Search"
      >
        <Search className="h-6 w-6" />
      </button>
      
      {/* Credit Card */}
      <Link 
        href="/payment" 
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 relative"
      >
        <CreditCard className="h-6 w-6" />
      </Link>
      
      {/* Wishlist */}
      <Link 
        href="/wishlist" 
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 relative"
      >
        <Heart className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
          0
        </span>
      </Link>
      
      {/* Cart */}
      <Link 
        href="/cart" 
        className="text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 relative"
      >
        <ShoppingBag className="h-6 w-6" />
        <span className="absolute -top-1 -right-1 h-5 w-5 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center text-white text-[10px] font-bold">
          {cart.items.length}
        </span>
      </Link>
      
      {/* User Dropdown Menu */}
      <div className="hidden md:block">
        <UserDropdown user={user} />
      </div>
      
      {/* Mobile Only: User Dropdown */}
      <div className="md:hidden">
        <UserDropdown user={user} />
      </div>
      
      {/* Mobile menu button */}
      <button 
        onClick={toggleMobileMenu}
        className="inline-flex items-center justify-center md:hidden"
      >
        {isMobileMenuOpen ? 
          <X className="h-6 w-6 text-gray-600 dark:text-gray-400" /> : 
          <Menu className="h-6 w-6 text-gray-600 dark:text-gray-400" />
        }
      </button>
    </div>
  );
}; 