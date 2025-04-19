import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { formatPrice } from "@/lib/format"

interface ProductInfoProps {
  name: string
  price: number
  description: string
}

export const ProductInfo = ({ name, price, description }: ProductInfoProps) => {
  return (
    <div>
      <h1 className="text-3xl font-bold text-white mb-4">{name}</h1>
      <p className="text-2xl text-white mb-6">{formatPrice(price)}</p>
      <p className="text-gray-400">{description}</p>
    </div>
  )
} 