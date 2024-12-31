"use client"

import { useState } from "react"
import { Plus, Edit2, Trash2, FolderTree, ChevronRight, MoreVertical } from "lucide-react"
import Image from "next/image"

interface Category {
  id: string
  name: string
  slug: string
  description: string
  image?: string
  parentId?: string | null
  subcategories?: Category[]
  productCount: number
  status: "active" | "inactive"
}

interface CategoryFormData {
  name: string
  description: string
  image?: File | null
  parentId?: string | null
  status: "active" | "inactive"
}

interface CategoriesManagementProps {
  searchQuery: string
  filters: any
  onEdit: (category: Category) => void
}

export const CategoriesManagement = ({
  searchQuery,
  filters,
  onEdit
}: CategoriesManagementProps) => {
  const [categories, setCategories] = useState<Category[]>([
    {
      id: "cat-1",
      name: "Electronics",
      slug: "electronics",
      description: "Electronic devices and accessories",
      image: "https://picsum.photos/seed/electronics/100/100",
      productCount: 150,
      status: "active",
      subcategories: [
        {
          id: "cat-1-1",
          name: "Smartphones",
          slug: "smartphones",
          description: "Mobile phones and accessories",
          productCount: 45,
          status: "active"
        },
        {
          id: "cat-1-2",
          name: "Laptops",
          slug: "laptops",
          description: "Notebooks and accessories",
          productCount: 35,
          status: "active"
        }
      ]
    },
    {
      id: "cat-2",
      name: "Fashion",
      slug: "fashion",
      description: "Clothing and accessories",
      image: "https://picsum.photos/seed/fashion/100/100",
      productCount: 320,
      status: "active"
    }
  ])

  const [isAddModalOpen, setIsAddModalOpen] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [expandedCategories, setExpandedCategories] = useState<string[]>([])

  const toggleExpand = (categoryId: string) => {
    setExpandedCategories(prev => 
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    )
  }

  const CategoryActions = ({ category }: { category: Category }) => {
    const [isOpen, setIsOpen] = useState(false)

    return (
      <div className="relative">
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 hover:bg-gray-700 rounded-full"
        >
          <MoreVertical className="h-4 w-4 text-gray-400" />
        </button>
        
        {isOpen && (
          <div className="absolute right-0 mt-2 w-48 bg-gray-800 rounded-lg shadow-lg border border-gray-700 py-1 z-10">
            <button
              onClick={() => {
                onEdit(category)
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-gray-300"
            >
              <Edit2 className="h-4 w-4" />
              Edit Category
            </button>
            <button
              onClick={() => {
                console.log("Delete category:", category.id)
                setIsOpen(false)
              }}
              className="w-full px-4 py-2 text-left text-sm hover:bg-gray-700 flex items-center gap-2 text-red-400"
            >
              <Trash2 className="h-4 w-4" />
              Delete Category
            </button>
          </div>
        )}
      </div>
    )
  }

  const filteredCategories = categories.filter(category => {
    if (searchQuery) {
      const search = searchQuery.toLowerCase()
      if (!category.name.toLowerCase().includes(search) &&
          !category.description.toLowerCase().includes(search)) {
        return false
      }
    }

    if (filters) {
      if (filters.status?.length > 0 && !filters.status.includes(category.status)) {
        return false
      }

      if (filters.productCount?.min && category.productCount < parseInt(filters.productCount.min)) {
        return false
      }
      if (filters.productCount?.max && category.productCount > parseInt(filters.productCount.max)) {
        return false
      }

      if (typeof filters.hasSubcategories === 'boolean') {
        const hasSubcats = !!category.subcategories?.length
        if (hasSubcats !== filters.hasSubcategories) {
          return false
        }
      }
    }

    return true
  })

  const renderCategoryItem = (category: Category, level: number = 0) => (
    <div key={category.id} className="border-b border-gray-700 last:border-b-0">
      <div className={`
        flex items-center justify-between p-4 hover:bg-gray-800 transition-colors
        ${level > 0 ? 'pl-' + (level * 8 + 4) + 'px' : ''}
      `}>
        <div className="flex items-center gap-4 flex-1">
          {category.subcategories && category.subcategories.length > 0 && (
            <button
              onClick={() => toggleExpand(category.id)}
              className="p-1 hover:bg-gray-700 rounded-full"
            >
              <ChevronRight className={`h-4 w-4 transition-transform ${
                expandedCategories.includes(category.id) ? 'rotate-90' : ''
              }`} />
            </button>
          )}
          
          {category.image ? (
            <Image
              src={category.image}
              alt={category.name}
              width={40}
              height={40}
              className="rounded-lg"
            />
          ) : (
            <div className="w-10 h-10 bg-gray-700 rounded-lg flex items-center justify-center">
              <FolderTree className="h-5 w-5 text-gray-400" />
            </div>
          )}
          
          <div>
            <h3 className="font-medium text-white">{category.name}</h3>
            <p className="text-sm text-gray-400">{category.description}</p>
          </div>
        </div>

        <div className="flex items-center gap-6">
          <div className="text-right">
            <span className="text-sm text-gray-400">Products</span>
            <p className="font-medium text-white">{category.productCount}</p>
          </div>
          
          <span className={`px-2 py-1 rounded-full text-xs ${
            category.status === 'active' 
              ? 'bg-green-900/50 text-green-400' 
              : 'bg-red-900/50 text-red-400'
          }`}>
            {category.status}
          </span>

          <CategoryActions category={category} />
        </div>
      </div>

      {/* Render subcategories if expanded */}
      {expandedCategories.includes(category.id) && category.subcategories?.map(subcat => 
        renderCategoryItem(subcat, level + 1)
      )}
    </div>
  )

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-xl font-bold text-white">Categories</h2>
          <p className="text-gray-400">Manage your product categories</p>
        </div>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <Plus className="h-4 w-4" />
          Add Category
        </button>
      </div>

      {/* Categories List */}
      <div className="bg-gray-900 rounded-xl border border-gray-700">
        {filteredCategories.map(category => renderCategoryItem(category))}
      </div>

      {/* Empty State */}
      {filteredCategories.length === 0 && (
        <div className="text-center py-12 bg-gray-900 rounded-xl border border-gray-700">
          <FolderTree className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-white mb-2">No Categories Yet</h3>
          <p className="text-gray-400 mb-4">Start by adding your first product category</p>
          <button
            onClick={() => setIsAddModalOpen(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            Add Category
          </button>
        </div>
      )}
    </div>
  )
} 