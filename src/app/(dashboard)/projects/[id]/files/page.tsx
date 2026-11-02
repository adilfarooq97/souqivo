import Link from "next/link";
import { notFound } from "next/navigation";
import { FilePlus, Plus } from "lucide-react";
import { getAccessibleProjects } from "@/lib/supabase/projects";
import { getFiles, getFileUrl } from "@/lib/supabase/files";
import { isExternalFileUrl } from "@/lib/files";
import FileCard from "@/components/files/FileCard";
import { getCurrentUserProfile } from "@/lib/supabase/auth";
import ProjectNavigation from "@/components/projects/ProjectNavigation";
import EmptyState from "@/components/ui/EmptyState";
import PageHeader from "@/components/ui/PageHeader";
import Button from "@/components/ui/Button";
import Breadcrumbs from "@/components/ui/Breadcrumbs";
import Alert from "@/components/ui/Alert";

export default async function FilesPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const profile = await getCurrentUserProfile();
  const projects = await getAccessibleProjects();
  const project = projects.find((item) => item.id === id);

  if (!project) {
    notFound();
  }

  const files = await getFiles(project.id);
  const isFreelancer = profile?.role === "freelancer";

  const filesWithUrls = await Promise.all(
    files.map(async (file) => {
      if (isExternalFileUrl(file.file_url)) {
        return {
          file,
          fileUrl: file.file_url,
        };
      }

      try {
        const signedUrl = await getFileUrl(file.file_url);

        return {
          file,
          fileUrl: signedUrl,
        };
      } catch (error) {
        console.error(`Error creating signed URL for file ${file.id}:`, error);

        return {
          file,
          fileUrl: null,
        };
      }
    })
  );

  const unavailableFileCount = filesWithUrls.filter(
    ({ fileUrl }) => fileUrl === null
  ).length;

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      <Breadcrumbs
        items={[
          { label: "Projects", href: "/projects" },
          { label: project.name, href: `/projects/${project.id}` },
          { label: "Files" },
        ]}
      />

      <ProjectNavigation projectId={project.id} active="files" />

      <PageHeader
        title={`${project.name} Files`}
        description={
          isFreelancer
            ? `Share deliverable assets, design specs, and documentation (${files.length} ${
                files.length === 1 ? "file" : "files"
              }).`
            : `Shared project documents and assets (${files.length} ${
                files.length === 1 ? "file" : "files"
              }).`
        }
        action={
          isFreelancer ? (
            <Link href={`/projects/${project.id}/files/new`}>
              <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                Add File
              </Button>
            </Link>
          ) : undefined
        }
      />

      {unavailableFileCount > 0 && (
        <Alert tone="warning">
          {unavailableFileCount === 1
            ? "1 file could not be generated. Please try again later."
            : `${unavailableFileCount} files could not be opened. Please try again later.`}
        </Alert>
      )}

      {files.length === 0 ? (
        <EmptyState
          title="No files shared yet"
          description={
            isFreelancer
              ? "Upload design assets, documents, or link external assets to share with your client."
              : "No project files have been shared yet."
          }
          icon={<FilePlus className="h-6 w-6 text-subtle-foreground" />}
          action={
            isFreelancer ? (
              <Link href={`/projects/${project.id}/files/new`}>
                <Button variant="primary" leftIcon={<Plus className="h-4 w-4" />}>
                  Upload First File
                </Button>
              </Link>
            ) : undefined
          }
        />
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filesWithUrls.map(({ file, fileUrl }) => (
            <FileCard
              key={file.id}
              file={file}
              fileUrl={fileUrl}
              canManage={isFreelancer}
            />
          ))}
        </div>
      )}
    </div>
  );
}
