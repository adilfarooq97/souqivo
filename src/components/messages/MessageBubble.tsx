import type { Message } from "@/types";
import DeleteMessageButton from "@/components/messages/DeleteMessageButton";

type MessageBubbleProps = {
  message: Message;
  isOwn: boolean;
  onDelete: (messageId: string) => void;
};

export default function MessageBubble({
  message,
  isOwn,
  onDelete,
}: MessageBubbleProps) {
  const formattedTime = new Date(message.created_at).toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
  });

  return (
    <div className={`flex w-full ${isOwn ? "justify-end" : "justify-start"}`}>
      <div
        className={`group relative max-w-[85%] sm:max-w-[70%] rounded-2xl px-4 py-3 shadow-2xs ${
          isOwn
            ? "bg-slate-900 text-white rounded-br-xs"
            : "bg-surface border border-border text-foreground rounded-bl-xs"
        }`}
      >
        <p className="text-xs sm:text-sm leading-relaxed whitespace-pre-wrap break-words">
          {message.content}
        </p>

        <div
          className={`mt-1.5 flex items-center justify-between gap-2 text-[10px] ${
            isOwn ? "text-slate-400" : "text-subtle-foreground"
          }`}
        >
          <span>{formattedTime}</span>

          {isOwn && (
            <div className="opacity-0 group-hover:opacity-100 transition-opacity">
              <DeleteMessageButton messageId={message.id} onDeleted={onDelete} />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
