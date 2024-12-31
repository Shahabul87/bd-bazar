"use client"

import { useState } from "react"
import { Eye, MoreVertical, Package, Truck, CheckCircle, XCircle } from "lucide-react"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface Order {
  id: string
  orderNumber: string
  customer: {
    name: string
    email: string
  }
  date: string
  total: number
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  items: number
}

interface OrderStatusTableProps {
  searchQuery: string
  filters: any
  selectedOrders: string[]
  onSelectOrders: (ids: string[]) => void
}

export const OrderStatusTable = ({
  searchQuery,
  filters,
  selectedOrders,
  onSelectOrders
}: OrderStatusTableProps) => {
  // Mock data
  const orders: Order[] = [
    {
      id: "1",
      orderNumber: "ORD-001",
      customer: {
        name: "John Doe",
        email: "john@example.com"
      },
      date: "2024-03-15",
      total: 125.99,
      status: "pending",
      paymentStatus: "paid",
      items: 3
    },
    {
      id: "2",
      orderNumber: "ORD-002",
      customer: {
        name: "Jane Smith",
        email: "jane@example.com"
      },
      date: "2024-03-14",
      total: 89.99,
      status: "shipped",
      paymentStatus: "paid",
      items: 2
    }
  ]

  const columns: Column<Order>[] = [
    {
      id: "order",
      header: "Order",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.orderNumber}</p>
          <p className="text-sm text-gray-400">{new Date(row.date).toLocaleDateString()}</p>
        </div>
      )
    },
    {
      id: "customer",
      header: "Customer",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.customer.name}</p>
          <p className="text-sm text-gray-400">{row.customer.email}</p>
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
      id: "total",
      header: "Total",
      cell: (row) => (
        <div className="font-medium">
          ${row.total.toFixed(2)}
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => {
        const getStatusColor = (status: Order["status"]) => {
          switch (status) {
            case "pending": return "text-yellow-400"
            case "processing": return "text-blue-400"
            case "shipped": return "text-purple-400"
            case "delivered": return "text-green-400"
            case "cancelled": return "text-red-400"
            default: return "text-gray-400"
          }
        }

        return (
          <div className={`flex items-center gap-2 ${getStatusColor(row.status)}`}>
            {row.status === "delivered" ? (
              <CheckCircle className="h-4 w-4" />
            ) : row.status === "cancelled" ? (
              <XCircle className="h-4 w-4" />
            ) : (
              <Truck className="h-4 w-4" />
            )}
            <span className="capitalize">{row.status}</span>
          </div>
        )
      }
    },
    {
      id: "payment",
      header: "Payment",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.paymentStatus === 'paid'
            ? 'bg-green-100 text-green-800'
            : row.paymentStatus === 'pending'
            ? 'bg-yellow-100 text-yellow-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.paymentStatus.charAt(0).toUpperCase() + row.paymentStatus.slice(1)}
        </div>
      )
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
          <button
            onClick={() => {/* Implement more actions */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const filteredOrders = orders.filter(order => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      return (
        order.orderNumber.toLowerCase().includes(search) ||
        order.customer.name.toLowerCase().includes(search) ||
        order.customer.email.toLowerCase().includes(search)
      )
    }
    return true
  })

  return (
    <DataTable
      columns={columns}
      data={filteredOrders}
      pageSize={10}
      selectable
      selectedRows={selectedOrders}
      onSelectRows={onSelectOrders}
    />
  )
} 