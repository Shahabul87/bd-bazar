"use client";

import { Suspense } from "react";
import { Building2, Loader2 } from "lucide-react";
import { StoreForm } from "./store-form";

interface StoreFormContainerProps {
  storeId: string;
  preferredLanguage: string;
  t: {
    editStoreDetails: string;
    loading: string;
  };
}

export function StoreFormContainer({ storeId, preferredLanguage, t }: StoreFormContainerProps) {
  return (
    <div className="bg-white/5 backdrop-blur-sm rounded-xl overflow-hidden border border-white/10 shadow-2xl mb-8">
      <div className="px-6 py-4 bg-gradient-to-r from-indigo-600/30 to-purple-600/30 border-b border-white/10">
        <h2 className="text-xl font-semibold text-white flex items-center">
          <Building2 className="mr-2 h-5 w-5 text-indigo-300" />
          {t.editStoreDetails}
        </h2>
      </div>
      <div className="p-6">
        <Suspense
          fallback={
            <div className="flex flex-col justify-center items-center min-h-[400px]">
              <div className="h-16 w-16 rounded-full border-4 border-indigo-300/30 border-t-indigo-600 animate-spin"></div>
              <p className="text-white/70 mt-6 font-medium">
                {t.loading}
              </p>
            </div>
          }
        >
          <StoreForm storeId={storeId} preferredLanguage={preferredLanguage} />
        </Suspense>
      </div>
    </div>
  );
} 