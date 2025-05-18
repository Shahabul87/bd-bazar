"use client"

import { useState } from "react"
import { ArrowLeft, Download, Filter, XCircle, Search, AlertTriangle } from "lucide-react"
import { useRouter } from "next/navigation"
import { OrderStatusTable } from "../_components/order-status-table"
import { OrderAlerts } from "../_components/order-alerts"
import { OrderFilterModal } from "../_components/order-filter-modal"
import { ExportOrdersModal } from "../_components/export-orders-modal"

// Additional stats specific to cancelled orders
interface CancelledStats {
  totalLoss: string
  cancellationRate: string
  topReason: string
  preventableCount: number
}

const cancelledStats: CancelledStats = {
  totalLoss: "$24,500",
  cancellationRate: "8.5%",
  topReason: "Out of Stock",
  preventableCount: 28
}

export default function CancelledOrdersPage() {
  const router = useRouter()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>(null)

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters)
    setIsFilterModalOpen(false)
  }

  const handleExport = (format: string, options: any) => {
    console.log("Exporting orders:", { format, options })
    setIsExportModalOpen(false)
  }

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
            <h1 className="text-2xl font-bold">Cancelled Orders</h1>
            <p className="text-gray-400">Orders that were cancelled</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-900/50 rounded-lg">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Loss</p>
              <h3 className="text-xl font-bold mt-1">{cancelledStats.totalLoss}</h3>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <div>
            <p className="text-sm text-gray-400">Cancellation Rate</p>
            <h3 className="text-xl font-bold mt-1">{cancelledStats.cancellationRate}</h3>
            <p className="text-sm text-red-400 mt-1">+2.1% vs last month</p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <div>
            <p className="text-sm text-gray-400">Top Cancellation Reason</p>
            <h3 className="text-xl font-bold mt-1">{cancelledStats.topReason}</h3>
            <p className="text-sm text-yellow-400 mt-1">Inventory management needed</p>
          </div>
        </div>

        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/50 rounded-lg">
              <AlertTriangle className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Preventable Cancellations</p>
              <h3 className="text-xl font-bold mt-1">{cancelledStats.preventableCount}</h3>
              <p className="text-sm text-yellow-400 mt-1">Action required</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search cancelled orders..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          {activeFilters ? "Filters Applied" : "Add Filter"}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderStatusTable
            status="cancelled"
            searchQuery={searchQuery}
            filters={activeFilters}
          />
        </div>
        <div>
          <OrderAlerts status="cancelled" />
        </div>
      </div>

      {/* Modals */}
      <OrderFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />

      <ExportOrdersModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  )
} 