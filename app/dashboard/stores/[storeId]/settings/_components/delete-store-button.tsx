"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash } from "lucide-react";
import { toast } from "sonner";
import { useTranslation } from "react-i18next";

import { Button } from "@/components/ui/button";
import {
  AlertModal
} from "@/components/modals/alert-modal";

interface DeleteStoreButtonProps {
  storeId: string;
}

export const DeleteStoreButton = ({
  storeId
}: DeleteStoreButtonProps) => {
  const router = useRouter();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);

  const onDelete = async () => {
    try {
      setLoading(true);
      
      // Mock API call to delete store
      // In a real app, this would be an API call
      // await axios.delete(`/api/stores/${storeId}`);
      
      // For demo purposes, just simulate a short delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Remove from localStorage if stored there
      localStorage.removeItem(`store-${storeId}`);
      
      router.push('/dashboard/stores');
      router.refresh();
      
      toast.success(t('storeDeleted', 'Store deleted.'));
    } catch (error) {
      toast.error(t('error', 'Something went wrong.'));
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <Button
        disabled={loading}
        variant="destructive"
        size="sm"
        onClick={() => setOpen(true)}
      >
        <Trash className="h-4 w-4" />
      </Button>
    </>
  );
}; 