import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function DELETE(
  req: Request,
  { params }: { params: { userId: string; videoId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id || user.id !== params.userId) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Verify the favorite video exists and belongs to the current user
    const favoriteVideo = await db.favoriteVideo.findUnique({
      where: {
        id: params.videoId,
      },
    });

    if (!favoriteVideo || favoriteVideo.userId !== user.id) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the favorite video
    const deletedFavoriteVideo = await db.favoriteVideo.delete({
      where: {
        id: params.videoId,
      },
    });

    return NextResponse.json(deletedFavoriteVideo);
  } catch (error) {
    console.error("[DELETE_FAVORITE_VIDEO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string; videoId: string } }
) {
  try {
    const user = await currentUser();
    const { title, description, url, duration, clarityRating, position, category, isPublished } = await req.json();

    // Check if the user is authenticated
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for video update
    if (!title || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Check if the video exists and belongs to the specified section, chapter, course, and user
    const video = await db.video.findFirst({
      where: {
        id: params.videoId,
        sectionId: params.sectionId,
        section: {
          chapterId: params.chapterId,
          chapter: {
            courseId: params.courseId,
            course: {
              userId: user.id, // Ensure the course belongs to the current user
            },
          },
        },
      },
    });

    if (!video) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Update the video information in the database
    const updatedVideo = await db.video.update({
      where: { id: params.videoId },
      data: {
        title,
        description,
        url,
        duration: duration ?? null, // Accept null values for optional fields
        clarityRating: clarityRating ?? null,
        position,
        category: category ?? null,
        isPublished: isPublished ?? false,
      },
    });

    // Return the updated video information
    return new NextResponse(JSON.stringify(updatedVideo), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("[PATCH ERROR] Video Update:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
