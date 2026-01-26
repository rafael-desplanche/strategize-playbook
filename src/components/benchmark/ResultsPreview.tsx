import { useMemo, useState } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { BadgeDisplay } from "@/components/benchmark/BadgeDisplay";
import { MarketPosition } from "@/components/benchmark/MarketPosition";
import { RadarChart } from "@/components/benchmark/RadarChart";
import { ScoreGauge } from "@/components/benchmark/ScoreGauge";
import { Answer, BenchmarkResult, getMaturityLabel } from "@/lib/scoring";
import { cn } from "@/lib/utils";
import { domains } from "@/data/questions";

interface ResultsPreviewProps {
  result: BenchmarkResult;
  answers: Answer[];
  userName: string;
  industryLabel: string;
}

type TabKey = "overview" | string;

const positionBadgeStyles: Record<string, string> = {
  "High Achiever": "bg-emerald-100 text-emerald-700 border-emerald-200",
  High: "bg-blue-100 text-blue-700 border-blue-200",
  Medium: "bg-amber-100 text-amber-700 border-amber-200",
  Low: "bg-rose-100 text-rose-700 border-rose-200",
};

const statusCopy = {
  below: "En dessous du benchmark sectoriel",
  aligned: "Aligné avec le benchmark sectoriel",
  above: "Au-dessus du benchmark sectoriel",
} as const;

const getPositionLabel = (percentage: number) => {
  if (percentage >= 85) return "High Achiever";
  if (percentage >= 65) return "High";
  if (percentage >= 40) return "Medium";
  return "Low";
};

const getCategorySummary = (percentage: number) => {
  if (percentage >= 75) {
    return {
      label: "Solide",
      description: "Les fondamentaux sont solides et les pratiques sont bien industrialisées.",
      actions: [
        "Capitaliser sur les initiatives à fort ROI.",
        "Industrialiser les usages avancés avec des KPI partagés.",
      ],
    };
  }
  if (percentage >= 50) {
    return {
      label: "Intermédiaire",
      description: "Les bases sont en place mais la cohérence et l’alignement restent perfectibles.",
      actions: [
        "Aligner les parties prenantes sur un plan d’exécution commun.",
        "Formaliser les standards et les rituels de gouvernance.",
      ],
    };
  }
  return {
    label: "Critique",
    description: "Le niveau actuel crée des frictions majeures et freine la performance globale.",
    actions: [
      "Prioriser des quick wins pour sécuriser les fondamentaux.",
      "Mettre en place une feuille de route progressive et mesurable.",
    ],
  };
};

