"use client";

import { useState, useEffect, useCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Loader2, Store as StoreIcon, Upload, Trash2, RefreshCw, ImageIcon } from "lucide-react";
import * as z from "zod";
import axios from "axios";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import { 
  Card, 
  CardContent,
  CardDescription,
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";

const storeFormSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters.").max(50, "Store name must be less than 50 characters."),
  description: z.string().max(500, "Description must be less than 500 characters.").optional(),
  slug: z.string().min(3, "Slug must be at least 3 characters.").regex(/^[a-z0-9-]+$/, "Slug can only contain lowercase letters, numbers, and hyphens."),
  type: z.string().min(1, "Please select a store type."),
  businessType: z.string().min(1, "Please select a business type."),
  theme: z.string().min(1, "Please select a theme."),
  logo: z.string().optional(),
  bannerImage: z.string().optional(),
  contactEmail: z.string().email("Please enter a valid email.").optional().or(z.literal("")),
  contactPhone: z.string().optional(),
  address: z.string().optional(),
  status: z.enum(["active", "inactive", "pending"]),
  socialLinks: z.object({
    facebook: z.string().optional(),
    instagram: z.string().optional(),
    twitter: z.string().optional(),
    pinterest: z.string().optional(),
  }).optional(),
});

type StoreFormValues = z.infer<typeof storeFormSchema>;

interface StoreSettingsFormProps {
  storeId: string;
}

