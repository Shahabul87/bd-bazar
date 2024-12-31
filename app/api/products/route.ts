import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { auth } from "@/auth";
import { currentUser } from '@/lib/auth';

export async function POST(req: Request) {
  try {
    const user = await currentUser();
    
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const body = await req.json();
    
    if (!body.name) {
      return new NextResponse("Name is required", { status: 400 });
    }

    const product = await db.product.create({
      data: {
        name: body.name,
        userId: user.id,
        brand: "",
        description: "",
        price: 0,
        stock: 0,
        status: "draft",
      }
    });

    return NextResponse.json(product);
  } catch (error) {
    console.error("[PRODUCTS_ERROR]", error instanceof Error ? error.message : "Unknown error");
    return new NextResponse("Internal Error", { status: 500 });
  }
} 