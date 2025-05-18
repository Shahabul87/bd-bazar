"use client"

import { useState } from "react"
import { toast } from "sonner"
import axios from "axios"

// Comprehensive category structure
const SAMPLE_CATEGORIES = {
  "Electronics & Technology": {
    "Smartphones & Accessories": ["iPhones", "Samsung Galaxy", "Google Pixel", "OnePlus", "Xiaomi", "Phone Cases", "Screen Protectors", "Chargers", "Power Banks", "Phone Stands"],
    "Computers & Laptops": ["Gaming Laptops", "Business Laptops", "Chromebooks", "Desktop PCs", "All-in-One PCs", "PC Components", "Monitors", "Keyboards", "Mouse", "Storage Devices"],
    "Audio Equipment": ["Headphones", "Earbuds", "Speakers", "Sound Bars", "Microphones", "Amplifiers", "Record Players", "Car Audio", "Professional Audio", "Home Theater Systems"],
    "Cameras & Photography": ["DSLR Cameras", "Mirrorless Cameras", "Action Cameras", "Security Cameras", "Lenses", "Camera Bags", "Tripods", "Lighting Equipment", "Memory Cards", "Camera Accessories"],
    "Gaming & Entertainment": ["Gaming Consoles", "Video Games", "Gaming Accessories", "VR Headsets", "Gaming Chairs", "Gaming Monitors", "Controllers", "Gaming Headsets", "Streaming Devices", "Gaming PCs"],
    "Smart Home Devices": ["Smart Speakers", "Security Systems", "Smart Lighting", "Thermostats", "Doorbell Cameras", "Smart Locks", "Smart Plugs", "Home Automation", "Smart Displays", "Smart Appliances"],
    "Wearable Technology": ["Smartwatches", "Fitness Trackers", "Smart Glasses", "Smart Rings", "Smart Clothing", "Health Monitors", "GPS Trackers", "Smart Jewelry", "Sports Watches", "Activity Bands"],
    "Networking Equipment": ["Routers", "Modems", "WiFi Extenders", "Network Switches", "Network Cards", "Ethernet Cables", "Antennas", "Network Tools", "Firewalls", "Access Points"],
    "Office Electronics": ["Printers", "Scanners", "Projectors", "Video Conferencing", "Label Makers", "Paper Shredders", "Calculators", "Office Phones", "Binding Machines", "Laminators"],
    "TV & Video": ["Smart TVs", "Media Players", "TV Mounts", "Projector Screens", "TV Accessories", "Streaming Devices", "DVD/Blu-ray Players", "Remote Controls", "TV Antennas", "AV Receivers"]
  },
  "Fashion & Apparel": {
    "Men's Clothing": ["Shirts", "Pants", "Suits", "Jackets", "T-Shirts", "Sweaters", "Activewear", "Underwear", "Socks", "Swimwear"],
    "Women's Clothing": ["Dresses", "Tops", "Skirts", "Pants", "Blouses", "Sweaters", "Activewear", "Lingerie", "Swimwear", "Outerwear"],
    "Kids' Clothing": ["Boys' Clothing", "Girls' Clothing", "Baby Clothes", "School Uniforms", "Kids' Activewear", "Children's Shoes", "Kids' Accessories", "Baby Accessories", "Kids' Outerwear", "Kids' Sleepwear"],
    "Footwear": ["Sneakers", "Formal Shoes", "Boots", "Sandals", "Athletic Shoes", "Casual Shoes", "Slippers", "Dress Shoes", "Work Boots", "Outdoor Shoes"],
    "Accessories": ["Bags", "Wallets", "Belts", "Hats", "Scarves", "Gloves", "Sunglasses", "Watches", "Jewelry", "Hair Accessories"],
    "Sportswear": ["Athletic Shirts", "Sports Pants", "Gym Wear", "Running Gear", "Yoga Clothes", "Sports Bras", "Compression Wear", "Team Uniforms", "Sports Jackets", "Athletic Socks"],
    "Formal Wear": ["Evening Gowns", "Tuxedos", "Formal Suits", "Cocktail Dresses", "Formal Shirts", "Formal Pants", "Wedding Attire", "Formal Accessories", "Formal Shoes", "Formal Bags"],
    "Seasonal Clothing": ["Summer Wear", "Winter Clothing", "Spring Fashion", "Fall Apparel", "Beach Wear", "Rain Gear", "Snow Wear", "Holiday Clothing", "Festival Wear", "Seasonal Accessories"],
    "Ethnic Wear": ["Traditional Dresses", "Cultural Clothing", "Festival Wear", "Wedding Attire", "Ethnic Jewelry", "Traditional Footwear", "Cultural Accessories", "Ceremonial Clothing", "Religious Wear", "Traditional Fabrics"],
    "Fashion Collections": ["Designer Wear", "Luxury Brands", "Vintage Collection", "Sustainable Fashion", "Limited Editions", "Signature Collections", "Runway Fashion", "Celebrity Collections", "Exclusive Lines", "Fashion Sets"]
  }
  
  // ... Add 8 more main categories with similar structure
};

