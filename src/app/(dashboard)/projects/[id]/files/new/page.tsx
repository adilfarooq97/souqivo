import { notFound } from "next/navigation";
import { getProjects } from "@/lib/supabase/projects";
import ProjectFileForm from "@/components/files/ProjectFileForm";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function NewFilePage({
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

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Add Project File"
        description={`Upload a new file or link an external resource for ${project.name}.`}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.id}` },
              { label: "Files", href: `/projects/${project.id}/files` },
              { label: "Add File" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <ProjectFileForm projectId={project.id} />
      </div>
    </div>
  );
}
