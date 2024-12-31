"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, PlusCircle } from "lucide-react";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { ProfileLink } from "@prisma/client";
import { ProfileLinkList } from "./profileLinkList";

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

interface ProfileLinkFormProps {
  userId: string;
  profileLinks?: ProfileLink[];
}

const formSchema = z.object({
  platform: z.string().min(1, "Platform is required"),
  url: z.string().url("Enter a valid URL"),
});

export const ProfileLinkForm = ({
  userId,
  profileLinks = [],
}: ProfileLinkFormProps) => {
  const [isCreating, setIsCreating] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editingLinkId, setEditingLinkId] = useState<string | null>(null);

  const toggleCreating = () => {
    setIsCreating((current) => !current);
    setEditMode(false);
    form.reset();
  };

  const cancelEditMode = () => {
    setEditMode(false);
    setEditingLinkId(null);
    form.reset();
  };

  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      platform: "",
      url: "",
    },
    mode: "onChange",
  });

  const { isSubmitting, isValid } = form.formState;
  const watchedValues = form.watch();
  const isFormComplete = !!watchedValues.platform && !!watchedValues.url;

  useEffect(() => {
    console.log("Form Validity:", isValid);
    console.log("Form Completion:", isFormComplete);
    console.log("Watched Values:", watchedValues);
  }, [isFormComplete, isValid, watchedValues]);

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.post(`/api/users/${userId}/profile-links`, values);
      toast.success("Profile link created");
      toggleCreating();
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  const onSave = async (values: z.infer<typeof formSchema>) => {
    if (!editingLinkId) return;
    
    try {
      setIsUpdating(true);
      await axios.patch(`/api/users/${userId}/profile-links/${editingLinkId}`, values);
      toast.success("Profile link updated");
      setEditMode(false);
      setEditingLinkId(null);
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
      await axios.put(`/api/users/${userId}/profile-links/reorder`, {
        list: updateData,
      });
      toast.success("Profile links reordered");
      router.refresh();
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsUpdating(false);
    }
  };

  const onEdit = (id: string) => {
    const linkToEdit = profileLinks.find((link) => link.id === id);
    if (linkToEdit) {
      setEditMode(true);
      setEditingLinkId(id);
      form.setValue("platform", linkToEdit.platform);
      form.setValue("url", linkToEdit.url);
    }
  };

  const onDelete = async (profileLinkId: string) => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/users/${userId}/profile-links/${profileLinkId}`);
      toast.success("Profile link deleted");
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
        Profile Links
        <Button onClick={toggleCreating} variant="ghost">
          {isCreating ? (
            <>Cancel</>
          ) : (
            <>
              <PlusCircle className="h-4 w-4 mr-2" /> Add profile link
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
              name="platform"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Input
                      disabled={isSubmitting || isUpdating}
                      placeholder="Platform (e.g., Twitter)"
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
                      placeholder="Profile URL"
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
            profileLinks.length === 0 && "text-cyan-500 italic font-semibold"
          )}
        >
          {profileLinks.length === 0 && "No profile links"}
          {profileLinks.length > 0 && (
            <ProfileLinkList
              onEdit={onEdit}
              onReorder={onReorder}
              onDelete={onDelete}
              items={profileLinks}
            />
          )}
        </div>
      )}
      {!isCreating && !editMode && (
        <p className="text-xs text-white/90 mt-4">
          Drag and drop to reorder the profile links
        </p>
      )}
    </div>
  );
};
