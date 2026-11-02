"use client";

import { useState, useEffect, type ReactNode } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  Plus,
  Sparkles,
  X,
} from "lucide-react";
import SidebarNavigation from "@/components/layout/SidebarNavigation";
import NotificationCenter from "@/components/notifications/NotificationCenter";
import LogoutButton from "@/components/auth/LogoutButton";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";
import type { UserRole } from "@/types";

export type UserProfile = {
  id: string;
  full_name: string;
  role: UserRole;
};

type DashboardShellProps = {
  children: ReactNode;
  userProfile: UserProfile | null;
};

const freelancerNavigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Invoices", href: "/invoices" },
  { label: "Clients", href: "/clients" },
  { label: "Settings", href: "/settings" },
];

const clientNavigation = [
  { label: "Dashboard", href: "/dashboard" },
  { label: "Projects", href: "/projects" },
  { label: "Invoices", href: "/invoices" },
  { label: "Settings", href: "/settings" },
];

export default function DashboardShell({
  children,
  userProfile,
}: DashboardShellProps) {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [prevPathname, setPrevPathname] = useState(pathname);

  // Close mobile menu on route change without effect cascading render
  if (prevPathname !== pathname) {
    setPrevPathname(pathname);
    setMobileMenuOpen(false);
  }

  // Handle ESC key for mobile drawer
  useEffect(() => {
    if (!mobileMenuOpen) return;
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  const isFreelancer = userProfile?.role === "freelancer";
  const navigation = isFreelancer ? freelancerNavigation : clientNavigation;
  const fullName = userProfile?.full_name?.trim() || "Your account";

  // Sidebar brand & content
  const sidebarContent = (
    <div className="flex h-full flex-col justify-between p-5">
      <div className="space-y-6">
        {/* Workspace Brand / Header */}
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className="flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
              <Sparkles className="h-4 w-4 text-white" aria-hidden="true" />
            </div>
            <div>
              <span className="text-base font-bold tracking-tight text-foreground block leading-tight">
                Souqivo
              </span>
              <span className="text-[11px] font-medium text-muted-foreground block leading-none mt-0.5">
                {isFreelancer ? "Freelancer Studio" : "Client Portal"}
              </span>
            </div>
          </Link>
        </div>

        {/* Quick New Project CTA (Freelancer Only) */}
        {isFreelancer && (
          <div className="pt-1">
            <Link href="/projects/new" className="block">
              <Button
                variant="primary"
                size="sm"
                className="w-full justify-center shadow-xs"
                leftIcon={<Plus className="h-4 w-4" />}
              >
                New Project
              </Button>
            </Link>
          </div>
        )}

        {/* Navigation list */}
        <div className="pt-2">
          <p className="px-3 pb-2 text-[11px] font-semibold uppercase tracking-wider text-subtle-foreground">
            Menu
          </p>
          <SidebarNavigation
            items={navigation}
            onItemClick={() => setMobileMenuOpen(false)}
          />
        </div>
      </div>

      {/* Footer Profile info */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-3 px-1 py-1">
          <Avatar name={fullName} size="sm" role={userProfile?.role} />
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-foreground">
              {fullName}
            </p>
            <p className="truncate text-[11px] capitalize text-muted-foreground">
              {userProfile?.role || "user"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex h-dvh overflow-hidden bg-background">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:w-64 lg:shrink-0 lg:flex-col lg:border-r lg:border-border lg:bg-surface">
        {sidebarContent}
      </aside>

      {/* Mobile Drawer (Slide-over) */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/40 backdrop-blur-xs transition-opacity animate-in fade-in duration-200"
            onClick={() => setMobileMenuOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer content */}
          <div className="fixed inset-y-0 left-0 w-72 max-w-[80vw] bg-surface shadow-2xl border-r border-border flex flex-col z-10 animate-in slide-in-from-left duration-200">
            <div className="absolute right-3 top-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close menu"
                className="rounded-lg p-1.5 text-muted-foreground hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>
            {sidebarContent}
          </div>
        </div>
      )}

      {/* Main Body */}
      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        {/* Top Navbar */}
        <header className="flex h-16 shrink-0 items-center justify-between gap-3 border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            {/* Hamburger button on mobile */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open navigation menu"
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-border text-muted-foreground hover:bg-surface-muted hover:text-foreground lg:hidden focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>

            {/* Mobile Brand Mark */}
            <Link
              href="/dashboard"
              className="flex items-center gap-2 lg:hidden font-bold tracking-tight text-foreground text-sm"
            >
              <Sparkles className="h-4 w-4 text-accent" aria-hidden="true" />
              <span>Souqivo</span>
            </Link>

            {/* Desktop Workspace badge / context */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-muted-foreground font-medium">
              <span className="font-semibold text-foreground">Workspace</span>
              <span>/</span>
              <span className="capitalize">{userProfile?.role || "workspace"}</span>
            </div>
          </div>

          {/* Navbar Right Actions */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            {/* Quick "+ New Project" on medium screens */}
            {isFreelancer && (
              <Link href="/projects/new" className="hidden sm:block">
                <Button
                  variant="primary"
                  size="sm"
                  leftIcon={<Plus className="h-3.5 w-3.5" />}
                >
                  New Project
                </Button>
              </Link>
            )}

            <NotificationCenter />

            <div className="h-5 w-px bg-border hidden sm:block" aria-hidden="true" />

            <div className="flex items-center gap-2.5">
              <Avatar name={fullName} size="sm" role={userProfile?.role} />
              <div className="hidden sm:block text-left">
                <span className="block max-w-36 truncate text-xs font-semibold text-foreground leading-tight">
                  {fullName}
                </span>
                <span className="block text-[10px] capitalize text-muted-foreground leading-none mt-0.5">
                  {userProfile?.role}
                </span>
              </div>
            </div>

            <LogoutButton />
          </div>
        </header>

        {/* Scrollable Viewport */}
        <main className="mx-auto min-h-0 w-full max-w-screen-2xl min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
