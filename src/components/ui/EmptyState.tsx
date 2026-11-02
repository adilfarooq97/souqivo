import type { ReactNode } from "react";
import { FolderOpen } from "lucide-react";

type EmptyStateProps = {
  title: string;
  description: string;
  icon?: ReactNode;
  action?: ReactNode;
  secondaryAction?: ReactNode;
  className?: string;
};

export default function EmptyState({
  title,
  description,
  icon,
  action,
  secondaryAction,
  className = "",
}: EmptyStateProps) {
  return (
    <section
      className={`rounded-2xl border border-dashed border-border-strong bg-surface/50 px-6 py-12 text-center transition-all ${className}`}
    >
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-surface-muted text-muted-foreground shadow-2xs">
        {icon || <FolderOpen className="h-6 w-6 text-subtle-foreground" aria-hidden="true" />}
      </div>

      <h2 className="mt-4 text-base font-semibold tracking-tight text-foreground">
        {title}
      </h2>

      <p className="mx-auto mt-1.5 max-w-md text-sm leading-6 text-muted-foreground">
        {description}
      </p>

      {(action || secondaryAction) && (
        <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
          {action}
          {secondaryAction}
        </div>
      )}
    </section>
  );
}
