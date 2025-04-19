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

    // Await the params to get storeId
    const { storeId } = await context.params

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
    const { email, phone, division, district, thana, roadNo, fullAddress } = body

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

    // Update store contact details
    const updatedStore = await db.store.update({
      where: {
        id: storeId
      },
      data: {
        email,
        phone,
        division,
        district,
        thana,
        roadNo,
        fullAddress
      }
    })

    return NextResponse.json(updatedStore)
  } catch (error: any) {
    // Improved error logging
    if (error instanceof Error) {
      console.log("[STORE_CONTACT_PATCH] Error:", {
        message: error.message,
        name: error.name,
        stack: error.stack
      })
    } else {
      console.log("[STORE_CONTACT_PATCH] Unknown error:", error)
    }
    
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