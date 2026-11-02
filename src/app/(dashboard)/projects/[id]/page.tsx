import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Calendar,
  CheckSquare,
  ChevronRight,
  Clock,
  Edit3,
  FileText,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import DeleteProjectButton from "@/components/projects/DeleteProjectButton";
import { getTasks } from "@/lib/supabase/tasks";
import { getReviews } from "@/lib/supabase/reviews";
import { getFiles } from "@/lib/supabase/files";
import { getMessages } from "@/lib/supabase/messages";
import { getProjectMembers } from "@/lib/supabase/project-members";
import ProjectMembers from "@/components/projects/ProjectMembers";
import AddProjectClientForm from "@/components/projects/AddProjectClientForm";
import { getMemberProfiles } from "@/lib/supabase/users";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import ActivityItem from "@/components/dashboard/ActivityItem";
import StatusBadge from "@/components/ui/StatusBadge";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Progress from "@/components/ui/Progress";
import Button from "@/components/ui/Button";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const [projects, userProfile] = await Promise.all([
    getAccessibleProjects(),
    getCurrentUserProfile(),
  ]);

  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const [tasks, reviews, files, messages, members] = await Promise.all([
    getTasks(project.id),
    getReviews(project.id),
    getFiles(project.id),
    getMessages(project.id),
    getProjectMembers(project.id),
  ]);

  const memberProfiles =
    members.length > 0
      ? await getMemberProfiles(members.map((member) => member.user_id))
      : [];

  let imageFiles = 0;
  let documentFiles = 0;

  for (const file of files) {
    if (file.file_type === "image") imageFiles += 1;
    if (file.file_type === "document") documentFiles += 1;
  }

  const pendingReviews = reviews.filter((review) => review.status === "Pending");
  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const inProgressTasks = tasks.filter((task) => task.status === "In Progress").length;
  const reviewTasks = tasks.filter((task) => task.status === "Review").length;

  const taskProgress =
    tasks.length > 0 ? Math.round((completedTasks / tasks.length) * 100) : project.progress;

  const deadlineDate = project.deadline
    ? new Date(`${project.deadline}T00:00:00`)
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysUntilDeadline = deadlineDate
    ? Math.round(
        (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  const recentActivity = [
    ...reviews.map((review) => ({
      id: `review-${review.id}`,
      type: "review" as const,
      title: review.title,
      description:
        review.status === "Approved"
          ? "Review approved"
          : review.status === "Changes Requested"
          ? "Changes requested"
          : "Review submitted",
      timestamp: review.updated_at,
      href: `/projects/${project.id}/reviews`,
    })),
    ...files.map((file) => ({
      id: `file-${file.id}`,
      type: "file" as const,
      title: file.name,
      description: "File uploaded",
      timestamp: file.created_at,
      href: `/projects/${project.id}/files`,
    })),
    ...messages.map((message) => ({
      id: `message-${message.id}`,
      type: "message" as const,
      title: "New message",
      description: message.content,
      timestamp: message.created_at,
      href: `/projects/${project.id}/messages`,
    })),
    ...tasks.map((task) => ({
      id: `task-${task.id}`,
      type: "task" as const,
      title: task.title,
      description: `Task created in ${task.status}`,
      timestamp: task.created_at,
      href: `/projects/${project.id}/tasks`,
    })),
  ]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  const isFreelancer = userProfile?.role === "freelancer";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Top Breadcrumb */}
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.name },
        ]}
      />

      {/* Project Navigation Bar */}
      <ProjectNavigation
        projectId={project.id}
        active="overview"
        counts={{
          tasks: tasks.length,
          reviews: reviews.length,
          files: files.length,
          messages: messages.length,
        }}
      />

      {/* Project Banner Header */}
      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-2xs">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
          <div className="min-w-0 flex-1">
            <div className="flex flex-wrap items-center gap-3">
              <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                {project.name}
              </h1>
              <StatusBadge status={project.status} />
            </div>

            <p className="mt-2.5 max-w-3xl text-sm leading-relaxed text-muted-foreground">
              {project.description || "No project description has been added yet."}
            </p>

            {/* Meta Row: Deadline & Status */}
            <div className="mt-4 flex flex-wrap items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5 text-muted-foreground font-medium">
                <Calendar className="h-4 w-4 text-subtle-foreground" aria-hidden="true" />
                <span>Deadline:</span>
                {deadlineDate ? (
                  <span className="font-semibold text-foreground">
                    {deadlineDate.toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                ) : (
                  <span className="text-subtle-foreground">No deadline set</span>
                )}
              </div>

              {daysUntilDeadline !== null && (
                <span
                  className={`rounded-full px-2.5 py-0.5 text-[11px] font-semibold border ${
                    daysUntilDeadline < 0
                      ? "bg-danger-muted text-danger border-danger-border"
                      : daysUntilDeadline <= 3
                      ? "bg-warning-muted text-warning border-warning-border"
                      : "bg-success-muted text-success border-success-border"
                  }`}
                >
                  {daysUntilDeadline < 0
                    ? `Overdue by ${Math.abs(daysUntilDeadline)} days`
                    : daysUntilDeadline === 0
                    ? "Due today"
                    : daysUntilDeadline === 1
                    ? "Due tomorrow"
                    : `${daysUntilDeadline} days left`}
                </span>
              )}
            </div>
          </div>

          {/* Action Buttons for Freelancer */}
          {isFreelancer && (
            <div className="flex shrink-0 flex-wrap items-center gap-2.5">
              <Link href={`/projects/${project.id}/edit`}>
                <Button
                  variant="outline"
                  size="sm"
                  leftIcon={<Edit3 className="h-4 w-4" />}
                >
                  Edit Project
                </Button>
              </Link>
              <DeleteProjectButton projectId={project.id} />
            </div>
          )}
        </div>
      </div>

      {/* Progress & Quick Stats Card */}
      <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs space-y-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Project Progress
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {completedTasks} of {tasks.length} tasks completed ({taskProgress}%)
            </p>
          </div>
          <span className="text-2xl font-bold tracking-tight text-foreground">
            {taskProgress}%
          </span>
        </div>

        <Progress value={taskProgress} size="md" variant={taskProgress === 100 ? "success" : "primary"} />

        <div className="grid gap-3 sm:grid-cols-3 pt-2">
          <div className="rounded-xl border border-border-muted bg-surface-muted/40 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">In Progress</p>
            <p className="mt-1 text-lg font-bold text-foreground">{inProgressTasks}</p>
          </div>
          <div className="rounded-xl border border-border-muted bg-surface-muted/40 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">In Review</p>
            <p className="mt-1 text-lg font-bold text-foreground">{reviewTasks}</p>
          </div>
          <div className="rounded-xl border border-border-muted bg-surface-muted/40 px-4 py-3">
            <p className="text-xs font-medium text-muted-foreground">Completed</p>
            <p className="mt-1 text-lg font-bold text-foreground">{completedTasks}</p>
          </div>
        </div>
      </div>

      {/* Team & Client Collaboration Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        <ProjectMembers
          members={members}
          profiles={memberProfiles}
          canManage={isFreelancer}
        />

        {isFreelancer && (
          <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs">
            <div className="mb-4">
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Add Client to Project
              </h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Grant an existing client direct access to deliverables, reviews, and messaging.
              </p>
            </div>

            <AddProjectClientForm projectId={project.id} />
          </div>
        )}
      </div>

      {/* Quick Access Tiles: Tasks, Reviews, Files, Messages */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Link
          href={`/projects/${project.id}/tasks`}
          className="group rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-50 text-blue-700">
              <CheckSquare className="h-4 w-4" aria-hidden="true" />
            </span>
            <ChevronRight className="h-4 w-4 text-subtle-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Tasks Board
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {tasks.length}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {completedTasks} completed · View board →
          </p>
        </Link>

        <Link
          href={`/projects/${project.id}/reviews`}
          className="group rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-50 text-amber-700">
              <Sparkles className="h-4 w-4" aria-hidden="true" />
            </span>
            <ChevronRight className="h-4 w-4 text-subtle-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Deliverable Reviews
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {reviews.length}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {pendingReviews.length} pending · Review deliverables →
          </p>
        </Link>

        <Link
          href={`/projects/${project.id}/files`}
          className="group rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-700">
              <FileText className="h-4 w-4" aria-hidden="true" />
            </span>
            <ChevronRight className="h-4 w-4 text-subtle-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Project Files
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {files.length}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            {imageFiles} images · {documentFiles} docs →
          </p>
        </Link>

        <Link
          href={`/projects/${project.id}/messages`}
          className="group rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs"
        >
          <div className="flex items-center justify-between">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-purple-50 text-purple-700">
              <MessageSquare className="h-4 w-4" aria-hidden="true" />
            </span>
            <ChevronRight className="h-4 w-4 text-subtle-foreground group-hover:text-foreground transition-transform group-hover:translate-x-0.5" />
          </div>
          <p className="mt-4 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
            Messages
          </p>
          <p className="mt-1 text-2xl font-bold tracking-tight text-foreground">
            {messages.length}
          </p>
          <p className="mt-1 text-[11px] text-muted-foreground">
            Project conversation · Open chat →
          </p>
        </Link>
      </div>

      {/* Recent Project Activity Feed */}
      <section className="rounded-2xl border border-border bg-surface p-6 shadow-2xs">
        <div className="border-b border-border-muted pb-4">
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Project Activity
          </h2>
          <p className="text-xs text-muted-foreground mt-0.5">
            Latest events across tasks, reviews, files, and comments for {project.name}.
          </p>
        </div>

        {recentActivity.length === 0 ? (
          <div className="py-12 text-center">
            <Clock className="mx-auto h-6 w-6 text-subtle-foreground" aria-hidden="true" />
            <p className="mt-2 text-xs font-semibold text-foreground">
              No project activity yet
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Activity will show up as tasks are moved, files are uploaded, or reviews are submitted.
            </p>
          </div>
        ) : (
          <div className="divide-y divide-border-muted mt-2">
            {recentActivity.map((activity) => (
              <ActivityItem
                key={activity.id}
                type={activity.type}
                title={activity.title}
                description={activity.description}
                time={activity.timestamp}
                href={activity.href}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
