"use client"

import { useState } from "react"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"
import { ProductsTable } from "../../store/_components/products-table"
import { StoreStatsOverview } from "../../store/_components/store-stats-overview"

export default function ProductsStockPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-700 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Products in Stock</h1>
          <p className="text-gray-400">Manage your product inventory</p>
        </div>
      </div>

      <StoreStatsOverview />

      <div className="bg-gray-900 rounded-lg shadow-sm border border-gray-700">
        <ProductsTable
          status="all"
          searchQuery={searchQuery}
          filters={{}}
        />
      </div>
    </div>
  )
} 