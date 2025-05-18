"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Column {
  id: string
  header: string | ((props: { table: any }) => React.ReactNode)
  cell: (props: { row: any }) => React.ReactNode
}

interface DataTableProps {
  columns: Column[]
  data: any[]
  pageSize?: number
  selectable?: boolean
  selectedRows?: string[]
  onSelectRows?: (rows: string[]) => void
  onRowAction?: (id: string) => void
  searchKey?: string
  searchPlaceholder?: string
  showSearch?: boolean
}

export const DataTable = ({
  columns,
  data,
  pageSize = 10,
  selectable = false,
  selectedRows: initialSelectedRows = [],
  onSelectRows,
  onRowAction,
  searchKey,
  searchPlaceholder,
  showSearch
}: DataTableProps) => {
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedRows, setSelectedRows] = useState<string[]>(initialSelectedRows)

  const totalPages = Math.ceil(data.length / pageSize)
  const startIndex = (currentPage - 1) * pageSize
  const endIndex = startIndex + pageSize
  const currentData = data.slice(startIndex, endIndex)

  // Row selection functions
  const isRowSelected = (rowId: string) => selectedRows.includes(rowId)
  
  const toggleRowSelected = (rowId: string, selected: boolean) => {
    const newSelectedRows = selected 
      ? [...selectedRows, rowId]
      : selectedRows.filter(id => id !== rowId)
    
    setSelectedRows(newSelectedRows)
    if (onSelectRows) {
      onSelectRows(newSelectedRows)
    }
  }

  const isAllRowsSelected = () => {
    return currentData.length > 0 && 
      currentData.every(row => row.id && selectedRows.includes(row.id))
  }

  const isIndeterminate = () => {
    return currentData.some(row => row.id && selectedRows.includes(row.id)) && 
      !isAllRowsSelected()
  }

  const toggleAllRowsSelected = (selected: boolean) => {
    const newSelectedRows = selected
      ? [...selectedRows, ...currentData.filter(row => row.id && !selectedRows.includes(row.id)).map(row => row.id)]
      : selectedRows.filter(id => !currentData.find(row => row.id === id))
    
    setSelectedRows(newSelectedRows)
    if (onSelectRows) {
      onSelectRows(newSelectedRows)
    }
  }

  // Create a table context object for column headers
  const tableContext = {
    getIsAllPageRowsSelected: isAllRowsSelected,
    getIsSomePageRowsSelected: isIndeterminate,
    toggleAllPageRowsSelected: toggleAllRowsSelected
  }

  return (
    <div className="w-full">
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead key="table-head">
            <tr key="header-row" className="border-b border-gray-700">
              {columns.map((column) => (
                <th
                  key={column.id}
                  className="px-4 py-3 text-left text-sm font-medium text-gray-400"
                >
                  {typeof column.header === 'function' 
                    ? column.header({ table: tableContext })
                    : column.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody key="table-body">
            {currentData.map((row, index) => {
              // Create a row context object for cell renderers
              const rowContext = {
                original: row,
                getValue: (key: string) => {
                  const parts = key.split('.')
                  let value = row
                  for (const part of parts) {
                    if (value === undefined) break
                    value = value[part]
                  }
                  return value
                },
                getIsSelected: () => row.id ? isRowSelected(row.id) : false,
                toggleSelected: (selected: boolean) => row.id ? toggleRowSelected(row.id, selected) : undefined
              }

              const rowId = row.id || `row-${index}`

              return (
                <tr
                  key={rowId}
                  className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors"
                  onClick={() => onRowAction && row.id && onRowAction(row.id)}
                >
                  {columns.map((column) => (
                    <td key={`${rowId}-${column.id}`} className="px-4 py-3 text-sm">
                      {column.cell({ row: rowContext })}
                    </td>
                  ))}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-between px-4 py-3 border-t border-gray-700">
          <div className="flex items-center gap-2">
            <button
              key="prev-button"
              onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
              disabled={currentPage === 1}
              className="p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span key="page-info" className="text-sm text-gray-400">
              Page {currentPage} of {totalPages}
            </span>
            <button
              key="next-button"
              onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
              disabled={currentPage === totalPages}
              className="p-1 rounded-lg hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          <div key="showing-info" className="text-sm text-gray-400">
            Showing {startIndex + 1} to {Math.min(endIndex, data.length)} of {data.length} entries
          </div>
        </div>
      )}
    </div>
  )
} 