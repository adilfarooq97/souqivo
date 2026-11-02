"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Bell, Check, Loader2 } from "lucide-react";
import type { Notification } from "@/lib/supabase/notifications";
import Alert from "@/components/ui/Alert";

async function fetchNotifications(): Promise<Notification[]> {
  const response = await fetch("/api/notifications");

  if (!response.ok) {
    throw new Error("Unable to load notifications.");
  }

  const data: unknown = await response.json();

  if (!Array.isArray(data)) {
    throw new Error("Invalid notifications response.");
  }

  return data;
}

function getNotificationHref(notification: Notification): string {
  switch (notification.type) {
    case "review":
      return `/projects/${notification.project_id}/reviews`;
    case "task":
      return `/projects/${notification.project_id}/tasks`;
    case "message":
      return `/projects/${notification.project_id}/messages`;
    case "invoice":
      return "/invoices";
  }
}

function formatNotificationTime(createdAt: string) {
  const createdTime = new Date(createdAt).getTime();
  const now = Date.now();
  const difference = Math.max(0, now - createdTime);

  const minutes = Math.floor(difference / (1000 * 60));

  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days}d ago`;

  return new Date(createdAt).toLocaleDateString();
}

export default function NotificationCenter() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [actionError, setActionError] = useState("");
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let isMounted = true;

    fetchNotifications()
      .then((data) => {
        if (isMounted) {
          setNotifications(data);
          setLoadError("");
        }
      })
      .catch((error) => {
        console.error("Error loading notifications:", error);
        if (isMounted) {
          setLoadError("Unable to load notifications. Please try again.");
        }
      })
      .finally(() => {
        if (isMounted) {
          setIsLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, []);

  // Handle click outside to close dropdown
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(event: MouseEvent) {
      if (
        panelRef.current &&
        !panelRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const retryLoadingNotifications = () => {
    setIsLoading(true);
    setLoadError("");

    fetchNotifications()
      .then((data) => {
        setNotifications(data);
        setLoadError("");
      })
      .catch((error) => {
        console.error("Error loading notifications:", error);
        setLoadError("Unable to load notifications. Please try again.");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const unreadCount = notifications.filter(
    (notification) => !notification.is_read
  ).length;

  const markAsRead = async (notificationId: string) => {
    setActionError("");

    try {
      const response = await fetch(`/api/notifications/${notificationId}`, {
        method: "PATCH",
      });

      if (!response.ok) {
        setActionError("Unable to update notification. Please try again.");
        return;
      }

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) =>
          notification.id === notificationId
            ? { ...notification, is_read: true }
            : notification
        )
      );
    } catch (error) {
      console.error("Error marking notification as read:", error);
      setActionError("Unable to update notification. Please try again.");
    }
  };

  const markAllAsRead = async () => {
    const unreadNotifications = notifications.filter(
      (notification) => !notification.is_read
    );

    if (unreadNotifications.length === 0) return;

    setActionError("");

    try {
      const responses = await Promise.all(
        unreadNotifications.map((notification) =>
          fetch(`/api/notifications/${notification.id}`, {
            method: "PATCH",
          })
        )
      );

      const updatedIds = new Set(
        unreadNotifications
          .filter((_, index) => responses[index].ok)
          .map((notification) => notification.id)
      );

      setNotifications((currentNotifications) =>
        currentNotifications.map((notification) => ({
          ...notification,
          is_read: notification.is_read || updatedIds.has(notification.id),
        }))
      );

      if (updatedIds.size !== unreadNotifications.length) {
        setActionError(
          "Some notifications could not be updated. Please try again."
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
      setActionError("Unable to update notifications. Please try again.");
    }
  };

  return (
    <div className="relative" ref={panelRef}>
      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={`Notifications${
          unreadCount > 0 ? `, ${unreadCount} unread` : ""
        }`}
        aria-expanded={isOpen}
        aria-controls="notification-panel"
        className="relative flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-surface text-muted-foreground shadow-2xs transition-colors hover:bg-surface-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
      >
        <Bell className="h-4 w-4" aria-hidden="true" />

        {unreadCount > 0 && (
          <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-white shadow-xs">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </button>

      {isOpen && (
        <div
          id="notification-panel"
          className="absolute right-0 z-50 mt-2 w-80 max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-border bg-surface shadow-lg animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center justify-between border-b border-border-muted px-4 py-3 bg-surface-muted/30">
            <div className="flex items-center gap-2">
              <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                Notifications
              </h2>
              {unreadCount > 0 && (
                <span className="rounded-full bg-accent/10 px-2 py-0.5 text-[11px] font-semibold text-accent">
                  {unreadCount} new
                </span>
              )}
            </div>

            {unreadCount > 0 && (
              <button
                type="button"
                onClick={markAllAsRead}
                className="flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                <Check className="h-3 w-3" aria-hidden="true" />
                <span>Mark all read</span>
              </button>
            )}
          </div>

          <div className="max-h-96 overflow-y-auto divide-y divide-border-muted">
            {actionError && (
              <Alert tone="danger" className="m-3">
                {actionError}
              </Alert>
            )}

            {isLoading ? (
              <div className="flex items-center justify-center gap-2 p-6 text-sm text-muted-foreground">
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Loading updates...</span>
              </div>
            ) : loadError ? (
              <div className="p-4 text-center">
                <p className="text-xs text-danger" role="alert">
                  {loadError}
                </p>
                <button
                  type="button"
                  onClick={retryLoadingNotifications}
                  className="mt-2 text-xs font-medium text-foreground underline underline-offset-4"
                >
                  Try again
                </button>
              </div>
            ) : notifications.length === 0 ? (
              <div className="p-8 text-center">
                <Bell className="mx-auto h-6 w-6 text-subtle-foreground" aria-hidden="true" />
                <p className="mt-2 text-xs font-medium text-foreground">
                  No notifications
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  Updates on projects, reviews, and tasks will appear here.
                </p>
              </div>
            ) : (
              notifications.slice(0, 10).map((notification) => {
                const isUnread = !notification.is_read;

                const inner = (
                  <div
                    className={`flex items-start gap-3 p-3.5 transition-colors hover:bg-surface-muted ${
                      isUnread ? "bg-accent-muted/40" : "bg-surface"
                    }`}
                  >
                    <span
                      className={`mt-1.5 h-2 w-2 rounded-full shrink-0 ${
                        isUnread ? "bg-accent" : "bg-transparent"
                      }`}
                      aria-hidden="true"
                    />
                    <div className="min-w-0 flex-1">
                      <p className="text-xs font-semibold text-foreground leading-snug">
                        {notification.title}
                      </p>
                      {notification.message && (
                        <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-muted-foreground">
                          {notification.message}
                        </p>
                      )}
                      <p className="mt-1.5 text-[10px] font-medium text-subtle-foreground">
                        {formatNotificationTime(notification.created_at)}
                      </p>
                    </div>
                  </div>
                );

                if (notification.project_id) {
                  return (
                    <Link
                      key={notification.id}
                      href={getNotificationHref(notification)}
                      onClick={() => markAsRead(notification.id)}
                      className="block focus-visible:outline-none focus-visible:bg-surface-muted"
                    >
                      {inner}
                    </Link>
                  );
                }

                return (
                  <button
                    key={notification.id}
                    type="button"
                    onClick={() => markAsRead(notification.id)}
                    className="block w-full text-left focus-visible:outline-none focus-visible:bg-surface-muted"
                  >
                    {inner}
                  </button>
                );
              })
            )}
          </div>
        </div>
      )}
    </div>
  );
}
