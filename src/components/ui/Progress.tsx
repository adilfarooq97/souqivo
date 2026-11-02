type ProgressProps = {
  value: number;
  size?: "sm" | "md" | "lg";
  variant?: "primary" | "accent" | "success";
  className?: string;
};

const sizeClasses = {
  sm: "h-1.5",
  md: "h-2",
  lg: "h-3",
};

const variantClasses = {
  primary: "bg-primary",
  accent: "bg-accent",
  success: "bg-success",
};

export default function Progress({
  value,
  size = "md",
  variant = "primary",
  className = "",
}: ProgressProps) {
  const clampedValue = Math.max(0, Math.min(value, 100));

  return (
    <div
      className={`w-full overflow-hidden rounded-full bg-slate-100 ${sizeClasses[size]} ${className}`}
      role="progressbar"
      aria-valuenow={clampedValue}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <div
        className={`h-full rounded-full transition-all duration-300 ease-out ${variantClasses[variant]}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}
