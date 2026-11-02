import { notFound, redirect } from "next/navigation";
import EditProjectForm from "@/components/projects/EditProjectForm";
import { getProjects } from "@/lib/supabase/projects";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projects = await getProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

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
        title={`Edit ${project.name}`}
        description="Update your project timeline, status, and description."
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.id}` },
              { label: "Edit" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <EditProjectForm project={project} />
      </div>
    </div>
  );
}
