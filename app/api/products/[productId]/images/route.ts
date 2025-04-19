import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const { productId } = params;
    
    if (!productId) {
      return new NextResponse("Product ID is required", { status: 400 });
    }

    const body = await req.json();
    
    if (!body || !body.images) {
      return new NextResponse(
        JSON.stringify({ error: "Images are required" }), 
        { status: 400 }
      );
    }

    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
      }
    });

    if (!existingProduct) {
      return new NextResponse(
        JSON.stringify({ error: "Product not found" }), 
        { status: 404 }
      );
    }

    const updatedProduct = await db.product.update({
      where: {
        id: productId
      },
      data: {
        images: body.images
      }
    });

    return NextResponse.json(updatedProduct);

  } catch (error) {
    console.error("[PRODUCT_IMAGES_PATCH]", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to update product images",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}

export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;

    if (!productId) {
      return new NextResponse(
        JSON.stringify({ error: "Product ID is required" }), 
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: {
        id: productId
      },
      select: {
        images: true
      }
    });

    if (!product) {
      return new NextResponse(
        JSON.stringify({ error: "Product not found" }), 
        { status: 404 }
      );
    }

    return NextResponse.json(product);

  } catch (error) {
    console.error("[PRODUCT_IMAGES_GET]", error);
    return new NextResponse(
      JSON.stringify({
        error: "Failed to fetch images",
        details: error instanceof Error ? error.message : "Unknown error"
      }),
      { 
        status: 500,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    );
  }
}
