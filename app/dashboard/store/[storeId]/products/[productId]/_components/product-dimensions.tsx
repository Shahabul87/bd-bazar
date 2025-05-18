"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import axios from "axios"
import { toast } from "sonner"
import { Plus, X, Save } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

const dimensionSchema = z.object({
  name: z.string().min(1, "Dimension name is required"),
  value: z.string().min(1, "Dimension value is required"),
})

type DimensionFormValues = z.infer<typeof dimensionSchema>

interface ProductDimensionsProps {
  initialData: any;
  productId: string;
}

export const ProductDimensions = ({
  initialData,
  productId
}: ProductDimensionsProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [dimensions, setDimensions] = useState<Array<{ name: string; value: string }>>(() => {
    try {
      const dims = initialData.dimensions || {};
      return Array.isArray(dims) 
        ? dims 
        : Object.entries(dims).map(([name, value]) => ({ 
            name, 
            value: String(value) 
          }));
    } catch {
      return [];
    }
  });

  const form = useForm<DimensionFormValues>({
    resolver: zodResolver(dimensionSchema),
    defaultValues: {
      name: "",
      value: ""
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: DimensionFormValues) => {
    try {
      if (dimensions.some(dim => dim.name.toLowerCase() === values.name.toLowerCase())) {
        toast.error("Dimension with this name already exists");
        return;
      }

      const newDimensions = [...dimensions, values];
      
      await axios.patch(`/api/products/${productId}/dimensions`, {
        dimensions: newDimensions
      });

      setDimensions(newDimensions);
      toast.success("Dimension added successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to add dimension");
    }
  };

  const removeDimension = async (index: number) => {
    try {
      const newDimensions = dimensions.filter((_, i) => i !== index);
      
      await axios.patch(`/api/products/${productId}/dimensions`, {
        dimensions: newDimensions
      });

      setDimensions(newDimensions);
      toast.success("Dimension removed successfully");
    } catch (error) {
      toast.error("Failed to remove dimension");
    }
  };

  return (
    <div className="mt-6 border border-gray-800 rounded-lg bg-gray-900 shadow-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Product Dimensions
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Add size and dimension details
          </p>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {isEditing ? (
        <div className="mt-4 space-y-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Dimension name (e.g., Length, Width)"
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
                name="value"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="Value (e.g., 10cm, 5 inches)"
                        disabled={isSubmitting}
                        className="bg-gray-800 border-gray-700 text-white placeholder:text-gray-500"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button 
                type="submit" 
                disabled={!isValid || isSubmitting}
                size="sm"
              >
                <Plus className="h-4 w-4" />
                Add
              </Button>
            </form>
          </Form>

          <div className="space-y-2">
            {dimensions.map((dim, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-gray-700"
              >
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-400">Name:</span>{" "}
                    {dim.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-400">Value:</span>{" "}
                    {dim.value}
                  </p>
                </div>
                <Button
                  onClick={() => removeDimension(index)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {dimensions.length > 0 && (
            <div className="flex justify-end pt-4 border-t border-gray-700">
              <Button
                onClick={() => setIsEditing(false)}
                className="bg-blue-600 hover:bg-blue-700 transition-colors"
              >
                <Save className="h-4 w-4 mr-2" />
                Done
              </Button>
            </div>
          )}
        </div>
      ) : (
        <div className="mt-4 space-y-4">
          {dimensions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {dimensions.map((dim, index) => (
                <div
                  key={index}
                  className="px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700"
                >
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-blue-400">{dim.name}:</span>{" "}
                    <span className="text-gray-100">{dim.value}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No dimensions added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}; 