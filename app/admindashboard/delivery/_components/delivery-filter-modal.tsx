"use client"

import { useState } from "react"
import { X, Calendar, Search } from "lucide-react"

interface FilterOptions {
  dateRange: {
    from: string
    to: string
  }
  status: string[]
  deliveryService: string[]
  searchTerm: string
}

interface DeliveryFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterOptions) => void
}

const statusOptions = [
  "Not Yet Paid",
  "Processing",
  "Shipped",
  "Delivered",
  "Cancelled",
  "Returned"
]

const deliveryServices = [
  "Express Delivery",
  "Standard Shipping",
  "Economy Shipping",
  "Next Day Delivery",
  "International Shipping"
]

export const DeliveryFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters
}: DeliveryFilterModalProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    dateRange: {
      from: "",
      to: ""
    },
    status: [],
    deliveryService: [],
    searchTerm: ""
  })

  if (!isOpen) return null

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      dateRange: { from: "", to: "" },
      status: [],
      deliveryService: [],
      searchTerm: ""
    })
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Filter Deliveries</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Search</label>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                value={filters.searchTerm}
                onChange={(e) => setFilters(prev => ({ ...prev, searchTerm: e.target.value }))}
                placeholder="Search by order ID, customer, or product"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>
          </div>

          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Date Range</label>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.from}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, from: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
              </div>
              <div>
                <div className="relative">
                  <Calendar className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
                  <input
                    type="date"
                    value={filters.dateRange.to}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateRange: { ...prev.dateRange, to: e.target.value }
                    }))}
                    className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Status */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map((status) => (
                <label key={status} className="flex items-center space-x-2 p-2 border border-gray-600 rounded-lg hover:bg-gray-700">
                  <input
                    type="checkbox"
                    checked={filters.status.includes(status)}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        status: e.target.checked
                          ? [...prev.status, status]
                          : prev.status.filter(s => s !== status)
                      }))
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{status}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Delivery Services */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Delivery Services</label>
            <div className="grid grid-cols-2 gap-2">
              {deliveryServices.map((service) => (
                <label key={service} className="flex items-center space-x-2 p-2 border border-gray-600 rounded-lg hover:bg-gray-700">
                  <input
                    type="checkbox"
                    checked={filters.deliveryService.includes(service)}
                    onChange={(e) => {
                      setFilters(prev => ({
                        ...prev,
                        deliveryService: e.target.checked
                          ? [...prev.deliveryService, service]
                          : prev.deliveryService.filter(s => s !== service)
                      }))
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{service}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="flex justify-between mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-400 hover:text-gray-300"
          >
            Reset Filters
          </button>
          <div className="space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleApply}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 