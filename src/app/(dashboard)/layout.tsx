import type { Metadata } from "next";
import Sidebar from "@/components/layout/sidebar";
import Navbar from "@/components/layout/Navbar";
import { getCurrentUser } from "@/lib/supabase/auth";
import { redirect } from "next/navigation";

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

  return (
    <div className="flex h-dvh flex-col overflow-hidden lg:flex-row">
      <Sidebar />

      <div className="flex min-h-0 min-w-0 flex-1 flex-col">
        <Navbar />

        <main className="mx-auto min-h-0 w-full max-w-screen-2xl min-w-0 flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}