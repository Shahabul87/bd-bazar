"use client"

import { useState } from "react"
import { Search, Filter, Download, Clock, Package, CheckCircle, XCircle } from "lucide-react"
import { DeliveryTable } from "./_components/delivery-table"
import { DeliveryFilterModal } from "./_components/delivery-filter-modal"
import { ExportOptionsModal } from "./_components/export-options-modal"
import { DateRangePicker } from "@/app/dashboard/_components/date-range-picker"
import { DeliveryOverview } from "./_components/delivery-overview"
import { DeliveryStatusBreakdown } from "./_components/delivery-status-breakdown"
import { ShipmentTracking } from "./_components/shipment-tracking"
import { DeliveryPerformance } from "./_components/delivery-performance"
import { CourierManagement } from "./_components/courier-management"
import { ReturnsAndFailures } from "./_components/returns-and-failures"
import { DeliveryAlerts } from "./_components/delivery-alerts"
import { AdvancedFilters } from "./_components/advanced-filters"

interface DateRange {
  from: string
  to: string
}

interface QuickStats {
  totalOrders: number
  delivered: number
  failed: number
  avgDeliveryTime: string
}

export default function DeliveryPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>(null)
  const [selectedDeliveries, setSelectedDeliveries] = useState<string[]>([])
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })

  // Mock data for quick stats
  const quickStats: QuickStats = {
    totalOrders: 156,
    delivered: 89,
    failed: 12,
    avgDeliveryTime: "2.5 days"
  }

  const handleDateRangeChange = (range: DateRange) => {
    setDateRange(range)
    // Implement date range filter logic
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <div className="flex items-center gap-2 text-sm text-gray-400 mb-2">
            <span>Home</span>
            <span>/</span>
            <span>Admin Dashboard</span>
            <span>/</span>
            <span className="text-white">Delivery</span>
          </div>
          <h1 className="text-2xl font-bold">Delivery Management</h1>
          <p className="text-gray-400">Track and manage your deliveries</p>
        </div>
        <DateRangePicker
          dateRange={dateRange}
          onDateRangeChange={handleDateRangeChange}
          presets={[
            { label: "Today", days: 0 },
            { label: "Last 7 Days", days: 7 },
            { label: "Last 30 Days", days: 30 }
          ]}
        />
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Orders</p>
              <p className="text-2xl font-bold">{quickStats.totalOrders}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-900/50 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Delivered</p>
              <p className="text-2xl font-bold text-green-400">{quickStats.delivered}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-900/50 rounded-full">
              <XCircle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Failed Deliveries</p>
              <p className="text-2xl font-bold text-red-400">{quickStats.failed}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-full">
              <Clock className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-purple-400">{quickStats.avgDeliveryTime}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Delivery Overview */}
      <DeliveryOverview dateRange={dateRange} />

      {/* Delivery Status Breakdown */}
      <DeliveryStatusBreakdown dateRange={dateRange} />

      {/* Shipment Tracking */}
      <ShipmentTracking dateRange={dateRange} />

      {/* Delivery Performance Analysis */}
      <DeliveryPerformance dateRange={dateRange} />

      {/* Courier Management */}
      <CourierManagement
        onAddCourier={() => {
          // Implement add courier logic
          console.log("Adding new courier")
        }}
        onEditCourier={(courier) => {
          // Implement edit courier logic
          console.log("Editing courier:", courier)
        }}
      />

      {/* Returns and Failed Deliveries */}
      <ReturnsAndFailures dateRange={dateRange} />

      {/* Delivery Alerts */}
      <DeliveryAlerts dateRange={dateRange} />

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search by tracking number, customer name, or address..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          <Filter className="h-4 w-4" />
          {activeFilters ? "Filters Applied" : "Add Filter"}
        </button>
        <button
          onClick={() => setIsExportModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          <Download className="h-4 w-4" />
          Export
        </button>
      </div>

      {/* Advanced Filters */}
      <AdvancedFilters
        dateRange={dateRange}
        onFilterChange={(filters) => {
          console.log("Filters changed:", filters)
          // Implement filter logic
        }}
        onSortChange={(sort) => {
          console.log("Sort changed:", sort)
          // Implement sort logic
        }}
      />

      {/* Delivery Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <DeliveryTable
          searchQuery={searchQuery}
          filters={activeFilters}
          selectedDeliveries={selectedDeliveries}
          onSelectDeliveries={setSelectedDeliveries}
        />
      </div>

      {/* Modals */}
      <DeliveryFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => {
          setActiveFilters(filters)
          setIsFilterModalOpen(false)
        }}
      />

      <ExportOptionsModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={(format) => {
          console.log("Exporting in format:", format)
          setIsExportModalOpen(false)
        }}
      />
    </div>
  )
} 