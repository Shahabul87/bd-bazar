# Cloudinary Environment Variables Setup

This project uses Cloudinary for image uploads and storage. Follow these steps to set up your environment variables.

## Step 1: Create a Cloudinary Account

If you don't already have a Cloudinary account:

1. Go to [cloudinary.com](https://cloudinary.com/) and sign up for a free account
2. After signup, you'll be taken to your dashboard

## Step 2: Get Your Cloudinary Credentials

From your Cloudinary dashboard:

1. Note your **Cloud Name** (displayed at the top of the dashboard)
2. Find your **API Key** and **API Secret** in the Account Details section

## Step 3: Create an Upload Preset

1. In your Cloudinary dashboard, go to **Settings** > **Upload**
2. Scroll down to **Upload presets** and click **Add upload preset**
3. Give it a name (e.g., `product_images`)
4. For **Signing Mode**, select **Unsigned** (easier for development)
5. Configure other settings as desired (e.g., folder path, transformations)
6. Click **Save** to create the preset

## Step 4: Add Environment Variables

Create or edit your `.env.local` file in the root of your project and add:

```
# Cloudinary Configuration
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME="your-cloud-name"
NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET="your-upload-preset"
CLOUDINARY_API_KEY="your-api-key"
CLOUDINARY_API_SECRET="your-api-secret"
```

Replace the placeholder values with your actual Cloudinary credentials.

## Step 5: Verify Your Setup

Run the environment check script to verify your setup:

```
npm run check-env
```

This will check if all required environment variables are properly set.

## Troubleshooting

If you're experiencing issues with image uploads:

1. Make sure all environment variables are correctly set
2. Check that your upload preset is configured as "unsigned" if you're using client-side uploads
3. Verify that your Cloudinary account is active and has available credits
4. Check the browser console for detailed error messages
5. Ensure your API key and secret are kept secure and never exposed to the client

## Security Considerations

- `NEXT_PUBLIC_` variables are exposed to the browser - only put non-sensitive values here
- Keep your API secret secure and never expose it to the client
- For production, consider using signed uploads for better security 