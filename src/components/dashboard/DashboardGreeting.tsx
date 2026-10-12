"use client";

import { useSyncExternalStore } from "react";

type GreetingPeriod = "morning" | "afternoon" | "evening";

type DashboardGreetingProps = {
  initialPeriod: GreetingPeriod;
};

function getLocalGreetingPeriod(): GreetingPeriod {
  const currentHour = new Date().getHours();

  if (currentHour < 12) {
    return "morning";
  }

  if (currentHour < 18) {
    return "afternoon";
  }

  return "evening";
}

function subscribeToLocalTime(onStoreChange: () => void) {
  window.addEventListener("focus", onStoreChange);
  document.addEventListener("visibilitychange", onStoreChange);

  return () => {
    window.removeEventListener("focus", onStoreChange);
    document.removeEventListener("visibilitychange", onStoreChange);
  };
}

export default function DashboardGreeting({
  initialPeriod,
}: DashboardGreetingProps) {
  const period = useSyncExternalStore(
    subscribeToLocalTime,
    getLocalGreetingPeriod,
    () => initialPeriod
  );
  const greeting =
    period === "morning"
      ? {
          title: "Good morning",
          message: "Ready to make progress today?",
        }
      : period === "afternoon"
        ? {
            title: "Good afternoon",
            message: "Here's what needs your attention.",
          }
        : {
            title: "Good evening",
            message: "Here's a quick look at your day's progress.",
          };

  return (
    <>
      <h1 className="text-2xl font-bold tracking-tight text-gray-900">
        {greeting.title} 👋
      </h1>
      <p className="mt-2 text-sm leading-6 text-gray-500">
        {greeting.message}
      </p>
    </>
  );
}
