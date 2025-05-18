"use client";

import { useState } from "react";
import { Product } from "../types";
import { ProductFilters } from "./product-filters";
import { ProductsGrid } from "./products-grid";
import { NoResults } from "./no-results";
import { getAllCategories } from "../utils";

interface ProductFilterProviderProps {
  products: Product[];
  storeId: string;
}

export const ProductFilterProvider = ({ products, storeId }: ProductFilterProviderProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");

  const allCategories = getAllCategories(products);

  // Filter products based on search and filters
  const filteredProducts = products.filter(product => {
    const matchesSearch = searchTerm === "" || 
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase())) ||
      product.categories.some(c => c.mainCategory?.toLowerCase().includes(searchTerm.toLowerCase()));
    
    // Category filtering
    const matchesCategory = categoryFilter === "all" || 
      product.categories.some(c => c.mainCategory === categoryFilter);
    
    // Status filtering
    let statusMatch = true;
    if (statusFilter !== "all") {
      if (statusFilter === "active") {
        statusMatch = product.active && product.stock > 0;
      } else if (statusFilter === "low-stock") {
        statusMatch = product.stock > 0 && product.stock < 10;
      } else if (statusFilter === "out-of-stock") {
        statusMatch = product.stock === 0;
      }
    }
    
    return matchesSearch && matchesCategory && statusMatch;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setCategoryFilter("all");
    setStatusFilter("all");
  };

  return (
    <>
      <ProductFilters 
        categories={allCategories}
        onSearchChange={setSearchTerm}
        onCategoryChange={setCategoryFilter}
        onStatusChange={setStatusFilter}
      />
      
      {filteredProducts.length > 0 ? (
        <ProductsGrid products={filteredProducts} storeId={storeId} />
      ) : (
        <NoResults onClearFilters={clearFilters} />
      )}
    </>
  );
}; 