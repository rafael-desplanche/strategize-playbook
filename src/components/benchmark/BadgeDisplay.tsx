import { Badge as BadgeType } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface BadgeDisplayProps {
  badges: BadgeType[];
}

export function BadgeDisplay({ badges }: BadgeDisplayProps) {
  if (badges.length === 0) return null;

  return (
    <div className="flex flex-wrap gap-3 justify-center">
      {badges.map((badge, index) => (
        <div
          key={badge.id}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full animate-scale-in",
            {
              "bg-success/10 border border-success/30": badge.type === "positive",
              "bg-warning/10 border border-warning/30": badge.type === "warning",
              "bg-primary/10 border border-primary/30": badge.type === "achievement",
            }
          )}
          style={{ animationDelay: `${index * 100}ms` }}
        >
          {badge.icon && <span className="text-xl">{badge.icon}</span>}
          <div>
            <p className={cn(
              "text-sm font-medium",
              {
                "text-success": badge.type === "positive",
                "text-warning": badge.type === "warning",
                "text-primary": badge.type === "achievement",
              }
            )}>
              {badge.name}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}
