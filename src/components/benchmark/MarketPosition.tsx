import { cn } from "@/lib/utils";

interface MarketPositionProps {
  percentile: number;
  industry: string;
}

export function MarketPosition({ percentile, industry }: MarketPositionProps) {
  const getPositionLabel = () => {
    if (percentile >= 90) return "Top 10%";
    if (percentile >= 75) return "Top 25%";
    if (percentile >= 50) return "Médiane";
    if (percentile >= 25) return "Quartile 3";
    return "Quartile 4";
  };

  const getPositionColor = () => {
    if (percentile >= 75) return "text-success";
    if (percentile >= 50) return "text-primary";
    if (percentile >= 25) return "text-warning";
    return "text-destructive";
  };

  return (
    <div className="glass rounded-2xl p-6">
      <h3 className="text-sm font-medium text-muted-foreground mb-4">
        Votre position vs le marché
      </h3>
      
      <div className="relative h-8 bg-muted rounded-full overflow-hidden mb-4">
        {/* Market distribution visualization */}
        <div className="absolute inset-0 flex">
          <div className="w-1/4 bg-destructive/20" />
          <div className="w-1/4 bg-warning/20" />
          <div className="w-1/4 bg-primary/20" />
          <div className="w-1/4 bg-success/20" />
        </div>
        
        {/* Position indicator */}
        <div 
          className="absolute top-0 bottom-0 w-1 bg-foreground rounded-full transition-all duration-1000 ease-out"
          style={{ left: `${percentile}%` }}
        >
          <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
            <span className={cn("text-sm font-bold", getPositionColor())}>
              Vous
            </span>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>0%</span>
        <span>25%</span>
        <span>50%</span>
        <span>75%</span>
        <span>100%</span>
      </div>
      
      <div className="mt-6 text-center">
        <p className="text-lg font-display font-semibold text-foreground">
          Vous êtes dans le{" "}
          <span className={getPositionColor()}>{getPositionLabel()}</span>
        </p>
        <p className="text-sm text-muted-foreground mt-1">
          du secteur {industry}
        </p>
      </div>
    </div>
  );
}
