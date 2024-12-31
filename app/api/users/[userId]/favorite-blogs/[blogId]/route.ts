import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite blog exists and belongs to the current user
    const favoriteBlog = await db.favoriteBlog.findUnique({
      where: {
        id: params.blogId,
      },
    });

    if (!favoriteBlog || favoriteBlog.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite blog
    const deletedFavoriteBlog = await db.favoriteBlog.delete({
      where: {
        id: params.blogId,
      },
    });

    return NextResponse.json(deletedFavoriteBlog);
  } catch (error) {
    console.error("[DELETE_FAVORITE_BLOG_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; blogId: string } }
) {
  try {
    const user = await currentUser();
    const { title, platform, url } = await req.json();

    // Check if the user is authenticated
    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for favorite blog update
    if (!title || !platform || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if the favorite blog exists and belongs to the current user
    const favoriteBlog = await db.favoriteBlog.findUnique({
      where: { id: params.blogId },
    });

    if (!favoriteBlog || favoriteBlog.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Update the existing favorite blog in the database
    const updatedFavoriteBlog = await db.favoriteBlog.update({
      where: { id: params.blogId },
      data: { title, platform, url },
    });

    // Return the updated favorite blog information
    return new NextResponse(JSON.stringify(updatedFavoriteBlog), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PATCH ERROR] Favorite Blog Update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
