"use client"

import { useState } from "react"
import { Plus, Store, Package, Archive, FolderTree, BarChart2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { StoreStatsOverview } from "./_components/store-stats-overview"
import { StoreAnalytics } from "./_components/store-analytics"

const storeMenu = [
  {
    label: "Store",
    icon: Store,
    href: "/admindashboard/store",
  },
  {
    label: "Products",
    icon: Package,
    href: "/admindashboard/store/products",
  },
  {
    label: "Categories",
    icon: FolderTree,
    href: "/admindashboard/store/categories",
  },
  {
    label: "Inventory",
    icon: Archive,
    href: "/admindashboard/store/inventory",
  },
]

export default function StorePage() {
  const router = useRouter()

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-white">Store Management</h1>
        <button
          onClick={() => router.push("/admindashboard/store/products")}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg 
            hover:bg-blue-700 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Create Product
        </button>
      </div>

      {/* Store Navigation Menu */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        {storeMenu.map((item) => (
          <button
            key={item.label}
            onClick={() => router.push(item.href)}
            className="flex items-center gap-3 p-4 bg-gray-800 rounded-lg hover:bg-gray-700 
              transition-colors text-left"
          >
            <div className="p-2 bg-gray-700 rounded-lg">
              <item.icon className="h-5 w-5 text-blue-500" />
            </div>
            <span className="font-medium text-white">{item.label}</span>
          </button>
        ))}
      </div>

      {/* Store Overview Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Store className="h-5 w-5 text-blue-500" />
          <h2 className="text-xl font-semibold text-white">Store Overview</h2>
        </div>
        <StoreStatsOverview />
      </div>

      {/* Store Analytics Section */}
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <BarChart2 className="h-5 w-5 text-green-500" />
          <h2 className="text-xl font-semibold text-white">Analytics</h2>
        </div>
        <StoreAnalytics />
      </div>
    </div>
  )
} 