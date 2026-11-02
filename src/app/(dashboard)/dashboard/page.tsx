import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock,
  FolderPlus,
  Plus,
  Sparkles,
} from "lucide-react";
import StatCard from "@/components/dashboard/StatCard";
import ProjectCard from "@/components/dashboard/ProjectCard";
import ActivityItem from "@/components/dashboard/ActivityItem";
import DashboardGreeting from "@/components/dashboard/DashboardGreeting";
import Button from "@/components/ui/Button";
import EmptyState from "@/components/ui/EmptyState";
import Badge from "@/components/ui/Badge";
import { getTasks } from "@/lib/supabase/tasks";
import { getReviews } from "@/lib/supabase/reviews";
import { getFiles } from "@/lib/supabase/files";
import { getMessages } from "@/lib/supabase/messages";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getCurrentUserProfile } from "@/lib/supabase/auth";

export default async function Dashboard() {
  const [projects, userProfile] = await Promise.all([
    getAccessibleProjects(),
    getCurrentUserProfile(),
  ]);

  const isFreelancer = userProfile?.role === "freelancer";

  const recentProjects = [...projects]
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 3);

  const currentHour = new Date().getHours();
  const initialPeriod =
    currentHour < 12
      ? "morning"
      : currentHour < 18
      ? "afternoon"
      : "evening";

  const projectIds = projects.map((project) => project.id);
  const [tasks, reviews, messages, files] = await Promise.all([
    getTasks(projectIds),
    getReviews(projectIds),
    getMessages(projectIds),
    getFiles(projectIds),
  ]);

  const recentTaskActivities = tasks
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5)
    .map((task) => {
      const project = projects.find((item) => item.id === task.project_id);
      return {
        id: `task-${task.id}`,
        type: "task" as const,
        title: "Task created",
        description: project ? `${task.title} · ${project.name}` : task.title,
        time: task.created_at,
        timestamp: task.created_at,
        href: `/projects/${task.project_id}/tasks`,
      };
    });

  const recentMessageActivities = messages
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5)
    .map((message) => {
      const project = projects.find((item) => item.id === message.project_id);
      return {
        id: `message-${message.id}`,
        type: "message" as const,
        title: "New message",
        description: project
          ? `${message.content} · ${project.name}`
          : message.content,
        time: message.created_at,
        timestamp: message.created_at,
        href: `/projects/${message.project_id}/messages`,
      };
    });

  const recentFileActivities = files
    .sort(
      (a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    )
    .slice(0, 5)
    .map((file) => {
      const project = projects.find((item) => item.id === file.project_id);
      return {
        id: `file-${file.id}`,
        type: "file" as const,
        title: "File uploaded",
        description: project
          ? `${file.name} · ${project.name}`
          : file.name,
        time: file.created_at,
        timestamp: file.created_at,
        href: `/projects/${file.project_id}/files`,
      };
    });

  const recentActivities = reviews
    .sort(
      (a, b) =>
        new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
    )
    .slice(0, 5)
    .map((review) => {
      const project = projects.find((item) => item.id === review.project_id);
      return {
        id: `review-${review.id}`,
        type: "review" as const,
        title:
          review.status === "Approved"
            ? "Review approved"
            : review.status === "Changes Requested"
            ? "Changes requested"
            : "Review pending",
        description: project
          ? `${review.title} · ${project.name}`
          : review.title,
        time: review.updated_at,
        timestamp: review.updated_at,
        href: `/projects/${review.project_id}/reviews`,
      };
    });

  const activities = [
    ...recentActivities,
    ...recentTaskActivities,
    ...recentMessageActivities,
    ...recentFileActivities,
  ]
    .sort(
      (a, b) =>
        new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    )
    .slice(0, 5);

  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  );
  const approvedReviews = reviews.filter(
    (review) => review.status === "Approved"
  );
  const changesRequestedReviews = reviews.filter(
    (review) => review.status === "Changes Requested"
  );

  const completedTasks = tasks.filter((task) => task.status === "Done").length;
  const activeTasks = tasks.length - completedTasks;
  const activeProjects = projects.filter(
    (project) => project.status !== "Completed"
  );

  const dashboardStats = isFreelancer
    ? [
        {
          title: "Active Projects",
          value: activeProjects.length.toString(),
          subtitle: `${projects.length} total projects`,
        },
        {
          title: "Active Tasks",
          value: activeTasks.toString(),
          subtitle: `${completedTasks} completed`,
        },
        {
          title: "Pending Reviews",
          value: pendingReviews.length.toString(),
          subtitle: "Awaiting client response",
        },
        {
          title: "Completed Tasks",
          value: completedTasks.toString(),
          subtitle: "Shipped & done",
        },
        {
          title: "Project Files",
          value: files.length.toString(),
          subtitle: "Shared assets & docs",
        },
        {
          title: "Messages",
          value: messages.length.toString(),
          subtitle: "Across all projects",
        },
      ]
    : [
        {
          title: "My Projects",
          value: projects.length.toString(),
          subtitle: "Active collaborations",
        },
        {
          title: "Reviews to Check",
          value: pendingReviews.length.toString(),
          subtitle: "Needs your approval",
        },
        {
          title: "Open Tasks",
          value: activeTasks.toString(),
          subtitle: "Currently in progress",
        },
        {
          title: "Project Files",
          value: files.length.toString(),
          subtitle: "Shared deliverables",
        },
        {
          title: "Messages",
          value: messages.length.toString(),
          subtitle: "Team updates",
        },
      ];

  return (
    <div className="space-y-8 animate-in fade-in duration-200">
      {/* Top Banner / Hero Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-b border-border-muted pb-6">
        <div>
          <div className="flex items-center gap-2.5">
            <DashboardGreeting initialPeriod={initialPeriod} />
            {userProfile && (
              <Badge variant={isFreelancer ? "neutral" : "success"} size="sm">
                {isFreelancer ? "Freelancer Studio" : "Client Portal"}
              </Badge>
            )}
          </div>
          {userProfile && (
            <p className="mt-1 text-sm text-muted-foreground">
              Welcome back, <span className="font-semibold text-foreground">{userProfile.full_name}</span>. Here is the latest across your projects.
            </p>
          )}
        </div>

        {isFreelancer && (
          <div className="flex shrink-0 items-center gap-2.5">
            <Link href="/projects/new">
              <Button
                variant="primary"
                leftIcon={<Plus className="h-4 w-4" />}
                className="shadow-xs"
              >
                New Project
              </Button>
            </Link>
          </div>
        )}
      </div>

      {/* Getting Started Guide / Onboarding (Part 5) when projects count is 0 */}
      {isFreelancer && projects.length === 0 && (
        <section className="rounded-2xl border border-accent/20 bg-accent-muted/30 p-6 sm:p-8">
          <div className="flex items-start gap-4">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent text-white shadow-xs">
              <Sparkles className="h-5 w-5" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <h2 className="text-lg font-bold tracking-tight text-foreground">
                Get started with your Souqivo workspace
              </h2>
              <p className="mt-1 text-sm text-muted-foreground max-w-2xl">
                Set up your client workflow in a few quick steps. One workspace from kickoff to final approval.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      1
                    </span>
                    <Badge variant="default" size="sm">Studio</Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">Set up your profile</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Configure your studio name and details.</p>
                  <Link href="/settings" className="mt-3 inline-flex text-xs font-semibold text-accent hover:underline">
                    Edit settings →
                  </Link>
                </div>

                <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      2
                    </span>
                    <Badge variant="info" size="sm">Kickoff</Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">Create first project</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Define the timeline, budget, and scope.</p>
                  <Link href="/projects/new" className="mt-3 inline-flex text-xs font-semibold text-accent hover:underline">
                    Create project →
                  </Link>
                </div>

                <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      3
                    </span>
                    <Badge variant="default" size="sm">Connect</Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">Invite your client</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Bring clients into their private portal.</p>
                  <Link href="/clients" className="mt-3 inline-flex text-xs font-semibold text-accent hover:underline">
                    View clients →
                  </Link>
                </div>

                <div className="rounded-xl border border-border bg-surface p-4 shadow-2xs">
                  <div className="flex items-center justify-between">
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-slate-900 text-xs font-bold text-white">
                      4
                    </span>
                    <Badge variant="default" size="sm">Billing</Badge>
                  </div>
                  <h3 className="mt-3 text-sm font-semibold text-foreground">Issue invoices</h3>
                  <p className="mt-1 text-xs text-muted-foreground">Track milestones and bill with clarity.</p>
                  <Link href="/invoices/new" className="mt-3 inline-flex text-xs font-semibold text-accent hover:underline">
                    New invoice →
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Client Attention Banner (Part 4: Client Experience) */}
      {!isFreelancer && pendingReviews.length > 0 && (
        <section className="rounded-2xl border border-amber-200 bg-amber-50/60 p-5">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-100 text-amber-700">
                <Clock className="h-5 w-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="text-sm font-semibold text-amber-900">
                  {pendingReviews.length} {pendingReviews.length === 1 ? "deliverable requires" : "deliverables require"} your review
                </h3>
                <p className="text-xs text-amber-700 mt-0.5">
                  Your feedback helps keep the project timeline on schedule.
                </p>
              </div>
            </div>

            <Link
              href={
                pendingReviews[0]
                  ? `/projects/${pendingReviews[0].project_id}/reviews`
                  : "/projects"
              }
            >
              <Button
                variant="primary"
                size="sm"
                className="bg-amber-900 hover:bg-amber-950 text-white border-amber-900"
                rightIcon={<ArrowRight className="h-3.5 w-3.5" />}
              >
                Review Deliverables
              </Button>
            </Link>
          </div>
        </section>
      )}

      {/* Metrics Row */}
      <section>
        <div
          className={`grid gap-4 sm:grid-cols-2 ${
            isFreelancer
              ? "lg:grid-cols-3 xl:grid-cols-6"
              : "lg:grid-cols-3 xl:grid-cols-5"
          }`}
        >
          {dashboardStats.map((stat) => (
            <StatCard
              key={stat.title}
              title={stat.title}
              value={stat.value}
              subtitle={stat.subtitle}
            />
          ))}
        </div>
      </section>

      {/* Review Status Overview Banner */}
      <section className="rounded-2xl border border-border bg-surface p-5 sm:p-6 shadow-2xs">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-border-muted pb-4">
          <div>
            <h2 className="text-base font-semibold tracking-tight text-foreground">
              Review Pipeline
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              Current approval state of deliverables across all projects.
            </p>
          </div>

          <Link
            href="/projects"
            className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
          >
            <span>View Projects</span>
            <ArrowRight className="h-3 w-3" />
          </Link>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-3">
          <div className="rounded-xl border border-warning-border bg-warning-muted p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-warning">Pending Review</p>
              <Badge variant="warning" size="sm">Awaiting</Badge>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-warning">
              {pendingReviews.length}
            </p>
            <p className="mt-1 text-[11px] text-warning/80">
              Needs response from client
            </p>
          </div>

          <div className="rounded-xl border border-success-border bg-success-muted p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-success">Approved</p>
              <Badge variant="success" size="sm">Ready</Badge>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-success">
              {approvedReviews.length}
            </p>
            <p className="mt-1 text-[11px] text-success/80">
              Approved and ready for next phase
            </p>
          </div>

          <div className="rounded-xl border border-danger-border bg-danger-muted p-4 shadow-2xs">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-danger">Changes Requested</p>
              <Badge variant="danger" size="sm">Action</Badge>
            </div>
            <p className="mt-2 text-3xl font-bold tracking-tight text-danger">
              {changesRequestedReviews.length}
            </p>
            <p className="mt-1 text-[11px] text-danger/80">
              Requires revisions from provider
            </p>
          </div>
        </div>
      </section>

      {/* Main Grid: Projects & Activity */}
      <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
        {/* Recent Projects Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Recent Projects
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                {isFreelancer
                  ? "Your active client workspaces."
                  : "Projects you have access to."}
              </p>
            </div>

            <Link
              href="/projects"
              className="inline-flex items-center gap-1 text-xs font-semibold text-accent hover:underline"
            >
              <span>All ({projects.length})</span>
              <ArrowRight className="h-3 w-3" />
            </Link>
          </div>

          {projects.length === 0 ? (
            <EmptyState
              title="No projects yet"
              description={
                isFreelancer
                  ? "Create your first project to start organizing tasks, reviews, files, and client communication."
                  : "You have not been added to any projects yet."
              }
              icon={<FolderPlus className="h-6 w-6 text-subtle-foreground" />}
              action={
                isFreelancer ? (
                  <Link href="/projects/new">
                    <Button variant="primary" size="sm" leftIcon={<Plus className="h-4 w-4" />}>
                      Create Project
                    </Button>
                  </Link>
                ) : undefined
              }
            />
          ) : (
            <div className="grid gap-4 sm:grid-cols-2">
              {recentProjects.map((project) => (
                <ProjectCard key={project.id} project={project} />
              ))}
            </div>
          )}
        </section>

        {/* Recent Activity Feed */}
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-tight text-foreground">
                Recent Activity
              </h2>
              <p className="text-xs text-muted-foreground mt-0.5">
                Live stream across all projects.
              </p>
            </div>
          </div>

          <div className="rounded-2xl border border-border bg-surface p-4 shadow-2xs divide-y divide-border-muted">
            {activities.length === 0 ? (
              <div className="py-12 text-center">
                <CheckCircle2 className="mx-auto h-6 w-6 text-subtle-foreground" />
                <p className="mt-2 text-xs font-semibold text-foreground">
                  No recent activity
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Activity from tasks, files, and reviews will appear here.
                </p>
              </div>
            ) : (
              activities.map((activity) => (
                <ActivityItem
                  key={activity.id}
                  type={activity.type}
                  title={activity.title}
                  description={activity.description}
                  time={activity.time}
                  href={activity.href}
                />
              ))
            )}
          </div>
        </section>
      </div>
    </div>
  );
}
