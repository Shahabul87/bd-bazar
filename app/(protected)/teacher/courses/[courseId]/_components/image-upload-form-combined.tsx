"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Course } from "@prisma/client";
import Image from "next/image";
import { FileUpload } from "@/fileupload/file-upload";
import { Button } from "@/components/ui/button";


// Define the type for each uploaded file
interface UploadedFile {
  publicId: string;
  url: string;
}

interface ImageFormProps {
  initialData: Course;
  courseId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ImageFormCombined = ({ initialData, courseId }: ImageFormProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadedFile[] | null>(null);
  const router = useRouter();
  const [urlsArray, setUrlsArray] = useState<string[]>([]);

  // State to manage form values based on Zod schema
  const [formValues, setFormValues] = useState<z.infer<typeof formSchema>>({
    imageUrl: initialData.imageUrl || "", // Initial value from props or empty
  });

  // useEffect to update urlsArray when uploadResponse changes
  useEffect(() => {
    if (uploadResponse) {
      const urls = uploadResponse.map((file) => file.url);
      setUrlsArray(urls);
    }
  }, [uploadResponse]);

  // Handle file selection
  const handleFileUpload = (uploadedFiles: File[]) => {
    setFiles(uploadedFiles);
    console.log(uploadedFiles);
  };

  const handleCombinedSubmit = async () => {
    if (files.length === 0) {
      toast.error("No files selected!");
      return;
    }

    setIsSubmitting(true);

    const formData = new FormData();
    files.forEach((file) => {
      formData.append("file", file);
    });

    try {
      // First execute handleSubmit to upload files
      const response = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        const result = response.data;
        setUploadResponse(result.uploadedFiles);

        // Now proceed to execute onSubmit logic
        const firstImageUrl = result.uploadedFiles.length > 0 ? result.uploadedFiles[0].url : null;

        if (!firstImageUrl) {
          toast.error("Image upload failed. Please try again.");
          return;
        }

        // Update formValues with the first image URL
        const updatedValues = {
          ...formValues,
          imageUrl: firstImageUrl, // Assign first image URL to form data
        };

        // Submit the updated values to the API
        await axios.patch(`/api/courses/${courseId}`, updatedValues);

        toast.success("Course updated successfully");

        // Clear files and toggle edit state after successful operations
        setFiles([]);
        toggleEdit();
        router.refresh();
      } else {
        toast.error("Failed to upload files.");
      }
    } catch (error) {
      console.error("Error during submission:", error);
      toast.error("Something went wrong during the submission process.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border border-[#94a3b8] bg-gray-700 rounded-md p-4">
      <div className="font-medium flex items-center justify-between text-white/90 p-2">
        Course image
        <Button onClick={toggleEdit} variant="ghost">
          {/* {isEditing && <>Cancel</>}
          {!isEditing && initialData.imageUrl && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )} */}
             {isEditing ? (
            <>Cancel</>
          ) : (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit image
            </>
          )}
        </Button>
      </div>
      {!isEditing && (
        !initialData.imageUrl ? (
          <div className="flex items-center justify-center h-60 bg-slate-200 rounded-md">
            <ImageIcon className="h-10 w-10 text-slate-500" />
          </div>
        ) : (
     
          <div className="relative aspect-video mt-2">
            <Image
                alt="Uploaded Image"
                fill
                className="object-cover rounded-md"
                src={initialData.imageUrl}
            />
            </div>
        )
      )}
      {isEditing && (
        <div>
          <div className="p-2">
            <div className="w-full max-w-4xl mx-auto min-h-96 border border-dashed bg-white dark:bg-black border-neutral-200 dark:border-neutral-800 rounded-lg">
              {/* FileUpload Component */}
              <FileUpload onChange={handleFileUpload} />
            </div>

            {/* Submit Button */}
            <div className="flex justify-center mt-4">
              <button
                onClick={handleCombinedSubmit} // No need to pass formValues explicitly
                className={`px-6 py-2 bg-blue-600 text-white rounded-lg ${isSubmitting ? "opacity-50 cursor-not-allowed" : ""}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Submitting..." : "Submit"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
