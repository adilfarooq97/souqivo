import Link from "next/link";
import { Calendar, ChevronRight } from "lucide-react";
import type { Project } from "@/types/project";
import Progress from "@/components/ui/Progress";
import StatusBadge from "@/components/ui/StatusBadge";

type ProjectCardProps = {
  project: Project;
};

export default function ProjectCard({ project }: ProjectCardProps) {
  const isCompleted = project.status === "Completed";

  const deadlineDate = project.deadline
    ? new Date(`${project.deadline}T00:00:00`)
    : null;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const daysRemaining = deadlineDate
    ? Math.round(
        (deadlineDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
      )
    : null;

  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2"
    >
      <div className="flex h-full flex-col justify-between rounded-xl border border-border bg-surface p-5 shadow-2xs transition-all duration-150 hover:border-border-strong hover:shadow-xs group-hover:-translate-y-0.5">
        <div>
          {/* Card Top: Title & Status */}
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-base font-semibold tracking-tight text-foreground group-hover:text-accent transition-colors line-clamp-1">
              {project.name}
            </h3>
            <StatusBadge status={project.status} size="sm" />
          </div>

          {/* Description */}
          <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
            {project.description || "No project description provided."}
          </p>
        </div>

        <div className="mt-5 space-y-4">
          {/* Progress Bar */}
          <div>
            <div className="flex items-center justify-between text-xs mb-1.5">
              <span className="font-medium text-muted-foreground">Progress</span>
              <span className="font-semibold text-foreground">
                {project.progress}%
              </span>
            </div>
            <Progress
              value={project.progress}
              size="sm"
              variant={isCompleted ? "success" : "primary"}
            />
          </div>

          {/* Card Footer: Deadline & Arrow */}
          <div className="flex items-center justify-between border-t border-border-muted pt-3 text-xs">
            <div className="flex items-center gap-1.5 text-muted-foreground">
              <Calendar className="h-3.5 w-3.5 text-subtle-foreground" aria-hidden="true" />
              <span>
                {deadlineDate ? (
                  <>
                    <span>
                      {deadlineDate.toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                      })}
                    </span>
                    {daysRemaining !== null && !isCompleted && (
                      <span
                        className={`ml-1.5 font-medium ${
                          daysRemaining < 0
                            ? "text-danger"
                            : daysRemaining <= 3
                            ? "text-warning"
                            : "text-muted-foreground"
                        }`}
                      >
                        ({daysRemaining < 0
                          ? "Overdue"
                          : daysRemaining === 0
                          ? "Due today"
                          : `${daysRemaining}d left`})
                      </span>
                    )}
                  </>
                ) : (
                  "No deadline"
                )}
              </span>
            </div>

            <span className="flex items-center gap-0.5 text-xs font-semibold text-foreground group-hover:text-accent transition-colors">
              <span>View</span>
              <ChevronRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
