import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const [user, values, paramsObj] = await Promise.all([
      currentUser(),
      req.json(),
      params
    ])

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { productId } = paramsObj
    const { colors } = values

    const product = await db.product.update({
      where: {
        id: productId,
        userId: user.id
      },
      data: {
        colors
      }
    })

    // Convert price to number before returning
    const formattedProduct = {
      ...product,
      price: Number(product.price),
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred"

    console.error("[COLORS_UPDATE_ERROR]", {
      message: errorMessage,
      timestamp: new Date().toISOString()
    })

    return new NextResponse(
      JSON.stringify({
        error: "Failed to update colors",
        details: errorMessage
      }),
      { status: 500 }
    )
  }
} 