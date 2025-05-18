import { Product } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { 
  Package,
  DollarSign,
  Archive,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

interface ProductCardProps {
  product: Product
}

export const ProductCard = ({
  product
}: ProductCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 p-4 hover:border-gray-700 transition">
      <Link href={`/admindashboard/store/${product.storeId}/products/${product.id}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <Package className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{product.name}</h3>
            <p className="text-sm text-gray-400">
              SKU: {product.sku || 'Not set'}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <DollarSign className="h-4 w-4" />
            Price: ${product.price.toString()}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <Archive className="h-4 w-4" />
            Stock: {product.stock}
          </div>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Added {new Date(product.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center text-blue-500 hover:text-blue-400">
            Manage Product
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </Link>
    </Card>
  )
} 