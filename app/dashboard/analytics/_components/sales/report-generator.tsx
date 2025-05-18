"use client"

import { useState } from "react"
import { X, Download, FileText, Table, Calendar } from "lucide-react"

interface ReportGeneratorProps {
  isOpen: boolean
  onClose: () => void
  dateRange: {
    from: string
    to: string
  }
  selectedMetrics: string[]
  onMetricsChange: (metrics: string[]) => void
  onGenerate: (format: string) => void
}

interface MetricOption {
  id: string
  label: string
  category: string
}

const metricOptions: MetricOption[] = [
  // Sales Metrics
  { id: "total_revenue", label: "Total Revenue", category: "Sales" },
  { id: "avg_order_value", label: "Average Order Value", category: "Sales" },
  { id: "orders_count", label: "Number of Orders", category: "Sales" },
  { id: "sales_by_category", label: "Sales by Category", category: "Sales" },
  
  // Product Metrics
  { id: "top_products", label: "Top Selling Products", category: "Products" },
  { id: "product_performance", label: "Product Performance", category: "Products" },
  { id: "inventory_levels", label: "Inventory Levels", category: "Products" },
  
  // Customer Metrics
  { id: "customer_acquisition", label: "Customer Acquisition", category: "Customers" },
  { id: "customer_retention", label: "Customer Retention", category: "Customers" },
  { id: "customer_demographics", label: "Customer Demographics", category: "Customers" },
  
  // Conversion Metrics
  { id: "conversion_rate", label: "Conversion Rate", category: "Conversion" },
  { id: "cart_abandonment", label: "Cart Abandonment Rate", category: "Conversion" },
  { id: "funnel_analysis", label: "Funnel Analysis", category: "Conversion" }
]

export const ReportGenerator = ({
  isOpen,
  onClose,
  dateRange,
  selectedMetrics,
  onMetricsChange,
  onGenerate
}: ReportGeneratorProps) => {
  const [format, setFormat] = useState<"pdf" | "excel" | "csv">("pdf")

  if (!isOpen) return null

  const categories = Array.from(new Set(metricOptions.map(m => m.category)))

  const handleMetricToggle = (metricId: string) => {
    if (selectedMetrics.includes(metricId)) {
      onMetricsChange(selectedMetrics.filter(id => id !== metricId))
    } else {
      onMetricsChange([...selectedMetrics, metricId])
    }
  }

  const handleSelectAll = (category: string) => {
    const categoryMetrics = metricOptions
      .filter(m => m.category === category)
      .map(m => m.id)
    
    const allSelected = categoryMetrics.every(id => selectedMetrics.includes(id))
    
    if (allSelected) {
      onMetricsChange(selectedMetrics.filter(id => !categoryMetrics.includes(id)))
    } else {
      onMetricsChange([...selectedMetrics, ...categoryMetrics])
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-white">Generate Report</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full text-gray-400"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Date Range */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Report Period</h3>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-400 mb-1">From</label>
              <input
                type="date"
                value={dateRange.from}
                disabled
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-400 mb-1">To</label>
              <input
                type="date"
                value={dateRange.to}
                disabled
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg text-gray-300"
              />
            </div>
          </div>
        </div>

        {/* Metrics Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Select Metrics</h3>
          <div className="space-y-4">
            {categories.map(category => (
              <div key={category} className="space-y-2">
                <div className="flex items-center justify-between">
                  <h4 className="text-sm font-medium text-gray-400">{category}</h4>
                  <button
                    onClick={() => handleSelectAll(category)}
                    className="text-xs text-blue-400 hover:text-blue-300"
                  >
                    Select All
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {metricOptions
                    .filter(metric => metric.category === category)
                    .map(metric => (
                      <label
                        key={metric.id}
                        className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          checked={selectedMetrics.includes(metric.id)}
                          onChange={() => handleMetricToggle(metric.id)}
                          className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                        />
                        {metric.label}
                      </label>
                    ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Format Selection */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-300 mb-3">Report Format</h3>
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={() => setFormat("pdf")}
              className={`p-3 border border-gray-600 rounded-lg flex flex-col items-center gap-1 ${
                format === "pdf" ? "bg-blue-600 border-blue-500" : "hover:bg-gray-700"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm">PDF</span>
            </button>
            <button
              onClick={() => setFormat("excel")}
              className={`p-3 border border-gray-600 rounded-lg flex flex-col items-center gap-1 ${
                format === "excel" ? "bg-blue-600 border-blue-500" : "hover:bg-gray-700"
              }`}
            >
              <Table className="h-5 w-5" />
              <span className="text-sm">Excel</span>
            </button>
            <button
              onClick={() => setFormat("csv")}
              className={`p-3 border border-gray-600 rounded-lg flex flex-col items-center gap-1 ${
                format === "csv" ? "bg-blue-600 border-blue-500" : "hover:bg-gray-700"
              }`}
            >
              <FileText className="h-5 w-5" />
              <span className="text-sm">CSV</span>
            </button>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={() => onGenerate(format)}
            disabled={selectedMetrics.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Generate Report
          </button>
        </div>
      </div>
    </div>
  )
} 