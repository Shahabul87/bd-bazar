"use client"

import Image from "next/image"
import { formatPrice } from "@/lib/format"

interface OrderSummaryProps {
  items: any[];
  total: number;
}

export const OrderSummary = ({ items, total }: OrderSummaryProps) => {
  return (
    <div className="bg-gray-900 p-6 rounded-lg h-fit lg:sticky lg:top-8">
      <h2 className="text-lg font-medium text-white mb-4">Order Summary</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.id} className="flex gap-4">
            <div className="relative h-20 w-20 rounded-lg overflow-hidden bg-gray-800">
              {item.image ? (
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-gray-400">No image</span>
                </div>
              )}
            </div>
            <div className="flex-1">
              <h3 className="text-white font-medium">{item.name}</h3>
              <p className="text-gray-400">Quantity: {item.quantity}</p>
              <p className="text-white">{formatPrice(item.price)}</p>
            </div>
          </div>
        ))}
        
        <div className="border-t border-gray-800 pt-4 mt-4">
          <div className="flex justify-between text-gray-400">
            <span>Subtotal</span>
            <span>{formatPrice(total)}</span>
          </div>
          <div className="flex justify-between text-gray-400 mt-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>
          <div className="flex justify-between text-white text-lg font-medium mt-4">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
      </div>
    </div>
  )
} 