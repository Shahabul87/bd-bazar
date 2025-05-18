"use client"

import { useState } from "react"
import { X, Mail, Phone, MapPin, Calendar, Package, DollarSign, Ban, Send, History } from "lucide-react"
import Image from "next/image"
import { Line } from "react-chartjs-2"
import type { ChartData, ChartOptions } from 'chart.js'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js'

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
)

interface CustomerProfileModalProps {
  customerId: string | null
  isOpen: boolean
  onClose: () => void
}

interface Order {
  id: string
  date: string
  total: number
  status: "completed" | "pending" | "cancelled"
  items: number
}

export const CustomerProfileModal = ({
  customerId,
  isOpen,
  onClose
}: CustomerProfileModalProps) => {
  const [activeTab, setActiveTab] = useState<"overview" | "orders" | "activity">("overview")

  if (!isOpen) return null

  // Mock customer data
  const customer = {
    id: customerId,
    name: "John Doe",
    email: "john@example.com",
    phone: "+1 234 567 890",
    avatar: "https://picsum.photos/seed/1/100/100",
    address: "123 Main St, New York, NY 10001",
    joinDate: "2023-08-15",
    totalOrders: 15,
    totalSpend: 1250.00,
    lastOrder: "2024-03-15",
    status: "active" as const,
    tags: ["VIP", "Regular Customer", "Early Adopter"]
  }

  // Mock orders data
  const orders: Order[] = [
    {
      id: "ORD-001",
      date: "2024-03-15",
      total: 150.00,
      status: "completed",
      items: 3
    },
    {
      id: "ORD-002",
      date: "2024-02-28",
      total: 85.50,
      status: "completed",
      items: 2
    },
    {
      id: "ORD-003",
      date: "2024-02-15",
      total: 220.00,
      status: "cancelled",
      items: 4
    }
  ]

  // Spending trend chart data
  const spendingData: ChartData<"line"> = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Monthly Spend',
        data: [120, 150, 180, 145, 190, 220],
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        fill: true,
        tension: 0.4
      }
    ]
  }

  const chartOptions: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      tooltip: {
        backgroundColor: 'rgb(17, 24, 39)',
        titleColor: '#e5e7eb',
        bodyColor: '#e5e7eb',
        padding: 12,
        callbacks: {
          label: (context) => `$${context.raw as number}`
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(75, 85, 99, 0.2)'
        },
        ticks: {
          color: '#e5e7eb',
          callback: (value) => `$${value}`
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          color: '#e5e7eb'
        }
      }
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="p-6 border-b border-gray-700 flex justify-between items-start">
          <div className="flex items-center gap-4">
            <Image
              src={customer.avatar}
              alt={customer.name}
              width={64}
              height={64}
              className="rounded-full"
            />
            <div>
              <h2 className="text-xl font-bold text-white">{customer.name}</h2>
              <p className="text-gray-400">Customer since {new Date(customer.joinDate).toLocaleDateString()}</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-700">
          <div className="flex">
            {["overview", "orders", "activity"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as typeof activeTab)}
                className={`px-6 py-3 text-sm font-medium ${
                  activeTab === tab
                    ? "text-blue-400 border-b-2 border-blue-400"
                    : "text-gray-400 hover:text-gray-300"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === "overview" && (
            <div className="space-y-6">
              {/* Contact Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Contact Information</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-gray-300">
                      <Mail className="h-4 w-4" />
                      <span>{customer.email}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <Phone className="h-4 w-4" />
                      <span>{customer.phone}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-300">
                      <MapPin className="h-4 w-4" />
                      <span>{customer.address}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium text-white">Customer Stats</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-400">Total Orders</p>
                      <p className="text-xl font-bold text-white">{customer.totalOrders}</p>
                    </div>
                    <div className="bg-gray-700 p-4 rounded-lg">
                      <p className="text-sm text-gray-400">Total Spend</p>
                      <p className="text-xl font-bold text-white">${customer.totalSpend}</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Spending Trends */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Spending Trends</h3>
                <div className="h-[300px]">
                  <Line data={spendingData} options={chartOptions} />
                </div>
              </div>

              {/* Quick Actions */}
              <div>
                <h3 className="text-lg font-medium text-white mb-4">Quick Actions</h3>
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                    <Send className="h-4 w-4" />
                    Send Email
                  </button>
                  <button className="flex items-center gap-2 px-4 py-2 border border-gray-600 text-gray-300 rounded-lg hover:bg-gray-700">
                    <Ban className="h-4 w-4" />
                    Deactivate Account
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === "orders" && (
            <div className="space-y-4">
              {orders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-700 p-4 rounded-lg flex items-center justify-between"
                >
                  <div className="flex items-center gap-4">
                    <Package className="h-5 w-5 text-gray-400" />
                    <div>
                      <p className="font-medium text-white">{order.id}</p>
                      <p className="text-sm text-gray-400">{new Date(order.date).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-medium text-white">${order.total}</p>
                    <p className={`text-sm ${
                      order.status === 'completed' ? 'text-green-400' :
                      order.status === 'cancelled' ? 'text-red-400' :
                      'text-yellow-400'
                    }`}>
                      {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeTab === "activity" && (
            <div className="space-y-4">
              <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                <History className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-white">Placed order #ORD-001</p>
                  <p className="text-sm text-gray-400">2 hours ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                <History className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-white">Updated shipping address</p>
                  <p className="text-sm text-gray-400">1 day ago</p>
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-gray-700 rounded-lg">
                <History className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-white">Added items to cart</p>
                  <p className="text-sm text-gray-400">2 days ago</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
} 