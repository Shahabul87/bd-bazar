import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// Add type for the expected request body
interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number | string;
  sku?: string;
  categoryId?: string;
  active?: boolean;
  featured?: boolean;
  stock?: number;
  brand?: string;
  status?: string;
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // Await all async operations together
    const [user, values, { productId }] = await Promise.all([
      currentUser(),
      req.json() as Promise<UpdateProductPayload>,
      Promise.resolve(params) // Convert params to a Promise to use with Promise.all
    ])

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get the existing product first
    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 })
    }

    // Update the product with new values
    const product = await db.product.update({
      where: {
        id: productId,
        userId: user.id
      },
      data: {
        // Update category if provided
        ...(values.categoryId && {
          categoryId: values.categoryId
        }),
        // Update other fields if provided
        ...(values.name && { name: values.name }),
        ...(values.description && { description: values.description }),
        ...(values.price && { price: parseFloat(values.price) }),
        ...(values.sku && { sku: values.sku }),
        ...(typeof values.active !== 'undefined' && { active: Boolean(values.active) }),
        ...(typeof values.featured !== 'undefined' && { featured: Boolean(values.featured) }),
        ...(typeof values.stock !== 'undefined' && { stock: parseInt(values.stock) }),
        ...(values.brand && { brand: values.brand }),
        ...(values.status && { status: values.status }),
        updatedAt: new Date()
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    if (error instanceof Error) {
      console.error("[PRODUCT_ID_PATCH]", error.message)
    } else {
      console.error("[PRODUCT_ID_PATCH]", "Unknown error occurred")
    }
    return new NextResponse("Internal Error", { status: 500 })
  }
} 