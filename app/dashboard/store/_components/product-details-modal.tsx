"use client"

import { X } from "lucide-react"
import Image from "next/image"

interface ProductDetailsModalProps {
  isOpen: boolean
  onClose: () => void
  product: Product | null
}

interface Product {
  id: string
  name: string
  image: string
  sku: string
  category: string
  price: number
  stock: number
  status: "active" | "inactive"
  featured: boolean
}

export const ProductDetailsModal = ({
  isOpen,
  onClose,
  product
}: ProductDetailsModalProps) => {
  if (!isOpen || !product) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div className="bg-gray-800 rounded-xl p-6 max-h-[90vh] overflow-y-auto text-white">
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Product Details</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Product Details */}
          <div className="space-y-6">
            {/* Product Image and Basic Info */}
            <div className="flex gap-6">
              <div className="w-32 h-32 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="rounded-lg object-cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-medium">{product.name}</h3>
                <p className="text-gray-400 mt-1">SKU: {product.sku}</p>
                <div className="mt-4 space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Category:</span>
                    <span>{product.category}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Price:</span>
                    <span>${product.price}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Stock:</span>
                    <span className={product.stock > 0 ? 'text-green-400' : 'text-red-400'}>
                      {product.stock} units
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Status:</span>
                    <span className={`capitalize ${
                      product.status === 'active' ? 'text-green-400' : 'text-red-400'
                    }`}>
                      {product.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Featured:</span>
                    <span className={product.featured ? 'text-yellow-400' : 'text-gray-400'}>
                      {product.featured ? 'Yes' : 'No'}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <div className="mt-6 flex justify-end">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 