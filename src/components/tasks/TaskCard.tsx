"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Link from "next/link";
import { Calendar, GripVertical } from "lucide-react";
import type { Task } from "@/types";
import TaskBadge from "@/components/tasks/TaskBadge";

type TaskCardProps = {
  task: Task;
  canManage?: boolean;
};

function formatDueDate(date: string | null) {
  if (!date) return null;
  const dueDate = new Date(`${date}T00:00:00`);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const diffDays = Math.round(
    (dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24)
  );

  const formatted = dueDate.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
  });

  return { formatted, diffDays };
}

export default function TaskCard({ task, canManage = true }: TaskCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: task.id,
    disabled: !canManage,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const due = formatDueDate(task.due_date);

  const cardContent = (
    <div className="flex items-start gap-2.5 p-3.5">
      {canManage && (
        <button
          type="button"
          {...attributes}
          {...listeners}
          aria-label={`Drag task ${task.title}`}
          className="mt-0.5 cursor-grab touch-none text-subtle-foreground hover:text-foreground active:cursor-grabbing p-0.5 rounded transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-accent"
        >
          <GripVertical className="h-4 w-4" aria-hidden="true" />
        </button>
      )}

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-2">
          <h3 className="text-xs font-semibold text-foreground leading-snug group-hover:text-accent transition-colors line-clamp-2">
            {task.title}
          </h3>
          <TaskBadge type="priority" value={task.priority} />
        </div>

        {task.description && (
          <p className="mt-1.5 line-clamp-2 text-[11px] leading-relaxed text-muted-foreground">
            {task.description}
          </p>
        )}

        <div className="mt-3 flex items-center justify-between border-t border-border-muted pt-2 text-[11px]">
          {due ? (
            <div
              className={`flex items-center gap-1 font-medium ${
                due.diffDays < 0
                  ? "text-danger"
                  : due.diffDays <= 2
                  ? "text-warning"
                  : "text-subtle-foreground"
              }`}
            >
              <Calendar className="h-3 w-3 shrink-0" aria-hidden="true" />
              <span>
                {due.formatted}
                {due.diffDays < 0 && " (overdue)"}
                {due.diffDays === 0 && " (today)"}
              </span>
            </div>
          ) : (
            <span className="text-subtle-foreground">No due date</span>
          )}
        </div>
      </div>
    </div>
  );

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`group rounded-xl border border-border bg-surface shadow-2xs transition-all hover:border-border-strong hover:shadow-xs ${
        isDragging ? "opacity-40 scale-95" : ""
      }`}
    >
      {canManage ? (
        <Link
          href={`/projects/${task.project_id}/tasks/${task.id}/edit`}
          className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent rounded-xl"
        >
          {cardContent}
        </Link>
      ) : (
        cardContent
      )}
    </div>
  );
}
