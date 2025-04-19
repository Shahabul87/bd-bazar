"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Phone } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface AddressFormProps {
  defaultValues: {
    phone: string;
    division: string;
    district: string;
    thana: string;
    roadNo: string;
    fullAddress: string;
  };
  onChange: (values: {
    phone: string;
    division: string;
    district: string;
    thana: string;
    roadNo: string;
    fullAddress: string;
  }) => void;
  onSubmit: () => void;
  isLoading?: boolean;
}

export function AddressForm({ defaultValues, onChange, onSubmit, isLoading = false }: AddressFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState(defaultValues)

  useEffect(() => {
    setFormData(defaultValues)
  }, [defaultValues])

  const handleChange = (field: string, value: string) => {
    const newFormData = {
      ...formData,
      [field]: value
    }
    setFormData(newFormData)
    onChange(newFormData)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit()
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-gray-800 p-6 rounded-lg">
      {/* Phone Number */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Phone Number</label>
        <div className="flex gap-2">
          <Phone className="w-5 h-5 text-gray-400" />
          <Input
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            placeholder="Enter phone number"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Address Fields */}
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Division</label>
          <Input
            value={formData.division}
            onChange={(e) => handleChange('division', e.target.value)}
            placeholder="Enter division"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">District</label>
          <Input
            value={formData.district}
            onChange={(e) => handleChange('district', e.target.value)}
            placeholder="Enter district"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Thana</label>
          <Input
            value={formData.thana}
            onChange={(e) => handleChange('thana', e.target.value)}
            placeholder="Enter thana"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Road No</label>
          <Input
            value={formData.roadNo}
            onChange={(e) => handleChange('roadNo', e.target.value)}
            placeholder="Enter road number"
            className="bg-gray-700 border-gray-600 text-white"
          />
        </div>
      </div>

      {/* Full Address */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-300">Full Address</label>
        <textarea
          value={formData.fullAddress}
          onChange={(e) => handleChange('fullAddress', e.target.value)}
          placeholder="Enter full address"
          className="w-full min-h-[100px] px-3 py-2 bg-gray-700 border border-gray-600 
            rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Submit Button */}
      <div className="flex justify-end gap-4">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
          className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          disabled={isLoading}
          className="bg-blue-600 text-white hover:bg-blue-700"
        >
          {isLoading ? "Creating..." : "Create Store"}
        </Button>
      </div>
    </form>
  )
} 