"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";

type DeleteReviewButtonProps = {
  reviewId: string;
  projectId: string;
};

export default function DeleteReviewButton({
  reviewId,
  projectId,
}: DeleteReviewButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/reviews/${reviewId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete review.");
      }

      setIsModalOpen(false);
      router.push(`/projects/${projectId}/reviews`);
      router.refresh();
    } catch (err) {
      console.error("Delete review error:", err);
      setError(
        err instanceof Error ? err.message : "Failed to delete review."
      );
      setIsLoading(false);
    }
  };

  return (
    <>
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => setIsModalOpen(true)}
        leftIcon={<Trash2 className="h-4 w-4 text-danger" aria-hidden="true" />}
        className="text-danger border-danger-border hover:bg-danger-muted hover:border-danger hover:text-danger"
      >
        Delete review
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isLoading && setIsModalOpen(false)}
        title="Delete review"
        description="Are you sure you want to delete this deliverable review? The feedback notes and approval history will be removed."
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
          This action cannot be undone.
        </p>
      </Modal>
    </>
  );
}
