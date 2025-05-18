'use client';

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { ProductFormValues } from "./product-form";
import { useForm } from "react-hook-form";
import { ProductActionButtons } from "./product-action-buttons";

interface ProductHeaderProps {
  storeId: string;
  productId: string;
  form: ReturnType<typeof useForm<ProductFormValues>>;
  isLoading?: boolean;
  savingSection?: string | null;
}

export const ProductHeader = ({ 
  storeId, 
  productId, 
  form,
  isLoading = false,
  savingSection = null
}: ProductHeaderProps) => {
  const router = useRouter();
  
  const handleBackClick = () => {
    router.push(`/dashboard/stores/${storeId}/products`);
  };
  
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <Button 
          variant="outline" 
          size="icon"
          onClick={handleBackClick}
          className="mr-1 shadow-sm"
        >
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold tracking-tight bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            {form.watch("name") || "New Product"}
          </h1>
          <p className="text-sm text-muted-foreground">
            Edit your product information and manage inventory
          </p>
        </div>
      </div>
      <ProductActionButtons 
        storeId={storeId}
        productId={productId}
        form={form}
        isLoading={isLoading}
        savingSection={savingSection}
      />
    </div>
  );
}; 