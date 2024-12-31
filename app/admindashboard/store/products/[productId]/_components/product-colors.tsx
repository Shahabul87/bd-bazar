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

const colorSchema = z.object({
  name: z.string().min(1, "Color name is required"),
  value: z.string().min(1, "Color value is required (e.g., hex code or name)"),
})

type ColorFormValues = z.infer<typeof colorSchema>

interface ProductColorsProps {
  initialData: any;
  productId: string;
}

export const ProductColors = ({
  initialData,
  productId
}: ProductColorsProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [colors, setColors] = useState<Array<{ name: string; value: string }>>(() => {
    try {
      const cols = initialData.colors || {};
      return Array.isArray(cols) 
        ? cols 
        : Object.entries(cols).map(([name, value]) => ({ 
            name, 
            value: String(value) 
          }));
    } catch {
      return [];
    }
  });

  const form = useForm<ColorFormValues>({
    resolver: zodResolver(colorSchema),
    defaultValues: {
      name: "",
      value: ""
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: ColorFormValues) => {
    try {
      if (colors.some(color => color.name.toLowerCase() === values.name.toLowerCase())) {
        toast.error("Color with this name already exists");
        return;
      }

      const newColors = [...colors, values];
      
      await axios.patch(`/api/products/${productId}/colors`, {
        colors: newColors
      });

      setColors(newColors);
      toast.success("Color added successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to add color");
    }
  };

  const removeColor = async (index: number) => {
    try {
      const newColors = colors.filter((_, i) => i !== index);
      
      await axios.patch(`/api/products/${productId}/colors`, {
        colors: newColors
      });

      setColors(newColors);
      toast.success("Color removed successfully");
    } catch (error) {
      toast.error("Failed to remove color");
    }
  };

  return (
    <div className="mt-6 border border-gray-800 rounded-lg bg-gray-900 shadow-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Product Colors
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Add available color options
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
                        placeholder="Color name (e.g., Royal Blue)"
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
                        placeholder="Color value (e.g., #4169E1)"
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
            {colors.map((color, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-gray-700"
              >
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-400">Name:</span>{" "}
                    {color.name}
                  </p>
                  <div className="flex items-center gap-2">
                    <p className="text-sm text-gray-300">
                      <span className="font-medium text-gray-400">Value:</span>{" "}
                      {color.value}
                    </p>
                    <div 
                      className="w-6 h-6 rounded border border-gray-600"
                      style={{ backgroundColor: color.value }}
                    />
                  </div>
                </div>
                <Button
                  onClick={() => removeColor(index)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {colors.length > 0 && (
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
          {colors.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {colors.map((color, index) => (
                <div
                  key={index}
                  className="px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700 flex items-center justify-between"
                >
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-blue-400">{color.name}:</span>{" "}
                    <span className="text-gray-100">{color.value}</span>
                  </p>
                  <div 
                    className="w-6 h-6 rounded border border-gray-600"
                    style={{ backgroundColor: color.value }}
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No colors added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}; 