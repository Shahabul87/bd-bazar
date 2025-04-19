import { Package } from "lucide-react"

interface StoreInfoProps {
  storeName: string
}

export const StoreInfo = ({ storeName }: StoreInfoProps) => {
  return (
    <div className="pt-8 border-t border-gray-800">
      <h3 className="text-lg font-medium text-white mb-4">Sold by</h3>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
          <Package className="h-6 w-6 text-gray-400" />
        </div>
        <div>
          <p className="font-medium text-white">{storeName}</p>
          <p className="text-sm text-gray-400">Member since 2023</p>
        </div>
      </div>
    </div>
  )
} 