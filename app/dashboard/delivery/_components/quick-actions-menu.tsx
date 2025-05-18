"use client"

import { useState, useRef, useEffect } from "react"
import { 
  MoreVertical, 
  Eye, 
  Printer, 
  FileText, 
  AlertTriangle,
  CheckCircle,
  XCircle
} from "lucide-react"

interface QuickActionsMenuProps {
  onView: () => void
  onPrint: () => void
  onMarkDelivered: () => void
  onCancel: () => void
  onReport: () => void
  status: string
}

export const QuickActionsMenu = ({
  onView,
  onPrint,
  onMarkDelivered,
  onCancel,
  onReport,
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
            Print Label
          </button>

          {status !== "delivered" && (
            <button
              onClick={() => {
                onMarkDelivered()
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-green-400"
            >
              <CheckCircle className="h-4 w-4" />
              Mark as Delivered
            </button>
          )}

          {status !== "cancelled" && (
            <button
              onClick={() => {
                onCancel()
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-red-400"
            >
              <XCircle className="h-4 w-4" />
              Cancel Delivery
            </button>
          )}

          <div className="border-t border-gray-700 my-1" />

          <button
            onClick={() => {
              onReport()
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