"use client"

import { useState } from "react"
import { MapPin, TrendingUp, TrendingDown } from "lucide-react"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface RegionalSalesProps {
  dateRange: {
    from: string
    to: string
  }
}

interface RegionalData {
  id: string
  region: string
  sales: number
  orders: number
  customers: number
  growth: number
}

export const RegionalSales = ({ dateRange }: RegionalSalesProps) => {
  // Mock data
  const regionalData: RegionalData[] = [
    {
      id: "1",
      region: "North America",
      sales: 125000,
      orders: 1250,
      customers: 850,
      growth: 12.5
    },
    {
      id: "2",
      region: "Europe",
      sales: 95000,
      orders: 980,
      customers: 720,
      growth: 8.3
    },
    {
      id: "3",
      region: "Asia Pacific",
      sales: 85000,
      orders: 850,
      customers: 650,
      growth: 15.2
    }
  ]

  const columns: Column<RegionalData>[] = [
    {
      id: "region",
      header: "Region",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <MapPin className="h-4 w-4 text-blue-400" />
          <span>{row.region}</span>
        </div>
      )
    },
    {
      id: "sales",
      header: "Sales",
      cell: (row) => (
        <span className="font-medium">
          ${row.sales.toLocaleString()}
        </span>
      )
    },
    {
      id: "orders",
      header: "Orders",
      cell: (row) => row.orders.toLocaleString()
    },
    {
      id: "customers",
      header: "Customers",
      cell: (row) => row.customers.toLocaleString()
    },
    {
      id: "growth",
      header: "Growth",
      cell: (row) => (
        <div className={`flex items-center gap-1 ${
          row.growth >= 0 ? 'text-green-400' : 'text-red-400'
        }`}>
          {row.growth >= 0 ? (
            <TrendingUp className="h-4 w-4" />
          ) : (
            <TrendingDown className="h-4 w-4" />
          )}
          <span>{Math.abs(row.growth)}%</span>
        </div>
      )
    }
  ]

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Regional Sales</h2>
          <p className="text-sm text-gray-400">Performance by geographic region</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">
            ${regionalData.reduce((acc, curr) => acc + curr.sales, 0).toLocaleString()}
          </p>
          <p className="text-sm text-green-400">+10.5% vs last period</p>
        </div>
      </div>

      <DataTable
        columns={columns}
        data={regionalData}
        pageSize={5}
      />
    </div>
  )
} 