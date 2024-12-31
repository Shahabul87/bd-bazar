"use client"

import { useState } from "react"
import { Upload, Palette, Layout, Globe, Image as ImageIcon } from "lucide-react"
import Image from "next/image"

interface StorefrontCustomizationProps {
  onCustomize: () => void
}

interface CustomizationSection {
  id: string
  title: string
  description: string
  icon: any
  status: "complete" | "incomplete" | "pending"
}

const sections: CustomizationSection[] = [
  {
    id: "branding",
    title: "Logo & Branding",
    description: "Upload store logo and set brand colors",
    icon: Upload,
    status: "complete"
  },
  {
    id: "theme",
    title: "Theme Settings",
    description: "Customize your store's look and feel",
    icon: Palette,
    status: "incomplete"
  },
  {
    id: "layout",
    title: "Homepage Layout",
    description: "Arrange sections and featured content",
    icon: Layout,
    status: "pending"
  },
  {
    id: "seo",
    title: "SEO Settings",
    description: "Optimize for search engines",
    icon: Globe,
    status: "incomplete"
  }
]

const getStatusColor = (status: CustomizationSection["status"]) => {
  switch (status) {
    case "complete":
      return "text-green-400 bg-green-900"
    case "incomplete":
      return "text-yellow-400 bg-yellow-900"
    case "pending":
      return "text-blue-400 bg-blue-900"
    default:
      return "text-gray-400 bg-gray-900"
  }
}

export const StorefrontCustomization = ({ onCustomize }: StorefrontCustomizationProps) => {
  const [currentBanner] = useState<string>("https://picsum.photos/seed/store/1200/400")

  return (
    <div className="space-y-6">
      {/* Current Banner Preview */}
      <div className="bg-gray-900 rounded-xl overflow-hidden border border-gray-700">
        <div className="relative h-[200px]">
          <Image
            src={currentBanner}
            alt="Store banner"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <button
              onClick={onCustomize}
              className="px-4 py-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-lg text-white hover:bg-white/20 transition flex items-center gap-2"
            >
              <ImageIcon className="h-4 w-4" />
              Change Banner
            </button>
          </div>
        </div>
      </div>

      {/* Customization Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sections.map((section) => (
          <div
            key={section.id}
            onClick={onCustomize}
            className="bg-gray-900 p-6 rounded-xl border border-gray-700 hover:bg-gray-800 transition cursor-pointer"
          >
            <div className="flex items-start gap-4">
              <div className={`p-3 rounded-lg ${getStatusColor(section.status)}`}>
                <section.icon className="h-6 w-6" />
              </div>
              <div className="flex-1">
                <h3 className="font-medium text-white">{section.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{section.description}</p>
              </div>
              <div className={`px-2.5 py-1 rounded-full text-xs ${getStatusColor(section.status)}`}>
                {section.status}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Tips */}
      <div className="bg-blue-900/50 border border-blue-800 p-4 rounded-lg">
        <h4 className="font-medium text-blue-300 mb-2">Customization Tips</h4>
        <ul className="text-sm text-blue-200 space-y-1 list-disc list-inside">
          <li>Use high-quality images for your store banner (recommended size: 1200x400px)</li>
          <li>Ensure your brand colors are consistent across all sections</li>
          <li>Keep your homepage layout clean and easy to navigate</li>
          <li>Add relevant meta descriptions for better SEO</li>
        </ul>
      </div>
    </div>
  )
} 