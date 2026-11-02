import type { TextareaHTMLAttributes } from "react";

type TextareaFieldProps = Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id"> & {
  id: string;
  label: string;
  error?: string;
  helperText?: string;
};

export default function TextareaField({
  id,
  label,
  error,
  helperText,
  className = "",
  ...textareaProps
}: TextareaFieldProps) {
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
      <textarea
        {...textareaProps}
        id={id}
        aria-invalid={Boolean(error)}
        aria-describedby={describedBy}
        className={`min-h-24 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm leading-6 text-foreground shadow-2xs outline-none transition placeholder:text-subtle-foreground hover:border-border-strong focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/20 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted-foreground disabled:opacity-70 ${className}`}
      />
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
