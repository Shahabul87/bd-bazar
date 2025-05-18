"use client"

import { ArrowUp, ArrowDown, TrendingUp, TrendingDown } from "lucide-react"
import Image from "next/image"

interface ProductPerformanceProps {
  dateRange: string
}

interface Product {
  id: string
  name: string
  image: string
  sales: number
  revenue: number
  trend: number
  category: string
}

const products: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "https://picsum.photos/seed/1/40/40",
    sales: 245,
    revenue: 24500,
    trend: 12.5,
    category: "Electronics"
  },
  {
    id: "2",
    name: "Smart Watch",
    image: "https://picsum.photos/seed/2/40/40",
    sales: 190,
    revenue: 18750,
    trend: -4.3,
    category: "Electronics"
  },
  {
    id: "3",
    name: "Running Shoes",
    image: "https://picsum.photos/seed/3/40/40",
    sales: 156,
    revenue: 15600,
    trend: 8.7,
    category: "Sports"
  },
  {
    id: "4",
    name: "Coffee Maker",
    image: "https://picsum.photos/seed/4/40/40",
    sales: 142,
    revenue: 14200,
    trend: -2.1,
    category: "Home"
  }
]

export const ProductPerformance = ({ dateRange }: ProductPerformanceProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-xl shadow-sm border border-gray-700">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h3 className="text-lg font-medium text-white">Product Performance</h3>
          <p className="text-sm text-gray-400">Top performing and declining products</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1 text-green-400">
            <TrendingUp className="h-4 w-4" />
            <span className="text-sm">Top</span>
          </div>
          <div className="flex items-center gap-1 text-red-400">
            <TrendingDown className="h-4 w-4" />
            <span className="text-sm">Declining</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div
            key={product.id}
            className="flex items-center justify-between p-4 bg-gray-800 rounded-lg hover:bg-gray-750 transition-colors"
          >
            <div className="flex items-center gap-4">
              <Image
                src={product.image}
                alt={product.name}
                width={40}
                height={40}
                className="rounded-lg"
              />
              <div>
                <h4 className="font-medium text-white">{product.name}</h4>
                <p className="text-sm text-gray-400">{product.category}</p>
              </div>
            </div>

            <div className="flex items-center gap-8">
              <div>
                <p className="text-sm text-gray-400">Sales</p>
                <p className="font-medium text-white">{product.sales}</p>
              </div>
              <div>
                <p className="text-sm text-gray-400">Revenue</p>
                <p className="font-medium text-white">${product.revenue.toLocaleString()}</p>
              </div>
              <div className={`flex items-center gap-1 ${
                product.trend > 0 ? 'text-green-400' : 'text-red-400'
              }`}>
                {product.trend > 0 ? (
                  <ArrowUp className="h-4 w-4" />
                ) : (
                  <ArrowDown className="h-4 w-4" />
                )}
                <span className="font-medium">{Math.abs(product.trend)}%</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 