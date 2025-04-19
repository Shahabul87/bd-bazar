"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Trash2, Plus, Minus, BookmarkPlus, Share2, Package } from "lucide-react"
import { formatPrice } from "@/lib/format"
import { useCart } from "@/hooks/use-cart"
import { Checkbox } from "@/components/ui/checkbox"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export default function CartPage() {
  const cart = useCart()
  const router = useRouter()
  const [mounted, setMounted] = useState(false)
  const [selectedItems, setSelectedItems] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setMounted(true)
    console.log("Cart items:", cart.items)
  }, [cart.items])

  if (!mounted) {
    return null
  }

  const total = cart.items.reduce((acc, item) => {
    return acc + (item.price * item.quantity)
  }, 0)

  const handleSelect = (itemId: string) => {
    setSelectedItems(prev => 
      prev.includes(itemId) 
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    )
  }

  const CartItem = ({ data }: { data: any }) => {
    const cart = useCart();

    return (
      <div className="flex py-6 border-b border-gray-700">
        <div className="relative h-24 w-24 rounded-md overflow-hidden sm:h-32 sm:w-32 bg-gray-800">
          {data.image ? (
            <Image
              fill
              src={data.image}
              alt={data.name || "Product image"}
              className="object-cover object-center"
              sizes="(max-width: 768px) 100px, 150px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <Package className="h-8 w-8 text-gray-400" />
            </div>
          )}
        </div>
        {/* Rest of the cart item JSX remains the same */}
      </div>
    );
  };

  const handleCheckout = async () => {
    try {
      setIsLoading(true)

      // Validate cart has items
      if (cart.items.length === 0) {
        return toast.error("Your cart is empty")
      }

      // Validate items are selected
      if (selectedItems.length === 0) {
        return toast.error("Please select items to checkout")
      }

      // Get selected items and total
      const checkoutItems = cart.items.filter(item => 
        selectedItems.includes(item.id)
      )

      const checkoutTotal = checkoutItems.reduce((total, item) => 
        total + (item.price * item.quantity), 0
      )

      // Store checkout data
      localStorage.setItem('checkoutItems', JSON.stringify(checkoutItems))
      localStorage.setItem('checkoutTotal', checkoutTotal.toString())

      // Navigate to checkout
      router.push('/checkout')
      
    } catch (error) {
      console.error("[CHECKOUT_ERROR]", error)
      toast.error("Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-950">
      {/* Header */}
      <div className="border-b border-gray-800">
        <div className="max-w-[2000px] mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-white">
            Shopping Cart ({cart.items.length})
          </h1>
        </div>
      </div>

      <div className="max-w-[2000px] mx-auto px-4 py-6">
        {cart.items.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">Your cart is empty</p>
          </div>
        ) : (
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Cart Table */}
            <div className="flex-grow">
              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {/* Table Header */}
                <div className="grid grid-cols-12 gap-4 p-4 border-b border-gray-800 text-sm font-medium text-gray-400">
                  <div className="col-span-1">Select</div>
                  <div className="col-span-2">Product</div>
                  <div className="col-span-5">Details</div>
                  <div className="col-span-2">Price</div>
                  <div className="col-span-2">Actions</div>
                </div>

                {/* Table Body */}
                <div className="divide-y divide-gray-800">
                  {cart.items.map((item) => (
                    <div key={item.id} className="grid grid-cols-12 gap-4 p-4 items-center">
                      {/* Select */}
                      <div className="col-span-1">
                        <Checkbox 
                          checked={selectedItems.includes(item.id)}
                          onCheckedChange={() => handleSelect(item.id)}
                        />
                      </div>

                      {/* Product Image */}
                      <div className="col-span-2">
                        <Link href={`/products/${item.productId}`}>
                          <div className="aspect-square relative rounded-lg overflow-hidden bg-gray-800">
                            {item.image ? (
                              <Image
                                src={item.image || '/placeholder.jpg'}
                                alt={item.name}
                                fill
                                className="object-cover"
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <span className="text-gray-500">No image</span>
                              </div>
                            )}
                          </div>
                        </Link>
                      </div>

                      {/* Product Details */}
                      <div className="col-span-5 space-y-2">
                        <Link 
                          href={`/products/${item.productId}`}
                          className="font-medium text-white hover:text-blue-400 transition-colors line-clamp-2"
                        >
                          {item.name}
                        </Link>
                        <div className="space-y-1 text-sm">
                          <p className="text-green-500">In Stock</p>
                          <p className="text-gray-400">
                            FREE delivery in 2-3 business days
                          </p>
                          <p className="text-blue-400 cursor-pointer">
                            FREE Returns
                          </p>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="col-span-2">
                        <p className="text-xl font-bold text-white">
                          {formatPrice(item.price)}
                        </p>
                      </div>

                      {/* Actions */}
                      <div className="col-span-2 flex flex-col items-center justify-center space-y-3 w-full px-2">
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-center w-full bg-gray-800 rounded-lg">
                          <button 
                            onClick={() => cart.updateQuantity(item.id, Math.max(1, item.quantity - 1))}
                            className="p-2 hover:bg-gray-700 rounded-l-lg"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-white px-4">{item.quantity}</span>
                          <button 
                            onClick={() => cart.updateQuantity(item.id, item.quantity + 1)}
                            className="p-2 hover:bg-gray-700 rounded-r-lg"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Additional Actions */}
                        <div className="flex items-center justify-center gap-2 w-full">
                          <button
                            onClick={() => cart.removeItem(item.id)}
                            className="flex items-center gap-1.5 text-red-500 hover:text-red-400 text-sm px-2 py-1 rounded hover:bg-gray-800"
                          >
                            <Trash2 className="h-4 w-4" />
                            <span>Remove</span>
                          </button>
                          
                          <div className="flex items-center gap-2">
                            <button 
                              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 text-sm px-2 py-1 rounded hover:bg-gray-800"
                            >
                              <BookmarkPlus className="h-4 w-4" />
                              <span>Save</span>
                            </button>
                            <button 
                              className="flex items-center gap-1.5 text-gray-400 hover:text-gray-300 text-sm px-2 py-1 rounded hover:bg-gray-800"
                            >
                              <Share2 className="h-4 w-4" />
                              <span>Share</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Table Footer with Subtotal */}
                <div className="p-4 border-t border-gray-800 flex justify-end">
                  <div className="text-right">
                    <p className="text-gray-400">Subtotal ({cart.items.length} items)</p>
                    <p className="text-xl font-bold text-white">{formatPrice(total)}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Subtotal Card */}
            <div className="lg:w-80">
              <div className="bg-gray-900 p-6 rounded-lg sticky top-4">
                <h2 className="text-lg font-medium text-white mb-4">
                  Subtotal ({cart.items.length} items): {formatPrice(total)}
                </h2>
                <button 
                  onClick={handleCheckout}
                  disabled={isLoading || selectedItems.length === 0}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
                >
                  {isLoading ? "Processing..." : "Proceed to Checkout"}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 