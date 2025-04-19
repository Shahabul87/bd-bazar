import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { createStoreSchema } from "@/schemas/store"

export async function PATCH(
  req: Request,
  context: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    const { storeId } = await context.params
    const values = await req.json()

    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    const store = await db.store.update({
      where: {
        id: storeId,
        userId: session.user.id
      },
      data: {
        type: values.type,
        businessType: values.businessType,
        description: values.description
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    console.log("[STORE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

// Add GET endpoint to fetch store data
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { status: 401 }
      )
    }

    const store = await db.store.findUnique({
      where: {
        id: params.storeId,
        userId: session.user.id
      }
    })

    if (!store) {
      return new NextResponse(
        JSON.stringify({ error: "Store not found" }),
        { status: 404 }
      )
    }

    return NextResponse.json(store)
  } catch (error) {
    console.error("[STORE_ID_GET]", error)
    return new NextResponse(
      JSON.stringify({ error: "Internal error" }),
      { status: 500 }
    )
  }
} 