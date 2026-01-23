// =========================
// Interfaces
// =========================

export interface Question {
  id: string;
  domain: string;
  label: string;
  text: string;
}

export interface Domain {
  id: string;
  name: string;
  description: string;
  questions: Question[];
}

// =========================
// Domains & Questions
// =========================

export const domains: Domain[] = [
  // --------------------------------------------------
  // PURPOSE, VISION & STRATEGY
  // --------------------------------------------------
  {
    id: "strategy",
    name: "Purpose, Vision & Strategy",
    description: "Alignement entre Data, IA et objectifs business",
    questions: [
      {
        id: "str-1",
        domain: "strategy",
        label: "Data & AI vision",
        text: "La Data et l’IA occupent une place claire et explicite dans la vision stratégique de l’entreprise.",
      },
      {
        id: "str-2",
        domain: "strategy",
        label: "Business alignment",
        text: "Notre stratégie Data & AI est directement alignée avec nos objectifs business prioritaires.",
      },
      {
        id: "str-3",
        domain: "strategy",
        label: "Executive sponsorship & leadership",
        text: "Les initiatives Data & AI sont mises en avant et soutenues au niveau exécutif.",
      },
      {
        id: "str-4",
        domain: "strategy",
        label: "Data-driven decision making",
        text: "Les décisions stratégiques et opérationnelles sont éclairées par de la donnée fiable.",
      },
      {
        id: "str-5",
        domain: "strategy",
        label: "Initiative prioritization",
        text: "Les initiatives Data & AI sont priorisées en fonction de leur impact business attendu.",
      },
      {
        id: "str-6",
        domain: "strategy",
        label: "Value measurement",
        text: "Les impacts business de la Data et de l’IA sont mesurés, suivis et pilotés.",
      },
    ],
  },

  // --------------------------------------------------
  // DATA MANAGEMENT, TOOLS & ARCHITECTURE
  // --------------------------------------------------
  {
    id: "data_platform",
    name: "Data Management, Tools & Architecture",
    description: "Fondations techniques et passage à l’échelle",
    questions: [
      {
        id: "plt-1",
        domain: "data_platform",
        label: "Data embedded everywhere",
        text: "La donnée est intégrée dans l’ensemble des décisions, interactions et processus métiers.",
      },
      {
        id: "plt-2",
        domain: "data_platform",
        label: "Real-time data",
        text: "La donnée est traitée et exploitée en temps réel ou quasi temps réel lorsque nécessaire.",
      },
      {
        id: "plt-3",
        domain: "data_platform",
        label: "Flexible data stores",
        text: "L’architecture permet d’exploiter des données structurées et non structurées de façon intégrée.",
      },
      {
        id: "plt-4",
        domain: "data_platform",
        label: "Data as a product",
        text: "La donnée est gérée comme un produit avec des responsables et des usages clairs.",
      },
      {
        id: "plt-5",
        domain: "data_platform",
        label: "Self-service access",
        text: "Les équipes accèdent à la donnée via des mécanismes self-service sécurisés.",
      },
      {
        id: "plt-6",
        domain: "data_platform",
        label: "Collaboration",
        text: "La plateforme data facilite la collaboration entre équipes métiers, data et IT.",
      },
      {
        id: "plt-7",
        domain: "data_platform",
        label: "Analytics maturity",
        text: "Le niveau d’analytics permet de générer de la valeur business.",
      },
      {
        id: "plt-8",
        domain: "data_platform",
        label: "Unified platform",
        text: "L’architecture repose sur une plateforme data unifiée et scalable.",
      },
      {
        id: "plt-9",
        domain: "data_platform",
        label: "Cost & scalability",
        text: "Les usages data peuvent passer à l’échelle avec des coûts maîtrisés.",
      },
      {
        id: "plt-10",
        domain: "data_platform",
        label: "Security & automation",
        text: "La sécurité, la qualité et la résilience sont largement automatisées.",
      },
    ],
  },

  // --------------------------------------------------
  // GOVERNANCE & RISK MANAGEMENT
  // --------------------------------------------------
  {
    id: "governance",
    name: "Governance & Risk Management",
    description: "Confiance, conformité et maîtrise des risques",
    questions: [
      {
        id: "gov-1",
        domain: "governance",
        label: "Ownership & responsibilities",
        text: "Les responsabilités liées à la gouvernance de la donnée et de l’IA sont clairement définies et assumées.",
      },
      {
        id: "gov-2",
        domain: "governance",
        label: "Governance framework",
        text: "L’organisation dispose d’un cadre de gouvernance Data & AI formalisé et partagé.",
      },
      {
        id: "gov-3",
        domain: "governance",
        label: "Access management",
        text: "L’accès aux données est contrôlé, tracé et aligné avec les besoins métiers et réglementaires.",
      },
      {
        id: "gov-4",
        domain: "governance",
        label: "Data quality",
        text: "La qualité des données est pilotée comme un enjeu de performance.",
      },
      {
        id: "gov-5",
        domain: "governance",
        label: "Lineage & traceability",
        text: "L’origine, les transformations et les usages des données et modèles sont traçables.",
      },
      {
        id: "gov-6",
        domain: "governance",
        label: "Compliance & auditability",
        text: "La gouvernance Data & AI permet de répondre efficacement aux exigences réglementaires et d’audit.",
      },
      {
        id: "gov-7",
        domain: "governance",
        label: "AI risk management",
        text: "Les risques liés à l’usage de l’IA sont identifiés, évalués et maîtrisés.",
      },
      {
        id: "gov-8",
        domain: "governance",
        label: "AI model governance",
        text: "Les modèles analytiques et IA sont gouvernés sur tout leur cycle de vie.",
      },
      {
        id: "gov-9",
        domain: "governance",
        label: "Privacy & sensitive data",
        text: "La protection des données sensibles et personnelles est intégrée aux usages Data & AI.",
      },
      {
        id: "gov-10",
        domain: "governance",
        label: "Governance as business enabler",
        text: "La gouvernance Data & AI est perçue comme un levier de confiance et de performance.",
      },
    ],
  },

  // --------------------------------------------------
  // CULTURE & PEOPLE
  // --------------------------------------------------
  {
    id: "culture_people",
    name: "Culture & People",
    description: "Compétences, adoption, éthique et autonomie",
    questions: [
      {
        id: "cul-1",
        domain: "culture_people",
        label: "Data literacy",
        text: "Les collaborateurs disposent d’un niveau de data literacy suffisant pour utiliser la donnée et l’IA.",
      },
      {
        id: "cul-2",
        domain: "culture_people",
        label: "AI skills alignment",
        text: "Le niveau de compétences est aligné avec le niveau réel d’usage de l’IA dans l’organisation.",
      },
      {
        id: "cul-3",
        domain: "culture_people",
        label: "Training & upskilling",
        text: "L’organisation investit de manière structurée dans la formation Data & AI.",
      },
      {
        id: "cul-4",
        domain: "culture_people",
        label: "Onboarding & development",
        text: "La data et l’IA font partie intégrante de l’onboarding et des parcours de développement.",
      },
      {
        id: "cul-5",
        domain: "culture_people",
        label: "Critical thinking",
        text: "Les collaborateurs savent interpréter et challenger les résultats produits par la donnée et l’IA.",
      },
      {
        id: "cul-6",
        domain: "culture_people",
        label: "Individual responsibility",
        text: "Les collaborateurs comprennent leur responsabilité individuelle dans l’usage de la donnée et de l’IA.",
      },
      {
        id: "cul-7",
        domain: "culture_people",
        label: "Responsible AI usage",
        text: "Les outils d’IA sont utilisés dans un cadre clair, responsable et maîtrisé.",
      },
      {
        id: "cul-8",
        domain: "culture_people",
        label: "Ethics & AI risks",
        text: "Les collaborateurs sont sensibilisés aux risques, limites et enjeux éthiques liés à l’IA.",
      },
      {
        id: "cul-9",
        domain: "culture_people",
        label: "Autonomy",
        text: "Les équipes sont autonomes pour utiliser la donnée et l’IA dans leur quotidien.",
      },
    ],
  },
];

