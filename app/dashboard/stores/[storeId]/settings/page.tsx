"use client";

import { useParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import StoreSettingsForm from "../_components/store-settings-form";
import DeleteStoreButton from "@/app/dashboard/stores/[storeId]/_components/delete-store-button";
import { Settings, ImageIcon, ShieldCheck, Bell, Globe, CreditCard, ExternalLink, Loader2 } from "lucide-react";
import { AppearanceSettings } from "./_components/appearance/appearance-settings";
import { PrivacySettings } from "./_components/privacy-settings";
import { NotificationSettings } from "./_components/notification-settings";
import { DomainSettings } from "./_components/domain-settings";
import { BillingSettings } from "./_components/billing-settings";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";

export default function StoreSettingsPage() {
  const params = useParams();
  const storeId = params.storeId as string;
  const [storeSlug, setStoreSlug] = useState<string>("");
  const [isLoadingSlug, setIsLoadingSlug] = useState(true);

  // Fetch store slug
  useEffect(() => {
    const fetchStoreDetails = async () => {
      if (!storeId) return;
      
      try {
        const response = await axios.get(`/api/stores/${storeId}`);
        setStoreSlug(response.data.slug);
      } catch (error) {
        console.error("Error fetching store details:", error);
        toast.error("Could not load store information");
      } finally {
        setIsLoadingSlug(false);
      }
    };
    
    fetchStoreDetails();
  }, [storeId]);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-2xl font-bold tracking-tight flex items-center">
            <Settings className="h-5 w-5 mr-2 text-indigo-500" />
            Store Settings
          </h2>
          <p className="text-sm text-muted-foreground">
            Manage your store preferences and information
          </p>
        </div>
        
        {isLoadingSlug ? (
          <Button disabled variant="outline" size="sm" className="gap-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            Loading...
          </Button>
        ) : (
          <a
            href={`/store/${storeSlug}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow transition-colors hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-indigo-600 disabled:pointer-events-none disabled:opacity-50"
          >
            <ExternalLink className="mr-2 h-4 w-4" />
            Visit Store
          </a>
        )}
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-2 md:grid-cols-6 mb-8 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-1 rounded-xl">
          <TabsTrigger 
            value="general" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <Settings className="h-4 w-4" />
            <span className="hidden sm:inline">General</span>
          </TabsTrigger>
          <TabsTrigger 
            value="appearance" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <ImageIcon className="h-4 w-4" />
            <span className="hidden sm:inline">Appearance</span>
          </TabsTrigger>
          <TabsTrigger 
            value="privacy" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <ShieldCheck className="h-4 w-4" />
            <span className="hidden sm:inline">Privacy</span>
          </TabsTrigger>
          <TabsTrigger 
            value="notifications" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <Bell className="h-4 w-4" />
            <span className="hidden sm:inline">Notifications</span>
          </TabsTrigger>
          <TabsTrigger 
            value="domains" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <Globe className="h-4 w-4" />
            <span className="hidden sm:inline">Domains</span>
          </TabsTrigger>
          <TabsTrigger 
            value="billing" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <CreditCard className="h-4 w-4" />
            <span className="hidden sm:inline">Billing</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="general" className="space-y-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-8 pt-6">
              <StoreSettingsForm storeId={storeId} />
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-8 border border-red-200 dark:border-red-800/30">
            <div>
              <h2 className="text-xl font-semibold text-red-600 dark:text-red-400 mb-2 flex items-center">
                <span className="bg-red-100 dark:bg-red-900/30 w-8 h-8 rounded-full flex items-center justify-center mr-2">
                  <span className="text-red-600 dark:text-red-400">!</span>
                </span>
                Danger Zone
              </h2>
              <p className="text-sm text-muted-foreground mb-6">
                Actions here cannot be undone. Please be careful when deleting your store.
              </p>
              <DeleteStoreButton storeId={storeId} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="appearance">
          <div className="bg-slate-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-0">
              <AppearanceSettings storeId={storeId} />
            </div>
          </div>
        </TabsContent>
        
        <TabsContent value="privacy">
          <PrivacySettings storeId={storeId} />
        </TabsContent>
        
        <TabsContent value="notifications">
          <NotificationSettings storeId={storeId} />
        </TabsContent>
        
        <TabsContent value="domains">
          <DomainSettings storeId={storeId} />
        </TabsContent>
        
        <TabsContent value="billing">
          <BillingSettings storeId={storeId} />
        </TabsContent>
      </Tabs>
    </div>
  );
} 