interface ProductCategorySelectorProps {
  value: {
    main: string;
    sub: string;
    final: string;
  };
  onChange: (category: { main: string; sub: string; final: string }) => void;
  onSpecificationsChange?: (specs: any) => void;
  productId: string;
}

export const ProductCategorySelector = ({
  value,
  onChange,
  onSpecificationsChange,
  productId
}: ProductCategorySelectorProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isManualInput, setIsManualInput] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState({
    mainCategory: value.main,
    subCategory: value.sub,
    finalCategory: value.final
  })

  const handleSubmit = async () => {
    try {
      setIsLoading(true)

      if (!selectedCategory.mainCategory) {
        toast.error("Main category is required")
        return
      }

      console.log("Submitting category:", selectedCategory) // Debug log

      const response = await axios.patch(`/api/products/${productId}/category`, {
        mainCategory: selectedCategory.mainCategory,
        subCategory: selectedCategory.subCategory || null,
        finalCategory: selectedCategory.finalCategory || null
      })

      if (response.data) {
        toast.success("Category updated successfully")
        onChange({
          main: selectedCategory.mainCategory,
          sub: selectedCategory.subCategory || "",
          final: selectedCategory.finalCategory || ""
        })
        setIsEditing(false)
      } else {
        throw new Error("No response data")
      }
    } catch (error) {
      console.error("Category update error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to update category")
    } finally {
      setIsLoading(false)
    }
  }

  // Get available subcategories for selected main category
  const getSubCategories = () => {
    if (!selectedCategory.mainCategory) return [];
    return Object.keys(SAMPLE_CATEGORIES[selectedCategory.mainCategory as keyof typeof SAMPLE_CATEGORIES] || {});
  }

  // Get available final categories for selected sub category
  const getFinalCategories = () => {
    if (!selectedCategory.mainCategory || !selectedCategory.subCategory) return [];
    const mainCat = SAMPLE_CATEGORIES[selectedCategory.mainCategory as keyof typeof SAMPLE_CATEGORIES];
    return mainCat?.[selectedCategory.subCategory as keyof typeof mainCat] || [];
  }

  return (
    <div className="mt-6 border border-gray-800 rounded-lg bg-gray-900 shadow-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Product Category
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Select or manually enter your product category
          </p>
        </div>
        <div className="space-x-3">
          <button
            onClick={() => {
              setIsEditing(!isEditing)
              setIsManualInput(false)
            }}
            className="px-4 py-2 text-sm font-medium rounded-md transition-colors
              hover:bg-gray-800 border border-gray-700 text-gray-300 hover:text-white"
          >
            {isEditing ? "Cancel" : "Edit"}
          </button>
          {isEditing && (
            <button
              onClick={() => setIsManualInput(!isManualInput)}
              className="px-4 py-2 text-sm font-medium rounded-md transition-colors
                bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white"
            >
              {isManualInput ? "Use Selection" : "Manual Input"}
            </button>
          )}
        </div>
      </div>

      {isEditing ? (
        <div className="mt-6 space-y-6">
          {isManualInput ? (
            // Manual Input Fields
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Category
                </label>
                <input
                  type="text"
                  value={selectedCategory.mainCategory}
                  onChange={(e) => setSelectedCategory({
                    mainCategory: e.target.value,
                    subCategory: "",
                    finalCategory: ""
                  })}
                  className="w-full px-4 py-2 rounded-md border border-gray-700 
                    bg-gray-800 text-gray-100 placeholder-gray-500
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter main category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Sub Category (Optional)
                </label>
                <input
                  type="text"
                  value={selectedCategory.subCategory}
                  onChange={(e) => setSelectedCategory({
                    ...selectedCategory,
                    subCategory: e.target.value,
                    finalCategory: ""
                  })}
                  className="w-full px-4 py-2 rounded-md border border-gray-700 
                    bg-gray-800 text-gray-100 placeholder-gray-500
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter sub category"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Final Category (Optional)
                </label>
                <input
                  type="text"
                  value={selectedCategory.finalCategory}
                  onChange={(e) => setSelectedCategory({
                    ...selectedCategory,
                    finalCategory: e.target.value
                  })}
                  className="w-full px-4 py-2 rounded-md border border-gray-700 
                    bg-gray-800 text-gray-100 placeholder-gray-500
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  placeholder="Enter final category"
                />
              </div>
            </>
          ) : (
            // Selection Dropdowns
            <>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Main Category
                </label>
                <select
                  value={selectedCategory.mainCategory}
                  onChange={(e) => setSelectedCategory({
                    mainCategory: e.target.value,
                    subCategory: "",
                    finalCategory: ""
                  })}
                  className="w-full px-4 py-2 rounded-md border border-gray-700 
                    bg-gray-800 text-gray-100
                    focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                >
                  <option value="" className="bg-gray-900">Select Main Category</option>
                  {Object.keys(SAMPLE_CATEGORIES).map((cat) => (
                    <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                  ))}
                </select>
              </div>

              {selectedCategory.mainCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Sub Category
                  </label>
                  <select
                    value={selectedCategory.subCategory}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      subCategory: e.target.value,
                      finalCategory: ""
                    })}
                    className="w-full px-4 py-2 rounded-md border border-gray-700 
                      bg-gray-800 text-gray-100
                      focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" className="bg-gray-900">Select Sub Category</option>
                    {getSubCategories().map((subCat) => (
                      <option key={subCat} value={subCat} className="bg-gray-900">{subCat}</option>
                    ))}
                  </select>
                </div>
              )}

              {selectedCategory.subCategory && (
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Final Category
                  </label>
                  <select
                    value={selectedCategory.finalCategory}
                    onChange={(e) => setSelectedCategory({
                      ...selectedCategory,
                      finalCategory: e.target.value
                    })}
                    className="w-full px-4 py-2 rounded-md border border-gray-700 
                      bg-gray-800 text-gray-100
                      focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  >
                    <option value="" className="bg-gray-900">Select Final Category</option>
                    {getFinalCategories().map((finalCat) => (
                      <option key={finalCat} value={finalCat} className="bg-gray-900">{finalCat}</option>
                    ))}
                  </select>
                </div>
              )}
            </>
          )}

          <button
            onClick={handleSubmit}
            disabled={isLoading}
            className="w-full px-4 py-2 text-sm font-medium rounded-md transition-colors
              bg-blue-600 hover:bg-blue-700 text-white disabled:opacity-50
              disabled:cursor-not-allowed disabled:hover:bg-blue-600"
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Saving...
              </span>
            ) : "Save Category"}
          </button>
        </div>
      ) : (
        <div className="mt-4">
          <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-2 md:space-y-0">
            <div className="px-4 py-2 rounded-md bg-blue-900/50 border border-blue-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-blue-400">Main:</span>{" "}
                <span className="text-gray-100">{value.main || "Not set"}</span>
              </p>
            </div>

            {value.sub && (
              <div className="px-4 py-2 rounded-md bg-purple-900/50 border border-purple-800">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-purple-400">Sub:</span>{" "}
                  <span className="text-gray-100">{value.sub}</span>
                </p>
              </div>
            )}

            {value.final && (
              <div className="px-4 py-2 rounded-md bg-emerald-900/50 border border-emerald-800">
                <p className="text-sm text-gray-300">
                  <span className="font-medium text-emerald-400">Final:</span>{" "}
                  <span className="text-gray-100">{value.final}</span>
                </p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 