"use client"

import { useState } from "react"
import { X } from "lucide-react"

interface CategoryFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: CategoryFilters) => void
}

interface CategoryFilters {
  status: string[]
  productCount: {
    min: string
    max: string
  }
  hasSubcategories: boolean | null
  dateAdded: {
    from: string
    to: string
  }
}

export const CategoryFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters
}: CategoryFilterModalProps) => {
  const [filters, setFilters] = useState<CategoryFilters>({
    status: [],
    productCount: { min: "", max: "" },
    hasSubcategories: null,
    dateAdded: { from: "", to: "" }
  })

  if (!isOpen) return null

  const handleApply = () => {
    onApplyFilters(filters)
  }

  const handleReset = () => {
    setFilters({
      status: [],
      productCount: { min: "", max: "" },
      hasSubcategories: null,
      dateAdded: { from: "", to: "" }
    })
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md">
        <div className="bg-gray-800 rounded-xl p-6 text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filter Categories</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <div className="space-y-2">
                {["active", "inactive"].map((status) => (
                  <label key={status} className="flex items-center gap-2">
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
                    <span className="capitalize">{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Product Count Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Product Count</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="number"
                    placeholder="Min"
                    value={filters.productCount.min}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      productCount: { ...prev.productCount, min: e.target.value }
                    }))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <input
                    type="number"
                    placeholder="Max"
                    value={filters.productCount.max}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      productCount: { ...prev.productCount, max: e.target.value }
                    }))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>
            </div>

            {/* Has Subcategories */}
            <div>
              <label className="block text-sm font-medium mb-2">Subcategories</label>
              <select
                value={filters.hasSubcategories === null ? "" : filters.hasSubcategories.toString()}
                onChange={(e) => setFilters(prev => ({
                  ...prev,
                  hasSubcategories: e.target.value === "" ? null : e.target.value === "true"
                }))}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
              >
                <option value="">Any</option>
                <option value="true">Has subcategories</option>
                <option value="false">No subcategories</option>
              </select>
            </div>

            {/* Date Added Range */}
            <div>
              <label className="block text-sm font-medium mb-2">Date Added</label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <input
                    type="date"
                    value={filters.dateAdded.from}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateAdded: { ...prev.dateAdded, from: e.target.value }
                    }))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
                <div>
                  <input
                    type="date"
                    value={filters.dateAdded.to}
                    onChange={(e) => setFilters(prev => ({
                      ...prev,
                      dateAdded: { ...prev.dateAdded, to: e.target.value }
                    }))}
                    className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Actions */}
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
    </div>
  )
} 