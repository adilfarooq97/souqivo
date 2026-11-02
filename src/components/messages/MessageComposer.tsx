"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Send } from "lucide-react";
import Button from "@/components/ui/Button";
import Alert from "@/components/ui/Alert";
import type { Message } from "@/types";

type MessageComposerProps = {
  projectId: string;
  onMessageSent: (message: Message) => void;
};

const MAX_LENGTH = 1000;

export default function MessageComposer({
  projectId,
  onMessageSent,
}: MessageComposerProps) {
  const router = useRouter();

  const [content, setContent] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    const trimmedContent = content.trim();

    if (!trimmedContent || isSending) return;

    setIsSending(true);
    setError("");

    try {
      const response = await fetch("/api/messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          project_id: projectId,
          content: trimmedContent,
        }),
      });

      const data: unknown = await response.json().catch(() => null);

      if (!response.ok) {
        const err =
          data &&
          typeof data === "object" &&
          "error" in data &&
          typeof data.error === "string"
            ? data.error
            : "Failed to send message";
        throw new Error(err);
      }

      if (
        !data ||
        typeof data !== "object" ||
        !("id" in data) ||
        typeof data.id !== "string" ||
        !("project_id" in data) ||
        typeof data.project_id !== "string" ||
        !("sender_id" in data) ||
        typeof data.sender_id !== "string" ||
        !("content" in data) ||
        typeof data.content !== "string" ||
        !("created_at" in data) ||
        typeof data.created_at !== "string"
      ) {
        throw new Error("The server returned an invalid message.");
      }

      onMessageSent({
        id: data.id,
        project_id: data.project_id,
        sender_id: data.sender_id,
        content: data.content,
        created_at: data.created_at,
      });
      setContent("");
      router.refresh();
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Something went wrong"
      );
    } finally {
      setIsSending(false);
    }
  };

  const handleKeyDown = (
    event: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void handleSubmit();
    }
  };

  return (
    <div className="space-y-3">
      <div className="relative">
        <textarea
          aria-label="Write a message"
          value={content}
          onChange={(event) => {
            if (event.target.value.length <= MAX_LENGTH) {
              setContent(event.target.value);
            }
          }}
          onKeyDown={handleKeyDown}
          placeholder="Type your message... (Press Enter to send, Shift+Enter for new line)"
          rows={3}
          disabled={isSending}
          className="w-full resize-none rounded-xl border border-border bg-surface p-3.5 text-xs leading-relaxed text-foreground shadow-2xs outline-none transition placeholder:text-subtle-foreground hover:border-border-strong focus:border-accent focus:ring-2 focus:ring-accent/20 disabled:cursor-not-allowed disabled:bg-surface-muted"
        />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-[11px] text-subtle-foreground">
          <span>{content.length}/{MAX_LENGTH}</span>
          <span className="hidden sm:inline">·</span>
          <span className="hidden sm:inline">Enter to send · Shift+Enter for line break</span>
        </div>

        <Button
          type="button"
          size="sm"
          onClick={() => void handleSubmit()}
          disabled={isSending || !content.trim()}
          isLoading={isSending}
          leftIcon={<Send className="h-3.5 w-3.5" />}
        >
          Send
        </Button>
      </div>

      {error && <Alert tone="danger">{error}</Alert>}
    </div>
  );
}
