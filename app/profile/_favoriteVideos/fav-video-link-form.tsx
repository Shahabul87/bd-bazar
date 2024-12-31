"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { FavoriteVideo } from "@prisma/client";
import { FavoriteVideoList } from "./fav-video-link-list";

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

interface FavoriteVideoLinkFormProps {
  userId: string;
  favoriteVideos?: FavoriteVideo[];
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
});

export const FavoriteVideoLinkForm = ({
  userId,
  favoriteVideos = [],
}: FavoriteVideoLinkFormProps) => {
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
      platform: "",
      url: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = !!watchedValues.title && !!watchedValues.platform && !!watchedValues.url;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/users/${userId}/favorite-videos`, values);
      toast.success("Favorite video added");
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
      await axios.patch(`/api/users/${userId}/favorite-videos/${editingVideoId}`, values);
      toast.success("Favorite video updated");
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
      await axios.put(`/api/users/${userId}/favorite-videos/reorder`, {
        list: updateData,
      });
      toast.success("Favorite videos reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const videoToEdit = favoriteVideos.find((video) => video.id === id);
    if (videoToEdit) {
      setEditMode(true);
      setEditingVideoId(id);
      form.setValue("title", videoToEdit.title);
      form.setValue("platform", videoToEdit.platform);
      form.setValue("url", videoToEdit.url);
    }
  };

  const onDelete = async (videoId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/favorite-videos/${videoId}`);
      toast.success("Favorite video deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Favorite Videos
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add favorite video link
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
                      placeholder="Video Title (e.g., My Favorite Video)"
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
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., YouTube)"
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
            favoriteVideos.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {favoriteVideos.length === 0 && "No favorite videos"}
          {favoriteVideos.length > 0 && (
            <FavoriteVideoList onEdit={onEdit} onReorder={onReorder} onDelete={onDelete} items={favoriteVideos} />
          )}
        </div>
      )}
      {!isCreating && !editMode && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder favorite videos
        </p>
      )}
    </div>
  );
};
