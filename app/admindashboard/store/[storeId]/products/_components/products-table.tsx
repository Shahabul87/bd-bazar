"use client"

import { useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { 
  Edit, 
  Trash2, 
  MoreHorizontal,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { toast } from "sonner"
import axios from "axios"
import { AlertModal } from "@/components/modals/alert-modal"
import { formatPrice } from "@/lib/format"

interface ProductsTableProps {
  products: any[]
  storeId: string
}

export const ProductsTable = ({
  products,
  storeId
}: ProductsTableProps) => {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)
  const [productToDelete, setProductToDelete] = useState<string | null>(null)

  const onDelete = async (productId: string) => {
    try {
      setLoading(true)
      await axios.delete(`/api/stores/${storeId}/products/${productId}`)
      router.refresh()
      toast.success("Product deleted successfully")
    } catch (error) {
      toast.error("Something went wrong")
    } finally {
      setLoading(false)
      setOpen(false)
      setProductToDelete(null)
    }
  }

  return (
    <>
      <AlertModal 
        isOpen={open} 
        onClose={() => setOpen(false)}
        onConfirm={() => productToDelete && onDelete(productToDelete)}
        loading={loading}
      />
      <div className="rounded-md border border-gray-800 bg-gray-950">
        <Table>
          <TableHeader>
            <TableRow className="border-gray-800">
              <TableHead className="text-gray-200">Product Name</TableHead>
              <TableHead className="text-gray-200">Category</TableHead>
              <TableHead className="text-gray-200">Store</TableHead>
              <TableHead className="text-gray-200">Stock</TableHead>
              <TableHead className="text-gray-200">Price</TableHead>
              <TableHead className="text-gray-200">Status</TableHead>
              <TableHead className="text-gray-200">Created</TableHead>
              <TableHead className="text-gray-200 text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow 
                key={product.id} 
                className="border-gray-800 hover:bg-gray-900/50"
              >
                <TableCell 
                  className="font-medium text-gray-200 cursor-pointer hover:text-blue-400"
                  onClick={() => router.push(`/admindashboard/store/${storeId}/products/${product.id}`)}
                >
                  {product.name}
                </TableCell>
                <TableCell className="text-gray-300">
                  {product.categories.map((cat: any) => cat.mainCategory).join(", ") || "No category"}
                </TableCell>
                <TableCell className="text-gray-300">
                  {product.store?.name || "N/A"}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-200">{product.stock}</span>
                    <span className="text-gray-400 text-sm">units</span>
                  </div>
                </TableCell>
                <TableCell className="text-gray-200">
                  {formatPrice(product.price)}
                </TableCell>
                <TableCell>
                  <div className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium
                    ${product.active ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                    {product.active ? "Active" : "Inactive"}
                  </div>
                </TableCell>
                <TableCell className="text-gray-300">
                  {new Date(product.createdAt).toLocaleDateString()}
                </TableCell>
                <TableCell className="text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button 
                        variant="ghost" 
                        className="h-8 w-8 p-0 text-gray-300 hover:text-gray-200 hover:bg-gray-800"
                      >
                        <span className="sr-only">Open menu</span>
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent 
                      align="end" 
                      className="bg-gray-900 border-gray-800"
                    >
                      <DropdownMenuLabel className="text-gray-300">
                        Actions
                      </DropdownMenuLabel>
                      <DropdownMenuItem
                        onClick={() => router.push(`/admindashboard/store/${storeId}/products/${product.id}`)}
                        className="text-gray-300 hover:text-gray-200 hover:bg-gray-800 cursor-pointer focus:bg-gray-800 focus:text-gray-200"
                      >
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Product
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => {
                          setProductToDelete(product.id)
                          setOpen(true)
                        }}
                        className="text-red-400 hover:text-red-300 hover:bg-red-900/20 cursor-pointer focus:bg-red-900/20 focus:text-red-300"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  )
} 