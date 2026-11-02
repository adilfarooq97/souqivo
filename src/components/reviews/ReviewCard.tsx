"use client";

import { useState } from "react";
import Link from "next/link";
import { Check, Edit3, ExternalLink, MessageSquare, RotateCcw } from "lucide-react";
import type { Review } from "@/types";
import ReviewBadge from "@/components/reviews/ReviewBadge";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";

type ReviewCardProps = {
  review: Review;
  projectId: string;
  canManage?: boolean;
};

export default function ReviewCard({
  review,
  projectId,
  canManage = true,
}: ReviewCardProps) {
  const [status, setStatus] = useState(review.status);
  const [clientComment, setClientComment] = useState(
    review.client_comment ?? ""
  );
  const [comment, setComment] = useState(review.client_comment ?? "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const respondToReview = async (
    nextStatus: "Approved" | "Changes Requested"
  ) => {
    if (nextStatus === "Changes Requested" && !comment.trim()) {
      setError("Please add a note explaining what changes are needed.");
      return;
    }

    setError("");
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/reviews/${review.id}/respond`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          status: nextStatus,
          client_comment: comment.trim(),
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to respond to review.");
      }

      setStatus(nextStatus);
      setClientComment(comment.trim());
      setComment("");
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to respond to review."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs space-y-4">
      {/* Top Header: Title & Status */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div className="space-y-1">
          <div className="flex flex-wrap items-center gap-2.5">
            <h3 className="text-base font-semibold tracking-tight text-foreground">
              {review.title}
            </h3>
            <ReviewBadge status={status} />
          </div>

          {review.description && (
            <p className="text-xs leading-relaxed text-muted-foreground max-w-2xl">
              {review.description}
            </p>
          )}
        </div>

        {canManage && (
          <Link href={`/projects/${projectId}/reviews/${review.id}/edit`}>
            <Button
              variant="outline"
              size="xs"
              leftIcon={<Edit3 className="h-3 w-3" />}
            >
              Edit
            </Button>
          </Link>
        )}
      </div>

      {/* Deliverable File / Asset Link */}
      {review.file_url && (
        <div className="pt-1">
          <a
            href={review.file_url}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-xl border border-border bg-surface-muted/50 px-3.5 py-2 text-xs font-semibold text-foreground hover:bg-surface-muted hover:border-border-strong transition-all"
          >
            <ExternalLink className="h-3.5 w-3.5 text-accent" />
            <span>Open Deliverable Asset</span>
          </a>
        </div>
      )}

      {/* Existing Client Comment Thread */}
      {clientComment && (
        <div className="rounded-xl border border-border-muted bg-surface-muted/30 p-4 space-y-1.5">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground">
            <MessageSquare className="h-3.5 w-3.5" />
            <span>Client Feedback Note</span>
          </div>
          <p className="text-xs leading-relaxed text-foreground">
            {clientComment}
          </p>
        </div>
      )}

      {/* Decision Summary for Client */}
      {!canManage && status !== "Pending" && (
        <div
          className={`rounded-xl border p-3.5 text-xs font-medium ${
            status === "Approved"
              ? "border-success-border bg-success-muted text-success"
              : "border-danger-border bg-danger-muted text-danger"
          }`}
        >
          {status === "Approved"
            ? "✓ You have approved this deliverable."
            : "⚠ You requested changes on this deliverable."}
        </div>
      )}

      {/* Client Feedback & Decision Form (when Pending) */}
      {!canManage && status === "Pending" && (
        <div className="border-t border-border-muted pt-5 space-y-3">
          <div>
            <label className="block text-xs font-semibold text-foreground tracking-tight">
              Feedback &amp; Revision Notes
            </label>
            <textarea
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={3}
              placeholder="Add feedback for the freelancer (required when requesting revisions)..."
              className="mt-1.5 w-full rounded-xl border border-border bg-surface p-3 text-xs leading-relaxed text-foreground outline-none transition placeholder:text-subtle-foreground hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/20"
              maxLength={1000}
              disabled={isSubmitting}
            />
          </div>

          {error && <Alert tone="danger">{error}</Alert>}

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <Button
              type="button"
              variant="primary"
              size="sm"
              onClick={() => respondToReview("Approved")}
              disabled={isSubmitting}
              isLoading={isSubmitting}
              leftIcon={<Check className="h-4 w-4" />}
              className="bg-emerald-700 hover:bg-emerald-800 text-white border-emerald-700 shadow-xs"
            >
              Approve Deliverable
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => respondToReview("Changes Requested")}
              disabled={isSubmitting}
              leftIcon={<RotateCcw className="h-4 w-4" />}
              className="border-danger-border text-danger hover:bg-danger-muted hover:border-danger hover:text-danger"
            >
              Request Changes
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
