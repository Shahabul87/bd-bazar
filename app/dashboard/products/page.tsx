"use client"

import { Plus, Search } from "lucide-react"
import Image from "next/image"

const products = [
  {
    id: "1",
    name: "Wireless Headphones",
    image: "https://picsum.photos/seed/1/200/200",
    price: 299.99,
    stock: 45,
    category: "Electronics",
    status: "In Stock"
  },
  {
    id: "2",
    name: "Smart Watch",
    image: "https://picsum.photos/seed/2/200/200",
    price: 199.99,
    stock: 12,
    category: "Electronics",
    status: "Low Stock"
  },
  {
    id: "3",
    name: "Laptop Stand",
    image: "https://picsum.photos/seed/3/200/200",
    price: 89.99,
    stock: 0,
    category: "Accessories",
    status: "Out of Stock"
  }
]

export default function ProductsPage() {
  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Products</h1>
        <button className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
          <Plus className="h-4 w-4" />
          Add Product
        </button>
      </div>

      <div className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="relative flex-1">
          <Search className="h-4 w-4 absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Search products..."
            className="w-full pl-10 pr-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <select className="border rounded-md px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500">
          <option>All Categories</option>
          <option>Electronics</option>
          <option>Accessories</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
            <div className="relative h-48">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-4">
              <h3 className="font-medium">{product.name}</h3>
              <p className="text-lg font-bold mt-1">${product.price}</p>
              <div className="flex items-center justify-between mt-4">
                <span className="text-sm text-gray-600">
                  Stock: {product.stock}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  product.status === "In Stock" 
                    ? "bg-green-100 text-green-800"
                    : product.status === "Low Stock"
                    ? "bg-yellow-100 text-yellow-800"
                    : "bg-red-100 text-red-800"
                }`}>
                  {product.status}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 