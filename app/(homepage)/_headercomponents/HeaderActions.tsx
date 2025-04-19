"use client"

import Link from 'next/link';
import { Heart, ShoppingCart, User } from 'lucide-react';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { UserModal } from './UserModal';
import { User as PrismaUser } from "@prisma/client"
import { useCart } from '@/hooks/use-cart';

interface HeaderActionsProps {
  user: PrismaUser | undefined;
}

export const HeaderActions = ({ user }: HeaderActionsProps) => {
  const cart = useCart();
  
  return (
    <div className="flex items-center gap-6 lg:gap-8">
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
          font-medium animate-pulse shadow-lg">{cart.items.length}</span>
      </Link>

      {/* User Menu */}
      <div className="relative group">
        <button className="p-2 hover:bg-gray-800 rounded-full transition">
          <User className="h-6 w-6 text-gray-400" />
        </button>
        <div className="hidden group-hover:block">
          <UserModal user={user}/>
        </div>
      </div>
    </div>
  );
}; 