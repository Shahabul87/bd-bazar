"use client"

import { useCart } from "@/hooks/use-cart"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { ProductCarousel } from "./product-carousel"
import { ProductDetails } from "./product-details"
import { ShippingInfo } from "./shipping-info"
import { SimilarProducts } from "./similar-products"

interface ProductContentProps {
  product: any;
  similarProducts?: any[];
}

export const ProductContent = ({ 
  product,
  similarProducts = []
}: ProductContentProps) => {
  const cart = useCart();

  //console.log(product)

  const handleAddToCart = () => {
    cart.addItem(product);
  };

  return (
    <>
      <Link 
        href="/"
        className="inline-flex items-center text-gray-400 hover:text-white mb-8"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Home
      </Link>

      <div className="grid grid-cols-5 gap-4 lg:gap-8">
        <div className="col-span-5 lg:col-span-2">
          <ProductCarousel 
            images={product.images} 
            name={product.name} 
          />
        </div>

        <div className="col-span-5 lg:col-span-2">
          <ProductDetails 
            product={product}
            onAddToCart={handleAddToCart}
          />
        </div>

        <div className="col-span-12 lg:col-span-1">
          <ShippingInfo 
            price={product.price}
            inStock={product.inStock}
            stockCount={product.stockCount}
            store={product.store}
            product={product}
          />
        </div>
      </div>

      <div className="mt-16">
        <SimilarProducts 
          products={similarProducts}
          currentProductId={product.id}
        />
      </div>
    </>
  );
}; 