import { ProductForm } from "./_components/product-form"
import { currentUser } from '@/lib/auth'
import { db } from "@/lib/db"
import { redirect } from "next/navigation"

interface ProductPageProps {
  params: Promise<{
    productId: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { productId } = await params
  const user = await currentUser()

  if (!user?.id) {
    return redirect("/auth/login")
  }

  const product = await db.product.findUnique({
    where: {
      id: productId,
    },
    include: {
      categories: true,
      images: true,
      reviews: true,
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

  console.log(product)

  if (!product) {
    return redirect("/admindashboard/store/products")
  }

  const serializedProduct = {
    ...product,
    price: parseFloat(product.price.toString()),
    createdAt: product.createdAt.toISOString(),
    updatedAt: product.updatedAt.toISOString(),
    orderItems: product.orderItems.map(item => ({
      ...item,
      price: parseFloat(item.price.toString()),
      createdAt: item.createdAt.toISOString(),
      updatedAt: item.updatedAt.toISOString(),
    }))
  }

  return <ProductForm initialData={serializedProduct} productId={productId} />
} 