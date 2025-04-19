"use client"

import { Store as StoreIcon, Edit, Trash } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

interface StoreDetailsProps {
  store: {
    id: string;
    name: string;
    type: string;
    phone: string | null;
    division: string | null;
    district: string | null;
    thana: string | null;
    roadNo: string | null;
    fullAddress: string | null;
  }
}

export const StoreDetails = ({ store }: StoreDetailsProps) => {
  const router = useRouter()

  return (
    <div className="bg-gray-800 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gray-700 rounded-lg">
            <StoreIcon className="h-6 w-6 text-blue-500" />
          </div>
          <h2 className="text-xl font-semibold text-white">{store.name}</h2>
        </div>
        
        <div className="flex items-center gap-2">
          <Button
            onClick={() => router.push(`/admindashboard/store/${store.id}/edit`)}
            variant="outline"
            size="sm"
            className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 border-gray-600"
          >
            <Edit className="h-4 w-4" />
            Edit Store
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Store Details</h3>
          <div className="space-y-2">
            <p className="text-white">Type: {store.type === 'store' ? 'Retail Store' : 'Service Store'}</p>
            <p className="text-white">Phone: {store.phone || 'Not provided'}</p>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-400 mb-2">Location</h3>
          <div className="space-y-2">
            <p className="text-white">Division: {store.division || 'Not provided'}</p>
            <p className="text-white">District: {store.district || 'Not provided'}</p>
            <p className="text-white">Thana: {store.thana || 'Not provided'}</p>
            <p className="text-white">Road No: {store.roadNo || 'Not provided'}</p>
          </div>
        </div>
      </div>

      {store.fullAddress && (
        <div className="mt-4">
          <h3 className="text-sm font-medium text-gray-400 mb-2">Full Address</h3>
          <p className="text-white">{store.fullAddress}</p>
        </div>
      )}
    </div>
  )
} 