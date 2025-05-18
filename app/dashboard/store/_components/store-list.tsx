"use client"

import { Store } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { 
  Store as StoreIcon, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight,
  Package,
  Plus,
  Building2
} from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface ExtendedStore extends Store {
  _count: {
    products: number
  }
}

interface StoreListProps {
  stores: ExtendedStore[]
}

export const StoreList = ({
  stores
}: StoreListProps) => {
  if (stores.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 rounded-lg border border-gray-800">
        <div className="p-4 bg-blue-500/10 rounded-full mb-4">
          <Building2 className="h-10 w-10 text-blue-500" />
        </div>
        <h2 className="text-xl font-semibold text-white mb-2">No stores found</h2>
        <p className="text-gray-400 mb-6">Get started by creating your first store</p>
        <Link href="/admindashboard/store/new">
          <Button className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600">
            <Plus className="h-4 w-4" />
            Create Store
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {stores.map((store) => (
        <Card 
          key={store.id} 
          className="group relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 border-gray-800 p-6 hover:border-gray-700 transition duration-300"
        >
          {/* Glowing effect on hover */}
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          
          <Link href={`/admindashboard/store/${store.id}`}>
            <div className="relative">
              <div className="flex items-center gap-4 mb-6">
                <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl group-hover:from-blue-500/30 group-hover:to-blue-600/30 transition duration-300">
                  <StoreIcon className="h-6 w-6 text-blue-500" />
                </div>
                <div>
                  <h3 className="font-semibold text-lg text-white group-hover:text-blue-400 transition">
                    {store.name}
                  </h3>
                  <p className="text-sm text-gray-400">
                    {store.type === "store" ? "Retail Store" : "Service Store"}
                  </p>
                </div>
              </div>

              <div className="space-y-3 mb-6">
                {store.email && (
                  <div className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition">
                    <Mail className="h-4 w-4 text-gray-500" />
                    {store.email}
                  </div>
                )}
                {store.phone && (
                  <div className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition">
                    <Phone className="h-4 w-4 text-gray-500" />
                    {store.phone}
                  </div>
                )}
                {store.fullAddress && (
                  <div className="flex items-center gap-3 text-sm text-gray-400 group-hover:text-gray-300 transition">
                    <MapPin className="h-4 w-4 text-gray-500" />
                    {store.fullAddress}
                  </div>
                )}
                <div className={cn(
                  "flex items-center gap-3 text-sm font-medium",
                  store._count.products > 0 
                    ? "text-emerald-500" 
                    : "text-yellow-500"
                )}>
                  <Package className="h-4 w-4" />
                  {store._count.products} {store._count.products === 1 ? 'Product' : 'Products'}
                </div>
              </div>

              <div className="flex items-center justify-between text-sm pt-4 border-t border-gray-800">
                <span className="text-gray-400">
                  Created {new Date(store.createdAt).toLocaleDateString()}
                </span>
                <div className="flex items-center text-blue-500 group-hover:text-blue-400 transition">
                  Manage Store
                  <ArrowRight className="h-4 w-4 ml-1 transform group-hover:translate-x-1 transition" />
                </div>
              </div>
            </div>
          </Link>
        </Card>
      ))}
    </div>
  )
} 