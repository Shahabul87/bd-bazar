"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader2, Plus, X } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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

export function AddProductModal() {
  const router = useRouter();
  const params = useParams();
  const storeId = params.storeId as string;
  
  const [open, setOpen] = useState(false);
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
      
      // Reset form and close modal
      form.reset();
      setOpen(false);
      
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md transition-all duration-200 font-medium">
          <Plus className="mr-2 h-4 w-4" />
          Add Product
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md bg-white dark:bg-slate-900 border-0 p-0 shadow-xl rounded-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-violet-600 p-6">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl text-white font-bold">Add New Product</DialogTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setOpen(false)}
              className="text-white hover:bg-white/20 rounded-full h-8 w-8 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-indigo-100 mt-1 text-sm">
            Enter a name for your new product. You can add more details later.
          </p>
        </div>
        
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="p-6 space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                    Product Name
                  </FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="e.g., Premium T-Shirt" 
                      className="border-slate-200 dark:border-slate-700 focus-visible:ring-indigo-500"
                      disabled={loading}
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage className="text-rose-500" />
                </FormItem>
              )}
            />
            
            <div className="flex justify-end gap-2">
              <Button 
                type="button" 
                variant="outline" 
                onClick={() => {
                  form.reset();
                  setOpen(false);
                }}
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
      </DialogContent>
    </Dialog>
  );
} 