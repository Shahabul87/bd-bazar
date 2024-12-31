"use client"

import { useState } from "react"
import { X, FileText, Table, Download, Calendar } from "lucide-react"

interface ExportOptionsModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (format: string, options: ExportOptions) => void
}

interface ExportOptions {
  dateRange: string
  status: string[]
  includeFields: string[]
  format: "csv" | "excel" | "pdf"
}

const exportFields = [
  { id: "order_id", label: "Order ID" },
  { id: "product_details", label: "Product Details" },
  { id: "customer_info", label: "Customer Information" },
  { id: "delivery_status", label: "Delivery Status" },
  { id: "tracking_number", label: "Tracking Number" },
  { id: "delivery_service", label: "Delivery Service" },
  { id: "shipping_address", label: "Shipping Address" },
  { id: "delivery_date", label: "Delivery Date" },
  { id: "payment_status", label: "Payment Status" },
  { id: "total_amount", label: "Total Amount" }
]

const statusOptions = [
  { id: "not_paid", label: "Not Yet Paid" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
  { id: "returned", label: "Returned" }
]

export const ExportOptionsModal = ({
  isOpen,
  onClose,
  onExport
}: ExportOptionsModalProps) => {
  const [options, setOptions] = useState<ExportOptions>({
    dateRange: "all",
    status: statusOptions.map(status => status.id),
    includeFields: exportFields.map(field => field.id),
    format: "csv"
  })

  if (!isOpen) return null

  const handleExport = () => {
    onExport(options.format, options)
    onClose()
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Export Deliveries</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          {/* Date Range */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Date Range</label>
            <select
              value={options.dateRange}
              onChange={(e) => setOptions(prev => ({ ...prev, dateRange: e.target.value }))}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
            >
              <option value="all">All Time</option>
              <option value="today">Today</option>
              <option value="week">This Week</option>
              <option value="month">This Month</option>
              <option value="year">This Year</option>
              <option value="custom">Custom Range</option>
            </select>
          </div>

          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Status</label>
            <div className="space-y-2">
              {statusOptions.map((status) => (
                <label key={status.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.status.includes(status.id)}
                    onChange={(e) => {
                      setOptions(prev => ({
                        ...prev,
                        status: e.target.checked
                          ? [...prev.status, status.id]
                          : prev.status.filter(s => s !== status.id)
                      }))
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{status.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Fields to Export */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Fields to Export</label>
            <div className="max-h-48 overflow-y-auto space-y-2">
              {exportFields.map((field) => (
                <label key={field.id} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={options.includeFields.includes(field.id)}
                    onChange={(e) => {
                      setOptions(prev => ({
                        ...prev,
                        includeFields: e.target.checked
                          ? [...prev.includeFields, field.id]
                          : prev.includeFields.filter(f => f !== field.id)
                      }))
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{field.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Export Format */}
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setOptions(prev => ({ ...prev, format: "csv" }))}
                className={`p-3 border border-gray-600 rounded-lg flex flex-col items-center gap-1 ${
                  options.format === "csv" ? "bg-blue-600 border-blue-500" : "hover:bg-gray-700"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm">CSV</span>
              </button>
              <button
                onClick={() => setOptions(prev => ({ ...prev, format: "excel" }))}
                className={`p-3 border border-gray-600 rounded-lg flex flex-col items-center gap-1 ${
                  options.format === "excel" ? "bg-blue-600 border-blue-500" : "hover:bg-gray-700"
                }`}
              >
                <Table className="h-5 w-5" />
                <span className="text-sm">Excel</span>
              </button>
              <button
                onClick={() => setOptions(prev => ({ ...prev, format: "pdf" }))}
                className={`p-3 border border-gray-600 rounded-lg flex flex-col items-center gap-1 ${
                  options.format === "pdf" ? "bg-blue-600 border-blue-500" : "hover:bg-gray-700"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm">PDF</span>
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-6 pt-6 border-t border-gray-700 space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  )
} 