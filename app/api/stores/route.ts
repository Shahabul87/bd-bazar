import { NextResponse } from "next/server"
import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
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

// Define the Store interface
interface Store {
  id: string;
  name: string;
  type: string;
  businessType: string;
  description: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
  imageUrl?: string;
  email?: string;
  phone?: string;
}

// Define a schema for store creation with just the required fields
const createStoreSchema = storeSchema.pick({
  name: true,
  type: true,
  businessType: true,
  description: true,
});

// POST /api/stores - Create a new store
export async function POST(req: Request) {
  try {
    // 1. Check if user is authenticated
    const user = await currentUser();
    
    if (!user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    console.log("Creating store with user:", JSON.stringify(user, null, 2));
    
    if (!user.id) {
      return new NextResponse("User ID not found", { status: 400 });
    }

    // 2. Parse and validate request body
    const body = await req.json();
    const validationResult = createStoreSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { 
          error: "Invalid store data", 
          errors: validationResult.error.flatten().fieldErrors 
        }, 
        { status: 400 }
      );
    }

    const { name, type, businessType, description } = validationResult.data;

    // Check if the user exists in the database first
    const dbUser = await db.user.findUnique({
      where: { id: user.id },
    });

    if (!dbUser) {
      console.error("User not found in database:", user.id);
      return new NextResponse("User not found in database", { status: 404 });
    }

    // 3. Create the store in database using Prisma with the validated user ID
    const store = await db.store.create({
      data: {
        name,
        type,
        businessType,
        description,
        userId: dbUser.id
      }
    });

    // 4. Return the created store
    return NextResponse.json(store, { status: 201 });
  } catch (error) {
    console.error("[STORES_POST]", error instanceof Error ? error.message : "Unknown error");
    if (error instanceof Error) {
      console.error("[STORES_POST] Full error:", error);
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}

// GET /api/stores - Get all stores for the current user
export async function GET(req: Request) {
  try {
    // 1. Check if user is authenticated
    const user = await currentUser();
    
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // 2. Fetch all stores for this user using Prisma
    const dbStores = await db.store.findMany({
      where: {
        userId: user.id
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    // 3. Format the stores to ensure all fields needed by UI are present
    const formattedStores = dbStores.map(store => {
      // Generate a slug if one doesn't exist
      const slug = store.name.toLowerCase().replace(/\s+/g, "-");
      
      return {
        ...store,
        slug: slug,
        status: 'active', // Default status
        theme: 'default', // Default theme
        visitors: 0,
        orders: 0,
        revenue: 0,
        products: 0,
        // Convert Decimal to number for serialization
        totalRevenue: store.totalRevenue ? parseFloat(store.totalRevenue.toString()) : 0,
        lastUpdated: store.updatedAt.toISOString(),
      };
    });

    // 4. Return the formatted stores
    return NextResponse.json(formattedStores);
  } catch (error) {
    console.error("[STORES_GET]", error instanceof Error ? error.message : "Unknown error");
    return new NextResponse("Internal Error", { status: 500 });
  }
} 