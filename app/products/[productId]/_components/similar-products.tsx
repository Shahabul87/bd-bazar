"use client"

import { ProductCard } from "@/components/product-card"
import { Product } from "@prisma/client"

interface SimilarProductsProps {
  products: Product[];
  currentProductId: string;
}

export const SimilarProducts = ({ 
  products,
  currentProductId 
}: SimilarProductsProps) => {
  // Filter out current product and limit to 4 similar products
  const similarProducts = products
    .filter(product => product.id !== currentProductId)
    .slice(0, 4);

  if (similarProducts.length === 0) return null;

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Similar Products</h2>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {similarProducts.map((product) => (
          <ProductCard 
            key={product.id}
            data={product}
          />
        ))}
      </div>
    </div>
  );
}; 