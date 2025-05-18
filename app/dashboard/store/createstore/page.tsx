import { redirect } from "next/navigation"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { StoreTypeSelector } from "../_components/store-type-selector"

export default async function CreateStorePage() {
  const user = await currentUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  // Fetch user's store data
  const store = await db.store.findFirst({
    where: {
      userId: user.id
    },
    select: {
      id: true,
      name: true,
      type: true,
      businessType: true
    }
  })

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">
          {store ? 'Update Store Details' : 'Create New Store'}
        </h1>
        <p className="text-gray-400 mt-2">
          {store ? 'Modify your store information' : 'Set up your store information'}
        </p>
      </div>

      <div className="grid gap-6">
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Store Details</h2>
          <StoreTypeSelector 
            defaultValues={store ? {
              name: store.name,
              type: store.type,
              businessType: store.businessType || ""
            } : undefined}
            storeId={store?.id}
          />
        </div>
      </div>
    </div>
  )
} 