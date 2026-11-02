import type { ReactNode } from "react";
import {
  CheckSquare,
  Clock,
  FileText,
  FolderKanban,
  MessageSquare,
  Sparkles,
} from "lucide-react";

type StatCardProps = {
  title: string;
  value: string;
  subtitle?: string;
  icon?: ReactNode;
};

const defaultIcons: Record<string, ReactNode> = {
  "Active Projects": <FolderKanban className="h-4 w-4" aria-hidden="true" />,
  "My Projects": <FolderKanban className="h-4 w-4" aria-hidden="true" />,
  "Active Tasks": <Clock className="h-4 w-4" aria-hidden="true" />,
  "Open Tasks": <Clock className="h-4 w-4" aria-hidden="true" />,
  "Completed Tasks": <CheckSquare className="h-4 w-4" aria-hidden="true" />,
  "Pending Reviews": <Sparkles className="h-4 w-4" aria-hidden="true" />,
  "Reviews to Check": <Sparkles className="h-4 w-4" aria-hidden="true" />,
  "Project Files": <FileText className="h-4 w-4" aria-hidden="true" />,
  Messages: <MessageSquare className="h-4 w-4" aria-hidden="true" />,
};

export default function StatCard({
  title,
  value,
  subtitle,
  icon,
}: StatCardProps) {
  const displayIcon = icon || defaultIcons[title];

  return (
    <div className="rounded-xl border border-border bg-surface p-4.5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs">
      <div className="flex items-center justify-between gap-2">
        <p className="text-xs font-semibold text-muted-foreground tracking-tight">
          {title}
        </p>
        {displayIcon && (
          <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-surface-muted text-muted-foreground">
            {displayIcon}
          </div>
        )}
      </div>

      <p className="mt-2 text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
        {value}
      </p>

      {subtitle && (
        <p className="mt-1 text-[11px] text-subtle-foreground truncate">
          {subtitle}
        </p>
      )}
    </div>
  );
}
