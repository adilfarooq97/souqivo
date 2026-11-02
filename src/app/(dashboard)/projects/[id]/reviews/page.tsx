import Link from "next/link";
import { notFound } from "next/navigation";
import { Plus, Sparkles } from "lucide-react";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getReviews } from "@/lib/supabase/reviews";
import ReviewCard from "@/components/reviews/ReviewCard";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import Button from "@/components/ui/Button";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Alert from "@/components/ui/Alert";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function ReviewsPage({
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

  const reviews = await getReviews(project.id);
  const pendingReviews = reviews.filter(
    (review) => review.status === "Pending"
  );

  const isFreelancer = profile?.role === "freelancer";

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}` },
          { label: "Reviews" },
        ]}
      />

      <ProjectNavigation projectId={project.id} active="reviews" />

      <PageHeader
        title={`${project.name} Reviews`}
        description={
          isFreelancer
            ? "Submit deliverables for review, collect feedback, and track approvals."
            : "Review submitted project deliverables and provide your approval or requested changes."
        }
        action={
          isFreelancer ? (
            <Link href={`/projects/${project.id}/reviews/new`}>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                New Review
              </Button>
            </Link>
          ) : undefined
        }
      />

      {!isFreelancer && pendingReviews.length > 0 && (
        <Alert tone="warning" title="Action required on deliverables">
          {pendingReviews.length === 1
            ? "1 deliverable is awaiting your approval."
            : `${pendingReviews.length} deliverables are awaiting your approval.`}{" "}
          Please review the submitted work below and approve it or request changes.
        </Alert>
      )}

      {reviews.length === 0 ? (
        <EmptyState
          title="No reviews yet"
          description={
            isFreelancer
              ? "Create your first deliverable review submission to request feedback from your client."
              : "No deliverable reviews have been submitted for this project yet."
          }
          icon={<Sparkles className="h-6 w-6 text-subtle-foreground" />}
          action={
            isFreelancer ? (
              <Link href={`/projects/${project.id}/reviews/new`}>
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                  Create First Review
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              review={review}
              projectId={project.id}
              canManage={isFreelancer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
