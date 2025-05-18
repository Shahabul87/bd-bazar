"use client"

import { useState } from "react"
import { X, Upload, Palette, Layout, Globe, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface CustomizeStoreModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (customizations: any) => void
}

interface CustomizationForm {
  logo: File | null
  logoPreview: string | null
  theme: "light" | "dark"
  primaryColor: string
  secondaryColor: string
  bannerImage: File | null
  bannerPreview: string | null
  navigation: {
    label: string
    link: string
  }[]
  seo: {
    title: string
    description: string
    keywords: string
  }
}

export const CustomizeStoreModal = ({
  isOpen,
  onClose,
  onSubmit
}: CustomizeStoreModalProps) => {
  const [form, setForm] = useState<CustomizationForm>({
    logo: null,
    logoPreview: null,
    theme: "dark",
    primaryColor: "#3B82F6",
    secondaryColor: "#1E40AF",
    bannerImage: null,
    bannerPreview: null,
    navigation: [
      { label: "Home", link: "/" },
      { label: "Shop", link: "/shop" },
      { label: "Categories", link: "/categories" },
      { label: "About", link: "/about" }
    ],
    seo: {
      title: "",
      description: "",
      keywords: ""
    }
  })

  if (!isOpen) return null

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: 'logo' | 'banner') => {
    const file = e.target.files?.[0]
    if (file) {
      const preview = URL.createObjectURL(file)
      if (type === 'logo') {
        setForm(prev => ({ ...prev, logo: file, logoPreview: preview }))
      } else {
        setForm(prev => ({ ...prev, bannerImage: file, bannerPreview: preview }))
      }
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(form)
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Customize Store</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Logo Upload */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Store Logo</h3>
            <div className="flex items-center gap-4">
              {form.logoPreview ? (
                <div className="relative w-20 h-20">
                  <Image
                    src={form.logoPreview}
                    alt="Store logo"
                    fill
                    className="rounded-lg object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => setForm(prev => ({ ...prev, logo: null, logoPreview: null }))}
                    className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="w-20 h-20 border-2 border-dashed border-gray-700 rounded-lg flex items-center justify-center">
                  <input
                    type="file"
                    onChange={(e) => handleImageUpload(e, 'logo')}
                    accept="image/*"
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload" className="cursor-pointer">
                    <Upload className="h-6 w-6 text-gray-400" />
                  </label>
                </div>
              )}
              <div className="text-sm text-gray-400">
                <p>Recommended size: 200x200px</p>
                <p>Max file size: 2MB</p>
              </div>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Theme Settings</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Theme Mode</label>
                <select
                  value={form.theme}
                  onChange={(e) => setForm(prev => ({ ...prev, theme: e.target.value as "light" | "dark" }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Primary Color</label>
                <input
                  type="color"
                  value={form.primaryColor}
                  onChange={(e) => setForm(prev => ({ ...prev, primaryColor: e.target.value }))}
                  className="w-full h-10 rounded-lg cursor-pointer"
                />
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Navigation Links</h3>
            {form.navigation.map((item, index) => (
              <div key={index} className="grid grid-cols-2 gap-4">
                <input
                  type="text"
                  value={item.label}
                  onChange={(e) => {
                    const newNav = [...form.navigation]
                    newNav[index].label = e.target.value
                    setForm(prev => ({ ...prev, navigation: newNav }))
                  }}
                  placeholder="Label"
                  className="p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
                <input
                  type="text"
                  value={item.link}
                  onChange={(e) => {
                    const newNav = [...form.navigation]
                    newNav[index].link = e.target.value
                    setForm(prev => ({ ...prev, navigation: newNav }))
                  }}
                  placeholder="Link"
                  className="p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
            ))}
          </div>

          {/* SEO Settings */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">SEO Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Meta Title</label>
                <input
                  type="text"
                  value={form.seo.title}
                  onChange={(e) => setForm(prev => ({ ...prev, seo: { ...prev.seo, title: e.target.value } }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Meta Description</label>
                <textarea
                  value={form.seo.description}
                  onChange={(e) => setForm(prev => ({ ...prev, seo: { ...prev.seo, description: e.target.value } }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  rows={3}
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Keywords</label>
                <input
                  type="text"
                  value={form.seo.keywords}
                  onChange={(e) => setForm(prev => ({ ...prev, seo: { ...prev.seo, keywords: e.target.value } }))}
                  placeholder="Separate keywords with commas"
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                />
              </div>
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
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 