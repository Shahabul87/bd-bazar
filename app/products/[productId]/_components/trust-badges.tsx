import { Shield, TruckIcon } from "lucide-react"

export const TrustBadges = () => {
  return (
    <div className="grid grid-cols-2 gap-4 pt-8 border-t border-gray-800">
      <div className="flex items-start gap-3">
        <Shield className="h-6 w-6 text-blue-400" />
        <div>
          <h3 className="font-medium text-white">Secure Payment</h3>
          <p className="text-sm text-gray-400">100% secure payment</p>
        </div>
      </div>
      <div className="flex items-start gap-3">
        <TruckIcon className="h-6 w-6 text-blue-400" />
        <div>
          <h3 className="font-medium text-white">Fast Delivery</h3>
          <p className="text-sm text-gray-400">2-3 business days</p>
        </div>
      </div>
    </div>
  )
} 