import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  BarChart3, 
  Target, 
  Sparkles, 
  Server, 
  LineChart, 
  Brain, 
  Users,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  XCircle,
  ChevronDown,
  ChevronUp,
  Calendar
} from "lucide-react";
import { cn } from "@/lib/utils";
import { WorkshopModal } from "@/components/benchmark/WorkshopModal";

const pillars = [
  {
    id: "data-strategy",
    icon: Target,
    name: "Stratégie Data",
    description: "Vision et alignement avec les objectifs business",
    role: "Définit la direction et l'ambition data de l'organisation. Sans stratégie claire, les investissements data sont dispersés et sous-optimisés.",
    risks: [
      "Investissements non alignés avec les priorités business",
      "Manque de sponsorship exécutif",
      "Absence de feuille de route cohérente"
    ],
    color: "from-primary to-primary/70"
  },
  {
    id: "data-quality",
    icon: Sparkles,
    name: "Qualité des Données",
    description: "Fiabilité, précision et gouvernance des données",
    role: "Garantit la confiance dans les données. Une IA ou des décisions basées sur des données incorrectes génèrent des pertes significatives.",
    risks: [
      "Décisions erronées basées sur des données fausses",
      "Perte de confiance des utilisateurs métiers",
      "Non-conformité réglementaire (RGPD, etc.)"
    ],
    color: "from-primary to-primary/60"
  },
  {
    id: "data-infrastructure",
    icon: Server,
    name: "Infrastructure Data",
    description: "Architecture technique et capacités de traitement",
    role: "Fournit les fondations techniques. Une infrastructure inadaptée bloque la scalabilité et l'innovation.",
    risks: [
      "Incapacité à traiter les volumes de données croissants",
      "Coûts d'infrastructure incontrôlés",
      "Dépendance excessive aux compétences rares"
    ],
    color: "from-primary to-primary/80"
  },
  {
    id: "analytics",
    icon: LineChart,
    name: "Analytics & BI",
    description: "Capacités d'analyse et de reporting",
    role: "Transforme les données en insights actionnables. Sans analytics mature, les données restent inexploitées.",
    risks: [
      "Décisions prises sans données",
      "Multiples versions de la vérité",
      "Time-to-insight trop long"
    ],
    color: "from-primary to-primary/65"
  },
  {
    id: "ai-ml",
    icon: Brain,
    name: "IA & Machine Learning",
    description: "Capacités d'intelligence artificielle et ML",
    role: "Automatise et prédit à grande échelle. L'IA sans fondations solides est un risque, pas une opportunité.",
    risks: [
      "Modèles biaisés ou non éthiques",
      "POCs sans industrialisation",
      "Investissements IA prématurés"
    ],
    color: "from-primary to-primary/75"
  },
  {
    id: "data-culture",
    icon: Users,
    name: "Culture Data",
    description: "Compétences, organisation et adoption",
    role: "Assure l'adoption et la pérennité. La meilleure technologie échoue sans culture data.",
    risks: [
      "Résistance au changement",
      "Dépendance aux experts externes",
      "Faible adoption des outils"
    ],
    color: "from-primary to-primary/55"
  }
];

const maturityLevels = [
  { 
    level: 1, 
    name: "Initial", 
    description: "Pratiques ad hoc, pas de processus formalisé",
    businessRead: "L'organisation réagit aux besoins data au cas par cas. Risque élevé d'erreurs et d'inefficacité.",
    color: "bg-primary/40 text-primary-foreground"
  },
  { 
    level: 2, 
    name: "Émergent", 
    description: "Processus en cours de définition, initiatives isolées",
    businessRead: "Prise de conscience du sujet data. Premières initiatives, mais manque de cohérence globale.",
    color: "bg-primary/55 text-primary-foreground"
  },
  { 
    level: 3, 
    name: "Défini", 
    description: "Processus documentés et standardisés",
    businessRead: "Fondations solides en place. L'organisation peut commencer à capitaliser sur ses données.",
    color: "bg-primary/70 text-primary-foreground"
  },
  { 
    level: 4, 
    name: "Avancé", 
    description: "Processus optimisés et mesurés",
    businessRead: "Avantage compétitif visible. La data génère de la valeur mesurable.",
    color: "bg-[#7eda9d] text-primary"
  },
  { 
    level: 5, 
    name: "Leader", 
    description: "Amélioration continue, innovation data-driven",
    businessRead: "Référence du marché. La data est un différenciateur stratégique majeur.",
    color: "bg-primary text-primary-foreground"
  }
];

