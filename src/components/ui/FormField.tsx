import type { InputHTMLAttributes, ReactNode } from "react";
import Input from "@/components/ui/Input";

type FormFieldProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  "id" | "value" | "onChange" | "type"
> & {
  id: string;
  label: string;
  type?: string;
  value?: string;
  error?: string;
  helperText?: string;
  leftIcon?: ReactNode;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function FormField({
  id,
  label,
  type = "text",
  placeholder,
  value,
  error,
  disabled = false,
  helperText,
  leftIcon,
  onChange,
  ...inputProps
}: FormFieldProps) {
  return (
    <div className="space-y-1.5 w-full">
      <Input
        {...inputProps}
        id={id}
        label={label}
        type={type}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        leftIcon={leftIcon}
        onChange={onChange}
        aria-invalid={Boolean(error)}
        aria-describedby={
          [
            helperText ? `${id}-help` : null,
            error ? `${id}-error` : null,
          ]
            .filter(Boolean)
            .join(" ") || undefined
        }
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
