type AvatarSize = "xs" | "sm" | "md" | "lg" | "xl";

type AvatarProps = {
  name: string;
  size?: AvatarSize;
  className?: string;
  role?: "freelancer" | "client";
};

const sizeClasses: Record<AvatarSize, string> = {
  xs: "h-6 w-6 text-[10px]",
  sm: "h-8 w-8 text-xs",
  md: "h-9 w-9 text-xs",
  lg: "h-11 w-11 text-sm font-semibold",
  xl: "h-14 w-14 text-base font-bold",
};

// Deterministic subtle background color based on name
const backgroundColors = [
  "bg-slate-800 text-white",
  "bg-indigo-700 text-white",
  "bg-emerald-700 text-white",
  "bg-sky-700 text-white",
  "bg-violet-700 text-white",
  "bg-teal-700 text-white",
];

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/);
  if (parts.length >= 2) {
    return (parts[0][0] + parts[1][0]).toUpperCase();
  }
  return (name.trim().charAt(0) || "U").toUpperCase();
}

function getColor(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash);
  }
  const index = Math.abs(hash) % backgroundColors.length;
  return backgroundColors[index];
}

export default function Avatar({
  name,
  size = "md",
  className = "",
  role,
}: AvatarProps) {
  const initials = getInitials(name);
  const colorClass = getColor(name);

  return (
    <div className="relative inline-block shrink-0">
      <div
        aria-hidden="true"
        className={`flex items-center justify-center rounded-full font-medium shadow-2xs select-none ${sizeClasses[size]} ${colorClass} ${className}`}
      >
        {initials}
      </div>
      {role && (
        <span
          title={role === "freelancer" ? "Freelancer" : "Client"}
          className={`absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-surface ${
            role === "freelancer" ? "bg-accent" : "bg-emerald-500"
          }`}
          aria-hidden="true"
        />
      )}
    </div>
  );
}

