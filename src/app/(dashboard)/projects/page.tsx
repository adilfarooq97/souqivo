import Link from "next/link";
import { FolderPlus, Plus } from "lucide-react";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import type { ProjectStatus } from "@/types";
import ProjectStatusFilter from "@/components/projects/ProjectStatusFilter";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function ProjectsPage() {
  const projects = await getAccessibleProjects();
  const userProfile = await getCurrentUserProfile();

  const isFreelancer = userProfile?.role === "freelancer";
  const statusCounts: Record<ProjectStatus, number> = {
    Planning: projects.filter((project) => project.status === "Planning").length,
    "In Progress": projects.filter(
      (project) => project.status === "In Progress"
    ).length,
    Review: projects.filter((project) => project.status === "Review").length,
    Completed: projects.filter(
      (project) => project.status === "Completed"
    ).length,
  };

  const projectCountDescription = `${projects.length} ${
    projects.length === 1 ? "project" : "projects"
  } ${isFreelancer ? "in your workspace." : "available to you."}`;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Projects"
        description={projectCountDescription}
        breadcrumbs={<Breadcrumbs items={[{ label: "Projects" }]} />}
        action={
          isFreelancer ? (
            <Link href="/projects/new">
              <Button
                variant="primary"
                leftIcon={<Plus className="h-4 w-4" />}
                className="shadow-xs"
              >
                New Project
              </Button>
            </Link>
          ) : undefined
        }
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No projects yet"
          description={
            isFreelancer
              ? "Create your first project to start organizing tasks, reviews, files, and client communication."
              : "You have not been added to any projects yet. Projects you have access to will appear here."
          }
          icon={<FolderPlus className="h-6 w-6 text-subtle-foreground" />}
          action={
            isFreelancer ? (
              <Link href="/projects/new">
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                  Create Project
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <>
          {/* Status summary pills / metric cards */}
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {(
              [
                ["Planning", "Planning", "bg-subtle-foreground"],
                ["In Progress", "In Progress", "bg-info"],
                ["Review", "In Review", "bg-warning"],
                ["Completed", "Completed", "bg-success"],
              ] as const
            ).map(([status, label, dotColor]) => (
              <div
                key={status}
                className="rounded-xl border border-border bg-surface p-4 shadow-2xs"
              >
                <div className="flex items-center justify-between gap-3">
                  <span className="text-xs font-semibold text-muted-foreground">
                    {label}
                  </span>
                  <span
                    className={`h-2 w-2 rounded-full ${dotColor}`}
                    aria-hidden="true"
                  />
                </div>

                <p className="mt-2 text-2xl font-bold tracking-tight text-foreground">
                  {statusCounts[status]}
                </p>
              </div>
            ))}
          </div>

          <ProjectStatusFilter projects={projects} />
        </>
      )}
    </div>
  );
}
