"use client"

import { useState, useEffect } from "react"
import { X, Upload, FolderTree } from "lucide-react"
import Image from "next/image"

interface CategoryModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: CategoryFormData) => void
  category?: Category | null
  categories?: Category[] // For parent category selection
}

interface CategoryFormData {
  name: string
  description: string
  image?: File | null
  parentId?: string | null
  status: "active" | "inactive"
}

export const CategoryModal = ({
  isOpen,
  onClose,
  onSubmit,
  category,
  categories = []
}: CategoryModalProps) => {
  const [form, setForm] = useState<CategoryFormData>({
    name: "",
    description: "",
    image: null,
    parentId: null,
    status: "active"
  })
  const [imagePreview, setImagePreview] = useState<string | null>(null)

  useEffect(() => {
    if (category) {
      setForm({
        name: category.name,
        description: category.description,
        parentId: category.parentId || null,
        status: category.status
      })
      if (category.image) {
        setImagePreview(category.image)
      }
    }
  }, [category])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setForm(prev => ({ ...prev, image: file }))
      const reader = new FileReader()
      reader.onloadend = () => {
        setImagePreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />
      <div className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-2xl">
        <div className="bg-gray-800 rounded-xl p-6 max-h-[90vh] overflow-y-auto text-white">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-bold">
              {category ? "Edit Category" : "Add Category"}
            </h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
              <X className="h-5 w-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Image Upload */}
            <div className="flex justify-center">
              <div className="relative w-32 h-32">
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Category preview"
                    fill
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-700 rounded-lg flex items-center justify-center">
                    <FolderTree className="h-12 w-12 text-gray-400" />
                  </div>
                )}
                <label className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 hover:opacity-100 transition-opacity rounded-lg cursor-pointer">
                  <Upload className="h-6 w-6 text-white" />
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                </label>
              </div>
            </div>

            {/* Category Details */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Description</label>
                <textarea
                  value={form.description}
                  onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Parent Category</label>
                <select
                  value={form.parentId || ""}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    parentId: e.target.value || null 
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="">None (Top Level)</option>
                  {categories.map(cat => (
                    <option key={cat.id} value={cat.id}>{cat.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm(prev => ({ 
                    ...prev, 
                    status: e.target.value as "active" | "inactive" 
                  }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500"
                >
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                </select>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                {category ? "Save Changes" : "Add Category"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 