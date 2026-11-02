import Link from "next/link";
import {
  CheckCircle2,
  CheckSquare,
  FileText,
  MessageSquare,
} from "lucide-react";
import type { ReactNode } from "react";

type ActivityType = "review" | "task" | "message" | "file";

type ActivityItemProps = {
  type: ActivityType;
  title: string;
  description: string;
  time: string;
  href?: string;
};

function formatRelativeTime(time: string) {
  const activityTime = new Date(time).getTime();
  const now = Date.now();
  const difference = Math.max(0, now - activityTime);

  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return new Date(time).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });
}

const activityConfig: Record<
  ActivityType,
  { icon: ReactNode; bg: string; color: string }
> = {
  review: {
    icon: <CheckCircle2 className="h-4 w-4" aria-hidden="true" />,
    bg: "bg-amber-50 border-amber-200",
    color: "text-amber-700",
  },
  task: {
    icon: <CheckSquare className="h-4 w-4" aria-hidden="true" />,
    bg: "bg-blue-50 border-blue-200",
    color: "text-blue-700",
  },
  message: {
    icon: <MessageSquare className="h-4 w-4" aria-hidden="true" />,
    bg: "bg-purple-50 border-purple-200",
    color: "text-purple-700",
  },
  file: {
    icon: <FileText className="h-4 w-4" aria-hidden="true" />,
    bg: "bg-slate-100 border-slate-200",
    color: "text-slate-700",
  },
};

export default function ActivityItem({
  type,
  title,
  description,
  time,
  href,
}: ActivityItemProps) {
  const relativeTime = formatRelativeTime(time);
  const config = activityConfig[type];

  const content = (
    <div className="group flex items-start gap-3.5 py-3.5 px-2 rounded-xl transition-colors hover:bg-surface-muted/60">
      <div
        className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg border ${config.bg} ${config.color} shadow-2xs`}
      >
        {config.icon}
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center justify-between gap-2">
          <p className="text-xs font-semibold text-foreground group-hover:text-accent transition-colors truncate">
            {title}
          </p>
          <span className="shrink-0 text-[11px] font-medium text-subtle-foreground">
            {relativeTime}
          </span>
        </div>

        <p className="mt-0.5 line-clamp-1 text-xs text-muted-foreground">
          {description}
        </p>
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link
      href={href}
      className="block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
    >
      {content}
    </Link>
  );
}
