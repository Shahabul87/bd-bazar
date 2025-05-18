import { db } from "@/lib/db"
import { currentUser } from "@/lib/auth"
import { MainHeader } from "@/app/(homepage)/main-header"
import { Store, MapPin, Phone, Mail, Globe, Clock, Package } from "lucide-react"
import Link from "next/link"
import { ProductCard } from "@/components/product-card"
import { formatPrice } from "@/lib/format"

interface StorePageProps {
  params: Promise<{
    storeId: string
  }>
}

export default async function StorePage({ 
  params,
}: StorePageProps) {
  try {
    const { storeId } = await params

    const [user, store] = await Promise.all([
      currentUser(),
      db.store.findUnique({
        where: { 
          id: String(storeId)
        },
        include: {
          products: {
            include: {
              images: true,
              categories: true,
            },
            orderBy: {
              createdAt: 'desc'
            }
          },
          _count: {
            select: {
              products: true,
            }
          }
        }
      })
    ])

    if (!store) {
      return (
        <div className="min-h-screen bg-gray-950 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-white mb-2">Store not found</h1>
            <p className="text-gray-400">The store you're looking for doesn't exist.</p>
            <Link 
              href="/"
              className="mt-4 inline-block text-blue-500 hover:text-blue-400"
            >
              Return to home
            </Link>
          </div>
        </div>
      )
    }

    return (
      <div className="min-h-screen bg-gray-950">
        <MainHeader />

        {/* Store Header */}
        <div className="relative">
          {/* Cover Image */}
          <div className="h-64 bg-gradient-to-r from-blue-600 to-blue-800">
            {store.coverImage && (
              <img
                src={store.coverImage}
                alt={store.name}
                className="w-full h-full object-cover opacity-50"
              />
            )}
          </div>

          {/* Store Info Card */}
          <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div className="relative -mt-32">
              <div className="bg-gray-900 rounded-lg shadow-xl p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Store Logo */}
                  <div className="w-32 h-32 rounded-lg bg-gray-800 flex items-center justify-center shadow-lg">
                    {store.logo ? (
                      <img
                        src={store.logo}
                        alt={store.name}
                        className="w-full h-full rounded-lg object-cover"
                      />
                    ) : (
                      <Store className="w-16 h-16 text-gray-600" />
                    )}
                  </div>

                  {/* Store Details */}
                  <div className="flex-1">
                    <h1 className="text-3xl font-bold text-white mb-2">
                      {store.name}
                    </h1>
                    <p className="text-gray-400 mb-4 max-w-2xl">
                      {store.description || "No description available"}
                    </p>

                    {/* Store Stats */}
                    <div className="flex gap-6 text-sm text-gray-400">
                      <div>
                        <span className="font-semibold text-white">
                          {store._count.products}
                        </span> Products
                      </div>
                    </div>
                  </div>

                  {/* Contact Info */}
                  <div className="bg-gray-800/50 rounded-lg p-4 space-y-3 min-w-[250px]">
                    {store.fullAddress && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <MapPin className="h-4 w-4" />
                        <span>{store.fullAddress}</span>
                      </div>
                    )}
                    {store.phone && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Phone className="h-4 w-4" />
                        <span>{store.phone}</span>
                      </div>
                    )}
                    {store.email && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Mail className="h-4 w-4" />
                        <span>{store.email}</span>
                      </div>
                    )}
                    {store.website && (
                      <div className="flex items-center gap-2 text-gray-400">
                        <Globe className="h-4 w-4" />
                        <Link href={store.website} className="hover:text-white">
                          {store.website}
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Store Content */}
        <div className="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Products Grid */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-white mb-6">Products</h2>
            {store.products.length === 0 ? (
              <div className="text-center py-12 bg-gray-900 rounded-lg">
                <Package className="h-12 w-12 text-gray-600 mx-auto mb-4" />
                <p className="text-gray-400">No products available</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
                {store.products.map((product) => (
                  <ProductCard
                    key={product.id}
                    data={{
                      id: product.id,
                      name: product.name,
                      price: Number(product.price),
                      images: product.images,
                      category: product.categories[0]?.name,
                      inStock: product.inStock,
                      stockCount: product.stockCount
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Store Hours */}
          {store.businessHours && (
            <div className="bg-gray-900 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                <Clock className="h-5 w-5" />
                Business Hours
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {Object.entries(store.businessHours).map(([day, hours]) => (
                  <div key={day} className="flex justify-between text-gray-400">
                    <span className="capitalize">{day}</span>
                    <span>{hours || 'Closed'}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    )

  } catch (error) {
    console.error('Error loading store:', error instanceof Error ? error.message : 'Unknown error')
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-white mb-2">Something went wrong</h1>
          <p className="text-gray-400">Failed to load store information.</p>
          <Link 
            href="/"
            className="mt-4 inline-block text-blue-500 hover:text-blue-400"
          >
            Return to home
          </Link>
        </div>
      </div>
    )
  }
} 