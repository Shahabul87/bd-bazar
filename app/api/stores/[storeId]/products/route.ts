import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function POST(
  req: Request,
  context: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const { storeId } = await context.params
    const body = await req.json()
    const { name } = body

    if (!name) {
      return new NextResponse("Name is required", { status: 400 })
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

    const product = await db.product.create({
      data: {
        name,
        price: 0,
        userId: session.user.id,
        storeId: store.id,
        active: true,
        stock: 0
      }
    })

    return NextResponse.json(product)
  } catch (error) {
    console.log("[PRODUCTS_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  context: { params: { storeId: string } }
) {
  try {
    const { storeId } = await context.params

    const products = await db.product.findMany({
      where: {
        storeId
      },
      include: {
        categories: true,
        images: true,
        store: {
          select: {
            name: true
          }
        }
      },
      orderBy: {
        createdAt: 'desc'
      }
    })

    return NextResponse.json(products)
  } catch (error) {
    console.log("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 