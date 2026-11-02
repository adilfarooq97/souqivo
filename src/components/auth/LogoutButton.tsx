"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { supabase } from "@/lib/supabase/client";
import Button from "@/components/ui/Button";

export default function LogoutButton() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleLogout = async () => {
    setIsLoading(true);
    setErrorMessage("");

    try {
      const { error } = await supabase.auth.signOut();

      if (error) {
        console.error("Logout error:", error);
        setErrorMessage("Unable to sign out. Please try again.");
        return;
      }

      router.push("/login");
      router.refresh();
    } catch {
      setErrorMessage("Unable to sign out. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-end">
      {errorMessage && (
        <p className="mb-1 text-xs text-danger" role="alert">
          {errorMessage}
        </p>
      )}
      <Button
        variant="outline"
        size="sm"
        onClick={handleLogout}
        disabled={isLoading}
        isLoading={isLoading}
        leftIcon={<LogOut className="h-3.5 w-3.5" aria-hidden="true" />}
        aria-label="Sign out"
      >
        <span className="hidden sm:inline">Sign out</span>
      </Button>
    </div>
  );
}
