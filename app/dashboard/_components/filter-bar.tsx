"use client"

import { useState } from "react"
import { SearchInput } from "./search-input"
import { Filter, Calendar } from "lucide-react"

interface DateRange {
  from: string
  to: string
}

interface FilterBarProps {
  onSearch?: (value: string) => void
  onFilter?: () => void
  onDateChange?: (dates: DateRange) => void
  showDateFilter?: boolean
  className?: string
  searchPlaceholder?: string
  disabled?: boolean
}

export const FilterBar = ({
  onSearch,
  onFilter,
  onDateChange,
  showDateFilter = true,
  className = "",
  searchPlaceholder = "Search by name, ID, or email...",
  disabled = false
}: FilterBarProps) => {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: "",
    to: ""
  })

  const handleDateChange = (key: keyof DateRange, value: string) => {
    const newDateRange = { ...dateRange, [key]: value }
    setDateRange(newDateRange)
    onDateChange?.(newDateRange)
  }

  const validateDateRange = (from: string, to: string): boolean => {
    if (!from || !to) return true
    return new Date(from) <= new Date(to)
  }

  return (
    <div className={`flex flex-wrap items-center gap-4 p-4 ${className}`}>
      <div className="flex-1 min-w-[200px]">
        <SearchInput
          placeholder={searchPlaceholder}
          onChange={onSearch || (() => {})}
          className="w-full"
          disabled={disabled}
          ariaLabel="Search filter"
        />
      </div>

      {showDateFilter && (
        <div className="flex items-center gap-2">
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dateRange.from}
              onChange={(e) => handleDateChange("from", e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                text-white placeholder-gray-400
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled}
              aria-label="From date"
              max={dateRange.to || undefined}
            />
          </div>
          <span className="text-gray-400">to</span>
          <div className="relative">
            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="date"
              value={dateRange.to}
              onChange={(e) => handleDateChange("to", e.target.value)}
              className="pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
                focus:outline-none focus:ring-2 focus:ring-blue-500 
                text-white placeholder-gray-400
                disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={disabled}
              aria-label="To date"
              min={dateRange.from || undefined}
            />
          </div>
        </div>
      )}

      {onFilter && (
        <button
          onClick={onFilter}
          disabled={disabled}
          className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg 
            hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 
            text-white flex items-center gap-2
            disabled:opacity-50 disabled:cursor-not-allowed"
          aria-label="Open filters"
        >
          <Filter className="h-4 w-4" />
          <span>Filters</span>
        </button>
      )}
    </div>
  )
} 