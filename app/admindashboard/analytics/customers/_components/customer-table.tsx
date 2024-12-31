"use client"

import { useState } from "react"
import { Mail, Phone, Ban, RefreshCw, Wallet, MoreVertical, Eye } from "lucide-react"
import Image from "next/image"
import { DataTable } from "@/app/admindashboard/_components/data-table"
import type { Column } from "@/app/admindashboard/_components/data-table"

interface Customer {
  id: string
  name: string
  email: string
  phone: string
  totalOrders: number
  totalSpend: number
  lastOrderDate: string
  status: "active" | "inactive"
  avatar: string
  joinDate: string
}

interface CustomerTableProps {
  searchQuery: string
  filters: any
  onViewProfile: (customerId: string) => void
}

export const CustomerTable = ({
  searchQuery,
  filters,
  onViewProfile
}: CustomerTableProps) => {
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([])

  // Mock data
  const customers: Customer[] = [
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      phone: "+1 234 567 890",
      totalOrders: 15,
      totalSpend: 1250.00,
      lastOrderDate: "2024-03-15",
      status: "active",
      avatar: "https://picsum.photos/seed/1/40/40",
      joinDate: "2023-08-15"
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      phone: "+1 234 567 891",
      totalOrders: 8,
      totalSpend: 750.00,
      lastOrderDate: "2024-03-10",
      status: "active",
      avatar: "https://picsum.photos/seed/2/40/40",
      joinDate: "2023-09-20"
    }
  ]

  const columns: Column<Customer>[] = [
    {
      id: "customer",
      header: "Customer",
      cell: (row) => (
        <div className="flex items-center gap-3">
          <Image
            src={row.avatar}
            alt={row.name}
            width={40}
            height={40}
            className="rounded-full"
          />
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-sm text-gray-400">Joined {new Date(row.joinDate).toLocaleDateString()}</p>
          </div>
        </div>
      )
    },
    {
      id: "contact",
      header: "Contact",
      cell: (row) => (
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-400" />
            <span>{row.email}</span>
          </div>
          <div className="flex items-center gap-2">
            <Phone className="h-4 w-4 text-gray-400" />
            <span>{row.phone}</span>
          </div>
        </div>
      )
    },
    {
      id: "orders",
      header: "Orders",
      cell: (row) => (
        <div>
          <p className="font-medium">{row.totalOrders}</p>
          <p className="text-sm text-gray-400">Last order {new Date(row.lastOrderDate).toLocaleDateString()}</p>
        </div>
      )
    },
    {
      id: "spend",
      header: "Total Spend",
      cell: (row) => (
        <div className="font-medium">
          ${row.totalSpend.toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
          })}
        </div>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row) => (
        <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
          row.status === 'active' 
            ? 'bg-green-100 text-green-800'
            : 'bg-red-100 text-red-800'
        }`}>
          {row.status.charAt(0).toUpperCase() + row.status.slice(1)}
        </div>
      )
    },
    {
      id: "actions",
      header: "Actions",
      cell: (row) => (
        <div className="flex items-center gap-2">
          <button
            onClick={() => onViewProfile(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="View Profile"
          >
            <Eye className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement status toggle */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title={row.status === 'active' ? 'Deactivate' : 'Activate'}
          >
            {row.status === 'active' ? (
              <Ban className="h-4 w-4" />
            ) : (
              <RefreshCw className="h-4 w-4" />
            )}
          </button>
          <button
            onClick={() => {/* Implement refund */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            title="Issue Refund"
          >
            <Wallet className="h-4 w-4" />
          </button>
          <button
            onClick={() => {/* Implement more actions */}}
            className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
          >
            <MoreVertical className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const filteredCustomers = customers.filter(customer => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      return (
        customer.name.toLowerCase().includes(search) ||
        customer.email.toLowerCase().includes(search) ||
        customer.phone.includes(search)
      )
    }
    return true
  })

  return (
    <DataTable
      columns={columns}
      data={filteredCustomers}
      selectable
      selectedRows={selectedCustomers}
      onSelectRows={setSelectedCustomers}
      pageSize={10}
    />
  )
} 