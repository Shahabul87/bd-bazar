"use client"

import { useState, useEffect } from "react"
import { CategoryOption, categoryStructure } from "../_types/category-types"
import { Button } from "@/components/ui/button"
import { Plus, X } from "lucide-react"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
  FormDescription,
} from "@/components/ui/form"
import { Tag, FolderTree, ListTree, FileText } from "lucide-react"
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios"
import { toast } from "sonner"

// Add new interfaces
interface NewCategoryRequest {
  mainCategory?: string;
  subCategory?: string;
  finalCategory?: string;
  description?: string;
}

interface CategorySelectorProps {
  value: {
    main: string;
    sub: string;
    final: string;
  };
  onChange: (value: { main: string; sub: string; final: string }) => void;
  onSpecificationsChange: (specifications: any) => void;
}

// Add the schema
const newCategorySchema = z.object({
  mainCategory: z.string().min(1, "Main category is required"),
  subCategory: z.string().optional(),
  finalCategory: z.string().optional(),
  description: z.string().min(10, "Please provide a detailed description")
});

type NewCategoryFormValues = z.infer<typeof newCategorySchema>;

export const CategorySelector = ({
  value,
  onChange,
  onSpecificationsChange
}: CategorySelectorProps) => {
  const [mainCategories] = useState(categoryStructure)
  const [subCategories, setSubCategories] = useState<CategoryOption[]>([])
  const [finalCategories, setFinalCategories] = useState<CategoryOption[]>([])
  const [showNewCategoryForm, setShowNewCategoryForm] = useState(false)
  const [newCategoryRequest, setNewCategoryRequest] = useState<NewCategoryRequest>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<NewCategoryFormValues>({
    resolver: zodResolver(newCategorySchema),
    defaultValues: {
      mainCategory: "",
      subCategory: "",
      finalCategory: "",
      description: ""
    }
  });

  useEffect(() => {
    if (value.main) {
      const mainCat = mainCategories.find(cat => cat.id === value.main)
      setSubCategories(mainCat?.children || [])
    } else {
      setSubCategories([])
    }
  }, [value.main, mainCategories])

  useEffect(() => {
    if (value.sub) {
      const subCat = subCategories.find(cat => cat.id === value.sub)
      setFinalCategories(subCat?.children || [])
    } else {
      setFinalCategories([])
    }
  }, [value.sub, subCategories])

  useEffect(() => {
    if (value.final) {
      const finalCat = finalCategories.find(cat => cat.id === value.final)
      if (finalCat?.specifications) {
        onSpecificationsChange(finalCat.specifications)
      }
    }
  }, [value.final, finalCategories, onSpecificationsChange])

  const onNewCategorySubmit = async (values: NewCategoryFormValues) => {
    try {
      // Here you would typically make an API call
      console.log("New category request:", values);
      alert("Category request submitted successfully!");
      setShowNewCategoryForm(false);
      form.reset();
    } catch (error) {
      console.error("Error submitting category request:", error);
      alert("Failed to submit category request");
    }
  };

  const handleCategoryChange = async (type: 'main' | 'sub' | 'final', newValue: string) => {
    try {
      setIsSubmitting(true)

      let updatedValue = { ...value }

      switch (type) {
        case 'main':
          updatedValue = { main: newValue, sub: "", final: "" }
          break
        case 'sub':
          updatedValue = { ...value, sub: newValue, final: "" }
          break
        case 'final':
          updatedValue = { ...value, final: newValue }
          break
      }

      // Update parent component state
      onChange(updatedValue)

      // Find specifications for the selected category combination
      const mainCategory = categoryStructure.find(c => c.label === updatedValue.main)
      const subCategory = mainCategory?.children?.find(c => c.label === updatedValue.sub)
      const finalCategory = subCategory?.children?.find(c => c.label === updatedValue.final)

      if (finalCategory?.specifications) {
        onSpecificationsChange(finalCategory.specifications)
      }

    } catch (error) {
      toast.error("Failed to update category")
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2 text-white">
            Main Category
          </label>
          <select
            value={value.main}
            onChange={(e) => handleCategoryChange('main', e.target.value)}
            className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg 
              focus:ring-2 focus:ring-blue-500 text-white"
            required
          >
            <option value="" className="text-gray-300">Select Main Category</option>
            {mainCategories.map((category) => (
              <option key={category.id} value={category.id} className="text-white">
                {category.label}
              </option>
            ))}
          </select>
        </div>

        {value.main && (
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Sub Category
            </label>
            <select
              value={value.sub}
              onChange={(e) => handleCategoryChange('sub', e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-blue-500 text-white"
              required
            >
              <option value="" className="text-gray-300">Select Sub Category</option>
              {subCategories.map((category) => (
                <option key={category.id} value={category.id} className="text-white">
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        )}

        {value.sub && (
          <div>
            <label className="block text-sm font-medium mb-2 text-white">
              Final Category
            </label>
            <select
              value={value.final}
              onChange={(e) => handleCategoryChange('final', e.target.value)}
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-lg 
                focus:ring-2 focus:ring-blue-500 text-white"
              required
            >
              <option value="" className="text-gray-300">Select Final Category</option>
              {finalCategories.map((category) => (
                <option key={category.id} value={category.id} className="text-white">
                  {category.label}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Can't find your category? */}
      <div className="mt-6 border-t border-gray-700 pt-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold text-white">
              Can't find your category?
            </h3>
            <p className="text-sm text-gray-400">
              Submit a request to add a new category
            </p>
          </div>
          <Button
            type="button"
            onClick={() => setShowNewCategoryForm(!showNewCategoryForm)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-lg
              transition-all duration-200
              ${showNewCategoryForm 
                ? "bg-gray-700 text-gray-200 hover:bg-gray-600" 
                : "bg-blue-600 text-white hover:bg-blue-700"}
            `}
          >
            {showNewCategoryForm ? (
              <>
                <X className="h-4 w-4" />
                <span className="font-medium">Cancel Request</span>
              </>
            ) : (
              <>
                <Plus className="h-4 w-4" />
                <span className="font-medium">Request Category</span>
              </>
            )}
          </Button>
        </div>

        {showNewCategoryForm && (
          <div className="bg-gray-900/50 rounded-xl p-6 border border-gray-700 mt-4">
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onNewCategorySubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="mainCategory"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <Tag className="h-4 w-4 text-blue-400" />
                        <label className="text-sm font-medium text-white">
                          Main Category
                        </label>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Electronics, Clothing, Furniture"
                          className="bg-gray-900 border-gray-700 text-white 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-400">
                        The top-level category for your product
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <FolderTree className="h-4 w-4 text-purple-400" />
                        <label className="text-sm font-medium text-white">
                          Sub Category (Optional)
                        </label>
                      </div>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="e.g., Smartphones, T-shirts, Chairs"
                          className="bg-gray-900 border-gray-700 text-white 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-400">
                        A more specific category within the main category
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <div className="flex items-center gap-2 mb-2">
                        <FileText className="h-4 w-4 text-orange-400" />
                        <label className="text-sm font-medium text-white">
                          Justification
                        </label>
                      </div>
                      <FormControl>
                        <Textarea
                          {...field}
                          placeholder="Please explain why this category should be added..."
                          className="bg-gray-900 border-gray-700 text-white 
                            placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500
                            min-h-[100px] resize-none"
                        />
                      </FormControl>
                      <FormDescription className="text-xs text-gray-400">
                        Provide details to help us understand your request
                      </FormDescription>
                      <FormMessage className="text-red-400" />
                    </FormItem>
                  )}
                />

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-700">
                  <Button
                    type="button"
                    onClick={() => {
                      setShowNewCategoryForm(false);
                      form.reset();
                    }}
                    className="px-4 py-2 bg-gray-700 text-gray-200 rounded-lg 
                      hover:bg-gray-600 transition-colors"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg 
                      hover:bg-blue-700 transition-colors
                      flex items-center gap-2"
                  >
                    <Plus className="h-4 w-4" />
                    Submit Request
                  </Button>
                </div>
              </form>
            </Form>
          </div>
        )}
      </div>
    </div>
  )
} 