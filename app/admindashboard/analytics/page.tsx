"use client"

import { useState } from "react"
import { AnalyticsOverview } from "./_components/analytics-overview"
import { SalesChart } from "./_components/sales-chart"
import { CustomerMetrics } from "./_components/customer-metrics"
import { ProductPerformance } from "./_components/product-performance"
import { RegionalSales } from "./_components/regional-sales"
import { MarketingEffectiveness } from "./_components/marketing-effectiveness"
import { Calendar, Download, Filter } from "lucide-react"

export default function AnalyticsPage() {
  const [dateRange, setDateRange] = useState("7d")
  const [isExporting, setIsExporting] = useState(false)
  const [activeFilters, setActiveFilters] = useState<any>(null)

  const handleExport = async () => {
    setIsExporting(true)
    try {
      // Implement export logic
      await new Promise(resolve => setTimeout(resolve, 1000))
    } finally {
      setIsExporting(false)
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Analytics Dashboard</h1>
          <p className="text-gray-400">Monitor your business performance and insights</p>
        </div>
        <div className="flex items-center gap-4">
          {/* Date Range Selector */}
          <select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
            className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
          >
            <option value="7d">Last 7 Days</option>
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="1y">Last Year</option>
          </select>

          {/* Filter Button */}
          <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700">
            <Filter className="h-4 w-4" />
            {activeFilters ? "Filters Applied" : "Add Filter"}
          </button>

          {/* Export Button */}
          <button
            onClick={handleExport}
            disabled={isExporting}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            <Download className="h-4 w-4" />
            {isExporting ? "Exporting..." : "Export Report"}
          </button>
        </div>
      </div>

      {/* Analytics Overview */}
      <AnalyticsOverview dateRange={dateRange} />

      {/* Sales Trends */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <SalesChart dateRange={dateRange} />
        </div>
        <div>
          <CustomerMetrics dateRange={dateRange} />
        </div>
      </div>

      {/* Product Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ProductPerformance dateRange={dateRange} />
        <RegionalSales dateRange={dateRange} />
      </div>

      {/* Marketing Effectiveness */}
      <MarketingEffectiveness dateRange={dateRange} />
    </div>
  )
} 