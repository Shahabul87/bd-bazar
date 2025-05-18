"use client"

import { useState } from "react"
import { Plus, Download, Filter, Search, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { ProductsTable } from "../../_components/products-table"
import { ExportModal } from "../../_components/export-modal"
import { FilterModal } from "../../_components/filter-modal"
import { ExportOptions } from "../../_components/export-modal"
import { CreateProductModal } from "./create-product-modal"

interface ProductFilters {
  categories: string[]
  priceRange: {
    min: string
    max: string
  }
  stockRange: {
    min: string
    max: string
  }
  status: string
  featured: boolean | null
  dateAdded: {
    from: string
    to: string
  }
}

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  status: string;
  category: any;
  images: any[];
  reviews: any[];
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  orderItems: any[];
}

interface SerializedProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  status: string;
  category: any;
  images: any[];
  reviews: any[];
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  orderItems: any[];
}

interface ProductsClientProps {
  products: SerializedProduct[];
}

export const ProductsClient = ({ products }: ProductsClientProps) => {
  const router = useRouter()
  const [isExportModalOpen, setIsExportModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [selectedProducts, setSelectedProducts] = useState<string[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<ProductFilters | null>(null)
  const [showCreateModal, setShowCreateModal] = useState(false)

  const handleExport = (format: string, options: ExportOptions) => {
    console.log(format, options)
    setIsExportModalOpen(false)
  }

  const handleBulkAction = (action: string) => {
    if (action === "delete") {
      console.log("Deleting products:", selectedProducts)
    }
    setSelectedProducts([])
  }

  // Modified handleEdit to use productId
  const handleEdit = (id: string) => {
    router.push(`/admindashboard/store/products/${id}`)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Back Button */}
      <button
        onClick={() => router.push("/admindashboard/store")}
        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors mb-4"
      >
        <ArrowLeft className="h-5 w-5" />
        <span>Back to Store</span>
      </button>

      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Products</h1>
          <p className="text-gray-400">Manage your store&apos;s products</p>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Product
          </Button>
          <button
            onClick={() => setIsExportModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search and Filter */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
              text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="px-4 py-2 bg-gray-900 border border-gray-700 rounded-lg
            hover:bg-gray-700 text-gray-300 flex items-center gap-2"
        >
          <Filter className="h-4 w-4" />
          Filters
        </button>
      </div>

      {/* Products Table */}
      <div className="bg-gray-900 rounded-lg border border-gray-700">
        <ProductsTable 
          searchQuery={searchQuery}
          products={products}
          onEdit={handleEdit}
          selectedProducts={selectedProducts}
          onSelectProducts={setSelectedProducts}
        />
      </div>

      {/* Modals */}
      <FilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={(filters) => {
          setActiveFilters(filters)
          setIsFilterModalOpen(false)
        }}
      />

      <ExportModal
        isOpen={isExportModalOpen}
        onClose={() => setIsExportModalOpen(false)}
        onExport={handleExport}
      />

      <CreateProductModal 
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  )
} 