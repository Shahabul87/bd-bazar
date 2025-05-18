import { NextResponse } from "next/server"
import { db } from "@/lib/db"

// GET /api/store-by-slug/[slug]
export async function GET(
  req: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const { slug } = params
    
    if (!slug) {
      return new NextResponse("Slug is required", { status: 400 })
    }
    
    // Find store by slug or name
    const store = await db.store.findFirst({
      where: { 
        OR: [
          { slug: { equals: slug, mode: "insensitive" } },
          { name: { equals: slug.replace(/-/g, " "), mode: "insensitive" } },
          { name: { equals: slug, mode: "insensitive" } }
        ]
      },
      include: {
        products: {
          include: {
            images: true,
            categories: true,
          },
          orderBy: {
            createdAt: 'desc'
          }
        },
        user: {
          select: {
            name: true,
            image: true
          }
        },
        _count: {
          select: {
            products: true
          }
        }
      }
    })
    
    if (!store) {
      return new NextResponse("Store not found", { status: 404 })
    }
    
    // Increment visitor count
    await db.store.update({
      where: { id: store.id },
      data: { visitorCount: { increment: 1 } }
    });
    
    // Convert Decimal to number for serialization
    const serializedStore = {
      ...store,
      totalRevenue: store.totalRevenue ? parseFloat(store.totalRevenue.toString()) : 0,
    };
    
    return NextResponse.json(serializedStore)
  } catch (error) {
    console.error("[STORE_BY_SLUG_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 