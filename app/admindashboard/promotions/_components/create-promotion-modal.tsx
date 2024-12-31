"use client"

import { useState } from "react"
import { X, Image as ImageIcon } from "lucide-react"

interface CreatePromotionModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: PromotionFormData) => void
}

interface PromotionFormData {
  name: string
  description: string
  type: string
  discountValue: string
  minCartValue: string
  startDate: string
  endDate: string
  targetAudience: string
  usageLimit: string
  image: File | null
}

const promotionTypes = [
  "Percentage Discount",
  "Fixed Discount",
  "Free Shipping",
  "Buy X Get Y Free",
  "Flash Sale"
]

const targetAudiences = [
  "All Users",
  "New Users",
  "Returning Customers",
  "VIP Customers"
]

export const CreatePromotionModal = ({
  isOpen,
  onClose,
  onSubmit
}: CreatePromotionModalProps) => {
  const [formData, setFormData] = useState<PromotionFormData>({
    name: "",
    description: "",
    type: promotionTypes[0],
    discountValue: "",
    minCartValue: "",
    startDate: "",
    endDate: "",
    targetAudience: targetAudiences[0],
    usageLimit: "",
    image: null
  })

  if (!isOpen) return null

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
    onClose()
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, image: e.target.files![0] }))
    }
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Create New Promotion</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Promotion Name</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Promotion Type</label>
              <select
                value={formData.type}
                onChange={(e) => setFormData(prev => ({ ...prev, type: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                {promotionTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Discount Value</label>
              <input
                type="number"
                value={formData.discountValue}
                onChange={(e) => setFormData(prev => ({ ...prev, discountValue: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder={formData.type.includes('Percentage') ? 'Enter percentage' : 'Enter amount'}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Minimum Cart Value</label>
              <input
                type="number"
                value={formData.minCartValue}
                onChange={(e) => setFormData(prev => ({ ...prev, minCartValue: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                placeholder="Enter minimum amount"
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Start Date</label>
              <input
                type="datetime-local"
                value={formData.startDate}
                onChange={(e) => setFormData(prev => ({ ...prev, startDate: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">End Date</label>
              <input
                type="datetime-local"
                value={formData.endDate}
                onChange={(e) => setFormData(prev => ({ ...prev, endDate: e.target.value }))}
                className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              rows={3}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Target Audience</label>
            <select
              value={formData.targetAudience}
              onChange={(e) => setFormData(prev => ({ ...prev, targetAudience: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {targetAudiences.map(audience => (
                <option key={audience} value={audience}>{audience}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Usage Limit per Customer</label>
            <input
              type="number"
              value={formData.usageLimit}
              onChange={(e) => setFormData(prev => ({ ...prev, usageLimit: e.target.value }))}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
              placeholder="Enter usage limit"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Promotion Banner</label>
            <div className="border-2 border-dashed rounded-lg p-4 text-center">
              <input
                type="file"
                onChange={handleImageChange}
                className="hidden"
                id="image-upload"
                accept="image/*"
              />
              <label
                htmlFor="image-upload"
                className="cursor-pointer flex flex-col items-center"
              >
                <ImageIcon className="h-8 w-8 text-gray-400 mb-2" />
                <span className="text-sm text-gray-500">
                  Click to upload promotion banner
                </span>
              </label>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            >
              Create Promotion
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 