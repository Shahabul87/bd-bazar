"use client"

import { useState } from "react"
import { ArrowLeft, Download, Filter, Calendar } from "lucide-react"
import { useRouter } from "next/navigation"
import { SalesOverview } from "../_components/sales/sales-overview"
import { SalesTrends } from "../_components/sales/sales-trends"
import { ConversionFunnel } from "../_components/sales/conversion-funnel"
import { CustomerDemographics } from "../_components/sales/customer-demographics"
import { ProductPerformance } from "../_components/sales/product-performance"
import { ReportGenerator } from "../_components/sales/report-generator"
import { SalesMetricsGrid } from "../_components/sales/sales-metrics-grid"

interface DateRange {
  from: string
  to: string
}

export default function SalesAnalyticsPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  const [isReportModalOpen, setIsReportModalOpen] = useState(false)
  const [selectedMetrics, setSelectedMetrics] = useState<string[]>([])

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
            <h1 className="text-2xl font-bold">Sales Analytics</h1>
            <p className="text-gray-400">Comprehensive sales performance analysis</p>
          </div>
        </div>
        <div className="flex gap-3">
          <div className="flex items-center gap-2 bg-gray-700 rounded-lg p-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => setDateRange(prev => ({ ...prev, from: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none text-gray-300"
            />
            <span className="text-gray-400">to</span>
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => setDateRange(prev => ({ ...prev, to: e.target.value }))}
              className="bg-transparent border-none text-sm focus:outline-none text-gray-300"
            />
          </div>
          <button
            onClick={() => setIsReportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>

      {/* Sales Overview Cards */}
      <SalesOverview dateRange={dateRange} />

      {/* Main Analytics Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue and Sales Trends */}
        <div className="space-y-6">
          <SalesTrends dateRange={dateRange} />
          <ProductPerformance dateRange={dateRange} />
        </div>

        {/* Customer Demographics and Conversion */}
        <div className="space-y-6">
          <CustomerDemographics dateRange={dateRange} />
          <ConversionFunnel dateRange={dateRange} />
        </div>
      </div>

      {/* Detailed Metrics Grid */}
      <SalesMetricsGrid dateRange={dateRange} />

      {/* Report Generator Modal */}
      <ReportGenerator
        isOpen={isReportModalOpen}
        onClose={() => setIsReportModalOpen(false)}
        dateRange={dateRange}
        selectedMetrics={selectedMetrics}
        onMetricsChange={setSelectedMetrics}
        onGenerate={(format) => {
          console.log("Generating report:", { format, dateRange, selectedMetrics })
          setIsReportModalOpen(false)
        }}
      />
    </div>
  )
} 