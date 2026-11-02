import type { ProjectMember } from "@/types";
import RemoveProjectMemberButton from "@/components/projects/RemoveProjectMemberButton";
import Avatar from "@/components/ui/Avatar";
import Badge from "@/components/ui/Badge";
import { Users } from "lucide-react";

type ProjectMembersProps = {
  members: ProjectMember[];
  profiles: {
    id: string;
    full_name: string;
    role: "client" | "freelancer";
  }[];
  canManage?: boolean;
};

export default function ProjectMembers({
  members,
  profiles,
  canManage = false,
}: ProjectMembersProps) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-6 shadow-2xs">
      <div className="flex items-center justify-between border-b border-border-muted pb-4">
        <div>
          <h2 className="text-base font-semibold tracking-tight text-foreground">
            Project Members
          </h2>
          <p className="mt-0.5 text-xs text-muted-foreground">
            People with workspace access to this project.
          </p>
        </div>

        <span className="rounded-full bg-surface-muted px-2.5 py-0.5 text-xs font-semibold text-muted-foreground border border-border">
          {members.length}
        </span>
      </div>

      <div className="mt-4 space-y-2.5">
        {members.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border bg-surface-muted/30 px-4 py-8 text-center">
            <Users className="mx-auto h-6 w-6 text-subtle-foreground" aria-hidden="true" />
            <p className="mt-2 text-xs font-semibold text-foreground">
              No members assigned
            </p>
            <p className="mt-1 text-[11px] text-muted-foreground">
              Add a client below to invite them to this project.
            </p>
          </div>
        ) : (
          members.map((member) => {
            const profile = profiles.find((item) => item.id === member.user_id);
            const memberName = profile?.full_name ?? "Unknown user";

            return (
              <div
                key={member.id}
                className="flex items-center justify-between gap-3 rounded-xl border border-border bg-surface p-3 transition-colors hover:bg-surface-muted/30"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <Avatar name={memberName} size="sm" role={profile?.role} />
                  <div className="min-w-0">
                    <p className="truncate text-xs font-semibold text-foreground">
                      {memberName}
                    </p>
                    <p className="text-[10px] capitalize text-muted-foreground">
                      {member.role}
                    </p>
                  </div>
                </div>

                <div className="flex shrink-0 items-center gap-2">
                  <Badge
                    variant={member.role === "freelancer" ? "default" : "info"}
                    size="sm"
                  >
                    {member.role}
                  </Badge>

                  {canManage && (
                    <RemoveProjectMemberButton memberId={member.id} />
                  )}
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
