"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Store } from "lucide-react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import axios from "axios"
import { toast } from "react-hot-toast"

const formSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  type: z.enum(["store", "service_store"], {
    required_error: "Please select a store type"
  }),
  phone: z.string().regex(/^(\+?88)?01[3-9]\d{8}$/, "Invalid phone number").optional(),
  division: z.string().optional(),
  district: z.string().optional(),
  thana: z.string().optional(),
  roadNo: z.string().optional(),
  fullAddress: z.string().optional()
})

type FormValues = z.infer<typeof formSchema>

export default function EditStoreForm({ storeId }: { storeId: string }) {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema)
  })

  useEffect(() => {
    const fetchStore = async () => {
      try {
        const response = await axios.get(`/api/stores/${storeId}`)
        form.reset(response.data)
      } catch (error) {
        toast.error("Failed to fetch store details")
        router.push("/admindashboard/store")
      } finally {
        setIsLoading(false)
      }
    }

    fetchStore()
  }, [storeId, form, router])

  const onSubmit = async (values: FormValues) => {
    try {
      setIsLoading(true)
      await axios.patch(`/api/stores/${storeId}`, values)
      toast.success("Store updated successfully!")
      router.push("/admindashboard/store")
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to update store")
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div className="text-white">Loading...</div>
  }

  return (
    <div className="max-w-3xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Store className="h-6 w-6" />
          Edit Store
        </h1>
        <p className="text-gray-400 mt-2">Update your store details</p>
      </div>

      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        {/* Store Name */}
        <div className="space-y-2">
          <label className="text-sm font-medium text-gray-300">Store Name</label>
          <Input
            {...form.register("name")}
            placeholder="Enter store name"
            disabled={isLoading}
            className="bg-gray-800 border-gray-700 text-white"
          />
          {form.formState.errors.name && (
            <p className="text-sm text-red-500">
              {form.formState.errors.name.message}
            </p>
          )}
        </div>

        {/* Rest of your form fields... */}

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.back()}
            disabled={isLoading}
            className="bg-gray-800 text-white border-gray-700 hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            disabled={isLoading}
            className="bg-blue-600 text-white hover:bg-blue-700"
          >
            {isLoading ? "Updating..." : "Update Store"}
          </Button>
        </div>
      </form>
    </div>
  )
} 