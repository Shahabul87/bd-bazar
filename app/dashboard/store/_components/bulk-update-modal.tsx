"use client"

import { useState } from "react"
import { X, Upload, Download, AlertTriangle } from "lucide-react"

interface BulkUpdateModalProps {
  isOpen: boolean
  onClose: () => void
  onUpload: (data: File) => void
}

export const BulkUpdateModal = ({
  isOpen,
  onClose,
  onUpload
}: BulkUpdateModalProps) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [dragActive, setDragActive] = useState(false)

  if (!isOpen) return null

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setSelectedFile(e.dataTransfer.files[0])
    }
  }

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0])
    }
  }

  const handleSubmit = () => {
    if (selectedFile) {
      onUpload(selectedFile)
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-white">Bulk Update Inventory</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center mb-6 ${
            dragActive ? "border-blue-500 bg-blue-500/10" : "border-gray-600"
          }`}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <input
            type="file"
            onChange={handleFileSelect}
            accept=".csv,.xlsx"
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-8 w-8 text-gray-400 mb-2" />
            {selectedFile ? (
              <div>
                <p className="text-sm text-gray-300 mb-1">Selected file:</p>
                <p className="text-sm font-medium text-white">{selectedFile.name}</p>
              </div>
            ) : (
              <>
                <p className="text-sm text-gray-300 mb-1">
                  Drag and drop your file here, or click to select
                </p>
                <p className="text-xs text-gray-400">
                  Supported formats: CSV, Excel
                </p>
              </>
            )}
          </label>
        </div>

        <div className="bg-yellow-900/50 border border-yellow-800 rounded-lg p-4 mb-6">
          <div className="flex items-start gap-2 text-yellow-400">
            <AlertTriangle className="h-5 w-5 mt-0.5" />
            <div>
              <p className="font-medium">Important Notes:</p>
              <ul className="text-sm text-yellow-300 list-disc list-inside mt-1">
                <li>Make sure your file follows the required format</li>
                <li>All SKUs must match existing products</li>
                <li>Stock levels must be non-negative numbers</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="flex justify-between items-center">
          <button
            onClick={() => {
              // Download template logic
            }}
            className="text-sm text-blue-400 hover:text-blue-300 flex items-center gap-1"
          >
            <Download className="h-4 w-4" />
            Download Template
          </button>
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!selectedFile}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Upload & Update
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 