const incompatibilities = [
  {
    scenario: "IA niveau 4-5 + Qualité niveau 1-2",
    risk: "Une IA avancée alimentée par des données de mauvaise qualité produit des résultats erronés à grande échelle. Signal de maturité artificielle.",
    severity: "critical"
  },
  {
    scenario: "Analytics niveau 4-5 + Infrastructure niveau 1-2",
    risk: "Des capacités analytics avancées sur une infrastructure fragile créent des goulots d'étranglement et frustrent les utilisateurs.",
    severity: "high"
  },
  {
    scenario: "Culture niveau 4-5 + Stratégie niveau 1-2",
    risk: "Des équipes compétentes sans direction claire dispersent leurs efforts. Turnover élevé des talents data.",
    severity: "high"
  }
];

export default function Methodology() {
  const navigate = useNavigate();
  const [expandedPillar, setExpandedPillar] = useState<string | null>(null);
  const [readProgress, setReadProgress] = useState(0);
  const [workshopOpen, setWorkshopOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = Math.min((scrollTop / docHeight) * 100, 100);
      setReadProgress(progress);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background">
      {/* Reading progress bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-muted z-50">
        <div 
          className="h-full bg-primary transition-all duration-150"
          style={{ width: `${readProgress}%` }}
        />
      </div>

      {/* Header */}
      <header className="sticky top-1 z-40 bg-background/80 backdrop-blur-lg border-b border-border/50">
        <div className="max-w-5xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link 
              to="/"
              className="flex items-center gap-2 hover:opacity-80 transition-opacity"
            >
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">DataPulse</span>
            </Link>
            
            <div className="flex items-center gap-3">
              <span className="hidden sm:block text-sm text-muted-foreground">
                {Math.round(readProgress)}% lu
              </span>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setWorkshopOpen(true)}
              >
                <Calendar className="w-4 h-4 mr-2" />
                Réserver un workshop
              </Button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        {/* Hero section */}
        <section className="mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6 animate-fade-up">
            <Target className="w-4 h-4" />
            Méthodologie d'évaluation
          </div>
          
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-foreground leading-tight mb-6 animate-fade-up delay-100">
            Notre modèle d'assessment{" "}
            <span className="gradient-text">Data & IA</span>
          </h1>
          
          <p className="text-lg text-muted-foreground max-w-3xl mb-8 animate-fade-up delay-200">
            Un cadre d'évaluation structuré, conçu par des consultants Databricks, 
            pour positionner objectivement votre maturité data et identifier vos leviers de croissance.
          </p>

          <div className="glass rounded-2xl p-6 mb-8 animate-fade-up delay-300">
            <p className="text-muted-foreground italic">
              "Avant d'investir dans l'IA, il faut se situer. Notre modèle transforme une auto-évaluation 
              en diagnostic actionnable, benchmarké contre des organisations comparables."
            </p>
          </div>
        </section>

        {/* Section 1: Introduction */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-6">
            Pourquoi un assessment data ?
          </h2>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-3">
                Le piège des recommandations génériques
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Les conseils "taille unique" ne fonctionnent pas. Une PME industrielle et une scale-up fintech 
                n'ont pas les mêmes priorités. Notre modèle contextualise chaque évaluation selon votre secteur, 
                votre taille et vos ambitions.
              </p>
            </div>
            
            <div className="glass rounded-2xl p-6">
              <h3 className="font-display font-semibold text-foreground mb-3">
                La valeur du benchmarking
              </h3>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Votre score n'est jamais isolé. Il est comparé à des organisations similaires pour révéler 
                vos points forts différenciants et vos lacunes prioritaires. Se situer, c'est pouvoir agir.
              </p>
            </div>
          </div>
        </section>

        {/* Section 2: Les 6 piliers */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Les 6 piliers de l'assessment
          </h2>
          <p className="text-muted-foreground mb-8">
            Chaque pilier évalue une dimension critique de votre maturité data. 
            Ensemble, ils forment une vision holistique de votre capacité à créer de la valeur avec la data.
          </p>
          
          <div className="grid gap-4">
            {pillars.map((pillar, index) => (
              <div 
                key={pillar.id}
                className="glass rounded-2xl overflow-hidden transition-all duration-300"
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <button
                  onClick={() => setExpandedPillar(expandedPillar === pillar.id ? null : pillar.id)}
                  className="w-full p-6 flex items-center justify-between text-left hover:bg-muted/30 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex items-center justify-center bg-gradient-to-br",
                      pillar.color
                    )}>
                      <pillar.icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-display font-semibold text-foreground">
                        {pillar.name}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {pillar.description}
                      </p>
                    </div>
                  </div>
                  {expandedPillar === pillar.id ? (
                    <ChevronUp className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-muted-foreground flex-shrink-0" />
                  )}
                </button>
                
                {expandedPillar === pillar.id && (
                  <div className="px-6 pb-6 animate-fade-up">
                    <div className="border-t border-border/50 pt-4 ml-16">
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-foreground mb-2">
                          Rôle dans la création de valeur
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {pillar.role}
                        </p>
                      </div>
                      
                      <div>
                        <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                          <AlertTriangle className="w-4 h-4 text-warning" />
                          Risques associés
                        </h4>
                        <ul className="space-y-1">
                          {pillar.risks.map((risk, i) => (
                            <li key={i} className="text-sm text-muted-foreground flex items-start gap-2">
                              <span className="text-warning mt-1">•</span>
                              {risk}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* Section 3: Échelle de maturité */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            L'échelle de maturité (1-5)
          </h2>
          <p className="text-muted-foreground mb-8">
            Chaque pilier est évalué sur une échelle de 1 à 5. Cette échelle n'est pas arbitraire : 
            elle reflète des stades de maturité reconnus, avec des implications business concrètes.
          </p>
          
          <div className="space-y-4">
            {maturityLevels.map((level) => (
              <div key={level.level} className="glass rounded-xl p-5 flex gap-4">
                <div className={cn(
                  "w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 font-display font-bold",
                  level.color
                )}>
                  {level.level}
                </div>
                <div>
                  <h3 className="font-display font-semibold text-foreground mb-1">
                    {level.name}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {level.description}
                  </p>
                  <p className="text-sm text-primary">
                    <strong>Lecture business :</strong> {level.businessRead}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Section 4: Anti-incohérences */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Règles de cohérence
          </h2>
          <p className="text-muted-foreground mb-8">
            Notre modèle détecte les incohérences qui révèlent une maturité artificielle ou des risques cachés. 
            Un score élevé dans un domaine n'est pas toujours positif s'il n'est pas soutenu par les fondations.
          </p>
          
          <div className="space-y-4">
            {incompatibilities.map((item, index) => (
              <div 
                key={index} 
                className={cn(
                  "rounded-xl p-5 border",
                  item.severity === "critical" 
                    ? "bg-destructive/10 border-destructive/30" 
                    : "bg-warning/10 border-warning/30"
                )}
              >
                <div className="flex items-start gap-3">
                  {item.severity === "critical" ? (
                    <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                  ) : (
                    <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
                  )}
                  <div>
                    <h3 className="font-medium text-foreground mb-1">
                      {item.scenario}
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      {item.risk}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="glass rounded-xl p-5 mt-6">
            <p className="text-muted-foreground text-sm italic">
              "Une IA avancée sans données fiables est un signal de risque, pas de maturité."
            </p>
          </div>
        </section>

        {/* Section 5: Benchmarking */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Le benchmarking marché
          </h2>
          <p className="text-muted-foreground mb-8">
            Votre score brut ne suffit pas. Notre modèle le contextualise par rapport à votre écosystème.
          </p>
          
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="glass rounded-xl p-5 text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <BarChart3 className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Par industrie
              </h3>
              <p className="text-sm text-muted-foreground">
                Finance, Retail, Industrie, Santé, Tech... Chaque secteur a ses standards.
              </p>
            </div>
            
            <div className="glass rounded-xl p-5 text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Users className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Par taille
              </h3>
              <p className="text-sm text-muted-foreground">
                Les attentes diffèrent entre une PME et un grand groupe.
              </p>
            </div>
            
            <div className="glass rounded-xl p-5 text-center">
              <div className="w-10 h-10 rounded-lg bg-primary/20 flex items-center justify-center mx-auto mb-3">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <h3 className="font-display font-semibold text-foreground mb-2">
                Par ambition
              </h3>
              <p className="text-sm text-muted-foreground">
                Vos objectifs data influencent la lecture de vos résultats.
              </p>
            </div>
          </div>
          
          <div className="glass rounded-xl p-6">
            <h3 className="font-display font-semibold text-foreground mb-3">
              Ce que signifie un score "relatif"
            </h3>
            <p className="text-muted-foreground text-sm mb-4">
              Un score de 3/5 peut être excellent pour une PME industrielle en début de transformation, 
              mais insuffisant pour une fintech data-native. Notre benchmark ajuste les attentes 
              pour vous donner une lecture actionnable.
            </p>
            <div className="flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-success" />
              <span className="text-muted-foreground">
                Comparaison avec 2,800+ organisations évaluées
              </span>
            </div>
          </div>
        </section>

        {/* Section 6: Ce que le modèle ne fait PAS */}
        <section className="mb-20">
          <h2 className="text-2xl font-display font-bold text-foreground mb-3">
            Ce que ce modèle ne fait pas
          </h2>
          <p className="text-muted-foreground mb-8">
            La transparence est la base de la confiance. Voici les limites explicites de notre approche.
          </p>
          
          <div className="grid sm:grid-cols-2 gap-4">
            {[
              { title: "Pas de promesses magiques", desc: "L'assessment révèle votre situation, il ne la transforme pas seul." },
              { title: "Pas de scores gonflés", desc: "Notre algorithme pénalise les incohérences et ne récompense pas le déclaratif." },
              { title: "Pas de recommandations hors-sol", desc: "Chaque insight est contextualisé à votre réalité opérationnelle." },
              { title: "Pas de vente forcée", desc: "L'assessment est un point de départ, pas une obligation d'achat." }
            ].map((item, i) => (
              <div key={i} className="glass rounded-xl p-5 flex items-start gap-3">
                <XCircle className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="glass rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-foreground mb-4">
            Vous avez vu la méthode.{" "}
            <span className="gradient-text">Découvrez où vous vous situez.</span>
          </h2>
          <p className="text-muted-foreground mb-8 max-w-xl mx-auto">
            En 5 minutes, positionnez votre organisation par rapport aux leaders de votre secteur.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              onClick={() => navigate("/benchmark")}
              className="btn-primary text-primary-foreground font-semibold px-8 py-6 text-lg"
            >
              Démarrer le benchmark
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            
            <Button
              variant="outline"
              onClick={() => setWorkshopOpen(true)}
              className="px-6 py-6"
            >
              <Calendar className="w-5 h-5 mr-2" />
              Échanger avec un expert
            </Button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 mt-20">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                <BarChart3 className="w-4 h-4 text-primary" />
              </div>
              <span className="font-display font-bold text-foreground">DataPulse</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Méthodologie validée par les experts Databricks
            </p>
          </div>
        </div>
      </footer>

      <WorkshopModal open={workshopOpen} onOpenChange={setWorkshopOpen} />
    </div>
  );
}
