"use client"

import { useState } from "react"
import { X, Plus, Minus, Search } from "lucide-react"
import Image from "next/image"

interface Product {
  id: string
  name: string
  price: number
  image: string
}

interface OrderItem {
  product: Product
  quantity: number
}

interface AddOrderModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (data: any) => void
}

const mockProducts: Product[] = [
  {
    id: "PROD-001",
    name: "Wireless Headphones",
    price: 299.99,
    image: "https://picsum.photos/seed/1/40/40"
  },
  {
    id: "PROD-002",
    name: "Smart Watch",
    price: 199.99,
    image: "https://picsum.photos/seed/2/40/40"
  }
]

export const AddOrderModal = ({
  isOpen,
  onClose,
  onSubmit
}: AddOrderModalProps) => {
  const [orderItems, setOrderItems] = useState<OrderItem[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    email: "",
    phone: "",
    address: ""
  })

  if (!isOpen) return null

  const addProduct = (product: Product) => {
    const existingItem = orderItems.find(item => item.product.id === product.id)
    if (existingItem) {
      setOrderItems(orderItems.map(item =>
        item.product.id === product.id
          ? { ...item, quantity: item.quantity + 1 }
          : item
      ))
    } else {
      setOrderItems([...orderItems, { product, quantity: 1 }])
    }
  }

  const updateQuantity = (productId: string, newQuantity: number) => {
    if (newQuantity < 1) {
      setOrderItems(orderItems.filter(item => item.product.id !== productId))
    } else {
      setOrderItems(orderItems.map(item =>
        item.product.id === productId
          ? { ...item, quantity: newQuantity }
          : item
      ))
    }
  }

  const calculateTotal = () => {
    return orderItems.reduce((total, item) => 
      total + (item.product.price * item.quantity), 0
    )
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit({
      customer: customerInfo,
      items: orderItems,
      total: calculateTotal(),
      status: "pending",
      date: new Date().toISOString()
    })
  }

  const filteredProducts = mockProducts.filter(product =>
    product.name.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto text-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold">Add New Order</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-700 rounded-full text-gray-400">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Customer Information */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Customer Information</h3>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Name</label>
                <input
                  type="text"
                  value={customerInfo.name}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Email</label>
                <input
                  type="email"
                  value={customerInfo.email}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, email: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Phone</label>
                <input
                  type="tel"
                  value={customerInfo.phone}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, phone: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2 text-gray-300">Address</label>
                <input
                  type="text"
                  value={customerInfo.address}
                  onChange={(e) => setCustomerInfo(prev => ({ ...prev, address: e.target.value }))}
                  className="w-full p-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white"
                  required
                />
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="bg-gray-900 p-4 rounded-lg space-y-4">
            <h3 className="font-medium">Products</h3>
            
            {/* Product Search */}
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 text-white placeholder-gray-400"
              />
            </div>

            {/* Product List */}
            <div className="grid grid-cols-2 gap-4">
              {filteredProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-3 border border-gray-700 rounded-lg hover:bg-gray-700 cursor-pointer"
                  onClick={() => addProduct(product)}
                >
                  <div className="flex items-center gap-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      width={40}
                      height={40}
                      className="rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{product.name}</p>
                      <p className="text-sm text-gray-400">${product.price}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Selected Products */}
            {orderItems.length > 0 && (
              <div className="mt-4 space-y-3">
                <h4 className="font-medium text-sm text-gray-300">Selected Products</h4>
                {orderItems.map((item) => (
                  <div key={item.product.id} className="flex items-center justify-between p-3 border border-gray-700 rounded-lg">
                    <div className="flex items-center gap-3">
                      <Image
                        src={item.product.image}
                        alt={item.product.name}
                        width={40}
                        height={40}
                        className="rounded-lg"
                      />
                      <div>
                        <p className="font-medium">{item.product.name}</p>
                        <p className="text-sm text-gray-400">${item.product.price}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-600 rounded-full"
                      >
                        <Minus className="h-4 w-4" />
                      </button>
                      <span>{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-600 rounded-full"
                      >
                        <Plus className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="flex justify-between pt-4 border-t border-gray-700">
                  <span className="font-medium">Total</span>
                  <span className="font-medium">${calculateTotal().toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
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
              Create Order
            </button>
          </div>
        </form>
      </div>
    </div>
  )
} 