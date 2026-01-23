import { useState } from "react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  domainIcon: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number | "unknown") => void;
}

export function QuestionCard({ 
  question, 
  domainIcon, 
  questionNumber, 
  totalQuestions,
  onAnswer 
}: QuestionCardProps) {
  const scaleValues = ["NSP", 1, 2, 3, 4, 5] as const;
  const [selectedValue, setSelectedValue] = useState<number | "unknown" | null>(null);
  const handleSelect = (value: number | "unknown") => {
    setSelectedValue(value);
  };

  const handleConfirm = () => {
    if (selectedValue !== null) {
      onAnswer(selectedValue);
      setSelectedValue(null);
    }
  };

  return (
    <div className="animate-fade-up">
      {/* Question header */}
      <div className="flex items-start gap-4 mb-8">
        <span className="text-4xl">{domainIcon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-sm text-muted-foreground">
              Question {questionNumber} / {totalQuestions}
            </span>
          </div>
          <h2 className="text-2xl font-display font-semibold text-foreground leading-tight">
            {question.text}
          </h2>
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {scaleValues.map((value) => {
          const resolvedValue = value === "NSP" ? "unknown" : value;
          return (
          <button
            key={value}
            onClick={() => handleSelect(resolvedValue)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              selectedValue === resolvedValue
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-border bg-card/50"
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  selectedValue === resolvedValue
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {value}
              </div>
              {selectedValue === resolvedValue && (
                <svg className="w-6 h-6 text-primary animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        );
        })}
      </div>

      {/* Action buttons */}
      <div className="flex flex-col sm:flex-row items-center gap-3">
        <Button
          onClick={handleConfirm}
          disabled={selectedValue === null}
          className="w-full sm:w-auto btn-primary text-primary-foreground font-semibold px-8 py-6"
        >
          Continuer
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>
    </div>
  );
}
