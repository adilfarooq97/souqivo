"use client";

import { useDroppable } from "@dnd-kit/core";
import Link from "next/link";
import { CheckCircle2, Clock, ListTodo, Plus, Sparkles } from "lucide-react";
import type { Task, TaskStatus } from "@/types";
import TaskCard from "@/components/tasks/TaskCard";

type KanbanColumnProps = {
  column: TaskStatus;
  tasks: Task[];
  canManage?: boolean;
  projectId?: string;
};

const columnIcons: Record<
  TaskStatus,
  { icon: React.ComponentType<{ className?: string }>; color: string }
> = {
  Todo: { icon: ListTodo, color: "text-muted-foreground" },
  "In Progress": { icon: Clock, color: "text-info" },
  Review: { icon: Sparkles, color: "text-warning" },
  Done: { icon: CheckCircle2, color: "text-success" },
};

export default function KanbanColumn({
  column,
  tasks,
  canManage = true,
  projectId,
}: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: column,
  });

  const columnConfig = columnIcons[column] || {
    icon: ListTodo,
    color: "text-muted-foreground",
  };
  const Icon = columnConfig.icon;

  return (
    <div
      ref={setNodeRef}
      className={`flex flex-col min-h-80 rounded-2xl border p-3.5 transition-colors duration-150 ${
        isOver
          ? "border-accent bg-accent-muted/30 ring-2 ring-accent/20"
          : "border-border bg-surface-muted/50"
      }`}
    >
      {/* Column Header */}
      <div className="mb-3.5 flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <Icon className={`h-4 w-4 ${columnConfig.color}`} />
          <h2 className="text-xs font-bold tracking-tight text-foreground uppercase">
            {column}
          </h2>
          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-surface px-1.5 text-[10px] font-bold text-muted-foreground border border-border">
            {tasks.length}
          </span>
        </div>

        {canManage && projectId && (
          <Link
            href={`/projects/${projectId}/tasks/new`}
            className="flex h-6 w-6 items-center justify-center rounded-md text-muted-foreground hover:bg-surface hover:text-foreground transition-colors"
            title={`Add task to ${column}`}
          >
            <Plus className="h-3.5 w-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>

      {/* Task List */}
      <div className="space-y-2.5 flex-1">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} canManage={canManage} />
        ))}

        {tasks.length === 0 && (
          <div className="flex h-32 flex-col items-center justify-center rounded-xl border border-dashed border-border p-4 text-center">
            <p className="text-xs text-muted-foreground">No tasks in {column}</p>
          </div>
        )}
      </div>
    </div>
  );
}
