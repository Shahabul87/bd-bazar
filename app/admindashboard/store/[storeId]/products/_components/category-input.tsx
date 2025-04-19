"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"

interface CategoryInputProps {
  initialValue?: {
    mainCategory: string;
    subCategory?: string;
    finalCategory?: string;
  };
  onChange: (categories: any) => void;
  productId: string;
}

export const CategoryInput = ({
  initialValue,
  onChange,
  productId
}: CategoryInputProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [categories, setCategories] = useState<any[]>([]);
  const [selectedCategories, setSelectedCategories] = useState({
    mainCategory: initialValue?.mainCategory || "",
    subCategory: initialValue?.subCategory || "",
    finalCategory: initialValue?.finalCategory || ""
  });

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("/api/categories");
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories", error);
      }
    };

    fetchCategories();
  }, []);

  const onSubmit = async () => {
    try {
      if (!selectedCategories.mainCategory) {
        toast.error("Main category is required");
        return;
      }

      await axios.patch(`/api/products/${productId}/category`, {
        categories: {
          mainCategory: selectedCategories.mainCategory,
          subCategory: selectedCategories.subCategory || null,
          finalCategory: selectedCategories.finalCategory || null
        }
      });

      toast.success("Category updated");
      setIsEditing(false);
      onChange(selectedCategories);
    } catch (error) {
      console.error("Failed to update category:", error);
      toast.error("Something went wrong");
    }
  };

  return (
    <div className="mt-6 border rounded-md p-4">
      <div className="font-medium flex items-center justify-between">
        <div className="flex flex-col gap-y-1">
          <h2>Product Categories</h2>
          <span className="text-sm text-gray-400">
            Select or enter product categories
          </span>
        </div>
        <Button onClick={() => setIsEditing(!isEditing)}>
          {isEditing ? "Cancel" : "Edit"}
        </Button>
      </div>

      {!isEditing && (
        <div className="mt-4">
          <div>Main Category: {selectedCategories.mainCategory}</div>
          {selectedCategories.subCategory && (
            <div>Sub Category: {selectedCategories.subCategory}</div>
          )}
          {selectedCategories.finalCategory && (
            <div>Final Category: {selectedCategories.finalCategory}</div>
          )}
        </div>
      )}

      {isEditing && (
        <div className="space-y-4 mt-4">
          <div>
            <label className="block text-sm font-medium mb-2">Main Category</label>
            <select
              value={selectedCategories.mainCategory}
              onChange={(e) => setSelectedCategories(prev => ({
                ...prev,
                mainCategory: e.target.value,
                subCategory: "",
                finalCategory: ""
              }))}
              className="w-full p-2 border rounded"
            >
              <option value="">Select Main Category</option>
              {categories.map(cat => (
                <option key={cat.id} value={cat.mainCategory}>
                  {cat.mainCategory}
                </option>
              ))}
            </select>
            <Input
              placeholder="Or enter new main category"
              onChange={(e) => setSelectedCategories(prev => ({
                ...prev,
                mainCategory: e.target.value,
                subCategory: "",
                finalCategory: ""
              }))}
              className="mt-2"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Sub Category (Optional)</label>
            <Input
              value={selectedCategories.subCategory}
              onChange={(e) => setSelectedCategories(prev => ({
                ...prev,
                subCategory: e.target.value,
                finalCategory: ""
              }))}
              placeholder="Enter sub category"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Final Category (Optional)</label>
            <Input
              value={selectedCategories.finalCategory}
              onChange={(e) => setSelectedCategories(prev => ({
                ...prev,
                finalCategory: e.target.value
              }))}
              placeholder="Enter final category"
            />
          </div>

          <Button onClick={onSubmit}>
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
}; 