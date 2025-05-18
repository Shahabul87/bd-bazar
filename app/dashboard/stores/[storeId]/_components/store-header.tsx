"use client";

import { Store, ExternalLink, Clock } from "lucide-react";
import { LanguageSwitcher } from "./language-switcher";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

interface StoreHeaderProps {
  store: any;
  storeId: string;
  preferredLanguage: string;
  t: {
    title: string;
    subtitle: string;
    storeId: string;
  };
}

export function StoreHeader({ store, storeId, preferredLanguage, t }: StoreHeaderProps) {
  // Format the creation date
  const formattedDate = new Date(store.createdAt).toLocaleDateString(
    preferredLanguage === 'en' ? 'en-US' : 'bn-BD', 
    { year: 'numeric', month: 'short', day: 'numeric' }
  );

  return (
    <div className="relative overflow-hidden rounded-2xl mb-8 bg-gradient-to-r from-indigo-600 to-purple-600 shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)]">
      <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(0deg,#fff,rgba(255,255,255,0.5))]"></div>
      <div className="relative px-6 py-8 md:px-8 md:py-10 transform hover:scale-[1.01] transition-transform duration-300">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          <div>
            <div className="flex items-center space-x-3 mb-4">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm shadow-inner">
                {store.logo ? (
                  <img 
                    src={store.logo} 
                    alt={store.name} 
                    className="h-6 w-6 object-cover rounded" 
                  />
                ) : (
                  <Store className="h-6 w-6 text-white drop-shadow-lg" />
                )}
              </div>
              <div className="flex items-center">
                <span className="text-white/90 text-sm font-medium uppercase tracking-wider mr-2">
                  {store.type || (preferredLanguage === 'en' ? 'Store' : 'স্টোর')}
                </span>
                <Badge variant="outline" className="bg-white/20 backdrop-blur-sm text-white/90 border-white/20">
                  {store.status === 'active' 
                    ? (preferredLanguage === 'en' ? 'ACTIVE' : 'সক্রিয়') 
                    : (preferredLanguage === 'en' ? 'INACTIVE' : 'নিষ্ক্রিয়')}
                </Badge>
              </div>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-2 drop-shadow-md">
              {store.name}
            </h1>
            <p className="text-white/80 max-w-lg text-sm md:text-base mb-3">
              {store.description || t.subtitle}
            </p>
            <div className="flex items-center space-x-4 text-xs text-white/70">
              <div className="flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {preferredLanguage === 'en' ? 'Created:' : 'তৈরি:'} {formattedDate}
              </div>
              {store.slug && (
                <Link 
                  href={`/store/${store.slug}`} 
                  target="_blank"
                  className="flex items-center hover:text-white/90 transition-colors"
                >
                  <ExternalLink className="h-3 w-3 mr-1" />
                  {preferredLanguage === 'en' ? 'View store' : 'স্টোর দেখুন'}
                </Link>
              )}
            </div>
          </div>
          
          <div className="mt-6 md:mt-0 flex flex-col md:flex-row items-start md:items-center md:space-x-4 space-y-3 md:space-y-0">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-2 rounded-lg text-white/90 text-sm border border-white/10">
              <span className="font-medium mr-2">{t.storeId}:</span>
              <span className="font-mono">{storeId}</span>
            </div>
            <LanguageSwitcher currentLanguage={preferredLanguage} />
          </div>
        </div>
      </div>
    </div>
  );
} 