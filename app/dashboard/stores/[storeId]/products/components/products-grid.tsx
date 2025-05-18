import { Product } from "../types";
import { ProductCard } from "./product-card";

interface ProductsGridProps {
  products: Product[];
  storeId: string;
}

export const ProductsGrid = ({ products, storeId }: ProductsGridProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id} 
          product={product} 
          storeId={storeId} 
        />
      ))}
    </div>
  );
}; 