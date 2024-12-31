"use client"

import { useState } from "react"
import { Eye, Edit, Trash, MoreVertical, CheckCircle, XCircle } from "lucide-react"
import { DataTable } from "@/components/ui/data-table"
import { useRouter } from "next/navigation"

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  sku: string;
  stock: number;
  status: string;
  category: any;
  images: any[];
  reviews: any[];
  user: {
    id: string;
    name: string | null;
    email: string | null;
  };
  orderItems: any[];
}

interface ProductsTableProps {
  searchQuery: string;
  products: Product[];
  onEdit: (id: string) => void;
  selectedProducts: string[];
  onSelectProducts: (ids: string[]) => void;
}

export const ProductsTable = ({ 
  searchQuery, 
  products,
  onEdit,
  selectedProducts,
  onSelectProducts 
}: ProductsTableProps) => {
  const router = useRouter()

  const handleDelete = (id: string) => {
    console.log("Delete product:", id)
    // Implement delete functionality
  }

  const columns = [
    {
      id: "name",
      header: "Product",
      cell: (row: Product) => (
        <div className="flex items-center gap-3">
          <div>
            <p className="font-medium text-white">{row.name}</p>
            <p className="text-sm text-gray-400">SKU: {row.sku}</p>
          </div>
        </div>
      )
    },
    {
      id: "price",
      header: "Price",
      cell: (row: Product) => (
        <span className="font-medium">${row.price}</span>
      )
    },
    {
      id: "stock",
      header: "Stock",
      cell: (row: Product) => (
        <span className={`${
          row.stock > 10 ? 'text-green-400' : 'text-orange-400'
        }`}>
          {row.stock} units
        </span>
      )
    },
    {
      id: "status",
      header: "Status",
      cell: (row: Product) => (
        <div className={`flex items-center gap-2 ${
          row.status === 'active' ? 'text-green-400' : 'text-gray-400'
        }`}>
          {row.status === 'active' ? (
            <CheckCircle className="h-4 w-4" />
          ) : (
            <XCircle className="h-4 w-4" />
          )}
          <span className="capitalize">{row.status}</span>
        </div>
      )
    },
    {
      id: "actions",
      header: "",
      cell: (row: Product) => (
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={() => onEdit(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            onClick={() => handleDelete(row.id)}
            className="p-2 hover:bg-gray-700 rounded-lg text-gray-400 hover:text-white"
          >
            <Trash className="h-4 w-4" />
          </button>
        </div>
      )
    }
  ]

  const filteredProducts = products.filter(product => {
    if (!searchQuery) return true;
    return (
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.category?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  return (
    <DataTable
      columns={columns}
      data={filteredProducts}
      pageSize={10}
      selectable
      selectedRows={selectedProducts}
      onSelectRows={onSelectProducts}
    />
  );
}; 