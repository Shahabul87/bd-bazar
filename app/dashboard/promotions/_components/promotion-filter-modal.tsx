"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface PromotionFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: PromotionFilters) => void
}

interface PromotionFilters {
  types: string[]
  status: string[]
  dateRange: {
    from: string
    to: string
  }
  discountRange: {
    min: string
    max: string
  }
  usageRange: {
    min: string
    max: string
  }
}

export const PromotionFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters
}: PromotionFilterModalProps) => {
  const [filters, setFilters] = useState<PromotionFilters>({
    types: [],
    status: [],
    dateRange: {
      from: "",
      to: ""
    },
    discountRange: {
      min: "",
      max: ""
    },
    usageRange: {
      min: "",
      max: ""
    }
  })

  if (!isOpen) return null

  const typeOptions = ["percentage", "fixed", "bogo", "shipping"]
  const statusOptions = ["active", "scheduled", "expired", "paused"]

  const handleTypeToggle = (type: string) => {
    setFilters(prev => ({
      ...prev,
      types: prev.types.includes(type)
        ? prev.types.filter(t => t !== type)
        : [...prev.types, type]
    }))
  }

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      types: [],
      status: [],
      dateRange: {
        from: "",
        to: ""
      },
      discountRange: {
        min: "",
        max: ""
      },
      usageRange: {
        min: "",
        max: ""
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-2xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Filter Promotions</h2>
            <p className="text-sm text-gray-400">Set conditions to filter promotions</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter Content */}
        <div className="p-6 space-y-6">
          {/* Promotion Type */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Promotion Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {typeOptions.map(type => (
                <button
                  key={type}
                  onClick={() => handleTypeToggle(type)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    filters.types.includes(type)
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {filters.types.includes(type) && <Check className="h-4 w-4" />}
                  <span className="capitalize">{type.replace('_', ' ')}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Status</h3>
            <div className="grid grid-cols-2 gap-2">
              {statusOptions.map(status => (
                <button
                  key={status}
                  onClick={() => handleStatusToggle(status)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    filters.status.includes(status)
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {filters.status.includes(status) && <Check className="h-4 w-4" />}
                  <span className="capitalize">{status}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Date Range */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Date Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">From</label>
                <input
                  type="date"
                  value={filters.dateRange.from}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, from: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">To</label>
                <input
                  type="date"
                  value={filters.dateRange.to}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateRange: { ...prev.dateRange, to: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Discount Range */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Discount Range</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Min</label>
                <input
                  type="number"
                  value={filters.discountRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    discountRange: { ...prev.discountRange, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Min value"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Max</label>
                <input
                  type="number"
                  value={filters.discountRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    discountRange: { ...prev.discountRange, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Max value"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="p-4 border-t border-gray-700 flex justify-between">
          <button
            onClick={handleReset}
            className="px-4 py-2 text-gray-400 hover:text-white"
          >
            Reset Filters
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
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