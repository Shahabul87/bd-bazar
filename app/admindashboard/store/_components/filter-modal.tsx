"use client"

import { useState } from "react"
import { X, Calendar, Search } from "lucide-react"

interface FilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: FilterOptions) => void
}

interface FilterOptions {
  categories: string[]
  priceRange: {
    min: string
    max: string
  }
  stockRange: {
    min: string
    max: string
  }
  status: string
  featured: boolean | null
  dateAdded: {
    from: string
    to: string
  }
}

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Groceries"
]

const statusOptions = [
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" }
]

export const FilterModal = ({
  isOpen,
  onClose,
  onApplyFilters
}: FilterModalProps) => {
  const [filters, setFilters] = useState<FilterOptions>({
    categories: [],
    priceRange: { min: "", max: "" },
    stockRange: { min: "", max: "" },
    status: "",
    featured: null,
    dateAdded: { from: "", to: "" }
  })

  if (!isOpen) return null

  const handleApply = () => {
    onApplyFilters(filters)
  }

  const handleReset = () => {
    setFilters({
      categories: [],
      priceRange: { min: "", max: "" },
      stockRange: { min: "", max: "" },
      status: "",
      featured: null,
      dateAdded: { from: "", to: "" }
    })
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div className="bg-gray-800 rounded-xl p-6 max-h-[90vh] overflow-y-auto text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">Filter Products</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
              <X className="h-5 w-5" />
            </button>
          </div>

          <div className="space-y-6">
            {/* Categories */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Categories</label>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <label key={category} className="flex items-center space-x-2 p-2 border border-gray-600 rounded-lg hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={filters.categories.includes(category)}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          categories: e.target.checked
                            ? [...prev.categories, category]
                            : prev.categories.filter(c => c !== category)
                        }))
                      }}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Price Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Min Price"
                  value={filters.priceRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, min: e.target.value }
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
                <input
                  type="number"
                  placeholder="Max Price"
                  value={filters.priceRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    priceRange: { ...prev.priceRange, max: e.target.value }
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>

            {/* Stock Range */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Stock Range</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="number"
                  placeholder="Min Stock"
                  value={filters.stockRange.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    stockRange: { ...prev.stockRange, min: e.target.value }
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
                <input
                  type="number"
                  placeholder="Max Stock"
                  value={filters.stockRange.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    stockRange: { ...prev.stockRange, max: e.target.value }
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            </div>

            {/* Status */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
              <div className="grid grid-cols-2 gap-2">
                {statusOptions.map((status) => (
                  <label key={status.id} className="flex items-center space-x-2 p-2 border border-gray-600 rounded-lg hover:bg-gray-700">
                    <input
                      type="checkbox"
                      checked={filters.status.includes(status.id)}
                      onChange={(e) => {
                        setFilters(prev => ({
                          ...prev,
                          status: e.target.checked
                            ? [...prev.status, status.id]
                            : prev.status.filter(s => s !== status.id)
                        }))
                      }}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-300">{status.label}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Featured Status */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Featured Status</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={filters.featured === true}
                    onChange={() => setFilters(prev => ({ ...prev, featured: true }))}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={filters.featured === false}
                    onChange={() => setFilters(prev => ({ ...prev, featured: false }))}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">Not Featured</span>
                </label>
                <label className="flex items-center gap-2">
                  <input
                    type="radio"
                    checked={filters.featured === null}
                    onChange={() => setFilters(prev => ({ ...prev, featured: null }))}
                    className="text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">All</span>
                </label>
              </div>
            </div>

            {/* Date Added */}
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Date Added</label>
              <div className="grid grid-cols-2 gap-4">
                <input
                  type="date"
                  value={filters.dateAdded.from}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateAdded: { ...prev.dateAdded, from: e.target.value }
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
                <input
                  type="date"
                  value={filters.dateAdded.to}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    dateAdded: { ...prev.dateAdded, to: e.target.value }
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
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
    </div>
  )
} 