// =========================
// Contextual metadata
// =========================

export const industries = [
  { value: "advanced_manufacturing", label: "Advanced manufacturing" },
  { value: "agriculture", label: "Agriculture" },
  { value: "banking_capital_markets", label: "Banking and capital markets" },
  { value: "chemicals", label: "Chemicals" },
  { value: "consumer_packaged_goods", label: "Consumer packaged goods" },
  { value: "government", label: "Government" },
  { value: "health", label: "Health" },
  { value: "insurance", label: "Insurance" },
  { value: "life_sciences", label: "Life sciences" },
  { value: "media_entertainment", label: "Media and entertainment" },
  { value: "mining_metals", label: "Mining and metals" },
  { value: "mobility_transport", label: "Mobility and transport" },
  { value: "oil_gas", label: "Oil and gas" },
  { value: "power_utilities", label: "Power and utilities" },
  { value: "private_equity", label: "Private equity" },
  { value: "professional_services", label: "Professional services" },
  { value: "real_estate_hospitality", label: "Real estate and hospitality" },
  { value: "retail", label: "Retail" },
  { value: "technology", label: "Technology" },
  { value: "telecommunications", label: "Telecommunications" },
  { value: "wealth_asset_management", label: "Wealth and asset management" },
  { value: "other", label: "Other" },
];

export const companySizes = [
  { value: "individuel", label: "1" },
  { value: "tpe", label: "TPE (<10)" },
  { value: "pme", label: "PME (50–249)" },
  { value: "eti", label: "ETI (250–4999)" },
  { value: "grande", label: "Grande entreprise (5000+)" },
];

export const roles = [
  { value: "ceo", label: "CEO" },
  { value: "cfo", label: "CFO" },
  { value: "cto", label: "CTO" },
  { value: "cmo", label: "CMO" },
  { value: "cdo", label: "Chief Data Officer" },
  { value: "director", label: "Head of Sales" },
  { value: "other", label: "Autre" },
];
