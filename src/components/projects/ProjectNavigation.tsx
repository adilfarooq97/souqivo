"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  CheckSquare,
  FileText,
  Layers,
  MessageSquare,
  Sparkles,
} from "lucide-react";

type ProjectNavigationProps = {
  projectId: string;
  active?: "overview" | "tasks" | "reviews" | "files" | "messages";
  counts?: {
    tasks?: number;
    reviews?: number;
    files?: number;
    messages?: number;
  };
};

const navigationItems = [
  { key: "overview", label: "Overview", suffix: "", icon: Layers },
  { key: "tasks", label: "Tasks", suffix: "/tasks", countKey: "tasks", icon: CheckSquare },
  { key: "reviews", label: "Reviews", suffix: "/reviews", countKey: "reviews", icon: Sparkles },
  { key: "files", label: "Files", suffix: "/files", countKey: "files", icon: FileText },
  {
    key: "messages",
    label: "Messages",
    suffix: "/messages",
    countKey: "messages",
    icon: MessageSquare,
  },
] as const;

export default function ProjectNavigation({
  projectId,
  active,
  counts,
}: ProjectNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Project navigation" className="border-b border-border">
      <div className="flex gap-2 sm:gap-6 overflow-x-auto no-scrollbar -mb-px">
        {navigationItems.map((item) => {
          const href = `/projects/${projectId}${item.suffix}`;
          const isActive =
            active === item.key ||
            (active === undefined && pathname === href);

          const count =
            "countKey" in item && counts
              ? counts[item.countKey as keyof typeof counts]
              : undefined;

          const IconComponent = item.icon;

          return (
            <Link
              key={item.key}
              href={href}
              aria-current={isActive ? "page" : undefined}
              className={`group flex min-h-11 items-center gap-2 border-b-2 px-3 py-2.5 text-xs sm:text-sm font-semibold whitespace-nowrap transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                isActive
                  ? "border-primary text-foreground"
                  : "border-transparent text-muted-foreground hover:border-border-strong hover:text-foreground"
              }`}
            >
              <IconComponent
                className={`h-4 w-4 shrink-0 transition-colors ${
                  isActive
                    ? "text-primary"
                    : "text-muted-foreground group-hover:text-foreground"
                }`}
                aria-hidden="true"
              />
              <span>{item.label}</span>

              {count !== undefined && (
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold transition-colors ${
                    isActive
                      ? "bg-slate-900 text-white"
                      : "bg-surface-muted text-muted-foreground group-hover:bg-slate-200"
                  }`}
                >
                  {count}
                </span>
              )}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
