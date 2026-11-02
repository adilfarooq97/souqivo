"use client";

import { useState } from "react";
import { Eye, EyeOff } from "lucide-react";

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  leftIcon?: React.ReactNode;
};

export default function Input({
  label,
  type = "text",
  id,
  disabled = false,
  className = "",
  leftIcon,
  ...inputProps
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="space-y-1.5 w-full">
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold text-foreground tracking-tight"
        >
          {label}
        </label>
      )}

      <div className="relative flex items-center">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
            {leftIcon}
          </div>
        )}

        <input
          {...inputProps}
          id={id}
          type={type === "password" && showPassword ? "text" : type}
          disabled={disabled}
          className={`min-h-10 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm leading-6 text-foreground shadow-2xs outline-none transition placeholder:text-subtle-foreground hover:border-border-strong focus-visible:border-accent focus-visible:ring-2 focus-visible:ring-accent/20 aria-invalid:border-danger aria-invalid:focus-visible:ring-danger/20 disabled:cursor-not-allowed disabled:bg-surface-muted disabled:text-muted-foreground disabled:opacity-70 ${
            leftIcon ? "pl-9" : ""
          } ${type === "password" ? "pr-10" : ""} ${className}`}
        />

        {type === "password" && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            disabled={disabled}
            aria-label={showPassword ? "Hide password" : "Show password"}
            className="absolute right-3 flex items-center rounded p-1 text-muted-foreground hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent disabled:pointer-events-none disabled:opacity-50"
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" aria-hidden="true" />
            ) : (
              <Eye className="h-4 w-4" aria-hidden="true" />
            )}
          </button>
        )}
      </div>
    </div>
  );
}
