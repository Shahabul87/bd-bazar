"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import axios from "axios"

interface InitStoreModalProps {
  isOpen: boolean
  onClose: () => void
}

export const InitStoreModal = ({ isOpen, onClose }: InitStoreModalProps) => {
  const router = useRouter()
  const [storeName, setStoreName] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!storeName.trim()) {
      toast.error("Please enter a store name")
      return
    }

    try {
      setIsLoading(true)
      const response = await axios.post("/api/stores", {
        name: storeName.trim()
      })

      toast.success("Store created successfully!")
      router.refresh()
      onClose()
      router.push(`/admindashboard/store/${response.data.id}`)
    } catch (error) {
      console.error("Store creation error:", error)
      toast.error("Failed to create store. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-gray-900 text-white p-6 rounded-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold">Create New Store</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div>
            <Input
              placeholder="Enter store name"
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              disabled={isLoading}
              className="bg-gray-800 border-gray-700 text-white"
            />
          </div>

          <div className="flex justify-end gap-4">
            <Button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              variant="outline"
              className="bg-gray-800 text-white hover:bg-gray-700"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isLoading}
              className="bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? "Creating..." : "Create Store"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
} 