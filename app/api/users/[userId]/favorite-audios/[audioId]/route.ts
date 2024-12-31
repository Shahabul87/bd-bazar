import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; audioId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite audio exists and belongs to the current user
    const favoriteAudio = await db.favoriteAudio.findUnique({
      where: {
        id: params.audioId,
      },
    });

    if (!favoriteAudio || favoriteAudio.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite audio
    const deletedFavoriteAudio = await db.favoriteAudio.delete({
      where: {
        id: params.audioId,
      },
    });

    return NextResponse.json(deletedFavoriteAudio);
  } catch (error) {
    console.error("[DELETE_FAVORITE_AUDIO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}


import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { userId: string; audioId: string } }
) {
  try {
    const user = await currentUser();
    const { title, platform, url } = await req.json();

    // Check if the user is authenticated
    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for favorite audio update
    if (!title || !platform || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if the favorite audio exists and belongs to the current user
    const favoriteAudio = await db.favoriteAudio.findUnique({
      where: { id: params.audioId },
    });

    if (!favoriteAudio || favoriteAudio.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Update the existing favorite audio in the database
    const updatedFavoriteAudio = await db.favoriteAudio.update({
      where: { id: params.audioId },
      data: { title, platform, url },
    });

    // Return the updated favorite audio information
    return new NextResponse(JSON.stringify(updatedFavoriteAudio), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PATCH ERROR] Favorite Audio Update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
