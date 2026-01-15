export interface Question {
  id: string;
  domain: string;
  text: string;
  tooltip?: string;
  options: {
    value: number;
    label: string;
    description?: string;
  }[];
}

export interface Domain {
  id: string;
  name: string;
  icon: string;
  description: string;
  questions: Question[];
}

export const domains: Domain[] = [
  {
    id: "data-strategy",
    name: "Stratégie Data",
    icon: "🎯",
    description: "Vision et alignement avec les objectifs business",
    questions: [
      {
        id: "ds-1",
        domain: "data-strategy",
        text: "Comment la data est-elle positionnée dans votre stratégie d'entreprise ?",
        tooltip: "Évalue l'intégration de la data dans les décisions stratégiques",
        options: [
          { value: 1, label: "Pas de stratégie formalisée", description: "La data n'est pas un sujet de direction" },
          { value: 2, label: "Initiatives ponctuelles", description: "Quelques projets data existent" },
          { value: 3, label: "Roadmap définie", description: "Une vision data existe et est documentée" },
          { value: 4, label: "Intégrée au COMEX", description: "La data est un axe stratégique clé" },
          { value: 5, label: "Data-driven company", description: "Chaque décision est guidée par la data" },
        ],
      },
      {
        id: "ds-2",
        domain: "data-strategy",
        text: "Quel est le niveau d'investissement dans vos capacités data ?",
        options: [
          { value: 1, label: "Quasi inexistant", description: "< 1% du budget IT" },
          { value: 2, label: "Limité", description: "1-3% du budget IT" },
          { value: 3, label: "Significatif", description: "3-7% du budget IT" },
          { value: 4, label: "Prioritaire", description: "7-15% du budget IT" },
          { value: 5, label: "Majeur", description: "> 15% du budget IT" },
        ],
      },
      {
        id: "ds-3",
        domain: "data-strategy",
        text: "Comment mesurez-vous le ROI de vos initiatives data ?",
        options: [
          { value: 1, label: "Pas de mesure", description: "Aucun indicateur défini" },
          { value: 2, label: "Indicateurs basiques", description: "Quelques KPIs techniques" },
          { value: 3, label: "Mesure business", description: "Impact mesuré sur certains projets" },
          { value: 4, label: "Framework établi", description: "Méthodologie systématique" },
          { value: 5, label: "Valeur quantifiée", description: "ROI précis par initiative" },
        ],
      },
      {
        id: "ds-4",
        domain: "data-strategy",
        text: "Quelle est l'implication du top management dans les sujets data ?",
        options: [
          { value: 1, label: "Absente", description: "Délégué aux équipes IT" },
          { value: 2, label: "Occasionnelle", description: "Présent sur les gros projets" },
          { value: 3, label: "Régulière", description: "Revues trimestrielles" },
          { value: 4, label: "Active", description: "Sponsor de la transformation" },
          { value: 5, label: "Exemplaire", description: "Data-driven au quotidien" },
        ],
      },
      {
        id: "ds-5",
        domain: "data-strategy",
        text: "Votre organisation dispose-t-elle d'un CDO ou équivalent ?",
        options: [
          { value: 1, label: "Non", description: "Pas de rôle dédié" },
          { value: 2, label: "Rôle partagé", description: "Responsabilité partielle" },
          { value: 3, label: "Manager data", description: "Poste dédié opérationnel" },
          { value: 4, label: "CDO", description: "Membre du COMEX" },
          { value: 5, label: "CDO + équipe", description: "Organisation data structurée" },
        ],
      },
      {
        id: "ds-6",
        domain: "data-strategy",
        text: "Comment votre stratégie data s'aligne-t-elle avec vos concurrents ?",
        options: [
          { value: 1, label: "En retard", description: "Écart significatif" },
          { value: 2, label: "En rattrapage", description: "Conscient du gap" },
          { value: 3, label: "Au niveau", description: "Comparable au marché" },
          { value: 4, label: "En avance", description: "Différenciation visible" },
          { value: 5, label: "Leader", description: "Référence du secteur" },
        ],
      },
    ],
  },
  {
    id: "data-quality",
    name: "Qualité des Données",
    icon: "✨",
    description: "Fiabilité, précision et gouvernance des données",
    questions: [
      {
        id: "dq-1",
        domain: "data-quality",
        text: "Quel est votre niveau de confiance dans vos données ?",
        options: [
          { value: 1, label: "Très faible", description: "Données souvent incorrectes" },
          { value: 2, label: "Faible", description: "Erreurs fréquentes" },
          { value: 3, label: "Moyen", description: "Données globalement fiables" },
          { value: 4, label: "Élevé", description: "Données de qualité" },
          { value: 5, label: "Excellent", description: "Données certifiées" },
        ],
      },
      {
        id: "dq-2",
        domain: "data-quality",
        text: "Disposez-vous d'un référentiel de données (data catalog) ?",
        options: [
          { value: 1, label: "Non", description: "Pas de documentation" },
          { value: 2, label: "Partiel", description: "Documentation dispersée" },
          { value: 3, label: "En cours", description: "Projet de catalogage" },
          { value: 4, label: "Oui", description: "Catalogue structuré" },
          { value: 5, label: "Avancé", description: "Catalogue temps réel avec lineage" },
        ],
      },
      {
        id: "dq-3",
        domain: "data-quality",
        text: "Comment gérez-vous les doublons et incohérences ?",
        options: [
          { value: 1, label: "Pas de gestion", description: "Traitement manuel ponctuel" },
          { value: 2, label: "Réactif", description: "Correction sur signalement" },
          { value: 3, label: "Processus défini", description: "Règles de nettoyage" },
          { value: 4, label: "Automatisé", description: "Détection automatique" },
          { value: 5, label: "Prédictif", description: "Prévention en amont" },
        ],
      },
      {
        id: "dq-4",
        domain: "data-quality",
        text: "Mesurez-vous des indicateurs de qualité de données ?",
        options: [
          { value: 1, label: "Non", description: "Aucune mesure" },
          { value: 2, label: "Ad hoc", description: "Mesures ponctuelles" },
          { value: 3, label: "KPIs définis", description: "Indicateurs suivis" },
          { value: 4, label: "Tableaux de bord", description: "Monitoring continu" },
          { value: 5, label: "SLA qualité", description: "Engagements formalisés" },
        ],
      },
      {
        id: "dq-5",
        domain: "data-quality",
        text: "Quelle est la fraîcheur de vos données décisionnelles ?",
        options: [
          { value: 1, label: "Mensuelle+", description: "Données anciennes" },
          { value: 2, label: "Hebdomadaire", description: "Mise à jour hebdo" },
          { value: 3, label: "Quotidienne", description: "Batch nocturne" },
          { value: 4, label: "Horaire", description: "Near real-time" },
          { value: 5, label: "Temps réel", description: "Streaming" },
        ],
      },
      {
        id: "dq-6",
        domain: "data-quality",
        text: "Qui est responsable de la qualité des données ?",
        options: [
          { value: 1, label: "Personne", description: "Pas de propriétaire" },
          { value: 2, label: "IT seul", description: "Responsabilité technique" },
          { value: 3, label: "Data owners", description: "Propriétaires désignés" },
          { value: 4, label: "Stewardship", description: "Organisation dédiée" },
          { value: 5, label: "Culture qualité", description: "Responsabilité partagée" },
        ],
      },
    ],
  },
  {
    id: "data-infrastructure",
    name: "Infrastructure Data",
    icon: "🏗️",
    description: "Architecture technique et capacités de traitement",
    questions: [
      {
        id: "di-1",
        domain: "data-infrastructure",
        text: "Quel type d'architecture data utilisez-vous ?",
        options: [
          { value: 1, label: "Silos", description: "Bases de données isolées" },
          { value: 2, label: "Data warehouse", description: "Entrepôt centralisé classique" },
          { value: 3, label: "Data lake", description: "Stockage unifié" },
          { value: 4, label: "Lakehouse", description: "Architecture moderne unifiée" },
          { value: 5, label: "Data mesh", description: "Architecture décentralisée" },
        ],
      },
      {
        id: "di-2",
        domain: "data-infrastructure",
        text: "Quelle est votre capacité de traitement de données ?",
        options: [
          { value: 1, label: "Limitée", description: "Traitements manuels" },
          { value: 2, label: "Batch simple", description: "ETL classiques" },
          { value: 3, label: "Batch optimisé", description: "Pipelines orchestrés" },
          { value: 4, label: "Near real-time", description: "Streaming partiel" },
          { value: 5, label: "Real-time", description: "Streaming complet" },
        ],
      },
      {
        id: "di-3",
        domain: "data-infrastructure",
        text: "Où sont hébergées vos données ?",
        options: [
          { value: 1, label: "On-premise legacy", description: "Serveurs anciens" },
          { value: 2, label: "On-premise moderne", description: "Infrastructure récente" },
          { value: 3, label: "Cloud hybride", description: "Mix on-prem/cloud" },
          { value: 4, label: "Cloud multi", description: "Multi-cloud" },
          { value: 5, label: "Cloud native", description: "100% cloud optimisé" },
        ],
      },
      {
        id: "di-4",
        domain: "data-infrastructure",
        text: "Comment gérez-vous la scalabilité ?",
        options: [
          { value: 1, label: "Pas de gestion", description: "Capacité fixe" },
          { value: 2, label: "Scale up manuel", description: "Ajout de ressources ponctuel" },
          { value: 3, label: "Scale planifié", description: "Anticipation des besoins" },
          { value: 4, label: "Auto-scaling partiel", description: "Élasticité sur certains composants" },
          { value: 5, label: "Auto-scaling complet", description: "Élasticité totale" },
        ],
      },
      {
        id: "di-5",
        domain: "data-infrastructure",
        text: "Quel est votre niveau d'automatisation des pipelines ?",
        options: [
          { value: 1, label: "Manuel", description: "Interventions humaines" },
          { value: 2, label: "Scripts", description: "Automatisation basique" },
          { value: 3, label: "Orchestré", description: "Airflow ou équivalent" },
          { value: 4, label: "CI/CD data", description: "Déploiement automatisé" },
          { value: 5, label: "DataOps", description: "Pratiques DevOps appliquées" },
        ],
      },
      {
        id: "di-6",
        domain: "data-infrastructure",
        text: "Comment surveillez-vous votre infrastructure data ?",
        options: [
          { value: 1, label: "Pas de monitoring", description: "Réactif aux incidents" },
          { value: 2, label: "Alertes basiques", description: "Monitoring système" },
          { value: 3, label: "Observabilité", description: "Métriques et logs" },
          { value: 4, label: "Data observability", description: "Qualité et performance" },
          { value: 5, label: "AIOps", description: "Détection prédictive" },
        ],
      },
    ],
  },
  {
    id: "analytics",
    name: "Analytics & BI",
    icon: "📊",
    description: "Capacités d'analyse et de reporting",
    questions: [
      {
        id: "an-1",
        domain: "analytics",
        text: "Quel type d'analytics pratiquez-vous principalement ?",
        options: [
          { value: 1, label: "Reporting basique", description: "Tableaux Excel" },
          { value: 2, label: "Descriptif", description: "Que s'est-il passé ?" },
          { value: 3, label: "Diagnostic", description: "Pourquoi ?" },
          { value: 4, label: "Prédictif", description: "Que va-t-il se passer ?" },
          { value: 5, label: "Prescriptif", description: "Que devons-nous faire ?" },
        ],
      },
      {
        id: "an-2",
        domain: "analytics",
        text: "Quel est le taux d'adoption des outils BI ?",
        options: [
          { value: 1, label: "< 10%", description: "Quelques utilisateurs" },
          { value: 2, label: "10-25%", description: "Adoption limitée" },
          { value: 3, label: "25-50%", description: "Adoption moyenne" },
          { value: 4, label: "50-75%", description: "Bonne adoption" },
          { value: 5, label: "> 75%", description: "Adoption massive" },
        ],
      },
      {
        id: "an-3",
        domain: "analytics",
        text: "Comment les utilisateurs accèdent-ils aux données ?",
        options: [
          { value: 1, label: "Demandes IT", description: "Requêtes manuelles" },
          { value: 2, label: "Rapports statiques", description: "PDF/Excel périodiques" },
          { value: 3, label: "Dashboards", description: "Tableaux de bord" },
          { value: 4, label: "Self-service", description: "Exploration autonome" },
          { value: 5, label: "Embedded", description: "Data dans les apps métier" },
        ],
      },
      {
        id: "an-4",
        domain: "analytics",
        text: "Quelle est la maturité de votre data viz ?",
        options: [
          { value: 1, label: "Tableaux Excel", description: "Pas de visualisation" },
          { value: 2, label: "Charts basiques", description: "Graphiques simples" },
          { value: 3, label: "Dashboards interactifs", description: "Drill-down, filtres" },
          { value: 4, label: "Storytelling", description: "Data narratives" },
          { value: 5, label: "Real-time & mobile", description: "Expérience premium" },
        ],
      },
      {
        id: "an-5",
        domain: "analytics",
        text: "Avez-vous une gouvernance des indicateurs ?",
        options: [
          { value: 1, label: "Non", description: "Définitions multiples" },
          { value: 2, label: "Partielle", description: "Quelques KPIs standards" },
          { value: 3, label: "Dictionnaire", description: "Définitions centralisées" },
          { value: 4, label: "Metrics layer", description: "Couche sémantique" },
          { value: 5, label: "Single source", description: "Vérité unique" },
        ],
      },
      {
        id: "an-6",
        domain: "analytics",
        text: "Quelle est la latence de vos analyses ?",
        options: [
          { value: 1, label: "Jours/Semaines", description: "Analyses ad hoc" },
          { value: 2, label: "Quotidien", description: "Refresh journalier" },
          { value: 3, label: "Horaire", description: "Near real-time" },
          { value: 4, label: "Minutes", description: "Streaming analytics" },
          { value: 5, label: "Temps réel", description: "< 1 minute" },
        ],
      },
    ],
  },
  {
    id: "ai-ml",
    name: "IA & Machine Learning",
    icon: "🤖",
    description: "Capacités d'intelligence artificielle et ML",
    questions: [
      {
        id: "ai-1",
        domain: "ai-ml",
        text: "Où en êtes-vous dans votre parcours IA/ML ?",
        options: [
          { value: 1, label: "Exploration", description: "POCs et tests" },
          { value: 2, label: "Expérimentation", description: "Quelques cas d'usage" },
          { value: 3, label: "Implémentation", description: "Modèles en production" },
          { value: 4, label: "Scaling", description: "Industrialisation" },
          { value: 5, label: "Optimisation", description: "ML à l'échelle" },
        ],
      },
      {
        id: "ai-2",
        domain: "ai-ml",
        text: "Combien de modèles ML avez-vous en production ?",
        options: [
          { value: 1, label: "0", description: "Aucun modèle déployé" },
          { value: 2, label: "1-3", description: "Quelques modèles" },
          { value: 3, label: "4-10", description: "Plusieurs modèles" },
          { value: 4, label: "11-50", description: "Portfolio ML" },
          { value: 5, label: "50+", description: "ML à l'échelle" },
        ],
      },
      {
        id: "ai-3",
        domain: "ai-ml",
        text: "Disposez-vous d'une plateforme MLOps ?",
        options: [
          { value: 1, label: "Non", description: "Déploiements manuels" },
          { value: 2, label: "Outils disparates", description: "Notebooks + scripts" },
          { value: 3, label: "En construction", description: "Plateforme émergente" },
          { value: 4, label: "Oui", description: "Plateforme opérationnelle" },
          { value: 5, label: "Mature", description: "MLOps complet" },
        ],
      },
      {
        id: "ai-4",
        domain: "ai-ml",
        text: "Utilisez-vous des LLMs / IA générative ?",
        options: [
          { value: 1, label: "Non", description: "Pas d'usage" },
          { value: 2, label: "Exploration", description: "Tests avec ChatGPT etc." },
          { value: 3, label: "Cas d'usage définis", description: "POCs en cours" },
          { value: 4, label: "En production", description: "Applications déployées" },
          { value: 5, label: "Stratégique", description: "Core business" },
        ],
      },
      {
        id: "ai-5",
        domain: "ai-ml",
        text: "Comment gérez-vous les biais et l'éthique IA ?",
        options: [
          { value: 1, label: "Pas de gestion", description: "Non considéré" },
          { value: 2, label: "Sensibilisation", description: "Prise de conscience" },
          { value: 3, label: "Guidelines", description: "Principes définis" },
          { value: 4, label: "Framework", description: "Processus formalisé" },
          { value: 5, label: "Gouvernance IA", description: "Comité éthique" },
        ],
      },
      {
        id: "ai-6",
        domain: "ai-ml",
        text: "Quel est l'impact business de vos initiatives IA ?",
        options: [
          { value: 1, label: "Non mesuré", description: "Pas de KPIs" },
          { value: 2, label: "Limité", description: "Gains marginaux" },
          { value: 3, label: "Visible", description: "ROI démontré" },
          { value: 4, label: "Significatif", description: "Avantage compétitif" },
          { value: 5, label: "Transformationnel", description: "Nouveau business model" },
        ],
      },
    ],
  },
  {
    id: "data-culture",
    name: "Culture Data",
    icon: "🧬",
    description: "Compétences, adoption et mindset data",
    questions: [
      {
        id: "dc-1",
        domain: "data-culture",
        text: "Quel est le niveau de data literacy dans l'organisation ?",
        options: [
          { value: 1, label: "Très faible", description: "Compétences rares" },
          { value: 2, label: "Faible", description: "Quelques experts" },
          { value: 3, label: "Moyen", description: "Compétences répandues" },
          { value: 4, label: "Élevé", description: "Majorité formée" },
          { value: 5, label: "Excellence", description: "Culture data-first" },
        ],
      },
      {
        id: "dc-2",
        domain: "data-culture",
        text: "Proposez-vous des formations data ?",
        options: [
          { value: 1, label: "Non", description: "Pas de programme" },
          { value: 2, label: "Ponctuelles", description: "Formations ad hoc" },
          { value: 3, label: "Programme défini", description: "Cursus structuré" },
          { value: 4, label: "Académie interne", description: "Centre d'excellence" },
          { value: 5, label: "Learning continu", description: "Upskilling permanent" },
        ],
      },
      {
        id: "dc-3",
        domain: "data-culture",
        text: "Comment les équipes métier collaborent-elles avec la data ?",
        options: [
          { value: 1, label: "Pas de collab", description: "IT seul" },
          { value: 2, label: "Demandes ad hoc", description: "Relation client/fournisseur" },
          { value: 3, label: "Partenariat", description: "Projets conjoints" },
          { value: 4, label: "Squads mixtes", description: "Équipes intégrées" },
          { value: 5, label: "Ownership métier", description: "Data products" },
        ],
      },
      {
        id: "dc-4",
        domain: "data-culture",
        text: "Les décisions sont-elles basées sur les données ?",
        options: [
          { value: 1, label: "Rarement", description: "Intuition prédomine" },
          { value: 2, label: "Parfois", description: "Sur certains sujets" },
          { value: 3, label: "Souvent", description: "Data-informed" },
          { value: 4, label: "Majoritairement", description: "Data-driven" },
          { value: 5, label: "Systématiquement", description: "Data-first" },
        ],
      },
      {
        id: "dc-5",
        domain: "data-culture",
        text: "Comment est perçue la data dans l'entreprise ?",
        options: [
          { value: 1, label: "Contrainte", description: "Obstacle ou coût" },
          { value: 2, label: "Nécessité", description: "Obligation réglementaire" },
          { value: 3, label: "Ressource", description: "Asset reconnu" },
          { value: 4, label: "Différenciateur", description: "Avantage compétitif" },
          { value: 5, label: "ADN", description: "Partie de l'identité" },
        ],
      },
      {
        id: "dc-6",
        domain: "data-culture",
        text: "Quelle est la taille de votre équipe data/IA ?",
        options: [
          { value: 1, label: "0-2", description: "Équipe minimale" },
          { value: 2, label: "3-5", description: "Petite équipe" },
          { value: 3, label: "6-15", description: "Équipe structurée" },
          { value: 4, label: "16-50", description: "Département data" },
          { value: 5, label: "50+", description: "Organisation data" },
        ],
      },
    ],
  },
];

