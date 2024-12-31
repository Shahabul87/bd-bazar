"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { OrderStatusTable } from "../_components/order-status-table"
import { OrderAnalytics } from "../_components/order-analytics"
import { OrderAlerts } from "../_components/order-alerts"

export default function TodayOrdersPage() {
  const router = useRouter()
  const [dateRange, setDateRange] = useState("today")

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-700 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Today's Orders</h1>
          <p className="text-gray-400">Overview of orders received today</p>
        </div>
      </div>

      <OrderAnalytics dateRange={dateRange} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <OrderStatusTable
            status="today"
            title="Today's Orders"
            description="View and manage today's orders"
          />
        </div>
        <div>
          <OrderAlerts />
        </div>
      </div>
    </div>
  )
} 