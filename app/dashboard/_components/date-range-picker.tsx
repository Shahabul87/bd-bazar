"use client"

import { useState } from "react"
import { Calendar } from "lucide-react"

interface DateRange {
  from: string
  to: string
}

interface DateRangePreset {
  label: string
  days: number
}

interface DateRangePickerProps {
  dateRange: DateRange
  onDateRangeChange: (range: DateRange) => void
  presets?: DateRangePreset[]
}

export const DateRangePicker = ({
  dateRange,
  onDateRangeChange,
  presets = [
    { label: "Last 7 Days", days: 7 },
    { label: "Last 30 Days", days: 30 },
    { label: "Last 90 Days", days: 90 }
  ]
}: DateRangePickerProps) => {
  const [isOpen, setIsOpen] = useState(false)

  const handlePresetClick = (days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - days)

    onDateRangeChange({
      from: from.toISOString().split('T')[0],
      to: to.toISOString().split('T')[0]
    })
    setIsOpen(false)
  }

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600"
      >
        <Calendar className="h-4 w-4" />
        <span>
          {new Date(dateRange.from).toLocaleDateString()} - {new Date(dateRange.to).toLocaleDateString()}
        </span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 p-4 bg-gray-900 border border-gray-700 rounded-lg shadow-xl z-10">
          <div className="space-y-2">
            {presets.map((preset) => (
              <button
                key={preset.days}
                onClick={() => handlePresetClick(preset.days)}
                className="w-full px-4 py-2 text-left hover:bg-gray-800 rounded-lg"
              >
                {preset.label}
              </button>
            ))}
            <div className="pt-2 border-t border-gray-700 space-y-2">
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">From:</label>
                <input
                  type="date"
                  value={dateRange.from}
                  onChange={(e) => onDateRangeChange({ ...dateRange, from: e.target.value })}
                  className="px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg"
                />
              </div>
              <div className="flex items-center gap-2">
                <label className="text-sm text-gray-400">To:</label>
                <input
                  type="date"
                  value={dateRange.to}
                  onChange={(e) => onDateRangeChange({ ...dateRange, to: e.target.value })}
                  className="px-2 py-1 bg-gray-800 border border-gray-700 rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
} 