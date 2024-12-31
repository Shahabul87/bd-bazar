import { NextResponse } from "next/server";
import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export async function POST(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const user = await currentUser();
    const { title, description, url, duration, clarityRating, position } = await req.json();

    // Check if the user is authenticated
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the current user owns the course
    const ownCourse = await db.course.findUnique({
      where: {
        id: params.courseId,
        userId: user.id,
      },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Check if the specified chapter exists within the course
    const chapterData = await db.chapter.findUnique({
      where: {
        id: params.chapterId,
      },
    });

    if (!chapterData) {
      return new NextResponse("Chapter not found", { status: 404 });
    }

    // Check if the specified section exists within the chapter
    const sectionData = await db.section.findUnique({
      where: {
        id: params.sectionId,
      },
    });

    if (!sectionData) {
      return new NextResponse("Section not found", { status: 404 });
    }


    // Validate required fields for video creation
    if (!title || !url || !duration || !clarityRating || !position) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Create a new video entry in the database
    const newVideo = await db.video.create({
      data: {
        title,
        description,
        url,
        duration,
        clarityRating,
        position,
        sectionId: params.sectionId, // Link video to the section
        userId: user.id, // Associate video with the current user
      },
    });

    // Return the newly created video information
    return new NextResponse(JSON.stringify(newVideo), { 
      status: 201, 
      headers: { 'Content-Type': 'application/json' } 
    });
  } catch (error) {
    console.error("[POST ERROR] Courses/Chapter/Section ID:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}



export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const user = await currentUser();
    const { videoId, title, description, url, duration, clarityRating, position, category, isPublished } = await req.json();

    // Check if the user is authenticated
    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Validate required fields for video update
    if (!videoId || !title || !url) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    // Retrieve all videos associated with the given section
    const videos = await db.video.findMany({
      where: {
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

    // Find the video with the specified videoId
    const video = videos.find((vid) => vid.id === videoId);

    // If the video doesn't exist or doesn't match, return an error
    if (!video) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Update the video information in the database
    const updatedVideo = await db.video.update({
      where: { id: videoId },
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



export async function DELETE(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string; sectionId: string } }
) {
  try {
    const user = await currentUser();
    const { videoId } = await req.json(); // Extract videoId from the request payload

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    // Fetch all videos associated with the sectionId
    const videos = await db.video.findMany({
      where: {
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

    // Find the specific video to delete by its ID
    const videoToDelete = videos.find((video) => video.id === videoId);

    if (!videoToDelete) {
      return new NextResponse("Unauthorized or Not Found", { status: 404 });
    }

    // Delete the video
    const deletedVideo = await db.video.delete({
      where: {
        id: videoToDelete.id,
      },
    });

    return NextResponse.json(deletedVideo);
  } catch (error) {
    console.error("[DELETE_VIDEO_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}

