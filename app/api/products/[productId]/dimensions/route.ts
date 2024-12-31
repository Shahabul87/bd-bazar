import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const [user, values, { productId }] = await Promise.all([
      currentUser(),
      req.json(),
      Promise.resolve(params)
    ])

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    if (!Array.isArray(values.dimensions)) {
      return new NextResponse("Invalid dimensions format", { status: 400 })
    }

    const product = await db.product.update({
      where: {
        id: productId,
        userId: user.id
      },
      data: {
        dimensions: values.dimensions
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : "Unknown error occurred"

    console.error("[DIMENSIONS_UPDATE_ERROR]", {
      message: errorMessage,
      timestamp: new Date().toISOString()
    })

    return new NextResponse(
      JSON.stringify({
        error: "Failed to update dimensions",
        details: errorMessage
      }),
      { status: 500 }
    )
  }
} 