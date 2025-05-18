import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"
import { z } from "zod"

// Schema for validating product creation
const productCreateSchema = z.object({
  name: z.string().min(1).max(100),
  // Additional fields are optional for initial creation
  description: z.string().optional(),
  price: z.coerce.number().nonnegative().optional(),
  category: z.string().optional(),
})

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Await params object before accessing its properties
    const { storeId } = await params
    const session = await auth()
    
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 })
    }
    
    // Parse the request body
    const body = await req.json()
    
    // Validate the request body
    const validationResult = productCreateSchema.safeParse(body)
    
    if (!validationResult.success) {
      return new NextResponse(JSON.stringify({ 
        message: "Invalid product data", 
        errors: validationResult.error.errors 
      }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      })
    }
    
    // Check if store exists and belongs to the user
    const storeExists = await db.store.findUnique({
      where: {
        id: storeId,
        userId: session.user.id
      }
    })
    
    if (!storeExists) {
      return new NextResponse("Store not found or unauthorized", { status: 404 })
    }
    
    // Create a product with minimal information based on the schema requirements
    const product = await db.product.create({
      data: {
        name: validationResult.data.name,
        description: validationResult.data.description || "",
        price: validationResult.data.price || 0,
        stock: 0,
        active: true,
        userId: session.user.id,
        storeId: storeId,
      }
    })
    
    return NextResponse.json(product)
  } catch (error) {
    console.error("[PRODUCT_POST]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function GET(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    // Await params object before accessing its properties
    const { storeId } = await params
    const { searchParams } = new URL(req.url)
    
    // Build the where clause
    const where = { storeId }
    
    const products = await db.product.findMany({
      where,
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    // Convert Decimal to number before returning
    const formattedProducts = products.map(product => ({
      ...product,
      price: Number(product.price),
    }));
    
    return NextResponse.json(formattedProducts)
  } catch (error) {
    console.error("[PRODUCTS_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 