"use client"

import { useState } from "react"
import { 
  Plus, 
  Trash, 
  Edit, 
  Star,
  Clock,
  TrendingUp,
  Package,
  CheckCircle,
  AlertTriangle,
  Link
} from "lucide-react"
import { DataTable } from "@/app/dashboard/_components/data-table"
import type { Column } from "@/app/dashboard/_components/data-table"
import Image from "next/image"

interface Courier {
  id: string
  name: string
  logo: string
  totalOrders: number
  successRate: number
  avgDeliveryTime: number
  status: "active" | "inactive"
  coverage: string[]
  pricing: {
    base: number
    perKm: number
  }
  rating: number
  failedDeliveries: number
}

interface CourierManagementProps {
  onAddCourier: () => void
  onEditCourier: (courier: Courier) => void
}

export const CourierManagement = ({
  onAddCourier,
  onEditCourier
}: CourierManagementProps) => {
  const [selectedCouriers, setSelectedCouriers] = useState<string[]>([])

  // Mock data for couriers
  const couriers: Courier[] = [
    {
      id: "1",
      name: "FastShip Express",
      logo: "https://picsum.photos/seed/1/40/40",
      totalOrders: 1250,
      successRate: 95.5,
      avgDeliveryTime: 1.8,
      status: "active",
      coverage: ["North Region", "South Region", "East Region"],
      pricing: {
        base: 10,
        perKm: 0.5
      },
      rating: 4.5,
      failedDeliveries: 25
    },
    {
      id: "2",
      name: "SpeedPost",
      logo: "https://picsum.photos/seed/2/40/40",
      totalOrders: 980,
      successRate: 92.8,
      avgDeliveryTime: 2.1,
      status: "active",
      coverage: ["West Region", "Central Region"],
      pricing: {
        base: 8,
        perKm: 0.6
      },
      rating: 4.2,
      failedDeliveries: 35
    }
  ]

  const columns: Column<Courier>[] = [
    {
      id: "courier",
      header: "Courier",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.logo}
            alt={row.name}
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <p className="font-medium">{row.name}</p>
            <div className="flex items-center gap-1 text-sm text-gray-400">
              <Star className="h-4 w-4 text-yellow-400" />
              <span>{row.rating.toFixed(1)}</span>
            </div>
          </div>
        </div>
      )
    },
    {
      id: "performance",
      header: "Performance",
      cell: (row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Package className="h-4 w-4 text-gray-400" />
            <span>{row.totalOrders.toLocaleString()} orders</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-gray-400" />
            <span>{row.avgDeliveryTime} days avg.</span>
          </div>
        </div>
      )
    },
    {
      id: "successRate",
      header: "Success Rate",
      cell: (row) => (
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-green-400">
            <CheckCircle className="h-4 w-4" />
            <span>{row.successRate}%</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>{row.failedDeliveries} failed</span>
          </div>
        </div>
      )
    },
    {
      id: "coverage",
      header: "Coverage",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row.coverage.map((region) => (
            <span
              key={region}
              className="px-2 py-1 text-xs bg-gray-700 rounded-full"
            >
              {region}
            </span>
          ))}
        </div>
      )
    },
    {
      id: "pricing",
      header: "Pricing",
      cell: (row) => (
        <div className="space-y-1">
          <p className="text-sm">Base: ${row.pricing.base}</p>
          <p className="text-sm text-gray-400">
            +${row.pricing.perKm}/km
          </p>
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'active'
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEditCourier(row)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Edit Courier"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement courier removal */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-400"
            title="Remove Courier"
          >
            <Trash className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement order assignment */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-blue-400"
            title="Assign Orders"
          >
            <Link className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-lg font-medium">Courier Partners</h2>
          <p className="text-sm text-gray-400">Manage your delivery partners and their performance</p>
        </div>
        <button
          onClick={onAddCourier}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Courier
        </button>
      </div>

      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-green-900/50 rounded-full">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Average Success Rate</p>
              <p className="text-2xl font-bold text-green-400">
                {(couriers.reduce((acc, c) => acc + c.successRate, 0) / couriers.length).toFixed(1)}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-blue-900/50 rounded-full">
              <Clock className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Avg. Delivery Time</p>
              <p className="text-2xl font-bold text-blue-400">
                {(couriers.reduce((acc, c) => acc + c.avgDeliveryTime, 0) / couriers.length).toFixed(1)} days
              </p>
            </div>
          </div>
        </div>

        <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-purple-900/50 rounded-full">
              <Package className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Orders Delivered</p>
              <p className="text-2xl font-bold text-purple-400">
                {couriers.reduce((acc, c) => acc + c.totalOrders, 0).toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Courier Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <DataTable
          columns={columns}
          data={couriers}
          pageSize={5}
          selectable
          selectedRows={selectedCouriers}
          onSelectRows={setSelectedCouriers}
        />
      </div>
    </div>
  )
} 