import { domains } from "@/data/questions";

export interface DomainScore {
  domainId: string;
  domainName: string;
  score: number;
  maxScore: number;
  percentage: number;
  answeredQuestions: number;
  totalQuestions: number;
}

export interface BenchmarkResult {
  globalScore: number;
  globalPercentage: number;
  domainScores: DomainScore[];
  marketPosition: number; // percentile vs market
  maturityLevel: 1 | 2 | 3 | 4 | 5;
  reliabilityIndex: number; // 0-100 based on answers
  badges: Badge[];
  strengths: string[];
  risks: string[];
}

export interface Badge {
  id: string;
  name: string;
  icon: string;
  description: string;
  type: "positive" | "warning" | "achievement";
}

export interface Answer {
  questionId: string;
  value: number | "unknown";
}

// Market benchmark data by industry (simulated)
const industryBenchmarks: Record<string, { mean: number; p25: number; p50: number; p75: number; p90: number }> = {
  finance: { mean: 3.2, p25: 2.5, p50: 3.0, p75: 3.8, p90: 4.3 },
  retail: { mean: 2.8, p25: 2.1, p50: 2.7, p75: 3.4, p90: 4.0 },
  manufacturing: { mean: 2.5, p25: 1.9, p50: 2.4, p75: 3.1, p90: 3.7 },
  healthcare: { mean: 2.7, p25: 2.0, p50: 2.6, p75: 3.3, p90: 3.9 },
  telecom: { mean: 3.0, p25: 2.3, p50: 2.9, p75: 3.6, p90: 4.2 },
  energy: { mean: 2.6, p25: 2.0, p50: 2.5, p75: 3.2, p90: 3.8 },
  transport: { mean: 2.4, p25: 1.8, p50: 2.3, p75: 3.0, p90: 3.6 },
  public: { mean: 2.3, p25: 1.7, p50: 2.2, p75: 2.9, p90: 3.5 },
  tech: { mean: 3.5, p25: 2.8, p50: 3.4, p75: 4.1, p90: 4.6 },
  other: { mean: 2.7, p25: 2.0, p50: 2.6, p75: 3.3, p90: 3.9 },
};

export function calculateScores(answers: Answer[], industry: string): BenchmarkResult {
  const domainScores: DomainScore[] = [];
  let totalScore = 0;
  let totalMaxScore = 0;
  let answeredTotal = 0;
  let totalQuestions = 0;

  // Calculate score per domain
  for (const domain of domains) {
    const domainAnswers = answers.filter((a) => 
      domain.questions.some((q) => q.id === a.questionId)
    );
    
    let domainScore = 0;
    let answeredInDomain = 0;
    
    for (const answer of domainAnswers) {
      domainScore += answer.value;
      answeredInDomain++;
    }
    
    const maxScore = domain.questions.length * 5;
    const percentage = answeredInDomain > 0 
      ? Math.round((domainScore / (answeredInDomain * 5)) * 100) 
      : 0;
    
    domainScores.push({
      domainId: domain.id,
      domainName: domain.name,
      score: domainScore,
      maxScore,
      percentage,
      answeredQuestions: answeredInDomain,
      totalQuestions: domain.questions.length,
    });
    
    totalScore += domainScore;
    totalMaxScore += maxScore;
    answeredTotal += answeredInDomain;
    totalQuestions += domain.questions.length;
  }

  // Global percentage
  const globalPercentage = answeredTotal > 0 
    ? Math.round((totalScore / (answeredTotal * 5)) * 100) 
    : 0;
  
  // Global score (1-5 scale)
  const globalScore = answeredTotal > 0 
    ? Number((totalScore / answeredTotal).toFixed(1)) 
    : 0;

  // Market position calculation
  const benchmark = industryBenchmarks[industry] || industryBenchmarks.other;
  let marketPosition = 50;
  
  if (globalScore <= benchmark.p25) {
    marketPosition = Math.round((globalScore / benchmark.p25) * 25);
  } else if (globalScore <= benchmark.p50) {
    marketPosition = 25 + Math.round(((globalScore - benchmark.p25) / (benchmark.p50 - benchmark.p25)) * 25);
  } else if (globalScore <= benchmark.p75) {
    marketPosition = 50 + Math.round(((globalScore - benchmark.p50) / (benchmark.p75 - benchmark.p50)) * 25);
  } else if (globalScore <= benchmark.p90) {
    marketPosition = 75 + Math.round(((globalScore - benchmark.p75) / (benchmark.p90 - benchmark.p75)) * 15);
  } else {
    marketPosition = 90 + Math.round(((globalScore - benchmark.p90) / (5 - benchmark.p90)) * 10);
  }
  
  marketPosition = Math.max(1, Math.min(99, marketPosition));

  // Maturity level
  let maturityLevel: 1 | 2 | 3 | 4 | 5;
  if (globalScore < 1.5) maturityLevel = 1;
  else if (globalScore < 2.5) maturityLevel = 2;
  else if (globalScore < 3.5) maturityLevel = 3;
  else if (globalScore < 4.5) maturityLevel = 4;
  else maturityLevel = 5;

  // Reliability index based on answered questions
  const reliabilityIndex = Math.round((answeredTotal / totalQuestions) * 100);

  // Generate badges
  const badges = generateBadges(domainScores, globalScore, maturityLevel);

  // Identify strengths and risks
  const sortedDomains = [...domainScores].sort((a, b) => b.percentage - a.percentage);
  const strengths = sortedDomains.slice(0, 2).map((d) => d.domainName);
  const risks = sortedDomains.slice(-2).reverse().map((d) => d.domainName);

  return {
    globalScore,
    globalPercentage,
    domainScores,
    marketPosition,
    maturityLevel,
    reliabilityIndex,
    badges,
    strengths,
    risks,
  };
}

