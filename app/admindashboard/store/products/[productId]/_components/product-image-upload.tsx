"use client";

import * as z from "zod";
import axios from "axios";
import { Pencil, PlusCircle, ImageIcon } from "lucide-react";
import React, { useState, useEffect } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Product } from "@prisma/client";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { FileUpload } from "./image-file-upload";



// Define the type for each uploaded file
interface UploadedFile {
  publicId: string;
  url: string;
}

interface ProductImageUploadProps {
  initialData: {
    images: File[];
    imagePreviews: string[];
    imageUrl?: string;
  };
  productId: string;
}

const formSchema = z.object({
  imageUrl: z.string().min(1, {
    message: "Image is required",
  }),
});

export const ProductImageUpload = ({ initialData, productId }: ProductImageUploadProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEdit = () => setIsEditing((current) => !current);
  const [files, setFiles] = useState<File[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadResponse, setUploadResponse] = useState<UploadedFile[] | null>(null);
  const router = useRouter();
  const [urlsArray, setUrlsArray] = useState<string[]>([]);
  const [uploadedImages, setUploadedImages] = useState<UploadedFile[]>([]);

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

  // Function to fetch images
  const fetchImages = async () => {
    try {
      const response = await axios.get(`/api/products/${productId}/images`);
      setUploadedImages(response.data);
    } catch (error) {
      console.error("Failed to fetch product images:", error);
      toast.error("Failed to load product images");
    }
  };

  // Fetch images on mount and when productId changes
  useEffect(() => {
    fetchImages();
  }, [productId]);

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

    try {
      // First upload the files
      const formData = new FormData();
      files.forEach((file) => {
        formData.append("file", file);
      });

      console.log("Starting file upload to Cloudinary...");
      const uploadResponse = await axios.post("/api/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (!uploadResponse.data?.uploadedFiles) {
        throw new Error("Upload failed: No files were uploaded");
      }

      // Prepare the image data
      const imageUrls = uploadResponse.data.uploadedFiles.map((file: UploadedFile) => ({
        url: file.url,
        publicId: file.publicId
      }));

      console.log("Uploading images to product:", {
        productId,
        imageCount: imageUrls.length
      });

      // Update the product with the new images
      const updateResponse = await axios.patch(`/api/products/${productId}/images`, {
        images: imageUrls
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (!updateResponse.data) {
        throw new Error("Failed to update product images");
      }

      setUploadedImages(updateResponse.data);
      toast.success("Images uploaded successfully");
      setFiles([]);
      toggleEdit();
      router.refresh();

    } catch (error: any) {
      console.error("Upload failed:", {
        error: error.message,
        response: error.response?.data,
        status: error.response?.status,
        stack: error.stack
      });

      let errorMessage = "Failed to upload images";

      if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      } else if (error.response?.data?.details) {
        errorMessage = error.response.data.details;
      } else if (error.message) {
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        Product Images
        <Button onClick={toggleEdit} variant="ghost">
          {isEditing && <>Cancel</>}
          {!isEditing && !uploadedImages.length && (
            <>
              <PlusCircle className="h-4 w-4 mr-2" />
              Add Images
            </>
          )}
          {!isEditing && uploadedImages.length > 0 && (
            <>
              <Pencil className="h-4 w-4 mr-2" />
              Edit Images
            </>
          )}
        </Button>
      </div>

      {/* Display existing images */}
      {!isEditing && uploadedImages.length > 0 && (
        <div className="grid grid-cols-3 gap-4 mt-4">
          {uploadedImages.map((image, index) => (
            <div 
              key={image.publicId || index} 
              className="relative aspect-video rounded-md overflow-hidden border border-gray-700"
            >
              <Image
                src={image.url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload form */}
      {isEditing && (
        <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700">
          <div className="w-full max-w-4xl mx-auto">
            <div className="border-2 border-dashed border-gray-700 rounded-xl 
              bg-gray-800/50 hover:border-gray-600 transition-colors">
              <FileUpload onChange={handleFileUpload} />
            </div>

            <div className="flex justify-center mt-6">
              <button
                onClick={handleCombinedSubmit}
                disabled={isSubmitting || files.length === 0}
                className={`
                  px-6 py-2.5 bg-blue-600 text-white rounded-lg 
                  hover:bg-blue-700 transition-colors duration-200
                  flex items-center gap-2 font-medium
                  disabled:opacity-50 disabled:cursor-not-allowed
                `}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Uploading...</span>
                ) : (
                  <>Upload Images</>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
