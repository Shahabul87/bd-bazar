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

const specificationSchema = z.object({
  name: z.string().min(1, "Specification name is required"),
  value: z.string().min(1, "Specification value is required"),
})

type SpecificationFormValues = z.infer<typeof specificationSchema>

interface ProductSpecificationProps {
  initialData: any;
  productId: string;
}

export const ProductSpecification = ({
  initialData,
  productId
}: ProductSpecificationProps) => {
  const [isEditing, setIsEditing] = useState(false)
  const [specifications, setSpecifications] = useState<Array<{ name: string; value: string }>>(() => {
    try {
      const specs = initialData.specifications || {};
      return Array.isArray(specs) 
        ? specs 
        : Object.entries(specs).map(([name, value]) => ({ 
            name, 
            value: String(value) 
          }));
    } catch {
      return [];
    }
  });

  const form = useForm<SpecificationFormValues>({
    resolver: zodResolver(specificationSchema),
    defaultValues: {
      name: "",
      value: ""
    }
  });

  const { isSubmitting, isValid } = form.formState;

  const onSubmit = async (values: SpecificationFormValues) => {
    try {
      if (specifications.some(spec => spec.name.toLowerCase() === values.name.toLowerCase())) {
        toast.error("Specification with this name already exists");
        return;
      }

      const newSpecifications = [...specifications, values];
      
      await axios.patch(`/api/products/${productId}/specifications`, {
        specifications: newSpecifications
      });

      setSpecifications(newSpecifications);
      toast.success("Specification added successfully");
      form.reset();
    } catch (error) {
      toast.error("Failed to add specification");
    }
  };

  const removeSpecification = async (index: number) => {
    try {
      const newSpecifications = specifications.filter((_, i) => i !== index);
      
      await axios.patch(`/api/products/${productId}/specifications`, {
        specifications: newSpecifications
      });

      setSpecifications(newSpecifications);
      toast.success("Specification removed successfully");
    } catch (error) {
      toast.error("Failed to remove specification");
    }
  };

  return (
    <div className="mt-6 border border-gray-800 rounded-lg bg-gray-900 shadow-xl p-6">
      <div className="flex items-center justify-between border-b border-gray-800 pb-4">
        <div>
          <h2 className="text-xl font-semibold text-white tracking-tight">
            Product Specifications
          </h2>
          <p className="text-sm text-gray-400 mt-1">
            Add technical details and specifications
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
                        placeholder="Specification name"
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
                        placeholder="Specification value"
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
            {specifications.map((spec, index) => (
              <div 
                key={index}
                className="flex items-center justify-between p-3 rounded-md bg-gray-800 border border-gray-700"
              >
                <div className="grid grid-cols-2 gap-4 flex-1">
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-400">Name:</span>{" "}
                    {spec.name}
                  </p>
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-gray-400">Value:</span>{" "}
                    {spec.value}
                  </p>
                </div>
                <Button
                  onClick={() => removeSpecification(index)}
                  variant="ghost"
                  size="sm"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
          </div>

          {specifications.length > 0 && (
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
          {specifications.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {specifications.map((spec, index) => (
                <div
                  key={index}
                  className="px-4 py-3 rounded-md bg-gray-800/50 border border-gray-700"
                >
                  <p className="text-sm text-gray-300">
                    <span className="font-medium text-blue-400">{spec.name}:</span>{" "}
                    <span className="text-gray-100">{spec.value}</span>
                  </p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-sm text-gray-400">No specifications added yet.</p>
          )}
        </div>
      )}
    </div>
  );
}; 