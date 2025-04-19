"use client"

import { Product } from "@prisma/client"
import { ProductCard } from "./product-card"

interface ProductListProps {
  products: Product[]
}

export const ProductList = ({
  products
}: ProductListProps) => {
  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gray-900 rounded-lg border border-gray-800">
        <h2 className="text-xl font-semibold text-white mb-2">No products found</h2>
        <p className="text-gray-400">Add your first product to get started</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {products.map((product) => (
        <ProductCard 
          key={product.id}
          product={product}
        />
      ))}
    </div>
  )
} 