"use client";

import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
  title?: string;
  description?: string;
}

export const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
  title,
  description
}) => {
  const { t } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <Modal
      title={title || t('areYouSure', 'Are you sure?')}
      description={description || t('thisActionCannotBeUndone', 'This action cannot be undone.')}
      isOpen={isOpen}
      onClose={onClose}
    >
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button
          disabled={loading}
          variant="outline"
          onClick={onClose}
        >
          {t('cancel', 'Cancel')}
        </Button>
        <Button
          disabled={loading}
          variant="destructive"
          onClick={onConfirm}
        >
          {t('continue', 'Continue')}
        </Button>
      </div>
    </Modal>
  );
}; 