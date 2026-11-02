import Link from "next/link";
import { redirect } from "next/navigation";
import { FolderPlus, Users } from "lucide-react";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import { getProjects } from "@/lib/supabase/projects";
import { getProjectMembers } from "@/lib/supabase/project-members";
import { getMemberProfiles } from "@/lib/supabase/users";
import CreateInvoiceForm from "@/components/invoices/CreateInvoiceForm";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default async function NewInvoicePage() {
  const userProfile = await getCurrentUserProfile();

  if (!userProfile) {
    redirect("/login");
  }

  if (userProfile.role !== "freelancer") {
    redirect("/invoices");
  }

  const projects = await getProjects();

  const projectsWithClients = await Promise.all(
    projects.map(async (project) => {
      const members = await getProjectMembers(project.id);

      const clientIds = members
        .filter((member) => member.role === "client")
        .map((member) => member.user_id);

      const clientProfiles =
        clientIds.length > 0 ? await getMemberProfiles(clientIds) : [];

      return {
        ...project,
        clients: clientProfiles
          .filter((profile) => profile.role === "client")
          .map((profile) => ({
            id: profile.id,
            full_name: profile.full_name,
          })),
      };
    })
  );

  const invoiceProjects = projectsWithClients.filter(
    (project) => project.clients.length > 0
  );

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Create Invoice"
        description="Issue an invoice to bill for project milestones, deliverables, or retainer retainers."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Invoices", href: "/invoices" },
              { label: "New Invoice" },
            ]}
          />
        }
      />

      {invoiceProjects.length === 0 ? (
        <EmptyState
          title={
            projects.length === 0
              ? "Create a project before invoicing"
              : "Add a client before invoicing"
          }
          description={
            projects.length === 0
              ? "Invoices are connected to client projects. Create your first project and add a client to bill."
              : "Invoices require a client assigned to a project. Add a client to one of your active projects first."
          }
          icon={
            projects.length === 0 ? (
              <FolderPlus className="h-6 w-6 text-subtle-foreground" />
            ) : (
              <Users className="h-6 w-6 text-subtle-foreground" />
            )
          }
          action={
            <Link href={projects.length === 0 ? "/projects/new" : "/projects"}>
              <Button variant="primary">
                {projects.length === 0 ? "Create Project" : "View Projects"}
              </Button>
            </Link>
          }
        />
      ) : (
        <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
          <CreateInvoiceForm projects={invoiceProjects} />
        </div>
      )}
    </div>
  );
}
