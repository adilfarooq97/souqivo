import { getClients } from "@/lib/supabase/client-data";
import Link from "next/link";
import { redirect } from "next/navigation";
import { ArrowRight, FolderKanban, Users } from "lucide-react";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import EmptyState from "@/components/ui/EmptyState";
import Avatar from "@/components/ui/Avatar";
import Button from "@/components/ui/Button";

export default async function ClientsPage() {
  const profile = await getCurrentUserProfile();

  if (!profile || profile.role !== "freelancer") {
    redirect("/dashboard");
  }

  const clients = await getClients();

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Clients Directory"
        description="Clients with access to your project workspaces."
        breadcrumbs={<Breadcrumbs items={[{ label: "Clients" }]} />}
      />

      {clients.length === 0 ? (
        <EmptyState
          title="No clients connected yet"
          description="When you add a client to any of your projects, they will automatically appear in this directory."
          icon={<Users className="h-6 w-6 text-subtle-foreground" />}
          action={
            <Link href="/projects">
              <Button variant="primary">View Projects</Button>
            </Link>
          }
        />
      ) : (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {clients.map((client) => (
            <div
              key={client.id}
              className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs"
            >
              <div>
                <div className="flex items-center gap-3">
                  <Avatar name={client.full_name} size="md" role="client" />

                  <div className="min-w-0">
                    <h2 className="truncate text-sm font-semibold text-foreground">
                      {client.full_name}
                    </h2>
                    <p className="text-xs text-muted-foreground">
                      {client.project_count}{" "}
                      {client.project_count === 1 ? "project" : "projects"}
                    </p>
                  </div>
                </div>

                {client.projects.length > 0 && (
                  <div className="mt-4 border-t border-border-muted pt-3">
                    <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                      Connected Workspaces
                    </p>

                    <div className="space-y-1.5">
                      {client.projects.map((project) => (
                        <Link
                          key={project.id}
                          href={`/projects/${project.id}`}
                          className="flex items-center justify-between gap-2 rounded-lg p-1.5 text-xs font-medium text-foreground hover:bg-surface-muted transition-colors group"
                        >
                          <div className="flex items-center gap-1.5 min-w-0">
                            <FolderKanban className="h-3.5 w-3.5 text-subtle-foreground shrink-0" />
                            <span className="truncate">{project.name}</span>
                          </div>
                          <ArrowRight className="h-3 w-3 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
