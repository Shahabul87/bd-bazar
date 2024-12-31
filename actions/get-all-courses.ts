import { Course, Category } from "@prisma/client";
import { db } from "@/lib/db";

type CourseForHomepage = {
  id: string;
  title: string;
  description: string | null;
  imageUrl: string | null;
  price:number;
  category: {
    id: string;
    name: string;
  } | null;
};

type GetCourses = {
  title?: string;
  categoryId?: string;
};

export const getCoursesForHomepage = async (
  {
    title,
    categoryId
  }: GetCourses
): Promise<CourseForHomepage[]> => {
  
  try {
    const courses = await db.course.findMany({
      where: {
        isPublished: true,
        ...(title && {
          title: {
            contains: title,
            mode: 'insensitive', // Case-insensitive search
          },
        }),
        ...(categoryId && { categoryId }), // Only add categoryId to the query if it's provided
      },
      select: {
        id: true,
        title: true,
        description: true,
        imageUrl: true,
        price:true,
        categoryId: true,
        Category: {
          select: {
            id: true,
            name: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    // Cast the result to the CourseForHomepage type to ensure type correctness
    return courses as CourseForHomepage[];
  } catch (error) {
    console.error("[GET_COURSES_FOR_HOMEPAGE]", error instanceof Error ? error.message : 'An unknown error occurred');
    return [];
  }
}

