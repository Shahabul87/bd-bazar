"use client"

import { useState } from "react"
import { ArrowLeft, Upload, Palette, Globe, Mail, Phone } from "lucide-react"
import { useRouter } from "next/navigation"
import Image from "next/image"

export default function StoreSettingsPage() {
  const router = useRouter()
  const [logoPreview, setLogoPreview] = useState<string | null>(null)

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setLogoPreview(reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <div className="p-6 space-y-6 bg-gray-800 text-white">
      {/* Header */}
      <div className="flex items-center gap-4">
        <button
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-700 rounded-full transition"
        >
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold">Store Settings</h1>
          <p className="text-gray-400">Manage your store information and branding</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic Information */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Basic Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Store Name</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter store name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Description</label>
              <textarea
                rows={3}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter store description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Store Logo</label>
              <div className="flex items-center gap-4">
                {logoPreview ? (
                  <div className="relative w-20 h-20">
                    <Image
                      src={logoPreview}
                      alt="Store logo"
                      fill
                      className="rounded-lg object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-20 h-20 bg-gray-700 rounded-lg flex items-center justify-center">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  className="hidden"
                  id="logo-upload"
                />
                <label
                  htmlFor="logo-upload"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Upload Logo
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Information */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Contact Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Email Address</label>
              <input
                type="email"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter phone number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Business Address</label>
              <textarea
                rows={3}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter business address"
              />
            </div>
          </div>
        </div>

        {/* Branding */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Branding</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Primary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-20 bg-gray-700 rounded cursor-pointer"
                />
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="#000000"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Secondary Color</label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  className="h-10 w-20 bg-gray-700 rounded cursor-pointer"
                />
                <input
                  type="text"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="#000000"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Business Hours */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Business Hours</h2>
          <div className="space-y-4">
            {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map((day) => (
              <div key={day} className="flex items-center gap-4">
                <span className="w-24 text-sm">{day}</span>
                <select className="w-32 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                  <option>9:00 AM</option>
                  <option>10:00 AM</option>
                </select>
                <span>to</span>
                <select className="w-32 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white">
                  <option>5:00 PM</option>
                  <option>6:00 PM</option>
                </select>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
          Save Changes
        </button>
      </div>
    </div>
  )
} 