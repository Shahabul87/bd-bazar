"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ProductsTable } from "./products-table"
import { AddProductModal } from "./add-product-modal"

interface ProductsClientProps {
  products: any[]
  storeId: string
}

export const ProductsClient = ({
  products,
  storeId
}: ProductsClientProps) => {
  const router = useRouter()

  return (
    <>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Products</h1>
          <p className="text-sm text-gray-400">
            Manage your store products
          </p>
        </div>
        <AddProductModal storeId={storeId} />
      </div>

      <div className="mt-8">
        <ProductsTable products={products} storeId={storeId} />
      </div>
    </>
  )
} 