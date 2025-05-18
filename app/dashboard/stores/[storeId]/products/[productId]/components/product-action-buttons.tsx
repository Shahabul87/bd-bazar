'use client';

import { Button } from "@/components/ui/button";
import { Trash, Save, Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { useState } from "react";
import { ProductFormValues } from "./product-form";
import { useForm } from "react-hook-form";

interface ProductActionButtonsProps {
  storeId: string;
  productId: string;
  form: ReturnType<typeof useForm<ProductFormValues>>;
  isLoading?: boolean;
  savingSection?: string | null;
}

export const ProductActionButtons = ({ 
  storeId, 
  productId, 
  form,
  isLoading = false,
  savingSection = null
}: ProductActionButtonsProps) => {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isSavingAll, setIsSavingAll] = useState(false);

  const onDelete = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      setIsDeleting(true);
      
      // Delete product using axios
      console.log("Deleting product:", productId);
      await axios.delete(`/api/products/${productId}`);
      
      toast.success("Product deleted successfully");
      // Use a delay before navigation to ensure the toast is visible
      setTimeout(() => {
        router.push(`/dashboard/stores/${storeId}/products`);
      }, 500);
    } catch (error: any) {
      console.error("Error deleting product:", error);
      toast.error(error.response?.data?.error || "Failed to delete product");
    } finally {
      setIsDeleting(false);
    }
  };

  const onSubmit = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      // Manual validation before submission
      const result = await form.trigger();
      if (!result) {
        toast.error("Please fix the form errors before saving");
        return;
      }
      
      setIsSavingAll(true);
      
      // Get values from form
      const values = form.getValues();
      
      // Prepare data for API request
      const updateData = {
        name: values.name,
        description: values.description || "",
        price: values.price,
        stock: values.stock,
        featured: values.isFeatured,
        status: values.isArchived ? "archived" : "active",
      };
      
      console.log("Saving all product changes:", updateData);
      
      // Update product using axios.patch
      const response = await axios.patch(`/api/products/${productId}`, updateData);
      console.log("Response:", response.data);
      
      toast.success("All product information updated successfully");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating product:", error);
      toast.error(error.response?.data?.error || "Failed to update product");
    } finally {
      setIsSavingAll(false);
    }
  };

  return (
    <div className="flex gap-2">
      <Button 
        type="button"
        variant="outline" 
        onClick={onDelete}
        disabled={isDeleting}
        className="text-rose-500 border-rose-200 hover:bg-rose-50 hover:text-rose-600 dark:border-rose-900 dark:hover:bg-rose-950"
      >
        {isDeleting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Trash className="h-4 w-4 mr-2" />}
        {isDeleting ? "Deleting..." : "Delete"}
      </Button>
      <Button
        type="button"
        onClick={onSubmit}
        disabled={isSavingAll}
        className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
      >
        {isSavingAll ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
        {isSavingAll ? "Saving..." : "Save All Changes"}
      </Button>
    </div>
  );
}; 