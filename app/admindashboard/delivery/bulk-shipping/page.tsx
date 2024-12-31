"use client"

import { Upload } from "lucide-react"

export default function BulkShippingPage() {
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Bulk Shipping</h1>
      
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-lg p-12">
          <Upload className="h-12 w-12 text-gray-400 mb-4" />
          <p className="text-lg font-medium text-gray-600 mb-2">
            Drag and drop your shipping file
          </p>
          <p className="text-sm text-gray-500 mb-4">
            Supported formats: CSV, Excel
          </p>
          <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
            Select File
          </button>
        </div>
      </div>
    </div>
  )
} 