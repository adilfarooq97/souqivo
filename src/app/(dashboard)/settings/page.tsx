import { getProfileSettings } from "@/lib/supabase/settings";
import ProfileForm from "@/components/settings/ProfileForm";
import PageHeader from "@/components/ui/PageHeader";
import Alert from "@/components/ui/Alert";
import Breadcrumbs from "@/components/ui/Breadcrumbs";

export default async function SettingsPage() {
  const profile = await getProfileSettings();

  if (!profile) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-6">
        <PageHeader title="Settings" description="Manage your profile information." />
        <div className="mt-4">
          <Alert tone="danger">Unable to load your profile settings.</Alert>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <PageHeader
        title="Settings"
        description="Manage your account profile, identity, and personal workspace preferences."
        breadcrumbs={<Breadcrumbs items={[{ label: "Settings" }]} />}
      />

      <section className="max-w-2xl rounded-2xl border border-border bg-surface p-6 sm:p-8 shadow-xs">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Account Profile
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            Information associated with your Souqivo account across client projects.
          </p>
        </div>

        <ProfileForm profile={profile} />
      </section>
    </div>
  );
}
