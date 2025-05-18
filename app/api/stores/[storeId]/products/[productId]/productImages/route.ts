import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { db } from "@/lib/db";

export async function POST(
  request: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const session = await auth();
    const { storeId, productId } = await params;

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthenticated" }, { status: 401 });
    }

    if (!storeId || !productId) {
      return NextResponse.json(
        { error: "Store ID and Product ID are required" },
        { status: 400 }
      );
    }

    // Check if the store exists and belongs to the user
    const storeByUserId = await db.store.findFirst({
      where: {
        id: storeId,
        userId: session.user.id,
      },
    });

    if (!storeByUserId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 403 });
    }

    // Check if the product exists and belongs to the store
    const product = await db.product.findFirst({
      where: {
        id: productId,
        storeId,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    // Get the request body
    const body = await request.json();
    
    if (!body.images || !Array.isArray(body.images) || body.images.length === 0) {
      return NextResponse.json(
        { error: "Images are required" },
        { status: 400 }
      );
    }
    
    const savedImages = [];
    
    // Process each image and create a ProductImage record
    for (const image of body.images) {
      if (!image.url || !image.publicId) {
        return NextResponse.json(
          { error: "Each image must have url and publicId" },
          { status: 400 }
        );
      }
      
      // Create a ProductImage record
      const savedImage = await db.productImage.create({
        data: {
          productId,
          url: image.url,
          publicId: image.publicId,
          alt: image.alt || null,
          order: image.order || 0
        },
      });
      
      savedImages.push(savedImage);
    }
    
    return NextResponse.json(savedImages);
  } catch (error) {
    console.error("POST_PRODUCT_IMAGES", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { storeId: string; productId: string } }
) {
  try {
    const { storeId, productId } = await params;

    if (!storeId || !productId) {
      return NextResponse.json(
        { error: "Store ID and Product ID are required" },
        { status: 400 }
      );
    }

    // Find all ProductImage records for the product
    const images = await db.productImage.findMany({
      where: {
        productId,
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json(images);
  } catch (error) {
    console.error("GET_PRODUCT_IMAGES", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
} 