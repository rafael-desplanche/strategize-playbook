import { useMemo } from "react";
import { Domain } from "@/data/questions";
import { cn } from "@/lib/utils";

type AnswerValue = number;

interface QuestionTableProps {
  domain: Domain;
  answersById: Map<string, AnswerValue>;
  onAnswer: (questionId: string, value: AnswerValue) => void;
}

export function QuestionTable({ domain, answersById, onAnswer }: QuestionTableProps) {
  const questions = domain.questions;
  const scaleOptions = useMemo(
    () => [
      { value: 0, label: "NSP", description: "Je ne sais pas" },
      { value: 1, label: "1", description: "Non, pas du tout" },
      { value: 2, label: "2", description: "Non, très peu" },
      { value: 3, label: "3", description: "Oui, nous sommes au début" },
      { value: 4, label: "4", description: "Oui, c’est acquis mais nous pouvons encore nous améliorer" },
      { value: 5, label: "5", description: "C’est parfaitement acquis" },
    ],
    []
  );

  if (import.meta.env.DEV) {
    console.debug("[QuestionTable] questions", domain.id, questions.length);
  }

  return (
    <div className="space-y-4 animate-fade-up">
      <div className="rounded-2xl border border-border/60 bg-card/60 overflow-hidden hidden md:block">
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
              <div className="grid grid-cols-[minmax(280px,1fr)_repeat(6,56px)] gap-2 items-end px-4 pt-3 pb-2">
                <div />
                <div className="col-span-6 flex flex-col items-end gap-1">
                  <span className="text-[11px] font-semibold text-emerald-600">High Achiever</span>
                  <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-[minmax(280px,1fr)_repeat(6,56px)] gap-2 items-center px-4 py-3 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <div>Questions</div>
                {scaleOptions.map((option) => (
                  <div key={option.label} className="text-center" title={option.description} aria-label={option.description}>
                    {option.label}
                  </div>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border/70">
              {questions.map((question, index) => {
                const inputName = `question-${domain.id}-${question.id}`;
                return (
                  <div
                    key={question.id}
                    className="grid grid-cols-[minmax(280px,1fr)_repeat(6,56px)] gap-2 items-center px-4 py-4 text-sm"
                  >
                    <div className="text-foreground">
                      <span className="text-muted-foreground mr-2">{index + 1}.</span>
                      {question.text}
                    </div>
                    {scaleOptions.map((option) => (
                      <label
                        key={option.label}
                        htmlFor={`${inputName}-${option.label}`}
                        className="flex h-full w-full cursor-pointer items-center justify-center"
                        title={option.description}
                        aria-label={option.description}
                        onClick={() => onAnswer(question.id, option.value)}
                      >
                        <input
                          type="radio"
                          name={inputName}
                          value={option.label}
                          id={`${inputName}-${option.label}`}
                          checked={answersById.get(question.id) === option.value}
                          onChange={() => onAnswer(question.id, option.value)}
                          aria-label={`${question.text} - ${option.label}`}
                          className="sr-only peer"
                        />
                        <span
                          className={cn(
                            "flex h-10 w-10 items-center justify-center rounded-md border transition-colors",
                            answersById.get(question.id) === option.value
                              ? "border-blue-600 bg-blue-600 text-white"
                              : "border-border bg-background text-muted-foreground"
                          )}
                        />
                      </label>
                    ))}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 md:hidden">
        <div className="rounded-2xl border border-border/60 bg-card/60 px-4 py-3">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[11px] font-semibold text-emerald-600">High Achiever</span>
            <div className="h-1.5 flex-1 rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500" />
          </div>
        </div>
        {questions.map((question, index) => {
          const inputName = `question-${domain.id}-${question.id}`;
          return (
            <div key={question.id} className="rounded-2xl border border-border/60 bg-card/60 px-4 py-4">
              <div className="text-sm text-foreground">
                <span className="text-muted-foreground mr-2">{index + 1}.</span>
                {question.text}
              </div>
              <div className="mt-4 flex items-center justify-between gap-2">
                    {scaleOptions.map((option) => (
                      <label
                        key={option.label}
                        htmlFor={`${inputName}-${option.label}`}
                        className="flex flex-1 cursor-pointer items-center justify-center"
                        title={option.description}
                        aria-label={option.description}
                        onClick={() => onAnswer(question.id, option.value)}
                      >
                    <input
                      type="radio"
                      name={inputName}
                      value={option.label}
                      id={`${inputName}-${option.label}`}
                      checked={answersById.get(question.id) === option.value}
                      onChange={() => onAnswer(question.id, option.value)}
                      aria-label={`${question.text} - ${option.label}`}
                      className="sr-only peer"
                    />
                    <span
                      className={cn(
                        "flex h-12 w-12 items-center justify-center rounded-md border transition-colors",
                        answersById.get(question.id) === option.value
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-border bg-background text-muted-foreground"
                      )}
                    />
                  </label>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
