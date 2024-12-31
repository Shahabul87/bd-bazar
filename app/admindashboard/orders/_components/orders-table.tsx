"use client"

import { DataTable } from "../../_components/data-table"
import Image from "next/image"
import { Eye, Clock, CheckCircle, XCircle, Package, Truck } from "lucide-react"
import { OrderViewModal } from "./order-view-modal"
import { QuickActionsMenu } from "./quick-actions-menu"
import { useState } from "react"

interface Order {
  id: string
  customer: {
    name: string
    email: string
    avatar: string
  }
  product: {
    name: string
    image: string
    price: number
  }
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  date: string
  total: number
  paymentStatus: "paid" | "unpaid" | "refunded"
}

interface OrdersTableProps {
  searchQuery: string
  filters: any
}

const getStatusIcon = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return Clock
    case "processing":
      return Package
    case "shipped":
      return Truck
    case "delivered":
      return CheckCircle
    case "cancelled":
      return XCircle
    default:
      return Package
  }
}

const getStatusColor = (status: Order["status"]) => {
  switch (status) {
    case "pending":
      return "bg-yellow-900 text-yellow-300"
    case "processing":
      return "bg-blue-900 text-blue-300"
    case "shipped":
      return "bg-purple-900 text-purple-300"
    case "delivered":
      return "bg-green-900 text-green-300"
    case "cancelled":
      return "bg-red-900 text-red-300"
    default:
      return "bg-gray-900 text-gray-300"
  }
}

export const OrdersTable = ({ searchQuery, filters }: OrdersTableProps) => {
  const [selectedOrder, setSelectedOrder] = useState<string | null>(null)

  const handleViewOrder = (orderId: string) => {
    setSelectedOrder(orderId)
  }

  const columns = [
    {
      header: "Order ID",
      accessorKey: "id" as keyof Order
    },
    {
      header: "Customer",
      accessorKey: "customer" as keyof Order,
      cell: ({ row }: { row: { original: Order } }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.customer.avatar}
            alt={row.original.customer.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-white">{row.original.customer.name}</p>
            <p className="text-sm text-gray-400">{row.original.customer.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Product",
      accessorKey: "product" as keyof Order,
      cell: ({ row }: { row: { original: Order } }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.product.image}
            alt={row.original.product.name}
            width={40}
            height={40}
            className="rounded-lg"
          />
          <div>
            <p className="font-medium text-white">{row.original.product.name}</p>
            <p className="text-sm text-gray-400">${row.original.product.price}</p>
          </div>
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status" as keyof Order,
      cell: ({ row }: { row: { original: Order } }) => {
        const StatusIcon = getStatusIcon(row.original.status)
        return (
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${getStatusColor(row.original.status)}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="capitalize">{row.original.status}</span>
          </div>
        )
      }
    },
    {
      header: "Date",
      accessorKey: "date" as keyof Order
    },
    {
      header: "Total",
      accessorKey: "total" as keyof Order,
      cell: ({ row }: { row: { original: Order } }) => (
        <span className="text-white">${row.original.total.toLocaleString()}</span>
      )
    },
    {
      header: "Actions",
      accessorKey: "id" as keyof Order,
      cell: ({ row }: { row: { original: Order } }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewOrder(row.original.id)}
            className="p-1 hover:bg-gray-700 rounded-full text-gray-400 hover:text-gray-300"
            title="View Details"
          >
            <Eye className="h-4 w-4" />
          </button>
          <QuickActionsMenu orderId={row.original.id} status={row.original.status} />
        </div>
      )
    }
  ]

  // Mock data - replace with actual API call
  const ordersData: Order[] = [
    {
      id: "ORD-001",
      customer: {
        name: "John Doe",
        email: "john@example.com",
        avatar: "https://picsum.photos/seed/1/32/32"
      },
      product: {
        name: "Wireless Headphones",
        image: "https://picsum.photos/seed/1/40/40",
        price: 299.99
      },
      status: "pending",
      date: "2024-03-21",
      total: 299.99,
      paymentStatus: "unpaid"
    },
    // Add more mock orders...
  ]

  return (
    <>
      <DataTable<Order>
        columns={columns}
        data={ordersData}
        pageSize={10}
      />

      {selectedOrder && (
        <OrderViewModal
          isOpen={!!selectedOrder}
          onClose={() => setSelectedOrder(null)}
          orderId={selectedOrder}
        />
      )}
    </>
  )
} 