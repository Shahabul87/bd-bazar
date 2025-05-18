"use client"

import { useState } from "react"
import { ArrowLeft, Globe, Search, Share2, AlertCircle } from "lucide-react"
import { useRouter } from "next/navigation"

interface MetaTag {
  id: string
  type: string
  content: string
}

export default function SeoSettingsPage() {
  const router = useRouter()
  const [metaTags, setMetaTags] = useState<MetaTag[]>([
    { id: "title", type: "title", content: "My Store - Best Products Online" },
    { id: "desc", type: "description", content: "Shop the best products at great prices" }
  ])

  const addMetaTag = () => {
    const newTag: MetaTag = {
      id: `tag-${metaTags.length + 1}`,
      type: "",
      content: ""
    }
    setMetaTags([...metaTags, newTag])
  }

  const removeMetaTag = (id: string) => {
    setMetaTags(metaTags.filter(tag => tag.id !== id))
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
          <h1 className="text-2xl font-bold">SEO Settings</h1>
          <p className="text-gray-400">Optimize your store for search engines</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Basic SEO Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Basic SEO Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Site Title</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter site title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <textarea
                rows={3}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter meta description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Keywords</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter keywords, separated by commas"
              />
            </div>
          </div>
        </div>

        {/* Social Media */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Social Media</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Open Graph Title</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter Open Graph title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Open Graph Description</label>
              <textarea
                rows={3}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="Enter Open Graph description"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Default Share Image</label>
              <div className="flex items-center gap-2">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  id="share-image"
                />
                <label
                  htmlFor="share-image"
                  className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600 cursor-pointer"
                >
                  Upload Image
                </label>
                <span className="text-sm text-gray-400">Recommended size: 1200x630px</span>
              </div>
            </div>
          </div>
        </div>

        {/* Advanced Settings */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <h2 className="text-lg font-medium mb-4">Advanced Settings</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Robots.txt Content</label>
              <textarea
                rows={5}
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white font-mono text-sm"
                placeholder="Enter robots.txt content"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Canonical URL Format</label>
              <input
                type="text"
                className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                placeholder="https://example.com/product/{slug}"
              />
            </div>
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="auto_canonical"
                className="rounded bg-gray-700 border-gray-600 text-blue-500 focus:ring-blue-500"
              />
              <label htmlFor="auto_canonical" className="text-sm">
                Automatically generate canonical URLs
              </label>
            </div>
          </div>
        </div>

        {/* Structured Data */}
        <div className="bg-gray-900 rounded-xl border border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium">Structured Data</h2>
            <button
              onClick={addMetaTag}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Add Meta Tag
            </button>
          </div>
          <div className="space-y-4">
            {metaTags.map((tag) => (
              <div key={tag.id} className="flex gap-4">
                <select
                  value={tag.type}
                  onChange={(e) => {
                    const newTags = metaTags.map(t =>
                      t.id === tag.id ? { ...t, type: e.target.value } : t
                    )
                    setMetaTags(newTags)
                  }}
                  className="w-1/3 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                >
                  <option value="">Select type</option>
                  <option value="title">Title</option>
                  <option value="description">Description</option>
                  <option value="keywords">Keywords</option>
                  <option value="author">Author</option>
                </select>
                <input
                  type="text"
                  value={tag.content}
                  onChange={(e) => {
                    const newTags = metaTags.map(t =>
                      t.id === tag.id ? { ...t, content: e.target.value } : t
                    )
                    setMetaTags(newTags)
                  }}
                  className="flex-1 p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  placeholder="Enter content"
                />
                <button
                  onClick={() => removeMetaTag(tag.id)}
                  className="p-2 text-red-400 hover:text-red-300"
                >
                  Remove
                </button>
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