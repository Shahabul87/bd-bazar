"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface CustomerFiltersProps {
  isOpen: boolean
  onClose: () => void
  onApply: (filters: any) => void
  initialFilters: any
}

export const CustomerFilters = ({
  isOpen,
  onClose,
  onApply,
  initialFilters
}: CustomerFiltersProps) => {
  const [filters, setFilters] = useState({
    spendingRange: {
      min: initialFilters?.spendingRange?.min || "",
      max: initialFilters?.spendingRange?.max || ""
    },
    orderCount: {
      min: initialFilters?.orderCount?.min || "",
      max: initialFilters?.orderCount?.max || ""
    },
    status: initialFilters?.status || [],
    joinedDate: {
      from: initialFilters?.joinedDate?.from || "",
      to: initialFilters?.joinedDate?.to || ""
    },
    lastOrderDate: {
      from: initialFilters?.lastOrderDate?.from || "",
      to: initialFilters?.lastOrderDate?.to || ""
    }
  })

  if (!isOpen) return null

  const statusOptions = [
    { value: "active", label: "Active" },
    { value: "inactive", label: "Inactive" },
    { value: "new", label: "New Customer" },
    { value: "vip", label: "VIP" }
  ]

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }))
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Filter Customers</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Spending Range */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300">Total Spend Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400">Min Amount ($)</label>
                <input
                  type="number"
                  value={filters.spendingRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    spendingRange: { ...prev.spendingRange, min: e.target.value }
                  }))}
                  className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Max Amount ($)</label>
                <input
                  type="number"
                  value={filters.spendingRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    spendingRange: { ...prev.spendingRange, max: e.target.value }
                  }))}
                  className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Order Count */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300">Order Count</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs text-gray-400">Min Orders</label>
                <input
                  type="number"
                  value={filters.orderCount.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    orderCount: { ...prev.orderCount, min: e.target.value }
                  }))}
                  className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="text-xs text-gray-400">Max Orders</label>
                <input
                  type="number"
                  value={filters.orderCount.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    orderCount: { ...prev.orderCount, max: e.target.value }
                  }))}
                  className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Customer Status */}
          <div className="space-y-4">
            <h3 className="text-sm font-medium text-gray-300">Customer Status</h3>
            <div className="grid grid-cols-2 gap-3">
              {statusOptions.map((status) => (
                <button
                  key={status.value}
                  onClick={() => handleStatusToggle(status.value)}
                  className={`flex items-center gap-2 p-3 rounded-lg border ${
                    filters.status.includes(status.value)
                      ? "border-blue-500 bg-blue-500/10"
                      : "border-gray-600 hover:bg-gray-700"
                  }`}
                >
                  <div className={`w-4 h-4 rounded border flex items-center justify-center ${
                    filters.status.includes(status.value)
                      ? "border-blue-500 bg-blue-500"
                      : "border-gray-500"
                  }`}>
                    {filters.status.includes(status.value) && (
                      <Check className="h-3 w-3 text-white" />
                    )}
                  </div>
                  <span className="text-sm text-gray-300">{status.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Ranges */}
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Join Date Range</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">From</label>
                  <input
                    type="date"
                    value={filters.joinedDate.from}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      joinedDate: { ...prev.joinedDate, from: e.target.value }
                    }))}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">To</label>
                  <input
                    type="date"
                    value={filters.joinedDate.to}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      joinedDate: { ...prev.joinedDate, to: e.target.value }
                    }))}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-300 mb-2">Last Order Date</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="text-xs text-gray-400">From</label>
                  <input
                    type="date"
                    value={filters.lastOrderDate.from}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      lastOrderDate: { ...prev.lastOrderDate, from: e.target.value }
                    }))}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
                <div>
                  <label className="text-xs text-gray-400">To</label>
                  <input
                    type="date"
                    value={filters.lastOrderDate.to}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      lastOrderDate: { ...prev.lastOrderDate, to: e.target.value }
                    }))}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onApply(filters)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </div>
  )
} 