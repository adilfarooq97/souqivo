import { notFound } from "next/navigation";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getMessages } from "@/lib/supabase/messages";
import { getCurrentUser } from "@/lib/supabase/auth";
import MessageThread from "@/components/messages/MessageThread";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function MessagesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const projects = await getAccessibleProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const [messages, user] = await Promise.all([
    getMessages(project.id),
    getCurrentUser(),
  ]);

  if (!user) {
    notFound();
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}` },
          { label: "Messages" },
        ]}
      />

      <ProjectNavigation projectId={project.id} active="messages" />

      <PageHeader
        title={`${project.name} Conversation`}
        description="Private messaging channel for project members and clients."
      />

      <div className="rounded-2xl border border-border bg-surface shadow-xs overflow-hidden">
        <div className="border-b border-border-muted px-6 py-3.5 bg-surface-muted/30 flex items-center justify-between">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            Discussion Thread
          </span>
          <span className="text-xs text-subtle-foreground font-medium">
            {messages.length === 0
              ? "No messages yet"
              : `${messages.length} ${messages.length === 1 ? "message" : "messages"}`}
          </span>
        </div>

        <MessageThread
          projectId={project.id}
          currentUserId={user.id}
          initialMessages={messages}
          canSend={true}
        />
      </div>
    </div>
  );
}
