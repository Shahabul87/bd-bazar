"use client"

import { useState } from "react"
import { 
  Truck, 
  XCircle, 
  Clock, 
  Phone, 
  Calendar, 
  MapPin, 
  AlertTriangle,
  MessageSquare,
  RefreshCw
} from "lucide-react"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface DeliveryStatusBreakdownProps {
  dateRange: {
    from: string
    to: string
  }
}

interface DeliveryItem {
  id: string
  orderNumber: string
  customer: {
    name: string
    phone: string
    address: string
  }
  expectedDelivery: string
  courier: {
    name: string
    trackingNumber: string
  }
  status: "in_transit" | "failed" | "pending"
  failureReason?: string
  lastUpdate: string
}

export const DeliveryStatusBreakdown = ({ dateRange }: DeliveryStatusBreakdownProps) => {
  const [activeTab, setActiveTab] = useState<"in_transit" | "failed" | "pending">("in_transit")

  // Mock data
  const deliveries: DeliveryItem[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      customer: {
        name: "John Doe",
        phone: "+1 234 567 890",
        address: "123 Main St, City, Country"
      },
      expectedDelivery: "2024-03-20",
      courier: {
        name: "FastShip",
        trackingNumber: "FS123456789"
      },
      status: "in_transit",
      lastUpdate: "2024-03-18 14:30"
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      customer: {
        name: "Jane Smith",
        phone: "+1 234 567 891",
        address: "456 Oak St, City, Country"
      },
      expectedDelivery: "2024-03-19",
      courier: {
        name: "SpeedPost",
        trackingNumber: "SP987654321"
      },
      status: "failed",
      failureReason: "Address not found",
      lastUpdate: "2024-03-18 15:45"
    },
    {
      id: "3",
      orderNumber: "ORD-003",
      customer: {
        name: "Alice Johnson",
        phone: "+1 234 567 892",
        address: "789 Pine St, City, Country"
      },
      expectedDelivery: "2024-03-21",
      courier: {
        name: "FastShip",
        trackingNumber: "FS123456790"
      },
      status: "pending",
      lastUpdate: "2024-03-18 16:15"
    }
  ]

  const columns: Column<DeliveryItem>[] = [
    {
      id: "order",
      header: "Order Details",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.orderNumber}</p>
          <p className="text-sm text-gray-400">Last update: {row.lastUpdate}</p>
        </div>
      )
    },
    {
      id: "customer",
      header: "Customer",
      cell: (row) => (
        <div className="space-y-1">
          <p className="font-medium">{row.customer.name}</p>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Phone className="h-4 w-4" />
            <span>{row.customer.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <MapPin className="h-4 w-4" />
            <span>{row.customer.address}</span>
          </div>
        </div>
      )
    },
    {
      id: "delivery",
      header: "Delivery Info",
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-blue-400" />
            <span>Expected: {new Date(row.expectedDelivery).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Truck className="h-4 w-4" />
            <span>{row.courier.name}</span>
          </div>
          <p className="text-sm text-gray-400">Tracking: {row.courier.trackingNumber}</p>
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div>
          <div className={`inline-flex items-center gap-2 px-2.5 py-1 rounded-full text-sm ${
            row.status === 'in_transit'
              ? 'bg-blue-900/50 text-blue-400'
              : row.status === 'failed'
              ? 'bg-red-900/50 text-red-400'
              : 'bg-yellow-900/50 text-yellow-400'
          }`}>
            {row.status === 'in_transit' ? (
              <Truck className="h-4 w-4" />
            ) : row.status === 'failed' ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <Clock className="h-4 w-4" />
            )}
            <span className="capitalize">{row.status.replace('_', ' ')}</span>
          </div>
          {row.failureReason && (
            <div className="mt-2 flex items-center gap-2 text-sm text-red-400">
              <AlertTriangle className="h-4 w-4" />
              <span>{row.failureReason}</span>
            </div>
          )}
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          {row.status === 'failed' && (
            <>
              <button
                onClick={() => {/* Implement contact customer */}}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Contact Customer"
              >
                <Phone className="h-4 w-4 text-blue-400" />
              </button>
              <button
                onClick={() => {/* Implement reschedule */}}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Reschedule Delivery"
              >
                <Calendar className="h-4 w-4 text-green-400" />
              </button>
            </>
          )}
          <button
            onClick={() => {/* Implement send message */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Send Message"
          >
            <MessageSquare className="h-4 w-4" />
          </button>
          {row.status === 'pending' && (
            <button
              onClick={() => {/* Implement dispatch */}}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              title="Dispatch Order"
            >
              <RefreshCw className="h-4 w-4 text-green-400" />
            </button>
          )}
        </div>
      )
    }
  ]

  const filteredDeliveries = deliveries.filter(delivery => delivery.status === activeTab)

  return (
    <div className="space-y-6">
      {/* Status Tabs */}
      <div className="flex gap-4 border-b border-gray-700">
        <button
          onClick={() => setActiveTab("in_transit")}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "in_transit"
              ? "border-blue-500 text-blue-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          In Transit (45)
        </button>
        <button
          onClick={() => setActiveTab("failed")}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "failed"
              ? "border-red-500 text-red-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          Failed (12)
        </button>
        <button
          onClick={() => setActiveTab("pending")}
          className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors ${
            activeTab === "pending"
              ? "border-yellow-500 text-yellow-500"
              : "border-transparent text-gray-400 hover:text-gray-300"
          }`}
        >
          Pending (23)
        </button>
      </div>

      {/* Status-specific content */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <DataTable
          columns={columns}
          data={filteredDeliveries}
          pageSize={5}
        />
      </div>
    </div>
  )
} 