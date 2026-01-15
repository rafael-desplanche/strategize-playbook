import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { LeadCaptureForm } from "@/components/benchmark/LeadCaptureForm";
import { OnboardingFlow } from "@/components/benchmark/OnboardingFlow";
import { QuestionCard } from "@/components/benchmark/QuestionCard";
import { ProgressBar } from "@/components/benchmark/ProgressBar";
import { DomainProgress } from "@/components/benchmark/DomainProgress";
import { ResultsPreview } from "@/components/benchmark/ResultsPreview";
import { domains, industries } from "@/data/questions";
import { calculateScores, Answer, BenchmarkResult } from "@/lib/scoring";
import { BarChart3 } from "lucide-react";
import { toast } from "sonner";

type Step = "capture" | "onboarding" | "questions" | "results";

interface UserData {
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
  const [currentDomainIndex, setCurrentDomainIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);

  // Flatten all questions for progress tracking
  const allQuestions = useMemo(() => {
    return domains.flatMap((domain) => 
      domain.questions.map((q) => ({ ...q, domainIcon: domain.icon }))
    );
  }, []);

  const currentDomain = domains[currentDomainIndex];
  const currentQuestion = currentDomain?.questions[currentQuestionIndex];
  const totalAnswered = answers.length;
  const totalQuestions = allQuestions.length;

  const completedDomains = useMemo(() => {
    return domains
      .filter((_, index) => index < currentDomainIndex)
      .map((d) => d.id);
  }, [currentDomainIndex]);

  const handleLeadCapture = (data: { email: string; phone: string }) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStep("onboarding");
  };

  const handleOnboardingComplete = (data: { industry: string; companySize: string; role: string }) => {
    setUserData((prev) => ({ ...prev, ...data }));
    setStep("questions");
  };

  const handleAnswer = (value: number | "unknown" | "not_applicable") => {
    const newAnswer: Answer = {
      questionId: currentQuestion.id,
      value,
    };
    
    setAnswers((prev) => [...prev, newAnswer]);

    // Move to next question or domain
    if (currentQuestionIndex < currentDomain.questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else if (currentDomainIndex < domains.length - 1) {
      setCurrentDomainIndex((prev) => prev + 1);
      setCurrentQuestionIndex(0);
    } else {
      // All done - show results
      setStep("results");
    }
  };

  const result: BenchmarkResult | null = useMemo(() => {
    if (step === "results" && userData.industry) {
      return calculateScores(answers, userData.industry);
    }
    return null;
  }, [step, answers, userData.industry]);

  const industryLabel = useMemo(() => {
    return industries.find((i) => i.value === userData.industry)?.label || userData.industry || "";
  }, [userData.industry]);

  const handleUnlock = () => {
    toast.info("Accès premium bientôt disponible", {
      description: "Nous vous contacterons lorsque l'accès complet sera disponible.",
    });
  };

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
              <span className="font-display font-bold text-foreground">DataPulse</span>
            </button>
            
            {step === "questions" && (
              <ProgressBar 
                current={totalAnswered + 1} 
                total={totalQuestions} 
                showLabel={false}
                className="w-32 sm:w-48"
              />
            )}
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

        {step === "questions" && currentQuestion && (
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
              <h3 className="text-sm font-medium text-primary">
                {currentDomain.icon} {currentDomain.name}
              </h3>
              <p className="text-sm text-muted-foreground">
                {currentDomain.description}
              </p>
            </div>

            {/* Question card */}
            <QuestionCard
              key={currentQuestion.id}
              question={currentQuestion}
              domainIcon={currentDomain.icon}
              questionNumber={currentQuestionIndex + 1}
              totalQuestions={currentDomain.questions.length}
              onAnswer={handleAnswer}
            />

            {/* Progress */}
            <div className="mt-10">
              <ProgressBar 
                current={totalAnswered + 1} 
                total={totalQuestions}
              />
            </div>
          </div>
        )}

        {step === "results" && result && (
          <ResultsPreview
            result={result}
            industry={userData.industry || ""}
            industryLabel={industryLabel}
            onUnlock={handleUnlock}
          />
        )}
      </main>
    </div>
  );
}
