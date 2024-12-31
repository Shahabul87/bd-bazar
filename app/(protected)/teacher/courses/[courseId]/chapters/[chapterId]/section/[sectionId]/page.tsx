import { currentUser } from "@/lib/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Eye, LayoutDashboard, Video } from "lucide-react";
import { Header } from "@/app/(homepage)/header";
import { HeaderAfterLogin } from "@/app/(homepage)/header-after-login";
import { SidebarDemo } from "@/components/ui/sidebar-demo";
import { db } from "@/lib/db";
import { IconBadge } from "@/components/icon-badge";
import { Banner } from "@/components/banner"
import { SectionTitleForm } from "./_components/section-title-form";
import { SectionAccessForm } from "./_components/section-access-form";
import { SectionYoutubeVideoForm } from "./_components/section-video-form";
import { SectionActions } from "./_components/sections-actions";
import { VideoSectionForm } from "./_components/_videos/video-section";
import { BlogSectionForm } from "./_components/_blogs/blog-section";
import { GradientDivider } from "@/components/border";

const SectionIdPage = async ({
  params
}: {
  params: { courseId: string; chapterId: string; sectionId:string }
}) => {
    const user = await currentUser();

    if (!user?.id) {
        return redirect("/");
      }
  

      const section = await db.section.findFirst({
        where: {
          id: params.sectionId,
          chapterId: params.chapterId,
        },
        include: {
          videos: true,
          blogs: true,
          articles: true,
          notes: true,
        },
      });

      const chapter = await db.chapter.findFirst({
        where: {
          id: params.chapterId,
          courseId: params.courseId,
        },
        include: {
          sections: {
            orderBy: {
              position: "asc",
            },
            include: {
              videos: true,
              blogs: true,
              articles: true,
              notes: true,
            },
          },
        },
      });
      

      //console.log(section)


  if (!section) {
    return redirect("/")
  }

  if (!chapter) {
    return redirect("/")
  }

  const requiredFields = [
    section.title,
    section.videoUrl,
  ];

  const totalFields = requiredFields.length;
  const completedFields = requiredFields.filter(Boolean).length;

  const completionText = `(${completedFields}/${totalFields})`;

  const isComplete = requiredFields.every(Boolean);

  return (
    <>
    {!user? (
                            <>
                                <div className="">
                                <Header />
                                </div>
                        </> ):
                        (
                            <>
                            <HeaderAfterLogin />
                            </>
               )}
       <SidebarDemo>
      {!section.isPublished && (
        <Banner
          variant="warning"
          label="This section is unpublished. It will not be visible in the course"
        />
      )}
      <div className="p-6">
      <div className="px-2">
        <div className="flex items-center justify-between ">
          <div className="w-full">
            <Link
              href={`/teacher/courses/${params.courseId}/chapters/${params.chapterId}`}
              className="flex items-center text-xl text-white/90 hover:opacity-75 transition mb-6"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to chapter page
            </Link>
            <div className="flex items-center justify-between w-full bg-gray-700 p-2 px-10 border border-[#94a3b8] rounded-md">
                <div className="flex flex-col gap-y-2 ">
                  <h1 className="text-2xl font-medium text-white">
                    Section Creation
                  </h1>
                  <span className="text-sm text-cyan-500">
                    Complete all fields {completionText}
                  </span>
                </div>
                <SectionActions
                  disabled={!isComplete}
                  courseId={params.courseId}
                  chapterId={params.chapterId}
                  sectionId={params.sectionId}
                  isPublished={section.isPublished}
                />
            </div>
          </div>
        </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16 bg-gray-700 p-4 rounded-md">
          <div className="space-y-4">
            <div className="">
              <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={LayoutDashboard} />
                <h2 className="text-xl text-white/90 font-semibold">
                  Customize Your Chapter Section
                </h2>
              </div>
              <SectionTitleForm
                initialData={section}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
              </div>
        
            </div>
            
          </div>
          <div>
              <div className="flex items-center gap-x-2">
                <IconBadge icon={Eye} />
                <h2 className="text-xl text-white/90 font-semibold">
                  Access Settings
                </h2>
              </div>
              <SectionAccessForm
                initialData={section}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
              />
            </div>
          
        </div>
        <div>
            <div className="flex items-center gap-x-2 mt-5">
              <IconBadge icon={Video} />
              <h2 className="text-xl text-white/90 font-semibold">
                Add Sections Video Link
              </h2>
            </div>
            <SectionYoutubeVideoForm
                initialData={section}
                courseId={params.courseId}
                chapterId={params.chapterId}
                sectionId={params.sectionId}
            />
          </div>
          <h1 className="text-white/90 text-center text-3xl font-bold md:text-5xl p-4 mt-10">Add Resources For This Section</h1>
          <p className="text-neutral-300 text-center mb-5">You can add different videos and blogs that helps you to understand this section concept clearly. Also you can give each video a rating about their explanation and clear concept. You can write in the description about the video and blog</p>
          <GradientDivider  />
          <div className="flex items-center gap-x-2 mt-5">
            <IconBadge icon={Video} />
            <h2 className="text-xl text-white/90 font-semibold ">
              Add Video Links
            </h2>
          </div>
            <VideoSectionForm 
              chapter={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
              sectionId={params.sectionId}
            />

        <div className="flex items-center gap-x-2 mt-5">
            <IconBadge icon={Video} />
            <h2 className="text-xl text-white/90 font-semibold ">
              Add Blog Links
            </h2>
          </div>
            <BlogSectionForm 
              chapter={chapter}
              courseId={params.courseId}
              chapterId={params.chapterId}
              sectionId={params.sectionId}
            />

      </div>
      </SidebarDemo>
    </>
   );
}
 
export default SectionIdPage;