"use client";

import { StoreFormContainer } from "./store-form-container";
import { QuickActions } from "./quick-actions";

interface MainContentProps {
  storeId: string;
  preferredLanguage: string;
  t: {
    editStoreDetails: string;
    loading: string;
    quickActions: string;
    actions: any[];
  };
}

export function MainContent({ storeId, preferredLanguage, t }: MainContentProps) {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
      {/* Store form section */}
      <div className="xl:col-span-9">
        <StoreFormContainer 
          storeId={storeId}
          preferredLanguage={preferredLanguage}
          t={{ 
            editStoreDetails: t.editStoreDetails,
            loading: t.loading
          }}
        />
      </div>
      
      {/* Sidebar with quick actions */}
      <div className="xl:col-span-3">
        <QuickActions t={{ 
          quickActions: t.quickActions,
          actions: t.actions
        }} />
      </div>
    </div>
  );
} 