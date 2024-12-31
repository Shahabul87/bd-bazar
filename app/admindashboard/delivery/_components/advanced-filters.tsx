"use client"

import { useState } from "react"
import { 
  Filter, 
  ArrowUpDown, 
  X, 
  Check,
  Calendar,
  MapPin,
  Truck,
  Clock
} from "lucide-react"

interface FilterOptions {
  dateRange: {
    from: string
    to: string
  }
  status: string[]
  courier: string[]
  region: string[]
  method: string[]
}

interface SortOption {
  field: string
  direction: "asc" | "desc"
}

interface AdvancedFiltersProps {
  onFilterChange: (filters: FilterOptions) => void
  onSortChange: (sort: SortOption) => void
  dateRange: {
    from: string
    to: string
  }
}

export const AdvancedFilters = ({
  onFilterChange,
  onSortChange,
  dateRange
}: AdvancedFiltersProps) => {
  const [isExpanded, setIsExpanded] = useState(false)
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({
    dateRange,
    status: [],
    courier: [],
    region: [],
    method: []
  })
  const [activeSort, setActiveSort] = useState<SortOption>({
    field: "deliveryTime",
    direction: "asc"
  })

  // Mock data for filter options
  const filterOptions = {
    status: ["Pending", "In Transit", "Delivered", "Failed", "Cancelled"],
    courier: ["FastShip", "SpeedPost", "SecureDelivery", "GlobalExpress"],
    region: ["North", "South", "East", "West", "Central"],
    method: ["Standard", "Express", "Same-Day", "Next-Day"]
  }

  const sortOptions = [
    { label: "Delivery Time", value: "deliveryTime" },
    { label: "Status", value: "status" },
    { label: "Customer Name", value: "customerName" }
  ]

  const handleFilterChange = (category: keyof FilterOptions, value: string) => {
    const newFilters = { ...activeFilters }
    if (category !== "dateRange") {
      const index = newFilters[category].indexOf(value)
      if (index === -1) {
        newFilters[category] = [...newFilters[category], value]
      } else {
        newFilters[category] = newFilters[category].filter(v => v !== value)
      }
    }
    setActiveFilters(newFilters)
    onFilterChange(newFilters)
  }

  const handleSortChange = (field: string) => {
    const newSort: SortOption = {
      field,
      direction: activeSort.field === field && activeSort.direction === "asc" ? "desc" : "asc"
    }
    setActiveSort(newSort)
    onSortChange(newSort)
  }

  const clearFilters = () => {
    const clearedFilters = {
      dateRange,
      status: [],
      courier: [],
      region: [],
      method: []
    }
    setActiveFilters(clearedFilters)
    onFilterChange(clearedFilters)
  }

  const getActiveFilterCount = () => {
    return Object.entries(activeFilters).reduce((count, [key, value]) => {
      if (key === "dateRange") return count
      return count + (Array.isArray(value) ? value.length : 0)
    }, 0)
  }

  return (
    <div className="space-y-4">
      {/* Filter Toggle */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm text-gray-400 hover:text-white"
        >
          <Filter className="h-4 w-4" />
          <span>Advanced Filters</span>
          {getActiveFilterCount() > 0 && (
            <span className="px-2 py-0.5 text-xs bg-blue-600 text-white rounded-full">
              {getActiveFilterCount()}
            </span>
          )}
        </button>
        {getActiveFilterCount() > 0 && (
          <button
            onClick={clearFilters}
            className="text-sm text-red-400 hover:text-red-300"
          >
            Clear All
          </button>
        )}
      </div>

      {/* Expanded Filters */}
      {isExpanded && (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700 space-y-6">
          {/* Filter Sections */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Status Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Status</span>
              </div>
              <div className="space-y-2">
                {filterOptions.status.map(status => (
                  <label
                    key={status}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters.status.includes(status)}
                      onChange={() => handleFilterChange("status", status)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    {status}
                  </label>
                ))}
              </div>
            </div>

            {/* Courier Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                <Truck className="h-4 w-4 text-gray-400" />
                <span>Courier</span>
              </div>
              <div className="space-y-2">
                {filterOptions.courier.map(courier => (
                  <label
                    key={courier}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters.courier.includes(courier)}
                      onChange={() => handleFilterChange("courier", courier)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    {courier}
                  </label>
                ))}
              </div>
            </div>

            {/* Region Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span>Region</span>
              </div>
              <div className="space-y-2">
                {filterOptions.region.map(region => (
                  <label
                    key={region}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters.region.includes(region)}
                      onChange={() => handleFilterChange("region", region)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    {region}
                  </label>
                ))}
              </div>
            </div>

            {/* Delivery Method Filters */}
            <div>
              <div className="flex items-center gap-2 mb-3 text-sm font-medium">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>Delivery Method</span>
              </div>
              <div className="space-y-2">
                {filterOptions.method.map(method => (
                  <label
                    key={method}
                    className="flex items-center gap-2 text-sm cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={activeFilters.method.includes(method)}
                      onChange={() => handleFilterChange("method", method)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                    {method}
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Sort Options */}
          <div>
            <div className="flex items-center gap-2 mb-3 text-sm font-medium">
              <ArrowUpDown className="h-4 w-4 text-gray-400" />
              <span>Sort By</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {sortOptions.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleSortChange(option.value)}
                  className={`px-3 py-1.5 text-sm rounded-lg border transition-colors ${
                    activeSort.field === option.value
                      ? 'border-blue-500 bg-blue-500/10 text-blue-400'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {option.label}
                  {activeSort.field === option.value && (
                    <span className="ml-1">
                      ({activeSort.direction === "asc" ? "↑" : "↓"})
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 