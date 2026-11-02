import { notFound } from "next/navigation";
import { getProjects } from "@/lib/supabase/projects";
import { getReviews } from "@/lib/supabase/reviews";
import EditReviewForm from "@/components/reviews/EditReviewForm";
import DeleteReviewButton from "@/components/reviews/DeleteReviewButton";
import PageHeader from "@/components/ui/PageHeader";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function EditReviewPage({
  params,
}: {
  params: Promise<{
    id: string;
    reviewId: string;
  }>;
}) {
  const { id, reviewId } = await params;

  const projects = await getProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const reviews = await getReviews(project.id);
  const review = reviews.find((item) => item.id === reviewId);

  if (!review) {
    notFound();
  }

  return (
    <div className="mx-auto max-w-2xl space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Edit Deliverable Review"
        description={`Update review details for ${review.title}.`}
        breadcrumbs={
          <Breadcrumbs
            items={[
              { label: "Projects", href: "/projects" },
              { label: project.name, href: `/projects/${project.id}` },
              { label: "Reviews", href: `/projects/${project.id}/reviews` },
              { label: "Edit Review" },
            ]}
          />
        }
      />

      <div className="rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <EditReviewForm review={review} projectId={project.id} />

        <div className="mt-8 border-t border-border-muted pt-6">
          <DeleteReviewButton reviewId={review.id} projectId={project.id} />
        </div>
      </div>
    </div>
  );
}
