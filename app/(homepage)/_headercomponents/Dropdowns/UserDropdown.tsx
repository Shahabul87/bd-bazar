"use client"

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { LogIn, UserPlus, User, Settings, ShoppingBag, Heart, LogOut } from 'lucide-react';
import { useLanguage } from '@/app/context/LanguageContext';
import { User as PrismaUser } from "@prisma/client";
import { LogoutButton } from '@/components/auth/logout-button';

interface UserDropdownProps {
  user: PrismaUser | undefined;
}

export const UserDropdown = ({ user }: UserDropdownProps) => {
  const { t } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center rounded-full w-10 h-10 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none"
        aria-label="User menu"
      >
        <User className="h-6 w-6" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-60 bg-white dark:bg-gray-900 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50 py-2">
          {user ? (
            // Logged-in user options
            <>
              <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-700">
                <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{user.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400 truncate">{user.email}</p>
              </div>
              <div className="py-1">
                <Link
                  href="/account"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <User className="h-4 w-4 mr-2" />
                  {t('dropdown.profile')}
                </Link>
                <Link
                  href="/account/orders"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <ShoppingBag className="h-4 w-4 mr-2" />
                  {t('dropdown.orders')}
                </Link>
                <Link
                  href="/wishlist"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-2" />
                  {t('dropdown.wishlist')}
                </Link>
                <Link
                  href="/account/settings"
                  className="flex items-center px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <Settings className="h-4 w-4 mr-2" />
                  {t('dropdown.settings')}
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 py-1">
                <LogoutButton>
                  <div
                    className="flex items-center px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-800 w-full"
                    onClick={() => setIsOpen(false)}
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    {t('dropdown.logout')}
                  </div>
                </LogoutButton>
              </div>
            </>
          ) : (
            // Non-logged in user options
            <>
              <div className="py-1">
                <Link
                  href="/login"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <LogIn className="h-4 w-4 mr-2" />
                  {t('auth.login')}
                </Link>
                <Link
                  href="/register"
                  className="flex items-center px-4 py-3 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800"
                  onClick={() => setIsOpen(false)}
                >
                  <UserPlus className="h-4 w-4 mr-2" />
                  {t('auth.register')}
                </Link>
              </div>
              <div className="border-t border-gray-200 dark:border-gray-700 py-2 px-4">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {t('dropdown.join_message')}
                </p>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}; 