"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios from "axios";

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
  const [isLoading, setIsLoading] = useState(false);
  
  const form = useForm<CreateStoreFormValues>({
    resolver: zodResolver(createStoreSchema),
    defaultValues: {
      name: "",
    }
  });

  const { register, handleSubmit, formState: { errors }, reset } = form;
  
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
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a New Store</DialogTitle>
          <DialogDescription>
            Let's start with a name for your store. You can complete the full details after creation.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="space-y-6 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">Store Name <span className="text-red-500">*</span></Label>
              <Input
                id="name"
                placeholder="Enter your store name"
                {...register("name")}
                className={errors.name ? "border-red-500" : ""}
              />
              {errors.name && (
                <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Choose a name that represents your brand. You'll be able to add more details after creating the store.
              </p>
            </div>
          </div>

          <DialogFooter className="mt-6">
            <Button type="submit" disabled={isLoading} className="bg-gradient-to-r from-indigo-600 to-purple-600 w-full">
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
                </>
              ) : (
                "Create Store & Continue"
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
} 