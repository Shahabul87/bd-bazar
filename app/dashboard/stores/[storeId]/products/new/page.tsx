"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

const formSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Product name must be less than 100 characters"),
});

type AddProductFormValues = z.infer<typeof formSchema>;

export default function NewProductPage() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId as string;
  
  const [loading, setLoading] = useState(false);

  const form = useForm<AddProductFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  const onSubmit = async (values: AddProductFormValues) => {
    try {
      setLoading(true);
      
      // Create the product with just the name
      const response = await axios.post(`/api/stores/${storeId}/products`, {
        name: values.name,
      });
      
      // Get the product ID from the response
      const productId = response.data.id;
      
      toast.success("Product created successfully");
      
      // Redirect to the product detail page
      router.push(`/dashboard/stores/${storeId}/products/${productId}`);
    } catch (error: any) {
      console.error("Error creating product:", error);
      const errorMessage = error.response?.data?.message || 
                          "Failed to create product. Please try again.";
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 space-y-6 bg-white dark:bg-slate-900 rounded-xl shadow">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold">Add New Product</h1>
        <p className="text-slate-500 dark:text-slate-400">
          Create a new product for your store.
        </p>
      </div>
      
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-sm font-semibold">
                  Product Name
                </FormLabel>
                <FormControl>
                  <Input 
                    placeholder="e.g., Premium T-Shirt" 
                    className="border-slate-200 dark:border-slate-700"
                    disabled={loading}
                    {...field} 
                  />
                </FormControl>
                <FormMessage className="text-rose-500" />
              </FormItem>
            )}
          />
          
          <div className="flex space-x-2">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => router.back()}
              disabled={loading}
              className="border-slate-200 dark:border-slate-700"
            >
              Cancel
            </Button>
            <Button 
              type="submit" 
              disabled={loading}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white"
            >
              {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {loading ? "Creating..." : "Create Product"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
} 