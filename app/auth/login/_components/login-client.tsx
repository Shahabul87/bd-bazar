"use client";

import { LoginForm } from "@/components/auth/login-form";
import Image from "next/image";
import { useLanguage } from "@/app/context/LanguageContext";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { AppHeader } from "@/app/_components/AppHeader";

export const LoginPageClient = () => {
  const { language, setLanguage } = useLanguage();
  const { data: session, status } = useSession();
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  useEffect(() => {
    setIsAuthenticated(status === "authenticated");
  }, [status]);
  
  // Translations for the page
  const texts = {
    welcomeBack: {
      en: 'Welcome Back to',
      bn: 'আবার স্বাগতম'
    },
    signInContinue: {
      en: 'Sign in to continue your shopping experience with personalized recommendations, exclusive deals, and easy checkout.',
      bn: 'ব্যক্তিগতকৃত সুপারিশ, এক্সক্লুসিভ ডিল এবং সহজ চেকআউট সহ আপনার শপিং অভিজ্ঞতা চালিয়ে যেতে সাইন ইন করুন।'
    },
    fastCheckout: {
      en: 'Fast and secure checkout',
      bn: 'দ্রুত এবং নিরাপদ চেকআউট'
    },
    orderTracking: {
      en: 'Order tracking and history',
      bn: 'অর্ডার ট্র্যাকিং এবং ইতিহাস'
    },
    personalizedExperience: {
      en: 'Personalized shopping experience',
      bn: 'ব্যক্তিগতকৃত শপিং অভিজ্ঞতা'
    }
  };

  return (
    <>
      {isAuthenticated && <AppHeader />}
      <div className="flex flex-col lg:flex-row h-[calc(100vh-80px)] w-full bg-gradient-to-b from-slate-800 to-gray-900">
        {/* Language switcher - visible on mobile only */}
        <div className="lg:hidden flex justify-end p-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
            className="p-2 h-10 rounded-full flex items-center justify-center gap-2
              bg-slate-700/30 hover:bg-slate-700/50
              border border-gray-600/30"
          >
            <Globe className="h-4 w-4 text-gray-300" />
            <span className="text-gray-300">{language === 'en' ? '🇺🇸' : '🇧🇩'}</span>
          </Button>
        </div>
        
        {/* Left side - Hero/Image */}
        <div className="hidden lg:flex lg:w-1/2 p-12 items-center justify-center relative overflow-hidden">
          {/* Background patterns and effects */}
          <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] opacity-5 z-0"></div>
          <div className="absolute top-1/3 -right-20 w-80 h-80 bg-indigo-600 rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
          <div className="absolute bottom-1/3 -left-20 w-80 h-80 bg-slate-500 rounded-full filter blur-[100px] opacity-10 animate-pulse"></div>
          
          {/* Language switcher for desktop */}
          <div className="absolute top-4 right-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => setLanguage(language === 'en' ? 'bn' : 'en')}
              className="p-2 h-10 rounded-full flex items-center justify-center gap-2
                bg-slate-700/30 hover:bg-slate-700/50
                border border-gray-600/30"
            >
              <Globe className="h-4 w-4 text-gray-300" />
              <span className="text-gray-300">{language === 'en' ? '🇺🇸' : '🇧🇩'}</span>
            </Button>
          </div>
          
          <div className="relative z-10 text-white space-y-6 max-w-lg">
            <h1 className="text-4xl font-bold">
              {texts.welcomeBack[language]} <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-200 to-white">iSham</span>
            </h1>
            <p className="text-white/80 text-lg">
              {texts.signInContinue[language]}
            </p>
            <div className="flex flex-col space-y-4 mt-8">
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{texts.fastCheckout[language]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{texts.orderTracking[language]}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="bg-white/10 p-2 rounded-full">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <span>{texts.personalizedExperience[language]}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-4 lg:p-12 bg-slate-900/50 backdrop-blur-md">
          <LoginForm />
        </div>
      </div>
    </>
  );
}; 