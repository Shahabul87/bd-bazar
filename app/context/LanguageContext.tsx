"use client"

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Language = 'en' | 'bn';

interface LanguageContextType {
  language: Language;
  setLanguage: (language: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    'navbar.home': 'Home',
    'navbar.products': 'Products',
    'navbar.categories': 'Categories',
    'navbar.deals': 'Deals',
    'navbar.account': 'Account',
    'language.english': 'English',
    'language.bengali': 'Bengali',
    'topbar.message': 'Free shipping on orders over $100 • Express delivery available',
    'search.placeholder': 'Search for products...',
    'category.electronics': 'Electronics',
    'category.fashion': 'Fashion',
    'category.home': 'Home & Garden',
    'category.health': 'Health & Beauty',
    'category.toys': 'Toys',
    'category.sports': 'Sports',
    'category.books': 'Books',
    'category.automotive': 'Automotive',
    'category.more': 'More',
    'auth.login': 'Login',
    'auth.register': 'Register',
    'cart.empty': 'Your cart is empty',
    'wishlist.empty': 'Your wishlist is empty',
    'location.filter': 'Filter by Location',
    'location.all': 'All Bangladesh',
    'location.division': 'Division',
    'location.district': 'District',
    'location.thana': 'Thana',
    'location.localbazar': 'Local Bazar',
    'location.dhaka': 'Dhaka',
    'location.chittagong': 'Chittagong',
    'location.rajshahi': 'Rajshahi',
    'location.khulna': 'Khulna',
    'location.barishal': 'Barishal',
    'location.sylhet': 'Sylhet',
    'location.rangpur': 'Rangpur',
    'location.mymensingh': 'Mymensingh',
    'store.filter': 'Filter by Store Type',
    'store.all': 'All Stores',
    'store.official': 'Official Store',
    'store.retail': 'Retail Store',
    'store.wholesale': 'Wholesale',
    'store.local': 'Local Shop',
    'store.global': 'Global Brand',
    'store.mall': 'Shopping Mall',
    'store.verified': 'Verified Seller',
    'store.premium': 'Premium Store',
    // Dropdown menu translations
    'dropdown.dashboard': 'Dashboard',
    'dropdown.profile': 'Profile',
    'dropdown.orders': 'My Orders',
    'dropdown.wishlist': 'Wishlist',
    'dropdown.settings': 'Account Settings',
    'dropdown.logout': 'Logout',
    'dropdown.join_message': 'Sign in to access your account and more',
    // Add more translations as needed
  },
  bn: {
    'navbar.home': 'হোম',
    'navbar.products': 'পণ্য',
    'navbar.categories': 'ক্যাটাগরি',
    'navbar.deals': 'অফার',
    'navbar.account': 'অ্যাকাউন্ট',
    'language.english': 'ইংরেজি',
    'language.bengali': 'বাংলা',
    'topbar.message': 'ফ্রি শিপিং $১০০+ অর্ডারে • দ্রুত ডেলিভারি উপলব্ধ',
    'search.placeholder': 'পণ্য খুঁজুন...',
    'category.electronics': 'ইলেকট্রনিক্স',
    'category.fashion': 'ফ্যাশন',
    'category.home': 'হোম এন্ড গার্ডেন',
    'category.health': 'হেলথ এন্ড বিউটি',
    'category.toys': 'খেলনা',
    'category.sports': 'স্পোর্টস',
    'category.books': 'বই',
    'category.automotive': 'অটোমোটিভ',
    'category.more': 'আরো',
    'auth.login': 'লগইন',
    'auth.register': 'রেজিস্টার',
    'cart.empty': 'আপনার কার্ট খালি',
    'wishlist.empty': 'আপনার ইচ্ছাতালিকা খালি',
    'location.filter': 'অবস্থান অনুসারে ফিল্টার',
    'location.all': 'সারা বাংলাদেশ',
    'location.division': 'বিভাগ',
    'location.district': 'জেলা',
    'location.thana': 'থানা',
    'location.localbazar': 'স্থানীয় বাজার',
    'location.dhaka': 'ঢাকা',
    'location.chittagong': 'চট্টগ্রাম',
    'location.rajshahi': 'রাজশাহী',
    'location.khulna': 'খুলনা',
    'location.barishal': 'বরিশাল',
    'location.sylhet': 'সিলেট',
    'location.rangpur': 'রংপুর',
    'location.mymensingh': 'ময়মনসিংহ',
    'store.filter': 'দোকানের ধরন অনুসারে ফিল্টার',
    'store.all': 'সমস্ত দোকান',
    'store.official': 'অফিসিয়াল স্টোর',
    'store.retail': 'খুচরা দোকান',
    'store.wholesale': 'পাইকারি',
    'store.local': 'স্থানীয় দোকান',
    'store.global': 'বিশ্বব্যাপী ব্র্যান্ড',
    'store.mall': 'শপিং মল',
    'store.verified': 'যাচাইকৃত বিক্রেতা',
    'store.premium': 'প্রিমিয়াম স্টোর',
    // Dropdown menu translations
    'dropdown.dashboard': 'ড্যাশবোর্ড',
    'dropdown.profile': 'প্রোফাইল',
    'dropdown.orders': 'আমার অর্ডার',
    'dropdown.wishlist': 'ইচ্ছাতালিকা',
    'dropdown.settings': 'অ্যাকাউন্ট সেটিংস',
    'dropdown.logout': 'লগআউট',
    'dropdown.join_message': 'আপনার অ্যাকাউন্ট এবং আরও অ্যাক্সেস করতে সাইন ইন করুন',
    // Add more translations as needed
  }
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('bn');
  const [mounted, setMounted] = useState(false);

  // Only access localStorage on the client side
  useEffect(() => {
    setMounted(true);
    const savedLanguage = localStorage.getItem('language') as Language;
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'bn')) {
      setLanguage(savedLanguage);
    }
  }, []);

  const setLanguageWithStorage = (newLanguage: Language) => {
    setLanguage(newLanguage);
    if (mounted) {
      localStorage.setItem('language', newLanguage);
    }
  };

  const t = (key: string): string => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ 
      language, 
      setLanguage: setLanguageWithStorage, 
      t 
    }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextType => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}; 