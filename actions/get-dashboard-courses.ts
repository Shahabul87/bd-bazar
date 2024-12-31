import { db } from "@/lib/db";
import { Category, Chapter, Course } from "@prisma/client";
import { getProgress } from "@/actions/get-progress";

type CourseWithProgressWithCategory = Course & {
  category: Category;
  chapters: Chapter[];
  progress: number | null;
};

type DashboardCourses = {
  completedCourses: CourseWithProgressWithCategory[];
  coursesInProgress: CourseWithProgressWithCategory[];
};

export const getDashboardCourses = async (userId: string | null): Promise<DashboardCourses> => {
  const defaultResponse = {
    completedCourses: [],
    coursesInProgress: [],
  };

  try {
    if (!userId) {
      return defaultResponse;
    }

    // First check if user exists
    const user = await db.user.findUnique({
      where: { id: userId }
    });

    if (!user) {
      return defaultResponse;
    }

    const purchasedCourses = await db.purchase.findMany({
      where: {
        userId: userId
      },
      select: {
        course: {
          include: {
            category: true,
            chapters: {
              where: {
                isPublished: true
              }
            }
          }
        }
      }
    });

    if (!purchasedCourses) {
      return defaultResponse;
    }

    const courses = purchasedCourses
      .filter(purchase => purchase?.course) // Filter out null courses
      .map(({ course }) => ({
        ...course,
        progress: null
      } as CourseWithProgressWithCategory));

    // Process progress for each course
    for (let course of courses) {
      try {
        const progress = await getProgress(userId, course.id);
        course.progress = progress ?? 0; // Use nullish coalescing to default to 0
      } catch (error) {
        console.error(`Error getting progress for course ${course.id}:`, error);
        course.progress = 0;
      }
    }

    const completedCourses = courses.filter(course => 
      (course.progress ?? 0) === 100
    );

    const coursesInProgress = courses.filter(course => 
      (course.progress ?? 0) < 100
    );

    return {
      completedCourses,
      coursesInProgress,
    };

  } catch (error) {
    console.error("[GET_DASHBOARD_COURSES]", error);
    return defaultResponse;
  }
};