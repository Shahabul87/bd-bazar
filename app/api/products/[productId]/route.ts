import { currentUser } from "@/lib/auth"
import { db } from "@/lib/db"
import { NextResponse } from "next/server"

// Add type for the expected request body
interface UpdateProductPayload {
  name?: string;
  description?: string;
  price?: number | string;
  category?: string;
  sku?: string;
  active?: boolean;
  featured?: boolean;
  isFeatured?: boolean; 
  isArchived?: boolean;
  stock?: number;
  brand?: string;
  status?: string;
}

// GET endpoint to fetch a product by ID
export async function GET(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Await params before destructuring
    const { productId } = await params;
    
    // Find product with related categories and images
    const product = await db.product.findUnique({
      where: {
        id: productId,
      },
      include: {
        categories: true,
        images: true,
      }
    });
    
    if (!product) {
      return new NextResponse("Product not found", { status: 404 });
    }
    
    // Convert Decimal to number before returning
    const formattedProduct = {
      ...product,
      price: Number(product.price),
    };
    
    return NextResponse.json(formattedProduct);
  } catch (error) {
    if (error instanceof Error) {
      console.error("[PRODUCT_ID_GET]", error.message);
    } else {
      console.error("[PRODUCT_ID_GET]", "Unknown error occurred");
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
}

export async function PATCH(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    // Await all async operations together
    const [user, values, paramsObj] = await Promise.all([
      currentUser(),
      req.json() as Promise<UpdateProductPayload>,
      params // Await params directly
    ]);

    const { productId } = paramsObj;

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 })
    }

    // Get the existing product first
    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
        userId: user.id
      }
    })

    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 })
    }

    // Prepare update data, handling both direct field names and UI-specific names
    const updateData: any = {};

    // Handle name
    if (values.name) updateData.name = values.name;
    
    // Handle description
    if (values.description !== undefined) updateData.description = values.description;
    
    // Handle price
    if (values.price !== undefined) updateData.price = parseFloat(values.price.toString());
    
    // Handle stock
    if (values.stock !== undefined) updateData.stock = parseInt(values.stock.toString());
    
    // Handle featured status (accept both featured and isFeatured)
    if (values.featured !== undefined) updateData.featured = Boolean(values.featured);
    if (values.isFeatured !== undefined) updateData.featured = Boolean(values.isFeatured);
    
    // Handle archived status
    if (values.isArchived !== undefined) {
      updateData.status = values.isArchived ? "archived" : "active";
    } else if (values.status) {
      updateData.status = values.status;
    }
    
    // Handle other fields
    if (values.sku) updateData.sku = values.sku;
    if (values.brand) updateData.brand = values.brand;
    if (values.category) {
      // Here you would handle category updates depending on your data model
      // This is a placeholder - you'd need to adjust based on your actual category structure
      // For example, you might need to connect to an existing category record
    }
    
    // Add updatedAt timestamp
    updateData.updatedAt = new Date();

    // Update the product with prepared values
    const product = await db.product.update({
      where: {
        id: productId,
        userId: user.id
      },
      data: updateData,
      include: {
        categories: true,
        images: true,
      }
    })

    // Convert price to number before returning
    const formattedProduct = {
      ...product,
      price: Number(product.price),
    }

    return NextResponse.json(formattedProduct)
  } catch (error) {
    if (error instanceof Error) {
      console.error("[PRODUCT_ID_PATCH]", error.message)
    } else {
      console.error("[PRODUCT_ID_PATCH]", "Unknown error occurred")
    }
    return new NextResponse("Internal Error", { status: 500 })
  }
}

// DELETE endpoint to remove a product
export async function DELETE(
  req: Request,
  { params }: { params: { productId: string } }
) {
  try {
    const user = await currentUser();
    
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    // Await params before destructuring
    const { productId } = await params;
    
    // First check if product exists and belongs to the user
    const existingProduct = await db.product.findUnique({
      where: {
        id: productId,
        userId: user.id,
      },
    });
    
    if (!existingProduct) {
      return new NextResponse("Product not found", { status: 404 });
    }
    
    // Delete the product
    await db.product.delete({
      where: {
        id: productId,
      },
    });
    
    return NextResponse.json({ success: true });
  } catch (error) {
    if (error instanceof Error) {
      console.error("[PRODUCT_ID_DELETE]", error.message);
    } else {
      console.error("[PRODUCT_ID_DELETE]", "Unknown error occurred");
    }
    return new NextResponse("Internal Error", { status: 500 });
  }
} 