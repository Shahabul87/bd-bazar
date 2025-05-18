"use client"

import { useState } from "react"
import { Store, ShoppingBag, Briefcase } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Select } from "@/components/ui/select"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"
import { Textarea } from "@/components/ui/textarea"

interface StoreTypeSelectorProps {
  storeId: string
  defaultValues: {
    name: string
    type: "store" | "service_store"
    businessType: string
    description: string
  }
}

const RETAIL_TYPES = [
  { label: "Fashion & Apparel", value: "fashion" },
  { label: "Electronics", value: "electronics" },
  { label: "Home & Furniture", value: "home" },
  { label: "Beauty & Health", value: "beauty" },
  { label: "Food & Grocery", value: "food" },
]

const SERVICE_TYPES = [
  { label: "Professional Services", value: "professional" },
  { label: "Healthcare", value: "healthcare" },
  { label: "Education", value: "education" },
  { label: "Maintenance & Repair", value: "maintenance" },
  { label: "Personal Care", value: "personal_care" },
]

export const StoreTypeSelector = ({ 
  storeId,
  defaultValues 
}: StoreTypeSelectorProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [storeName, setStoreName] = useState(defaultValues.name)
  const [storeType, setStoreType] = useState<"store" | "service_store">(defaultValues.type)
  const [businessType, setBusinessType] = useState(defaultValues.businessType)
  const [description, setDescription] = useState(defaultValues.description)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      await axios.patch(`/api/stores/${storeId}`, {
        name: storeName,
        type: storeType,
        businessType: businessType,
        description: description
      })
      
      toast.success("Store updated successfully")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
      {/* Store Name */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Store Name</h2>
        <Input
          value={storeName}
          onChange={(e) => setStoreName(e.target.value)}
          placeholder="Enter store name"
          disabled={isLoading}
          className="bg-gray-800 border-gray-700 text-white"
        />
      </div>

      {/* Store Type Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Store Type</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <button
            type="button"
            onClick={() => setStoreType("store")}
            className={`p-4 rounded-lg border ${
              storeType === "store"
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-800 hover:border-gray-700"
            } transition-all duration-200`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${
                storeType === "store"
                  ? "bg-blue-500"
                  : "bg-gray-800"
              }`}>
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Retail Store</h3>
                <p className="text-sm text-gray-400">
                  Sell physical products to customers
                </p>
              </div>
            </div>
          </button>

          <button
            type="button"
            onClick={() => setStoreType("service_store")}
            className={`p-4 rounded-lg border ${
              storeType === "service_store"
                ? "border-blue-500 bg-blue-500/10"
                : "border-gray-800 hover:border-gray-700"
            } transition-all duration-200`}
          >
            <div className="flex items-center gap-4">
              <div className={`p-2 rounded-full ${
                storeType === "service_store"
                  ? "bg-blue-500"
                  : "bg-gray-800"
              }`}>
                <Briefcase className="h-6 w-6" />
              </div>
              <div className="text-left">
                <h3 className="font-medium text-white">Service Store</h3>
                <p className="text-sm text-gray-400">
                  Offer services to your customers
                </p>
              </div>
            </div>
          </button>
        </div>
      </div>

      {/* Business Type Selection */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Business Category</h2>
        <select
          value={businessType}
          onChange={(e) => setBusinessType(e.target.value)}
          disabled={isLoading}
          className="w-full bg-gray-800 border-gray-700 text-white rounded-md p-2"
        >
          <option value="">Select a category</option>
          {storeType === "store" ? (
            RETAIL_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))
          ) : (
            SERVICE_TYPES.map((type) => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))
          )}
        </select>
      </div>

      {/* Add description field */}
      <div>
        <label className="text-sm font-medium mb-2 block text-gray-200">
          Store Description (Optional)
        </label>
        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Enter a description for your store..."
          className="bg-gray-800 border-gray-700 text-white"
          rows={4}
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Updating..." : "Update Store"}
        </Button>
      </div>
    </form>
  )
} 