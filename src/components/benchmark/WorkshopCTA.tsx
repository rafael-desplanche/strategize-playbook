import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar, MessageSquare } from "lucide-react";
import { WorkshopModal } from "./WorkshopModal";
import { cn } from "@/lib/utils";

interface WorkshopCTAProps {
  variant?: "primary" | "secondary" | "minimal";
  context?: "landing" | "methodology" | "results";
  maturityLevel?: number;
  className?: string;
}

export function WorkshopCTA({ 
  variant = "secondary", 
  context = "landing",
  maturityLevel,
  className 
}: WorkshopCTAProps) {
  const [isOpen, setIsOpen] = useState(false);

  const labels = {
    primary: "Réserver un workshop exécutif",
    secondary: "Échanger avec un expert",
    minimal: "Workshop"
  };

  const descriptions = {
    landing: "Valider votre positionnement lors d'un atelier structuré",
    methodology: "Approfondir le modèle avec un consultant",
    results: "Transformer ces insights en actions"
  };

  if (variant === "minimal") {
    return (
      <>
        <Button 
          variant="ghost" 
          size="sm"
          onClick={() => setIsOpen(true)}
          className={cn("text-muted-foreground hover:text-foreground", className)}
        >
          <Calendar className="w-4 h-4 mr-2" />
          {labels.minimal}
        </Button>
        <WorkshopModal 
          open={isOpen} 
          onOpenChange={setIsOpen} 
          context={context}
          maturityLevel={maturityLevel}
        />
      </>
    );
  }

  if (variant === "primary") {
    return (
      <>
        <Button
          onClick={() => setIsOpen(true)}
          className={cn(
            "btn-primary text-primary-foreground font-semibold px-6 py-6",
            className
          )}
        >
          <Calendar className="w-5 h-5 mr-2" />
          {labels.primary}
        </Button>
        <WorkshopModal 
          open={isOpen} 
          onOpenChange={setIsOpen} 
          context={context}
          maturityLevel={maturityLevel}
        />
      </>
    );
  }

  return (
    <>
      <div 
        onClick={() => setIsOpen(true)}
        className={cn(
          "glass rounded-2xl p-6 cursor-pointer card-interactive",
          className
        )}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
            <MessageSquare className="w-6 h-6 text-accent" />
          </div>
          <div className="flex-1">
            <h3 className="font-display font-semibold text-foreground mb-1">
              {labels.secondary}
            </h3>
            <p className="text-sm text-muted-foreground mb-3">
              {descriptions[context]}
            </p>
            <Button variant="outline" size="sm" className="pointer-events-none">
              <Calendar className="w-4 h-4 mr-2" />
              Réserver un créneau
            </Button>
          </div>
        </div>
      </div>
      <WorkshopModal 
        open={isOpen} 
        onOpenChange={setIsOpen} 
        context={context}
        maturityLevel={maturityLevel}
      />
    </>
  );
}
