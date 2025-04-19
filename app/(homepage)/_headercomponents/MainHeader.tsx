"use client"

import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Heart, ShoppingCart, User } from 'lucide-react';
import Logo from '@/assets/logo.png';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { UserModal } from './UserModal';
import { SearchBar } from './SearchBar';
import { LocationSelector } from './LocationSelector';
import { HeaderActions } from './HeaderActions';
import { LanguageSwitcher } from './LanguageSwitcher';
import { User as PrismaUser } from "@prisma/client"

interface MainHeaderProps {
  user: PrismaUser | undefined;
}

export const MainHeader = ({ user }: MainHeaderProps) => {
  return (
    <div className="w-full border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-[2000px] mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-8">
          {/* Logo and Language Switcher */}
          <div className="flex items-center gap-4">
            <Link href="/" className="flex-shrink-0">
              <Image 
                src={Logo} 
                alt="Store Logo" 
                height={40} 
                width={40} 
                className="rounded-full" 
              />
            </Link>
            <LanguageSwitcher />
          </div>

          {/* Location Selector */}
          <LocationSelector />

          {/* Search Bar */}
          <SearchBar />

          {/* Actions */}
          <HeaderActions user={user}/>
        </div>
      </div>
    </div>
  );
}; 