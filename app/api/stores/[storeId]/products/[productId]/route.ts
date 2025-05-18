import { NextResponse } from "next/server"
import { auth } from "@/auth"
import { db } from "@/lib/db"

export async function GET(
  req: Request,
  context: { params: { storeId: string, productId: string } }
) {
  try {
    const { productId } = await context.params

    const product = await db.product.findUnique({
      where: {
        id: productId
      },
      include: {
        categories: true,
        images: true,
        store: {
          select: {
            name: true
          }
        }
      }
    })

    // Convert Decimal to number before returning
    const formattedProduct = product ? {
      ...product,
      price: Number(product.price),
    } : null;

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.log("[PRODUCT_GET]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function PATCH(
  req: Request,
  context: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth()
    const body = await req.json()
    
    const { storeId, productId } = await context.params

    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!store) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    // Special handling for imagesData field
    const { imagesData, ...productData } = body;
    
    // Update the product
    const product = await db.product.update({
      where: {
        id: productId
      },
      data: productData
    })

    // If imagesData is provided, create ProductImage records
    if (imagesData && Array.isArray(imagesData) && imagesData.length > 0) {
      const createdImages = [];
      
      for (const image of imagesData) {
        if (image.url && image.publicId) {
          const savedImage = await db.productImage.create({
            data: {
              productId,
              url: image.url,
              publicId: image.publicId,
              alt: image.alt || null,
              order: image.order || 0
            }
          });
          
          createdImages.push(savedImage);
        }
      }
      
      // Return the updated product with the newly created images
      const updatedProduct = await db.product.findUnique({
        where: { id: productId },
        include: { images: true }
      });
      
      // Convert price to number before returning
      const formattedProduct = {
        ...updatedProduct,
        price: Number(updatedProduct.price),
      };
      
      return NextResponse.json(formattedProduct);
    }

    // Convert price to number before returning
    const formattedProduct = {
      ...product,
      price: Number(product.price),
    };

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.log("[PRODUCT_PATCH]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
}

export async function DELETE(
  req: Request,
  context: { params: { storeId: string, productId: string } }
) {
  try {
    const { userId } = auth()
    const { storeId, productId } = await context.params

    const store = await db.store.findFirst({
      where: {
        id: storeId,
        userId
      }
    })

    if (!store) {
      return new NextResponse("Unauthorized", { status: 403 })
    }

    const product = await db.product.delete({
      where: {
        id: productId
      }
    })

    // Convert price to number before returning
    const formattedProduct = {
      ...product,
      price: Number(product.price),
    };

    return NextResponse.json(formattedProduct)
  } catch (error) {
    console.log("[PRODUCT_DELETE]", error)
    return new NextResponse("Internal error", { status: 500 })
  }
} 