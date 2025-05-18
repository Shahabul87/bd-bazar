"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft, Upload, Trash2, AlertCircle } from "lucide-react"
import Image from "next/image"

interface PromotionForm {
  name: string
  description: string
  type: string
  discountValue: string
  minCartValue: string
  startDate: string
  endDate: string
  targetAudience: string[]
  categories: string[]
  usageLimit: string
  image: File | null
  imagePreview: string | null
}

const promotionTypes = [
  { value: "percentage", label: "Percentage Discount" },
  { value: "fixed", label: "Fixed Amount Discount" },
  { value: "bogo", label: "Buy One Get One" },
  { value: "shipping", label: "Free Shipping" },
  { value: "flash", label: "Flash Sale" }
]

const audienceOptions = [
  { value: "all", label: "All Customers" },
  { value: "new", label: "New Customers" },
  { value: "returning", label: "Returning Customers" },
  { value: "vip", label: "VIP Members" }
]

const categoryOptions = [
  { value: "electronics", label: "Electronics" },
  { value: "fashion", label: "Fashion" },
  { value: "home", label: "Home & Living" },
  { value: "beauty", label: "Beauty" },
  { value: "sports", label: "Sports" }
]

export default function CreatePromotionPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formData, setFormData] = useState<PromotionForm>({
    name: "",
    description: "",
    type: promotionTypes[0].value,
    discountValue: "",
    minCartValue: "",
    startDate: "",
    endDate: "",
    targetAudience: [],
    categories: [],
    usageLimit: "",
    image: null,
    imagePreview: null
  })

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file)
      }))
    }
  }

  const removeImage = () => {
    if (formData.imagePreview) {
      URL.revokeObjectURL(formData.imagePreview)
    }
    setFormData(prev => ({
      ...prev,
      image: null,
      imagePreview: null
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log("Submitting promotion:", formData)
      await new Promise(resolve => setTimeout(resolve, 1000)) // Simulate API call
      router.push("/admindashboard/promotions")
    } catch (error) {
      console.error("Failed to create promotion:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-6 max-w-5xl mx-auto bg-gray-800 text-white min-h-screen">
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-700 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <h1 className="text-2xl font-bold">Create New Promotion</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium">Basic Information</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Promotion Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Promotion Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              >
                {promotionTypes.map(type => (
                  <option key={type.value} value={type.value}>{type.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
              rows={4}
              required
            />
          </div>
        </div>

        {/* Discount Rules */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium">Discount Rules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">
                {formData.type === "percentage" ? "Discount Percentage" : "Discount Amount"}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={formData.discountValue}
                  onChange={(e) => setFormData(prev => ({ ...prev, discountValue: e.target.value }))}
                  className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder={formData.type === "percentage" ? "Enter percentage" : "Enter amount"}
                  required
                />
                {formData.type === "percentage" && (
                  <span className="absolute right-3 top-2 text-gray-400">%</span>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Minimum Cart Value</label>
              <input
                type="number"
                value={formData.minCartValue}
                onChange={(e) => setFormData(prev => ({ ...prev, minCartValue: e.target.value }))}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter minimum amount"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">Start Date</label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2 text-gray-300">End Date</label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                required
              />
            </div>
          </div>
        </div>

        {/* Target Audience & Categories */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium">Target Audience & Categories</h2>
          
          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Target Audience</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {audienceOptions.map(option => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.targetAudience.includes(option.value)}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        targetAudience: e.target.checked
                          ? [...prev.targetAudience, option.value]
                          : prev.targetAudience.filter(v => v !== option.value)
                      }))
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-gray-300">Applicable Categories</label>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {categoryOptions.map(option => (
                <label key={option.value} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={formData.categories.includes(option.value)}
                    onChange={(e) => {
                      setFormData(prev => ({
                        ...prev,
                        categories: e.target.checked
                          ? [...prev.categories, option.value]
                          : prev.categories.filter(v => v !== option.value)
                      }))
                    }}
                    className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-300">{option.label}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Promotion Banner */}
        <div className="bg-gray-900 p-6 rounded-lg shadow-sm space-y-6">
          <h2 className="text-lg font-medium">Promotion Banner</h2>
          
          {formData.imagePreview ? (
            <div className="relative">
              <Image
                src={formData.imagePreview}
                alt="Promotion banner preview"
                width={800}
                height={400}
                className="rounded-lg object-cover"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-2 right-2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-700 rounded-lg p-8 text-center">
              <input
                type="file"
                onChange={handleImageChange}
                accept="image/*"
                className="hidden"
                id="banner-upload"
              />
              <label
                htmlFor="banner-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />
                <p className="text-sm text-gray-400">
                  Click to upload promotion banner
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Recommended size: 1200x600px
                </p>
              </label>
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={() => router.back()}
            className="px-4 py-2 border border-gray-600 rounded-lg hover:bg-gray-700 text-gray-300"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Promotion"}
          </button>
        </div>
      </form>
    </div>
  )
} 