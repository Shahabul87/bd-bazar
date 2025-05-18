import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const [user, values] = await Promise.all([
      currentUser(),
      req.json()
    ])

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const productId = params.productId
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 })
    }

    console.log("Received category data:", values) // Debug log

    // First, find or create the category
    let category = await db.productCategory.findFirst({
      where: {
        mainCategory: values.mainCategory,
        subCategory: values.subCategory || null,
        finalCategory: values.finalCategory || null,
      }
    })

    if (!category) {
      // Create new category if it doesn't exist
      category = await db.productCategory.create({
        data: {
          mainCategory: values.mainCategory,
          subCategory: values.subCategory || null,
          finalCategory: values.finalCategory || null,
          slug: `${values.mainCategory}${values.subCategory ? `-${values.subCategory}` : ''}${values.finalCategory ? `-${values.finalCategory}` : ''}`
        }
      })
    }

    console.log("Category:", category) // Debug log

    // Update the product with the new category
    const product = await db.product.update({
      where: {
        id: productId,
        userId: user.id
      },
      data: {
        categories: {
          set: [], // First clear existing categories
          connect: {
            id: category.id
          }
        }
      },
      include: {
        categories: true
      }
    })

    console.log("Updated product:", product) // Debug log

    // Convert price to number before returning
    const formattedProduct = {
      ...product,
      price: Number(product.price),
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.log("Error details:", {
      message: error instanceof Error ? error.message : "Unknown error",
      error
    })
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to update category",
        details: error instanceof Error ? error.message : "Unknown error"
      }), 
      { status: 500 }
    )
  }
}