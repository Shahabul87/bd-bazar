import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Maximum file size (5MB)
export const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Allowed file types
export const ALLOWED_FILE_TYPES = ["image/jpeg", "image/png", "image/webp", "image/jpg", "image/svg+xml"];

// Function to validate image file
export function validateImage(file: File) {
  if (file.size > MAX_FILE_SIZE) {
    throw new Error("File size exceeds the limit of 5MB");
  }

  if (!ALLOWED_FILE_TYPES.includes(file.type)) {
    throw new Error("File type not supported. Please upload JPEG, PNG, WebP, JPG or SVG");
  }
}

export default cloudinary; 