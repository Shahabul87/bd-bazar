"use client"

import { useState } from "react"
import { ArrowLeft, Download, Filter, Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { OrderStatusTable } from "../_components/order-status-table"
import { OrderAlerts } from "../_components/order-alerts"
import { OrderFilterModal } from "../_components/order-filter-modal"
import { ExportOrdersModal } from "../_components/export-orders-modal"
import { AddOrderModal } from "../_components/add-order-modal"

interface StatusConfig {
  title: string
  description: string
  stats: {
    total: number
    trend: string
  }
}

const statusConfigs: Record<string, StatusConfig> = {
  all: {
    title: "All Orders",
    description: "View and manage all orders",
    stats: {
      total: 1245,
      trend: "+12.5%"
    }
  },
  pending: {
    title: "Pending Orders",
    description: "Orders awaiting processing",
    stats: {
      total: 150,
      trend: "+4.1%"
    }
  },
  completed: {
    title: "Completed Orders",
    description: "Successfully delivered orders",
    stats: {
      total: 980,
      trend: "+15.2%"
    }
  },
  cancelled: {
    title: "Cancelled Orders",
    description: "Orders that were cancelled",
    stats: {
      total: 115,
      trend: "-2.4%"
    }
  }
}

export default function OrderStatusPage({ params }: { params: { status: string } }) {
  const router = useRouter()
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>(null)

  const config = statusConfigs[params.status] || statusConfigs.all

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
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-700 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">{config.title}</h1>
            <p className="text-gray-400">{config.description}</p>
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
          {params.status === "all" && (
            <button
              onClick={() => setIsAddModalOpen(true)}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
            >
              <Plus className="h-4 w-4" />
              Add Order
            </button>
          )}
        </div>
      </div>

      {/* Stats Overview */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-sm text-gray-400">Total Orders</p>
            <h3 className="text-2xl font-bold mt-1">{config.stats.total}</h3>
            <p className={`text-sm mt-1 ${
              config.stats.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'
            }`}>
              {config.stats.trend} vs last month
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search orders..."
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
            status={params.status}
            searchQuery={searchQuery}
            filters={activeFilters}
          />
        </div>
        <div>
          <OrderAlerts status={params.status} />
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