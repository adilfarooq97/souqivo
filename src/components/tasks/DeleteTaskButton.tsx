"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";

type DeleteTaskButtonProps = {
  taskId: string;
  projectId: string;
};

export default function DeleteTaskButton({
  taskId,
  projectId,
}: DeleteTaskButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setIsLoading(true);

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "DELETE",
      });

      const result = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(result?.error || "Unable to delete task.");
      }

      setIsModalOpen(false);
      router.push(`/projects/${projectId}/tasks`);
      router.refresh();
    } catch (err) {
      console.error("Delete task error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to delete task."
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
        Delete task
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isLoading && setIsModalOpen(false)}
        title="Delete task"
        description="Are you sure you want to delete this task? This action cannot be undone."
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
          This task will be removed from your board.
        </p>
      </Modal>
    </>
  );
}
