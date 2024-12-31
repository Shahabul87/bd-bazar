"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { CategoryRevenue } from "./_components/category-revenue"
import { TopProducts } from "./_components/top-products"
import { RevenueOverview } from "./_components/revenue-overview"
import { HourlyRevenue } from "./_components/hourly-revenue"

export default function RevenuePage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState("today")

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-700 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Revenue Analytics</h1>
            <p className="text-gray-400">Detailed analysis of your revenue</p>
          </div>
        </div>

        {/* Date Range Selector */}
        <select
          value={dateRange}
          onChange={(e) => setDateRange(e.target.value)}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
        >
          <option value="today">Today</option>
          <option value="yesterday">Yesterday</option>
          <option value="week">This Week</option>
          <option value="month">This Month</option>
        </select>
      </div>

      {/* Revenue Overview */}
      <RevenueOverview dateRange={dateRange} />

      {/* Hourly Revenue Chart */}
      <HourlyRevenue dateRange={dateRange} />

      {/* Category and Products Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <CategoryRevenue dateRange={dateRange} />
        <TopProducts dateRange={dateRange} />
      </div>
    </div>
  )
} 