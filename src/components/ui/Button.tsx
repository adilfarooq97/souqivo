import type { ReactNode } from "react";
import { Loader2 } from "lucide-react";

type ButtonVariant = "primary" | "secondary" | "danger" | "outline" | "ghost";
type ButtonSize = "xs" | "sm" | "md" | "lg";

type ButtonProps = {
  children: ReactNode;
  variant?: ButtonVariant;
  size?: ButtonSize;
  className?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  onClick?: () => void;
  "aria-pressed"?: boolean;
  "aria-label"?: string;
};

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "border border-primary bg-primary text-white shadow-xs hover:bg-primary-hover active:bg-primary-active focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  secondary:
    "border border-border bg-surface text-foreground shadow-xs hover:bg-surface-muted hover:border-border-strong active:bg-slate-100 focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  danger:
    "border border-transparent bg-danger text-white shadow-xs hover:brightness-95 active:brightness-90 focus-visible:ring-2 focus-visible:ring-danger focus-visible:ring-offset-2",
  outline:
    "border border-border bg-transparent text-foreground hover:bg-surface-muted hover:border-border-strong focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
  ghost:
    "border border-transparent bg-transparent text-muted-foreground hover:bg-surface-muted hover:text-foreground focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2",
};

const sizeClasses: Record<ButtonSize, string> = {
  xs: "min-h-7 px-2.5 py-1 text-xs rounded-md gap-1.5",
  sm: "min-h-8 px-3 py-1.5 text-xs font-medium rounded-lg gap-1.5",
  md: "min-h-10 px-4 py-2 text-sm font-medium rounded-lg gap-2",
  lg: "min-h-11 px-5 py-2.5 text-base font-medium rounded-lg gap-2.5",
};

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  type = "button",
  disabled = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  onClick,
  "aria-pressed": ariaPressed,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      onClick={onClick}
      aria-pressed={ariaPressed}
      aria-label={ariaLabel}
      aria-busy={isLoading}
      className={`inline-flex items-center justify-center font-medium transition-all duration-150 select-none cursor-pointer focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
    >
      {isLoading ? (
        <Loader2 className="h-4 w-4 animate-spin shrink-0" aria-hidden="true" />
      ) : (
        leftIcon
      )}
      <span>{children}</span>
      {!isLoading && rightIcon}
    </button>
  );
}
