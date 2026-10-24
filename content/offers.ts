import type { Price } from "@/lib/price";

// Source unique des tarifs : les cartes d'offres, la FAQ et les données structurées en sont tirées.
// Tous les montants sont en euros hors taxes ; le TTC est calculé à l'affichage (lib/price.ts).
// Les espaces insécables ( ) évitent qu'un « ? » ou un « € » se retrouve seul en début de ligne.

/** Lignes comparées d'une formule à l'autre, dans l'ordre d'affichage. */
export const planRows = [
  { key: "pages", label: "Pages" },
  { key: "content", label: "Contenu" },
  { key: "design", label: "Maquette" },
  { key: "corrections", label: "Correction" },
  { key: "blog", label: "Blog" },
  { key: "gift", label: "Cadeau" },
] as const;

/** Une ligne d'une carte : null = non inclus. */
export type CardRow = { label: string; value: string | null };

export type Plan = {
  id: string;
  name: string;
  pitch: string;
  /** Prix HT « à partir de ». */
  price: Price;
  recommended?: boolean;
  /** null : non inclus dans cette formule. */
  rows: Record<(typeof planRows)[number]["key"], string | null>;
};

export const plans: Plan[] = [
  {
    id: "essentiel",
    name: "Essentiel",
    pitch:
      "Un site vitrine d’une page pour présenter ton activité clairement et donner envie de te contacter.",
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
      "Un site vitrine avec assez de pages pour que Google comprenne ce que tu fais, et que tes clients aient envie de te choisir.",
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

/** Lignes d'une formule dans l'ordre de planRows, prêtes à afficher. */
export function planCardRows(plan: Plan): CardRow[] {
  return planRows.map(({ key, label }) => ({ label, value: plan.rows[key] }));
}

/** Inclus dans les trois formules (repris des engagements du site et de la FAQ). */
export const includedEverywhere = [
  "Design sur mesure",
  "Adapté au mobile",
  "Bases SEO / GEO",
  "Mise en ligne",
  "Site à ton nom",
];

/** Module refonte : 4e carte, à droite des formules. */
export const redesign = {
  id: "refonte",
  name: "Refonte",
  pitch:
    "Tu as déjà un site ? Ajoute ce module à ta formule : je garde ce qui marche, y compris ton référencement.",
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

/**
 * Nom de domaine et hébergement : non compris, au nom du client et à sa charge. Estimation au
 * tarif normal de Hostinger (hors promotions), relevée le 24 octobre 2026 sur
 * hostinger.com/fr. Ces prix changent souvent : à revérifier. Montants HT : Hostinger ajoute la
 * TVA dans le panier (vérifié dans le panier le 24 octobre 2026).
 */
export const clientCosts = {
  provider: "Hostinger",
  /** Offre Premium : 9,99 € HT par mois au renouvellement (après 48 mois à 2,49 €). */
  hostingPerYear: 120,
  /** .fr : 10,99 € par an ; .com : 16,99 € par an. */
  domainPerYear: { min: 11, max: 17 },
};

/** Total annuel avec le domaine le moins cher, arrondi à la dizaine (« environ 130 € par an »). */
export const clientCostsPerYear =
  Math.round((clientCosts.hostingPerYear + clientCosts.domainPerYear.min) / 10) * 10;
