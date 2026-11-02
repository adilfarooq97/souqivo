import { notFound } from "next/navigation";
import { getProjects } from "@/lib/supabase/projects";
import CreateReviewForm from "@/components/reviews/CreateReviewForm";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function NewReviewPage({
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
        title="Create Deliverable Review"
        description={`Submit a work deliverable for client review in ${project.name}.`}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.id}` },
              { label: "Reviews", href: `/projects/${project.id}/reviews` },
              { label: "New Review" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <CreateReviewForm projectId={project.id} />
      </div>
    </div>
  );
}
