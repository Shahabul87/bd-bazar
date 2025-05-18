"use client"

import { useState } from "react"
import { Download, Filter, Plus, Search } from "lucide-react"
import { OrdersTable } from "./_components/orders-table"
import { StatsOverview } from "./_components/stats-overview"
import { OrderFilterModal } from "./_components/order-filter-modal"
import { ExportOrdersModal } from "./_components/export-orders-modal"
import { AddOrderModal } from "./_components/add-order-modal"
import { OrderAnalytics } from "./_components/order-analytics"

export default function OrdersPage() {
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
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

  const handleAddOrder = (orderData: any) => {
    console.log("Adding new order:", orderData)
    setIsAddModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Orders</h1>
          <p className="text-gray-400">Manage and track your orders</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Order
          </button>
          <button
            onClick={() => setIsFilterModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            <Filter className="h-4 w-4" />
            {activeFilters ? "Filters Applied" : "Add Filter"}
          </button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <StatsOverview />

      {/* Analytics Section */}
      <OrderAnalytics />

      {/* Search and Table */}
      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search orders by ID, customer name, or email..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
            />
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-gray-900 rounded-lg shadow-xl border border-gray-700">
          <OrdersTable searchQuery={searchQuery} filters={activeFilters} />
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

      <AddOrderModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSubmit={handleAddOrder}
      />
    </div>
  )
} 