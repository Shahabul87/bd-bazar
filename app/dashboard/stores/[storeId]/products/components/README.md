# Product Image Upload Component

This component handles uploading and managing product images with Cloudinary integration.

## Overview

The product image upload system consists of several parts:

1. **Client Component**: `ProductImageUpload.tsx` - Handles the UI for uploading and displaying images
2. **API Routes**: `/api/stores/[storeId]/products/[productId]/images` - Handles CRUD operations for images
3. **Utility Library**: `lib/cloudinary.ts` - Centralizes Cloudinary configuration and provides helper functions

## Setup Required

Before using this component, you need to:

1. Create a Cloudinary account and get your credentials
2. Set up required environment variables
3. Create an upload preset in your Cloudinary dashboard

See `CLOUDINARY_ENV_SETUP.md` in the project root for detailed instructions.

## Usage

```tsx
// Inside a page or component
import { ProductImageUpload } from "../components/product-image-upload";

// Then in your JSX
<ProductImageUpload 
  storeId={storeId} 
  productId={productId}
  initialImages={existingImages} // Optional
/>
```

## Component Features

- Multiple image upload
- Image preview with delete functionality
- Error handling with user-friendly messages
- Loading states for all operations
- Responsive grid layout
- Automatic data fetching if initial images not provided

## API Endpoints

The component interacts with these API endpoints:

- `GET /api/stores/[storeId]/products/[productId]/images` - Fetch all images for a product
- `POST /api/stores/[storeId]/products/[productId]/images` - Upload new images
- `DELETE /api/stores/[storeId]/products/[productId]/images?imageId=[id]` - Delete an image

## Troubleshooting

If you're having issues with image uploads:

1. Run `npm run check-env` to verify your environment variables
2. Check browser console for detailed error messages
3. Ensure your Cloudinary credentials are correct
4. Verify the upload preset exists and is configured as unsigned

For more details, see the documentation in `CLOUDINARY_ENV_SETUP.md`. 