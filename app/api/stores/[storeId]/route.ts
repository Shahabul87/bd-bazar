import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { createStoreSchema } from "@/schemas/store"
import { z } from "zod"
import { storeSchema } from "@/lib/validations/store"

// Schema for store updates - using storeSchema but making all fields optional
const storeUpdateSchema = storeSchema.partial()

export async function PATCH(
  req: Request,
  context: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    // Await params before destructuring
    const { storeId } = await context.params
    const body = await req.json()
    
    // Validate the request body
    const validatedData = storeUpdateSchema.parse(body)
    
    // In a real application, you would update the store in a database
    // For now, we'll just return the updated store data
    // This would be actual database logic in a real application
    
    const updatedStore = {
      id: storeId,
      ...validatedData,
      slug: validatedData.name
        ? validatedData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
        : "store-slug",
      lastUpdated: new Date()
    }
    
    return NextResponse.json(updatedStore)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    console.error("[STORE_PATCH]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
}

// Add GET endpoint to fetch store data
export async function GET(
  req: Request,
  context: { params: { storeId: string } }
) {
  try {
    const session = await auth()
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    // Await params before destructuring
    const { storeId } = await context.params
    
    // This would be a database query in a real application
    
    // First, check localStorage for this store
    // Note: This is browser-only code and won't work in a real Next.js API route
    // In a real app, you'd use a database instead
    let store = null;
    
    // For demonstration purposes, we're returning fixed data based on ID
    // In a real app, this would come from a database
    const idParts = storeId.split('-');
    const timestamp = idParts.length > 1 ? idParts[1] : '';
    
    store = {
      id: storeId,
      name: `Store created at ${new Date(parseInt(timestamp)).toLocaleString()}`,
      slug: `store-${timestamp}`,
      description: "This store was created from the modal. Edit to add your details.",
      type: "retail",
      businessType: "general",
      status: "active",
      visitors: 0,
      orders: 0,
      revenue: 0,
      lastUpdated: new Date(),
      products: 0,
      logo: "/assets/default-store-icon.svg",
      imageUrl: "",
      email: "",
      phone: "",
      fullAddress: "",
      division: "",
      district: "",
      thana: "",
      roadNo: ""
    }
    
    return NextResponse.json(store)
  } catch (error) {
    console.error("[STORE_GET]", error)
    return new NextResponse("Internal Server Error", { status: 500 })
  }
} 