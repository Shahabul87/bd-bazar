# Cloudinary Setup for Product Image Upload

This document explains how to set up Cloudinary for product image uploads in this application.

## Required Environment Variables

Add the following to your `.env` file:

```
# Cloudinary Configuration
CLOUDINARY_CLOUD_NAME="your-cloud-name"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret" 
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
```

## Creating a Cloudinary Account and Getting Credentials

1. Sign up for a free Cloudinary account at [https://cloudinary.com/users/register/free](https://cloudinary.com/users/register/free)
2. After signing in, find your cloud name, API key, and API secret on the dashboard
3. Copy these values to your `.env` file

## Setting Up an Upload Preset

1. In your Cloudinary dashboard, go to Settings > Upload
2. Scroll down to "Upload presets" and click "Add upload preset"
3. Give it a name (e.g., "product_images")
4. For "Signing Mode", you can choose "Unsigned" for simpler setup
5. Configure other settings as needed (folder path, transformations, etc.)
6. Save the preset and add its name to your `.env` file as `NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET`

## Usage in the Application

The application uses the following components for image upload:

1. `app/dashboard/stores/[storeId]/products/components/product-image-upload.tsx` - Client-side component for uploading images
2. `app/api/stores/[storeId]/products/[productId]/images/route.ts` - API endpoints for managing product images

## Troubleshooting

- If uploads fail, check your Cloudinary credentials and upload preset name
- Ensure your Cloudinary account has enough free credits (free tier includes 25GB storage and bandwidth)
- Check browser console for detailed error messages 