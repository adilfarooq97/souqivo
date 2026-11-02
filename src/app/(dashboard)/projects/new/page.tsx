import { getCurrentUserProfile } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import CreateProjectForm from "@/components/projects/CreateProjectForm";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function NewProjectPage() {
  const profile = await getCurrentUserProfile();

  if (!profile) {
    redirect("/login");
  }

  if (profile.role !== "freelancer") {
    redirect("/dashboard");
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Create a new project"
        description="Set up a workspace to track tasks, deliverables, client feedback, and invoices."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: "New Project" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <CreateProjectForm />
      </div>
    </div>
  );
}
