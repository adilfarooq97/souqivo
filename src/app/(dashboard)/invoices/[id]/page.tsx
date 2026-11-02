import Link from "next/link";
import { notFound, redirect } from "next/navigation";
import { Calendar, Edit3, FolderKanban, User } from "lucide-react";
import Button from "@/components/ui/Button";
import DeleteInvoiceButton from "@/components/invoices/DeleteInvoiceButton";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import { getInvoice } from "@/lib/supabase/invoices";
import { getMemberProfiles } from "@/lib/supabase/users";
import { getDisplayInvoiceStatus } from "@/lib/invoices";
import StatusBadge from "@/components/ui/StatusBadge";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import PageHeader from "@/components/ui/PageHeader";

export default async function InvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [userProfile, invoice, projects] = await Promise.all([
    getCurrentUserProfile(),
    getInvoice(id),
    getAccessibleProjects(),
  ]);

  if (!userProfile) {
    redirect("/login");
  }

  if (!invoice) {
    notFound();
  }

  const clientProfile =
    userProfile.role === "freelancer"
      ? (await getMemberProfiles([invoice.client_id]))[0]
      : userProfile;

  const project = projects.find((item) => item.id === invoice.project_id);
  const displayStatus = getDisplayInvoiceStatus(invoice);

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

  const isFreelancer = userProfile.role === "freelancer";

  return (
    <div className="mx-auto max-w-3xl space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs
        items={[
          { label: "Invoices", href: "/invoices" },
          { label: invoice.invoice_number },
        ]}
      />

      <PageHeader
        title={invoice.invoice_number}
        badge={<StatusBadge status={displayStatus} />}
        action={
          isFreelancer ? (
            <div className="flex items-center gap-2.5">
              <Link href={`/invoices/${invoice.id}/edit`}>
                <Button variant="outline" size="sm" leftIcon={<Edit3 className="h-4 w-4" />}>
                  Edit Invoice
                </Button>
              </Link>
              <DeleteInvoiceButton invoiceId={invoice.id} />
            </div>
          ) : undefined
        }
      />

      {/* Invoice Card / Paper */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs space-y-6">
        {/* Total Amount Box */}
        <div className="rounded-xl border border-border-muted bg-surface-muted/40 p-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Total Amount Due
            </span>
            <p className="mt-1 text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              {formatAmount(Number(invoice.amount))}
            </p>
          </div>

          <div className="sm:text-right">
            <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Payment Status
            </span>
            <div className="mt-1">
              <StatusBadge status={displayStatus} size="md" />
            </div>
          </div>
        </div>

        {/* Invoice Metadata Grid */}
        <div className="grid gap-6 sm:grid-cols-2 pt-2">
          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5" />
              <span>Issue Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatDate(invoice.issue_date)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <Calendar className="h-3.5 w-3.5" />
              <span>Due Date</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {formatDate(invoice.due_date)}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <User className="h-3.5 w-3.5" />
              <span>Client</span>
            </div>
            <p className="text-sm font-semibold text-foreground">
              {clientProfile?.full_name ?? "Client name unavailable"}
            </p>
          </div>

          <div className="space-y-1">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              <FolderKanban className="h-3.5 w-3.5" />
              <span>Project</span>
            </div>
            {project ? (
              <Link
                href={`/projects/${project.id}`}
                className="text-sm font-semibold text-accent hover:underline block"
              >
                {project.name}
              </Link>
            ) : (
              <p className="text-sm font-semibold text-foreground">
                Project unavailable
              </p>
            )}
          </div>
        </div>

        {/* Description Section */}
        {invoice.description && (
          <div className="border-t border-border-muted pt-6 space-y-2">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
              Work &amp; Milestone Description
            </h3>
            <p className="text-xs leading-relaxed text-foreground whitespace-pre-wrap">
              {invoice.description}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
