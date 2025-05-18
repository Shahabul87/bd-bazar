import { NextResponse } from "next/server"
import { db } from "@/lib/db"
import { z } from "zod"
import { currentUser } from "@/lib/auth"

// Schema for appearance settings
const appearanceSettingsSchema = z.object({
  appearanceSettings: z.string()
})

// GET /api/stores/[storeId]/appearance
export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params
    const user = await currentUser()
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    // Get store and verify ownership
    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: user.id
      },
      select: {
        id: true,
        appearanceSettings: true
      }
    })
    
    if (!store) {
      return new NextResponse("Store not found", { status: 404 })
    }
    
    // Return store appearance settings
    return NextResponse.json({
      storeId: store.id,
      appearanceSettings: store.appearanceSettings
    })
  } catch (error) {
    console.error("[APPEARANCE_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

// PATCH /api/stores/[storeId]/appearance
export async function PATCH(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const { storeId } = await params
    const user = await currentUser()
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    // Parse and validate request body
    const body = await req.json()
    const validationResult = appearanceSettingsSchema.safeParse(body)
    
    if (!validationResult.success) {
      console.error("Validation error:", validationResult.error)
      return new NextResponse(JSON.stringify(validationResult.error), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    const { appearanceSettings } = validationResult.data
    
    // Verify store ownership
    const storeExists = await db.store.findUnique({
      where: {
        id: storeId,
        userId: user.id
      }
    })
    
    if (!storeExists) {
      return new NextResponse("Store not found or unauthorized", { status: 404 })
    }
    
    // Try parsing appearance settings to validate JSON format
    try {
      JSON.parse(appearanceSettings)
    } catch (error) {
      console.error("Invalid JSON format for appearanceSettings:", error)
      return new NextResponse("Invalid JSON format for appearanceSettings", { status: 400 })
    }
    
    // Update store appearance settings
    const updatedStore = await db.store.update({
      where: {
        id: storeId
      },
      data: {
        appearanceSettings
      },
      select: {
        id: true,
        appearanceSettings: true
      }
    })
    
    console.log("Store appearance updated successfully:", updatedStore.id)
    return NextResponse.json(updatedStore)
  } catch (error) {
    console.error("[APPEARANCE_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 