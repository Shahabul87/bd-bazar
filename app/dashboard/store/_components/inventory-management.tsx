"use client"

import { useState } from "react"
import { DataTable } from "../../_components/data-table"
import { AlertTriangle, Download, Upload, Package, ArrowUp, ArrowDown } from "lucide-react"
import { BulkUpdateModal } from "./bulk-update-modal"

interface InventoryItem {
  id: string
  name: string
  sku: string
  stockLevel: number
  reorderThreshold: number
  lastUpdated: string
  status: "in_stock" | "low_stock" | "out_of_stock"
}

const mockInventory: InventoryItem[] = [
  {
    id: "INV-001",
    name: "Wireless Headphones",
    sku: "WH-001",
    stockLevel: 45,
    reorderThreshold: 20,
    lastUpdated: "2024-03-21",
    status: "in_stock"
  },
  {
    id: "INV-002",
    name: "Smart Watch",
    sku: "SW-001",
    stockLevel: 8,
    reorderThreshold: 15,
    lastUpdated: "2024-03-21",
    status: "low_stock"
  },
  {
    id: "INV-003",
    name: "Bluetooth Speaker",
    sku: "BS-001",
    stockLevel: 0,
    reorderThreshold: 10,
    lastUpdated: "2024-03-20",
    status: "out_of_stock"
  }
]

export const InventoryManagement = () => {
  const [isBulkUpdateModalOpen, setIsBulkUpdateModalOpen] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])

  const getStockStatus = (item: InventoryItem) => {
    if (item.stockLevel === 0) return "out_of_stock"
    if (item.stockLevel <= item.reorderThreshold) return "low_stock"
    return "in_stock"
  }

  const columns = [
    {
      header: "Product",
      accessorKey: "name",
      cell: ({ row }: { row: { original: InventoryItem } }) => (
        <div>
          <p className="font-medium text-white">{row.original.name}</p>
          <p className="text-sm text-gray-400">SKU: {row.original.sku}</p>
        </div>
      )
    },
    {
      header: "Stock Level",
      accessorKey: "stockLevel",
      cell: ({ row }: { row: { original: InventoryItem } }) => {
        const status = getStockStatus(row.original)
        return (
          <div className="flex items-center gap-2">
            <span className={`px-2 py-1 rounded-full text-sm ${
              status === "in_stock" 
                ? "bg-green-900/50 text-green-400"
                : status === "low_stock"
                ? "bg-yellow-900/50 text-yellow-400"
                : "bg-red-900/50 text-red-400"
            }`}>
              {row.original.stockLevel}
            </span>
          </div>
        )
      }
    },
    {
      header: "Reorder Threshold",
      accessorKey: "reorderThreshold"
    },
    {
      header: "Last Updated",
      accessorKey: "lastUpdated"
    },
    {
      header: "Status",
      accessorKey: "status",
      cell: ({ row }: { row: { original: InventoryItem } }) => {
        const status = getStockStatus(row.original)
        return (
          <span className={`px-2 py-1 rounded-full text-sm ${
            status === "in_stock" 
              ? "bg-green-900/50 text-green-400"
              : status === "low_stock"
              ? "bg-yellow-900/50 text-yellow-400"
              : "bg-red-900/50 text-red-400"
          }`}>
            {status.replace("_", " ").toUpperCase()}
          </span>
        )
      }
    }
  ]

  const lowStockItems = mockInventory.filter(
    item => item.stockLevel <= item.reorderThreshold
  )

  return (
    <div className="space-y-6">
      {/* Reorder Alerts */}
      {lowStockItems.length > 0 && (
        <div className="bg-yellow-900/50 border border-yellow-800 rounded-lg p-4">
          <div className="flex items-center gap-2 text-yellow-400 mb-2">
            <AlertTriangle className="h-5 w-5" />
            <h3 className="font-medium">Reorder Alerts</h3>
          </div>
          <div className="space-y-2">
            {lowStockItems.map(item => (
              <div key={item.id} className="flex items-center justify-between text-sm">
                <span className="text-yellow-300">{item.name} (SKU: {item.sku})</span>
                <span className="text-yellow-400">Stock Level: {item.stockLevel}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Actions */}
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-medium text-white">Inventory Overview</h2>
        <div className="flex gap-3">
          <button
            onClick={() => setIsBulkUpdateModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Upload className="h-4 w-4" />
            Bulk Update
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Inventory Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <DataTable
          columns={columns}
          data={mockInventory}
          pageSize={10}
          sortable
          selectable
          selectedRows={selectedItems}
          onSelectRows={setSelectedItems}
        />
      </div>

      <BulkUpdateModal
        isOpen={isBulkUpdateModalOpen}
        onClose={() => setIsBulkUpdateModalOpen(false)}
        onUpload={(data) => {
          console.log("Uploading inventory data:", data)
          setIsBulkUpdateModalOpen(false)
        }}
      />
    </div>
  )
} 