"use client"

import { useState } from "react"
import { DataTable } from "@/app/dashboard/_components/data-table"
import { TrendingUp, TrendingDown, DollarSign, Users, Target } from "lucide-react"
import type { Column } from "@/app/dashboard/_components/data-table"

interface MarketingEffectivenessProps {
  dateRange: {
    from: string
    to: string
  }
}

interface Campaign {
  id: string
  name: string
  type: string
  spend: number
  revenue: number
  roi: number
  conversions: number
  status: "active" | "completed" | "paused"
  growth: number
}

export const MarketingEffectiveness = ({ dateRange }: MarketingEffectivenessProps) => {
  // Mock data
  const campaigns: Campaign[] = [
    {
      id: "1",
      name: "Summer Sale Campaign",
      type: "Seasonal Promotion",
      spend: 5000,
      revenue: 15000,
      roi: 200,
      conversions: 150,
      status: "active",
      growth: 15.2
    },
    {
      id: "2",
      name: "New Product Launch",
      type: "Product Campaign",
      spend: 3000,
      revenue: 8000,
      roi: 166.67,
      conversions: 80,
      status: "completed",
      growth: -5.8
    }
  ]

  const columns: Column<Campaign>[] = [
    {
      id: "campaign",
      header: "Campaign",
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-sm text-gray-400">{row.type}</p>
        </div>
      )
    },
    {
      id: "spend",
      header: "Spend",
      cell: (row) => (
        <div>
          <p className="font-medium">${row.spend.toLocaleString()}</p>
        </div>
      )
    },
    {
      id: "revenue",
      header: "Revenue",
      cell: (row) => (
        <div>
          <p className="font-medium">${row.revenue.toLocaleString()}</p>
          <div className={`flex items-center gap-1 text-sm ${
            row.growth >= 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {row.growth >= 0 ? (
              <TrendingUp className="h-4 w-4" />
            ) : (
              <TrendingDown className="h-4 w-4" />
            )}
            <span>{Math.abs(row.growth)}%</span>
          </div>
        </div>
      )
    },
    {
      id: "roi",
      header: "ROI",
      cell: (row) => (
        <div className="font-medium">
          {row.roi}%
        </div>
      )
    },
    {
      id: "conversions",
      header: "Conversions",
      cell: (row) => (
        <div className="font-medium">
          {row.conversions}
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : row.status === 'completed'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-yellow-100 text-yellow-800'
        }`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </div>
      )
    }
  ]

  return (
    <div className="bg-gray-900 p-6 rounded-xl border border-gray-700">
      <div className="flex justify-between items-start mb-6">
        <div>
          <h2 className="text-lg font-medium text-white">Marketing Effectiveness</h2>
          <p className="text-sm text-gray-400">Campaign performance metrics</p>
        </div>
        <div className="text-right">
          <p className="text-lg font-medium text-white">183%</p>
          <p className="text-sm text-green-400">Average ROI</p>
        </div>
      </div>

      {/* Campaign Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-900/50 rounded-lg">
              <DollarSign className="h-5 w-5 text-blue-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Spend</p>
              <p className="text-lg font-medium">$8,000</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-900/50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-green-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Total Revenue</p>
              <p className="text-lg font-medium">$23,000</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-900/50 rounded-lg">
              <Users className="h-5 w-5 text-purple-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Conversions</p>
              <p className="text-lg font-medium">230</p>
            </div>
          </div>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-yellow-900/50 rounded-lg">
              <Target className="h-5 w-5 text-yellow-400" />
            </div>
            <div>
              <p className="text-sm text-gray-400">Active Campaigns</p>
              <p className="text-lg font-medium">3</p>
            </div>
          </div>
        </div>
      </div>

      {/* Campaigns Table */}
      <DataTable
        columns={columns}
        data={campaigns}
        pageSize={5}
      />
    </div>
  )
} 