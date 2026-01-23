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
