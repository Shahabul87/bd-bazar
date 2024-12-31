"use client"

import { useState } from "react"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import { Eye, Edit, Trash, MoreVertical, TrendingUp, TrendingDown } from "lucide-react"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface Promotion {
  id: string
  name: string
  type: string
  startDate: string
  endDate: string
  discount: number
  status: "active" | "scheduled" | "expired"
  usageCount: number
  revenue: number
  growth: number
}

interface PromotionsDataTableProps {
  searchQuery: string
  filters: any
  selectedPromotions: string[]
  onSelectPromotions: (ids: string[]) => void
  onEdit: (promotion: Promotion) => void
}

export const PromotionsDataTable = ({
  searchQuery,
  filters,
  selectedPromotions,
  onSelectPromotions,
  onEdit
}: PromotionsDataTableProps) => {
  // Mock data
  const promotions: Promotion[] = [
    {
      id: "1",
      name: "Summer Sale",
      type: "Percentage Discount",
      startDate: "2024-06-01",
      endDate: "2024-06-30",
      discount: 20,
      status: "scheduled",
      usageCount: 0,
      revenue: 0,
      growth: 0
    },
    {
      id: "2",
      name: "Spring Collection",
      type: "Fixed Amount",
      startDate: "2024-03-01",
      endDate: "2024-03-31",
      discount: 50,
      status: "active",
      usageCount: 156,
      revenue: 7800,
      growth: 12.5
    }
  ]

  const columns: Column<Promotion>[] = [
    {
      id: "name",
      header: "Promotion",
      cell: (row) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-sm text-gray-400">{row.type}</p>
        </div>
      )
    },
    {
      id: "date",
      header: "Date Range",
      cell: (row) => (
        <div>
          <p className="text-sm">
            {new Date(row.startDate).toLocaleDateString()} - {new Date(row.endDate).toLocaleDateString()}
          </p>
        </div>
      )
    },
    {
      id: "discount",
      header: "Discount",
      cell: (row) => (
        <div className="font-medium">
          {row.type === "Percentage Discount" ? `${row.discount}%` : `$${row.discount}`}
        </div>
      )
    },
    {
      id: "usage",
      header: "Usage",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.usageCount}</p>
          <p className="text-sm text-gray-400">
            ${row.revenue.toLocaleString()}
          </p>
        </div>
      )
    },
    {
      id: "performance",
      header: "Performance",
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
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'active'
            ? 'bg-green-100 text-green-800'
            : row.status === 'scheduled'
            ? 'bg-blue-100 text-blue-800'
            : 'bg-gray-100 text-gray-800'
        }`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onEdit(row)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement view details */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement delete */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors text-red-400"
          >
            <Trash className="h-4 w-4" />
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

  const filteredData = promotions.filter(promotion => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      return (
        promotion.name.toLowerCase().includes(search) ||
        promotion.type.toLowerCase().includes(search)
      )
    }
    return true
  })

  return (
    <DataTable
      columns={columns}
      data={filteredData}
      pageSize={10}
      selectable
      selectedRows={selectedPromotions}
      onSelectRows={onSelectPromotions}
    />
  )
} 