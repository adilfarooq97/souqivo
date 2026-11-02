import { notFound } from "next/navigation";
import EditTaskForm from "@/components/tasks/EditTaskForm";
import { getProjects } from "@/lib/supabase/projects";
import { getTasks } from "@/lib/supabase/tasks";
import DeleteTaskButton from "@/components/tasks/DeleteTaskButton";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function EditTaskPage({
  params,
}: {
  params: Promise<{ id: string; taskId: string }>;
}) {
  const { id, taskId } = await params;

  const projects = await getProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const tasks = await getTasks(project.id);
  const task = tasks.find((item) => item.id === taskId);

  if (!task) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Edit Task"
        description={`Update task details for ${task.title}.`}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.id}` },
              { label: "Tasks", href: `/projects/${project.id}/tasks` },
              { label: "Edit Task" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <EditTaskForm task={task} />

        <div className="mt-8 border-t border-border-muted pt-6">
          <DeleteTaskButton taskId={task.id} projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
