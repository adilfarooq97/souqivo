import Link from "next/link";
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  Clock,
  Plus,
  Receipt,
} from "lucide-react";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import { getInvoices } from "@/lib/supabase/invoices";
import type { InvoiceStatus } from "@/types";
import { getDisplayInvoiceStatus } from "@/lib/invoices";
import StatusBadge from "@/components/ui/StatusBadge";
import EmptyState from "@/components/ui/EmptyState";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getMemberProfiles } from "@/lib/supabase/users";

export default async function InvoicesPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>;
}) {
  const { status } = await searchParams;

  const [userProfile, invoices, projects] = await Promise.all([
    getCurrentUserProfile(),
    getInvoices(),
    getAccessibleProjects(),
  ]);

  const isFreelancer = userProfile?.role === "freelancer";

  const clientProfiles = isFreelancer
    ? await getMemberProfiles([
        ...new Set(invoices.map((invoice) => invoice.client_id)),
      ])
    : [];

  const projectNames = new Map(
    projects.map((project) => [project.id, project.name])
  );
  const clientNames = new Map(
    clientProfiles.map((profile) => [profile.id, profile.full_name])
  );

  const totalAmount = invoices.reduce(
    (sum, invoice) => sum + Number(invoice.amount),
    0
  );

  const paidAmount = invoices
    .filter((invoice) => getDisplayInvoiceStatus(invoice) === "Paid")
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const pendingAmount = invoices
    .filter((invoice) => getDisplayInvoiceStatus(invoice) === "Pending")
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const overdueAmount = invoices
    .filter((invoice) => getDisplayInvoiceStatus(invoice) === "Overdue")
    .reduce((sum, invoice) => sum + Number(invoice.amount), 0);

  const formatAmount = (amount: number) =>
    `$${amount.toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;

  const formatDate = (date: string) =>
    new Date(`${date}T00:00:00`).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const validStatuses: InvoiceStatus[] = [
    "Draft",
    "Pending",
    "Paid",
    "Overdue",
  ];

  const selectedStatus = validStatuses.includes(status as InvoiceStatus)
    ? (status as InvoiceStatus)
    : "All";

  const filteredInvoices =
    selectedStatus === "All"
      ? invoices
      : invoices.filter(
          (invoice) => getDisplayInvoiceStatus(invoice) === selectedStatus
        );

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Invoices"
        description={
          isFreelancer
            ? "Create, track, and manage billing milestones for all client projects."
            : "Review invoices and payment statuses shared with your account."
        }
        breadcrumbs={<Breadcrumbs items={[{ label: "Invoices" }]} />}
        action={
          isFreelancer ? (
            <Link href="/invoices/new">
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                New Invoice
              </Button>
            </Link>
          ) : undefined
        }
      />

      {/* Financial Metrics Cards */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Invoiced</span>
            <Receipt className="h-4 w-4 text-subtle-foreground" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {formatAmount(totalAmount)}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {invoices.length} {invoices.length === 1 ? "invoice" : "invoices"}
          </p>
        </div>

        <div className="rounded-xl border border-success-border bg-success-muted/30 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-success">Paid</span>
            <CheckCircle2 className="h-4 w-4 text-success" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-success">
            {formatAmount(paidAmount)}
          </p>
          <p className="mt-1 text-[11px] text-success/80">Completed receipts</p>
        </div>

        <div className="rounded-xl border border-warning-border bg-warning-muted/30 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-warning">Pending</span>
            <Clock className="h-4 w-4 text-warning" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-warning">
            {formatAmount(pendingAmount)}
          </p>
          <p className="mt-1 text-[11px] text-warning/80">Awaiting clearance</p>
        </div>

        <div className="rounded-xl border border-danger-border bg-danger-muted/30 p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-danger">Overdue</span>
            <AlertTriangle className="h-4 w-4 text-danger" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-danger">
            {formatAmount(overdueAmount)}
          </p>
          <p className="mt-1 text-[11px] text-danger/80">Past due date</p>
        </div>
      </div>

      {/* Filter Tabs */}
      {invoices.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-border w-fit">
          <Link
            href="/invoices"
            className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
              selectedStatus === "All"
                ? "bg-slate-900 text-white shadow-xs"
                : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
            }`}
          >
            <span>All</span>
            <span
              className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                selectedStatus === "All"
                  ? "bg-slate-800 text-slate-200"
                  : "bg-surface-muted text-muted-foreground"
              }`}
            >
              {invoices.length}
            </span>
          </Link>

          {validStatuses.map((invoiceStatus) => {
            const isSelected = selectedStatus === invoiceStatus;
            const count = invoices.filter(
              (i) => getDisplayInvoiceStatus(i) === invoiceStatus
            ).length;

            return (
              <Link
                key={invoiceStatus}
                href={`/invoices?status=${encodeURIComponent(invoiceStatus)}`}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <span>{invoiceStatus}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected
                      ? "bg-slate-800 text-slate-200"
                      : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </Link>
            );
          })}
        </div>
      )}

      {/* Invoices List / Table */}
      {invoices.length === 0 ? (
        <EmptyState
          title="No invoices yet"
          description={
            isFreelancer
              ? "Create your first invoice to start billing clients and tracking project milestones."
              : "Invoices issued for your projects will appear here."
          }
          icon={<Receipt className="h-6 w-6 text-subtle-foreground" />}
          action={
            isFreelancer ? (
              <Link href="/invoices/new">
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                  Create First Invoice
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : filteredInvoices.length === 0 ? (
        <EmptyState
          title={`No ${selectedStatus.toLowerCase()} invoices`}
          description="There are currently no invoices matching this status filter."
          action={
            <Link href="/invoices">
              <Button variant="secondary" size="sm">
                View all invoices
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-xs">
          {/* Desktop Table View */}
          <div className="hidden md:block overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-surface-muted/50 text-muted-foreground uppercase tracking-wider font-semibold">
                <tr>
                  <th className="px-5 py-3">Invoice / Client</th>
                  <th className="px-5 py-3">Description</th>
                  <th className="px-5 py-3">Amount</th>
                  <th className="px-5 py-3">Issue Date</th>
                  <th className="px-5 py-3">Due Date</th>
                  <th className="px-5 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Action</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-border-muted">
                {filteredInvoices.map((invoice) => {
                  const clientName =
                    userProfile?.role === "client"
                      ? userProfile.full_name
                      : clientNames.get(invoice.client_id) ?? "Client unavailable";
                  const projectName =
                    projectNames.get(invoice.project_id) ?? "Project unavailable";

                  return (
                    <tr
                      key={invoice.id}
                      className="group transition-colors hover:bg-surface-muted/40"
                    >
                      <td className="px-5 py-4">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="font-semibold text-foreground group-hover:text-accent transition-colors block text-sm"
                        >
                          {invoice.invoice_number}
                        </Link>
                        <p className="mt-0.5 text-[11px] text-muted-foreground">
                          {projectName} · {clientName}
                        </p>
                      </td>

                      <td className="px-5 py-4 text-muted-foreground max-w-xs truncate">
                        {invoice.description || "—"}
                      </td>

                      <td className="px-5 py-4 font-bold text-foreground text-sm">
                        {formatAmount(Number(invoice.amount))}
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        {formatDate(invoice.issue_date)}
                      </td>

                      <td className="px-5 py-4 text-muted-foreground">
                        {formatDate(invoice.due_date)}
                      </td>

                      <td className="px-5 py-4">
                        <StatusBadge
                          status={getDisplayInvoiceStatus(invoice)}
                          size="sm"
                        />
                      </td>

                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/invoices/${invoice.id}`}
                          className="inline-flex items-center gap-1 font-semibold text-accent hover:underline"
                        >
                          <span>View</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile Card View (< md) */}
          <div className="md:hidden divide-y divide-border-muted">
            {filteredInvoices.map((invoice) => {
              const clientName =
                userProfile?.role === "client"
                  ? userProfile.full_name
                  : clientNames.get(invoice.client_id) ?? "Client unavailable";
              const projectName =
                projectNames.get(invoice.project_id) ?? "Project unavailable";

              return (
                <Link
                  key={invoice.id}
                  href={`/invoices/${invoice.id}`}
                  className="block p-4 transition-colors hover:bg-surface-muted/40"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <span className="text-sm font-bold text-foreground">
                        {invoice.invoice_number}
                      </span>
                      <p className="mt-0.5 text-xs text-muted-foreground">
                        {projectName} · {clientName}
                      </p>
                    </div>
                    <StatusBadge
                      status={getDisplayInvoiceStatus(invoice)}
                      size="sm"
                    />
                  </div>

                  <div className="mt-3 flex items-center justify-between text-xs pt-2 border-t border-border-muted">
                    <span className="font-bold text-foreground text-base">
                      {formatAmount(Number(invoice.amount))}
                    </span>
                    <span className="text-muted-foreground">
                      Due {formatDate(invoice.due_date)}
                    </span>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
