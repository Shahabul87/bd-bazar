import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { validateImage } from "@/lib/cloudinary";

const MAX_FILE_SIZE = 10 * 1024 * 1024; // 10MB

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

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

    // Check if cloudinary is configured
    if (
      !process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME ||
      !process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY ||
      !process.env.CLOUDINARY_API_SECRET
    ) {
      return NextResponse.json(
        { error: "Cloudinary is not configured" },
        { status: 500 }
      );
    }

    // Try to parse the request as JSON first (for pre-uploaded images)
    const contentType = request.headers.get("content-type") || "";
    
    if (contentType.includes("application/json")) {
      const body = await request.json();
      
      if (!body.images || !Array.isArray(body.images) || body.images.length === 0) {
        return NextResponse.json(
          { error: "Images are required" },
          { status: 400 }
        );
      }
      
      const savedImages = [];
      
      for (const image of body.images) {
        if (!image.url || !image.publicId) {
          return NextResponse.json(
            { error: "Each image must have url and publicId" },
            { status: 400 }
          );
        }
        
        // Save the image URL to the database
        const savedImage = await db.image.create({
          data: {
            productId,
            url: image.url,
            publicId: image.publicId,
          },
        });
        
        savedImages.push(savedImage);
      }
      
      return NextResponse.json(savedImages);
    } else {
      // Handle form data upload
      const formData = await request.formData();
      const file = formData.get("file") as File;

      if (!file) {
        return NextResponse.json(
          { error: "File is required" },
          { status: 400 }
        );
      }

      // Validate the image
      const validationError = validateImage(file);
      if (validationError) {
        return NextResponse.json(
          { error: validationError },
          { status: 400 }
        );
      }

      // Convert file to buffer
      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      // Upload to cloudinary
      const result = await new Promise((resolve, reject) => {
        cloudinary.uploader
          .upload_stream({
            resource_type: "image",
            folder: `ira-ecommerce/${storeId}/products/${productId}`,
          }, (error, result) => {
            if (error) {
              reject(error);
            } else {
              resolve(result);
            }
          })
          .end(buffer);
      });

      // Save the image URL to the database
      const image = await db.image.create({
        data: {
          productId,
          url: (result as any).secure_url,
          publicId: (result as any).public_id,
        },
      });

      return NextResponse.json(image);
    }
  } catch (error) {
    console.error("POST_PRODUCT_IMAGE", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
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

    const url = new URL(request.url);
    const imageId = url.searchParams.get("imageId");

    if (!imageId) {
      return NextResponse.json(
        { error: "Image ID is required" },
        { status: 400 }
      );
    }

    // Find the image to delete
    const image = await db.image.findUnique({
      where: {
        id: imageId,
        productId,
      },
    });

    if (!image) {
      return NextResponse.json(
        { error: "Image not found" },
        { status: 404 }
      );
    }

    // Extract public_id from the URL
    const urlParts = image.url.split("/");
    const publicIdWithExtension = urlParts[urlParts.length - 1];
    const publicId = publicIdWithExtension.split(".")[0];
    const folder = urlParts.slice(urlParts.length - 4, urlParts.length - 1).join("/");
    const fullPublicId = `${folder}/${publicId}`;

    // Delete from Cloudinary
    await cloudinary.uploader.destroy(fullPublicId);

    // Delete from database
    await db.image.delete({
      where: {
        id: imageId,
      },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("DELETE_PRODUCT_IMAGE", error);
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

    // Find the product with its images
    const product = await db.product.findUnique({
      where: {
        id: productId,
        storeId,
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