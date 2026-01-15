import { Button } from "@/components/ui/button";
import { ArrowRight, BarChart3, Target, Zap, Building2 } from "lucide-react";

interface LandingHeroProps {
  onStart: () => void;
}

export function LandingHero({ onStart }: LandingHeroProps) {
  return (
    <div className="relative min-h-screen flex flex-col">
      {/* Background glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/10 via-primary/5 to-transparent blur-3xl" />
      </div>

      {/* Header */}
      <header className="relative z-10 px-6 py-6">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-primary" />
            </div>
            <span className="font-display font-bold text-xl text-foreground">
              DataPulse
            </span>
          </div>
          <Button 
            variant="ghost" 
            className="text-muted-foreground hover:text-foreground"
          >
            En savoir plus
          </Button>
        </div>
      </header>

      {/* Hero content */}
      <main className="relative z-10 flex-1 flex items-center">
        <div className="max-w-6xl mx-auto px-6 py-12">
          <div className="max-w-3xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-8 animate-fade-up">
              <Zap className="w-4 h-4" />
              Benchmark Data & IA pour dirigeants
            </div>

            {/* Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
              Êtes-vous en train de{" "}
              <span className="gradient-text">gagner</span> ou de{" "}
              <span className="gradient-text">perdre</span> la course à la data ?
            </h1>

            {/* Subheadline */}
            <p className="text-xl text-muted-foreground mb-10 max-w-2xl animate-fade-up delay-200">
              En 5 minutes, découvrez votre position par rapport aux leaders de votre secteur 
              et les actions prioritaires pour accélérer.
            </p>

            {/* CTA */}
            <div className="flex flex-col sm:flex-row items-start gap-4 animate-fade-up delay-300">
              <Button
                onClick={onStart}
                className="btn-primary text-primary-foreground font-semibold px-8 py-7 text-lg"
              >
                Démarrer le benchmark gratuit
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="w-2 h-2 rounded-full bg-success animate-pulse" />
                2,847 dirigeants évalués ce mois
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-20 animate-fade-up delay-400">
            {[
              { icon: Building2, value: "12", label: "Secteurs analysés" },
              { icon: Target, value: "36", label: "Questions stratégiques" },
              { icon: BarChart3, value: "6", label: "Domaines évalués" },
              { icon: Zap, value: "5min", label: "Temps moyen" },
            ].map((stat, index) => (
              <div key={index} className="glass rounded-2xl p-5">
                <stat.icon className="w-6 h-6 text-primary mb-3" />
                <p className="text-2xl font-display font-bold text-foreground">
                  {stat.value}
                </p>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Trusted by */}
      <footer className="relative z-10 px-6 py-10 border-t border-border/50">
        <div className="max-w-6xl mx-auto">
          <p className="text-center text-sm text-muted-foreground mb-6">
            Méthodologie validée par les experts Databricks
          </p>
          <div className="flex items-center justify-center gap-8 opacity-50">
            {["Finance", "Retail", "Industrie", "Santé", "Tech"].map((sector) => (
              <span key={sector} className="text-sm font-medium text-muted-foreground">
                {sector}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
