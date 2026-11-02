import type {
  InvoiceStatus,
  ProjectStatus,
  ReviewStatus,
  TaskPriority,
  TaskStatus,
} from "@/types";
import Badge, { type BadgeVariant } from "@/components/ui/Badge";

type StatusValue =
  | InvoiceStatus
  | ProjectStatus
  | ReviewStatus
  | TaskPriority
  | TaskStatus;

type StatusBadgeProps = {
  status: StatusValue;
  prefix?: string;
  size?: "sm" | "md";
  showDot?: boolean;
};

const variants: Record<StatusValue, BadgeVariant> = {
  Draft: "default",
  Planning: "default",
  Todo: "default",
  Low: "default",
  Pending: "warning",
  Review: "warning",
  Medium: "info",
  "In Progress": "info",
  Paid: "success",
  Approved: "success",
  Completed: "success",
  Done: "success",
  Overdue: "danger",
  High: "danger",
  "Changes Requested": "danger",
};

export default function StatusBadge({
  status,
  prefix,
  size = "md",
  showDot = true,
}: StatusBadgeProps) {
  const variant = variants[status] ?? "default";

  return (
    <Badge variant={variant} size={size} dot={showDot}>
      {prefix ? `${prefix}: ${status}` : status}
    </Badge>
  );
}
