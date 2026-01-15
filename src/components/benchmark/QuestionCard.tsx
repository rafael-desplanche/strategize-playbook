import { useState } from "react";
import { cn } from "@/lib/utils";
import { Question } from "@/data/questions";
import { Button } from "@/components/ui/button";
import { HelpCircle, ChevronRight } from "lucide-react";

interface QuestionCardProps {
  question: Question;
  domainIcon: string;
  questionNumber: number;
  totalQuestions: number;
  onAnswer: (value: number | "unknown" | "not_applicable") => void;
}

export function QuestionCard({ 
  question, 
  domainIcon, 
  questionNumber, 
  totalQuestions,
  onAnswer 
}: QuestionCardProps) {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleSelect = (value: number) => {
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
            {question.tooltip && (
              <button
                className="text-muted-foreground hover:text-primary transition-colors"
                onMouseEnter={() => setShowTooltip(true)}
                onMouseLeave={() => setShowTooltip(false)}
              >
                <HelpCircle className="w-4 h-4" />
              </button>
            )}
          </div>
          <h2 className="text-2xl font-display font-semibold text-foreground leading-tight">
            {question.text}
          </h2>
          {showTooltip && question.tooltip && (
            <p className="mt-2 text-sm text-muted-foreground bg-muted/50 p-3 rounded-lg animate-fade-up">
              {question.tooltip}
            </p>
          )}
        </div>
      </div>

      {/* Options */}
      <div className="space-y-3 mb-8">
        {question.options.map((option) => (
          <button
            key={option.value}
            onClick={() => handleSelect(option.value)}
            className={cn(
              "w-full text-left p-4 rounded-xl border transition-all duration-200",
              "hover:border-primary/50 hover:bg-primary/5",
              selectedValue === option.value
                ? "border-primary bg-primary/10 ring-2 ring-primary/20"
                : "border-border bg-card/50"
            )}
          >
            <div className="flex items-center gap-4">
              <div
                className={cn(
                  "w-10 h-10 rounded-full flex items-center justify-center text-sm font-bold transition-all",
                  selectedValue === option.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                )}
              >
                {option.value}
              </div>
              <div className="flex-1">
                <p className="font-medium text-foreground">{option.label}</p>
                {option.description && (
                  <p className="text-sm text-muted-foreground mt-0.5">{option.description}</p>
                )}
              </div>
              {selectedValue === option.value && (
                <svg className="w-6 h-6 text-primary animate-scale-in" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              )}
            </div>
          </button>
        ))}
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
        <div className="flex gap-2">
          <Button
            variant="ghost"
            onClick={() => onAnswer("unknown")}
            className="text-muted-foreground hover:text-foreground"
          >
            Je ne sais pas
          </Button>
          <Button
            variant="ghost"
            onClick={() => onAnswer("not_applicable")}
            className="text-muted-foreground hover:text-foreground"
          >
            Non pertinent
          </Button>
        </div>
      </div>
    </div>
  );
}
