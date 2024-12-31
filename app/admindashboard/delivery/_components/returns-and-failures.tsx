"use client"

import { useState } from "react"
import { 
  XCircle, 
  RefreshCw, 
  Phone, 
  Mail,
  Package,
  ArrowLeft,
  DollarSign,
  MessageSquare,
  AlertTriangle,
  Truck,
  MapPin
} from "lucide-react"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface ReturnedOrder {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
  }
  product: {
    name: string
    sku: string
  }
  returnReason: string
  returnDate: string
  status: "pending" | "processed" | "refunded"
  refundAmount: number
}

interface FailedDelivery {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
  }
  failureReason: string
  failureDate: string
  attempts: number
  courier: string
  status: "pending_resolution" | "contacted" | "rescheduled" | "refunded"
}

interface ReturnsAndFailuresProps {
  dateRange: {
    from: string
    to: string
  }
}

export const ReturnsAndFailures = ({ dateRange }: ReturnsAndFailuresProps) => {
  const [activeTab, setActiveTab] = useState<"returns" | "failures">("returns")
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Mock data for returns
  const returns: ReturnedOrder[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        phone: "+1 234 567 890"
      },
      product: {
        name: "Product Name",
        sku: "SKU001"
      },
      returnReason: "Defective product",
      returnDate: "2024-03-15",
      status: "pending",
      refundAmount: 99.99
    }
  ]

  // Mock data for failed deliveries
  const failures: FailedDelivery[] = [
    {
      id: "1",
      orderNumber: "ORD-002",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com",
        phone: "+1 234 567 891",
        address: "123 Main St, City, Country"
      },
      failureReason: "Incorrect address",
      failureDate: "2024-03-16",
      attempts: 2,
      courier: "FastShip",
      status: "pending_resolution"
    }
  ]

  const returnColumns: Column<ReturnedOrder>[] = [
    {
      id: "order",
      header: "Order Details",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.orderNumber}</p>
          <p className="text-sm text-gray-400">{row.product.name}</p>
          <p className="text-xs text-gray-400">SKU: {row.product.sku}</p>
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
            <Mail className="h-4 w-4" />
            <span>{row.customer.email}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Phone className="h-4 w-4" />
            <span>{row.customer.phone}</span>
          </div>
        </div>
      )
    },
    {
      id: "return_details",
      header: "Return Details",
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-yellow-400">
            <Package className="h-4 w-4" />
            <span>{row.returnReason}</span>
          </div>
          <p className="text-sm text-gray-400">
            Returned on {new Date(row.returnDate).toLocaleDateString()}
          </p>
          <p className="text-sm font-medium">
            Refund Amount: ${row.refundAmount.toFixed(2)}
          </p>
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'refunded'
            ? 'bg-green-100 text-green-800'
            : row.status === 'processed'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
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
            onClick={() => {/* Implement process return */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Process Return"
          >
            <RefreshCw className="h-4 w-4 text-blue-400" />
          </button>
          <button
            onClick={() => {/* Implement refund */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Issue Refund"
          >
            <DollarSign className="h-4 w-4 text-green-400" />
          </button>
        </div>
      )
    }
  ]

  const failureColumns: Column<FailedDelivery>[] = [
    {
      id: "order",
      header: "Order Details",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.orderNumber}</p>
          <p className="text-sm text-gray-400">Failed on {new Date(row.failureDate).toLocaleDateString()}</p>
          <p className="text-xs text-gray-400">{row.attempts} delivery attempts</p>
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
            <MapPin className="h-4 w-4" />
            <span>{row.customer.address}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Phone className="h-4 w-4" />
            <span>{row.customer.phone}</span>
          </div>
        </div>
      )
    },
    {
      id: "failure_details",
      header: "Failure Details",
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-red-400">
            <AlertTriangle className="h-4 w-4" />
            <span>{row.failureReason}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Truck className="h-4 w-4" />
            <span>Courier: {row.courier}</span>
          </div>
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'refunded'
            ? 'bg-red-100 text-red-800'
            : row.status === 'rescheduled'
            ? 'bg-green-100 text-green-800'
            : row.status === 'contacted'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
          ).join(' ')}
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => {/* Implement contact customer */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Contact Customer"
          >
            <Phone className="h-4 w-4 text-blue-400" />
          </button>
          <button
            onClick={() => {/* Implement send message */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Send Message"
          >
            <MessageSquare className="h-4 w-4 text-purple-400" />
          </button>
          <button
            onClick={() => {/* Implement reschedule */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Reschedule Delivery"
          >
            <RefreshCw className="h-4 w-4 text-green-400" />
          </button>
          <button
            onClick={() => {/* Implement refund */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Issue Refund"
          >
            <DollarSign className="h-4 w-4 text-red-400" />
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
          <h2 className="text-lg font-medium">Returns & Failed Deliveries</h2>
          <p className="text-sm text-gray-400">Manage returns and resolve delivery issues</p>
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab("returns")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "returns"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            Returns ({returns.length})
          </button>
          <button
            onClick={() => setActiveTab("failures")}
            className={`px-4 py-2 rounded-lg transition-colors ${
              activeTab === "failures"
                ? "bg-blue-600 text-white"
                : "text-gray-400 hover:bg-gray-700"
            }`}
          >
            Failed Deliveries ({failures.length})
          </button>
        </div>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {activeTab === "returns" ? (
          <>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/50 rounded-full">
                  <Package className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Returns</p>
                  <p className="text-2xl font-bold">{returns.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-900/50 rounded-full">
                  <RefreshCw className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pending Processing</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {returns.filter(r => r.status === "pending").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-900/50 rounded-full">
                  <DollarSign className="h-5 w-5 text-green-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Total Refunds</p>
                  <p className="text-2xl font-bold text-green-400">
                    ${returns.reduce((sum, r) => sum + r.refundAmount, 0).toFixed(2)}
                  </p>
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-red-900/50 rounded-full">
                  <XCircle className="h-5 w-5 text-red-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Failed Deliveries</p>
                  <p className="text-2xl font-bold text-red-400">{failures.length}</p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-900/50 rounded-full">
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Pending Resolution</p>
                  <p className="text-2xl font-bold text-yellow-400">
                    {failures.filter(f => f.status === "pending_resolution").length}
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-4 rounded-lg border border-gray-700">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-900/50 rounded-full">
                  <RefreshCw className="h-5 w-5 text-blue-400" />
                </div>
                <div>
                  <p className="text-sm text-gray-400">Rescheduled</p>
                  <p className="text-2xl font-bold text-blue-400">
                    {failures.filter(f => f.status === "rescheduled").length}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Data Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <DataTable
          columns={activeTab === "returns" ? returnColumns : failureColumns}
          data={activeTab === "returns" ? returns : failures}
          pageSize={10}
          selectable
          selectedRows={selectedItems}
          onSelectRows={setSelectedItems}
        />
      </div>
    </div>
  )
} 