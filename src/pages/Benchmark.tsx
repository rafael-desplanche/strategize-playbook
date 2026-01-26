import { useState, useMemo, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LeadCaptureForm } from "@/components/benchmark/LeadCaptureForm";
import { OnboardingFlow } from "@/components/benchmark/OnboardingFlow";
import { QuestionTable } from "@/components/benchmark/QuestionTable";
import { ProgressBar } from "@/components/benchmark/ProgressBar";
import { DomainProgress } from "@/components/benchmark/DomainProgress";
import { ResultsPreview } from "@/components/benchmark/ResultsPreview";
import { domains, industries } from "@/data/questions";
import { calculateScores, Answer, BenchmarkResult } from "@/lib/scoring";
import { Button } from "@/components/ui/button";
import { ArrowLeft, BarChart3 } from "lucide-react";

type Step = "capture" | "onboarding" | "questions" | "loading" | "results";

const RESULTS_LOADING_DELAY_MS = 2000;

interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  industry: string;
  companySize: string;
  role: string;
}

export default function Benchmark() {
  const navigate = useNavigate();
  const [step, setStep] = useState<Step>("capture");
  const [userData, setUserData] = useState<Partial<UserData>>({});
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [result, setResult] = useState<BenchmarkResult | null>(null);
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const loadingTimeoutRef = useRef<number | null>(null);

  // Flatten all questions for progress tracking
  const allQuestions = useMemo(() => {
    return domains.flatMap((domain) => domain.questions);
  }, []);

  const currentDomain = domains[currentDomainIndex];
  const answersById = useMemo(() => {
    return new Map(answers.map((answer) => [answer.questionId, answer.value]));
  }, [answers]);
  const totalAnswered = answersById.size;
  const totalQuestions = allQuestions.length;

  const completedDomains = useMemo(() => {
    return domains
      .filter((_, index) => index < currentDomainIndex)
      .map((d) => d.id);
  }, [currentDomainIndex]);

  const handleLeadCapture = (data: { firstName: string; lastName: string; email: string; phone: string }) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStep("onboarding");
  };

  const handleOnboardingComplete = (data: { industry: string; companySize: string; role: string }) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStep("questions");
  };

  const handleAnswer = (questionId: string, value: Answer["value"]) => {
    setAnswers((prev) => {
      const existingIndex = prev.findIndex((answer) => answer.questionId === questionId);
      if (existingIndex === -1) {
        return [...prev, { questionId, value }];
      }
      const updated = [...prev];
      updated[existingIndex] = { questionId, value };
      return updated;
    });
  };

  const isCurrentDomainComplete = useMemo(() => {
    if (!currentDomain) return false;
    return currentDomain.questions.every((question) => answersById.has(question.id));
  }, [answersById, currentDomain]);

  const resolvedIndustry = userData.industry || "other";

  const industryLabel = useMemo(() => {
    return industries.find((i) => i.value === resolvedIndustry)?.label || resolvedIndustry;
  }, [resolvedIndustry]);


  const handleBack = () => {
    if (step === "results") {
      setStep("questions");
      return;
    }

    if (step === "loading") {
      setStep("questions");
      return;
    }

    if (step === "questions") {
      if (currentDomainIndex > 0) {
        setCurrentDomainIndex((prev) => prev - 1);
        return;
      }

      setStep("onboarding");
      return;
    }

    if (step === "onboarding") {
      setStep("capture");
    }
  };

  useEffect(() => {
    if (step !== "loading") return;
    if (loadingTimeoutRef.current) {
      window.clearTimeout(loadingTimeoutRef.current);
    }
    loadingTimeoutRef.current = window.setTimeout(() => {
      setStep("results");
    }, RESULTS_LOADING_DELAY_MS);

    return () => {
      if (loadingTimeoutRef.current) {
        window.clearTimeout(loadingTimeoutRef.current);
        loadingTimeoutRef.current = null;
      }
    };
  }, [step]);

  useEffect(() => {
    if (step === "loading" || step === "results") {
      setResult(calculateScores(answers, resolvedIndustry));
    }
    if (step === "questions") {
      setResult(null);
    }
  }, [step, answers, resolvedIndustry]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <button 
              onClick={() => navigate("/")}
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">BayBridgeDigital</span>
            </button>
            
            <div className="flex items-center gap-3">
              {step !== "capture" && step !== "loading" && (
                <Button variant="outline" size="sm" onClick={handleBack}>
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Retour
                </Button>
              )}
              {step === "questions" && (
                <ProgressBar 
                  current={totalAnswered} 
                  total={totalQuestions} 
                  showLabel={false}
                  className="w-32 sm:w-48"
                />
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main content */}
      <main className="max-w-4xl mx-auto px-6 py-10">
        {step === "capture" && (
          <div className="max-w-md mx-auto">
            <LeadCaptureForm onSubmit={handleLeadCapture} />
          </div>
        )}

        {step === "onboarding" && (
          <OnboardingFlow onComplete={handleOnboardingComplete} />
        )}

        {step === "questions" && currentDomain && (
          <div>
            {/* Domain progress */}
            <div className="mb-8">
              <DomainProgress 
                currentDomainIndex={currentDomainIndex}
                completedDomains={completedDomains}
              />
            </div>

            {/* Current domain indicator */}
            <div className="mb-6">
              <h3 className="text-sm font-medium text-primary">{currentDomain.name}</h3>
              <p className="text-sm text-muted-foreground">
                {currentDomain.description}
              </p>
              <p className="text-xs font-semibold text-muted-foreground mt-2">
                {currentDomain.questions.length} questions
              </p>
            </div>

            {/* Questions table */}
            <QuestionTable
              domain={currentDomain}
              answersById={answersById}
              onAnswer={handleAnswer}
            />

            <div className="mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-end gap-3">
              <Button
                onClick={() => {
                  if (!isCurrentDomainComplete) return;
                  if (currentDomainIndex < domains.length - 1) {
                    setCurrentDomainIndex((prev) => prev + 1);
                  } else {
                    setStep("loading");
                  }
                }}
                disabled={!isCurrentDomainComplete}
                className="w-full sm:w-auto btn-primary text-primary-foreground font-semibold px-8 py-6"
              >
                {currentDomainIndex < domains.length - 1 ? "Catégorie suivante" : "Voir les résultats"}
              </Button>
            </div>

            {/* Progress */}
            <div className="mt-10">
              <ProgressBar 
                current={totalAnswered} 
                total={totalQuestions}
              />
            </div>
          </div>
        )}

        {step === "results" ? (
          result ? (
            <ResultsPreview
              result={result}
              answers={answers}
              userName={
                userData.firstName && userData.lastName
                  ? `${userData.firstName} ${userData.lastName}`
                  : userData.firstName || userData.lastName || ""
              }
              industryLabel={industryLabel}
            />
          ) : (
            <div className="rounded-2xl border border-border/60 bg-card/60 p-6 text-center">
              <h2 className="text-xl font-display font-semibold text-foreground mb-2">
                Résultats indisponibles
              </h2>
              <p className="text-sm text-muted-foreground">
                Nous préparons votre rapport. Merci de réessayer ou de revenir à l’étape précédente.
              </p>
            </div>
          )
        ) : null}
        {step === "loading" && (
          <div className="flex flex-col items-center justify-center gap-4 rounded-2xl border border-border/60 bg-card/60 px-6 py-16 text-center">
            <div className="h-10 w-10 animate-spin rounded-full border-4 border-primary/30 border-t-primary" />
            <p className="text-sm font-medium text-muted-foreground">
              Analyse de votre maturité Data & IA en cours…
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
