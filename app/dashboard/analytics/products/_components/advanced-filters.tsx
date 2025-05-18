"use client"

import { useState } from "react"
import { Filter, SortAsc, SortDesc, X, Check } from "lucide-react"

interface AdvancedFiltersProps {
  dateRange: {
    from: string
    to: string
  }
  onFilterChange: (filters: FilterState) => void
  onSortChange: (sort: SortState) => void
}

interface FilterState {
  category: string[]
  stockStatus: string[]
  revenueRange: {
    min: number | null
    max: number | null
  }
  conversionRange: {
    min: number | null
    max: number | null
  }
}

interface SortState {
  field: "name" | "revenue" | "units" | "stock"
  direction: "asc" | "desc"
}

export const AdvancedFilters = ({
  dateRange,
  onFilterChange,
  onSortChange
}: AdvancedFiltersProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const [filters, setFilters] = useState<FilterState>({
    category: [],
    stockStatus: [],
    revenueRange: { min: null, max: null },
    conversionRange: { min: null, max: null }
  })
  const [sort, setSort] = useState<SortState>({
    field: "revenue",
    direction: "desc"
  })

  // Mock data for categories
  const categories = [
    "Electronics",
    "Clothing",
    "Accessories",
    "Home & Living",
    "Books"
  ]

  const stockStatuses = [
    "In Stock",
    "Low Stock",
    "Out of Stock",
    "Backordered"
  ]

  const handleFilterChange = (newFilters: Partial<FilterState>) => {
    const updatedFilters = { ...filters, ...newFilters }
    setFilters(updatedFilters)
    onFilterChange(updatedFilters)
  }

  const handleSortChange = (field: SortState["field"]) => {
    const newSort: SortState = {
      field,
      direction: sort.field === field && sort.direction === "asc" ? "desc" : "asc"
    }
    setSort(newSort)
    onSortChange(newSort)
  }

  const clearFilters = () => {
    const resetFilters: FilterState = {
      category: [],
      stockStatus: [],
      revenueRange: { min: null, max: null },
      conversionRange: { min: null, max: null }
    }
    setFilters(resetFilters)
    onFilterChange(resetFilters)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
          Object.values(filters).some(v => 
            Array.isArray(v) ? v.length > 0 : v.min !== null || v.max !== null
          )
            ? "bg-blue-600 text-white hover:bg-blue-700"
            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
        }`}
      >
        <Filter className="h-4 w-4" />
        Advanced Filters
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 w-96 bg-gray-900 rounded-xl border border-gray-700 shadow-xl z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium">Filters & Sorting</h3>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-gray-800 rounded-lg"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Categories */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Categories</h4>
              <div className="grid grid-cols-2 gap-2">
                {categories.map((category) => (
                  <label
                    key={category}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.category.includes(category)}
                      onChange={(e) => {
                        const newCategories = e.target.checked
                          ? [...filters.category, category]
                          : filters.category.filter(c => c !== category)
                        handleFilterChange({ category: newCategories })
                      }}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <span>{category}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Stock Status */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Stock Status</h4>
              <div className="grid grid-cols-2 gap-2">
                {stockStatuses.map((status) => (
                  <label
                    key={status}
                    className="flex items-center gap-2 p-2 rounded-lg hover:bg-gray-800 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={filters.stockStatus.includes(status)}
                      onChange={(e) => {
                        const newStatuses = e.target.checked
                          ? [...filters.stockStatus, status]
                          : filters.stockStatus.filter(s => s !== status)
                        handleFilterChange({ stockStatus: newStatuses })
                      }}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    <span>{status}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Revenue Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Revenue Range</h4>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm text-gray-400">Min</label>
                  <input
                    type="number"
                    value={filters.revenueRange.min || ""}
                    onChange={(e) => handleFilterChange({
                      revenueRange: {
                        ...filters.revenueRange,
                        min: e.target.value ? Number(e.target.value) : null
                      }
                    })}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Max</label>
                  <input
                    type="number"
                    value={filters.revenueRange.max || ""}
                    onChange={(e) => handleFilterChange({
                      revenueRange: {
                        ...filters.revenueRange,
                        max: e.target.value ? Number(e.target.value) : null
                      }
                    })}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                  />
                </div>
              </div>
            </div>

            {/* Conversion Rate Range */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Conversion Rate (%)</h4>
              <div className="flex gap-4">
                <div>
                  <label className="text-sm text-gray-400">Min</label>
                  <input
                    type="number"
                    value={filters.conversionRange.min || ""}
                    onChange={(e) => handleFilterChange({
                      conversionRange: {
                        ...filters.conversionRange,
                        min: e.target.value ? Number(e.target.value) : null
                      }
                    })}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Min"
                    min="0"
                    max="100"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-400">Max</label>
                  <input
                    type="number"
                    value={filters.conversionRange.max || ""}
                    onChange={(e) => handleFilterChange({
                      conversionRange: {
                        ...filters.conversionRange,
                        max: e.target.value ? Number(e.target.value) : null
                      }
                    })}
                    className="w-full mt-1 px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Max"
                    min="0"
                    max="100"
                  />
                </div>
              </div>
            </div>

            {/* Sorting */}
            <div className="mb-6">
              <h4 className="text-sm font-medium text-gray-400 mb-2">Sort By</h4>
              <div className="space-y-2">
                {[
                  { field: "name", label: "Name" },
                  { field: "revenue", label: "Revenue" },
                  { field: "units", label: "Units Sold" },
                  { field: "stock", label: "Stock Level" }
                ].map((option) => (
                  <button
                    key={option.field}
                    onClick={() => handleSortChange(option.field as SortState["field"])}
                    className={`flex items-center justify-between w-full p-2 rounded-lg ${
                      sort.field === option.field
                        ? "bg-gray-700 text-white"
                        : "hover:bg-gray-800"
                    }`}
                  >
                    <span>{option.label}</span>
                    {sort.field === option.field && (
                      sort.direction === "asc" ? (
                        <SortAsc className="h-4 w-4" />
                      ) : (
                        <SortDesc className="h-4 w-4" />
                      )
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-4 border-t border-gray-700">
              <button
                onClick={clearFilters}
                className="text-sm text-gray-400 hover:text-white"
              >
                Clear Filters
              </button>
              <button
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                <Check className="h-4 w-4" />
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 