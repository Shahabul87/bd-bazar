"use client"

import { Trash2, Archive, Star, CheckCircle, XCircle } from "lucide-react"

interface BulkActionsToolbarProps {
  selectedCount: number
  onAction: (action: string) => void
}

export const BulkActionsToolbar = ({
  selectedCount,
  onAction
}: BulkActionsToolbarProps) => {
  return (
    <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 flex items-center justify-between">
      <div className="text-gray-300">
        <span className="font-medium">{selectedCount}</span> products selected
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={() => onAction("activate")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 text-green-400"
        >
          <CheckCircle className="h-4 w-4" />
          Activate
        </button>

        <button
          onClick={() => onAction("deactivate")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 text-red-400"
        >
          <XCircle className="h-4 w-4" />
          Deactivate
        </button>

        <button
          onClick={() => onAction("feature")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 text-yellow-400"
        >
          <Star className="h-4 w-4" />
          Feature
        </button>

        <button
          onClick={() => onAction("archive")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 text-gray-400"
        >
          <Archive className="h-4 w-4" />
          Archive
        </button>

        <div className="w-px h-6 bg-gray-700" />

        <button
          onClick={() => onAction("delete")}
          className="flex items-center gap-2 px-3 py-1.5 rounded-lg hover:bg-gray-700 text-red-400"
        >
          <Trash2 className="h-4 w-4" />
          Delete
        </button>
      </div>
    </div>
  )
} 