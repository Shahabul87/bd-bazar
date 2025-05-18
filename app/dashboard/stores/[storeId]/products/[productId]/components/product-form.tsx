'use client';

import { useState, useEffect } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { 
  DollarSign, 
  Box,
  FileText,
  ImageIcon,
  Clock,
  Loader2,
  Save
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { 
  Form, 
  FormControl, 
  FormDescription, 
  FormField, 
  FormItem, 
  FormLabel, 
  FormMessage 
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProductImageUpload } from "../../components/product-image-upload";
import { ProductHeader } from "./product-header";
import { ProductLoading } from "./product-loading";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { motion, AnimatePresence } from "framer-motion";

// Mock data categories for the form
const categories = ["Clothing", "Electronics", "Accessories", "Home", "Beauty", "Books"];

// Form schema
const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100),
  description: z.string().max(500).optional(),
  price: z.coerce.number().min(0, "Price must be positive"),
  category: z.string().min(1, "Category is required"),
  stock: z.coerce.number().int().min(0, "Stock must be a non-negative integer"),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
});

export type ProductFormValues = z.infer<typeof formSchema>;

interface ProductFormProps {
  initialData: any;
  storeId: string;
  productId: string;
}

export const ProductForm = ({ initialData, storeId, productId }: ProductFormProps) => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [savingSection, setSavingSection] = useState<string | null>(null);
  const [product, setProduct] = useState<any>(initialData);

  // Initialize form with default values
  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      description: initialData?.description || "",
      price: parseFloat(initialData?.price?.toString() || "0"),
      category: initialData?.categories?.[0]?.mainCategory || "Electronics",
      stock: initialData?.stock || 0,
      isFeatured: initialData?.featured || false,
      isArchived: initialData?.status === "archived" || false,
    },
  });

  // Handler for saving basic information only
  const saveBasicInfo = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      setSavingSection('basic');
      
      const formValues = form.getValues();
      const updateData = {
        name: formValues.name,
        description: formValues.description || "",
        price: formValues.price,
      };
      
      console.log("Updating basic info:", updateData);
      const response = await axios.patch(`/api/products/${productId}`, updateData);
      console.log("Response:", response.data);
      
      setProduct(response.data);
      toast.success("Basic information updated");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating basic info:", error);
      toast.error(error.response?.data?.error || "Failed to update basic information");
    } finally {
      setSavingSection(null);
    }
  };
  
  // Handler for saving product status only
  const saveProductStatus = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      setSavingSection('status');
      
      const formValues = form.getValues();
      const updateData = {
        featured: formValues.isFeatured,
        status: formValues.isArchived ? "archived" : "active",
      };
      
      console.log("Updating product status:", updateData);
      const response = await axios.patch(`/api/products/${productId}`, updateData);
      console.log("Response:", response.data);
      
      setProduct(response.data);
      toast.success("Product status updated");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating product status:", error);
      toast.error(error.response?.data?.error || "Failed to update product status");
    } finally {
      setSavingSection(null);
    }
  };
  
  // Handler for saving inventory information only
  const saveInventory = async (e: React.MouseEvent) => {
    e.preventDefault();
    
    try {
      setSavingSection('inventory');
      
      const formValues = form.getValues();
      const updateData = {
        stock: formValues.stock,
      };
      
      console.log("Updating inventory:", updateData);
      const response = await axios.patch(`/api/products/${productId}`, updateData);
      console.log("Response:", response.data);
      
      setProduct(response.data);
      toast.success("Inventory updated");
      router.refresh();
    } catch (error: any) {
      console.error("Error updating inventory:", error);
      toast.error(error.response?.data?.error || "Failed to update inventory");
    } finally {
      setSavingSection(null);
    }
  };

  if (isLoading) {
    return <ProductLoading />;
  }

  return (
    <div className="space-y-6">
      {/* Header with actions */}
      <ProductHeader
        storeId={storeId}
        productId={productId}
        form={form}
        isLoading={isLoading}
        savingSection={savingSection}
      />

      {/* Main content */}
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 bg-gradient-to-r from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 p-1 rounded-xl shadow-md">
          <TabsTrigger 
            value="general" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <FileText className="h-4 w-4" />
            <span>General</span>
          </TabsTrigger>
          <TabsTrigger 
            value="images" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <ImageIcon className="h-4 w-4" />
            <span>Images</span>
          </TabsTrigger>
          <TabsTrigger 
            value="inventory" 
            className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-indigo-500 data-[state=active]:to-purple-500 data-[state=active]:text-white rounded-lg transition-all"
          >
            <Box className="h-4 w-4" />
            <span>Inventory</span>
          </TabsTrigger>
        </TabsList>
        
        <Form {...form}>
          <form>
            <TabsContent value="general" className="space-y-6">
              <Card className="border-l-4 border-l-indigo-500 shadow-md bg-gradient-to-br from-white to-indigo-50 dark:from-slate-800 dark:to-slate-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-indigo-700 dark:text-indigo-300">Basic Information</CardTitle>
                  <CardDescription className="font-medium text-indigo-600/70 dark:text-indigo-400/70">
                    Core details about your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Product Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Product Name"
                            {...field}
                            className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500"
                          />
                        </FormControl>
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
                            placeholder="Describe your product..."
                            className="resize-none h-24 border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Price</FormLabel>
                          <FormControl>
                            <div className="relative">
                              <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-indigo-500/60" />
                              <Input
                                type="number"
                                placeholder="0.00"
                                {...field}
                                className="pl-9 border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500"
                              />
                            </div>
                          </FormControl>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="category"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-sm font-semibold text-indigo-700 dark:text-indigo-300">Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-indigo-200 dark:border-indigo-900/50 focus-visible:ring-indigo-500">
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category} value={category}>{category}</SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage className="text-rose-500" />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-indigo-100 dark:border-indigo-800/30 pt-4">
                  <Button
                    type="button"
                    onClick={saveBasicInfo}
                    disabled={savingSection === 'basic'}
                    className="bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700"
                  >
                    {savingSection === 'basic' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {savingSection === 'basic' ? "Saving..." : "Save Basic Info"}
                  </Button>
                </CardFooter>
              </Card>
              
              <Card className="border-l-4 border-l-purple-500 shadow-md bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-purple-700 dark:text-purple-300">Product Status</CardTitle>
                  <CardDescription className="font-medium text-purple-600/70 dark:text-purple-400/70">
                    Control visibility and featured status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="isFeatured"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-200 dark:border-purple-900/50 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-sm font-semibold text-purple-700 dark:text-purple-300">Featured</FormLabel>
                            <FormDescription className="text-xs text-purple-600/70 dark:text-purple-400/70">
                              This product will appear on the home page
                            </FormDescription>
                          </div>
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="accent-purple-600 h-5 w-5"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="isArchived"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between rounded-lg border border-purple-200 dark:border-purple-900/50 p-4">
                          <div className="space-y-0.5">
                            <FormLabel className="text-sm font-semibold text-purple-700 dark:text-purple-300">Archived</FormLabel>
                            <FormDescription className="text-xs text-purple-600/70 dark:text-purple-400/70">
                              This product will not appear in the store
                            </FormDescription>
                          </div>
                          <FormControl>
                            <input
                              type="checkbox"
                              checked={field.value}
                              onChange={field.onChange}
                              className="accent-purple-600 h-5 w-5"
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
                <CardFooter className="flex justify-end border-t border-purple-100 dark:border-purple-800/30 pt-4">
                  <Button
                    type="button"
                    onClick={saveProductStatus}
                    disabled={savingSection === 'status'}
                    className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700"
                  >
                    {savingSection === 'status' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {savingSection === 'status' ? "Saving..." : "Save Status"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
            
            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload and manage images for this product. The first image will be used as the main product image.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ProductImageUpload 
                    storeId={storeId} 
                    productId={productId}
                    initialImages={product?.images || []}
                  />
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="inventory" className="space-y-6">
              <Card className="border-l-4 border-l-emerald-500 shadow-md bg-gradient-to-br from-white to-emerald-50 dark:from-slate-800 dark:to-slate-900">
                <CardHeader className="pb-3">
                  <CardTitle className="text-xl font-bold text-emerald-700 dark:text-emerald-300">Inventory Management</CardTitle>
                  <CardDescription className="font-medium text-emerald-600/70 dark:text-emerald-400/70">
                    Manage stock levels and inventory details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <FormField
                    control={form.control}
                    name="stock"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-sm font-semibold text-emerald-700 dark:text-emerald-300">Stock Level</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Box className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-emerald-500/60" />
                            <Input
                              type="number"
                              placeholder="0"
                              {...field}
                              className="pl-9 border-emerald-200 dark:border-emerald-900/50 focus-visible:ring-emerald-500"
                            />
                          </div>
                        </FormControl>
                        <FormDescription className="text-xs text-emerald-600/70 dark:text-emerald-400/70">
                          Current inventory available for sale
                        </FormDescription>
                        <FormMessage className="text-rose-500" />
                      </FormItem>
                    )}
                  />
                </CardContent>
                <CardFooter className="flex justify-end border-t border-emerald-100 dark:border-emerald-800/30 pt-4">
                  <Button
                    type="button"
                    onClick={saveInventory}
                    disabled={savingSection === 'inventory'}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700"
                  >
                    {savingSection === 'inventory' ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                    {savingSection === 'inventory' ? "Saving..." : "Save Inventory"}
                  </Button>
                </CardFooter>
              </Card>
            </TabsContent>
          </form>
        </Form>
        
        {/* Product Creation Info */}
        {product && (
          <div className="mt-8 text-xs text-muted-foreground flex items-center justify-center">
            <Clock className="h-3 w-3 mr-1" />
            <span>Product created on {new Date(product.createdAt).toLocaleDateString()}</span>
          </div>
        )}
      </Tabs>
    </div>
  );
}; 