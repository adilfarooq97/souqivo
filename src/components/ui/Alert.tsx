import type { ReactNode } from "react";
import {
  AlertCircle,
  AlertTriangle,
  CheckCircle2,
  Info,
} from "lucide-react";

type AlertProps = {
  children: ReactNode;
  tone?: "info" | "success" | "warning" | "danger";
  className?: string;
  title?: string;
};

const toneConfig = {
  info: {
    container: "border-info-border bg-info-muted text-info",
    icon: Info,
    iconColor: "text-info",
  },
  success: {
    container: "border-success-border bg-success-muted text-success",
    icon: CheckCircle2,
    iconColor: "text-success",
  },
  warning: {
    container: "border-warning-border bg-warning-muted text-warning",
    icon: AlertTriangle,
    iconColor: "text-warning",
  },
  danger: {
    container: "border-danger-border bg-danger-muted text-danger",
    icon: AlertCircle,
    iconColor: "text-danger",
  },
};

export default function Alert({
  children,
  tone = "info",
  className = "",
  title,
}: AlertProps) {
  const config = toneConfig[tone];
  const Icon = config.icon;

  return (
    <div
      className={`flex items-start gap-3 rounded-xl border p-4 text-sm leading-6 shadow-2xs ${config.container} ${className}`}
      role={tone === "danger" ? "alert" : "status"}
    >
      <Icon className={`h-5 w-5 shrink-0 mt-0.5 ${config.iconColor}`} aria-hidden="true" />
      <div className="flex-1 min-w-0">
        {title && <h4 className="font-semibold text-foreground mb-0.5">{title}</h4>}
        <div className="text-current font-normal">{children}</div>
      </div>
    </div>
  );
}
