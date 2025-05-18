import { NextRequest, NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function PATCH(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const session = await auth();
    const { productId } = await params;

    if (!session?.user) {
      return NextResponse.json(
        { error: "Unauthenticated" },
        { status: 401 }
      );
    }

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const contentType = request.headers.get("content-type") || "";
    
    if (!contentType.includes("application/json")) {
      return NextResponse.json(
        { error: "Request must be JSON" },
        { status: 400 }
      );
    }
    
    const body = await request.json();
    
    if (!body.images || !Array.isArray(body.images)) {
      return NextResponse.json(
        { error: "Images are required" },
        { status: 400 }
      );
    }

    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
      }
    });

    if (!existingProduct) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    const updatedProduct = await db.product.update({
      where: {
        id: productId,
      },
      data: {
        images: {
          deleteMany: {},
          createMany: {
            data: body.images.map((image: { url: string; publicId: string }) => ({
              url: image.url,
              publicId: image.publicId,
            })),
          },
        },
      },
      include: {
        images: true,
      },
    });

    return NextResponse.json(updatedProduct.images);
  } catch (error) {
    console.error("PATCH_PRODUCT_IMAGES", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET(
  request: NextRequest,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = await params;

    if (!productId) {
      return NextResponse.json(
        { error: "Product ID is required" },
        { status: 400 }
      );
    }

    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        images: true,
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(product.images);
  } catch (error) {
    console.error("GET_PRODUCT_IMAGES", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
