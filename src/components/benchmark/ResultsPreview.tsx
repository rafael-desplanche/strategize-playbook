import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BenchmarkResult, getMaturityLabel, getRecommendedCTA } from "@/lib/scoring";
import { ScoreGauge } from "./ScoreGauge";
import { MarketPosition } from "./MarketPosition";
import { BadgeDisplay } from "./BadgeDisplay";
import { WorkshopModal } from "./WorkshopModal";
import { Lock, ArrowRight, TrendingUp, AlertTriangle, Calendar, MessageSquare } from "lucide-react";

interface ResultsPreviewProps {
  result: BenchmarkResult;
  industry: string;
  industryLabel: string;
  onUnlock: () => void;
}

export function ResultsPreview({ result, industry, industryLabel, onUnlock }: ResultsPreviewProps) {
  const cta = getRecommendedCTA(result.maturityLevel);
  const [workshopOpen, setWorkshopOpen] = useState(false);

  return (
    <div className="animate-fade-up">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-4">
          <TrendingUp className="w-4 h-4" />
          Benchmark complété
        </div>
        <h1 className="text-3xl sm:text-4xl font-display font-bold text-foreground mb-3">
          Votre score de maturité Data & IA
        </h1>
        <p className="text-muted-foreground max-w-lg mx-auto">
          Découvrez comment vous vous positionnez par rapport aux leaders de votre secteur
        </p>
      </div>

      {/* Main score */}
      <div className="flex flex-col items-center mb-10">
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

      {/* Badges */}
      <div className="mb-10">
        <BadgeDisplay badges={result.badges} />
      </div>

      {/* Market position */}
      <div className="mb-10">
        <MarketPosition percentile={result.marketPosition} industry={industryLabel} />
      </div>

      {/* Key insight (free) */}
      <div className="glass rounded-2xl p-6 mb-10">
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

      {/* Workshop CTA - positioned strategically based on maturity */}
      <div 
        onClick={() => setWorkshopOpen(true)}
        className="glass rounded-2xl p-6 mb-10 cursor-pointer card-interactive border-accent/20"
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

      {/* Locked content teaser */}
      <div className="relative glass rounded-2xl p-6 mb-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-card/95" />
        <div className="relative z-10">
          <div className="flex items-center gap-2 text-muted-foreground mb-4">
            <Lock className="w-4 h-4" />
            <span className="text-sm">Contenu premium</span>
          </div>
          <div className="space-y-3 blur-sm">
            <div className="h-4 bg-muted/50 rounded w-3/4" />
            <div className="h-4 bg-muted/50 rounded w-full" />
            <div className="h-4 bg-muted/50 rounded w-2/3" />
            <div className="h-32 bg-muted/50 rounded mt-4" />
          </div>
        </div>
        <div className="absolute inset-0 flex items-center justify-center z-20">
          <div className="text-center">
            <Lock className="w-12 h-12 text-primary mx-auto mb-4" />
            <p className="text-foreground font-medium mb-2">
              Débloquez l'analyse complète
            </p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>✓ Radar détaillé par domaine</li>
              <li>✓ Benchmarks sectoriels complets</li>
              <li>✓ Recommandations personnalisées</li>
              <li>✓ Roadmap indicative</li>
            </ul>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="glass rounded-2xl p-6 text-center">
        <h3 className="text-xl font-display font-bold text-foreground mb-2">
          {cta.title}
        </h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto">
          {cta.description}
        </p>
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Button
            onClick={onUnlock}
            className="btn-primary text-primary-foreground font-semibold px-8 py-6 text-lg"
          >
            Débloquer les insights complets
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
          <Button
            variant="outline"
            onClick={() => setWorkshopOpen(true)}
            className="border-border hover:bg-muted"
          >
            <Calendar className="w-4 h-4 mr-2" />
            Workshop exécutif
          </Button>
        </div>
        <p className="text-xs text-muted-foreground mt-4">
          Paiement sécurisé • Accès immédiat
        </p>
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
