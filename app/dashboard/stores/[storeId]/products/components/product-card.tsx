import Link from "next/link";
import { 
  AlertCircle, ChevronDown, Clock, 
  EyeIcon, FileEdit, Box, Tag 
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Product } from "../types";
import { getProductImage } from "../utils";

interface ProductCardProps {
  product: Product;
  storeId: string;
}

export const ProductCard = ({ product, storeId }: ProductCardProps) => {
  return (
    <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-sm overflow-hidden border border-slate-200 dark:border-slate-700 hover:shadow-md transition-all duration-200">
      <div className="relative h-48 overflow-hidden bg-slate-100 dark:bg-slate-900">
        <img
          src={getProductImage(product)}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
        />
        
        {/* Status Badge */}
        {product.stock === 0 ? (
          <span className="absolute top-2 right-2 px-2 py-1 bg-rose-600 text-white text-xs font-medium rounded-full">
            Out of Stock
          </span>
        ) : product.stock < 10 ? (
          <span className="absolute top-2 right-2 px-2 py-1 bg-amber-500 text-white text-xs font-medium rounded-full">
            Low Stock ({product.stock})
          </span>
        ) : null}
        
        {/* Tags */}
        <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
          {product.featured && (
            <span className="bg-indigo-600 text-white text-xs px-2 py-0.5 rounded">
              Featured
            </span>
          )}
          {product.active && (
            <span className="bg-emerald-600 text-white text-xs px-2 py-0.5 rounded">
              Active
            </span>
          )}
        </div>
      </div>
      
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="font-medium text-base line-clamp-1">{product.name}</h3>
        </div>
        
        <div className="flex items-center justify-between text-sm">
          <span className="font-semibold text-lg text-slate-900 dark:text-slate-100">
            ${parseFloat(product.price.toString()).toFixed(2)}
          </span>
          <span className="text-slate-500 dark:text-slate-400 flex items-center text-xs">
            <Tag className="h-3 w-3 mr-1" />
            {product.categories.length > 0 
              ? product.categories[0].mainCategory || "Uncategorized"
              : "Uncategorized"}
          </span>
        </div>
        
        <div className="flex items-center justify-between text-sm pt-1">
          <div className="flex items-center text-slate-500 dark:text-slate-400">
            <Box className="h-3 w-3 mr-1" />
            <span>{product.stock} in stock</span>
          </div>
        </div>
      </div>
      
      <div className="flex items-center justify-between p-4 pt-0">
        <div className="flex items-center text-xs text-slate-400">
          <Clock className="h-3 w-3 mr-1" />
          Updated {new Date(product.updatedAt).toLocaleDateString()}
        </div>
        
        <div className="flex space-x-1">
          <Link 
            href={`/dashboard/stores/${storeId}/products/${product.id}`}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-500 hover:text-indigo-600"
            >
              <EyeIcon className="h-4 w-4" />
            </Button>
          </Link>
          <Link 
            href={`/dashboard/stores/${storeId}/products/${product.id}`}
          >
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-8 w-8 text-slate-500 hover:text-indigo-600"
            >
              <FileEdit className="h-4 w-4" />
            </Button>
          </Link>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 text-slate-500 hover:text-indigo-600"
              >
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem asChild>
                <Link href={`/dashboard/stores/${storeId}/products/${product.id}`}>
                  <FileEdit className="h-4 w-4 mr-2" />
                  Edit Product
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <AlertCircle className="h-4 w-4 mr-2" />
                Mark as {product.active ? "Inactive" : "Active"}
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}; 