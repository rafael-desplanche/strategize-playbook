import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  total: number;
  className?: string;
  showLabel?: boolean;
}

export function ProgressBar({ current, total, className, showLabel = true }: ProgressBarProps) {
  const percentage = Math.round((current / total) * 100);
  
  return (
    <div className={cn("w-full", className)}>
      {showLabel && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-muted-foreground">Progression</span>
          <span className="text-sm font-medium text-primary">{percentage}%</span>
        </div>
      )}
      <div className="h-2 bg-muted rounded-full overflow-hidden">
        <div 
          className="h-full progress-fill rounded-full"
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <div className="flex justify-between items-center mt-1">
          <span className="text-xs text-muted-foreground">{current} / {total} questions</span>
        </div>
      )}
    </div>
  );
}
