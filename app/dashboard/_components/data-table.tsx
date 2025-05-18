"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Column<T> {
  id: string
  header: string
  cell: (row: T) => React.ReactNode
}

interface DataTableProps<T> {
  columns: Column<T>[]
  data: T[]
  pageSize?: number
  selectable?: boolean
  selectedRows?: string[]
  onSelectRows?: (rows: string[]) => void
}

export function DataTable<T extends { id: string }>({
  columns,
  data,
  pageSize = 10,
  selectable = false,
  selectedRows = [],
  onSelectRows
}: DataTableProps<T>) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = data.slice(startIndex, endIndex)

  const handleSelectAll = (checked: boolean) => {
    if (onSelectRows) {
      onSelectRows(checked ? currentData.map(row => row.id) : [])
    }
  }

  const handleSelectRow = (rowId: string) => {
    if (onSelectRows) {
      const newSelectedRows = selectedRows.includes(rowId)
        ? selectedRows.filter(id => id !== rowId)
        : [...selectedRows, rowId]
      onSelectRows(newSelectedRows)
    }
  }

  return (
    <div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-700">
              {selectable && (
                <th key="select-header" className="px-4 py-3">
                  <input
                    type="checkbox"
                    checked={currentData.length > 0 && currentData.every(row => selectedRows.includes(row.id))}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={`header-${column.id}`}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-400"
                >
                  {column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentData.map((row) => (
              <tr
                key={`row-${row.id}`}
                className={`border-b border-gray-700 hover:bg-gray-800/50 ${
                  selectedRows.includes(row.id) ? 'bg-gray-800' : ''
                }`}
              >
                {selectable && (
                  <td key={`select-${row.id}`} className="px-4 py-3">
                    <input
                      type="checkbox"
                      checked={selectedRows.includes(row.id)}
                      onChange={() => handleSelectRow(row.id)}
                      className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                    />
                  </td>
                )}
                {columns.map((column) => (
                  <td key={`cell-${row.id}-${column.id}`} className="px-4 py-3">
                    {column.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
          </div>
        </div>
      )}
    </div>
  )
}

export type { Column } 