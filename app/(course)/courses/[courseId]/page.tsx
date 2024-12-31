import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import { ChaptersFormCourseHome } from "./chapters/[chapterId]/_components/chapters-form-course-home";
import { CourseHero } from "./_coursedetails/course-hero-section";
import { CourseObjectives } from "./_coursedetails/course-objective";
import { CourseReviewPage } from "./_coursedetails/course-review";
import { currentUser } from '@/lib/auth'
import CourseCard from "./course-feature";
import { CourseTabsDemo } from "./course-tab-demo";
import { Footer } from "@/app/(homepage)/footer";
import { CourseContent } from "./course-content";
import { GradientDivider } from "@/components/border";
import { Heading } from "@/components/heading";
import ConditionalHeader from "@/app/(homepage)/user-header";
import { CourseCardsCarousel } from "./course-card-carousel";


const CourseIdPage = async ({params}: {params: { courseId: string; }}) => {
  
  const course = await db.course.findUnique({
    where: {
      id: params.courseId,
    },
    include: {
      category: true, // Include the category relation
      chapters: {
        where: {
          isPublished: true,
        },
        orderBy: {
          position: "asc",
        },
        include: {
          sections: {
            where: {
              isPublished: true,
            },
            orderBy: {
              position: "asc",
            },
            include: {
              videos: true,     // Include all related videos in the section
              blogs: true,      // Include all related blogs in the section
              articles: true,   // Include all related articles in the section
              notes: true,      // Include all related notes in the section
            },
          },
        },
      },
    },
  });
  
  
  
 //console.log(course?.chapters)




 const user:any =await currentUser();

  if (!course) {
    return redirect("/");
    
  }

  //console.log(course)
  const chapters = course?.chapters || [];
  return (
    <>
       
    <div>
      <ConditionalHeader user={user} />
    </div> 
    <section className="mt-20">
      <CourseCard course={course}/>

      <Heading tag="h1" text="Course Breakdown" className="mt-10 p-2 text-center"/>
      <GradientDivider padding="p-2 mt-5"/>
      <CourseCardsCarousel chapters={chapters}/>

    
     
      <Heading tag="h1" text="Course Learning Outcomes" className="mt-10 p-2 text-center"/>
        {/* <div className="flex items-center justify-center mb-5 ">
            <h1 className="text-white/80 text-4xl lg:text-5xl font-bold mb-4">
                Course Learning Outcomes
              </h1>
        </div> */}
      <GradientDivider padding="p-2 mt-5"/>
      <CourseTabsDemo  chapters={chapters}/>
   {/* <CourseHero
        title={course.title}
        description={course.description || "No description available"}
        imageSrc={course.imageUrl || "/default-image.jpg"} // Provide a default image path
      /> */}
   
    <Heading tag="h1" text="Skill You Build" className="mt-10 p-2 text-center"/>
    <GradientDivider padding="p-8"/>
    <CourseObjectives />
    
    <Heading tag="h1" text="Course Contents"/>
    <GradientDivider padding="p-8"/>
    <div className="min-h-screen p-8">
      <CourseContent chapters={chapters} />
    </div>
    {/* <div className=" h-full mx-6">
       <div className="">
          <ChaptersFormCourseHome 
                course ={course}
            />
        </div> 
      </div> */}
      <CourseReviewPage />
    </section>
    <Footer />
    </>
  )

 
}
 
export default CourseIdPage;