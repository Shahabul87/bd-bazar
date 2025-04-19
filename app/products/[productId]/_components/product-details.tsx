"use client"

import { useCart } from "@/hooks/use-cart"
import { Star, Truck, Clock, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatPrice } from "@/lib/format"
import Link from "next/link"
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card"
import { ProductHeader } from './product-sections/product-header';
import { ProductPrice } from './product-sections/product-price';
import { ProductSpecifications } from './product-sections/product-specifications';
import { ProductColors } from './product-sections/product-colors';
import { ProductDimensions } from './product-sections/product-dimensions';
import { ProductDescription } from './product-sections/product-description';

interface ProductDetailsProps {
  product: {
    id: string;
    name: string;
    description: string;
    price: number;
    sku: string;
    brand: string;
    active: boolean;
    featured: boolean;
    inStock: boolean;
    stock: number;
    stockCount: number;
    status: string;
    storeId: string;
    specifications: Array<{ name: string; value: string }>;
    colors: Record<string, string> | null;
    dimensions: Record<string, any> | null;
    images: Array<{}>;
    store: {
      id: string;
      name: string;
    };
    user: {
      id: string;
      name: string;
      email: string;
    };
    categories: any[];
    createdAt: string;
    updatedAt: string;
    orderItems: any[];
    reviews: any[];
  };
  onAddToCart?: () => void;
  ratingBreakdown?: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
}

export const ProductDetails = ({
  product,
  onAddToCart,
  ratingBreakdown = {
    5: 70,
    4: 20,
    3: 7,
    2: 2,
    1: 1
  },
}: ProductDetailsProps) => {
  const cart = useCart();

  const handleAddToCart = () => {
    if (onAddToCart) {
      onAddToCart();
    }
  };
  console.log(product.specifications)
  const totalRatingsCount = Object.values(ratingBreakdown).reduce((a, b) => a + b, 0);

  // Smarter splitting of description into bullet points
  const descriptionPoints = product.description
    .split(/(?<=\.|\!|\?)\s+/) // Split after sentence endings (., !, ?)
    .map(point => point.trim())
    .filter(point => point.length > 0)
    .map(point => point.replace(/^[•\-\*]\s*/, '')); // Remove any existing bullet points

  const calculateRating = () => {
    if (!product.reviews || product.reviews.length === 0) return 0;
    const totalStars = product.reviews.reduce((sum, review) => sum + (review.rating || 0), 0);
    return totalStars / product.reviews.length;
  };

  const rating = calculateRating();

  return (
    <div className="space-y-8">
      <ProductHeader 
        name={product.name} 
        store={product.store} 
        rating={rating}
        totalRatings={product.reviews.length} 
        ratingBreakdown={ratingBreakdown} 
      />

      <ProductPrice 
        price={product.price} 
        inStock={product.inStock} 
        stockCount={product.stockCount} 
      />

      <Separator className="bg-gray-800" />

      <ProductSpecifications specifications={product.specifications} />

      <Separator className="bg-gray-800" />
      {/* <ProductColors colors={product.colors} />
      <ProductDimensions dimensions={product.dimensions} /> */}
      <ProductDescription description={product.description} descriptionPoints={descriptionPoints} />

      <Separator className="bg-gray-800" />
    </div>
  );
}; 