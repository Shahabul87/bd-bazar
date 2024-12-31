"use client"

import { Package, TrendingUp, ShoppingCart, AlertTriangle } from "lucide-react"

interface ProductPerformanceOverviewProps {
  dateRange: {
    from: string
    to: string
  }
}

export const ProductPerformanceOverview = ({ dateRange }: ProductPerformanceOverviewProps) => {
  // Mock data
  const metrics = {
    totalProducts: 1245,
    totalRevenue: 125000,
    averageOrderValue: 85,
    outOfStock: 23,
    revenueGrowth: 12.5,
    productGrowth: 8.3,
    orderGrowth: 15.2,
    stockAlert: -5.4
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {/* Total Products */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-blue-900/50 rounded-lg">
            <Package className="h-5 w-5 text-blue-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Products</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-white">{metrics.totalProducts}</p>
              <span className={`text-sm ${metrics.productGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.productGrowth >= 0 ? '+' : ''}{metrics.productGrowth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Revenue */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-900/50 rounded-lg">
            <TrendingUp className="h-5 w-5 text-green-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Total Revenue</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-white">
                ${metrics.totalRevenue.toLocaleString()}
              </p>
              <span className={`text-sm ${metrics.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.revenueGrowth >= 0 ? '+' : ''}{metrics.revenueGrowth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Average Order Value */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-purple-900/50 rounded-lg">
            <ShoppingCart className="h-5 w-5 text-purple-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Average Order Value</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-white">
                ${metrics.averageOrderValue}
              </p>
              <span className={`text-sm ${metrics.orderGrowth >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.orderGrowth >= 0 ? '+' : ''}{metrics.orderGrowth}%
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Out of Stock */}
      <div className="bg-gray-900 p-4 rounded-xl border border-gray-700">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-red-900/50 rounded-lg">
            <AlertTriangle className="h-5 w-5 text-red-400" />
          </div>
          <div>
            <p className="text-sm text-gray-400">Out of Stock</p>
            <div className="flex items-center gap-2">
              <p className="text-xl font-bold text-white">{metrics.outOfStock}</p>
              <span className={`text-sm ${metrics.stockAlert >= 0 ? 'text-green-400' : 'text-red-400'}`}>
                {metrics.stockAlert >= 0 ? '+' : ''}{metrics.stockAlert}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 