function generateBadges(domainScores: DomainScore[], globalScore: number, maturityLevel: number): Badge[] {
  const badges: Badge[] = [];

  // Data Strategy badge
  const strategyScore = domainScores.find((d) => d.domainId === "data-strategy");
  if (strategyScore && strategyScore.percentage >= 80) {
    badges.push({
      id: "visionary",
      name: "Visionnaire Data",
      icon: "",
      description: "Stratégie data exemplaire",
      type: "positive",
    });
  }

  // Data Quality badge
  const qualityScore = domainScores.find((d) => d.domainId === "data-quality");
  if (qualityScore && qualityScore.percentage < 40) {
    badges.push({
      id: "quality-risk",
      name: "Zone de Risque",
      icon: "",
      description: "Qualité des données à renforcer",
      type: "warning",
    });
  } else if (qualityScore && qualityScore.percentage >= 80) {
    badges.push({
      id: "quality-champion",
      name: "Champion Qualité",
      icon: "",
      description: "Excellence en qualité de données",
      type: "positive",
    });
  }

  // AI/ML badge
  const aiScore = domainScores.find((d) => d.domainId === "ai-ml");
  if (aiScore && aiScore.percentage >= 70) {
    badges.push({
      id: "ai-pioneer",
      name: "Pionnier IA",
      icon: "",
      description: "Maturité IA avancée",
      type: "positive",
    });
  }

  // Culture badge
  const cultureScore = domainScores.find((d) => d.domainId === "data-culture");
  if (cultureScore && cultureScore.percentage >= 75) {
    badges.push({
      id: "data-driven",
      name: "Data-Driven",
      icon: "",
      description: "Culture data forte",
      type: "achievement",
    });
  }

  // Overall achievements
  if (maturityLevel >= 4) {
    badges.push({
      id: "leader",
      name: "Leader Data",
      icon: "",
      description: "Dans le top quartile du marché",
      type: "achievement",
    });
  }

  if (globalScore >= 3 && globalScore < 4) {
    badges.push({
      id: "solid-foundations",
      name: "Fondations Solides",
      icon: "",
      description: "Base solide pour accélérer",
      type: "positive",
    });
  }

  return badges;
}

export function getMaturityLabel(level: number): string {
  const labels: Record<number, string> = {
    1: "Initial",
    2: "En développement",
    3: "Défini",
    4: "Maîtrisé",
    5: "Optimisé",
  };
  return labels[level] || "Non défini";
}
