"use client";

import * as z from "zod";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { Pencil, Save, X, DollarSign, Package, Tag, Building2, FileText } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";

const formSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  brand: z.string().min(1, { message: "Brand is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  price: z.string().min(1, { message: "Price is required" }),
  sku: z.string().min(1, { message: "SKU is required" }),
  stock: z.string().min(1, { message: "Stock is required" }),
  status: z.enum(["active", "draft"]),
  featured: z.boolean()
});

export const ProductBasicInformation = ({ 
  initialData,
  productId 
}: { 
  initialData: any;
  productId: string;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: initialData?.name || "",
      brand: initialData?.brand || "",
      description: initialData?.description || "",
      price: String(initialData?.price) || "",
      sku: initialData?.sku || "",
      stock: String(initialData?.stock) || "",
      status: initialData?.status || "draft",
      featured: initialData?.featured || false
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch(`/api/products/${productId}`, values);
      toast.success("Product updated");
      setIsEditing(false);
      router.refresh();
    } catch {
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border border-gray-800 rounded-lg bg-gray-900 shadow-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Basic Information
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            View and update product details
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {isEditing ? (
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Name field */}
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Tag className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Product Name</span>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter product name"
                      disabled={isSubmitting}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            {/* Brand field */}
            <FormField
              control={form.control}
              name="brand"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <Building2 className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Brand</span>
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter brand name"
                      disabled={isSubmitting}
                      className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Description field */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center gap-2 text-gray-400 mb-2">
                    <FileText className="h-4 w-4" />
                    <span className="text-xs uppercase tracking-wider">Description</span>
                  </div>
                  <FormControl>
                    <textarea
                      {...field}
                      placeholder="Enter product description"
                      disabled={isSubmitting}
                      className="w-full min-h-[200px] bg-gray-800 border-gray-700 rounded-lg p-3 
                        text-white placeholder:text-gray-500 resize-none 
                        focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Price, SKU, Stock fields */}
            <div className="grid grid-cols-3 gap-6">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <DollarSign className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wider">Price</span>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        step="0.01"
                        placeholder="0.00"
                        disabled={isSubmitting}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="sku"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Package className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wider">SKU</span>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Enter SKU"
                        disabled={isSubmitting}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                      <Package className="h-4 w-4" />
                      <span className="text-xs uppercase tracking-wider">Stock</span>
                    </div>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        disabled={isSubmitting}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Status and Featured toggles */}
            <div className="flex justify-between items-center p-4 bg-gray-800/50 rounded-lg">
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white mb-1">Active Status</span>
                      <span className="text-xs text-gray-400">Enable or disable product</span>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value === "active"}
                        onCheckedChange={(checked) => field.onChange(checked ? "active" : "draft")}
                        disabled={isSubmitting}
                        className="data-[state=checked]:bg-green-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="featured"
                render={({ field }) => (
                  <FormItem className="flex items-center gap-4">
                    <div className="flex flex-col">
                      <span className="text-sm font-medium text-white mb-1">Featured Product</span>
                      <span className="text-xs text-gray-400">Show in featured section</span>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        disabled={isSubmitting}
                        className="data-[state=checked]:bg-blue-500"
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>

            <div className="flex justify-end pt-4 border-t border-gray-700">
              <Button
                type="submit"
                disabled={!isValid || isSubmitting}
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                {isSubmitting ? "Saving..." : "Save changes"}
              </Button>
            </div>
          </form>
        </Form>
      ) : (
        <div className="mt-4 space-y-4">
          {/* Product Name Card - Full Width */}
          <div className="px-4 py-3 rounded-md bg-blue-900/50 border border-blue-800">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-blue-400">Product Name:</span>{" "}
              <span className="text-gray-100 font-medium text-lg">{initialData.name}</span>
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {/* Price Card */}
            <div className="px-4 py-3 rounded-md bg-amber-900/50 border border-amber-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-amber-400">Price:</span>{" "}
                <span className="text-gray-100">${initialData.price}</span>
              </p>
            </div>

            {/* SKU Card */}
            <div className="px-4 py-3 rounded-md bg-indigo-900/50 border border-indigo-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-indigo-400">SKU:</span>{" "}
                <span className="text-gray-100">{initialData.sku || "Not set"}</span>
              </p>
            </div>

            {/* Stock Card */}
            <div className="px-4 py-3 rounded-md bg-rose-900/50 border border-rose-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-rose-400">Stock:</span>{" "}
                <span className="text-gray-100">{initialData.stock}</span>
              </p>
            </div>

            {/* Status Card */}
            <div className="px-4 py-3 rounded-md bg-cyan-900/50 border border-cyan-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-cyan-400">Status:</span>{" "}
                <span className="text-gray-100 capitalize">{initialData.status}</span>
              </p>
            </div>

            {/* Featured Card */}
            <div className="px-4 py-3 rounded-md bg-fuchsia-900/50 border border-fuchsia-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-fuchsia-400">Featured:</span>{" "}
                <span className="text-gray-100">{initialData.featured ? "Yes" : "No"}</span>
              </p>
            </div>

            {/* Brand Card */}
            <div className="px-4 py-3 rounded-md bg-teal-900/50 border border-teal-800">
              <p className="text-sm text-gray-300">
                <span className="font-medium text-teal-400">Brand:</span>{" "}
                <span className="text-gray-100">{initialData.brand || "Not set"}</span>
              </p>
            </div>
          </div>

          {/* Description Card - Full Width */}
          <div className="mt-4 px-4 py-3 rounded-md bg-violet-900/50 border border-violet-800">
            <p className="text-sm text-gray-300">
              <span className="font-medium text-violet-400">Description:</span>{" "}
              <span className="text-gray-100 block mt-1">{initialData.description || "No description"}</span>
            </p>
          </div>
        </div>
      )}
    </div>
  );
};