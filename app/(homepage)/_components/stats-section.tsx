import { Card } from "@/components/ui/card"
import { ShoppingBag, Star, TrendingUp } from "lucide-react"

interface StatsSectionProps {
  totalProducts: number
  totalStores: number
  trendingCount: number
}

export const StatsSection = ({ totalProducts, totalStores, trendingCount }: StatsSectionProps) => {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <ShoppingBag className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <h2 className="text-2xl font-bold text-gray-200">{totalProducts}+</h2>
            </div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Star className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Active Stores</p>
              <h2 className="text-2xl font-bold text-gray-200">{totalStores}+</h2>
            </div>
          </div>
        </Card>
        <Card className="bg-gray-900 border-gray-800 p-6">
          <div className="flex items-center gap-4">
            <div className="p-3 bg-pink-500/10 rounded-xl">
              <TrendingUp className="h-6 w-6 text-pink-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Trending Items</p>
              <h2 className="text-2xl font-bold text-gray-200">{trendingCount}+</h2>
            </div>
          </div>
        </Card>
      </div>
    </section>
  )
} 