"use client"

import { useState, useRef, useEffect } from "react"
import { 
  MoreVertical, 
  Eye, 
  Printer, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  XCircle,
  RefreshCw,
  Edit
} from "lucide-react"

interface QuickActionsMenuProps {
  onView: () => void
  onPrint: () => void
  onUpdateStatus: (status: string) => void
  onCancel: () => void
  status: string
}

export const QuickActionsMenu = ({
  onView,
  onPrint,
  onUpdateStatus,
  onCancel,
  status
}: QuickActionsMenuProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 hover:bg-gray-700 rounded-full text-gray-400"
      >
        <MoreVertical className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-10">
          <button
            onClick={() => {
              onView()
              setIsOpen(false)
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-gray-300"
          >
            <Eye className="h-4 w-4" />
            View Details
          </button>

          <button
            onClick={() => {
              onPrint()
              setIsOpen(false)
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-gray-300"
          >
            <Printer className="h-4 w-4" />
            Print Invoice
          </button>

          <div className="border-t border-gray-700 my-1" />

          {/* Status Update Options */}
          {status !== "processing" && (
            <button
              onClick={() => {
                onUpdateStatus("processing")
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-blue-400"
            >
              <RefreshCw className="h-4 w-4" />
              Mark Processing
            </button>
          )}

          {status !== "shipped" && (
            <button
              onClick={() => {
                onUpdateStatus("shipped")
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-purple-400"
            >
              <FileText className="h-4 w-4" />
              Mark Shipped
            </button>
          )}

          {status !== "delivered" && (
            <button
              onClick={() => {
                onUpdateStatus("delivered")
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-green-400"
            >
              <CheckCircle className="h-4 w-4" />
              Mark Delivered
            </button>
          )}

          <div className="border-t border-gray-700 my-1" />

          {status !== "cancelled" && (
            <button
              onClick={() => {
                onCancel()
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-red-400"
            >
              <XCircle className="h-4 w-4" />
              Cancel Order
            </button>
          )}

          <button
            onClick={() => {
              onView()
              setIsOpen(false)
            }}
            className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-yellow-400"
          >
            <AlertTriangle className="h-4 w-4" />
            Report Issue
          </button>
        </div>
      )}
    </div>
  )
} 