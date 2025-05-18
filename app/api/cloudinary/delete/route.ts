import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    
    // Check if user is authenticated
    if (!session?.user) {
      return new NextResponse("Unauthorized", { status: 401 });
    }
    
    const body = await req.json();
    const { publicId } = body;
    
    if (!publicId) {
      return new NextResponse("Public ID is required", { status: 400 });
    }
    
    // Delete the image from Cloudinary
    const result = await cloudinary.uploader.destroy(publicId);
    
    if (result.result !== "ok") {
      return new NextResponse("Failed to delete image", { status: 500 });
    }
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("[CLOUDINARY_DELETE]", error);
    return new NextResponse("Internal error", { status: 500 });
  }
} 