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

type Plan = {
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

/** note : précision affichée sous l'option, en petit et en italique. */
export const extras: { id: string; label: string; price: Price; note?: string }[] = [
  {
    id: "page-supplementaire",
    label: "Page supplémentaire",
    price: { amount: 150, from: true, unit: "page" },
  },
  {
    id: "kit-ecriture",
    label: "Kit écriture texte",
    price: { amount: 150, from: true, unit: "page" },
  },
  {
    id: "kit-graphique",
    label: "Mini kit graphique",
    price: { amount: 450, from: true },
    note: "Palette, typographies et déclinaisons simples. Le logo est à fournir de ton côté.",
  },
];

/** Renfort freelance pour les agences de communication et studios (sous-traitance). */
export const agencies = {
  id: "agences",
  title: "Renfort freelance pour les agences de communication",
  text: "Un pic de charge, un projet web à sous-traiter ? Je rejoins ton équipe le temps d’une mission.",
  skills: [
    "Intégration de tes maquettes",
    "Sites vitrines et applications web",
    "Animations et interactions",
    "Performance, SEO technique et mise en ligne",
  ],
  background:
    "Ancienne cheffe de projets en bureau d’études : brief, planning et points d’étape, je m’adapte à ton organisation.",
  price: { amount: 350, from: true, unit: "jour" } satisfies Price,
};
