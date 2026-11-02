"use client";

import { useState } from "react";
import {
  CheckCircle2,
  Clock,
  FileCheck2,
  FolderKanban,
  LayoutDashboard,
  Receipt,
  UserCheck,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import StatusBadge from "@/components/ui/StatusBadge";

type ShowcaseTab = "dashboard" | "kanban" | "reviews" | "client-portal" | "invoices";

const tabs: Array<{
  id: ShowcaseTab;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string;
}> = [
  { id: "dashboard", label: "Freelancer Dashboard", icon: LayoutDashboard },
  { id: "kanban", label: "Kanban Task Board", icon: FolderKanban },
  { id: "reviews", label: "Deliverable Reviews", icon: FileCheck2, badge: "Client Approval" },
  { id: "client-portal", label: "Client Portal", icon: UserCheck },
  { id: "invoices", label: "Project Invoices", icon: Receipt },
];

export default function ProductShowcase() {
  const [activeTab, setActiveTab] = useState<ShowcaseTab>("dashboard");

  return (
    <div className="w-full">
      {/* Tab Navigation Pill Bar */}
      <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-4">
        <div className="inline-flex rounded-xl border border-border bg-surface p-1.5 shadow-2xs">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id)}
                className={`flex shrink-0 items-center gap-2 rounded-lg px-3.5 py-2 text-xs font-semibold transition-all sm:text-sm ${
                  isActive
                    ? "bg-accent text-white shadow-xs"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
                aria-pressed={isActive}
              >
                <Icon className="h-4 w-4" aria-hidden="true" />
                <span>{tab.label}</span>
                {tab.badge && (
                  <span
                    className={`hidden rounded px-1.5 py-0.5 text-[10px] font-semibold sm:inline-block ${
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-accent-muted text-accent"
                    }`}
                  >
                    {tab.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Interactive Showcase Canvas Container */}
      <div className="mt-4 overflow-hidden rounded-2xl border border-border bg-surface p-2 shadow-xl shadow-slate-900/5 sm:p-4">
        <div className="overflow-hidden rounded-xl border border-border bg-background">
          {/* Top Browser/Workspace Bar */}
          <div className="flex h-11 items-center justify-between border-b border-border bg-surface px-4">
            <div className="flex items-center gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
              <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
            </div>
            <div className="text-xs font-medium text-muted-foreground">
              {activeTab === "dashboard" && "Dashboard · Multi-project overview"}
              {activeTab === "kanban" && "Projects / Apex Fintech / Kanban Pipeline"}
              {activeTab === "reviews" && "Projects / Apex Fintech / Deliverable Reviews"}
              {activeTab === "client-portal" && "Client View · Dedicated client access"}
              {activeTab === "invoices" && "Invoices · Billing & Milestone Tracking"}
            </div>
            <Badge variant="neutral" size="sm">
              Role Verified
            </Badge>
          </div>

          {/* TAB 1: FREELANCER DASHBOARD */}
          {activeTab === "dashboard" && (
            <div className="p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-border-muted pb-4">
                <div>
                  <div className="flex items-center gap-2">
                    <h4 className="text-lg font-bold text-foreground">
                      Freelancer Studio Dashboard
                    </h4>
                    <Badge variant="info">Agency / Pro</Badge>
                  </div>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    Real-time status across 4 active client projects.
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <span className="rounded-md bg-accent-muted px-2.5 py-1 text-xs font-semibold text-accent">
                    + New Project
                  </span>
                </div>
              </div>

              {/* Stats Row */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-xs font-medium text-muted-foreground">Active Projects</span>
                  <p className="text-xl font-bold text-foreground mt-1">4</p>
                  <span className="text-[10px] text-success font-medium">100% on schedule</span>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-xs font-medium text-muted-foreground">Pending Reviews</span>
                  <p className="text-xl font-bold text-amber-600 mt-1">2</p>
                  <span className="text-[10px] text-muted-foreground">Awaiting client sign-off</span>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-xs font-medium text-muted-foreground">Open Tasks</span>
                  <p className="text-xl font-bold text-foreground mt-1">14</p>
                  <span className="text-[10px] text-accent font-medium">6 in progress</span>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-xs font-medium text-muted-foreground">Invoiced Volume</span>
                  <p className="text-xl font-bold text-foreground mt-1">$18,400</p>
                  <span className="text-[10px] text-success font-medium">$14,200 collected</span>
                </div>
              </div>

              {/* Active Projects List */}
              <div className="space-y-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Active Client Projects
                </span>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-xl border border-border bg-surface p-4 hover:border-accent/50 transition">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground text-sm">
                        Apex Fintech App Redesign
                      </h5>
                      <StatusBadge status="In Progress" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Client: Apex Global · 7 tasks · 1 pending review
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">75%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "75%" }} />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border bg-surface p-4 hover:border-accent/50 transition">
                    <div className="flex items-center justify-between">
                      <h5 className="font-semibold text-foreground text-sm">
                        Lumina Creative Brand System
                      </h5>
                      <StatusBadge status="Planning" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      Client: Lumina Studio · Kickoff phase · 4 assets
                    </p>
                    <div className="mt-3 flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Progress</span>
                      <span className="font-semibold text-foreground">30%</span>
                    </div>
                    <div className="mt-1 h-1.5 w-full rounded-full bg-surface-muted overflow-hidden">
                      <div className="h-full bg-accent rounded-full" style={{ width: "30%" }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: KANBAN TASK BOARD */}
          {activeTab === "kanban" && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-border-muted pb-3">
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    Project Kanban Pipeline — Apex Fintech
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Four columns with priority indicators and live progress tracking.
                  </p>
                </div>
                <span className="rounded bg-accent px-2 py-1 text-xs font-semibold text-white">
                  + Add Task
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {/* Column 1: Todo */}
                <div className="rounded-xl border border-border bg-surface p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold text-foreground">To Do</span>
                    <span className="text-[10px] rounded-full bg-surface-muted px-2 py-0.5 font-bold text-muted-foreground">
                      2
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="rounded-lg border border-border bg-background p-2.5 shadow-2xs">
                      <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[9px] font-semibold text-slate-700">
                        Low
                      </span>
                      <p className="mt-1 text-xs font-medium text-foreground">Terms &amp; privacy page design</p>
                      <p className="mt-2 text-[10px] text-muted-foreground">Due Dec 05</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background p-2.5 shadow-2xs">
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-semibold text-blue-800">
                        Medium
                      </span>
                      <p className="mt-1 text-xs font-medium text-foreground">Typography scale harmonization</p>
                      <p className="mt-2 text-[10px] text-muted-foreground">Due Dec 08</p>
                    </div>
                  </div>
                </div>

                {/* Column 2: In Progress */}
                <div className="rounded-xl border border-border bg-surface p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold text-foreground">In Progress</span>
                    <span className="text-[10px] rounded-full bg-accent-muted px-2 py-0.5 font-bold text-accent">
                      2
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="rounded-lg border border-accent/40 bg-accent-muted/15 p-2.5 shadow-2xs">
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800">
                        High
                      </span>
                      <p className="mt-1 text-xs font-semibold text-foreground">Mobile dashboard layouts</p>
                      <p className="mt-2 text-[10px] text-accent font-medium">Due Tomorrow</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background p-2.5 shadow-2xs">
                      <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[9px] font-semibold text-blue-800">
                        Medium
                      </span>
                      <p className="mt-1 text-xs font-medium text-foreground">Asset export pipeline setup</p>
                      <p className="mt-2 text-[10px] text-muted-foreground">Due Dec 03</p>
                    </div>
                  </div>
                </div>

                {/* Column 3: Review */}
                <div className="rounded-xl border border-border bg-surface p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold text-foreground">Review</span>
                    <span className="text-[10px] rounded-full bg-info-muted px-2 py-0.5 font-bold text-info">
                      1
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="rounded-lg border border-info/40 bg-info-muted/20 p-2.5 shadow-2xs">
                      <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[9px] font-semibold text-amber-800">
                        High
                      </span>
                      <p className="mt-1 text-xs font-semibold text-foreground">Homepage hero interactive mock</p>
                      <p className="mt-2 text-[10px] text-info font-medium">Awaiting Client</p>
                    </div>
                  </div>
                </div>

                {/* Column 4: Done */}
                <div className="rounded-xl border border-border bg-surface p-3">
                  <div className="flex items-center justify-between pb-2 border-b border-border">
                    <span className="text-xs font-bold text-foreground">Done</span>
                    <span className="text-[10px] rounded-full bg-success-muted px-2 py-0.5 font-bold text-success">
                      3
                    </span>
                  </div>
                  <div className="mt-2.5 space-y-2">
                    <div className="rounded-lg border border-border bg-background/60 p-2.5 shadow-2xs opacity-80">
                      <div className="flex items-center gap-1.5 text-success">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="text-[10px] font-semibold">Completed</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-through">Brand color palette</p>
                    </div>
                    <div className="rounded-lg border border-border bg-background/60 p-2.5 shadow-2xs opacity-80">
                      <div className="flex items-center gap-1.5 text-success">
                        <CheckCircle2 className="h-3 w-3" />
                        <span className="text-[10px] font-semibold">Completed</span>
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground line-through">User flow wireframes</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: DELIVERABLE REVIEWS */}
          {activeTab === "reviews" && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-border-muted pb-3">
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    Deliverable Approvals &amp; Feedback Loop
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Clients can review submissions, approve, or submit structured revision requests.
                  </p>
                </div>
                <StatusBadge status="Pending" />
              </div>

              {/* Review Card Mockup */}
              <div className="rounded-xl border border-border bg-surface p-5 shadow-xs">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-accent">
                      Review #03
                    </span>
                    <h5 className="text-base font-bold text-foreground mt-0.5">
                      Figma UI Components &amp; Mobile Navigation Sheet
                    </h5>
                    <p className="text-xs text-muted-foreground mt-1">
                      Submitted by Alex Carter (Freelancer) · File: <span className="font-mono text-foreground">apex-ui-kit-v2.pdf</span>
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      className="rounded-lg bg-success px-4 py-2 text-xs font-semibold text-white shadow-xs hover:bg-success/90"
                    >
                      Approve Deliverable
                    </button>
                    <button
                      type="button"
                      className="rounded-lg border border-danger/30 bg-danger-muted px-4 py-2 text-xs font-semibold text-danger hover:bg-danger-muted/80"
                    >
                      Request Changes
                    </button>
                  </div>
                </div>

                <div className="mt-4 rounded-lg bg-surface-muted p-3 text-xs text-muted-foreground border border-border-muted">
                  <span className="font-semibold text-foreground">Freelancer Notes:</span> &ldquo;Updated the primary action colors to pass WCAG AAA contrast and restructured the mobile drawer hierarchy according to your team&rsquo;s kickoff notes.&rdquo;
                </div>

                <div className="mt-4 border-t border-border pt-4">
                  <p className="text-xs font-semibold text-foreground">Client Response &amp; Comment:</p>
                  <div className="mt-2 flex gap-2">
                    <input
                      type="text"
                      readOnly
                      value="Reviewing now with our product lead. The contrast update looks sharp!"
                      className="w-full rounded-lg border border-border bg-background px-3 py-2 text-xs text-foreground focus:outline-none"
                    />
                    <button
                      type="button"
                      className="rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white shrink-0"
                    >
                      Post Comment
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CLIENT PORTAL */}
          {activeTab === "client-portal" && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-200">
              <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-4">
                <div className="flex items-center gap-2.5">
                  <UserCheck className="h-5 w-5 text-accent" />
                  <h4 className="text-sm font-bold text-foreground">
                    Client Portal View (Clean &amp; Focused)
                  </h4>
                </div>
                <p className="text-xs text-muted-foreground mt-1">
                  Clients log into an uncluttered interface showing only their assigned projects, deliverables awaiting feedback, and verified invoices.
                </p>
              </div>

              {/* Action Banner for Clients */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                      <Clock className="h-5 w-5" />
                    </span>
                    <div>
                      <h5 className="text-xs font-bold text-foreground">Action Needed: Deliverable Review</h5>
                      <p className="text-[11px] text-muted-foreground">Apex Fintech Web Platform is awaiting your review</p>
                    </div>
                  </div>
                  <span className="rounded-md bg-amber-600 px-3 py-1.5 text-xs font-semibold text-white">
                    Review Deliverable
                  </span>
                </div>
              </div>

              <div className="grid sm:grid-cols-3 gap-3">
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-[11px] font-medium text-muted-foreground">Project Progress</span>
                  <p className="text-lg font-bold text-foreground mt-1">75% Complete</p>
                  <p className="text-[10px] text-muted-foreground">Next milestone: Dec 10</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-[11px] font-medium text-muted-foreground">Shared Files</span>
                  <p className="text-lg font-bold text-foreground mt-1">8 Documents &amp; Assets</p>
                  <p className="text-[10px] text-accent font-medium">Download anytime</p>
                </div>
                <div className="rounded-xl border border-border bg-surface p-3.5">
                  <span className="text-[11px] font-medium text-muted-foreground">Latest Invoice</span>
                  <p className="text-lg font-bold text-foreground mt-1">$4,800.00</p>
                  <p className="text-[10px] text-success font-medium">Paid · Receipt available</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 5: INVOICES */}
          {activeTab === "invoices" && (
            <div className="p-4 sm:p-6 space-y-4 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-border-muted pb-3">
                <div>
                  <h4 className="text-base font-bold text-foreground">
                    Invoices &amp; Milestone Billing
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    Generate and track project invoices connected directly to client deliverables.
                  </p>
                </div>
                <span className="rounded bg-accent px-3 py-1.5 text-xs font-semibold text-white">
                  + Create Invoice
                </span>
              </div>

              <div className="overflow-x-auto rounded-xl border border-border bg-surface">
                <table className="w-full text-left text-xs">
                  <thead className="bg-surface-muted text-muted-foreground border-b border-border">
                    <tr>
                      <th className="px-4 py-3 font-semibold">Invoice #</th>
                      <th className="px-4 py-3 font-semibold">Project &amp; Client</th>
                      <th className="px-4 py-3 font-semibold">Amount</th>
                      <th className="px-4 py-3 font-semibold">Status</th>
                      <th className="px-4 py-3 font-semibold">Due Date</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">INV-2026-001</td>
                      <td className="px-4 py-3">Apex Fintech (Kickoff Milestone)</td>
                      <td className="px-4 py-3 font-semibold text-foreground">$4,800.00</td>
                      <td className="px-4 py-3"><StatusBadge status="Paid" /></td>
                      <td className="px-4 py-3 text-muted-foreground">Nov 15, 2026</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">INV-2026-002</td>
                      <td className="px-4 py-3">Apex Fintech (Sprint 2 Deliverable)</td>
                      <td className="px-4 py-3 font-semibold text-foreground">$5,200.00</td>
                      <td className="px-4 py-3"><StatusBadge status="Pending" /></td>
                      <td className="px-4 py-3 text-muted-foreground">Dec 01, 2026</td>
                    </tr>
                    <tr>
                      <td className="px-4 py-3 font-semibold text-foreground">INV-2026-003</td>
                      <td className="px-4 py-3">Lumina Creative (Brand Phase 1)</td>
                      <td className="px-4 py-3 font-semibold text-foreground">$3,500.00</td>
                      <td className="px-4 py-3"><StatusBadge status="Draft" /></td>
                      <td className="px-4 py-3 text-muted-foreground">Dec 15, 2026</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
