"use client";

import { useEffect } from "react";
import { AlertCircle, RotateCcw } from "lucide-react";
import Button from "@/components/ui/Button";

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("Dashboard error boundary:", error);
  }, [error]);

  return (
    <div className="flex min-h-[60vh] items-center justify-center p-4 sm:p-6 lg:p-8 animate-in fade-in duration-200">
      <div className="max-w-md text-center rounded-2xl border border-border bg-surface p-8 shadow-xs">
        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl border border-danger-border bg-danger-muted text-danger">
          <AlertCircle className="h-6 w-6" aria-hidden="true" />
        </div>

        <h1 className="mt-4 text-lg font-bold tracking-tight text-foreground">
          Something went wrong
        </h1>

        <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
          We couldn&apos;t load this part of your Souqivo workspace. Please try again or refresh the page.
        </p>

        <div className="mt-6">
          <Button
            onClick={() => reset()}
            variant="primary"
            size="sm"
            leftIcon={<RotateCcw className="h-4 w-4" />}
          >
            Try again
          </Button>
        </div>
      </div>
    </div>
  );
}
