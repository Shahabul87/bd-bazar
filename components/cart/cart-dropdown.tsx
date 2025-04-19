"use client"

import { useState, useRef, useEffect } from 'react'
import { ShoppingCart, X, Plus, Minus, Trash } from 'lucide-react'
import { useCart } from '@/contexts/CartContext'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice } from '@/lib/format'

export const CartDropdown = () => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const { items, removeFromCart, updateQuantity, cartCount } = useCart()

  // Calculate total
  const total = items.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Cart Icon */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="relative group"
      >
        <ShoppingCart className="h-6 w-6 text-gray-600 dark:text-gray-200 
          transition-all duration-200 group-hover:text-green-500
          drop-shadow-sm hover:drop-shadow-lg" />
        {cartCount > 0 && (
          <span className="absolute -top-1 -right-1 h-5 w-5 
            bg-gradient-to-r from-green-500 to-emerald-500
            text-white text-xs rounded-full flex items-center justify-center 
            font-medium animate-pulse shadow-lg">
            {cartCount}
          </span>
        )}
      </button>

      {/* Cart Dropdown */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-96 bg-white dark:bg-gray-800 rounded-lg shadow-xl 
          border border-gray-200 dark:border-gray-700 z-50">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-white">Shopping Cart</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-500 dark:hover:text-gray-300"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
              </div>
            ) : (
              <>
                <div className="space-y-4 max-h-96 overflow-auto">
                  {items.map((item) => (
                    <div 
                      key={item.id}
                      className="flex items-center gap-4 p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg"
                    >
                      {/* Product Image */}
                      <div className="relative h-16 w-16 rounded-md overflow-hidden bg-gray-200 dark:bg-gray-600">
                        {item.image ? (
                          <Image
                            src={item.image}
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        ) : (
                          <ShoppingCart className="h-8 w-8 m-4 text-gray-400" />
                        )}
                      </div>

                      {/* Product Details */}
                      <div className="flex-1">
                        <h4 className="text-sm font-medium text-gray-900 dark:text-white">{item.name}</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{formatPrice(item.price)}</p>
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => updateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded-md hover:bg-gray-200 dark:hover:bg-gray-600"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      {/* Remove Button */}
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                      >
                        <Trash className="h-5 w-5" />
                      </button>
                    </div>
                  ))}
                </div>

                {/* Cart Footer */}
                <div className="mt-4 pt-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-base font-medium text-gray-900 dark:text-white">Total</span>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                      {formatPrice(total)}
                    </span>
                  </div>
                  
                  <div className="space-y-2">
                    <Link
                      href="/checkout"
                      className="block w-full px-4 py-2 text-center text-white text-sm font-medium 
                        bg-gradient-to-r from-green-500 to-emerald-600 
                        hover:from-green-600 hover:to-emerald-700
                        rounded-lg shadow transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      Checkout
                    </Link>
                    <Link
                      href="/cart"
                      className="block w-full px-4 py-2 text-center text-sm font-medium 
                        text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 
                        hover:bg-gray-200 dark:hover:bg-gray-600
                        rounded-lg transition-colors"
                      onClick={() => setIsOpen(false)}
                    >
                      View Cart
                    </Link>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  )
} 