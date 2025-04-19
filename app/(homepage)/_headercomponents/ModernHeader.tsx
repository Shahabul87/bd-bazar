"use client"

import { useState, useEffect } from 'react';
import { useLanguage } from '@/app/context/LanguageContext';
import { User as PrismaUser } from "@prisma/client";
import { useCart } from '@/hooks/use-cart';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';

// Import components
import { BrandLogo } from './Logo/BrandLogo';
import { MainNavigation } from './Navigation/MainNavigation';
import { HeaderActions } from './Actions/HeaderActions';
import { SearchBar } from './SearchBar/SearchBar';
import { CategoriesBar } from './Navigation/CategoriesBar';
import { MobileMenu } from './MobileMenu/MobileMenu';

interface ModernHeaderProps {
  user: PrismaUser | undefined;
}

export const ModernHeader = ({ user }: ModernHeaderProps) => {
  const { t } = useLanguage();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('location.all');
  const [selectedStore, setSelectedStore] = useState('store.all');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdowns when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.location-dropdown') && !target.closest('.store-dropdown')) {
        // This will be handled by individual components
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const primaryNavItems = [
    { label: t('navbar.home'), href: '/' },
    { label: t('navbar.products'), href: '/products' },
    { label: t('navbar.categories'), href: '/categories' },
    { label: t('navbar.deals'), href: '/deals' },
  ];

  const categories = [
    { key: 'category.electronics', slug: 'electronics' },
    { key: 'category.fashion', slug: 'fashion' },
    { key: 'category.home', slug: 'home-garden' },
    { key: 'category.health', slug: 'health-beauty' },
    { key: 'category.toys', slug: 'toys' },
    { key: 'category.sports', slug: 'sports' },
    { key: 'category.books', slug: 'books' },
    { key: 'category.automotive', slug: 'automotive' },
  ];

  const locationOptions = [
    { key: 'location.all', value: 'all' },
    { key: 'location.division', value: 'division' },
    { key: 'location.district', value: 'district' },
    { key: 'location.thana', value: 'thana' },
    { key: 'location.localbazar', value: 'localbazar' },
  ];
  
  const storeTypes = [
    { key: 'store.all', value: 'all' },
    { key: 'store.official', value: 'official' },
    { key: 'store.retail', value: 'retail' },
    { key: 'store.wholesale', value: 'wholesale' },
    { key: 'store.local', value: 'local' },
    { key: 'store.global', value: 'global' },
    { key: 'store.mall', value: 'mall' },
    { key: 'store.verified', value: 'verified' },
    { key: 'store.premium', value: 'premium' },
  ];

  const handleLocationSelect = (key: string) => {
    setSelectedLocation(key);
  };
  
  const handleStoreSelect = (key: string) => {
    setSelectedStore(key);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchBar = () => {
    setIsSearchOpen(!isSearchOpen);
  };
  
  return (
    <>
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-white/95 dark:bg-gray-900/95 backdrop-blur-sm shadow-md' 
            : 'bg-white dark:bg-gray-900'
        }`}
      >
        {/* Theme Switcher - Absolute Position */}
        <div className="absolute top-2 right-4 sm:right-6 lg:right-8 z-50">
          <ThemeSwitcher />
        </div>
        
        {/* Main Header */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Left: Logo and Nav (desktop) */}
            <div className="flex items-center">
              {/* Brand Logo */}
              <BrandLogo />
              
              {/* Desktop Navigation */}
              <MainNavigation items={primaryNavItems} />
            </div>
            
            {/* Right: Actions */}
            <HeaderActions 
              user={user}
              onSearchToggle={toggleSearchBar}
              isMobileMenuOpen={isMobileMenuOpen}
              toggleMobileMenu={toggleMobileMenu}
            />
          </div>
        </div>
        
        {/* Search Bar - Expandable */}
        <SearchBar 
          isOpen={isSearchOpen}
          onClose={() => setIsSearchOpen(false)}
          selectedLocation={selectedLocation}
          onLocationSelect={handleLocationSelect}
          selectedStore={selectedStore}
          onStoreSelect={handleStoreSelect}
        />
        
        {/* Categories Bar */}
        <CategoriesBar categories={categories} />
      </header>

      {/* Mobile Menu */}
      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        user={user}
        navItems={primaryNavItems}
        categories={categories}
        locationOptions={locationOptions}
        storeTypes={storeTypes}
        selectedLocation={selectedLocation}
        onLocationSelect={handleLocationSelect}
        selectedStore={selectedStore}
        onStoreSelect={handleStoreSelect}
      />
    </>
  );
}; 