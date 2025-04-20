"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, Store, SparkleIcon } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";
import { useLanguage } from "@/app/context/LanguageContext";

// Simple schema for initial store creation
const createStoreSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters").max(50, "Store name can't exceed 50 characters"),
});

type CreateStoreFormValues = z.infer<typeof createStoreSchema>;

interface StoreTemplate {
  id: string;
  name: string;
  description: string;
  features: string[];
}

interface StoreTheme {
  id: string;
  name: string;
  preview: string;
}

interface CreateStoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: (store: any) => void;
  templates?: StoreTemplate[];
  themes?: StoreTheme[];
}

export function CreateStoreModal({
  isOpen,
  onClose,
  onSuccess,
  templates = [],
  themes = []
}: CreateStoreModalProps) {
  const router = useRouter();
  const { language } = useLanguage();
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CreateStoreFormValues>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;
  
  // Translations
  const translations = {
    en: {
      title: "Create Your Store",
      subtitle: "Start your online business journey",
      nameLabel: "Store Name",
      namePlaceholder: "Enter your store name",
      nameHelper: "Choose a name that represents your brand",
      detailsAfter: "You'll be able to add more details after creating the store",
      requiredField: "This field is required",
      createButton: "Create Store & Continue",
      creating: "Creating..."
    },
    bn: {
      title: "আপনার স্টোর তৈরি করুন",
      subtitle: "আপনার অনলাইন ব্যবসা যাত্রা শুরু করুন",
      nameLabel: "স্টোরের নাম",
      namePlaceholder: "আপনার স্টোরের নাম লিখুন",
      nameHelper: "এমন একটি নাম বেছে নিন যা আপনার ব্র্যান্ডকে প্রতিনিধিত্ব করে",
      detailsAfter: "স্টোর তৈরি করার পরে আপনি আরও বিবরণ যোগ করতে পারবেন",
      requiredField: "এই ক্ষেত্রটি প্রয়োজন",
      createButton: "স্টোর তৈরি করুন এবং চালিয়ে যান",
      creating: "তৈরি হচ্ছে..."
    }
  };
  
  const t = translations[language as keyof typeof translations] || translations.bn;
  
  const onSubmit = async (data: CreateStoreFormValues) => {
    try {
      setIsLoading(true);
      
      // Create store with just the name
      const response = await axios.post("/api/stores", {
        name: data.name,
        // Add minimum required fields with placeholders
        type: "retail", // Default type
        businessType: "general", // Default business type
        description: `${data.name} - Store details to be updated.`, // Placeholder description
      });
      
      const storeId = response.data.id;
      
      // Store the newly created store data in localStorage
      // This is a simplification - in a real app you'd use a database
      try {
        // We'll create a stores object to hold all created stores
        const existingStores = localStorage.getItem('createdStores') 
          ? JSON.parse(localStorage.getItem('createdStores') || '{}') 
          : {};
        
        // Add this store
        existingStores[storeId] = {
          ...response.data,
          name: data.name // Ensure the name is set correctly
        };
        
        localStorage.setItem('createdStores', JSON.stringify(existingStores));
      } catch (storageError) {
        console.error("Error saving to localStorage:", storageError);
        // Continue even if storage fails
      }
      
      toast.success("Store created! Complete your store details now.");
      
      // Handle success callback if provided
      if (onSuccess) {
        onSuccess(response.data);
      }
      
      // Reset form and close modal
      reset();
      onClose();
      
      // Redirect to the store dashboard page to complete setup
      router.push(`/dashboard/stores/${storeId}`);
    } catch (error: any) {
      console.error("Error creating store:", error);
      
      if (error.response?.data?.errors) {
        // Handle validation errors
        const serverErrors = error.response.data.errors;
        Object.entries(serverErrors).forEach(([key, value]) => {
          // @ts-ignore - dynamically setting form errors
          form.setError(key, { 
            type: "server", 
            message: Array.isArray(value) ? value[0] : value 
          });
        });
      } else {
        // Generic error
        toast.error(error.response?.data?.error || "Failed to create store. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={(open) => {
      if (!open) {
        reset();
        onClose();
      }
    }}>
      <DialogContent className="sm:max-w-[550px] p-0 overflow-hidden border-0 shadow-2xl">
        <DialogTitle className="sr-only">{t.title}</DialogTitle>
        
        <div className="flex flex-col md:flex-row">
          {/* Left side - colorful gradient decoration */}
          <div className="hidden md:flex md:w-1/3 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 p-8 flex-col justify-between">
            <div>
              <div className="bg-white/20 p-3 rounded-2xl w-fit backdrop-blur-sm mb-5">
                <Store className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-white text-2xl font-bold mb-2">{t.title}</h3>
              <p className="text-white/80 text-sm">{t.subtitle}</p>
            </div>
            
            <div className="grid grid-cols-3 gap-2 mt-8">
              <div className="h-8 rounded-lg bg-white/10 backdrop-blur-sm animate-pulse"></div>
              <div className="h-12 rounded-lg bg-white/20 backdrop-blur-sm animate-pulse delay-100"></div>
              <div className="h-10 rounded-lg bg-white/15 backdrop-blur-sm animate-pulse delay-200"></div>
              <div className="h-10 rounded-lg bg-white/15 backdrop-blur-sm animate-pulse delay-300"></div>
              <div className="h-8 rounded-lg bg-white/10 backdrop-blur-sm animate-pulse delay-400"></div>
              <div className="h-12 rounded-lg bg-white/20 backdrop-blur-sm animate-pulse delay-500"></div>
            </div>
          </div>
          
          {/* Right side - form */}
          <div className="p-6 md:p-8 w-full md:w-2/3 bg-white dark:bg-gray-950">
            {/* Mobile title (visible on small screens only) */}
            <div className="flex items-center gap-3 mb-6 md:hidden">
              <div className="bg-indigo-100 dark:bg-indigo-900/30 p-2 rounded-xl">
                <Store className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">{t.title}</h2>
            </div>
            
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-gray-700 dark:text-gray-300 block text-sm font-medium">
                    {t.nameLabel} <span className="text-pink-500">*</span>
                  </Label>
                  <div className="relative">
                    <Input
                      id="name"
                      placeholder={t.namePlaceholder}
                      {...register("name")}
                      className={`pl-10 bg-gray-50 dark:bg-gray-900 border ${errors.name ? "border-red-500 dark:border-red-500" : "border-gray-200 dark:border-gray-800"} rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500`}
                    />
                    <SparkleIcon className="h-5 w-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
                  </div>
                  {errors.name && (
                    <p className="text-red-500 text-sm mt-1">{errors.name.message || t.requiredField}</p>
                  )}
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                    {t.nameHelper}. <span className="opacity-70">{t.detailsAfter}.</span>
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <Button 
                  type="submit" 
                  disabled={isLoading} 
                  className="w-full h-12 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white rounded-xl transition-colors shadow-md hover:shadow-lg"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      {t.creating}
                    </>
                  ) : (
                    t.createButton
                  )}
                </Button>
              </div>
            </form>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 