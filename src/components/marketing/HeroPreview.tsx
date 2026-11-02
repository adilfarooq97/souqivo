import {
  CheckCircle2,
  FileCheck2,
  FolderKanban,
  MessageSquare,
  Paperclip,
  Receipt,
} from "lucide-react";
import StatusBadge from "@/components/ui/StatusBadge";
import Avatar from "@/components/ui/Avatar";

export default function HeroPreview() {
  return (
    <div className="relative mx-auto w-full max-w-4xl select-none">
      {/* Decorative ambient background glows */}
      <div
        className="absolute -top-10 -left-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-info/10 blur-3xl"
        aria-hidden="true"
      />

      {/* Main SaaS Window Frame */}
      <div className="relative overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-slate-900/10">
        {/* Top Window Bar */}
        <div className="flex h-11 items-center justify-between border-b border-border bg-surface-muted/60 px-4">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-danger/80" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-warning/80" aria-hidden="true" />
            <span className="h-3 w-3 rounded-full bg-success/80" aria-hidden="true" />
          </div>
          <div className="flex items-center gap-2 rounded-md border border-border bg-surface px-3 py-1 text-xs font-medium text-muted-foreground shadow-2xs">
            <span className="h-2 w-2 rounded-full bg-accent animate-pulse" />
            app.souqivo.com/projects/acme-brand-portal
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[11px] font-medium text-subtle-foreground">
              Live Workspace
            </span>
          </div>
        </div>

        {/* Project Header Bar */}
        <div className="border-b border-border bg-surface p-4 sm:p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-2.5">
                <h3 className="text-base font-bold tracking-tight text-foreground sm:text-lg">
                  Acme Studios — Brand &amp; Web Platform
                </h3>
                <StatusBadge status="In Progress" />
              </div>
              <p className="text-xs text-muted-foreground">
                One unified workspace for design assets, feedback approvals, and milestone invoices.
              </p>
            </div>

            {/* Project Members Stack */}
            <div className="flex items-center gap-3">
              <div className="flex -space-x-2">
                <div title="Alex Carter (Freelancer)">
                  <Avatar name="Alex Carter" size="sm" role="freelancer" />
                </div>
                <div title="Sarah Chen (Client)">
                  <Avatar name="Sarah Chen" size="sm" role="client" />
                </div>
                <div title="Marcus Vance (Client)">
                  <Avatar name="Marcus Vance" size="sm" role="client" />
                </div>
              </div>
              <div className="text-right">
                <p className="text-[11px] font-semibold text-foreground">3 Members</p>
                <p className="text-[10px] text-muted-foreground">Active now</p>
              </div>
            </div>
          </div>

          {/* Progress bar */}
          <div className="mt-4 flex items-center gap-3">
            <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-muted border border-border-muted">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: "68%" }}
              />
            </div>
            <span className="text-xs font-semibold text-foreground">68% Complete</span>
          </div>

          {/* Project Tabs */}
          <div className="mt-4 flex items-center gap-1 border-t border-border-muted pt-3 overflow-x-auto text-xs font-medium">
            <span className="flex items-center gap-1.5 rounded-md bg-accent-muted px-2.5 py-1 text-accent font-semibold">
              <FolderKanban className="h-3.5 w-3.5" />
              Tasks &amp; Kanban
            </span>
            <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted-foreground">
              <FileCheck2 className="h-3.5 w-3.5" />
              Reviews (1)
            </span>
            <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted-foreground">
              <Paperclip className="h-3.5 w-3.5" />
              Files (8)
            </span>
            <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted-foreground">
              <MessageSquare className="h-3.5 w-3.5" />
              Messages
            </span>
            <span className="flex items-center gap-1.5 rounded-md px-2.5 py-1 text-muted-foreground">
              <Receipt className="h-3.5 w-3.5" />
              Invoices (2)
            </span>
          </div>
        </div>

        {/* Interior Workspace Mock */}
        <div className="grid gap-4 bg-background p-4 sm:p-5 lg:grid-cols-12">
          {/* Left Column: Mini Kanban Pipeline (7 cols) */}
          <div className="space-y-3 lg:col-span-7">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Task Pipeline
              </span>
              <span className="text-[11px] text-subtle-foreground">
                Drag &amp; drop workflow
              </span>
            </div>

            <div className="grid grid-cols-3 gap-2.5">
              {/* To Do Column */}
              <div className="rounded-xl border border-border bg-surface p-2.5">
                <div className="mb-2 flex items-center justify-between border-b border-border pb-1.5">
                  <span className="text-[11px] font-bold text-foreground">To Do</span>
                  <span className="rounded bg-surface-muted px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground">
                    2
                  </span>
                </div>
                <div className="space-y-2">
                  <div className="rounded-lg border border-border bg-background p-2 shadow-2xs">
                    <p className="text-[11px] font-medium text-foreground">Mobile viewport tests</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-700">
                        Low
                      </span>
                      <span className="text-[9px] text-muted-foreground">Nov 30</span>
                    </div>
                  </div>
                  <div className="rounded-lg border border-border bg-background p-2 shadow-2xs">
                    <p className="text-[11px] font-medium text-foreground">Final asset export</p>
                    <div className="mt-2 flex items-center justify-between">
                      <span className="rounded bg-slate-100 px-1 py-0.5 text-[9px] font-medium text-slate-700">
                        Low
                      </span>
                      <span className="text-[9px] text-muted-foreground">Dec 02</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* In Progress Column */}
              <div className="rounded-xl border border-border bg-surface p-2.5">
                <div className="mb-2 flex items-center justify-between border-b border-border pb-1.5">
                  <span className="text-[11px] font-bold text-foreground">In Progress</span>
                  <span className="rounded bg-accent-muted px-1.5 py-0.5 text-[10px] font-medium text-accent">
                    1
                  </span>
                </div>
                <div className="rounded-lg border border-accent/40 bg-accent-muted/20 p-2 shadow-2xs">
                  <p className="text-[11px] font-semibold text-foreground">Interactive styleguide</p>
                  <p className="mt-0.5 text-[9px] text-muted-foreground">Design token sync</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded bg-amber-100 px-1 py-0.5 text-[9px] font-medium text-amber-800">
                      High
                    </span>
                    <span className="text-[9px] font-medium text-accent">Today</span>
                  </div>
                </div>
              </div>

              {/* Review / Done Column */}
              <div className="rounded-xl border border-border bg-surface p-2.5">
                <div className="mb-2 flex items-center justify-between border-b border-border pb-1.5">
                  <span className="text-[11px] font-bold text-foreground">Client Review</span>
                  <span className="rounded bg-info-muted px-1.5 py-0.5 text-[10px] font-medium text-info">
                    1
                  </span>
                </div>
                <div className="rounded-lg border border-border bg-background p-2 shadow-2xs">
                  <p className="text-[11px] font-medium text-foreground">Homepage wireframes</p>
                  <div className="mt-2 flex items-center justify-between">
                    <span className="rounded bg-blue-100 px-1 py-0.5 text-[9px] font-medium text-blue-800">
                      Medium
                    </span>
                    <span className="text-[9px] text-success font-medium">Ready</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Deliverable Review & Live Collaboration (5 cols) */}
          <div className="space-y-3 lg:col-span-5">
            <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
              Client Approval Portal
            </span>

            {/* Deliverable Review Card */}
            <div className="rounded-xl border border-border bg-surface p-3.5 shadow-xs">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-accent">
                    Deliverable Review
                  </span>
                  <h4 className="text-xs font-bold text-foreground">
                    Web Homepage Design Kit v2.4
                  </h4>
                </div>
                <StatusBadge status="Pending" />
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-muted-foreground">
                Submitted by Alex Carter. Please review the updated color hierarchy and sign off.
              </p>

              {/* Action Buttons */}
              <div className="mt-3 flex items-center gap-2">
                <button
                  type="button"
                  className="flex-1 rounded-md bg-success px-2.5 py-1.5 text-center text-[11px] font-semibold text-white shadow-2xs transition hover:bg-success/90"
                >
                  Approve Deliverable
                </button>
                <button
                  type="button"
                  className="flex-1 rounded-md border border-border bg-surface px-2.5 py-1.5 text-center text-[11px] font-medium text-foreground hover:bg-surface-muted"
                >
                  Request Changes
                </button>
              </div>
            </div>

            {/* Connected Invoice & Chat Pill */}
            <div className="grid grid-cols-2 gap-2">
              <div className="rounded-lg border border-border bg-surface p-2.5">
                <div className="flex items-center justify-between">
                  <span className="text-[10px] text-muted-foreground">Milestone 1</span>
                  <span className="rounded bg-success-muted px-1 text-[9px] font-semibold text-success">
                    Paid
                  </span>
                </div>
                <p className="mt-1 text-xs font-bold text-foreground">$4,800.00</p>
                <p className="text-[9px] text-subtle-foreground">INV-2026-004</p>
              </div>

              <div className="rounded-lg border border-border bg-surface p-2.5">
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-success" />
                  <span className="text-[10px] font-medium text-foreground">Sarah (Client)</span>
                </div>
                <p className="mt-1 truncate text-[10px] text-muted-foreground">
                  &ldquo;Approved! Ready for dev.&rdquo;
                </p>
                <p className="text-[9px] text-subtle-foreground">12m ago</p>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Status Banner */}
        <div className="flex flex-wrap items-center justify-between border-t border-border bg-surface-muted/50 px-4 py-2.5 text-xs text-muted-foreground">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="h-4 w-4 text-success" />
            <span>All tasks, reviews, files, and invoices in one connected workspace</span>
          </div>
          <span className="text-[11px] text-subtle-foreground hidden sm:inline">
            Role-based permissions active
          </span>
        </div>
      </div>
    </div>
  );
}
