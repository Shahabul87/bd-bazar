import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Package } from "lucide-react"
import { formatPrice } from "@/lib/format"

interface TrendingProductsProps {
  products: any[]
}

export const TrendingProducts = ({ products }: TrendingProductsProps) => {
  return (
    <section className="py-12 px-6 bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Trending Now</h2>
            <p className="text-gray-400">Most popular products this week</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
            >
              <Card className="group bg-gray-900/50 backdrop-blur-sm border-gray-800 hover:border-gray-700 transition overflow-hidden">
                <div className="aspect-square relative bg-gray-800">
                  {product.images?.[0]?.url ? (
                    <img 
                      src={product.images[0].url}
                      alt={product.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Package className="h-12 w-12 text-gray-600" />
                    </div>
                  )}
                  <div className="absolute top-2 right-2 bg-purple-500 text-white text-xs px-2 py-1 rounded-full">
                    {product._count.orderItems} orders
                  </div>
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-200 group-hover:text-purple-400 transition">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-2">
                    {product.store?.name || "Unknown Store"}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-200 font-medium">
                      {formatPrice(product.price)}
                    </span>
                    {product.categories[0] && (
                      <span className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded-full">
                        {product.categories[0].mainCategory}
                      </span>
                    )}
                  </div>
                </div>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
} 