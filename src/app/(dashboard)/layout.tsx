import type { Metadata } from "next";
import { getCurrentUser, getCurrentUserProfile } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";
import DashboardShell from "@/components/layout/DashboardShell";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getCurrentUser();

  if (!user) {
    redirect("/login");
  }

  const userProfile = await getCurrentUserProfile();

  return <DashboardShell userProfile={userProfile}>{children}</DashboardShell>;
}
