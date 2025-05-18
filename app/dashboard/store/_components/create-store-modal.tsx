"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Dialog } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"
import { CreateStoreSchema } from "@/schemas/store"

const formSchema = z.object({
  name: z.string().min(3, "Store name must be at least 3 characters"),
  type: z.enum(["store", "service_store"], {
    required_error: "Please select a store type"
  }),
  phone: z.string().regex(/^(\+?88)?01[3-9]\d{8}$/, "Invalid phone number"),
  address: z.object({
    division: z.string().min(1, "Division is required"),
    district: z.string().min(1, "District is required"),
    thana: z.string().min(1, "Thana is required"),
    roadNo: z.string().min(1, "Road number is required"),
    fullAddress: z.string().min(10, "Full address must be at least 10 characters")
  })
})

type FormValues = z.infer<typeof formSchema>

interface CreateStoreModalProps {
  isOpen: boolean
  onClose: () => void
}

export const CreateStoreModal = ({ isOpen, onClose }: CreateStoreModalProps) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      type: "store",
      phone: "",
      address: {
        division: "",
        district: "",
        thana: "",
        roadNo: "",
        fullAddress: ""
      }
    }
  })

  const onSubmit = async (values: CreateStoreSchema) => {
    try {
      setIsLoading(true)
      await axios.post("/api/stores", values)
      toast.success("Store created successfully!")
      onClose()
      window.location.reload()
    } catch (error) {
      console.error(error)
      toast.error("Something went wrong!")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <div className="bg-gray-900 p-6 rounded-lg max-w-2xl w-full mx-auto">
        <h2 className="text-2xl font-bold text-white mb-6">Create New Store</h2>

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

          {/* Store Type */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Store Type</label>
            <select
              {...form.register("type")}
              disabled={isLoading}
              className="w-full h-10 px-3 bg-gray-800 border border-gray-700 rounded-md 
                text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="store">Store</option>
              <option value="service_store">Service Store</option>
            </select>
            {form.formState.errors.type && (
              <p className="text-sm text-red-500">
                {form.formState.errors.type.message}
              </p>
            )}
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Phone Number</label>
            <Input
              {...form.register("phone")}
              placeholder="Enter phone number"
              disabled={isLoading}
              className="bg-gray-800 border-gray-700 text-white"
            />
            {form.formState.errors.phone && (
              <p className="text-sm text-red-500">
                {form.formState.errors.phone.message}
              </p>
            )}
          </div>

          {/* Address Grid */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Division</label>
              <Input
                {...form.register("address.division")}
                placeholder="Enter division"
                disabled={isLoading}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {form.formState.errors.address?.division && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.division.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">District</label>
              <Input
                {...form.register("address.district")}
                placeholder="Enter district"
                disabled={isLoading}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {form.formState.errors.address?.district && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.district.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Thana</label>
              <Input
                {...form.register("address.thana")}
                placeholder="Enter thana"
                disabled={isLoading}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {form.formState.errors.address?.thana && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.thana.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-300">Road No</label>
              <Input
                {...form.register("address.roadNo")}
                placeholder="Enter road number"
                disabled={isLoading}
                className="bg-gray-800 border-gray-700 text-white"
              />
              {form.formState.errors.address?.roadNo && (
                <p className="text-sm text-red-500">
                  {form.formState.errors.address.roadNo.message}
                </p>
              )}
            </div>
          </div>

          {/* Full Address */}
          <div className="space-y-2">
            <label className="text-sm font-medium text-gray-300">Full Address</label>
            <textarea
              {...form.register("address.fullAddress")}
              placeholder="Enter full address"
              disabled={isLoading}
              className="w-full min-h-[100px] px-3 py-2 bg-gray-800 border border-gray-700 
                rounded-md text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {form.formState.errors.address?.fullAddress && (
              <p className="text-sm text-red-500">
                {form.formState.errors.address.fullAddress.message}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
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
              {isLoading ? "Creating..." : "Create Store"}
            </Button>
          </div>
        </form>
      </div>
    </Dialog>
  )
} 