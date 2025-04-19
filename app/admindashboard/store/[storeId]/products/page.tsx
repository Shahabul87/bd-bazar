import { ProductsClient } from "./_components/products-client"
import { currentUser } from '@/lib/auth'
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

// Helper function to serialize data
const serializeProduct = (product: any) => ({
  ...product,
  price: parseFloat(product.price.toString()),
  createdAt: product.createdAt.toISOString(),
  updatedAt: product.updatedAt.toISOString(),
  orderItems: product.orderItems.map((item: any) => ({
    ...item,
    price: parseFloat(item.price.toString()),
    createdAt: item.createdAt.toISOString(),
    updatedAt: item.updatedAt.toISOString(),
  })),
  reviews: product.reviews.map((review: any) => ({
    ...review,
    createdAt: review.createdAt.toISOString(),
    updatedAt: review.updatedAt.toISOString(),
  }))
});

interface ProductsPageProps {
  params: {
    storeId: string
  }
}

export default async function ProductsPage({ params }: ProductsPageProps) {
  const user = await currentUser()
  const { storeId } = await params

  if (!user?.id) {
    return redirect("/auth/login")
  }

  const rawProducts = await db.product.findMany({
    where: {
      userId: user.id,
      storeId: storeId
    },
    include: {
      categories: true,
      images: true,
      reviews: true,
      store: {
        select: {
          id: true,
          name: true,
        }
      },
      user: {
        select: {
          id: true,
          name: true,
          email: true,
        },
      },
      orderItems: true
    }
  })

  // Serialize the products data
  const serializedProducts = rawProducts.map(serializeProduct)

  return (
    <div className="p-6">
      <ProductsClient products={serializedProducts} storeId={storeId} />
    </div>
  )
} 