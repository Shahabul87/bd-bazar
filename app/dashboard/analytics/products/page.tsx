"use client"

import { useState } from "react"
import { Search, Filter, Download } from "lucide-react"
import { ProductPerformanceOverview } from "./_components/product-performance-overview"
import { TopPerformingProducts } from "./_components/top-performing-products"
import { LowPerformingProducts } from "./_components/low-performing-products"
import { StockInsights } from "./_components/stock-insights"
import { CustomerInteractions } from "./_components/customer-interactions"
import { RevenueBreakdown } from "./_components/revenue-breakdown"
import { ProductAnalyticsTable } from "./_components/product-analytics-table"
import { DateRangePicker } from "@/app/dashboard/_components/date-range-picker"
import { ReturnsAnalysis } from "./_components/returns-analysis"
import { PriceOptimizationInsights } from "./_components/price-optimization-insights"
import { CustomerReviews } from "./_components/customer-reviews"
import { AdvancedFilters } from "./_components/advanced-filters"
import { PredictiveAnalytics } from "./_components/predictive-analytics"

interface DateRange {
  from: string
  to: string
}

export default function ProductAnalyticsPage() {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 7 days ago
    to: new Date().toISOString().split('T')[0] // today
  })
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string>("all")

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">Product Analytics</h1>
          <p className="text-gray-400">Track and analyze product performance metrics</p>
        </div>
        <div className="flex items-center gap-4">
          <DateRangePicker
            value={dateRange}
            onChange={setDateRange}
          />
          <button
            onClick={() => {/* Implement export */}}
            className="flex items-center gap-2 px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products by name, SKU, or category..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">All Categories</option>
          <option value="electronics">Electronics</option>
          <option value="clothing">Clothing</option>
          <option value="accessories">Accessories</option>
        </select>
        <AdvancedFilters
          dateRange={dateRange}
          onFilterChange={(filters) => {
            console.log('Filters changed:', filters)
            // Implement filter logic
          }}
          onSortChange={(sort) => {
            console.log('Sort changed:', sort)
            // Implement sort logic
          }}
        />
      </div>

      {/* Performance Overview */}
      <ProductPerformanceOverview dateRange={dateRange} />

      {/* Top and Low Performing Products */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TopPerformingProducts dateRange={dateRange} />
        <LowPerformingProducts dateRange={dateRange} />
      </div>

      {/* Stock Insights */}
      <StockInsights dateRange={dateRange} />

      {/* Customer Interactions */}
      <CustomerInteractions dateRange={dateRange} />

      {/* Revenue Breakdown */}
      <RevenueBreakdown dateRange={dateRange} />

      {/* Returns Analysis */}
      <ReturnsAnalysis dateRange={dateRange} />

      {/* Price Optimization Insights */}
      <PriceOptimizationInsights dateRange={dateRange} />

      {/* Customer Reviews */}
      <CustomerReviews dateRange={dateRange} />

      {/* Predictive Analytics */}
      <PredictiveAnalytics dateRange={dateRange} />

      {/* Detailed Analytics Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <ProductAnalyticsTable
          dateRange={dateRange}
          searchQuery={searchQuery}
          category={selectedCategory}
        />
      </div>
    </div>
  )
} 