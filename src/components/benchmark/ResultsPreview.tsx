import { useMemo, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Answer, BenchmarkResult, getMaturityLabel } from "@/lib/scoring";
import { ScoreGauge } from "./ScoreGauge";
import { MarketPosition } from "./MarketPosition";
import { BadgeDisplay } from "./BadgeDisplay";
import { WorkshopModal } from "./WorkshopModal";
import { MaturityCurve } from "./MaturityCurve";
import { TrendingUp, AlertTriangle, Calendar, MessageSquare } from "lucide-react";
import { domains } from "@/data/questions";
import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

interface ResultsPreviewProps {
  result: BenchmarkResult;
  answers: Answer[];
  userName: string;
  industryLabel: string;
}

type DashboardSection = "overview" | string;

const getPositionLabel = (percentage: number) => {
  if (percentage >= 85) return "High Achiever";
  if (percentage >= 65) return "High";
  if (percentage >= 40) return "Medium";
  return "Low";
};

export function ResultsPreview({ result, answers, userName, industryLabel }: ResultsPreviewProps) {
  const [workshopOpen, setWorkshopOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [activeSection, setActiveSection] = useState<DashboardSection>("overview");
  const reportRef = useRef<HTMLDivElement | null>(null);
  const industryStatusCopy = {
    below: "En dessous du benchmark sectoriel",
    aligned: "Aligné avec le benchmark sectoriel",
    above: "Au-dessus du benchmark sectoriel",
  } as const;
  const domainScoreMap = useMemo(
    () => new Map(result.domainScores.map((domain) => [domain.domainId, domain])),
    [result.domainScores]
  );
  const getDomainAverage = (domainId: string) => {
    const domain = domainScoreMap.get(domainId);
    if (!domain || domain.answeredQuestions === 0) return 0;
    return Number((domain.score / domain.answeredQuestions).toFixed(1));
  };

  const governanceScore = getDomainAverage("governance");
  const dataManagementScore = getDomainAverage("data_management");
  const cultureScore = getDomainAverage("culture_people");
  const domainAverages = [
    getDomainAverage("strategy"),
    governanceScore,
    cultureScore,
    dataManagementScore,
  ];

  const isUnbalanced = Math.max(...domainAverages) - Math.min(...domainAverages) >= 1;
  const advancedAllowed = governanceScore > 3.5 && dataManagementScore > 3.5 && cultureScore > 3.5;
  let mappedScore = result.globalScore;
  let note: string | undefined;

  if (!advancedAllowed && mappedScore > 4.2) {
    mappedScore = 4.2;
    note = "Maturity is uneven across governance, data management, and people capabilities. The position is adjusted accordingly.";
  } else if (isUnbalanced) {
    mappedScore = Math.max(1, mappedScore - 0.2);
    note = "Uneven maturity across domains may slow down overall competitive advantage.";
  }

  const getStageLabel = (score: number) => {
    if (score <= 1.8) return "Excel / Basic BI";
    if (score <= 2.5) return "Business Intelligence";
    if (score <= 3.0) return "Data Warehousing";
    if (score <= 3.5) return "Data Science";
    if (score <= 4.2) return "Machine Learning";
    if (score <= 4.7) return "Full AI transformation";
    return "Generative AI & advanced use cases";
  };

  const getNextStage = (score: number) => {
    if (score <= 1.8) return "Business Intelligence";
    if (score <= 2.5) return "Data Warehousing";
    if (score <= 3.0) return "Data Science";
    if (score <= 3.5) return "Machine Learning";
    if (score <= 4.2) return "Full AI transformation";
    if (score <= 4.7) return "Generative AI & advanced use cases";
    return "Advanced AI use cases";
  };

  const currentStage = getStageLabel(mappedScore);
  const nextStage = getNextStage(mappedScore);
  const interpretation = [
    `Current maturity: ${currentStage}.`,
    "This level enables repeatable analytics and targeted AI use cases that improve decision speed and reliability.",
    `Next focus: move toward ${nextStage} by tightening governance, platform scalability, and skills adoption.`,
  ];

  const overviewPositionLabel = getPositionLabel(result.globalPercentage);
  const stageLabel = getStageLabel(result.globalScore);

  const answerMap = useMemo(() => new Map(answers.map((answer) => [answer.questionId, answer.value])), [answers]);
  const getDomainBreakdown = (domainId: string) => {
    const domain = domains.find((item) => item.id === domainId);
    const counts = { nsp: 0, one: 0, two: 0, three: 0, four: 0, five: 0 };
    if (!domain) return { domain, counts, total: 0 };
    domain.questions.forEach((question) => {
      const value = answerMap.get(question.id);
      switch (value) {
        case 0:
          counts.nsp += 1;
          break;
        case 1:
          counts.one += 1;
          break;
        case 2:
          counts.two += 1;
          break;
        case 3:
          counts.three += 1;
          break;
        case 4:
          counts.four += 1;
          break;
        case 5:
          counts.five += 1;
          break;
        default:
          counts.nsp += 1;
      }
    });
    return { domain, counts, total: domain.questions.length };
  };

  const activeDomain = activeSection === "overview"
    ? null
    : domains.find((domain) => domain.id === activeSection) || null;
  const activeDomainScore = activeDomain ? domainScoreMap.get(activeDomain.id) : null;
  const breakdown = activeDomain ? getDomainBreakdown(activeDomain.id) : null;
  const highRatio = breakdown && breakdown.total > 0
    ? (breakdown.counts.four + breakdown.counts.five) / breakdown.total
    : 0;
  const lowRatio = breakdown && breakdown.total > 0
    ? (breakdown.counts.one + breakdown.counts.two) / breakdown.total
    : 0;
  const nspRatio = breakdown && breakdown.total > 0 ? breakdown.counts.nsp / breakdown.total : 0;
  const domainPosition = activeDomainScore ? getPositionLabel(activeDomainScore.percentage) : "";
  const recommendations = activeDomainScore
    ? activeDomainScore.percentage >= 75
      ? [
          "Capitaliser sur les pratiques avancées déjà en place.",
          "Industrialiser les usages pour générer plus de valeur.",
        ]
      : activeDomainScore.percentage >= 50
      ? [
          "Structurer les processus clés pour gagner en régularité.",
          "Renforcer l’alignement entre les équipes et les objectifs.",
        ]
      : [
          "Prioriser les fondamentaux pour sécuriser les usages.",
          "Mettre en place des rituels de pilotage et de gouvernance.",
        ]
    : [];

  const handleExportPdf = async () => {
    if (!reportRef.current || isExporting) return;
    setIsExporting(true);
    const canvas = await html2canvas(reportRef.current, {
      scale: 2,
      useCORS: true,
      backgroundColor: null,
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");
    const pageWidth = pdf.internal.pageSize.getWidth();
    const pageHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = pageWidth;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let position = 0;

    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);

    while (imgHeight + position > pageHeight) {
      position -= pageHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    }

    pdf.save("baybridgedigital-report.pdf");
    setIsExporting(false);
  };

  return (
    <div className="animate-fade-up">
      <div className="flex justify-end mb-4">
        <Button onClick={handleExportPdf} disabled={isExporting}>
          Exporter en PDF
        </Button>
      </div>
      <div ref={reportRef} className="rounded-3xl border border-border/60 bg-card/60">
        <div className="flex flex-col lg:flex-row">
          <aside className="border-b border-border/60 bg-background/60 px-4 py-6 lg:w-72 lg:border-b-0 lg:border-r">
            <div className="space-y-4">
              <div>
                <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Résultat global</h2>
                <button
                  type="button"
                  onClick={() => setActiveSection("overview")}
                  className={`mt-3 w-full rounded-xl px-3 py-2 text-left text-sm font-semibold transition ${
                    activeSection === "overview"
                      ? "bg-primary/10 text-primary"
                      : "text-foreground hover:bg-muted/60"
                  }`}
                >
                  Overview
                </button>
              </div>

              <div className="rounded-xl border border-border/60 bg-background/80 px-3 py-3">
                <p className="text-xs text-muted-foreground">Positionnement</p>
                <p className="text-sm font-semibold text-foreground">{overviewPositionLabel}</p>
                <p className="mt-2 text-xs text-muted-foreground">Étape actuelle</p>
                <p className="text-sm font-medium text-foreground">{stageLabel}</p>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Chronologie</p>
                <div className="mt-3 space-y-2 text-xs text-muted-foreground">
                  <div className="flex items-center justify-between">
                    <span>Progression</span>
                    <span className="text-foreground font-medium">{result.globalPercentage}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-muted/60">
                    <div
                      className="h-2 rounded-full bg-primary"
                      style={{ width: `${result.globalPercentage}%` }}
                    />
                  </div>
                </div>
              </div>

              <div>
                <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Catégories du test</p>
                <div className="mt-3 space-y-1">
                  {domains.map((domain) => (
                    <button
                      key={domain.id}
                      type="button"
                      onClick={() => setActiveSection(domain.id)}
                      className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${
                        activeSection === domain.id
                          ? "bg-primary/10 text-primary"
                          : "text-foreground hover:bg-muted/60"
                      }`}
                    >
                      {domain.name}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          <section className="flex-1 px-6 py-8">
            {activeSection === "overview" && (
              <div className="space-y-8">
                <div>
                  <div className="inline-flex items-center gap-2 rounded-full bg-primary/10 px-4 py-2 text-primary text-sm font-medium">
                    <TrendingUp className="h-4 w-4" />
                    Benchmark complété
                  </div>
                  {userName && (
                    <p className="mt-3 text-sm font-medium text-muted-foreground">
                      Bravo {userName},
                    </p>
                  )}
                  <h1 className="mt-2 text-3xl font-display font-bold text-foreground">
                    Vue d’ensemble de votre maturité Data & IA
                  </h1>
                  <p className="mt-2 text-sm text-muted-foreground max-w-2xl">
                    Résumé synthétique de votre positionnement, forces clés et axes de progression prioritaires.
                  </p>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.8fr)]">
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <div className="flex flex-col items-center">
                      <ScoreGauge score={result.globalScore} size="lg" />
                      <div className="mt-4 text-center">
                        <p className="text-xl font-display font-semibold text-foreground">
                          Niveau : <span className="gradient-text">{getMaturityLabel(result.maturityLevel)}</span>
                        </p>
                        <p className="text-sm text-muted-foreground mt-1">
                          Indice de fiabilité : {result.reliabilityIndex}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Synthèse rapide</h3>
                    <div className="mt-4 space-y-3 text-sm text-muted-foreground">
                      <p>
                        <span className="font-semibold text-foreground">Forces principales :</span>{" "}
                        {result.strengths.join(", ")}.
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Axes prioritaires :</span>{" "}
                        {result.risks.join(", ")}.
                      </p>
                      <p>
                        <span className="font-semibold text-foreground">Positionnement :</span>{" "}
                        {industryStatusCopy[result.highAchieverStatus]}.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,0.6fr)] lg:items-start">
                  <MaturityCurve
                    score={mappedScore}
                    marketAverageScore={result.marketAverageScore}
                    label="Your organization"
                    note={note}
                  />
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <div className="space-y-2 text-sm text-muted-foreground">
                      {interpretation.map((line) => (
                        <p key={line}>{line}</p>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                  <h3 className="text-lg font-display font-semibold text-foreground mb-2">Benchmark industrie</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Industrie de référence : <span className="text-foreground font-medium">{industryLabel}</span>
                  </p>
                  <div className="grid gap-4 sm:grid-cols-3">
                    <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                      <p className="text-xs text-muted-foreground mb-1">High Achievers (industrie)</p>
                      <p className="text-2xl font-semibold text-foreground">{result.highAchieverRate}%</p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Votre position</p>
                      <p className="text-2xl font-semibold text-foreground">
                        {industryStatusCopy[result.highAchieverStatus]}
                      </p>
                    </div>
                    <div className="rounded-xl border border-border/60 bg-background/60 p-4">
                      <p className="text-xs text-muted-foreground mb-1">Score global (toutes réponses)</p>
                      <p className="text-2xl font-semibold text-foreground">{result.globalScore}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                  <MarketPosition percentile={result.marketPosition} industry={industryLabel} />
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                  <BadgeDisplay badges={result.badges} />
                </div>

                <div className="glass rounded-2xl p-6">
                  <div className="flex items-start gap-4">
                    {result.marketPosition >= 50 ? (
                      <div className="w-12 h-12 rounded-full bg-success/20 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="w-6 h-6 text-success" />
                      </div>
                    ) : (
                      <div className="w-12 h-12 rounded-full bg-warning/20 flex items-center justify-center flex-shrink-0">
                        <AlertTriangle className="w-6 h-6 text-warning" />
                      </div>
                    )}
                    <div>
                      <h3 className="font-display font-semibold text-foreground mb-2">
                        Insight clé
                      </h3>
                      <p className="text-muted-foreground">
                        {result.marketPosition >= 75 ? (
                          <>Votre maturité data vous place dans le <strong className="text-success">top quartile</strong> de votre secteur. Vos points forts : <strong>{result.strengths.join(", ")}</strong>.</>
                        ) : result.marketPosition >= 50 ? (
                          <>Vous êtes au-dessus de la médiane du marché. Accélérez sur <strong className="text-warning">{result.risks[0]}</strong> pour rejoindre les leaders.</>
                        ) : (
                          <>Attention : vous êtes en retard sur <strong className="text-destructive">{result.risks.join(" et ")}</strong>. Des actions rapides sont nécessaires.</>
                        )}
                      </p>
                    </div>
                  </div>
                </div>

                <div 
                  onClick={() => setWorkshopOpen(true)}
                  className="glass rounded-2xl p-6 cursor-pointer card-interactive border-accent/20"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center flex-shrink-0">
                      <MessageSquare className="w-6 h-6 text-accent" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-display font-semibold text-foreground mb-1">
                        {result.maturityLevel <= 2 
                          ? "Clarifier vos priorités avec un expert"
                          : result.maturityLevel <= 3
                          ? "Valider votre positionnement"
                          : "Accélérer vers le niveau supérieur"
                        }
                      </h3>
                      <p className="text-sm text-muted-foreground mb-3">
                        {result.maturityLevel <= 2 
                          ? "Un workshop de 90 minutes pour identifier vos quick wins et structurer votre roadmap data."
                          : result.maturityLevel <= 3
                          ? "Challenger vos résultats et définir les actions prioritaires pour progresser."
                          : "Échangez avec nos experts pour transformer votre avance en avantage compétitif durable."
                        }
                      </p>
                      <Button variant="outline" size="sm" className="pointer-events-none">
                        <Calendar className="w-4 h-4 mr-2" />
                        Réserver un créneau
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeDomain && activeDomainScore && breakdown && (
              <div className="space-y-8">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Analyse par catégorie</p>
                  <h2 className="mt-2 text-2xl font-display font-bold text-foreground">{activeDomain.name}</h2>
                  <p className="mt-2 text-sm text-muted-foreground">{activeDomain.description}</p>
                </div>

                <div className="grid gap-6 lg:grid-cols-3">
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <p className="text-xs text-muted-foreground">Score catégorie</p>
                    <p className="text-3xl font-semibold text-foreground mt-2">{activeDomainScore.score}</p>
                    <p className="text-sm text-muted-foreground mt-1">{activeDomainScore.percentage}% • {domainPosition}</p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <p className="text-xs text-muted-foreground">Réponses hautes (4-5)</p>
                    <p className="text-3xl font-semibold text-foreground mt-2">
                      {breakdown.counts.four + breakdown.counts.five}
                    </p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.round(highRatio * 100)}% des réponses
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <p className="text-xs text-muted-foreground">Réponses NSP</p>
                    <p className="text-3xl font-semibold text-foreground mt-2">{breakdown.counts.nsp}</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      {Math.round(nspRatio * 100)}% des réponses
                    </p>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Répartition des réponses</h3>
                  <div className="mt-4 grid gap-3 sm:grid-cols-3 lg:grid-cols-6">
                    {[
                      { label: "NSP", value: breakdown.counts.nsp },
                      { label: "1", value: breakdown.counts.one },
                      { label: "2", value: breakdown.counts.two },
                      { label: "3", value: breakdown.counts.three },
                      { label: "4", value: breakdown.counts.four },
                      { label: "5", value: breakdown.counts.five },
                    ].map((item) => (
                      <div key={item.label} className="rounded-xl border border-border/60 bg-background/60 p-3 text-center">
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-lg font-semibold text-foreground">{item.value}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid gap-6 lg:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Points forts</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      <li>{highRatio >= 0.5 ? "Adoption avancée sur une majorité des sujets." : "Quelques fondations solides déjà en place."}</li>
                      <li>{nspRatio < 0.2 ? "Bonne clarté sur les pratiques existantes." : "Clarté partielle sur certains usages."}</li>
                    </ul>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Axes d’amélioration</h3>
                    <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                      <li>{lowRatio >= 0.4 ? "Prioriser les bas niveaux pour réduire les écarts." : "Renforcer la régularité sur les pratiques intermédiaires."}</li>
                      <li>{nspRatio >= 0.3 ? "Clarifier les responsabilités et la documentation." : "Formaliser les processus pour stabiliser les acquis."}</li>
                    </ul>
                  </div>
                </div>

                <div className="rounded-2xl border border-border/60 bg-background/80 p-6">
                  <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">Recommandations concrètes</h3>
                  <ul className="mt-3 space-y-2 text-sm text-muted-foreground list-disc list-inside">
                    {recommendations.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </section>
        </div>
      </div>
      <WorkshopModal 
        open={workshopOpen} 
        onOpenChange={setWorkshopOpen} 
        context="results"
        maturityLevel={result.maturityLevel}
      />
    </div>
  );
}
