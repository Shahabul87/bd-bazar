"use client"

import { useState } from "react"
import { X, Upload, Plus, Minus } from "lucide-react"
import Image from "next/image"

interface AddProductModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

interface ProductForm {
  name: string
  description: string
  category: string
  price: string
  sku: string
  stock: string
  images: File[]
  imagePreviews: string[]
  status: "active" | "draft"
  featured: boolean
  variants: {
    name: string
    options: string[]
  }[]
}

const categories = [
  "Electronics",
  "Fashion",
  "Home & Living",
  "Beauty",
  "Sports",
  "Books",
  "Toys",
  "Groceries"
]

export const AddProductModal = ({
  isOpen,
  onClose,
  onSubmit
}: AddProductModalProps) => {
  const [form, setForm] = useState<ProductForm>({
    name: "",
    description: "",
    category: categories[0],
    price: "",
    sku: "",
    stock: "",
    images: [],
    imagePreviews: [],
    status: "draft",
    featured: false,
    variants: []
  })

  if (!isOpen) return null

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const previews = files.map(file => URL.createObjectURL(file))
    
    setForm(prev => ({
      ...prev,
      images: [...prev.images, ...files],
      imagePreviews: [...prev.imagePreviews, ...previews]
    }))
  }

  const removeImage = (index: number) => {
    URL.revokeObjectURL(form.imagePreviews[index])
    setForm(prev => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
      imagePreviews: prev.imagePreviews.filter((_, i) => i !== index)
    }))
  }

  const addVariant = () => {
    setForm(prev => ({
      ...prev,
      variants: [...prev.variants, { name: "", options: [""] }]
    }))
  }

  const removeVariant = (index: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.filter((_, i) => i !== index)
    }))
  }

  const addVariantOption = (variantIndex: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === variantIndex
          ? { ...variant, options: [...variant.options, ""] }
          : variant
      )
    }))
  }

  const removeVariantOption = (variantIndex: number, optionIndex: number) => {
    setForm(prev => ({
      ...prev,
      variants: prev.variants.map((variant, i) => 
        i === variantIndex
          ? {
              ...variant,
              options: variant.options.filter((_, j) => j !== optionIndex)
            }
          : variant
      )
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Product</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Basic Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Product Name</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={(e) => setForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Category</label>
                <select
                  value={form.category}
                  onChange={(e) => setForm(prev => ({ ...prev, category: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
              <textarea
                value={form.description}
                onChange={(e) => setForm(prev => ({ ...prev, description: e.target.value }))}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                rows={4}
                required
              />
            </div>
          </div>

          {/* Pricing & Inventory */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Pricing & Inventory</h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Price</label>
                <input
                  type="number"
                  value={form.price}
                  onChange={(e) => setForm(prev => ({ ...prev, price: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                  step="0.01"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">SKU</label>
                <input
                  type="text"
                  value={form.sku}
                  onChange={(e) => setForm(prev => ({ ...prev, sku: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Stock</label>
                <input
                  type="number"
                  value={form.stock}
                  onChange={(e) => setForm(prev => ({ ...prev, stock: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Product Images */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Product Images</h3>
            <div className="grid grid-cols-4 gap-4">
              {form.imagePreviews.map((preview, index) => (
                <div key={index} className="relative">
                  <Image
                    src={preview}
                    alt={`Product image ${index + 1}`}
                    width={200}
                    height={200}
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ))}
              {form.imagePreviews.length < 4 && (
                <div className="border-2 border-dashed border-gray-700 rounded-lg p-4 flex items-center justify-center">
                  <input
                    type="file"
                    onChange={handleImageUpload}
                    accept="image/*"
                    className="hidden"
                    id="image-upload"
                    multiple
                  />
                  <label
                    htmlFor="image-upload"
                    className="cursor-pointer text-center"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mx-auto mb-2" />
                    <p className="text-sm text-gray-400">Add Image</p>
                  </label>
                </div>
              )}
            </div>
          </div>

          {/* Variants */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="font-medium">Variants</h3>
              <button
                type="button"
                onClick={addVariant}
                className="text-sm text-blue-400 hover:text-blue-300"
              >
                Add Variant
              </button>
            </div>
            {form.variants.map((variant, variantIndex) => (
              <div key={variantIndex} className="space-y-2 border-b border-gray-700 pb-4">
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={variant.name}
                    onChange={(e) => {
                      setForm(prev => ({
                        ...prev,
                        variants: prev.variants.map((v, i) =>
                          i === variantIndex ? { ...v, name: e.target.value } : v
                        )
                      }))
                    }}
                    placeholder="Variant name (e.g., Size, Color)"
                    className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => removeVariant(variantIndex)}
                    className="p-2 hover:bg-gray-700 rounded-full text-red-400"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                </div>
                <div className="pl-4 space-y-2">
                  {variant.options.map((option, optionIndex) => (
                    <div key={optionIndex} className="flex items-center gap-2">
                      <input
                        type="text"
                        value={option}
                        onChange={(e) => {
                          setForm(prev => ({
                            ...prev,
                            variants: prev.variants.map((v, i) =>
                              i === variantIndex
                                ? {
                                    ...v,
                                    options: v.options.map((o, j) =>
                                      j === optionIndex ? e.target.value : o
                                    )
                                  }
                                : v
                            )
                          }))
                        }}
                        placeholder="Option value"
                        className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                      />
                      <button
                        type="button"
                        onClick={() => removeVariantOption(variantIndex, optionIndex)}
                        className="p-2 hover:bg-gray-700 rounded-full text-red-400"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => addVariantOption(variantIndex)}
                    className="text-sm text-blue-400 hover:text-blue-300"
                  >
                    Add Option
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Product Status */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Product Status</h3>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.status === "active"}
                  onChange={() => setForm(prev => ({ ...prev, status: "active" }))}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span>Active</span>
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="radio"
                  checked={form.status === "draft"}
                  onChange={() => setForm(prev => ({ ...prev, status: "draft" }))}
                  className="text-blue-500 focus:ring-blue-500"
                />
                <span>Draft</span>
              </label>
            </div>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={form.featured}
                onChange={(e) => setForm(prev => ({ ...prev, featured: e.target.checked }))}
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <span>Feature this product</span>
            </label>
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
              Add Product
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 