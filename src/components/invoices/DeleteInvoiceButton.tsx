"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2 } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Alert from "@/components/ui/Alert";

type DeleteInvoiceButtonProps = {
  invoiceId: string;
};

export default function DeleteInvoiceButton({
  invoiceId,
}: DeleteInvoiceButtonProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState("");

  const handleDelete = async () => {
    setError("");
    setIsDeleting(true);

    try {
      const response = await fetch(`/api/invoices/${invoiceId}`, {
        method: "DELETE",
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to delete invoice.");
      }

      setIsModalOpen(false);
      router.push("/invoices");
      router.refresh();
    } catch (err) {
      console.error("Delete invoice error:", err);
      setError(
        err instanceof Error ? err.message : "Unable to delete invoice."
      );
      setIsDeleting(false);
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
        Delete invoice
      </Button>

      <Modal
        isOpen={isModalOpen}
        onClose={() => !isDeleting && setIsModalOpen(false)}
        title="Delete invoice"
        description="Are you sure you want to delete this invoice? The billing record will be removed from your project history."
        footer={
          <>
            <Button
              variant="secondary"
              size="sm"
              onClick={() => setIsModalOpen(false)}
              disabled={isDeleting}
            >
              Cancel
            </Button>
            <Button
              variant="danger"
              size="sm"
              onClick={handleDelete}
              isLoading={isDeleting}
            >
              {isDeleting ? "Deleting..." : "Permanently Delete"}
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