export default function StoreSettingsForm({ storeId }: StoreSettingsFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isFetching, setIsFetching] = useState(true);

  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isLogoUploading, setIsLogoUploading] = useState(false);
  const [isBannerUploading, setIsBannerUploading] = useState(false);

  const form = useForm<StoreFormValues>({
    resolver: zodResolver(storeFormSchema),
    defaultValues: {
      name: "",
      description: "",
      slug: "",
      type: "",
      businessType: "",
      theme: "",
      status: "active",
      socialLinks: {
        facebook: "",
        instagram: "",
        twitter: "",
        pinterest: "",
      }
    }
  });

  useEffect(() => {
    const fetchStoreData = async () => {
      if (!storeId) return;
      
      try {
        setIsFetching(true);
        const response = await axios.get(`/api/stores/${storeId}`);
        const storeData = response.data;
        
        console.log("Fetched store data:", storeData);
        
        // Prepare data before any state updates
        let logoPreviewValue = null;
        let bannerPreviewValue = null;
        
        // Set logo and banner previews if they exist
        if (storeData.logo) {
          logoPreviewValue = storeData.logo;
        }
        
        if (storeData.bannerImage) {
          bannerPreviewValue = storeData.bannerImage;
        }
        
        // Parse socialLinks if it exists as a JSON string
        let parsedSocialLinks = {
          facebook: "",
          instagram: "",
          twitter: "",
          pinterest: "",
        };
        
        if (storeData.socialLinks) {
          try {
            const socialData = typeof storeData.socialLinks === 'string' 
              ? JSON.parse(storeData.socialLinks)
              : storeData.socialLinks;
              
            parsedSocialLinks = {
              facebook: socialData.facebook || "",
              instagram: socialData.instagram || "",
              twitter: socialData.twitter || "",
              pinterest: socialData.pinterest || "",
            };
          } catch (e) {
            console.error("Error parsing socialLinks:", e);
            // Keep default empty values if parsing fails
          }
        }
        
        // Generate a default slug from name if none exists
        const slug = storeData.slug || storeData.name?.toLowerCase().replace(/\s+/g, "-") || "";
        
        // Set all state updates together
        setLogoPreview(logoPreviewValue);
        setBannerPreview(bannerPreviewValue);
        
        // Set form values from fetched data - use reset to avoid multiple rerenders
        form.reset({
          name: storeData.name || "",
          description: storeData.description || "",
          slug: slug,
          type: storeData.type || "",
          businessType: storeData.businessType || "",
          theme: storeData.theme || "",
          status: storeData.status || "active",
          logo: storeData.logo || "",
          bannerImage: storeData.bannerImage || "",
          contactEmail: storeData.contactEmail || "",
          contactPhone: storeData.contactPhone || "",
          address: storeData.address || "",
          socialLinks: parsedSocialLinks
        });
      } catch (error) {
        console.error("Error fetching store data:", error);
        toast.error("Failed to load store data");
      } finally {
        setIsFetching(false);
      }
    };

    fetchStoreData();
  }, [storeId, form]);

  const onSubmit = useCallback(async (values: StoreFormValues) => {
    // Prevent resubmission if already loading
    if (loading) return;
    
    try {
      setLoading(true);
      console.log("Submitting form with values:", values);
      
      // Create a new object instead of mutating the values
      const formattedValues = { 
        ...values,
        socialLinks: values.socialLinks ? {
          facebook: values.socialLinks.facebook || "",
          instagram: values.socialLinks.instagram || "",
          twitter: values.socialLinks.twitter || "",
          pinterest: values.socialLinks.pinterest || "",
        } : undefined
      };
      
      // Serialize socialLinks to JSON string before sending to API
      const apiValues = {
        ...formattedValues,
        socialLinks: formattedValues.socialLinks ? JSON.stringify(formattedValues.socialLinks) : undefined
      };
      
      console.log("Formatted values for API:", apiValues);
      
      // Make API request
      const response = await axios.patch(`/api/stores/${storeId}`, apiValues);
      console.log("Store update response:", response.data);
      
      // Only show toast and refresh after successful API call
      toast.success("Store updated successfully");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating store:", error);
      
      // More detailed error handling
      let errorMessage = "An unknown error occurred";
      
      if (error.response) {
        console.error("Response data:", error.response.data);
        console.error("Response status:", error.response.status);
        
        // Get more specific error message from the response if available
        errorMessage = error.response.data?.error || 
                      error.response.data?.message || 
                      (typeof error.response.data === 'string' ? error.response.data : 'Unknown error');
        
        if (error.response.status === 409) {
          errorMessage = "Store slug already exists. Please try a different one.";
        } else if (error.response.status === 401) {
          errorMessage = "You are not authorized to update this store.";
        } else if (error.response.status === 404) {
          errorMessage = "Store not found. It may have been deleted.";
        } else if (error.response.status === 400) {
          errorMessage = `Invalid form data: ${errorMessage}`;
        } else {
          errorMessage = `Error: ${errorMessage}`;
        }
      } else if (error.request) {
        // The request was made but no response was received
        errorMessage = "Network error. Please check your connection.";
      } else {
        // Something happened in setting up the request
        errorMessage = `Failed to send request: ${error.message}`;
      }
      
      // Show toast with error message
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  }, [loading, storeId, router]);

  const handleFileUpload = useCallback(async (
    file: File, 
    type: 'logo' | 'banner',
    setUploading: (value: boolean) => void,
    setPreview: (value: string | null) => void
  ) => {
    if (!file) return;
    
    // Validate file type
    if (!file.type.includes('image/')) {
      toast.error("Please upload an image file");
      return;
    }
    
    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      toast.error("File size must be less than 5MB");
      return;
    }
    
    try {
      setUploading(true);
      
      // Convert file to base64 for preview and storage
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (!e.target?.result) {
          setUploading(false);
          return;
        }
        
        const base64Image = e.target.result as string;
        
        // Update form value with base64 image
        if (type === 'logo') {
          form.setValue('logo', base64Image);
        } else {
          form.setValue('bannerImage', base64Image);
        }
        
        // Set preview last to avoid render issues
        setPreview(base64Image);
        setUploading(false);
      };
      
      reader.readAsDataURL(file);
    } catch (error) {
      console.error(`Error uploading ${type}:`, error);
      toast.error(`Failed to upload ${type}`);
      setUploading(false);
    }
  }, [form]);

  const handleLogoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'logo', setIsLogoUploading, setLogoPreview);
    }
  }, [handleFileUpload]);

  const handleBannerUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file, 'banner', setIsBannerUploading, setBannerPreview);
    }
  }, [handleFileUpload]);

  const removeLogo = useCallback(() => {
    setLogoPreview(null);
    form.setValue('logo', '');
  }, [form]);

  const removeBanner = useCallback(() => {
    setBannerPreview(null);
    form.setValue('bannerImage', '');
  }, [form]);

  if (isFetching) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="flex flex-col items-center space-y-4">
          <RefreshCw className="h-12 w-12 text-primary animate-spin" />
          <p className="text-muted-foreground">Loading store data...</p>
        </div>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Store Images */}
          <Card className="col-span-1 border-l-4 border-l-purple-500 shadow-md bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-purple-700 dark:text-purple-300">Store Images</CardTitle>
              <CardDescription className="font-medium text-purple-600/70 dark:text-purple-400/70">Upload your store logo and banner image</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Logo Upload */}
              <div className="space-y-4">
                <FormLabel className="text-sm font-semibold text-purple-700 dark:text-purple-300">Store Logo</FormLabel>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 dark:border-purple-800/40 rounded-lg p-6 transition-all hover:border-purple-300 dark:hover:border-purple-700">
                  {logoPreview ? (
                    <div className="relative">
                      <div className="w-32 h-32 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-inner flex items-center justify-center">
                        <img 
                          src={logoPreview} 
                          alt="Store logo" 
                          className="w-full h-full object-contain"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md"
                        onClick={removeLogo}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label 
                      htmlFor="logo-upload" 
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="w-20 h-20 rounded-full bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 shadow-inner">
                        <StoreIcon className="h-10 w-10 text-purple-500" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Upload className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">Upload Logo</span>
                      </div>
                      <p className="text-xs text-purple-500/70 mt-2">
                        Recommended: square image, 512×512px
                      </p>
                    </label>
                  )}
                  <input
                    id="logo-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isLogoUploading}
                    onChange={handleLogoUpload}
                  />
                </div>
              </div>

              {/* Banner Upload */}
              <div className="space-y-4">
                <FormLabel className="text-sm font-semibold text-purple-700 dark:text-purple-300">Banner Image</FormLabel>
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-purple-200 dark:border-purple-800/40 rounded-lg p-6 transition-all hover:border-purple-300 dark:hover:border-purple-700">
                  {bannerPreview ? (
                    <div className="relative w-full">
                      <div className="w-full h-40 rounded-lg overflow-hidden bg-white dark:bg-slate-900 shadow-inner">
                        <img 
                          src={bannerPreview} 
                          alt="Store banner" 
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute -top-2 -right-2 h-8 w-8 rounded-full shadow-md"
                        onClick={removeBanner}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ) : (
                    <label 
                      htmlFor="banner-upload" 
                      className="flex flex-col items-center justify-center cursor-pointer"
                    >
                      <div className="w-full h-24 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center mb-4 shadow-inner">
                        <ImageIcon className="h-10 w-10 text-purple-500" />
                      </div>
                      <div className="flex items-center gap-1">
                        <Upload className="h-4 w-4 text-purple-600" />
                        <span className="text-sm font-medium text-purple-600">Upload Banner</span>
                      </div>
                      <p className="text-xs text-purple-500/70 mt-2">
                        Recommended: 1200×400px, landscape orientation
                      </p>
                    </label>
                  )}
                  <input
                    id="banner-upload"
                    type="file"
                    accept="image/*"
                    className="hidden"
                    disabled={isBannerUploading}
                    onChange={handleBannerUpload}
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Store Information */}
          <Card className="col-span-1 border-l-4 border-l-indigo-500 shadow-md bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-slate-900">
            <CardHeader className="pb-3">
              <CardTitle className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Store Information</CardTitle>
              <CardDescription className="font-medium text-indigo-600/70 dark:text-indigo-400/70">Basic details about your store</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Store Name</FormLabel>
                    <FormControl>
                      <Input placeholder="My Awesome Store" {...field} className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500" />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="slug"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Store URL</FormLabel>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-indigo-600/70 dark:text-indigo-400/70">yoursite.com/store/</span>
                      <FormControl>
                        <Input placeholder="my-store" {...field} className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500" />
                      </FormControl>
                    </div>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField
                  control={form.control}
                  name="type"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Store Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="wholesale">Wholesale</SelectItem>
                          <SelectItem value="marketplace">Marketplace</SelectItem>
                          <SelectItem value="dropshipping">Dropshipping</SelectItem>
                          <SelectItem value="subscription">Subscription</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-rose-500" />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="businessType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Business Type</FormLabel>
                      <Select 
                        onValueChange={field.onChange} 
                        defaultValue={field.value}
                        value={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500">
                            <SelectValue placeholder="Select a type" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="fashion">Fashion & Apparel</SelectItem>
                          <SelectItem value="electronics">Electronics</SelectItem>
                          <SelectItem value="food">Food & Grocery</SelectItem>
                          <SelectItem value="health">Health & Beauty</SelectItem>
                          <SelectItem value="home">Home & Furniture</SelectItem>
                          <SelectItem value="services">Services</SelectItem>
                          <SelectItem value="digital">Digital Products</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage className="text-rose-500" />
                    </FormItem>
                  )}
                />
              </div>
              
              <FormField
                control={form.control}
                name="theme"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Store Theme</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                      value={field.value}
                    >
                      <FormControl>
                        <SelectTrigger className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500">
                          <SelectValue placeholder="Select a theme" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="modern">Modern</SelectItem>
                        <SelectItem value="classic">Classic</SelectItem>
                        <SelectItem value="minimal">Minimal</SelectItem>
                        <SelectItem value="bold">Bold</SelectItem>
                        <SelectItem value="elegant">Elegant</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Tell customers about your store..." 
                        className="resize-none h-[120px] border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>
        </div>

        {/* Contact Information */}
        <Card className="border-l-4 border-l-cyan-500 shadow-md bg-gradient-to-br from-white to-cyan-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-cyan-700 dark:text-cyan-300">Contact Information</CardTitle>
            <CardDescription className="font-medium text-cyan-600/70 dark:text-cyan-400/70">How customers can reach you</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="contactEmail"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Contact Email</FormLabel>
                    <FormControl>
                      <Input placeholder="contact@mystore.com" {...field} className="border-cyan-200 dark:border-cyan-900/50 focus-visible:ring-cyan-500" />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactPhone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Contact Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="+1 (123) 456-7890" {...field} className="border-cyan-200 dark:border-cyan-900/50 focus-visible:ring-cyan-500" />
                    </FormControl>
                    <FormMessage className="text-rose-500" />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-cyan-700 dark:text-cyan-300">Address</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Physical address (optional)" 
                      className="resize-none h-[80px] border-cyan-200 dark:border-cyan-900/50 focus-visible:ring-cyan-500" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        {/* Store Status */}
        <Card className="border-l-4 border-l-emerald-500 shadow-md bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-900">
          <CardHeader className="pb-3">
            <CardTitle className="text-xl font-bold text-emerald-700 dark:text-emerald-300">Store Status</CardTitle>
            <CardDescription className="font-medium text-emerald-600/70 dark:text-emerald-400/70">Control the visibility of your store</CardDescription>
          </CardHeader>
          <CardContent>
            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Status</FormLabel>
                  <Select 
                    onValueChange={field.onChange} 
                    defaultValue={field.value}
                    value={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="border-emerald-200 dark:border-emerald-900/50 focus-visible:ring-emerald-500">
                        <SelectValue placeholder="Select a status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="active">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-emerald-500 mr-2"></div>
                          Active
                        </div>
                      </SelectItem>
                      <SelectItem value="inactive">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-gray-500 mr-2"></div>
                          Inactive
                        </div>
                      </SelectItem>
                      <SelectItem value="pending">
                        <div className="flex items-center">
                          <div className="h-2 w-2 rounded-full bg-yellow-500 mr-2"></div>
                          Pending
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
          </CardContent>
        </Card>

        <Separator className="bg-gradient-to-r from-indigo-200 via-purple-300 to-cyan-200 dark:from-indigo-900 dark:via-purple-800 dark:to-cyan-900 h-0.5" />

        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={loading || isLogoUploading || isBannerUploading}
            className="w-full md:w-auto bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 dark:from-indigo-500 dark:to-purple-500 shadow-lg"
          >
            {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {loading ? "Saving..." : "Save Changes"}
          </Button>
        </div>
      </form>
    </Form>
  );
} 