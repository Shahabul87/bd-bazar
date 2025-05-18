"use client";

import { useRouter } from "next/navigation";
import { useLanguage } from "@/app/context/LanguageContext";
import { DashboardShell } from "@/app/dashboard/_components/dashboard/dashboard-shell";

import { StoreHeader } from "./store-header";
import { StoreStats } from "./store-stats";
import { ViewModeSwitcher } from "./view-mode-switcher";
import { StoreLoading } from "./store-loading";
import { StoreListView } from "./store-list-view";
import { EmptyStores } from "./empty-stores";
import { StoreCard } from "./store-card";
import { NotificationToast } from "./notification-toast";
import { CreateStoreModal } from "./create-store-modal";
import { Store, StoreManagementClientProps } from "./types";
import { useStoreManagement } from "./use-store-management";

export function StoreManagementClient({ user, initialStores = [] }: StoreManagementClientProps) {
  const router = useRouter();
  const { language } = useLanguage();
  
  const { 
    isCreatingStore,
    setIsCreatingStore,
    stores,
    viewMode,
    setViewMode,
    showLinkCopied,
    isLoading,
    copyStoreUrl,
    handleCreateStore,
    handleCreateSuccess
  } = useStoreManagement(initialStores);

  return (
    <DashboardShell>
      {/* Hero section with gradient background */}
      <StoreHeader 
        language={language}
        onCreateStore={() => setIsCreatingStore(true)}
      />

      {/* Store stats overview */}
      <StoreStats 
        stores={stores}
        language={language}
        isCreatingStore={isCreatingStore}
      />

      {/* View mode switcher */}
      {!isCreatingStore && stores.length > 0 && (
        <ViewModeSwitcher
          viewMode={viewMode}
          setViewMode={setViewMode}
          language={language}
        />
      )}

      {/* Stores display - Loading state */}
      {isLoading && (
        <StoreLoading language={language} />
      )}

      {/* Empty state */}
      {!isLoading && !isCreatingStore && stores.length === 0 && (
        <EmptyStores onCreateStore={() => setIsCreatingStore(true)} />
      )}

      {/* Grid view */}
      {!isLoading && !isCreatingStore && stores.length > 0 && viewMode === 'grid' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          {stores.map((store) => (
            <StoreCard key={store.id} store={store} />
          ))}
        </div>
      )}

      {/* List view */}
      {!isLoading && !isCreatingStore && stores.length > 0 && viewMode === 'list' && (
        <StoreListView 
          stores={stores}
          language={language}
          onCopyLink={copyStoreUrl}
        />
      )}

      {/* Create Store Modal */}
      <CreateStoreModal
        isOpen={isCreatingStore}
        onClose={() => setIsCreatingStore(false)}
        onSuccess={handleCreateSuccess}
      />

      {/* Link copied notification */}
      <NotificationToast 
        showLinkCopied={showLinkCopied}
        language={language}
      />
    </DashboardShell>
  );
} 