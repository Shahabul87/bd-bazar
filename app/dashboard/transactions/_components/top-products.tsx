"use client"

import { TrendingUp } from "lucide-react"

interface TopProduct {
  name: string
  category: string
  amount: string
  trend: number
}

const topProducts: TopProduct[] = [
  {
    name: "ZendQ",
    category: "Marketing",
    amount: "$375,441.00",
    trend: 12.5
  },
  {
    name: "DLhunter",
    category: "AI Development",
    amount: "$142,665.00",
    trend: 8.2
  }
]

export const TopProducts = () => {
  return (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="font-medium text-lg mb-4">Top Products</h3>
      <div className="space-y-4">
        {topProducts.map((product) => (
          <div key={product.name} className="flex items-center justify-between">
            <div>
              <h4 className="font-medium">{product.name}</h4>
              <p className="text-sm text-gray-500">{product.category}</p>
            </div>
            <div className="text-right">
              <p className="font-medium">{product.amount}</p>
              <p className="text-sm text-green-600 flex items-center gap-1">
                <TrendingUp className="h-3 w-3" />
                {product.trend}%
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 