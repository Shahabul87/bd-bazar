import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { z } from "zod"
import { storeSchema } from "@/lib/validations/store"

// Mock data - in a real application, this would be a database
const MOCK_STORES = [
  {
    id: "store-1",
    name: "Tech Gadgets",
    slug: "tech-gadgets",
    description: "Latest tech gadgets and accessories",
    imageUrl: "/images/stores/tech.jpg",
    createdAt: new Date("2023-04-15"),
    products: 24,
    type: "retail",
    businessType: "electronics",
    status: "active",
    visitors: 1250,
    orders: 42,
    revenue: 3840,
    lastUpdated: new Date("2023-12-15"),
    logo: "/assets/default-store-icon.svg"
  },
  {
    id: "store-2",
    name: "Fashion Boutique",
    slug: "fashion-boutique",
    description: "Modern fashion for everyone",
    imageUrl: "/images/stores/fashion.jpg",
    createdAt: new Date("2023-05-22"),
    products: 36,
    type: "retail",
    businessType: "fashion",
    status: "active",
    visitors: 845,
    orders: 31,
    revenue: 2560,
    lastUpdated: new Date("2023-12-18"),
    logo: "/assets/default-store-icon.svg"
  }
];

// We're using the imported storeSchema from lib/validations/store.ts
// to ensure consistency between frontend and backend validation

export async function GET() {
  const session = await auth();
  
  // Check if user is authenticated
  if (!session || !session.user) {
    return new NextResponse("Unauthorized", { status: 401 });
  }
  
  // In a real application, you would fetch from a database
  // based on session.user.id
  
  return NextResponse.json(MOCK_STORES);
}

export async function POST(req: Request) {
  try {
    const session = await auth();
    
    // Check if user is authenticated
    if (!session || !session.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    
    // Validate the request body
    const validatedData = storeSchema.parse(body);
    
    // In a real application, you would save to a database
    // associated with session.user.id
    
    // Generate slug from name
    const slug = validatedData.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    // Generate a new mock store with the validated data
    const newStore = {
      id: `store-${Date.now()}`,
      name: validatedData.name,
      slug,
      description: validatedData.description,
      type: validatedData.type,
      businessType: validatedData.businessType,
      imageUrl: validatedData.imageUrl || "/images/stores/default.jpg",
      logo: validatedData.imageUrl || "/assets/default-store-icon.svg",
      email: validatedData.email,
      phone: validatedData.phone,
      createdAt: new Date(),
      lastUpdated: new Date(),
      products: 0,
      status: "active" as const,
      visitors: 0,
      orders: 0,
      revenue: 0
    };
    
    // Return the new store
    return NextResponse.json(newStore, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new NextResponse(JSON.stringify({ errors: error.errors }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    console.error("[STORE_POST]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
} 