"use client"

import { useState } from "react"
import { Eye, Truck, Package, Clock, CheckCircle, XCircle } from "lucide-react"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface Delivery {
  id: string
  trackingNumber: string
  customer: {
    name: string
    address: string
  }
  orderDate: string
  estimatedDelivery: string
  status: "pending" | "in_transit" | "delivered" | "failed"
  items: number
}

interface DeliveryTableProps {
  searchQuery: string
  filters: any
  selectedDeliveries: string[]
  onSelectDeliveries: (ids: string[]) => void
}

export const DeliveryTable = ({
  searchQuery,
  filters,
  selectedDeliveries,
  onSelectDeliveries
}: DeliveryTableProps) => {
  // Mock data
  const deliveries: Delivery[] = [
    {
      id: "1",
      trackingNumber: "TRK-001",
      customer: {
        name: "John Doe",
        address: "123 Main St, City, Country"
      },
      orderDate: "2024-03-15",
      estimatedDelivery: "2024-03-18",
      status: "in_transit",
      items: 3
    },
    {
      id: "2",
      trackingNumber: "TRK-002",
      customer: {
        name: "Jane Smith",
        address: "456 Oak St, City, Country"
      },
      orderDate: "2024-03-14",
      estimatedDelivery: "2024-03-17",
      status: "pending",
      items: 2
    }
  ]

  const columns: Column<Delivery>[] = [
    {
      id: "tracking",
      header: "Tracking Info",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.trackingNumber}</p>
          <p className="text-sm text-gray-400">{new Date(row.orderDate).toLocaleDateString()}</p>
        </div>
      )
    },
    {
      id: "customer",
      header: "Customer",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.customer.name}</p>
          <p className="text-sm text-gray-400">{row.customer.address}</p>
        </div>
      )
    },
    {
      id: "items",
      header: "Items",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Package className="h-4 w-4 text-gray-400" />
          <span>{row.items} items</span>
        </div>
      )
    },
    {
      id: "estimated",
      header: "Estimated Delivery",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4 text-gray-400" />
          <span>{new Date(row.estimatedDelivery).toLocaleDateString()}</span>
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        const getStatusColor = (status: Delivery["status"]) => {
          switch (status) {
            case "pending": return "text-yellow-400"
            case "in_transit": return "text-blue-400"
            case "delivered": return "text-green-400"
            case "failed": return "text-red-400"
            default: return "text-gray-400"
          }
        }

        return (
          <div className={`flex items-center gap-2 ${getStatusColor(row.status)}`}>
            {row.status === "delivered" ? (
              <CheckCircle className="h-4 w-4" />
            ) : row.status === "failed" ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <Truck className="h-4 w-4" />
            )}
            <span className="capitalize">{row.status.replace('_', ' ')}</span>
          </div>
        )
      }
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* Implement view details */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const filteredDeliveries = deliveries.filter(delivery => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      return (
        delivery.trackingNumber.toLowerCase().includes(search) ||
        delivery.customer.name.toLowerCase().includes(search) ||
        delivery.customer.address.toLowerCase().includes(search)
      )
    }
    return true
  })

  return (
    <DataTable
      columns={columns}
      data={filteredDeliveries}
      pageSize={10}
      selectable
      selectedRows={selectedDeliveries}
      onSelectRows={onSelectDeliveries}
    />
  )
} 