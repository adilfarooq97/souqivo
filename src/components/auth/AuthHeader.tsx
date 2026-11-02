import Link from "next/link";
import { Sparkles } from "lucide-react";

export default function AuthHeader() {
  return (
    <div className="mb-8 text-center flex flex-col items-center">
      <Link
        href="/"
        className="inline-flex items-center gap-2.5 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-white shadow-xs">
          <Sparkles className="h-5 w-5 text-white" aria-hidden="true" />
        </div>
        <span className="text-2xl font-bold tracking-tight text-foreground">
          Souqivo
        </span>
      </Link>

      <p className="mt-2.5 text-xs font-medium text-muted-foreground">
        One workspace from kickoff to approval.
      </p>
    </div>
  );
}
