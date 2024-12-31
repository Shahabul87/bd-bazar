import { currentUser } from "@/lib/auth";
import { NextResponse } from "next/server";
import { db } from "@/lib/db";

export async function PATCH(
  req: Request,
  { params }: { params: { courseId: string; chapterId: string } }
) {
  try {
    const user = await currentUser();

    if (!user?.id) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const ownCourse = await db.course.findUnique({
      where: { id: params.courseId, userId: user.id },
    });

    if (!ownCourse) {
      return new NextResponse("Unauthorized", { status: 401 });
    }

    const chapter = await db.chapter.findUnique({
      where: { id: params.chapterId },
    });

    if (!chapter || !chapter.title || !chapter.description) {
      return new NextResponse("Missing required fields", { status: 400 });
    }

    const updatedChapter = await db.chapter.update({
      where: { id: params.chapterId },
      data: { isPublished: !chapter.isPublished },  // Toggle isPublished based on current status
    });

    return NextResponse.json(updatedChapter);
  } catch (error) {
    console.log("[CHAPTER_PUBLISH_ERROR]", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
