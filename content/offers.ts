import type { Price } from "@/lib/price";

// tous les prix du site sont ici, en HT

// ==== FORMULES ====
export const planRows = [
  { key: "pages", label: "Pages" },
  { key: "content", label: "Contenu" },
  { key: "design", label: "Maquette" },
  { key: "corrections", label: "Correction" },
  { key: "blog", label: "Blog" },
  { key: "gift", label: "Cadeau" },
] as const;

export type CardRow = { label: string; value: string | null }; // null = non inclus

export type Plan = {
  id: string;
  name: string;
  pitch: string;
  price: Price;
  recommended?: boolean;
  rows: Record<(typeof planRows)[number]["key"], string | null>;
};

export const plans: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    pitch:
      "Création d’un site vitrine d’une page pour présenter ton activité clairement et donner envie de te contacter.",
    price: { amount: 750, from: true },
    rows: {
      pages: "1 page",
      content: "Accueil, prestations, contact",
      design: "1 maquette",
      corrections: "1 aller-retour",
      blog: null,
      gift: null,
    },
  },
  {
    id: "visibilite",
    name: "Visibilité",
    pitch:
      "Création d’un site vitrine avec assez de pages pour que Google comprenne ce que tu fais, et que tes clients aient envie de te choisir.",
    price: { amount: 1200, from: true },
    recommended: true,
    rows: {
      pages: "Jusqu’à 5 pages",
      content: "Ex. : accueil, prestations, équipe, réalisations, contact",
      design: "2 maquettes",
      corrections: "2 allers-retours",
      blog: null,
      gift: "1 mois de maintenance Sérénité",
    },
  },
  {
    id: "pro",
    name: "Pro",
    pitch:
      "Une page par prestation pour être trouvé sur chacune, et un blog pour publier toi-même.",
    price: { amount: 2500, from: true },
    rows: {
      pages: "Jusqu’à 10 pages",
      content: "Une page par prestation",
      design: "2 maquettes",
      corrections: "2 allers-retours",
      blog: "Blog que tu gères toi-même",
      gift: "3 mois de maintenance Sérénité",
    },
  },
];

export function planCardRows(plan: Plan): CardRow[] {
  return planRows.map(({ key, label }) => ({ label, value: plan.rows[key] }));
}

export const includedEverywhere = [
  "Design sur mesure",
  "Adapté à tous les écrans",
  "Référencement de base",
  "Mise en ligne",
  "Site web à ton nom",
];

// ==== REFONTE ====
export const redesign = {
  id: "refonte",
  name: "Refonte",
  pitch:
    "Tu as déjà un site ? Ajoute ce module à ta formule : je fais la refonte de ton site, je garde ce qui marche.",
  rows: [
    { label: "Audit", value: "Ce qui coince sur ton site actuel" },
    { label: "Migration", value: "Tes contenus repris sur le nouveau site" },
    {
      label: "Redirections",
      value: "Tes anciennes adresses, pour que Google ne perde pas ta trace",
    },
  ] satisfies CardRow[],
  price: { amount: 450, from: true } satisfies Price,
};

// ==== MAINTENANCE ====
export const maintenancePlans = [
  {
    id: "serenite",
    name: "Sérénité",
    text: "Mises à jour, sauvegardes et correction des bugs.",
    price: { amount: 49, unit: "mois" } satisfies Price,
  },
  {
    id: "evolution",
    name: "Évolution",
    text: "Tout Sérénité, plus 1 h de petites modifications chaque mois.",
    price: { amount: 99, unit: "mois" } satisfies Price,
  },
];

// ==== FRAIS DU CLIENT ====
// tarifs Hostinger hors promo, à revérifier de temps en temps
export const clientCosts = {
  provider: "Hostinger",
  hostingPerYear: 120, // Premium, 9,99 €/mois au renouvellement
  domainPerYear: { min: 11, max: 17 }, // .fr / .com
};
