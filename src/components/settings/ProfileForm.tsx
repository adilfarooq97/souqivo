"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Mail, Shield } from "lucide-react";
import type { ProfileSettings } from "@/lib/supabase/settings";
import Button from "@/components/ui/Button";
import FormField from "@/components/ui/FormField";
import Alert from "@/components/ui/Alert";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";

type ProfileFormProps = {
  profile: ProfileSettings;
};

export default function ProfileForm({ profile }: ProfileFormProps) {
  const router = useRouter();

  const [fullName, setFullName] = useState(profile.full_name);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setError("");
    setSuccess("");

    const trimmedName = fullName.trim();

    if (!trimmedName) {
      setError("Full name is required.");
      return;
    }

    if (trimmedName.length > 100) {
      setError("Full name must be 100 characters or less.");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/settings/profile", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          full_name: trimmedName,
        }),
      });

      const data = await response.json().catch(() => null);

      if (!response.ok) {
        throw new Error(data?.error || "Unable to update profile.");
      }

      setFullName(data.full_name);
      setSuccess("Profile updated successfully.");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Unable to update profile."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-6">
      {/* Avatar Header Preview */}
      <div className="flex items-center gap-4 rounded-xl border border-border bg-surface-muted/30 p-4">
        <Avatar name={fullName || "User"} size="lg" role={profile.role} />
        <div>
          <h3 className="text-sm font-semibold text-foreground">
            {fullName || "Your Name"}
          </h3>
          <div className="mt-1 flex items-center gap-2">
            <Badge variant={profile.role === "freelancer" ? "neutral" : "success"} size="sm">
              {profile.role === "freelancer" ? "Freelancer" : "Client"}
            </Badge>
            <span className="text-xs text-muted-foreground">{profile.email}</span>
          </div>
        </div>
      </div>

      <FormField
        id="fullName"
        label="Full name"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
        disabled={isLoading}
        placeholder="Your full name"
      />

      {/* Readonly Account Details */}
      <div className="grid gap-4 sm:grid-cols-2 pt-2">
        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <Mail className="h-3.5 w-3.5" />
            <span>Email Address</span>
          </div>
          <p className="text-sm font-medium text-foreground truncate">
            {profile.email}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Managed via authentication provider.</p>
        </div>

        <div className="rounded-xl border border-border bg-surface p-4">
          <div className="flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-1">
            <Shield className="h-3.5 w-3.5" />
            <span>Account Role</span>
          </div>
          <p className="text-sm font-medium capitalize text-foreground">
            {profile.role}
          </p>
          <p className="text-[11px] text-muted-foreground mt-1">Defines workspace access permissions.</p>
        </div>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}
      {success && <Alert tone="success">{success}</Alert>}

      <div className="pt-2">
        <Button type="submit" disabled={isLoading} isLoading={isLoading}>
          {isLoading ? "Saving changes..." : "Save Changes"}
        </Button>
      </div>
    </form>
  );
}
