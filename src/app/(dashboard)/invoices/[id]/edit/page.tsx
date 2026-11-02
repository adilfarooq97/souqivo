import { notFound, redirect } from "next/navigation";
import EditInvoiceForm from "@/components/invoices/EditInvoiceForm";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import { getInvoice } from "@/lib/supabase/invoices";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function EditInvoicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [userProfile, invoice] = await Promise.all([
    getCurrentUserProfile(),
    getInvoice(id),
  ]);

  if (!userProfile) {
    redirect("/login");
  }

  if (userProfile.role !== "freelancer") {
    redirect(`/invoices/${id}`);
  }

  if (!invoice) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title={`Edit Invoice ${invoice.invoice_number}`}
        description="Update invoice details, amounts, due dates, or payment status."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Invoices", href: "/invoices" },
              { label: invoice.invoice_number, href: `/invoices/${invoice.id}` },
              { label: "Edit" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <EditInvoiceForm invoice={invoice} />
      </div>
    </div>
  );
}
