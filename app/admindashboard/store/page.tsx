import { db } from "@/lib/db"
import { auth } from "@/auth"
import { StoreList } from "./_components/store-list"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Plus } from "lucide-react"

export default async function StoresPage() {
  const session = await auth()

  const stores = await db.store.findMany({
    where: {
      userId: session?.user?.id
    },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    },
    orderBy: {
      createdAt: 'desc'
    }
  })

  return (
    <div className="p-6">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-bold">
            <span className="bg-gradient-to-r from-blue-400 to-purple-600 text-transparent bg-clip-text">
              My Stores ({stores.length})
            </span>
          </h1>
          <p className="text-sm text-gray-400">Manage your store settings and configurations</p>
        </div>
        <Link href="/admindashboard/store/new">
          <Button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4" />
            Create Store
          </Button>
        </Link>
      </div>

      <StoreList stores={stores} />
    </div>
  )
} 