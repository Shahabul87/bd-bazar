"use client"

import { useState } from "react"
import { Plus, Download, Filter, Search } from "lucide-react"
import { CategoriesManagement } from "../_components/categories-management"
import { CategoryModal } from "../_components/category-modal"
import { CategoryFilterModal } from "../_components/category-filter-modal"

export default function CategoriesPage() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeFilters, setActiveFilters] = useState<any>(null)

  const handleAddCategory = (data: any) => {
    console.log("Adding new category:", data)
    setIsAddModalOpen(false)
  }

  const handleEditCategory = (data: any) => {
    console.log("Editing category:", data)
    setIsAddModalOpen(false)
    setEditingCategory(null)
  }

  const handleApplyFilters = (filters: any) => {
    console.log("Applying filters:", filters)
    setActiveFilters(filters)
    setIsFilterModalOpen(false)
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold">Categories</h1>
          <p className="text-gray-400">Manage your product categories</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            Add Category
          </button>
          <button
            className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            <Download className="h-4 w-4" />
            Export
          </button>
        </div>
      </div>

      {/* Search */}
      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
          <input
            type="text"
            placeholder="Search categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
          />
        </div>
        <button
          onClick={() => setIsFilterModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
        >
          <Filter className="h-4 w-4" />
          {activeFilters ? "Filters Applied" : "Add Filter"}
        </button>
      </div>

      {/* Categories Management Component */}
      <CategoriesManagement 
        searchQuery={searchQuery}
        filters={activeFilters}
        onEdit={(category) => {
          setEditingCategory(category)
          setIsAddModalOpen(true)
        }}
      />

      {/* Category Modal */}
      <CategoryModal
        isOpen={isAddModalOpen}
        onClose={() => {
          setIsAddModalOpen(false)
          setEditingCategory(null)
        }}
        onSubmit={editingCategory ? handleEditCategory : handleAddCategory}
        category={editingCategory}
      />

      {/* Filter Modal */}
      <CategoryFilterModal
        isOpen={isFilterModalOpen}
        onClose={() => setIsFilterModalOpen(false)}
        onApplyFilters={handleApplyFilters}
      />
    </div>
  )
} 