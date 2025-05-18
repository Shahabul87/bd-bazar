"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Save, ArrowLeft, Tag, AlertCircle } from "lucide-react";
import Link from "next/link";

// Common category examples for quick selection
const CATEGORY_EXAMPLES = [
  { main: "Electronics", sub: "Smartphones", final: "Android" },
  { main: "Electronics", sub: "Laptops", final: "Gaming" },
  { main: "Fashion", sub: "Men", final: "T-shirts" },
  { main: "Fashion", sub: "Women", final: "Dresses" },
  { main: "Home", sub: "Kitchen", final: "Appliances" },
  { main: "Beauty", sub: "Skincare", final: "Moisturizers" },
  { main: "Toys", sub: "Educational", final: "STEM" },
  { main: "Sports", sub: "Fitness", final: "Yoga" },
];

interface NewCategoryFormProps {
  storeId: string;
}

export const NewCategoryForm = ({ storeId }: NewCategoryFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedExample, setSelectedExample] = useState<number | null>(null);
  const [formData, setFormData] = useState({
    mainCategory: "",
    subCategory: "",
    finalCategory: "",
    description: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      // Check if main category exists
      if (!formData.mainCategory.trim()) {
        throw new Error("Main category is required");
      }

      // Create slug from category parts
      const slug = `${formData.mainCategory.toLowerCase().replace(/\s+/g, '-')}${
        formData.subCategory ? `-${formData.subCategory.toLowerCase().replace(/\s+/g, '-')}` : ''
      }${
        formData.finalCategory ? `-${formData.finalCategory.toLowerCase().replace(/\s+/g, '-')}` : ''
      }`;

      // Prepare data for API
      const categoryData = {
        ...formData,
        slug,
        storeId,
      };

      // Call API to create category
      const response = await fetch(`/api/stores/${storeId}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(categoryData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Failed to create category");
      }

      // Navigate back to categories page
      router.push(`/dashboard/stores/${storeId}/categories`);
      router.refresh();
    } catch (err) {
      console.error("Error creating category:", err);
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const handleExampleClick = (index: number) => {
    setSelectedExample(index);
    setFormData({
      mainCategory: CATEGORY_EXAMPLES[index].main,
      subCategory: CATEGORY_EXAMPLES[index].sub,
      finalCategory: CATEGORY_EXAMPLES[index].final,
      description: formData.description,
    });
  };

  return (
    <div>
      <Link 
        href={`/dashboard/stores/${storeId}/categories`}
        className="inline-flex items-center text-sm text-gray-500 hover:text-emerald-600 mb-6"
      >
        <ArrowLeft size={16} className="mr-1" />
        Back to categories
      </Link>

      {/* Category examples */}
      <div className="mb-8">
        <div className="flex items-center mb-3">
          <Tag className="h-5 w-5 text-emerald-600 mr-2" />
          <h3 className="text-gray-700 font-medium">Quick templates</h3>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-3">
          {CATEGORY_EXAMPLES.map((example, index) => (
            <motion.button
              key={index}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className={`p-3 rounded-lg border text-left hover:border-emerald-400 transition-colors ${
                selectedExample === index 
                  ? "border-emerald-500 bg-emerald-50" 
                  : "border-gray-200"
              }`}
              onClick={() => handleExampleClick(index)}
            >
              <div className="font-medium">{example.main}</div>
              <div className="text-sm text-gray-600">
                {example.sub} › {example.final}
              </div>
            </motion.button>
          ))}
        </div>
      </div>

      {/* Error message if any */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start">
          <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 mr-2 flex-shrink-0" />
          <div className="text-red-800 text-sm">{error}</div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-xl border shadow-sm">
        {/* Main Category Field */}
        <div>
          <label htmlFor="mainCategory" className="block mb-2 text-sm font-medium text-gray-700">
            Main Category <span className="text-red-500">*</span>
          </label>
          <input
            id="mainCategory"
            type="text"
            value={formData.mainCategory}
            onChange={(e) => setFormData({ ...formData, mainCategory: e.target.value })}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="e.g. Electronics, Fashion, Home"
          />
          <p className="mt-1 text-xs text-gray-500">
            Main product category (required)
          </p>
        </div>

        {/* Sub Category Field */}
        <div>
          <label htmlFor="subCategory" className="block mb-2 text-sm font-medium text-gray-700">
            Sub Category
          </label>
          <input
            id="subCategory"
            type="text"
            value={formData.subCategory}
            onChange={(e) => setFormData({ ...formData, subCategory: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="e.g. Smartphones, Men's Clothing, Kitchen"
          />
          <p className="mt-1 text-xs text-gray-500">
            Secondary category level (optional)
          </p>
        </div>

        {/* Final Category Field */}
        <div>
          <label htmlFor="finalCategory" className="block mb-2 text-sm font-medium text-gray-700">
            Final Category
          </label>
          <input
            id="finalCategory"
            type="text"
            value={formData.finalCategory}
            onChange={(e) => setFormData({ ...formData, finalCategory: e.target.value })}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="e.g. Android Phones, T-shirts, Blenders"
          />
          <p className="mt-1 text-xs text-gray-500">
            Most specific category level (optional)
          </p>
        </div>

        {/* Description Field */}
        <div>
          <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
            placeholder="Describe this category to help customers find your products"
          ></textarea>
        </div>

        {/* Form Actions */}
        <div className="flex items-center justify-end space-x-4 pt-4 border-t">
          <button
            type="button"
            onClick={() => router.push(`/dashboard/stores/${storeId}/categories`)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 text-sm font-medium text-white bg-emerald-600 rounded-lg hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 flex items-center ${
              isLoading ? "opacity-70 cursor-not-allowed" : ""
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                Create Category
              </>
            )}
          </button>
        </div>
      </form>

      {/* Preview Card */}
      <div className="mt-10">
        <h3 className="text-lg font-medium text-gray-900 mb-3">Category Preview</h3>
        <div className="p-5 border rounded-lg bg-white shadow-sm">
          <div className="flex items-center mb-4">
            <div className="p-2 bg-emerald-100 rounded-lg mr-3">
              <Tag className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <div className="font-medium">{formData.mainCategory || 'Main Category'}</div>
              {(formData.subCategory || formData.finalCategory) && (
                <div className="text-sm text-gray-600">
                  {formData.subCategory || 'Sub Category'}
                  {formData.finalCategory && ` › ${formData.finalCategory}`}
                </div>
              )}
            </div>
          </div>
          
          {formData.description && (
            <div className="text-sm text-gray-600 mt-2">
              {formData.description}
            </div>
          )}
          
          {formData.mainCategory && (
            <div className="mt-4 text-xs font-mono bg-gray-100 px-2 py-1 rounded inline-block">
              /{formData.mainCategory.toLowerCase().replace(/\s+/g, '-')}
              {formData.subCategory && `-${formData.subCategory.toLowerCase().replace(/\s+/g, '-')}`}
              {formData.finalCategory && `-${formData.finalCategory.toLowerCase().replace(/\s+/g, '-')}`}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}; 