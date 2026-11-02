"use client";

import { useState, useMemo } from "react";
import { Search, X } from "lucide-react";
import type { Project, ProjectStatus } from "@/types";
import ProjectCard from "@/components/dashboard/ProjectCard";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";

type ProjectStatusFilterProps = {
  projects: Project[];
};

const filterTabs: Array<"All" | ProjectStatus> = [
  "All",
  "Planning",
  "In Progress",
  "Review",
  "Completed",
];

export default function ProjectStatusFilter({
  projects,
}: ProjectStatusFilterProps) {
  const [selectedStatus, setSelectedStatus] = useState<"All" | ProjectStatus>("All");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesStatus =
        selectedStatus === "All" || project.status === selectedStatus;

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        project.name.toLowerCase().includes(query) ||
        (project.description && project.description.toLowerCase().includes(query));

      return matchesStatus && matchesSearch;
    });
  }, [projects, selectedStatus, searchQuery]);

  // Dynamic counts for each status tab
  const getCountForStatus = (status: "All" | ProjectStatus) => {
    if (status === "All") return projects.length;
    return projects.filter((p) => p.status === status).length;
  };

  return (
    <div className="space-y-6">
      {/* Search Bar & Status Tabs */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        {/* Status Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1.5 p-1 rounded-xl bg-surface border border-border">
          {filterTabs.map((status) => {
            const isSelected = selectedStatus === status;
            const count = getCountForStatus(status);

            return (
              <button
                key={status}
                type="button"
                onClick={() => setSelectedStatus(status)}
                className={`flex items-center gap-2 rounded-lg px-3 py-1.5 text-xs font-semibold transition-all duration-150 select-none ${
                  isSelected
                    ? "bg-slate-900 text-white shadow-xs"
                    : "text-muted-foreground hover:bg-surface-muted hover:text-foreground"
                }`}
              >
                <span>{status}</span>
                <span
                  className={`rounded-full px-1.5 py-0.2 text-[10px] font-bold ${
                    isSelected
                      ? "bg-slate-800 text-slate-200"
                      : "bg-surface-muted text-muted-foreground"
                  }`}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>

        {/* Search Input */}
        <div className="relative min-w-64">
          <Search className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search projects..."
            className="h-9 w-full rounded-xl border border-border bg-surface pl-9 pr-8 text-xs leading-none text-foreground outline-none transition placeholder:text-subtle-foreground hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/20"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="h-3.5 w-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* Showing count indicator */}
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <p>
          Showing <span className="font-semibold text-foreground">{filteredProjects.length}</span> of{" "}
          <span className="font-semibold text-foreground">{projects.length}</span> projects
        </p>
      </div>

      {/* Projects Grid or Filter Empty State */}
      {filteredProjects.length === 0 ? (
        <EmptyState
          title={searchQuery ? "No matching projects found" : `No ${selectedStatus.toLowerCase()} projects`}
          description={
            searchQuery
              ? `No projects matching "${searchQuery}". Try a different search term or clear the filter.`
              : "There are currently no projects with this status in your workspace."
          }
          action={
            (selectedStatus !== "All" || searchQuery) ? (
              <Button
                variant="secondary"
                size="sm"
                onClick={() => {
                  setSelectedStatus("All");
                  setSearchQuery("");
                }}
              >
                Reset filters
              </Button>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
          {filteredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      )}
    </div>
  );
}
