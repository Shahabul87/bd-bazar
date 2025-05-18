"use client"

import { useState } from "react"
import { 
  Calendar,
  Clock,
  MapPin,
  Truck,
  Users,
  Package,
  Settings,
  AlertTriangle,
  CheckCircle,
  RefreshCw,
  BarChart2,
  Filter,
  Search,
  Download
} from "lucide-react"
import { DataTable } from "@/app/dashboard/_components/data-table"
import type { Column } from "@/app/dashboard/_components/data-table"

interface DeliveryArrangement {
  id: string
  orderIds: string[]
  route: {
    name: string
    stops: number
    distance: number
    estimatedTime: string
  }
  courier: {
    name: string
    vehicle: string
    capacity: number
    currentLoad: number
  }
  schedule: {
    date: string
    startTime: string
    endTime: string
  }
  status: "pending" | "in_progress" | "completed" | "delayed"
  efficiency: number
  costPerDelivery: number
  priority: "high" | "medium" | "low"
}

interface DeliveryArrangementsProps {
  dateRange: {
    from: string
    to: string
  }
}

export const DeliveryArrangements = ({ dateRange }: DeliveryArrangementsProps) => {
  const [selectedArrangements, setSelectedArrangements] = useState<string[]>([])
  const [activeView, setActiveView] = useState<"list" | "map" | "analytics">("list")
  const [searchQuery, setSearchQuery] = useState("")
  const [showOptimizationModal, setShowOptimizationModal] = useState(false)

  // Mock data
  const arrangements: DeliveryArrangement[] = [
    {
      id: "1",
      orderIds: ["ORD-001", "ORD-002", "ORD-003"],
      route: {
        name: "North Route A",
        stops: 3,
        distance: 15.5,
        estimatedTime: "2.5 hours"
      },
      courier: {
        name: "John Smith",
        vehicle: "Van - XL",
        capacity: 1000,
        currentLoad: 750
      },
      schedule: {
        date: "2024-03-20",
        startTime: "09:00",
        endTime: "17:00"
      },
      status: "in_progress",
      efficiency: 85,
      costPerDelivery: 12.50,
      priority: "high"
    },
    // Add more mock arrangements...
  ]

  const columns: Column<DeliveryArrangement>[] = [
    {
      id: "route",
      header: "Route Details",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.route.name}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{row.route.stops} stops</span>
            <span>•</span>
            <span>{row.route.distance} km</span>
          </div>
        </div>
      )
    },
    {
      id: "courier",
      header: "Courier",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.courier.name}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Truck className="h-4 w-4" />
            <span>{row.courier.vehicle}</span>
          </div>
        </div>
      )
    },
    {
      id: "schedule",
      header: "Schedule",
      cell: (row) => (
        <div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-gray-400" />
            <span>{new Date(row.schedule.date).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Clock className="h-4 w-4" />
            <span>{row.schedule.startTime} - {row.schedule.endTime}</span>
          </div>
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        const getStatusColor = (status: DeliveryArrangement["status"]) => {
          switch (status) {
            case "completed": return "text-green-400"
            case "in_progress": return "text-blue-400"
            case "delayed": return "text-red-400"
            default: return "text-yellow-400"
          }
        }

        const getStatusIcon = (status: DeliveryArrangement["status"]) => {
          switch (status) {
            case "completed": return <CheckCircle className="h-4 w-4" />
            case "in_progress": return <RefreshCw className="h-4 w-4" />
            case "delayed": return <AlertTriangle className="h-4 w-4" />
            default: return <Clock className="h-4 w-4" />
          }
        }

        return (
          <div className={`flex items-center gap-2 ${getStatusColor(row.status)}`}>
            {getStatusIcon(row.status)}
            <span className="capitalize">{row.status.replace("_", " ")}</span>
          </div>
        )
      }
    },
    {
      id: "metrics",
      header: "Metrics",
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Efficiency:</span>
            <span className={`${
              row.efficiency >= 80 ? 'text-green-400' : 
              row.efficiency >= 60 ? 'text-yellow-400' : 
              'text-red-400'
            }`}>
              {row.efficiency}%
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-gray-400">Cost/Delivery:</span>
            <span>${row.costPerDelivery.toFixed(2)}</span>
          </div>
        </div>
      )
    }
  ]

  const stats = {
    totalArrangements: arrangements.length,
    inProgress: arrangements.filter(a => a.status === "in_progress").length,
    completed: arrangements.filter(a => a.status === "completed").length,
    delayed: arrangements.filter(a => a.status === "delayed").length,
    averageEfficiency: arrangements.reduce((acc, curr) => acc + curr.efficiency, 0) / arrangements.length
  }

  return (
    <div className="space-y-6">
      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Package className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Arrangements</p>
              <p className="text-2xl font-bold">{stats.totalArrangements}</p>
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
            <div className="p-3 bg-yellow-900/50 rounded-full">
              <RefreshCw className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">In Progress</p>
              <p className="text-2xl font-bold text-yellow-400">{stats.inProgress}</p>
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
              <BarChart2 className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Efficiency</p>
              <p className="text-2xl font-bold text-purple-400">{stats.averageEfficiency.toFixed(1)}%</p>
            </div>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4 flex-1">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search arrangements..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <button
            onClick={() => {/* Implement filter */}}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            <Filter className="h-4 w-4" />
            Filter
          </button>
          <button
            onClick={() => {/* Implement export */}}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveView("list")}
            className={`p-2 rounded-lg ${
              activeView === "list" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <Package className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveView("map")}
            className={`p-2 rounded-lg ${
              activeView === "map" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <MapPin className="h-4 w-4" />
          </button>
          <button
            onClick={() => setActiveView("analytics")}
            className={`p-2 rounded-lg ${
              activeView === "analytics" ? "bg-gray-700" : "hover:bg-gray-700"
            }`}
          >
            <BarChart2 className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Main Content */}
      {activeView === "list" ? (
        <div className="bg-gray-900 rounded-xl border border-gray-700">
          <DataTable
            columns={columns}
            data={arrangements}
            pageSize={10}
            selectable
            selectedRows={selectedArrangements}
            onSelectRows={setSelectedArrangements}
          />
        </div>
      ) : activeView === "map" ? (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="h-[600px] bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Map View Coming Soon</p>
          </div>
        </div>
      ) : (
        <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
          <div className="h-[600px] bg-gray-800 rounded-lg flex items-center justify-center">
            <p className="text-gray-400">Analytics View Coming Soon</p>
          </div>
        </div>
      )}

      {/* Route Optimization Alert */}
      <div className="bg-blue-900/30 border border-blue-800 p-4 rounded-lg">
        <div className="flex items-start gap-3">
          <Settings className="h-5 w-5 text-blue-400 mt-1" />
          <div>
            <h4 className="font-medium text-blue-300">Route Optimization Available</h4>
            <p className="text-sm text-blue-200 mt-1">
              Our AI suggests a new route optimization that could improve delivery efficiency by 15% and reduce costs by 12%.
            </p>
            <button
              onClick={() => setShowOptimizationModal(true)}
              className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              View Optimization
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 