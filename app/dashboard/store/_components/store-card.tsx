import { Store } from "@prisma/client"
import { Card } from "@/components/ui/card"
import { 
  Store as StoreIcon, 
  MapPin, 
  Phone, 
  Mail,
  ArrowRight
} from "lucide-react"
import Link from "next/link"

interface StoreCardProps {
  store: Store
}

export const StoreCard = ({
  store
}: StoreCardProps) => {
  return (
    <Card className="bg-gray-900 border-gray-800 p-4 hover:border-gray-700 transition">
      <Link href={`/admindashboard/store/${store.id}`}>
        <div className="flex items-center gap-4 mb-4">
          <div className="p-2 bg-blue-500/10 rounded-full">
            <StoreIcon className="h-6 w-6 text-blue-500" />
          </div>
          <div>
            <h3 className="font-semibold text-white">{store.name}</h3>
            <p className="text-sm text-gray-400">
              {store.type === "store" ? "Retail Store" : "Service Store"}
            </p>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          {store.email && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Mail className="h-4 w-4" />
              {store.email}
            </div>
          )}
          {store.phone && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <Phone className="h-4 w-4" />
              {store.phone}
            </div>
          )}
          {store.fullAddress && (
            <div className="flex items-center gap-2 text-sm text-gray-400">
              <MapPin className="h-4 w-4" />
              {store.fullAddress}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-400">
            Created {new Date(store.createdAt).toLocaleDateString()}
          </span>
          <div className="flex items-center text-blue-500 hover:text-blue-400">
            Manage Store
            <ArrowRight className="h-4 w-4 ml-1" />
          </div>
        </div>
      </Link>
    </Card>
  )
} 