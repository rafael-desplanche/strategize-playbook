import { cn } from "@/lib/utils";
import { domains } from "@/data/questions";

interface DomainProgressProps {
  currentDomainIndex: number;
  completedDomains: string[];
}

export function DomainProgress({ currentDomainIndex, completedDomains }: DomainProgressProps) {
  return (
    <div className="flex items-center gap-2 overflow-x-auto pb-2">
      {domains.map((domain, index) => {
        const isCompleted = completedDomains.includes(domain.id);
        const isCurrent = index === currentDomainIndex;
        const isPast = index < currentDomainIndex;
        
        return (
          <div
            key={domain.id}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-lg border transition-all duration-300 whitespace-nowrap",
              {
                "border-primary bg-primary/10 text-primary": isCurrent,
                "border-success/50 bg-success/10 text-success": isCompleted || isPast,
                "border-border bg-muted/30 text-muted-foreground": !isCurrent && !isCompleted && !isPast,
              }
            )}
          >
            <span className="text-sm font-medium hidden sm:inline">{domain.name}</span>
            <span className="text-xs font-semibold rounded-full bg-background/70 px-2 py-0.5 border border-border/60">
              {domain.questions.length}
            </span>
            {(isCompleted || isPast) && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        );
      })}
    </div>
  );
}
