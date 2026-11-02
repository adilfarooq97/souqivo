import NotificationCenter from "@/components/notifications/NotificationCenter";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import LogoutButton from "@/components/auth/LogoutButton";
import Avatar from "@/components/ui/Avatar";

export default async function Navbar() {
  const userProfile = await getCurrentUserProfile();
  const fullName = userProfile?.full_name?.trim() || "Your account";

  return (
    <header className="flex min-h-16 items-center justify-between gap-3 border-b border-border bg-surface px-4 sm:px-6 lg:px-8">
      <div>
        <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
      </div>

      <div className="flex items-center gap-3 sm:gap-4">
        <NotificationCenter />

        <div className="flex items-center gap-2.5">
          <Avatar name={fullName} size="sm" role={userProfile?.role} />
          <span className="hidden max-w-40 truncate text-xs font-semibold text-foreground sm:block">
            {fullName}
          </span>
        </div>

        <LogoutButton />
      </div>
    </header>
  );
}
