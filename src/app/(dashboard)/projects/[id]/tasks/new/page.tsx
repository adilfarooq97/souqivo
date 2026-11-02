import { notFound } from "next/navigation";
import CreateTaskForm from "@/components/tasks/CreateTaskForm";
import { getProjects } from "@/lib/supabase/projects";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function NewTaskPage({
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
        title="Create a new task"
        description={`Add a trackable task to ${project.name}.`}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.id}` },
              { label: "Tasks", href: `/projects/${project.id}/tasks` },
              { label: "New Task" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <CreateTaskForm projectId={project.id} />
      </div>
    </div>
  );
}
