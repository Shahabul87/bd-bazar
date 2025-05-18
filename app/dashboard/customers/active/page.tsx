"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { CustomerTable } from "../../transactions/_components/customer-table"
import { CustomerMetrics } from "../../analytics/_components/customer-metrics"

export default function ActiveCustomersPage() {
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
          <h1 className="text-2xl font-bold">Active Customers</h1>
          <p className="text-gray-400">Monitor your active customer base</p>
        </div>
      </div>

      <CustomerMetrics dateRange={dateRange} />
      <CustomerTable />
    </div>
  )
} 