export const industries = [
  { value: "finance", label: "Finance & Assurance" },
  { value: "retail", label: "Retail & E-commerce" },
  { value: "manufacturing", label: "Industrie & Manufacturing" },
  { value: "healthcare", label: "Santé & Pharma" },
  { value: "telecom", label: "Télécoms & Média" },
  { value: "energy", label: "Énergie & Utilities" },
  { value: "transport", label: "Transport & Logistique" },
  { value: "public", label: "Secteur Public" },
  { value: "tech", label: "Tech & Software" },
  { value: "other", label: "Autre" },
];

export const companySizes = [
  { value: "startup", label: "Startup (< 50)", description: "Moins de 50 employés" },
  { value: "pme", label: "PME (50-250)", description: "50 à 250 employés" },
  { value: "eti", label: "ETI (250-5000)", description: "250 à 5000 employés" },
  { value: "large", label: "Grande entreprise (5000+)", description: "Plus de 5000 employés" },
];

export const roles = [
  { value: "ceo", label: "CEO / DG" },
  { value: "cfo", label: "CFO / DAF" },
  { value: "cto", label: "CTO / DSI" },
  { value: "cdo", label: "CDO / Chief Data Officer" },
  { value: "director", label: "Directeur / VP" },
  { value: "manager", label: "Manager" },
  { value: "other", label: "Autre" },
];
