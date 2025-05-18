import { NextResponse } from "next/server";
import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";

export async function POST(
  req: Request,
  { params }: { params: { storeId: string } }
) {
  try {
    const storeId = params.storeId;
    const user = await currentUser();

    if (!user) {
      return new NextResponse("Unauthenticated", { status: 401 });
    }

    // Check if store belongs to user
    const store = await db.store.findUnique({
      where: {
        id: storeId,
        userId: user.id
      }
    });

    if (!store) {
      return new NextResponse("Unauthorized", { status: 403 });
    }

    const body = await req.json();
    
    const { mainCategory, subCategory, finalCategory, description, slug } = body;

    if (!mainCategory) {
      return new NextResponse("Main category is required", { status: 400 });
    }

    // Check if category already exists
    const existingCategory = await db.productCategory.findFirst({
      where: {
        mainCategory,
        subCategory: subCategory || null,
        finalCategory: finalCategory || null,
      }
    });

    if (existingCategory) {
      return new NextResponse("Category already exists", { status: 400 });
    }

    // Create the category
    const category = await db.productCategory.create({
      data: {
        mainCategory,
        subCategory: subCategory || null,
        finalCategory: finalCategory || null,
        description: description || null,
        slug,
      }
    });

    return NextResponse.json(category);
  } catch (error) {
    console.log("[CATEGORY_POST]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 