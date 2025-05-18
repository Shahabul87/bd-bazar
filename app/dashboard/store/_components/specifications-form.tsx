"use client"

import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { 
  RulerSquare, 
  Weight, 
  Palette, 
  Box, 
  Tool, 
  Shield, 
  Shirt
} from "lucide-react"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"

const specificationSchema = z.object({
  dimensions: z.object({
    length: z.string().min(1, "Length is required"),
    width: z.string().min(1, "Width is required"),
    height: z.string().min(1, "Height is required"),
    unit: z.string().default("inches")
  }).optional(),
  weight: z.object({
    value: z.string().min(1, "Weight is required"),
    unit: z.string().default("pounds")
  }).optional(),
  color: z.string().optional(),
  material: z.string().optional(),
  selectedSizes: z.array(z.string()).optional(),
  technicalSpecs: z.string().optional(),
  warranty: z.string().optional()
});

type SpecificationFormValues = z.infer<typeof specificationSchema>;

interface SpecificationsFormProps {
  specifications: any;
  value: any;
  onChange: (value: any) => void;
  sizeOptions?: string[];
}

export const SpecificationsForm = ({
  specifications,
  value,
  onChange,
  sizeOptions
}: SpecificationsFormProps) => {
  const form = useForm<SpecificationFormValues>({
    resolver: zodResolver(specificationSchema),
    defaultValues: value || {}
  });

  const onSubmit = (data: SpecificationFormValues) => {
    onChange(data);
  };

  if (!specifications) return null;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Dimensions */}
        {specifications.dimensions && (
          <FormField
            control={form.control}
            name="dimensions"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <RulerSquare className="h-4 w-4 text-blue-400" />
                  <label className="text-sm font-medium text-white">
                    Dimensions
                  </label>
                </div>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Length"
                        {...field}
                        value={field.value?.length || ""}
                        onChange={e => {
                          field.onChange({
                            ...field.value,
                            length: e.target.value
                          });
                        }}
                        className="bg-gray-900 border-gray-700 text-white 
                          placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-400 mt-1">
                      Length in {field.value?.unit || 'inches'}
                    </FormDescription>
                  </div>
                  <div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Width"
                        {...field}
                        value={field.value?.width || ""}
                        onChange={e => {
                          field.onChange({
                            ...field.value,
                            width: e.target.value
                          });
                        }}
                        className="bg-gray-900 border-gray-700 text-white 
                          placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-400 mt-1">
                      Width in {field.value?.unit || 'inches'}
                    </FormDescription>
                  </div>
                  <div>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Height"
                        {...field}
                        value={field.value?.height || ""}
                        onChange={e => {
                          field.onChange({
                            ...field.value,
                            height: e.target.value
                          });
                        }}
                        className="bg-gray-900 border-gray-700 text-white 
                          placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                      />
                    </FormControl>
                    <FormDescription className="text-xs text-gray-400 mt-1">
                      Height in {field.value?.unit || 'inches'}
                    </FormDescription>
                  </div>
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Weight */}
        {specifications.weight && (
          <FormField
            control={form.control}
            name="weight"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Weight className="h-4 w-4 text-green-400" />
                  <label className="text-sm font-medium text-white">
                    Weight
                  </label>
                </div>
                <FormControl>
                  <Input
                    type="number"
                    placeholder="Weight"
                    {...field}
                    value={field.value?.value || ""}
                    onChange={e => {
                      field.onChange({
                        ...field.value,
                        value: e.target.value
                      });
                    }}
                    className="bg-gray-900 border-gray-700 text-white 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormDescription className="text-xs text-gray-400">
                  Weight in {field.value?.unit || 'pounds'}
                </FormDescription>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Color */}
        {specifications.color && (
          <FormField
            control={form.control}
            name="color"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Palette className="h-4 w-4 text-purple-400" />
                  <label className="text-sm font-medium text-white">
                    Color
                  </label>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Color"
                    className="bg-gray-900 border-gray-700 text-white 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Material */}
        {specifications.material && (
          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Box className="h-4 w-4 text-orange-400" />
                  <label className="text-sm font-medium text-white">
                    Material
                  </label>
                </div>
                <FormControl>
                  <Input
                    {...field}
                    placeholder="Material"
                    className="bg-gray-900 border-gray-700 text-white 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Size Options */}
        {specifications.size && sizeOptions && (
          <FormField
            control={form.control}
            name="selectedSizes"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Shirt className="h-4 w-4 text-yellow-400" />
                  <label className="text-sm font-medium text-white">
                    Available Sizes
                  </label>
                </div>
                <div className="flex flex-wrap gap-2">
                  {sizeOptions.map((size) => (
                    <button
                      key={size}
                      type="button"
                      onClick={() => {
                        const selectedSizes = field.value || []
                        const newSizes = selectedSizes.includes(size)
                          ? selectedSizes.filter(s => s !== size)
                          : [...selectedSizes, size]
                        field.onChange(newSizes)
                      }}
                      className={`px-4 py-2 rounded-lg border transition-colors
                        ${field.value?.includes(size)
                          ? 'bg-blue-600 border-blue-500 text-white'
                          : 'border-gray-600 text-gray-300 hover:border-gray-500'
                        }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Technical Specifications */}
        {specifications.technicalSpecs && (
          <FormField
            control={form.control}
            name="technicalSpecs"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Tool className="h-4 w-4 text-red-400" />
                  <label className="text-sm font-medium text-white">
                    Technical Specifications
                  </label>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter technical specifications..."
                    className="bg-gray-900 border-gray-700 text-white 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500
                      min-h-[100px] resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}

        {/* Warranty Information */}
        {specifications.warranty && (
          <FormField
            control={form.control}
            name="warranty"
            render={({ field }) => (
              <FormItem>
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  <label className="text-sm font-medium text-white">
                    Warranty Information
                  </label>
                </div>
                <FormControl>
                  <Textarea
                    {...field}
                    placeholder="Enter warranty details..."
                    className="bg-gray-900 border-gray-700 text-white 
                      placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500
                      min-h-[100px] resize-none"
                  />
                </FormControl>
                <FormMessage className="text-red-400" />
              </FormItem>
            )}
          />
        )}
      </form>
    </Form>
  );
}; 