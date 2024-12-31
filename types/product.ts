export interface Product {
  id: string
  name: string
  slug: string
  description: string
  price: number
  sku: string
  image?: string
  category: string
  stock: number
  status: "active" | "inactive" | "draft"
  featured: boolean
  createdAt: string
  updatedAt: string
  variants?: ProductVariant[]
  seo?: {
    title: string
    description: string
    keywords: string
  }
}

export interface ProductVariant {
  id: string
  name: string
  sku: string
  price: number
  stock: number
  attributes: {
    [key: string]: string
  }
} 