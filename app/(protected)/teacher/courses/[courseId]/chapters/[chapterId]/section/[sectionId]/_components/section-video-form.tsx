"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Section, } from "@prisma/client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"; // Assuming you have an input component

interface SectionVideoFormProps {
  initialData: Section;
  courseId: string;
  chapterId: string;
  sectionId:string;
}

const formSchema = z.object({
  videoUrl: z.string().url().min(1), // Ensure it's a valid URL
});

export const SectionYoutubeVideoForm = ({
  initialData,
  courseId,
  chapterId,
  sectionId,
}: SectionVideoFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [videoUrl, setVideoUrl] = useState(initialData.videoUrl || "");

  const toggleEdit = () => setIsEditing((current) => !current);

  const router = useRouter();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Prevent form submission if using a form element
    const isValid = formSchema.safeParse({ videoUrl });
    if (!isValid.success) {
      toast.error("Invalid URL");
      return;
    }

    try {
      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}`, { videoUrl });
      toast.success("Section updated");
      toggleEdit();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  }

  return (
    <div className="mt-6 border border-[#94a3b8] bg-gray-700  rounded-md p-4 mb-5">
      <div className="font-medium flex items-center justify-between text-white/90 mb-2">
        Section video
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing ? "Cancel" : (initialData.videoUrl ? "Edit video" : "Add video link")}
        </Button>
      </div>
      {!isEditing ? (
        initialData.videoUrl ? (
          <div className="relative w-full aspect-video mt-4">
            {videoUrl && (
              <iframe
                className="absolute top-0 left-0 w-full h-full rounded-md"
                src={`https://www.youtube.com/embed/${new URL(videoUrl).searchParams.get("v")}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-center h-60 bg-slate-300 rounded-md">
            <Pencil className="h-10 w-10 text-slate-500" /> {/* Adjusted for consistency */}
          </div>
        )
      ) : (
        <form onSubmit={onSubmit}>
          <Input
            value={videoUrl}
            onChange={(e) => setVideoUrl(e.target.value)}
            placeholder="Paste YouTube video URL here"
            className="text-cyan-400 font-semibold bg-gray-600"
          />
          <div className ="pt-2">
          <Button type="submit">Save</Button>
          </div>
        </form>
      )}
      {/* {initialData.videoUrl && !isEditing && (
        <div className="text-xs text-white/90 mt-2">
          Videos can take a few minutes to process. Refresh the page if the video does not appear.
        </div>
      )} */}
    </div>
  )
}
