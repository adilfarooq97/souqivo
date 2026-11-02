"use client";

import { useState } from "react";
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  closestCorners,
} from "@dnd-kit/core";
import type { Task, TaskStatus } from "@/types";
import KanbanColumn from "@/components/tasks/KanbanColumn";
import TaskBadge from "@/components/tasks/TaskBadge";
import Alert from "@/components/ui/Alert";

type KanbanBoardProps = {
  tasks: Task[];
  canManage?: boolean;
};

const columns: TaskStatus[] = [
  "Todo",
  "In Progress",
  "Review",
  "Done",
];

export default function KanbanBoard({
  tasks: initialTasks,
  canManage = true,
}: KanbanBoardProps) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [activeTaskId, setActiveTaskId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const activeTask = tasks.find((task) => task.id === activeTaskId);
  const projectId = tasks[0]?.project_id;

  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTaskId(null);
    setErrorMessage("");

    if (!canManage) return;

    const { active, over } = event;
    if (!over) return;

    const taskId = String(active.id);
    const targetId = String(over.id);

    const task = tasks.find((item) => item.id === taskId);
    const targetColumn = columns.find((column) => column === targetId);
    const targetTask = tasks.find((item) => item.id === targetId);
    const newStatus = targetColumn ?? targetTask?.status;

    if (!task || !newStatus) return;
    if (task.status === newStatus) return;

    // Optimistic UI update
    setTasks((currentTasks) =>
      currentTasks.map((item) =>
        item.id === taskId ? { ...item, status: newStatus } : item
      )
    );

    try {
      const response = await fetch(`/api/tasks/${taskId}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: task.title,
          description: task.description,
          status: newStatus,
          priority: task.priority,
          due_date: task.due_date,
        }),
      });

      if (!response.ok) {
        const result = await response.json().catch(() => null);
        throw new Error(result?.error || "Unable to update task status.");
      }

      const updatedTask = await response.json();
      setTasks((currentTasks) =>
        currentTasks.map((item) => (item.id === taskId ? updatedTask : item))
      );
    } catch (error) {
      console.error("Error moving task:", error);
      // Revert optimistic update
      setTasks((currentTasks) =>
        currentTasks.map((item) =>
          item.id === taskId ? { ...item, status: task.status } : item
        )
      );
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to update task status. Please try again."
      );
    }
  };

  return (
    <DndContext
      collisionDetection={closestCorners}
      onDragStart={
        canManage
          ? ({ active }) => setActiveTaskId(String(active.id))
          : undefined
      }
      onDragCancel={() => setActiveTaskId(null)}
      onDragEnd={canManage ? handleDragEnd : undefined}
    >
      {errorMessage && (
        <Alert tone="danger" className="mb-4">
          {errorMessage}
        </Alert>
      )}

      {/* Responsive Kanban Columns: Horizontal scroll on mobile, 4-col on desktop */}
      <div className="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 md:grid md:grid-cols-2 md:overflow-visible md:pb-0 xl:grid-cols-4">
        {columns.map((column) => {
          const columnTasks = tasks.filter((task) => task.status === column);

          return (
            <div
              key={column}
              className="w-[min(85vw,22rem)] shrink-0 snap-start md:w-auto"
            >
              <KanbanColumn
                column={column}
                tasks={columnTasks}
                canManage={canManage}
                projectId={projectId}
              />
            </div>
          );
        })}
      </div>

      <DragOverlay>
        {canManage && activeTask ? (
          <div className="w-72 rounded-xl border-2 border-accent bg-surface p-4 shadow-xl">
            <div className="flex items-start justify-between gap-2">
              <h3 className="text-xs font-semibold text-foreground leading-snug">
                {activeTask.title}
              </h3>
              <TaskBadge type="priority" value={activeTask.priority} />
            </div>

            {activeTask.description && (
              <p className="mt-1.5 line-clamp-2 text-[11px] text-muted-foreground">
                {activeTask.description}
              </p>
            )}

            <div className="mt-2 text-[10px] text-subtle-foreground">
              {activeTask.due_date ? `Due ${activeTask.due_date}` : "No due date"}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
