"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Plus, 
  Search, 
  Filter, 
  Package, 
  Truck,
  Clock,
  Users,
  AlertTriangle,
  CheckCircle,
  RefreshCw
} from "lucide-react"
import { useRouter } from "next/navigation"
import { DeliveryArrangementsList } from "../_components/delivery-arrangements-list"
import { DateRangePicker } from "@/app/admindashboard/_components/date-range-picker"
import { NewArrangementModal } from "../_components/new-arrangement-modal"
import { ArrangementDetailsModal } from "../_components/arrangement-details-modal"
import { ArrangementFilterModal } from "../_components/arrangement-filter-modal"

interface DateRange {
  from: string
  to: string
}

interface ArrangementStats {
  total: number
  active: number
  completed: number
  delayed: number
  efficiency: number
}

export default function ArrangementsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>(null)
  const [dateRange, setDateRange] = useState<DateRange>({
    from: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    to: new Date().toISOString().split('T')[0]
  })
  const [isNewArrangementModalOpen, setIsNewArrangementModalOpen] = useState(false)
  const [selectedArrangement, setSelectedArrangement] = useState<DeliveryArrangement | null>(null)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)

  // Mock stats data
  const stats: ArrangementStats = {
    total: 156,
    active: 45,
    completed: 98,
    delayed: 13,
    efficiency: 92.5
  }

  const handleNewArrangement = (data: any) => {
    console.log("New arrangement data:", data)
    setIsNewArrangementModalOpen(false)
    // Implement creation logic
  }

  const handleApplyFilters = (filters: any) => {
    setActiveFilters(filters)
    setIsFilterModalOpen(false)
    // Implement filter logic
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-700 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Delivery Arrangements</h1>
            <p className="text-gray-400">Plan and manage delivery routes and schedules</p>
          </div>
        </div>
        <div className="flex gap-3">
          <DateRangePicker
            dateRange={dateRange}
            onDateRangeChange={setDateRange}
          />
          <button
            onClick={() => setIsNewArrangementModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            New Arrangement
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Arrangements</p>
              <p className="text-2xl font-bold">{stats.total}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-yellow-900/50 rounded-full">
              <RefreshCw className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.active}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-900/50 rounded-full">
              <CheckCircle className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Completed</p>
              <p className="text-2xl font-bold text-green-400">{stats.completed}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-red-900/50 rounded-full">
              <AlertTriangle className="h-5 w-5 text-red-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Delayed</p>
              <p className="text-2xl font-bold text-red-400">{stats.delayed}</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-full">
              <Truck className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Efficiency</p>
              <p className="text-2xl font-bold text-purple-400">{stats.efficiency}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search arrangements by route, courier, or status..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          <Filter className="h-4 w-4" />
          {activeFilters ? "Filters Applied" : "Add Filter"}
        </button>
      </div>

      {/* Arrangements List */}
      <DeliveryArrangementsList dateRange={dateRange} />

      {/* Upcoming Arrangements */}
      <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
        <h2 className="text-lg font-medium mb-4">Upcoming Arrangements</h2>
        <div className="space-y-4">
          {[1, 2, 3].map((_, index) => (
            <div key={index} className="flex items-center justify-between p-4 bg-gray-800 rounded-lg">
              <div className="flex items-center gap-4">
                <div className="p-3 bg-gray-700 rounded-lg">
                  <Clock className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="font-medium">Route #{index + 1}</p>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Clock className="h-4 w-4" />
                    <span>Starting in {2 + index} hours</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="text-right">
                  <div className="flex items-center gap-2">
                    <Package className="h-4 w-4 text-gray-400" />
                    <span>{5 + index} deliveries</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <Users className="h-4 w-4" />
                    <span>{2 + index} couriers</span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedArrangement({
                    id: `${index + 1}`,
                    route: {
                      name: `Route #${index + 1}`,
                      stops: 5 + index,
                      distance: 25.5,
                      estimatedTime: "3 hours",
                      start: {
                        lat: 40.7128,
                        lng: -74.0060,
                        address: "Start Location"
                      },
                      end: {
                        lat: 40.7589,
                        lng: -73.9851,
                        address: "End Location"
                      },
                      waypoints: [
                        {
                          lat: 40.7300,
                          lng: -73.9950,
                          address: "Stop 1",
                          order: 1
                        }
                      ]
                    },
                    courier: {
                      name: "John Smith",
                      phone: "+1 234 567 890",
                      vehicle: "Van - XL",
                      capacity: 1000,
                      currentLoad: 750
                    },
                    schedule: {
                      date: "2024-03-20",
                      startTime: "09:00",
                      endTime: "17:00"
                    },
                    status: "pending",
                    efficiency: 85,
                    costPerDelivery: 12.50,
                    timeline: [
                      {
                        id: "1",
                        title: "Route Started",
                        timestamp: "2024-03-20T09:00:00",
                        location: "Start Location",
                        description: "Driver has begun the route"
                      }
                    ]
                  })}
                  className="px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600"
                >
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <NewArrangementModal
        isOpen={isNewArrangementModalOpen}
        onClose={() => setIsNewArrangementModalOpen(false)}
        onSubmit={handleNewArrangement}
      />

      <ArrangementDetailsModal
        isOpen={!!selectedArrangement}
        onClose={() => setSelectedArrangement(null)}
        arrangement={selectedArrangement}
      />

      <ArrangementFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  )
} 