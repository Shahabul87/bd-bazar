"use client"

import { DataTable } from "./data-table"
import Image from "next/image"
import { Package, Truck, Clock, CheckCircle, XCircle, RefreshCcw } from "lucide-react"

interface DeliveryItem {
  id: string
  product: {
    name: string
    image: string
    price: number
  }
  customer: {
    name: string
    address: string
  }
  status: "not_paid" | "processing" | "shipped" | "delivered" | "cancelled" | "returned"
  trackingNumber: string
  date: string
  deliveryService: string
}

interface DeliveryTableProps {
  searchQuery?: string
  filters?: any
}

const getStatusIcon = (status: DeliveryItem["status"]) => {
  switch (status) {
    case "not_paid":
      return Clock
    case "processing":
      return Package
    case "shipped":
      return Truck
    case "delivered":
      return CheckCircle
    case "cancelled":
      return XCircle
    case "returned":
      return RefreshCcw
    default:
      return Package
  }
}

const getStatusColor = (status: DeliveryItem["status"]) => {
  switch (status) {
    case "not_paid":
      return "bg-yellow-900 text-yellow-300"
    case "processing":
      return "bg-blue-900 text-blue-300"
    case "shipped":
      return "bg-purple-900 text-purple-300"
    case "delivered":
      return "bg-green-900 text-green-300"
    case "cancelled":
      return "bg-red-900 text-red-300"
    case "returned":
      return "bg-orange-900 text-orange-300"
    default:
      return "bg-gray-900 text-gray-300"
  }
}

export const DeliveryTable = ({ searchQuery = "", filters }: DeliveryTableProps) => {
  const columns = [
    {
      header: "Product",
      accessorKey: "product" as keyof DeliveryItem,
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
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
      header: "Customer",
      accessorKey: "customer" as keyof DeliveryItem,
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <div>
          <p className="font-medium text-white">{row.original.customer.name}</p>
          <p className="text-sm text-gray-400">{row.original.customer.address}</p>
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status" as keyof DeliveryItem,
      cell: ({ row }: { row: { original: DeliveryItem } }) => {
        const StatusIcon = getStatusIcon(row.original.status)
        return (
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${getStatusColor(row.original.status)}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="capitalize">{row.original.status.replace("_", " ")}</span>
          </div>
        )
      }
    },
    {
      header: "Tracking",
      accessorKey: "trackingNumber" as keyof DeliveryItem,
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <span className="text-gray-300">{row.original.trackingNumber}</span>
      )
    },
    {
      header: "Date",
      accessorKey: "date" as keyof DeliveryItem,
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <span className="text-gray-300">{row.original.date}</span>
      )
    },
    {
      header: "Service",
      accessorKey: "deliveryService" as keyof DeliveryItem,
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <span className="text-gray-300">{row.original.deliveryService}</span>
      )
    }
  ]

  // Mock data - replace with actual API call
  const deliveryData: DeliveryItem[] = [
    {
      id: "DEL-001",
      product: {
        name: "Wireless Headphones",
        image: "https://picsum.photos/seed/1/40/40",
        price: 299.99
      },
      customer: {
        name: "John Doe",
        address: "123 Main St, Toronto, ON"
      },
      status: "shipped",
      trackingNumber: "TRK123456789",
      date: "2024-03-21",
      deliveryService: "Express Delivery"
    },
    {
      id: "DEL-002",
      product: {
        name: "Smart Watch",
        image: "https://picsum.photos/seed/2/40/40",
        price: 199.99
      },
      customer: {
        name: "Jane Smith",
        address: "456 Oak St, Vancouver, BC"
      },
      status: "processing",
      trackingNumber: "TRK987654321",
      date: "2024-03-20",
      deliveryService: "Standard Shipping"
    }
  ]

  // Filter data based on search query
  const filteredData = deliveryData.filter(item => {
    const searchLower = searchQuery.toLowerCase()
    return (
      item.product.name.toLowerCase().includes(searchLower) ||
      item.customer.name.toLowerCase().includes(searchLower) ||
      item.trackingNumber.toLowerCase().includes(searchLower)
    )
  })

  return (
    <DataTable<DeliveryItem>
      columns={columns}
      data={filteredData}
      pageSize={10}
      sortable
    />
  )
} 