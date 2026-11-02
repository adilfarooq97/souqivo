import Link from "next/link";
import { MessageSquare, ArrowRight } from "lucide-react";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

export default async function GlobalMessagesPage() {
  const [projects, profile] = await Promise.all([
    getAccessibleProjects(),
    getCurrentUserProfile(),
  ]);

  const isFreelancer = profile?.role === "freelancer";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Messages"
        description="Select a project conversation to communicate with clients and team members."
        breadcrumbs={<Breadcrumbs items={[{ label: "Messages" }]} />}
      />

      {projects.length === 0 ? (
        <EmptyState
          title="No project conversations"
          description={
            isFreelancer
              ? "Create a project to start messaging with clients."
              : "You have not been added to any projects yet."
          }
          icon={<MessageSquare className="h-6 w-6 text-subtle-foreground" />}
          action={
            isFreelancer ? (
              <Link href="/projects/new">
                <Button variant="primary">Create Project</Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}/messages`}
              className="group flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs"
            >
              <div>
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-purple-50 text-purple-700">
                    <MessageSquare className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="truncate text-sm font-semibold text-foreground group-hover:text-accent transition-colors">
                      {project.name}
                    </h3>
                    <p className="text-xs text-muted-foreground capitalize">
                      {project.status}
                    </p>
                  </div>
                </div>

                <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                  {project.description || "Project conversation channel."}
                </p>
              </div>

              <div className="mt-5 flex items-center justify-between border-t border-border-muted pt-3 text-xs font-semibold text-accent">
                <span>Open conversation</span>
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
