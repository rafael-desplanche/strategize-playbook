import { Domain } from "@/data/questions";

interface QuestionTableProps {
  domain: Domain;
  answersById: Map<string, number>;
  onAnswer: (questionId: string, value: number) => void;
}

const scaleValues = [1, 2, 3, 4, 5];

export function QuestionTable({ domain, answersById, onAnswer }: QuestionTableProps) {
  return (
    <div className="space-y-4 animate-fade-up">
      <div className="rounded-2xl border border-border/60 bg-card/60 overflow-hidden">
        <div className="overflow-x-auto">
          <div className="min-w-[640px]">
            <div className="sticky top-0 z-10 bg-card/95 backdrop-blur-sm">
              <div className="grid grid-cols-[minmax(280px,1fr)_repeat(5,56px)] gap-2 items-end px-4 pt-3 pb-2">
                <div />
                <div className="col-span-5 flex flex-col items-end gap-1">
                  <span className="text-[11px] font-semibold text-emerald-600">High Achiever</span>
                  <div className="h-1.5 w-full rounded-full bg-gradient-to-r from-red-500 via-amber-400 to-emerald-500" />
                </div>
              </div>
              <div className="grid grid-cols-[minmax(280px,1fr)_repeat(5,56px)] gap-2 items-center px-4 py-3 bg-muted/40 text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                <div>Questions</div>
                {scaleValues.map((value) => (
                  <div key={value} className="text-center">
                    {value}
                  </div>
                ))}
              </div>
            </div>
            <div className="divide-y divide-border/70">
              {domain.questions.map((question, index) => (
                <div
                  key={question.id}
                  className="grid grid-cols-[minmax(280px,1fr)_repeat(5,56px)] gap-2 items-center px-4 py-4 text-sm"
                >
                  <div className="text-foreground">
                    <span className="text-muted-foreground mr-2">{index + 1}.</span>
                    {question.text}
                  </div>
                  {scaleValues.map((value) => (
                    <label key={value} className="flex items-center justify-center">
                      <input
                        type="radio"
                        name={`question-${question.id}`}
                        value={value}
                        checked={answersById.get(question.id) === value}
                        onChange={() => onAnswer(question.id, value)}
                        aria-label={`${question.text} - ${value}`}
                        className="h-4 w-4 text-primary focus-visible:ring-primary"
                      />
                    </label>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
