"use client"

import { useState } from "react"
import { X, Download, FileText, Table } from "lucide-react"

interface ExportCustomersModalProps {
  isOpen: boolean
  onClose: () => void
  onExport: (format: string) => void
}

interface ExportField {
  id: string
  label: string
  category: string
}

export const ExportCustomersModal = ({
  isOpen,
  onClose,
  onExport
}: ExportCustomersModalProps) => {
  const [format, setFormat] = useState<"csv" | "excel" | "pdf">("csv")
  const [selectedFields, setSelectedFields] = useState<string[]>([
    "name",
    "email",
    "phone",
    "totalOrders",
    "totalSpend"
  ])

  if (!isOpen) return null

  const exportFields: ExportField[] = [
    // Basic Information
    { id: "name", label: "Full Name", category: "Basic Information" },
    { id: "email", label: "Email Address", category: "Basic Information" },
    { id: "phone", label: "Phone Number", category: "Basic Information" },
    { id: "address", label: "Address", category: "Basic Information" },
    { id: "joinDate", label: "Join Date", category: "Basic Information" },
    
    // Order Information
    { id: "totalOrders", label: "Total Orders", category: "Order Information" },
    { id: "totalSpend", label: "Total Spend", category: "Order Information" },
    { id: "avgOrderValue", label: "Average Order Value", category: "Order Information" },
    { id: "lastOrderDate", label: "Last Order Date", category: "Order Information" },
    
    // Customer Metrics
    { id: "customerStatus", label: "Customer Status", category: "Customer Metrics" },
    { id: "lifetimeValue", label: "Lifetime Value", category: "Customer Metrics" },
    { id: "purchaseFrequency", label: "Purchase Frequency", category: "Customer Metrics" },
    { id: "tags", label: "Customer Tags", category: "Customer Metrics" }
  ]

  const categories = Array.from(new Set(exportFields.map(field => field.category)))

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId)
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    )
  }

  const handleSelectCategory = (category: string, select: boolean) => {
    const categoryFields = exportFields
      .filter(field => field.category === category)
      .map(field => field.id)
    
    setSelectedFields(prev => {
      if (select) {
        return Array.from(new Set([...prev, ...categoryFields]))
      } else {
        return prev.filter(id => !categoryFields.includes(id))
      }
    })
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl w-full max-w-2xl">
        <div className="p-6 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-medium text-white">Export Customers</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Export Format */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Export Format</h3>
            <div className="grid grid-cols-3 gap-4">
              <button
                onClick={() => setFormat("csv")}
                className={`p-3 border rounded-lg flex flex-col items-center gap-1 ${
                  format === "csv"
                    ? "bg-blue-600 border-blue-500"
                    : "border-gray-600 hover:bg-gray-700"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm">CSV</span>
              </button>
              <button
                onClick={() => setFormat("excel")}
                className={`p-3 border rounded-lg flex flex-col items-center gap-1 ${
                  format === "excel"
                    ? "bg-blue-600 border-blue-500"
                    : "border-gray-600 hover:bg-gray-700"
                }`}
              >
                <Table className="h-5 w-5" />
                <span className="text-sm">Excel</span>
              </button>
              <button
                onClick={() => setFormat("pdf")}
                className={`p-3 border rounded-lg flex flex-col items-center gap-1 ${
                  format === "pdf"
                    ? "bg-blue-600 border-blue-500"
                    : "border-gray-600 hover:bg-gray-700"
                }`}
              >
                <FileText className="h-5 w-5" />
                <span className="text-sm">PDF</span>
              </button>
            </div>
          </div>

          {/* Field Selection */}
          <div>
            <h3 className="text-sm font-medium text-gray-300 mb-3">Select Fields to Export</h3>
            <div className="space-y-4">
              {categories.map(category => {
                const categoryFields = exportFields.filter(field => field.category === category)
                const allSelected = categoryFields.every(field => selectedFields.includes(field.id))
                const someSelected = categoryFields.some(field => selectedFields.includes(field.id))

                return (
                  <div key={category} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <h4 className="text-sm font-medium text-gray-400">{category}</h4>
                      <button
                        onClick={() => handleSelectCategory(category, !allSelected)}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        {allSelected ? "Deselect All" : "Select All"}
                      </button>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      {categoryFields.map(field => (
                        <label
                          key={field.id}
                          className="flex items-center gap-2 text-sm text-gray-300 hover:bg-gray-700 p-2 rounded-lg cursor-pointer"
                        >
                          <input
                            type="checkbox"
                            checked={selectedFields.includes(field.id)}
                            onChange={() => handleFieldToggle(field.id)}
                            className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                          />
                          {field.label}
                        </label>
                      ))}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-gray-700 flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-300 hover:bg-gray-700 rounded-lg"
          >
            Cancel
          </button>
          <button
            onClick={() => onExport(format)}
            disabled={selectedFields.length === 0}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>
    </div>
  )
} 