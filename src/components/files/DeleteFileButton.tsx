"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";

type DeleteFileButtonProps = {
  fileId: string;
};

export default function DeleteFileButton({
  fileId,
}: DeleteFileButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/files/${fileId}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Failed to delete file");
      }

      setIsModalOpen(false);
      router.refresh();
    } catch (err) {
      console.error("Delete file error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete file"
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="ghost"
        size="xs"
        onClick={() => setIsModalOpen(true)}
        aria-label="Delete file"
        className="text-muted-foreground hover:bg-danger-muted hover:text-danger p-1.5"
      >
        <Trash2 className="h-3.5 w-3.5" aria-hidden="true" />
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isLoading && setIsModalOpen(false)}
        title="Delete file"
        description="Are you sure you want to delete this file? Anyone with access to this project will no longer be able to view or download it."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={isLoading}
            >
              {isLoading ? "Deleting..." : "Permanently Delete"}
            </Button>
          </>
        }
      >
        {error && (
          <Alert tone="danger" className="mb-4">
            {error}
          </Alert>
        )}
        <p className="text-xs text-muted-foreground">
          This file will be permanently removed from this project.
        </p>
      </Modal>
    </>
  );
}
