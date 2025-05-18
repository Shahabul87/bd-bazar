"use client"

import { useState } from "react"
import { Eye, TrendingUp, TrendingDown, Star, ShoppingCart, BarChart2 } from "lucide-react"
import { DataTable } from "@/app/dashboard/_components/data-table"
import type { Column } from "@/app/dashboard/_components/data-table"

interface ProductAnalytics {
  id: string
  name: string
  sku: string
  category: string
  views: number
  viewsGrowth: number
  conversions: number
  conversionRate: number
  revenue: number
  revenueGrowth: number
  rating: number
  reviewCount: number
  stockLevel: number
  restockRate: number
}

interface ProductAnalyticsTableProps {
  dateRange: {
    from: string
    to: string
  }
  searchQuery: string
  category: string
}

export const ProductAnalyticsTable = ({
  dateRange,
  searchQuery,
  category
}: ProductAnalyticsTableProps) => {
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])

  // Mock data
  const products: ProductAnalytics[] = [
    {
      id: "1",
      name: "Wireless Headphones",
      sku: "WH-001",
      category: "Electronics",
      views: 1200,
      viewsGrowth: 15.2,
      conversions: 150,
      conversionRate: 12.5,
      revenue: 25000,
      revenueGrowth: 18.3,
      rating: 4.5,
      reviewCount: 45,
      stockLevel: 50,
      restockRate: 2.5
    },
    {
      id: "2",
      name: "Smart Watch",
      sku: "SW-002",
      category: "Electronics",
      views: 800,
      viewsGrowth: -8.5,
      conversions: 100,
      conversionRate: 12.5,
      revenue: 18000,
      revenueGrowth: -5.2,
      rating: 4.2,
      reviewCount: 30,
      stockLevel: 35,
      restockRate: 1.8
    },
    {
      id: "3",
      name: "Laptop Bag",
      sku: "LB-003",
      category: "Accessories",
      views: 600,
      viewsGrowth: 12.3,
      conversions: 80,
      conversionRate: 13.3,
      revenue: 15000,
      revenueGrowth: 10.5,
      rating: 4.0,
      reviewCount: 25,
      stockLevel: 45,
      restockRate: 1.5
    }
  ]

  const columns: Column<ProductAnalytics>[] = [
    {
      id: "product",
      header: "Product",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.name}</p>
          <p className="text-sm text-gray-400">SKU: {row.sku}</p>
        </div>
      )
    },
    {
      id: "views",
      header: "Views & Engagement",
      cell: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <Eye className="h-4 w-4 text-blue-400" />
            <span>{row.views.toLocaleString()}</span>
            <span className={`text-sm ${
              row.viewsGrowth >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {row.viewsGrowth >= 0 ? '+' : ''}{row.viewsGrowth}%
            </span>
          </div>
          <div className="flex items-center gap-2 mt-1">
            <ShoppingCart className="h-4 w-4 text-green-400" />
            <span>{row.conversions.toLocaleString()}</span>
            <span className="text-sm text-gray-400">({row.conversionRate}%)</span>
          </div>
        </div>
      )
    },
    {
      id: "revenue",
      header: "Revenue",
      cell: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <span className="font-medium">${row.revenue.toLocaleString()}</span>
            <span className={`text-sm ${
              row.revenueGrowth >= 0 ? 'text-green-400' : 'text-red-400'
            }`}>
              {row.revenueGrowth >= 0 ? (
                <TrendingUp className="h-4 w-4" />
              ) : (
                <TrendingDown className="h-4 w-4" />
              )}
              {Math.abs(row.revenueGrowth)}%
            </span>
          </div>
        </div>
      )
    },
    {
      id: "rating",
      header: "Rating",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Star className="h-4 w-4 text-yellow-400 fill-current" />
          <span>{row.rating}</span>
          <span className="text-sm text-gray-400">({row.reviewCount})</span>
        </div>
      )
    },
    {
      id: "stock",
      header: "Stock Analytics",
      cell: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <span className={`${
              row.stockLevel > 20 ? 'text-green-400' : 'text-yellow-400'
            }`}>
              {row.stockLevel} units
            </span>
          </div>
          <p className="text-sm text-gray-400">
            {row.restockRate.toFixed(1)}x turnover rate
          </p>
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* Implement view details */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement view analytics */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="View Analytics"
          >
            <BarChart2 className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const filteredProducts = products.filter(product => {
    let matches = true

    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      matches = matches && (
        product.name.toLowerCase().includes(search) ||
        product.sku.toLowerCase().includes(search) ||
        product.category.toLowerCase().includes(search)
      )
    }

    if (category !== "all") {
      matches = matches && product.category.toLowerCase() === category.toLowerCase()
    }

    return matches
  })

  return (
    <DataTable
      columns={columns}
      data={filteredProducts}
      pageSize={10}
      selectable
      selectedRows={selectedProducts}
      onSelectRows={setSelectedProducts}
    />
  )
} 