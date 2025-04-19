"use client";

import { useState, useCallback } from "react";
import { Upload, X, Loader2, AlertCircle } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import axios from "axios";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { Progress } from "@/components/ui/progress";

interface ProductImageUploadProps {
  productId: string;
  initialImages?: string[];
  onImagesUploaded?: (urls: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // in bytes
}

export const ProductImageUpload = ({
  productId,
  initialImages = [],
  onImagesUploaded,
  maxFiles = 5,
  maxSize = 5 * 1024 * 1024 // 5MB
}: ProductImageUploadProps) => {
  const [images, setImages] = useState<string[]>(initialImages);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const uploadToCloudinary = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'ml_default'); // Replace with your unsigned upload preset name
    formData.append('cloud_name', process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME!);

    const uploadUrl = `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`;

    try {
      const response = await axios.post(uploadUrl, formData, {
        onUploadProgress: (progressEvent) => {
          const progress = progressEvent.total 
            ? Math.round((progressEvent.loaded * 100) / progressEvent.total)
            : 0;
          setUploadProgress(progress);
        },
      });

      if (!response.data?.secure_url) {
        throw new Error('Upload failed - No secure URL received');
      }

      return response.data.secure_url;
    } catch (error: any) {
      console.error('Upload error details:', {
        message: error.message,
        response: error.response?.data,
        status: error.response?.status
      });
      const errorMessage = error.response?.data?.error?.message || error.message || 'Upload failed';
      throw new Error(errorMessage);
    }
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    try {
      if (images.length + acceptedFiles.length > maxFiles) {
        toast.error(`Maximum ${maxFiles} images allowed`);
        return;
      }

      setIsUploading(true);
      setUploadProgress(0);

      console.log('Starting upload process for files:', acceptedFiles.map(f => ({
        name: f.name,
        size: f.size,
        type: f.type
      })));

      const uploadedUrls = [];
      for (const file of acceptedFiles) {
        try {
          const url = await uploadToCloudinary(file);
          uploadedUrls.push(url);
          setUploadProgress(prev => Math.min((uploadedUrls.length / acceptedFiles.length) * 100, 100));
        } catch (error: any) {
          console.error(`Failed to upload ${file.name}:`, error);
          toast.error(`Failed to upload ${file.name}: ${error.message}`);
        }
      }

      if (uploadedUrls.length === 0) {
        throw new Error('No images were successfully uploaded');
      }

      const newImages = [...images, ...uploadedUrls];

      // Update backend
      await axios.patch(`/api/products/${productId}/images`, {
        images: newImages
      });

      setImages(newImages);
      onImagesUploaded?.(newImages);
      toast.success(`Successfully uploaded ${uploadedUrls.length} images`);
    } catch (error: any) {
      console.error('Upload process error:', {
        message: error?.message,
        response: error?.response?.data,
        status: error?.response?.status
      });
      toast.error(error.message || 'Failed to upload images');
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  }, [images, maxFiles, productId, onImagesUploaded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    maxSize,
    maxFiles: maxFiles - images.length,
    disabled: isUploading,
  });

  const handleRemoveImage = async (index: number) => {
    try {
      const newImages = images.filter((_, i) => i !== index);
      
      await axios.patch(`/api/products/${productId}/images`, {
        images: newImages
      });

      setImages(newImages);
      onImagesUploaded?.(newImages);
      toast.success("Image removed successfully");
    } catch (error) {
      console.error("Remove error:", error);
      toast.error("Failed to remove image");
    }
  };

  const handleDragStart = (index: number) => {
    setDraggedIndex(index);
  };

  const handleDragOver = (e: React.DragEvent, index: number) => {
    e.preventDefault();
    if (draggedIndex === null || draggedIndex === index) return;

    const newImages = [...images];
    const draggedImage = newImages[draggedIndex];
    newImages.splice(draggedIndex, 1);
    newImages.splice(index, 0, draggedImage);

    setImages(newImages);
    setDraggedIndex(index);
  };

  const handleDragEnd = async () => {
    setDraggedIndex(null);
    try {
      await axios.patch(`/api/products/${productId}/images`, {
        images
      });
      onImagesUploaded?.(images);
    } catch (error) {
      console.error("Reorder error:", error);
      toast.error("Failed to reorder images");
    }
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "relative cursor-pointer rounded-lg border-2 border-dashed p-8 transition-colors",
          isDragActive 
            ? "border-blue-500 bg-blue-500/10" 
            : "border-gray-700 hover:border-gray-600",
          isUploading && "pointer-events-none opacity-50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center justify-center gap-4">
          {isUploading ? (
            <>
              <Loader2 className="h-8 w-8 animate-spin text-blue-500" />
              <Progress value={uploadProgress} className="w-64" />
            </>
          ) : (
            <>
              <div className="rounded-full bg-blue-500/10 p-4">
                <Upload className="h-8 w-8 text-blue-500" />
              </div>
              <div className="text-center">
                <p className="text-sm font-medium text-white">
                  {isDragActive ? "Drop images here" : "Drag & drop images here"}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  or click to select files
                </p>
              </div>
              <div className="mt-2 text-center text-xs text-gray-400">
                <p>Accepted formats: PNG, JPG, GIF, WEBP</p>
                <p>Max size: {maxSize / (1024 * 1024)}MB</p>
                <p>Max files: {maxFiles}</p>
              </div>
            </>
          )}
        </div>
      </div>

      {/* Image Preview Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
          {images.map((url, index) => (
            <div
              key={url}
              draggable
              onDragStart={() => handleDragStart(index)}
              onDragOver={(e) => handleDragOver(e, index)}
              onDragEnd={handleDragEnd}
              className={cn(
                "group relative aspect-square rounded-lg overflow-hidden border-2 border-transparent transition-all",
                draggedIndex === index && "border-blue-500 opacity-50",
                "hover:shadow-lg hover:scale-[1.02]"
              )}
            >
              <Image
                src={url}
                alt={`Product image ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity" />
              <button
                onClick={() => handleRemoveImage(index)}
                className="absolute top-2 right-2 p-1.5 rounded-full bg-red-500 
                  opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
              >
                <X className="h-4 w-4 text-white" />
              </button>
              {index === 0 && (
                <div className="absolute bottom-2 left-2 px-2 py-1 rounded-full bg-blue-500/90 
                  text-xs text-white opacity-0 group-hover:opacity-100 transition-opacity">
                  Main Image
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
