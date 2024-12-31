import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; articleId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite article exists and belongs to the current user
    const favoriteArticle = await db.favoriteArticle.findUnique({
      where: {
        id: params.articleId,
      },
    });

    if (!favoriteArticle || favoriteArticle.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite article
    const deletedFavoriteArticle = await db.favoriteArticle.delete({
      where: {
        id: params.articleId,
      },
    });

    return NextResponse.json(deletedFavoriteArticle);
  } catch (error) {
    console.error("[DELETE_FAVORITE_ARTICLE_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; articleId: string } }
) {
  try {
    const user = await currentUser();
    const { title, platform, url } = await req.json();

    // Check if the user is authenticated
    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for favorite article update
    if (!title || !platform || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if the favorite article exists and belongs to the current user
    const favoriteArticle = await db.favoriteArticle.findUnique({
      where: { id: params.articleId },
    });

    if (!favoriteArticle || favoriteArticle.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Update the existing favorite article in the database
    const updatedFavoriteArticle = await db.favoriteArticle.update({
      where: { id: params.articleId },
      data: { title, platform, url },
    });

    // Return the updated favorite article information
    return new NextResponse(JSON.stringify(updatedFavoriteArticle), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PATCH ERROR] Favorite Article Update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
