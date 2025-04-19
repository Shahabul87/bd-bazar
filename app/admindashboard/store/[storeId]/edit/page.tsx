import { notFound, redirect } from "next/navigation"
import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { StoreTypeSelector } from "../../_components/store-type-selector"
import { AddressForm } from "../../_components/address-form"

export default async function EditStorePage({ params }: { params: { storeId: string } }) {
  const user = await currentUser()
  
  if (!user) {
    redirect("/auth/login")
  }

  const store = await db.store.findUnique({
    where: {
      id: params.storeId,
      userId: user.id
    },
    select: {
      id: true,
      name: true,
      type: true,
      businessType: true,
      phone: true,
      division: true,
      district: true,
      thana: true,
      roadNo: true,
      fullAddress: true,
    }
  })

  if (!store) {
    return notFound()
  }

  return (
    <div className="max-w-5xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Edit Store</h1>
        <p className="text-gray-400 mt-2">Update your store information</p>
      </div>

      <div className="grid gap-6">
        {/* Store Type Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Store Details</h2>
          <StoreTypeSelector 
            defaultValues={{
              name: store.name,
              type: store.type,
              businessType: store.businessType || ""
            }}
            onChange={(values) => {
              // Handle the change event
              console.log(values);
            }}
          />
        </div>

        {/* Contact & Address Section */}
        <div>
          <h2 className="text-xl font-semibold text-white mb-4">Contact & Location</h2>
          <AddressForm 
            defaultValues={{
              phone: store.phone || "",
              division: store.division || "",
              district: store.district || "",
              thana: store.thana || "",
              roadNo: store.roadNo || "",
              fullAddress: store.fullAddress || ""
            }}
          />
        </div>
      </div>
    </div>
  )
} 