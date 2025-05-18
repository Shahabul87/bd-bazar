import { notFound } from "next/navigation"
import { db } from "@/lib/db"
import { StoreTypeSelector } from "../_components/store-type-selector"
import { StoreContactForm } from "../_components/store-contact-form"
import { StoreLocationMap } from "../_components/store-location-map"
import { AddProductModal } from "../_components/add-product-modal"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Package, ArrowLeft, Settings, MapPin, Mail, Phone } from "lucide-react"
import { Card } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface StorePageProps {
  params: {
    storeId: string
  }
}

const formatStoreType = (type: string | null) => {
  if (!type) return "Not specified";
  return type.replace('_', ' ');
}

const StorePage = async ({ params }: StorePageProps) => {
  const { storeId } = await params

  if (!storeId) {
    return notFound()
  }

  const store = await db.store.findUnique({
    where: {
      id: storeId
    },
    include: {
      _count: {
        select: {
          products: true
        }
      }
    }
  })

  if (!store) {
    return notFound()
  }

  const defaultValues = {
    name: store.name,
    type: store.type as "store" | "service_store" || "store",
    businessType: store.businessType || ""
  }

  const contactValues = {
    email: store.email || "",
    phone: store.phone || "",
    division: store.division || "",
    district: store.district || "",
    thana: store.thana || "",
    roadNo: store.roadNo || "",
    fullAddress: store.fullAddress || ""
  }

  // const locationValues = {
  //   latitude: store.latitude || undefined,
  //   longitude: store.longitude || undefined
  // }

  return (
    <div className="p-6 space-y-6 bg-gray-950">
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-4">
          <Link href="/admindashboard/store">
            <Button variant="outline" size="icon" className="rounded-full bg-gray-900 border-gray-800 hover:bg-gray-800">
              <ArrowLeft className="h-4 w-4 text-gray-300" />
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold">
              <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-500 text-transparent bg-clip-text">
                {store.name}
              </span>
            </h1>
            <p className="text-sm text-gray-400">Configure your store settings and manage products</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <AddProductModal storeId={storeId} />
          <Link href={`/admindashboard/store/${storeId}/products`}>
            <Button
              className="flex items-center gap-2 bg-gray-800 hover:bg-gray-700 text-gray-200"
            >
              <Package className="h-4 w-4" />
              View Products
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition">
          <div className="flex items-center gap-4 p-6">
            <div className="p-3 bg-blue-500/10 rounded-xl">
              <Package className="h-6 w-6 text-blue-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Total Products</p>
              <h2 className="text-2xl font-bold text-gray-200">{store._count.products}</h2>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition">
          <div className="flex items-center gap-4 p-6">
            <div className="p-3 bg-purple-500/10 rounded-xl">
              <Settings className="h-6 w-6 text-purple-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Store Type</p>
              <h2 className="text-xl font-bold text-gray-200 capitalize">
                {store.type?.replace('_', ' ') || 'Not specified'}
              </h2>
            </div>
          </div>
        </Card>

        <Card className="bg-gray-900 border-gray-800 hover:border-gray-700 transition">
          <div className="flex items-center gap-4 p-6">
            <div className="p-3 bg-indigo-500/10 rounded-xl">
              <MapPin className="h-6 w-6 text-indigo-500" />
            </div>
            <div>
              <p className="text-gray-400 text-sm">Location</p>
              <h2 className="text-lg font-bold text-gray-200">
                {store.district || "Not Set"}
              </h2>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid gap-6">
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">Store Type & Business</h2>
          <StoreTypeSelector 
            storeId={storeId}
            defaultValues={defaultValues}
          />
        </Card>
        
        <Card className="bg-gray-900 border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">Contact Information</h2>
          <StoreContactForm 
            storeId={storeId}
            defaultValues={contactValues}
          />
        </Card>

        {/* <Card className="bg-gray-900 border-gray-800 p-6">
          <h2 className="text-xl font-semibold text-gray-200 mb-6">Store Location</h2>
          <StoreLocationMap
            storeId={storeId}
            defaultValues={locationValues}
          />
        </Card> */}
      </div>
    </div>
  )
}

export default StorePage 