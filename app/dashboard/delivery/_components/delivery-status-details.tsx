"use client"

import { DataTable } from "../../_components/data-table"
import Image from "next/image"
import { Package, Truck, Clock, CheckCircle, XCircle, RefreshCcw } from "lucide-react"
import { TrackingModal } from "./tracking-modal"
import { QuickActionsMenu } from "./quick-actions-menu"
import { useState } from 'react'

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
      return "bg-yellow-100 text-yellow-800"
    case "processing":
      return "bg-blue-100 text-blue-800"
    case "shipped":
      return "bg-purple-100 text-purple-800"
    case "delivered":
      return "bg-green-100 text-green-800"
    case "cancelled":
      return "bg-red-100 text-red-800"
    case "returned":
      return "bg-orange-100 text-orange-800"
    default:
      return "bg-gray-100 text-gray-800"
  }
}

interface DeliveryStatusDetailsProps {
  status: DeliveryItem["status"] | "all"
}

export const DeliveryStatusDetails = ({ status }: DeliveryStatusDetailsProps) => {
  const [selectedTracking, setSelectedTracking] = useState<string | null>(null)

  const handleViewTracking = (trackingNumber: string) => {
    setSelectedTracking(trackingNumber)
  }

  const handlePrintLabel = (id: string) => {
    console.log("Printing label for:", id)
  }

  const handleMarkDelivered = (id: string) => {
    console.log("Marking as delivered:", id)
  }

  const handleCancelDelivery = (id: string) => {
    console.log("Cancelling delivery:", id)
  }

  const handleReportIssue = (id: string) => {
    console.log("Reporting issue for:", id)
  }

  const columns = [
    {
      header: "Order ID",
      accessorKey: "id"
    },
    {
      header: "Product",
      accessorKey: "product",
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.product.image}
            alt={row.original.product.name}
            width={40}
            height={40}
            className="rounded-md"
          />
          <div>
            <p className="font-medium">{row.original.product.name}</p>
            <p className="text-sm text-gray-500">${row.original.product.price}</p>
          </div>
        </div>
      )
    },
    {
      header: "Customer",
      accessorKey: "customer",
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <div>
          <p className="font-medium">{row.original.customer.name}</p>
          <p className="text-sm text-gray-500">{row.original.customer.address}</p>
        </div>
      )
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: DeliveryItem } }) => {
        const StatusIcon = getStatusIcon(row.original.status)
        return (
          <div className={`flex items-center gap-2 px-3 py-1 rounded-full w-fit ${getStatusColor(row.original.status)}`}>
            <StatusIcon className="h-4 w-4" />
            <span className="capitalize">
              {row.original.status.replace("_", " ")}
            </span>
          </div>
        )
      }
    },
    {
      header: "Tracking",
      accessorKey: "trackingNumber"
    },
    {
      header: "Date",
      accessorKey: "date"
    },
    {
      header: "Service",
      accessorKey: "deliveryService"
    },
    {
      header: "Actions",
      accessorKey: "id",
      cell: ({ row }: { row: { original: DeliveryItem } }) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleViewTracking(row.original.trackingNumber)}
            className="text-blue-600 hover:text-blue-700 text-sm"
          >
            Track
          </button>
          <QuickActionsMenu
            onView={() => handleViewTracking(row.original.trackingNumber)}
            onPrint={() => handlePrintLabel(row.original.id)}
            onMarkDelivered={() => handleMarkDelivered(row.original.id)}
            onCancel={() => handleCancelDelivery(row.original.id)}
            onReport={() => handleReportIssue(row.original.id)}
            status={row.original.status}
          />
        </div>
      )
    }
  ]

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
      status: "not_paid",
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
      status: "shipped",
      trackingNumber: "TRK987654321",
      date: "2024-03-20",
      deliveryService: "Standard Shipping"
    }
  ]

  const filteredData = status === "all" 
    ? deliveryData 
    : deliveryData.filter(item => item.status === status)

  return (
    <>
      <div className="space-y-4">
        <div className="bg-gray-900 p-4 rounded-lg shadow-sm border border-gray-700">
          <DataTable
            columns={columns}
            data={filteredData}
            pageSize={5}
          />
        </div>
      </div>

      <TrackingModal
        isOpen={!!selectedTracking}
        onClose={() => setSelectedTracking(null)}
        trackingNumber={selectedTracking || ""}
      />
    </>
  )
} 