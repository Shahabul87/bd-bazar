import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  context: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const { storeId } = context.params

    if (!storeId) {
      return new NextResponse(
        JSON.stringify({ error: "Store ID is required" }),
        { 
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const body = await req.json()
    const { latitude, longitude } = body

    // Verify store ownership
    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: session.user.id
      }
    })

    if (!store) {
      return new NextResponse(
        JSON.stringify({ error: "Store not found" }),
        { 
          status: 404,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    // Update store location
    const updatedStore = await db.store.update({
      where: {
        id: storeId
      },
      data: {
        latitude,
        longitude
      }
    })

    return NextResponse.json(updatedStore)
  } catch (error: any) {
    console.log("[STORE_LOCATION_PATCH]", error)
    return new NextResponse(
      JSON.stringify({ 
        error: "Internal error",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 