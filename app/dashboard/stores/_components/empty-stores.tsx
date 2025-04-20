"use client";

import { Button } from "@/components/ui/button";
import { PlusCircle, Store } from "lucide-react";

interface EmptyStoresProps {
  onCreateStore: () => void;
}

export function EmptyStores({ onCreateStore }: EmptyStoresProps) {
  return (
    <div className="flex min-h-[400px] flex-col items-center justify-center rounded-xl border border-dashed border-slate-700/50 p-4 sm:p-8 text-center bg-slate-800/20 backdrop-blur-sm animate-in fade-in-50">
      <div className="relative">
        <div className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-indigo-500 to-purple-500 opacity-70 blur-sm"></div>
        <div className="relative mx-auto flex h-16 w-16 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-slate-800 border border-slate-700/50">
          <Store className="h-8 w-8 sm:h-12 sm:w-12 text-indigo-400" />
        </div>
      </div>
      
      <h2 className="mt-6 sm:mt-8 text-xl sm:text-2xl font-semibold text-white">No stores created</h2>
      <p className="mb-6 sm:mb-8 mt-2 sm:mt-3 text-center text-sm text-gray-400 max-w-md leading-relaxed px-2">
        You haven't created any stores yet. Create your first store to start selling your products online and reach customers worldwide.
      </p>
      
      <Button 
        onClick={onCreateStore} 
        size="lg"
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 border-0 text-white py-3 sm:py-6 px-5 sm:px-8 h-auto shadow-lg shadow-indigo-600/20 text-sm sm:text-base"
      >
        <PlusCircle className="mr-2 h-4 w-4 sm:h-5 sm:w-5" />
        Create Your First Store
      </Button>

      <div className="mt-8 sm:mt-10 flex flex-wrap justify-center gap-4 sm:gap-6 px-2">
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-slate-700/50 flex items-center justify-center">
            <svg className="h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <span>Fast setup</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-slate-700/50 flex items-center justify-center">
            <svg className="h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1-.814-3.138 3.42 3.42 0 0 0-.806-1.946 3.42 3.42 0 0 1-3.138-3.138 3.42 3.42 0 0 0-1.946-.806 3.42 3.42 0 0 1-3.138-3.138" />
            </svg>
          </div>
          <span>Multiple templates</span>
        </div>
        
        <div className="flex items-center space-x-2 text-xs sm:text-sm text-gray-400">
          <div className="h-6 w-6 sm:h-8 sm:w-8 rounded-full bg-slate-700/50 flex items-center justify-center">
            <svg className="h-3 w-3 sm:h-4 sm:w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 15a4 4 0 0 0 4 4h9a5 5 0 1 0-.1-9.999 5.002 5.002 0 1 0-9.78 2.096A4.001 4.001 0 0 0 3 15z" />
            </svg>
          </div>
          <span>Cloud hosting included</span>
        </div>
      </div>
    </div>
  );
} 