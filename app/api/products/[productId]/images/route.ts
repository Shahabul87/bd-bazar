import { currentUser } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const { productId } = params;
    const body = await req.json();

    if (!body?.images || !Array.isArray(body.images)) {
      return NextResponse.json(
        { error: "Invalid request body" },
        { status: 400 }
      );
    }

    const images = await Promise.all(
      body.images.map((image: { url: string; publicId: string }) =>
        db.productImage.create({
          data: {
            url: image.url,
            publicId: image.publicId,
            productId: productId,
            alt: `Product image`,
            order: 0
          },
        })
      )
    );

    return NextResponse.json(images);
  } catch (error) {
    console.error("[PRODUCT_IMAGES_PATCH]", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function GET(
  req: Request,
  context: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    if (!user?.id) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { productId } = await Promise.resolve(context.params);

    const images = await db.productImage.findMany({
      where: {
        productId,
        product: {
          userId: user.id
        }
      },
      orderBy: {
        order: 'asc'
      }
    });

    return NextResponse.json(images);

  } catch (error: any) {
    console.error("GET error:", error);
    return NextResponse.json(
      { 
        error: "Failed to fetch images",
        details: error.message
      },
      { status: 500 }
    );
  }
}
