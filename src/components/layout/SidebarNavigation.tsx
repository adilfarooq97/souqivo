"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FolderKanban,
  LayoutDashboard,
  Receipt,
  Settings,
  Users,
} from "lucide-react";

export type NavigationItem = {
  label: string;
  href: string;
  icon?: string;
};

type SidebarNavigationProps = {
  items: NavigationItem[];
  onItemClick?: () => void;
};

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
  Dashboard: LayoutDashboard,
  Projects: FolderKanban,
  Invoices: Receipt,
  Clients: Users,
  Settings: Settings,
};

export default function SidebarNavigation({
  items,
  onItemClick,
}: SidebarNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="w-full">
      <ul className="flex flex-col gap-1 w-full">
        {items.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(`${item.href}/`));

          const IconComponent = iconMap[item.label] || LayoutDashboard;

          return (
            <li key={item.href} className="w-full">
              <Link
                href={item.href}
                onClick={onItemClick}
                aria-current={isActive ? "page" : undefined}
                className={`group relative flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-150 select-none focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
                  isActive
                    ? "bg-slate-900 text-white shadow-xs font-semibold"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <IconComponent
                  className={`h-4 w-4 shrink-0 transition-colors ${
                    isActive
                      ? "text-white"
                      : "text-muted-foreground group-hover:text-foreground"
                  }`}
                />
                <span className="truncate">{item.label}</span>

                {isActive && (
                  <span
                    className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                    aria-hidden="true"
                  />
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
