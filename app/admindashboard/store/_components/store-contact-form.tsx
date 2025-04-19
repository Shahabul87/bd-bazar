"use client"

import { useState } from "react"
import { Phone, Mail, MapPin, Building2, Home } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import { useRouter } from "next/navigation"

interface StoreContactFormProps {
  storeId: string
  defaultValues: {
    email?: string
    phone?: string
    division?: string
    district?: string
    thana?: string
    roadNo?: string
    fullAddress?: string
  }
}

export const StoreContactForm = ({ 
  storeId,
  defaultValues 
}: StoreContactFormProps) => {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [formData, setFormData] = useState(defaultValues)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      setIsLoading(true)
      await axios.patch(`/api/stores/${storeId}/contact`, formData)
      
      toast.success("Contact details updated successfully")
      router.refresh()
    } catch (error) {
      toast.error("Something went wrong")
      console.error(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-900 p-6 rounded-lg border border-gray-800">
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Contact Information</h2>
        <p className="text-sm text-gray-400">Add your store's contact details and location</p>
      </div>

      {/* Email Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Email Address</label>
        <div className="relative">
          <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            type="email"
            value={formData.email || ""}
            onChange={(e) => handleChange("email", e.target.value)}
            placeholder="Enter email address"
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Phone Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Phone Number</label>
        <div className="relative">
          <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <Input
            value={formData.phone || ""}
            onChange={(e) => handleChange("phone", e.target.value)}
            placeholder="Enter phone number"
            className="pl-10 bg-gray-800 border-gray-700 text-white"
          />
        </div>
      </div>

      {/* Division & District */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Division</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={formData.division || ""}
              onChange={(e) => handleChange("division", e.target.value)}
              placeholder="Enter division"
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">District</label>
          <div className="relative">
            <Building2 className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={formData.district || ""}
              onChange={(e) => handleChange("district", e.target.value)}
              placeholder="Enter district"
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Thana & Road No */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Thana</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={formData.thana || ""}
              onChange={(e) => handleChange("thana", e.target.value)}
              placeholder="Enter thana"
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-200">Road No</label>
          <div className="relative">
            <Home className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
            <Input
              value={formData.roadNo || ""}
              onChange={(e) => handleChange("roadNo", e.target.value)}
              placeholder="Enter road number"
              className="pl-10 bg-gray-800 border-gray-700 text-white"
            />
          </div>
        </div>
      </div>

      {/* Full Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-200">Full Address</label>
        <div className="relative">
          <MapPin className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
          <textarea
            value={formData.fullAddress || ""}
            onChange={(e) => handleChange("fullAddress", e.target.value)}
            placeholder="Enter complete address"
            className="w-full pl-10 bg-gray-800 border-gray-700 text-white rounded-md p-2 min-h-[100px]"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="flex justify-end">
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Updating..." : "Update Contact Details"}
        </Button>
      </div>
    </form>
  )
} 