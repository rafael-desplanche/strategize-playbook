// =========================
// Interfaces
// =========================

export interface Question {
  id: string;
  domain: string;
  label: string; // Angle / dimension évaluée
  text: string;
  options: {
    value: number;
    label: string;
  }[];
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
        options: [
          { value: 1, label: "Non, la Data et l’IA ne font pas partie de notre vision stratégique." },
          { value: 2, label: "Elles sont évoquées ponctuellement mais ne sont pas à l’ordre du jour." },
          { value: 3, label: "Nous avons une vision générale, mais encore peu formalisée et partagée." },
          { value: 4, label: "Oui, nous avons une vision claire, formalisée et partagée au niveau exécutif." },
          { value: 5, label: "Oui, la Data et l’IA sont des piliers structurants de notre vision business." },
        ],
      },
      {
        id: "str-2",
        domain: "strategy",
        label: "Business alignment",
        text: "Notre stratégie Data & AI est directement alignée avec nos objectifs business prioritaires.",
        options: [
          { value: 1, label: "Non, nous ne comprenons pas comment les lier." },
          { value: 2, label: "Nous avons du mal à définir des cas d’usage business clairs." },
          { value: 3, label: "Certains objectifs business sont adressés, de manière partielle." },
          { value: 4, label: "La majorité des initiatives Data & AI soutiennent des objectifs business précis." },
          { value: 5, label: "Chaque initiative Data & AI est explicitement reliée à un objectif business mesurable." },
        ],
      },
      {
        id: "str-3",
        domain: "strategy",
        label: "Executive sponsorship & leadership",
        text: "Les initiatives Data & AI sont portées et soutenues au niveau exécutif.",
        options: [
          { value: 1, label: "Non, il n’y a pas de soutien au niveau exécutif." },
          { value: 2, label: "Le sujet est porté principalement par les équipes Data & AI." },
          { value: 3, label: "Certains dirigeants soutiennent ces initiatives." },
          { value: 4, label: "Le soutien exécutif est clair et visible." },
          { value: 5, label: "La Data et l’IA sont activement promues à tous les niveaux de direction." },
        ],
      },
      {
        id: "str-4",
        domain: "strategy",
        label: "Data-driven decision making",
        text: "Les décisions stratégiques et opérationnelles sont éclairées par la donnée.",
        options: [
          { value: 1, label: "La majorité de nos décisions ne sont pas guidées par la donnée." },
          { value: 2, label: "La donnée est utilisée a posteriori pour ajuster." },
          { value: 3, label: "La donnée est utilisée sur certains sujets clés." },
          { value: 4, label: "La donnée est centrale dans la majorité des décisions." },
          { value: 5, label: "Les décisions sont systématiquement augmentées par des insights data fiables." },
        ],
      },
    ],
  },

  // --------------------------------------------------
  // GOVERNANCE & RISK MANAGEMENT
  // --------------------------------------------------
  {
    id: "governance",
    name: "Governance & Risk Management",
    description: "Confiance, maîtrise des risques et passage à l’échelle",
    questions: [
      {
        id: "gov-1",
        domain: "governance",
        label: "Ownership & responsibilities",
        text: "Les responsabilités liées à la gouvernance de la donnée et de l’IA sont clairement définies et assumées.",
        options: [
          { value: 1, label: "Aucune responsabilité claire n’est définie." },
          { value: 2, label: "Les responsabilités sont floues ou informelles." },
          { value: 3, label: "Les rôles sont définis partiellement." },
          { value: 4, label: "Les responsabilités sont claires et appliquées." },
          { value: 5, label: "L’ownership est clair et piloté au niveau exécutif." },
        ],
      },
      {
        id: "gov-2",
        domain: "governance",
        label: "Compliance & auditability",
        text: "La gouvernance Data & AI permet de répondre efficacement aux exigences réglementaires et d’audit.",
        options: [
          { value: 1, label: "La conformité est difficile à démontrer." },
          { value: 2, label: "La conformité repose sur des efforts manuels importants." },
          { value: 3, label: "La conformité est assurée sur les périmètres sensibles." },
          { value: 4, label: "La conformité est intégrée aux processus data." },
          { value: 5, label: "La conformité est native, continue et audit-ready." },
        ],
      },
      {
        id: "gov-3",
        domain: "governance",
        label: "AI risk management",
        text: "Les risques liés à l’usage de l’IA (biais, dérives, usages inappropriés) sont identifiés et maîtrisés.",
        options: [
          { value: 1, label: "Ces risques ne sont pas adressés." },
          { value: 2, label: "Les risques sont connus mais peu encadrés." },
          { value: 3, label: "Des contrôles existent sur certains cas d’usage." },
          { value: 4, label: "Les risques sont évalués et suivis." },
          { value: 5, label: "La gestion des risques IA est systématique et industrialisée." },
        ],
      },
      {
        id: "gov-4",
        domain: "governance",
        label: "Governance as business enabler",
        text: "La gouvernance Data & AI est perçue comme un levier de confiance et de performance.",
        options: [
          { value: 1, label: "La gouvernance est perçue comme un frein." },
          { value: 2, label: "Elle est vue comme une contrainte nécessaire." },
          { value: 3, label: "Elle apporte parfois de la confiance." },
          { value: 4, label: "Elle facilite le passage à l’échelle." },
          { value: 5, label: "Elle constitue un avantage compétitif." },
        ],
      },
    ],
  },

  // --------------------------------------------------
  // PEOPLE
  // --------------------------------------------------
  {
    id: "people",
    name: "People",
    description: "Capital humain, compétences et adoption",
    questions: [
      {
        id: "peo-1",
        domain: "people",
        label: "Data literacy",
        text: "Les collaborateurs disposent d’un niveau de data literacy suffisant pour utiliser la donnée et l’IA de manière pertinente.",
        options: [
          { value: 1, label: "La majorité des collaborateurs ne sont pas data literate." },
          { value: 2, label: "La data literacy est limitée à des profils spécialisés." },
          { value: 3, label: "Les équipes clés sont globalement data literate." },
          { value: 4, label: "La data literacy est répandue dans la majorité des fonctions." },
          { value: 5, label: "La data literacy est une compétence de base pour l’ensemble des collaborateurs." },
        ],
      },
      {
        id: "peo-2",
        domain: "people",
        label: "Critical thinking & interpretation",
        text: "Les collaborateurs savent interpréter, questionner et challenger les résultats produits par la donnée et l’IA.",
        options: [
          { value: 1, label: "Les résultats sont utilisés sans esprit critique." },
          { value: 2, label: "Les collaborateurs ont des difficultés à interpréter les résultats." },
          { value: 3, label: "Les résultats sont compris sur les cas simples." },
          { value: 4, label: "Les collaborateurs savent interpréter et challenger la majorité des résultats." },
          { value: 5, label: "Les collaborateurs maîtrisent les limites et biais potentiels." },
        ],
      },
      {
        id: "peo-3",
        domain: "people",
        label: "Individual responsibility",
        text: "Les collaborateurs comprennent leur responsabilité individuelle dans l’usage de la donnée et de l’IA.",
        options: [
          { value: 1, label: "Ils ne se sentent pas responsables." },
          { value: 2, label: "La responsabilité est perçue comme un sujet IT ou Data." },
          { value: 3, label: "Certains rôles clés se sentent responsables." },
          { value: 4, label: "La responsabilité est largement comprise." },
          { value: 5, label: "Chaque collaborateur se considère comme acteur et garant." },
        ],
      },
      {
        id: "peo-4",
        domain: "people",
        label: "Responsible AI usage",
        text: "Les collaborateurs utilisent les outils d’IA dans un cadre clair et maîtrisé.",
        options: [
          { value: 1, label: "Les usages sont non encadrés et peu visibles." },
          { value: 2, label: "Les règles existent mais sont peu connues." },
          { value: 3, label: "Les usages sont encadrés sur certains périmètres." },
          { value: 4, label: "Les usages sont clairement définis et compris." },
          { value: 5, label: "L’IA est utilisée efficacement, de manière responsable." },
        ],
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
