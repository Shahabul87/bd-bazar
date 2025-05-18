'use client';

import { useCallback, useState, useEffect, useRef } from "react";
import { ImagePlus, X, Loader2, AlertCircle, Upload, Eye, FileText, Image as ImageIcon, Check } from "lucide-react";
import Image from "next/image";
import axios from "axios";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";

interface ProductImage {
  id: string;
  url: string;
  publicId?: string;
  alt: string | null;
}

interface ProductImageUploadProps {
  storeId: string;
  productId: string;
  initialImages?: ProductImage[];
}

// Function to format file size
const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return '0 Bytes';
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const ProductImageUpload = ({ 
  storeId, 
  productId,
  initialImages = []
}: ProductImageUploadProps) => {
  const [images, setImages] = useState<ProductImage[]>(initialImages);
  const [isLoading, setIsLoading] = useState(false);
  const [isDeleting, setIsDeleting] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  
  // New state to track image details display
  const [activeImage, setActiveImage] = useState<string | null>(null);
  
  // Ref for file input
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // Animation variants
  const imageVariants = {
    hidden: { opacity: 0, scale: 0.8 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, scale: 0.8, transition: { duration: 0.2 } }
  };

  // Fetch images on component mount
  useEffect(() => {
    const fetchImages = async () => {
      if (!storeId || !productId) return;

      try {
        setIsLoading(true);
        setError(null);
        const response = await axios.get(`/api/stores/${storeId}/products/${productId}`);
        if (response.data.images && Array.isArray(response.data.images)) {
          setImages(response.data.images);
        }
      } catch (error) {
        console.error("Error fetching product images:", error);
        toast.error("Failed to load product images");
        setError("Failed to load images. Please check your connection and try again.");
      } finally {
        setIsLoading(false);
      }
    };

    if (initialImages.length === 0) {
      fetchImages();
    }
  }, [storeId, productId, initialImages]);

  // Simulated upload progress
  useEffect(() => {
    if (isUploading) {
      const interval = setInterval(() => {
        setUploadProgress(prev => {
          const newProgress = prev + 5;
          if (newProgress >= 95) {
            clearInterval(interval);
            return 95; // We'll set to 100 when the upload is actually complete
          }
          return newProgress;
        });
      }, 200);
      
      return () => {
        clearInterval(interval);
        setUploadProgress(0);
      };
    }
  }, [isUploading]);

  // Handle file selection
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const filesArray = Array.from(event.target.files);
      setSelectedFiles(filesArray);
    }
  };

  // Upload files to Cloudinary via API
  const uploadFiles = async () => {
    if (selectedFiles.length === 0) {
      toast.error("Please select at least one image");
      return;
    }

    try {
      setIsUploading(true);
      setError(null);
      
      // Directly upload images to Cloudinary first
      const formData = new FormData();
      selectedFiles.forEach(file => {
        formData.append("file", file);
      });
      
      console.log("Uploading files to Cloudinary...");
      
      try {
        // First upload to Cloudinary
        const uploadResponse = await axios.post("/api/upload", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          }
        });
        console.log("Cloudinary upload response:", uploadResponse.data);
        
        if (uploadResponse.data.uploadedFiles && uploadResponse.data.uploadedFiles.length > 0) {
          const cloudinaryImages = uploadResponse.data.uploadedFiles;
          
          try {
            // Check if the product exists
            const productResponse = await axios.get(`/api/stores/${storeId}/products/${productId}`);
            console.log("Current product data:", productResponse.data);
            
            // Create a simpler image array format to avoid any model mismatches
            const simpleImages = cloudinaryImages.map((img: any) => ({
              url: img.url,
              publicId: img.publicId
            }));
            
            console.log("Simplified image data to send:", simpleImages);
            
            // Based on the Prisma schema, we need to create ProductImage records
            console.log("Creating ProductImage records for uploaded images");
            
            try {
              // Create a custom endpoint to handle this specific case
              const createImagesEndpoint = `/api/stores/${storeId}/products/${productId}/productImages`;
              
              // Format the image data according to the ProductImage schema
              const productImages = simpleImages.map((img: {url: string, publicId: string}) => ({
                url: img.url,
                publicId: img.publicId,
                alt: img.url.split('/').pop() || 'Product image',
                order: 0
              }));
              
              console.log("Sending image data to create ProductImage records:", productImages);
              
              // Try both approaches
              let savedImages = [];
              
              try {
                // First try to directly create ProductImage records
                const createResponse = await axios.post(createImagesEndpoint, {
                  images: productImages
                });
                
                console.log("Successfully created ProductImage records:", createResponse.data);
                savedImages = createResponse.data;
              } catch (endpointErr) {
                console.error("Error using custom endpoint, falling back to update product:", endpointErr);
                
                // Fallback: Update the product with the new images included
                const currentProduct = productResponse.data;
                const updatedProduct = await axios.patch(
                  `/api/stores/${storeId}/products/${productId}`, 
                  { 
                    // This lets the server know we're adding images, but doesn't try to update the images directly
                    // which might cause issues with the relations
                    imagesData: productImages
                  }
                );
                
                console.log("Product updated with image data:", updatedProduct.data);
              }
              
              // Set progress to 100%
              setUploadProgress(100);
              
              // Refresh product data regardless of which approach worked
              const refreshResponse = await axios.get(`/api/stores/${storeId}/products/${productId}`);
              if (refreshResponse.data && refreshResponse.data.images) {
                setImages(refreshResponse.data.images);
                toast.success(`${productImages.length} image(s) uploaded successfully`);
              } else {
                console.warn("No images found in refreshed product data", refreshResponse.data);
              }
              
              // Clear selected files
              setSelectedFiles([]);
              if (fileInputRef.current) {
                fileInputRef.current.value = "";
              }
            } catch (updateErr) {
              const error = updateErr as any;
              console.error("Error creating ProductImage records:", error);
              if (error.response) {
                console.error("Response status:", error.response.status);
                console.error("Response data:", error.response.data);
              }
              toast.error("Failed to save images. Please try again.");
            }
          } catch (err) {
            const error = err as any;
            console.error("Error saving images to product:", error);
            if (error.response) {
              console.error("Response status:", error.response.status);
              console.error("Response data:", error.response.data);
            }
            toast.error("Failed to save images to product");
          }
        } else {
          toast.error("No images were returned from Cloudinary");
        }
      } catch (err) {
        const error = err as any;
        console.error("Error uploading to Cloudinary:", error);
        if (error.response) {
          console.error("Response status:", error.response.status);
          console.error("Response data:", error.response.data);
        }
        toast.error("Failed to upload to Cloudinary");
      }
    } catch (err) {
      const error = err as any;
      console.error("Error in upload process:", error);
      toast.error("Failed to upload images");
      setError("Failed to upload images. Please check console for details.");
    } finally {
      setIsUploading(false);
      setUploadProgress(0);
    }
  };

  const onRemove = useCallback(async (imageId: string) => {
    try {
      setIsDeleting(imageId);
      setError(null);
      
      console.log("Deleting image with ID:", imageId);
      
      // Delete image via the API
      await axios.delete(`/api/stores/${storeId}/products/${productId}/images?imageId=${imageId}`);
      
      console.log("Image deleted successfully");
      
      // Update state - remove the deleted image
      setImages(prevImages => prevImages.filter(image => image.id !== imageId));
      toast.success("Image removed successfully");
      
      // Clear active image if it was the one being deleted
      if (activeImage === imageId) {
        setActiveImage(null);
      }
    } catch (error) {
      console.error("Error removing product image:", error);
      toast.error("Failed to remove image");
      setError("Failed to remove image. Please try again.");
    } finally {
      setIsDeleting(null);
    }
  }, [storeId, productId, activeImage]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] w-full bg-gradient-to-r from-blue-50 via-purple-50 to-pink-50 dark:from-blue-950/30 dark:via-purple-950/30 dark:to-pink-950/30 rounded-lg">
        <Loader2 className="h-10 w-10 text-primary animate-spin" />
        <p className="mt-2 text-sm text-muted-foreground">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-[300px] w-full bg-gradient-to-r from-rose-50 to-orange-50 dark:from-rose-950/20 dark:to-orange-950/20 rounded-lg border border-rose-300 dark:border-rose-800">
        <div className="text-rose-500 p-3 rounded-md text-center max-w-md">
          <AlertCircle className="h-10 w-10 mx-auto mb-2" />
          <p className="font-medium mb-2">Error</p>
          <p className="text-sm">{error}</p>
        </div>
      </div>
    );
  }

  // Generate a gradient pattern for the background
  const gridPatternClasses = "bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#1f2937_1px,transparent_1px)] [background-size:20px_20px]";

  return (
    <div className="space-y-4">
      {/* Error notification */}
      {error && (
        <div className="bg-rose-50 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900/50 p-3 rounded-md text-rose-500">
          <p className="text-sm font-medium flex items-center">
            <AlertCircle className="h-4 w-4 mr-2" />
            {error}
          </p>
        </div>
      )}
      
      {/* Image uploader */}
      <div className="p-4 rounded-lg bg-gradient-to-r from-indigo-50 to-purple-50 dark:from-indigo-950/20 dark:to-purple-950/20 border border-indigo-200 dark:border-indigo-800/40">
        <div className="flex flex-col gap-4">
          <div className="flex flex-wrap items-center gap-3">
            <Button 
              onClick={() => fileInputRef.current?.click()} 
              variant="outline"
              type="button"
              className="bg-white/80 dark:bg-black/20 hover:bg-white dark:hover:bg-black/40 border-indigo-200 dark:border-indigo-800/60"
              disabled={isUploading}
            >
              <ImagePlus className="h-4 w-4 mr-2" />
              {selectedFiles.length > 0 ? 'Change Images' : 'Select Images'}
            </Button>
            
            {selectedFiles.length > 0 && (
              <Button 
                onClick={uploadFiles} 
                disabled={isUploading}
                type="button"
                className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white hover:from-indigo-600 hover:to-purple-600"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Uploading...
                  </>
                ) : (
                  <>
                    <Upload className="h-4 w-4 mr-2" />
                    Upload {selectedFiles.length} {selectedFiles.length === 1 ? 'Image' : 'Images'}
                  </>
                )}
              </Button>
            )}
            
            {selectedFiles.length > 0 && !isUploading && (
              <Button 
                variant="outline" 
                type="button"
                className="border-rose-200 bg-rose-100 hover:bg-rose-200 dark:border-rose-800 dark:bg-rose-900/30 dark:hover:bg-rose-800/40 text-rose-700 dark:text-rose-300"
                onClick={() => {
                  setSelectedFiles([]);
                  if (fileInputRef.current) {
                    fileInputRef.current.value = "";
                  }
                }}
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
          
          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileSelect}
            accept="image/png,image/jpeg,image/jpg,image/webp"
            multiple
          />
          
          {/* Selected files preview */}
          {selectedFiles.length > 0 && (
            <div className="mt-2">
              <p className="text-sm font-medium text-indigo-700 dark:text-indigo-300 mb-2">
                Selected Images ({selectedFiles.length})
              </p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {selectedFiles.map((file, index) => (
                  <div key={index} className="relative bg-white dark:bg-black/20 p-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 group">
                    <div className="aspect-square relative mb-2 bg-slate-100 dark:bg-slate-800 rounded overflow-hidden">
                      {file && (
                        <div className="absolute inset-0">
                          {URL.createObjectURL && (
                            <Image 
                              src={URL.createObjectURL(file)} 
                              alt={file.name}
                              fill
                              className="object-cover"
                            />
                          )}
                        </div>
                      )}
                      {/* Discard button */}
                      <button
                        onClick={() => {
                          const newFiles = [...selectedFiles];
                          newFiles.splice(index, 1);
                          setSelectedFiles(newFiles);
                        }}
                        className="absolute top-2 right-2 bg-rose-500 hover:bg-rose-600 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                        type="button"
                        aria-label="Remove image"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                    <div className="flex items-center gap-2">
                      <ImageIcon className="h-4 w-4 text-indigo-500 flex-shrink-0" />
                      <span className="text-xs truncate max-w-[120px]">{file.name}</span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{formatFileSize(file.size)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
          
          {/* Upload progress */}
          {isUploading && (
            <div className="mt-2">
              <div className="flex justify-between text-xs text-indigo-700 dark:text-indigo-300 mb-1">
                <span>Uploading images to Cloudinary...</span>
                <span>{uploadProgress}%</span>
              </div>
              <Progress value={uploadProgress} className="h-2 bg-indigo-100 dark:bg-indigo-900/50" />
              <p className="text-xs text-slate-500 mt-1 text-center">
                {uploadProgress < 100 ? 'Please wait while your images are being uploaded...' : 'Saving images to product...'}
              </p>
            </div>
          )}
        </div>
      </div>
      
      {/* Images grid with colorful theme */}
      <div className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-6 rounded-xl ${gridPatternClasses} bg-gradient-to-br from-indigo-50/80 via-purple-50/80 to-pink-50/80 dark:from-indigo-950/20 dark:via-purple-950/20 dark:to-pink-950/20`}>
        <AnimatePresence>
          {images.map((image) => (
            <motion.div 
              key={image.id} 
              className={`relative group aspect-square rounded-xl overflow-hidden border-2 transition-all duration-200 ${
                activeImage === image.id 
                  ? "border-purple-500 shadow-lg shadow-purple-200 dark:shadow-purple-900/30 ring-2 ring-purple-300 dark:ring-purple-600/50" 
                  : "border-slate-200 hover:border-purple-300 dark:border-slate-800 dark:hover:border-purple-700"
              }`}
              onClick={() => setActiveImage(activeImage === image.id ? null : image.id)}
              variants={imageVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              layout
            >
              <Image
                src={image.url}
                alt={image.alt || "Product image"}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />

              {/* Hover overlay with controls */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-3 left-3 right-3 flex justify-between items-center">
                  <Badge variant="secondary" className="bg-white/90 dark:bg-black/80 text-xs font-normal">
                    {activeImage === image.id ? (
                      <span className="flex items-center">
                        <Check className="h-3 w-3 mr-1 text-green-500" />
                        Selected
                      </span>
                    ) : (
                      <span className="flex items-center">
                        <Eye className="h-3 w-3 mr-1" />
                        View
                      </span>
                    )}
                  </Badge>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemove(image.id);
                    }}
                    type="button"
                    className="p-1.5 rounded-full bg-rose-500 text-white opacity-100 transition-transform duration-200 hover:scale-110"
                    disabled={isDeleting === image.id}
                  >
                    {isDeleting === image.id ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <X className="h-4 w-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Image details when active */}
              {activeImage === image.id && (
                <div className="absolute top-0 left-0 right-0 p-2 bg-gradient-to-b from-black/70 via-black/40 to-transparent">
                  <div className="flex items-center justify-between text-white">
                    <Badge className="bg-purple-500 hover:bg-purple-600">Main Image</Badge>
                    <Badge variant="outline" className="border-white text-white">
                      <FileText className="h-3 w-3 mr-1" />
                      ID: {image.id.substring(0, 6)}
                    </Badge>
                  </div>
                </div>
              )}
            </motion.div>
          ))}
          
          {/* Empty state when no images */}
          {images.length === 0 && !isUploading && (
            <div className="col-span-full flex flex-col items-center justify-center h-[200px] bg-white/50 dark:bg-black/20 rounded-xl border-2 border-dashed border-slate-200 dark:border-slate-800">
              <ImageIcon className="h-10 w-10 text-slate-400 mb-3" />
              <p className="text-slate-500 dark:text-slate-400 text-sm">No images added yet</p>
              <p className="text-slate-400 dark:text-slate-500 text-xs mt-1">Select and upload images above</p>
            </div>
          )}
        </AnimatePresence>
      </div>
      
      {/* Image details display */}
      {activeImage && (
        <div className="p-4 rounded-lg bg-gradient-to-r from-violet-50 to-purple-50 dark:from-violet-950/20 dark:to-purple-950/20 border border-purple-200 dark:border-purple-800/50 mt-4">
          <div className="flex items-start justify-between">
            <div>
              <h4 className="text-sm font-medium text-purple-800 dark:text-purple-300 flex items-center">
                <ImageIcon className="h-4 w-4 mr-2" />
                Image Details
              </h4>
              <p className="text-xs text-purple-600 dark:text-purple-400 mt-1">
                {images.find(img => img.id === activeImage)?.url.split('/').pop() || 'Image File'}
              </p>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              type="button"
              className="h-7 text-xs text-purple-700 dark:text-purple-300 hover:bg-purple-100 dark:hover:bg-purple-900/50"
              onClick={() => setActiveImage(null)}
            >
              <X className="h-3 w-3 mr-1" />
              Close
            </Button>
          </div>
          
          <div className="grid grid-cols-2 gap-2 mt-2">
            <div className="text-xs p-2 rounded bg-white/50 dark:bg-purple-900/20">
              <span className="text-purple-500 font-medium">ID:</span>{' '}
              <span className="text-purple-700 dark:text-purple-300">{activeImage}</span>
            </div>
            <div className="text-xs p-2 rounded bg-white/50 dark:bg-purple-900/20">
              <span className="text-purple-500 font-medium">URL:</span>{' '}
              <span className="text-purple-700 dark:text-purple-300 truncate block">
                {images.find(img => img.id === activeImage)?.url || '-'}
              </span>
            </div>
          </div>
        </div>
      )}
      
      {/* Instructions */}
      <div className="px-4 py-3 rounded-lg border border-indigo-100 dark:border-indigo-900/50 bg-indigo-50/50 dark:bg-indigo-950/20">
        <p className="text-xs text-indigo-700 dark:text-indigo-300 flex items-start">
          <Upload className="h-3 w-3 mr-2 mt-0.5 flex-shrink-0" />
          <span>
            Click on <strong>Select Images</strong> to choose product images, then <strong>Upload</strong>. 
            Click on any image to view its details. 
            Click the X button on any image to remove it.
            The first image will be used as the main product image.
          </span>
        </p>
      </div>
    </div>
  );
}; 