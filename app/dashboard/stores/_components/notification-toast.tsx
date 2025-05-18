"use client";

import { Check } from "lucide-react";

interface NotificationToastProps {
  showLinkCopied: boolean;
  language: string;
}

export function NotificationToast({ showLinkCopied, language }: NotificationToastProps) {
  return (
    <div 
      className={`fixed bottom-4 right-4 bg-indigo-600 text-white px-4 py-3 rounded-lg shadow-lg flex items-center gap-2 transition-opacity duration-200 ${
        showLinkCopied ? 'opacity-100' : 'opacity-0 pointer-events-none'
      }`}
    >
      <Check className="h-5 w-5 text-white" />
      <span>{language === 'en' ? 'Link copied to clipboard' : 'লিঙ্ক ক্লিপবোর্ডে কপি করা হয়েছে'}</span>
    </div>
  );
} 