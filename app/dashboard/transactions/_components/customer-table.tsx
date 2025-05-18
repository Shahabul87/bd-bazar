"use client"

import { DataTable } from "../../_components/data-table"
import Image from "next/image"
import { MoreVertical, ArrowUp, ArrowDown } from "lucide-react"

interface Customer {
  id: string
  name: string
  email: string
  avatar: string
  totalSpent: number
  lastTransaction: string
  transactionCount: number
  trend: number
}

const customers: Customer[] = [
  {
    id: "CUST-001",
    name: "John Doe",
    email: "john@example.com",
    avatar: "https://picsum.photos/seed/1/32/32",
    totalSpent: 4500,
    lastTransaction: "2024-03-21",
    transactionCount: 12,
    trend: 8.5
  },
  {
    id: "CUST-002",
    name: "Jane Smith",
    email: "jane@example.com",
    avatar: "https://picsum.photos/seed/2/32/32",
    totalSpent: 3200,
    lastTransaction: "2024-03-20",
    transactionCount: 8,
    trend: -2.3
  }
]

export const CustomerTable = () => {
  const columns = [
    {
      header: "Customer",
      accessorKey: "name" as keyof Customer,
      cell: ({ row }: { row: { original: Customer } }) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.original.avatar}
            alt={row.original.name}
            width={32}
            height={32}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-white">{row.original.name}</p>
            <p className="text-sm text-gray-400">{row.original.email}</p>
          </div>
        </div>
      )
    },
    {
      header: "Total Spent",
      accessorKey: "totalSpent" as keyof Customer,
      cell: ({ row }: { row: { original: Customer } }) => (
        <span className="text-white">${row.original.totalSpent.toLocaleString()}</span>
      )
    },
    {
      header: "Last Transaction",
      accessorKey: "lastTransaction" as keyof Customer
    },
    {
      header: "Transactions",
      accessorKey: "transactionCount" as keyof Customer,
      cell: ({ row }: { row: { original: Customer } }) => (
        <div className="flex items-center gap-2">
          <span className="text-white">{row.original.transactionCount}</span>
          <div className={`flex items-center gap-1 text-sm ${
            row.original.trend > 0 ? 'text-green-400' : 'text-red-400'
          }`}>
            {row.original.trend > 0 ? (
              <ArrowUp className="h-4 w-4" />
            ) : (
              <ArrowDown className="h-4 w-4" />
            )}
            <span>{Math.abs(row.original.trend)}%</span>
          </div>
        </div>
      )
    },
    {
      header: "",
      accessorKey: "id" as keyof Customer,
      cell: () => (
        <button className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
          <MoreVertical className="h-4 w-4" />
        </button>
      )
    }
  ]

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-700">
      <div className="p-6 border-b border-gray-700">
        <h2 className="text-lg font-medium text-white">Recent Customers</h2>
        <p className="text-sm text-gray-400">Monitor customer activity and spending</p>
      </div>
      <DataTable<Customer>
        columns={columns}
        data={customers}
        pageSize={5}
      />
    </div>
  )
} 