export function ResultsPreview({ result, answers, userName, industryLabel }: ResultsPreviewProps) {
  const [activeTab, setActiveTab] = useState<TabKey>("overview");

  const answerMap = useMemo(() => new Map(answers.map((answer) => [answer.questionId, answer.value])), [answers]);
  const domainScoreMap = useMemo(
    () => new Map(result.domainScores.map((domain) => [domain.domainId, domain])),
    [result.domainScores]
  );

  const overviewPositionLabel = getPositionLabel(result.globalPercentage);
  const maturityLabel = getMaturityLabel(result.maturityLevel);

  const domainScoreData = result.domainScores.map((domain) => ({
    name: domain.domainName,
    percentage: domain.percentage,
    average: domain.totalQuestions > 0 ? Number((domain.score / domain.totalQuestions).toFixed(1)) : 0,
  }));

  const lineSeries = domainScoreData.map((domain, index) => ({
    index: index + 1,
    name: domain.name.split(" ")[0],
    average: domain.average,
  }));

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

  const activeDomain = activeTab === "overview"
    ? null
    : domains.find((domain) => domain.id === activeTab) || null;
  const activeDomainScore = activeDomain ? domainScoreMap.get(activeDomain.id) : null;
  const breakdown = activeDomain ? getDomainBreakdown(activeDomain.id) : null;
  const categorySummary = activeDomainScore ? getCategorySummary(activeDomainScore.percentage) : null;
  const breakdownData = breakdown
    ? [
        { name: "NSP", value: breakdown.counts.nsp },
        { name: "1", value: breakdown.counts.one },
        { name: "2", value: breakdown.counts.two },
        { name: "3", value: breakdown.counts.three },
        { name: "4", value: breakdown.counts.four },
        { name: "5", value: breakdown.counts.five },
      ]
    : [];

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 rounded-3xl border border-border/60 bg-card/70 p-6">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Dashboard résultats</span>
          <div className="flex flex-col gap-2 md:flex-row md:items-end md:justify-between">
            <div>
              <h1 className="text-3xl font-display font-semibold text-foreground">
                {userName ? `Bienvenue ${userName}` : "Votre diagnostic Data & IA"}
              </h1>
              <p className="text-sm text-muted-foreground">
                Vue analytique complète de votre maturité et des leviers d’action prioritaires.
              </p>
            </div>
            <div
              className={cn(
                "inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-semibold",
                positionBadgeStyles[overviewPositionLabel]
              )}
            >
              {overviewPositionLabel}
            </div>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition",
              activeTab === "overview"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/50 text-muted-foreground hover:bg-muted"
            )}
          >
            Overview
          </button>
          {domains.map((domain) => (
            <button
              key={domain.id}
              type="button"
              onClick={() => setActiveTab(domain.id)}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-medium transition",
                activeTab === domain.id
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted/50 text-muted-foreground hover:bg-muted"
              )}
            >
              {domain.name}
            </button>
          ))}
        </div>
      </div>

      {activeTab === "overview" && (
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Score global</p>
                  <h2 className="text-2xl font-display font-semibold text-foreground">{result.globalScore}</h2>
                  <p className="text-sm text-muted-foreground">Maturité {maturityLabel}</p>
                </div>
                <ScoreGauge score={result.globalScore} size="lg" />
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Fiabilité des réponses</p>
                  <p className="text-lg font-semibold text-foreground">{result.reliabilityIndex}%</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Benchmark high achievers</p>
                  <p className="text-lg font-semibold text-foreground">{result.highAchieverRate}%</p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Positionnement marché</p>
              <div className="mt-4 space-y-4">
                <MarketPosition percentile={result.marketPosition} industry={industryLabel} />
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                    <p className="text-xs text-muted-foreground">Position sectorielle</p>
                    <p className="text-sm font-semibold text-foreground">
                      {statusCopy[result.highAchieverStatus]}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                    <p className="text-xs text-muted-foreground">Score moyen marché</p>
                    <p className="text-sm font-semibold text-foreground">{result.marketAverageScore}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-display font-semibold text-foreground">Comparaison des scores</h3>
                <span className="text-xs text-muted-foreground">Par catégorie</span>
              </div>
              <div className="mt-4 h-[260px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={domainScoreData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} interval={0} angle={-10} dy={8} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--background))", borderRadius: 8 }}
                      formatter={(value: number) => [`${value}%`, "Score"]}
                    />
                    <Bar dataKey="percentage" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground">Équilibre global</h3>
              <p className="text-sm text-muted-foreground">
                Radar des catégories pour identifier les écarts de maturité.
              </p>
              <RadarChart domainScores={result.domainScores} />
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground">Progression de maturité</h3>
              <p className="text-sm text-muted-foreground">Évolution relative par catégorie (score 0-5).</p>
              <div className="mt-4 h-[220px]">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={lineSeries}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} domain={[0, 5]} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--background))", borderRadius: 8 }}
                      formatter={(value: number) => [`${value}`, "Score"]}
                    />
                    <Line type="monotone" dataKey="average" stroke="hsl(var(--primary))" strokeWidth={2} />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground">Synthèse des insights</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-2xl border border-emerald-200/60 bg-emerald-50/60 p-4">
                  <p className="text-xs font-semibold text-emerald-700">Forces principales</p>
                  <p className="text-sm text-emerald-900">{result.strengths.join(", ")}</p>
                </div>
                <div className="rounded-2xl border border-amber-200/60 bg-amber-50/60 p-4">
                  <p className="text-xs font-semibold text-amber-700">Axes prioritaires</p>
                  <p className="text-sm text-amber-900">{result.risks.join(", ")}</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">Badges</p>
                  <BadgeDisplay badges={result.badges} />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab !== "overview" && activeDomain && activeDomainScore && breakdown && categorySummary && (
        <div className="space-y-8">
          <div className="grid gap-6 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Catégorie</p>
              <h2 className="text-2xl font-display font-semibold text-foreground">{activeDomain.name}</h2>
              <p className="text-sm text-muted-foreground">{activeDomain.description}</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-3">
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Score</p>
                  <p className="text-lg font-semibold text-foreground">{activeDomainScore.percentage}%</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Réponses analysées</p>
                  <p className="text-lg font-semibold text-foreground">
                    {activeDomainScore.answeredQuestions}/{activeDomainScore.totalQuestions}
                  </p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Positionnement</p>
                  <p className="text-lg font-semibold text-foreground">{categorySummary.label}</p>
                </div>
              </div>
              <div className="mt-6 rounded-2xl border border-border/60 bg-background/80 p-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">Analyse synthétique</p>
                <p className="text-sm text-muted-foreground">{categorySummary.description}</p>
              </div>
            </div>

            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground">Répartition des réponses</h3>
              <div className="mt-4 h-[240px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={breakdownData}>
                    <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
                    <XAxis dataKey="name" tick={{ fontSize: 11 }} />
                    <YAxis tick={{ fontSize: 11 }} />
                    <Tooltip
                      contentStyle={{ background: "hsl(var(--background))", borderRadius: 8 }}
                      formatter={(value: number) => [value, "Réponses"]}
                    />
                    <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground">Insights actionnables</h3>
              <ul className="mt-4 space-y-3 text-sm text-muted-foreground">
                {categorySummary.actions.map((action) => (
                  <li key={action} className="flex items-start gap-2">
                    <span className="mt-1 h-2 w-2 rounded-full bg-primary" />
                    <span>{action}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-3xl border border-border/60 bg-card/60 p-6">
              <h3 className="text-lg font-display font-semibold text-foreground">Focus score</h3>
              <p className="text-sm text-muted-foreground">
                Comparaison rapide avec le score global pour identifier les écarts prioritaires.
              </p>
              <div className="mt-6 space-y-4">
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Score catégorie</p>
                  <p className="text-lg font-semibold text-foreground">{activeDomainScore.percentage}%</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Score global</p>
                  <p className="text-lg font-semibold text-foreground">{result.globalPercentage}%</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-background/80 p-4">
                  <p className="text-xs text-muted-foreground">Écart</p>
                  <p className="text-lg font-semibold text-foreground">
                    {activeDomainScore.percentage - result.globalPercentage} pts
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
