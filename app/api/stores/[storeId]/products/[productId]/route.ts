import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  context: { params: { storeId: string, productId: string } }
) {
  try {
    const { productId } = await context.params

    const product = await db.product.findUnique({
      where: {
        id: productId
      },
      include: {
        categories: true,
        images: true,
        store: {
          select: {
            name: true
          }
        }
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: { params: { storeId: string, productId: string } }
) {
  try {
    const session = await auth()
    const { storeId, productId } = await context.params
    const body = await req.json()

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: session.user.id
      }
    })

    if (!store) {
      return new NextResponse("Store not found", { status: 404 })
    }

    const product = await db.product.update({
      where: {
        id: productId
      },
      data: {
        ...body
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: { params: { storeId: string, productId: string } }
) {
  try {
    const session = await auth()
    const { storeId, productId } = await context.params

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: session.user.id
      }
    })

    if (!store) {
      return new NextResponse("Store not found", { status: 404 })
    }

    const product = await db.product.delete({
      where: {
        id: productId
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 