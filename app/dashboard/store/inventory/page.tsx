"use client"

import { useState } from "react"
import { 
  ArrowLeft, 
  Package, 
  AlertTriangle, 
  TrendingDown,
  Download,
  Upload,
  Filter,
  Search
} from "lucide-react"
import { useRouter } from "next/navigation"
import { InventoryTable } from "../_components/inventory-table"

export default function InventoryPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  const inventoryStats = [
    {
      title: "Total Stock Value",
      value: "$124,500",
      trend: "+12.5%",
      color: "text-blue-500"
    },
    {
      title: "Low Stock Items",
      value: "24",
      trend: "+3.2%",
      color: "text-orange-500"
    },
    {
      title: "Out of Stock",
      value: "12",
      trend: "-2.4%",
      color: "text-red-500"
    },
    {
      title: "Stock Turnover",
      value: "4.5x",
      trend: "+1.2%",
      color: "text-green-500"
    }
  ]

  return (
    <div className="p-6 space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.push("/admindashboard/store")}
          className="p-2 hover:bg-gray-700 rounded-full transition text-gray-300"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">Inventory Management</h1>
          <p className="text-sm text-gray-400">Track and manage your product inventory</p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {inventoryStats.map((stat) => (
          <div key={stat.title} className="bg-gray-900 p-6 rounded-xl border border-gray-700">
            <h3 className="text-sm text-gray-400">{stat.title}</h3>
            <div className="mt-2 flex items-center justify-between">
              <p className="text-2xl font-bold text-white">{stat.value}</p>
              <span className={`text-sm ${stat.trend.startsWith('+') ? 'text-green-400' : 'text-red-400'}`}>
                {stat.trend}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4">
        <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
          flex items-center gap-2">
          <Upload className="h-4 w-4" />
          Bulk Update
        </button>
        <button className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 
          flex items-center gap-2">
          <Download className="h-4 w-4" />
          Export Inventory
        </button>
      </div>

      {/* Search and Filter Bar */}
      <div className="flex gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search inventory..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
              text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button className="px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg
          hover:bg-gray-700 text-gray-300 flex items-center gap-2">
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Alerts Section */}
      <div className="bg-red-900/20 border border-red-800 p-4 rounded-lg">
        <h4 className="font-medium text-red-400 flex items-center gap-2 mb-2">
          <AlertTriangle className="h-5 w-5" />
          Inventory Alerts
        </h4>
        <ul className="space-y-2 text-sm text-red-300">
          <li>• 5 products are out of stock</li>
          <li>• 12 products are below reorder point</li>
          <li>• 3 products have expired lot numbers</li>
        </ul>
      </div>

      {/* Inventory Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-700">
        <InventoryTable searchQuery={searchQuery} />
      </div>
    </div>
  )
} 