"use client"

import { useRouter } from "next/navigation"
import { Package } from "lucide-react"
import { formatPrice } from "@/lib/format"
import Link from "next/link"
import Image from "next/image"

interface ProductCardProps {
  data: {
    id: string
    name: string
    price: number
    images: any[]
    category?: string
    inStock: boolean
    stockCount: number
  }
}

export const ProductCard = ({ data }: ProductCardProps) => {
  const router = useRouter()

  return (
    <Link href={`/products/${data.id}`}>
      <div className="group cursor-pointer">
        <div className="aspect-square relative bg-gray-800 rounded-xl overflow-hidden">
          {data.images?.[0]?.url ? (
            <Image
              src={data.images[0].url}
              alt={data.name}
              fill
              className="object-cover group-hover:scale-105 transition"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-12 w-12 text-gray-600" />
            </div>
          )}
        </div>
        {!data.inStock && (
          <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded">
            Out of Stock
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="p-4">
        <h3 className="text-lg font-semibold text-white mb-1 truncate">
          {data.name}
        </h3>
        {data.category && (
          <p className="text-sm text-gray-400 mb-2">{data.category}</p>
        )}
        <div className="flex items-center justify-between">
          <p className="text-lg font-bold text-white">
            {formatPrice(data.price)}
          </p>
          {data.inStock && (
            <p className="text-sm text-gray-400">
              {data.stockCount} available
            </p>
          )}
        </div>
      </div>
    </Link>
  )
} 