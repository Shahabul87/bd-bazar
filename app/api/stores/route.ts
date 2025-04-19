import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { createStoreSchema } from "@/schemas/store"

export async function POST(req: Request) {
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

    const body = await req.json()
    
    // Validate store name only
    const validatedData = createStoreSchema.parse(body)

    const store = await db.store.create({
      data: {
        name: validatedData.name,
        userId: session.user.id,
        // Other fields will use their default values from the schema
      }
    })

    return NextResponse.json(store)
    
  } catch (error: any) {
    console.error("[STORES_POST]", error)
    const errorMessage = error.message || "Something went wrong"
    
    return new NextResponse(
      JSON.stringify({ 
        error: "Failed to create store",
        details: errorMessage
      }),
      { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
}

export async function GET(req: Request) {
  try {
    const session = await auth()
    if (!session?.user) {
      return new NextResponse(
        JSON.stringify({ error: "Unauthorized" }),
        { 
          status: 401,
          headers: { 'Content-Type': 'application/json' }
        }
      )
    }

    const store = await db.store.findFirst({
      where: {
        userId: session.user.id
      }
    })

    return NextResponse.json(store)
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.log("[STORES_GET] Error:", errorMessage)
    
    return new NextResponse(
      JSON.stringify({ 
        error: "Internal server error",
        details: errorMessage
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    )
  }
} 