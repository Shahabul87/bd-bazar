"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronLeft, ChevronRight, ExternalLink, PackageCheck, PackagePlus } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProductGalleryProps {
  store: any;
  products: any[];
  limit?: number;
}

export function ProductGallery({ store, products, limit = 5 }: ProductGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  // Return placeholder if no products
  if (!products || products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-8 bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-slate-200 dark:border-slate-700">
        <PackagePlus className="h-10 w-10 text-slate-300 dark:text-slate-600 mb-4" />
        <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">No products yet</h3>
        <p className="text-sm text-slate-500 dark:text-slate-400 text-center mb-4">
          Add products to your store to see them displayed here
        </p>
        <Button asChild>
          <Link href={`/dashboard/stores/${store.id}/products/new`}>
            Add your first product
          </Link>
        </Button>
      </div>
    );
  }
  
  // Only display up to the limit
  const displayProducts = products.slice(0, limit);
  
  // Handle navigation
  const nextProduct = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === displayProducts.length - 1 ? 0 : prevIndex + 1
    );
  };
  
  const prevProduct = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? displayProducts.length - 1 : prevIndex - 1
    );
  };

  // Format currency
  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: store.currency || 'USD',
      minimumFractionDigits: 2
    }).format(amount);
  };
  
  const activeProduct = displayProducts[currentIndex];
  
  return (
    <Card className="overflow-hidden border-none shadow-md bg-white dark:bg-slate-800">
      <div className="relative h-[270px] w-full bg-slate-100 dark:bg-slate-900">
        {/* Product Image */}
        {activeProduct.images && activeProduct.images[0] ? (
          <Image 
            src={activeProduct.images[0].url}
            alt={activeProduct.name}
            fill
            className="object-cover"
          />
        ) : (
          <div className="flex items-center justify-center h-full w-full">
            <PackageCheck className="h-16 w-16 text-slate-300 dark:text-slate-700" />
          </div>
        )}
        
        {/* Navigation Controls */}
        <div className="absolute inset-0 flex items-center justify-between">
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={prevProduct}
            className="h-8 w-8 rounded-full bg-white/80 text-slate-700 dark:text-slate-200 backdrop-blur-sm ml-2 hover:bg-white/90"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={nextProduct}
            className="h-8 w-8 rounded-full bg-white/80 text-slate-700 dark:text-slate-200 backdrop-blur-sm mr-2 hover:bg-white/90"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
        
        {/* Pagination Indicator */}
        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1">
          {displayProducts.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={cn(
                "h-1.5 rounded-full transition-all", 
                index === currentIndex 
                  ? "w-4 bg-white" 
                  : "w-1.5 bg-white/50"
              )}
              aria-label={`View product ${index + 1}`}
            />
          ))}
        </div>
        
        {/* Status Badge */}
        <div className="absolute top-2 right-2">
          <span className={cn(
            "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium",
            activeProduct.active 
              ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400" 
              : "bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-400"
          )}>
            {activeProduct.active ? 'Active' : 'Inactive'}
          </span>
        </div>
      </div>
      
      <CardContent className="pt-4">
        <h3 className="text-lg font-medium mb-1 truncate">{activeProduct.name}</h3>
        <div className="flex justify-between items-center mb-2">
          <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
            {formatCurrency(Number(activeProduct.price))}
          </span>
          <span className="text-sm text-slate-500 dark:text-slate-400">
            Stock: {activeProduct.stock}
          </span>
        </div>
        <p className="text-sm text-slate-500 dark:text-slate-400 line-clamp-2">
          {activeProduct.description || "No description available"}
        </p>
      </CardContent>
      
      <CardFooter className="pt-0 flex justify-between">
        <div className="text-xs text-slate-500 dark:text-slate-400">
          SKU: {activeProduct.sku || "N/A"}
        </div>
        <Link 
          href={`/dashboard/stores/${store.id}/products/${activeProduct.id}`}
          className="text-xs inline-flex items-center text-indigo-600 dark:text-indigo-400"
        >
          Edit <ExternalLink className="ml-1 h-3 w-3" />
        </Link>
      </CardFooter>
    </Card>
  );
} 