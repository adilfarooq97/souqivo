import Link from "next/link";
import { notFound } from "next/navigation";
import { CheckSquare, ListTodo, Plus } from "lucide-react";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getTasks } from "@/lib/supabase/tasks";
import Button from "@/components/ui/Button";
import KanbanBoardWrapper from "@/components/tasks/KanbanBoardWrapper";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";

export default async function ProjectTasksPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const profile = await getCurrentUserProfile();
  const projects = await getAccessibleProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const tasks = await getTasks(project.id);
  const isFreelancer = profile?.role === "freelancer";

  const taskCounts = {
    total: tasks.length,
    todo: tasks.filter((task) => task.status === "Todo").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    done: tasks.filter((task) => task.status === "Done").length,
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}` },
          { label: "Tasks" },
        ]}
      />

      <ProjectNavigation projectId={project.id} active="tasks" />

      <PageHeader
        title={`${project.name} Tasks`}
        description={
          isFreelancer
            ? "Manage tasks, priorities, and workflow stages for this project."
            : "Follow the development pipeline and tasks moving to completion."
        }
        action={
          isFreelancer ? (
            <Link href={`/projects/${project.id}/tasks/new`}>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                New Task
              </Button>
            </Link>
          ) : undefined
        }
      />

      {/* Metric Cards Row */}
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Total Tasks</span>
            <ListTodo className="h-4 w-4 text-subtle-foreground" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {taskCounts.total}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">To Do</span>
            <span className="h-2 w-2 rounded-full bg-subtle-foreground" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {taskCounts.todo}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">In Progress</span>
            <span className="h-2 w-2 rounded-full bg-info" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {taskCounts.inProgress}
          </p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-muted-foreground">Completed</span>
            <span className="h-2 w-2 rounded-full bg-success" />
          </div>
          <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
            {taskCounts.done}
          </p>
        </div>
      </div>

      {tasks.length === 0 ? (
        <EmptyState
          title="No tasks yet"
          description={
            isFreelancer
              ? "Create your first task to start organizing the work pipeline for this project."
              : "Tasks will appear here when work is added to this project."
          }
          icon={<CheckSquare className="h-6 w-6 text-subtle-foreground" />}
          action={
            isFreelancer ? (
              <Link href={`/projects/${project.id}/tasks/new`}>
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                  Create Task
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <KanbanBoardWrapper
          tasks={tasks}
          canManage={isFreelancer}
        />
      )}
    </div>
  );
}
