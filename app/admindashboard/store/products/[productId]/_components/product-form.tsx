"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { ProductBasicInformation } from "./product-basic-information"
import { ProductImageUpload } from "./product-image-upload"
import { ProductCategorySelector } from "./product-category-selector"
import { Product } from "@prisma/client"
import { CategoryInput } from "../../_components/category-input"
import { ProductSpecification } from "./product-specification"
import { ProductDimensions } from "./product-dimensions"
import { ProductColors } from "./product-colors"

interface ProductFormProps {
  initialData: Product & {
    categories: any[];
    images: any[];
    reviews: any[];
    user: {
      id: string;
      name: string | null;
      email: string | null;
    };
    orderItems: any[];
  };
  productId: string;
}

export const ProductForm = ({
  initialData,
  productId
}: ProductFormProps) => {
  const router = useRouter()
  const [formData, setFormData] = useState({
    name: initialData.name,
    brand: initialData.brand,
    description: initialData.description,
    category: {
      main: initialData.categories?.[0]?.mainCategory || "",
      sub: initialData.categories?.[0]?.subCategory || "",
      final: initialData.categories?.[0]?.finalCategory || ""
    },
    price: initialData.price.toString(),
    sku: initialData.sku || "",
    stock: initialData.stock.toString(),
    images: [],
    imagePreviews: initialData.images.map((img: any) => img.url) || [],
    status: initialData.status as "active" | "draft",
    featured: initialData.featured
  })

  return (
    <div className="p-6 space-y-6 text-gray-100">
      <div className="flex items-center gap-4">
        <button onClick={() => router.back()} className="p-2 hover:bg-gray-700 rounded-full transition text-gray-200">
          <ArrowLeft className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-white">
            {initialData ? 'Edit Product' : 'Add New Product'}
          </h1>
          <p className="text-gray-400">
            {initialData ? 'Update product details' : 'Create a new product listing'}
          </p>
        </div>
      </div>

      <ProductBasicInformation
        initialData={formData}
        productId={productId}
      />

      <ProductCategorySelector
        value={formData.category}
        onChange={(category) => setFormData({ ...formData, category })}
        productId={productId}
      />

      <ProductSpecification
        initialData={initialData}
        productId={productId}
      />

      <ProductColors
        initialData={initialData}
        productId={productId}
      />

      <ProductDimensions
        initialData={initialData}
        productId={productId}
      />

      <ProductImageUpload
        initialData={formData}
        productId={productId}
      />
    </div>
  )
} 