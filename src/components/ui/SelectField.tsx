import type { SelectHTMLAttributes, ReactNode } from "react";
import { ChevronDown } from "lucide-react";

type SelectFieldProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "id"> & {
  id: string;
  label: string;
  children: ReactNode;
  error?: string;
  helperText?: string;
};

export default function SelectField({
  id,
  label,
  children,
  error,
  helperText,
  className = "",
  ...selectProps
}: SelectFieldProps) {
  const describedBy = [
    helperText ? `${id}-help` : null,
    error ? `${id}-error` : null,
  ]
    .filter(Boolean)
    .join(" ") || undefined;

  return (
    <div className="space-y-1.5 w-full">
      <label htmlFor={id} className="block text-xs font-semibold text-foreground tracking-tight">
        {label}
      </label>
      <div className="relative flex items-center">
        <select
          {...selectProps}
          id={id}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy}
          className={`min-h-10 w-full appearance-none rounded-lg border border-border bg-surface px-3 py-2 pr-9 text-sm leading-6 text-foreground shadow-2xs outline-none transition hover:border-border-strong focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/20 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted-foreground disabled:opacity-70 ${className}`}
        >
          {children}
        </select>
        <ChevronDown
          className="pointer-events-none absolute right-3 h-4 w-4 text-muted-foreground"
          aria-hidden="true"
        />
      </div>
      {helperText && !error && (
        <p id={`${id}-help`} className="text-xs leading-5 text-muted-foreground">
          {helperText}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="text-xs font-medium text-danger" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
