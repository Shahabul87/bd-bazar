"use client"

import { ChevronLeft, ChevronRight, Clock } from "lucide-react"
import { useState } from "react"
import Image from "next/image"

interface ActivePromotion {
  id: string
  name: string
  image: string
  endDate: string
  metrics: {
    sales: number
    orders: number
  }
}

const activePromotions: ActivePromotion[] = [
  {
    id: "1",
    name: "Spring Collection Sale",
    image: "https://picsum.photos/seed/promo1/800/400",
    endDate: "2024-04-15",
    metrics: {
      sales: 24500,
      orders: 156
    }
  },
  {
    id: "2",
    name: "Easter Special Deals",
    image: "https://picsum.photos/seed/promo2/800/400",
    endDate: "2024-04-01",
    metrics: {
      sales: 18750,
      orders: 94
    }
  }
]

export const ActivePromotionsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev === activePromotions.length - 1 ? 0 : prev + 1
    )
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev === 0 ? activePromotions.length - 1 : prev - 1
    )
  }

  const daysUntilEnd = (endDate: string) => {
    const diff = new Date(endDate).getTime() - new Date().getTime()
    return Math.ceil(diff / (1000 * 60 * 60 * 24))
  }

  return (
    <div className="bg-gray-900 rounded-xl shadow-sm border border-gray-800 overflow-hidden">
      <div className="relative h-[300px]">
        <Image
          src={activePromotions[currentIndex].image}
          alt={activePromotions[currentIndex].name}
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
        
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/50 hover:bg-gray-900/70 transition"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-gray-900/50 hover:bg-gray-900/70 transition"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
          <h3 className="text-xl font-bold mb-2">
            {activePromotions[currentIndex].name}
          </h3>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm">
                {daysUntilEnd(activePromotions[currentIndex].endDate)} days remaining
              </span>
            </div>
            <div className="flex gap-4 text-sm">
              <span>
                ${activePromotions[currentIndex].metrics.sales.toLocaleString()} sales
              </span>
              <span>
                {activePromotions[currentIndex].metrics.orders} orders
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 