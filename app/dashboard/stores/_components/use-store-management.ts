"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import axios from "axios";
import { Store } from "./types";

// Helper function to normalize store data
const normalizeStore = (store: any): Store => {
  return {
    id: store.id || "",
    name: store.name || "",
    slug: store.slug || store.name?.toLowerCase().replace(/\s+/g, "-") || "store",
    type: store.type || "retail",
    theme: store.theme || "default",
    status: store.status || "active",
    visitors: typeof store.visitors === 'number' ? store.visitors : 0,
    orders: typeof store.orders === 'number' ? store.orders : 0,
    revenue: typeof store.revenue === 'number' ? store.revenue : 0,
    lastUpdated: store.updatedAt || store.lastUpdated || new Date().toISOString(),
    products: typeof store.products === 'number' ? store.products : 0,
    logo: store.logo || undefined,
    description: store.description || "",
    businessType: store.businessType || "general"
  };
};

export function useStoreManagement(initialStores: any[] = []) {
  const [isCreatingStore, setIsCreatingStore] = useState(false);
  const [stores, setStores] = useState<Store[]>(initialStores.map(normalizeStore));
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showLinkCopied, setShowLinkCopied] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Update stores when initialStores prop changes
  useEffect(() => {
    if (initialStores && initialStores.length > 0) {
      setStores(initialStores.map(normalizeStore));
    }
  }, [initialStores]);

  // Copy store URL to clipboard
  const copyStoreUrl = (slug: string) => {
    const url = `${window.location.origin}/store/${slug}`;
    navigator.clipboard.writeText(url);
    // Show toast notification
    setShowLinkCopied(true);
    setTimeout(() => setShowLinkCopied(false), 2000);
  };

  const handleCreateStore = async (storeData: { name: string; type: string; businessType: string; description?: string }) => {
    setIsLoading(true);
    try {
      // Create store via API
      const response = await axios.post("/api/stores", storeData);
      const newStore = normalizeStore(response.data);
      
      // Add the new store to the state
      setStores(prev => [newStore, ...prev]);
      toast.success("Store created successfully!");
      return Promise.resolve();
    } catch (error: any) {
      console.error("Error creating store:", error);
      
      if (error.response?.status === 409) {
        toast.error("A store with this name already exists.");
      } else if (error.response?.status === 401) {
        toast.error("You must be logged in to create a store.");
      } else {
        toast.error("Failed to create store. Please try again.");
      }
      return Promise.reject(error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateSuccess = (newStore: any) => {
    // Normalize the new store data
    const normalizedStore = normalizeStore(newStore);
    
    // Refresh stores list to include the newly created store
    const fetchStores = async () => {
      setIsLoading(true);
      try {
        // Fetch stores from the database
        const response = await axios.get("/api/stores");
        setStores(response.data.map(normalizeStore));
      } catch (error) {
        console.error("Error fetching stores:", error);
        // If API call fails, at least add the new store to the state
        setStores(prev => [normalizedStore, ...prev]);
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch all stores including the new one
    fetchStores();
  };

  return {
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
  };
} 