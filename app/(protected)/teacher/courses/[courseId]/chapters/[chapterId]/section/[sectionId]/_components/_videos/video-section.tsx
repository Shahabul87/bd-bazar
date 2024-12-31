"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter, Section, Video } from "@prisma/client";
import { VideoSectionList } from "./video-section-list";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface VideoSectionFormProps {
  chapter: Chapter & {
    sections?: (Section & {
      videos: Video[];
    })[];
  };
  courseId: string;
  chapterId: string;
  sectionId: string;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().optional(),
  url: z.string().url("Enter a valid URL"),
  duration: z.number().positive("Duration must be positive"),
  clarityRating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  position: z.number().positive("Position must be positive"),
});

export const VideoSectionForm = ({
  chapter,
  courseId,
  chapterId,
  sectionId,
}: VideoSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingVideoId, setEditingVideoId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingVideoId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      duration: undefined,
      clarityRating: undefined,
      position: undefined,
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();

  const isFormComplete =
    !!watchedValues.title &&
    !!watchedValues.url &&
    watchedValues.duration !== undefined &&
    watchedValues.duration > 0 &&
    watchedValues.clarityRating !== undefined &&
    watchedValues.clarityRating >= 1 &&
    watchedValues.clarityRating <= 5 &&
    watchedValues.position !== undefined &&
    watchedValues.position > 0;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/video`,
        values
      );
      toast.success("Video section created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };


  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!editingVideoId) return;

    try {
      setIsUpdating(true);
      // Include the videoId in the payload, not in the URL
      const payload = { ...values, videoId: editingVideoId };

      await axios.patch(`/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/video`, payload);
      
      toast.success("Video section updated");
      setEditMode(false);
      setEditingVideoId(null);
      form.reset();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };


  const onReorder = async (updateData: { id: string; position: number }[]) => {
    try {
      setIsUpdating(true);
      await axios.put(`/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/reorder`, { list: updateData });
      toast.success("Videos reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const videoToEdit = chapter.sections
      ?.find((section) => section.id === sectionId)
      ?.videos.find((video) => video.id === id);
  
    if (videoToEdit) {
      setEditMode(true);
      setEditingVideoId(id);
  
      form.setValue("title", videoToEdit.title);
      form.setValue("description", videoToEdit.description || "");
      form.setValue("url", videoToEdit.url);
      form.setValue("duration", videoToEdit.duration ?? 0); // Default to 0 if null
      form.setValue("clarityRating", videoToEdit.clarityRating ?? 0); // Default to 0 if null
      form.setValue("position", videoToEdit.position);
    }
  };
  

  const onDelete = async (videoId: string) => {
    try {
      setIsLoading(true);
      // Send videoId in the request body instead of the URL
      await axios.delete(`/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/video`, {
        data: { videoId }, // Pass videoId in the data property for a DELETE request
      });
      toast.success("Video section deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };
  

  const videosForSection = chapter.sections
    ?.find((section) => section.id === sectionId)
    ?.videos || [];

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Video section
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add video link details
            </>
          )}
        </Button>
      </div>
      {(isCreating || editMode) && (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(editMode ? onSave : onSubmit)} className="space-y-4 mt-4">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Title"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Description"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="url"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Video URL"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="duration"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting || isUpdating}
                      placeholder="Duration (seconds)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="clarityRating"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting || isUpdating}
                      placeholder="Clarity Rating (1-5)"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="position"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      type="number"
                      disabled={isSubmitting || isUpdating}
                      placeholder="Position"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button disabled={!isFormComplete || isSubmitting || isUpdating} type="submit">
                {editMode ? "Save" : "Create"}
              </Button>
              {editMode && (
                <Button variant="outline" onClick={cancelEditMode} disabled={isSubmitting || isUpdating} className="text-black">
                  Cancel
                </Button>
              )}
            </div>
          </form>
        </Form>
      )}
      {!isCreating && !editMode && (
        <div
          className={cn(
            "text-sm mt-2",
            videosForSection.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {videosForSection.length === 0 && "No video sections"}
          {videosForSection.length > 0 && (
            <VideoSectionList
              onEdit={onEdit}
              onReorder={onReorder}
              onDelete={onDelete}
              items={videosForSection}
              sectionId={sectionId}
            />
          )}
        </div>
      )}
      {!isCreating && !editMode && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder the video sections
        </p>
      )}
    </div>
  );
};
