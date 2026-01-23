// =========================
// Interfaces
// =========================

export interface Question {
  id: string;
  domain: string;
  label: string; // Angle / dimension évaluée
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
        text: "Les initiatives Data & AI sont portées et soutenues au niveau exécutif.",
      },
      {
        id: "str-4",
        domain: "strategy",
        label: "Data-driven decision making",
        text: "Les décisions stratégiques et opérationnelles sont éclairées par la donnée.",
      },
      {
        id: "str-5",
        domain: "strategy",
        label: "Business Impact",
        text: "Les initiatives Data & AI sont priorisées en fonction de leur impact business attendu.",
      },
      {
        id: "str-6",
        domain: "strategy",
        label: "Business Impact",
        text: "Nous savons concrètement quels sont les impacts du déploiement de la Data et de l’IA sur chaque sujet.",
      },
    ],
  },

  // --------------------------------------------------
  // DATA MANAGEMENT, TOOLS & ARCHITECTURE
  // --------------------------------------------------
  {
    id: "data_management",
    name: "Data Management, Tools & Architecture",
    description: "Plateforme, usages data, analytics et passage à l’échelle",
    questions: [
      {
        id: "dat-1",
        domain: "data_management",
        label: "Data-driven operations",
        text: "La donnée est intégrée dans l’ensemble des décisions, interactions et processus métiers.",
      },
      {
        id: "dat-2",
        domain: "data_management",
        label: "Real-time data processing",
        text: "La donnée est traitée et exploitée en temps réel ou quasi temps réel lorsque nécessaire.",
      },
      {
        id: "dat-3",
        domain: "data_management",
        label: "Structured & unstructured data integration",
        text: "L’architecture permet d’exploiter des données structurées et non structurées de façon intégrée.",
      },
      {
        id: "dat-4",
        domain: "data_management",
        label: "Data as a product",
        text: "La donnée est gérée comme un produit, avec des responsables identifiés et des usages clairs.",
      },
      {
        id: "dat-5",
        domain: "data_management",
        label: "Secure self-service data access",
        text: "Les équipes accèdent à la donnée via des mécanismes de self-service sécurisés.",
      },
      {
        id: "dat-6",
        domain: "data_management",
        label: "Business, data & IT collaboration",
        text: "La plateforme data facilite la collaboration entre les équipes métiers, data et IT.",
      },
      {
        id: "dat-7",
        domain: "data_management",
        label: "Analytics value creation",
        text: "Le niveau d’analytics permet de générer de la valeur business mesurable.",
      },
      {
        id: "dat-8",
        domain: "data_management",
        label: "Unified & scalable data platform",
        text: "L’architecture repose sur une plateforme data unifiée et scalable.",
      },
      {
        id: "dat-9",
        domain: "data_management",
        label: "Cost-efficient scalability",
        text: "L’architecture permet de scaler les usages data à coût maîtrisé.",
      },
      {
        id: "dat-10",
        domain: "data_management",
        label: "Automated security, quality & resilience",
        text: "La gestion de la sécurité, de la qualité et de la résilience de la plateforme data est largement automatisée.",
      },
    ],
  },

  // --------------------------------------------------
  // DATA MANAGEMENT, TOOLS & ARCHITECTURE
  // --------------------------------------------------
  {
    id: "data_management",
    name: "Data Management, Tools & Architecture",
    description: "Plateforme, usages data, analytics et passage à l’échelle",
    questions: [
      {
        id: "dat-1",
        domain: "data_management",
        label: "Data-driven operations",
        text: "La donnée est intégrée dans l’ensemble des décisions, interactions et processus métiers.",
      },
      {
        id: "dat-2",
        domain: "data_management",
        label: "Real-time data processing",
        text: "La donnée est traitée et exploitée en temps réel ou quasi temps réel lorsque nécessaire.",
      },
      {
        id: "dat-3",
        domain: "data_management",
        label: "Structured & unstructured data integration",
        text: "L’architecture permet d’exploiter des données structurées et non structurées de façon intégrée.",
      },
      {
        id: "dat-4",
        domain: "data_management",
        label: "Data as a product",
        text: "La donnée est gérée comme un produit, avec des responsables identifiés et des usages clairs.",
      },
      {
        id: "dat-5",
        domain: "data_management",
        label: "Secure self-service data access",
        text: "Les équipes accèdent à la donnée via des mécanismes de self-service sécurisés.",
      },
      {
        id: "dat-6",
        domain: "data_management",
        label: "Business, data & IT collaboration",
        text: "La plateforme data facilite la collaboration entre les équipes métiers, data et IT.",
      },
      {
        id: "dat-7",
        domain: "data_management",
        label: "Analytics value creation",
        text: "Le niveau d’analytics permet de générer de la valeur business mesurable.",
      },
      {
        id: "dat-8",
        domain: "data_management",
        label: "Unified & scalable data platform",
        text: "L’architecture repose sur une plateforme data unifiée et scalable.",
      },
      {
        id: "dat-9",
        domain: "data_management",
        label: "Cost-efficient scalability",
        text: "L’architecture permet de scaler les usages data à coût maîtrisé.",
      },
      {
        id: "dat-10",
        domain: "data_management",
        label: "Automated security, quality & resilience",
        text: "La gestion de la sécurité, de la qualité et de la résilience de la plateforme data est largement automatisée.",
      },
    ],
  },

  // --------------------------------------------------
  // DATA MANAGEMENT 

    // --------------------------------------------------
  // DATA MANAGEMENT, TOOLS & ARCHITECTURE
  // --------------------------------------------------
  {
    id: "data_management",
    name: "Data Management, Tools & Architecture",
    description: "Plateforme, usages data, analytics et passage à l’échelle",
    questions: [
      {
        id: "dat-1",
        domain: "data_management",
        label: "Data-driven operations",
        text: "La donnée est intégrée dans l’ensemble des décisions, interactions et processus métiers.",
      },
      {
        id: "dat-2",
        domain: "data_management",
        label: "Real-time data processing",
        text: "La donnée est traitée et exploitée en temps réel ou quasi temps réel lorsque nécessaire.",
      },
      {
        id: "dat-3",
        domain: "data_management",
        label: "Structured & unstructured data integration",
        text: "L’architecture permet d’exploiter des données structurées et non structurées de façon intégrée.",
      },
      {
        id: "dat-4",
        domain: "data_management",
        label: "Data as a product",
        text: "La donnée est gérée comme un produit, avec des responsables identifiés et des usages clairs.",
      },
      {
        id: "dat-5",
        domain: "data_management",
        label: "Secure self-service data access",
        text: "Les équipes accèdent à la donnée via des mécanismes de self-service sécurisés.",
      },
      {
        id: "dat-6",
        domain: "data_management",
        label: "Business, data & IT collaboration",
        text: "La plateforme data facilite la collaboration entre les équipes métiers, data et IT.",
      },
      {
        id: "dat-7",
        domain: "data_management",
        label: "Analytics value creation",
        text: "Le niveau d’analytics permet de générer de la valeur business mesurable.",
      },
      {
        id: "dat-8",
        domain: "data_management",
        label: "Unified & scalable data platform",
        text: "L’architecture repose sur une plateforme data unifiée et scalable.",
      },
      {
        id: "dat-9",
        domain: "data_management",
        label: "Cost-efficient scalability",
        text: "L’architecture permet de scaler les usages data à coût maîtrisé.",
      },
      {
        id: "dat-10",
        domain: "data_management",
        label: "Automated security, quality & resilience",
        text: "La gestion de la sécurité, de la qualité et de la résilience de la plateforme data est largement automatisée.",
      },
    ],
  },

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
        label: "Compliance & auditability",
        text: "La gouvernance Data & AI permet de répondre efficacement aux exigences réglementaires et d’audit.",
      },
      {
        id: "gov-3",
        domain: "governance",
        label: "AI risk management",
        text: "Les risques liés à l’usage de l’IA (biais, dérives, usages inappropriés) sont identifiés et maîtrisés.",
      },
      {
        id: "gov-4",
        domain: "governance",
        label: "Governance as business enabler",
        text: "La gouvernance Data & AI est perçue comme un levier de confiance et de performance.",
      },
      {
        id: "gov-5",
        domain: "governance",
        label: "Data & AI governance framework",
        text: "L’organisation dispose d’un cadre de gouvernance Data & AI formalisé, documenté et partagé.",
      },
      {
        id: "gov-6",
        domain: "governance",
        label: "Data access control",
        text: "L’accès aux données est contrôlé, tracé et aligné avec les besoins métiers et les exigences réglementaires.",
      },
      {
        id: "gov-7",
        domain: "governance",
        label: "Data quality management",
        text: "La qualité des données est pilotée comme un enjeu de performance pour l’entreprise.",
      },
      {
        id: "gov-8",
        domain: "governance",
        label: "Data & model lineage",
        text: "Nous sommes capables de tracer l’origine, les transformations et les usages des données et des modèles.",
      },
      {
        id: "gov-9",
        domain: "governance",
        label: "Model lifecycle governance",
        text: "Les modèles analytiques et d’IA sont gouvernés sur l’ensemble de leur cycle de vie (conception, déploiement, suivi, retrait).",
      },
      {
        id: "gov-10",
        domain: "governance",
        label: "Sensitive data protection",
        text: "La protection des données sensibles et personnelles est intégrée aux usages Data & IA.",
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
        id: "peo-1",
        domain: "people",
        label: "Data literacy",
        text: "Les collaborateurs disposent d’un niveau de data literacy suffisant pour utiliser la donnée et l’IA de manière pertinente.",
      },
      {
        id: "peo-2",
        domain: "people",
        label: "Critical thinking & interpretation",
        text: "Les collaborateurs savent interpréter, questionner et challenger les résultats produits par la donnée et l’IA.",
      },
      {
        id: "peo-3",
        domain: "people",
        label: "Individual responsibility",
        text: "Les collaborateurs comprennent leur responsabilité individuelle dans l’usage de la donnée et de l’IA.",
      },
      {
        id: "peo-4",
        domain: "people",
        label: "Responsible AI usage",
        text: "Les collaborateurs utilisent les outils d’IA dans un cadre clair et maîtrisé.",
      },
      {
        id: "peo-5",
        domain: "people",
        label: "Team autonomy",
        text: "Les équipes sont autonomes pour utiliser la donnée et l’IA dans leur quotidien.",
      },
      {
        id: "peo-6",
        domain: "people",
        label: "Skills alignment with AI usage",
        text: "Le niveau de compétences des collaborateurs est aligné avec le niveau d’usage réel de l’IA dans l’organisation.",
      },
      {
        id: "peo-7",
        domain: "people",
        label: "Data & AI training investment",
        text: "L’organisation investit de manière structurée et continue dans la formation Data & IA.",
      },
      {
        id: "peo-8",
        domain: "people",
        label: "Onboarding & career development",
        text: "La data et l’IA font partie intégrante de l’onboarding et des parcours de développement professionnel.",
      },
      {
        id: "peo-9",
        domain: "people",
        label: "Ethics & AI awareness",
        text: "Les collaborateurs sont sensibilisés aux risques, aux limites et aux enjeux éthiques liés à l’IA.",
      },
      {
        id: "peo-10",
        domain: "people",
        label: "Human capabilities & ambition fit",
        text: "Le niveau de compétences humaines est cohérent avec les ambitions Data & IA de l’organisation.",
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
  { value: "director", label: "Sales Director" },
  { value: "other", label: "Autre" },
];
