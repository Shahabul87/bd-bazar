"use client"

import { useState } from "react"
import { ArrowLeft, Download, Filter, Search, UserPlus, Mail } from "lucide-react"
import { useRouter } from "next/navigation"
import { CustomerTable } from "./_components/customer-table"
import { CustomerProfileModal } from "./_components/customer-profile-modal"
import { CustomerFilters } from "./_components/customer-filters"
import { CustomerStats } from "./_components/customer-stats"
import { ExportCustomersModal } from "./_components/export-customers-modal"

interface CustomerFiltersType {
  spendingRange: {
    min: string
    max: string
  }
  orderCount: {
    min: string
    max: string
  }
  status: string[]
  joinedDate: {
    from: string
    to: string
  }
  lastOrderDate: {
    from: string
    to: string
  }
}

export default function CustomersPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")
  const [isFiltersOpen, setIsFiltersOpen] = useState(false)
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null)
  const [activeFilters, setActiveFilters] = useState<CustomerFiltersType | null>(null)

  const handleExport = (format: string) => {
    console.log("Exporting customers in format:", format)
    setIsExportModalOpen(false)
  }

  const handleApplyFilters = (filters: CustomerFiltersType) => {
    setActiveFilters(filters)
    setIsFiltersOpen(false)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="p-2 hover:bg-gray-700 rounded-full transition"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold">Customer Management</h1>
            <p className="text-gray-400">View and manage your customer base</p>
          </div>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
          >
            <Download className="h-4 w-4" />
            Export Customers
          </button>
          <button
            onClick={() => {/* Implement bulk email */}}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <Mail className="h-4 w-4" />
            Bulk Email
          </button>
        </div>
      </div>

      {/* Customer Stats Overview */}
      <CustomerStats />

      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search customers by name, email, or phone..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => setIsFiltersOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700"
        >
          <Filter className="h-4 w-4" />
          {activeFilters ? "Filters Applied" : "Add Filters"}
        </button>
      </div>

      {/* Customer Table */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        <CustomerTable
          searchQuery={searchQuery}
          filters={activeFilters}
          onViewProfile={setSelectedCustomer}
        />
      </div>

      {/* Modals */}
      <CustomerFilters
        isOpen={isFiltersOpen}
        onClose={() => setIsFiltersOpen(false)}
        onApply={handleApplyFilters}
        initialFilters={activeFilters}
      />

      <CustomerProfileModal
        customerId={selectedCustomer}
        isOpen={!!selectedCustomer}
        onClose={() => setSelectedCustomer(null)}
      />

      <ExportCustomersModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />
    </div>
  )
} 