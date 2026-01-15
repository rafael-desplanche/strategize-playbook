import { useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { industries, companySizes, roles } from "@/data/questions";
import { ArrowRight, Building2, Users, Briefcase } from "lucide-react";

interface OnboardingData {
  industry: string;
  companySize: string;
  role: string;
}

interface OnboardingFlowProps {
  onComplete: (data: OnboardingData) => void;
}

type Step = "industry" | "size" | "role";

export function OnboardingFlow({ onComplete }: OnboardingFlowProps) {
  const [step, setStep] = useState<Step>("industry");
  const [data, setData] = useState<OnboardingData>({
    industry: "",
    companySize: "",
    role: "",
  });

  const handleSelect = (field: keyof OnboardingData, value: string) => {
    setData((prev) => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step === "industry" && data.industry) {
      setStep("size");
    } else if (step === "size" && data.companySize) {
      setStep("role");
    } else if (step === "role" && data.role) {
      onComplete(data);
    }
  };

  const steps = [
    { id: "industry", label: "Secteur", icon: Building2 },
    { id: "size", label: "Taille", icon: Users },
    { id: "role", label: "Rôle", icon: Briefcase },
  ];

  const currentStepIndex = steps.findIndex((s) => s.id === step);

  return (
    <div className="animate-fade-up">
      {/* Step indicator */}
      <div className="flex items-center justify-center gap-2 mb-10">
        {steps.map((s, index) => {
          const Icon = s.icon;
          const isActive = s.id === step;
          const isPast = index < currentStepIndex;
          
          return (
            <div key={s.id} className="flex items-center">
              <div
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-full transition-all duration-300",
                  {
                    "bg-primary text-primary-foreground": isActive,
                    "bg-success/20 text-success": isPast,
                    "bg-muted text-muted-foreground": !isActive && !isPast,
                  }
                )}
              >
                <Icon className="w-4 h-4" />
                <span className="text-sm font-medium hidden sm:inline">{s.label}</span>
              </div>
              {index < steps.length - 1 && (
                <div 
                  className={cn(
                    "w-8 h-0.5 mx-1",
                    isPast ? "bg-success" : "bg-muted"
                  )}
                />
              )}
            </div>
          );
        })}
      </div>

      {/* Industry selection */}
      {step === "industry" && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Quel est votre secteur d'activité ?
            </h2>
            <p className="text-muted-foreground">
              Pour un benchmark pertinent avec vos pairs
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
            {industries.map((industry) => (
              <button
                key={industry.value}
                onClick={() => handleSelect("industry", industry.value)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-primary/5",
                  data.industry === industry.value
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                    : "border-border bg-card/50"
                )}
              >
                <span className="font-medium text-foreground">{industry.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Company size selection */}
      {step === "size" && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Quelle est la taille de votre entreprise ?
            </h2>
            <p className="text-muted-foreground">
              Pour adapter les recommandations à votre contexte
            </p>
          </div>
          
          <div className="space-y-3 max-w-md mx-auto">
            {companySizes.map((size) => (
              <button
                key={size.value}
                onClick={() => handleSelect("companySize", size.value)}
                className={cn(
                  "w-full p-5 rounded-xl border text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-primary/5",
                  data.companySize === size.value
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                    : "border-border bg-card/50"
                )}
              >
                <p className="font-medium text-foreground">{size.label}</p>
                <p className="text-sm text-muted-foreground mt-1">{size.description}</p>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Role selection */}
      {step === "role" && (
        <div className="animate-fade-up">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-display font-bold text-foreground mb-2">
              Quel est votre rôle ?
            </h2>
            <p className="text-muted-foreground">
              Pour personnaliser votre expérience
            </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 max-w-xl mx-auto">
            {roles.map((role) => (
              <button
                key={role.value}
                onClick={() => handleSelect("role", role.value)}
                className={cn(
                  "p-4 rounded-xl border text-left transition-all duration-200",
                  "hover:border-primary/50 hover:bg-primary/5",
                  data.role === role.value
                    ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                    : "border-border bg-card/50"
                )}
              >
                <span className="font-medium text-foreground">{role.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Next button */}
      <div className="mt-10 flex justify-center">
        <Button
          onClick={handleNext}
          disabled={
            (step === "industry" && !data.industry) ||
            (step === "size" && !data.companySize) ||
            (step === "role" && !data.role)
          }
          className="btn-primary text-primary-foreground font-semibold px-10 py-6 text-lg"
        >
          Continuer
          <ArrowRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
