"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { Trash } from "lucide-react";

interface DeleteStoreButtonProps {
  storeId: string;
}

export const DeleteStoreButton = ({
  storeId
}: DeleteStoreButtonProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
      const response = await fetch(`/api/stores/${storeId}`, {
        method: "DELETE",
      });
      
      if (!response.ok) {
        throw new Error("Failed to delete store");
      }
      
      toast.success("Store deleted successfully");
      
      // Remove from localStorage if it exists
      try {
        const storesJSON = localStorage.getItem("stores");
        if (storesJSON) {
          const stores = JSON.parse(storesJSON);
          const updatedStores = stores.filter((store: any) => store.id !== storeId);
          localStorage.setItem("stores", JSON.stringify(updatedStores));
        }
      } catch (error) {
        console.error("Error updating localStorage:", error);
      }
      
      router.push("/dashboard/stores");
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          variant="destructive"
          size="sm"
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          <Trash className="h-4 w-4 mr-2" />
          Delete Store
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your store
            and all its data including products, orders, and customer information.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel disabled={loading}>Cancel</AlertDialogCancel>
          <AlertDialogAction
            onClick={onDelete}
            disabled={loading}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            {loading ? "Deleting..." : "Delete"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteStoreButton; 