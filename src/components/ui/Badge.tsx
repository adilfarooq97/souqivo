import type { ReactNode } from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "neutral";

type BadgeSize = "sm" | "md";

type BadgeProps = {
  children: ReactNode;
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
  className?: string;
};

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-surface-muted text-muted-foreground border-border",
  neutral: "bg-slate-100 text-slate-700 border-slate-200",
  success: "bg-success-muted text-success border-success-border",
  warning: "bg-warning-muted text-warning border-warning-border",
  danger: "bg-danger-muted text-danger border-danger-border",
  info: "bg-info-muted text-info border-info-border",
};

const dotClasses: Record<BadgeVariant, string> = {
  default: "bg-muted-foreground",
  neutral: "bg-slate-500",
  success: "bg-success",
  warning: "bg-warning",
  danger: "bg-danger",
  info: "bg-info",
};

export default function Badge({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
}: BadgeProps) {
  const sizeClass =
    size === "sm"
      ? "px-2 py-0.5 text-[11px] gap-1"
      : "px-2.5 py-0.5 text-xs gap-1.5";

  return (
    <span
      className={`inline-flex items-center font-medium rounded-full border tracking-wide whitespace-nowrap ${variantClasses[variant]} ${sizeClass} ${className}`}
    >
      {dot && (
        <span
          className={`h-1.5 w-1.5 rounded-full shrink-0 ${dotClasses[variant]}`}
          aria-hidden="true"
        />
      )}
      <span>{children}</span>
    </span>
  );
}
