import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { ArrowRight, Package } from "lucide-react"
import { formatPrice } from "@/lib/format"

interface LatestProductsProps {
  products: any[]
}

export const LatestProducts = ({ products }: LatestProductsProps) => {
  return (
    <section className="py-12 px-6">
      <div className="max-w-8xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-white mb-2">Latest Products</h2>
            <p className="text-gray-400">Discover our newest additions</p>
          </div>
          <Button 
            variant="ghost" 
            className="text-gray-400 hover:text-white"
          >
            View All <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link 
              key={product.id} 
              href={`/products/${product.id}`}
            >
              <Card className="group bg-gray-900 border-gray-800 hover:border-gray-700 transition overflow-hidden">
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
                </div>
                <div className="p-4">
                  <h3 className="font-semibold text-gray-200 group-hover:text-blue-400 transition">
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
                      <span className="text-xs text-gray-400 bg-gray-800 px-2 py-1 rounded-full">
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