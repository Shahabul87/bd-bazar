"use client";

import { useState } from "react";
import { Search, Sliders } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface ProductFiltersProps {
  categories: string[];
  onSearchChange: (search: string) => void;
  onCategoryChange: (category: string) => void;
  onStatusChange: (status: string) => void;
}

export const ProductFilters = ({ 
  categories, 
  onSearchChange, 
  onCategoryChange, 
  onStatusChange 
}: ProductFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    onSearchChange(value);
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-12 gap-4 py-2 items-center">
      <div className="relative md:col-span-5">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
        <Input 
          placeholder="Search products..." 
          className="pl-9 bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      
      <div className="md:col-span-3">
        <Select defaultValue="all" onValueChange={onCategoryChange}>
          <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <SelectValue placeholder="All Categories" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>{category}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      <div className="md:col-span-3">
        <Select defaultValue="all" onValueChange={onStatusChange}>
          <SelectTrigger className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
            <SelectValue placeholder="All Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Status</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="low-stock">Low Stock</SelectItem>
            <SelectItem value="out-of-stock">Out of Stock</SelectItem>
          </SelectContent>
        </Select>
      </div>
      
      <div className="md:col-span-1">
        <Button variant="outline" size="icon" className="bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-700">
          <Sliders className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
}; 