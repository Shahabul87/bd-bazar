"use client"

import { useState } from "react"
import { KPICards } from "./_components/dashboard/kpi-cards"
import { SalesTrends } from "./_components/dashboard/sales-trends"
import { RevenueByCategory } from "./_components/dashboard/revenue-by-category"
import { TrafficSources } from "./_components/dashboard/traffic-sources"
import { ConversionFunnel } from "./_components/dashboard/conversion-funnel"
import { ActivityFeed } from "./_components/dashboard/activity-feed"
import { Calendar, Download, Filter } from "lucide-react"
import { FilterBar } from "./_components/filter-bar"

export default function DashboardPage() {
  const [dateRange, setDateRange] = useState("7d")
  const [isExporting, setIsExporting] = useState(false)

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
          <h1 className="text-2xl font-bold">Dashboard Overview</h1>
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

      {/* Filter Bar */}
      <FilterBar />

      {/* KPI Cards */}
      <KPICards dateRange={dateRange} />

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesTrends dateRange={dateRange} />
        <RevenueByCategory dateRange={dateRange} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <TrafficSources dateRange={dateRange} />
        <ConversionFunnel dateRange={dateRange} />
      </div>

      {/* Activity Feed */}
      <ActivityFeed />
    </div>
  )
} 