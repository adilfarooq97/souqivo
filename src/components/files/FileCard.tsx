import { ExternalLink, File, FileCode, FileText, Image as ImageIcon } from "lucide-react";
import type { ProjectFile } from "@/types";
import DeleteFileButton from "@/components/files/DeleteFileButton";
import FileTypeBadge from "@/components/files/FileTypeBadge";
import { isExternalFileUrl } from "@/lib/files";

type FileCardProps = {
  file: ProjectFile;
  fileUrl: string | null;
  canManage?: boolean;
};

function getFileIcon(type: string) {
  switch (type) {
    case "image":
      return <ImageIcon className="h-5 w-5 text-sky-600" aria-hidden="true" />;
    case "document":
      return <FileText className="h-5 w-5 text-indigo-600" aria-hidden="true" />;
    case "code":
      return <FileCode className="h-5 w-5 text-amber-600" aria-hidden="true" />;
    default:
      return <File className="h-5 w-5 text-slate-600" aria-hidden="true" />;
  }
}

export default function FileCard({
  file,
  fileUrl,
  canManage = true,
}: FileCardProps) {
  const isExternal = isExternalFileUrl(file.file_url);

  return (
    <div className="flex flex-col justify-between rounded-2xl border border-border bg-surface p-5 shadow-2xs transition-all hover:border-border-strong hover:shadow-xs">
      <div>
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3 min-w-0">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-surface-muted border border-border">
              {getFileIcon(file.file_type)}
            </div>
            <div className="min-w-0">
              <h3 className="truncate text-xs font-semibold text-foreground leading-snug" title={file.name}>
                {file.name}
              </h3>
              <p className="mt-0.5 text-[11px] text-muted-foreground">
                Added {new Date(file.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>

          <FileTypeBadge type={file.file_type} />
        </div>
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border-muted pt-3">
        {fileUrl ? (
          <a
            href={fileUrl}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-accent hover:underline"
          >
            <span>{isExternal ? "Open external link" : "View file"}</span>
            <ExternalLink className="h-3 w-3" />
          </a>
        ) : (
          <span className="text-xs text-danger font-medium" role="status">
            File unavailable
          </span>
        )}

        {canManage && <DeleteFileButton fileId={file.id} />}
      </div>
    </div>
  );
}
