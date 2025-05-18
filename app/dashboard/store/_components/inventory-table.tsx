"use client"

import { useState } from "react"
import { Edit, Trash, CheckCircle, AlertTriangle, XCircle } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"

interface InventoryTableProps {
  searchQuery: string;
}

export const InventoryTable = ({ searchQuery }: InventoryTableProps) => {
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  // Mock inventory data
  const inventory = [
    {
      id: "1",
      name: "Wireless Headphones",
      sku: "WH-001",
      inStock: 45,
      reorderPoint: 20,
      lastUpdated: "2024-02-20",
      status: "in_stock" as const
    },
    {
      id: "2",
      name: "Smart Watch",
      sku: "SW-002",
      inStock: 12,
      reorderPoint: 15,
      lastUpdated: "2024-02-19",
      status: "low_stock" as const
    },
    {
      id: "3",
      name: "Bluetooth Speaker",
      sku: "BS-003",
      inStock: 0,
      reorderPoint: 10,
      lastUpdated: "2024-02-18",
      status: "out_of_stock" as const
    },
  ]

  const columns = [
    {
      id: "product",
      header: "Product",
      cell: (row: any) => (
        <div>
          <p className="font-medium text-white">{row.name}</p>
          <p className="text-sm text-gray-400">SKU: {row.sku}</p>
        </div>
      )
    },
    {
      id: "stock",
      header: "Stock Level",
      cell: (row: any) => (
        <div className="flex items-center gap-2">
          {row.status === "in_stock" && <CheckCircle className="h-4 w-4 text-green-400" />}
          {row.status === "low_stock" && <AlertTriangle className="h-4 w-4 text-orange-400" />}
          {row.status === "out_of_stock" && <XCircle className="h-4 w-4 text-red-400" />}
          <span className={`
            ${row.status === "in_stock" ? "text-green-400" : ""}
            ${row.status === "low_stock" ? "text-orange-400" : ""}
            ${row.status === "out_of_stock" ? "text-red-400" : ""}
          `}>
            {row.inStock} units
          </span>
        </div>
      )
    },
    {
      id: "reorderPoint",
      header: "Reorder Point",
      cell: (row: any) => (
        <span className="text-gray-300">{row.reorderPoint} units</span>
      )
    },
    {
      id: "lastUpdated",
      header: "Last Updated",
      cell: (row: any) => (
        <span className="text-gray-300">
          {new Date(row.lastUpdated).toLocaleDateString()}
        </span>
      )
    },
    {
      id: "actions",
      header: "",
      cell: (row: any) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => handleEdit(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const handleEdit = (id: string) => {
    console.log("Edit item:", id)
  }

  const handleDelete = (id: string) => {
    console.log("Delete item:", id)
  }

  const filteredInventory = inventory.filter(item => {
    if (!searchQuery) return true
    return (
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sku.toLowerCase().includes(searchQuery.toLowerCase())
    )
  })

  return (
    <DataTable
      columns={columns}
      data={filteredInventory}
      pageSize={10}
      selectable
      selectedRows={selectedItems}
      onSelectRows={setSelectedItems}
    />
  )
} 