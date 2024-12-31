"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Chapter, Section, Blog } from "@prisma/client";

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
import { BlogSectionList } from "./blog-section-list";

interface BlogSectionFormProps {
  chapter: Chapter & {
    sections?: (Section & {
      blogs: Blog[];
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
  author: z.string().min(1, "Author is required"),
  category: z.string().min(1, "Category is required"),
});

export const BlogSectionForm = ({
  chapter,
  courseId,
  chapterId,
  sectionId,
}: BlogSectionFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingBlogId, setEditingBlogId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingBlogId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      url: "",
      author: "",
      category: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();

  const isFormComplete =
    !!watchedValues.title &&
    !!watchedValues.url &&
    !!watchedValues.author &&
    !!watchedValues.category;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(
        `/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/blog`,
        values
      );
      toast.success("Blog section created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!editingBlogId) return;

    try {
      setIsUpdating(true);
      const payload = { ...values, blogId: editingBlogId };
      await axios.patch(
        `/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/blog`,
        payload
      );

      toast.success("Blog section updated");
      setEditMode(false);
      setEditingBlogId(null);
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
      await axios.put(
        `/api/courses/${courseId}/chapters/${chapterId}/sections/${sectionId}/reorder`,
        { list: updateData }
      );
      toast.success("Blogs reordered");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const blogToEdit = chapter.sections
      ?.find((section) => section.id === sectionId)
      ?.blogs.find((blog) => blog.id === id);
  
    if (blogToEdit) {
      setEditMode(true);
      setEditingBlogId(id);
  
      form.setValue("title", blogToEdit.title);
      form.setValue("description", blogToEdit.description || ""); // Use an empty string if null
      form.setValue("url", blogToEdit.url);
      form.setValue("author", blogToEdit.author || ""); // Use an empty string if null
      form.setValue("category", blogToEdit.category || ""); // Use an empty string if null
    }
  };
  

  const onDelete = async (blogId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(
        `/api/courses/${courseId}/chapters/${chapterId}/section/${sectionId}/blog`,
        { data: { blogId } }
      );
      toast.success("Blog section deleted");
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  const blogsForSection = chapter.sections
    ?.find((section) => section.id === sectionId)
    ?.blogs || [];

  return (
    <div className="relative mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      {isUpdating && (
        <div className="absolute h-full w-full bg-slate-500/20 top-0 right-0 rounded-m flex items-center justify-center">
          <Loader2 className="animate-spin h-6 w-6 text-sky-700" />
        </div>
      )}
      <div className="font-medium flex items-center justify-between text-white/90">
        Blog section
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add blog link details
            </>
          )}
        </Button>
      </div>
      {(isCreating || editMode) && (
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(editMode ? onSave : onSubmit)}
            className="space-y-4 mt-4"
          >
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
                      placeholder="Blog URL"
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
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Author"
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
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Category"
                      className="text-cyan-400 font-semibold bg-gray-600"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="flex space-x-2">
              <Button
                disabled={!isFormComplete || isSubmitting || isUpdating}
                type="submit"
              >
                {editMode ? "Save" : "Create"}
              </Button>
              {editMode && (
                <Button
                  variant="outline"
                  onClick={cancelEditMode}
                  disabled={isSubmitting || isUpdating}
                  className="text-black"
                >
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
            blogsForSection.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {blogsForSection.length === 0 && "No blog sections"}
          {blogsForSection.length > 0 && (
            <BlogSectionList
              onEdit={onEdit}
              onReorder={onReorder}
              onDelete={onDelete}
              items={blogsForSection}
              sectionId={sectionId}
            />
          )}
        </div>
      )}
      {!isCreating && !editMode && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder the blog sections
        </p>
      )}
    </div>
  );
};
