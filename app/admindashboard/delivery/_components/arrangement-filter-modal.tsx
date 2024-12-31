"use client"

import { useState } from "react"
import { X, Check } from "lucide-react"

interface ArrangementFilterModalProps {
  isOpen: boolean
  onClose: () => void
  onApplyFilters: (filters: ArrangementFilters) => void
}

interface ArrangementFilters {
  status: string[]
  dateRange: {
    from: string
    to: string
  }
  efficiency: {
    min: string
    max: string
  }
  stops: {
    min: string
    max: string
  }
  courier: string[]
  vehicle: string[]
}

export const ArrangementFilterModal = ({
  isOpen,
  onClose,
  onApplyFilters
}: ArrangementFilterModalProps) => {
  const [filters, setFilters] = useState<ArrangementFilters>({
    status: [],
    dateRange: {
      from: "",
      to: ""
    },
    efficiency: {
      min: "",
      max: ""
    },
    stops: {
      min: "",
      max: ""
    },
    courier: [],
    vehicle: []
  })

  if (!isOpen) return null

  const statusOptions = ["pending", "in_progress", "completed", "delayed"]
  const courierOptions = ["John Smith", "Jane Doe", "Mike Johnson"]
  const vehicleOptions = ["Van", "Truck", "Motorcycle"]

  const handleStatusToggle = (status: string) => {
    setFilters(prev => ({
      ...prev,
      status: prev.status.includes(status)
        ? prev.status.filter(s => s !== status)
        : [...prev.status, status]
    }))
  }

  const handleCourierToggle = (courier: string) => {
    setFilters(prev => ({
      ...prev,
      courier: prev.courier.includes(courier)
        ? prev.courier.filter(c => c !== courier)
        : [...prev.courier, courier]
    }))
  }

  const handleVehicleToggle = (vehicle: string) => {
    setFilters(prev => ({
      ...prev,
      vehicle: prev.vehicle.includes(vehicle)
        ? prev.vehicle.filter(v => v !== vehicle)
        : [...prev.vehicle, vehicle]
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleReset = () => {
    setFilters({
      status: [],
      dateRange: {
        from: "",
        to: ""
      },
      efficiency: {
        min: "",
        max: ""
      },
      stops: {
        min: "",
        max: ""
      },
      courier: [],
      vehicle: []
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-xl border border-gray-700 w-full max-w-2xl">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-medium">Filter Arrangements</h2>
            <p className="text-sm text-gray-400">Set conditions to filter arrangements</p>
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
          {/* Status Filter */}
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
                  <span className="capitalize">{status.replace('_', ' ')}</span>
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

          {/* Efficiency Range */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Efficiency Range (%)</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.efficiency.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    efficiency: { ...prev.efficiency, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={filters.efficiency.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    efficiency: { ...prev.efficiency, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Number of Stops */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Number of Stops</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-gray-400 mb-1">Min</label>
                <input
                  type="number"
                  min="0"
                  value={filters.stops.min}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    stops: { ...prev.stops, min: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm text-gray-400 mb-1">Max</label>
                <input
                  type="number"
                  min="0"
                  value={filters.stops.max}
                  onChange={(e) => setFilters(prev => ({
                    ...prev,
                    stops: { ...prev.stops, max: e.target.value }
                  }))}
                  className="w-full px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Courier Filter */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Courier</h3>
            <div className="grid grid-cols-2 gap-2">
              {courierOptions.map(courier => (
                <button
                  key={courier}
                  onClick={() => handleCourierToggle(courier)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    filters.courier.includes(courier)
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {filters.courier.includes(courier) && <Check className="h-4 w-4" />}
                  <span>{courier}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Vehicle Type */}
          <div className="space-y-3">
            <h3 className="text-sm font-medium text-gray-400">Vehicle Type</h3>
            <div className="grid grid-cols-2 gap-2">
              {vehicleOptions.map(vehicle => (
                <button
                  key={vehicle}
                  onClick={() => handleVehicleToggle(vehicle)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg border ${
                    filters.vehicle.includes(vehicle)
                      ? 'border-blue-500 bg-blue-500/10 text-blue-500'
                      : 'border-gray-700 hover:border-gray-600'
                  }`}
                >
                  {filters.vehicle.includes(vehicle) && <Check className="h-4 w-4" />}
                  <span>{vehicle}</span>
                </button>
              ))}
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