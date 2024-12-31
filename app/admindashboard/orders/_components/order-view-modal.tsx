"use client"

import { useState } from "react"
import { X, Package, Truck, CheckCircle, MapPin, Clock, Printer } from "lucide-react"
import Image from "next/image"

interface OrderViewModalProps {
  isOpen: boolean
  onClose: () => void
  orderId: string
}

interface OrderDetails {
  id: string
  customer: {
    name: string
    email: string
    phone: string
    address: string
    avatar: string
  }
  products: {
    name: string
    quantity: number
    price: number
    image: string
  }[]
  status: "pending" | "processing" | "shipped" | "delivered" | "cancelled"
  paymentStatus: "paid" | "pending" | "failed"
  total: number
  date: string
  deliveryMethod: string
  trackingNumber?: string
}

// Mock data - replace with actual API call
const mockOrderDetails: OrderDetails = {
  id: "ORD-001",
  customer: {
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234-567-8900",
    address: "123 Main St, Toronto, ON M5V 2T6",
    avatar: "https://picsum.photos/seed/1/40/40"
  },
  products: [
    {
      name: "Wireless Headphones",
      quantity: 1,
      price: 299.99,
      image: "https://picsum.photos/seed/1/40/40"
    }
  ],
  status: "processing",
  paymentStatus: "paid",
  total: 299.99,
  date: "2024-03-21",
  deliveryMethod: "Express",
  trackingNumber: "TRK123456789"
}

const getStatusColor = (status: OrderDetails["status"]) => {
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

const getPaymentStatusColor = (status: OrderDetails["paymentStatus"]) => {
  switch (status) {
    case "paid":
      return "text-green-400"
    case "pending":
      return "text-yellow-400"
    case "failed":
      return "text-red-400"
    default:
      return "text-gray-400"
  }
}

export const OrderViewModal = ({
  isOpen,
  onClose,
  orderId
}: OrderViewModalProps) => {
  const [orderDetails] = useState<OrderDetails>(mockOrderDetails)

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-bold">Order Details</h2>
            <p className="text-sm text-gray-400">Order ID: {orderDetails.id}</p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => console.log("Print order")}
              className="p-2 hover:bg-gray-700 rounded-full text-gray-400"
              title="Print Order"
            >
              <Printer className="h-5 w-5" />
            </button>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-700 rounded-full text-gray-400"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Customer Information */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium border-b border-gray-700 pb-2">Customer Information</h3>
            <div className="flex items-center gap-4">
              <Image
                src={orderDetails.customer.avatar}
                alt={orderDetails.customer.name}
                width={48}
                height={48}
                className="rounded-full"
              />
              <div>
                <p className="font-medium">{orderDetails.customer.name}</p>
                <p className="text-sm text-gray-400">{orderDetails.customer.email}</p>
                <p className="text-sm text-gray-400">{orderDetails.customer.phone}</p>
              </div>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-400">Shipping Address</p>
              <p className="text-sm text-gray-300">{orderDetails.customer.address}</p>
            </div>
          </div>

          {/* Order Status */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium border-b border-gray-700 pb-2">Order Status</h3>
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Status</span>
                <div className={`px-3 py-1 rounded-full ${getStatusColor(orderDetails.status)}`}>
                  {orderDetails.status}
                </div>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Payment Status</span>
                <span className={`font-medium ${getPaymentStatusColor(orderDetails.paymentStatus)}`}>
                  {orderDetails.paymentStatus}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-400">Delivery Method</span>
                <span className="text-gray-300">{orderDetails.deliveryMethod}</span>
              </div>
              {orderDetails.trackingNumber && (
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">Tracking Number</span>
                  <span className="text-blue-400">{orderDetails.trackingNumber}</span>
                </div>
              )}
            </div>
          </div>

          {/* Order Items */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4 lg:col-span-2">
            <h3 className="font-medium border-b border-gray-700 pb-2">Order Items</h3>
            <div className="space-y-4">
              {orderDetails.products.map((product, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={48}
                      height={48}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">Quantity: {product.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${product.price.toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${orderDetails.total.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-700">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  )
} 